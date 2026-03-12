export const dynamic = "force-dynamic";

import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const session = await getSession();
    if (!session || !session.user) {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { subscription } = body;

        if (!subscription || !subscription.endpoint) {
            return NextResponse.json({ error: "Falta el objeto de suscripción" }, { status: 400 });
        }

        const existing = await prisma.pushSubscription.findUnique({
            where: { endpoint: subscription.endpoint }
        });

        if (existing) {
            return NextResponse.json({ success: true, message: "Suscripción ya existía" });
        }

        await prisma.pushSubscription.create({
            data: {
                userId: session.user.id,
                endpoint: subscription.endpoint,
                subscriptionData: subscription
            }
        });

        return NextResponse.json({ success: true, message: "Suscrito correctamente" });

    } catch (err: any) {
        console.error("[web-push/subscribe POST] Error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
