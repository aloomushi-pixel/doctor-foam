export const dynamic = "force-dynamic";

import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await getSession();
        if (!session || !session.user) {
            return NextResponse.json({ bookings: [] }, { status: 401 });
        }

        const bookings = await prisma.booking.findMany({
            where: { customerId: session.user.id },
            orderBy: { serviceDate: "desc" }
        });

        return NextResponse.json({ bookings });
    } catch (err: any) {
        console.error("[GET /api/customer/bookings] Error:", err);
        return NextResponse.json({ bookings: [] }, { status: 500 });
    }
}
