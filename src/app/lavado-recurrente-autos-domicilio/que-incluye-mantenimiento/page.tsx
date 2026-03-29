import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "¿Qué Incluye Nuestro Lavado de Mantenimiento? | Doctor Foam",
  description:
    "Conoce cada detalle de nuestro servicio de mantenimiento preventivo: champú pH neutro, método dos cubetas, sellador UV y más. Lavado seguro para autos con cerámico.",
  alternates: { canonical: "https://doctorfoam.mx/lavado-recurrente-autos-domicilio/que-incluye-mantenimiento" },
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

export default function QueIncluyeMantenimientoPage() {
  return (
    <>
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
        <section className="section-padding" style={{ textAlign: "center" }}>
          <div className="container">
            <Link href="/lavado-recurrente-autos-domicilio" style={{ color: "var(--color-gold-400)", textDecoration: "none", fontSize: "0.9rem" }}>
              ← Volver a Lavado Recurrente
            </Link>
            <h1 className="section-title" style={{ marginTop: "1.5rem" }}>
              ¿Qué Incluye Nuestro Servicio de <span className="gradient-text">Mantenimiento Preventivo</span>?
            </h1>
            <p className="section-subtitle" style={{ maxWidth: "700px" }}>
              Cada visita de mantenimiento sigue un protocolo de 8 pasos diseñado para preservar la pintura y el recubrimiento de tu vehículo. Nada se deja al azar.
            </p>
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
              <Link href="/membresia-doctor-foam" className="btn-premium">
                🔄 Conocer la Membresía
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-bottom" style={{ borderTop: "none", marginTop: 0 }}>
          <p>&copy; {new Date().getFullYear()} Doctor Foam México.</p>
        </div>
      </footer>
    </>
  );
}