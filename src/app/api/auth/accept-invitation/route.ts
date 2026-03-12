export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { token, email, name, password } = await request.json();

        if (!token || !email || !name || !password) {
            return NextResponse.json({ error: "Todos los campos son requeridos" }, { status: 400 });
        }

        if (password.length < 6) {
            return NextResponse.json({ error: "La contraseña debe tener al menos 6 caracteres" }, { status: 400 });
        }

        // Verify invitation
        const invitation = await prisma.invitation.findFirst({
            where: {
                token,
                email: email.toLowerCase(),
                status: "pending"
            }
        });

        if (!invitation) {
            return NextResponse.json({ error: "Invitación inválida o ya utilizada" }, { status: 400 });
        }

        // Check expiration
        if (new Date(invitation.expiresAt) < new Date()) {
            await prisma.invitation.update({
                where: { id: invitation.id },
                data: { status: "expired" }
            });
            return NextResponse.json({ error: "La invitación ha expirado" }, { status: 400 });
        }

        // Check if email is already in use
        const existingUser = await prisma.user.findUnique({
            where: { email: email.toLowerCase() }
        });

        if (existingUser) {
            return NextResponse.json({ error: "Este email ya está registrado" }, { status: 400 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user via Prisma in a transaction
        await prisma.$transaction(async (tx) => {
            const newUser = await tx.user.create({
                data: {
                    email: email.toLowerCase(),
                    password: hashedPassword,
                    name: name,
                    role: invitation.role,
                }
            });

            // Make the profile
            if (invitation.role === "customer") {
                await tx.customerProfile.create({
                    data: {
                        userId: newUser.id,
                        fullName: name
                    }
                });
            } else if (invitation.role === "admin") {
                await tx.adminProfile.create({
                    data: {
                        userId: newUser.id,
                        displayRole: "Administrador",
                        profitSharePct: 0
                    }
                });
            }

            // Mark invitation as accepted
            await tx.invitation.update({
                where: { id: invitation.id },
                data: { status: "accepted" }
            });
        });

        return NextResponse.json({
            success: true,
            role: invitation.role,
            message: invitation.role === "admin"
                ? "Cuenta de administrador creada. Puedes iniciar sesión."
                : "Cuenta creada exitosamente.",
        });
    } catch (error) {
        console.error("[accept-invitation] Error:", error);
        return NextResponse.json({ error: "Error interno" }, { status: 500 });
    }
}
