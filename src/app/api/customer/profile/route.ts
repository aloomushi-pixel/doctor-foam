export const dynamic = "force-dynamic";

import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await getSession();
        if (!session || !session.user) {
            return NextResponse.json({ profile: null }, { status: 401 });
        }

        const profile = await prisma.customerProfile.findUnique({
            where: { userId: session.user.id },
            select: { fullName: true, phone: true, address: true }
        });

        // Mix user info from session and profile DB entry
        return NextResponse.json({ profile: { ...profile, email: session.user.email } });
    } catch (err: any) {
        console.error("[GET /api/customer/profile] Error:", err);
        return NextResponse.json({ profile: null }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getSession();
        if (!session || !session.user) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 });
        }

        const body = await request.json();
        const { full_name, phone, default_address } = body;

        // The input form uses default_address name
        // while the schema uses address. We map it.
        const address = default_address;

        await prisma.customerProfile.upsert({
            where: { userId: session.user.id },
            update: { fullName: full_name, phone, address },
            create: { userId: session.user.id, fullName: full_name, phone, address }
        });

        if (full_name) {
            await prisma.user.update({
                where: { id: session.user.id },
                data: { name: full_name }
            });
        }

        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.error("[POST /api/customer/profile] Error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

