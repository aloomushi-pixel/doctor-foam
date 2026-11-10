import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Lavado Profundo de Autos ($2,400) vs Detallado Automotriz ($7,499): Diferencias CDMX | Doctor Foam",
  description:
    "¿Qué incluye un lavado profundo de auto ($2,400 MXN con vapor seco a 180°C y ozono) frente a un detallado automotriz completo ($7,499 MXN | -10% Miembros) a domicilio en CDMX?",
  alternates: { canonical: "https://drfoam.com.mx/blog/lavado-profundo-vs-detallado-automotriz" },
  openGraph: {
    title: "Lavado Profundo de Autos ($2,400) vs Detallado Automotriz ($7,499) en CDMX | Doctor Foam",
    description: "Compara Lavado de Mantenimiento ($990/mes), Lavado Profundo Interior ($2,400) y Detallado Completo ($7,499) a domicilio en CDMX.",
    type: "article",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Lavado Profundo vs Detallado Automotriz en CDMX: ¿Cuál Necesitas y Cuánto Cuesta?",
  description: "Diferencias técnicas y de precio entre lavado profundo interior con vapor a 180°C ($2,400 MXN) y detallado automotriz completo ($7,499 MXN) a domicilio en CDMX.",
  datePublished: "2026-03-29",
  dateModified: "2026-11-09",
  author: { "@type": "Organization", name: "Doctor Foam México" },
  publisher: { "@type": "Organization", name: "Doctor Foam México" },
  url: "https://drfoam.com.mx/blog/lavado-profundo-vs-detallado-automotriz",
};

const vsFaqs = [
  {
    q: "¿Cuál es la diferencia entre lavado profundo interior y detallado automotriz completo?",
    a: "El Lavado Profundo Interior (Industrial Deep Interior, $2,400 MXN o $2,160 MXN con Membresía -10%, 3-4 horas) se enfoca 100% en restaurar y sanitizar la cabina con vapor seco a 180°C, inyección-extracción y ozono médico. El Detallado Automotriz Completo (Signature Detail, $7,499 MXN o $6,749 MXN con Membresía -10%, 5-6 horas) incluye todo el lavado profundo interior más descontaminación química, clay bar, corrección de pintura en 2-3 etapas (eliminando 95% de swirls), limpieza de motor con vapor seco a 180°C y sellador cerámico de 6 meses.",
  },
  {
    q: "¿Cómo activo la Membresía Doctor Foam ($990/mes) y el 10% de descuento permanente?",
    a: "Para empezar a operar la Membresía Doctor Foam ($990 MXN/mes en sedán o $1,160 MXN/mes en SUV), primero contratas un servicio de lavado profundo inicial (como Industrial Deep Interior o Signature Detail). La membresía le da seguimiento continuo a ese primer servicio y su ventaja real es el mantenimiento preventivo más un 10% de descuento permanente en todos los lavados más especializados.",
  },
  {
    q: "¿El detallado automotriz incluye limpieza de motores de coches sin riesgo eléctrico?",
    a: "Sí. En el paquete Signature Detail ($7,499 MXN) realizamos limpieza de motores de coches con vapor seco industrial a 180°C (5% de humedad) y desengrasantes dieléctricos biodegradables, sin usar agua a presión, protegiendo al 100% sensores, computadoras (ECU) y sistemas híbridos.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: vsFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://drfoam.com.mx/" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://drfoam.com.mx/blog" },
    { "@type": "ListItem", position: 3, name: "Lavado Profundo vs Detallado Automotriz", item: "https://drfoam.com.mx/blog/lavado-profundo-vs-detallado-automotriz" },
  ],
};

export default function BlogLavadoProfundoVsDetallado() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <nav className="navbar navbar-scrolled">
        <div className="navbar-inner">
          <Link href="/" style={{ textDecoration: "none" }}>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.3rem", color: "#0f172a" }}>
              DOCTOR <span className="gradient-text">FOAM</span>
            </span>
          </Link>
          <div style={{ display: "flex", gap: "0.65rem", alignItems: "center" }}>
            <a
              href="https://wa.me/525610846022?text=Hola%20Doctor%20Foam%2C%20le%C3%AD%20Lavado%20Profundo%20vs%20Detallado%20y%20quiero%20cotizar%20a%20domicilio"
              target="_blank"
              rel="noopener noreferrer"
              data-cta-location="blog_vs_detallado_nav_whatsapp"
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
        <article className="section-padding" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ marginBottom: "2rem" }}>
            <Link href="/blog" style={{ color: "var(--color-gold-400)", textDecoration: "none", fontSize: "0.9rem" }}>
              ← Volver al blog
            </Link>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <span className="zone-tag zone-tag-gold">Educación</span>
            <span style={{ color: "#64748b", fontSize: "0.85rem" }}>8 min de lectura</span>
          </div>

          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", marginBottom: "1.25rem", lineHeight: "1.3" }}>
            Lavado Profundo vs Detallado Automotriz en CDMX: ¿Cuál Necesitas y Cuánto Cuesta?
          </h1>

          {/* Above-the-Fold 3-Level Price & 1-Tap Comparison Strip */}
          <div
            className="glass-card"
            style={{
              padding: "1rem 1.15rem",
              marginBottom: "1.5rem",
              border: "1.5px solid rgba(37, 99, 235, 0.22)",
              background: "linear-gradient(135deg, rgba(239, 246, 255, 0.8), rgba(240, 253, 244, 0.8))",
            }}
          >
            <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#1d4ed8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.55rem" }}>
              ⚡ Comparativa Rápida de los 3 Niveles a Domicilio (IVA y Factura CFDI Incluidos)
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "0.65rem" }}>
              {[
                {
                  level: "Nivel 1 · Seguimiento",
                  name: "Membresía Recurrente",
                  price: "$990 / mes",
                  member: "+10% OFF en paquetes",
                  sub: "2-3 hrs · Post-Lavado Profundo",
                  slug: "membership-sedan",
                  wa: "Hola Doctor Foam, quiero información de la Membresía de Seguimiento ($990/mes + 10% OFF)",
                },
                {
                  level: "Nivel 2 · Lavado Profundo",
                  name: "Industrial Deep Interior",
                  price: "$2,400 MXN",
                  member: "$2,160 Miembro (-10%)",
                  sub: "3-4 hrs · Vapor 180°C + Ozono",
                  slug: "deep-interior",
                  wa: "Hola Doctor Foam, quiero agendar el Lavado Profundo Interior ($2,400 MXN) a domicilio",
                },
                {
                  level: "Nivel 3 · Detallado Total",
                  name: "Signature Detail + Motor",
                  price: "$7,499 MXN",
                  member: "$6,749 Miembro (-10%)",
                  sub: "5-6 hrs · Interior + Pulido + Motor",
                  slug: "signature-detail",
                  wa: "Hola Doctor Foam, quiero agendar el Detallado Completo Signature Detail ($7,499 MXN) a domicilio",
                },
              ].map((item, idx) => (
                <div key={idx} style={{ background: "#ffffff", borderRadius: "0.7rem", padding: "0.85rem", border: "1px solid #cbd5e1", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontSize: "0.68rem", fontWeight: 800, color: "#2563eb", textTransform: "uppercase" }}>{item.level}</div>
                    <div style={{ fontWeight: 800, fontSize: "0.88rem", color: "#0f172a", marginTop: "0.1rem" }}>{item.name}</div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem", marginTop: "0.15rem", flexWrap: "wrap" }}>
                      <span style={{ fontWeight: 800, fontSize: "1.05rem", color: "#1d4ed8" }}>{item.price}</span>
                      <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#15803d" }}>{item.member}</span>
                    </div>
                    <div style={{ fontSize: "0.73rem", color: "#475569", margin: "0.2rem 0 0.55rem" }}>{item.sub}</div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.35rem" }}>
                    <a
                      href={`https://wa.me/525610846022?text=${encodeURIComponent(item.wa)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cta-location={`blog_vs_detallado_top_strip_${idx}_whatsapp`}
                      style={{ textAlign: "center", padding: "0.38rem 0.3rem", borderRadius: "0.45rem", background: "#16a34a", color: "#fff", fontWeight: 700, fontSize: "0.72rem", textDecoration: "none" }}
                    >
                      💬 WhatsApp
                    </a>
                    <Link
                      href={`/reservar?paquete=${item.slug}`}
                      style={{ textAlign: "center", padding: "0.38rem 0.3rem", borderRadius: "0.45rem", background: "#eff6ff", border: "1px solid #bfdbfe", color: "#1d4ed8", fontWeight: 700, fontSize: "0.72rem", textDecoration: "none" }}
                    >
                      📅 Reservar
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Image
            src="/seo/blog-vs-detallado.png"
            alt="Infografía de 3 capas de cuidado de pintura automotriz: suciedad, contaminantes y restauración cerámica"
            width={800}
            height={500}
            style={{ width: "100%", height: "auto", borderRadius: "1rem", marginBottom: "2rem", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}
            priority
          />

          <div className="blog-content" style={{ color: "#475569", fontSize: "1rem", lineHeight: "1.9" }}>
            <h2 style={{ marginTop: "2.5rem", marginBottom: "1rem", fontSize: "1.4rem" }}>¿Por Qué un Detallado Toma 4 a 8 Horas?</h2>
            <p>Una pregunta que recibimos constantemente: <em>&ldquo;¿Por qué un lavado profundo interior cuesta $2,400 MXN o un detallado completo $7,499 MXN si en el autolavado me lo hacen en 30 minutos por $200?&rdquo;</em></p>
            <p>La respuesta corta: porque son servicios completamente diferentes. Un autolavado de cadena limpia únicamente el polvo superficial visible (y suele rayar el barniz). Un detallado profesional <strong style={{ color: "#0f172a" }}>restaura y esteriliza cada componente del vehículo a nivel clínico y molecular</strong> en tu domicilio con agua purificada y luz propia.</p>

            <h2 style={{ marginTop: "2.5rem", marginBottom: "1rem", fontSize: "1.4rem" }}>Los 3 Niveles de Cuidado Automotriz Profesional</h2>

            <h3 style={{ marginTop: "2rem", marginBottom: "0.75rem", fontSize: "1.15rem" }}>Nivel 1: Lavado de Mantenimiento y Membresía (2-3 hrs · Desde $990/mes)</h3>
            <p>Foam cannon de alta presión, champú pH neutro, método dos cubetas y sellador UV. Es lo que hacemos en nuestro servicio de <Link href="/lavado-recurrente-autos-domicilio" style={{ color: "var(--color-gold-400)", textDecoration: "underline" }}>lavado recurrente a domicilio</Link>. <strong style={{ color: "#0f172a" }}>Regla de operación:</strong> Para activar la Membresía ($990/mes Sedán | $1,160/mes SUV), primero realizamos un servicio de lavado profundo inicial; la membresía le da seguimiento continuo a ese primer servicio y te otorga un <strong style={{ color: "#15803d" }}>10% de descuento permanente en todos los lavados más especializados</strong>.</p>

            <h3 style={{ marginTop: "2rem", marginBottom: "0.75rem", fontSize: "1.15rem" }}>Nivel 2: Lavado Profundo Interior — Industrial Deep Interior (3-4 hrs · $2,400 MXN | $2,160 Miembro)</h3>
            <p>Aquí es donde la diferencia clínica se hace evidente. Nuestro lavado profundo de interiores incluye:</p>
            <ul style={{ marginLeft: "1.5rem", marginBottom: "1.5rem" }}>
              <li style={{ marginBottom: "0.5rem" }}><strong style={{ color: "#0f172a" }}>Vapor seco a 180°C</strong> — penetra fibras del tapizado y ductos de A/C, eliminando bacterias y ácaros sin empapar</li>
              <li style={{ marginBottom: "0.5rem" }}><strong style={{ color: "#0f172a" }}>Extracción por inyección térmica</strong> — inyecta solución enzimática biodegradable y aspira manchas profundas</li>
              <li style={{ marginBottom: "0.5rem" }}><strong style={{ color: "#0f172a" }}>Hidratación de pieles Connolly y Nappa</strong> — nutrición pH balanceado con acabado mate original</li>
              <li style={{ marginBottom: "0.5rem" }}><strong style={{ color: "#0f172a" }}>Ozono médico (O₃)</strong> — elimina 99.9% de patógenos, hongos y olores de tabaco o mascotas</li>
            </ul>

            <h3 style={{ marginTop: "2rem", marginBottom: "0.75rem", fontSize: "1.15rem" }}>Nivel 3: Detallado y Restauración Completa — Signature Detail ($7,499 MXN | $6,749 Miembro) y Ceramic 9H ($10,999 MXN)</h3>
            <p>El servicio más completo (5 a 10 horas) incluye todo el Nivel 2 más:</p>
            <ul style={{ marginLeft: "1.5rem", marginBottom: "1.5rem" }}>
              <li style={{ marginBottom: "0.5rem" }}><strong style={{ color: "#0f172a" }}>Descontaminación química férrica</strong> — disuelve partículas de hierro, savia y lluvia ácida adheridas al barniz</li>
              <li style={{ marginBottom: "0.5rem" }}><strong style={{ color: "#0f172a" }}>Barra de arcilla sintética (Clay Bar)</strong> — remueve contaminación mecánica dejando la pintura lisa como cristal</li>
              <li style={{ marginBottom: "0.5rem" }}><strong style={{ color: "#0f172a" }}>Corrección de pintura en 2-3 etapas</strong> — pulidora roto-orbital de triple acción que elimina hasta el 95% de swirls y micro-rayones</li>
              <li style={{ marginBottom: "0.5rem" }}><strong style={{ color: "#0f172a" }}>Limpieza de motores de coches con vapor seco a 180°C</strong> — desengrasado dieléctrico y detallado de bahía de motor con cero riesgo eléctrico</li>
              <li style={{ marginBottom: "0.5rem" }}><strong style={{ color: "#0f172a" }}>Sellador cerámico (6 meses) o Recubrimiento Cerámico 9H / Grafeno 10H (3-7 años)</strong> — blindaje hidrofóbico y filtro UV extremo</li>
            </ul>

            <h2 style={{ marginTop: "2.5rem", marginBottom: "1rem", fontSize: "1.4rem" }}>El Mito de los &ldquo;30 Minutos&rdquo;</h2>
            <p>Un autolavado de rodillos mueve tu auto a través de cepillos de tela que hacen exactamente lo contrario de lo que debería hacerse: friccionan la suciedad contra la pintura. Cada lavado de rodillos genera miles de micro-rayones (swirls) que hacen que tu pintura luzca opaca bajo la luz directa.</p>
            <p>Esos &ldquo;30 minutos&rdquo; no solo no limpian realmente — <strong style={{ color: "#0f172a" }}>dañan tu auto progresivamente</strong>.</p>

            <h2 style={{ marginTop: "2.5rem", marginBottom: "1rem", fontSize: "1.4rem" }}>¿Cada Cuánto Necesito Cada Servicio?</h2>
            <div className="glass-card" style={{ padding: "1.5rem", marginBottom: "2rem" }}>
              <p style={{ marginBottom: "0.5rem" }}><strong style={{ color: "#0f172a" }}>Lavado de mantenimiento ($990/mes):</strong> Cada 2-4 semanas como seguimiento posterior a tu primer lavado profundo</p>
              <p style={{ marginBottom: "0.5rem" }}><strong style={{ color: "#0f172a" }}>Lavado profundo interior ($2,400 MXN | $2,160 Miembro):</strong> Cada 3-6 meses según uso</p>
              <p style={{ marginBottom: "0" }}><strong style={{ color: "#0f172a" }}>Detallado completo ($7,499) o Cerámico 9H ($10,999):</strong> Cada 12 meses o al adquirir el vehículo</p>
            </div>

            {/* Preguntas Frecuentes */}
            <h2 style={{ marginTop: "2.5rem", marginBottom: "1rem", fontSize: "1.4rem" }}>Preguntas Frecuentes: Lavado Profundo vs Detallado</h2>
            <div style={{ display: "grid", gap: "0.85rem", marginBottom: "1.5rem" }}>
              {vsFaqs.map((faq, idx) => (
                <div key={idx} className="glass-card" style={{ padding: "1.25rem 1.4rem" }}>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.45rem" }}>{faq.q}</h3>
                  <p style={{ fontSize: "0.9rem", color: "#334155", lineHeight: 1.65, marginBottom: "0.65rem" }}>{faq.a}</p>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    <a
                      href={`https://wa.me/525610846022?text=${encodeURIComponent(`Hola Doctor Foam, leí "${faq.q}" y quiero cotizar mi servicio a domicilio.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cta-location={`blog_vs_detallado_faq_${idx}_whatsapp`}
                      style={{ fontSize: "0.75rem", fontWeight: 700, color: "#15803d", background: "#f0fdf4", border: "1px solid #86efac", borderRadius: "9999px", padding: "0.3rem 0.75rem", textDecoration: "none" }}
                    >
                      💬 Cotizar por WhatsApp
                    </a>
                    <Link
                      href="/reservar"
                      style={{ fontSize: "0.75rem", fontWeight: 700, color: "#1d4ed8", background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "9999px", padding: "0.3rem 0.75rem", textDecoration: "none" }}
                    >
                      📅 Reservar en Línea
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="glass-card" style={{ padding: "2rem", marginTop: "3rem", textAlign: "center", border: "2px solid rgba(37,99,235,0.15)" }}>
            <h3 style={{ marginBottom: "1rem" }}>¿Listo para el <span className="gradient-text">nivel profesional</span>?</h3>
            <p style={{ color: "#475569", marginBottom: "1.5rem" }}>Conoce nuestros planes de detallado con precios y comparativas detalladas (desde $2,400 MXN, y 10% OFF permanente con Membresía).</p>
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/lavado-profundo-vehiculos-cdmx/paquetes-detallado-automotriz" className="btn-premium">
                📋 Ver Planes y Precios
              </Link>
              <a
                href="https://wa.me/525610846022?text=Hola%20Doctor%20Foam%2C%20le%C3%AD%20Lavado%20Profundo%20vs%20Detallado%20y%20quiero%20cotizar%20un%20servicio%20a%20domicilio"
                target="_blank"
                rel="noopener noreferrer"
                data-cta-location="blog_vs_detallado_bottom_whatsapp"
                className="btn-outline"
              >
                💬 Cotizar por WhatsApp
              </a>
              <a
                href="/brochure-doctor-foam.pdf"
                download="Brochure-Corporativo-Doctor-Foam-2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                data-cta-location="blog_vs_detallado_bottom_brochure"
                className="btn-outline"
                style={{ borderColor: "#2563eb", color: "#1d4ed8" }}
              >
                📄 Descargar Brochure PDF
              </a>
            </div>
          </div>
        </article>
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
