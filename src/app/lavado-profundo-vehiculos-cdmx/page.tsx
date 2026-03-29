import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Lavado Profundo de Autos CDMX | Extracción Térmica y Detallado",
  description:
    "Restaura tu auto a nivel de exhibición. Lavado profundo a domicilio con extracción térmica, desinfección UV y corrección de pintura profesional en CDMX.",
  alternates: { canonical: "https://doctorfoam.mx/lavado-profundo-vehiculos-cdmx" },
  openGraph: {
    title: "Lavado Profundo de Vehículos | Doctor Foam México",
    description: "Detallado y restauración completa a domicilio. Extracción térmica, corrección de pintura y recubrimiento cerámico.",
  },
};

const services = [
  {
    icon: "♨️",
    name: "Industrial Deep Interior",
    price: "$3,499",
    tagline: "Restauración interior completa",
    highlights: ["Vapor seco 180°C", "Extracción profunda de manchas", "Hidratación de pieles", "Sanitización con ozono"],
    desc: "Tu interior absorbe todo: polvo, bacterias, ácaros, derrames invisibles. Nuestro vapor seco industrial a 180°C penetra cada fibra del tapizado y elimina lo que una aspiradora jamás alcanza.",
  },
  {
    icon: "💎",
    name: "Signature Detail",
    price: "$9,500",
    tagline: "Corrección de pintura + interior completo",
    highlights: ["Corrección 2-3 etapas", "Eliminación de swirls 95%", "Interior completo incluido", "Sellador cerámico 6 meses"],
    desc: "Los micro-rayones hacen que tu pintura luzca opaca. Nuestros técnicos certificados IDA corrigen la pintura eliminando hasta el 95% de imperfecciones. Incluye el Interior completo.",
    featured: true,
  },
  {
    icon: "🛡️",
    name: "Ceramic Coating",
    price: "$14,999",
    tagline: "Protección de nueva generación",
    highlights: ["Protección 3-5 años", "Dureza 9H", "Certificado incluido", "Upgrade Graphene disponible"],
    desc: "Escudo invisible de dureza 9H que repele agua, suciedad y químicos durante 3 a 5 años. Incluye preparación completa de superficie y certificado Doctor Foam.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Lavado Profundo de Vehículos — Doctor Foam",
  description: "Servicio de lavado profundo, detallado automotriz y restauración de vehículos a domicilio en CDMX.",
  provider: { "@type": "LocalBusiness", name: "Doctor Foam México" },
  serviceType: "Lavado profundo y detallado automotriz",
  areaServed: { "@type": "City", name: "Ciudad de México" },
  url: "https://doctorfoam.mx/lavado-profundo-vehiculos-cdmx",
};

export default function LavadoProfundoPage() {
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
            <span className="section-label">Restauración Premium</span>
            <h1 className="section-title">
              Lavado Profundo de Vehículos: <span className="gradient-text">Detallado y Restauración</span> a Domicilio
            </h1>
            <p className="section-subtitle" style={{ maxWidth: "750px" }}>
              No somos un autolavado. Somos un centro de estética automotriz portátil que lleva el mejor <Link href="/" style={{ color: "var(--color-gold-400)", textDecoration: "underline" }}>lavado de autos a domicilio</Link> con maquinaria industrial y técnicos certificados IDA.
            </p>
          </div>
        </section>

        {/* Hero Image */}
        <div style={{ maxWidth: "1100px", margin: "-2rem auto 0", padding: "0 1.5rem" }}>
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
                  <Link href={`/reservar?paquete=${s.name.toLowerCase().replace(/ /g, "-")}`} className={s.featured ? "btn-premium" : "btn-outline"} style={{ width: "100%", justifyContent: "center" }}>
                    Reservar {s.name}
                  </Link>
                </div>
              ))}
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

        {/* CTA */}
        <section className="section-padding" style={{ textAlign: "center" }}>
          <div className="container" style={{ maxWidth: "600px" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
              ¿Listo para la <span className="gradient-text">restauración definitiva</span>?
            </h2>
            <p style={{ color: "#475569", marginBottom: "2rem" }}>Elige tu paquete y paga en línea de forma segura.</p>
            <Link href="/reservar" className="btn-premium">💳 Reservar y Pagar en Línea</Link>
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
            <Link href="/blog" style={{ color: "#64748b", textDecoration: "underline" }}>Blog</Link>
          </p>
        </div>
      </footer>
    </>
  );
}