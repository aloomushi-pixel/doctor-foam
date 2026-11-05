import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Reservar Lavado de Autos y Vestiduras a Domicilio CDMX | Cotizador — Doctor Foam",
    description:
        "Cotiza al instante por tamaño de vehículo y agenda en línea o por WhatsApp tu lavado profundo de vestiduras con vapor a 180°C, detallado automotriz o cerámico 9H a domicilio en CDMX.",
    alternates: {
        canonical: "https://drfoam.com.mx/reservar",
    },
    openGraph: {
        title: "Agenda tu Detallado y Lavado de Vestiduras a Domicilio en CDMX | Doctor Foam",
        description:
            "Selecciona tu paquete, tamaño de vehículo y fecha en minutos. Servicio 100% autónomo con agua y luz propia a domicilio u oficina en CDMX.",
        url: "https://drfoam.com.mx/reservar",
    },
};

const reserveJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Reservar Servicio de Lavado Profundo de Vestiduras y Detallado a Domicilio — Doctor Foam México",
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

const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: "https://drfoam.com.mx/",
        },
        {
            "@type": "ListItem",
            position: 2,
            name: "Reservar y Cotizar a Domicilio",
            item: "https://drfoam.com.mx/reservar",
        },
    ],
};

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "¿Cómo funciona la reserva de lavado de vestiduras y detallado a domicilio en CDMX?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Elige tu paquete (Industrial Deep Interior, Signature Detail, Ceramic Coating o Foam Maintenance), selecciona el tamaño de tu vehículo (Sedán/SUV 2 filas o Pick Up/SUV 3 filas) y agenda pagando en línea con tarjeta o directamente por WhatsApp. Llegamos con unidad 100% autónoma a tu casa u oficina.",
            },
        },
        {
            "@type": "Question",
            name: "¿Puedo facturar (CFDI) mi servicio de detallado automotriz en Doctor Foam?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Sí. Todos nuestros precios incluyen IVA y en el paso 3 de tu reserva puedes activar la casilla de facturación CFDI para recibir tu factura fiscal automáticamente.",
            },
        },
    ],
};

export default function ReservarLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(reserveJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            {children}
        </>
    );
}
