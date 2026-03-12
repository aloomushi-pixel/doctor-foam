export const dynamic = "force-dynamic";

import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const getResend = () => new Resend(process.env.RESEND_API_KEY);

/* GET — List invitations */
export async function GET(request: NextRequest) {
    const session = await getSession();
    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    try {
        const invitations = await prisma.invitation.findMany({
            orderBy: { createdAt: "desc" }
        });

        return NextResponse.json({
            invitations: invitations.map(inv => ({
                id: inv.id,
                email: inv.email,
                role: inv.role,
                status: inv.status,
                token: inv.token,
                invited_by: inv.invitedBy,
                created_at: inv.createdAt,
                expires_at: inv.expiresAt
            }))
        });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

/* POST — Create invitation */
export async function POST(request: NextRequest) {
    const session = await getSession();
    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { email, role } = await request.json();
    if (!email || !role) return NextResponse.json({ error: "Email y rol requeridos" }, { status: 400 });
    if (!["admin", "customer"].includes(role)) {
        return NextResponse.json({ error: "Rol inválido" }, { status: 400 });
    }

    try {
        // Check if already invited
        const existing = await prisma.invitation.findFirst({
            where: {
                email: email.toLowerCase(),
                status: "pending"
            }
        });

        if (existing) {
            return NextResponse.json({ error: "Ya existe una invitación pendiente para este email" }, { status: 400 });
        }

        const token = crypto.randomBytes(32).toString("hex");
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

        await prisma.invitation.create({
            data: {
                email: email.toLowerCase(),
                role,
                invitedBy: session.user.id,
                token,
                expiresAt,
            }
        });

        // Send invitation email
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://drfoam.com.mx";
        const inviteUrl = `${baseUrl}/invitacion?token=${token}&email=${encodeURIComponent(email.toLowerCase())}`;
        const roleLabel = role === "admin" ? "Administrador" : "Cliente";

        try {
            await getResend().emails.send({
                from: "Doctor Foam <info@drfoam.com.mx>",
                to: email.toLowerCase(),
                subject: `Invitación a Doctor Foam — ${roleLabel}`,
                html: `
                    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 520px; margin: 0 auto; padding: 2rem; background: #0a1628; color: #e2e8f0; border-radius: 12px;">
                        <h1 style="text-align: center; font-size: 1.5rem; margin-bottom: 0.5rem;">
                            DOCTOR <span style="background: linear-gradient(135deg, #3b82f6, #60a5fa); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">FOAM</span>
                        </h1>
                        <p style="text-align: center; color: #94a3b8; font-size: 0.9rem;">Detallado Automotriz Premium</p>
                        <hr style="border: none; border-top: 1px solid rgba(96, 165, 250, 0.15); margin: 1.5rem 0;" />
                        <p style="font-size: 1rem; line-height: 1.6;">
                            Has sido invitado como <strong style="color: #60a5fa;">${roleLabel}</strong> a la plataforma de Doctor Foam.
                        </p>
                        <p style="font-size: 0.9rem; color: #94a3b8; line-height: 1.5;">
                            Haz clic en el botón para crear tu cuenta y acceder a la plataforma.
                        </p>
                        <div style="text-align: center; margin: 2rem 0;">
                            <a href="${inviteUrl}" style="display: inline-block; padding: 0.9rem 2rem; background: linear-gradient(135deg, #2563eb, #3b82f6); color: white; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 1rem;">
                                Aceptar invitación
                            </a>
                        </div>
                        <p style="font-size: 0.8rem; color: #64748b; text-align: center;">
                            Esta invitación expira en 7 días.
                        </p>
                    </div>
                `,
            });
        } catch (emailErr) {
            console.error("[invitations] Email error:", emailErr);
        }

        return NextResponse.json({ success: true, message: "Invitación enviada" });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

/* DELETE — Cancel invitation */
export async function DELETE(request: NextRequest) {
    const session = await getSession();
    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID requerido" }, { status: 400 });

    try {
        await prisma.invitation.delete({
            where: { id }
        });
        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
