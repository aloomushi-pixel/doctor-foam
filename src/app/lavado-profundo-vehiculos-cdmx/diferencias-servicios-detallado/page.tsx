import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Detallado de Interiores e Interior Profundo CDMX: Qué Incluye ($2,400) | Doctor Foam",
  description:
    "¿Qué incluye un detallado de interiores e interior profundo automotriz? Lavado de vestiduras con vapor seco a 180°C y ozono a domicilio en CDMX ($2,400 MXN | -10% Miembros).",
  alternates: { canonical: "https://drfoam.com.mx/lavado-profundo-vehiculos-cdmx/diferencias-servicios-detallado" },
};

const comparisons = [
  {
    aspect: "Limpieza e Interior Profundo",
    basic: { title: "Autolavado Tradicional", items: ["Aspirado superficial", "Limpieza con franela húmeda", "Aromatizante genérico que oculta olores", "10-15 minutos sin desinfección"] },
    drfoam: {
      title: "Doctor Foam (Industrial Deep Interior)",
      price: "$2,400 MXN",
      memberPrice: "$2,160 MXN con Membresía (-10%)",
      slug: "deep-interior",
      items: [
        "Aspirado industrial 10x potencia en alfombra y rieles",
        "Vapor seco a 180°C en asientos, cielo y ductos A/C (secado <60 min)",
        "Inyección-extracción profunda de manchas (95% remoción)",
        "Hidratación de pieles Nappa / Connolly con pH neutro",
        "Sanitización hospitalaria con ozono médico (O3)",
        "3-4 horas a domicilio con agua purificada y luz propia",
      ],
    },
  },
  {
    aspect: "Pintura Exterior + Bahía de Motor",
    basic: { title: "Autolavado de Rodillos", items: ["Rodillos de tela que generan swirls y micro-rayones", "Jabón multipropósito alcalino", "Secado al aire con marcas de agua dura", "Cero protección post-lavado"] },
    drfoam: {
      title: "Doctor Foam (Signature Detail)",
      price: "$7,499 MXN",
      memberPrice: "$6,749 MXN con Membresía (-10%)",
      slug: "signature-detail",
      items: [
        "Incluye Industrial Deep Interior completo (vapor 180°C + ozono)",
        "Corrección de pintura en 2-3 etapas (elimina 85-95% de swirls)",
        "Limpieza de motor con vapor seco a 180°C sin mojar sensores",
        "Sellador nanocerámico SiO2 de 6 meses de duración",
        "5-6 horas en tu estacionamiento con técnicos certificados IDA",
      ],
    },
  },
  {
    aspect: "Protección Nanocerámica de Larga Duración",
    basic: { title: "Cera de Supermercado", items: ["Protección de 2-4 semanas", "Se degrada con lluvia ácida y sol", "Sin protección UV real", "Aplicación amateur con riesgo de hologramas"] },
    drfoam: {
      title: "Doctor Foam (Ceramic Coating 9H / Grafeno 10H)",
      price: "$10,999 MXN",
      memberPrice: "$9,899 MXN con Membresía (-10%)",
      slug: "ceramic-coating",
      items: [
        "Protección certificada de 3 a 5 años (9H) o 5 a 7 años (Grafeno 10H)",
        "Escudo cristalino SiO2 contra lluvia ácida, savia y rayos UV",
        "Aplicación en carrocería, rines y cristales con curado IR/LED",
        "Certificado escrito Doctor Foam + seguimiento post-servicio",
        "8-10 horas de preparación clínica y nivelación micrométrica",
      ],
    },
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Lavado de Vestiduras de Auto y Detallado Interior Profundo a Domicilio CDMX",
  description: "Comparativa técnica entre autolavado tradicional y detallado automotriz profesional con vapor seco a 180°C, extracción profunda y corrección de pintura.",
  provider: { "@type": "LocalBusiness", name: "Doctor Foam México" },
  url: "https://drfoam.com.mx/lavado-profundo-vehiculos-cdmx/diferencias-servicios-detallado",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://drfoam.com.mx/" },
    { "@type": "ListItem", position: 2, name: "Lavado Profundo CDMX", item: "https://drfoam.com.mx/lavado-profundo-vehiculos-cdmx" },
    { "@type": "ListItem", position: 3, name: "Detallado de Interiores e Interior Profundo: Diferencias", item: "https://drfoam.com.mx/lavado-profundo-vehiculos-cdmx/diferencias-servicios-detallado" },
  ],
};

const interiorSteps = [
  {
    step: "1. Aspirado Industrial de Alta Potencia",
    desc: "Succión 10x superior a una aspiradora doméstica para extraer polvo, arena y alérgenos incrustados en las fibras profundas de alfombras, rieles y cajuela.",
  },
  {
    step: "2. Vapor Seco a 180°C (Desnaturalización Térmica)",
    desc: "Desinfecta, desodoriza y elimina el 99.9% de bacterias y ácaros en asientos, volante, palanca y ductos de aire acondicionado con solo 5% de humedad.",
  },
  {
    step: "3. Inyección-Extracción Profunda de Manchas",
    desc: "En vestiduras de tela y alfombras aplicamos enzimas biodegradables y extracción térmica simultánea que elimina manchas de café, grasa o mascotas sin empapar la espuma.",
  },
  {
    step: "4. Tratamiento Clínico de Asientos de Piel y Alcántara",
    desc: "Limpieza de poros con cepillo de cerdas naturales, limpiador pH neutro e hidratación con acondicionador mate que previene grietas y brillo grasoso.",
  },
  {
    step: "5. Detallado de Tablero, Consola y Plásticos",
    desc: "Cada botón, costura y rejilla se limpia con pinceles de grado quirúrgico y se protege con sellador UV anti-estático.",
  },
  {
    step: "6. Sanitización con Ozono Médico (O3)",
    desc: "Destruye moléculas de mal olor (tabaco, humedad, comida) en todo el habitáculo y circuito cerrado de ventilación.",
  },
];

const faqs = [
  {
    q: "¿Qué incluye un detallado de interiores de autos e interior profundo profesional?",
    a: "Nuestro detallado interior profundo automotriz (Industrial Deep Interior, $2,400 MXN; $2,160 MXN con Membresía -10%) incluye 6 etapas clínicas a domicilio: aspirado industrial de alta potencia, esterilización con vapor seco a 180°C, inyección-extracción térmica de manchas en tela y alfombra, limpieza e hidratación de asientos de piel, detallado de tablero con protección UV y sanitización con ozono médico.",
  },
  {
    q: "¿Cuál es la diferencia entre lavado de vestiduras tradicional y el detallado interior de Doctor Foam?",
    a: "Un lavado de vestiduras convencional inunda los asientos con agua y detergente alcalino, dejando humedad atrapada por días que genera olor a humedad y hongos. Doctor Foam utiliza vapor seco a 180°C y extracción controlada que seca en menos de 60 minutos y conserva la piel y electrónica del vehículo intactas.",
  },
  {
    q: "¿Cuánto cuesta el lavado y detallado de interiores de autos a domicilio en CDMX?",
    a: "El paquete Industrial Deep Interior tiene un precio de $2,400 MXN para sedanes y SUVs de 2 filas ($2,760 MXN en Pick Ups y SUVs de 3 filas; $2,160 MXN con Membresía -10% OFF), con 3 a 4 horas de intervención con unidad móvil 100% autónoma a domicilio en CDMX, Interlomas y Zona Esmeralda/Huixquilucan.",
  },
  {
    q: "¿Realizan limpieza de motores de coches con vapor seco sin arriesgar sensores?",
    a: "Sí. En nuestro paquete Signature Detail ($7,499 MXN; $6,749 MXN con Membresía -10%) incluimos limpieza y detallado de bahía de motor con vapor seco industrial a 180°C (solo 5% de humedad) y desengrasantes dieléctricos biodegradables, sin usar chorros de agua a presión y con cero riesgo para sensores, computadora o sistemas híbridos.",
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

export default function DiferenciasServiciosPage() {
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
            <Link href="/lavado-profundo-vehiculos-cdmx/paquetes-detallado-automotriz" style={{ fontSize: "0.82rem", fontWeight: 600, color: "#334155", textDecoration: "none" }}>
              Paquetes y Precios
            </Link>
            <Link href="/lavado-recurrente-autos-domicilio" style={{ fontSize: "0.82rem", fontWeight: 600, color: "#334155", textDecoration: "none" }}>
              Lavado Recurrente
            </Link>
            <a
              href="https://wa.me/525610846022?text=Hola%20Doctor%20Foam%2C%20me%20interesa%20cotizar%20lavado%20de%20vestiduras%20o%20detallado%20a%20domicilio"
              target="_blank"
              rel="noopener noreferrer"
              data-cta-location="cluster_diferencias_nav_whatsapp"
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

      <main style={{ paddingTop: "5rem" }}>
        <section className="section-padding" style={{ textAlign: "center", paddingTop: "1.15rem", paddingBottom: "1.5rem" }}>
          <div className="container">
            <Link href="/lavado-profundo-vehiculos-cdmx" style={{ color: "var(--color-gold-400)", textDecoration: "none", fontSize: "0.86rem", fontWeight: 600 }}>
              ← Volver a Lavado Profundo
            </Link>
            <h1 className="section-title" style={{ marginTop: "0.65rem", marginBottom: "0.75rem" }}>
              Detallado de Interiores de Autos, <span className="gradient-text">Interior Profundo</span> y Lavado de Vestiduras
            </h1>
            <p className="section-subtitle" style={{ maxWidth: "740px", marginBottom: "1rem" }}>
              No toda &ldquo;limpieza de interiores de autos&rdquo; ni &ldquo;lavado de vestiduras&rdquo; es igual. Descubre qué incluye nuestro <strong>detallado interior automotriz</strong> con vapor seco a 180°C y cómo se diferencia del autolavado tradicional en nuestro <Link href="/" style={{ color: "var(--color-gold-400)", textDecoration: "underline" }}>servicio a domicilio en CDMX</Link>.
            </p>

            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "0.9rem" }}>
              <a
                href="https://wa.me/525610846022?text=Hola%20Doctor%20Foam%2C%20quiero%20cotizar%20el%20Detallado%20de%20Interiores%20Profundo%20con%20vapor%20a%20180%C2%B0C%20(%242%2C400)%20a%20domicilio"
                target="_blank"
                rel="noopener noreferrer"
                data-cta-location="cluster_diferencias_hero_whatsapp"
                className="btn-premium"
                style={{ background: "linear-gradient(135deg, #16a34a, #15803d)" }}
              >
                💬 Cotizar Interior Profundo ($2,400)
              </a>
              <Link href="/reservar?paquete=deep-interior" className="btn-premium">
                📅 Reservar en Línea ($2,400)
              </Link>
              <Link href="/lavado-profundo-vehiculos-cdmx/paquetes-detallado-automotriz" className="btn-outline">
                📋 Ver Todos los Paquetes
              </Link>
              <a
                href="/brochure-doctor-foam.pdf"
                download="Brochure-Corporativo-Doctor-Foam-2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                data-cta-location="cluster_diferencias_hero_brochure_pdf"
                className="btn-outline"
                style={{ borderColor: "#2563eb", color: "#2563eb" }}
              >
                📄 Brochure PDF
              </a>
            </div>

            {/* 1-Tap Micro-Commitment Pills inside 0%-Scroll Hero */}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "0.45rem", marginBottom: "1rem" }}>
              <span style={{ fontSize: "0.74rem", fontWeight: 800, color: "#15803d", textTransform: "uppercase" }}>⚡ Cotización en 1 Clic:</span>
              {[
                { label: "🪑 Asientos de Piel / Cuero 💬", msg: "Hola Doctor Foam, mi auto tiene asientos de piel y quiero cotizar el Detallado Interior Profundo a 180°C ($2,400) a domicilio." },
                { label: "🧼 Vestiduras de Tela / Manchas 💬", msg: "Hola Doctor Foam, mi auto tiene vestiduras de tela y quiero cotizar lavado profundo con vapor a 180°C ($2,400) a domicilio." },
                { label: "💎 Interior + Pulido + Motor ($7,499) 💬", msg: "Hola Doctor Foam, me interesa el paquete completo Signature Detail ($7,499: interior 180°C + corrección de pintura + motor) a domicilio." },
              ].map((p, idx) => (
                <a
                  key={idx}
                  href={`https://wa.me/525610846022?text=${encodeURIComponent(p.msg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta-location={`cluster_diferencias_hero_pill_${idx + 1}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "0.32rem 0.75rem",
                    borderRadius: "9999px",
                    background: "#f0fdf4",
                    border: "1px solid #86efac",
                    color: "#15803d",
                    fontSize: "0.76rem",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  {p.label}
                </a>
              ))}
            </div>

            {/* Above-the-Fold Price Summary Pill */}
            <div style={{ maxWidth: "820px", margin: "0 auto", padding: "0.7rem 1.05rem", borderRadius: "0.85rem", background: "linear-gradient(135deg, #f0fdf4, #eff6ff)", border: "1px solid #86efac", fontSize: "0.82rem", color: "#0f172a" }}>
              ⚡ <strong>Interior Profundo Vapor 180°C: $2,400 MXN</strong> <span style={{ color: "#15803d", fontWeight: 700 }}>($2,160 Miembro)</span> · <strong>Signature Detail + Motor: $7,499 MXN</strong> <span style={{ color: "#15803d", fontWeight: 700 }}>($6,749 Miembro)</span> · <strong>Cerámico 9H: $10,999 MXN</strong> · <strong>Membresía: $990/mes (+10% OFF fijo)</strong>
            </div>
          </div>
        </section>

        {/* Before/After Image */}
        <div style={{ maxWidth: "900px", margin: "0 auto 2rem", padding: "0 1.5rem" }}>
          <Image
            src="/seo/antes-despues.png"
            alt="Comparación antes y después: puerta de auto con swirl marks vs acabado pulido espejo"
            width={800}
            height={500}
            style={{ width: "100%", height: "auto", borderRadius: "1.25rem", boxShadow: "0 4px 25px rgba(0,0,0,0.08)" }}
            priority
          />
        </div>

        {comparisons.map((c, i) => (
          <section key={i} className="section-padding" style={{ paddingTop: i === 0 ? "1rem" : undefined }}>
            <div className="container" style={{ maxWidth: "1000px" }}>
              <h2 style={{ fontSize: "1.4rem", marginBottom: "1.5rem", textAlign: "center" }}>
                {c.aspect}: <span className="gradient-text">La Diferencia</span>
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "1.5rem" }}>
                {/* Traditional */}
                <div className="glass-card" style={{ padding: "2rem", borderTop: "3px solid #ef4444" }}>
                  <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem", color: "#dc2626" }}>❌ {c.basic.title}</h3>
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {c.basic.items.map((item, j) => (
                      <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.6rem", color: "#475569", fontSize: "0.9rem" }}>
                        <span style={{ color: "#ef4444", flexShrink: 0 }}>✗</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Doctor Foam */}
                <div className="glass-card" style={{ padding: "2rem", borderTop: "3px solid #2563eb", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.35rem" }}>
                      <h3 style={{ fontSize: "1.1rem", margin: 0, color: "#1d4ed8" }}>✅ {c.drfoam.title}</h3>
                      <span style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0f172a" }}>{c.drfoam.price}</span>
                    </div>
                    <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#15803d", marginBottom: "0.9rem" }}>
                      🔄 {c.drfoam.memberPrice}
                    </div>
                    <ul style={{ listStyle: "none", padding: 0, marginBottom: "1.25rem" }}>
                      {c.drfoam.items.map((item, j) => (
                        <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.6rem", color: "#1e293b", fontSize: "0.9rem" }}>
                          <span style={{ color: "#22c55e", flexShrink: 0 }}>✓</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div style={{ display: "flex", gap: "0.55rem", flexWrap: "wrap", paddingTop: "0.75rem", borderTop: "1px dashed #cbd5e1" }}>
                    <a
                      href={`https://wa.me/525610846022?text=${encodeURIComponent(`Hola Doctor Foam, vi la comparativa de "${c.drfoam.title}" (${c.drfoam.price}) y quiero cotizar para mi auto a domicilio.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cta-location={`cluster_diferencias_card_${c.drfoam.slug}_whatsapp`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.35rem",
                        padding: "0.48rem 0.95rem",
                        borderRadius: "9999px",
                        background: "#16a34a",
                        color: "#ffffff",
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        textDecoration: "none",
                      }}
                    >
                      💬 Cotizar por WhatsApp
                    </a>
                    <Link
                      href={`/reservar?paquete=${c.drfoam.slug}`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.35rem",
                        padding: "0.48rem 0.95rem",
                        borderRadius: "9999px",
                        background: "#eff6ff",
                        border: "1px solid #bfdbfe",
                        color: "#1d4ed8",
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        textDecoration: "none",
                      }}
                    >
                      📅 Reservar en Línea
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* ¿Qué incluye un Detallado Interior Profundo Automotriz? */}
        <section className="section-padding">
          <div className="container" style={{ maxWidth: "960px" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "0.75rem", textAlign: "center" }}>
              ¿Qué Incluye un <span className="gradient-text">Detallado Interior Profundo</span> de Autos a Domicilio?
            </h2>
            <p style={{ color: "#475569", textAlign: "center", maxWidth: "700px", margin: "0 auto 2rem" }}>
              Mientras una limpieza básica solo aspira por encima, nuestro protocolo de <strong>lavado de interiores de autos a domicilio</strong> restaura y desinfecta cada centímetro del habitáculo:
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
              {interiorSteps.map((s, idx) => (
                <div key={idx} className="glass-card" style={{ padding: "1.5rem" }}>
                  <h3 style={{ fontSize: "1rem", color: "#0f172a", marginBottom: "0.5rem" }}>{s.step}</h3>
                  <p style={{ fontSize: "0.88rem", color: "#475569", lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Preguntas Frecuentes */}
        <section className="section-padding" style={{ paddingTop: 0 }}>
          <div className="container" style={{ maxWidth: "820px" }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: "1.25rem", textAlign: "center" }}>
              Preguntas Frecuentes sobre <span className="gradient-text">Detallado de Interiores</span>
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
                      href={`https://wa.me/525610846022?text=${encodeURIComponent(`Hola Doctor Foam, leí sobre "${faq.q}" y quiero cotizar un lavado profundo para mi auto.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cta-location={`cluster_diferencias_faq_${idx + 1}_whatsapp`}
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
                      href="/reservar?pkg=industrial"
                      data-cta-location={`cluster_diferencias_faq_${idx + 1}_reservar`}
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
                      📅 Reservar Lavado Profundo ($2,400)
                    </Link>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding" style={{ textAlign: "center" }}>
          <div className="container" style={{ maxWidth: "600px" }}>
            <div className="glass-card" style={{ padding: "2.5rem" }}>
              <h2 style={{ fontSize: "1.3rem", marginBottom: "1rem" }}>
                ¿Listo para ver la <span className="gradient-text">diferencia real</span>?
              </h2>
              <p style={{ color: "#475569", marginBottom: "1.5rem" }}>Compara nuestros paquetes con precios detallados.</p>
              <div style={{ display: "flex", gap: "0.85rem", justifyContent: "center", flexWrap: "wrap" }}>
                <a
                  href="https://wa.me/525610846022?text=Hola%20Doctor%20Foam%2C%20vi%20la%20comparativa%20de%20detallado%20de%20interiores%20y%20quiero%20cotizar%20para%20mi%20auto%20a%20domicilio"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta-location="cluster_diferencias_bottom_whatsapp"
                  className="btn-premium"
                  style={{ background: "linear-gradient(135deg, #16a34a, #15803d)" }}
                >
                  💬 Cotizar por WhatsApp Ahora
                </a>
                <Link href="/reservar?paquete=deep-interior" className="btn-premium">📅 Reservar Interior ($2,400)</Link>
                <Link href="/lavado-profundo-vehiculos-cdmx/paquetes-detallado-automotriz" className="btn-outline">📋 Ver Paquetes y Precios</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Zonas de Cobertura Hub */}
        <section className="section-padding" style={{ paddingTop: 0 }}>
          <div className="container" style={{ maxWidth: "900px", textAlign: "center" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.75rem", color: "#0f172a" }}>
              Lavado de Vestiduras y Detallado a Domicilio en CDMX y EdoMex
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
            <Link href="/lavado-profundo-vehiculos-cdmx/paquetes-detallado-automotriz" style={{ color: "#64748b", textDecoration: "underline" }}>Paquetes y Precios</Link>{" · "}
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
