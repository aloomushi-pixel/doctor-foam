import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "¿Qué Incluye Nuestro Lavado de Mantenimiento? | Doctor Foam",
  description:
    "Conoce cada detalle de nuestro servicio de mantenimiento preventivo: champú pH neutro, método dos cubetas, sellador UV y más. Lavado seguro para autos con cerámico.",
  alternates: { canonical: "https://drfoam.com.mx/lavado-recurrente-autos-domicilio/que-incluye-mantenimiento" },
};

const steps = [
  { num: 1, title: "Pre-Lavado con Foam Cannon", desc: "Espuma industrial de alto poder lubricante que encapsula la suciedad antes de tocar la pintura. Esto evita arrastrar partículas abrasivas.", icon: "🧴" },
  { num: 2, title: "Método de Dos Cubetas", desc: "Una cubeta con champú de pH neutro, otra solo para enjuagar la manopla. Cada pasada inicia con una manopla limpia. Cero recirculación de suciedad.", icon: "🪣" },
  { num: 3, title: "Descontaminación del Clear Coat", desc: "Eliminamos contaminantes industriales, savia de árboles y partículas metálicas con un descontaminante químico líquido que no es abrasivo.", icon: "🧪" },
  { num: 4, title: "Barra de Arcilla Sintética", desc: "Removemos toda contaminación mecánica adherida que el lavado no alcanza. La superficie queda lisa como cristal al tacto.", icon: "🧊" },
  { num: 5, title: "Sellador UV de Mantenimiento", desc: "Capa de protección UV que se aplica sobre el cerámico o pintura para extender su vida útil. Repele agua y reduce la adhesión de polvo.", icon: "🛡️" },
  { num: 6, title: "Secado con Microfibras 500 GSM", desc: "Usamos toallas de microfibra premium de 500 gramos por metro cuadrado. Técnica de contacto suave que no genera fricción ni rayones.", icon: "🧽" },
  { num: 7, title: "Acondicionamiento de Llantas", desc: "Limpieza profunda de rines y acondicionador de llantas que restaura el negro original sin dejar residuos brillosos artificiales.", icon: "🔧" },
  { num: 8, title: "Limpieza Interior Express", desc: "Aspirado de alfombras, limpieza de tablero y vidrios interiores. Mantenimiento básico del interior entre detallados profundos.", icon: "✨" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Protocolo de 8 Pasos de Lavado de Mantenimiento Preventivo — Doctor Foam",
  description: "Proceso profesional de lavado recurrente a domicilio libre de swirls con foam cannon, método de dos cubetas, descontaminación y sellador UV.",
  step: steps.map((s) => ({
    "@type": "HowToStep",
    position: s.num,
    name: s.title,
    text: s.desc,
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://drfoam.com.mx/" },
    { "@type": "ListItem", position: 2, name: "Lavado Recurrente a Domicilio", item: "https://drfoam.com.mx/lavado-recurrente-autos-domicilio" },
    { "@type": "ListItem", position: 3, name: "¿Qué Incluye el Mantenimiento Preventivo?", item: "https://drfoam.com.mx/lavado-recurrente-autos-domicilio/que-incluye-mantenimiento" },
  ],
};

export default function QueIncluyeMantenimientoPage() {
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
            <a
              href="https://wa.me/525610846022?text=Hola%20Doctor%20Foam%2C%20me%20interesa%20el%20protocolo%20de%20mantenimiento%20preventivo%20a%20domicilio"
              target="_blank"
              rel="noopener noreferrer"
              data-cta-location="cluster_mantenimiento_nav_whatsapp"
              className="btn-outline"
              style={{ padding: "0.45rem 0.9rem", fontSize: "0.78rem" }}
            >
              💬 WhatsApp
            </a>
            <Link href="/membresia-doctor-foam" className="btn-premium" style={{ padding: "0.5rem 1.2rem", fontSize: "0.8rem" }}>
              Ver Membresía ($990/mes)
            </Link>
          </div>
        </div>
      </nav>

      <main style={{ paddingTop: "6rem" }}>
        <section className="section-padding" style={{ textAlign: "center" }}>
          <div className="container">
            <Link href="/lavado-recurrente-autos-domicilio" style={{ color: "var(--color-gold-400)", textDecoration: "none", fontSize: "0.9rem" }}>
              ← Volver a Lavado Recurrente
            </Link>
            <h1 className="section-title" style={{ marginTop: "1.5rem" }}>
              ¿Qué Incluye Nuestro Servicio de <span className="gradient-text">Mantenimiento Preventivo</span>?
            </h1>
            <p className="section-subtitle" style={{ maxWidth: "700px", marginBottom: "1.5rem" }}>
              Cada visita de mantenimiento sigue un protocolo de 8 pasos diseñado para preservar la pintura y el recubrimiento de tu vehículo. Nada se deja al azar.
            </p>
            <div style={{ display: "flex", gap: "0.85rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/membresia-doctor-foam" className="btn-premium">
                🔄 Conocer Membresía ($990/mes)
              </Link>
              <a
                href="https://wa.me/525610846022?text=Hola%20Doctor%20Foam%2C%20quiero%20cotizar%20el%20lavado%20de%20mantenimiento%20a%20domicilio"
                target="_blank"
                rel="noopener noreferrer"
                data-cta-location="cluster_mantenimiento_hero_whatsapp"
                className="btn-outline"
              >
                💬 Cotizar por WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Service Image */}
        <div style={{ maxWidth: "900px", margin: "0 auto 2rem", padding: "0 1.5rem" }}>
          <Image
            src="/seo/detalle-servicio.png"
            alt="Primer plano de aplicación de cera de carnauba sobre pintura negra con reflejos perfectos"
            width={800}
            height={500}
            style={{ width: "100%", height: "auto", borderRadius: "1.25rem", boxShadow: "0 4px 25px rgba(0,0,0,0.08)" }}
            priority
          />
        </div>

        <section className="section-padding" style={{ paddingTop: "1rem" }}>
          <div className="container" style={{ maxWidth: "900px" }}>
            {steps.map((s, i) => (
              <div key={i} className="glass-card" style={{ padding: "2rem", marginBottom: "1.25rem", display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "linear-gradient(135deg, rgba(37,99,235,0.1), rgba(37,99,235,0.05))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", flexShrink: 0 }}>
                  {s.icon}
                </div>
                <div>
                  <p style={{ color: "#2563eb", fontSize: "0.75rem", fontWeight: 700, fontFamily: "var(--font-heading)", marginBottom: "0.25rem" }}>PASO {s.num}</p>
                  <h3 style={{ fontSize: "1.15rem", marginBottom: "0.5rem" }}>{s.title}</h3>
                  <p style={{ color: "#475569", fontSize: "0.9rem", lineHeight: "1.7" }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section-padding" style={{ textAlign: "center" }}>
          <div className="container" style={{ maxWidth: "600px" }}>
            <div className="glass-card" style={{ padding: "2.5rem" }}>
              <h2 style={{ fontSize: "1.3rem", marginBottom: "1rem" }}>
                Este protocolo es parte de nuestra <span className="gradient-text">Membresía</span>
              </h2>
              <p style={{ color: "#475569", marginBottom: "1.5rem", fontSize: "0.9rem" }}>
                Accede al mantenimiento preventivo con pagos mensuales automáticos y descuentos exclusivos.
              </p>
              <div style={{ display: "flex", gap: "0.85rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/membresia-doctor-foam" className="btn-premium">
                  🔄 Conocer la Membresía ($990/mes)
                </Link>
                <a
                  href="https://wa.me/525610846022?text=Hola%20Doctor%20Foam%2C%20me%20interesa%20la%20Membres%C3%ADa%20de%20Mantenimiento%20Preventivo"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta-location="cluster_mantenimiento_bottom_whatsapp"
                  className="btn-outline"
                >
                  💬 WhatsApp Directo
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Zonas de Cobertura Hub */}
        <section className="section-padding" style={{ paddingTop: 0 }}>
          <div className="container" style={{ maxWidth: "900px", textAlign: "center" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.75rem", color: "#0f172a" }}>
              Rutas Activas de Mantenimiento a Domicilio en CDMX y EdoMex
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
            <Link href="/lavado-autos-estacionamiento-corporativo" style={{ color: "#64748b", textDecoration: "underline" }}>Estacionamiento Corporativo</Link>{" · "}
            <Link href="/membresia-doctor-foam" style={{ color: "#64748b", textDecoration: "underline" }}>Membresía</Link>{" · "}
            <Link href="/blog" style={{ color: "#64748b", textDecoration: "underline" }}>Blog</Link>
          </p>
        </div>
      </footer>
    </>
  );
}
