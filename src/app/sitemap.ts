import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://drfoam.com.mx";

    const pillarAndClusterRoutes = [
        { path: "/lavado-recurrente-autos-domicilio", priority: 0.95 },
        { path: "/lavado-recurrente-autos-domicilio/que-incluye-mantenimiento", priority: 0.85 },
        { path: "/membresia-doctor-foam", priority: 0.92 },
        { path: "/lavado-profundo-vehiculos-cdmx", priority: 0.95 },
        { path: "/lavado-profundo-vehiculos-cdmx/paquetes-detallado-automotriz", priority: 0.88 },
        { path: "/lavado-profundo-vehiculos-cdmx/diferencias-servicios-detallado", priority: 0.85 },
        { path: "/lavado-autos-estacionamiento-corporativo", priority: 0.9 },
    ];

    const zones = [
        { slug: "polanco", priority: 0.94, changeFrequency: "weekly" as const },
        { slug: "bosques-de-las-lomas", priority: 0.94, changeFrequency: "weekly" as const },
        { slug: "lomas-de-chapultepec", priority: 0.9, changeFrequency: "monthly" as const },
        { slug: "santa-fe", priority: 0.9, changeFrequency: "monthly" as const },
        { slug: "pedregal", priority: 0.9, changeFrequency: "monthly" as const },
        { slug: "interlomas", priority: 0.9, changeFrequency: "monthly" as const },
        { slug: "huixquilucan", priority: 0.9, changeFrequency: "monthly" as const },
        { slug: "coyoacan", priority: 0.9, changeFrequency: "monthly" as const },
    ];

    // 100% canonical 200-OK blog articles (no 301-redirected legacy slugs)
    const blogPosts = [
        "detallado-movil-grado-clinico-vs-lavado-convencional",
        "innovacion-2025-2026-escaneres-3d-polimeros-auto-regenerables",
        "desnaturalizacion-termica-180c-fin-extraccion-humeda",
        "mitigacion-grabado-lluvia-acida-autos",
        "verdad-recubrimiento-ceramico-9h-autos-premium",
        "detallado-profesional-multiplicador-financiero-vehiculos-lujo",
        "guia-completa-recubrimiento-ceramico",
        "correccion-pintura-swirls-guia",
        "detallado-interior-profundo-que-incluye",
        "5-errores-lavado-auto-premium",
        "por-que-detallado-domicilio-mejor",
        "mejores-ceras-selladores-mexico",
    ];

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${baseUrl}/reservar`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.95,
        },
        ...pillarAndClusterRoutes.map((route) => ({
            url: `${baseUrl}${route.path}`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: route.priority,
        })),
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.85,
        },
        ...blogPosts.map((slug) => ({
            url: `${baseUrl}/blog/${slug}`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.8,
        })),
        ...zones.map((zona) => ({
            url: `${baseUrl}/zonas/${zona.slug}`,
            lastModified: new Date(),
            changeFrequency: zona.changeFrequency,
            priority: zona.priority,
        })),
        {
            url: `${baseUrl}/aviso-de-privacidad`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.3,
        },
    ];
}
