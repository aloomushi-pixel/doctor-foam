"use client";

import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/lib/supabase";
import type { User } from "@/lib/types";
import React, { useCallback, useEffect, useState } from "react";

/* User type from @/lib/types */

export default function UsuariosPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedUser, setExpandedUser] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<"admin" | "customer">("admin");
    const [search, setSearch] = useState("");
    const [token, setToken] = useState<string | null>(null);

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

    return (
        <AdminLayout>
            <div>
                <h1 className="gradient-text" style={{
                    fontFamily: "var(--font-heading)", fontSize: "1.8rem",
                    fontWeight: 800, marginBottom: "0.5rem",
                }}>
                    Gestión de Usuarios
                </h1>
                <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                    Administra los usuarios de la plataforma
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
                                    ? "1px solid rgba(59, 130, 246, 0.4)"
                                    : "1px solid rgba(96, 165, 250, 0.1)",
                                background: activeTab === tab
                                    ? "rgba(59, 130, 246, 0.15)"
                                    : "rgba(255, 255, 255, 0.03)",
                                color: activeTab === tab ? "#60a5fa" : "#94a3b8",
                                cursor: "pointer", fontFamily: "var(--font-heading)",
                                fontWeight: 700, fontSize: "0.85rem",
                                transition: "all 0.2s",
                            }}
                        >
                            {tab === "admin" ? "👤 Administradores" : "👥 Clientes"}
                        </button>
                    ))}
                </div>

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
                            border: "1px solid rgba(96, 165, 250, 0.15)",
                            background: "rgba(255, 255, 255, 0.03)",
                            color: "white", fontSize: "0.9rem",
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
                        background: "rgba(255, 255, 255, 0.02)", borderRadius: "0.75rem",
                        border: "1px solid rgba(96, 165, 250, 0.08)", color: "#64748b",
                    }}>
                        No se encontraron {activeTab === "admin" ? "administradores" : "clientes"}
                    </div>
                ) : (
                    <div style={{
                        background: "rgba(255, 255, 255, 0.02)", borderRadius: "0.75rem",
                        border: "1px solid rgba(96, 165, 250, 0.08)", overflow: "hidden",
                    }}>
                        <div style={{ overflowX: "auto" }}>
                            <table className="admin-table-responsive" style={{ width: "100%", borderCollapse: "collapse" }}>
                                <thead>
                                    <tr style={{ borderBottom: "1px solid rgba(96, 165, 250, 0.1)" }}>
                                        {["Nombre", "Email", "Teléfono", "Creado", "Último login"].map(h => (
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
                                                onClick={() => setExpandedUser(expandedUser === user.id ? null : user.id)}
                                                style={{
                                                    borderBottom: "1px solid rgba(96, 165, 250, 0.05)",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                <td style={{
                                                    padding: "0.75rem 1rem", color: "white",
                                                    fontSize: "0.9rem", fontWeight: 600,
                                                    fontFamily: "var(--font-heading)",
                                                }}>
                                                    {user.name} {expandedUser === user.id ? "▾" : "▸"}
                                                </td>
                                                <td style={{
                                                    padding: "0.75rem 1rem", color: "#94a3b8",
                                                    fontSize: "0.85rem",
                                                }}>
                                                    {user.email}
                                                </td>
                                                <td style={{
                                                    padding: "0.75rem 1rem", color: "#94a3b8",
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
                                            </tr>
                                            {expandedUser === user.id && (
                                                <tr>
                                                    <td colSpan={5} style={{
                                                        padding: "0.75rem 1rem 1rem 2rem",
                                                        background: "rgba(59,130,246,0.04)",
                                                        borderBottom: "1px solid rgba(96,165,250,0.08)",
                                                    }}>
                                                        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", alignItems: "center" }}>
                                                            <div>
                                                                <span style={{ color: "#475569", fontSize: "0.72rem", fontFamily: "var(--font-heading)", textTransform: "uppercase" }}>Rol</span>
                                                                <div style={{
                                                                    marginTop: "0.2rem", padding: "0.15rem 0.5rem", borderRadius: "0.3rem",
                                                                    background: user.role === "admin" ? "rgba(124,58,237,0.15)" : "rgba(59,130,246,0.15)",
                                                                    color: user.role === "admin" ? "#a78bfa" : "#60a5fa",
                                                                    fontSize: "0.72rem", fontWeight: 700, fontFamily: "var(--font-heading)",
                                                                    textTransform: "uppercase", display: "inline-block",
                                                                }}>
                                                                    {user.role}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <span style={{ color: "#475569", fontSize: "0.72rem", fontFamily: "var(--font-heading)", textTransform: "uppercase" }}>ID</span>
                                                                <div style={{ color: "#64748b", fontSize: "0.72rem", marginTop: "0.2rem", fontFamily: "monospace" }}>
                                                                    {user.id.substring(0, 8)}...
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <span style={{ color: "#475569", fontSize: "0.72rem", fontFamily: "var(--font-heading)", textTransform: "uppercase" }}>Registrado</span>
                                                                <div style={{ color: "#94a3b8", fontSize: "0.78rem", marginTop: "0.2rem" }}>
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
