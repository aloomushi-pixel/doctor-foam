import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Detallado Automotriz Precios en CDMX y Costo de Detailing Completo | Doctor Foam",
  description:
    "Conoce los precios de detallado automotriz profesional en CDMX y el costo de detailing de auto completo a domicilio: Industrial Deep Interior ($2,400), Signature Detail ($7,499) y Ceramic Coating ($10,999).",
  alternates: { canonical: "https://drfoam.com.mx/lavado-profundo-vehiculos-cdmx/paquetes-detallado-automotriz" },
};

const packages = [
  {
    name: "Industrial Deep Interior",
    price: { sedan: "$2,400", pickup: "$2,400", member: "$2,160 MXN" },
    time: "3-4 horas",
    icon: "♨️",
    ideal: "Tu interior necesita una restauración seria — manchas, olores, bacterias acumuladas.",
    includes: [
      "Vapor seco industrial a 180°C en todo el interior",
      "Aspirado industrial de alta potencia (10x superior a doméstico)",
      "Inyección-extracción profunda de manchas en tela y alfombras",
      "Limpieza y acondicionamiento de asientos de piel/vinil",
      "Hidratación de pieles Connolly y pieles especiales",
      "Detallado de tablero, plásticos y ventilas con protector UV",
      "Limpieza de vidrios interiores con cerámico",
      "Sanitización final con ozono médico (99.9% patógenos eliminados)",
    ],
    notIncludes: ["Corrección de pintura exterior", "Sellador cerámico", "Lavado exterior premium"],
  },
  {
    name: "Signature Detail",
    price: { sedan: "$7,499", pickup: "$8,624", member: "$6,749 MXN" },
    time: "5-6 horas",
    icon: "💎",
    ideal: "Quieres la restauración completa: interior + corrección de pintura + motor + sellado.",
    featured: true,
    includes: [
      "Industrial Deep Interior COMPLETO incluido",
      "Corrección de pintura en 2-3 etapas con pulidora de triple acción",
      "Eliminación de swirls y micro-rayones al 95%",
      "Descontaminación química + barra de arcilla",
      "Limpieza de motores de coches con vapor seco a 180°C y desengrasantes dieléctricos",
      "Sellador cerámico express de 6 meses de protección",
      "Limpieza profunda de rines y acondicionamiento de llantas",
      "Limpieza de vidrios exterior e interior",
      "Técnicos certificados IDA (International Detailing Association)",
    ],
    notIncludes: ["Recubrimiento cerámico de larga duración", "Protección de cristal líquido"],
  },
  {
    name: "Ceramic Coating",
    price: { sedan: "$10,999", pickup: "$12,649", member: "$9,899 MXN" },
    time: "8-10 horas",
    icon: "🛡️",
    ideal: "Quieres protección de largo plazo (3-5 años). Inversión en la preservación de tu auto.",
    includes: [
      "Preparación completa de superficie (descontaminación + corrección)",
      "Recubrimiento cerámico profesional (dureza 9H)",
      "Protección contra UV, lluvia ácida y contaminantes industriales",
      "Efecto hidrofóbico (el agua se desliza sola)",
      "Cerámico en vidrios y rines incluido",
      "Certificado de protección Doctor Foam",
      "Seguimiento post-servicio gratuito a los 30 días",
    ],
    notIncludes: [],
    upgrade: {
      name: "Cristal líquido (Grafeno 10H)",
      price: { sedan: "$13,999", pickup: "$16,099" },
      desc: "Supera al cerámico en dureza (10H) e hidrofobicidad. Protección de 5 a 7 años ($12,599 - $13,499 con Membresía -10%).",
    },
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "Paquetes de Detallado Automotriz en CDMX — Doctor Foam",
  url: "https://drfoam.com.mx/lavado-profundo-vehiculos-cdmx/paquetes-detallado-automotriz",
  itemListElement: [
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Industrial Deep Interior (Vapor Seco 180°C + Ozono)" }, price: "2400.00", priceCurrency: "MXN" },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Signature Detail (Corrección de Pintura + Interior Completo)" }, price: "7499.00", priceCurrency: "MXN" },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Ceramic Coating 9H (Protección 3-5 Años)" }, price: "10999.00", priceCurrency: "MXN" },
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://drfoam.com.mx/" },
    { "@type": "ListItem", position: 2, name: "Lavado Profundo CDMX", item: "https://drfoam.com.mx/lavado-profundo-vehiculos-cdmx" },
    { "@type": "ListItem", position: 3, name: "Paquetes y Precios de Detallado Automotriz", item: "https://drfoam.com.mx/lavado-profundo-vehiculos-cdmx/paquetes-detallado-automotriz" },
  ],
};

const faqs = [
  {
    q: "¿Cuál es el costo de un detailing de auto completo en CDMX?",
    a: "El costo de un detailing de auto completo profesional a domicilio con Doctor Foam (paquete Signature Detail, que incluye restauración interior con vapor seco a 180°C, ozono médico, corrección de pintura de 2 a 3 etapas para eliminar el 95% de swirls y sellador cerámico de 6 meses) es de $7,499 MXN para sedán/SUV de 2 filas y $8,624 MXN para Pick Up o SUV de 3 filas, con IVA y factura CFDI incluidos.",
  },
  {
    q: "¿Cuáles son los precios de detallado automotriz en CDMX según el paquete?",
    a: "Manejamos 3 paquetes principales a domicilio: 1) Industrial Deep Interior desde $2,400 MXN (3-4 horas, enfoque 100% en vestiduras, asientos y cabina con vapor a 180°C); 2) Signature Detail desde $7,499 MXN (5-6 horas, interior completo + corrección de pintura + sellador cerámico); y 3) Ceramic Coating 9H desde $10,999 MXN (8-10 horas, blindaje nanocerámico por 3 a 5 años).",
  },
  {
    q: "¿El precio del detallado automotriz profesional incluye servicio a domicilio sin usar mi agua ni luz?",
    a: "Sí. Todos nuestros precios incluyen el traslado de nuestra unidad móvil 100% autónoma (equipada con tanque de agua purificada por ósmosis inversa, generador eléctrico insonorizado y máquina de vapor industrial a 180°C) en Polanco, Lomas de Chapultepec, Santa Fe, Bosques de las Lomas, Pedregal, Interlomas, Huixquilucan y Coyoacán.",
  },
  {
    q: "¿Cómo obtengo el 10% de descuento de Miembro en los paquetes y realizan limpieza de motores de coches?",
    a: "Al contratar tu primer servicio de lavado profundo inicial puedes activar la Membresía Doctor Foam ($990/mes Sedán | $1,160/mes SUV), la cual da seguimiento preventivo a tu auto y te otorga un 10% de descuento permanente en todos los paquetes especializados ($2,160 en Deep Interior, $6,749 en Signature Detail y $9,899 en Ceramic 9H). Además, en Signature Detail incluimos limpieza de motores de coches con vapor seco a 180°C y desengrasantes dieléctricos sin riesgo eléctrico.",
  },
];

const faqJsonLd = {
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

export default function PaquetesDetallado() {
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
            <Link href="/lavado-recurrente-autos-domicilio" style={{ fontSize: "0.82rem", fontWeight: 600, color: "#334155", textDecoration: "none" }}>
              Lavado Recurrente
            </Link>
            <Link href="/membresia-doctor-foam" style={{ fontSize: "0.82rem", fontWeight: 600, color: "#334155", textDecoration: "none" }}>
              Membresía $990
            </Link>
            <a
              href="https://wa.me/525610846022?text=Hola%20Doctor%20Foam%2C%20quiero%20cotizar%20un%20paquete%20de%20detallado%20automotriz%20a%20domicilio"
              target="_blank"
              rel="noopener noreferrer"
              data-cta-location="cluster_paquetes_nav_whatsapp"
              className="btn-outline"
              style={{ padding: "0.45rem 0.9rem", fontSize: "0.78rem" }}
            >
              💬 WhatsApp
            </a>
            <Link href="/reservar" className="btn-premium" style={{ padding: "0.5rem 1.2rem", fontSize: "0.8rem" }}>
              Reservar Ahora
            </Link>
          </div>
        </div>
      </nav>

      <main style={{ paddingTop: "4.75rem" }}>
        <section className="section-padding" style={{ textAlign: "center", paddingTop: "1.25rem", paddingBottom: "1.75rem" }}>
          <div className="container">
            <Link href="/lavado-profundo-vehiculos-cdmx" style={{ color: "var(--color-gold-400)", textDecoration: "none", fontSize: "0.85rem" }}>
              ← Volver a Lavado Profundo
            </Link>
            <h1 className="section-title" style={{ marginTop: "0.65rem", marginBottom: "0.65rem", fontSize: "clamp(1.65rem, 3.8vw, 2.6rem)" }}>
              Planes y Paquetes de <span className="gradient-text">Detallado Automotriz</span> en CDMX
            </h1>
            <p className="section-subtitle" style={{ maxWidth: "700px", marginBottom: "1rem", fontSize: "0.94rem", lineHeight: 1.55 }}>
              Tres niveles de restauración a domicilio con agua purificada y planta propia (IVA y CFDI incluidos). Contrata tu 1er lavado profundo y desbloquea <strong>-10% OFF fijo con Membresía ($990/mes)</strong>.
            </p>
            <div style={{ display: "flex", gap: "0.65rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "1.25rem" }}>
              <a
                href="https://wa.me/525610846022?text=Hola%20Doctor%20Foam%2C%20estoy%20viendo%20los%20paquetes%20de%20detallado%20y%20quiero%20cotizar%20para%20mi%20auto"
                target="_blank"
                rel="noopener noreferrer"
                data-cta-location="cluster_paquetes_hero_whatsapp"
                className="btn-premium"
                style={{ background: "linear-gradient(135deg, #16a34a, #15803d)", padding: "0.7rem 1.25rem" }}
              >
                💬 Cotizar por WhatsApp
              </a>
              <Link href="/reservar" className="btn-premium" style={{ padding: "0.7rem 1.25rem" }}>
                📅 Agendar en Línea
              </Link>
              <a
                href="/brochure-doctor-foam.pdf"
                download="Brochure-Corporativo-Doctor-Foam-2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                data-cta-location="cluster_paquetes_hero_brochure_pdf"
                className="btn-outline"
                style={{ borderColor: "#2563eb", color: "#2563eb", padding: "0.65rem 1rem", fontSize: "0.82rem" }}
              >
                📄 Brochure PDF
              </a>
            </div>

            {/* Resumen Rápido Above-the-Fold para Visitantes Móviles y ChatGPT/GEO */}
            <div
              style={{
                maxWidth: "920px",
                margin: "0 auto",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(205px, 1fr))",
                gap: "0.85rem",
                textAlign: "left",
              }}
            >
              {[
                {
                  icon: "♨️",
                  name: "Industrial Deep Interior",
                  price: "$2,400 MXN",
                  memberPrice: "$2,160 con Membresía (-10%)",
                  sub: "3-4 hrs · Vapor 180°C + Ozono",
                  wa: "Hola Doctor Foam, quiero cotizar el paquete Industrial Deep Interior ($2,400 MXN) a domicilio",
                  slug: "industrial-deep-interior",
                },
                {
                  icon: "💎",
                  name: "Signature Detail (Completo)",
                  price: "$7,499 MXN",
                  memberPrice: "$6,749 con Membresía (-10%)",
                  sub: "5-6 hrs · Interior + Pulido Espejo",
                  wa: "Hola Doctor Foam, quiero cotizar el paquete Signature Detail Completo ($7,499 MXN) a domicilio",
                  slug: "signature-detail",
                  highlight: true,
                },
                {
                  icon: "🛡️",
                  name: "Ceramic Coating 9H",
                  price: "$10,999 MXN",
                  memberPrice: "$9,899 con Membresía (-10%)",
                  sub: "8-10 hrs · Blindaje 3 a 5 Años",
                  wa: "Hola Doctor Foam, quiero cotizar el paquete Ceramic Coating 9H ($10,999 MXN) a domicilio",
                  slug: "ceramic-coating",
                },
                {
                  icon: "🔄",
                  name: "Lavado Recurrente",
                  price: "$990 / mes",
                  memberPrice: "Activa tu 10% OFF permanente",
                  sub: "Seguimiento post-lavado profundo",
                  wa: "Hola Doctor Foam, quiero información del Plan de Lavado Recurrente ($990/mes) a domicilio",
                  slug: "membresia",
                },
              ].map((q, idx) => (
                <div
                  key={idx}
                  className="glass-card"
                  style={{
                    padding: "1.1rem",
                    border: q.highlight ? "2px solid rgba(37,99,235,0.35)" : "1px solid rgba(148,163,184,0.22)",
                    background: q.highlight ? "rgba(239,246,255,0.9)" : undefined,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.25rem" }}>
                    <span style={{ fontWeight: 700, fontSize: "0.88rem", color: "#0f172a" }}>
                      {q.icon} {q.name}
                    </span>
                  </div>
                  <div className="gradient-text" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.35rem" }}>
                    {q.price}
                  </div>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#15803d", marginTop: "0.15rem" }}>
                    ✨ {q.memberPrice}
                  </div>
                  <p style={{ fontSize: "0.76rem", color: "#475569", margin: "0.2rem 0 0.75rem" }}>{q.sub}</p>
                  <div style={{ display: "flex", gap: "0.45rem" }}>
                    <a
                      href={`https://wa.me/525610846022?text=${encodeURIComponent(q.wa)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cta-location={`cluster_paquetes_quickstrip_${q.slug}_whatsapp`}
                      className="btn-premium"
                      style={{
                        flex: 1,
                        minHeight: "44px",
                        padding: "0.5rem 0.65rem",
                        fontSize: "0.78rem",
                        justifyContent: "center",
                        textAlign: "center",
                        background: "linear-gradient(135deg, #16a34a, #15803d)",
                      }}
                    >
                      💬 WhatsApp
                    </a>
                    <Link
                      href={q.slug === "membresia" ? "/membresia-doctor-foam" : `/reservar?paquete=${q.slug}`}
                      className="btn-outline"
                      style={{ minHeight: "44px", padding: "0.5rem 0.75rem", fontSize: "0.78rem", display: "inline-flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}
                    >
                      Reservar
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <div style={{ maxWidth: "900px", margin: "0 auto 1.5rem", padding: "0 1.5rem" }}>
          <Image
            src="/seo/hero-paquetes.png"
            alt="Tres autos con diferentes niveles de acabado de detallado automotriz en estudio profesional"
            width={1200}
            height={600}
            style={{ width: "100%", height: "auto", borderRadius: "1.25rem", boxShadow: "0 4px 25px rgba(0,0,0,0.08)" }}
            priority
          />
        </div>

        {/* Mid-Page 50%-Scroll 1-Tap Diagnostic Strip */}
        <div style={{ maxWidth: "900px", margin: "0 auto 1.25rem", padding: "0 1.5rem" }}>
          <div style={{ padding: "1rem 1.25rem", borderRadius: "0.95rem", background: "linear-gradient(135deg, #f0fdf4, #eff6ff)", border: "1.5px solid #86efac", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "0.85rem" }}>
            <div style={{ flex: "1 1 260px" }}>
              <div style={{ fontSize: "0.92rem", fontWeight: 800, color: "#0f172a" }}>
                ¿Indeciso entre Interior Profundo ($2,400), Signature ($7,499) o Cerámico 9H ($10,999)?
              </div>
              <div style={{ fontSize: "0.78rem", color: "#475569", marginTop: "0.15rem" }}>
                Dinos tu modelo de auto y colonia por WhatsApp y te recomendamos el paquete exacto en 60 segundos.
              </div>
            </div>
            <a
              href="https://wa.me/525610846022?text=Hola%20Doctor%20Foam%2C%20estoy%20comparando%20sus%20paquetes%20y%20quiero%20que%20me%20recomienden%20el%20ideal%20para%20mi%20auto"
              target="_blank"
              rel="noopener noreferrer"
              data-cta-location="cluster_paquetes_mid_diagnostic_whatsapp"
              className="btn-premium"
              style={{ minHeight: "44px", background: "linear-gradient(135deg, #16a34a, #15803d)", padding: "0.6rem 1.15rem", fontSize: "0.84rem" }}
            >
              💬 Recomendación por WhatsApp
            </a>
          </div>
        </div>

        {packages.map((p, i) => (
          <section key={i} className="section-padding" style={{ paddingTop: i === 0 ? "1rem" : undefined }}>
            <div className="container" style={{ maxWidth: "900px" }}>
              <div className="glass-card" style={{ padding: "2.5rem", border: p.featured ? "2px solid rgba(37,99,235,0.2)" : undefined }}>
                {p.featured && (
                  <span style={{ display: "inline-block", padding: "0.25rem 1rem", background: "linear-gradient(135deg, #2563eb, #3b82f6)", color: "#fff", fontFamily: "var(--font-heading)", fontSize: "0.7rem", fontWeight: 700, borderRadius: "2rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem" }}>
                    Más Popular
                  </span>
                )}
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "2.5rem" }}>{p.icon}</span>
                  <div>
                    <h2 style={{ fontSize: "1.5rem" }}>{p.name}</h2>
                    <p style={{ color: "#64748b", fontSize: "0.85rem" }}>Duración: {p.time}</p>
                  </div>
                  <div style={{ marginLeft: "auto", textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.3rem" }}>
                    <span className="gradient-text" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "2rem", lineHeight: 1.1 }}>{p.price.sedan}</span>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#15803d", background: "#f0fdf4", border: "1px solid #86efac", padding: "0.18rem 0.6rem", borderRadius: "9999px" }}>
                      ✨ Miembro (-10%): {p.price.member}
                    </span>
                    <p style={{ color: "#64748b", fontSize: "0.75rem", margin: 0 }}>Sedán · Pick Up: {p.price.pickup}</p>
                    <a
                      href={`https://wa.me/525610846022?text=${encodeURIComponent(`Hola Doctor Foam, me interesa el paquete ${p.name} (${p.price.sedan}) a domicilio`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cta-location={`cluster_paquetes_header_${p.name.toLowerCase().replace(/ /g, "_")}_whatsapp`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.35rem",
                        padding: "0.32rem 0.75rem",
                        borderRadius: "2rem",
                        background: "rgba(22, 163, 74, 0.12)",
                        border: "1px solid rgba(22, 163, 74, 0.35)",
                        color: "#15803d",
                        fontSize: "0.76rem",
                        fontWeight: 700,
                        textDecoration: "none",
                      }}
                    >
                      💬 Cotizar por WhatsApp
                    </a>
                  </div>
                </div>
                <p style={{ color: "#475569", fontSize: "0.95rem", marginBottom: "1.5rem", padding: "1rem", background: "rgba(37,99,235,0.04)", borderRadius: "0.75rem", borderLeft: "3px solid #2563eb" }}>
                  <strong>Ideal si:</strong> {p.ideal}
                </p>

                <h3 style={{ fontSize: "1rem", marginBottom: "0.75rem", color: "#0f172a" }}>✅ Incluye:</h3>
                <ul style={{ listStyle: "none", padding: 0, marginBottom: "1.5rem" }}>
                  {p.includes.map((f, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.5rem", color: "#475569", fontSize: "0.88rem" }}>
                      <span style={{ color: "#22c55e", flexShrink: 0 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>

                {p.notIncludes.length > 0 && (
                  <>
                    <h3 style={{ fontSize: "1rem", marginBottom: "0.75rem", color: "#475569" }}>❌ No incluye:</h3>
                    <ul style={{ listStyle: "none", padding: 0, marginBottom: "1.5rem" }}>
                      {p.notIncludes.map((f, j) => (
                        <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.5rem", color: "#64748b", fontSize: "0.85rem" }}>
                          <span style={{ flexShrink: 0 }}>—</span> {f}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {p.upgrade && (
                  <div style={{ padding: "1.25rem", background: "rgba(37,99,235,0.06)", borderRadius: "0.75rem", border: "1px solid rgba(37,99,235,0.15)", marginBottom: "1.5rem" }}>
                    <p style={{ fontWeight: 700, color: "#0f172a", marginBottom: "0.25rem" }}>⬆️ Upgrade: {p.upgrade.name}</p>
                    <p style={{ color: "#475569", fontSize: "0.85rem", marginBottom: "0.25rem" }}>{p.upgrade.desc}</p>
                    <p style={{ color: "#2563eb", fontWeight: 700 }}>{p.upgrade.price.sedan} MXN (Sedán) · {p.upgrade.price.pickup} MXN (Pick Up)</p>
                  </div>
                )}

                <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap" }}>
                  <Link href={`/reservar?paquete=${p.name.toLowerCase().replace(/ /g, "-")}`} className={p.featured ? "btn-premium" : "btn-outline"} style={{ justifyContent: "center" }}>
                    Reservar {p.name}
                  </Link>
                  <a
                    href={`https://wa.me/525610846022?text=${encodeURIComponent(`Hola Doctor Foam, quiero cotizar el paquete ${p.name} (${p.price.sedan}) a domicilio`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cta-location={`cluster_paquetes_card_${p.name.toLowerCase().replace(/ /g, "_")}_whatsapp`}
                    className="btn-outline"
                    style={{ justifyContent: "center" }}
                  >
                    💬 Cotizar {p.name} por WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Tabla Resumen: Costo de Detailing de Auto Completo y Precios en CDMX */}
        <section className="section-padding" style={{ paddingTop: 0 }}>
          <div className="container" style={{ maxWidth: "900px" }}>
            <h2 style={{ fontSize: "1.45rem", marginBottom: "0.75rem", textAlign: "center" }}>
              Tabla Comparativa: <span className="gradient-text">Precios de Detallado Automotriz</span> y Costo de Detailing Completo en CDMX
            </h2>
            <p style={{ color: "#475569", textAlign: "center", maxWidth: "680px", margin: "0 auto 1.5rem", fontSize: "0.92rem" }}>
              Precios transparentes con IVA, factura CFDI y traslado de unidad móvil autónoma incluidos:
            </p>
            <div className="glass-card" style={{ padding: "1.5rem", overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem", color: "#1e293b" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid rgba(37,99,235,0.18)", textAlign: "left" }}>
                    <th style={{ padding: "0.75rem" }}>Paquete Profesional</th>
                    <th style={{ padding: "0.75rem" }}>Enfoque Principal</th>
                    <th style={{ padding: "0.75rem" }}>Duración</th>
                    <th style={{ padding: "0.75rem" }}>Sedán / SUV 2 Filas</th>
                    <th style={{ padding: "0.75rem" }}>Precio Miembro (-10%)</th>
                    <th style={{ padding: "0.75rem" }}>Pick Up / SUV 3 Filas</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid rgba(148,163,184,0.2)" }}>
                    <td style={{ padding: "0.75rem", fontWeight: 700 }}>♨️ Industrial Deep Interior</td>
                    <td style={{ padding: "0.75rem" }}>Vestiduras, asientos, vapor 180°C y ozono</td>
                    <td style={{ padding: "0.75rem" }}>3 - 4 hrs</td>
                    <td style={{ padding: "0.75rem", fontWeight: 700, color: "#2563eb" }}>$2,400 MXN</td>
                    <td style={{ padding: "0.75rem", fontWeight: 700, color: "#15803d" }}>$2,160 MXN</td>
                    <td style={{ padding: "0.75rem" }}>$2,400 MXN</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid rgba(148,163,184,0.2)", background: "rgba(37,99,235,0.04)" }}>
                    <td style={{ padding: "0.75rem", fontWeight: 700 }}>💎 Signature Detail (Detailing Completo)</td>
                    <td style={{ padding: "0.75rem" }}>Interior completo + Pulido 2-3 etapas + Sellador 6m</td>
                    <td style={{ padding: "0.75rem" }}>5 - 6 hrs</td>
                    <td style={{ padding: "0.75rem", fontWeight: 700, color: "#2563eb" }}>$7,499 MXN</td>
                    <td style={{ padding: "0.75rem", fontWeight: 700, color: "#15803d" }}>$6,749 MXN</td>
                    <td style={{ padding: "0.75rem" }}>$8,624 MXN</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid rgba(148,163,184,0.2)" }}>
                    <td style={{ padding: "0.75rem", fontWeight: 700 }}>🛡️ Ceramic Coating 9H</td>
                    <td style={{ padding: "0.75rem" }}>Corrección + Blindaje Nanocerámico 3 a 5 años</td>
                    <td style={{ padding: "0.75rem" }}>8 - 10 hrs</td>
                    <td style={{ padding: "0.75rem", fontWeight: 700, color: "#2563eb" }}>$10,999 MXN</td>
                    <td style={{ padding: "0.75rem", fontWeight: 700, color: "#15803d" }}>$9,899 MXN</td>
                    <td style={{ padding: "0.75rem" }}>$12,649 MXN</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "0.75rem", fontWeight: 700 }}>🧽 Lavado Recurrente (Post-Detallado)</td>
                    <td style={{ padding: "0.75rem" }}>Seguimiento pH neutro sin swirls + 10% OFF en paquetes</td>
                    <td style={{ padding: "0.75rem" }}>1.5 - 2 hrs</td>
                    <td style={{ padding: "0.75rem", fontWeight: 700, color: "#2563eb" }}>Desde $990/mes</td>
                    <td style={{ padding: "0.75rem", fontWeight: 700, color: "#15803d" }}>Incluido en Membresía</td>
                    <td style={{ padding: "0.75rem" }}>$1,160/mes (SUV/Multi-Auto)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Preguntas Frecuentes sobre Precios y Costo de Detailing */}
        <section className="section-padding" style={{ paddingTop: 0 }}>
          <div className="container" style={{ maxWidth: "820px" }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: "1.25rem", textAlign: "center" }}>
              Preguntas Frecuentes sobre <span className="gradient-text">Precios de Detallado Automotriz</span>
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {faqs.map((faq, idx) => (
                <details
                  key={idx}
                  className="glass-card"
                  style={{ padding: "1.15rem 1.4rem", cursor: "pointer" }}
                  open={idx === 0}
                >
                  <summary style={{ fontWeight: 700, color: "#0f172a", fontSize: "0.98rem" }}>
                    {faq.q}
                  </summary>
                  <p style={{ color: "#475569", fontSize: "0.92rem", lineHeight: 1.7, marginTop: "0.65rem", marginBottom: "0.85rem" }}>
                    {faq.a}
                  </p>
                  <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
                    <a
                      href={`https://wa.me/525610846022?text=${encodeURIComponent(`Hola Doctor Foam, leí sobre "${faq.q}" y quiero cotizar un paquete de detallado a domicilio.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cta-location={`cluster_paquetes_faq_${idx + 1}_whatsapp`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.3rem",
                        padding: "0.42rem 0.85rem",
                        borderRadius: "0.55rem",
                        background: "#16a34a",
                        color: "#ffffff",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        textDecoration: "none",
                      }}
                    >
                      💬 Cotizar por WhatsApp
                    </a>
                    <Link
                      href="/reservar"
                      data-cta-location={`cluster_paquetes_faq_${idx + 1}_reservar`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.3rem",
                        padding: "0.42rem 0.85rem",
                        borderRadius: "0.55rem",
                        background: "rgba(37, 99, 235, 0.08)",
                        border: "1px solid rgba(37, 99, 235, 0.25)",
                        color: "#1d4ed8",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        textDecoration: "none",
                      }}
                    >
                      📅 Agendar en Línea
                    </Link>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Zonas de Cobertura Hub */}
        <section className="section-padding" style={{ paddingTop: 0 }}>
          <div className="container" style={{ maxWidth: "900px", textAlign: "center" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.75rem", color: "#0f172a" }}>
              Cobertura a Domicilio con Unidad Autónoma en CDMX y EdoMex
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center" }}>
              {[
                { slug: "polanco", label: "Polanco" },
                { slug: "lomas-de-chapultepec", label: "Lomas de Chapultepec" },
                { slug: "santa-fe", label: "Santa Fe" },
                { slug: "bosques-de-las-lomas", label: "Bosques de las Lomas" },
                { slug: "pedregal", label: "Pedregal" },
                { slug: "interlomas", label: "Interlomas" },
                { slug: "huixquilucan", label: "Huixquilucan" },
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
            <Link href="/" style={{ color: "#64748b", textDecoration: "underline" }}>Inicio</Link>{" · "}
            <Link href="/lavado-recurrente-autos-domicilio" style={{ color: "#64748b", textDecoration: "underline" }}>Lavado Recurrente</Link>{" · "}
            <Link href="/lavado-profundo-vehiculos-cdmx" style={{ color: "#64748b", textDecoration: "underline" }}>Lavado Profundo</Link>{" · "}
            <Link href="/lavado-profundo-vehiculos-cdmx/diferencias-servicios-detallado" style={{ color: "#64748b", textDecoration: "underline" }}>Diferencias</Link>{" · "}
            <Link href="/lavado-autos-estacionamiento-corporativo" style={{ color: "#64748b", textDecoration: "underline" }}>Estacionamiento Corporativo</Link>{" · "}
            <Link href="/membresia-doctor-foam" style={{ color: "#64748b", textDecoration: "underline" }}>Membresía</Link>{" · "}
            <Link href="/blog" style={{ color: "#64748b", textDecoration: "underline" }}>Blog</Link>{" · "}
            <a href="/brochure-doctor-foam.pdf" download="Brochure-Corporativo-Doctor-Foam-2026.pdf" target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb", fontWeight: 700, textDecoration: "underline" }}>📄 Descargar Brochure PDF</a>
          </p>
        </div>
      </footer>
    </>
  );
}
