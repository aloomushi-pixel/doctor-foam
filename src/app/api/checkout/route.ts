import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { PACKAGES, calculatePrice, getVehicleSizeLabel } from "@/lib/packages";
import { sendBookingEmails } from "@/lib/email";

function getStripe() {
    return new Stripe(process.env.STRIPE_SECRET_KEY || "", {});
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            packageId,
            vehicleSize = "sedan-2filas",
            serviceDate,
            customerName,
            customerEmail,
            customerPhone,
            address,
            vehicleBrand,
            vehicleModel,
            vehicleYear,
            vehicleColor,
            isBlackColor,
            rfc,
            razonSocial,
            needsFactura,
        } = body;

        // Validate package
        const pkg = PACKAGES[packageId];
        if (!pkg) {
            return NextResponse.json({ error: "Paquete no válido" }, { status: 400 });
        }

        if (!serviceDate) {
            return NextResponse.json({ error: "Selecciona una fecha de servicio" }, { status: 400 });
        }

        // Calculate price
        const totalCentavos = calculatePrice(packageId, vehicleSize, isBlackColor);
        const vehicleSizeLabel = getVehicleSizeLabel(vehicleSize);
        const vehicleInfo = [vehicleBrand, vehicleModel, vehicleYear, vehicleColor, isBlackColor ? "(Color Negro)" : ""].filter(Boolean).join(" ");
        const isSubscription = !!pkg.isSubscription;

        // 1) Send email notification to admin immediately
        try {
            await sendBookingEmails({
                customerName,
                customerEmail: customerEmail || "",
                customerPhone,
                packageName: pkg.name,
                serviceDate,
                vehicleInfo,
                vehicleSize: vehicleSizeLabel,
                address: address || "Por definir",
                totalAmount: totalCentavos,
                paymentStatus: "pendiente",
                source: "online",
                rfc: needsFactura ? rfc : undefined,
                razonSocial: needsFactura ? razonSocial : undefined,
            });
        } catch (emailErr) {
            console.error("Error sending booking emails:", emailErr);
        }

        // 2) Create Stripe Checkout session so client can pay
        const session = await getStripe().checkout.sessions.create({
            payment_method_types: ["card"],
            mode: isSubscription ? "subscription" : "payment",
            locale: "es",
            customer_email: customerEmail || undefined,
            line_items: [
                {
                    price_data: {
                        currency: "mxn",
                        product_data: {
                            name: pkg.name,
                            description: `${pkg.description} | ${vehicleSizeLabel}${isBlackColor ? ' | Color Negro' : ''} | Fecha: ${serviceDate}`,
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
                serviceDate,
                address: address || "Por definir",
            },
            success_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/pago-exitoso?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/reservar?paquete=${packageId}&cancelled=true`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error: unknown) {
        console.error("Checkout error:", error);
        const message = error instanceof Error ? error.message : "Error al crear sesión de pago";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
