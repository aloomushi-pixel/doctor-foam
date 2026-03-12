export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const month = parseInt(searchParams.get("month") || String(new Date().getMonth() + 1));
        const year = parseInt(searchParams.get("year") || String(new Date().getFullYear()));

        // Calculate first and last day of month
        const firstDay = new Date(year, month - 1, 1).toISOString().split("T")[0];
        const lastDay = new Date(year, month, 0).toISOString().split("T")[0];

        // Get booked dates (paid or manual only — pending don't block)
        const bookings = await prisma.booking.findMany({
            where: {
                serviceDate: {
                    gte: firstDay,
                    lte: lastDay,
                },
                paymentStatus: {
                    in: ["paid", "manual"],
                },
            },
            select: { serviceDate: true },
        });

        // Get blocked dates
        const blocked = await prisma.blockedDate.findMany({
            where: {
                blockedDate: {
                    gte: firstDay,
                    lte: lastDay,
                },
            },
            select: { blockedDate: true },
        });

        const occupiedDates = new Set<string>();

        bookings?.forEach((b: { serviceDate: string }) => occupiedDates.add(b.serviceDate));
        blocked?.forEach((b: { blockedDate: string }) => occupiedDates.add(b.blockedDate));

        return NextResponse.json({
            occupied: Array.from(occupiedDates),
            month,
            year,
        });
    } catch (error) {
        console.error("Availability error:", error);
        return NextResponse.json({ error: "Error al obtener disponibilidad" }, { status: 500 });
    }
}
