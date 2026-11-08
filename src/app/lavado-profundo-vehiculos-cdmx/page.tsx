import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Lavado Profundo de Autos CDMX | Extracción Térmica y Detallado",
  description:
    "Restaura tu auto a nivel de exhibición. Lavado profundo a domicilio con extracción térmica, desinfección UV y corrección de pintura profesional en CDMX.",
  alternates: { canonical: "https://drfoam.com.mx/lavado-profundo-vehiculos-cdmx" },
  openGraph: {
    title: "Lavado Profundo de Vehículos | Doctor Foam México",
    description: "Detallado y restauración completa a domicilio. Extracción térmica, corrección de pintura y recubrimiento cerámico.",
  },
};

const services = [
  {
    icon: "♨️",
    name: "Industrial Deep Interior",
    price: "$2,400",
    tagline: "Restauración interior completa",
    highlights: ["Vapor seco 180°C", "Extracción profunda de manchas", "Hidratación de pieles", "Sanitización con ozono"],
    desc: "Tu interior absorbe todo: polvo, bacterias, ácaros, derrames invisibles. Nuestro vapor seco industrial a 180°C penetra cada fibra del tapizado y elimina lo que una aspiradora jamás alcanza.",
  },
  {
    icon: "💎",
    name: "Signature Detail",
    price: "$7,499",
    tagline: "Corrección de pintura + interior completo (SUV o Negro +15%)",
    highlights: ["Corrección 2-3 etapas", "Eliminación de swirls 95%", "Interior completo incluido", "Sellador cerámico 6 meses"],
    desc: "Los micro-rayones hacen que tu pintura luzca opaca. Nuestros técnicos certificados IDA corrigen la pintura eliminando hasta el 95% de imperfecciones. Incluye el Interior completo.",
    featured: true,
  },
  {
    icon: "🛡️",
    name: "Ceramic Coating",
    price: "$10,999",
    tagline: "Protección de nueva generación",
    highlights: ["Protección 3-5 años", "Dureza 9H", "Certificado incluido", "Upgrade Cristal líquido disponible"],
    desc: "Escudo invisible de dureza 9H que repele agua, suciedad y químicos durante 3 a 5 años. Incluye preparación completa de superficie y certificado Doctor Foam.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Lavado Profundo de Vehículos y Detallado Automotriz a Domicilio — Doctor Foam",
  description: "Servicio de lavado profundo de vestiduras y asientos de auto, detallado automotriz y restauración de vehículos a domicilio en CDMX.",
  provider: { "@type": "LocalBusiness", name: "Doctor Foam México", telephone: "+52-56-1084-6022" },
  serviceType: "Lavado profundo y detallado automotriz a domicilio",
  areaServed: { "@type": "City", name: "Ciudad de México" },
  url: "https://drfoam.com.mx/lavado-profundo-vehiculos-cdmx",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Paquetes de Lavado Profundo y Detallado Automotriz en CDMX",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Industrial Deep Interior (Lavado de Vestiduras y Asientos con Vapor a 180°C)" },
        price: "2400",
        priceCurrency: "MXN",
        url: "https://drfoam.com.mx/lavado-profundo-vehiculos-cdmx",
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Signature Detail (Corrección de Pintura + Interior Profundo)" },
        price: "7499",
        priceCurrency: "MXN",
        url: "https://drfoam.com.mx/lavado-profundo-vehiculos-cdmx/paquetes-detallado-automotriz",
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Ceramic Coating 9H (Blindaje Cerámico 3-5 Años)" },
        price: "10999",
        priceCurrency: "MXN",
        url: "https://drfoam.com.mx/lavado-profundo-vehiculos-cdmx/diferencias-servicios-detallado",
      },
    ],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://drfoam.com.mx/" },
    { "@type": "ListItem", position: 2, name: "Lavado Profundo y Detallado Automotriz CDMX", item: "https://drfoam.com.mx/lavado-profundo-vehiculos-cdmx" },
  ],
};

const profundoFaqs = [
  {
    q: "¿Cuánto cuesta el lavado de asientos y vestiduras de auto a domicilio en CDMX?",
    a: "Nuestro paquete Industrial Deep Interior tiene un precio desde $2,400 MXN (IVA incluido) para sedán o SUV de 2 filas. Incluye desinfección con vapor seco a 180°C, extracción térmica de manchas en asientos, alfombra y cielo, hidratación de pieles y sanitización con ozono.",
  },
  {
    q: "¿Cuánto tiempo tarda un lavado profundo o detallado automotriz a domicilio?",
    a: "El lavado profundo interior (Industrial Deep Interior) toma entre 3 y 4 horas con secado acelerado para que uses tu auto el mismo día. El paquete Signature Detail con corrección de pintura de 2 a 3 etapas toma de 6 a 8 horas directamente en tu estacionamiento.",
  },
  {
    q: "¿Necesitan toma de agua o luz en mi departamento o corporativo?",
    a: "No. Las unidades móviles de Doctor Foam son 100% autónomas: cuentan con generador eléctrico propio y tanque de agua desmineralizada, por lo que operamos en sótanos residenciales y corporativos de Polanco, Santa Fe, Lomas, Bosques, Interlomas y Pedregal sin conectar nada a tu domicilio.",
  },
  {
    q: "¿Cómo funciona el seguimiento con Membresía y el 10% de descuento después de mi primer lavado profundo?",
    a: "Al contratar cualquiera de nuestros paquetes de lavado profundo (Industrial Deep Interior, Signature Detail o Ceramic Coating 9H), desbloqueas la posibilidad de activar la Membresía Doctor Foam (desde $990 MXN/mes), diseñada para darle seguimiento recurrente a tu primer servicio y otorgarte un 10% de descuento permanente en todos los lavados más especializados.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: profundoFaqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function LavadoProfundoPage() {
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
            <Link href="/lavado-recurrente-autos-domicilio" style={{ fontSize: "0.82rem", fontWeight: 600, color: "#334155", textDecoration: "none" }}>
              Lavado Recurrente
            </Link>
            <Link href="/membresia-doctor-foam" style={{ fontSize: "0.82rem", fontWeight: 600, color: "#334155", textDecoration: "none" }}>
              Membresía $990
            </Link>
            <Link href="/lavado-autos-estacionamiento-corporativo" style={{ fontSize: "0.82rem", fontWeight: 600, color: "#334155", textDecoration: "none" }}>
              Corporativo
            </Link>
            <a
              href="https://wa.me/525610846022?text=Hola%20Doctor%20Foam%2C%20quiero%20cotizar%20un%20lavado%20profundo%20o%20detallado%20a%20domicilio"
              target="_blank"
              rel="noopener noreferrer"
              data-cta-location="pillar_profundo_nav_whatsapp"
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

      <main style={{ paddingTop: "6rem" }}>
        {/* Hero */}
        <section className="section-padding" style={{ textAlign: "center", paddingBottom: "2.25rem" }}>
          <div className="container">
            <span className="section-label">Restauración Premium en CDMX y EdoMex</span>
            <h1 className="section-title">
              Lavado Profundo de Vehículos y Vestiduras: <span className="gradient-text">Detallado y Restauración</span> a Domicilio
            </h1>
            <p className="section-subtitle" style={{ maxWidth: "750px", marginBottom: "1.75rem" }}>
              No somos un autolavado. Somos un estudio clínico de estética automotriz portátil que lleva el mejor <Link href="/" style={{ color: "var(--color-gold-400)", textDecoration: "underline" }}>lavado de autos a domicilio</Link>, limpieza de asientos con vapor a 180°C, corrección de pintura y cerámico 9H sin usar tu agua ni electricidad.
            </p>
            <div style={{ display: "flex", gap: "0.85rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/reservar" className="btn-premium">
                💳 Reservar Paquete en Línea
              </Link>
              <a
                href="https://wa.me/525610846022?text=Hola%20Doctor%20Foam%2C%20me%20interesa%20cotizar%20un%20lavado%20profundo%20de%20vestiduras%20o%20detallado%20a%20domicilio"
                target="_blank"
                rel="noopener noreferrer"
                data-cta-location="pillar_profundo_hero_whatsapp"
                className="btn-outline"
              >
                💬 Cotizar por WhatsApp
              </a>
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
          </div>
        </section>

        {/* Above-the-Fold Quick Package & 1-Tap WhatsApp Strip */}
        <section style={{ paddingBottom: "2.25rem" }}>
          <div className="container" style={{ maxWidth: "1000px" }}>
            <div style={{ background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "1rem", padding: "1.15rem 1.25rem", boxShadow: "0 8px 24px rgba(15, 23, 42, 0.05)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.85rem" }}>
                <span style={{ fontSize: "0.78rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: "#0f172a" }}>
                  ⚡ Paquetes de Lavado Profundo 2026 (Habilitan Membresía de Seguimiento + 10% OFF)
                </span>
                <span style={{ fontSize: "0.75rem", color: "#15803d", fontWeight: 700 }}>
                  ✅ Unidad 100% autónoma · Vapor 180°C · Factura CFDI
                </span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.75rem" }}>
                {[
                  { name: "Industrial Deep Interior", slug: "deep-interior", price: "$2,400 MXN", memberPrice: "Con Membresía: $2,160 MXN (-10%)", desc: "Vestiduras, vapor 180°C, piel y ozono (3-4 h)", badge: "Interior Profundo" },
                  { name: "Signature Detail", slug: "signature-detail", price: "$7,499 MXN", memberPrice: "Con Membresía: $6,749 MXN (-10%)", desc: "Corrección pintura 95% swirls + Interior (5-6 h)", badge: "Más Popular" },
                  { name: "Ceramic Coating 9H", slug: "ceramic-coating", price: "$10,999 MXN", memberPrice: "Con Membresía: $9,899 MXN (-10%)", desc: "Blindaje SiO2 3-5 años + Corrección (8-10 h)", badge: "Protección 9H" },
                ].map((pkg, idx) => (
                  <div key={idx} style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "0.75rem", padding: "0.9rem 1rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.35rem", marginBottom: "0.2rem" }}>
                        <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "#2563eb", textTransform: "uppercase" }}>{pkg.badge}</span>
                        <span style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a" }}>{pkg.price}</span>
                      </div>
                      <div style={{ fontSize: "0.7rem", color: "#15803d", fontWeight: 700, marginBottom: "0.2rem" }}>{pkg.memberPrice}</div>
                      <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#0f172a", marginBottom: "0.2rem" }}>{pkg.name}</div>
                      <div style={{ fontSize: "0.76rem", color: "#475569", marginBottom: "0.65rem" }}>{pkg.desc}</div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem" }}>
                      <a
                        href={`https://wa.me/525610846022?text=${encodeURIComponent(`Hola Doctor Foam, me interesa cotizar / agendar el paquete ${pkg.name} (${pkg.price}) a domicilio en CDMX.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cta-location={`pillar_profundo_quick_strip_${idx}`}
                        style={{ display: "block", textAlign: "center", padding: "0.45rem 0.4rem", borderRadius: "0.5rem", background: "#f0fdf4", border: "1px solid #86efac", color: "#15803d", fontWeight: 700, fontSize: "0.73rem", textDecoration: "none" }}
                      >
                        💬 WhatsApp
                      </a>
                      <Link
                        href={`/reservar?paquete=${pkg.slug}`}
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
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>
          <Image
            src="/seo/hero-profundo.png"
            alt="Vista cenital de un sedán oscuro recibiendo detallado profundo con productos cerámicos y herramientas de pulido"
            width={1200}
            height={600}
            style={{ width: "100%", height: "auto", borderRadius: "1.25rem", boxShadow: "0 4px 25px rgba(0,0,0,0.08)" }}
            priority
          />
        </div>

        {/* Services Grid */}
        <section className="section-padding" style={{ paddingTop: "3rem" }}>
          <div className="container" style={{ maxWidth: "1100px" }}>
            <div className="services-grid">
              {services.map((s, i) => (
                <div key={i} className={`glass-card price-card ${s.featured ? "featured" : ""}`} style={{ padding: "2rem" }}>
                  {s.featured && <span className="badge">Más Popular</span>}
                  <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>{s.icon}</div>
                  <h3 style={{ fontSize: "1.3rem", marginBottom: "0.25rem" }}>{s.name}</h3>
                  <p style={{ color: "#475569", fontSize: "0.85rem", marginBottom: "0.75rem" }}>{s.tagline}</p>
                  <div className="price-amount gradient-text">{s.price}</div>
                  <p style={{ color: "#475569", fontSize: "0.8rem", marginBottom: "1rem" }}>Sedán / SUV 2 filas · IVA incluido</p>
                  <p style={{ color: "#475569", fontSize: "0.88rem", lineHeight: "1.7", marginBottom: "1.25rem" }}>{s.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.5rem" }}>
                    {s.highlights.map((h, j) => (
                      <span key={j} style={{ background: "rgba(37,99,235,0.08)", color: "#2563eb", fontSize: "0.72rem", fontWeight: 600, padding: "0.25rem 0.7rem", borderRadius: "2rem" }}>{h}</span>
                    ))}
                  </div>
                  <div style={{ display: "grid", gap: "0.5rem" }}>
                    <Link href={`/reservar?paquete=${s.name.toLowerCase().replace(/ /g, "-")}`} className={s.featured ? "btn-premium" : "btn-outline"} style={{ width: "100%", justifyContent: "center" }}>
                      Reservar {s.name}
                    </Link>
                    <a
                      href={`https://wa.me/525610846022?text=${encodeURIComponent(`Hola Doctor Foam, quiero cotizar el paquete ${s.name} (${s.price}) a domicilio`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cta-location={`pillar_profundo_card_${s.name.toLowerCase().replace(/ /g, "_")}_whatsapp`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        padding: "0.55rem 1rem",
                        borderRadius: "9999px",
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        color: "#15803d",
                        background: "#f0fdf4",
                        border: "1px solid #bbf7d0",
                        textDecoration: "none",
                      }}
                    >
                      💬 Preguntar por WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Banner Post-Lavado Profundo -> Membresía */}
            <div className="glass-card" style={{ marginTop: "2rem", padding: "1.5rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", border: "1.5px solid rgba(37,99,235,0.22)", background: "linear-gradient(135deg, rgba(37,99,235,0.05), rgba(16,185,129,0.05))" }}>
              <div style={{ flex: "1 1 320px" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: "#2563eb" }}>
                  🔄 Seguimiento Post-Lavado Profundo
                </span>
                <h3 style={{ fontSize: "1.15rem", margin: "0.25rem 0", color: "#0f172a" }}>
                  Tu primer Lavado Profundo desbloquea la Membresía Doctor Foam ($990/mes)
                </h3>
                <p style={{ fontSize: "0.88rem", color: "#334155", margin: 0, lineHeight: "1.6" }}>
                  Una vez realizado cualquiera de nuestros paquetes de lavado profundo, puedes activar la <strong>Membresía de Seguimiento</strong>: incluye mantenimiento preventivo periódico y <strong>10% de descuento permanente en todos tus futuros lavados especializados</strong>.
                </p>
              </div>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <Link href="/membresia-doctor-foam" className="btn-premium" style={{ padding: "0.6rem 1.25rem", fontSize: "0.82rem" }}>
                  Conocer Membresía + 10% OFF →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Sub-pages Links */}
        <section className="section-padding" style={{ textAlign: "center" }}>
          <div className="container" style={{ maxWidth: "800px" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>
              Profundiza en nuestros <span className="gradient-text">servicios</span>
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
              <Link href="/lavado-profundo-vehiculos-cdmx/paquetes-detallado-automotriz" className="glass-card" style={{ padding: "2rem", textDecoration: "none", textAlign: "center", border: "2px solid rgba(37,99,235,0.15)" }}>
                <span style={{ fontSize: "2rem", display: "block", marginBottom: "0.75rem" }}>📋</span>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>Paquetes y Precios</h3>
                <p style={{ color: "#475569", fontSize: "0.85rem" }}>Comparativa completa de nuestros 3 planes</p>
              </Link>
              <Link href="/lavado-profundo-vehiculos-cdmx/diferencias-servicios-detallado" className="glass-card" style={{ padding: "2rem", textDecoration: "none", textAlign: "center", border: "2px solid rgba(37,99,235,0.15)" }}>
                <span style={{ fontSize: "2rem", display: "block", marginBottom: "0.75rem" }}>🔍</span>
                <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>Diferencias entre Servicios</h3>
                <p style={{ color: "#475569", fontSize: "0.85rem" }}>Qué incluye exactamente cada paquete</p>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-padding" style={{ paddingTop: 0 }}>
          <div className="container" style={{ maxWidth: "850px" }}>
            <h2 style={{ fontSize: "1.45rem", marginBottom: "1.25rem", textAlign: "center", color: "#0f172a" }}>
              Preguntas Frecuentes sobre Lavado Profundo y Vestiduras en CDMX
            </h2>
            <div style={{ display: "grid", gap: "1rem" }}>
              {profundoFaqs.map((item, idx) => (
                <div key={idx} className="glass-card" style={{ padding: "1.5rem" }}>
                  <h3 style={{ fontSize: "1.02rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.5rem" }}>
                    {item.q}
                  </h3>
                  <p style={{ color: "#334155", fontSize: "0.92rem", lineHeight: "1.7", margin: 0 }}>
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding" style={{ textAlign: "center" }}>
          <div className="container" style={{ maxWidth: "650px" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
              ¿Listo para la <span className="gradient-text">restauración definitiva</span>?
            </h2>
            <p style={{ color: "#475569", marginBottom: "2rem" }}>Elige tu paquete y reserva en línea o cotiza hoy mismo por WhatsApp.</p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/reservar" className="btn-premium">💳 Reservar y Pagar en Línea</Link>
              <a
                href="https://wa.me/525610846022?text=Hola%20Doctor%20Foam%2C%20me%20interesa%20un%20lavado%20profundo%20de%20vestiduras%20o%20detallado%20a%20domicilio"
                target="_blank"
                rel="noopener noreferrer"
                data-cta-location="pillar_profundo_whatsapp"
                className="btn-outline"
              >
                💬 Cotizar por WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Zonas de Cobertura Hub */}
        <section className="section-padding" style={{ paddingTop: 0 }}>
          <div className="container" style={{ maxWidth: "900px", textAlign: "center" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.75rem", color: "#0f172a" }}>
              Lavado Profundo y Detallado a Domicilio por Zona en CDMX y EdoMex
            </h3>
            <p style={{ fontSize: "0.85rem", color: "#475569", marginBottom: "1rem" }}>
              Llevamos vapor a 180°C, extracción industrial y corrección de pintura sin requerir agua ni luz de tu domicilio en:
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
