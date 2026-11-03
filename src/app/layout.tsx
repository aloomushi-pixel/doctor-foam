import AuthProvider from "@/components/AuthProvider";
import DrFoamTelemetry from "@/components/DrFoamTelemetry";
import WhatsAppButton from "@/components/WhatsAppButton";
import type { Metadata } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"], variable: '--font-body', display: 'swap' });
const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"], variable: '--font-heading', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL("https://drfoam.com.mx"),
  title: "Lavado de Autos a Domicilio CDMX | Detallado Premium en tu Garage — Doctor Foam",
  description:
    "Evita las filas y el daño a tu pintura. Llevamos el mejor lavado de autos a domicilio y un estudio de detallado automotriz de lujo (vapor seco 180°C, corrección de pintura y cerámico 9H) a tu casa u oficina en CDMX. Agenda hoy desde $2,499 MXN.",
  keywords: [
    "lavado de autos a domicilio",
    "lavado de autos a domicilio cdmx",
    "detallado automotriz cdmx",
    "car detailing CDMX",
    "lavado profundo de autos",
    "lavado de vestiduras a domicilio cdmx",
    "estética automotriz a domicilio",
    "Doctor Foam",
    "detallado a domicilio Polanco",
    "detallado automotriz Santa Fe",
    "recubrimiento cerámico CDMX",
    "corrección de pintura México",
    "lavado de autos en estacionamiento corporativo",
  ],
  authors: [{ name: "Doctor Foam México" }],
  openGraph: {
    title: "Lavado de Autos a Domicilio CDMX | Detallado Automotriz Premium — Doctor Foam",
    description:
      "Llevamos el estudio de detallado a tu puerta en CDMX. Vapor seco a 180°C, corrección de pintura certificada IDA y recubrimiento cerámico 9H/10H sin usar tu agua ni electricidad.",
    url: "https://drfoam.com.mx",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/hero-bg.png",
        width: 1200,
        height: 630,
        alt: "Doctor Foam Lavado de Autos a Domicilio y Detallado Premium en CDMX",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lavado de Autos a Domicilio CDMX | Detallado Premium — Doctor Foam",
    description:
      "Servicio de lavado profundo y detallado automotriz a domicilio en CDMX. Equipo industrial 100% autónomo + químicos especializados.",
    images: ["/hero-bg.png"],
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/icon-192.png",
    shortcut: "/icon-192.png",
  },
  alternates: {
    canonical: "./",
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
    <html lang="es" className={`${dmSans.variable} ${outfit.variable}`}>
      <head>
        {/* PWA */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0f2240" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Doctor Foam" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body>
        <AuthProvider>
          <DrFoamTelemetry />
          {children}
          <WhatsAppButton />
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
        </AuthProvider>
      </body>
    </html>
  );
}
