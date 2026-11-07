import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Membresía de Lavado de Auto a Domicilio | Mantenimiento Premium",
  description:
    "Protege el valor de reventa de tu auto y ahorra tiempo. Conoce nuestro servicio exclusivo de lavado recurrente a domicilio para vehículos de alta gama en CDMX.",
  alternates: { canonical: "https://drfoam.com.mx/lavado-recurrente-autos-domicilio" },
  openGraph: {
    title: "Lavado Recurrente para Vehículos a Domicilio | Doctor Foam",
    description: "Mantén tu auto impecable con nuestro plan de lavado recurrente a domicilio. Sin filas, sin riesgos, sin esfuerzo.",
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

      <main style={{ paddingTop: "6rem" }}>
        {/* Hero */}
        <section className="section-padding" style={{ textAlign: "center" }}>
          <div className="container">
            <span className="section-label">Mantenimiento Premium desde $990/mes</span>
            <h1 className="section-title">
              Lavado Recurrente para Vehículos a Domicilio: <span className="gradient-text">Mantenimiento Premium</span>
            </h1>
            <p className="section-subtitle" style={{ maxWidth: "750px", marginBottom: "1.75rem" }}>
              Tu auto merece un cuidado constante, no esporádico. Nuestro programa de <Link href="/" style={{ color: "var(--color-gold-400)", textDecoration: "underline" }}>lavado de autos a domicilio</Link> recurrente mantiene tu vehículo impecable semana tras semana con el estándar Doctor Foam.
            </p>
            <div style={{ display: "flex", gap: "0.85rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/membresia-doctor-foam" className="btn-premium">
                🔄 Ver Membresía ($990/mes)
              </Link>
              <a
                href="https://wa.me/525610846022?text=Hola%20Doctor%20Foam%2C%20me%20interesa%20el%20lavado%20recurrente%20a%20domicilio"
                target="_blank"
                rel="noopener noreferrer"
                data-cta-location="pillar_recurrente_hero_whatsapp"
                className="btn-outline"
              >
                💬 WhatsApp Directo
              </a>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <div style={{ maxWidth: "1000px", margin: "-2rem auto 0", padding: "0 1.5rem" }}>
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
          <div className="container" style={{ maxWidth: "800px" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>
              Explora más sobre nuestro <span className="gradient-text">lavado recurrente</span>
            </h2>
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
