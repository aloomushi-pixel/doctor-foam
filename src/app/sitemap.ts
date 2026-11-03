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
        "detallado-movil-grado-clinico-vs-lavado-convencional",
        "innovacion-2025-2026-escaneres-3d-polimeros-auto-regenerables",
        "desnaturalizacion-termica-180c-fin-extraccion-humeda",
        "mitigacion-grabado-lluvia-acida-autos",
        "verdad-recubrimiento-ceramico-9h-autos-premium",
        "detallado-profesional-multiplicador-financiero-vehiculos-lujo",
        "economia-cuidado-automotriz-membresia",
        "lavado-profundo-vs-detallado-automotriz",
        "guia-completa-recubrimiento-ceramico",
        "5-errores-lavado-auto-premium",
        "detallado-interior-profundo-que-incluye",
        "correccion-pintura-swirls-guia",
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
            priority: 0.8,
        },
        ...blogPosts.map((slug) => ({
            url: `${baseUrl}/blog/${slug}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.75,
        })),
        ...zones.map((zona) => ({
            url: `${baseUrl}/zonas/${zona}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.9,
        })),
        {
            url: `${baseUrl}/aviso-de-privacidad`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.3,
        },
    ];
}
