export const dynamic = "force-dynamic";

import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/* GET — List blocked dates */
export async function GET(request: NextRequest) {
    const session = await getSession();
    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const month = parseInt(searchParams.get("month") || String(new Date().getMonth() + 1));
    const year = parseInt(searchParams.get("year") || String(new Date().getFullYear()));

    const firstDay = new Date(year, month - 1, 1).toISOString().split("T")[0];
    const lastDay = new Date(year, month, 0).toISOString().split("T")[0];

    try {
        const blockedDates = await prisma.blockedDate.findMany({
            where: {
                blockedDate: {
                    gte: firstDay,
                    lte: lastDay
                }
            },
            orderBy: { blockedDate: "asc" }
        });

        return NextResponse.json({
            blocked_dates: blockedDates.map(bd => ({
                id: bd.id,
                blocked_date: bd.blockedDate,
                reason: bd.reason,
                created_at: bd.createdAt
            }))
        });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

/* POST — Block a date */
export async function POST(request: NextRequest) {
    const session = await getSession();
    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { blocked_date, reason } = await request.json();
    if (!blocked_date) return NextResponse.json({ error: "Falta fecha" }, { status: 400 });

    try {
        const blockedDate = await prisma.blockedDate.create({
            data: {
                blockedDate: blocked_date,
                reason: reason || "Bloqueado por admin"
            }
        });

        return NextResponse.json({
            blocked_date: {
                id: blockedDate.id,
                blocked_date: blockedDate.blockedDate,
                reason: blockedDate.reason,
                created_at: blockedDate.createdAt
            }
        });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

/* DELETE — Unblock a date */
export async function DELETE(request: NextRequest) {
    const session = await getSession();
    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Falta ID" }, { status: 400 });

    try {
        await prisma.blockedDate.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
