import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const hash = await bcrypt.hash("E4ae5d6c0c.", 10);
        const email = "juangarcia@ccurity.com.mx";

        const user = await prisma.user.upsert({
            where: { email },
            update: {
                password: hash,
                role: "admin",
                name: "Juan Garcia"
            },
            create: {
                email,
                name: "Juan Garcia",
                password: hash,
                role: "admin",
                adminProfile: {
                    create: {
                        displayRole: "Administrador Principal"
                    }
                }
            }
        });

        // Asegurar perfil
        const profile = await prisma.adminProfile.findUnique({ where: { userId: user.id } });
        if (!profile) {
            await prisma.adminProfile.create({ data: { userId: user.id, displayRole: "Administrador Principal" } });
        }

        return NextResponse.json({ success: true, user });

    } catch (error: any) {
        console.error("FORZAR ADMIN ERROR:", error);
        return NextResponse.json({
            success: false,
            error: error.message,
            stack: error.stack,
            name: error.name
        }, { status: 500 });
    }
}
