export const dynamic = "force-dynamic";

import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/* GET — Fetch Historical Liquidations */
export async function GET(request: NextRequest) {
    const session = await getSession();
    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    try {
        const liquidations = await prisma.liquidation.findMany({
            include: { partnerSplits: true },
            orderBy: { createdAt: "desc" }
        });

        return NextResponse.json({
            liquidations: liquidations.map(l => ({
                id: l.id,
                created_at: l.createdAt,
                total_sold: l.totalSold,
                total_expenses: l.totalExpenses,
                total_profit: l.totalProfit,
                partner_splits: l.partnerSplits.map(p => ({
                    user_id: p.adminId,
                    name: p.name,
                    display_role: p.displayRole,
                    percentage: p.percentage,
                    amount: p.amount
                }))
            }))
        });

    } catch (err: any) {
        console.error("[admin/liquidaciones/historial GET] Error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
