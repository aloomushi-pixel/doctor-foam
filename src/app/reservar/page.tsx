"use client";

import { PACKAGES, VEHICLE_SIZES, resolvePackageSlug } from "@/lib/packages";
import { trackDrFoamEvent } from "@/lib/telemetry";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";

/* ─── Re-export for component use (aligned shapes) ─── */
const packagesData = Object.fromEntries(
    Object.entries(PACKAGES)
        .filter(([, v]) => !v.isSubscription) // membership handled separately
        .map(([k, v]) => [k, { name: v.name, priceBase: v.priceBase, label: v.label, features: v.features }])
);

const vehicleSizes = VEHICLE_SIZES;

/* ─── Calendar Component ─── */
function Calendar({
    selectedDate,
    onSelectDate,
}: {
    selectedDate: string;
    onSelectDate: (date: string) => void;
}) {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [occupiedDates, setOccupiedDates] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchAvailability = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(
                `/api/bookings/availability?month=${currentMonth + 1}&year=${currentYear}`
            );
            const data = await res.json();
            setOccupiedDates(data.occupied || []);
        } catch {
            console.error("Error fetching availability");
        }
        setLoading(false);
    }, [currentMonth, currentYear]);

    useEffect(() => {
        fetchAvailability();
    }, [fetchAvailability]);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
    ];
    const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

    const canGoPrev = currentYear > today.getFullYear() || (currentYear === today.getFullYear() && currentMonth > today.getMonth());

    const goToPrev = () => {
        if (!canGoPrev) return;
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const goToNext = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const days = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
        days.push(<div key={`empty-${i}`} />);
    }

    for (let d = 1; d <= daysInMonth; d++) {
        const date = new Date(currentYear, currentMonth, d);
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
        const isPast = date < today;
        const isSunday = date.getDay() === 0;
        const isOccupied = occupiedDates.includes(dateStr);
        const isSelected = dateStr === selectedDate;
        const isDisabled = isPast || isSunday || isOccupied;
        const isToday = date.getTime() === today.getTime();

        days.push(
            <button
                key={d}
                type="button"
                disabled={isDisabled}
                onClick={() => !isDisabled && onSelectDate(dateStr)}
                style={{
                    width: "100%",
                    aspectRatio: "1",
                    border: isSelected ? "2px solid #2563eb" : "1px solid #e2e8f0",
                    borderRadius: "0.5rem",
                    background: isSelected
                        ? "linear-gradient(135deg, #2563eb, #3b82f6)"
                        : isOccupied
                            ? "rgba(239, 68, 68, 0.08)"
                            : isPast || isSunday
                                ? "#f1f5f9"
                                : "#ffffff",
                    color: isSelected ? "#ffffff" : isDisabled ? "#94a3b8" : isOccupied ? "#ef4444" : "#0f172a",
                    cursor: isDisabled ? "not-allowed" : "pointer",
                    fontWeight: isSelected || isToday ? 700 : 500,
                    fontSize: "0.9rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s",
                    position: "relative" as const,
                }}
            >
                {d}
                {isToday && !isSelected && (
                    <span style={{ position: "absolute", bottom: "3px", width: "4px", height: "4px", borderRadius: "50%", background: "#2563eb" }} />
                )}
            </button>
        );
    }

    return (
        <div>
            {/* Month Navigation */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                <button
                    type="button"
                    onClick={goToPrev}
                    disabled={!canGoPrev}
                    style={{
                        background: "none", border: "none", color: canGoPrev ? "#0f172a" : "#cbd5e1",
                        cursor: canGoPrev ? "pointer" : "not-allowed", fontSize: "1.2rem", padding: "0.5rem",
                    }}
                >
                    ←
                </button>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "#0f172a", fontSize: "1.05rem" }}>
                    {monthNames[currentMonth]} {currentYear}
                </span>
                <button
                    type="button" onClick={goToNext}
                    style={{ background: "none", border: "none", color: "#0f172a", cursor: "pointer", fontSize: "1.2rem", padding: "0.5rem" }}
                >
                    →
                </button>
            </div>

            {/* Day names */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "0.25rem", marginBottom: "0.5rem" }}>
                {dayNames.map((day) => (
                    <div key={day} style={{ textAlign: "center", fontSize: "0.75rem", fontWeight: 600, color: "#64748b", padding: "0.25rem" }}>
                        {day}
                    </div>
                ))}
            </div>

            {/* Days Grid */}
            <div style={{
                display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "0.3rem",
                opacity: loading ? 0.5 : 1, transition: "opacity 0.3s",
            }}>
                {days}
            </div>

            {/* Legend */}
            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem", fontSize: "0.75rem", color: "#64748b", flexWrap: "wrap" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <span style={{ width: "10px", height: "10px", borderRadius: "2px", background: "linear-gradient(135deg, #2563eb, #3b82f6)" }} />
                    Seleccionado
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <span style={{ width: "10px", height: "10px", borderRadius: "2px", background: "rgba(239, 68, 68, 0.15)", border: "1px solid rgba(239,68,68,0.3)" }} />
                    Ocupado
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <span style={{ width: "10px", height: "10px", borderRadius: "2px", background: "#ffffff", border: "1px solid #e2e8f0" }} />
                    Disponible
                </span>
            </div>
        </div>
    );
}

/* ─── Main Booking Form ─── */
function BookingForm() {
    const searchParams = useSearchParams();
    const [step, setStep] = useState(1);
    const initialPkgParam = searchParams.get("paquete") || searchParams.get("package") || searchParams.get("pkg");
    const [selectedPackage, setSelectedPackage] = useState(resolvePackageSlug(initialPkgParam));
    const [vehicleSize, setVehicleSize] = useState("sedan-2filas");
    const [serviceDate, setServiceDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success] = useState(false);
    const cancelled = searchParams.get("cancelled");
    const [hoveredPkg, setHoveredPkg] = useState<string | null>(null);
    const [isMember, setIsMember] = useState(false);

    /* Form fields — pre-fill from query params if available */
    const [customerName, setCustomerName] = useState(searchParams.get("nombre") || "");
    const [customerEmail, setCustomerEmail] = useState(searchParams.get("email") || "");
    const [customerPhone, setCustomerPhone] = useState(searchParams.get("telefono") || "");
    const [addressCalle, setAddressCalle] = useState(searchParams.get("direccion") || "");
    const [addressCP, setAddressCP] = useState("");
    const [addressTipo, setAddressTipo] = useState("Casa");
    const [vehicleBrand, setVehicleBrand] = useState("");
    const [vehicleModel, setVehicleModel] = useState("");
    const [vehicleYear, setVehicleYear] = useState("");
    const [vehicleColor, setVehicleColor] = useState("");
    const [needsFactura, setNeedsFactura] = useState(false);
    const [rfc, setRfc] = useState("");
    const [razonSocial, setRazonSocial] = useState("");
    const [facturaRegimen, setFacturaRegimen] = useState("");
    const [facturaCP, setFacturaCP] = useState("");
    const [facturaEmail, setFacturaEmail] = useState("");
    const [facturaUsoCFDI, setFacturaUsoCFDI] = useState("G03");

    const pkg = packagesData[selectedPackage];
    const coeff = vehicleSizes.find((v) => v.value === vehicleSize)?.coefficient || 1.0;
    const basePrice = pkg ? Math.round(pkg.priceBase * coeff) : 0;
    const currentPrice = isMember ? Math.round(basePrice * 0.9) : basePrice;

    useEffect(() => {
        const rawPkg = searchParams.get("paquete") || searchParams.get("package") || searchParams.get("pkg");
        if (rawPkg) {
            const resolved = resolvePackageSlug(rawPkg);
            if (packagesData[resolved]) setSelectedPackage(resolved);
        }

        const checkMembership = async () => {
            try {
                const res = await fetch("/api/customer/membership");
                if (!res.ok) return;
                const data = await res.json();
                if (data.isMember) setIsMember(true);
            } catch (err) {
                console.error("Error checking membership", err);
            }
        };
        checkMembership();
    }, [searchParams]);

    /* Track booking funnel step views */
    useEffect(() => {
        const stepLabels: Record<number, string> = {
            1: "step_1_servicio",
            2: "step_2_fecha",
            3: "step_3_datos",
            4: "step_4_confirmar",
        };
        trackDrFoamEvent({
            event_name: "booking_step_view",
            event_category: "conversion_booking",
            booking_step: step,
            package_name: pkg?.name || selectedPackage,
            vehicle_size: vehicleSize,
            estimated_value_mxn: currentPrice,
            metadata: {
                step_label: stepLabels[step] || `step_${step}`,
                package_id: selectedPackage,
                service_date: serviceDate || null,
            },
        });
    }, [step]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const payload = {
                packageId: selectedPackage,
                vehicleSize,
                serviceDate,
                customerName,
                customerEmail,
                customerPhone,
                address: `${addressCalle}, CP: ${addressCP}, Tipo: ${addressTipo}`,
                vehicleBrand, vehicleModel, vehicleYear, vehicleColor,
                needsFactura,
                rfc: needsFactura ? rfc : "",
                razonSocial: needsFactura ? razonSocial : "",
                facturaRegimen: needsFactura ? facturaRegimen : "",
                facturaCP: needsFactura ? facturaCP : "",
                facturaEmail: needsFactura ? facturaEmail : "",
                facturaUsoCFDI: needsFactura ? facturaUsoCFDI : "",
            };

            // Track checkout initiation in Supabase UX table
            trackDrFoamEvent({
                event_name: "checkout_initiated",
                event_category: "conversion_booking",
                booking_step: 4,
                element_id: "reservar_step4_pagar",
                element_text: `Pagar ${currentPrice.toLocaleString("es-MX")} MXN`,
                package_name: pkg?.name || selectedPackage,
                vehicle_size: vehicleSize,
                estimated_value_mxn: currentPrice,
                metadata: {
                    package_id: selectedPackage,
                    service_date: serviceDate,
                    postal_code: addressCP,
                    address_type: addressTipo,
                    vehicle_brand: vehicleBrand,
                    vehicle_model: vehicleModel,
                    needs_factura: needsFactura,
                },
            });

            // 1. Guardar mensaje para WhatsApp en localStorage
            const waMessage = `¡Hola! Acabo de pagar mi reserva en Doctor Foam.
Detalles:
- Cliente: ${customerName}
- Teléfono: ${customerPhone}
- Vehículo: ${vehicleBrand} ${vehicleModel} ${vehicleYear} (${vehicleColor})
- Dirección: ${addressCalle}, CP: ${addressCP}
- Fecha: ${serviceDate}
- Paquete: ${selectedPackage}`;
            
            localStorage.setItem("waMessage", waMessage);
            localStorage.setItem("bookingPayload", JSON.stringify(payload));

            // 2. Crear sesión de pago en Stripe (sin Prisma)
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                setError(data.error || "Error al procesar el pago");
                setLoading(false);
            }
        } catch {
            setError("Error de conexión. Inténtalo de nuevo.");
            setLoading(false);
        }
    };

    /* Step indicator */
    const steps = [
        { num: 1, label: "Servicio" },
        { num: 2, label: "Fecha" },
        { num: 3, label: "Datos" },
        { num: 4, label: "Confirmar" },
    ];

    if (success || step === 5) {
        return (
            <div className="glass-card" style={{ padding: "4rem 2rem", textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
                <div style={{ width: "80px", height: "80px", background: "rgba(16, 185, 129, 0.1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                </div>
                <h2 style={{ fontSize: "1.8rem", color: "#0f172a", marginBottom: "1rem" }}>¡Solicitud Enviada!</h2>
                <p style={{ color: "#475569", fontSize: "1.1rem", lineHeight: "1.6", marginBottom: "2rem" }}>
                    Hemos recibido tus datos correctamente. Nuestro equipo se pondrá en contacto contigo muy pronto para confirmar los detalles de tu cita.
                    Se ha enviado una copia a tu correo electrónico.
                </p>
                <Link href="/" className="btn-premium" style={{ display: "inline-block" }}>
                    Volver al Inicio
                </Link>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            {/* Step Indicator */}
            <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginBottom: "2rem" }}>
                {steps.map((s) => (
                    <button
                        key={s.num}
                        type="button"
                        onClick={() => {
                            if (s.num < step) {
                                setError("");
                                setStep(s.num);
                            }
                        }}
                        style={{
                            display: "flex", alignItems: "center", gap: "0.4rem",
                            background: step === s.num ? "rgba(37, 99, 235, 0.1)" : step > s.num ? "rgba(16, 185, 129, 0.08)" : "#f1f5f9",
                            border: step === s.num ? "1.5px solid #2563eb" : step > s.num ? "1.5px solid #10b981" : "1.5px solid #e2e8f0",
                            borderRadius: "2rem", padding: "0.5rem 1rem",
                            color: step === s.num ? "#2563eb" : step > s.num ? "#10b981" : "#475569",
                            fontSize: "0.8rem", fontWeight: 600, cursor: s.num < step ? "pointer" : "default",
                            fontFamily: "var(--font-heading)",
                            transition: "all 0.3s ease",
                        }}
                    >
                        {step > s.num ? "✓" : s.num}
                        <span style={{ display: "inline" }}>{s.label}</span>
                    </button>
                ))}
            </div>

            {cancelled && (
                <div style={{ background: "rgba(239, 68, 68, 0.06)", border: "1px solid rgba(239, 68, 68, 0.2)", borderRadius: "0.75rem", padding: "1rem 1.5rem", marginBottom: "2rem", color: "#dc2626", fontSize: "0.9rem" }}>
                    El pago fue cancelado. Puedes intentar de nuevo o escribirnos por WhatsApp para asistirte.
                </div>
            )}
            {error && (
                <div style={{ background: "rgba(239, 68, 68, 0.06)", border: "1px solid rgba(239, 68, 68, 0.2)", borderRadius: "0.75rem", padding: "1rem 1.5rem", marginBottom: "2rem", color: "#dc2626", fontSize: "0.9rem" }}>
                    {error}
                </div>
            )}

            {/* ─── STEP 1: Package + Vehicle Size ─── */}
            {step === 1 && (
                <div className="glass-card" style={{ padding: "1.5rem" }}>
                    {/* Above-the-Fold Quick Action Bar for Mobile & Brochure Referrals */}
                    <div
                        style={{
                            padding: "1.1rem 1.25rem",
                            borderRadius: "0.85rem",
                            background: "linear-gradient(135deg, rgba(37,99,235,0.08), rgba(16,185,129,0.06))",
                            border: "2px solid rgba(37,99,235,0.25)",
                            marginBottom: "1.5rem",
                        }}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.75rem" }}>
                            <div>
                                <span style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#2563eb", display: "block" }}>
                                    ✓ Paquete seleccionado
                                </span>
                                <strong style={{ fontSize: "1.15rem", color: "#0f172a", fontFamily: "var(--font-heading)" }}>
                                    {pkg?.name || "Signature Detail"}
                                </strong>
                            </div>
                            <div style={{ textAlign: "right" }}>
                                <span className="gradient-text" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.45rem" }}>
                                    ${currentPrice.toLocaleString("es-MX")} MXN
                                </span>
                                <span style={{ display: "block", fontSize: "0.72rem", color: "#64748b" }}>
                                    IVA incluido · {vehicleSizes.find((v) => v.value === vehicleSize)?.label}
                                </span>
                            </div>
                        </div>

                        {/* Quick Vehicle Size Toggle Pills Above the Fold */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginBottom: "0.85rem" }}>
                            {vehicleSizes.map((v) => (
                                <button
                                    key={`quick-${v.value}`}
                                    type="button"
                                    onClick={() => setVehicleSize(v.value)}
                                    style={{
                                        padding: "0.5rem 0.65rem",
                                        borderRadius: "0.5rem",
                                        border: vehicleSize === v.value ? "2px solid #2563eb" : "1px solid #cbd5e1",
                                        background: vehicleSize === v.value ? "#ffffff" : "rgba(255,255,255,0.65)",
                                        color: vehicleSize === v.value ? "#1e40af" : "#475569",
                                        fontWeight: vehicleSize === v.value ? 700 : 500,
                                        fontSize: "0.78rem",
                                        cursor: "pointer",
                                    }}
                                >
                                    {v.label} {v.coefficient > 1 ? "(+15%)" : "(Base)"}
                                </button>
                            ))}
                        </div>

                        {/* Immediate 1-Tap Action Buttons Above the Fold */}
                        <div style={{ display: "grid", gap: "0.55rem" }}>
                            <button
                                type="button"
                                onClick={() => {
                                    setError("");
                                    setStep(2);
                                }}
                                className="btn-premium"
                                style={{ width: "100%", justifyContent: "center", padding: "0.8rem 1.25rem", fontSize: "0.92rem" }}
                            >
                                📅 Elegir fecha y pagar en línea (${currentPrice.toLocaleString("es-MX")} MXN) →
                            </button>
                            <a
                                href={`https://wa.me/525610846022?text=${encodeURIComponent(
                                    `Hola Doctor Foam, quiero agendar el paquete ${pkg?.name || selectedPackage} (${vehicleSizes.find((v) => v.value === vehicleSize)?.label || vehicleSize} — $${currentPrice.toLocaleString("es-MX")} MXN) a domicilio.`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-cta-location="reservar_step1_top_whatsapp"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "100%",
                                    padding: "0.7rem 1.15rem",
                                    borderRadius: "9999px",
                                    fontSize: "0.86rem",
                                    fontWeight: 700,
                                    color: "#15803d",
                                    background: "#f0fdf4",
                                    border: "1.5px solid #86efac",
                                    textDecoration: "none",
                                }}
                            >
                                💬 Agendar {pkg?.name || "este servicio"} (${currentPrice.toLocaleString("es-MX")}) por WhatsApp
                            </a>
                        </div>
                    </div>

                    <h2 style={{ fontSize: "1.08rem", marginBottom: "0.9rem", color: "#0f172a" }}>1. O compara y cambia tu paquete:</h2>

                    <div style={{ display: "grid", gap: "0.75rem", marginBottom: "1.5rem" }}>
                        {Object.entries(packagesData).map(([key, p]) => {
                            const isSelected = selectedPackage === key;
                            const isHovered = hoveredPkg === key;
                            return (
                                <button
                                    key={key} type="button"
                                    onClick={() => setSelectedPackage(key)}
                                    onMouseEnter={() => setHoveredPkg(key)}
                                    onMouseLeave={() => setHoveredPkg(null)}
                                    style={{
                                        padding: "1.25rem 1.5rem", borderRadius: "0.75rem",
                                        border: isSelected ? "2px solid #2563eb" : "1.5px solid #e2e8f0",
                                        background: isSelected
                                            ? "linear-gradient(135deg, rgba(37,99,235,0.08), rgba(59,130,246,0.04))"
                                            : isHovered
                                                ? "#f8fafc"
                                                : "#ffffff",
                                        cursor: "pointer", textAlign: "left", color: "#0f172a",
                                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                        display: "flex", justifyContent: "space-between", alignItems: "center",
                                        transform: isSelected ? "scale(1.01)" : isHovered ? "translateY(-2px)" : "none",
                                        boxShadow: isSelected
                                            ? "0 4px 20px rgba(37,99,235,0.12)"
                                            : isHovered
                                                ? "0 4px 12px rgba(0,0,0,0.06)"
                                                : "0 1px 3px rgba(0,0,0,0.04)",
                                    }}
                                >
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                        {/* Selection indicator */}
                                        <div style={{
                                            width: "20px", height: "20px", borderRadius: "50%", flexShrink: 0,
                                            border: isSelected ? "none" : "2px solid #cbd5e1",
                                            background: isSelected ? "linear-gradient(135deg, #2563eb, #3b82f6)" : "transparent",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            transition: "all 0.3s ease",
                                        }}>
                                            {isSelected && (
                                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                                    <path d="M2 5L4.5 7.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            )}
                                        </div>
                                        <div>
                                            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "1rem", color: isSelected ? "#1e40af" : "#0f172a" }}>{p.name}</div>
                                            <div style={{ color: "#64748b", fontSize: "0.8rem", marginTop: "0.15rem" }}>{p.label}</div>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: "right" }}>
                                        {isMember && (
                                            <div style={{ color: "#ef4444", textDecoration: "line-through", fontSize: "0.85rem", fontWeight: 600, marginBottom: "-0.2rem" }}>
                                                ${p.priceBase.toLocaleString("es-MX")}
                                            </div>
                                        )}
                                        <div className="gradient-text" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.2rem", whiteSpace: "nowrap" }}>
                                            ${(isMember ? Math.round(p.priceBase * 0.9) : p.priceBase).toLocaleString("es-MX")}
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    <h3 style={{ fontSize: "1rem", marginBottom: "0.75rem", color: "#334155" }}>Tamaño del vehículo</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.5rem" }}>
                        {vehicleSizes.map((v) => (
                            <button
                                key={v.value} type="button" onClick={() => setVehicleSize(v.value)}
                                style={{
                                    padding: "1rem", borderRadius: "0.75rem",
                                    border: vehicleSize === v.value ? "2px solid #2563eb" : "1.5px solid #e2e8f0",
                                    background: vehicleSize === v.value ? "rgba(37, 99, 235, 0.06)" : "#ffffff",
                                    cursor: "pointer", color: "#0f172a", textAlign: "center",
                                    transition: "all 0.3s ease",
                                    boxShadow: vehicleSize === v.value ? "0 2px 12px rgba(37,99,235,0.1)" : "none",
                                }}
                            >
                                <div style={{ fontWeight: 600, fontSize: "0.9rem", color: vehicleSize === v.value ? "#1e40af" : "#0f172a" }}>{v.label}</div>
                                <div style={{ color: "#64748b", fontSize: "0.75rem", marginTop: "0.25rem" }}>
                                    {v.coefficient === 1.0 ? "Precio base" : `+${Math.round((v.coefficient - 1) * 100)}% sobre precio base`}
                                </div>
                            </button>
                        ))}
                    </div>

                    <div style={{ marginBottom: "1.25rem", padding: "0.85rem 1rem", borderRadius: "0.75rem", background: "linear-gradient(135deg, rgba(37,99,235,0.05), rgba(16,185,129,0.05))", border: "1px solid rgba(37,99,235,0.2)", fontSize: "0.8rem", color: "#334155", lineHeight: "1.55" }}>
                        🔄 <strong style={{ color: "#0f172a" }}>Beneficio Post-Servicio:</strong> Al realizar tu primer servicio de lavado profundo, desbloqueas nuestra <Link href="/membresia-doctor-foam" style={{ color: "#2563eb", fontWeight: 700, textDecoration: "underline" }}>Membresía de Seguimiento ($990/mes)</Link> con mantenimiento recurrente y <strong>10% de descuento permanente</strong> en todos tus futuros lavados especializados (ahorro de <strong>${Math.round(basePrice * 0.1).toLocaleString("es-MX")} MXN</strong> en este paquete).
                    </div>

                    <div style={{ display: "grid", gap: "0.65rem" }}>
                        <button
                            type="button" onClick={() => { setError(""); setStep(2); }}
                            className="btn-premium" style={{ width: "100%", justifyContent: "center" }}
                        >
                            Continuar → Elegir fecha (${currentPrice.toLocaleString("es-MX")} MXN)
                        </button>
                        <a
                            href={`https://wa.me/525610846022?text=${encodeURIComponent(
                                `Hola Doctor Foam, quiero agendar el paquete ${pkg?.name || selectedPackage} (${vehicleSizes.find((v) => v.value === vehicleSize)?.label || vehicleSize} — $${currentPrice.toLocaleString("es-MX")} MXN) a domicilio.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cta-location="reservar_step1_whatsapp"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "100%",
                                padding: "0.75rem 1.25rem",
                                borderRadius: "9999px",
                                fontSize: "0.88rem",
                                fontWeight: 700,
                                color: "#15803d",
                                background: "#f0fdf4",
                                border: "1.5px solid #bbf7d0",
                                textDecoration: "none",
                            }}
                        >
                            💬 Agendar {pkg?.name || "este servicio"} (${currentPrice.toLocaleString("es-MX")}) por WhatsApp
                        </a>
                    </div>
                </div>
            )}

            {/* ─── STEP 2: Calendar ─── */}
            {step === 2 && (
                <div className="glass-card" style={{ padding: "2rem" }}>
                    <h2 style={{ fontSize: "1.2rem", marginBottom: "0.5rem", color: "#0f172a" }}>2. Elige la fecha de tu servicio</h2>
                    <p style={{ color: "#64748b", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
                        Atendemos de lunes a sábado. Los días en rojo ya están reservados.
                    </p>
                    <Calendar selectedDate={serviceDate} onSelectDate={setServiceDate} />

                    {serviceDate && (
                        <div style={{ marginTop: "1.25rem", padding: "1rem", background: "rgba(37, 99, 235, 0.06)", borderRadius: "0.75rem", border: "1px solid rgba(37, 99, 235, 0.15)", textAlign: "center" }}>
                            <span style={{ color: "#64748b", fontSize: "0.85rem" }}>Fecha seleccionada: </span>
                            <span style={{ color: "#0f172a", fontWeight: 700 }}>
                                {new Date(serviceDate + "T12:00:00").toLocaleDateString("es-MX", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                            </span>
                        </div>
                    )}

                    <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
                        <button type="button" onClick={() => { setError(""); setStep(1); }} className="btn-outline" style={{ flex: 1 }}>
                            ← Atrás
                        </button>
                        <button
                            type="button" onClick={() => {
                                if (serviceDate) {
                                    setError("");
                                    setStep(3);
                                } else {
                                    setError("Por favor selecciona una fecha disponible en el calendario.");
                                }
                            }}
                            className="btn-premium" disabled={!serviceDate}
                            style={{ flex: 2, justifyContent: "center", opacity: serviceDate ? 1 : 0.5 }}
                        >
                            Continuar → Tus datos
                        </button>
                    </div>
                </div>
            )}

            {/* ─── STEP 3: Contact + Vehicle Details ─── */}
            {step === 3 && (
                <div>
                    <div className="glass-card" style={{ padding: "2rem", marginBottom: "1.5rem" }}>
                        <h2 style={{ fontSize: "1.2rem", marginBottom: "1.25rem", color: "#0f172a" }}>3. Tus datos de contacto</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                            <div style={{ gridColumn: "span 2" }}>
                                <label style={labelStyle}>Nombre completo *</label>
                                <input type="text" placeholder="Tu nombre" value={customerName} onChange={(e) => setCustomerName(e.target.value)} style={inputStyle} required />
                            </div>
                            <div style={{ gridColumn: "span 2" }}>
                                <label style={labelStyle}>Email *</label>
                                <input type="email" placeholder="Tu correo electrónico" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} style={inputStyle} required />
                            </div>
                            <div style={{ gridColumn: "span 2" }}>
                                <label style={labelStyle}>WhatsApp *</label>
                                <input type="tel" placeholder="55 1234 5678" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} style={inputStyle} required />
                            </div>
                        </div>
                    </div>

                    <div className="glass-card" style={{ padding: "2rem", marginBottom: "1.5rem" }}>
                        <h2 style={{ fontSize: "1.2rem", marginBottom: "1.25rem", color: "#0f172a" }}>Datos del vehículo</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                            <div><label style={labelStyle}>Marca *</label><input type="text" placeholder="BMW, Mercedes..." value={vehicleBrand} onChange={(e) => setVehicleBrand(e.target.value)} style={inputStyle} required /></div>
                            <div><label style={labelStyle}>Modelo *</label><input type="text" placeholder="X5, Clase C..." value={vehicleModel} onChange={(e) => setVehicleModel(e.target.value)} style={inputStyle} required /></div>
                            <div><label style={labelStyle}>Año *</label><input type="number" placeholder="2024" value={vehicleYear} onChange={(e) => setVehicleYear(e.target.value)} style={inputStyle} required min="2000" max="2027" /></div>
                            <div><label style={labelStyle}>Color *</label><input type="text" placeholder="Negro, Blanco..." value={vehicleColor} onChange={(e) => setVehicleColor(e.target.value)} style={inputStyle} required /></div>
                        </div>
                    </div>

                    <div className="glass-card" style={{ padding: "2rem", marginBottom: "1.5rem" }}>
                        <h2 style={{ fontSize: "1.2rem", marginBottom: "1.25rem", color: "#0f172a" }}>Dirección del servicio</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                            <div style={{ gridColumn: "span 2" }}>
                                <label style={labelStyle}>Calle y número *</label>
                                <input type="text" placeholder="Ej. Av. Chapultepec 123, Int 4" value={addressCalle} onChange={(e) => setAddressCalle(e.target.value)} style={inputStyle} required />
                            </div>
                            <div>
                                <label style={labelStyle}>Código Postal *</label>
                                <input type="text" placeholder="Ej. 11000" value={addressCP} onChange={(e) => setAddressCP(e.target.value)} style={inputStyle} required />
                            </div>
                            <div>
                                <label style={labelStyle}>Tipo de domicilio *</label>
                                <select value={addressTipo} onChange={(e) => setAddressTipo(e.target.value)} style={inputStyle} required>
                                    <option value="Casa">Casa</option>
                                    <option value="Trabajo">Trabajo</option>
                                    <option value="Otro">Otro</option>
                                </select>
                            </div>
                        </div>
                        <p style={{ color: "#64748b", fontSize: "0.8rem", marginTop: "1rem", fontStyle: "italic" }}>
                            (Podrás administrar tus direcciones en &quot;Mi Cuenta&quot; después de reservar)
                        </p>
                    </div>

                    <div className="glass-card" style={{ padding: "2rem", marginBottom: "1.5rem" }}>
                        <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem", color: "#0f172a" }}>Facturación</h2>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                            <input type="checkbox" id="needsFactura" checked={needsFactura} onChange={(e) => setNeedsFactura(e.target.checked)} style={{ width: "1.25rem", height: "1.25rem", accentColor: "#2563eb" }} />
                            <label htmlFor="needsFactura" style={{ color: "#334155", fontSize: "0.95rem", cursor: "pointer" }}>Requiero factura (CFDI)</label>
                        </div>
                        {needsFactura && (
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                                <div><label style={labelStyle}>RFC *</label><input type="text" placeholder="XAXX010101000" value={rfc} onChange={(e) => setRfc(e.target.value.toUpperCase())} style={inputStyle} required={needsFactura} maxLength={13} /></div>
                                <div><label style={labelStyle}>Razón Social *</label><input type="text" placeholder="Nombre o Razón Social" value={razonSocial} onChange={(e) => setRazonSocial(e.target.value)} style={inputStyle} required={needsFactura} /></div>
                                <div><label style={labelStyle}>Régimen Fiscal *</label><input type="text" placeholder="Ej. 601 General de Ley..." value={facturaRegimen} onChange={(e) => setFacturaRegimen(e.target.value)} style={inputStyle} required={needsFactura} /></div>
                                <div><label style={labelStyle}>Código Postal (Fiscal) *</label><input type="text" placeholder="11000" value={facturaCP} onChange={(e) => setFacturaCP(e.target.value)} style={inputStyle} required={needsFactura} /></div>
                                <div style={{ gridColumn: "span 2" }}><label style={labelStyle}>Email para Factura *</label><input type="email" placeholder="facturacion@empresa.com" value={facturaEmail} onChange={(e) => setFacturaEmail(e.target.value)} style={inputStyle} required={needsFactura} /></div>
                                <div style={{ gridColumn: "span 2" }}>
                                    <label style={labelStyle}>Uso de CFDI *</label>
                                    <select value={facturaUsoCFDI} onChange={(e) => setFacturaUsoCFDI(e.target.value)} style={inputStyle} required={needsFactura}>
                                        <option value="G01">G01 - Adquisición de mercancías</option>
                                        <option value="G03">G03 - Gastos en general</option>
                                        <option value="P01">P01 - Por definir</option>
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>

                    <div style={{ display: "flex", gap: "1rem" }}>
                        <button type="button" onClick={() => { setError(""); setStep(2); }} className="btn-outline" style={{ flex: 1 }}>← Atrás</button>
                        <button
                            type="button"
                            onClick={() => {
                                const baseValid = customerName && customerEmail && customerPhone && vehicleBrand && vehicleModel && addressCalle && addressCP && vehicleYear && vehicleColor;
                                const facturaValid = !needsFactura || (rfc && razonSocial && facturaRegimen && facturaCP && facturaEmail && facturaUsoCFDI);
                                if (baseValid && facturaValid) {
                                    setError("");
                                    setStep(4);
                                } else {
                                    setError("Por favor completa todos los campos obligatorios (*) para continuar al resumen.");
                                }
                            }}
                            className="btn-premium" style={{ flex: 2, justifyContent: "center" }}
                        >
                            Continuar → Resumen
                        </button>
                    </div>
                </div>
            )}

            {/* ─── STEP 4: Summary + Pay ─── */}
            {step === 4 && pkg && (
                <div className="glass-card" style={{ padding: "2rem", borderColor: "rgba(37, 99, 235, 0.15)" }}>
                    <h2 style={{ fontSize: "1.2rem", marginBottom: "1.5rem", color: "#0f172a" }}>Resumen de tu reserva</h2>

                    <div style={{ display: "grid", gap: "0.75rem", marginBottom: "1.5rem" }}>
                        {[
                            { label: "Servicio", value: pkg.name },
                            { label: "Vehículo", value: `${vehicleBrand} ${vehicleModel} ${vehicleYear} (${vehicleColor})` },
                            { label: "Tamaño", value: vehicleSizes.find((v) => v.value === vehicleSize)?.label || "" },
                            { label: "Fecha", value: serviceDate ? new Date(serviceDate + "T12:00:00").toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) : "" },
                            { label: "Dirección", value: `${addressCalle}, CP: ${addressCP} (${addressTipo})` },
                            { label: "Contacto", value: `${customerName} · ${customerPhone}` },
                            ...(needsFactura ? [{ label: "Facturación", value: `Solicitada (${rfc})` }] : []),
                        ].map((item) => (
                            <div key={item.label} style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid #f1f5f9" }}>
                                <span style={{ color: "#64748b", fontSize: "0.85rem" }}>{item.label}</span>
                                <span style={{ color: "#0f172a", fontSize: "0.9rem", fontWeight: 500, textAlign: "right", maxWidth: "60%" }}>{item.value}</span>
                            </div>
                        ))}
                    </div>

                    {isMember && (
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 1.25rem", background: "#fef2f2", borderRadius: "0.75rem", marginBottom: "0.75rem", border: "1px solid #fecaca" }}>
                            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "#ef4444", fontSize: "0.95rem" }}>Beneficio Miembro (10% Desc.)</span>
                            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "#ef4444", fontSize: "1.1rem" }}>
                                -${(basePrice - currentPrice).toLocaleString("es-MX")} MXN
                            </span>
                        </div>
                    )}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 1.25rem", background: "rgba(37, 99, 235, 0.06)", borderRadius: "0.75rem", marginBottom: "1.5rem", border: "1px solid rgba(37,99,235,0.1)" }}>
                        <div>
                            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "#0f172a", fontSize: "1.1rem" }}>Total (IVA incluido)</span>
                            {isMember && (
                                <div style={{ color: "#475569", fontSize: "0.8rem", textDecoration: "line-through", marginTop: "0.2rem" }}>
                                    De: ${basePrice.toLocaleString("es-MX")}
                                </div>
                            )}
                        </div>
                        <span className="gradient-text" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.5rem" }}>
                            ${currentPrice.toLocaleString("es-MX")} MXN
                        </span>
                    </div>

                    <ul style={{ listStyle: "none", margin: "0 0 1.5rem", padding: 0, color: "#475569", fontSize: "0.85rem" }}>
                        {pkg.features.map((f, i) => (
                            <li key={i} style={{ paddingBlock: "0.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <span style={{ color: "#10b981" }}>✓</span> {f}
                            </li>
                        ))}
                    </ul>
                    <button type="submit" className="btn-premium" disabled={loading} style={{ width: "100%", justifyContent: "center", fontSize: "1.1rem", padding: "1.1rem 2rem", opacity: loading ? 0.6 : 1, cursor: loading ? "not-allowed" : "pointer" }}>
                        {loading ? "Procesando..." : `🔒 Pagar $${currentPrice.toLocaleString("es-MX")} MXN`}
                    </button>

                    <p style={{ color: "#475569", fontSize: "0.8rem", textAlign: "center", marginTop: "1rem" }}>
                        Pago seguro procesado por Stripe. Una vez confirmado, tu servicio queda agendado para la fecha seleccionada.
                    </p>
                    <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                        <button type="button" onClick={() => setStep(3)} className="btn-outline" style={{ flex: 1 }}>← Modificar datos</button>
                    </div>
                </div>
            )}

            {/* Chat / WhatsApp Help */}
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
                <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "0.75rem" }}>¿Tienes dudas o prefieres agendar por mensaje?</p>
                <a
                    href={`https://wa.me/525610846022?text=${encodeURIComponent(`Hola Doctor Foam, estoy en la página de reservas viendo el paquete ${pkg?.name || selectedPackage} y tengo una duda.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cta-location="reservar_ayuda_whatsapp"
                    className="btn-outline"
                    style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
                >
                    💬 Escríbenos por WhatsApp
                </a>
            </div>
        </form>
    );
}

/* ─── Styles ─── */
const labelStyle: React.CSSProperties = {
    display: "block", fontFamily: "var(--font-heading)", fontSize: "0.85rem",
    fontWeight: 600, color: "#334155", marginBottom: "0.4rem",
};

const inputStyle: React.CSSProperties = {
    width: "100%", padding: "0.75rem 1rem", borderRadius: "0.5rem",
    border: "1.5px solid #e2e8f0", background: "#ffffff",
    color: "#0f172a", fontSize: "0.95rem", fontFamily: "var(--font-body)", outline: "none",
    transition: "border-color 0.2s ease",
};

/* ─── Main Page ─── */
export default function ReservarPage() {
    return (
        <>
            <nav className="navbar navbar-scrolled">
                <div className="navbar-inner">
                    <Link href="/" style={{ textDecoration: "none" }}>
                        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.3rem" }}>
                            <span style={{ color: "#0f172a" }}>DOCTOR</span>{" "}
                            <span className="gradient-text">FOAM</span>
                        </span>
                    </Link>
                    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
                        <a
                            href="https://wa.me/525610846022?text=Hola%20Doctor%20Foam%2C%20estoy%20en%20la%20p%C3%A1gina%20de%20reservas%20y%20quiero%20agendar%20por%20WhatsApp"
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cta-location="reservar_nav_whatsapp"
                            className="btn-outline"
                            style={{ padding: "0.45rem 0.95rem", fontSize: "0.8rem" }}
                        >
                            💬 Agendar por WhatsApp
                        </a>
                        <Link href="/" style={{ color: "#475569", textDecoration: "none", fontSize: "0.9rem", fontFamily: "var(--font-heading)", fontWeight: 600 }}>
                            ← Inicio
                        </Link>
                    </div>
                </div>
            </nav>

            <main style={{ paddingTop: "6rem" }}>
                <section className="section-padding">
                    <div className="container" style={{ maxWidth: "900px" }}>
                        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                            <span className="section-label">Cotizador y Agenda en Línea · CDMX y EdoMex</span>
                            <h1 className="section-title" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}>
                                Agenda tu servicio de{" "}
                                <span className="gradient-text">lavado profundo o detallado a domicilio</span>
                            </h1>
                            <p className="section-subtitle" style={{ maxWidth: "650px" }}>
                                Cotiza al instante según el tamaño de tu auto y agenda en línea con pago seguro o directamente por WhatsApp. Unidad móvil 100% autónoma.
                            </p>
                        </div>

                        <Suspense fallback={<div style={{ textAlign: "center", padding: "2rem", color: "#475569" }}>Cargando...</div>}>
                            <BookingForm />
                        </Suspense>
                    </div>
                </section>

                {/* SSR Preguntas Frecuentes sobre Reservas, Precios y Membresía */}
                <section className="section-padding" style={{ paddingTop: 0 }}>
                    <div className="container" style={{ maxWidth: "900px" }}>
                        <h2 style={{ fontSize: "1.3rem", marginBottom: "1rem", color: "#0f172a", textAlign: "center" }}>
                            Preguntas Frecuentes sobre Reservas y Precios a Domicilio
                        </h2>
                        <div style={{ display: "grid", gap: "0.85rem" }}>
                            {[
                                {
                                    q: "¿Cómo funciona la reserva de lavado de vestiduras y detallado a domicilio en CDMX?",
                                    a: "Elige tu paquete (Industrial Deep Interior $2,499 MXN, Signature Detail $7,449 MXN, Ceramic Coating 9H $11,999 MXN o Foam Maintenance $1,800 MXN), selecciona el tamaño de tu vehículo y agenda en línea con tarjeta o directamente por WhatsApp. Llegamos con unidad 100% autónoma (agua purificada y luz propia) a tu casa u oficina.",
                                },
                                {
                                    q: "¿Cuánto cuesta el lavado de vestiduras de auto cerca de mí a domicilio en CDMX?",
                                    a: "Nuestro paquete Industrial Deep Interior cuesta $2,499 MXN para sedán o SUV de 2 filas y $2,874 MXN para Pick Up o SUV de 3 filas (IVA incluido). Incluye lavado de asientos, alfombra y cielo con vapor seco a 180°C, desinfección de ductos de A/C y sanitización con ozono médico sin cargo por traslado en CDMX y Zona Esmeralda.",
                                },
                                {
                                    q: "¿Cómo activo la Membresía Doctor Foam ($990/mes) y el 10% de descuento permanente?",
                                    a: "Para empezar a operar la Membresía Doctor Foam ($990 MXN/mes sedán o $1,160 MXN/mes SUV), primero se contrata un servicio de lavado profundo inicial. La membresía está diseñada para darle seguimiento preventivo continuo a ese primer servicio y te otorga un 10% de descuento permanente en todos los lavados más especializados.",
                                },
                                {
                                    q: "¿Puedo facturar (CFDI) mi servicio de detallado automotriz en Doctor Foam?",
                                    a: "Sí. Todos nuestros precios incluyen IVA y en el paso 3 de tu reserva puedes activar la casilla de facturación CFDI para recibir tu factura fiscal automáticamente.",
                                },
                            ].map((item, idx) => (
                                <div key={idx} className="glass-card" style={{ padding: "1.15rem 1.35rem" }}>
                                    <h3 style={{ fontSize: "0.95rem", color: "#0f172a", marginBottom: "0.4rem" }}>
                                        {item.q}
                                    </h3>
                                    <p style={{ color: "#475569", fontSize: "0.88rem", lineHeight: 1.65, margin: 0 }}>
                                        {item.a}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Zonas de Cobertura Hub */}
                <section className="section-padding" style={{ paddingTop: 0 }}>
                    <div className="container" style={{ maxWidth: "900px", textAlign: "center" }}>
                        <h3 style={{ fontSize: "1.05rem", marginBottom: "0.75rem", color: "#0f172a" }}>
                            Zonas de Servicio a Domicilio sin Cargo por Traslado
                        </h3>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center" }}>
                            {[
                                { slug: "polanco", label: "Polanco" },
                                { slug: "lomas-de-chapultepec", label: "Lomas de Chapultepec" },
                                { slug: "santa-fe", label: "Santa Fe" },
                                { slug: "bosques-de-las-lomas", label: "Bosques de las Lomas" },
                                { slug: "pedregal", label: "Pedregal y San Ángel" },
                                { slug: "interlomas", label: "Interlomas" },
                                { slug: "huixquilucan", label: "Huixquilucan" },
                                { slug: "coyoacan", label: "Coyoacán" },
                            ].map((z) => (
                                <Link
                                    key={z.slug}
                                    href={`/zonas/${z.slug}`}
                                    className="zone-tag zone-tag-blue"
                                    style={{ textDecoration: "none", fontSize: "0.8rem", padding: "0.35rem 0.8rem" }}
                                >
                                    📍 {z.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <footer className="footer">
                <div className="footer-bottom" style={{ borderTop: "none", marginTop: 0 }}>
                    <p>&copy; {new Date().getFullYear()} Doctor Foam México. Todos los derechos reservados.</p>
                    <p style={{ marginTop: "0.5rem" }}>
                        <Link href="/" style={{ color: "#64748b", textDecoration: "underline" }}>Inicio</Link>{" · "}
                        <Link href="/lavado-recurrente-autos-domicilio" style={{ color: "#64748b", textDecoration: "underline" }}>Lavado Recurrente</Link>{" · "}
                        <Link href="/lavado-profundo-vehiculos-cdmx" style={{ color: "#64748b", textDecoration: "underline" }}>Lavado Profundo</Link>{" · "}
                        <Link href="/lavado-autos-estacionamiento-corporativo" style={{ color: "#64748b", textDecoration: "underline" }}>Estacionamiento Corporativo</Link>{" · "}
                        <Link href="/membresia-doctor-foam" style={{ color: "#64748b", textDecoration: "underline" }}>Membresía</Link>{" · "}
                        <Link href="/blog" style={{ color: "#64748b", textDecoration: "underline" }}>Blog</Link>{" · "}
                        <a href="/brochure-doctor-foam.pdf" download="Brochure-Corporativo-Doctor-Foam-2026.pdf" target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb", fontWeight: 700, textDecoration: "underline" }}>📄 Descargar Brochure PDF</a>
                    </p>
                </div>
            </footer>
        </>
    );
}
