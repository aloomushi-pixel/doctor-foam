export const dynamic = "force-dynamic";

import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await getSession();
        if (!session || !session.user) {
            return NextResponse.json({ isMember: false }, { status: 401 });
        }

        const memberData = await prisma.booking.findFirst({
            where: {
                customerId: session.user.id,
                paymentStatus: { not: "cancelled" },
                packageName: { contains: "Membres", mode: "insensitive" }
            },
            select: { id: true }
        });

        return NextResponse.json({ isMember: !!memberData });
    } catch (err: any) {
        console.error("[GET /api/customer/membership] Error:", err);
        return NextResponse.json({ isMember: false }, { status: 500 });
    }
}
