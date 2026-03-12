"use client";

import InstallPrompt from "@/components/InstallPrompt";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const WHATSAPP_NUMBER = "525649663016";

const ADMIN_NAV_ITEMS = [
    { href: "/admin", label: "Dashboard", icon: "📊" },
    { href: "/admin/reservas", label: "Reservas", icon: "📋" },
    { href: "/admin/servicios", label: "Servicios", icon: "🛠️" },
    { href: "/admin/cuentas", label: "Liquidaciones", icon: "💰" },
    { href: "/admin/usuarios", label: "Usuarios", icon: "👥" },
    { href: "/admin/invitaciones", label: "Invitaciones", icon: "✉️" },
    { href: `https://wa.me/${WHATSAPP_NUMBER}`, label: "Soporte", icon: "💬", external: true },
];

const CUSTOMER_NAV_ITEMS = [
    { href: "/mi-cuenta", label: "Inicio", icon: "🏠" },
    { href: "/mi-cuenta/servicios", label: "Mis servicios", icon: "📋" },
    { href: "/mi-cuenta/reservar", label: "Reservar", icon: "📅" },
    { href: "/mi-cuenta/perfil", label: "Mi perfil", icon: "👤" },
    { href: `https://wa.me/${WHATSAPP_NUMBER}`, label: "WhatsApp", icon: "💬", external: true },
];

const OPERATOR_NAV_ITEMS = [
    { href: "/admin", label: "Dashboard", icon: "📊" },
    { href: "/admin/reservas", label: "Mis Asignaciones", icon: "📋" },
    { href: `https://wa.me/${WHATSAPP_NUMBER}`, label: "Soporte", icon: "💬", external: true },
];

export default function UnifiedDashboardLayout({ children, requiredRole }: { children: React.ReactNode, requiredRole?: "admin" | "customer" }) {
    const router = useRouter();
    const pathname = usePathname();
    const { data: session, status } = useSession();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        } else if (status === "authenticated") {
            const userRole = session?.user?.role || "customer";

            if (requiredRole && requiredRole === "admin" && userRole === "customer") {
                router.push("/mi-cuenta");
            } else if (requiredRole && requiredRole === "customer" && userRole !== "customer") {
                router.push("/admin");
            }
        }
    }, [status, session, router, requiredRole]);

    const handleLogout = async () => {
        await signOut({ redirect: false });
        router.push("/login");
    };

    if (status === "loading" || status === "unauthenticated") {
        return (
            <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc" }}>
                <div style={{ textAlign: "center", width: "100%" }}>
                    <div style={{ fontSize: "2rem", marginBottom: "1rem" }} className="spin">⚙️</div>
                    <p style={{ color: "#64748b", fontFamily: "var(--font-heading)" }}>Cargando portal...</p>
                </div>
                <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } .spin { animation: spin 1s linear infinite; display: inline-block; }`}</style>
            </div>
        );
    }

    const role = session?.user?.role || "customer";

    let currentNavItems = CUSTOMER_NAV_ITEMS;
    if (role === "admin") currentNavItems = ADMIN_NAV_ITEMS;
    else if (role === "operator" || role === "provider") currentNavItems = OPERATOR_NAV_ITEMS;

    return (
        <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex" }}>
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div onClick={() => setSidebarOpen(false)} style={{
                    position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 140,
                }} />
            )}

            {/* Topbar for mobile */}
            <div className="unified-topbar" style={{
                position: "fixed", top: 0, left: 0, right: 0, height: "60px",
                background: "white", borderBottom: "1px solid #e2e8f0", zIndex: 130,
                display: "flex", alignItems: "center", padding: "0 1rem", justifyContent: "space-between"
            }}>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    style={{
                        background: "none", border: "1px solid #e2e8f0", borderRadius: "0.5rem",
                        color: "#0f172a", width: "40px", height: "40px", display: "flex",
                        alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "1.2rem"
                    }}
                >
                    {sidebarOpen ? "✕" : "☰"}
                </button>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.1rem", color: "#0f172a" }}>
                    DOCTOR <span className="gradient-text">FOAM</span>
                </div>
                <div style={{ width: "40px" }} /> {/* Spacer */}
            </div>

            {/* Sidebar */}
            <aside
                className={`unified-sidebar ${sidebarOpen ? "open" : ""}`}
                style={{
                    width: "260px", minHeight: "100vh", background: "white",
                    borderRight: "1px solid #e2e8f0", display: "flex",
                    flexDirection: "column", position: "fixed", left: 0, top: 0, zIndex: 150,
                    transition: "transform 0.3s ease",
                }}
            >
                {/* Logo */}
                <div className="sidebar-logo-container" style={{ padding: "1.5rem", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Link href="/" style={{ textDecoration: "none", display: "block" }}>
                        <h1 style={{ margin: 0, color: "#0f172a", fontSize: "1.1rem", fontFamily: "var(--font-heading)", letterSpacing: "2px" }}>
                            DOCTOR <span className="gradient-text">FOAM</span>
                        </h1>
                        <p style={{ color: "#64748b", fontSize: "0.7rem", margin: "0.25rem 0 0" }}>
                            {role === "customer" ? "Mi cuenta" : "Admin Panel"}
                        </p>
                    </Link>
                    <button className="sidebar-close-btn" onClick={() => setSidebarOpen(false)} style={{ background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer", color: "#64748b" }}>
                        ✕
                    </button>
                </div>

                {/* Nav */}
                <nav style={{ flex: 1, padding: "1rem 0.75rem", overflowY: "auto" }}>
                    {currentNavItems.map((item) => {
                        const isActive = !item.external && (pathname === item.href || (item.href !== "/admin" && item.href !== "/mi-cuenta" && pathname.startsWith(item.href)));
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                target={item.external ? "_blank" : undefined}
                                rel={item.external ? "noopener noreferrer" : undefined}
                                onClick={() => !item.external && setSidebarOpen(false)}
                                style={{
                                    display: "flex", alignItems: "center", gap: "0.75rem",
                                    padding: "0.75rem 1rem", borderRadius: "0.5rem", marginBottom: "0.25rem",
                                    textDecoration: "none", fontSize: "0.9rem", transition: "all 0.2s",
                                    background: isActive ? "#eff6ff" : "transparent",
                                    color: isActive ? "#2563eb" : "#475569",
                                    borderLeft: isActive ? "3px solid #3b82f6" : "3px solid transparent",
                                    fontWeight: isActive ? 600 : 500,
                                    fontFamily: "var(--font-heading)",
                                }}
                            >
                                <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
                                <span>{item.label}</span>
                                {item.external && <span style={{ marginLeft: "auto", fontSize: "0.8rem", opacity: 0.5 }}>↗</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* User info + logout */}
                <div style={{ padding: "1rem 0.75rem", borderTop: "1px solid #e2e8f0" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                        <div style={{
                            width: "36px", height: "36px", borderRadius: "50%", flexShrink: 0,
                            background: role !== "customer" ? "linear-gradient(135deg, #3182ce, #b794f6)" : "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "white", fontWeight: 700, fontSize: "0.85rem",
                        }}>
                            {(session?.user?.name || session?.user?.email || "?")[0].toUpperCase()}
                        </div>
                        <div style={{ flex: 1, overflow: "hidden" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                                <p style={{ color: "#0f172a", fontSize: "0.8rem", margin: 0, fontWeight: 600, textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>
                                    {session?.user?.name || (role !== "customer" ? "Operador" : "Cliente")}
                                </p>
                                {role !== "customer" && (
                                    <span style={{
                                        fontSize: "0.55rem", padding: "0.1rem 0.35rem", borderRadius: "0.25rem",
                                        background: "rgba(183, 148, 246, 0.18)", color: "#b794f6", fontWeight: 700, textTransform: "uppercase"
                                    }}>
                                        {role}
                                    </span>
                                )}
                            </div>
                            <p style={{ color: "#64748b", fontSize: "0.7rem", margin: 0, textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>
                                {session?.user?.email}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        style={{
                            width: "100%", padding: "0.6rem 1rem", borderRadius: "0.5rem",
                            border: "1px solid rgba(239, 68, 68, 0.2)", background: "rgba(239, 68, 68, 0.05)",
                            color: "#ef4444", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600,
                            display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-heading)"
                        }}
                    >
                        🚪 <span>Cerrar sesión</span>
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <main className="unified-main-content" style={{ flex: 1, background: "#f8fafc", minHeight: "100vh" }}>
                <div style={{ maxWidth: role !== "customer" ? "1200px" : "1000px", margin: "0 auto", padding: "1.5rem" }}>
                    {children}
                </div>
            </main>

            <InstallPrompt />

            <style jsx global>{`
                .unified-topbar { display: none !important; }
                .sidebar-close-btn { display: none !important; }
                .unified-main-content { margin-left: 260px; padding-top: 0; }
                
                @media (max-width: 768px) {
                    .unified-topbar { display: flex !important; }
                    .sidebar-close-btn { display: block !important; }
                    .unified-sidebar { transform: translateX(-100%); }
                    .unified-sidebar.open { transform: translateX(0); }
                    .unified-main-content { margin-left: 0 !important; padding-top: 60px !important; }
                    .sidebar-logo-container { padding: 1rem !important; }
                }
                
                nav a:hover {
                    background: #f1f5f9 !important;
                    color: #0f172a !important;
                }
                
                /* Table animations for admin mostly */
                .unified-main-content table tbody tr { transition: background 0.15s ease; }
                .unified-main-content table tbody tr:hover { background: #f8fafc !important; }
            `}</style>
        </div>
    );
}
