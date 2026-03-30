import type { Metadata } from "next";
import "./globals.css";
import GuestChat from "@/components/GuestChat";

export const metadata: Metadata = {
  title: "Lavado de Autos a Domicilio CDMX | Detallado Premium en tu Garage",
  description:
    "Evita las filas y el daño a tu pintura. Llevamos el mejor lavado de autos a domicilio y un estudio de detallado de lujo a tu casa u oficina en CDMX. Agenda hoy.",
  keywords: [
    "lavado de autos a domicilio",
    "lavado de autos a domicilio cdmx",
    "detallado automotriz cdmx",
    "estética automotriz a domicilio",
    "lavado profundo de autos",
    "membresía lavado de auto",
    "lavado de vestiduras a domicilio cdmx",
    "recubrimiento cerámico CDMX",
    "corrección de pintura México",
    "lavado ecológico autos",
    "Doctor Foam",
  ],
  authors: [{ name: "Doctor Foam México" }],
  openGraph: {
    title: "Lavado de Autos a Domicilio CDMX | Doctor Foam México",
    description:
      "Llevamos un estudio de detallado automotriz premium a tu casa u oficina. Equipo industrial, químicos profesionales y resultados superiores a cualquier taller.",
    url: "https://drfoam.com.mx",
    siteName: "Doctor Foam México",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lavado de Autos a Domicilio CDMX | Doctor Foam México",
    description:
      "Evita las filas y el daño a tu pintura. Lavado de autos a domicilio con equipo industrial en CDMX. Agenda hoy.",
  },
  alternates: {
    canonical: "https://drfoam.com.mx",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* PWA */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0f2240" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Doctor Foam" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body>
        {children}
        <GuestChat />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js').catch(() => {});
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
