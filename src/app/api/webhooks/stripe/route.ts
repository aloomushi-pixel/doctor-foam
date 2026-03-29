import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createServerSupabase } from "@/lib/supabase";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {});
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(request: NextRequest) {
    try {
        const body = await request.text();
        const sig = request.headers.get("stripe-signature");

        let event: Stripe.Event;

        if (endpointSecret && endpointSecret !== "whsec_placeholder" && sig) {
            try {
                event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
            } catch (err) {
                console.error("Webhook signature verification failed:", err);
                return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
            }
        } else {
            event = JSON.parse(body) as Stripe.Event;
        }

        if (event.type === "checkout.session.completed") {
            const session = event.data.object as Stripe.Checkout.Session;
            const supabase = createServerSupabase();

            if (session.id) {
                // 1. Update booking status to paid
                const { data: booking, error } = await supabase
                    .from("bookings")
                    .update({ payment_status: "paid" })
                    .eq("stripe_session_id", session.id)
                    .select()
                    .single();

                if (error) {
                    console.error("Error updating booking:", error);
                } else if (booking) {
                    console.log(`Booking confirmed for session ${session.id}`);

                    // 2. Send confirmation emails (customer + admin)
                    try {
                        const { sendBookingEmails } = await import("@/lib/email");
                        await sendBookingEmails({
                            customerName: booking.customer_name,
                            customerEmail: booking.customer_email,
                            customerPhone: booking.customer_phone || "",
                            packageName: booking.package_name,
                            serviceDate: booking.service_date,
                            vehicleInfo: booking.vehicle_info || "",
                            vehicleSize: booking.vehicle_size || "",
                            address: booking.address || "",
                            totalAmount: booking.total_amount || 0,
                            paymentStatus: "paid",
                            source: "online",
                        });
                    } catch (emailErr) {
                        console.error("Error sending emails:", emailErr);
                    }
                }
            }
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error("Webhook error:", error);
        return NextResponse.json({ error: "Webhook error" }, { status: 500 });
    }
}
