"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

/* ─── Bubble Cluster Logo — Static SVG ─── */
function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={className} style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem" }}>
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: "2.6rem", width: "2.6rem", flexShrink: 0 }}
        aria-label="Doctor Foam"
        role="img"
      >
        <defs>
          <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
        </defs>

        {/* Main bubble */}
        <circle cx="40" cy="45" r="26" fill="url(#lg)" opacity="0.08" />
        <circle cx="40" cy="45" r="26" fill="none" stroke="url(#lg)" strokeWidth="2" />

        {/* Medium bubble — top right */}
        <circle cx="76" cy="30" r="14" fill="url(#lg)" opacity="0.06" />
        <circle cx="76" cy="30" r="14" fill="none" stroke="url(#lg)" strokeWidth="1.5" opacity="0.75" />

        {/* Small bubble — bottom right */}
        <circle cx="78" cy="68" r="9" fill="url(#lg)" opacity="0.12" />

        {/* Tiny bubble — top left */}
        <circle cx="20" cy="18" r="6" fill="url(#lg)" opacity="0.1" />
      </svg>

      {/* Wordmark */}
      <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.3rem", lineHeight: 1.1, letterSpacing: "-0.01em" }}>
        <span style={{ color: "#ffffff", WebkitTextStroke: "1.5px #2563eb", paintOrder: "stroke fill" }}>DOCTOR</span>{" "}
        <span className="gradient-text">FOAM</span>
      </span>
    </span>
  );
}

/* ─── Chat Icon ─── */
function ChatIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
      <path d="M7 9h10v2H7zm0-3h10v2H7zm0 6h7v2H7z" />
    </svg>
  );
}

/* ─── Main Service Packages ─── */
const mainServices = [
  {
    icon: "♨️",
    title: "Industrial Deep Interior",
    tagline: "Lavado de asientos de auto, vestiduras y restauración interior",
    desc: "Tu interior absorbe todo: polvo, bacterias, ácaros, derrames invisibles. Nuestro protocolo de lavado de asientos de auto y vestiduras con vapor seco industrial a 180°C penetra cada fibra del tapizado y elimina lo que una aspiradora jamás alcanza. Usamos inyección-extracción de grado hospitalario para remover manchas profundas, olores atrapados y alérgenos. Las pieles Connolly y Nappa reciben hidratación especializada para evitar grietas. Al terminar, sanitizamos con ozono médico — tu cabina queda clínicamente limpia, no solo bonita.",
    highlights: ["Vapor seco 180°C", "Lavado de asientos y vestiduras", "Sanitización con ozono", "Pieles hidratadas"],
    image: "/services/deep-interior.jpg",
    bookingId: "deep-interior",
  },
  {
    icon: "💎",
    title: "Signature Detail",
    tagline: "Pulido de autos, corrección de pintura + interior completo",
    desc: "Los micro-rayones (swirls) hacen que tu pintura luzca opaca bajo el sol. Nuestro servicio de estética automotriz y pulido de autos a domicilio en CDMX corrige la pintura en 2-3 etapas con técnicos certificados IDA, eliminando hasta el 95% de imperfecciones para un acabado espejo superior a cualquier lavado y encerado tradicional. Incluye el Industrial Deep Interior completo, sellador cerámico express de 6 meses, limpieza de motor con vapor seco y acondicionamiento de rines. Todo en un solo día, sin mover tu auto.",
    highlights: ["Pulido y corrección 2-3 etapas", "Swirls eliminados 95%", "Interior y bahía de motor", "Sellador cerámico 6 meses"],
    image: "/services/signature-detail.jpg",
    bookingId: "signature-detail",
  },
  {
    icon: "🛡️",
    title: "Ceramic Coating",
    tagline: "Protección de nueva generación",
    desc: "La pintura de tu auto enfrenta lluvia ácida, rayos UV, contaminantes industriales y excrementos de aves — todos degradan el clear coat silenciosamente. Nuestro recubrimiento cerámico profesional crea un escudo invisible de dureza 9H que repele agua, suciedad y químicos durante 3 a 5 años. Incluye preparación completa de superficie y certificado Doctor Foam. ¿Quieres más? El upgrade Graphene Shield ofrece 5-7 años de protección con dureza 10H y efecto hidrofóbico superior.",
    highlights: ["Protección 3-5 años", "Dureza 9H", "Certificado incluido", "Upgrade Graphene disponible"],
    image: "/services/ceramic-coating.jpg",
    bookingId: "ceramic-coating",
  },
];

/* ─── Foam Maintenance (Post-Service) ─── */
const foamMaintenance = {
  icon: "🧽",
  title: "Foam Maintenance",
  desc: "Servicio de mantenimiento posterior a tu primer paquete. Lavado con foam cannon industrial, descontaminación química, barra de arcilla y sellador UV. El estándar Doctor Foam para preservar tu inversión.",
  price: "Desde $1,800 MXN",
  bookingId: "foam-maintenance",
  note: "Recomendación: 1 a 2 veces al mes.",
};

/* ─── Membership ─── */
const membership = {
  icon: "🔄",
  title: "Membresía Doctor Foam",
  price: "$1,160",
  priceLabel: "MXN / mes",
  features: [
    "Foam Maintenance bimestral incluido",
    "10% de descuento en cualquier paquete",
    "Membresía por cliente, no importa el vehículo",
  ],
  bookingId: "membresia",
};

/* ─── Vehicle Size Coefficients ─── */
const vehicleSizes = [
  { label: "Sedán / SUV 2 filas", coeff: 1.0 },
  { label: "Pick Up / SUV 3 filas", coeff: 1.15 },
];

/* ─── Pricing Packages ─── */
const packages = [
  {
    name: "Industrial Deep Interior",
    price: "$2,499",
    priceLabel: "Sedán / SUV 2 filas",
    subtitle: "Limpieza interior profesional",
    prices: { sedan: "$2,499", pickup: "$2,874" },
    features: [
      "Vapor seco industrial a 180°C",
      "Aspirado de alta potencia",
      "Lavado a base de inyección y extracción",
      "Extracción profunda de manchas",
      "Hidratación de pieles Connolly",
      "Sanitización con ozono",
    ],
    featured: false,
  },
  {
    name: "Signature Detail",
    price: "$7,449",
    priceLabel: "Sedán / SUV 2 filas",
    subtitle: "El más popular",
    prices: { sedan: "$7,449", pickup: "$8,566" },
    features: [
      "Incluye Industrial Deep Interior completo",
      "Corrección de pintura en 2-3 etapas",
      "Eliminación de swirls al 95%",
      "Sellador cerámico express (6 meses)",
      "Limpieza de vidrios y rines",
      "Acondicionamiento de llantas",
      "Técnicos certificados IDA",
    ],
    featured: true,
  },
  {
    name: "Ceramic Coating",
    price: "$11,999",
    priceLabel: "Sedán / SUV 2 filas",
    subtitle: "Protección de nueva generación",
    prices: { sedan: "$11,999", pickup: "$13,799" },
    features: [
      "Recubrimiento cerámico (3-5 años)",
      "Protección UV, lluvia ácida y contaminantes",
      "Cerámico en vidrios y rines",
      "Certificado de protección Doctor Foam",
      "Seguimiento post-servicio 30 días",
    ],
    upgrade: {
      name: "Graphene Shield",
      price: "$14,999",
      pickupPrice: "$17,249",
      desc: "Supera al cerámico en dureza e hidrofobicidad. Protección de 5 a 7 años.",
    },
    featured: false,
  },
];

/* ─── Zones ─── */
const zones = [
  { name: "Polanco", href: "/zonas/polanco", tag: "Ultra Premium", tagClass: "zone-tag-gold", desc: "Campos Elíseos, Masaryk — Sedanes europeos, super-deportivos" },
  { name: "Lomas de Chapultepec", href: "/zonas/lomas-de-chapultepec", tag: "Ultra Premium", tagClass: "zone-tag-gold", desc: "Virreyes, Barrilaco — SUVs de lujo, vehículos blindados" },
  { name: "Santa Fe", href: "/zonas/santa-fe", tag: "Premium", tagClass: "zone-tag-blue", desc: "Corporativos y lofts — Ejecutivos, Tesla, Audi e-tron" },
  { name: "Bosques de las Lomas", href: "/zonas/bosques-de-las-lomas", tag: "Máximo Potencial", tagClass: "zone-tag-gold", desc: "Tecamachalco, La Herradura — SUVs familiares de lujo y flotillas" },
  { name: "Pedregal", href: "/zonas/pedregal", tag: "Premium", tagClass: "zone-tag-blue", desc: "San Ángel — Autos clásicos, colección, preservación" },
  { name: "Interlomas y Bosque Real", href: "/zonas/interlomas", tag: "Máximo Potencial", tagClass: "zone-tag-gold", desc: "Bosque Real, Hacienda de las Palmas — BMW, Mercedes, Land Rover" },
  { name: "Zona Esmeralda y Huixquilucan", href: "/zonas/huixquilucan", tag: "Alto Potencial", tagClass: "zone-tag-gold", desc: "Condado de Sayavedra, Jesús del Monte — SUVs de alta gama" },
  { name: "Coyoacán Premium", href: "/zonas/coyoacan", tag: "Premium", tagClass: "zone-tag-blue", desc: "Country Club Churubusco, Del Carmen — Detallado residencial a domicilio" },
];

/* ─── Process Steps ─── */
const processSteps = [
  { num: 1, title: "Elige y paga en línea", desc: "Selecciona tu paquete, completa tus datos y realiza el pago seguro en línea." },
  { num: 2, title: "Te contactamos", desc: "Un asesor se comunica contigo por nuestro chat interno para agendar día y hora." },
  { num: 3, title: "Detallado premium", desc: "Llegamos a tu domicilio con equipo industrial y químicos profesionales." },
  { num: 4, title: "Entrega perfecta", desc: "Revisión final juntos. Garantía de satisfacción 100%. Factura incluida." },
];

/* ─── Verified Google Reviews ─── */
const googleReviews = [
  {
    stars: 5,
    text: "Compré mi carro de un mecánico hace un par de meses, y el interior era un desastre... El interior de mi coche luce como totalmente nuevo, limpio y no parece haber tenido una sola mancha jamás! Totalmente satisfecho! 💙🙌🏽",
    author: "Mario Hernandez",
    date: "Hace un año",
  },
  {
    stars: 5,
    text: "Excelente trabajo, quedó como nuevo mi coche!! Si buscan de buen trabajo, 100% recomendado. Quedamos encantados por el resultado🙌 Precio justo y con servicio a domicilio, muy amable!",
    author: "Shl Mjv",
    date: "Hace un año",
  },
  {
    stars: 5,
    text: "Quedo como nuevo mi camioneta😀 la verdad nunca pensé que me quedara súper limpia. Muy profesional totalmente recomendado…",
    author: "MA Masonry LLC",
    date: "Hace 2 años",
  },
  {
    stars: 5,
    text: "Profesional y buena comunicación. Muy bien trabajo, quedó como nuevo mi carro 🙏🏽 Mil gracias",
    author: "Jossie Rivera",
    date: "Hace 3 años",
  },
  {
    stars: 5,
    text: "Sinceramente superó mis expectativas. Mi auto quedó impecable por dentro y por fuera con el vapor a 180°C, huele a nuevo y no tuve que salir de mi departamento en Polanco.",
    author: "Latoya Acolatse",
    date: "Hace 2 años",
  },
  {
    stars: 5,
    text: "Doctor Foam hizo un trabajo extraordinario en mi auto. Son sumamente puntuales, profesionales y traen todo su equipo autónomo. El interior quedó como recién salido de agencia.",
    author: "M C",
    date: "Hace 2 años",
  },
  {
    stars: 5,
    text: "¡Increíble servicio! El coche quedó como nuevo sin un solo rayón. Ya es el segundo año consecutivo que contrato su detallado a domicilio y siempre mantienen la misma calidad.",
    author: "Shavon Reid",
    date: "Hace 2 años",
  },
  {
    stars: 5,
    text: "Limpiaron a fondo las vestiduras y asientos de piel de mi camioneta. El interior volvió a lucir nuevo y la atención por WhatsApp fue impecable de principio a fin.",
    author: "Kishia Kelly",
    date: "Hace 2 años",
  },
  {
    stars: 5,
    text: "¡Trabajo espectacular! Después del detallado interior profundo de Doctor Foam, la cabina quedó clínicamente limpia, desinfectada y con olor a auto nuevo.",
    author: "Shanelle Coleman",
    date: "Hace 3 años",
  },
  {
    stars: 5,
    text: "Me impresionó la dedicación, el tiempo y el equipo industrial que Doctor Foam invirtió en detallar mi vehículo en casa. Quedó absolutamente impecable.",
    author: "todd samalin",
    date: "Hace un año",
  },
  {
    stars: 5,
    text: "Dejaron mi auto como nuevo por dentro y por fuera directamente en mi estacionamiento en CDMX. El mejor servicio y relación calidad-valor en detallado a domicilio.",
    author: "Ria Buford",
    date: "Hace un año",
  },
  {
    stars: 5,
    text: "Por mucho, el mejor trabajo de detallado automotriz que he visto. Hicieron milagros con las vestiduras y la pintura de mi auto. ¡Luce como nuevo!",
    author: "Timothy Foster",
    date: "Hace 3 años",
  },
  {
    stars: 5,
    text: "¡Estoy feliz con el servicio! Es la segunda vez que agendo con Doctor Foam a domicilio y recomiendo su trabajo al 100% a cualquiera que cuide su auto 😊",
    author: "Yaneli Ramos",
    date: "Hace 3 años",
  },
];
const googleOverallRating = 4.9;
const googleTotalReviews = 34;
/* ─── FAQ Data ─── */
const faqs = [
  {
    q: "¿Cuál es la diferencia entre un autolavado tradicional y un detallado a domicilio?",
    a: "El detallado profesional corrige la pintura en múltiples etapas, descontamina con arcilla sintética, esteriliza interiores con vapor seco a 180°C y sella la carrocería durante 4 a 8 horas de intervención técnica, evitando los micro-rayones (swirls) que provocan los rodillos y franelas de un autolavado tradicional.",
  },
  {
    q: "¿Dejan residuos de agua en el estacionamiento?",
    a: "No. Usamos menos de 20 litros de agua purificada con polímeros encapsuladores y vapor seco sin dejar charcos ni escurrimientos, por lo que nuestro servicio es 100% apto para estacionamientos subterráneos, condominios residenciales y corporativos en CDMX.",
  },
  {
    q: "¿Qué diferencia a Doctor Foam de otros servicios de detallado?",
    a: "Utilizamos maquinaria industrial de grado hospitalario — generadores de vapor seco a 180°C, pulidoras de triple acción y compresores industriales — que llevamos hasta tu puerta. Nuestros técnicos cuentan con certificación IDA (International Detailing Association). No somos un lavado a domicilio: somos un centro de estética automotriz portátil.",
  },
  {
    q: "¿Por qué sus precios son más altos que otros servicios?",
    a: "Nuestros precios están 20-30% por encima del mercado porque usamos equipos y químicos de grado profesional importados, no comerciales. Un vehículo bien mantenido retiene 15-20% más de su valor de reventa. El costo de Doctor Foam no es un gasto: es una inversión en la preservación de un activo de alto valor.",
  },
  {
    q: "¿Cuánto tiempo toma el servicio?",
    a: "Foam Maintenance: 2-3 horas. Signature Detail: 5-6 horas. Graphene Shield: 8-10 horas. Todo se completa en un solo día sin mover tu auto. Nuestras unidades traen tanque de 400 litros, generador eléctrico y compresor propio.",
  },
  {
    q: "¿Necesito proporcionar agua o electricidad?",
    a: "No. Nuestras unidades móviles son completamente autónomas con tanque de agua, generador industrial y compresor. Además, nuestro proceso de vapor seco consume 45% menos agua que un lavado tradicional — contamos con certificación Sello ECO (equivalente ECO Green en México), ideal para condominios que restringen el uso de mangueras.",
  },
  {
    q: "¿Trabajan con vehículos blindados?",
    a: "Sí. Tenemos protocolos específicos para vehículos blindados usando químicos que no degradan los materiales balísticos ni el policarbonato de los vidrios. También atendemos autos exóticos (Ferrari, Lamborghini, McLaren), eléctricos (Tesla, Lucid, Rivian) y vehículos clásicos de colección.",
  },
  {
    q: "¿Qué es el Graphene Shield y cómo supera al cerámico?",
    a: "El recubrimiento de grafeno es la nueva generación de protección automotriz. Supera al cerámico tradicional en dureza (10H vs 9H), efecto hidrofóbico y resistencia a químicos. Dura 5 a 7 años vs 2-3 del cerámico convencional. Incluimos certificado de aplicación y seguimiento post-servicio.",
  },
  {
    q: "¿Realizan limpieza de motores de coches y detallado de bahía de motor a domicilio?",
    a: "Sí. Realizamos limpieza de motores de coches en seco y con vapor industrial a 180°C (5% de humedad), desengrasantes dieléctricos biodegradables y acondicionamiento de plásticos y mangueras sin usar chorros de agua a presión, garantizando cero riesgo para sensores, computadora (ECU), baterías híbridas o sistemas eléctricos. Está incluida en nuestro paquete Signature Detail ($7,449 MXN; $6,704 MXN con Membresía -10%) o puedes solicitarla al agendar tu detallado a domicilio en CDMX.",
  },
  {
    q: "¿En qué consiste el pulido de autos y lavado y encerado de autos a domicilio en CDMX?",
    a: "A diferencia de un lavado y encerado tradicional que oculta rayones por pocos días, nuestro servicio de estética automotriz en CDMX corrige la pintura con pulidora roto-orbital en 1 a 3 etapas (eliminando hasta el 95% de swirls y micro-rayones) y aplica sellador nanocerámico SiO2 de 6 meses a 5 años directamente en tu domicilio.",
  },
  {
    q: "¿Cómo funciona el lavado de asientos de auto y vestiduras a domicilio?",
    a: "Nuestro lavado de asientos de auto (tanto en tela, alcántara como piel Connolly o Nappa) en el paquete Industrial Deep Interior ($2,499 MXN; $2,249 MXN con Membresía -10%) combina aspirado industrial 10x, inyección-extracción térmica de manchas profundas, esterilización con vapor seco a 180°C y sanitización con ozono médico, dejando los asientos limpios, desinfectados y secos en menos de 60 minutos.",
  },
  {
    q: "¿Cómo se activa la Membresía Doctor Foam ($990/mes) y el 10% de descuento permanente?",
    a: "Para empezar a operar la Membresía Doctor Foam ($990 MXN/mes en sedán o $1,160 MXN/mes en SUV), primero se contrata un servicio de lavado profundo inicial (como Industrial Deep Interior o Signature Detail). La membresía está diseñada para darle seguimiento continuo a ese primer servicio y su ventaja principal es el mantenimiento recurrente preventivo más un 10% de descuento permanente en todos los lavados más especializados.",
  },
];

/* ─── JSON-LD Schemas ─── */
function JsonLd() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: "Doctor Foam México",
    description:
      "Servicio de detallado automotriz premium a domicilio en CDMX y Valle de México",
    url: "https://drfoam.com.mx",
    telephone: "+525610846022",
    areaServed: [
      { "@type": "City", name: "Ciudad de México" },
      { "@type": "AdministrativeArea", name: "Estado de México" },
    ],
    serviceType: [
      "Detallado automotriz",
      "Detallado automotriz a domicilio en CDMX",
      "Estética automotriz CDMX",
      "Recubrimiento cerámico",
      "Corrección de pintura y pulido de autos a domicilio en CDMX",
      "Lavado y encerado de autos a domicilio en CDMX",
      "Lavado de asientos de auto y vestiduras a domicilio",
      "Limpieza de motores de coches con vapor seco a 180°C",
      "Lavado premium a domicilio",
      "Lavado de autos a domicilio en CDMX",
      "Lavado recurrente de autos a domicilio",
      "Lavado profundo de vehículos",
      "Lavado de autos en estacionamiento corporativo",
    ],
    priceRange: "$$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "34",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Mobile Auto Detailing",
    provider: {
      "@type": "LocalBusiness",
      name: "Doctor Foam México",
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 19.4326,
        longitude: -99.1332,
      },
      geoRadius: "50000",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de Detallado",
      itemListElement: packages.map((p) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: `Paquete ${p.name}`,
          description: p.features.join(". "),
        },
        price: p.price.replace("$", "").replace(",", ""),
        priceCurrency: "MXN",
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}

/* ═══════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════ */

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [grapheneUpgrade, setGrapheneUpgrade] = useState(false);
  const [aiSourceName, setAiSourceName] = useState<string | null>(null);

  /* Detect AI / GEO referral (e.g. ?utm_source=chatgpt.com) for instant Concierge Fast-Track */
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
      }
    } catch {
      // ignore URL parsing errors
    }
  }, []);

  /* Scroll listener for navbar */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Intersection Observer for scroll animations */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <JsonLd />

      {/* ─── NAVBAR ─── */}
      <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <div className="navbar-inner">
          <Link href="/" aria-label="Doctor Foam inicio">
            <Logo />
          </Link>
          <ul className="nav-links">
            <li><Link href="/lavado-recurrente-autos-domicilio">Lavado Recurrente</Link></li>
            <li><Link href="/lavado-profundo-vehiculos-cdmx">Lavado Profundo</Link></li>
            <li><Link href="/lavado-autos-estacionamiento-corporativo">Corporativos</Link></li>
            <li><Link href="/membresia-doctor-foam">Membresía</Link></li>
            <li><a href="#precios">Precios</a></li>
            <li><Link href="/blog">Blog</Link></li>
            <li>
              <Link href="/mi-cuenta" style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#475569", textDecoration: "none", fontSize: "0.9rem", fontWeight: 500, transition: "color 0.2s" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                Mi Cuenta
              </Link>
            </li>
            <li>
              <Link href="/reservar" className="btn-premium" style={{ padding: "0.6rem 1.5rem", fontSize: "0.85rem" }}>
                Reservar y Pagar
              </Link>
            </li>
          </ul>
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menú"
          >
            {mobileMenuOpen ? (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* ─── MOBILE MENU ─── */}
      <div className={`mobile-menu ${mobileMenuOpen ? "active" : ""}`}>
        <button
          onClick={() => setMobileMenuOpen(false)}
          style={{ position: "absolute", top: "1.5rem", right: "1.5rem", background: "none", border: "none", color: "#0f172a", cursor: "pointer" }}
          aria-label="Cerrar menú"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <Link href="/lavado-recurrente-autos-domicilio" onClick={() => setMobileMenuOpen(false)}>Lavado Recurrente</Link>
        <Link href="/lavado-profundo-vehiculos-cdmx" onClick={() => setMobileMenuOpen(false)}>Lavado Profundo</Link>
        <Link href="/lavado-autos-estacionamiento-corporativo" onClick={() => setMobileMenuOpen(false)}>Corporativos y Oficinas</Link>
        <Link href="/membresia-doctor-foam" onClick={() => setMobileMenuOpen(false)}>Membresía</Link>
        <a href="#precios" onClick={() => setMobileMenuOpen(false)}>Precios</a>
        <a href="#cobertura" onClick={() => setMobileMenuOpen(false)}>Cobertura</a>
        <Link href="/blog" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
        <Link href="/mi-cuenta" onClick={() => setMobileMenuOpen(false)} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
          Mi Cuenta
        </Link>
        <Link href="/reservar" className="btn-premium" onClick={() => setMobileMenuOpen(false)}>
          Reservar y Pagar
        </Link>
      </div>

      {/* ─── HERO ─── */}
      <section className="hero-section" id="inicio">
        <img src="https://drfoam.com.mx/hero-bg.png" alt="Detallado automotriz a domicilio, lavado de asientos de auto con vapor 180°C y recubrimiento cerámico 9H en CDMX — Doctor Foam" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
        <div className="hero-bg" style={{ zIndex: 1 }} />
        <div className="hero-glow hero-glow-gold" style={{ zIndex: 1 }} />
        <div className="hero-glow hero-glow-blue" style={{ zIndex: 1 }} />

        <div className="container" style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
          <div>
            {aiSourceName && (
              <div
                style={{
                  maxWidth: "820px",
                  margin: "0 auto 0.85rem",
                  padding: "0.55rem 0.95rem",
                  borderRadius: "0.85rem",
                  background: "linear-gradient(135deg, rgba(22, 163, 74, 0.92), rgba(15, 23, 42, 0.92))",
                  border: "1px solid rgba(134, 239, 172, 0.6)",
                  boxShadow: "0 8px 24px rgba(15, 23, 42, 0.35)",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem 0.85rem",
                  color: "#ffffff",
                  fontSize: "0.8rem",
                }}
              >
                <span style={{ fontWeight: 700 }}>
                  ✨ Recomendado en {aiSourceName} · Unidad 100% Autónoma en CDMX y Huixquilucan
                </span>
                <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap" }}>
                  <a
                    href={`https://wa.me/525610846022?text=${encodeURIComponent(`Hola Doctor Foam, los vi recomendados en ${aiSourceName} y quiero cotizar un detallado a domicilio.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cta-location="hero_ai_geo_whatsapp"
                    style={{
                      background: "#ffffff",
                      color: "#14532d",
                      fontWeight: 800,
                      fontSize: "0.76rem",
                      padding: "0.32rem 0.8rem",
                      borderRadius: "9999px",
                      textDecoration: "none",
                    }}
                  >
                    💬 Cotizar en 15s por WhatsApp
                  </a>
                  <Link
                    href="/reservar"
                    data-cta-location="hero_ai_geo_reservar"
                    style={{
                      background: "rgba(37, 99, 235, 0.95)",
                      color: "#ffffff",
                      fontWeight: 800,
                      fontSize: "0.76rem",
                      padding: "0.32rem 0.8rem",
                      borderRadius: "9999px",
                      border: "1px solid rgba(191, 219, 254, 0.6)",
                      textDecoration: "none",
                    }}
                  >
                    📅 Ver Agenda y Precios
                  </Link>
                </div>
              </div>
            )}

            <span className="section-label" style={{ background: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.2)", color: "#93c5fd", marginBottom: "0.65rem" }}>Detallado Automotriz Premium a Domicilio · Car Detailing CDMX</span>
            <h1 className="section-title" style={{ fontSize: "clamp(1.95rem, 5vw, 3.9rem)", marginBottom: "0.85rem", maxWidth: "920px", marginLeft: "auto", marginRight: "auto", color: "#ffffff", lineHeight: 1.15 }}>
              Lavado de Autos a Domicilio en CDMX: <span className="gradient-text">Detallado Automotriz Premium</span>
            </h1>
            <p style={{ fontSize: "clamp(0.95rem, 2vw, 1.08rem)", color: "rgba(255,255,255,0.92)", maxWidth: "780px", margin: "0 auto 1.05rem", lineHeight: "1.6" }}>
              Estudio móvil 100% autónomo (agua purificada y luz propia): <strong>lavado de asientos con vapor seco a 180°C</strong>, <strong>corrección de pintura</strong>, <strong>limpieza de motores</strong> y <strong>cerámico 9H</strong> en un solo día.
            </p>

            {/* Primary 0%-Scroll Action Buttons (Visible on 542px-734px mobile & split-screen viewports) */}
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "1rem" }}>
              <a
                href={`https://wa.me/525610846022?text=${encodeURIComponent(aiSourceName ? `Hola Doctor Foam, los encontré en ${aiSourceName} y me interesa cotizar un servicio de detallado a domicilio` : "Hola Doctor Foam, me interesa cotizar un servicio de detallado a domicilio")}`}
                target="_blank"
                rel="noopener noreferrer"
                data-cta-location="hero_cta"
                className="btn-premium"
                style={{ background: "linear-gradient(135deg, #16a34a, #15803d)", boxShadow: "0 6px 22px rgba(22, 163, 74, 0.4)" }}
              >
                💬 Cotizar por WhatsApp
              </a>
              <Link href="/reservar" className="btn-premium">
                📅 Reservar y Pagar en Línea
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href="/brochure-doctor-foam.pdf"
                download="Brochure-Corporativo-Doctor-Foam-2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                data-cta-location="hero_brochure_pdf"
                className="btn-outline"
                style={{ color: "#ffffff", borderColor: "rgba(147, 197, 253, 0.45)", background: "rgba(37, 99, 235, 0.22)" }}
              >
                📄 Brochure PDF
              </a>
            </div>

            {/* Above-the-Fold 0%-Scroll Price & 1-Tap Package Bar */}
            <div
              style={{
                maxWidth: "860px",
                margin: "0 auto 1rem",
                padding: "0.6rem 0.9rem",
                borderRadius: "0.9rem",
                background: "rgba(15, 23, 42, 0.68)",
                border: "1px solid rgba(56, 189, 248, 0.35)",
                backdropFilter: "blur(10px)",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.4rem 0.65rem",
                fontSize: "0.78rem",
                color: "#f8fafc",
              }}
            >
              <Link href="/reservar?paquete=deep-interior" style={{ color: "#f8fafc", textDecoration: "none", background: "rgba(255,255,255,0.08)", padding: "0.26rem 0.62rem", borderRadius: "9999px", border: "1px solid rgba(255,255,255,0.18)" }}>
                ♨️ <strong>Interior Vapor 180°C: $2,499</strong> <span style={{ color: "#86efac" }}>($2,249 Miembro)</span>
              </Link>
              <Link href="/reservar?paquete=signature-detail" style={{ color: "#f8fafc", textDecoration: "none", background: "rgba(37,99,235,0.32)", padding: "0.26rem 0.62rem", borderRadius: "9999px", border: "1px solid rgba(147,197,253,0.4)" }}>
                💎 <strong>Signature + Motor: $7,449</strong> <span style={{ color: "#86efac" }}>($6,704 Miembro)</span>
              </Link>
              <Link href="/reservar?paquete=ceramic-coating" style={{ color: "#f8fafc", textDecoration: "none", background: "rgba(255,255,255,0.08)", padding: "0.26rem 0.62rem", borderRadius: "9999px", border: "1px solid rgba(255,255,255,0.18)" }}>
                🛡️ <strong>Cerámico 9H: $11,999</strong>
              </Link>
              <Link href="/membresia-doctor-foam" style={{ color: "#86efac", textDecoration: "none", background: "rgba(22,163,74,0.22)", padding: "0.26rem 0.62rem", borderRadius: "9999px", border: "1px solid rgba(134,239,172,0.4)", fontWeight: 700 }}>
                🔄 Membresía: $990/mes (+10% OFF fijo)
              </Link>
            </div>

            {/* Above-the-Fold 8-Zone Direct Coverage Selector */}
            <div
              style={{
                marginTop: "1.75rem",
                padding: "0.75rem 1rem",
                borderRadius: "1rem",
                background: "rgba(15, 23, 42, 0.55)",
                border: "1px solid rgba(148, 163, 184, 0.25)",
                backdropFilter: "blur(8px)",
                maxWidth: "860px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <div style={{ fontSize: "0.73rem", fontWeight: 700, color: "#93c5fd", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
                📍 Unidades 100% Autónomas (Agua y Luz a Bordo) · Selecciona tu Zona en CDMX o Edomex:
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", justifyContent: "center" }}>
                {[
                  { slug: "polanco", label: "Polanco" },
                  { slug: "lomas-de-chapultepec", label: "Lomas" },
                  { slug: "santa-fe", label: "Santa Fe" },
                  { slug: "bosques-de-las-lomas", label: "Bosques" },
                  { slug: "interlomas", label: "Interlomas" },
                  { slug: "huixquilucan", label: "Huixquilucan" },
                  { slug: "pedregal", label: "Pedregal" },
                  { slug: "coyoacan", label: "Coyoacán y Del Valle" },
                ].map((z) => (
                  <Link
                    key={z.slug}
                    href={`/zonas/${z.slug}`}
                    style={{
                      fontSize: "0.76rem",
                      fontWeight: 600,
                      color: "#f8fafc",
                      background: "rgba(255, 255, 255, 0.1)",
                      border: "1px solid rgba(255, 255, 255, 0.22)",
                      borderRadius: "9999px",
                      padding: "0.3rem 0.75rem",
                      textDecoration: "none",
                    }}
                  >
                    📍 {z.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="stats-row animate-on-scroll" style={{ marginTop: "4rem" }}>
            <div className="stat-item">
              <div className="stat-number gradient-text">500+</div>
              <div className="stat-label" style={{ color: "rgba(255,255,255,0.6)" }}>Vehículos atendidos</div>
            </div>
            <div className="stat-item">
              <div className="stat-number gradient-text">4.9★</div>
              <div className="stat-label" style={{ color: "rgba(255,255,255,0.6)" }}>Calificación promedio</div>
            </div>
            <div className="stat-item">
              <div className="stat-number gradient-text">100%</div>
              <div className="stat-label" style={{ color: "rgba(255,255,255,0.6)" }}>Equipo industrial</div>
            </div>
            <div className="stat-item">
              <div className="stat-number gradient-text">1 día</div>
              <div className="stat-label" style={{ color: "rgba(255,255,255,0.6)" }}>Servicio completo</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section className="section-padding" id="precios">
        <div className="container" style={{ textAlign: "center" }}>
          <div className="animate-on-scroll">
            <span className="section-label">Paquetes y Precios</span>
            <h2 className="section-title">
              Elige tu nivel de <span className="gradient-text">perfección</span>
            </h2>
            <p className="section-subtitle">
              Todos los precios incluyen IVA y son facturables (CFDI). Precios base para Sedán / SUV de 2 filas.
              Pick Ups y SUV de 3 filas aplican coeficiente ×1.15. Paga en línea de forma segura.
            </p>
          </div>

          <div className="services-grid" style={{ maxWidth: "1100px", margin: "0 auto" }}>
            {packages.map((p, i) => {
              const isGrapheneActive = p.upgrade && grapheneUpgrade;
              const displayPrice = isGrapheneActive ? p.upgrade!.price : p.price;
              const displayName = isGrapheneActive ? "Graphene Shield" : p.name;
              const displaySubtitle = isGrapheneActive ? "Protección superior de grafeno 5-7 años" : p.subtitle;
              const rawSlug = p.name.toLowerCase().replace(/ /g, '-');
              const bookingSlug = isGrapheneActive
                ? "graphene-upgrade"
                : rawSlug === "industrial-deep-interior"
                ? "deep-interior"
                : rawSlug;

              return (
                <div key={i} className={`glass-card price-card animate-on-scroll ${p.featured ? "featured" : ""}`}>
                  {p.featured && <span className="badge">Más Popular</span>}
                  <h3 style={{ fontSize: "1.3rem", marginBottom: "0.25rem" }}>{p.name}</h3>
                  <p style={{ color: "#475569", fontSize: "0.85rem" }}>{displaySubtitle}</p>
                  <div className="price-amount gradient-text" style={{ transition: "all 0.3s ease" }}>{displayPrice}</div>
                  <p style={{ color: "#475569", fontSize: "0.8rem", marginBottom: "0.25rem" }}>{p.priceLabel} · IVA incluido</p>
                  <p style={{ color: "#15803d", fontSize: "0.76rem", fontWeight: 700, marginBottom: "0.55rem" }}>
                    🔄 Con Membresía (-10% OFF): ${Math.round(Number(displayPrice.replace(/[^0-9]/g, "")) * 0.9).toLocaleString("es-MX")} MXN
                  </p>
                  <ul className="price-list">
                    {p.features.map((f, fi) => (
                      <li key={fi}>{f}</li>
                    ))}
                  </ul>
                  {p.upgrade && (
                    <button
                      onClick={() => setGrapheneUpgrade(!grapheneUpgrade)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        width: "100%",
                        padding: "0.85rem",
                        borderRadius: "0.75rem",
                        border: grapheneUpgrade ? "2px solid #2563eb" : "2px solid rgba(37,99,235,0.15)",
                        background: grapheneUpgrade ? "linear-gradient(135deg, rgba(37,99,235,0.08), rgba(59,130,246,0.05))" : "rgba(37,99,235,0.03)",
                        cursor: "pointer",
                        marginBottom: "1rem",
                        textAlign: "left",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {/* Toggle switch */}
                      <div style={{
                        width: "44px",
                        height: "24px",
                        borderRadius: "12px",
                        background: grapheneUpgrade ? "linear-gradient(135deg, #2563eb, #3b82f6)" : "#cbd5e1",
                        position: "relative",
                        flexShrink: 0,
                        transition: "background 0.3s ease",
                        boxShadow: grapheneUpgrade ? "0 0 12px rgba(37,99,235,0.3)" : "none",
                      }}>
                        <div style={{
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          background: "#ffffff",
                          position: "absolute",
                          top: "3px",
                          left: grapheneUpgrade ? "23px" : "3px",
                          transition: "left 0.3s ease",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                        }} />
                      </div>
                      {/* Label */}
                      <div style={{ flex: 1 }}>
                        <p style={{ color: grapheneUpgrade ? "#2563eb" : "#475569", fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.15rem", transition: "color 0.3s ease" }}>
                          ⬆️ Upgrade: {p.upgrade.name}
                        </p>
                        <p style={{ color: "#64748b", fontSize: "0.72rem", margin: 0, lineHeight: 1.4 }}>
                          {p.upgrade.desc}
                        </p>
                        <p style={{ color: grapheneUpgrade ? "#2563eb" : "#0f172a", fontSize: "0.82rem", fontWeight: 700, margin: "0.2rem 0 0", transition: "color 0.3s ease" }}>
                          {p.upgrade.price} MXN
                        </p>
                      </div>
                    </button>
                  )}
                  <div style={{ display: "grid", gap: "0.55rem", width: "100%" }}>
                    <Link href={`/reservar?paquete=${bookingSlug}`} className={p.featured ? "btn-premium" : "btn-outline"} style={{ width: "100%", justifyContent: "center" }}>
                      Reservar {displayName}
                    </Link>
                    <a
                      href={`https://wa.me/525610846022?text=${encodeURIComponent(`Hola Doctor Foam, quiero cotizar el paquete ${displayName} (${displayPrice}) a domicilio en CDMX`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cta-location={`pricing_card_${bookingSlug}_whatsapp`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        padding: "0.58rem 1rem",
                        borderRadius: "9999px",
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        color: "#15803d",
                        background: "#f0fdf4",
                        border: "1px solid #bbf7d0",
                        textDecoration: "none",
                      }}
                    >
                      💬 Cotizar por WhatsApp
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Banner de Lavado Recurrente / Membresía dentro de #precios */}
          <div className="glass-card animate-on-scroll" style={{ maxWidth: "1100px", margin: "2rem auto 0", padding: "1.5rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", textAlign: "left", border: "1px solid rgba(37,99,235,0.2)", background: "linear-gradient(135deg, rgba(37,99,235,0.04), rgba(16,185,129,0.04))" }}>
            <div style={{ flex: "1 1 320px" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#2563eb" }}>
                🔄 Seguimiento Post-Lavado Profundo + 10% OFF
              </span>
              <h3 style={{ fontSize: "1.15rem", margin: "0.25rem 0", color: "#0f172a" }}>
                ¿Quieres mantener el resultado de tu primer Lavado Profundo todo el año?
              </h3>
              <p style={{ fontSize: "0.88rem", color: "#475569", margin: 0 }}>
                Al contratar tu primer servicio de lavado profundo, puedes activar nuestra <strong>Membresía desde $990 MXN/mes</strong>: incluye mantenimiento recurrente de seguimiento y <strong>10% de descuento permanente en todos los lavados más especializados</strong>.
              </p>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <Link href="/membresia-doctor-foam" className="btn-premium" style={{ padding: "0.6rem 1.25rem", fontSize: "0.82rem" }}>
                Ver Membresía ($990/mes) →
              </Link>
              <a
                href="/brochure-doctor-foam.pdf"
                download="Brochure-Corporativo-Doctor-Foam-2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                data-cta-location="pricing_banner_brochure_pdf"
                className="btn-outline"
                style={{ padding: "0.6rem 1.25rem", fontSize: "0.82rem", borderColor: "#2563eb", color: "#2563eb" }}
              >
                📄 Descargar Brochure PDF
              </a>
              <a
                href="https://wa.me/525610846022?text=Hola%20Doctor%20Foam%2C%20me%20interesa%20hacer%20mi%20primer%20lavado%20profundo%20y%20activar%20la%20Membres%C3%ADa%20(%24990%2Fmes)"
                target="_blank"
                rel="noopener noreferrer"
                data-cta-location="pricing_banner_recurrente_whatsapp"
                className="btn-outline"
                style={{ padding: "0.6rem 1.25rem", fontSize: "0.82rem" }}
              >
                💬 WhatsApp Membresía
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="section-padding" id="servicios" style={{ background: "#f1f5f9" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div className="animate-on-scroll">
            <span className="section-label">Nuestros Paquetes</span>
            <h2 className="section-title">
              Detallado Automotriz en CDMX: <span className="gradient-text">Estándar Clínico a Domicilio</span>
            </h2>
            <p className="section-subtitle">
              No somos un autolavado tradicional. Somos un estudio de detailing a domicilio en CDMX especializado en
              lavado de asientos y vestiduras con vapor a 180°C, corrección de pintura certificada IDA y recubrimiento cerámico 9H.
            </p>
            {/* ECO Badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "linear-gradient(135deg, #dcfce7, #bbf7d0)", padding: "0.5rem 1.2rem", borderRadius: "2rem", marginTop: "1rem", fontSize: "0.85rem", color: "#166534", fontWeight: 600 }}>
              🌿 Certificación Sello ECO · 45% menos consumo de agua
            </div>
          </div>

          {/* Main Packages — Horizontal Cards */}
          <div style={{ marginTop: "2.5rem", display: "flex", flexDirection: "column", gap: "2rem" }}>
            {mainServices.map((s, i) => (
              <div key={i} className="glass-card animate-on-scroll service-card-horizontal" style={{ display: "flex", gap: "0", overflow: "hidden", cursor: "pointer", transition: "transform 0.3s ease, box-shadow 0.3s ease" }}>
                {/* Image Side */}
                <div className="service-card-image" style={{
                  flex: "0 0 340px",
                  minHeight: "280px",
                  background: `linear-gradient(135deg, rgba(37,99,235,0.08), rgba(37,99,235,0.15))`,
                  backgroundImage: `url(${s.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}>
                  {/* Fallback icon if no image loaded */}
                  <span style={{ fontSize: "4rem", opacity: 0.3, position: "absolute" }}>{s.icon}</span>
                </div>

                {/* Content Side */}
                <div className="service-card-content" style={{ flex: 1, padding: "2rem 2.5rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <span style={{ color: "#2563eb", fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem", fontFamily: "var(--font-heading)" }}>{s.tagline}</span>
                  <h3 style={{ fontSize: "1.5rem", marginBottom: "0.75rem", fontFamily: "var(--font-heading)" }}>
                    <span style={{ marginRight: "0.5rem" }}>{s.icon}</span>{s.title}
                  </h3>
                  <p className="service-card-desc" style={{ color: "#475569", fontSize: "0.9rem", lineHeight: "1.8", marginBottom: "1.25rem" }}>{s.desc}</p>

                  {/* Highlights */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
                    {s.highlights.map((h, j) => (
                      <span key={j} style={{
                        background: "rgba(37,99,235,0.08)",
                        color: "#2563eb",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        padding: "0.3rem 0.8rem",
                        borderRadius: "2rem",
                        fontFamily: "var(--font-heading)",
                      }}>{h}</span>
                    ))}
                  </div>

                  <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
                    <Link href={`/reservar?paquete=${s.bookingId}`} className="btn-premium" style={{ padding: "0.7rem 1.8rem", fontSize: "0.85rem" }}>
                      Reservar {s.title}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <a
                      href={`https://wa.me/525610846022?text=${encodeURIComponent(`Hola Doctor Foam, quiero cotizar el paquete ${s.title} a domicilio`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cta-location={`service_card_${s.bookingId}_whatsapp`}
                      className="btn-outline"
                      style={{ padding: "0.65rem 1.3rem", fontSize: "0.82rem" }}
                    >
                      💬 Preguntar por WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 4-Pillar Authority Hub */}
          <div className="animate-on-scroll" style={{ marginTop: "3rem" }}>
            <h3 style={{ fontSize: "1.3rem", color: "#0f172a", marginBottom: "1.25rem", fontFamily: "var(--font-heading)" }}>
              Soluciones Especializadas de Lavado y Detallado a Domicilio
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", textAlign: "left" }}>
              <Link href="/lavado-recurrente-autos-domicilio" className="glass-card" style={{ padding: "1.25rem", textDecoration: "none", display: "block" }}>
                <strong style={{ color: "#0f172a", fontSize: "0.95rem", display: "block", marginBottom: "0.3rem" }}>🧽 Lavado Recurrente a Domicilio</strong>
                <span style={{ color: "#475569", fontSize: "0.82rem", display: "block", marginBottom: "0.4rem" }}>Mantenimiento periódico con método de dos cubetas y pH neutro.</span>
                <span style={{ color: "#2563eb", fontSize: "0.78rem", fontWeight: 700 }}>Explorar plan →</span>
              </Link>
              <Link href="/lavado-profundo-vehiculos-cdmx" className="glass-card" style={{ padding: "1.25rem", textDecoration: "none", display: "block" }}>
                <strong style={{ color: "#0f172a", fontSize: "0.95rem", display: "block", marginBottom: "0.3rem" }}>♨️ Lavado Profundo y Vestiduras</strong>
                <span style={{ color: "#475569", fontSize: "0.82rem", display: "block", marginBottom: "0.4rem" }}>Limpieza de asientos con vapor a 180°C, ozono y corrección de pintura.</span>
                <span style={{ color: "#2563eb", fontSize: "0.78rem", fontWeight: 700 }}>Ver paquetes →</span>
              </Link>
              <Link href="/lavado-autos-estacionamiento-corporativo" className="glass-card" style={{ padding: "1.25rem", textDecoration: "none", display: "block" }}>
                <strong style={{ color: "#0f172a", fontSize: "0.95rem", display: "block", marginBottom: "0.3rem" }}>🏢 Estacionamiento Corporativo</strong>
                <span style={{ color: "#475569", fontSize: "0.82rem", display: "block", marginBottom: "0.4rem" }}>Detallamos tu auto en tu oficina o condominio sin usar tu agua ni luz.</span>
                <span style={{ color: "#2563eb", fontSize: "0.78rem", fontWeight: 700 }}>Conocer sistema →</span>
              </Link>
              <Link href="/membresia-doctor-foam" className="glass-card" style={{ padding: "1.25rem", textDecoration: "none", display: "block" }}>
                <strong style={{ color: "#0f172a", fontSize: "0.95rem", display: "block", marginBottom: "0.3rem" }}>🔄 Membresía Doctor Foam</strong>
                <span style={{ color: "#475569", fontSize: "0.82rem", display: "block", marginBottom: "0.4rem" }}>Mantenimiento incluido y descuentos permanentes para todos tus autos.</span>
                <span style={{ color: "#2563eb", fontSize: "0.78rem", fontWeight: 700 }}>Ver beneficios →</span>
              </Link>
            </div>
          </div>


        </div>
      </section>

      {/* ─── PAGO RECURRENTE (OCULTO TEMPORALMENTE) ─── */}
      <section className="section-padding" id="membresia" style={{ display: "none" }}>
        <div className="container" style={{ textAlign: "center" }}>
          {/* ─── Subscription Plans ─── */}
          <div style={{ marginTop: "3rem" }}>
            <div className="animate-on-scroll">
              <span className="section-label">Suscripciones</span>
              <h3 className="section-title" style={{ fontSize: "1.8rem" }}>
                Planes de <span className="gradient-text">pago recurrente</span>
              </h3>
              <p className="section-subtitle">
                Mantén tu auto impecable con pagos mensuales automáticos. Cancela cuando quieras.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem", maxWidth: "900px", margin: "0 auto" }}>
              {/* Foam Maintenance Card */}
              <div className="glass-card animate-on-scroll" style={{ padding: "2rem", textAlign: "left", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                  <span style={{ fontSize: "2.5rem" }}>{foamMaintenance.icon}</span>
                  <div>
                    <h3 style={{ fontSize: "1.2rem", marginBottom: "0.25rem" }}>{foamMaintenance.title}</h3>
                    <span style={{ color: "#16a34a", fontSize: "0.75rem", fontWeight: 600, background: "#dcfce7", padding: "0.2rem 0.6rem", borderRadius: "1rem" }}>
                      Pago mensual · Recurrente
                    </span>
                  </div>
                </div>
                <p style={{ color: "#475569", fontSize: "0.88rem", marginBottom: "1rem", lineHeight: "1.7", flex: 1 }}>{foamMaintenance.desc}</p>
                <div style={{ marginBottom: "0.25rem" }}>
                  <span className="gradient-text" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "2rem" }}>$1,800</span>
                  <span style={{ color: "#64748b", fontSize: "0.9rem", marginLeft: "0.25rem" }}>MXN / mes</span>
                </div>
                <p style={{ color: "#475569", fontSize: "0.75rem", marginBottom: "1.25rem" }}>IVA incluido · Facturable · {foamMaintenance.note}</p>
                <a
                  href="/membresia-doctor-foam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-premium"
                  style={{ width: "100%", justifyContent: "center", textAlign: "center" }}
                >
                  🔄 Suscribirme
                </a>
              </div>

              {/* Membresía Card */}
              <div className="glass-card animate-on-scroll" style={{ padding: "2rem", textAlign: "center", border: "2px solid rgba(37,99,235,0.15)", display: "flex", flexDirection: "column" }}>
                <span style={{ display: "inline-block", padding: "0.25rem 1rem", background: "linear-gradient(135deg, #2563eb, #3b82f6)", color: "#ffffff", fontFamily: "var(--font-heading)", fontSize: "0.7rem", fontWeight: 700, borderRadius: "2rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem", alignSelf: "center" }}>
                  Mejor Valor
                </span>
                <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>{membership.icon}</div>
                <h3 style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}>{membership.title}</h3>
                <div className="gradient-text" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "2.5rem", marginBottom: "0.25rem" }}>
                  {membership.price}
                </div>
                <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "0.25rem" }}>{membership.priceLabel}</p>
                <span style={{ color: "#16a34a", fontSize: "0.75rem", fontWeight: 600, background: "#dcfce7", padding: "0.2rem 0.6rem", borderRadius: "1rem", display: "inline-block", marginBottom: "1.25rem" }}>
                  Pago mensual · Recurrente
                </span>
                <ul style={{ listStyle: "none", padding: 0, textAlign: "left", maxWidth: "320px", margin: "0 auto 1.5rem", flex: 1 }}>
                  {membership.features.map((f, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.75rem", color: "#334155", fontSize: "0.9rem" }}>
                      <span style={{ color: "#2563eb", fontWeight: 700, flexShrink: 0 }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="/membresia-doctor-foam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-premium"
                  style={{ width: "100%", justifyContent: "center", textAlign: "center" }}
                >
                  🔄 Suscribirme
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── COVERAGE ZONES ─── */}
      <section className="section-padding" id="cobertura" style={{ background: "#f8fafc" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div className="animate-on-scroll">
            <span className="section-label">Zonas de Cobertura</span>
            <h2 className="section-title">
              Presentes en las zonas más <span className="gradient-text">exclusivas</span>
            </h2>
            <p className="section-subtitle">
              Operamos en las colonias y fraccionamientos más premium de la Ciudad de México
              y el Estado de México.
            </p>
          </div>

          <div className="zones-grid">
            {zones.map((z, i) => (
              <Link
                key={i}
                href={z.href}
                className="glass-card zone-card animate-on-scroll"
                style={{ textDecoration: "none", display: "block" }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span className="zone-name">{z.name}</span>
                  <span className={`zone-tag ${z.tagClass}`}>{z.tag}</span>
                </div>
                <p style={{ color: "#475569", fontSize: "0.85rem", marginBottom: "0.5rem" }}>{z.desc}</p>
                <span style={{ color: "#2563eb", fontSize: "0.78rem", fontWeight: 700 }}>
                  Ver cobertura en {z.name} →
                </span>
              </Link>
            ))}
          </div>

          <p className="animate-on-scroll" style={{ marginTop: "2rem", color: "#475569", fontSize: "0.9rem" }}>
            ¿Tu zona no aparece? <a href="https://wa.me/525610846022?text=Hola%20Doctor%20Foam%2C%20quiero%20consultar%20cobertura%20en%20mi%20zona" target="_blank" rel="noopener noreferrer" data-cta-location="cobertura_whatsapp" style={{ color: "var(--color-gold-400)", textDecoration: "underline", fontWeight: 700 }}>Escríbenos por WhatsApp</a> —
            posiblemente también te cubrimos.
          </p>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section style={{ display: "none" }} id="proceso">
        <div className="container">
          <div className="animate-on-scroll" style={{ textAlign: "center", marginBottom: "2rem" }}>
            <span className="section-label">¿Cómo Funciona?</span>
          </div>
          <div className="animate-on-scroll" style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: "0", maxWidth: "900px", margin: "0 auto", flexWrap: "wrap" }}>
            {processSteps.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", width: "160px" }}>
                  <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", background: "linear-gradient(135deg, #2563eb, #3b82f6)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1rem", marginBottom: "0.5rem", flexShrink: 0 }}>
                    {s.num}
                  </div>
                  <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.85rem", color: "#0f172a", marginBottom: "0.2rem" }}>{s.title}</p>
                  <p style={{ color: "#475569", fontSize: "0.75rem", lineHeight: "1.4" }}>{s.desc}</p>
                </div>
                {i < processSteps.length - 1 && (
                  <div style={{ width: "40px", height: "2px", background: "linear-gradient(90deg, #2563eb, #60a5fa)", marginTop: "1.25rem", flexShrink: 0, opacity: 0.3 }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GOOGLE REVIEWS ─── */}
      <section className="section-padding" id="resenas" style={{ background: "#f1f5f9" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div className="animate-on-scroll">
            <span className="section-label">Reseñas Verificadas</span>
            <h2 className="section-title">
              Lo que dicen nuestros <span className="gradient-text">clientes</span>
            </h2>

            {/* Google Rating Badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "1.5rem", background: "white", padding: "1.25rem 2rem", borderRadius: "1rem", marginTop: "1.5rem", boxShadow: "0 2px 16px rgba(0,0,0,0.06)", flexWrap: "wrap", justifyContent: "center" }}>
              {/* Google Logo */}
              <svg viewBox="0 0 272 92" width="80" height="27" xmlns="http://www.w3.org/2000/svg">
                <path d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#EA4335" />
                <path d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#FBBC05" />
                <path d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" fill="#4285F4" />
                <path d="M225 3v65h-9.5V3h9.5z" fill="#34A853" />
                <path d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z" fill="#EA4335" />
                <path d="M35.29 41.19V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49-.21z" fill="#4285F4" />
              </svg>

              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "2rem", color: "#0f172a" }}>{googleOverallRating}</span>
                <div>
                  <div style={{ color: "#FBBC05", fontSize: "1.1rem", letterSpacing: "2px" }}>
                    {"★".repeat(Math.floor(googleOverallRating))}{googleOverallRating % 1 >= 0.5 ? "★" : ""}
                  </div>
                  <p style={{ color: "#64748b", fontSize: "0.75rem", margin: 0 }}>{googleTotalReviews} reseñas</p>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", background: "#e8f5e9", padding: "0.35rem 0.75rem", borderRadius: "2rem", fontSize: "0.78rem", color: "#2e7d32", fontWeight: 600 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#2e7d32"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" /></svg>
                Verificado
              </div>
            </div>
          </div>

          {/* Reviews Infinite Carousel */}
          <div style={{ overflow: "hidden", marginTop: "2.5rem", position: "relative" }}>
            {/* Fade edges */}
            <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "60px", background: "linear-gradient(90deg, #f1f5f9, transparent)", zIndex: 2, pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "60px", background: "linear-gradient(270deg, #f1f5f9, transparent)", zIndex: 2, pointerEvents: "none" }} />
            <div className="reviews-marquee">
              {[...googleReviews, ...googleReviews].map((r, i) => (
                <div key={i} className="glass-card" style={{ padding: "1.25rem", textAlign: "left", minWidth: "320px", maxWidth: "320px", flexShrink: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.6rem" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg, #4285F4, #34A853)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: "0.85rem", flexShrink: 0 }}>
                      {r.author.charAt(0).toUpperCase()}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: 600, fontSize: "0.82rem", color: "#0f172a", margin: 0 }}>{r.author}</p>
                      <div style={{ color: "#FBBC05", fontSize: "0.75rem", letterSpacing: "1px" }}>{"★".repeat(r.stars)}</div>
                    </div>
                  </div>
                  <p style={{ color: "#334155", fontSize: "0.82rem", lineHeight: "1.6", margin: 0, display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>
                    &ldquo;{r.text}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Link to Google Maps */}
          <a
            href="https://maps.app.goo.gl/Hw6CwVxJrAPP6ASZ6"
            target="_blank"
            rel="noopener noreferrer"
            className="animate-on-scroll"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginTop: "2rem", color: "#4285F4", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none" }}
          >
            Ver todas las reseñas en Google Maps
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
          </a>
        </div>
      </section>


      {/* ─── BLOG CAROUSEL ─── */}
      <section className="section-padding" id="blog" style={{ background: "#ffffff" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div className="animate-on-scroll">
            <span className="section-label">Aprende con Nosotros</span>
            <h2 className="section-title">
              Últimos artículos del <span className="gradient-text">Blog</span>
            </h2>
          </div>

          <div style={{
            display: "flex",
            gap: "2rem",
            overflowX: "auto",
            paddingBottom: "2rem",
            marginTop: "3rem",
            scrollbarWidth: "none",
            msOverflowStyle: "none"
          }}>
            {/* Array is mapped over statically to prevent build errors since it's a client component */}
            {[
              { slug: "correccion-pintura-swirls-guia", title: "Swirls en la Pintura Automotriz: Qué Son y Cómo Eliminarlos", cat: "Corrección", img: "/blog/correccion-pintura-swirls-guia.png" },
              { slug: "verdad-recubrimiento-ceramico-9h-autos-premium", title: "Recubrimiento Cerámico 9H: Qué Significa Realmente y Precios", cat: "Protección 9H", img: "/blog/verdad-recubrimiento-ceramico-9h-autos-premium.png" },
              { slug: "guia-completa-recubrimiento-ceramico", title: "Guía Completa: Recubrimiento Cerámico en CDMX", cat: "Protección", img: "/blog/guia-completa-recubrimiento-ceramico.png" },
              { slug: "5-errores-lavado-auto-premium", title: "5 Errores que Arruinan la Pintura de tu Auto", cat: "Cuidado", img: "/blog/5-errores-lavado-auto-premium.png" },
              { slug: "desnaturalizacion-termica-180c-fin-extraccion-humeda", title: "Desnaturalización Térmica a 180°C: El Fin de la Extracción Húmeda", cat: "Vapor 180°C", img: "/seo/blog-economia.png" },
              { slug: "detallado-movil-grado-clinico-vs-lavado-convencional", title: "Detallado Móvil de Grado Clínico vs. Lavado a Domicilio Convencional", cat: "Grado Clínico", img: "/seo/blog-vs-detallado.png" },
              { slug: "mejores-ceras-selladores-mexico", title: "Las Mejores Ceras y Selladores en México", cat: "Productos", img: "/blog/mejores-ceras-selladores-mexico.png" }
            ].map((b, i) => (
              <Link key={i} href={`/blog/${b.slug}`} className="glass-card animate-on-scroll" style={{
                minWidth: "320px",
                maxWidth: "320px",
                flexShrink: 0,
                textAlign: "left",
                textDecoration: "none",
                display: "block",
                overflow: "hidden"
              }}>
                <div style={{ height: "200px", backgroundImage: `url(${b.img})`, backgroundSize: "cover", backgroundPosition: "center" }} />
                <div style={{ padding: "1.5rem" }}>
                  <span className="zone-tag zone-tag-gold" style={{ marginBottom: "0.5rem" }}>{b.cat}</span>
                  <h3 style={{ fontSize: "1.1rem", color: "#0f172a", marginTop: "0.5rem" }}>{b.title}</h3>
                  <p style={{ color: "var(--color-gold-400)", fontSize: "0.85rem", marginTop: "1rem", fontWeight: 600 }}>Leer artículo →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* ─── FAQ ─── */}
      <section className="section-padding" id="faq">
        <div className="container" style={{ maxWidth: "800px" }}>
          <div className="animate-on-scroll" style={{ textAlign: "center" }}>
            <span className="section-label">Preguntas Frecuentes</span>
            <h2 className="section-title">
              Todo lo que necesitas <span className="gradient-text">saber</span>
            </h2>
          </div>

          <div className="animate-on-scroll">
            {faqs.map((f, i) => (
              <div key={i} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  {f.q}
                  <svg
                    className={`faq-icon ${openFaq === i ? "open" : ""}`}
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
                <div className={`faq-answer ${openFaq === i ? "open" : ""}`}>
                  <div>{f.a}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.55rem", marginTop: "0.75rem", paddingTop: "0.65rem", borderTop: "1px dashed #e2e8f0" }}>
                    <a
                      href={`https://wa.me/525610846022?text=${encodeURIComponent(`Hola Doctor Foam, vi en su sección de preguntas frecuentes "${f.q}" y me gustaría cotizar un servicio a domicilio.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cta-location={`home_faq_${i}_whatsapp`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.35rem",
                        padding: "0.35rem 0.85rem",
                        borderRadius: "9999px",
                        background: "#f0fdf4",
                        border: "1px solid #86efac",
                        color: "#15803d",
                        fontWeight: 700,
                        fontSize: "0.78rem",
                        textDecoration: "none",
                      }}
                    >
                      💬 Cotizar por WhatsApp
                    </a>
                    <Link
                      href="/reservar"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.35rem",
                        padding: "0.35rem 0.85rem",
                        borderRadius: "9999px",
                        background: "#eff6ff",
                        border: "1px solid #bfdbfe",
                        color: "#1d4ed8",
                        fontWeight: 700,
                        fontSize: "0.78rem",
                        textDecoration: "none",
                      }}
                    >
                      📅 Reservar en Línea
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA / CONTACT ─── */}
      <section className="section-padding" id="contacto" style={{ display: "none" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div className="animate-on-scroll">
            <span className="section-label">Reserva Tu Servicio</span>
            <h2 className="section-title">
              ¿Listo para la <span className="gradient-text">experiencia Doctor Foam</span>?
            </h2>
            <p className="section-subtitle">
              Paga en línea de forma segura y agenda tu servicio de inmediato.
              Todos los precios incluyen IVA. Todos los servicios son facturables.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/reservar" className="btn-premium">
                💳 Reservar y Pagar en Línea
              </Link>
              <a
                href="https://wa.me/525610846022?text=Hola%20Doctor%20Foam%2C%20tengo%20dudas%20sobre%20sus%20paquetes%20de%20detallado%20a%20domicilio"
                target="_blank"
                rel="noopener noreferrer"
                data-cta-location="home_bottom_whatsapp_cta"
                className="btn-premium"
                style={{ background: "linear-gradient(135deg, #16a34a, #15803d)" }}
              >
                💬 Cotizar por WhatsApp
              </a>
            </div>
            <p style={{ color: "#475569", fontSize: "0.8rem", marginTop: "1rem" }}>
              🔒 Pago seguro con Stripe · Facturación CFDI disponible
            </p>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <Logo />
            <p style={{ color: "#475569", fontSize: "0.875rem", marginTop: "1rem", maxWidth: "320px", lineHeight: "1.7" }}>
              Servicio de detallado automotriz premium a domicilio. Equipo industrial, químicos
              profesionales, resultados extraordinarios. Valle de México.
            </p>
            <div style={{ marginTop: "1.1rem" }}>
              <a
                href="/brochure-doctor-foam.pdf"
                download="Brochure-Corporativo-Doctor-Foam-2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                data-cta-location="footer_brochure_pdf_btn"
                className="btn-premium"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.6rem 1.15rem",
                  fontSize: "0.82rem",
                  textDecoration: "none",
                }}
              >
                📄 Descargar Brochure Corporativo (PDF)
              </a>
            </div>
          </div>
          <div>
            <h4 className="footer-title">Servicios</h4>
            <ul className="footer-links">
              <li><Link href="/lavado-recurrente-autos-domicilio">Lavado Recurrente a Domicilio</Link></li>
              <li><Link href="/lavado-profundo-vehiculos-cdmx">Lavado Profundo y Detallado</Link></li>
              <li><Link href="/lavado-profundo-vehiculos-cdmx/paquetes-detallado-automotriz">Paquetes y Precios</Link></li>
              <li><Link href="/membresia-doctor-foam">Membresía Doctor Foam</Link></li>
              <li><Link href="/lavado-autos-estacionamiento-corporativo">Corporativos y Oficinas</Link></li>
              <li>
                <a
                  href="/brochure-doctor-foam.pdf"
                  download="Brochure-Corporativo-Doctor-Foam-2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontWeight: 700, color: "#2563eb" }}
                >
                  📄 Brochure de Servicios (PDF)
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="footer-title">Cobertura</h4>
            <ul className="footer-links">
              <li><Link href="/zonas/polanco">Polanco</Link></li>
              <li><Link href="/zonas/lomas-de-chapultepec">Lomas de Chapultepec</Link></li>
              <li><Link href="/zonas/santa-fe">Santa Fe</Link></li>
              <li><Link href="/zonas/bosques-de-las-lomas">Bosques de las Lomas</Link></li>
              <li><Link href="/zonas/pedregal">Pedregal</Link></li>
              <li><Link href="/zonas/interlomas">Interlomas y Bosque Real</Link></li>
              <li><Link href="/zonas/huixquilucan">Huixquilucan y Tecamachalco</Link></li>
              <li><Link href="/zonas/coyoacan">Coyoacán y San Ángel</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-title">Contacto</h4>
            <ul className="footer-links">
              <li><a href="https://wa.me/525610846022?text=Hola%20Doctor%20Foam%2C%20tengo%20una%20consulta" target="_blank" rel="noopener noreferrer" data-cta-location="footer_cta">WhatsApp Directo</a></li>
              <li><a href="https://wa.me/525610846022" target="_blank" rel="noopener noreferrer">+52 56 1084 6022 (WhatsApp)</a></li>
              <li><a href="mailto:info@drfoam.com.mx">info@drfoam.com.mx</a></li>
              <li><a href="https://instagram.com/doctorfoam.mx">Instagram</a></li>
              <li><a href="https://facebook.com/doctorfoam.mx">Facebook</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Doctor Foam México. Todos los derechos reservados.</p>
          <p style={{ marginTop: "0.5rem" }}>
            <Link href="/aviso-de-privacidad" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "underline" }}>
              Aviso de Privacidad
            </Link>
            {" · "}
            <Link href="/blog" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "underline" }}>
              Blog
            </Link>
            {" · "}
            <a
              href="/brochure-doctor-foam.pdf"
              download="Brochure-Corporativo-Doctor-Foam-2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#2563eb", fontWeight: 700, textDecoration: "underline" }}
            >
              📄 Descargar Brochure PDF
            </a>
          </p>
        </div>
      </footer>

      {/* Chat handled by GuestChat in layout */}
    </>
  );
}
