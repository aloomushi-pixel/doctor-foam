import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Lavado Profundo vs Detallado Automotriz: ¿Cuál Necesitas? | Doctor Foam",
  description:
    "Entiende la diferencia entre un lavado profundo y un detallado automotriz profesional. Descontaminación química, arcilla, corrección de pintura explicados.",
  alternates: { canonical: "https://drfoam.com.mx/blog/lavado-profundo-vs-detallado-automotriz" },
  openGraph: {
    title: "Lavado Profundo vs Detallado Automotriz | Doctor Foam",
    description: "¿Por qué un detallado toma 4-8 horas? Explicamos cada proceso profesional.",
    type: "article",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Lavado Profundo vs Detallado Automotriz: ¿Cuál Necesitas?",
  description: "Diferencias entre lavado profundo y detallado automotriz profesional explicadas por Doctor Foam.",
  datePublished: "2026-03-29",
  author: { "@type": "Organization", name: "Doctor Foam México" },
  publisher: { "@type": "Organization", name: "Doctor Foam México" },
  url: "https://drfoam.com.mx/blog/lavado-profundo-vs-detallado-automotriz",
};

export default function BlogLavadoProfundoVsDetallado() {
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
          <Link href="/reservar" className="btn-premium" style={{ padding: "0.5rem 1.2rem", fontSize: "0.8rem" }}>
            Agendar Servicio
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
            <span className="zone-tag zone-tag-gold">Educación</span>
            <span style={{ color: "#64748b", fontSize: "0.85rem" }}>8 min de lectura</span>
          </div>

          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", marginBottom: "1.5rem", lineHeight: "1.3" }}>
            Lavado Profundo vs Detallado Automotriz: ¿Cuál Necesitas?
          </h1>

          <Image
            src="/seo/blog-vs-detallado.png"
            alt="Infografía de 3 capas de cuidado de pintura automotriz: suciedad, contaminantes y restauración cerámica"
            width={800}
            height={500}
            style={{ width: "100%", height: "auto", borderRadius: "1rem", marginBottom: "2rem", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}
            priority
          />

          <div className="blog-content" style={{ color: "#475569", fontSize: "1rem", lineHeight: "1.9" }}>
            <h2 style={{ marginTop: "2.5rem", marginBottom: "1rem", fontSize: "1.4rem" }}>¿Por Qué un Detallado Toma 4-8 Horas?</h2>
            <p>Una pregunta que recibimos constantemente: <em>&ldquo;¿Por qué cobran $9,500 si en el autolavado me lo hacen en 30 minutos por $200?&rdquo;</em></p>
            <p>La respuesta corta: porque son servicios completamente diferentes. Un autolavado de cadena limpía la superficie visible. Un detallado profesional <strong style={{ color: "#0f172a" }}>restaura cada componente del vehículo a nivel molecular</strong>.</p>

            <h2 style={{ marginTop: "2.5rem", marginBottom: "1rem", fontSize: "1.4rem" }}>Los 3 Niveles de &ldquo;Lavado&rdquo;</h2>

            <h3 style={{ marginTop: "2rem", marginBottom: "0.75rem", fontSize: "1.15rem" }}>Nivel 1: Lavado de Mantenimiento (2-3 hrs)</h3>
            <p>Foam cannon de alta presión, champú pH neutro, método dos cubetas, sellador UV. Es lo que hacemos en nuestro servicio de <Link href="/lavado-recurrente-autos-domicilio" style={{ color: "var(--color-gold-400)", textDecoration: "underline" }}>lavado recurrente a domicilio</Link>. Mantiene el auto limpio y protegido entre detallados profundos.</p>

            <h3 style={{ marginTop: "2rem", marginBottom: "0.75rem", fontSize: "1.15rem" }}>Nivel 2: Lavado Profundo Interior (3-4 hrs)</h3>
            <p>Aquí es donde la diferencia se hace evidente. Un lavado profundo incluye:</p>
            <ul style={{ marginLeft: "1.5rem", marginBottom: "1.5rem" }}>
              <li style={{ marginBottom: "0.5rem" }}><strong style={{ color: "#0f172a" }}>Vapor seco a 180°C</strong> — penetra fibras del tapizado, elimina bacterias sin químicos</li>
              <li style={{ marginBottom: "0.5rem" }}><strong style={{ color: "#0f172a" }}>Extracción por inyección</strong> — inyecta solución limpiadora y la aspira con toda la suciedad</li>
              <li style={{ marginBottom: "0.5rem" }}><strong style={{ color: "#0f172a" }}>Hidratación de pieles</strong> — productos especializados para cada tipo de cuero</li>
              <li style={{ marginBottom: "0.5rem" }}><strong style={{ color: "#0f172a" }}>Ozono médico</strong> — elimina 99.9% de patógenos, hongos y olores</li>
            </ul>

            <h3 style={{ marginTop: "2rem", marginBottom: "0.75rem", fontSize: "1.15rem" }}>Nivel 3: Detallado y Restauración Completa (5-10 hrs)</h3>
            <p>El servicio más completo incluye todo lo anterior más:</p>
            <ul style={{ marginLeft: "1.5rem", marginBottom: "1.5rem" }}>
              <li style={{ marginBottom: "0.5rem" }}><strong style={{ color: "#0f172a" }}>Descontaminación química</strong> — disuelve partículas de hierro, savia y contaminantes industriales adheridos</li>
              <li style={{ marginBottom: "0.5rem" }}><strong style={{ color: "#0f172a" }}>Barra de arcilla sintética</strong> — remueve contaminación mecánica que el lavado no alcanza</li>
              <li style={{ marginBottom: "0.5rem" }}><strong style={{ color: "#0f172a" }}>Corrección de pintura</strong> — pulidora de triple acción en 2-3 etapas, elimina 95% de swirls</li>
              <li style={{ marginBottom: "0.5rem" }}><strong style={{ color: "#0f172a" }}>Recubrimiento cerámico/cristal líquido</strong> — protección de 3-7 años con dureza 9H-10H</li>
            </ul>

            <h2 style={{ marginTop: "2.5rem", marginBottom: "1rem", fontSize: "1.4rem" }}>El Mito de los &ldquo;30 Minutos&rdquo;</h2>
            <p>Un autolavado de rodillos mueve tu auto a través de cepillos de tela que hacen exactamente lo contrario de lo que debería hacerse: friccionan la suciedad contra la pintura. Cada lavado de rodillos genera miles de micro-rayones (swirls) que hacen que tu pintura luzca opaca bajo la luz directa.</p>
            <p>Esos &ldquo;30 minutos&rdquo; no solo no limpian realmente — <strong style={{ color: "#0f172a" }}>dañan tu auto progresivamente</strong>.</p>

            <h2 style={{ marginTop: "2.5rem", marginBottom: "1rem", fontSize: "1.4rem" }}>¿Cada Cuánto Necesito Cada Servicio?</h2>
            <div className="glass-card" style={{ padding: "1.5rem", marginBottom: "1.5rem" }}>
              <p style={{ marginBottom: "0.5rem" }}><strong style={{ color: "#0f172a" }}>Lavado de mantenimiento:</strong> Cada 2-4 semanas (ideal con membresía)</p>
              <p style={{ marginBottom: "0.5rem" }}><strong style={{ color: "#0f172a" }}>Lavado profundo interior:</strong> Cada 3-6 meses según uso</p>
              <p style={{ marginBottom: "0" }}><strong style={{ color: "#0f172a" }}>Detallado + cerámico:</strong> Una vez al año o al adquirir el vehículo</p>
            </div>
          </div>

          {/* CTA */}
          <div className="glass-card" style={{ padding: "2rem", marginTop: "3rem", textAlign: "center", border: "2px solid rgba(37,99,235,0.15)" }}>
            <h3 style={{ marginBottom: "1rem" }}>¿Listo para el <span className="gradient-text">nivel profesional</span>?</h3>
            <p style={{ color: "#475569", marginBottom: "1.5rem" }}>Conoce nuestros planes de detallado con precios y comparativas detalladas.</p>
            <Link href="/lavado-profundo-vehiculos-cdmx/paquetes-detallado-automotriz" className="btn-premium">
              📋 Conoce nuestros Planes de Detallado Automotriz
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
