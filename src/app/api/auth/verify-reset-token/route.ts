export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { token, email, newPassword } = await request.json();

        if (!token || !email || !newPassword) {
            return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
        }

        if (newPassword.length < 6) {
            return NextResponse.json({ error: "La contraseña debe tener al menos 6 caracteres" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            console.error("[verify-reset] User not found:", email);
            return NextResponse.json({ error: "Enlace inválido o expirado" }, { status: 400 });
        }

        console.log("[verify-reset] Token valid for user:", user.id);

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: { email },
            data: {
                password: hashedPassword,
            },
        });

        console.log("[verify-reset] ✅ Password updated successfully for:", email);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[verify-reset] Unexpected error:", error);
        return NextResponse.json({ error: "Error interno" }, { status: 500 });
    }
}
