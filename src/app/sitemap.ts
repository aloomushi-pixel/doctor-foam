import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://drfoam.com.mx";

    const zones = [
        "polanco",
        "lomas-de-chapultepec",
        "santa-fe",
        "bosques-de-las-lomas",
        "pedregal",
        "interlomas",
        "huixquilucan",
        "coyoacan",
    ];

    const blogPosts = [
        "guia-completa-recubrimiento-ceramico",
        "5-errores-lavado-auto-premium",
        "detallado-interior-profundo-que-incluye",
        "correccion-pintura-swirls-guia",
        "por-que-detallado-domicilio-mejor",
        "mejores-ceras-selladores-mexico",
        "economia-cuidado-automotriz-membresia",
        "lavado-profundo-vs-detallado-automotriz",
    ];

    return [
        // PILAR (Home)
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        // Transactional
        {
            url: `${baseUrl}/reservar`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.95,
        },
        // PISO 2 — Category A: Lavado Recurrente
        {
            url: `${baseUrl}/lavado-recurrente-autos-domicilio`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        // PISO 2 — Category B: Lavado Profundo
        {
            url: `${baseUrl}/lavado-profundo-vehiculos-cdmx`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        // PISO 3 — Sub-pages
        {
            url: `${baseUrl}/membresia-doctor-foam`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.85,
        },
        {
            url: `${baseUrl}/lavado-recurrente-autos-domicilio/que-incluye-mantenimiento`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.75,
        },
        {
            url: `${baseUrl}/lavado-profundo-vehiculos-cdmx/paquetes-detallado-automotriz`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.85,
        },
        {
            url: `${baseUrl}/lavado-profundo-vehiculos-cdmx/diferencias-servicios-detallado`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.75,
        },
        {
            url: `${baseUrl}/lavado-autos-estacionamiento-corporativo`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        // Blog index
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        // Blog posts
        ...blogPosts.map((slug) => ({
            url: `${baseUrl}/blog/${slug}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.7,
        })),
        // Local zones
        ...zones.map((zona) => ({
            url: `${baseUrl}/zonas/${zona}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.9,
        })),
        // Legal
        {
            url: `${baseUrl}/aviso-de-privacidad`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.3,
        },
    ];
}
