"use client";

import UnifiedDashboardLayout from "@/components/UnifiedDashboardLayout";
import { PACKAGES, PREMIUM_ZONES, VEHICLE_SIZES, type PackageConfig } from "@/lib/packages";
import { useState } from "react";

type EditablePackage = PackageConfig & { isEditing: boolean };

export default function AdminServicios() {
    const [packages, setPackages] = useState<EditablePackage[]>(
        Object.values(PACKAGES).map((p) => ({ ...p, isEditing: false }))
    );
    const [vehicleSizes] = useState(VEHICLE_SIZES);
    const [zones] = useState(PREMIUM_ZONES);
    const [activeView, setActiveView] = useState<"packages" | "sizes" | "zones">("packages");
    const [editingPkg, setEditingPkg] = useState<EditablePackage | null>(null);
    const [editFeature, setEditFeature] = useState("");

    const formatPrice = (cents: number) => `$${(cents / 100).toLocaleString("es-MX")}`;

    const handleEditPkg = (pkg: EditablePackage) => {
        setEditingPkg({ ...pkg });
        setEditFeature("");
    };

    const handleSavePkg = () => {
        if (!editingPkg) return;
        setPackages((prev) =>
            prev.map((p) => (p.slug === editingPkg.slug ? { ...editingPkg, isEditing: false } : p))
        );
        setEditingPkg(null);
    };

    const addFeature = () => {
        if (!editFeature.trim() || !editingPkg) return;
        setEditingPkg({
            ...editingPkg,
            features: [...editingPkg.features, editFeature.trim()],
        });
        setEditFeature("");
    };

    const removeFeature = (idx: number) => {
        if (!editingPkg) return;
        setEditingPkg({
            ...editingPkg,
            features: editingPkg.features.filter((_, i) => i !== idx),
        });
    };

    const getPackageIcon = (slug: string) => {
        const icons: Record<string, string> = {
            "deep-interior": "♨️",
            "signature-detail": "💎",
            "ceramic-coating": "🛡️",
            "graphene-upgrade": "⚡",
            "foam-maintenance": "🧽",
            membresia: "🔄",
        };
        return icons[slug] || "📦";
    };

    return (
        <UnifiedDashboardLayout requiredRole="admin">
            <div style={{ marginBottom: "1.5rem" }}>
                <h1 style={{
                    color: "#0f172a", fontSize: "1.5rem",
                    fontFamily: "var(--font-heading)", fontWeight: 800, margin: 0,
                }}>
                    🛠️ Administrador de Servicios
                </h1>
                <p style={{ color: "#475569", fontSize: "0.85rem", marginTop: "0.5rem" }}>
                    Gestiona paquetes, tamaños de vehículo y zonas de cobertura
                </p>
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
                {([
                    { key: "packages" as const, label: "📦 Paquetes", count: packages.length },
                    { key: "sizes" as const, label: "🚗 Vehículos", count: vehicleSizes.length },
                    { key: "zones" as const, label: "📍 Zonas", count: zones.length },
                ]).map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveView(tab.key)}
                        style={{
                            padding: "0.6rem 1.2rem", borderRadius: "0.6rem",
                            border: activeView === tab.key ? "1px solid #bfdbfe" : "1px solid #e2e8f0",
                            background: activeView === tab.key ? "#eff6ff" : "#ffffff",
                            color: activeView === tab.key ? "#2563eb" : "#475569",
                            cursor: "pointer", fontWeight: 600, fontSize: "0.85rem",
                            fontFamily: "var(--font-heading)", transition: "all 0.2s",
                            display: "flex", alignItems: "center", gap: "0.4rem",
                        }}
                    >
                        {tab.label}
                        <span style={{
                            background: activeView === tab.key ? "#dbeafe" : "#f1f5f9",
                            color: activeView === tab.key ? "#1d4ed8" : "#64748b",
                            fontSize: "0.7rem", fontWeight: 700,
                            padding: "0.1rem 0.4rem", borderRadius: "0.3rem",
                        }}>
                            {tab.count}
                        </span>
                    </button>
                ))}
            </div>

            {/* ─── Packages View ─── */}
            {activeView === "packages" && (
                <div style={{ display: "grid", gap: "1rem" }}>
                    {packages.map((pkg) => (
                        <div
                            key={pkg.slug}
                            style={{
                                background: "#ffffff",
                                border: "1px solid #e2e8f0",
                                borderRadius: "1rem",
                                overflow: "hidden",
                                transition: "all 0.3s",
                            }}
                        >
                            <div
                                style={{
                                    padding: "1.25rem 1.5rem",
                                    display: "flex", alignItems: "center", gap: "1rem",
                                    justifyContent: "space-between",
                                }}
                            >
                                {/* Left: icon + info */}
                                <div style={{ display: "flex", alignItems: "center", gap: "1rem", flex: 1, minWidth: 0 }}>
                                    <div style={{
                                        width: "48px", height: "48px", borderRadius: "0.75rem", flexShrink: 0,
                                        background: pkg.isSubscription
                                            ? "linear-gradient(135deg, #10b981, #34d399)"
                                            : "linear-gradient(135deg, #2563eb, #3b82f6)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontSize: "1.5rem",
                                    }}>
                                        {getPackageIcon(pkg.slug)}
                                    </div>
                                    <div style={{ minWidth: 0 }}>
                                        <div style={{
                                            color: "#0f172a", fontWeight: 700, fontSize: "1rem",
                                            fontFamily: "var(--font-heading)",
                                            display: "flex", alignItems: "center", gap: "0.5rem",
                                        }}>
                                            {pkg.name}
                                            {pkg.isSubscription && (
                                                <span style={{
                                                    fontSize: "0.6rem", padding: "0.1rem 0.4rem",
                                                    borderRadius: "0.3rem", background: "rgba(16,185,129,0.15)",
                                                    color: "#34d399", fontWeight: 600,
                                                }}>
                                                    SUSCRIPCIÓN
                                                </span>
                                            )}
                                        </div>
                                        <div style={{ color: "#475569", fontSize: "0.8rem", marginTop: "0.15rem" }}>
                                            {pkg.label}
                                        </div>
                                    </div>
                                </div>

                                {/* Right: price + actions */}
                                <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexShrink: 0 }}>
                                    <div style={{ textAlign: "right" }}>
                                        <div style={{
                                            color: "#2563eb", fontWeight: 800, fontSize: "1.2rem",
                                            fontFamily: "var(--font-heading)",
                                        }}>
                                            {formatPrice(pkg.priceCentavos)}
                                        </div>
                                        <div style={{ color: "#475569", fontSize: "0.7rem" }}>
                                            MXN {pkg.isSubscription ? "/ mes" : "base"}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleEditPkg(pkg)}
                                        style={{
                                            padding: "0.5rem 1rem", borderRadius: "0.5rem",
                                            background: "#eff6ff",
                                            border: "1px solid #bfdbfe",
                                            color: "#2563eb", cursor: "pointer",
                                            fontWeight: 600, fontSize: "0.8rem",
                                            fontFamily: "var(--font-heading)",
                                            transition: "all 0.2s",
                                        }}
                                    >
                                        ✏️ Editar
                                    </button>
                                </div>
                            </div>

                            {/* Features row */}
                            <div style={{
                                padding: "0 1.5rem 1rem",
                                display: "flex", flexWrap: "wrap", gap: "0.4rem",
                            }}>
                                {pkg.features.map((f, i) => (
                                    <span
                                        key={i}
                                        style={{
                                            background: "#f8fafc",
                                            color: "#475569", fontSize: "0.72rem",
                                            padding: "0.25rem 0.6rem", borderRadius: "0.3rem",
                                            border: "1px solid #e2e8f0",
                                        }}
                                    >
                                        ✓ {f}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ─── Vehicle Sizes View ─── */}
            {activeView === "sizes" && (
                <div style={{
                    background: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "1rem", padding: "1.5rem",
                }}>
                    <h3 style={{ color: "#0f172a", fontSize: "1rem", fontFamily: "var(--font-heading)", fontWeight: 700, marginBottom: "1rem" }}>
                        Tamaños y Coeficientes
                    </h3>
                    <div style={{ display: "grid", gap: "0.75rem" }}>
                        {vehicleSizes.map((v) => (
                            <div
                                key={v.value}
                                style={{
                                    display: "flex", alignItems: "center", justifyContent: "space-between",
                                    padding: "1rem 1.25rem", borderRadius: "0.75rem",
                                    background: "#f8fafc",
                                    border: "1px solid #e2e8f0",
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                    <span style={{ fontSize: "1.5rem" }}>{v.coefficient === 1 ? "🚗" : "🚙"}</span>
                                    <div>
                                        <div style={{ color: "#0f172a", fontWeight: 600, fontSize: "0.9rem" }}>{v.label}</div>
                                        <div style={{ color: "#475569", fontSize: "0.75rem" }}>
                                            {v.value}
                                        </div>
                                    </div>
                                </div>
                                <div style={{
                                    background: v.coefficient > 1 ? "#fef3c7" : "#f0fdf4",
                                    color: v.coefficient > 1 ? "#d97706" : "#16a34a",
                                    padding: "0.35rem 0.75rem", borderRadius: "0.5rem",
                                    fontWeight: 700, fontSize: "0.9rem", fontFamily: "var(--font-heading)",
                                }}>
                                    ×{v.coefficient.toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>
                    <p style={{ color: "#475569", fontSize: "0.75rem", marginTop: "1rem" }}>
                        💡 El coeficiente se multiplica por el precio base para calcular el precio final del vehículo.
                    </p>
                </div>
            )}

            {/* ─── Zones View ─── */}
            {activeView === "zones" && (
                <div style={{
                    background: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "1rem", padding: "1.5rem",
                }}>
                    <h3 style={{ color: "#0f172a", fontSize: "1rem", fontFamily: "var(--font-heading)", fontWeight: 700, marginBottom: "1rem" }}>
                        Zonas de Cobertura
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "0.75rem" }}>
                        {zones.map((z) => (
                            <div
                                key={z}
                                style={{
                                    padding: "0.85rem 1rem", borderRadius: "0.6rem",
                                    background: "#ffffff",
                                    border: "1px solid #e2e8f0",
                                    display: "flex", alignItems: "center", gap: "0.6rem",
                                    color: "#475569", fontSize: "0.85rem",
                                }}
                            >
                                <span style={{ color: "#60a5fa" }}>📍</span>
                                {z}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ─── Edit Modal ─── */}
            {editingPkg && (
                <>
                    <div
                        onClick={() => setEditingPkg(null)}
                        style={{
                            position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
                            zIndex: 500,
                        }}
                    />
                    <div style={{
                        position: "fixed", top: "50%", left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "min(550px, 92vw)", maxHeight: "85vh", overflowY: "auto",
                        background: "#ffffff",
                        border: "1px solid #e2e8f0",
                        borderRadius: "1.25rem", padding: "2rem",
                        zIndex: 600,
                        boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
                    }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
                            <h2 style={{
                                color: "#0f172a", fontSize: "1.2rem",
                                fontFamily: "var(--font-heading)", fontWeight: 800, margin: 0,
                            }}>
                                {getPackageIcon(editingPkg.slug)} Editar: {editingPkg.name}
                            </h2>
                            <button
                                onClick={() => setEditingPkg(null)}
                                style={{
                                    background: "none", border: "none", color: "#64748b",
                                    cursor: "pointer", fontSize: "1.3rem",
                                }}
                            >
                                ✕
                            </button>
                        </div>

                        {/* Fields */}
                        <div style={{ display: "grid", gap: "1rem" }}>
                            <div>
                                <label style={{ display: "block", color: "#475569", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem", fontFamily: "var(--font-heading)" }}>
                                    Nombre del servicio
                                </label>
                                <input
                                    value={editingPkg.name}
                                    onChange={(e) => setEditingPkg({ ...editingPkg, name: e.target.value })}
                                    style={{
                                        width: "100%", padding: "0.65rem 0.9rem", borderRadius: "0.5rem",
                                        background: "#ffffff", border: "1px solid #cbd5e1",
                                        color: "#0f172a", fontSize: "0.9rem", outline: "none",
                                        fontFamily: "var(--font-body)",
                                    }}
                                />
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                                <div>
                                    <label style={{ display: "block", color: "#475569", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem", fontFamily: "var(--font-heading)" }}>
                                        Precio Base (MXN)
                                    </label>
                                    <input
                                        type="number"
                                        value={editingPkg.priceBase}
                                        onChange={(e) => {
                                            const v = parseInt(e.target.value) || 0;
                                            setEditingPkg({ ...editingPkg, priceBase: v, priceCentavos: v * 100 });
                                        }}
                                        style={{
                                            width: "100%", padding: "0.65rem 0.9rem", borderRadius: "0.5rem",
                                            background: "#ffffff", border: "1px solid #cbd5e1",
                                            color: "#0f172a", fontSize: "0.9rem", outline: "none",
                                            fontFamily: "var(--font-body)",
                                        }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: "block", color: "#475569", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem", fontFamily: "var(--font-heading)" }}>
                                        Precio Stripe (centavos)
                                    </label>
                                    <input
                                        type="number"
                                        value={editingPkg.priceCentavos}
                                        disabled
                                        style={{
                                            width: "100%", padding: "0.65rem 0.9rem", borderRadius: "0.5rem",
                                            background: "#f1f5f9", border: "1px solid #e2e8f0",
                                            color: "#64748b", fontSize: "0.9rem", outline: "none",
                                            fontFamily: "var(--font-body)",
                                        }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: "block", color: "#475569", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem", fontFamily: "var(--font-heading)" }}>
                                    Etiqueta corta
                                </label>
                                <input
                                    value={editingPkg.label}
                                    onChange={(e) => setEditingPkg({ ...editingPkg, label: e.target.value })}
                                    style={{
                                        width: "100%", padding: "0.65rem 0.9rem", borderRadius: "0.5rem",
                                        background: "#ffffff", border: "1px solid #cbd5e1",
                                        color: "#0f172a", fontSize: "0.9rem", outline: "none",
                                        fontFamily: "var(--font-body)",
                                    }}
                                />
                            </div>

                            <div>
                                <label style={{ display: "block", color: "#475569", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.3rem", fontFamily: "var(--font-heading)" }}>
                                    Descripción
                                </label>
                                <textarea
                                    value={editingPkg.description}
                                    onChange={(e) => setEditingPkg({ ...editingPkg, description: e.target.value })}
                                    rows={3}
                                    style={{
                                        width: "100%", padding: "0.65rem 0.9rem", borderRadius: "0.5rem",
                                        background: "#ffffff", border: "1px solid #cbd5e1",
                                        color: "#0f172a", fontSize: "0.9rem", outline: "none", resize: "vertical",
                                        fontFamily: "var(--font-body)",
                                    }}
                                />
                            </div>

                            {/* Features */}
                            <div>
                                <label style={{ display: "block", color: "#475569", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.5rem", fontFamily: "var(--font-heading)" }}>
                                    Características ({editingPkg.features.length})
                                </label>
                                <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", marginBottom: "0.75rem" }}>
                                    {editingPkg.features.map((f, i) => (
                                        <div key={i} style={{
                                            display: "flex", alignItems: "center", gap: "0.5rem",
                                            padding: "0.4rem 0.75rem", borderRadius: "0.4rem",
                                            background: "#f8fafc",
                                            border: "1px solid #e2e8f0",
                                        }}>
                                            <span style={{ color: "#34d399", fontSize: "0.8rem" }}>✓</span>
                                            <span style={{ flex: 1, color: "#475569", fontSize: "0.82rem" }}>{f}</span>
                                            <button
                                                onClick={() => removeFeature(i)}
                                                style={{
                                                    background: "none", border: "none", color: "#ef4444",
                                                    cursor: "pointer", fontSize: "0.8rem", padding: "0.2rem",
                                                }}
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ display: "flex", gap: "0.5rem" }}>
                                    <input
                                        value={editFeature}
                                        onChange={(e) => setEditFeature(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && addFeature()}
                                        placeholder="Nueva característica..."
                                        style={{
                                            flex: 1, padding: "0.5rem 0.75rem", borderRadius: "0.4rem",
                                            background: "#ffffff", border: "1px solid #cbd5e1",
                                            color: "#0f172a", fontSize: "0.82rem", outline: "none",
                                            fontFamily: "var(--font-body)",
                                        }}
                                    />
                                    <button
                                        onClick={addFeature}
                                        disabled={!editFeature.trim()}
                                        style={{
                                            padding: "0.5rem 1rem", borderRadius: "0.4rem",
                                            background: editFeature.trim() ? "#dcfce7" : "#f1f5f9",
                                            border: "1px solid " + (editFeature.trim() ? "#86efac" : "#e2e8f0"),
                                            color: editFeature.trim() ? "#16a34a" : "#94a3b8",
                                            cursor: editFeature.trim() ? "pointer" : "default",
                                            fontWeight: 600, fontSize: "0.8rem",
                                        }}
                                    >
                                        + Agregar
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
                            <button
                                onClick={() => setEditingPkg(null)}
                                style={{
                                    flex: 1, padding: "0.7rem", borderRadius: "0.6rem",
                                    background: "#ffffff", border: "1px solid #cbd5e1",
                                    color: "#475569", cursor: "pointer", fontWeight: 600,
                                    fontSize: "0.88rem", fontFamily: "var(--font-heading)",
                                }}
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSavePkg}
                                style={{
                                    flex: 2, padding: "0.7rem", borderRadius: "0.6rem",
                                    background: "#2563eb",
                                    border: "none", color: "white", cursor: "pointer", fontWeight: 700,
                                    fontSize: "0.88rem", fontFamily: "var(--font-heading)",
                                }}
                            >
                                💾 Guardar Cambios
                            </button>
                        </div>

                        <p style={{ color: "#475569", fontSize: "0.72rem", textAlign: "center", marginTop: "0.75rem" }}>
                            💡 Los cambios se aplican en la sesión actual. Para cambios permanentes, actualiza lib/packages.ts
                        </p>
                    </div>
                </>
            )}
        </UnifiedDashboardLayout>
    );
}
