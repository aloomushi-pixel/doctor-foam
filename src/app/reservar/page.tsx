"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PACKAGES, VEHICLE_SIZES, PREMIUM_ZONES, calculatePrice } from "@/lib/packages";

/* ─── Re-export for component use (aligned shapes) ─── */
const packagesData = Object.fromEntries(
    Object.entries(PACKAGES)
        .filter(([, v]) => !v.isSubscription) // membership handled separately
        .map(([k, v]) => [k, { name: v.name, priceBase: v.priceBase, label: v.label, features: v.features }])
);

const vehicleSizes = VEHICLE_SIZES;

const premiumZones = PREMIUM_ZONES;

/* ─── Main Booking Form ─── */
function BookingForm() {
    const searchParams = useSearchParams();
    const [step, setStep] = useState(1);
    const [selectedPackage, setSelectedPackage] = useState(searchParams.get("paquete") || "signature-detail");
    const [vehicleSize, setVehicleSize] = useState("sedan-2filas");
    const [serviceDate, setServiceDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const cancelled = searchParams.get("cancelled");
    const [hoveredPkg, setHoveredPkg] = useState<string | null>(null);

    /* Form fields — pre-fill from query params if available */
    const [customerName, setCustomerName] = useState(searchParams.get("nombre") || "");
    const [customerEmail, setCustomerEmail] = useState(searchParams.get("email") || "");
    const [customerPhone, setCustomerPhone] = useState(searchParams.get("telefono") || "");
    const [address, setAddress] = useState(searchParams.get("direccion") || "");
    const [postalCode, setPostalCode] = useState("");
    const [vehicleBrand, setVehicleBrand] = useState("");
    const [vehicleModel, setVehicleModel] = useState("");
    const [vehicleYear, setVehicleYear] = useState("");
    const [vehicleColor, setVehicleColor] = useState("");
    const [isBlackColor, setIsBlackColor] = useState(false);
    const [needsFactura, setNeedsFactura] = useState(false);
    const [rfc, setRfc] = useState("");
    const [razonSocial, setRazonSocial] = useState("");

    const pkg = packagesData[selectedPackage];
    const currentPrice = pkg ? calculatePrice(selectedPackage, vehicleSize, isBlackColor) / 100 : 0;

    // Get min date (tomorrow)
    const getMinDate = () => {
        const d = new Date();
        d.setDate(d.getDate() + 1);
        return d.toISOString().split("T")[0];
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    packageId: selectedPackage,
                    vehicleSize,
                    isBlackColor,
                    serviceDate,
                    customerName,
                    customerEmail,
                    customerPhone,
                    address: postalCode ? `${address}, C.P. ${postalCode}` : address,
                    vehicleBrand, vehicleModel, vehicleYear, vehicleColor,
                    rfc: needsFactura ? rfc : "",
                    razonSocial: needsFactura ? razonSocial : "",
                    needsFactura,
                }),
            });

            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                setError(data.error || "Error al procesar la reserva");
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

    return (
        <form onSubmit={handleSubmit}>
            {/* Step Indicator */}
            <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginBottom: "2rem" }}>
                {steps.map((s) => (
                    <button
                        key={s.num}
                        type="button"
                        onClick={() => s.num < step && setStep(s.num)}
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
                    El pago fue cancelado. Puedes intentar de nuevo.
                </div>
            )}
            {error && (
                <div style={{ background: "rgba(239, 68, 68, 0.06)", border: "1px solid rgba(239, 68, 68, 0.2)", borderRadius: "0.75rem", padding: "1rem 1.5rem", marginBottom: "2rem", color: "#dc2626", fontSize: "0.9rem" }}>
                    {error}
                </div>
            )}

            {/* ─── STEP 1: Package + Vehicle Size ─── */}
            {step === 1 && (
                <div className="glass-card" style={{ padding: "2rem" }}>
                    <h2 style={{ fontSize: "1.2rem", marginBottom: "1.25rem", color: "#0f172a" }}>1. Selecciona tu servicio</h2>

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
                                    <div className="gradient-text" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.2rem", whiteSpace: "nowrap" }}>
                                        ${(calculatePrice(key, vehicleSize, isBlackColor) / 100).toLocaleString("es-MX")}
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

                    <h3 style={{ fontSize: "1rem", marginBottom: "0.75rem", color: "#334155" }}>Pintura del vehículo</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.5rem" }}>
                        <button
                            type="button" onClick={() => setIsBlackColor(false)}
                            style={{
                                padding: "1rem", borderRadius: "0.75rem",
                                border: !isBlackColor ? "2px solid #2563eb" : "1.5px solid #e2e8f0",
                                background: !isBlackColor ? "rgba(37, 99, 235, 0.06)" : "#ffffff",
                                cursor: "pointer", color: "#0f172a", textAlign: "center",
                                transition: "all 0.3s ease",
                                boxShadow: !isBlackColor ? "0 2px 12px rgba(37,99,235,0.1)" : "none",
                            }}
                        >
                            <div style={{ fontWeight: 600, fontSize: "0.9rem", color: !isBlackColor ? "#1e40af" : "#0f172a" }}>Cualquier otro color</div>
                            <div style={{ color: "#64748b", fontSize: "0.75rem", marginTop: "0.25rem" }}>Precio sin recargo extra</div>
                        </button>
                        <button
                            type="button" onClick={() => setIsBlackColor(true)}
                            style={{
                                padding: "1rem", borderRadius: "0.75rem",
                                border: isBlackColor ? "2px solid #2563eb" : "1.5px solid #e2e8f0",
                                background: isBlackColor ? "rgba(37, 99, 235, 0.06)" : "#ffffff",
                                cursor: "pointer", color: "#0f172a", textAlign: "center",
                                transition: "all 0.3s ease",
                                boxShadow: isBlackColor ? "0 2px 12px rgba(37,99,235,0.1)" : "none",
                            }}
                        >
                            <div style={{ fontWeight: 600, fontSize: "0.9rem", color: isBlackColor ? "#1e40af" : "#0f172a" }}>Color Negro</div>
                            <div style={{ color: "#64748b", fontSize: "0.75rem", marginTop: "0.25rem" }}>Requiere extra descontaminación</div>
                        </button>
                    </div>

                    <button
                        type="button" onClick={() => setStep(2)}
                        className="btn-premium" style={{ width: "100%", justifyContent: "center" }}
                    >
                        Continuar → Elegir fecha
                    </button>
                </div>
            )}

            {/* ─── STEP 2: Date picker (free input) ─── */}
            {step === 2 && (
                <div className="glass-card" style={{ padding: "2rem" }}>
                    <h2 style={{ fontSize: "1.2rem", marginBottom: "0.5rem", color: "#0f172a" }}>2. Elige la fecha de tu servicio</h2>
                    <p style={{ color: "#64748b", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
                        Selecciona la fecha en que te gustaría recibir el servicio. Atendemos de lunes a sábado.
                    </p>

                    <div style={{ marginBottom: "1.5rem" }}>
                        <label style={{
                            display: "block", fontFamily: "var(--font-heading)", fontSize: "0.85rem",
                            fontWeight: 600, color: "#334155", marginBottom: "0.5rem",
                        }}>
                            Fecha deseada *
                        </label>
                        <input
                            type="date"
                            value={serviceDate}
                            onChange={(e) => setServiceDate(e.target.value)}
                            min={getMinDate()}
                            required
                            style={{
                                width: "100%", padding: "0.85rem 1rem", borderRadius: "0.75rem",
                                border: serviceDate ? "2px solid #2563eb" : "1.5px solid #e2e8f0",
                                background: serviceDate ? "rgba(37, 99, 235, 0.04)" : "#ffffff",
                                color: "#0f172a", fontSize: "1rem", fontFamily: "var(--font-body)",
                                outline: "none", transition: "all 0.2s ease",
                                cursor: "pointer",
                            }}
                        />
                    </div>

                    {serviceDate && (
                        <div style={{ marginBottom: "1.5rem", padding: "1rem", background: "rgba(37, 99, 235, 0.06)", borderRadius: "0.75rem", border: "1px solid rgba(37, 99, 235, 0.15)", textAlign: "center" }}>
                            <span style={{ color: "#64748b", fontSize: "0.85rem" }}>Fecha seleccionada: </span>
                            <span style={{ color: "#0f172a", fontWeight: 700 }}>
                                {new Date(serviceDate + "T12:00:00").toLocaleDateString("es-MX", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                            </span>
                        </div>
                    )}

                    <div style={{ background: "rgba(251, 191, 36, 0.06)", borderRadius: "0.75rem", padding: "0.75rem 1rem", marginBottom: "1.5rem", border: "1px solid rgba(251, 191, 36, 0.15)" }}>
                        <p style={{ color: "#92400e", fontSize: "0.8rem", margin: 0 }}>
                            💡 Después de tu pago, un asesor te contactará por WhatsApp para confirmar horario y disponibilidad.
                        </p>
                    </div>

                    <div style={{ display: "flex", gap: "1rem" }}>
                        <button type="button" onClick={() => setStep(1)} className="btn-outline" style={{ flex: 1 }}>
                            ← Atrás
                        </button>
                        <button
                            type="button" onClick={() => serviceDate && setStep(3)}
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
                            <div>
                                <label style={labelStyle}>Email <span style={{ color: "#475569", fontWeight: 400 }}>(opcional)</span></label>
                                <input type="email" placeholder="tu@email.com" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} style={inputStyle} />
                            </div>
                            <div>
                                <label style={labelStyle}>WhatsApp *</label>
                                <input type="tel" placeholder="55 1234 5678" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} style={inputStyle} required />
                            </div>
                        </div>
                    </div>

                    <div className="glass-card" style={{ padding: "2rem", marginBottom: "1.5rem" }}>
                        <h2 style={{ fontSize: "1.2rem", marginBottom: "0.5rem", color: "#0f172a" }}>Datos del vehículo <span style={{ color: "#475569", fontSize: "0.85rem", fontWeight: 400 }}>(opcional)</span></h2>
                        <p style={{ color: "#64748b", fontSize: "0.8rem", marginBottom: "1.25rem" }}>Si los tienes a la mano, ayúdanos con estos datos.</p>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                            <div><label style={labelStyle}>Marca</label><input type="text" placeholder="BMW, Mercedes..." value={vehicleBrand} onChange={(e) => setVehicleBrand(e.target.value)} style={inputStyle} /></div>
                            <div><label style={labelStyle}>Modelo</label><input type="text" placeholder="X5, Clase C..." value={vehicleModel} onChange={(e) => setVehicleModel(e.target.value)} style={inputStyle} /></div>
                            <div><label style={labelStyle}>Año</label><input type="number" placeholder="2024" value={vehicleYear} onChange={(e) => setVehicleYear(e.target.value)} style={inputStyle} min="2000" max="2027" /></div>
                            <div><label style={labelStyle}>Color</label><input type="text" placeholder="Negro, Blanco..." value={vehicleColor} onChange={(e) => setVehicleColor(e.target.value)} style={inputStyle} /></div>
                        </div>
                    </div>

                    <div className="glass-card" style={{ padding: "2rem", marginBottom: "1.5rem" }}>
                        <h2 style={{ fontSize: "1.2rem", marginBottom: "1.25rem", color: "#0f172a" }}>Dirección del servicio</h2>
                        <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr", gap: "1rem" }}>
                            <div>
                                <label style={labelStyle}>Calle y número *</label>
                                <input type="text" placeholder="Av. Masaryk 123" value={address} onChange={(e) => setAddress(e.target.value)} style={inputStyle} required />
                            </div>
                            <div>
                                <label style={labelStyle}>C.P. *</label>
                                <input type="text" placeholder="11560" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} style={inputStyle} required maxLength={5} />
                            </div>
                        </div>
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
                            </div>
                        )}
                    </div>

                    <div style={{ display: "flex", gap: "1rem" }}>
                        <button type="button" onClick={() => setStep(2)} className="btn-outline" style={{ flex: 1 }}>← Atrás</button>
                        <button
                            type="button"
                            onClick={() => customerName && customerPhone && address && postalCode && setStep(4)}
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
                            ...(vehicleBrand || vehicleModel ? [{ label: "Vehículo", value: [vehicleBrand, vehicleModel, vehicleYear, vehicleColor].filter(Boolean).join(" ") }] : []),
                            { label: "Tamaño", value: vehicleSizes.find((v) => v.value === vehicleSize)?.label || "" },
                            { label: "Color Negro", value: isBlackColor ? "Sí (+15% aplicable)" : "No" },
                            { label: "Fecha", value: serviceDate ? new Date(serviceDate + "T12:00:00").toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) : "" },
                            { label: "Dirección", value: postalCode ? `${address}, C.P. ${postalCode}` : address },
                            { label: "Contacto", value: [customerName, customerPhone, customerEmail].filter(Boolean).join(" · ") },
                        ].map((item) => (
                            <div key={item.label} style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid #f1f5f9" }}>
                                <span style={{ color: "#64748b", fontSize: "0.85rem" }}>{item.label}</span>
                                <span style={{ color: "#0f172a", fontSize: "0.9rem", fontWeight: 500, textAlign: "right", maxWidth: "60%" }}>{item.value}</span>
                            </div>
                        ))}
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 1.25rem", background: "rgba(37, 99, 235, 0.06)", borderRadius: "0.75rem", marginBottom: "1.5rem", border: "1px solid rgba(37,99,235,0.1)" }}>
                        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "#0f172a", fontSize: "1.1rem" }}>Total cotizado</span>
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
                        {loading ? "Procesando..." : `Reservar y Pagar $${currentPrice.toLocaleString("es-MX")} MXN →`}
                    </button>

                    <p style={{ color: "#475569", fontSize: "0.8rem", textAlign: "center", marginTop: "1rem" }}>
                        Serás redirigido a Stripe para completar el pago de forma segura.
                    </p>

                    <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                        <button type="button" onClick={() => setStep(3)} className="btn-outline" style={{ flex: 1 }}>← Modificar datos</button>
                    </div>
                </div>
            )}

            {/* WhatsApp */}
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
                <p style={{ color: "#475569", fontSize: "0.9rem", marginBottom: "0.75rem" }}>¿Tienes dudas?</p>
                <a href="https://wa.me/525610846022?text=Hola%2C%20tengo%20una%20duda%20sobre%20los%20servicios%20de%20Doctor%20Foam" className="btn-outline" style={{ display: "inline-flex" }} target="_blank" rel="noopener noreferrer">
                    📱 Escríbenos por WhatsApp
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
                    <Link href="/" style={{ color: "#64748b", textDecoration: "none", fontSize: "0.9rem", fontFamily: "var(--font-heading)" }}>
                        ← Inicio
                    </Link>
                </div>
            </nav>

            <main style={{ paddingTop: "6rem" }}>
                <section className="section-padding">
                    <div className="container" style={{ maxWidth: "900px" }}>
                        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                            <span className="section-label">Reservar</span>
                            <h1 className="section-title" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}>
                                Agenda tu servicio de{" "}
                                <span className="gradient-text">detallado premium</span>
                            </h1>
                            <p className="section-subtitle" style={{ maxWidth: "600px" }}>
                                Selecciona tu paquete, elige una fecha y agenda tu servicio.
                            </p>
                        </div>

                        <Suspense fallback={<div style={{ textAlign: "center", padding: "2rem", color: "#64748b" }}>Cargando...</div>}>
                            <BookingForm />
                        </Suspense>
                    </div>
                </section>
            </main>

            <footer className="footer">
                <div className="footer-bottom" style={{ borderTop: "none", marginTop: 0 }}>
                    <p>&copy; {new Date().getFullYear()} Doctor Foam México. Todos los derechos reservados.</p>
                </div>
            </footer>
        </>
    );
}
