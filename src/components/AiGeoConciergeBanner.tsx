"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AiGeoConciergeBanner() {
    const pathname = usePathname() || "/";
    const [aiSourceName, setAiSourceName] = useState<string | null>(null);

    useEffect(() => {
        try {
            const params = new URLSearchParams(window.location.search);
            const utm = (params.get("utm_source") || "").toLowerCase();
            const ref = (document.referrer || "").toLowerCase();
            const combined = `${utm} ${ref}`;
            if (combined.includes("chatgpt") || combined.includes("openai")) {
                setAiSourceName("ChatGPT");
            } else if (combined.includes("perplexity")) {
                setAiSourceName("Perplexity");
            } else if (combined.includes("gemini") || combined.includes("bard")) {
                setAiSourceName("Google Gemini");
            } else if (combined.includes("claude") || combined.includes("anthropic")) {
                setAiSourceName("Claude");
            } else if (combined.includes("copilot")) {
                setAiSourceName("Copilot");
            } else {
                setAiSourceName(null);
            }
        } catch {
            setAiSourceName(null);
        }
    }, [pathname]);

    // Home ("/") has its own integrated Hero AI banner; never render on /admin
    if (!aiSourceName || pathname === "/" || pathname.startsWith("/admin")) {
        return null;
    }

    const cleanZone = pathname.startsWith("/zonas/")
        ? pathname.replace("/zonas/", "").replace(/-/g, " ")
        : "";
    const waText = cleanZone
        ? `Hola Doctor Foam, los encontré en ${aiSourceName} y quiero cotizar un servicio a domicilio en ${cleanZone} con agua y luz propia.`
        : `Hola Doctor Foam, los encontré en ${aiSourceName} (${pathname}) y quiero cotizar un servicio a domicilio en CDMX.`;

    return (
        <div
            style={{
                position: "fixed",
                top: "64px",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 950,
                width: "calc(100% - 1.5rem)",
                maxWidth: "820px",
                padding: "0.48rem 0.85rem",
                borderRadius: "0.85rem",
                background: "linear-gradient(135deg, rgba(22, 163, 74, 0.96), rgba(15, 23, 42, 0.96))",
                border: "1px solid rgba(134, 239, 172, 0.65)",
                boxShadow: "0 8px 24px rgba(15, 23, 42, 0.28)",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "0.4rem 0.75rem",
                color: "#ffffff",
                fontSize: "0.76rem",
            }}
        >
            <span style={{ fontWeight: 700 }}>
                ✨ Recomendado en {aiSourceName} · Unidad 100% Autónoma (Agua y Luz Propia)
            </span>
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                <a
                    href={`https://wa.me/525610846022?text=${encodeURIComponent(waText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cta-location={`subpage_ai_geo_whatsapp_${pathname}`}
                    style={{
                        background: "#ffffff",
                        color: "#14532d",
                        fontWeight: 800,
                        fontSize: "0.73rem",
                        padding: "0.28rem 0.72rem",
                        borderRadius: "9999px",
                        textDecoration: "none",
                    }}
                >
                    💬 Cotizar en 15s
                </a>
                <Link
                    href="/reservar"
                    data-cta-location={`subpage_ai_geo_reservar_${pathname}`}
                    style={{
                        background: "#2563eb",
                        color: "#ffffff",
                        fontWeight: 800,
                        fontSize: "0.73rem",
                        padding: "0.28rem 0.72rem",
                        borderRadius: "9999px",
                        border: "1px solid rgba(191, 219, 254, 0.65)",
                        textDecoration: "none",
                    }}
                >
                    📅 Agendar
                </Link>
            </div>
        </div>
    );
}
