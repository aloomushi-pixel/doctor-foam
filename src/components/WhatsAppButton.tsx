"use client";

import { usePathname } from "next/navigation";

function getContextualWhatsAppMessage(pathname: string): string {
    if (pathname.startsWith("/lavado-recurrente-autos-domicilio")) {
        return "Hola Doctor Foam, estoy viendo Lavado Recurrente a Domicilio y me gustaría cotizar para mi auto.";
    }
    if (pathname.startsWith("/membresia-doctor-foam")) {
        return "Hola Doctor Foam, me interesa la Membresía de Seguimiento ($990/mes + 10% OFF permanente).";
    }
    if (pathname.startsWith("/lavado-profundo-vehiculos-cdmx")) {
        return "Hola Doctor Foam, me interesa un Lavado Profundo de Vestiduras / Detallado Automotriz a domicilio.";
    }
    if (pathname.startsWith("/lavado-autos-estacionamiento-corporativo")) {
        return "Hola Doctor Foam, me interesa el servicio de lavado autónomo en estacionamiento corporativo o condominio.";
    }
    if (pathname.startsWith("/zonas/")) {
        const zonaSlug = pathname.replace("/zonas/", "").replace(/-/g, " ");
        return `Hola Doctor Foam, estoy en ${zonaSlug} y quiero cotizar un servicio de detallado a domicilio con agua y luz propia.`;
    }
    if (pathname.startsWith("/blog/")) {
        if (pathname.includes("ceramico") || pathname.includes("ceras") || pathname.includes("polimeros")) {
            return "Hola Doctor Foam, leí su guía de Recubrimiento Cerámico 9H / Grafeno y quiero cotizar para mi auto a domicilio.";
        }
        if (pathname.includes("swirls") || pathname.includes("lluvia-acida") || pathname.includes("errores")) {
            return "Hola Doctor Foam, quiero cotizar una corrección de pintura y eliminación de swirls a domicilio en CDMX.";
        }
        if (pathname.includes("interior") || pathname.includes("180c")) {
            return "Hola Doctor Foam, quiero cotizar el Lavado Profundo de Interiores con vapor seco a 180°C a domicilio.";
        }
        return "Hola Doctor Foam, leí su artículo en el blog y me gustaría cotizar un detallado a domicilio para mi auto.";
    }
    if (pathname.startsWith("/reservar")) {
        return "Hola Doctor Foam, estoy en la página de reservas y me gustaría apoyo para agendar mi cita.";
    }
    return "Hola Doctor Foam, me interesa cotizar un servicio de lavado profundo o detallado automotriz a domicilio en CDMX.";
}

function getContextualWhatsAppLabel(pathname: string): string {
    if (pathname.startsWith("/zonas/")) {
        const z = pathname.replace("/zonas/", "");
        const zoneNames: Record<string, string> = {
            polanco: "Polanco",
            "lomas-de-chapultepec": "Lomas",
            "santa-fe": "Santa Fe",
            "bosques-de-las-lomas": "Bosques",
            pedregal: "Pedregal",
            interlomas: "Interlomas",
            huixquilucan: "Huixquilucan",
            coyoacan: "Coyoacán",
        };
        if (zoneNames[z]) return `Cotizar en ${zoneNames[z]}`;
    }
    if (pathname.startsWith("/blog/")) {
        if (pathname.includes("ceramico") || pathname.includes("ceras") || pathname.includes("polimeros")) {
            return "Cotizar Cerámico 9H";
        }
        if (pathname.includes("swirls") || pathname.includes("lluvia-acida") || pathname.includes("errores")) {
            return "Cotizar Pulido / Swirls";
        }
        if (pathname.includes("interior") || pathname.includes("180c")) {
            return "Cotizar Interior 180°C";
        }
        return "Cotizar a Domicilio";
    }
    if (pathname.startsWith("/membresia-doctor-foam")) return "Activar Membresía";
    if (pathname.startsWith("/lavado-profundo-vehiculos-cdmx")) return "Cotizar Detallado";
    if (pathname.startsWith("/lavado-recurrente-autos-domicilio")) return "Cotizar Recurrente";
    if (pathname.startsWith("/lavado-autos-estacionamiento-corporativo")) return "Cotizar Corporativo";
    if (pathname.startsWith("/reservar")) return "Ayuda para Reservar";
    return "Cotizar a Domicilio";
}

export default function WhatsAppButton() {
    const pathname = usePathname() || "/";
    const message = getContextualWhatsAppMessage(pathname);
    const label = getContextualWhatsAppLabel(pathname);
    const whatsappUrl = `https://wa.me/525610846022?text=${encodeURIComponent(message)}`;

    return (
        <a
            id="drfoam-floating-whatsapp"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cta-location={`floating_whatsapp_${pathname}`}
            style={{
                position: "fixed",
                bottom: "20px",
                right: "20px",
                backgroundColor: "#25D366",
                color: "white",
                height: "54px",
                padding: "0 18px 0 14px",
                borderRadius: "9999px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                boxShadow: "0 6px 20px rgba(22, 163, 74, 0.38)",
                zIndex: 9999,
                textDecoration: "none",
                fontFamily: "var(--font-heading), sans-serif",
                fontWeight: 700,
                fontSize: "0.88rem",
                letterSpacing: "0.01em",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
            }}
            aria-label="Contactar por WhatsApp"
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px) scale(1.03)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(37, 211, 102, 0.5)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(22, 163, 74, 0.38)";
            }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                fill="currentColor"
                viewBox="0 0 16 16"
                style={{ flexShrink: 0 }}
            >
                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
            </svg>
            <span>{label}</span>
        </a>
    );
}
