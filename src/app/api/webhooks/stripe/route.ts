export const dynamic = "force-dynamic";

import { insertTelemetryRows } from "@/lib/telemetry";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const getStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY || "", {});

export async function POST(req: NextRequest) {
    try {
        const rawBody = await req.text();
        const sig = req.headers.get("stripe-signature");
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

        let event: Stripe.Event;

        if (webhookSecret && sig) {
            event = getStripe().webhooks.constructEvent(rawBody, sig, webhookSecret);
        } else {
            event = JSON.parse(rawBody) as Stripe.Event;
        }

        if (event.type === "checkout.session.completed") {
            const session = event.data.object as Stripe.Checkout.Session;
            const amountMxn = session.amount_total ? Math.round(session.amount_total / 100) : null;
            const meta = session.metadata || {};

            await insertTelemetryRows([
                {
                    session_id: `stripe-wh-${session.id.slice(-12)}`,
                    visitor_id: meta.customerPhone || session.customer_email || `stripe-customer-${session.id.slice(-8)}`,
                    event_name: "checkout_completed",
                    event_category: "conversion_booking",
                    path: "/api/webhooks/stripe",
                    attribution_channel: "stripe_webhook",
                    device_type: "desktop",
                    is_bot: false,
                    package_name: meta.packageId || "Servicio Doctor Foam",
                    vehicle_size: meta.vehicleSize || null,
                    booking_step: 5,
                    estimated_value_mxn: amountMxn,
                    metadata: {
                        stripe_session_id: session.id,
                        payment_status: session.payment_status,
                        service_date: meta.serviceDate || null,
                        vehicle_info: meta.vehicleInfo || null,
                        source: "stripe_webhook_server",
                    },
                },
            ]);
        }

        return NextResponse.json({ received: true });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Webhook error";
        console.error("Stripe webhook error:", message);
        return NextResponse.json({ error: message }, { status: 400 });
    }
}
