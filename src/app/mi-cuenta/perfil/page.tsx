"use client";

import { useEffect, useState } from "react";


export default function ProfilePage() {
    const [profile, setProfile] = useState({ full_name: "", phone: "", default_address: "", default_vehicle: "" });
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch("/api/customer/profile");
                if (res.ok) {
                    const data = await res.json();
                    if (data.profile) {
                        setEmail(data.profile.email || "");
                        setProfile({
                            full_name: data.profile.full_name || "",
                            phone: data.profile.phone || "",
                            default_address: data.profile.address || data.profile.default_address || "",
                            default_vehicle: data.profile.vehicle_type || data.profile.default_vehicle || "",
                        });
                    }
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setSuccess(false);

        try {
            const res = await fetch("/api/customer/profile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(profile),
            });

            if (res.ok) {
                setSuccess(true);
                setTimeout(() => setSuccess(false), 3000);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <p style={{ color: "#94a3b8" }}>Cargando...</p>;

    const inputStyle = {
        width: "100%", padding: "0.75rem 1rem", borderRadius: "0.5rem",
        border: "1px solid rgba(96, 165, 250, 0.2)", background: "rgba(10, 22, 40, 0.8)",
        color: "white", fontSize: "0.9rem", outline: "none" as const,
    };

    return (
        <div>
            <h1 style={{ color: "white", fontFamily: "var(--font-heading)", fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                👤 Mi perfil
            </h1>
            <p style={{ color: "#94a3b8", marginBottom: "2rem" }}>Administra tu información personal</p>

            <div className="glass-card" style={{ maxWidth: "600px", padding: "2rem" }}>
                <form onSubmit={handleSave}>
                    <div style={{ display: "grid", gap: "1.25rem" }}>
                        <div>
                            <label style={{ color: "#94a3b8", fontSize: "0.8rem", fontFamily: "var(--font-heading)", display: "block", marginBottom: "0.3rem" }}>Email</label>
                            <input type="email" value={email} disabled style={{ ...inputStyle, opacity: 0.5, cursor: "not-allowed" }} />
                            <p style={{ color: "#475569", fontSize: "0.7rem", margin: "0.25rem 0 0" }}>El email no se puede cambiar</p>
                        </div>

                        <div>
                            <label style={{ color: "#94a3b8", fontSize: "0.8rem", fontFamily: "var(--font-heading)", display: "block", marginBottom: "0.3rem" }}>Nombre completo</label>
                            <input type="text" value={profile.full_name} onChange={(e) => setProfile({ ...profile, full_name: e.target.value })} placeholder="Tu nombre" style={inputStyle} />
                        </div>

                        <div>
                            <label style={{ color: "#94a3b8", fontSize: "0.8rem", fontFamily: "var(--font-heading)", display: "block", marginBottom: "0.3rem" }}>Teléfono</label>
                            <input type="tel" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} placeholder="55 1234 5678" style={inputStyle} />
                        </div>

                        <div>
                            <label style={{ color: "#94a3b8", fontSize: "0.8rem", fontFamily: "var(--font-heading)", display: "block", marginBottom: "0.3rem" }}>Dirección predeterminada</label>
                            <input type="text" value={profile.default_address} onChange={(e) => setProfile({ ...profile, default_address: e.target.value })} placeholder="Calle, número, colonia, alcaldía" style={inputStyle} />
                        </div>

                        <div>
                            <label style={{ color: "#94a3b8", fontSize: "0.8rem", fontFamily: "var(--font-heading)", display: "block", marginBottom: "0.3rem" }}>Vehículo principal</label>
                            <input type="text" value={profile.default_vehicle} onChange={(e) => setProfile({ ...profile, default_vehicle: e.target.value })} placeholder="Marca, modelo, año, color" style={inputStyle} />
                        </div>
                    </div>

                    {success && (
                        <div style={{ marginTop: "1rem", padding: "0.75rem", borderRadius: "0.5rem", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", color: "#34d399", fontSize: "0.85rem" }}>
                            ✅ Perfil actualizado correctamente
                        </div>
                    )}

                    <button type="submit" disabled={saving} className="btn-premium" style={{ marginTop: "1.5rem", width: "100%", justifyContent: "center" }}>
                        {saving ? "Guardando..." : "Guardar cambios"}
                    </button>
                </form>
            </div>
        </div>
    );
}
