"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function SuccessContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const [waMessage, setWaMessage] = useState("");

    useEffect(() => {
        const msg = localStorage.getItem("waMessage");
        if (msg) {
            setWaMessage(msg);
        }
    }, []);

    return (
        <>
            <nav className="navbar navbar-scrolled">
                <div className="navbar-inner">
                    <Link href="/" style={{ textDecoration: "none" }}>
                        <span
                            style={{
                                fontFamily: "var(--font-heading)",
                                fontWeight: 800,
                                fontSize: "1.3rem",
                                color: "white",
                            }}
                        >
                            DOCTOR <span className="gradient-text">FOAM</span>
                        </span>
                    </Link>
                </div>
            </nav>

            <main
                style={{
                    paddingTop: "8rem",
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <section className="section-padding">
                    <div className="container" style={{ maxWidth: "700px", textAlign: "center" }}>
                        {/* Success animation */}
                        <div
                            style={{
                                width: "120px",
                                height: "120px",
                                borderRadius: "50%",
                                background: "rgba(16, 185, 129, 0.1)",
                                border: "3px solid var(--color-accent-emerald)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "0 auto 2rem",
                                fontSize: "3.5rem",
                                animation: "fadeInUp 0.6s ease forwards",
                            }}
                        >
                            ✓
                        </div>

                        <h1
                            style={{
                                fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                                marginBottom: "1rem",
                                animation: "fadeInUp 0.6s ease 0.1s forwards",
                                opacity: 0,
                            }}
                        >
                            ¡Pago{" "}
                            <span className="gradient-text">confirmado</span>!
                        </h1>

                        <p
                            style={{
                                color: "#94a3b8",
                                fontSize: "1.1rem",
                                lineHeight: "1.8",
                                maxWidth: "500px",
                                margin: "0 auto 2rem",
                                animation: "fadeInUp 0.6s ease 0.2s forwards",
                                opacity: 0,
                            }}
                        >
                            Tu pago ha sido procesado exitosamente. En las próximas horas, un
                            asesor de ventas de Doctor Foam se comunicará contigo por nuestro chat interno
                            para{" "}
                            <strong style={{ color: "white" }}>
                                agendar día y hora de tu servicio
                            </strong>
                        </p>

                        <div style={{ marginBottom: "2.5rem" }}>
                            <a 
                                href={`https://api.whatsapp.com/send?phone=525610846022&text=${encodeURIComponent(waMessage || "¡Hola! Acabo de pagar mi reserva en Doctor Foam.")}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="btn-premium"
                                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "1.2rem", padding: "1rem 2rem", background: "#25D366", color: "white", textDecoration: "none", borderRadius: "12px", fontWeight: "bold" }}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                                </svg>
                                Seguir por WhatsApp
                            </a>
                        </div>

                        <div
                            className="glass-card"
                            style={{
                                padding: "2rem",
                                marginBottom: "2rem",
                                textAlign: "left",
                                animation: "fadeInUp 0.6s ease 0.3s forwards",
                                opacity: 0,
                            }}
                        >
                            <h3
                                style={{
                                    fontSize: "1rem",
                                    marginBottom: "1rem",
                                    fontFamily: "var(--font-heading)",
                                }}
                            >
                                ¿Qué sigue?
                            </h3>
                            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                {[
                                    {
                                        step: "1",
                                        title: "Confirmación por email",
                                        desc: "Recibirás un comprobante de pago y una factura (si la solicitaste) en tu correo electrónico.",
                                    },
                                    {
                                        step: "2",
                                        title: "Te contactamos por chat",
                                        desc: "Un asesor de Doctor Foam se comunicará contigo en máximo 4 horas hábiles.",
                                    },
                                    {
                                        step: "3",
                                        title: "Agendamos tu servicio",
                                        desc: "Coordinaremos día, hora y acceso al lugar donde atenderemos tu vehículo.",
                                    },
                                    {
                                        step: "4",
                                        title: "¡El día del servicio!",
                                        desc: "Llegamos con nuestro equipo industrial completo a la puerta de tu casa.",
                                    },
                                ].map((item) => (
                                    <div key={item.step} style={{ display: "flex", gap: "1rem" }}>
                                        <div
                                            style={{
                                                width: "36px",
                                                height: "36px",
                                                borderRadius: "50%",
                                                background:
                                                    "linear-gradient(135deg, var(--color-gold-500), var(--color-gold-400))",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontSize: "0.85rem",
                                                fontWeight: 800,
                                                color: "#0a1628",
                                                flexShrink: 0,
                                                fontFamily: "var(--font-heading)",
                                            }}
                                        >
                                            {item.step}
                                        </div>
                                        <div>
                                            <div
                                                style={{
                                                    fontWeight: 700,
                                                    color: "white",
                                                    fontSize: "0.95rem",
                                                    fontFamily: "var(--font-heading)",
                                                }}
                                            >
                                                {item.title}
                                            </div>
                                            <div style={{ color: "#94a3b8", fontSize: "0.85rem" }}>
                                                {item.desc}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {sessionId && (
                            <p
                                style={{
                                    color: "#475569",
                                    fontSize: "0.75rem",
                                    marginBottom: "1.5rem",
                                    animation: "fadeInUp 0.6s ease 0.4s forwards",
                                    opacity: 0,
                                }}
                            >
                                ID de transacción: {sessionId.slice(0, 20)}…
                            </p>
                        )}

                        <div
                            style={{
                                display: "flex",
                                gap: "1rem",
                                justifyContent: "center",
                                flexWrap: "wrap",
                                animation: "fadeInUp 0.6s ease 0.5s forwards",
                                opacity: 0,
                            }}
                        >
                            <Link href="/" className="btn-premium">
                                Volver al inicio
                            </Link>
                            <Link href="?chat=open" className="btn-outline">
                                💬 Ir al chat
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="footer">
                <div className="footer-bottom" style={{ borderTop: "none", marginTop: 0 }}>
                    <p>
                        &copy; {new Date().getFullYear()} Doctor Foam México. Todos los derechos
                        reservados.
                    </p>
                </div>
            </footer>
        </>
    );
}

export default function PagoExitosoPage() {
    return (
        <Suspense
            fallback={
                <div
                    style={{
                        minHeight: "100vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#94a3b8",
                    }}
                >
                    Cargando...
                </div>
            }
        >
            <SuccessContent />
        </Suspense>
    );
}
