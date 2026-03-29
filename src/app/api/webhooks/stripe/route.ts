import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

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
            const meta = session.metadata || {};

            console.log(`✅ Payment completed — session ${session.id}`);
            console.log(`   Customer: ${meta.customerName} | Phone: ${meta.customerPhone}`);
            console.log(`   Service date: ${meta.serviceDate} | Address: ${meta.address}`);

            // Send confirmation emails (customer + admin)
            try {
                const { sendBookingEmails } = await import("@/lib/email");
                await sendBookingEmails({
                    customerName: meta.customerName || "Cliente",
                    customerEmail: meta.customerEmail || session.customer_email || "",
                    customerPhone: meta.customerPhone || "",
                    packageName: session.line_items?.data?.[0]?.description || meta.vehicleSize || "Servicio",
                    serviceDate: meta.serviceDate || "",
                    vehicleInfo: meta.vehicleInfo || "",
                    vehicleSize: meta.vehicleSize || "",
                    address: meta.address || "",
                    totalAmount: session.amount_total || 0,
                    paymentStatus: "paid",
                    source: "online",
                });
            } catch (emailErr) {
                console.error("Error sending emails:", emailErr);
            }
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error("Webhook error:", error);
        return NextResponse.json({ error: "Webhook error" }, { status: 500 });
    }
}
