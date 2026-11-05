import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Detallado de Interiores de Autos, Interior Profundo y Lavado de Vestiduras | Doctor Foam CDMX",
  description:
    "¿Qué incluye un detallado interior profundo automotriz? Conoce las diferencias entre lavado de vestiduras, limpieza de interiores de autos a domicilio con vapor a 180°C y precios en CDMX.",
  alternates: { canonical: "https://drfoam.com.mx/lavado-profundo-vehiculos-cdmx/diferencias-servicios-detallado" },
};

const comparisons = [
  {
    aspect: "Limpieza Interior",
    basic: { title: "Autolavado Tradicional", items: ["Aspirado superficial", "Limpieza con franela", "Aromatizante genérico", "10-15 minutos"] },
    drfoam: { title: "Doctor Foam (Industrial Deep Interior)", items: ["Aspirado industrial 10x potencia", "Vapor seco a 180°C en toda superficie", "Inyección-extracción profunda de manchas", "Hidratación de pieles con productos especializados", "Sanitización con ozono médico", "3-4 horas de trabajo meticuloso"] },
  },
  {
    aspect: "Pintura Exterior",
    basic: { title: "Autolavado de Rodillos", items: ["Rodillos de tela que generan swirls", "Jabón multipropósito ácido", "Secado al aire con marcas de agua", "Cero protección post-lavado"] },
    drfoam: { title: "Doctor Foam (Signature Detail)", items: ["Prelavado con foam cannon lubricante", "Método 2 cubetas con champú pH neutro", "Corrección de pintura en 2-3 etapas", "Eliminación del 95% de swirls", "Sellador cerámico express de 6 meses", "5-6 horas con técnicos certificados IDA"] },
  },
  {
    aspect: "Protección",
    basic: { title: "Cera de Supermercado", items: ["Protección de 2-4 semanas", "Se degrada con lluvia", "Sin protección UV real", "Aplicación amateur con riesgo de hologramas"] },
    drfoam: { title: "Doctor Foam (Ceramic Coating)", items: ["Protección de 3-7 años", "Dureza 9H-10H (cristal líquido)", "Resistencia a lluvia ácida y UV", "Efecto hidrofóbico permanente", "Certificado de aplicación incluido", "8-10 horas de preparación y aplicación"] },
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
    a: "Nuestro detallado interior profundo automotriz (Industrial Deep Interior) incluye 6 etapas clínicas a domicilio: aspirado industrial de alta potencia, esterilización con vapor seco a 180°C, inyección-extracción térmica de manchas en tela y alfombra, limpieza e hidratación de asientos de piel, detallado de tablero con protección UV y sanitización con ozono médico.",
  },
  {
    q: "¿Cuál es la diferencia entre lavado de vestiduras tradicional y el detallado interior de Doctor Foam?",
    a: "Un lavado de vestiduras convencional inunda los asientos con agua y detergente alcalino, dejando humedad atrapada por días que genera olor a humedad y hongos. Doctor Foam utiliza vapor seco a 180°C y extracción controlada que seca en menos de 60 minutos y conserva la piel y electrónica del vehículo intactas.",
  },
  {
    q: "¿Cuánto cuesta el lavado y detallado de interiores de autos a domicilio en CDMX?",
    a: "El paquete Industrial Deep Interior + Exterior comienza desde $3,399 MXN para sedanes y SUVs de 2 filas (3 a 4 horas de intervención con unidad móvil autónoma a domicilio en CDMX y Zona Esmeralda/Huixquilucan).",
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

      <main style={{ paddingTop: "6rem" }}>
        <section className="section-padding" style={{ textAlign: "center" }}>
          <div className="container">
            <Link href="/lavado-profundo-vehiculos-cdmx" style={{ color: "var(--color-gold-400)", textDecoration: "none", fontSize: "0.9rem" }}>
              ← Volver a Lavado Profundo
            </Link>
            <h1 className="section-title" style={{ marginTop: "1.5rem" }}>
              Detallado de Interiores de Autos, <span className="gradient-text">Interior Profundo</span> y Lavado de Vestiduras
            </h1>
            <p className="section-subtitle" style={{ maxWidth: "740px", marginBottom: "1.5rem" }}>
              No toda &ldquo;limpieza de interiores de autos&rdquo; ni &ldquo;lavado de vestiduras&rdquo; es igual. Descubre qué incluye nuestro <strong>detallado interior automotriz</strong> con vapor seco a 180°C y cómo se diferencia del autolavado tradicional en nuestro <Link href="/" style={{ color: "var(--color-gold-400)", textDecoration: "underline" }}>servicio a domicilio en CDMX</Link>.
            </p>
            <div style={{ display: "flex", gap: "0.85rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/lavado-profundo-vehiculos-cdmx/paquetes-detallado-automotriz" className="btn-premium">
                📋 Ver Paquetes y Precios
              </Link>
              <a
                href="https://wa.me/525610846022?text=Hola%20Doctor%20Foam%2C%20quiero%20saber%20qu%C3%A9%20paquete%20de%20lavado%20de%20vestiduras%20o%20detallado%20me%20recomiendan"
                target="_blank"
                rel="noopener noreferrer"
                data-cta-location="cluster_diferencias_hero_whatsapp"
                className="btn-outline"
              >
                💬 Preguntar por WhatsApp
              </a>
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
                <div className="glass-card" style={{ padding: "2rem", borderTop: "3px solid #2563eb" }}>
                  <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem", color: "#1d4ed8" }}>✅ {c.drfoam.title}</h3>
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {c.drfoam.items.map((item, j) => (
                      <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.6rem", color: "#1e293b", fontSize: "0.9rem" }}>
                        <span style={{ color: "#22c55e", flexShrink: 0 }}>✓</span> {item}
                      </li>
                    ))}
                  </ul>
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
                  <p style={{ color: "#475569", fontSize: "0.92rem", lineHeight: 1.7, marginTop: "0.65rem", marginBottom: 0 }}>
                    {faq.a}
                  </p>
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
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/lavado-profundo-vehiculos-cdmx/paquetes-detallado-automotriz" className="btn-premium">📋 Ver Paquetes y Precios</Link>
                <Link href="/reservar" className="btn-outline">📅 Agendar Servicio</Link>
                <a
                  href="https://wa.me/525610846022?text=Hola%20Doctor%20Foam%2C%20vi%20la%20comparativa%20de%20servicios%20y%20quiero%20cotizar%20para%20mi%20auto"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta-location="cluster_diferencias_bottom_whatsapp"
                  className="btn-outline"
                >
                  💬 Cotizar por WhatsApp
                </a>
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
            <Link href="/blog" style={{ color: "#64748b", textDecoration: "underline" }}>Blog</Link>
          </p>
        </div>
      </footer>
    </>
  );
}
