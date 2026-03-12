export const dynamic = "force-dynamic";

import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/* GET — List all bookings */
export async function GET(request: NextRequest) {
    const session = await getSession();
    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const fetchAll = searchParams.get("all") === "true";

    try {
        let bookings;

        if (fetchAll) {
            // Return ALL bookings (for the booking manager page)
            bookings = await prisma.booking.findMany({
                orderBy: { serviceDate: "desc" },
            });
        } else {
            // Monthly filter (for the dashboard calendar)
            const month = parseInt(searchParams.get("month") || String(new Date().getMonth() + 1));
            const year = parseInt(searchParams.get("year") || String(new Date().getFullYear()));

            const firstDay = new Date(year, month - 1, 1).toISOString().split("T")[0];
            const lastDay = new Date(year, month, 0).toISOString().split("T")[0];

            bookings = await prisma.booking.findMany({
                where: {
                    serviceDate: {
                        gte: firstDay,
                        lte: lastDay,
                    },
                    paymentStatus: {
                        not: "cancelled",
                    },
                },
                orderBy: { serviceDate: "asc" },
            });
        }

        return NextResponse.json({ bookings });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

/* POST — Create manual booking */
export async function POST(request: NextRequest) {
    const session = await getSession();
    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const {
            service_date,
            package_name,
            vehicle_size,
            customer_name,
            customer_phone,
            customer_email,
            vehicle_info,
            address,
            notes,
            agreed_amount
        } = body;

        if (!service_date || !package_name || !customer_name || !vehicle_size) {
            return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
        }

        // Check if date is already occupied
        const existing = await prisma.booking.findFirst({
            where: {
                serviceDate: service_date,
                paymentStatus: { in: ["paid", "manual", "completed"] }
            }
        });

        if (existing) {
            return NextResponse.json({ error: "Esta fecha ya está ocupada" }, { status: 409 });
        }

        // Check if date is blocked
        const blocked = await prisma.blockedDate.findFirst({
            where: { blockedDate: service_date }
        });

        if (blocked) {
            return NextResponse.json({ error: "Esta fecha está bloqueada para servicios" }, { status: 409 });
        }

        // Calculate amount if agreed_amount is not passed or is 0
        let finalAmount = Number(agreed_amount) || 0;
        if (finalAmount <= 0) {
            // Base Prices (Hardcoded reference to align with business logic)
            const packagePrices = {
                "Industrial Deep Interior": 169000,
                "Signature Detail": 178000,
                "Ceramic + Graphene Shield": 420000,
                "Ceramic Coating": 250000,
                "Foam Maintenance": 70000,
            };

            const sizeMultipliers = {
                "sedan": 1,
                "suv": 1.25,
                "truck": 1.45,
            };

            const baseP = packagePrices[package_name as keyof typeof packagePrices] || 169000;
            const mult = sizeMultipliers[vehicle_size as keyof typeof sizeMultipliers] || 1;
            finalAmount = Math.round(baseP * mult);
        }

        const newBooking = await prisma.booking.create({
            data: {
                serviceDate: service_date,
                packageName: package_name,
                vehicleSize: vehicle_size,
                customerName: customer_name,
                customerEmail: customer_email || "",
                customerPhone: customer_phone || "",
                address: address || "",
                vehicleInfo: vehicle_info || "",
                notes: notes || "",
                paymentStatus: "manual",
                source: "admin",
                totalAmount: finalAmount, // Saved in cents
            }
        });

        // Send admin notification for manual booking
        try {
            const { sendAdminNotification } = await import("@/lib/email");
            await sendAdminNotification({
                customerName: customer_name,
                customerEmail: customer_email || "N/A",
                customerPhone: customer_phone || "N/A",
                packageName: package_name,
                serviceDate: service_date,
                vehicleInfo: vehicle_info || "No especificado",
                vehicleSize: vehicle_size,
                address: address || "No especificado",
                totalAmount: finalAmount,
                paymentStatus: "manual",
                source: "admin",
            });
        } catch (emailErr) {
            console.error("Error sending admin email:", emailErr);
        }

        return NextResponse.json({ booking: newBooking });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

/* DELETE — Cancel a booking */
export async function DELETE(request: NextRequest) {
    const session = await getSession();
    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ error: "Falta ID" }, { status: 400 });
    }

    try {
        await prisma.booking.update({
            where: { id },
            data: { paymentStatus: "cancelled" }
        });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

/* PATCH — Update/reschedule a booking */
export async function PATCH(request: NextRequest) {
    const session = await getSession();
    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { id, ...updates } = body;

        if (!id) {
            return NextResponse.json({ error: "Falta ID" }, { status: 400 });
        }

        // If rescheduling, check new date availability
        if (updates.service_date) {
            const existing = await prisma.booking.findFirst({
                where: {
                    serviceDate: updates.service_date,
                    id: { not: id },
                    paymentStatus: { in: ["paid", "manual", "completed"] }
                }
            });

            if (existing) {
                return NextResponse.json({ error: "La nueva fecha ya está ocupada" }, { status: 409 });
            }

            // Check if date is blocked
            const blocked = await prisma.blockedDate.findFirst({
                where: { blockedDate: updates.service_date }
            });

            if (blocked) {
                return NextResponse.json({ error: "La nueva fecha está bloqueada" }, { status: 409 });
            }
        }

        const allowedFieldsMap: Record<string, string> = {
            service_date: "serviceDate",
            package_name: "packageName",
            customer_name: "customerName",
            customer_phone: "customerPhone",
            customer_email: "customerEmail",
            vehicle_info: "vehicleInfo",
            vehicle_size: "vehicleSize",
            address: "address",
            notes: "notes",
            payment_status: "paymentStatus",
            expenses: "expenses"
        };

        const safeUpdates: any = {};
        for (const [snakeKey, camelKey] of Object.entries(allowedFieldsMap)) {
            if (snakeKey in updates) {
                safeUpdates[camelKey] = snakeKey === "expenses" ? Number(updates[snakeKey]) : updates[snakeKey];
            }
        }

        for (const camelKey of Object.values(allowedFieldsMap)) {
            if (camelKey in updates && !(camelKey in safeUpdates)) {
                safeUpdates[camelKey] = camelKey === "expenses" ? Number(updates[camelKey]) : updates[camelKey];
            }
        }

        if (Object.keys(safeUpdates).length === 0) {
            return NextResponse.json({ error: "No hay campos para actualizar" }, { status: 400 });
        }

        const updatedBooking = await prisma.booking.update({
            where: { id },
            data: safeUpdates
        });

        return NextResponse.json({ booking: updatedBooking });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
