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
  provider: { "@type": "LocalBusiness", name: "Doctor Foam México" },
  serviceType: "Lavado recurrente de autos a domicilio",
  areaServed: { "@type": "City", name: "Ciudad de México" },
  url: "https://drfoam.com.mx/lavado-recurrente-autos-domicilio",
};

export default function LavadoRecurrentePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="navbar navbar-scrolled">
        <div className="navbar-inner">
          <Link href="/" style={{ textDecoration: "none" }}>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.3rem", color: "#0f172a" }}>
              DOCTOR <span className="gradient-text">FOAM</span>
            </span>
          </Link>
          <Link href="/reservar" className="btn-premium" style={{ padding: "0.5rem 1.2rem", fontSize: "0.8rem" }}>
            Agendar Servicio
          </Link>
        </div>
      </nav>

      <main style={{ paddingTop: "6rem" }}>
        {/* Hero */}
        <section className="section-padding" style={{ textAlign: "center" }}>
          <div className="container">
            <span className="section-label">Mantenimiento Premium</span>
            <h1 className="section-title">
              Lavado Recurrente para Vehículos a Domicilio: <span className="gradient-text">Mantenimiento Premium</span>
            </h1>
            <p className="section-subtitle" style={{ maxWidth: "750px" }}>
              Tu auto merece un cuidado constante, no esporádico. Nuestro programa de <Link href="/" style={{ color: "var(--color-gold-400)", textDecoration: "underline" }}>lavado de autos a domicilio</Link> recurrente mantiene tu vehículo impecable semana tras semana con el estándar Doctor Foam.
            </p>
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

        {/* CTA */}
        <section className="section-padding" style={{ textAlign: "center" }}>
          <div className="container" style={{ maxWidth: "600px" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
              ¿Listo para el <span className="gradient-text">mantenimiento perfecto</span>?
            </h2>
            <p style={{ color: "#475569", marginBottom: "2rem" }}>
              Agenda tu primer lavado recurrente o conoce nuestra membresía.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/membresia-doctor-foam" className="btn-premium">
                🔄 Ver Membresía
              </Link>
              <Link href="/reservar" className="btn-outline">
                📅 Agendar Servicio
              </Link>
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
            <Link href="/lavado-profundo-vehiculos-cdmx" style={{ color: "#64748b", textDecoration: "underline" }}>Lavado Profundo</Link>
            {" · "}
            <Link href="/blog" style={{ color: "#64748b", textDecoration: "underline" }}>Blog</Link>
          </p>
        </div>
      </footer>
    </>
  );
}
