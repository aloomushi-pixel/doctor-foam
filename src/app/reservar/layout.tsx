import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Reservar Lavado de Autos y Vestiduras a Domicilio CDMX | Agenda en Línea — Doctor Foam",
    description:
        "Cotiza por tamaño de vehículo y agenda en línea tu lavado profundo de vestiduras con vapor a 180°C, detallado automotriz o cerámico 9H a domicilio en CDMX. Pago seguro y factura CFDI.",
    alternates: {
        canonical: "https://drfoam.com.mx/reservar",
    },
    openGraph: {
        title: "Agenda tu Detallado y Lavado Profundo a Domicilio en CDMX | Doctor Foam",
        description:
            "Selecciona tu paquete, tamaño de vehículo y fecha en minutos. Servicio 100% autónomo a domicilio u oficina en CDMX.",
        url: "https://drfoam.com.mx/reservar",
    },
};

const reserveJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Reservar Servicio de Lavado Profundo y Detallado a Domicilio — Doctor Foam México",
    description:
        "Cotizador y agenda en línea de lavado de vestiduras a vapor 180°C, corrección de pintura y recubrimiento cerámico a domicilio en CDMX.",
    url: "https://drfoam.com.mx/reservar",
    potentialAction: {
        "@type": "ReserveAction",
        target: {
            "@type": "EntryPoint",
            urlTemplate: "https://drfoam.com.mx/reservar",
            inLanguage: "es-MX",
            actionPlatform: [
                "http://schema.org/DesktopWebPlatform",
                "http://schema.org/MobileWebPlatform",
            ],
        },
        result: {
            "@type": "Reservation",
            name: "Cita de Detallado Automotriz a Domicilio Doctor Foam",
        },
    },
};

export default function ReservarLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(reserveJsonLd) }}
            />
            {children}
        </>
    );
}
