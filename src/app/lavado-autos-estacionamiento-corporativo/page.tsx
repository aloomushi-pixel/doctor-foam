import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Lavado de Autos en Estacionamiento Corporativo CDMX | Sin Agua",
  description:
    "Llevamos nuestro lavado premium a tu oficina en CDMX. Sistema de encapsulamiento sin agua, sin ruido ni escurrimientos. Ideal para corporativos y condominios.",
  alternates: { canonical: "https://drfoam.com.mx/lavado-autos-estacionamiento-corporativo" },
  openGraph: {
    title: "Lavado de Autos en Estacionamiento Corporativo | Doctor Foam",
    description: "Limpiamos tu auto mientras trabajas. Sin usar tu agua ni electricidad. Sin dejar escurrimientos.",
  },
};

const useCases = [
  { icon: "🏢", title: "En tu Oficina", desc: "Deja tu auto en el estacionamiento del corporativo. Mientras trabajas, nosotros lo detallamos. Al salir, lo encuentras impecable." },
  { icon: "🏠", title: "En tu Casa", desc: "El servicio clásico a domicilio. Llegamos a tu cochera o estacionamiento residencial con todo el equipo necesario." },
  { icon: "🅿️", title: "En Cualquier Estacionamiento", desc: "Estacionamiento de plaza comercial, hospital, universidad... si puedes estacionar ahí, podemos lavar ahí." },
  { icon: "👨‍👩‍👧", title: "En Casa de Familiares", desc: "Visitando a los suegros, a tus papás, a un amigo. Si vas a estar ahí unas horas, nosotros aprovechamos para dejar tu auto perfecto." },
  { icon: "🏋️", title: "En el Gym o Club", desc: "Mientras entrenas o juegas golf, tu auto recibe el tratamiento completo en el estacionamiento." },
  { icon: "🏗️", title: "Flotillas Corporativas", desc: "Servicio B2B para empresas. Detallamos flotillas ejecutivas directamente en el estacionamiento de tu empresa. Facturación CFDI." },
];

const autonomy = [
  { icon: "💧", label: "Sin tu Agua", desc: "Cargamos tanque de 400 litros de agua purificada. No conectamos ninguna manguera a tu toma." },
  { icon: "⚡", label: "Sin tu Electricidad", desc: "Generador industrial silencioso propio. No necesitamos enchufar nada a tu edificio." },
  { icon: "🚿", label: "Sin Escurrimientos", desc: "Sistema de encapsulamiento con polímeros. Menos de 20 litros de agua por servicio. Sin charcos." },
  { icon: "🔇", label: "Bajo Ruido", desc: "Equipo diseñado para operar en estacionamientos subterráneos sin generar molestias a vecinos." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Lavado de Autos en Estacionamiento Corporativo CDMX — Doctor Foam",
  description: "Lavado y detallado automotriz en estacionamientos corporativos y residenciales en CDMX sin usar tu agua ni electricidad y sin escurrimientos.",
  provider: { "@type": "LocalBusiness", name: "Doctor Foam México" },
  serviceType: "Lavado ecológico de autos en estacionamiento corporativo",
  areaServed: { "@type": "City", name: "Ciudad de México" },
  url: "https://drfoam.com.mx/lavado-autos-estacionamiento-corporativo",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://drfoam.com.mx/" },
    { "@type": "ListItem", position: 2, name: "Lavado de Autos en Estacionamiento Corporativo CDMX", item: "https://drfoam.com.mx/lavado-autos-estacionamiento-corporativo" },
  ],
};

const faqs = [
  {
    q: "¿Cómo funciona el lavado de autos en estacionamiento corporativo o de oficina en CDMX?",
    a: "Solo nos indicas la ubicación de tu edificio corporativo (Santa Fe, Polanco, Reforma, Palmas, Insurgentes o Bosques) y tu cajón de estacionamiento. Nuestra unidad móvil compacta ingresa al sótano o área asignada con agua purificada y planta eléctrica insonorizada propia para detallar tu vehículo mientras trabajas.",
  },
  {
    q: "¿Dejan charcos o escurrimientos de agua en el sótano del edificio o condominio?",
    a: "No. Nuestro protocolo ecológico de encapsulamiento polimérico y vapor seco a 180°C no vierte agua al piso ni deja charcos ni espuma en el cajón de estacionamiento, cumpliendo al 100% con los reglamentos de administración de torres corporativas y condominios residenciales.",
  },
  {
    q: "¿Ofrecen convenios corporativos B2B y lavado de flotillas ejecutivas con factura CFDI?",
    a: "Sí. Atendemos flotillas ejecutivas, vehículos de dirección y beneficios para colaboradores en empresas de CDMX y Estado de México, con facturación CFDI mensual y tarifas preferenciales por volumen.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

export default function EstacionamientoCorporativoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <nav className="navbar navbar-scrolled">
        <div className="navbar-inner">
          <Link href="/" style={{ textDecoration: "none" }}>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.3rem", color: "#0f172a" }}>
              DOCTOR <span className="gradient-text">FOAM</span>
            </span>
          </Link>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
            <Link href="/lavado-profundo-vehiculos-cdmx" style={{ fontSize: "0.82rem", fontWeight: 600, color: "#334155", textDecoration: "none" }}>
              Lavado Profundo
            </Link>
            <Link href="/lavado-recurrente-autos-domicilio" style={{ fontSize: "0.82rem", fontWeight: 600, color: "#334155", textDecoration: "none" }}>
              Lavado Recurrente
            </Link>
            <Link href="/membresia-doctor-foam" style={{ fontSize: "0.82rem", fontWeight: 600, color: "#334155", textDecoration: "none" }}>
              Membresía $990
            </Link>
            <a
              href="https://wa.me/525610846022?text=Hola%20Doctor%20Foam%2C%20me%20interesa%20el%20servicio%20en%20estacionamiento%20corporativo%20o%20condominio"
              target="_blank"
              rel="noopener noreferrer"
              data-cta-location="pillar_corporativo_nav_whatsapp"
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
            <span className="section-label">Servicio 100% Autónomo Donde Estés</span>
            <h1 className="section-title">
              Lavado de Autos en Estacionamiento Corporativo: <span className="gradient-text">Ecológico y Sin Agua</span>
            </h1>
            <p className="section-subtitle" style={{ maxWidth: "750px", marginBottom: "1.75rem" }}>
              No solo vamos a tu casa. Llevamos nuestro <Link href="/" style={{ color: "var(--color-gold-400)", textDecoration: "underline" }}>lavado de autos a domicilio</Link> a donde tú estés: oficina, estacionamiento subterráneo, corporativo o condominio. Somos 100% autónomos con agua y electricidad propia.
            </p>
            <div style={{ display: "flex", gap: "0.85rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/reservar" className="btn-premium">
                📅 Agendar en mi Oficina / Condominio
              </Link>
              <a
                href="https://wa.me/525610846022?text=Hola%20Doctor%20Foam%2C%20me%20interesa%20cotizar%20el%20servicio%20en%20estacionamiento%20corporativo"
                target="_blank"
                rel="noopener noreferrer"
                data-cta-location="pillar_corporativo_hero_whatsapp"
                className="btn-outline"
              >
                💬 Cotizar por WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <div style={{ maxWidth: "1000px", margin: "-2rem auto 0", padding: "0 1.5rem" }}>
          <Image
            src="/seo/hero-corporativo.png"
            alt="Equipo de lavado profesional Doctor Foam operando en estacionamiento corporativo moderno en CDMX"
            width={1200}
            height={600}
            style={{ width: "100%", height: "auto", borderRadius: "1.25rem", boxShadow: "0 4px 25px rgba(0,0,0,0.08)" }}
            priority
          />
        </div>

        {/* Autonomy */}
        <section className="section-padding" style={{ paddingTop: "3rem" }}>
          <div className="container" style={{ maxWidth: "900px" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", textAlign: "center" }}>
              Somos <span className="gradient-text">100% Autónomos</span>
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.25rem" }}>
              {autonomy.map((a, i) => (
                <div key={i} className="glass-card" style={{ padding: "1.5rem", textAlign: "center" }}>
                  <span style={{ fontSize: "2.5rem", display: "block", marginBottom: "0.5rem" }}>{a.icon}</span>
                  <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem", color: "#0f172a" }}>{a.label}</h3>
                  <p style={{ color: "#475569", fontSize: "0.82rem", lineHeight: "1.6" }}>{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="section-padding">
          <div className="container" style={{ maxWidth: "1000px" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", textAlign: "center" }}>
              ¿Dónde podemos <span className="gradient-text">lavar tu auto</span>?
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: "1.5rem" }}>
              {useCases.map((u, i) => (
                <div key={i} className="glass-card" style={{ padding: "2rem" }}>
                  <span style={{ fontSize: "2rem", display: "block", marginBottom: "0.75rem" }}>{u.icon}</span>
                  <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>{u.title}</h3>
                  <p style={{ color: "#475569", fontSize: "0.88rem", lineHeight: "1.7" }}>{u.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Eco Badge */}
        <section className="section-padding" style={{ textAlign: "center" }}>
          <div className="container" style={{ maxWidth: "700px" }}>
            <div className="glass-card" style={{ padding: "2.5rem", border: "2px solid rgba(22,163,74,0.2)" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "linear-gradient(135deg, #dcfce7, #bbf7d0)", padding: "0.5rem 1.2rem", borderRadius: "2rem", fontSize: "0.85rem", color: "#166534", fontWeight: 600, marginBottom: "1rem" }}>
                🌿 Certificación Sello ECO · 45% menos consumo de agua
              </div>
              <h2 style={{ fontSize: "1.3rem", marginBottom: "1rem" }}>
                Ideal para <span className="gradient-text">Corporativos y Condominios</span>
              </h2>
              <p style={{ color: "#475569", fontSize: "0.9rem", lineHeight: "1.7", marginBottom: "1.5rem" }}>
                Muchos edificios y fraccionamientos restringen el uso de mangueras y el vertido de agua en estacionamientos. Nuestro sistema ecológico no genera escurrimientos y cumple con todas las normativas ambientales.
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/reservar" className="btn-premium">📅 Agendar donde sea</Link>
                <a href="https://wa.me/525610846022?text=Hola%2C%20me%20interesa%20el%20servicio%20corporativo" className="btn-outline" target="_blank" rel="noopener noreferrer">📱 Cotizar para Empresas</a>
              </div>
            </div>
          </div>
        </section>

        {/* Preguntas Frecuentes sobre Estacionamiento Corporativo */}
        <section className="section-padding" style={{ paddingTop: 0 }}>
          <div className="container" style={{ maxWidth: "820px" }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: "1.25rem", textAlign: "center" }}>
              Preguntas Frecuentes sobre <span className="gradient-text">Servicio en Corporativos y Condominios</span>
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {faqs.map((faq, idx) => (
                <details
                  key={idx}
                  className="glass-card"
                  style={{ padding: "1.15rem 1.4rem", cursor: "pointer" }}
                  open={idx === 0}
                >
                  <summary style={{ fontWeight: 700, color: "#0f172a", fontSize: "0.98rem" }}>
                    {faq.q}
                  </summary>
                  <p style={{ color: "#475569", fontSize: "0.92rem", lineHeight: 1.7, marginTop: "0.65rem", marginBottom: 0 }}>
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Zonas de Cobertura Hub */}
        <section className="section-padding" style={{ paddingTop: 0 }}>
          <div className="container" style={{ maxWidth: "900px", textAlign: "center" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.75rem", color: "#0f172a" }}>
              Corredores Corporativos y Residenciales Atendidos en CDMX y EdoMex
            </h3>
            <p style={{ fontSize: "0.85rem", color: "#475569", marginBottom: "1rem" }}>
              Operamos en sótanos y estacionamientos sin tomas de agua ni luz en:
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center" }}>
              {[
                { slug: "polanco", label: "Polanco y Nuevo Polanco" },
                { slug: "lomas-de-chapultepec", label: "Lomas y Palmas" },
                { slug: "santa-fe", label: "Corporativos Santa Fe" },
                { slug: "bosques-de-las-lomas", label: "Bosques y Tamarindos" },
                { slug: "pedregal", label: "Pedregal y Perisur" },
                { slug: "interlomas", label: "Interlomas" },
                { slug: "huixquilucan", label: "Bosque Real y Huixquilucan" },
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
          <p>&copy; {new Date().getFullYear()} Doctor Foam México.</p>
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
