export const dynamic = "force-dynamic";

import { getSession } from "@/lib/auth";
import { PACKAGES, calculatePrice, getVehicleSizeLabel } from "@/lib/packages";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const getStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY || "", {});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            packageId,
            vehicleSize = "sedan-2filas",
            serviceDate,
            customerName,
            customerPhone,
            address,
            vehicleBrand,
            vehicleModel,
            vehicleYear,
            vehicleColor,
            rfc,
            razonSocial,
            needsFactura,
            facturaRegimen,
            facturaCP,
            facturaEmail,
            facturaUsoCFDI,
        } = body;

        // Validate package
        const pkg = PACKAGES[packageId];
        if (!pkg) {
            return NextResponse.json({ error: "Paquete no válido" }, { status: 400 });
        }

        if (!serviceDate) {
            return NextResponse.json({ error: "Selecciona una fecha de servicio" }, { status: 400 });
        }

        // Check date availability
        const existingBookings = await prisma.booking.findMany({
            where: {
                serviceDate: serviceDate,
                paymentStatus: { in: ["paid", "manual"] },
            },
            select: { id: true },
        });

        const blockedDates = await prisma.blockedDate.findMany({
            where: { blockedDate: serviceDate },
            select: { id: true },
        });

        if ((existingBookings && existingBookings.length > 0) || (blockedDates && blockedDates.length > 0)) {
            return NextResponse.json({ error: "La fecha seleccionada ya no está disponible" }, { status: 409 });
        }

        // Check for membership discount
        let isMember = false;
        const sessionAuth = await getSession();
        if (sessionAuth && sessionAuth.user.id) {
            const memberCount = await prisma.booking.count({
                where: {
                    customerId: sessionAuth.user.id,
                    paymentStatus: { not: "cancelled" },
                    packageName: { contains: "Membres" },
                },
            });

            if (memberCount > 0) {
                isMember = true;
            }
        }

        // Calculate price with vehicle size coefficient
        let totalCentavos = calculatePrice(packageId, vehicleSize);
        const isSubscription = !!pkg.isSubscription;
        if (isMember && !isSubscription) {
            totalCentavos = Math.round(totalCentavos * 0.9);
        }

        const vehicleSizeLabel = getVehicleSizeLabel(vehicleSize);

        const sessionPayload: any = {
            payment_method_types: ["card"],
            mode: isSubscription ? "subscription" : "payment",
            locale: "es",
            line_items: [
                {
                    price_data: {
                        currency: "mxn",
                        product_data: {
                            name: pkg.name + (isMember && !isSubscription ? " (10% Desc. Miembro)" : ""),
                            description: `${pkg.description} | ${vehicleSizeLabel} | Fecha: ${serviceDate}`,
                            metadata: { packageId, vehicleSize },
                        },
                        unit_amount: totalCentavos,
                        ...(isSubscription ? { recurring: { interval: "month" as const } } : {}),
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                customerName,
                customerPhone,
                address: address || "Por definir",
                vehicleInfo: `${vehicleBrand} ${vehicleModel} ${vehicleYear} ${vehicleColor}`,
                vehicleSize,
                serviceDate,
                needsFactura: needsFactura ? "sí" : "no",
                rfc: needsFactura ? rfc : "N/A",
                razonSocial: needsFactura ? razonSocial : "N/A",
                facturaRegimen: needsFactura ? facturaRegimen : "N/A",
                facturaCP: needsFactura ? facturaCP : "N/A",
                facturaEmail: needsFactura ? facturaEmail : "N/A",
                facturaUsoCFDI: needsFactura ? facturaUsoCFDI : "N/A",
            },
            success_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/pago-exitoso?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/reservar?paquete=${packageId}&cancelled=true`,
        };

        if (needsFactura && facturaEmail) {
            sessionPayload.customer_email = facturaEmail;
        }

        const session = await getStripe().checkout.sessions.create(sessionPayload);

        // Generate a temporary email if none is provided to satisfy Prisma schema, Webhook will replace this
        const finalEmail = (needsFactura && facturaEmail) ? facturaEmail : `pending-${Date.now()}@doctorfoam.com`;

        // Create pending booking in DB
        await prisma.booking.create({
            data: {
                serviceDate: serviceDate,
                packageName: pkg.name,
                vehicleSize: vehicleSizeLabel,
                totalAmount: totalCentavos,
                customerName: customerName,
                customerEmail: finalEmail,
                customerPhone: customerPhone,
                address: address || "Por definir",
                vehicleInfo: `${vehicleBrand} ${vehicleModel} ${vehicleYear} ${vehicleColor}`,
                paymentStatus: "pending",
                source: "online",
                stripeSessionId: session.id,
            }
        });

        return NextResponse.json({ url: session.url });
    } catch (error: unknown) {
        console.error("Stripe checkout error:", error);
        const message =
            error instanceof Error ? error.message : "Error al crear sesión de pago";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
