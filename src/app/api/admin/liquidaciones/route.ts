export const dynamic = "force-dynamic";

import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/* GET — Fetch Pending Liquidations Info */
export async function GET(request: NextRequest) {
    const session = await getSession();
    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    try {
        const bookings = await prisma.booking.findMany({
            where: {
                liquidationStatus: "pending",
                paymentStatus: "completed"
            }
        });

        const admins = await prisma.adminProfile.findMany({
            where: {
                profitSharePct: { gt: 0 }
            },
            include: {
                user: true
            }
        });

        let total_sold = 0;
        let total_expenses = 0;

        for (const b of bookings) {
            total_sold += b.totalAmount / 100;
            total_expenses += b.expenses || 0;
        }

        const total_profit = total_sold - total_expenses;

        const partner_splits = admins.map(admin => {
            return {
                user_id: admin.userId,
                name: admin.user.name || admin.user.email || "Administrador",
                display_role: admin.displayRole,
                percentage: admin.profitSharePct,
                amount: Number((total_profit * (admin.profitSharePct / 100)).toFixed(2))
            };
        });

        return NextResponse.json({
            pending_bookings: bookings.map(b => ({
                ...b,
                total_amount: b.totalAmount,
                service_date: b.serviceDate,
                package_name: b.packageName,
                customer_name: b.customerName,
                payment_status: b.paymentStatus,
                liquidation_status: b.liquidationStatus,
                created_at: b.createdAt
            })),
            totals: {
                total_sold,
                total_expenses,
                total_profit
            },
            partner_splits
        });

    } catch (err: any) {
        console.error("[admin/liquidaciones GET] Error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

/* POST — Execute Mass Liquidation */
export async function POST(request: NextRequest) {
    const session = await getSession();
    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { booking_ids, totals, partner_splits } = body;

        if (!booking_ids || booking_ids.length === 0) {
            return NextResponse.json({ error: "No hay servicios seleccionados para liquidar" }, { status: 400 });
        }

        const liquidation = await prisma.$transaction(async (tx) => {
            const liq = await tx.liquidation.create({
                data: {
                    totalSold: totals.total_sold,
                    totalExpenses: totals.total_expenses,
                    totalProfit: totals.total_profit,
                    partnerSplits: {
                        create: partner_splits.map((split: any) => ({
                            adminId: split.user_id,
                            name: split.name,
                            displayRole: split.display_role,
                            percentage: split.percentage,
                            amount: split.amount
                        }))
                    }
                },
                include: { partnerSplits: true }
            });

            await tx.booking.updateMany({
                where: { id: { in: booking_ids } },
                data: {
                    liquidationStatus: "liquidated",
                    liquidationId: liq.id
                }
            });

            return liq;
        });

        return NextResponse.json({ success: true, liquidation });

    } catch (err: any) {
        console.error("[admin/liquidaciones POST] Error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
