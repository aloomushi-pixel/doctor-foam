import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Lavado Recurrente de Autos a Domicilio en CDMX ($990/mes + 10% OFF) | Doctor Foam",
  description:
    "Programa de lavado y encerado de autos a domicilio en CDMX ($990/mes Sedán | $1,160/mes SUV). Seguimiento post-lavado profundo con método 2 cubetas y 10% OFF permanente en detallado.",
  alternates: { canonical: "https://drfoam.com.mx/lavado-recurrente-autos-domicilio" },
  openGraph: {
    title: "Lavado Recurrente para Vehículos a Domicilio en CDMX ($990/mes) | Doctor Foam",
    description: "Seguimiento preventivo a tu primer lavado profundo + 10% de descuento permanente en paquetes especializados.",
  },
};

const benefits = [
  { icon: "🛡️", title: "Preserva el Valor de Reventa", desc: "Un auto con mantenimiento constante retiene hasta un 20% más de su valor. Cada lavado recurrente protege tu inversión a largo plazo." },
  { icon: "⏰", title: "Ahorra tu Tiempo", desc: "No más filas en autolavados ni traslados. Nosotros vamos a tu casa, oficina o donde tú estés. En 2-3 horas tu auto queda impecable." },
  { icon: "🧪", title: "Químicos de pH Neutro", desc: "Usamos exclusivamente champú automotriz de pH neutro que no degrada ceras, selladores ni recubrimientos cerámicos previos." },
  { icon: "🚿", title: "Método Dos Cubetas", desc: "El estándar profesional para evitar micro-rayones (swirls). Nunca reciclamos agua sucia contra tu pintura." },
  { icon: "🌿", title: "Eco-Friendly", desc: "Consumimos 45% menos agua que un lavado tradicional. Certificación Sello ECO. Ideal para condominios con restricciones de agua." },
  { icon: "📅", title: "Frecuencia Flexible", desc: "Quincenal, mensual o bimestral. Tú eliges la periodicidad que funcione con tu estilo de vida." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Lavado Recurrente a Domicilio — Doctor Foam",
  description: "Servicio de lavado recurrente para vehículos a domicilio con equipo industrial y químicos profesionales en CDMX.",
  provider: { "@type": "LocalBusiness", name: "Doctor Foam México", telephone: "+52-56-1084-6022" },
  serviceType: "Lavado recurrente de autos a domicilio",
  areaServed: { "@type": "City", name: "Ciudad de México" },
  url: "https://drfoam.com.mx/lavado-recurrente-autos-domicilio",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Planes de Lavado Recurrente a Domicilio en CDMX",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Membresía Mensual de Lavado Recurrente a Domicilio (Método Dos Cubetas y pH Neutro)" },
        price: "990",
        priceCurrency: "MXN",
        url: "https://drfoam.com.mx/membresia-doctor-foam",
      },
    ],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://drfoam.com.mx/" },
    { "@type": "ListItem", position: 2, name: "Lavado Recurrente de Autos a Domicilio", item: "https://drfoam.com.mx/lavado-recurrente-autos-domicilio" },
  ],
};

const recurrenteFaqs = [
  {
    q: "¿Cómo se activa la membresía de lavado recurrente de autos a domicilio en CDMX?",
    a: "Para empezar a operar la Membresía de Lavado Recurrente (desde $990 MXN/mes), primero es necesario contratar un servicio de lavado profundo inicial (como Industrial Deep Interior, Signature Detail o Ceramic Coating 9H). La membresía está hecha para darle seguimiento continuo a ese primer servicio profundo y te otorga un 10% de descuento permanente en todos los lavados más especializados.",
  },
  {
    q: "¿Por qué el lavado recurrente de Doctor Foam no raya la pintura como los autolavados?",
    a: "Utilizamos pre-lavado con espuma activa (snow foam), técnica de dos cubetas con rejillas atrapa-partículas (Grit Guard), guantes de microfibra coreana de alto gramaje y secado con aire filtrado y toallas limpias por vehículo, eliminando el riesgo de micro-rayones (swirls).",
  },
  {
    q: "¿Pueden lavar mi auto de forma recurrente en el estacionamiento de mi edificio o corporativo?",
    a: "Sí. Nuestras unidades móviles son 100% autónomas con agua filtrada y energía propia, y cuentan con certificación Sello ECO (45% menos agua y cero escurrimientos), ideal para condominios y edificios corporativos en Polanco, Santa Fe, Lomas, Bosques, Interlomas y Pedregal.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: recurrenteFaqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function LavadoRecurrentePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <nav className="navbar navbar-scrolled">
        <div className="navbar-inner">
          <Link href="/" style={{ textDecoration: "none" }}>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.3rem", color: "#0f172a" }}>
              DOCTOR <span className="gradient-text">FOAM</span>
            </span>
          </Link>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
            <Link href="/lavado-profundo-vehiculos-cdmx" style={{ fontSize: "0.82rem", fontWeight: 600, color: "#334155", textDecoration: "none" }}>
              Lavado Profundo
            </Link>
            <Link href="/membresia-doctor-foam" style={{ fontSize: "0.82rem", fontWeight: 600, color: "#334155", textDecoration: "none" }}>
              Membresía $990
            </Link>
            <Link href="/lavado-autos-estacionamiento-corporativo" style={{ fontSize: "0.82rem", fontWeight: 600, color: "#334155", textDecoration: "none" }}>
              Corporativo
            </Link>
            <a
              href="https://wa.me/525610846022?text=Hola%20Doctor%20Foam%2C%20me%20interesa%20el%20lavado%20recurrente%20a%20domicilio"
              target="_blank"
              rel="noopener noreferrer"
              data-cta-location="pillar_recurrente_nav_whatsapp"
              className="btn-outline"
              style={{ padding: "0.45rem 0.9rem", fontSize: "0.78rem" }}
            >
              💬 WhatsApp
            </a>
            <Link href="/reservar" className="btn-premium" style={{ padding: "0.5rem 1.2rem", fontSize: "0.8rem" }}>
              Agendar Servicio
            </Link>
          </div>
        </div>
      </nav>

      <main style={{ paddingTop: "5rem" }}>
        {/* Hero */}
        <section className="section-padding" style={{ textAlign: "center", paddingTop: "1.2rem", paddingBottom: "1.5rem" }}>
          <div className="container">
            <span className="section-label">Mantenimiento Premium desde $990/mes</span>
            <h1 className="section-title" style={{ marginBottom: "0.75rem" }}>
              Lavado Recurrente para Vehículos a Domicilio: <span className="gradient-text">Mantenimiento Premium</span>
            </h1>
            <p className="section-subtitle" style={{ maxWidth: "760px", marginBottom: "1.05rem" }}>
              Tu auto merece un cuidado constante, no esporádico. Nuestro programa de <Link href="/" style={{ color: "var(--color-gold-400)", textDecoration: "underline" }}>lavado de autos a domicilio</Link> recurrente está diseñado para <strong>darle seguimiento continuo a tu primer servicio de lavado profundo</strong> con el estándar clínico de Doctor Foam.
            </p>

            {/* Primary 0%-Scroll Mobile CTAs Placed BEFORE the 2-Step Card */}
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "1.2rem" }}>
              <a
                href="https://wa.me/525610846022?text=Hola%20Doctor%20Foam%2C%20me%20interesa%20activar%20el%20lavado%20recurrente%20a%20domicilio%20(empezando%20con%20mi%20primer%20lavado%20profundo)"
                target="_blank"
                rel="noopener noreferrer"
                data-cta-location="pillar_recurrente_hero_whatsapp"
                className="btn-premium"
                style={{ background: "linear-gradient(135deg, #16a34a, #15803d)" }}
              >
                💬 Cotizar Plan por WhatsApp
              </a>
              <Link href="/reservar?paquete=deep-interior" className="btn-premium">
                📅 1. Agendar Lavado Profundo Inicial
              </Link>
              <Link href="/membresia-doctor-foam" className="btn-outline" style={{ borderColor: "#2563eb", color: "#1d4ed8", fontWeight: 700 }}>
                🔄 Ver Membresía ($990/mes)
              </Link>
              <a
                href="/brochure-doctor-foam.pdf"
                download="Brochure-Corporativo-Doctor-Foam-2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                📄 Brochure PDF
              </a>
            </div>

            {/* Regla de Negocio: Paso 1 Lavado Profundo -> Paso 2 Membresía Recurrente + 10% OFF */}
            <div
              className="glass-card"
              style={{
                maxWidth: "860px",
                margin: "0 auto",
                padding: "1.1rem 1.3rem",
                textAlign: "left",
                border: "1.5px solid rgba(37, 99, 235, 0.25)",
                background: "linear-gradient(135deg, rgba(37, 99, 235, 0.05), rgba(16, 185, 129, 0.05))",
              }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem", alignItems: "start" }}>
                <div>
                  <span style={{ display: "inline-block", fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: "#2563eb", marginBottom: "0.25rem" }}>
                    1️⃣ Cómo Empezar (Paso 1 Obligatorio)
                  </span>
                  <p style={{ color: "#1e293b", fontSize: "0.86rem", lineHeight: "1.6", margin: 0 }}>
                    Para activar el programa de lavado recurrente y membresía, <strong>primero contratamos un servicio de <Link href="/lavado-profundo-vehiculos-cdmx" style={{ color: "#2563eb", textDecoration: "underline" }}>Lavado Profundo</Link></strong> (desde $2,400 MXN). Así dejamos tu vehículo en estado clínico base.
                  </p>
                </div>
                <div>
                  <span style={{ display: "inline-block", fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: "#15803d", marginBottom: "0.25rem" }}>
                    2️⃣ Seguimiento + 10% de Descuento Permanente
                  </span>
                  <p style={{ color: "#1e293b", fontSize: "0.86rem", lineHeight: "1.6", margin: 0 }}>
                    Tu membresía mantiene ese primer servicio con lavados preventivos pH neutro (método 2 cubetas) y te otorga un <strong>10% de descuento permanente en todos los lavados más especializados</strong> (vestiduras a 180°C, corrección de pintura y cerámico 9H).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Above-the-Fold Quick Plans & 1-Tap Booking Strip */}
        <section style={{ paddingBottom: "2.25rem" }}>
          <div className="container" style={{ maxWidth: "1020px" }}>
            <div style={{ background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "1rem", padding: "1.15rem 1.25rem", boxShadow: "0 8px 24px rgba(15, 23, 42, 0.05)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.85rem" }}>
                <span style={{ fontSize: "0.78rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: "#0f172a" }}>
                  ⚡ Planes y Precios 2026 de Lavado Recurrente y Seguimiento (IVA y CFDI Incluidos)
                </span>
                <span style={{ fontSize: "0.75rem", color: "#15803d", fontWeight: 700 }}>
                  ✅ Unidades 100% autónomas (agua y luz a bordo)
                </span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.75rem" }}>
                {[
                  {
                    badge: "Paso 1 · Requisito Inicial",
                    name: "Industrial Deep Interior",
                    price: "$2,400 MXN",
                    sub: "Habilita tu Membresía (-10% OFF)",
                    desc: "Vapor seco 180°C en vestiduras, alfombra, cielo y ozono médico (3-4 hrs).",
                    slug: "deep-interior",
                    waText: "Hola Doctor Foam, estoy en Lavado Recurrente y quiero agendar mi Paso 1 (Industrial Deep Interior $2,400 MXN) para activar mi membresía",
                  },
                  {
                    badge: "Paso 2 · Plan Sedán",
                    name: "Membresía Sedán Recurrente",
                    price: "$990 / mes",
                    sub: "+10% OFF en paquetes especializados",
                    desc: "Seguimiento preventivo pH neutro, 2 cubetas, microfibra 500 GSM y sellador UV.",
                    slug: "membership-sedan",
                    waText: "Hola Doctor Foam, me interesa la Membresía Sedán de Lavado Recurrente ($990/mes + 10% OFF en servicios especializados)",
                  },
                  {
                    badge: "Paso 2 · Plan SUV / Multi-Auto",
                    name: "Membresía SUV / VIP",
                    price: "$1,160 / mes",
                    sub: "+10% OFF en cualquier vehículo",
                    desc: "Seguimiento bimestral Foam Maintenance + 10% de descuento permanente.",
                    slug: "membresia",
                    waText: "Hola Doctor Foam, me interesa la Membresía SUV / VIP de Lavado Recurrente ($1,160/mes + 10% OFF permanente)",
                  },
                  {
                    badge: "Mantenimiento por Evento",
                    name: "Foam Maintenance",
                    price: "$1,800 MXN",
                    sub: "Para clientes post-servicio",
                    desc: "Foam cannon pH neutro, descontaminación química, clay bar y sellador UV.",
                    slug: "foam-maintenance",
                    waText: "Hola Doctor Foam, quiero agendar un servicio de seguimiento Foam Maintenance ($1,800 MXN) a domicilio",
                  },
                ].map((plan, idx) => (
                  <div key={idx} style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "0.75rem", padding: "0.95rem 1rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.35rem", marginBottom: "0.2rem" }}>
                        <span style={{ fontSize: "0.66rem", fontWeight: 800, color: "#2563eb", textTransform: "uppercase" }}>{plan.badge}</span>
                        <span style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a" }}>{plan.price}</span>
                      </div>
                      <div style={{ fontSize: "0.7rem", color: "#15803d", fontWeight: 700, marginBottom: "0.2rem" }}>{plan.sub}</div>
                      <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#0f172a", marginBottom: "0.2rem" }}>{plan.name}</div>
                      <div style={{ fontSize: "0.75rem", color: "#475569", marginBottom: "0.65rem", lineHeight: 1.45 }}>{plan.desc}</div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem" }}>
                      <a
                        href={`https://wa.me/525610846022?text=${encodeURIComponent(plan.waText)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cta-location={`pillar_recurrente_quick_strip_${idx}`}
                        style={{ display: "block", textAlign: "center", padding: "0.45rem 0.4rem", borderRadius: "0.5rem", background: "#f0fdf4", border: "1px solid #86efac", color: "#15803d", fontWeight: 700, fontSize: "0.73rem", textDecoration: "none" }}
                      >
                        💬 WhatsApp
                      </a>
                      <Link
                        href={`/reservar?paquete=${plan.slug}`}
                        style={{ display: "block", textAlign: "center", padding: "0.45rem 0.4rem", borderRadius: "0.5rem", background: "#eff6ff", border: "1px solid #bfdbfe", color: "#1d4ed8", fontWeight: 700, fontSize: "0.73rem", textDecoration: "none" }}
                      >
                        📅 Reservar
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 1.5rem" }}>
          <Image
            src="/seo/hero-recurrente.png"
            alt="Técnico de Doctor Foam aplicando espuma sobre un SUV negro en una residencia de lujo en CDMX"
            width={1200}
            height={600}
            style={{ width: "100%", height: "auto", borderRadius: "1.25rem", boxShadow: "0 4px 25px rgba(0,0,0,0.08)" }}
            priority
          />
        </div>

        {/* Benefits */}
        <section className="section-padding" style={{ paddingTop: "3rem" }}>
          <div className="container" style={{ maxWidth: "1000px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: "1.5rem" }}>
              {benefits.map((b, i) => (
                <div key={i} className="glass-card" style={{ padding: "2rem", textAlign: "left" }}>
                  <span style={{ fontSize: "2rem", display: "block", marginBottom: "0.75rem" }}>{b.icon}</span>
                  <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>{b.title}</h3>
                  <p style={{ color: "#475569", fontSize: "0.9rem", lineHeight: "1.7" }}>{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Links to sub-pages */}
        <section className="section-padding" style={{ textAlign: "center" }}>
          <div className="container" style={{ maxWidth: "900px" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
              ¿Qué Incluye Cada Visita de <span className="gradient-text">Lavado Recurrente</span>? (Protocolo de 8 Pasos)
            </h2>
            <p style={{ color: "#475569", fontSize: "0.9rem", maxWidth: "680px", margin: "0 auto 1.5rem" }}>
              Cada visita de seguimiento se ejecuta en tu domicilio u oficina (2 a 2.5 horas) sin usar tu agua ni electricidad:
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(205px, 1fr))", gap: "0.75rem", textAlign: "left", marginBottom: "2rem" }}>
              {[
                { step: "1. Pre-Lavado Foam Cannon", desc: "Espuma activa pH neutro que encapsula polvo sin fricción." },
                { step: "2. Método Dos Cubetas", desc: "Trampas Grit Guard para evitar micro-rayones (swirls)." },
                { step: "3. Descontaminación Química", desc: "Remoción de savia, lluvia ácida y partículas férricas." },
                { step: "4. Barra de Arcilla Sintética", desc: "Superficie lisa como cristal sin contaminantes adheridos." },
                { step: "5. Sellador UV Hidrofóbico", desc: "Refuerza el brillo espejo y protege pintura o cerámico." },
                { step: "6. Secado Microfibra 500 GSM", desc: "Toallas coreanas limpias por auto y soplado sin marcas." },
                { step: "7. Rines y Llantas Satinadas", desc: "Descontaminación de rines y acondicionador seco UV." },
                { step: "8. Limpieza Interior Express", desc: "Aspirado profundo de cabina, tablero, consola y cristales." },
              ].map((item, idx) => (
                <div key={idx} className="glass-card" style={{ padding: "0.95rem 1.1rem", border: "1px solid #e2e8f0" }}>
                  <div style={{ fontWeight: 700, fontSize: "0.86rem", color: "#0f172a", marginBottom: "0.25rem" }}>
                    ✅ {item.step}
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "#475569", lineHeight: 1.5 }}>
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
              <Link href="/membresia-doctor-foam" className="glass-card" style={{ padding: "2rem", textDecoration: "none", textAlign: "center", border: "2px solid rgba(37,99,235,0.15)", transition: "border-color 0.3s" }}>
                <span style={{ fontSize: "2rem", display: "block", marginBottom: "0.75rem" }}>🔄</span>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>Membresía Doctor Foam</h3>
                <p style={{ color: "#475569", fontSize: "0.85rem" }}>Planes, precios y beneficios exclusivos</p>
              </Link>
              <Link href="/lavado-recurrente-autos-domicilio/que-incluye-mantenimiento" className="glass-card" style={{ padding: "2rem", textDecoration: "none", textAlign: "center", border: "2px solid rgba(37,99,235,0.15)", transition: "border-color 0.3s" }}>
                <span style={{ fontSize: "2rem", display: "block", marginBottom: "0.75rem" }}>🧽</span>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>¿Qué Incluye el Mantenimiento?</h3>
                <p style={{ color: "#475569", fontSize: "0.85rem" }}>Cada detalle de nuestro servicio técnico</p>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-padding" style={{ paddingTop: 0 }}>
          <div className="container" style={{ maxWidth: "850px" }}>
            <h2 style={{ fontSize: "1.45rem", marginBottom: "1.25rem", textAlign: "center", color: "#0f172a" }}>
              Preguntas Frecuentes sobre Lavado Recurrente a Domicilio
            </h2>
            <div style={{ display: "grid", gap: "1rem" }}>
              {recurrenteFaqs.map((item, idx) => (
                <div key={idx} className="glass-card" style={{ padding: "1.5rem" }}>
                  <h3 style={{ fontSize: "1.02rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.5rem" }}>
                    {item.q}
                  </h3>
                  <p style={{ color: "#334155", fontSize: "0.92rem", lineHeight: "1.7", marginBottom: "0.75rem" }}>
                    {item.a}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", paddingTop: "0.55rem", borderTop: "1px dashed #e2e8f0" }}>
                    <a
                      href={`https://wa.me/525610846022?text=${encodeURIComponent(`Hola Doctor Foam, leí "${item.q}" en Lavado Recurrente y quiero cotizar mi servicio a domicilio.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cta-location={`pillar_recurrente_faq_${idx}_whatsapp`}
                      style={{ fontSize: "0.76rem", fontWeight: 700, color: "#15803d", background: "#f0fdf4", border: "1px solid #86efac", borderRadius: "9999px", padding: "0.3rem 0.75rem", textDecoration: "none" }}
                    >
                      💬 Cotizar por WhatsApp
                    </a>
                    <Link
                      href="/reservar?paquete=deep-interior"
                      style={{ fontSize: "0.76rem", fontWeight: 700, color: "#1d4ed8", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "9999px", padding: "0.3rem 0.75rem", textDecoration: "none" }}
                    >
                      📅 Agendar Paso 1 en Línea
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding" style={{ textAlign: "center" }}>
          <div className="container" style={{ maxWidth: "650px" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
              ¿Listo para el <span className="gradient-text">mantenimiento perfecto</span>?
            </h2>
            <p style={{ color: "#475569", marginBottom: "2rem" }}>
              Agenda tu primer lavado recurrente, conoce nuestra membresía o cotiza directo por WhatsApp.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/membresia-doctor-foam" className="btn-premium">
                🔄 Ver Membresía
              </Link>
              <Link href="/reservar" className="btn-outline">
                📅 Agendar Servicio
              </Link>
              <a
                href="https://wa.me/525610846022?text=Hola%20Doctor%20Foam%2C%20me%20interesa%20el%20lavado%20recurrente%20a%20domicilio"
                target="_blank"
                rel="noopener noreferrer"
                data-cta-location="pillar_recurrente_whatsapp"
                className="btn-outline"
              >
                💬 WhatsApp Directo
              </a>
            </div>
          </div>
        </section>

        {/* Zonas de Cobertura Hub */}
        <section className="section-padding" style={{ paddingTop: 0 }}>
          <div className="container" style={{ maxWidth: "900px", textAlign: "center" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.75rem", color: "#0f172a" }}>
              Zonas de Cobertura de Lavado Recurrente a Domicilio (CDMX y EdoMex)
            </h3>
            <p style={{ fontSize: "0.85rem", color: "#475569", marginBottom: "1rem" }}>
              Unidades móviles 100% autónomas con agua filtrada y generador propio en:
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center" }}>
              {[
                { slug: "polanco", label: "Polanco" },
                { slug: "lomas-de-chapultepec", label: "Lomas de Chapultepec" },
                { slug: "santa-fe", label: "Santa Fe" },
                { slug: "bosques-de-las-lomas", label: "Bosques de las Lomas" },
                { slug: "pedregal", label: "Pedregal y San Ángel" },
                { slug: "interlomas", label: "Interlomas" },
                { slug: "huixquilucan", label: "Huixquilucan y Zona Esmeralda" },
                { slug: "coyoacan", label: "Coyoacán" },
              ].map((z) => (
                <Link
                  key={z.slug}
                  href={`/zonas/${z.slug}`}
                  className="zone-tag zone-tag-blue"
                  style={{ textDecoration: "none", fontSize: "0.8rem", padding: "0.35rem 0.8rem" }}
                >
                  📍 {z.label}
                </Link>
              ))}
            </div>

            {/* Final 100%-Scroll Direct Action Card */}
            <div
              style={{
                marginTop: "2.25rem",
                padding: "1.35rem 1.5rem",
                borderRadius: "1rem",
                background: "linear-gradient(135deg, #f0fdf4 0%, #eff6ff 100%)",
                border: "1px solid #86efac",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                textAlign: "left",
              }}
            >
              <div style={{ flex: "1 1 280px" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#15803d", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  🔄 Paso 1: Lavado Profundo ($2,400) → Paso 2: Membresía ($990/mes + 10% OFF)
                </div>
                <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a", marginTop: "0.15rem" }}>
                  ¿Listo para comenzar tu programa de lavado recurrente a domicilio?
                </div>
                <div style={{ fontSize: "0.82rem", color: "#475569", marginTop: "0.2rem" }}>
                  Agenda tu primer lavado profundo en línea o escríbenos por WhatsApp para programar tu visita en CDMX o Zona Metropolitana.
                </div>
              </div>
              <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", alignItems: "center" }}>
                <a
                  href="https://wa.me/525610846022?text=Hola%20Doctor%20Foam%2C%20quiero%20empezar%20mi%20programa%20de%20lavado%20recurrente%20a%20domicilio%20(Paso%201%3A%20Lavado%20Profundo%20%2B%20Membres%C3%ADa)"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta-location="pillar_recurrente_footer_banner_whatsapp"
                  className="btn-premium"
                  style={{ background: "linear-gradient(135deg, #16a34a, #15803d)", padding: "0.65rem 1.15rem", fontSize: "0.84rem" }}
                >
                  💬 Empezar por WhatsApp
                </a>
                <Link
                  href="/reservar?paquete=deep-interior"
                  className="btn-premium"
                  style={{ padding: "0.65rem 1.15rem", fontSize: "0.84rem" }}
                >
                  📅 Agendar Paso 1 ($2,400)
                </Link>
                <a
                  href="/brochure-doctor-foam.pdf"
                  download="Brochure-Corporativo-Doctor-Foam-2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                  style={{ padding: "0.6rem 1rem", fontSize: "0.82rem", background: "#ffffff" }}
                >
                  📄 Brochure PDF
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-bottom" style={{ borderTop: "none", marginTop: 0 }}>
          <p>&copy; {new Date().getFullYear()} Doctor Foam México. Todos los derechos reservados.</p>
          <p style={{ marginTop: "0.5rem" }}>
            <Link href="/" style={{ color: "#64748b", textDecoration: "underline" }}>Inicio</Link>
            {" · "}
            <Link href="/lavado-recurrente-autos-domicilio" style={{ color: "#64748b", textDecoration: "underline" }}>Lavado Recurrente</Link>
            {" · "}
            <Link href="/lavado-profundo-vehiculos-cdmx" style={{ color: "#64748b", textDecoration: "underline" }}>Lavado Profundo</Link>
            {" · "}
            <Link href="/lavado-autos-estacionamiento-corporativo" style={{ color: "#64748b", textDecoration: "underline" }}>Estacionamiento Corporativo</Link>
            {" · "}
            <Link href="/membresia-doctor-foam" style={{ color: "#64748b", textDecoration: "underline" }}>Membresía</Link>
            {" · "}
            <Link href="/blog" style={{ color: "#64748b", textDecoration: "underline" }}>Blog</Link>
            {" · "}
            <a href="/brochure-doctor-foam.pdf" download="Brochure-Corporativo-Doctor-Foam-2026.pdf" target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb", fontWeight: 700, textDecoration: "underline" }}>📄 Descargar Brochure PDF</a>
          </p>
        </div>
      </footer>
    </>
  );
}
