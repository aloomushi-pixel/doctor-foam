export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    // Vercel Cron sends a Bearer token or specific header. 
    // You can protect this route with process.env.CRON_SECRET
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    // If a secret is defined in Vercel, mandate it
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        // Calculate tomorrow's date string in Mexico timezone, or simply UTC depending on server setup.
        // Doing simple math for 24h ahead:
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowStr = tomorrow.toISOString().split("T")[0]; // YYYY-MM-DD

        // Find bookings scheduled for tomorrow
        const bookings = await prisma.booking.findMany({
            where: {
                serviceDate: tomorrowStr,
                paymentStatus: { in: ["paid", "manual"] }
            }
        });

        if (!bookings || bookings.length === 0) {
            return NextResponse.json({ message: "No bookings for tomorrow." });
        }

        // Send notifications
        let emailsSent = 0;
        let pushesSent = 0;

        for (const booking of bookings) {
            if (booking.customerEmail) {
                // 1. Email Reminder
                try {
                    const { sendServiceReminder } = await import("@/lib/email");
                    await sendServiceReminder({
                        customerName: booking.customerName || "Cliente",
                        customerEmail: booking.customerEmail,
                        packageName: booking.packageName || "Servicio",
                        serviceDate: booking.serviceDate,
                        address: booking.address || "Por definir",
                    });
                    emailsSent++;
                } catch (emailErr) {
                    console.error(`Email error for booking ${booking.id}:`, emailErr);
                }

                // 2. Push Notification to Customer (if registered)
                if (booking.customerId) {
                    try {
                        console.log(`Push logic for customer ${booking.customerId} not yet implemented`);
                    } catch (e) { } // Temp placeholder
                }
            }
        }

        return NextResponse.json({
            success: true,
            dateProcessed: tomorrowStr,
            remindersSent: { emails: emailsSent, pushes: pushesSent }
        });

    } catch (error: any) {
        console.error("Cron processing error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
