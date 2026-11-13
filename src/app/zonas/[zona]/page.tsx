import type { Metadata } from "next";
import Link from "next/link";

/* ─── Zone Data ─── */
const zonesData: Record<string, {
    name: string;
    fullName: string;
    state: string;
    postalCodes: string;
    description: string;
    neighborhoods: string[];
    metaDesc: string;
    intro: string;
    logistics: string;
    landmarks: string[];
    carBrands: string[];
}> = {
    polanco: {
        name: "Polanco",
        fullName: "Polanco, Alcaldía Miguel Hidalgo",
        state: "Ciudad de México",
        postalCodes: "C.P. 11510, 11520, 11529, 11530, 11540, 11550, 11560",
        description: "La zona más exclusiva de CDMX con la mayor concentración de autos de lujo y corporativos AAA",
        neighborhoods: ["Campos Elíseos", "Polanco I Sección", "Polanco II Sección", "Polanco III Sección", "Polanco IV Sección", "Polanco V Sección", "Granadas (Nuevo Polanco)", "Irrigación"],
        metaDesc: "Lavado de autos a domicilio y detallado automotriz en Polanco y Nuevo Polanco (CP 11510-11560), Miguel Hidalgo CDMX. Unidades 100% autónomas con agua y luz propia.",
        intro: "Polanco es sinónimo de lujo y exclusividad en la Alcaldía Miguel Hidalgo de la Ciudad de México (C.P. 11510 al 11560). Con arterias icónicas como Presidente Masaryk, Campos Elíseos, Horacio, Homero, Rubén Darío y Anatole France, además del corredor corporativo y residencial de Nuevo Polanco (Miyana, Antara, Plaza Carso y Lago Zurich), esta zona concentra algunos de los vehículos más valiosos del país.",
        logistics: "Sabemos que la mayoría de los edificios residenciales en Rubén Darío, Tres Picos y Campos Elíseos, así como los corporativos de Nuevo Polanco (Granadas y Ampliación Granadas), cuentan con estacionamientos subterráneos donde no existen tomas de agua ni se permite escurrimiento. Nuestras unidades móviles ingresan con altura controlada (< 2.05 m) y operan de forma 100% autónoma con generador eléctrico silencioso, tanque de agua desmineralizada y protocolo libre de charcos, cumpliendo con los reglamentos de administración condominial de Miguel Hidalgo.",
        landmarks: ["Av. Presidente Masaryk y Polanquito", "Campos Elíseos y Rubén Darío", "Nuevo Polanco (Miyana / Antara / Carso)", "Parque Lincoln y Emilio Castelar", "Horacio, Homero y Ejercito Nacional"],
        carBrands: ["BMW", "Mercedes-Benz", "Porsche", "Audi", "Range Rover", "Ferrari", "Lamborghini"],
    },
    "lomas-de-chapultepec": {
        name: "Lomas de Chapultepec",
        fullName: "Lomas de Chapultepec, Alcaldía Miguel Hidalgo",
        state: "Ciudad de México",
        postalCodes: "C.P. 11000, 11010, 11910, 11950",
        description: "Residencial diplomático y patrimonial con colecciones privadas de alta gama",
        neighborhoods: ["Lomas Altas", "Lomas Virreyes", "Barrilaco", "Lomas de Bezares", "Prados de la Montaña", "Reforma Social"],
        metaDesc: "Servicio de detallado automotriz premium y lavado de vestiduras a domicilio en Lomas de Chapultepec, Miguel Hidalgo. Equipo industrial autónomo. Doctor Foam México.",
        intro: "Lomas de Chapultepec es la zona residencial más prestigiosa de la Alcaldía Miguel Hidalgo. Sus residencias sobre Paseo de la Reforma, Monte Athos, Prado Norte y Paseo de las Palmas albergan colecciones de vehículos exóticos, clásicos y blindados que exigen un tratamiento clínico sin salir de casa.",
        logistics: "En Lomas de Chapultepec atendemos tanto en cocheras residenciales privadas como en torres corporativas de Palmas y Virreyes. Nuestro personal acude identificado previamente para el registro en caseta o seguridad privada, llevando desinfección por vapor a 180°C, corrección de pintura y recubrimiento cerámico 9H directamente a tu residencia sin requerir agua ni electricidad de tu domicilio.",
        landmarks: ["Paseo de las Palmas", "Prado Norte y Monte Athos", "Paseo de la Reforma Lomas", "Torre Virreyes / Pedregal 24", "Lomas Altas y Bezares"],
        carBrands: ["Mercedes-Benz", "BMW", "Porsche", "Bentley", "Maserati", "Audi"],
    },
    "santa-fe": {
        name: "Santa Fe",
        fullName: "Santa Fe, Álvaro Obregón y Cuajimalpa",
        state: "Ciudad de México",
        postalCodes: "C.P. 01210, 01219, 01376, 05348",
        description: "El principal distrito financiero, corporativo y residencial moderno del poniente de CDMX",
        neighborhoods: ["Centro de Ciudad Santa Fe", "Lomas de Santa Fe", "La Mexicana", "Santa Fe Cuajimalpa", "Contadero", "Cruz Manca"],
        metaDesc: "Detallado automotriz y lavado de autos a domicilio en Santa Fe CDMX. Servicio autónomo en estacionamientos corporativos y torres residenciales. Doctor Foam.",
        intro: "Santa Fe es el corazón financiero y corporativo de la Ciudad de México y hogar de residentes frente al Parque La Mexicana, Club de Golf Bosques y Contadero que valoran cada minuto de su agenda. Nuestro servicio permite detallar tu auto o SUV mientras estás en juntas o descansando en tu departamento.",
        logistics: "Operamos diariamente en sótanos de torres residenciales sobre Av. Santa Fe y Tamaulipas, así como en estacionamientos corporativos de Cruz Manca y Prolongación Paseo de la Reforma. Nuestro sistema Sello ECO ahorra 45% de agua y no deja residuos de jabón en el cajón de estacionamiento, siendo autorizado por administraciones de edificios AAA en Santa Fe.",
        landmarks: ["Av. Vasco de Quiroga y Centro Santa Fe", "Parque La Mexicana y Av. Santa Fe", "Corredor Corporativo Cruz Manca", "Lomas de Santa Fe y Contadero", "Universidad Iberoamericana / Tec Santa Fe"],
        carBrands: ["BMW", "Audi", "Mercedes-Benz", "Volvo", "Porsche", "Tesla"],
    },
    "bosques-de-las-lomas": {
        name: "Bosques de las Lomas",
        fullName: "Bosques de las Lomas, Cuajimalpa y Miguel Hidalgo",
        state: "Ciudad de México",
        postalCodes: "C.P. 05120, 11700, 53950, 52784",
        description: "Privadas residenciales y torres de ultra-lujo al poniente de la Ciudad de México",
        neighborhoods: ["Bosques de las Lomas", "Lomas de Tecamachalco", "La Herradura", "Palo Alto", "Lomas del Chamizal", "Vista Hermosa"],
        metaDesc: "Detallado automotriz a domicilio y lavado profundo de vestiduras en Bosques de las Lomas (CP 05120 / 11700), Tecamachalco y La Herradura. Unidad móvil 100% autónoma.",
        intro: "Bosques de las Lomas (C.P. 05120 y 11700) y sus colonias colindantes como Lomas de Tecamachalco, La Herradura, Lomas del Chamizal y Vista Hermosa concentran flotillas familiares, camionetas blindadas Nivel III a V y deportivos de colección que requieren mantenimiento con pH neutro, agua filtrada y técnica de dos cubetas para evitar micro-rayones (swirls).",
        logistics: "Conocemos la topografía, pendientes y estrictos protocolos de acceso de las privadas y torres residenciales en Paseo de los Tamarindos, Bosques de Reforma, Ahuehuetes Norte y Sur, Paseo de los Laureles y Arcos Bosques. Nuestras unidades están equipadas con mangueras de largo alcance (30 m), generador propio y agua desmineralizada para trabajar en cocheras techadas o sótanos condominiales sin conectar nada a tu casa.",
        landmarks: ["Paseo de los Tamarindos y Arcos Bosques", "Bosques de Reforma y Ahuehuetes", "Lomas de Tecamachalco y Av. de las Fuentes", "La Herradura y Lomas del Chamizal", "Club de Golf Bosques y Paseo de los Laureles"],
        carBrands: ["Range Rover", "BMW", "Mercedes-Benz", "Porsche", "Audi", "Cadillac"],
    },
    pedregal: {
        name: "Pedregal",
        fullName: "Jardines del Pedregal y San Ángel, Coyoacán / Álvaro Obregón",
        state: "Ciudad de México",
        postalCodes: "C.P. 01900, 01000, 01060, 04500",
        description: "Zona residencial icónica del sur de la CDMX con amplias cocheras y residencias patrimoniales",
        neighborhoods: ["Jardines del Pedregal", "Pedregal de San Ángel", "San Ángel Inn", "Tlacopac", "Fuentes del Pedregal", "San Jerónimo Lídice"],
        metaDesc: "Servicio de detallado automotriz premium y lavado de vestiduras a domicilio en Jardines del Pedregal y San Ángel, sur de CDMX. Equipo industrial. Doctor Foam.",
        intro: "Jardines del Pedregal y San Ángel representan la excelencia residencial del sur de la Ciudad de México. Con sus amplias cocheras sobre Av. de las Fuentes, Cráter y Paseos del Pedregal, es el entorno ideal para realizar correcciones de pintura, aplicación de cerámico 9H y sanitización de vestiduras a domicilio.",
        logistics: "Atendemos residencias con acceso controlado en Jardines del Pedregal, San Ángel Inn y San Jerónimo. Nuestro equipo traslada hidrolavadora industrial, compresor de aire, máquina de vapor a 180°C e iluminación de inspección de pintura para dejar cada vehículo en estado de agencia sin que tengas que cruzar el tráfico de Periférico o Insurgentes Sur.",
        landmarks: ["Av. de las Fuentes y Cráter", "Paseos del Pedregal y Perisur", "San Ángel Inn y Altavista", "San Jerónimo Lídice", "Artz Pedregal"],
        carBrands: ["BMW", "Mercedes-Benz", "Audi", "Mini", "Porsche", "Lexus"],
    },
    interlomas: {
        name: "Interlomas",
        fullName: "Interlomas y Jesús del Monte, Huixquilucan",
        state: "Estado de México",
        postalCodes: "C.P. 52760, 52763, 52786, 52787",
        description: "Autolavado premium a domicilio, car wash autónomo y detallado automotriz en torres y privadas de Interlomas",
        neighborhoods: ["Interlomas", "Bosque Real", "Hacienda de las Palmas", "La Estadía", "Villa Florence", "Jesús del Monte", "Paseo Interlomas"],
        metaDesc: "Autolavado en Interlomas a domicilio, car wash premium y detallado automotriz en Hacienda de las Palmas y Bosque Real. Unidad 100% autónoma (agua y luz propia).",
        intro: "Interlomas, Hacienda de las Palmas y Jesús del Monte concentran decenas de torres residenciales y fraccionamientos cerrados donde el cuidado automotriz a domicilio ahorra horas de traslados. Doctor Foam opera rutas diarias en toda la zona de Interlomas.",
        logistics: "Enviamos con anticipación las placas de nuestra unidad móvil y nombres de los técnicos para autorización por QR o caseta en fraccionamientos de Hacienda de las Palmas, Villa Florence y torres sobre Blvd. Interlomas. Trabajamos en tus cajones de estacionamiento con suministro propio de agua y energía.",
        landmarks: ["Blvd. Interlomas y Paseo Interlomas", "Hacienda de las Palmas", "Jesús del Monte y Villa Florence", "Parque Interlomas", "Vialidad de la Barranca"],
        carBrands: ["Audi", "BMW", "Mercedes-Benz", "Porsche", "Toyota / RAV4", "Volkswagen Premium", "Mini"],
    },
    huixquilucan: {
        name: "Huixquilucan",
        fullName: "Huixquilucan (Bosque Real, La Herradura, Lomas Country y Zona Esmeralda)",
        state: "Estado de México",
        postalCodes: "C.P. 52760, 52770, 52774, 52779, 52784, 52785, 52787, 52930",
        description: "Fraccionamientos residenciales, privadas y clubes de golf más exclusivos de Huixquilucan y Estado de México",
        neighborhoods: [
            "Bosque Real",
            "Lomas Country Club",
            "La Herradura",
            "Parques de la Herradura",
            "Balcones de la Herradura",
            "Paseos del Bosque",
            "Jesús del Monte",
            "El Olivo",
            "Zona Esmeralda (Sayavedra / Chiluca)",
            "Club de Golf Bellavista",
        ],
        metaDesc: "Lavado de autos a domicilio y detallado automotriz en Huixquilucan: Bosque Real, La Herradura, Lomas Country Club y Zona Esmeralda (CP 52760-52930). Unidades 100% autónomas.",
        intro: "Huixquilucan alberga los desarrollos residenciales y clubes de golf con mayor seguridad y privacidad del área metropolitana, incluyendo Bosque Real Country Club, Lomas Country Club, La Herradura, Parques de la Herradura, Balcones de la Herradura, Paseos del Bosque, Jesús del Monte, El Olivo y Zona Esmeralda (Chiluca y Condado de Sayavedra). Para los residentes de estas privadas, llevar un vehículo a un taller externo implica perder medio día; Doctor Foam lleva el taller clínico directamente a tu cochera.",
        logistics: "Nuestras unidades móviles están preparadas para recorridos de larga estancia en Bosque Real, Lomas Country Club, La Herradura, Parques de la Herradura, El Olivo y Zona Esmeralda, atendiendo desde 1 vehículo hasta flotillas familiares de 4 o más autos, razers o carritos de golf en una misma visita, con registro previo de código QR en caseta, facturación CFDI y planes de Membresía mensual recurrente ($990/mes Sedán | $1,160/mes SUV + 10% OFF permanente).",
        landmarks: ["Bosque Real Country Club y Av. Bosque Real", "Lomas Country Club y Paseo de las Palmas", "La Herradura, Parques y Balcones de la Herradura", "Jesús del Monte, El Olivo y Paseos del Bosque", "Zona Esmeralda, Chiluca y Condado de Sayavedra"],
        carBrands: ["BMW", "Audi", "Mercedes-Benz", "Porsche", "Range Rover", "Jeep Premium", "Land Rover"],
    },
    coyoacan: {
        name: "Coyoacán Premium",
        fullName: "Coyoacán, Del Valle y Benito Juárez Sur",
        state: "Ciudad de México",
        postalCodes: "C.P. 04000, 04010, 04020, 04100, 04120, 04200, 04310, 04890, 03100, 03810",
        description: "Colonias residenciales arboladas y condominios de alto valor en Coyoacán y Del Valle Sur",
        neighborhoods: [
            "Country Club Churubusco",
            "Del Carmen Coyoacán",
            "Campestre Churubusco",
            "Villa Coyoacán",
            "Chimalistac",
            "Romero de Terreros",
            "Colonia Del Valle (Norte, Centro y Sur)",
            "Nápoles y Ciudad de los Deportes",
            "Jardines de Coyoacán y Paseos de Taxqueña",
            "Copilco Universidad y San Diego Churubusco",
        ],
        metaDesc: "Servicio de detallado automotriz premium y lavado de vestiduras a domicilio en Coyoacán, Country Club, Del Carmen y Del Valle Sur CDMX. Doctor Foam: equipo industrial autónomo.",
        intro: "En Coyoacán y el corredor residencial de Del Valle Sur, colonias arboladas como Del Carmen, Country Club Churubusco, Campestre Churubusco, Chimalistac, Romero de Terreros, Jardines de Coyoacán y Del Valle exponen los vehículos a savia de árboles, polvo orgánico y lluvia ácida que degradan el transparente de la pintura si no se descontamina profesionalmente.",
        logistics: "Nuestro tratamiento a domicilio en Coyoacán y Benito Juárez Sur incluye descontaminación férrica y con barra de arcilla (clay bar), corrección de swirls, selladores hidrofóbicos SiO2 9H y limpieza profunda de vestiduras con vapor seco a 180°C, operando directamente en tu cochera, condominio o estacionamiento subterráneo con nuestro propio suministro de agua desmineralizada y planta de luz.",
        landmarks: ["Country Club y Campestre Churubusco", "Colonia Del Carmen y Centro de Coyoacán", "Chimalistac y Miguel Ángel de Quevedo", "Colonia Del Valle y Nápoles", "Romero de Terreros, Taxqueña y Río Churubusco"],
        carBrands: ["BMW", "Audi", "Mercedes-Benz", "Volkswagen", "Mini", "Volvo", "Porsche"],
    },
};

interface PageProps {
    params: Promise<{ zona: string }>;
}

export async function generateStaticParams() {
    return Object.keys(zonesData).map((zona) => ({ zona }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { zona } = await params;
    const z = zonesData[zona];
    if (!z) return { title: "Zona no encontrada" };

    return {
        title: `Autolavado a Domicilio, Car Wash y Detallado en ${z.name} ($2,400 | -10% Miembros) | Doctor Foam`,
        description: `${z.metaDesc} Vapor 180°C ($2,400), Detailing ($7,499) y Membresía $990/mes (-10% OFF).`,
        alternates: { canonical: `https://drfoam.com.mx/zonas/${zona}` },
        openGraph: {
            title: `Detallado Automotriz a Domicilio en ${z.name} ($2,400 | -10% Miembros)`,
            description: z.metaDesc,
        },
    };
}

export default async function ZonePage({ params }: PageProps) {
    const { zona } = await params;
    const z = zonesData[zona];

    if (!z) {
        return (
            <main style={{ paddingTop: "8rem", textAlign: "center" }}>
                <h1>Zona no encontrada</h1>
                <Link href="/#cobertura" style={{ color: "var(--color-gold-400)" }}>Ver zonas de cobertura</Link>
            </main>
        );
    }

    const localBusinessJsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: `Doctor Foam — Lavado de Autos a Domicilio y Detallado Automotriz en ${z.name}`,
        description: z.metaDesc,
        provider: {
            "@type": "LocalBusiness",
            name: "Doctor Foam México",
            telephone: "+52-56-1084-6022",
            areaServed: {
                "@type": "Place",
                name: `${z.fullName}, ${z.state}`,
            },
        },
        serviceType: "Lavado de autos a domicilio y detallado automotriz",
        url: `https://drfoam.com.mx/zonas/${zona}`,
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `Servicios Doctor Foam en ${z.name}`,
            itemListElement: [
                {
                    "@type": "Offer",
                    itemOffered: { "@type": "Service", name: "Membresía de Lavado Recurrente a Domicilio" },
                    price: "990",
                    priceCurrency: "MXN",
                    url: "https://drfoam.com.mx/membresia-doctor-foam",
                },
                {
                    "@type": "Offer",
                    itemOffered: { "@type": "Service", name: "Industrial Deep Interior (Lavado de Vestiduras y Vapor 180°C)" },
                    price: "2400",
                    priceCurrency: "MXN",
                    url: "https://drfoam.com.mx/lavado-profundo-vehiculos-cdmx",
                },
                {
                    "@type": "Offer",
                    itemOffered: { "@type": "Service", name: "Signature Detail (Corrección de Pintura + Interior)" },
                    price: "7499",
                    priceCurrency: "MXN",
                    url: "https://drfoam.com.mx/lavado-profundo-vehiculos-cdmx/paquetes-detallado-automotriz",
                },
                {
                    "@type": "Offer",
                    itemOffered: { "@type": "Service", name: "Ceramic Coating 9H" },
                    price: "10999",
                    priceCurrency: "MXN",
                    url: "https://drfoam.com.mx/lavado-profundo-vehiculos-cdmx/diferencias-servicios-detallado",
                },
            ],
        },
    };

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Inicio",
                item: "https://drfoam.com.mx/",
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Zonas de Cobertura",
                item: "https://drfoam.com.mx/#cobertura",
            },
            {
                "@type": "ListItem",
                position: 3,
                name: `Detallado a Domicilio en ${z.name}`,
                item: `https://drfoam.com.mx/zonas/${zona}`,
            },
        ],
    };

    const zoneFaqs = [
        {
            q: `¿Necesitan toma de agua o luz en mi estacionamiento en ${z.name}?`,
            a: `No. Nuestras unidades móviles acuden a ${z.fullName} (${z.postalCodes}) de forma 100% autónoma con generador eléctrico propio, tanque de agua filtrada, hidrolavadora industrial y máquina de vapor a 180°C. Podemos trabajar en sótanos condominiales, torres corporativas y cocheras privadas sin conectar nada a tu domicilio.`,
        },
        {
            q: `¿Qué colonias, vialidades y códigos postales de ${z.name} cubre Doctor Foam a domicilio?`,
            a: `Atendemos sin cargo extra por traslado en ${z.neighborhoods.join(", ")} (${z.postalCodes}), incluyendo puntos de referencia como ${z.landmarks.join(", ")}. Enviamos previamente placas de la unidad y nombres de técnicos para acceso rápido por código QR en caseta o recepción.`,
        },
        {
            q: `¿Cuáles son los precios de lavado profundo y detallado automotriz a domicilio en ${z.name}?`,
            a: `En ${z.name} ofrecemos la Membresía de Lavado Recurrente desde $990 MXN/mes, el lavado profundo de vestiduras con vapor a 180°C (Industrial Deep Interior) desde $2,400 MXN, corrección de pintura Signature Detail desde $7,499 MXN y blindaje Ceramic Coating 9H desde $10,999 MXN (IVA incluido y facturación CFDI).`,
        },
    ];

    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: zoneFaqs.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.a,
            },
        })),
    };

    const whatsappHref = `https://wa.me/525610846022?text=${encodeURIComponent(
        `Hola Doctor Foam, estoy en ${z.name} y me gustaría cotizar / agendar un servicio de detallado a domicilio.`
    )}`;

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

            <nav className="navbar navbar-scrolled">
                <div className="navbar-inner">
                    <Link href="/" style={{ textDecoration: "none" }}>
                        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.3rem", color: "#0f172a" }}>
                            DOCTOR <span className="gradient-text">FOAM</span>
                        </span>
                    </Link>
                    <ul className="nav-links">
                        <li><Link href="/lavado-profundo-vehiculos-cdmx">Lavado Profundo</Link></li>
                        <li><Link href="/lavado-profundo-vehiculos-cdmx/paquetes-detallado-automotriz">Paquetes y Precios</Link></li>
                        <li><Link href="/lavado-recurrente-autos-domicilio">Lavado Recurrente</Link></li>
                        <li><Link href="/membresia-doctor-foam">Membresía $990</Link></li>
                    </ul>
                    <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
                        <a
                            href={whatsappHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cta-location={`zone_nav_${zona}_whatsapp`}
                            className="btn-outline"
                            style={{ padding: "0.45rem 0.95rem", fontSize: "0.78rem" }}
                        >
                            💬 WhatsApp
                        </a>
                        <Link href="/reservar" className="btn-premium" style={{ padding: "0.5rem 1.2rem", fontSize: "0.8rem" }}>
                            Agendar Cita
                        </Link>
                    </div>
                </div>
            </nav>

            <main style={{ paddingTop: "4.75rem" }}>
                {/* Hero */}
                <section className="section-padding" style={{ textAlign: "center", paddingTop: "1.25rem", paddingBottom: "1.25rem" }}>
                    <div className="container">
                        <span className="section-label" style={{ marginBottom: "0.4rem" }}>{z.fullName} · {z.postalCodes}</span>
                        <h1 className="section-title" style={{ marginBottom: "0.55rem", fontSize: "clamp(1.55rem, 3.8vw, 2.45rem)" }}>
                            Lavado de Autos a Domicilio y Detallado Automotriz en <span className="gradient-text">{z.name}</span>
                        </h1>
                        <p className="section-subtitle" style={{ maxWidth: "680px", marginBottom: "0.85rem", fontSize: "0.92rem", lineHeight: 1.55 }}>
                            {z.description}. Unidades 100% autónomas con agua purificada por ósmosis inversa y planta eléctrica propia sin cargo por traslado.
                        </p>

                        {/* Primary 0%-Scroll Mobile & Desktop Action Buttons */}
                        <div style={{ display: "flex", gap: "0.6rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "0.85rem" }}>
                            <a
                                href={whatsappHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-cta-location={`zone_hero_${zona}_whatsapp`}
                                className="btn-premium"
                                style={{ background: "linear-gradient(135deg, #16a34a, #15803d)", padding: "0.7rem 1.25rem" }}
                            >
                                💬 Cotizar por WhatsApp en {z.name}
                            </a>
                            <Link href={`/reservar?zona=${encodeURIComponent(z.name)}`} className="btn-premium" style={{ padding: "0.7rem 1.25rem" }}>
                                📅 Agendar en {z.name}
                            </Link>
                            <a
                                href="/brochure-doctor-foam.pdf"
                                download="Brochure-Corporativo-Doctor-Foam-2026.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                data-cta-location={`zone_hero_${zona}_brochure`}
                                className="btn-outline"
                                style={{ borderColor: "rgba(37, 99, 235, 0.35)", color: "#1d4ed8", padding: "0.65rem 1rem", fontSize: "0.82rem" }}
                            >
                                📄 Brochure PDF
                            </a>
                        </div>

                        {/* Above-the-Fold Instant Price Summary, Multilingual Concierge Badge & 1-Tap Colonia Pills */}
                        <div
                            style={{
                                maxWidth: "780px",
                                margin: "0 auto",
                                padding: "0.65rem 0.9rem",
                                borderRadius: "0.85rem",
                                background: "linear-gradient(135deg, rgba(240,253,244,0.95), rgba(239,246,255,0.95))",
                                border: "1px solid rgba(22,163,74,0.3)",
                                fontSize: "0.77rem",
                                color: "#0f172a",
                                lineHeight: 1.5,
                            }}
                        >
                            <div style={{ fontWeight: 800, color: "#15803d", marginBottom: "0.25rem" }}>
                                💰 Interior Vapor 180°C $2,400 ($2,160 Miembro) · Detailing Completo $7,499 · Membresía $990/mes (+10% OFF fijo)
                            </div>
                            <div style={{ fontSize: "0.71rem", color: "#334155", fontWeight: 600, marginBottom: "0.35rem" }}>
                                ✅ Acceso con registro QR en caseta · Factura CFDI · Concierge ES / EN / FR
                            </div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", justifyContent: "center", alignItems: "center" }}>
                                <span style={{ fontSize: "0.71rem", fontWeight: 700, color: "#334155" }}>📍 Toca tu colonia:</span>
                                {z.neighborhoods.map((col, idx) => (
                                    <a
                                        key={idx}
                                        href={`https://wa.me/525610846022?text=${encodeURIComponent(`Hola Doctor Foam, estoy en ${col} (${z.name}) y quiero cotizar un lavado / detallado a domicilio.`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        data-cta-location={`zone_hero_pill_${zona}_${idx}`}
                                        style={{
                                            display: "inline-block",
                                            padding: "0.2rem 0.58rem",
                                            borderRadius: "999px",
                                            background: "#ffffff",
                                            border: "1px solid #86efac",
                                            color: "#14532d",
                                            fontSize: "0.71rem",
                                            fontWeight: 700,
                                            textDecoration: "none",
                                        }}
                                    >
                                        {col} 💬
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Above-the-Fold Quick Package & 1-Tap WhatsApp Strip */}
                <section style={{ paddingBottom: "2.5rem" }}>
                    <div className="container" style={{ maxWidth: "980px" }}>
                        <div style={{ background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "1rem", padding: "1.15rem 1.25rem", boxShadow: "0 8px 24px rgba(15, 23, 42, 0.05)" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.85rem" }}>
                                <span style={{ fontSize: "0.78rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: "#0f172a" }}>
                                    ⚡ Precios 2026 con Traslado Incluido en {z.name} (Cotiza o Reserva en 1 Clic)
                                </span>
                                <span style={{ fontSize: "0.75rem", color: "#15803d", fontWeight: 700 }}>
                                    ✅ Agua filtrada y generador propio · IVA y CFDI
                                </span>
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(215px, 1fr))", gap: "0.75rem" }}>
                                {[
                                    { name: "Industrial Deep Interior", slug: "deep-interior", price: "$2,400 MXN", memberPrice: "Miembro (-10%): $2,160 MXN", suvPrice: "SUV: $2,680 MXN", desc: "Vestiduras, vapor 180°C, piel y ozono (3-4 hrs)", badge: "Paso 1 · Más Solicitado" },
                                    { name: "Signature Detail", slug: "signature-detail", price: "$7,499 MXN", memberPrice: "Miembro (-10%): $6,749 MXN", suvPrice: "Corrección + Interior", desc: "Corrección pintura 95% swirls + Interior (5-6 hrs)", badge: "Renovación Total" },
                                    { name: "Ceramic Coating 9H", slug: "ceramic-coating", price: "$10,999 MXN", memberPrice: "Miembro (-10%): $9,899 MXN", suvPrice: "Blindaje SiO2 9H", desc: "Protección 3-5 años + Corrección óptica (8-10 hrs)", badge: "3-5 Años Garantía" },
                                    { name: "Membresía de Seguimiento", slug: "deep-interior", price: "$990 / mes", memberPrice: "Activa 10% OFF permanente", suvPrice: "SUV: $1,160 / mes", desc: "Se activa tras tu 1er lavado profundo (+10% OFF fijo)", badge: "Paso 2 · Seguimiento" },
                                ].map((pkg, idx) => (
                                    <div key={idx} style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "0.75rem", padding: "0.9rem 1rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                        <div>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.35rem", marginBottom: "0.2rem" }}>
                                                <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "#2563eb", textTransform: "uppercase" }}>{pkg.badge}</span>
                                                <span style={{ fontSize: "0.95rem", fontWeight: 800, color: "#0f172a" }}>{pkg.price}</span>
                                            </div>
                                            <div style={{ fontSize: "0.71rem", color: "#15803d", fontWeight: 700, marginBottom: "0.15rem" }}>🔄 {pkg.memberPrice}</div>
                                            <div style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 600, marginBottom: "0.2rem" }}>{pkg.suvPrice}</div>
                                            <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#0f172a", marginBottom: "0.2rem" }}>{pkg.name}</div>
                                            <div style={{ fontSize: "0.76rem", color: "#475569", marginBottom: "0.65rem" }}>{pkg.desc}</div>
                                        </div>
                                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem" }}>
                                            <a
                                                href={`https://wa.me/525610846022?text=${encodeURIComponent(`Hola Doctor Foam, estoy en ${z.name} y me interesa cotizar / agendar el paquete ${pkg.name} (${pkg.price}) a domicilio.`)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                data-cta-location={`zone_quick_strip_${zona}_${idx}`}
                                                style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "44px", textAlign: "center", padding: "0.5rem 0.45rem", borderRadius: "0.5rem", background: "#f0fdf4", border: "1px solid #86efac", color: "#15803d", fontWeight: 700, fontSize: "0.76rem", textDecoration: "none" }}
                                            >
                                                💬 WhatsApp
                                            </a>
                                            <Link
                                                href={`/reservar?paquete=${pkg.slug}&zona=${encodeURIComponent(z.name)}`}
                                                style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "44px", textAlign: "center", padding: "0.5rem 0.45rem", borderRadius: "0.5rem", background: "#eff6ff", border: "1px solid #bfdbfe", color: "#1d4ed8", fontWeight: 700, fontSize: "0.76rem", textDecoration: "none" }}
                                            >
                                                📅 Reservar
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Intro + Local Logistics */}
                <section className="section-padding" style={{ paddingTop: 0 }}>
                    <div className="container" style={{ maxWidth: "850px" }}>
                        <div className="glass-card" style={{ padding: "2.5rem" }}>
                            <h2 style={{ fontSize: "1.35rem", marginBottom: "1rem", color: "#0f172a" }}>
                                Operación Autónoma a Domicilio en {z.fullName}
                            </h2>
                            <p style={{ color: "#334155", fontSize: "1.02rem", lineHeight: "1.85", marginBottom: "1.25rem" }}>
                                {z.intro}
                            </p>
                            <p style={{ color: "#334155", fontSize: "1.02rem", lineHeight: "1.85", marginBottom: "1.5rem" }}>
                                {z.logistics}
                            </p>
                            <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "1.25rem" }}>
                                <div style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#2563eb", marginBottom: "0.65rem" }}>
                                    📍 Corredores, Vialidades y Puntos Clave en {z.name} ({z.postalCodes}) — Toca para Cotizar:
                                </div>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.25rem" }}>
                                    {z.landmarks.map((lm, i) => (
                                        <a
                                            key={i}
                                            href={`https://wa.me/525610846022?text=${encodeURIComponent(`Hola Doctor Foam, estoy cerca de ${lm} (${z.name}) y quiero cotizar / agendar un servicio a domicilio.`)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            data-cta-location={`zone_landmark_${zona}_${i}`}
                                            style={{
                                                fontSize: "0.8rem",
                                                padding: "0.38rem 0.85rem",
                                                borderRadius: "2rem",
                                                background: "#f0fdf4",
                                                border: "1px solid #86efac",
                                                color: "#14532d",
                                                fontWeight: 700,
                                                textDecoration: "none",
                                            }}
                                        >
                                            📍 {lm} 💬
                                        </a>
                                    ))}
                                </div>

                                {/* 47%-Scroll Conversion Bar inside Local Logistics Card */}
                                <div
                                    style={{
                                        padding: "0.95rem 1.15rem",
                                        borderRadius: "0.85rem",
                                        background: "linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)",
                                        border: "1px solid #93c5fd",
                                        display: "flex",
                                        flexWrap: "wrap",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        gap: "0.75rem",
                                    }}
                                >
                                    <div style={{ fontSize: "0.82rem", color: "#0f172a", fontWeight: 700 }}>
                                        🪪 ¿Tu privada o torre en {z.name} pide QR o placas en caseta? Enviamos datos de la unidad al agendar:
                                    </div>
                                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                                        <a
                                            href={`https://wa.me/525610846022?text=${encodeURIComponent(`Hola Doctor Foam, estoy en ${z.name} y quiero agendar a domicilio (solicito datos de unidad para acceso en caseta).`)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            data-cta-location={`zone_logistics_bar_${zona}_whatsapp`}
                                            style={{
                                                padding: "0.48rem 0.95rem",
                                                borderRadius: "0.55rem",
                                                background: "#16a34a",
                                                color: "#ffffff",
                                                fontSize: "0.78rem",
                                                fontWeight: 700,
                                                textDecoration: "none",
                                            }}
                                        >
                                            💬 Cotizar por WhatsApp en {z.name}
                                        </a>
                                        <Link
                                            href={`/reservar?zona=${encodeURIComponent(z.name)}`}
                                            style={{
                                                padding: "0.48rem 0.95rem",
                                                borderRadius: "0.55rem",
                                                background: "#2563eb",
                                                color: "#ffffff",
                                                fontSize: "0.78rem",
                                                fontWeight: 700,
                                                textDecoration: "none",
                                            }}
                                        >
                                            📅 Reservar en Línea
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Neighborhoods — Interactive 1-Click Colonia WhatsApp Quote Cards */}
                <section className="section-padding" style={{ paddingTop: 0 }}>
                    <div className="container" style={{ maxWidth: "860px" }}>
                        <h2 style={{ fontSize: "1.5rem", marginBottom: "0.45rem", textAlign: "center" }}>
                            Colonias y Fraccionamientos que Atendemos en {z.name}
                        </h2>
                        <p style={{ textAlign: "center", color: "#475569", fontSize: "0.86rem", marginBottom: "1.35rem" }}>
                            Selecciona tu colonia para confirmar disponibilidad inmediata por WhatsApp (traslado y unidad autónoma incluidos):
                        </p>
                        <div className="zones-grid">
                            {z.neighborhoods.map((n, i) => (
                                <a
                                    key={i}
                                    href={`https://wa.me/525610846022?text=${encodeURIComponent(`Hola Doctor Foam, estoy en la colonia ${n} (${z.name}) y me gustaría cotizar / agendar un servicio a domicilio.`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-cta-location={`zone_colonia_${zona}_${i}`}
                                    className="glass-card"
                                    style={{ padding: "0.95rem 1.25rem", textAlign: "center", textDecoration: "none", display: "flex", flexDirection: "column", gap: "0.3rem", alignItems: "center", justifyContent: "center" }}
                                >
                                    <span style={{ color: "#0f172a", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "0.92rem" }}>
                                        📍 {n}
                                    </span>
                                    <span style={{ color: "#15803d", fontSize: "0.74rem", fontWeight: 700 }}>
                                        💬 Cotizar en {n} →
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Car brands — Interactive 1-Tap Brand Quote Pills */}
                <section className="section-padding" style={{ paddingTop: 0 }}>
                    <div className="container" style={{ maxWidth: "800px", textAlign: "center" }}>
                        <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                            Marcas que Detallamos en {z.name}
                        </h2>
                        <p style={{ color: "#475569", fontSize: "0.85rem", marginBottom: "1.15rem" }}>
                            Toca la marca de tu auto o SUV para recibir cotización exacta en {z.name}:
                        </p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center" }}>
                            {z.carBrands.map((b, i) => (
                                <a
                                    key={i}
                                    href={`https://wa.me/525610846022?text=${encodeURIComponent(`Hola Doctor Foam, tengo un ${b} en ${z.name} y quiero cotizar un servicio de detallado a domicilio.`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-cta-location={`zone_brand_${zona}_${i}`}
                                    className="zone-tag zone-tag-gold"
                                    style={{ fontSize: "0.85rem", padding: "0.45rem 1rem", textDecoration: "none", cursor: "pointer" }}
                                >
                                    🚗 {b} · 💬 Cotizar
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Services preview linked to the 4 SEO Pillars */}
                <section className="section-padding" style={{ paddingTop: 0 }}>
                    <div className="container" style={{ maxWidth: "900px" }}>
                        <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", textAlign: "center" }}>
                            Servicios a Domicilio Disponibles en {z.name}
                        </h2>
                        <div className="services-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))" }}>
                            {[
                                { icon: "🧽", title: "Lavado Recurrente", price: "Desde $990/mes", member: "+10% OFF en paquetes", desc: "Seguimiento periódico post-lavado profundo con método 2 cubetas", href: "/lavado-recurrente-autos-domicilio", slug: "membership-sedan" },
                                { icon: "🪑", title: "Industrial Deep Interior", price: "$2,400 MXN", member: "$2,160 Miembro (-10%)", desc: "Lavado de vestiduras, vapor a 180°C, pieles y ozono", href: "/lavado-profundo-vehiculos-cdmx", slug: "deep-interior" },
                                { icon: "💎", title: "Signature Detail + Motor", price: "$7,499 MXN", member: "$6,749 Miembro (-10%)", desc: "Corrección de pintura (95% swirls) + interior + motor", href: "/lavado-profundo-vehiculos-cdmx/paquetes-detallado-automotriz", slug: "signature-detail" },
                                { icon: "🛡️", title: "Ceramic Coating 9H", price: "$10,999 MXN", member: "$9,899 Miembro (-10%)", desc: "Blindaje cerámico de 3 a 5 años con certificado", href: "/lavado-profundo-vehiculos-cdmx/diferencias-servicios-detallado", slug: "ceramic-coating" },
                            ].map((s, i) => (
                                <div key={i} className="glass-card" style={{ padding: "1.4rem", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                    <div>
                                        <div style={{ fontSize: "2rem", marginBottom: "0.6rem" }}>{s.icon}</div>
                                        <h3 style={{ fontSize: "0.98rem", marginBottom: "0.3rem", color: "#0f172a" }}>
                                            <Link href={s.href} style={{ color: "#0f172a", textDecoration: "none" }}>{s.title}</Link>
                                        </h3>
                                        <p style={{ color: "#475569", fontSize: "0.78rem", marginBottom: "0.5rem", lineHeight: "1.45" }}>{s.desc}</p>
                                        <span className="gradient-text" style={{ fontWeight: 800, fontFamily: "var(--font-heading)", display: "block", fontSize: "1.1rem" }}>{s.price}</span>
                                        <span style={{ color: "#15803d", fontSize: "0.72rem", fontWeight: 700, display: "block", marginBottom: "0.65rem" }}>✨ {s.member}</span>
                                    </div>
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.35rem" }}>
                                        <a
                                            href={`https://wa.me/525610846022?text=${encodeURIComponent(`Hola Doctor Foam, estoy en ${z.name} y quiero cotizar ${s.title} (${s.price}) a domicilio.`)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            data-cta-location={`zone_services_card_${zona}_${i}_whatsapp`}
                                            style={{ padding: "0.38rem 0.3rem", borderRadius: "0.45rem", background: "#16a34a", color: "#ffffff", fontSize: "0.72rem", fontWeight: 700, textDecoration: "none" }}
                                        >
                                            💬 WhatsApp
                                        </a>
                                        <Link
                                            href={`/reservar?paquete=${s.slug}&zona=${encodeURIComponent(z.name)}`}
                                            style={{ padding: "0.38rem 0.3rem", borderRadius: "0.45rem", background: "#eff6ff", border: "1px solid #bfdbfe", color: "#1d4ed8", fontSize: "0.72rem", fontWeight: 700, textDecoration: "none" }}
                                        >
                                            📅 Reservar
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ marginTop: "1.25rem", textAlign: "center", fontSize: "0.85rem", color: "#475569" }}>
                            ¿Atendemos estacionamientos residenciales y corporativos en {z.name}? Sí — conoce nuestro{" "}
                            <Link href="/lavado-autos-estacionamiento-corporativo" style={{ color: "#2563eb", fontWeight: 700, textDecoration: "underline" }}>
                                servicio en estacionamiento corporativo
                            </Link>{" "}
                            y la{" "}
                            <Link href="/membresia-doctor-foam" style={{ color: "#2563eb", fontWeight: 700, textDecoration: "underline" }}>
                                Membresía Doctor Foam
                            </Link>.
                        </div>
                    </div>
                </section>

                {/* Local FAQ Section */}
                <section className="section-padding" style={{ paddingTop: 0 }}>
                    <div className="container" style={{ maxWidth: "850px" }}>
                        <h2 style={{ fontSize: "1.45rem", marginBottom: "1.25rem", textAlign: "center", color: "#0f172a" }}>
                            Preguntas Frecuentes sobre Servicio a Domicilio en {z.name}
                        </h2>
                        <div style={{ display: "grid", gap: "1rem" }}>
                            {zoneFaqs.map((item, idx) => (
                                <div key={idx} className="glass-card" style={{ padding: "1.5rem" }}>
                                    <h3 style={{ fontSize: "1.02rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.5rem" }}>
                                        {item.q}
                                    </h3>
                                    <p style={{ color: "#334155", fontSize: "0.92rem", lineHeight: "1.7", margin: "0 0 0.85rem" }}>
                                        {item.a}
                                    </p>
                                    <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
                                        <a
                                            href={`https://wa.me/525610846022?text=${encodeURIComponent(`Hola Doctor Foam, estoy en ${z.name}, leí sobre "${item.q}" y quiero cotizar un servicio a domicilio.`)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            data-cta-location={`zone_faq_${zona}_${idx + 1}_whatsapp`}
                                            style={{
                                                display: "inline-flex",
                                                alignItems: "center",
                                                gap: "0.3rem",
                                                padding: "0.4rem 0.85rem",
                                                borderRadius: "0.5rem",
                                                background: "#16a34a",
                                                color: "#ffffff",
                                                fontSize: "0.78rem",
                                                fontWeight: 700,
                                                textDecoration: "none",
                                            }}
                                        >
                                            💬 Cotizar en {z.name}
                                        </a>
                                        <Link
                                            href={`/reservar?zona=${encodeURIComponent(z.name)}`}
                                            style={{
                                                display: "inline-flex",
                                                alignItems: "center",
                                                gap: "0.3rem",
                                                padding: "0.4rem 0.85rem",
                                                borderRadius: "0.5rem",
                                                background: "rgba(37,99,235,0.08)",
                                                border: "1px solid rgba(37,99,235,0.25)",
                                                color: "#1d4ed8",
                                                fontSize: "0.78rem",
                                                fontWeight: 700,
                                                textDecoration: "none",
                                            }}
                                        >
                                            📅 Agendar en {z.name}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="section-padding" style={{ textAlign: "center" }}>
                    <div className="container" style={{ maxWidth: "650px" }}>
                        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
                            ¿Estás en <span className="gradient-text">{z.name}</span>?
                        </h2>
                        <p style={{ color: "#475569", marginBottom: "2rem" }}>
                            Agenda tu cita en línea o cotiza directo por WhatsApp y lleva la experiencia Doctor Foam a la puerta de tu casa u oficina en {z.name}.
                        </p>
                        <div style={{ display: "flex", gap: "0.85rem", justifyContent: "center", flexWrap: "wrap" }}>
                            <Link
                                href={`/reservar?zona=${encodeURIComponent(z.name)}`}
                                className="btn-premium"
                            >
                                📅 Agendar en {z.name}
                            </Link>
                            <a
                                href={whatsappHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-cta-location={`zone_bottom_${zona}_whatsapp`}
                                className="btn-outline"
                            >
                                💬 WhatsApp Directo ({z.name})
                            </a>
                        </div>
                    </div>
                </section>

                {/* Other zones — Descriptive Local Hub Cards */}
                <section className="section-padding" style={{ paddingTop: 0 }}>
                    <div className="container" style={{ maxWidth: "900px" }}>
                        <h2 style={{ fontSize: "1.35rem", marginBottom: "0.5rem", color: "#0f172a", textAlign: "center" }}>
                            Rutas Diarias y Cobertura en Otras Zonas de CDMX y Edomex
                        </h2>
                        <p style={{ fontSize: "0.88rem", color: "#475569", textAlign: "center", marginBottom: "1.35rem" }}>
                            Además de {z.name}, nuestras unidades autónomas operan todos los días en:
                        </p>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "0.85rem" }}>
                            {Object.entries(zonesData)
                                .filter(([key]) => key !== zona)
                                .map(([key, val]) => (
                                    <Link
                                        key={key}
                                        href={`/zonas/${key}`}
                                        className="glass-card"
                                        style={{ textDecoration: "none", padding: "1rem 1.15rem", display: "block", border: "1px solid #e2e8f0" }}
                                    >
                                        <div style={{ fontWeight: 700, fontSize: "0.92rem", color: "#0f172a", marginBottom: "0.2rem" }}>
                                            📍 Detallado en {val.name}
                                        </div>
                                        <div style={{ fontSize: "0.75rem", color: "#475569", lineHeight: "1.45", marginBottom: "0.35rem" }}>
                                            {val.fullName} ({val.postalCodes})
                                        </div>
                                        <span style={{ fontSize: "0.75rem", color: "#2563eb", fontWeight: 700 }}>
                                            Ver cobertura en {val.name} →
                                        </span>
                                    </Link>
                                ))}
                        </div>

                        {/* Final 100%-Scroll Direct Action Card */}
                        <div
                            style={{
                                marginTop: "2.25rem",
                                padding: "1.35rem 1.5rem",
                                borderRadius: "1rem",
                                background: "linear-gradient(135deg, #f0fdf4 0%, #eff6ff 100%)",
                                border: "1px solid #86efac",
                                display: "flex",
                                flexWrap: "wrap",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: "1rem",
                            }}
                        >
                            <div style={{ flex: "1 1 280px" }}>
                                <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#15803d", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                    ✅ Cobertura Directa en {z.name} ({z.postalCodes})
                                </div>
                                <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a", marginTop: "0.15rem" }}>
                                    ¿Listo para detallar tu auto sin salir de casa u oficina en {z.name}?
                                </div>
                                <div style={{ fontSize: "0.82rem", color: "#475569", marginTop: "0.2rem" }}>
                                    Recuerda: al contratar tu primer Lavado Profundo desde $2,400 MXN habilitas la Membresía de Seguimiento ($990/mes + 10% OFF permanente).
                                </div>
                            </div>
                            <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", alignItems: "center" }}>
                                <a
                                    href={whatsappHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-cta-location={`zone_footer_banner_${zona}_whatsapp`}
                                    className="btn-premium"
                                    style={{ background: "linear-gradient(135deg, #16a34a, #15803d)", padding: "0.65rem 1.15rem", fontSize: "0.84rem" }}
                                >
                                    💬 Cotizar por WhatsApp
                                </a>
                                <Link
                                    href={`/reservar?zona=${encodeURIComponent(z.name)}`}
                                    className="btn-premium"
                                    style={{ padding: "0.65rem 1.15rem", fontSize: "0.84rem" }}
                                >
                                    📅 Cotizador Online
                                </Link>
                                <a
                                    href="/brochure-doctor-foam.pdf"
                                    download="Brochure-Corporativo-Doctor-Foam-2026.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-outline"
                                    style={{ padding: "0.6rem 1rem", fontSize: "0.82rem", background: "#ffffff" }}
                                >
                                    📄 Brochure PDF
                                </a>
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
