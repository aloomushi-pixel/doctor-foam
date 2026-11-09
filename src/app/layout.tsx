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
  title: "Detallado Automotriz a Domicilio y Lavado de Autos CDMX | Doctor Foam",
  description:
    "Detallado automotriz a domicilio, lavado de asientos y vestiduras con vapor seco a 180°C, corrección de pintura (swirls) y cerámico 9H en CDMX y EdoMex. Unidad 100% autónoma (agua y luz propia). Lavado profundo desde $2,400 MXN y Membresía desde $990/mes (+10% OFF).",
  keywords: [
    "detallado automotriz a domicilio",
    "lavado de autos a domicilio",
    "lavado de autos a domicilio cdmx",
    "detallado automotriz cdmx",
    "lavado de asientos de auto",
    "lavado de vestiduras a domicilio cdmx",
    "detailing a domicilio",
    "car detailing CDMX",
    "lavado profundo de autos",
    "estética automotriz a domicilio",
    "Doctor Foam",
    "detallado a domicilio Polanco",
    "detallado automotriz Santa Fe",
    "detallado automotriz Huixquilucan",
    "recubrimiento cerámico CDMX",
    "corrección de pintura México",
    "lavado de autos en estacionamiento corporativo",
  ],
  authors: [{ name: "Doctor Foam México" }],
  openGraph: {
    title: "Detallado Automotriz a Domicilio y Lavado de Autos CDMX | Doctor Foam",
    description:
      "Llevamos el estudio de detallado automotriz a tu puerta en CDMX y EdoMex. Lavado profundo con vapor seco a 180°C ($2,400), corrección de pintura ($7,499), cerámico 9H ($10,999) y Membresía ($990/mes + 10% OFF) sin usar tu agua ni luz.",
    url: "https://drfoam.com.mx",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/hero-bg.png",
        width: 1200,
        height: 630,
        alt: "Doctor Foam Detallado Automotriz a Domicilio y Lavado de Autos Premium en CDMX",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Detallado Automotriz a Domicilio y Lavado de Autos CDMX | Doctor Foam",
    description:
      "Detallado automotriz a domicilio, lavado de asientos con vapor a 180°C y cerámico 9H en CDMX con unidad 100% autónoma.",
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
