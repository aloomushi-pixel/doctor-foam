export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const getStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY || "", {});
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(request: NextRequest) {
    try {
        const body = await request.text();
        const sig = request.headers.get("stripe-signature");

        let event: Stripe.Event;

        if (endpointSecret && endpointSecret !== "whsec_placeholder" && sig) {
            try {
                event = getStripe().webhooks.constructEvent(body, sig, endpointSecret);
            } catch (err) {
                console.error("Webhook signature verification failed:", err);
                return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
            }
        } else {
            event = JSON.parse(body) as Stripe.Event;
        }

        if (
            event.type === "checkout.session.completed" ||
            event.type === "checkout.session.async_payment_succeeded"
        ) {
            const session = event.data.object as Stripe.Checkout.Session;

            if (session.id && session.payment_status === "paid") {
                // 1. Update booking status to paid
                const bookingBeforeUpdate = await prisma.booking.findFirst({
                    where: { stripeSessionId: session.id }
                });

                // Evitar doble procesamiento si ya está pagado
                if (bookingBeforeUpdate && bookingBeforeUpdate.paymentStatus !== "paid") {
                    const booking = await prisma.booking.update({
                        where: { id: bookingBeforeUpdate.id },
                        data: { paymentStatus: "paid" }
                    });

                    console.log(`Booking confirmed for session ${session.id}`);

                    // 2. Auto-create customer account if doesn't exist
                    let customerId: string | null = null;

                    if (booking.customerEmail) {
                        // Check if user already exists
                        const existingUser = await prisma.user.findUnique({
                            where: { email: booking.customerEmail }
                        });

                        if (existingUser) {
                            customerId = existingUser.id;
                        } else {
                            // Create new customer account
                            const tempPassword = `DF${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
                            const hashedPassword = await bcrypt.hash(tempPassword, 10);

                            const newUser = await prisma.user.create({
                                data: {
                                    email: booking.customerEmail,
                                    password: hashedPassword,
                                    role: "customer",
                                    customerProfile: {
                                        create: {
                                            fullName: booking.customerName || "",
                                            phone: booking.customerPhone || "",
                                            address: booking.address || "",
                                        }
                                    }
                                }
                            });

                            customerId = newUser.id;

                            // Send welcome email with password setup link
                            try {
                                const { sendWelcomeEmail } = await import("@/lib/email");
                                await sendWelcomeEmail({
                                    customerName: booking.customerName,
                                    customerEmail: booking.customerEmail,
                                    setupPasswordLink: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/login`,
                                });
                            } catch (welcomeErr) {
                                console.error("Error sending welcome email:", welcomeErr);
                            }
                        }

                        // Link booking to customer
                        if (customerId) {
                            await prisma.booking.update({
                                where: { id: booking.id },
                                data: { customerId: customerId }
                            });
                        }
                    }

                    // 3. Send confirmation emails
                    try {
                        const { sendBookingEmails } = await import("@/lib/email");
                        await sendBookingEmails({
                            customerName: booking.customerName || "",
                            customerEmail: booking.customerEmail || "",
                            customerPhone: booking.customerPhone || "",
                            packageName: booking.packageName,
                            serviceDate: booking.serviceDate,
                            vehicleInfo: booking.vehicleInfo || "",
                            vehicleSize: booking.vehicleSize || "",
                            address: booking.address || "",
                            totalAmount: booking.totalAmount || 0,
                            paymentStatus: "paid",
                            source: "online",
                        });
                    } catch (emailErr) {
                        console.error("Error sending emails:", emailErr);
                    }

                    // 4. Send Push Notification to Admins and Customer
                    try {
                        const { sendPushToAdmins, sendPushNotification } = await import("@/lib/web-push");

                        // Notify Admins
                        await sendPushToAdmins({
                            title: "💰 ¡Nueva Venta Exclusiva!",
                            body: `Se ha confirmado el pago de ${booking.customerName} por $${((booking.totalAmount || 0) / 100).toFixed(2)} MXN.`,
                            url: "/admin/reservas",
                        });

                        // Notify Customer
                        if (customerId) {
                            await sendPushNotification(customerId, {
                                title: "✅ ¡Reserva Confirmada!",
                                body: `Tu cita para ${booking.packageName} ha sido agendada con éxito.`,
                                url: "/mi-cuenta/servicios",
                            });
                        }
                    } catch (pushErr) {
                        console.error("Error sending push to admins/customer:", pushErr);
                    }
                }
            } else if (session.payment_status === "unpaid") {
                // El pago es asíncrono (ej. SPEI) o falló
                console.log(`Checkout session ${session.id} completed but payment status is unpaid. Waiting for async_payment_succeeded event.`);
            }
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error("Webhook error:", error);
        return NextResponse.json({ error: "Webhook error" }, { status: 500 });
    }
}
