export const dynamic = "force-dynamic";

import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> } | { params: { id: string } }
) {
    const session = await getSession();
    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const params = await context.params;
    const userId = params.id;

    if (!userId) {
        return NextResponse.json({ error: "ID de usuario requerido" }, { status: 400 });
    }

    try {
        await prisma.user.delete({
            where: { id: userId },
        });

        return NextResponse.json({ success: true, message: "Usuario eliminado correctamente" });
    } catch (err: any) {
        console.error("[admin/users DELETE] Error:", err);
        return NextResponse.json({ error: err.message || "Error al eliminar usuario" }, { status: 500 });
    }
}
