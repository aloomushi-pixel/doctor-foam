export const dynamic = "force-dynamic";

import { PACKAGES, calculatePrice, getVehicleSizeLabel } from "@/lib/packages";
import { insertTelemetryRows } from "@/lib/telemetry";
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

        // Calculate price with vehicle size coefficient
        const totalCentavos = calculatePrice(packageId, vehicleSize);
        const isSubscription = !!pkg.isSubscription;

        const vehicleSizeLabel = getVehicleSizeLabel(vehicleSize);

        const sessionPayload: Stripe.Checkout.SessionCreateParams = {
            payment_method_types: ["card"],
            mode: isSubscription ? "subscription" : "payment",
            locale: "es",
            line_items: [
                {
                    price_data: {
                        currency: "mxn",
                        product_data: {
                            name: pkg.name,
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
                packageId,
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
            success_url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://drfoam.com.mx"}/pago-exitoso?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://drfoam.com.mx"}/reservar?paquete=${packageId}&cancelled=true`,
        };

        if (needsFactura && facturaEmail) {
            sessionPayload.customer_email = facturaEmail;
        }

        const session = await getStripe().checkout.sessions.create(sessionPayload);

        // Server-side telemetry backup into J. Denis Supabase (public.drfoam_ux_events)
        void insertTelemetryRows([
            {
                session_id: `srv-chk-${session.id.slice(-12)}`,
                visitor_id: customerPhone || `visitor-${session.id.slice(-8)}`,
                event_name: "stripe_session_created",
                event_category: "conversion_booking",
                path: "/api/checkout",
                attribution_channel: "server_checkout",
                device_type: "desktop",
                is_bot: false,
                package_name: pkg.name,
                vehicle_size: vehicleSize,
                booking_step: 4,
                estimated_value_mxn: Math.round(totalCentavos / 100),
                metadata: {
                    stripe_session_id: session.id,
                    service_date: serviceDate,
                    vehicle: `${vehicleBrand} ${vehicleModel} ${vehicleYear}`,
                },
            },
        ]);

        return NextResponse.json({ url: session.url });
    } catch (error: unknown) {
        console.error("Stripe checkout error:", error);
        const message =
            error instanceof Error ? error.message : "Error al crear sesión de pago";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
