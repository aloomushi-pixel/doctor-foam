"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

function InvitacionContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const tokenParam = searchParams.get("token") || "";
    const emailParam = searchParams.get("email") || "";

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState<{ role: string; message: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres");
            return;
        }
        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/auth/accept-invitation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token: tokenParam,
                    email: emailParam,
                    name: name.trim(),
                    password,
                }),
            });
            const data = await res.json();
            if (res.ok) {
                setSuccess({ role: data.role, message: data.message });
                // Auto-login
                if (data.role === "admin") {
                    setTimeout(() => {
                        supabase.auth.signInWithPassword({ email: emailParam, password })
                            .then(({ error }) => {
                                if (!error) router.push("/admin");
                            });
                    }, 2000);
                }
            } else {
                setError(data.error || "Error al procesar la invitación");
            }
        } catch {
            setError("Error de conexión");
        }
        setLoading(false);
    };

    if (!tokenParam || !emailParam) {
        return (
            <div style={{
                minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
                background: "var(--color-bg-primary)", color: "#f87171",
                fontFamily: "var(--font-heading)", padding: "2rem",
            }}>
                <div style={{ textAlign: "center" }}>
                    <h2 style={{ fontSize: "1.3rem", marginBottom: "1rem" }}>Enlace inválido</h2>
                    <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
                        Este enlace de invitación no es válido o ha expirado.
                    </p>
                </div>
            </div>
        );
    }

    if (success) {
        return (
            <div style={{
                minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
                background: "var(--color-bg-primary)", padding: "2rem",
            }}>
                <div style={{
                    maxWidth: "440px", width: "100%", textAlign: "center",
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(34, 197, 94, 0.2)",
                    borderRadius: "1rem", padding: "2.5rem",
                }}>
                    <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
                    <h2 style={{
                        fontFamily: "var(--font-heading)", fontSize: "1.3rem",
                        color: "#4ade80", fontWeight: 800, marginBottom: "0.75rem",
                    }}>
                        ¡Cuenta creada!
                    </h2>
                    <p style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.6 }}>
                        {success.message}
                    </p>
                    {success.role === "admin" && (
                        <p style={{ color: "#64748b", fontSize: "0.8rem", marginTop: "1rem" }}>
                            Redirigiendo al panel de administración...
                        </p>
                    )}
                    {success.role === "customer" && (
                        <Link href="/mi-cuenta" style={{
                            display: "inline-block", marginTop: "1.5rem",
                            padding: "0.75rem 2rem", borderRadius: "0.5rem",
                            background: "linear-gradient(135deg, #2563eb, #3b82f6)",
                            color: "white", textDecoration: "none",
                            fontFamily: "var(--font-heading)", fontWeight: 700,
                        }}>
                            Ir a mi cuenta
                        </Link>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
            background: "var(--color-bg-primary)", padding: "2rem",
        }}>
            <div style={{
                maxWidth: "440px", width: "100%",
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(96, 165, 250, 0.12)",
                borderRadius: "1rem", padding: "2.5rem",
            }}>
                <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                    <h1 style={{
                        fontFamily: "var(--font-heading)", fontWeight: 800,
                        fontSize: "1.3rem", color: "white", marginBottom: "0.5rem",
                    }}>
                        DOCTOR <span className="gradient-text">FOAM</span>
                    </h1>
                    <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
                        Completa tu registro para acceder
                    </p>
                    <p style={{
                        color: "#60a5fa", fontSize: "0.85rem",
                        fontFamily: "var(--font-heading)", fontWeight: 600,
                        marginTop: "0.5rem",
                    }}>
                        {emailParam}
                    </p>
                </div>

                {error && (
                    <div style={{
                        padding: "0.75rem 1rem", borderRadius: "0.5rem",
                        background: "rgba(239, 68, 68, 0.1)",
                        border: "1px solid rgba(239, 68, 68, 0.2)",
                        color: "#f87171", fontSize: "0.85rem",
                        marginBottom: "1.5rem",
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "1.25rem" }}>
                        <label style={{
                            display: "block", color: "#94a3b8", fontSize: "0.8rem",
                            fontWeight: 600, marginBottom: "0.4rem",
                            fontFamily: "var(--font-heading)",
                        }}>
                            Nombre completo
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                            placeholder="Tu nombre"
                            style={{
                                width: "100%", padding: "0.7rem 1rem",
                                borderRadius: "0.5rem",
                                border: "1px solid rgba(96, 165, 250, 0.15)",
                                background: "rgba(255, 255, 255, 0.03)",
                                color: "white", fontSize: "0.9rem",
                                fontFamily: "var(--font-heading)", outline: "none",
                                boxSizing: "border-box",
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: "1.25rem" }}>
                        <label style={{
                            display: "block", color: "#94a3b8", fontSize: "0.8rem",
                            fontWeight: 600, marginBottom: "0.4rem",
                            fontFamily: "var(--font-heading)",
                        }}>
                            Contraseña
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            minLength={6}
                            placeholder="Mínimo 6 caracteres"
                            style={{
                                width: "100%", padding: "0.7rem 1rem",
                                borderRadius: "0.5rem",
                                border: "1px solid rgba(96, 165, 250, 0.15)",
                                background: "rgba(255, 255, 255, 0.03)",
                                color: "white", fontSize: "0.9rem",
                                fontFamily: "var(--font-heading)", outline: "none",
                                boxSizing: "border-box",
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: "1.75rem" }}>
                        <label style={{
                            display: "block", color: "#94a3b8", fontSize: "0.8rem",
                            fontWeight: 600, marginBottom: "0.4rem",
                            fontFamily: "var(--font-heading)",
                        }}>
                            Confirmar contraseña
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            required
                            placeholder="Repite tu contraseña"
                            style={{
                                width: "100%", padding: "0.7rem 1rem",
                                borderRadius: "0.5rem",
                                border: "1px solid rgba(96, 165, 250, 0.15)",
                                background: "rgba(255, 255, 255, 0.03)",
                                color: "white", fontSize: "0.9rem",
                                fontFamily: "var(--font-heading)", outline: "none",
                                boxSizing: "border-box",
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: "100%", padding: "0.85rem",
                            borderRadius: "0.5rem", border: "none",
                            background: "linear-gradient(135deg, #2563eb, #3b82f6)",
                            color: "white", fontFamily: "var(--font-heading)",
                            fontWeight: 700, fontSize: "1rem", cursor: loading ? "not-allowed" : "pointer",
                            opacity: loading ? 0.6 : 1,
                        }}
                    >
                        {loading ? "Creando cuenta..." : "Crear mi cuenta"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default function InvitacionPage() {
    return (
        <Suspense fallback={
            <div style={{
                minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
                background: "var(--color-bg-primary)", color: "#94a3b8",
            }}>
                Cargando...
            </div>
        }>
            <InvitacionContent />
        </Suspense>
    );
}
