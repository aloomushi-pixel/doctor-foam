export const dynamic = "force-dynamic";

import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const getStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY || "", {});

export async function POST(request: NextRequest) {
    try {
        const sessionAuth = await getSession();
        if (!sessionAuth || sessionAuth.user.role !== "admin") {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 });
        }

        const { bookingId } = await request.json();

        if (!bookingId) {
            return NextResponse.json({ error: "Se requiere bookingId" }, { status: 400 });
        }

        // Fetch the booking details
        const booking = await prisma.booking.findUnique({
            where: { id: bookingId }
        });

        if (!booking) {
            return NextResponse.json({ error: "Reserva no encontrada" }, { status: 404 });
        }

        if (booking.paymentStatus === "paid") {
            return NextResponse.json({ error: "La reserva ya está pagada" }, { status: 400 });
        }

        // Create a new Stripe Checkout Session for this existing booking
        const session = await getStripe().checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            locale: "es",
            customer_email: booking.customerEmail || undefined,
            line_items: [
                {
                    price_data: {
                        currency: "mxn",
                        product_data: {
                            name: booking.packageName || "Servicio de Limpieza",
                            description: `Pago manual | Fecha: ${booking.serviceDate}`,
                        },
                        unit_amount: booking.totalAmount || 0,
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                bookingId: booking.id, // Reference to existing
                customerName: booking.customerName || "N/A",
                serviceDate: booking.serviceDate ? booking.serviceDate.toString() : "N/A",
            },
            success_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/pago-exitoso?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/`,
        });

        // The Stripe Session ID will be tracked by Stripe Webhooks natively using the bookingId metadata.
        // Prisma schema does not store this directly.

        // Send the Reminder Email
        if (booking.customerEmail) {
            try {
                const { sendPaymentReminderEmail } = await import("@/lib/email");
                await sendPaymentReminderEmail({
                    customerName: booking.customerName || "Cliente",
                    customerEmail: booking.customerEmail,
                    packageName: booking.packageName || "Servicio",
                    totalAmount: booking.totalAmount || 0,
                    paymentLink: session.url as string,
                });
            } catch (emailErr) {
                console.error("Failed to send payment reminder:", emailErr);
            }
        }

        return NextResponse.json({ success: true, url: session.url });

    } catch (error: any) {
        console.error("Admin checkout integration error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
