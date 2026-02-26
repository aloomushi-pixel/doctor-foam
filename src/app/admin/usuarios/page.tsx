"use client";

import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/lib/supabase";
import type { User } from "@/lib/types";
import React, { useCallback, useEffect, useRef, useState } from "react";

const DISPLAY_ROLES = ["Administrador", "Operador", "Proveedor"] as const;

export default function UsuariosPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedUser, setExpandedUser] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<"admin" | "customer">("admin");
    const [search, setSearch] = useState("");
    const [token, setToken] = useState<string | null>(null);
    const [saving, setSaving] = useState<string | null>(null); // user id being saved
    const [actionError, setActionError] = useState<string | null>(null); // para mostrar mensajes de error
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            if (data.session) setToken(data.session.access_token);
        });
    }, []);

    const fetchUsers = useCallback(async () => {
        if (!token) return;
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/users?role=${activeTab}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                const data = await res.json();
                setUsers(data.users || []);
            }
        } catch { /* silent */ }
        setLoading(false);
    }, [token, activeTab]);

    useEffect(() => { fetchUsers(); }, [fetchUsers]);

    const filtered = users.filter(u =>
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.name.toLowerCase().includes(search.toLowerCase())
    );

    // Total percentage across all admin users
    const totalPct = users.reduce((sum, u) => sum + (u.profit_share_pct || 0), 0);
    const pctIsValid = Math.abs(totalPct - 100) < 0.01;

    // Update a user's field and persist
    const updateUser = useCallback(async (userId: string, field: string, value: string | number) => {
        // Optimistic update
        setUsers(prev => prev.map(u =>
            u.id === userId ? { ...u, [field]: value } : u
        ));

        // Debounced save
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(async () => {
            if (!token) return;
            setSaving(userId);
            setActionError(null);
            try {
                const res = await fetch("/api/admin/users", {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        user_id: userId,
                        [field]: value,
                    }),
                });
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || "Fallo por razones desconocidas.");
                }
            } catch (err: any) {
                setActionError(`Error al guardar: ${err.message}. (Si dice 'relation does not exist', significa que aún debes crear la tabla en Supabase en Producción)`);
                // Revert to original state by fetching
                fetchUsers();
            }
            setSaving(null);
        }, 600);
    }, [token, fetchUsers]);

    const handleDeleteUser = async (user: User) => {
        if (!confirm(`¿Estás 100% seguro de que deseas eliminar permanentemente a ${user.name || user.email}? Esta acción no se puede deshacer.`)) return;

        if (!token) return;
        setLoading(true);
        setActionError(null);
        try {
            const res = await fetch(`/api/admin/users/${user.id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Fallo al eliminar.");
            }
            alert("Usuario eliminado correctamente.");
            setUsers(prev => prev.filter(u => u.id !== user.id));
        } catch (err: any) {
            alert(`Error al eliminar: ${err.message}`);
            setActionError(`Error al eliminar: ${err.message}`);
        }
        setLoading(false);
    };

    return (
        <AdminLayout>
            <div>
                <h1 className="gradient-text" style={{
                    fontFamily: "var(--font-heading)", fontSize: "1.8rem",
                    fontWeight: 800, marginBottom: "0.5rem",
                }}>
                    Gestión de Usuarios
                </h1>
                <p style={{ color: "#475569", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                    Administra roles y participación de socios
                </p>

                {/* Tabs */}
                <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
                    {(["admin", "customer"] as const).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                padding: "0.6rem 1.5rem", borderRadius: "0.5rem",
                                border: activeTab === tab
                                    ? "1px solid #bfdbfe"
                                    : "1px solid #e2e8f0",
                                background: activeTab === tab
                                    ? "#eff6ff"
                                    : "#ffffff",
                                color: activeTab === tab ? "#2563eb" : "#475569",
                                cursor: "pointer", fontFamily: "var(--font-heading)",
                                fontWeight: 700, fontSize: "0.85rem",
                                transition: "all 0.2s",
                            }}
                        >
                            {tab === "admin" ? "👤 Administradores" : "👥 Clientes"}
                        </button>
                    ))}
                </div>

                {/* Profit Share Summary — admin tab only */}
                {activeTab === "admin" && users.length > 0 && (
                    <div style={{
                        display: "flex", alignItems: "center", gap: "1rem",
                        padding: "0.75rem 1rem", borderRadius: "0.75rem",
                        background: pctIsValid ? "rgba(72,187,120,0.08)" : "rgba(252,129,129,0.08)",
                        border: `1px solid ${pctIsValid ? "rgba(72,187,120,0.2)" : "rgba(252,129,129,0.2)"}`,
                        marginBottom: "1.5rem", flexWrap: "wrap",
                    }}>
                        <span style={{
                            fontFamily: "var(--font-heading)", fontWeight: 800,
                            fontSize: "1.1rem", color: pctIsValid ? "#48bb78" : "#fc8181",
                        }}>
                            {totalPct.toFixed(0)}%
                        </span>
                        <span style={{ color: "#475569", fontSize: "0.82rem" }}>
                            {pctIsValid
                                ? "✓ Los porcentajes suman 100% correctamente"
                                : `⚠ Los porcentajes deben sumar 100% (faltan ${(100 - totalPct).toFixed(0)}%)`}
                        </span>
                        <span style={{
                            marginLeft: "auto", fontSize: "0.72rem", color: "#64748b",
                            fontFamily: "var(--font-heading)",
                        }}>
                            Liquidación semanal
                        </span>
                    </div>
                )}

                {/* Global Error Notice for Operations */}
                {actionError && (
                    <div style={{
                        padding: "0.75rem 1rem", borderRadius: "0.5rem",
                        background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.2)",
                        color: "#ef4444", fontSize: "0.85rem", marginBottom: "1.5rem", fontWeight: 500
                    }}>
                        {actionError}
                    </div>
                )}

                {/* Search */}
                <div style={{ marginBottom: "1.5rem" }}>
                    <input
                        type="text"
                        placeholder="Buscar por nombre o email..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        style={{
                            width: "100%", maxWidth: "400px",
                            padding: "0.7rem 1rem", borderRadius: "0.5rem",
                            border: "1px solid #cbd5e1",
                            background: "#ffffff",
                            color: "#0f172a", fontSize: "0.9rem",
                            fontFamily: "var(--font-heading)",
                            outline: "none",
                        }}
                    />
                </div>

                {/* Users Table */}
                {loading ? (
                    <div style={{ color: "#64748b", padding: "2rem", textAlign: "center" }}>
                        Cargando usuarios...
                    </div>
                ) : filtered.length === 0 ? (
                    <div style={{
                        padding: "3rem", textAlign: "center",
                        background: "#ffffff", borderRadius: "0.75rem",
                        border: "1px solid #e2e8f0", color: "#64748b",
                    }}>
                        No se encontraron {activeTab === "admin" ? "administradores" : "clientes"}
                    </div>
                ) : (
                    <div style={{
                        background: "#ffffff", borderRadius: "0.75rem",
                        border: "1px solid #e2e8f0", overflow: "hidden",
                    }}>
                        <div style={{ overflowX: "auto" }}>
                            <table className="admin-table-responsive" style={{ width: "100%", borderCollapse: "collapse" }}>
                                <thead>
                                    <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                                        {[
                                            "Nombre", "Email",
                                            ...(activeTab === "admin" ? ["Rol", "%", "Teléfono"] : ["Teléfono"]),
                                            "Creado", "Último login", "Acciones"
                                        ].map(h => (
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
                                    {filtered.map(user => (
                                        <React.Fragment key={user.id}>
                                            <tr
                                                style={{
                                                    borderBottom: "1px solid #f1f5f9",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                <td
                                                    onClick={() => setExpandedUser(expandedUser === user.id ? null : user.id)}
                                                    style={{
                                                        padding: "0.75rem 1rem", color: "#0f172a",
                                                        fontSize: "0.9rem", fontWeight: 600,
                                                        fontFamily: "var(--font-heading)",
                                                    }}
                                                >
                                                    {user.name} {expandedUser === user.id ? "▾" : "▸"}
                                                </td>
                                                <td style={{
                                                    padding: "0.75rem 1rem", color: "#475569",
                                                    fontSize: "0.85rem",
                                                }}>
                                                    {user.email}
                                                </td>

                                                {/* Role Select — admin tab only */}
                                                {activeTab === "admin" && (
                                                    <td style={{ padding: "0.5rem 0.5rem" }}>
                                                        <select
                                                            value={user.display_role || "Administrador"}
                                                            onChange={e => {
                                                                e.stopPropagation();
                                                                updateUser(user.id, "display_role", e.target.value);
                                                            }}
                                                            onClick={e => e.stopPropagation()}
                                                            style={{
                                                                padding: "0.4rem 0.6rem", borderRadius: "0.4rem",
                                                                background: "#f8fafc",
                                                                border: "1px solid #cbd5e1",
                                                                color: "#0f172a", fontSize: "0.78rem",
                                                                fontFamily: "var(--font-heading)", fontWeight: 600,
                                                                outline: "none", cursor: "pointer",
                                                                appearance: "auto",
                                                            }}
                                                        >
                                                            {DISPLAY_ROLES.map(r => (
                                                                <option key={r} value={r} style={{ background: "#ffffff", color: "#0f172a" }}>
                                                                    {r}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </td>
                                                )}

                                                {/* Profit Share % — admin tab only */}
                                                {activeTab === "admin" && (
                                                    <td style={{ padding: "0.5rem 0.5rem" }}>
                                                        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                                                            <input
                                                                type="number"
                                                                min={0}
                                                                max={100}
                                                                step={1}
                                                                value={user.profit_share_pct ?? 0}
                                                                onChange={e => {
                                                                    e.stopPropagation();
                                                                    const val = Math.min(100, Math.max(0, Number(e.target.value) || 0));
                                                                    updateUser(user.id, "profit_share_pct", val);
                                                                }}
                                                                onClick={e => e.stopPropagation()}
                                                                style={{
                                                                    width: "60px", padding: "0.4rem 0.5rem",
                                                                    borderRadius: "0.4rem",
                                                                    background: "#f8fafc",
                                                                    border: `1px solid ${(user.profit_share_pct || 0) > 0 ? "rgba(72,187,120,0.5)" : "#cbd5e1"}`,
                                                                    color: (user.profit_share_pct || 0) > 0 ? "#16a34a" : "#475569",
                                                                    fontSize: "0.82rem", fontWeight: 700,
                                                                    fontFamily: "var(--font-heading)",
                                                                    textAlign: "center", outline: "none",
                                                                }}
                                                            />
                                                            <span style={{ color: "#64748b", fontSize: "0.78rem", fontWeight: 600 }}>%</span>
                                                            {saving === user.id && (
                                                                <span style={{ color: "#63b3ed", fontSize: "0.65rem" }}>💾</span>
                                                            )}
                                                        </div>
                                                    </td>
                                                )}

                                                <td style={{
                                                    padding: "0.75rem 1rem", color: "#475569",
                                                    fontSize: "0.85rem",
                                                }}>
                                                    {user.phone}
                                                </td>
                                                <td style={{
                                                    padding: "0.75rem 1rem", color: "#64748b",
                                                    fontSize: "0.8rem",
                                                }}>
                                                    {new Date(user.created_at).toLocaleDateString("es-MX")}
                                                </td>
                                                <td style={{
                                                    padding: "0.75rem 1rem", color: "#64748b",
                                                    fontSize: "0.8rem",
                                                }}>
                                                    {user.last_sign_in
                                                        ? new Date(user.last_sign_in).toLocaleDateString("es-MX", {
                                                            day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
                                                        })
                                                        : "Nunca"}
                                                </td>
                                                <td style={{ padding: "0.75rem 1rem", textAlign: "right" }}>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteUser(user);
                                                        }}
                                                        style={{
                                                            background: "rgba(239, 68, 68, 0.1)",
                                                            color: "#ef4444",
                                                            border: "1px solid rgba(239, 68, 68, 0.2)",
                                                            padding: "0.4rem 0.6rem",
                                                            borderRadius: "0.4rem",
                                                            fontSize: "0.75rem",
                                                            fontWeight: 600,
                                                            cursor: "pointer",
                                                            fontFamily: "var(--font-heading)"
                                                        }}
                                                        title="Eliminar permanentemente"
                                                    >
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                            {expandedUser === user.id && (
                                                <tr>
                                                    <td colSpan={activeTab === "admin" ? 8 : 6} style={{
                                                        padding: "0.75rem 1rem 1rem 2rem",
                                                        background: "#eff6ff",
                                                        borderBottom: "1px solid #e2e8f0",
                                                    }}>
                                                        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", alignItems: "center" }}>
                                                            <div>
                                                                <span style={{ color: "#475569", fontSize: "0.72rem", fontFamily: "var(--font-heading)", textTransform: "uppercase" }}>Rol Sistema</span>
                                                                <div style={{
                                                                    marginTop: "0.2rem", padding: "0.15rem 0.5rem", borderRadius: "0.3rem",
                                                                    background: user.role === "admin" ? "rgba(183,148,246,0.15)" : "rgba(99,179,237,0.15)",
                                                                    color: user.role === "admin" ? "#b794f6" : "#63b3ed",
                                                                    fontSize: "0.72rem", fontWeight: 700, fontFamily: "var(--font-heading)",
                                                                    textTransform: "uppercase", display: "inline-block",
                                                                }}>
                                                                    {user.role}
                                                                </div>
                                                            </div>
                                                            {activeTab === "admin" && (
                                                                <div>
                                                                    <span style={{ color: "#475569", fontSize: "0.72rem", fontFamily: "var(--font-heading)", textTransform: "uppercase" }}>Rol Display</span>
                                                                    <div style={{
                                                                        marginTop: "0.2rem", padding: "0.15rem 0.5rem", borderRadius: "0.3rem",
                                                                        background: "rgba(72,187,120,0.12)",
                                                                        color: "#48bb78",
                                                                        fontSize: "0.72rem", fontWeight: 700, fontFamily: "var(--font-heading)",
                                                                        display: "inline-block",
                                                                    }}>
                                                                        {user.display_role || "Administrador"}
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {activeTab === "admin" && (
                                                                <div>
                                                                    <span style={{ color: "#475569", fontSize: "0.72rem", fontFamily: "var(--font-heading)", textTransform: "uppercase" }}>Participación</span>
                                                                    <div style={{
                                                                        marginTop: "0.2rem", color: "#ecc94b",
                                                                        fontSize: "0.85rem", fontWeight: 800, fontFamily: "var(--font-heading)",
                                                                    }}>
                                                                        {user.profit_share_pct ?? 0}%
                                                                    </div>
                                                                </div>
                                                            )}
                                                            <div>
                                                                <span style={{ color: "#475569", fontSize: "0.72rem", fontFamily: "var(--font-heading)", textTransform: "uppercase" }}>ID</span>
                                                                <div style={{ color: "#64748b", fontSize: "0.72rem", marginTop: "0.2rem", fontFamily: "monospace" }}>
                                                                    {user.id.substring(0, 8)}...
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <span style={{ color: "#475569", fontSize: "0.72rem", fontFamily: "var(--font-heading)", textTransform: "uppercase" }}>Registrado</span>
                                                                <div style={{ color: "#475569", fontSize: "0.78rem", marginTop: "0.2rem" }}>
                                                                    {new Date(user.created_at).toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                <p style={{
                    color: "#475569", fontSize: "0.8rem", marginTop: "1rem",
                    fontFamily: "var(--font-heading)",
                }}>
                    {filtered.length} {activeTab === "admin" ? "administrador(es)" : "cliente(s)"}
                </p>
            </div>
        </AdminLayout>
    );
}
