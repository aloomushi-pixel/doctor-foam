import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Paquetes de Detallado Automotriz CDMX | Precios Doctor Foam",
  description:
    "Compara nuestros 3 planes de detallado automotriz: Industrial Deep Interior, Signature Detail y Ceramic Coating. Precios, diferencias y beneficios en CDMX.",
  alternates: { canonical: "https://drfoam.com.mx/lavado-profundo-vehiculos-cdmx/paquetes-detallado-automotriz" },
};

const packages = [
  {
    name: "Industrial Deep Interior",
    price: { sedan: "$3,499", pickup: "$4,024" },
    time: "3-4 horas",
    icon: "♨️",
    ideal: "Tu interior necesita una restauración seria — manchas, olores, bacterias acumuladas.",
    includes: [
      "Vapor seco industrial a 180°C en todo el interior",
      "Aspirado industrial de alta potencia (10x superior a doméstico)",
      "Inyección-extracción profunda de manchas en tela y alfombras",
      "Limpieza y acondicionamiento de asientos de piel/vinil",
      "Hidratación de pieles Connolly y pieles especiales",
      "Detallado de tablero, plásticos y ventilas con protector UV",
      "Limpieza de vidrios interiores con cerámico",
      "Sanitización final con ozono médico (99.9% patógenos eliminados)",
    ],
    notIncludes: ["Corrección de pintura exterior", "Sellador cerámico", "Lavado exterior premium"],
  },
  {
    name: "Signature Detail",
    price: { sedan: "$9,500", pickup: "$10,925" },
    time: "5-6 horas",
    icon: "💎",
    ideal: "Quieres la restauración completa: interior + corrección de pintura + sellado.",
    featured: true,
    includes: [
      "Industrial Deep Interior COMPLETO incluido",
      "Corrección de pintura en 2-3 etapas con pulidora de triple acción",
      "Eliminación de swirls y micro-rayones al 95%",
      "Descontaminación química + barra de arcilla",
      "Sellador cerámico express de 6 meses de protección",
      "Limpieza profunda de rines y acondicionamiento de llantas",
      "Limpieza de vidrios exterior e interior",
      "Técnicos certificados IDA (International Detailing Association)",
    ],
    notIncludes: ["Recubrimiento cerámico de larga duración", "Protección de grafeno"],
  },
  {
    name: "Ceramic Coating",
    price: { sedan: "$14,999", pickup: "$17,249" },
    time: "8-10 horas",
    icon: "🛡️",
    ideal: "Quieres protección de largo plazo (3-5 años). Inversión en la preservación de tu auto.",
    includes: [
      "Preparación completa de superficie (descontaminación + corrección)",
      "Recubrimiento cerámico profesional (dureza 9H)",
      "Protección contra UV, lluvia ácida y contaminantes industriales",
      "Efecto hidrofóbico (el agua se desliza sola)",
      "Cerámico en vidrios y rines incluido",
      "Certificado de protección Doctor Foam",
      "Seguimiento post-servicio gratuito a los 30 días",
    ],
    notIncludes: [],
    upgrade: {
      name: "Graphene Shield",
      price: { sedan: "$17,999", pickup: "$20,699" },
      desc: "Supera al cerámico en dureza (10H) e hidrofobicidad. Protección de 5 a 7 años.",
    },
  },
];

export default function PaquetesDetallado() {
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
              Planes y Paquetes de <span className="gradient-text">Detallado Automotriz</span> en CDMX
            </h1>
            <p className="section-subtitle" style={{ maxWidth: "700px" }}>
              Tres niveles de servicio para tres necesidades diferentes. Todos incluyen IVA, son facturables (CFDI) y se realizan a domicilio con equipo industrial.
            </p>
          </div>
        </section>

        {/* Hero Image */}
        <div style={{ maxWidth: "900px", margin: "0 auto 2rem", padding: "0 1.5rem" }}>
          <Image
            src="/seo/hero-paquetes.png"
            alt="Tres autos con diferentes niveles de acabado de detallado automotriz en estudio profesional"
            width={1200}
            height={600}
            style={{ width: "100%", height: "auto", borderRadius: "1.25rem", boxShadow: "0 4px 25px rgba(0,0,0,0.08)" }}
            priority
          />
        </div>

        {packages.map((p, i) => (
          <section key={i} className="section-padding" style={{ paddingTop: i === 0 ? "1rem" : undefined }}>
            <div className="container" style={{ maxWidth: "900px" }}>
              <div className="glass-card" style={{ padding: "2.5rem", border: p.featured ? "2px solid rgba(37,99,235,0.2)" : undefined }}>
                {p.featured && (
                  <span style={{ display: "inline-block", padding: "0.25rem 1rem", background: "linear-gradient(135deg, #2563eb, #3b82f6)", color: "#fff", fontFamily: "var(--font-heading)", fontSize: "0.7rem", fontWeight: 700, borderRadius: "2rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem" }}>
                    Más Popular
                  </span>
                )}
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "2.5rem" }}>{p.icon}</span>
                  <div>
                    <h2 style={{ fontSize: "1.5rem" }}>{p.name}</h2>
                    <p style={{ color: "#64748b", fontSize: "0.85rem" }}>Duración: {p.time}</p>
                  </div>
                  <div style={{ marginLeft: "auto", textAlign: "right" }}>
                    <span className="gradient-text" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "2rem" }}>{p.price.sedan}</span>
                    <p style={{ color: "#64748b", fontSize: "0.75rem" }}>Sedán · Pick Up: {p.price.pickup}</p>
                  </div>
                </div>
                <p style={{ color: "#475569", fontSize: "0.95rem", marginBottom: "1.5rem", padding: "1rem", background: "rgba(37,99,235,0.04)", borderRadius: "0.75rem", borderLeft: "3px solid #2563eb" }}>
                  <strong>Ideal si:</strong> {p.ideal}
                </p>

                <h3 style={{ fontSize: "1rem", marginBottom: "0.75rem", color: "#e2e8f0" }}>✅ Incluye:</h3>
                <ul style={{ listStyle: "none", padding: 0, marginBottom: "1.5rem" }}>
                  {p.includes.map((f, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.5rem", color: "#475569", fontSize: "0.88rem" }}>
                      <span style={{ color: "#22c55e", flexShrink: 0 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>

                {p.notIncludes.length > 0 && (
                  <>
                    <h3 style={{ fontSize: "1rem", marginBottom: "0.75rem", color: "#475569" }}>❌ No incluye:</h3>
                    <ul style={{ listStyle: "none", padding: 0, marginBottom: "1.5rem" }}>
                      {p.notIncludes.map((f, j) => (
                        <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.5rem", color: "#64748b", fontSize: "0.85rem" }}>
                          <span style={{ flexShrink: 0 }}>—</span> {f}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {p.upgrade && (
                  <div style={{ padding: "1.25rem", background: "rgba(37,99,235,0.06)", borderRadius: "0.75rem", border: "1px solid rgba(37,99,235,0.15)", marginBottom: "1.5rem" }}>
                    <p style={{ fontWeight: 700, color: "#e2e8f0", marginBottom: "0.25rem" }}>⬆️ Upgrade: {p.upgrade.name}</p>
                    <p style={{ color: "#475569", fontSize: "0.85rem", marginBottom: "0.25rem" }}>{p.upgrade.desc}</p>
                    <p style={{ color: "#2563eb", fontWeight: 700 }}>{p.upgrade.price.sedan} MXN (Sedán) · {p.upgrade.price.pickup} MXN (Pick Up)</p>
                  </div>
                )}

                <Link href={`/reservar?paquete=${p.name.toLowerCase().replace(/ /g, "-")}`} className={p.featured ? "btn-premium" : "btn-outline"} style={{ justifyContent: "center" }}>
                  Reservar {p.name}
                </Link>
              </div>
            </div>
          </section>
        ))}
      </main>

      <footer className="footer">
        <div className="footer-bottom" style={{ borderTop: "none", marginTop: 0 }}>
          <p>&copy; {new Date().getFullYear()} Doctor Foam México.</p>
          <p style={{ marginTop: "0.5rem" }}>
            <Link href="/" style={{ color: "#64748b", textDecoration: "underline" }}>Inicio</Link>{" · "}
            <Link href="/lavado-profundo-vehiculos-cdmx/diferencias-servicios-detallado" style={{ color: "#64748b", textDecoration: "underline" }}>Diferencias</Link>
          </p>
        </div>
      </footer>
    </>
  );
}
