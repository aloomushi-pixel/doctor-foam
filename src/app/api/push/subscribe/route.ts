export const dynamic = "force-dynamic";

import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/* POST — Subscribe to push notifications (admin only) */
export async function POST(request: NextRequest) {
    const session = await getSession();
    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    try {
        const { subscription } = await request.json();
        if (!subscription?.endpoint || !subscription?.keys) {
            return NextResponse.json({ error: "Subscription inválida" }, { status: 400 });
        }

        await prisma.pushSubscription.upsert({
            where: { endpoint: subscription.endpoint },
            update: {
                subscriptionData: subscription as object
            },
            create: {
                userId: session.user.id,
                endpoint: subscription.endpoint,
                subscriptionData: subscription as object
            }
        });

        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

/* DELETE — Unsubscribe from push notifications */
export async function DELETE(request: NextRequest) {
    const session = await getSession();
    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    try {
        const { endpoint } = await request.json();
        if (!endpoint) return NextResponse.json({ error: "Falta endpoint" }, { status: 400 });

        await prisma.pushSubscription.deleteMany({
            where: {
                endpoint,
                userId: session.user.id
            }
        });

        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
