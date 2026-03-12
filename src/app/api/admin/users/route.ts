export const dynamic = "force-dynamic";

import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const session = await getSession();
    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const roleParam = searchParams.get("role") || "all";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const search = searchParams.get("search") || "";
    const skip = (page - 1) * limit;

    try {
        let whereClause: any = {};
        if (roleParam === "admin") {
            whereClause.role = "admin";
        } else if (roleParam === "customer") {
            whereClause.role = "customer";
        }

        if (search) {
            whereClause.OR = [
                { email: { contains: search, mode: "insensitive" } },
                { name: { contains: search, mode: "insensitive" } },
                { customerProfile: { fullName: { contains: search, mode: "insensitive" } } },
            ];
        }

        const [users, total] = await Promise.all([
            prisma.user.findMany({
                where: whereClause,
                include: {
                    adminProfile: true,
                    customerProfile: true,
                },
                orderBy: { createdAt: "desc" },
                skip,
                take: limit,
            }),
            prisma.user.count({ where: whereClause })
        ]);

        const result = users.map(u => ({
            id: u.id,
            email: u.email,
            name: u.name || u.customerProfile?.fullName || "—",
            phone: u.customerProfile?.phone || u.phone || "—",
            role: u.role || "customer",
            display_role: u.adminProfile?.displayRole || "Administrador",
            profit_share_pct: u.adminProfile?.profitSharePct ?? 0,
            created_at: u.createdAt,
            last_sign_in: u.lastSignIn,
        }));

        return NextResponse.json({
            users: result,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        });
    } catch (err) {
        console.error("[admin/users] Error:", err);
        return NextResponse.json({ error: "Error al obtener usuarios" }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    const session = await getSession();
    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { user_id, display_role, profit_share_pct } = body;

        if (!user_id) {
            return NextResponse.json({ error: "user_id requerido" }, { status: 400 });
        }

        // Validate display_role
        const validRoles = ["Administrador", "Operador", "Proveedor"];
        if (display_role && !validRoles.includes(display_role)) {
            return NextResponse.json({ error: "Rol no válido" }, { status: 400 });
        }

        // Validate percentage
        if (profit_share_pct !== undefined) {
            const pct = Number(profit_share_pct);
            if (isNaN(pct) || pct < 0 || pct > 100) {
                return NextResponse.json({ error: "Porcentaje debe ser entre 0 y 100" }, { status: 400 });
            }
        }

        const updateData: any = {};
        if (display_role) updateData.displayRole = display_role;
        if (profit_share_pct !== undefined) updateData.profitSharePct = Number(profit_share_pct);

        await prisma.adminProfile.upsert({
            where: { userId: user_id },
            update: updateData,
            create: {
                userId: user_id,
                ...updateData,
            },
        });

        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.error("[admin/users PATCH] Error:", err);
        return NextResponse.json({ error: err.message || "Error al actualizar usuario" }, { status: 500 });
    }
}
