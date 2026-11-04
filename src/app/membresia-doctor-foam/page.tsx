import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Membresía Lavado de Auto a Domicilio | Doctor Foam México",
  description:
    "Mantén tu auto impecable con la Membresía Doctor Foam. Lavado recurrente a domicilio con equipo industrial, químicos premium y descuentos exclusivos. Desde $1,160 MXN/mes.",
  alternates: { canonical: "https://drfoam.com.mx/membresia-doctor-foam" },
  openGraph: {
    title: "Membresía Doctor Foam | Lavado Recurrente Premium",
    description: "El cuidado definitivo para tu auto. Planes de mantenimiento con pagos mensuales automáticos.",
  },
};

const plans = [

  {
    name: "Membresía Doctor Foam",
    price: "$1,160",
    period: "MXN / mes",
    icon: "🔄",
    desc: "El plan definitivo. Lavado de mantenimiento bimestral incluido más descuentos exclusivos en todos los servicios. La membresía es por cliente, no importa cuántos autos tengas.",
    features: [
      "Lavado de mantenimiento bimestral incluido",
      "10% de descuento en cualquier paquete",
      "Membresía por cliente (todos tus autos)",
      "Prioridad en agendamiento",
      "Precio protegido ante aumentos",
      "Cancelación libre en cualquier momento",
    ],
    frequency: "Pago mensual automático · Cancela cuando quieras",
    stripeUrl: "https://buy.stripe.com/cNi28s71x8mW0LH43k3ZK04",
    featured: true,
  },
];

const roi = [
  { label: "Valor de reventa protegido", value: "+20%", desc: "Un auto con mantenimiento documentado conserva hasta 20% más de su valor." },
  { label: "Ahorro en tiempo mensual", value: "6 hrs", desc: "Sin traslados, sin filas, sin esperas. Nosotros vamos a ti." },
  { label: "Menos reparaciones de pintura", value: "-70%", desc: "El mantenimiento preventivo evita daños costosos por oxidación y swirls." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Membresía Doctor Foam — Lavado Recurrente a Domicilio CDMX",
  description: "Membresía mensual de mantenimiento automotriz a domicilio con equipo industrial, lavado bimestral incluido y 10% de descuento en todos los paquetes.",
  brand: { "@type": "Brand", name: "Doctor Foam México" },
  offers: {
    "@type": "Offer",
    price: "1160.00",
    priceCurrency: "MXN",
    availability: "https://schema.org/InStock",
    url: "https://drfoam.com.mx/membresia-doctor-foam",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://drfoam.com.mx/" },
    { "@type": "ListItem", position: 2, name: "Membresía Doctor Foam", item: "https://drfoam.com.mx/membresia-doctor-foam" },
  ],
};

export default function MembresiaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
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
            <Link href="/lavado-profundo-vehiculos-cdmx" style={{ fontSize: "0.82rem", fontWeight: 600, color: "#334155", textDecoration: "none" }}>
              Lavado Profundo
            </Link>
            <Link href="/lavado-autos-estacionamiento-corporativo" style={{ fontSize: "0.82rem", fontWeight: 600, color: "#334155", textDecoration: "none" }}>
              Corporativo
            </Link>
            <a
              href="https://wa.me/525610846022?text=Hola%20Doctor%20Foam%2C%20me%20interesa%20la%20Membres%C3%ADa%20de%20Mantenimiento%20Mensual%20(%24990%2Fmes)"
              target="_blank"
              rel="noopener noreferrer"
              data-cta-location="pillar_membresia_nav_whatsapp"
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
            <span className="section-label">Membresía Premium desde $990/mes</span>
            <h1 className="section-title">
              Membresía Doctor Foam: El <span className="gradient-text">Cuidado Definitivo</span> para tu Auto
            </h1>
            <p className="section-subtitle" style={{ maxWidth: "750px", marginBottom: "1.75rem" }}>
              Deja de preocuparte por el mantenimiento de tu vehículo. Nuestro programa de <Link href="/lavado-recurrente-autos-domicilio" style={{ color: "var(--color-gold-400)", textDecoration: "underline" }}>lavado recurrente a domicilio</Link> con pagos mensuales automáticos mantiene tu auto impecable todo el año.
            </p>
            <div style={{ display: "flex", gap: "0.85rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href="https://buy.stripe.com/28E6oH1b45aI1LddT83Ru00"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium"
              >
                🔄 Suscribirme ($990/mes)
              </a>
              <a
                href="https://wa.me/525610846022?text=Hola%20Doctor%20Foam%2C%20me%20interesa%20la%20Membres%C3%ADa%20Doctor%20Foam%20de%20%24990%2Fmes"
                target="_blank"
                rel="noopener noreferrer"
                data-cta-location="pillar_membresia_hero_whatsapp"
                className="btn-outline"
              >
                💬 Preguntar por WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <div style={{ maxWidth: "900px", margin: "-2rem auto 0", padding: "0 1.5rem" }}>
          <Image
            src="/seo/hero-membresia.png"
            alt="Cofre de auto de lujo negro con acabado espejo reflejando el atardecer — resultado de membresía Doctor Foam"
            width={1200}
            height={600}
            style={{ width: "100%", height: "auto", borderRadius: "1.25rem", boxShadow: "0 4px 25px rgba(0,0,0,0.08)" }}
            priority
          />
        </div>

        {/* ROI Section */}
        <section className="section-padding" style={{ paddingTop: "3rem" }}>
          <div className="container" style={{ maxWidth: "900px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
              {roi.map((r, i) => (
                <div key={i} className="glass-card" style={{ padding: "1.75rem", textAlign: "center" }}>
                  <div className="gradient-text" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "2.5rem", marginBottom: "0.25rem" }}>{r.value}</div>
                  <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>{r.label}</h3>
                  <p style={{ color: "#475569", fontSize: "0.85rem", lineHeight: "1.6" }}>{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Plans */}
        <section className="section-padding">
          <div className="container" style={{ maxWidth: "900px", textAlign: "center" }}>
            <span className="section-label">Planes Disponibles</span>
            <h2 className="section-title" style={{ fontSize: "1.8rem" }}>
              Elige tu plan de <span className="gradient-text">mantenimiento</span>
            </h2>
            <p className="section-subtitle">Pago mensual automático · IVA incluido · Facturación CFDI · Cancela cuando quieras</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem", marginTop: "2rem", maxWidth: "450px", margin: "2rem auto 0 auto" }}>
              {plans.map((p, i) => (
                <div key={i} className={`glass-card ${p.featured ? "" : ""}`} style={{ padding: "2rem", textAlign: "left", border: p.featured ? "2px solid rgba(37,99,235,0.15)" : undefined, display: "flex", flexDirection: "column" }}>
                  {p.featured && (
                    <span style={{ display: "inline-block", padding: "0.25rem 1rem", background: "linear-gradient(135deg, #2563eb, #3b82f6)", color: "#fff", fontFamily: "var(--font-heading)", fontSize: "0.7rem", fontWeight: 700, borderRadius: "2rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem", alignSelf: "center" }}>
                      Mejor Valor
                    </span>
                  )}
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                    <span style={{ fontSize: "2.5rem" }}>{p.icon}</span>
                    <div>
                      <h3 style={{ fontSize: "1.2rem", marginBottom: "0.25rem" }}>{p.name}</h3>
                      <span style={{ color: "#16a34a", fontSize: "0.75rem", fontWeight: 600, background: "#dcfce7", padding: "0.2rem 0.6rem", borderRadius: "1rem" }}>
                        Pago mensual · Recurrente
                      </span>
                    </div>
                  </div>
                  <p style={{ color: "#475569", fontSize: "0.88rem", lineHeight: "1.7", marginBottom: "1rem" }}>{p.desc}</p>

                  <div style={{ marginBottom: "0.25rem" }}>
                    <span className="gradient-text" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "2rem" }}>{p.price}</span>
                    <span style={{ color: "#64748b", fontSize: "0.9rem", marginLeft: "0.25rem" }}>{p.period}</span>
                  </div>
                  <p style={{ color: "#475569", fontSize: "0.75rem", marginBottom: "1rem" }}>{p.frequency}</p>

                  <ul style={{ listStyle: "none", padding: 0, flex: 1 }}>
                    {p.features.map((f, j) => (
                      <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.6rem", color: "#1e293b", fontSize: "0.88rem" }}>
                        <span style={{ color: "#2563eb", fontWeight: 700, flexShrink: 0 }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={p.stripeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-premium"
                    style={{ width: "100%", justifyContent: "center", textAlign: "center", marginTop: "1rem" }}
                  >
                    🔄 Suscribirme a {p.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding" style={{ textAlign: "center" }}>
          <div className="container" style={{ maxWidth: "600px" }}>
            <p style={{ color: "#475569", marginBottom: "1.5rem" }}>
              ¿Tienes dudas? Escríbenos por WhatsApp y te asesoramos sin compromiso.
            </p>
            <a href="https://wa.me/525610846022?text=Hola%2C%20me%20interesa%20la%20membresía%20Doctor%20Foam" className="btn-outline" target="_blank" rel="noopener noreferrer">
              📱 WhatsApp para dudas
            </a>
          </div>
        </section>

        {/* Zonas de Cobertura Hub */}
        <section className="section-padding" style={{ paddingTop: 0 }}>
          <div className="container" style={{ maxWidth: "900px", textAlign: "center" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.75rem", color: "#0f172a" }}>
              Zonas con Rutas Activas de Membresía Doctor Foam
            </h3>
            <p style={{ fontSize: "0.85rem", color: "#475569", marginBottom: "1rem" }}>
              Visitas programadas quincenales o semanales sin cargo por traslado en:
            </p>
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
          </p>
        </div>
      </footer>
    </>
  );
}
