import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Lavado de Vestiduras y Detallado: Diferencias | Doctor Foam",
  description:
    "Conoce las diferencias entre lavado de vestiduras, detallado interior y restauración completa. Extracción térmica, corrección de pintura y más explicado a detalle.",
  alternates: { canonical: "https://doctorfoam.mx/lavado-profundo-vehiculos-cdmx/diferencias-servicios-detallado" },
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
    drfoam: { title: "Doctor Foam (Ceramic Coating)", items: ["Protección de 3-7 años", "Dureza 9H-10H (grafeno)", "Resistencia a lluvia ácida y UV", "Efecto hidrofóbico permanente", "Certificado de aplicación incluido", "8-10 horas de preparación y aplicación"] },
  },
];

export default function DiferenciasServiciosPage() {
  return (
    <>
      <nav className="navbar navbar-scrolled">
        <div className="navbar-inner">
          <Link href="/" style={{ textDecoration: "none" }}>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.3rem", color: "#0f172a" }}>
              DOCTOR <span className="gradient-text">FOAM</span>
            </span>
          </Link>
          <Link href="/reservar" className="btn-premium" style={{ padding: "0.5rem 1.2rem", fontSize: "0.8rem" }}>
            Reservar Ahora
          </Link>
        </div>
      </nav>

      <main style={{ paddingTop: "6rem" }}>
        <section className="section-padding" style={{ textAlign: "center" }}>
          <div className="container">
            <Link href="/lavado-profundo-vehiculos-cdmx" style={{ color: "var(--color-gold-400)", textDecoration: "none", fontSize: "0.9rem" }}>
              ← Volver a Lavado Profundo
            </Link>
            <h1 className="section-title" style={{ marginTop: "1.5rem" }}>
              Lavado de Vestiduras y Detallado: <span className="gradient-text">Diferencias</span> de Nuestros Servicios
            </h1>
            <p className="section-subtitle" style={{ maxWidth: "700px" }}>
              No todo &ldquo;lavado de vestiduras&rdquo; es igual. Aquí te explicamos exactamente qué hace diferente a cada nivel de nuestro <Link href="/" style={{ color: "var(--color-gold-400)", textDecoration: "underline" }}>lavado de autos a domicilio</Link>.
            </p>
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
                  <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem", color: "#fca5a5" }}>❌ {c.basic.title}</h3>
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
                  <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem", color: "#93c5fd" }}>✅ {c.drfoam.title}</h3>
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {c.drfoam.items.map((item, j) => (
                      <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.6rem", color: "#e2e8f0", fontSize: "0.9rem" }}>
                        <span style={{ color: "#22c55e", flexShrink: 0 }}>✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        ))}

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
              </div>
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