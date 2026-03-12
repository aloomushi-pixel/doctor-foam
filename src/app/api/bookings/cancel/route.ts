export const dynamic = "force-dynamic";

import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 });
        }

        const { booking_id } = await request.json();
        if (!booking_id) {
            return NextResponse.json({ error: "booking_id es requerido" }, { status: 400 });
        }

        // Verify the booking belongs to this user
        const booking = await prisma.booking.findUnique({
            where: { id: booking_id },
            select: { id: true, customerId: true, serviceDate: true, paymentStatus: true }
        });

        if (!booking) {
            return NextResponse.json({ error: "Reserva no encontrada" }, { status: 404 });
        }

        if (booking.customerId !== session.user.id && session.user.role !== "admin") {
            return NextResponse.json({ error: "No autorizado para cancelar esta reserva" }, { status: 403 });
        }

        // Only allow cancelling future bookings (at least 24h before service)
        const serviceDate = new Date(booking.serviceDate + "T00:00:00");
        const now = new Date();
        const hoursUntilService = (serviceDate.getTime() - now.getTime()) / (1000 * 60 * 60);

        if (hoursUntilService < 24 && session.user.role !== "admin") {
            return NextResponse.json(
                { error: "Las cancelaciones deben hacerse con al menos 24 horas de anticipación" },
                { status: 400 }
            );
        }

        if (booking.paymentStatus === "cancelled") {
            return NextResponse.json({ error: "Esta reserva ya está cancelada" }, { status: 400 });
        }

        // Update booking status
        await prisma.booking.update({
            where: { id: booking_id },
            data: { paymentStatus: "cancelled" }
        });

        return NextResponse.json({ success: true, message: "Reserva cancelada exitosamente" });
    } catch {
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}
