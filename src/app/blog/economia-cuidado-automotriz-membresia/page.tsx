import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "La Economía del Cuidado Automotriz: ¿Conviene una Membresía? | Doctor Foam",
  description:
    "Descubre cuánto ahorras con una membresía de mantenimiento automotriz vs. lavados esporádicos. Tips de limpieza interior + análisis financiero del cuidado de tu auto.",
  alternates: { canonical: "https://doctorfoam.mx/blog/economia-cuidado-automotriz-membresia" },
  openGraph: {
    title: "¿Conviene una Membresía de Lavado de Auto? | Doctor Foam",
    description: "Análisis financiero del cuidado automotriz recurrente vs. esporádico. Plus: tips profesionales de limpieza interior.",
    type: "article",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "La Economía del Cuidado Automotriz: ¿Conviene una Membresía de Lavado?",
  description: "Análisis financiero del cuidado automotriz recurrente vs. esporádico con tips de limpieza interior.",
  datePublished: "2026-03-29",
  author: { "@type": "Organization", name: "Doctor Foam México" },
  publisher: { "@type": "Organization", name: "Doctor Foam México" },
  url: "https://doctorfoam.mx/blog/economia-cuidado-automotriz-membresia",
};

export default function BlogEconomiaCuidado() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <nav className="navbar navbar-scrolled">
        <div className="navbar-inner">
          <Link href="/" style={{ textDecoration: "none" }}>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.3rem", color: "#0f172a" }}>
              DOCTOR <span className="gradient-text">FOAM</span>
            </span>
          </Link>
          <Link href="/membresia-doctor-foam" className="btn-premium" style={{ padding: "0.5rem 1.2rem", fontSize: "0.8rem" }}>
            Ver Membresía
          </Link>
        </div>
      </nav>

      <main style={{ paddingTop: "6rem" }}>
        <article className="section-padding" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ marginBottom: "2rem" }}>
            <Link href="/blog" style={{ color: "var(--color-gold-400)", textDecoration: "none", fontSize: "0.9rem" }}>
              ← Volver al blog
            </Link>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <span className="zone-tag zone-tag-gold">Finanzas</span>
            <span style={{ color: "#64748b", fontSize: "0.85rem" }}>10 min de lectura</span>
          </div>

          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", marginBottom: "2rem", lineHeight: "1.3" }}>
            La Economía del Cuidado Automotriz: ¿Conviene una Membresía de Lavado?
          </h1>

          <div className="blog-content" style={{ color: "#475569", fontSize: "1rem", lineHeight: "1.9" }}>
            <h2 style={{ marginTop: "2.5rem", marginBottom: "1rem", fontSize: "1.4rem" }}>El Costo Real de NO Mantener tu Auto</h2>
            <p>La mayoría de los propietarios de autos de gama media-alta gastan en promedio <strong style={{ color: "#0f172a" }}>$2,500-$4,000 MXN al mes</strong> en lavados esporádicos sin protocolo profesional. Cada visita a un autolavado de rodillos genera micro-rayones que degradan la pintura y disminuyen el valor de reventa hasta un <strong style={{ color: "#0f172a" }}>15%</strong>.</p>

            <h2 style={{ marginTop: "2.5rem", marginBottom: "1rem", fontSize: "1.4rem" }}>Membresía vs. Lavados Esporádicos: Los Números</h2>
            <div className="glass-card" style={{ padding: "1.5rem", marginBottom: "1.5rem" }}>
              <p style={{ marginBottom: "0.5rem" }}><strong style={{ color: "#0f172a" }}>Sin membresía:</strong> 4 lavados/mes × $600 = $2,400/mes + daño acumulado a pintura</p>
              <p style={{ marginBottom: "0.5rem" }}><strong style={{ color: "#0f172a" }}>Con Membresía Doctor Foam:</strong> $1,160/mes. Incluye Foam Maintenance bimestral + 10% descuento en paquetes.</p>
              <p style={{ color: "#22c55e", fontWeight: 600 }}>Ahorro anual: ~$14,880 MXN + preservación del valor del vehículo</p>
            </div>

            <h2 style={{ marginTop: "2.5rem", marginBottom: "1rem", fontSize: "1.4rem" }}>Tips Profesionales para el Interior (entre visitas)</h2>
            <p>Aunque tengas membresía, estos hábitos diarios harán que tu interior se mantenga impecable:</p>
            <ul style={{ marginLeft: "1.5rem", marginBottom: "1.5rem" }}>
              <li style={{ marginBottom: "0.5rem" }}>Nunca comas dentro del auto — las migajas atraen ácaros e insectos</li>
              <li style={{ marginBottom: "0.5rem" }}>Usa un parasol en la canícula: protege el tablero de grietas por UV</li>
              <li style={{ marginBottom: "0.5rem" }}>Limpia derrames inmediatamente con una microfibra húmeda</li>
              <li style={{ marginBottom: "0.5rem" }}>Ventila el auto 5 minutos antes de encender el clima cuando lleves tiempo estacionado al sol</li>
              <li style={{ marginBottom: "0.5rem" }}>Hidrata asientos de piel cada 60 días con acondicionador especializado (no cremas para zapatos)</li>
            </ul>

            <h2 style={{ marginTop: "2.5rem", marginBottom: "1rem", fontSize: "1.4rem" }}>La Temporada de Lluvias: Tu Peor Enemigo</h2>
            <p>En CDMX, las lluvias ácidas son especialmente agresivas (pH 4.2 promedio). Sin protección, la lluvia ácida corroe el clear coat en semanas. Un mantenimiento recurrente con sellador UV evita este daño por una fracción del costo de una corrección de pintura completa.</p>

            <h2 style={{ marginTop: "2.5rem", marginBottom: "1rem", fontSize: "1.4rem" }}>¿Para Quién es la Membresía?</h2>
            <p>La membresía Doctor Foam está diseñada para quienes:</p>
            <ul style={{ marginLeft: "1.5rem", marginBottom: "1.5rem" }}>
              <li style={{ marginBottom: "0.5rem" }}>Tienen un auto de gama media-alta que quieren preservar</li>
              <li style={{ marginBottom: "0.5rem" }}>Valoran su tiempo y prefieren delegar el mantenimiento</li>
              <li style={{ marginBottom: "0.5rem" }}>Ya invirtieron en cerámico o grafeno y necesitan mantenimiento especializado</li>
              <li style={{ marginBottom: "0.5rem" }}>Buscan un servicio recurrente confiable, no lavados improvisados</li>
            </ul>
          </div>

          {/* CTA */}
          <div className="glass-card" style={{ padding: "2rem", marginTop: "3rem", textAlign: "center", border: "2px solid rgba(37,99,235,0.15)" }}>
            <h3 style={{ marginBottom: "1rem" }}>¿Listo para <span className="gradient-text">proteger tu inversión</span>?</h3>
            <p style={{ color: "#475569", marginBottom: "1.5rem" }}>Conoce nuestra membresía y deja de preocuparte por el mantenimiento.</p>
            <Link href="/membresia-doctor-foam" className="btn-premium">
              🔄 Conocer la Membresía Doctor Foam
            </Link>
          </div>
        </article>
      </main>

      <footer className="footer">
        <div className="footer-bottom" style={{ borderTop: "none", marginTop: 0 }}>
          <p>&copy; {new Date().getFullYear()} Doctor Foam México.</p>
        </div>
      </footer>
    </>
  );
}