"use client";

import UnifiedDashboardLayout from "@/components/UnifiedDashboardLayout";
import { formatTimeAgo } from "@/lib/booking-utils";
import type { Booking, Liquidation } from "@/lib/types";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

type PartnerSplit = {
    user_id: string;
    name: string;
    display_role: string;
    percentage: number;
    amount: number;
};

export default function LiquidacionesPage() {
    const [activeTab, setActiveTab] = useState<"ejecucion" | "por-pagar" | "historial">("ejecucion");
    const { data: session } = useSession();

    // Ejecucion Data
    const [activeBookings, setActiveBookings] = useState<Booking[]>([]);

    // Por Pagar Data
    const [pendingBookings, setPendingBookings] = useState<Booking[]>([]);
    const [totals, setTotals] = useState({ total_sold: 0, total_expenses: 0, total_profit: 0 });
    const [partnerSplits, setPartnerSplits] = useState<PartnerSplit[]>([]);
    const [selectedBookings, setSelectedBookings] = useState<Set<string>>(new Set());

    // Historial Data
    const [history, setHistory] = useState<Liquidation[]>([]);

    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Auth handled by session hook and UnifiedDashboardLayout
    useEffect(() => {
        if (session) {
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session, activeTab]);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            if (activeTab === "ejecucion") {
                // Fetch bookings that are paid, manual or ejecutado
                const res = await fetch("/api/admin/bookings?all=true");
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Fallo al cargar reservas");

                const valid = (data.bookings as Booking[]).filter(b =>
                    ["paid", "manual", "ejecutado"].includes(b.payment_status)
                );
                setActiveBookings(valid);
            }
            else if (activeTab === "por-pagar") {
                const res = await fetch("/api/admin/liquidaciones");
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Fallo al cargar liquidaciones pendientes");

                setPendingBookings(data.pending_bookings || []);
                setTotals(data.totals || { total_sold: 0, total_expenses: 0, total_profit: 0 });
                setPartnerSplits(data.partner_splits || []);
                // By default select all
                setSelectedBookings(new Set((data.pending_bookings || []).map((b: Booking) => b.id)));
            }
            else if (activeTab === "historial") {
                const res = await fetch("/api/admin/liquidaciones/historial");
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Fallo al cargar historial");

                setHistory(data.liquidations || []);
            }
        } catch (err: any) {
            setError(err.message);
        }
        setLoading(false);
    };

    // ------------- Acciones Ejecución -------------
    const [editingExpense, setEditingExpense] = useState<{ id: string, amount: string } | null>(null);

    const updateBookingStatus = async (id: string, newStatus: string) => {
        if (!session) return;
        try {
            const res = await fetch("/api/admin/bookings", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, payment_status: newStatus })
            });
            if (!res.ok) throw new Error("Error actualizando estado");
            fetchData(); // reload
        } catch (err: any) {
            alert(err.message);
        }
    };

    const saveExpenses = async (id: string, newStatus: string, expenses: number) => {
        if (!session) return;
        try {
            const res = await fetch("/api/admin/bookings", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, payment_status: newStatus, expenses })
            });
            if (!res.ok) throw new Error("Error actualizando gastos");
            setEditingExpense(null);
            fetchData(); // reload
        } catch (err: any) {
            alert(err.message);
        }
    };

    // ------------- Acciones Por Pagar -------------
    const executeLiquidation = async () => {
        if (!session || selectedBookings.size === 0) return;
        if (!confirm(`¿Estás seguro de liquidar y registrar el pago de ${selectedBookings.size} servicios?`)) return;

        setActionLoading(true);
        try {
            // Recalculate totals for selected items only
            const selected = pendingBookings.filter(b => selectedBookings.has(b.id));
            let tSold = 0, tExp = 0;
            selected.forEach(b => {
                tSold += Number(b.total_amount) / 100;
                tExp += Number(b.expenses || 0);
            });
            const tProf = tSold - tExp;

            // Recalculate splits
            const customSplits = partnerSplits.map(p => ({
                ...p,
                amount: Number((tProf * (p.percentage / 100)).toFixed(2))
            }));

            const res = await fetch("/api/admin/liquidaciones", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    booking_ids: Array.from(selectedBookings),
                    totals: { total_sold: tSold, total_expenses: tExp, total_profit: tProf },
                    partner_splits: customSplits
                })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Fallo al executar liquidación");

            alert("Liquidación registrada con éxito.");
            fetchData();
        } catch (err: any) {
            alert("Error: " + err.message);
        }
        setActionLoading(false);
    };


    const renderTabContent = () => {
        if (loading) return <div style={{ padding: "2rem", textAlign: "center", color: "#64748b" }}>Cargando datos...</div>;
        if (error) return <div style={{ padding: "2rem", color: "#ef4444" }}>Error: {error}</div>;

        switch (activeTab) {
            case "ejecucion":
                return (
                    <div>
                        <p style={{ marginBottom: "1rem", color: "#64748b", fontSize: "0.9rem" }}>
                            Servicios agendados y pagados (o pagos manuales). Una vez que el servicio se brinda, pásalo a "Ejecutado" e ingresa los gastos. Cuando esté listo, guárdalo y pásalo a "Completado" para que entre en la fila de Por Pagar.
                        </p>
                        <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: "0.5rem", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                            <thead style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                                <tr>
                                    <th style={thStyle}>Fecha / Ref</th>
                                    <th style={thStyle}>Cliente</th>
                                    <th style={thStyle}>Monto MXN</th>
                                    <th style={thStyle}>Estado</th>
                                    <th style={thStyle}>Gastos / Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activeBookings.length === 0 ? (
                                    <tr><td colSpan={5} style={{ padding: "2rem", textAlign: "center", color: "#94a3b8" }}>No hay servicios en curso</td></tr>
                                ) : activeBookings.map(b => (
                                    <tr key={b.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                                        <td style={tdStyle}>
                                            <div style={{ fontWeight: 600, color: "#1e293b", fontSize: "0.85rem" }}>{b.service_date}</div>
                                        </td>
                                        <td style={tdStyle}>
                                            <div style={{ fontWeight: "500", color: "#334155", fontSize: "0.85rem" }}>{b.customer_name}</div>
                                            <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{b.package_name}</div>
                                        </td>
                                        <td style={tdStyle}>
                                            <div style={{ fontWeight: "600", color: "#1e293b" }}>${(b.total_amount / 100).toFixed(2)}</div>
                                        </td>
                                        <td style={tdStyle}>
                                            <select
                                                value={b.payment_status}
                                                onChange={(e) => updateBookingStatus(b.id, e.target.value)}
                                                style={{ padding: "0.3rem", borderRadius: "0.3rem", border: "1px solid #cbd5e1", fontSize: "0.8rem" }}
                                            >
                                                <option value="paid">💰 Pagado (Stripe)</option>
                                                <option value="manual">🟣 Pagado (Manual)</option>
                                                <option value="ejecutado">⚙️ Ejecutado</option>
                                                <option value="completed" disabled={b.payment_status !== "ejecutado" && typeof b.expenses !== "number"}>✅ Completado</option>
                                            </select>
                                        </td>
                                        <td style={tdStyle}>
                                            {b.payment_status === "ejecutado" && (
                                                <div style={{ display: "flex", gap: "0.5rem" }}>
                                                    <input
                                                        type="number"
                                                        placeholder="Gastos $"
                                                        value={editingExpense?.id === b.id ? editingExpense.amount : (b.expenses || "")}
                                                        onChange={(e) => setEditingExpense({ id: b.id, amount: e.target.value })}
                                                        style={{ width: "80px", padding: "0.3rem", fontSize: "0.8rem", border: "1px solid #cbd5e1", borderRadius: "0.3rem" }}
                                                    />
                                                    <button
                                                        onClick={() => saveExpenses(b.id, "completed", Number(editingExpense?.amount || b.expenses || 0))}
                                                        style={{ background: "#3b82f6", color: "white", border: "none", borderRadius: "0.3rem", padding: "0.3rem 0.6rem", fontSize: "0.75rem", cursor: "pointer" }}>
                                                        Validar & Completar
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );

            case "por-pagar":
                return (
                    <div>
                        {/* Resumen Financiero Top */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
                            <div style={{ background: "#fff", padding: "1.5rem", borderRadius: "0.75rem", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e2e8f0" }}>
                                <div style={{ fontSize: "0.8rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700, marginBottom: "0.5rem" }}>Total Vendido</div>
                                <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#1e293b" }}>${totals.total_sold.toFixed(2)}</div>
                            </div>
                            <div style={{ background: "#fff", padding: "1.5rem", borderRadius: "0.75rem", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e2e8f0" }}>
                                <div style={{ fontSize: "0.8rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700, marginBottom: "0.5rem" }}>Gastos Operativos</div>
                                <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#ef4444" }}>-${totals.total_expenses.toFixed(2)}</div>
                            </div>
                            <div style={{ background: "linear-gradient(135deg, #10b981 0%, #059669 100%)", color: "#fff", padding: "1.5rem", borderRadius: "0.75rem", boxShadow: "0 4px 6px rgba(16,185,129,0.2)" }}>
                                <div style={{ fontSize: "0.8rem", opacity: 0.9, textTransform: "uppercase", fontWeight: 700, marginBottom: "0.5rem" }}>Utilidad Neta (A Repartir)</div>
                                <div style={{ fontSize: "1.8rem", fontWeight: 800 }}>${totals.total_profit.toFixed(2)}</div>
                            </div>
                        </div>

                        {/* Particiones por socio */}
                        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1e293b", marginBottom: "1rem" }}>Distribución de Socios</h3>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
                            {partnerSplits.map(p => (
                                <div key={p.user_id} style={{ background: "#f8fafc", padding: "1rem", borderRadius: "0.5rem", border: "1px solid #e2e8f0" }}>
                                    <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#334155" }}>{p.name}</div>
                                    <div style={{ fontSize: "0.75rem", color: "#64748b", marginBottom: "0.5rem" }}>{p.display_role} ({p.percentage}%)</div>
                                    <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "#10b981" }}>${p.amount.toFixed(2)}</div>
                                </div>
                            ))}
                        </div>

                        {/* Lista de Servicios a Liquidar */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1e293b" }}>Servicios Completados ({pendingBookings.length})</h3>
                            <button
                                onClick={executeLiquidation}
                                disabled={actionLoading || selectedBookings.size === 0}
                                style={{
                                    background: actionLoading || selectedBookings.size === 0 ? "#cbd5e1" : "#ef4444",
                                    color: "#fff", padding: "0.5rem 1rem", borderRadius: "0.4rem", fontWeight: 600, border: "none", cursor: actionLoading || selectedBookings.size === 0 ? "not-allowed" : "pointer"
                                }}>
                                {actionLoading ? "Liquidando..." : `Liquidación de ${selectedBookings.size} Servicios`}
                            </button>
                        </div>
                        <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: "0.5rem", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                            <thead style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                                <tr>
                                    <th style={thStyle}>Sel.</th>
                                    <th style={thStyle}>Fecha / Ref</th>
                                    <th style={thStyle}>Cliente</th>
                                    <th style={thStyle}>Ingresos</th>
                                    <th style={thStyle}>Gastos</th>
                                    <th style={thStyle}>Utilidad</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingBookings.length === 0 ? (
                                    <tr><td colSpan={6} style={{ padding: "2rem", textAlign: "center", color: "#94a3b8" }}>No hay servicios pendientes de pago</td></tr>
                                ) : pendingBookings.map(b => (
                                    <tr key={b.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                                        <td style={{ ...tdStyle, width: "40px" }}>
                                            <input
                                                type="checkbox"
                                                checked={selectedBookings.has(b.id)}
                                                onChange={(e) => {
                                                    const next = new Set(selectedBookings);
                                                    if (e.target.checked) next.add(b.id);
                                                    else next.delete(b.id);
                                                    setSelectedBookings(next);
                                                }}
                                            />
                                        </td>
                                        <td style={tdStyle}><div style={{ fontWeight: 600, color: "#1e293b", fontSize: "0.85rem" }}>{b.service_date}</div></td>
                                        <td style={tdStyle}>
                                            <div style={{ fontWeight: "500", color: "#334155", fontSize: "0.85rem" }}>{b.customer_name}</div>
                                            <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{b.package_name}</div>
                                        </td>
                                        <td style={tdStyle}><div style={{ fontWeight: "600", color: "#1e293b" }}>${(b.total_amount / 100).toFixed(2)}</div></td>
                                        <td style={tdStyle}><div style={{ fontWeight: "600", color: "#ef4444" }}>-${(Number(b.expenses) || 0).toFixed(2)}</div></td>
                                        <td style={tdStyle}><div style={{ fontWeight: "600", color: "#10b981" }}>${((b.total_amount / 100) - (Number(b.expenses) || 0)).toFixed(2)}</div></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );

            case "historial":
                return (
                    <div>
                        <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: "0.5rem", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                            <thead style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                                <tr>
                                    <th style={thStyle}>ID Liquidación</th>
                                    <th style={thStyle}>Fecha</th>
                                    <th style={thStyle}>Ventas</th>
                                    <th style={thStyle}>Gastos / Utilidad</th>
                                    <th style={thStyle}>Desglose Pagado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.length === 0 ? (
                                    <tr><td colSpan={5} style={{ padding: "2rem", textAlign: "center", color: "#94a3b8" }}>No hay historial de pagos registrados</td></tr>
                                ) : history.map((liq, idx) => (
                                    <tr key={liq.id} style={{ borderBottom: "1px solid #f1f5f9", background: idx % 2 === 0 ? "#fff" : "#fafafa" }}>
                                        <td style={tdStyle}>
                                            <div style={{ fontSize: "0.75rem", color: "#64748b", fontFamily: "monospace" }}>{liq.id.split("-")[0]}</div>
                                        </td>
                                        <td style={tdStyle}>
                                            <div style={{ fontWeight: 600, color: "#1e293b", fontSize: "0.85rem" }}>
                                                {new Date(liq.created_at).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" })}
                                            </div>
                                            <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{formatTimeAgo(liq.created_at)}</div>
                                        </td>
                                        <td style={tdStyle}>
                                            <div style={{ fontWeight: 600, color: "#1e293b" }}>${liq.total_sold.toFixed(2)}</div>
                                        </td>
                                        <td style={tdStyle}>
                                            <div style={{ fontSize: "0.8rem", color: "#ef4444" }}>Gastos: -${liq.total_expenses.toFixed(2)}</div>
                                            <div style={{ fontSize: "0.8rem", color: "#10b981", fontWeight: 700 }}>Utilidad: ${liq.total_profit.toFixed(2)}</div>
                                        </td>
                                        <td style={tdStyle}>
                                            <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                                                {liq.partner_splits.map(p => (
                                                    <div key={p.user_id} style={{ fontSize: "0.75rem", display: "flex", justifyContent: "space-between", minWidth: "150px" }}>
                                                        <span style={{ color: "#475569" }}>{p.name.split(" ")[0]} ({p.percentage}%)</span>
                                                        <span style={{ fontWeight: 600, color: "#1e293b" }}>${p.amount.toFixed(2)}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
        }
    };

    return (
        <UnifiedDashboardLayout requiredRole="admin">
            <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto", fontFamily: "var(--font-body)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem" }}>
                    <div>
                        <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0f172a", fontFamily: "var(--font-heading)", marginBottom: "0.5rem" }}>
                            Cuentas por Pagar
                        </h1>
                        <p style={{ color: "#64748b", fontSize: "0.95rem" }}>
                            Gestiona servicios ejecutados, ingresa sus gastos y realiza la dispersión de utilidades.
                        </p>
                    </div>
                </div>

                {/* Tabs */}
                <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", borderBottom: "1px solid #e2e8f0" }}>
                    {[
                        { id: "ejecucion", label: "⚙️ Ejecución (Gastos)" },
                        { id: "por-pagar", label: "💰 Por Pagar" },
                        { id: "historial", label: "📒 Historial Pagados" }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            style={{
                                padding: "0.75rem 1rem",
                                background: "none",
                                border: "none",
                                borderBottom: activeTab === tab.id ? "3px solid #3b82f6" : "3px solid transparent",
                                color: activeTab === tab.id ? "#3b82f6" : "#64748b",
                                fontWeight: activeTab === tab.id ? 700 : 500,
                                fontSize: "0.95rem",
                                cursor: "pointer",
                                transition: "all 0.2s"
                            }}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {renderTabContent()}
            </div>
        </UnifiedDashboardLayout>
    );
}

const thStyle: React.CSSProperties = {
    padding: "1rem", textAlign: "left", fontSize: "0.75rem", color: "#475569",
    textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.05em"
};
const tdStyle: React.CSSProperties = {
    padding: "1rem"
};
