/* ═══════════════════════════════════════════════════════
   Configuración centralizada de paquetes Doctor Foam
   Fuente única de verdad para precios, nombres y features.
   ═══════════════════════════════════════════════════════ */

export type PackageConfig = {
    slug: string;
    name: string;
    priceBase: number;       // precio en MXN (pesos)
    priceCentavos: number;   // precio en centavos para Stripe
    label: string;
    description: string;
    features: string[];
    isSubscription?: boolean;
};

export type VehicleSize = {
    value: string;
    label: string;
    coefficient: number;
};

/* ─── Paquetes ─── */
export const PACKAGES: Record<string, PackageConfig> = {
    "deep-interior": {
        slug: "deep-interior",
        name: "Industrial Deep Interior",
        priceBase: 2400,
        priceCentavos: 240000,
        label: "Lavado a base de inyección y extracción",
        description:
            "Lavado a base de inyección y extracción, vapor seco industrial a 180°C, aspirado de alta potencia, hidratación de pieles, sanitización con ozono.",
        features: [
            "Lavado a base de inyección y extracción",
            "Vapor seco industrial a 180°C",
            "Aspirado de alta potencia",
            "Hidratación de pieles Connolly",
            "Sanitización con ozono",
        ],
    },
    "signature-detail": {
        slug: "signature-detail",
        name: "Signature Detail",
        priceBase: 7499,
        priceCentavos: 749900,
        label: "Incluye Industrial Deep Interior completo",
        description:
            "Industrial Deep Interior completo + corrección de pintura en 2 etapas + sellador cerámico express. Técnicos certificados IDA.",
        features: [
            "Industrial Deep Interior completo",
            "Corrección de pintura en 2 etapas",
            "Sellador cerámico express (6 meses)",
            "Sanitización con ozono",
            "Técnicos certificados IDA",
        ],
    },
    "ceramic-coating": {
        slug: "ceramic-coating",
        name: "Ceramic Coating",
        priceBase: 10999,
        priceCentavos: 1099900,
        label: "Protección cerámica profesional",
        description:
            "Signature Detail + recubrimiento cerámico profesional de larga duración + certificado Doctor Foam.",
        features: [
            "Todo lo del Signature Detail",
            "Recubrimiento cerámico profesional",
            "Corrección de pintura en 3 etapas",
            "Certificado Doctor Foam",
            "Seguimiento post-servicio 30 días",
        ],
    },
    "graphene-upgrade": {
        slug: "graphene-upgrade",
        name: "Ceramic + Cristal líquido",
        priceBase: 13999,
        priceCentavos: 1399900,
        label: "Protección de cristal líquido 5-7 años",
        description:
            "Signature Detail + recubrimiento de cristal líquido 5-7 años + PPF en zonas de alto impacto + certificado Doctor Foam.",
        features: [
            "Todo lo del Signature Detail",
            "Recubrimiento de cristal líquido (5-7 años)",
            "PPF en zonas de alto impacto",
            "Certificado Doctor Foam",
            "Seguimiento personalizado 30 días",
        ],
    },
    "foam-maintenance": {
        slug: "foam-maintenance",
        name: "Foam Maintenance",
        priceBase: 1800,
        priceCentavos: 180000,
        label: "Mantenimiento post-servicio",
        description:
            "Foam cannon industrial, descontaminación química, barra de arcilla, sellador UV. Mantenimiento para clientes existentes.",
        features: [
            "Foam cannon industrial de alta presión",
            "Descontaminación química completa",
            "Barra de arcilla profesional",
            "Sellador UV de larga duración",
            "Limpieza de vidrios y rines",
        ],
    },
    membresia: {
        slug: "membresia",
        name: "Membresía Doctor Foam",
        priceBase: 1160,
        priceCentavos: 116000,
        label: "Membresía mensual",
        description:
            "Foam Maintenance bimestral + 10% descuento en cualquier paquete. Por cliente, independientemente del vehículo.",
        features: [
            "Foam Maintenance bimestral incluido",
            "10% descuento en cualquier paquete",
            "Prioridad en agenda",
            "Seguimiento personalizado",
        ],
        isSubscription: true,
    },
};

/* ─── Tamaños de vehículo ─── */
export const VEHICLE_SIZES: VehicleSize[] = [
    { value: "sedan-2filas", label: "Sedán / SUV 2 filas", coefficient: 1.0 },
    { value: "pickup-3filas", label: "Pick Up / SUV 3 filas", coefficient: 1.15 },
];

export const SIZE_COEFFICIENTS: Record<string, number> = Object.fromEntries(
    VEHICLE_SIZES.map((v) => [v.value, v.coefficient])
);

/* ─── Zonas premium ─── */
export const PREMIUM_ZONES = [
    "Bosque Real", "Polanco", "Zona Esmeralda / Atizapán", "Santa Fe / Lomas de Santa Fe",
    "Lomas de Chapultepec", "Pedregal / San Ángel", "Interlomas / Tecamachalco",
    "Metepec / Toluca", "Bosques de las Lomas", "Otra zona (consultar cobertura)",
];

/* ─── Helpers ─── */
export function getPackageBySlug(slug: string): PackageConfig | undefined {
    return PACKAGES[slug];
}

export function calculatePrice(slug: string, vehicleSize: string): number {
    const pkg = PACKAGES[slug];
    if (!pkg) return 0;
    const coeff = SIZE_COEFFICIENTS[vehicleSize] || 1.0;
    return Math.round(pkg.priceCentavos * coeff);
}

export function getVehicleSizeLabel(value: string): string {
    return VEHICLE_SIZES.find((v) => v.value === value)?.label || "Sedán / SUV 2 filas";
}
