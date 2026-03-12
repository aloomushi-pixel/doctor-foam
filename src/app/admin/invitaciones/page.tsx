"use client";

import UnifiedDashboardLayout from "@/components/UnifiedDashboardLayout";
import type { Invitation } from "@/lib/types";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

/* Invitation type from @/lib/types */

export default function InvitacionesPage() {
    const [invitations, setInvitations] = useState<Invitation[]>([]);
    const [loading, setLoading] = useState(true);
    const { data: session } = useSession();
    const [showForm, setShowForm] = useState(false);
    const [email, setEmail] = useState("");
    const [role, setRole] = useState<"admin" | "customer">("customer");
    const [sending, setSending] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

    // Auth handled by useSession and UnifiedDashboardLayout

    const fetchInvitations = useCallback(async () => {
        if (!session) return;
        setLoading(true);
        try {
            const res = await fetch("/api/admin/invitations");
            if (res.ok) {
                const data = await res.json();
                setInvitations(data.invitations || []);
            }
        } catch { /* silent */ }
        setLoading(false);
    }, [session]);

    useEffect(() => { fetchInvitations(); }, [fetchInvitations]);

    const showToast = (message: string, type: "success" | "error") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 4000);
    };

    const handleSend = async () => {
        if (!email.trim() || !session) return;
        setSending(true);
        try {
            const res = await fetch("/api/admin/invitations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email.trim(), role }),
            });
            const data = await res.json();
            if (res.ok) {
                showToast("Invitación enviada exitosamente ✉️", "success");
                setEmail("");
                setShowForm(false);
                fetchInvitations();
            } else {
                showToast(data.error || "Error al enviar", "error");
            }
        } catch {
            showToast("Error de conexión", "error");
        }
        setSending(false);
    };

    const handleDelete = async (id: string) => {
        if (!session) return;
        try {
            const res = await fetch(`/api/admin/invitations?id=${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                showToast("Invitación cancelada", "success");
                fetchInvitations();
            }
        } catch { /* silent */ }
    };

    const statusBadge = (status: string) => {
        const styles: Record<string, { bg: string; color: string; label: string }> = {
            pending: { bg: "rgba(234, 179, 8, 0.15)", color: "#facc15", label: "Pendiente" },
            accepted: { bg: "rgba(34, 197, 94, 0.15)", color: "#4ade80", label: "Aceptada" },
            expired: { bg: "rgba(239, 68, 68, 0.15)", color: "#f87171", label: "Expirada" },
        };
        const s = styles[status] || styles.pending;
        return (
            <span style={{
                padding: "0.2rem 0.6rem", borderRadius: "1rem",
                fontSize: "0.7rem", fontWeight: 700, background: s.bg, color: s.color,
                fontFamily: "var(--font-heading)", textTransform: "uppercase",
            }}>
                {s.label}
            </span>
        );
    };

    return (
        <UnifiedDashboardLayout requiredRole="admin">
            <div>
                {/* Toast */}
                {toast && (
                    <div style={{
                        position: "fixed", top: "1.5rem", right: "1.5rem", zIndex: 9999,
                        padding: "0.85rem 1.5rem", borderRadius: "0.5rem",
                        background: toast.type === "success"
                            ? "rgba(34, 197, 94, 0.15)"
                            : "rgba(239, 68, 68, 0.15)",
                        border: `1px solid ${toast.type === "success"
                            ? "rgba(34, 197, 94, 0.3)"
                            : "rgba(239, 68, 68, 0.3)"}`,
                        color: toast.type === "success" ? "#4ade80" : "#f87171",
                        fontFamily: "var(--font-heading)", fontSize: "0.85rem",
                        fontWeight: 600, backdropFilter: "blur(10px)",
                    }}>
                        {toast.message}
                    </div>
                )}

                <div style={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "center", marginBottom: "1.5rem",
                    flexWrap: "wrap", gap: "1rem",
                }}>
                    <div>
                        <h1 className="gradient-text" style={{
                            fontFamily: "var(--font-heading)", fontSize: "1.8rem",
                            fontWeight: 800, marginBottom: "0.25rem",
                        }}>
                            Invitaciones
                        </h1>
                        <p style={{ color: "#475569", fontSize: "0.9rem" }}>
                            Invita nuevos administradores o clientes
                        </p>
                    </div>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        style={{
                            padding: "0.7rem 1.5rem", borderRadius: "0.5rem",
                            border: "none", cursor: "pointer",
                            background: showForm
                                ? "#fef2f2"
                                : "#2563eb",
                            color: showForm ? "#ef4444" : "white",
                            fontFamily: "var(--font-heading)", fontWeight: 700,
                            fontSize: "0.85rem",
                        }}
                    >
                        {showForm ? "✕ Cancelar" : "+ Nueva invitación"}
                    </button>
                </div>

                {/* Create Form */}
                {showForm && (
                    <div style={{
                        background: "#ffffff",
                        border: "1px solid #e2e8f0",
                        borderRadius: "0.75rem", padding: "1.5rem",
                        marginBottom: "1.5rem",
                    }}>
                        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "flex-end" }}>
                            <div style={{ flex: "1 1 250px" }}>
                                <label style={{
                                    display: "block", color: "#475569", fontSize: "0.8rem",
                                    fontWeight: 600, marginBottom: "0.4rem",
                                    fontFamily: "var(--font-heading)",
                                }}>
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="correo@ejemplo.com"
                                    style={{
                                        width: "100%", padding: "0.65rem 1rem",
                                        borderRadius: "0.5rem",
                                        border: "1px solid #cbd5e1",
                                        background: "#ffffff",
                                        color: "#0f172a", fontSize: "0.9rem",
                                        fontFamily: "var(--font-heading)", outline: "none",
                                    }}
                                />
                            </div>
                            <div style={{ flex: "0 1 180px" }}>
                                <label style={{
                                    display: "block", color: "#475569", fontSize: "0.8rem",
                                    fontWeight: 600, marginBottom: "0.4rem",
                                    fontFamily: "var(--font-heading)",
                                }}>
                                    Rol
                                </label>
                                <select
                                    value={role}
                                    onChange={e => setRole(e.target.value as "admin" | "customer")}
                                    style={{
                                        width: "100%", padding: "0.65rem 1rem",
                                        borderRadius: "0.5rem",
                                        border: "1px solid #cbd5e1",
                                        background: "#f8fafc",
                                        color: "#0f172a", fontSize: "0.9rem",
                                        fontFamily: "var(--font-heading)", outline: "none",
                                    }}
                                >
                                    <option value="customer">Cliente</option>
                                    <option value="admin">Administrador</option>
                                </select>
                            </div>
                            <button
                                onClick={handleSend}
                                disabled={sending || !email.trim()}
                                style={{
                                    padding: "0.65rem 1.5rem", borderRadius: "0.5rem",
                                    border: "none", cursor: sending ? "not-allowed" : "pointer",
                                    background: "#2563eb",
                                    color: "white", fontFamily: "var(--font-heading)",
                                    fontWeight: 700, fontSize: "0.85rem",
                                    opacity: sending || !email.trim() ? 0.5 : 1,
                                }}
                            >
                                {sending ? "Enviando..." : "Enviar invitación ✉️"}
                            </button>
                        </div>
                    </div>
                )}

                {/* Invitations List */}
                {loading ? (
                    <div style={{ color: "#64748b", padding: "2rem", textAlign: "center" }}>
                        Cargando invitaciones...
                    </div>
                ) : invitations.length === 0 ? (
                    <div style={{
                        padding: "3rem", textAlign: "center",
                        background: "#ffffff", borderRadius: "0.75rem",
                        border: "1px solid #e2e8f0", color: "#64748b",
                    }}>
                        No hay invitaciones enviadas aún
                    </div>
                ) : (
                    <div style={{
                        background: "#ffffff", borderRadius: "0.75rem",
                        border: "1px solid #e2e8f0", overflow: "hidden",
                    }}>
                        <div style={{ overflowX: "auto" }}>
                            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                <thead>
                                    <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                                        {["Email", "Rol", "Estado", "Enviada", "Expira", ""].map(h => (
                                            <th key={h} style={{
                                                padding: "0.75rem 1rem", textAlign: "left",
                                                fontSize: "0.75rem", fontWeight: 700,
                                                color: "#64748b", textTransform: "uppercase",
                                                fontFamily: "var(--font-heading)",
                                                letterSpacing: "0.05em",
                                            }}>
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {invitations.map(inv => (
                                        <tr key={inv.id} style={{
                                            borderBottom: "1px solid #e2e8f0",
                                        }}>
                                            <td style={{ padding: "0.75rem 1rem", color: "#0f172a", fontSize: "0.9rem", fontWeight: 600, fontFamily: "var(--font-heading)" }}>
                                                {inv.email}
                                            </td>
                                            <td style={{ padding: "0.75rem 1rem", color: "#94a3b8", fontSize: "0.85rem" }}>
                                                {inv.role === "admin" ? "Admin" : "Cliente"}
                                            </td>
                                            <td style={{ padding: "0.75rem 1rem" }}>
                                                {statusBadge(inv.status)}
                                            </td>
                                            <td style={{ padding: "0.75rem 1rem", color: "#64748b", fontSize: "0.8rem" }}>
                                                {new Date(inv.created_at).toLocaleDateString("es-MX")}
                                            </td>
                                            <td style={{ padding: "0.75rem 1rem", color: "#64748b", fontSize: "0.8rem" }}>
                                                {new Date(inv.expires_at).toLocaleDateString("es-MX")}
                                            </td>
                                            <td style={{ padding: "0.75rem 1rem" }}>
                                                {inv.status === "pending" && (
                                                    <button
                                                        onClick={() => handleDelete(inv.id)}
                                                        style={{
                                                            padding: "0.3rem 0.75rem", borderRadius: "0.4rem",
                                                            border: "1px solid #fecaca",
                                                            background: "#fef2f2",
                                                            color: "#ef4444", cursor: "pointer",
                                                            fontSize: "0.75rem", fontWeight: 600,
                                                            fontFamily: "var(--font-heading)",
                                                        }}
                                                    >
                                                        Cancelar
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </UnifiedDashboardLayout>
    );
}
