import Logo from "@/components/Logo";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Blog de Detallado Automotriz, Swirls y Cerámico 9H en CDMX | Doctor Foam",
    description:
        "Guías técnicas y precios en CDMX sobre corrección de pintura y eliminación de swirls, recubrimiento cerámico 9H, lavado profundo de vestiduras con vapor a 180°C y detallado a domicilio.",
    alternates: { canonical: "https://drfoam.com.mx/blog" },
};

const blogPosts = [
    {
        slug: "correccion-pintura-swirls-guia",
        title: "Swirls en la Pintura y Micro Rayones en tu Auto: Qué Son, Cómo Quitarlos y Precios CDMX",
        excerpt:
            "¿Qué son los swirls y micro rayones (microrayones) en la pintura de tu auto? Aprende cómo quitarlos de raíz con corrección de pintura de 1 a 3 etapas a domicilio.",
        date: "2026-05-05",
        category: "Corrección",
        readTime: "9 min",
    },
    {
        slug: "verdad-recubrimiento-ceramico-9h-autos-premium",
        title: "Recubrimiento Cerámico 9H: Qué Significa Realmente, Duración y Precios en CDMX",
        excerpt:
            "Desmantelando la falacia de la escala de dureza en cerámicos automotrices. La ingeniería de materiales detrás de la hiper-hidrofobicidad SiO2 y precios en CDMX.",
        date: "2026-05-06",
        category: "Ingeniería de Materiales",
        readTime: "9 min",
    },
    {
        slug: "guia-completa-recubrimiento-ceramico",
        title: "Recubrimiento Cerámico para Autos (Coating Cerámico) en México: Qué Es y Precios CDMX",
        excerpt:
            "Guía completa sobre acabado cerámico para autos y cerámico para interiores de auto (piel, plásticos y pantallas): tipos 9H y grafeno, duración de 3 a 7 años y precios.",
        date: "2026-05-05",
        category: "Protección",
        readTime: "9 min",
    },
    {
        slug: "desnaturalizacion-termica-180c-fin-extraccion-humeda",
        title: "Desnaturalización Térmica a 180°C: El Fin de la Extracción Húmeda",
        excerpt:
            "Análisis de los riesgos de inyección/succión frente al choque térmico del vapor seco. Esterilización clínica de ductos HVAC y secado en menos de 60 minutos.",
        date: "2026-05-06",
        category: "Bioseguridad",
        readTime: "10 min",
    },
    {
        slug: "detallado-movil-grado-clinico-vs-lavado-convencional",
        title: "Detallado Móvil de Grado Clínico vs. Lavado a Domicilio Convencional",
        excerpt:
            "Análisis de la infraestructura logística necesaria para la intervención a domicilio. Ósmosis inversa, iluminación CRI 95+ y protocolos de contaminación cruzada cero.",
        date: "2026-05-07",
        category: "Logística y Operaciones",
        readTime: "9 min",
    },
    {
        slug: "innovacion-2025-2026-escaneres-3d-polimeros-auto-regenerables",
        title: "Innovación 2025-2026: Escáneres 3D y Polímeros Auto-Regenerables",
        excerpt:
            "El futuro de la protección automotriz: metrología algorítmica, PPF viscoelástico reactivo al calor y el impacto directo en la conservación del valor patrimonial.",
        date: "2026-05-07",
        category: "Innovación Tecnológica",
        readTime: "10 min",
    },
    {
        slug: "mitigacion-grabado-lluvia-acida-autos",
        title: "Lluvia Ácida vs. Manchas de Agua en la CDMX: La Cinética de la Destrucción",
        excerpt:
            "Diferenciación clínica entre depósitos alcalinos y grabado químico causado por SO2 y NOx. Estrategias de mitigación en el microclima del Valle de México.",
        date: "2026-05-06",
        category: "Defensa Ambiental",
        readTime: "11 min",
    },
    {
        slug: "detallado-profesional-multiplicador-financiero-vehiculos-lujo",
        title: "El Detallado Profesional como Multiplicador Financiero en Vehículos de Lujo",
        excerpt:
            "Análisis financiero: cómo una inversión en detallado automotriz genera entre $16,000 y $35,000 MXN adicionales en el valor de reventa.",
        date: "2026-05-06",
        category: "Economía del Patrimonio",
        readTime: "8 min",
    },
    {
        slug: "5-errores-lavado-auto-premium",
        title: "5 Errores que Arruinan la Pintura de tu Auto de Lujo",
        excerpt:
            "Desde usar el jabón equivocado hasta secar con franela. Descubre los errores más comunes que generan swirls en autos premium y cómo evitarlos.",
        date: "2026-02-10",
        category: "Cuidado",
        readTime: "6 min",
    },
    {
        slug: "mejores-ceras-selladores-mexico",
        title: "Las Mejores Ceras y Selladores Disponibles en México",
        excerpt:
            "Comparativa de los mejores productos de protección para tu auto: desde ceras carnaubas hasta selladores cerámicos y recubrimientos 9H.",
        date: "2026-01-15",
        category: "Productos",
        readTime: "10 min",
    },
    {
        slug: "economia-cuidado-automotriz-membresia",
        title: "La Economía del Cuidado Automotriz: ¿Conviene una Membresía de Lavado?",
        excerpt:
            "Descubre cuánto ahorras con una membresía de seguimiento automotriz ($990/mes + 10% OFF permanente en paquetes especializados) frente a lavados esporádicos.",
        date: "2026-03-29",
        category: "Finanzas",
        readTime: "10 min",
    },
    {
        slug: "lavado-profundo-vs-detallado-automotriz",
        title: "Lavado Profundo vs Detallado Automotriz: ¿Cuál Necesitas?",
        excerpt:
            "Diferencia real entre lavado de mantenimiento, lavado profundo interior con vapor a 180°C y detallado completo con corrección de pintura y cerámico 9H.",
        date: "2026-03-29",
        category: "Educación",
        readTime: "8 min",
    },
];

const blogFaqs = [
    {
        q: "¿Cuánto cuesta quitar swirls, lavar vestiduras con vapor a 180°C o aplicar cerámico 9H a domicilio en CDMX?",
        a: "En Doctor Foam México nuestros paquetes a domicilio con agua purificada y luz propia son: Foam Maintenance ($1,599 MXN), Industrial Deep Interior con vapor a 180°C y ozono ($2,400 MXN), Signature Detail con corrección de 85-95% de swirls + interior ($7,499 MXN) y Ceramic Coating 9H ($10,999 MXN, garantía de 3 a 5 años).",
    },
    {
        q: "¿Cómo funciona la Membresía Doctor Foam ($990/mes) y el descuento del 10% permanente?",
        a: "Para empezar a operar la Membresía Doctor Foam ($990 MXN/mes sedán o $1,160 MXN/mes SUV), primero se contrata un servicio de lavado profundo inicial. La membresía está diseñada para darle seguimiento preventivo continuo a ese primer servicio y otorga un 10% de descuento permanente en todos los lavados más especializados.",
    },
    {
        q: "¿En qué zonas de CDMX y Estado de México realizan detallado automotriz a domicilio sin cargo extra?",
        a: "Atendemos sin cargo por traslado en Polanco (C.P. 11510–11560), Bosques de las Lomas (C.P. 05120, 11700), Lomas de Chapultepec, Santa Fe, Interlomas, Huixquilucan, Pedregal, San Ángel y Coyoacán.",
    },
];

export default function BlogPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "Blog Doctor Foam México",
        description: "Guías técnicas sobre detallado automotriz a domicilio, eliminación de swirls, recubrimiento cerámico 9H y lavado de vestiduras con vapor a 180°C en CDMX",
        url: "https://drfoam.com.mx/blog",
        publisher: {
            "@type": "Organization",
            name: "Doctor Foam México",
        },
        blogPost: blogPosts.map((post) => ({
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            url: `https://drfoam.com.mx/blog/${post.slug}`,
        })),
    };

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Inicio", item: "https://drfoam.com.mx/" },
            { "@type": "ListItem", position: 2, name: "Blog de Detallado Automotriz", item: "https://drfoam.com.mx/blog" },
        ],
    };

    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: blogFaqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: {
                "@type": "Answer",
                text: f.a,
            },
        })),
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

            <nav className="navbar navbar-scrolled">
                <div className="navbar-inner">
                    <Link href="/" style={{ textDecoration: "none" }}>
                        <Logo size="sm" />
                    </Link>
                    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
                        <Link href="/lavado-profundo-vehiculos-cdmx" style={{ fontSize: "0.82rem", fontWeight: 600, color: "#334155", textDecoration: "none" }}>
                            Lavado Profundo
                        </Link>
                        <Link href="/lavado-profundo-vehiculos-cdmx/paquetes-detallado-automotriz" style={{ fontSize: "0.82rem", fontWeight: 600, color: "#334155", textDecoration: "none" }}>
                            Paquetes y Precios
                        </Link>
                        <Link href="/membresia-doctor-foam" style={{ fontSize: "0.82rem", fontWeight: 600, color: "#334155", textDecoration: "none" }}>
                            Membresía ($990/mes)
                        </Link>
                        <a
                            href="https://wa.me/525610846022?text=Hola%20Doctor%20Foam%2C%20vengo%20de%20su%20blog%20y%20me%20gustar%C3%ADa%20cotizar%20un%20servicio%20a%20domicilio"
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cta-location="blog_index_nav_whatsapp"
                            className="btn-outline"
                            style={{ padding: "0.45rem 0.9rem", fontSize: "0.78rem" }}
                        >
                            💬 WhatsApp
                        </a>
                        <Link href="/reservar" className="btn-premium" style={{ padding: "0.5rem 1.2rem", fontSize: "0.8rem" }}>
                            Agendar Cita
                        </Link>
                    </div>
                </div>
            </nav>

            <main style={{ paddingTop: "6rem" }}>
                <section className="section-padding">
                    <div className="container">
                        <div style={{ textAlign: "center", marginBottom: "2.25rem" }}>
                            <span className="section-label">Centro de Ingeniería y Estética Automotriz · CDMX</span>
                            <h1 className="section-title">
                                Guías de <span className="gradient-text">detallado automotriz, swirls y cerámico 9H</span>
                            </h1>
                            <p className="section-subtitle">
                                Protocolos clínicos sobre vapor seco a 180°C, corrección de pintura, recubrimiento nanocerámico y preservación patrimonial a domicilio.
                            </p>
                        </div>

                        {/* Above-the-Fold Quick Package & WhatsApp Strip */}
                        <div
                            className="glass-card"
                            style={{
                                maxWidth: "1000px",
                                margin: "0 auto 2.75rem",
                                padding: "1.25rem 1.5rem",
                                background: "linear-gradient(135deg, rgba(248, 250, 252, 0.98), rgba(239, 246, 255, 0.95))",
                                border: "1px solid rgba(37, 99, 235, 0.2)",
                            }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem", marginBottom: "0.85rem" }}>
                                <div style={{ fontSize: "0.9rem", color: "#0f172a", fontWeight: 700 }}>
                                    ⚡ Cotiza en 1 Clic tu Servicio a Domicilio (Agua Purificada y Planta Propia)
                                </div>
                                <Link href="/membresia-doctor-foam" style={{ fontSize: "0.8rem", color: "#2563eb", fontWeight: 700, textDecoration: "none" }}>
                                    🔄 Membresía de Seguimiento $990/mes + 10% OFF permanente →
                                </Link>
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "0.75rem" }}>
                                {[
                                    { name: "Foam Maintenance", price: "$1,599 MXN", sub: "Lavado clínico pH neutro", msg: "Hola Doctor Foam, vengo del blog y quiero agendar Foam Maintenance ($1,599 MXN)" },
                                    { name: "Industrial Deep Interior", price: "$2,400 MXN", sub: "Vestiduras vapor 180°C + Ozono", msg: "Hola Doctor Foam, vengo del blog y quiero agendar Industrial Deep Interior ($2,400 MXN)" },
                                    { name: "Signature Detail", price: "$7,499 MXN", sub: "Corrección swirls + Interior 180°C", msg: "Hola Doctor Foam, vengo del blog y quiero agendar Signature Detail ($7,499 MXN)" },
                                    { name: "Ceramic Coating 9H", price: "$10,999 MXN", sub: "Blindaje SiO2 9H (3 a 5 años)", msg: "Hola Doctor Foam, vengo del blog y quiero cotizar Ceramic Coating 9H ($10,999 MXN)" },
                                ].map((pkg, idx) => (
                                    <a
                                        key={idx}
                                        href={`https://wa.me/525610846022?text=${encodeURIComponent(pkg.msg)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        data-cta-location={`blog_index_strip_${idx}`}
                                        style={{
                                            display: "block",
                                            padding: "0.8rem 0.95rem",
                                            borderRadius: "0.65rem",
                                            background: "#ffffff",
                                            border: "1px solid #e2e8f0",
                                            textDecoration: "none",
                                        }}
                                    >
                                        <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0f172a" }}>{pkg.name}</div>
                                        <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#2563eb", margin: "0.1rem 0" }}>{pkg.price}</div>
                                        <div style={{ fontSize: "0.73rem", color: "#475569" }}>{pkg.sub} · 💬 WhatsApp</div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="services-grid" style={{ maxWidth: "1000px", margin: "0 auto" }}>
                            {blogPosts.map((post, i) => (
                                <article key={i} className="glass-card" style={{ padding: "2rem" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                                        <span className="zone-tag zone-tag-gold">{post.category}</span>
                                        <span style={{ color: "#64748b", fontSize: "0.8rem" }}>{post.readTime}</span>
                                    </div>
                                    <h2 style={{ fontSize: "1.2rem", marginBottom: "0.75rem", lineHeight: "1.4" }}>
                                        <Link
                                            href={`/blog/${post.slug}`}
                                            style={{ color: "#0f172a", textDecoration: "none" }}
                                        >
                                            {post.title}
                                        </Link>
                                    </h2>
                                    <p style={{ color: "#475569", fontSize: "0.9rem", lineHeight: "1.7", marginBottom: "1rem" }}>
                                        {post.excerpt}
                                    </p>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <span style={{ color: "#475569", fontSize: "0.8rem" }}>
                                            {new Date(post.date).toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" })}
                                        </span>
                                        <Link
                                            href={`/blog/${post.slug}`}
                                            style={{ color: "var(--color-gold-400)", textDecoration: "none", fontSize: "0.9rem", fontWeight: 600 }}
                                        >
                                            Leer guía completa →
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Preguntas Frecuentes en /blog */}
                        <div style={{ maxWidth: "1000px", margin: "3.5rem auto 0" }}>
                            <h2 style={{ fontSize: "1.4rem", color: "#0f172a", marginBottom: "1.25rem", textAlign: "center" }}>
                                Preguntas Frecuentes sobre Detallado Automotriz en CDMX
                            </h2>
                            <div style={{ display: "grid", gap: "0.85rem" }}>
                                {blogFaqs.map((faq, idx) => (
                                    <div key={idx} className="glass-card" style={{ padding: "1.2rem 1.4rem" }}>
                                        <h3 style={{ fontSize: "0.96rem", color: "#0f172a", marginBottom: "0.4rem" }}>{faq.q}</h3>
                                        <p style={{ fontSize: "0.88rem", color: "#475569", lineHeight: 1.65, margin: 0 }}>{faq.a}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Zonas de Cobertura Hub con Enlaces Descriptivos */}
                        <div style={{ maxWidth: "1000px", margin: "3rem auto 0" }}>
                            <h2 style={{ fontSize: "1.25rem", color: "#0f172a", marginBottom: "1rem", textAlign: "center" }}>
                                Zonas de Cobertura a Domicilio sin Cargo por Traslado
                            </h2>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.75rem" }}>
                                {[
                                    { slug: "polanco", name: "Polanco (I a V Sección)", cp: "C.P. 11510–11560 · Masaryk, Horacio y Miyana" },
                                    { slug: "bosques-de-las-lomas", name: "Bosques de las Lomas", cp: "C.P. 05120 y 11700 · Arcos Bosques y Ahuehuetes" },
                                    { slug: "lomas-de-chapultepec", name: "Lomas de Chapultepec", cp: "C.P. 11000 · Palmas, Reforma y Prado Norte" },
                                    { slug: "santa-fe", name: "Santa Fe y Contadero", cp: "C.P. 01219 y 05348 · Corporativos y La Mexicana" },
                                    { slug: "interlomas", name: "Interlomas y Jesús del Monte", cp: "C.P. 52760–52787 · Magnocentro y Residenciales" },
                                    { slug: "huixquilucan", name: "Huixquilucan y La Herradura", cp: "C.P. 52770–52785 · Bosque Real y Tecamachalco" },
                                    { slug: "pedregal", name: "Jardines del Pedregal y San Ángel", cp: "C.P. 01900 y 01000 · Residencias del Sur CDMX" },
                                    { slug: "coyoacan", name: "Coyoacán y Del Valle", cp: "C.P. 04000–04100 · Centro Histórico y Jardines" },
                                ].map((z) => (
                                    <Link
                                        key={z.slug}
                                        href={`/zonas/${z.slug}`}
                                        className="glass-card"
                                        style={{ padding: "0.95rem 1.1rem", textDecoration: "none", display: "block" }}
                                    >
                                        <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.2rem" }}>
                                            📍 {z.name}
                                        </div>
                                        <div style={{ fontSize: "0.76rem", color: "#475569" }}>{z.cp}</div>
                                    </Link>
                                ))}
                            </div>
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
                        <Link href="/lavado-recurrente-autos-domicilio" style={{ color: "#64748b", textDecoration: "underline" }}>Lavado Recurrente</Link>
                        {" · "}
                        <Link href="/lavado-profundo-vehiculos-cdmx" style={{ color: "#64748b", textDecoration: "underline" }}>Lavado Profundo</Link>
                        {" · "}
                        <Link href="/lavado-profundo-vehiculos-cdmx/paquetes-detallado-automotriz" style={{ color: "#64748b", textDecoration: "underline" }}>Paquetes y Precios</Link>
                        {" · "}
                        <Link href="/lavado-autos-estacionamiento-corporativo" style={{ color: "#64748b", textDecoration: "underline" }}>Estacionamiento Corporativo</Link>
                        {" · "}
                        <Link href="/membresia-doctor-foam" style={{ color: "#64748b", textDecoration: "underline" }}>Membresía</Link>
                        {" · "}
                        <a href="/brochure-doctor-foam.pdf" download="Brochure-Corporativo-Doctor-Foam-2026.pdf" target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb", fontWeight: 700, textDecoration: "underline" }}>📄 Descargar Brochure PDF</a>
                    </p>
                </div>
            </footer>
        </>
    );
}
