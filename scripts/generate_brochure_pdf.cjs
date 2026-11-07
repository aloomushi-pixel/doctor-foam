const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const sharp = require("sharp");

const ROOT = path.resolve(__dirname, "..");
const PUBLIC_DIR = path.join(ROOT, "public");
const OUTPUT_PDF = path.join(PUBLIC_DIR, "brochure-doctor-foam.pdf");
const TEMP_HTML = path.join(ROOT, "scripts", "_temp_brochure.html");

async function toDataUri(relPath, maxWidth = 1100, quality = 84) {
    const fullPath = path.join(PUBLIC_DIR, relPath);
    const buf = await sharp(fullPath)
        .resize({ width: maxWidth, withoutEnlargement: true })
        .jpeg({ quality, mozjpeg: true })
        .toBuffer();
    return `data:image/jpeg;base64,${buf.toString("base64")}`;
}

async function main() {
const imgHeroCover = await toDataUri("seo/hero-membresia.png", 1200, 86);
const imgRecurrente = await toDataUri("seo/hero-recurrente.png", 800, 82);
const imgInteriorMain = await toDataUri("services/deep-interior.jpg", 1000, 84);
const imgInteriorSub = await toDataUri("blog/detallado-interior-profundo-que-incluye-inner-1.png", 900, 82);
const imgExteriorMain = await toDataUri("services/signature-detail.jpg", 1000, 84);
const imgBeforeAfter = await toDataUri("seo/antes-despues.png", 900, 84);
const imgCeramicMain = await toDataUri("services/ceramic-coating.jpg", 900, 84);
const imgCeramicBeads = await toDataUri("blog/verdad-recubrimiento-ceramico-9h-autos-premium.png", 800, 82);
const imgStudioOverhead = await toDataUri("seo/hero-profundo.png", 800, 82);

const html = `<!DOCTYPE html>
<html lang="es-MX">
<head>
<meta charset="UTF-8" />
<title>Brochure Corporativo 2026 — Doctor Foam México</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@600;700;800;900&display=swap');

  @page {
    size: A4 portrait;
    margin: 0;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #0f172a;
    color: #0f172a;
    line-height: 1.45;
  }

  h1, h2, h3, h4, .heading {
    font-family: 'Outfit', 'Inter', sans-serif;
  }

  .page {
    width: 210mm;
    height: 297mm;
    position: relative;
    overflow: hidden;
    page-break-after: always;
    break-after: page;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .page:last-child {
    page-break-after: auto;
    break-after: auto;
  }

  .page-dark {
    background: linear-gradient(155deg, #060b16 0%, #0f172a 55%, #111c38 100%);
    color: #f8fafc;
  }

  a {
    text-decoration: none;
  }

  /* Header Bar */
  .top-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 32px;
    border-bottom: 1px solid rgba(148, 163, 184, 0.2);
  }

  .top-bar-light {
    background: #0f172a;
    color: #ffffff;
    padding: 14px 32px;
  }

  .brand-logo {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .brand-title {
    font-family: 'Outfit', sans-serif;
    font-weight: 900;
    font-size: 19px;
    letter-spacing: 0.1em;
    color: #ffffff;
  }

  .brand-title span {
    background: linear-gradient(135deg, #38bdf8, #2563eb);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .brand-sub {
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    color: #94a3b8;
    font-weight: 600;
  }

  .page-badge {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    padding: 5px 12px;
    border-radius: 999px;
    background: rgba(37, 99, 235, 0.18);
    color: #60a5fa;
    border: 1px solid rgba(96, 165, 250, 0.35);
  }

  /* Buttons */
  .btn {
    display: inline-block;
    padding: 10px 18px;
    border-radius: 8px;
    font-family: 'Outfit', sans-serif;
    font-weight: 700;
    font-size: 11.5px;
    letter-spacing: 0.02em;
    text-align: center;
  }

  .btn-blue {
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    color: #ffffff !important;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.35);
  }

  .btn-green {
    background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
    color: #ffffff !important;
    box-shadow: 0 4px 12px rgba(22, 163, 74, 0.3);
  }

  .btn-outline-dark {
    background: rgba(255, 255, 255, 0.08);
    color: #f8fafc !important;
    border: 1px solid rgba(148, 163, 184, 0.4);
  }

  .btn-outline-light {
    background: #f8fafc;
    color: #0f172a !important;
    border: 1.5px solid #cbd5e1;
  }

  .page-footer {
    padding: 12px 32px;
    background: #0f172a;
    color: #cbd5e1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 10px;
    border-top: 2px solid #2563eb;
  }

  .page-footer a {
    color: #60a5fa;
    font-weight: 700;
  }

  .pill {
    display: inline-block;
    font-size: 9.5px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: 4px 10px;
    border-radius: 999px;
    background: #eff6ff;
    color: #1d4ed8;
    border: 1px solid #bfdbfe;
    margin-bottom: 6px;
  }

  .card {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 14px 16px;
  }

  .check-list {
    list-style: none;
  }

  .check-list li {
    position: relative;
    padding-left: 18px;
    margin-bottom: 6px;
    font-size: 11px;
    color: #334155;
  }

  .check-list li::before {
    content: "✓";
    position: absolute;
    left: 0;
    top: 0;
    color: #2563eb;
    font-weight: 800;
  }
</style>
</head>
<body>

<!-- ==================== PAGE 1: PORTADA CORPORATIVA ==================== -->
<div class="page page-dark">
  <div>
    <div class="top-bar">
      <div class="brand-logo">
        <div style="width:34px;height:34px;border-radius:50%;border:2px solid #38bdf8;display:flex;align-items:center;justify-content:center;background:rgba(37,99,235,0.18);font-weight:900;color:#60a5fa;font-size:13px;">DF</div>
        <div>
          <div class="brand-title">DOCTOR <span>FOAM</span></div>
          <div class="brand-sub">Estética y Bioseguridad Automotriz a Domicilio · CDMX</div>
        </div>
      </div>
      <div class="page-badge">Dossier Corporativo &amp; Catálogo 2026</div>
    </div>

    <!-- Hero Cover Image -->
    <div style="padding: 20px 32px 0;">
      <div style="position:relative;height:235px;border-radius:16px;overflow:hidden;border:1px solid rgba(96,165,250,0.35);box-shadow:0 16px 36px rgba(0,0,0,0.45);">
        <img src="${imgHeroCover}" style="width:100%;height:100%;object-fit:cover;object-position:center;" />
        <div style="position:absolute;inset:0;background:linear-gradient(90deg, rgba(6,11,22,0.88) 0%, rgba(6,11,22,0.45) 55%, rgba(6,11,22,0.15) 100%);display:flex;flex-direction:column;justify-content:flex-end;padding:24px;">
          <span style="display:inline-block;width:fit-content;padding:4px 11px;border-radius:999px;background:rgba(37,99,235,0.85);color:#fff;font-size:9.5px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:8px;">
            Unidades Móviles 100% Autónomas · Agua Purificada RO y Luz Propia
          </span>
          <h1 style="font-size:28px;line-height:1.12;font-weight:900;color:#ffffff;max-width:520px;margin-bottom:6px;">
            El Quirófano Móvil para la Preservación de tu Vehículo
          </h1>
          <p style="font-size:12px;color:#cbd5e1;max-width:490px;">
            Intervención clínica a domicilio u oficina en CDMX y Zona Esmeralda: Lavado Interior con Vapor Seco a 180°C, Lavado Exterior Anti-Swirls con Corrección Óptica y Blindaje Nanocerámico 9H.
          </p>
        </div>
      </div>
    </div>

    <!-- 3 Core Pillars Summary -->
    <div style="padding: 18px 32px 0;">
      <div style="font-size:10.5px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#60a5fa;margin-bottom:10px;">
        Nuestras 3 Especialidades Principales (Haz clic en cualquier servicio para cotizar o reservar)
      </div>
      <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:12px;">
        <!-- Pilar 1 -->
        <div style="background:rgba(30,41,59,0.75);border:1px solid rgba(96,165,250,0.28);border-radius:12px;padding:14px;display:flex;flex-direction:column;justify-content:space-between;">
          <div>
            <div style="font-size:10px;font-weight:800;color:#38bdf8;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px;">01 · Bioseguridad en Cabina</div>
            <h3 style="font-size:15px;color:#ffffff;margin-bottom:6px;">Lavado Interior Profundo (180°C)</h3>
            <p style="font-size:10.8px;color:#cbd5e1;margin-bottom:10px;">
              Desnaturalización térmica con vapor seco a 180°C (solo 5% humedad), hidratación de piel Nappa, ductos A/C y sanitización con ozono médico. Seco en &lt;60 min.
            </p>
          </div>
          <div>
            <div style="font-size:15px;font-weight:800;color:#60a5fa;margin-bottom:6px;">$2,400 MXN <span style="font-size:9.5px;color:#94a3b8;font-weight:500;">IVA incl.</span></div>
            <a href="https://drfoam.com.mx/reservar?package=deep-interior&utm_source=brochure_pdf" class="btn btn-blue" style="width:100%;padding:7px 10px;font-size:10.5px;">🔒 Reservar Interior →</a>
          </div>
        </div>

        <!-- Pilar 2 -->
        <div style="background:rgba(30,41,59,0.75);border:1.5px solid #3b82f6;border-radius:12px;padding:14px;display:flex;flex-direction:column;justify-content:space-between;">
          <div>
            <div style="font-size:10px;font-weight:800;color:#60a5fa;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px;">02 · Exterior y Corrección</div>
            <h3 style="font-size:15px;color:#ffffff;margin-bottom:6px;">Lavado Exterior &amp; Anti-Swirls</h3>
            <p style="font-size:10.8px;color:#cbd5e1;margin-bottom:10px;">
              Lavado clínico con agua por Ósmosis Inversa (0 PPM), espuma activa pH neutro y corrección de pintura de 2 a 3 etapas que elimina 85–95% de micro-rayones.
            </p>
          </div>
          <div>
            <div style="font-size:15px;font-weight:800;color:#60a5fa;margin-bottom:6px;">$1,599 / $7,499 MXN</div>
            <a href="https://drfoam.com.mx/reservar?package=signature-detail&utm_source=brochure_pdf" class="btn btn-blue" style="width:100%;padding:7px 10px;font-size:10.5px;">🔒 Reservar Exterior →</a>
          </div>
        </div>

        <!-- Pilar 3 -->
        <div style="background:rgba(30,41,59,0.75);border:1px solid rgba(96,165,250,0.28);border-radius:12px;padding:14px;display:flex;flex-direction:column;justify-content:space-between;">
          <div>
            <div style="font-size:10px;font-weight:800;color:#38bdf8;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px;">03 · Blindaje Nanotecnológico</div>
            <h3 style="font-size:15px;color:#ffffff;margin-bottom:6px;">Recubrimiento Cerámico 9H / 10H</h3>
            <p style="font-size:10.8px;color:#cbd5e1;margin-bottom:10px;">
              Escudo covalente SiO2 9H (3–5 años) o Grafeno 10H (5–7 años) contra lluvia ácida, rayos UV y contaminación en carrocería, rines, cristales e interiores.
            </p>
          </div>
          <div>
            <div style="font-size:15px;font-weight:800;color:#60a5fa;margin-bottom:6px;">$10,999 MXN <span style="font-size:9.5px;color:#94a3b8;font-weight:500;">3–5 años</span></div>
            <a href="https://drfoam.com.mx/reservar?package=ceramic-coating&utm_source=brochure_pdf" class="btn btn-blue" style="width:100%;padding:7px 10px;font-size:10.5px;">🔒 Reservar Cerámico →</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Infraestructura y Diferenciadores Corporativos -->
    <div style="padding: 16px 32px 0;">
      <div style="background:rgba(15,23,42,0.9);border:1px solid rgba(148,163,184,0.22);border-radius:12px;padding:14px 18px;display:grid;grid-template-columns:1.35fr 1fr;gap:16px;align-items:center;">
        <div>
          <div style="font-size:11px;font-weight:800;color:#38bdf8;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px;">
            ¿Por qué Doctor Foam supera a cualquier taller o autolavado?
          </div>
          <p style="font-size:10.8px;color:#cbd5e1;margin-bottom:8px;">
            Acudimos directamente a tu residencia o estacionamiento corporativo en <strong>Polanco, Lomas de Chapultepec, Bosques de las Lomas, Santa Fe, Interlomas, Huixquilucan, Pedregal y Coyoacán</strong> sin utilizar tus tomas de agua ni electricidad.
          </p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:10.2px;color:#e2e8f0;">
            <div>💧 <strong>Ósmosis Inversa (RO):</strong> Agua 0 PPM sin manchas</div>
            <div>⚡ <strong>Energía Propia:</strong> Generador insonorizado</div>
            <div>🔬 <strong>Luz LED CRI 95+:</strong> Metrología óptica</div>
            <div>🧾 <strong>Facturación CFDI 4.0:</strong> Precios con IVA</div>
          </div>
        </div>
        <div style="position:relative;height:112px;border-radius:10px;overflow:hidden;border:1px solid rgba(96,165,250,0.3);">
          <img src="${imgRecurrente}" style="width:100%;height:100%;object-fit:cover;" />
        </div>
      </div>
    </div>

    <!-- Master Interactive CTA Strip on Cover -->
    <div style="padding: 16px 32px 0;">
      <div style="background:linear-gradient(135deg, rgba(37,99,235,0.22), rgba(22,163,74,0.18));border:1px solid rgba(96,165,250,0.4);border-radius:12px;padding:14px 18px;display:flex;align-items:center;justify-content:space-between;gap:12px;">
        <div>
          <div style="font-size:13px;font-weight:800;color:#ffffff;">¿Listo para agendar o cotizar tu servicio a domicilio?</div>
          <div style="font-size:10.5px;color:#cbd5e1;">Haz clic en los botones interactivos de este PDF para ir directo a nuestra pasarela de pago o WhatsApp:</div>
        </div>
        <div style="display:flex;gap:8px;flex-shrink:0;">
          <a href="https://drfoam.com.mx/reservar?utm_source=brochure_pdf" class="btn btn-blue">📅 Cotizar y Pagar en Web</a>
          <a href="https://wa.me/525610846022?text=Hola%20Doctor%20Foam%2C%20descargu%C3%A9%20su%20Brochure%20PDF%20y%20quiero%20agendar%20un%20servicio%20a%20domicilio" class="btn btn-green">💬 WhatsApp Directo</a>
        </div>
      </div>
    </div>
  </div>

  <div class="page-footer">
    <div><strong>DOCTOR FOAM MÉXICO</strong> · Catálogo Ejecutivo de Servicios a Domicilio</div>
    <div>Sitio Web: <a href="https://drfoam.com.mx">drfoam.com.mx</a> · Reservas: <a href="https://drfoam.com.mx/reservar">drfoam.com.mx/reservar</a> · Pág. 1 / 5</div>
  </div>
</div>

<!-- ==================== PAGE 2: PILAR 1 - LAVADO INTERIOR PROFUNDO ==================== -->
<div class="page">
  <div>
    <div class="top-bar-light">
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <div class="brand-logo">
          <div class="brand-title" style="font-size:16px;">DOCTOR <span>FOAM</span></div>
          <span style="color:#64748b;font-size:11px;">|</span>
          <span style="font-size:11px;color:#cbd5e1;font-weight:600;">PILAR 01 · BIOSEGURIDAD Y RESTAURACIÓN DE CABINA</span>
        </div>
        <a href="https://drfoam.com.mx/reservar?package=deep-interior&utm_source=brochure_pdf" style="font-size:10.5px;color:#60a5fa;font-weight:700;">Agendar en drfoam.com.mx/reservar →</a>
      </div>
    </div>

    <div style="padding: 20px 32px 0;">
      <span class="pill">Especialidad 01 · Vapor Seco a 180°C + Ozono Médico</span>
      <h2 style="font-size:24px;color:#0f172a;font-weight:900;line-height:1.18;margin-bottom:6px;">
        Lavado Interior Profundo de Grado Clínico
      </h2>
      <p style="font-size:11.5px;color:#475569;margin-bottom:14px;">
        A diferencia del lavado de vestiduras tradicional por inyección-succión húmeda —que inunda la espuma de los asientos dejando humedad atrapada, mal olor, hongos y riesgo de despegar el cielo—, Doctor Foam emplea <strong>Desnaturalización Térmica a 180°C con solo 5% de humedad líquida</strong>.
      </p>

      <!-- Dual Image Showcase -->
      <div style="display:grid;grid-template-columns:1.35fr 1fr;gap:12px;margin-bottom:16px;">
        <div style="position:relative;height:185px;border-radius:12px;overflow:hidden;border:1px solid #cbd5e1;">
          <img src="${imgInteriorMain}" style="width:100%;height:100%;object-fit:cover;" />
          <div style="position:absolute;bottom:0;inset-x:0;background:linear-gradient(transparent, rgba(15,23,42,0.88));color:#fff;padding:10px 14px;font-size:10.5px;font-weight:600;">
            ♨️ Vapor Seco a 180°C en Piel Perforada y Textiles: Esterilización sin saturar la espuma
          </div>
        </div>
        <div style="position:relative;height:185px;border-radius:12px;overflow:hidden;border:1px solid #cbd5e1;">
          <img src="${imgInteriorSub}" style="width:100%;height:100%;object-fit:cover;" />
          <div style="position:absolute;bottom:0;inset-x:0;background:linear-gradient(transparent, rgba(15,23,42,0.88));color:#fff;padding:10px 14px;font-size:10.5px;font-weight:600;">
            🧴 Hidratación Clínica de Piel Nappa, Alcántara y Consolas Piano Black
          </div>
        </div>
      </div>

      <!-- 8 Steps Grid -->
      <h3 style="font-size:14px;color:#0f172a;margin-bottom:10px;font-weight:800;">
        Protocolo Quirúrgico de 8 Pasos en Cabina (Paquete Industrial Deep Interior)
      </h3>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;">
        <div class="card">
          <div style="font-size:11.5px;font-weight:800;color:#1d4ed8;margin-bottom:3px;">1. Aspirado Industrial de Alta Succión</div>
          <p style="font-size:10.5px;color:#475569;">Extracción profunda de polvo, sílice y alérgenos en costuras, rieles de asientos, tapetes, alfombra y cajuela con turbinas industriales.</p>
        </div>
        <div class="card">
          <div style="font-size:11.5px;font-weight:800;color:#1d4ed8;margin-bottom:3px;">2. Choque Térmico con Vapor Seco a 180°C</div>
          <p style="font-size:10.5px;color:#475569;">Desnaturaliza proteínas de bacterias, virus y ácaros al contacto. Emulsifica grasas sin mojar el relleno y permite <strong>usar el auto en &lt;60 min</strong>.</p>
        </div>
        <div class="card">
          <div style="font-size:11.5px;font-weight:800;color:#1d4ed8;margin-bottom:3px;">3. Tratamiento de Piel Nappa, Merino y Cuero</div>
          <p style="font-size:10.5px;color:#475569;">Limpieza de poros con espuma pH neutro y cepillos de cerdas suaves, seguida de acondicionador nutritivo UV con acabado mate original OEM.</p>
        </div>
        <div class="card">
          <div style="font-size:11.5px;font-weight:800;color:#1d4ed8;margin-bottom:3px;">4. Desmanchado Enzimático de Textiles y Cielo</div>
          <p style="font-size:10.5px;color:#475569;">Eliminación segura de manchas de café, alimentos, sudor y cosméticos en asientos de tela, alcántara, cinturones de seguridad y toldo interior.</p>
        </div>
        <div class="card">
          <div style="font-size:11.5px;font-weight:800;color:#1d4ed8;margin-bottom:3px;">5. Esterilización de Ductos de A/C (HVAC)</div>
          <p style="font-size:10.5px;color:#475569;">Inyección de vapor seco a 180°C en las ventilas del aire acondicionado para erradicar esporas y bacterias acumuladas en el evaporador.</p>
        </div>
        <div class="card">
          <div style="font-size:11.5px;font-weight:800;color:#1d4ed8;margin-bottom:3px;">6. Sanitización con Ozono Médico (O3) + Exterior</div>
          <p style="font-size:10.5px;color:#475569;">Generador de ozono que destruye el 99.9% de microorganismos y olores (tabaco, mascotas, humedad). Incluye lavado exterior con espuma activa.</p>
        </div>
      </div>

      <!-- Pricing & Direct Payment Callout -->
      <div style="background:linear-gradient(135deg, #0f172a 0%, #1e293b 100%);color:#ffffff;border-radius:14px;padding:16px 20px;border:1.5px solid #2563eb;">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:14px;">
          <div>
            <span style="font-size:9.5px;font-weight:800;color:#38bdf8;text-transform:uppercase;letter-spacing:0.1em;">
              Paquete Industrial Deep Interior · Duración: 2.5 a 3 Horas a Domicilio
            </span>
            <h4 style="font-size:17px;color:#ffffff;margin:3px 0 4px;">
              Sedán / SUV 2 Filas: <span style="color:#60a5fa;">$2,400 MXN</span> · Pick Up / SUV 3 Filas: <span style="color:#60a5fa;">$2,760 MXN</span>
            </h4>
            <p style="font-size:10.3px;color:#cbd5e1;">
              ✨ <strong>Precio con Membresía Doctor Foam (-10% OFF):</strong> <strong>$2,160 MXN</strong> (Sedán) / <strong>$2,484 MXN</strong> (SUV 3 filas). Contratar este paquete habilita tu acceso a la Membresía mensual de seguimiento ($990/mes).
            </p>
          </div>
          <div style="display:flex;flex-direction:column;gap:7px;flex-shrink:0;min-width:215px;">
            <a href="https://drfoam.com.mx/reservar?package=deep-interior&utm_source=brochure_pdf" class="btn btn-blue" style="font-size:11px;padding:9px 14px;">
              🔒 Pagar y Agendar ($2,400 MXN)
            </a>
            <a href="https://wa.me/525610846022?text=Hola%20Doctor%20Foam%2C%20vi%20el%20Brochure%20PDF%20y%20quiero%20agendar%20el%20Lavado%20Interior%20Profundo%20%28%242%2C400%20MXN%29" class="btn btn-green" style="font-size:11px;padding:8px 14px;">
              💬 Agendar Interior por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="page-footer">
    <div><strong>DOCTOR FOAM MÉXICO</strong> · Pilar 01: Lavado Interior Profundo con Vapor a 180°C</div>
    <div>Más información: <a href="https://drfoam.com.mx/lavado-profundo-vehiculos-cdmx">drfoam.com.mx/lavado-profundo-vehiculos-cdmx</a> · Pág. 2 / 5</div>
  </div>
</div>

<!-- ==================== PAGE 3: PILAR 2 - LAVADO EXTERIOR Y CORRECCIÓN DE PINTURA ==================== -->
<div class="page">
  <div>
    <div class="top-bar-light">
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <div class="brand-logo">
          <div class="brand-title" style="font-size:16px;">DOCTOR <span>FOAM</span></div>
          <span style="color:#64748b;font-size:11px;">|</span>
          <span style="font-size:11px;color:#cbd5e1;font-weight:600;">PILAR 02 · LAVADO EXTERIOR CLÍNICO Y CORRECCIÓN ÓPTICA ANTI-SWIRLS</span>
        </div>
        <a href="https://drfoam.com.mx/reservar?package=signature-detail&utm_source=brochure_pdf" style="font-size:10.5px;color:#60a5fa;font-weight:700;">Cotizar en drfoam.com.mx/reservar →</a>
      </div>
    </div>

    <div style="padding: 20px 32px 0;">
      <span class="pill">Especialidad 02 · Ósmosis Inversa (0 PPM) + Eliminación de 85–95% de Swirls</span>
      <h2 style="font-size:24px;color:#0f172a;font-weight:900;line-height:1.18;margin-bottom:6px;">
        Lavado Exterior Clínico y Corrección de Pintura
      </h2>
      <p style="font-size:11.5px;color:#475569;margin-bottom:14px;">
        El polvo volcánico del Valle de México tiene dureza Mohs 7: lavar tu auto con una sola cubeta, franela o en túneles de rodillos graba miles de micro-rayones circulares (<em>swirls</em>) que apagan el brillo. Doctor Foam protege y restaura la óptica de tu pintura a domicilio.
      </p>

      <!-- Dual Image Showcase -->
      <div style="display:grid;grid-template-columns:1.25fr 1fr;gap:12px;margin-bottom:16px;">
        <div style="position:relative;height:180px;border-radius:12px;overflow:hidden;border:1px solid #cbd5e1;">
          <img src="${imgExteriorMain}" style="width:100%;height:100%;object-fit:cover;" />
          <div style="position:absolute;bottom:0;inset-x:0;background:linear-gradient(transparent, rgba(15,23,42,0.9));color:#fff;padding:10px 14px;font-size:10.5px;font-weight:600;">
            ✨ Corrección Roto-Orbital 50/50 bajo Iluminación LED CRI 95+: Nivelación micrométrica del barniz
          </div>
        </div>
        <div style="position:relative;height:180px;border-radius:12px;overflow:hidden;border:1px solid #cbd5e1;">
          <img src="${imgBeforeAfter}" style="width:100%;height:100%;object-fit:cover;" />
          <div style="position:absolute;bottom:0;inset-x:0;background:linear-gradient(transparent, rgba(15,23,42,0.9));color:#fff;padding:10px 14px;font-size:10.5px;font-weight:600;">
            🔬 Antes vs. Después: Eliminación definitiva de swirls y marcas de lluvia ácida
          </div>
        </div>
      </div>

      <!-- Two Exterior Service Tiers -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px;">
        <!-- Tier A: Foam Maintenance -->
        <div class="card" style="border:1.5px solid #cbd5e1;display:flex;flex-direction:column;justify-content:space-between;">
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
              <span style="font-size:10px;font-weight:800;color:#2563eb;text-transform:uppercase;">Lavado Exterior + Cabina</span>
              <span style="font-size:10px;color:#64748b;font-weight:600;">⏱ 1.5 Horas</span>
            </div>
            <h3 style="font-size:16px;color:#0f172a;margin-bottom:4px;">1. Foam Maintenance (Anti-Swirl)</h3>
            <div style="font-size:18px;font-weight:900;color:#2563eb;margin-bottom:8px;">
              $1,599 MXN <span style="font-size:10px;color:#64748b;font-weight:500;">Sedán / SUV 2 filas ($1,839 SUV 3 filas)</span>
            </div>
            <ul class="check-list">
              <li><strong>Agua por Ósmosis Inversa (0 PPM):</strong> Enjuague libre de calcio y magnesio (cero gotas secas).</li>
              <li><strong>Prelavado Snow Foam pH Neutro:</strong> Encapsula polvo abrasivo sin fricción mecánica.</li>
              <li><strong>Método Clínico de 2 Cubetas con Grit Guard:</strong> Guantes de microfibra de un solo uso por auto.</li>
              <li><strong>Detallado de Rines, Cáliperes y Tolvas:</strong> Cepillos dedicados + sellador hidrofóbico ligero.</li>
              <li><strong>Limpieza Interior Ejecutiva:</strong> Aspirado profundo, plásticos, cristales y aromatización.</li>
            </ul>
          </div>
          <div style="margin-top:10px;display:flex;gap:6px;">
            <a href="https://drfoam.com.mx/reservar?package=basic-foam&utm_source=brochure_pdf" class="btn btn-blue" style="flex:1;padding:8px 10px;font-size:10.5px;">🔒 Pagar $1,599 MXN</a>
            <a href="https://wa.me/525610846022?text=Hola%20Doctor%20Foam%2C%20vi%20el%20Brochure%20PDF%20y%20quiero%20agendar%20Foam%20Maintenance%20%28%241%2C599%20MXN%29" class="btn btn-green" style="padding:8px 10px;font-size:10.5px;">💬 WhatsApp</a>
          </div>
        </div>

        <!-- Tier B: Signature Detail -->
        <div class="card" style="background:#eff6ff;border:2px solid #2563eb;display:flex;flex-direction:column;justify-content:space-between;">
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
              <span style="font-size:10px;font-weight:800;color:#1d4ed8;text-transform:uppercase;">★ Más Solicitado · Restauración Total</span>
              <span style="font-size:10px;color:#1e40af;font-weight:600;">⏱ 4 a 6 Horas</span>
            </div>
            <h3 style="font-size:16px;color:#0f172a;margin-bottom:4px;">2. Signature Detail (Corrección + Interior)</h3>
            <div style="font-size:18px;font-weight:900;color:#1d4ed8;margin-bottom:2px;">
              $7,499 MXN <span style="font-size:10px;color:#475569;font-weight:500;">Sedán / SUV 2 filas ($8,624 SUV 3 filas)</span>
            </div>
            <div style="font-size:10px;font-weight:700;color:#15803d;margin-bottom:8px;">
              Con Membresía (-10% OFF): $6,749 MXN · Incrementa +$16,000 a +$35,000 el valor de reventa
            </div>
            <ul class="check-list">
              <li><strong>Incluye TODO el paquete Industrial Deep Interior ($2,400):</strong> Vapor a 180°C + Ozono en cabina.</li>
              <li><strong>Descontaminación Férrica y Mecánica (Clay Bar):</strong> Extrae partículas metálicas incrustadas.</li>
              <li><strong>Corrección de Pintura (2 a 3 Etapas):</strong> Elimina <strong>85% a 95% de swirls</strong>, microrayones y lluvia ácida.</li>
              <li><strong>Detallado de Bahía de Motor y Cristales:</strong> Limpieza segura con vapor y acondicionamiento.</li>
              <li><strong>Sellador Cerámico SiO2 (6 Meses):</strong> Brillo espejo profundo e hidrofobicidad inmediata.</li>
            </ul>
          </div>
          <div style="margin-top:10px;display:flex;gap:6px;">
            <a href="https://drfoam.com.mx/reservar?package=signature-detail&utm_source=brochure_pdf" class="btn btn-blue" style="flex:1;padding:8px 10px;font-size:10.5px;">🔒 Pagar $7,499 MXN</a>
            <a href="https://wa.me/525610846022?text=Hola%20Doctor%20Foam%2C%20vi%20el%20Brochure%20PDF%20y%20quiero%20agendar%20Signature%20Detail%20%28%247%2C499%20MXN%29" class="btn btn-green" style="padding:8px 10px;font-size:10.5px;">💬 WhatsApp</a>
          </div>
        </div>
      </div>

      <!-- Technical Note Banner -->
      <div style="background:#f8fafc;border-left:4px solid #2563eb;border-radius:0 10px 10px 0;padding:10px 14px;font-size:10.5px;color:#334155;">
        <strong>💡 Ingeniería Financiera Automotriz:</strong> Un vehículo de gama alta con swirls o marcas de agua sufre una penalización inmediata al venderse. Restaurar el barniz con <strong>Signature Detail ($7,499 MXN)</strong> produce un retorno de inversión superior al <strong>300%</strong> en la tasación del vehículo.
        <a href="https://drfoam.com.mx/blog/correccion-pintura-swirls-guia?utm_source=brochure_pdf" style="color:#2563eb;font-weight:700;margin-left:6px;">Leer guía técnica en la web →</a>
      </div>
    </div>
  </div>

  <div class="page-footer">
    <div><strong>DOCTOR FOAM MÉXICO</strong> · Pilar 02: Lavado Exterior Clínico y Corrección de Pintura</div>
    <div>Guía de Swirls: <a href="https://drfoam.com.mx/blog/correccion-pintura-swirls-guia">drfoam.com.mx/blog/correccion-pintura-swirls-guia</a> · Pág. 3 / 5</div>
  </div>
</div>

<!-- ==================== PAGE 4: PILAR 3 - RECUBRIMIENTO CERÁMICO 9H Y GRAFENO ==================== -->
<div class="page">
  <div>
    <div class="top-bar-light">
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <div class="brand-logo">
          <div class="brand-title" style="font-size:16px;">DOCTOR <span>FOAM</span></div>
          <span style="color:#64748b;font-size:11px;">|</span>
          <span style="font-size:11px;color:#cbd5e1;font-weight:600;">PILAR 03 · BLINDAJE NANOCERÁMICO 9H (SiO2) Y GRAFENO 10H</span>
        </div>
        <a href="https://drfoam.com.mx/reservar?package=ceramic-coating&utm_source=brochure_pdf" style="font-size:10.5px;color:#60a5fa;font-weight:700;">Blindar mi auto en drfoam.com.mx/reservar →</a>
      </div>
    </div>

    <div style="padding: 20px 32px 0;">
      <span class="pill">Especialidad 03 · Enlace Covalente SiO2 9H · Garantía por Escrito de 3 a 7 Años</span>
      <h2 style="font-size:24px;color:#0f172a;font-weight:900;line-height:1.18;margin-bottom:6px;">
        Recubrimiento Cerámico 9H y Grafeno a Domicilio
      </h2>
      <p style="font-size:11.5px;color:#475569;margin-bottom:14px;">
        Mientras las ceras tradicionales se funden a 80°C y desaparecen en pocas semanas bajo la lluvia ácida de la CDMX (dióxido de azufre y óxidos de nitrógeno), nuestro <strong>Recubrimiento Nanocerámico SiO2 9H forma un enlace químico covalente con el barniz</strong> que soporta más de 600°C y agentes químicos de pH 2 a pH 13.
      </p>

      <!-- 3-Image Visual Grid -->
      <div style="display:grid;grid-template-columns:1.2fr 1fr 1fr;gap:10px;margin-bottom:16px;">
        <div style="position:relative;height:165px;border-radius:12px;overflow:hidden;border:1px solid #cbd5e1;">
          <img src="${imgCeramicMain}" style="width:100%;height:100%;object-fit:cover;" />
          <div style="position:absolute;bottom:0;inset-x:0;background:linear-gradient(transparent, rgba(15,23,42,0.9));color:#fff;padding:8px 12px;font-size:10px;font-weight:600;">
            🛡️ Nivelación Micrométrica SiO2 9H Panel por Panel
          </div>
        </div>
        <div style="position:relative;height:165px;border-radius:12px;overflow:hidden;border:1px solid #cbd5e1;">
          <img src="${imgCeramicBeads}" style="width:100%;height:100%;object-fit:cover;" />
          <div style="position:absolute;bottom:0;inset-x:0;background:linear-gradient(transparent, rgba(15,23,42,0.9));color:#fff;padding:8px 12px;font-size:10px;font-weight:600;">
            💧 Efecto Loto (&gt;110°): Hiper-hidrofobicidad y Auto-limpieza
          </div>
        </div>
        <div style="position:relative;height:165px;border-radius:12px;overflow:hidden;border:1px solid #cbd5e1;">
          <img src="${imgStudioOverhead}" style="width:100%;height:100%;object-fit:cover;" />
          <div style="position:absolute;bottom:0;inset-x:0;background:linear-gradient(transparent, rgba(15,23,42,0.9));color:#fff;padding:8px 12px;font-size:10px;font-weight:600;">
            🔬 Preparación Clínica de 7 Pasos antes de Sellar
          </div>
        </div>
      </div>

      <!-- Engineering Benefits + Interior Ceramic -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px;">
        <div class="card">
          <h3 style="font-size:13.5px;color:#0f172a;margin-bottom:6px;font-weight:800;">Ingeniería Real del Blindaje Exterior 9H</h3>
          <ul class="check-list">
            <li><strong>Corrección Previa Incluida:</strong> Descontaminamos y pulimos la pintura antes de aplicar el cerámico para sellar un acabado espejo libre de swirls.</li>
            <li><strong>Escudo contra Lluvia Ácida y UV:</strong> Evita el grabado químico (<em>chemical etching</em>), la oxidación del barniz y el amarillamiento de faros.</li>
            <li><strong>Cobertura Integral Exterior:</strong> Aplicación en toda la carrocería, caras de rines (repelencia a polvo de frenos) y parabrisas hidrofóbico.</li>
            <li><strong>Reduce 60% el Tiempo de Lavado:</strong> La suciedad se desliza sin adherirse a la microporosidad de la laca.</li>
          </ul>
        </div>
        <div class="card">
          <h3 style="font-size:13.5px;color:#0f172a;margin-bottom:6px;font-weight:800;">Cerámico para Interiores y Grafeno 10H</h3>
          <ul class="check-list">
            <li><strong>Cerámico para Asientos de Piel Nappa:</strong> Barrera transpirable que evita la transferencia de mezclilla (jeans) en asientos blancos o beige sin alterar el tacto mate.</li>
            <li><strong>Protección en Piano Black y Pantallas:</strong> Blindaje contra micro-rayones y polvo estático en consolas centrales.</li>
            <li><strong>Graphene Shield Premium 10H ($14,999 MXN):</strong> Polímero enriquecido con grafeno que disipa el calor superficial y ofrece <strong>5 a 7 años de garantía</strong>.</li>
          </ul>
        </div>
      </div>

      <!-- Ceramic Coating Pricing & Clickable Payment Box -->
      <div style="background:linear-gradient(135deg, #0f172a 0%, #172554 100%);color:#ffffff;border-radius:14px;padding:16px 20px;border:1.5px solid #38bdf8;">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:14px;">
          <div>
            <span style="font-size:9.5px;font-weight:800;color:#38bdf8;text-transform:uppercase;letter-spacing:0.1em;">
              Paquete Ceramic Coating 9H · Incluye Corrección de Pintura + Certificado de Garantía 3 a 5 Años
            </span>
            <h4 style="font-size:17px;color:#ffffff;margin:3px 0 4px;">
              Sedán / SUV 2 Filas: <span style="color:#60a5fa;">$10,999 MXN</span> · Pick Up / SUV 3 Filas: <span style="color:#60a5fa;">$12,649 MXN</span>
            </h4>
            <p style="font-size:10.3px;color:#cbd5e1;">
              ✨ <strong>Precio con Membresía Doctor Foam (-10% OFF):</strong> <strong>$9,899 MXN</strong> (Ahorras $1,100 MXN). También disponible <strong>Graphene Shield 10H (5–7 años)</strong> desde <strong>$14,999 MXN</strong>.
            </p>
          </div>
          <div style="display:flex;flex-direction:column;gap:7px;flex-shrink:0;min-width:225px;">
            <a href="https://drfoam.com.mx/reservar?package=ceramic-coating&utm_source=brochure_pdf" class="btn btn-blue" style="font-size:11px;padding:9px 14px;">
              🔒 Pagar y Agendar Cerámico ($10,999)
            </a>
            <a href="https://wa.me/525610846022?text=Hola%20Doctor%20Foam%2C%20vi%20el%20Brochure%20PDF%20y%20quiero%20cotizar%20el%20Recubrimiento%20Cer%C3%A1mico%209H%20%28%2410%2C999%20MXN%29" class="btn btn-green" style="font-size:11px;padding:8px 14px;">
              💬 Cotizar Cerámico por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="page-footer">
    <div><strong>DOCTOR FOAM MÉXICO</strong> · Pilar 03: Recubrimiento Cerámico 9H y Grafeno</div>
    <div>Guía Cerámico 9H: <a href="https://drfoam.com.mx/blog/guia-completa-recubrimiento-ceramico">drfoam.com.mx/blog/guia-completa-recubrimiento-ceramico</a> · Pág. 4 / 5</div>
  </div>
</div>

<!-- ==================== PAGE 5: MEMBRESÍA, TABLA MAESTRA, CORPORATIVOS Y CONTACTO ==================== -->
<div class="page">
  <div>
    <div class="top-bar-light">
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <div class="brand-logo">
          <div class="brand-title" style="font-size:16px;">DOCTOR <span>FOAM</span></div>
          <span style="color:#64748b;font-size:11px;">|</span>
          <span style="font-size:11px;color:#cbd5e1;font-weight:600;">MEMBRESÍA DE SEGUIMIENTO ($990/MES), FLOTILLAS B2B Y RESUMEN DE PRECIOS</span>
        </div>
        <a href="https://drfoam.com.mx/membresia-doctor-foam?utm_source=brochure_pdf" style="font-size:10.5px;color:#60a5fa;font-weight:700;">Ver Membresía en Web →</a>
      </div>
    </div>

    <div style="padding: 18px 32px 0;">
      <!-- Membership Highlight Box -->
      <div style="background:linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%);border:2px solid #2563eb;border-radius:14px;padding:14px 18px;margin-bottom:14px;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;">
          <div>
            <span class="pill" style="background:#dbeafe;color:#1e40af;border-color:#93c5fd;">🔄 Programa de Seguimiento Continuo · Desde $990 MXN / mes</span>
            <h2 style="font-size:19px;color:#0f172a;font-weight:900;margin-bottom:4px;">
              Membresía Doctor Foam: El Cuidado Definitivo Todo el Año
            </h2>
            <p style="font-size:10.8px;color:#1e293b;margin-bottom:6px;">
              <strong>📋 Regla de Operación:</strong> Para empezar a operar la Membresía, <strong>primero se contrata un servicio de Lavado Profundo inicial</strong> (como <em>Industrial Deep Interior</em>, <em>Signature Detail</em> o <em>Ceramic Coating 9H</em>). La membresía está diseñada específicamente para <strong>darle seguimiento continuo a ese primer servicio</strong>.
            </p>
            <p style="font-size:10.8px;color:#15803d;font-weight:700;">
              ★ La ventaja real: Mantenimiento preventivo recurrente a domicilio + <strong>10% DE DESCUENTO PERMANENTE</strong> en todos nuestros lavados más especializados.
            </p>
          </div>
          <div style="text-align:right;flex-shrink:0;min-width:175px;">
            <div style="font-size:11px;color:#475569;font-weight:600;">Sedán: <strong>$990/mes</strong> · SUV: <strong>$1,160/mes</strong></div>
            <a href="https://drfoam.com.mx/membresia-doctor-foam?utm_source=brochure_pdf" class="btn btn-blue" style="width:100%;margin-top:6px;padding:7px 12px;font-size:10.5px;">
              🔄 Suscribir Membresía →
            </a>
            <a href="https://wa.me/525610846022?text=Hola%20Doctor%20Foam%2C%20vi%20el%20Brochure%20PDF%20y%20quiero%20contratar%20mi%20primer%20Lavado%20Profundo%20para%20activar%20la%20Membres%C3%ADa%20%28%24990%2Fmes%29" class="btn btn-green" style="width:100%;margin-top:5px;padding:6px 12px;font-size:10px;">
              💬 Preguntar por WhatsApp
            </a>
          </div>
        </div>
      </div>

      <!-- Master Pricing Comparison Table -->
      <h3 style="font-size:13.5px;color:#0f172a;font-weight:800;margin-bottom:8px;">
        Tabla Comparativa Maestra de Servicios y Precios 2026 (IVA Incluido · Facturación CFDI 4.0)
      </h3>
      <table style="width:100%;border-collapse:collapse;font-size:10.5px;margin-bottom:14px;border:1px solid #cbd5e1;border-radius:10px;overflow:hidden;">
        <thead>
          <tr style="background:#0f172a;color:#ffffff;text-align:left;">
            <th style="padding:8px 10px;">Paquete / Servicio</th>
            <th style="padding:8px 10px;">Enfoque Principal</th>
            <th style="padding:8px 10px;">Sedán / SUV 2 Filas</th>
            <th style="padding:8px 10px;">Pick Up / SUV 3 Filas</th>
            <th style="padding:8px 10px;">Con Membresía (-10%)</th>
            <th style="padding:8px 10px;text-align:center;">Enlace Directo</th>
          </tr>
        </thead>
        <tbody>
          <tr style="background:#ffffff;border-bottom:1px solid #e2e8f0;">
            <td style="padding:8px 10px;font-weight:800;color:#0f172a;">Foam Maintenance</td>
            <td style="padding:8px 10px;color:#475569;">Lavado exterior RO (0 PPM) + aspirado cabina</td>
            <td style="padding:8px 10px;font-weight:700;">$1,599 MXN</td>
            <td style="padding:8px 10px;">$1,839 MXN</td>
            <td style="padding:8px 10px;color:#15803d;font-weight:700;">$1,439 MXN</td>
            <td style="padding:8px 10px;text-align:center;"><a href="https://drfoam.com.mx/reservar?package=basic-foam&utm_source=brochure_pdf" style="color:#2563eb;font-weight:800;">Reservar →</a></td>
          </tr>
          <tr style="background:#f8fafc;border-bottom:1px solid #e2e8f0;">
            <td style="padding:8px 10px;font-weight:800;color:#0f172a;">Industrial Deep Interior</td>
            <td style="padding:8px 10px;color:#475569;">Vestiduras con Vapor Seco 180°C + Ozono médico</td>
            <td style="padding:8px 10px;font-weight:700;">$2,400 MXN</td>
            <td style="padding:8px 10px;">$2,760 MXN</td>
            <td style="padding:8px 10px;color:#15803d;font-weight:700;">$2,160 MXN</td>
            <td style="padding:8px 10px;text-align:center;"><a href="https://drfoam.com.mx/reservar?package=deep-interior&utm_source=brochure_pdf" style="color:#2563eb;font-weight:800;">Reservar →</a></td>
          </tr>
          <tr style="background:#eff6ff;border-bottom:1px solid #bfdbfe;">
            <td style="padding:8px 10px;font-weight:800;color:#1d4ed8;">★ Signature Detail</td>
            <td style="padding:8px 10px;color:#1e293b;">Corrección Swirls (85-95%) + Interior 180°C + Sellador</td>
            <td style="padding:8px 10px;font-weight:800;color:#1d4ed8;">$7,499 MXN</td>
            <td style="padding:8px 10px;font-weight:700;">$8,624 MXN</td>
            <td style="padding:8px 10px;color:#15803d;font-weight:800;">$6,749 MXN</td>
            <td style="padding:8px 10px;text-align:center;"><a href="https://drfoam.com.mx/reservar?package=signature-detail&utm_source=brochure_pdf" style="color:#1d4ed8;font-weight:800;">Reservar →</a></td>
          </tr>
          <tr style="background:#ffffff;border-bottom:1px solid #e2e8f0;">
            <td style="padding:8px 10px;font-weight:800;color:#0f172a;">Ceramic Coating 9H</td>
            <td style="padding:8px 10px;color:#475569;">Corrección + Blindaje SiO2 9H (Garantía 3 a 5 años)</td>
            <td style="padding:8px 10px;font-weight:700;">$10,999 MXN</td>
            <td style="padding:8px 10px;">$12,649 MXN</td>
            <td style="padding:8px 10px;color:#15803d;font-weight:700;">$9,899 MXN</td>
            <td style="padding:8px 10px;text-align:center;"><a href="https://drfoam.com.mx/reservar?package=ceramic-coating&utm_source=brochure_pdf" style="color:#2563eb;font-weight:800;">Reservar →</a></td>
          </tr>
          <tr style="background:#f8fafc;">
            <td style="padding:8px 10px;font-weight:800;color:#0f172a;">Membresía Mensual</td>
            <td style="padding:8px 10px;color:#475569;">Seguimiento post-lavado profundo + 10% OFF fijo</td>
            <td style="padding:8px 10px;font-weight:700;">$990 / mes</td>
            <td style="padding:8px 10px;">$1,160 / mes</td>
            <td style="padding:8px 10px;color:#2563eb;font-weight:700;">10% OFF Activo</td>
            <td style="padding:8px 10px;text-align:center;"><a href="https://drfoam.com.mx/membresia-doctor-foam?utm_source=brochure_pdf" style="color:#2563eb;font-weight:800;">Suscribir →</a></td>
          </tr>
        </tbody>
      </table>

      <!-- Corporate B2B & Zones Grid -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px;">
        <div class="card">
          <h4 style="font-size:12.5px;color:#0f172a;font-weight:800;margin-bottom:4px;">
            🏢 Convenios Corporativos, Flotillas y Condominios
          </h4>
          <p style="font-size:10.3px;color:#475569;margin-bottom:6px;">
            Operamos dentro de estacionamientos subterráneos corporativos y residenciales con protocolo <strong>cero escurrimientos</strong>, planta eléctrica insonorizada, seguro de responsabilidad civil y facturación consolidada CFDI 4.0.
          </p>
          <a href="https://drfoam.com.mx/lavado-autos-estacionamiento-corporativo?utm_source=brochure_pdf" style="font-size:10.3px;color:#2563eb;font-weight:700;">
            Ver Soluciones para Estacionamiento Corporativo →
          </a>
        </div>
        <div class="card">
          <h4 style="font-size:12.5px;color:#0f172a;font-weight:800;margin-bottom:4px;">
            📍 8 Zonas de Cobertura sin Cargo por Traslado
          </h4>
          <div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:4px;">
            <a href="https://drfoam.com.mx/zonas/polanco" style="font-size:9.5px;padding:3px 8px;background:#eff6ff;color:#1d4ed8;border-radius:999px;font-weight:600;">Polanco (11510–11560)</a>
            <a href="https://drfoam.com.mx/zonas/lomas-de-chapultepec" style="font-size:9.5px;padding:3px 8px;background:#eff6ff;color:#1d4ed8;border-radius:999px;font-weight:600;">Lomas de Chapultepec</a>
            <a href="https://drfoam.com.mx/zonas/bosques-de-las-lomas" style="font-size:9.5px;padding:3px 8px;background:#eff6ff;color:#1d4ed8;border-radius:999px;font-weight:600;">Bosques de las Lomas</a>
            <a href="https://drfoam.com.mx/zonas/santa-fe" style="font-size:9.5px;padding:3px 8px;background:#eff6ff;color:#1d4ed8;border-radius:999px;font-weight:600;">Santa Fe</a>
            <a href="https://drfoam.com.mx/zonas/interlomas" style="font-size:9.5px;padding:3px 8px;background:#eff6ff;color:#1d4ed8;border-radius:999px;font-weight:600;">Interlomas</a>
            <a href="https://drfoam.com.mx/zonas/huixquilucan" style="font-size:9.5px;padding:3px 8px;background:#eff6ff;color:#1d4ed8;border-radius:999px;font-weight:600;">Huixquilucan</a>
            <a href="https://drfoam.com.mx/zonas/pedregal" style="font-size:9.5px;padding:3px 8px;background:#eff6ff;color:#1d4ed8;border-radius:999px;font-weight:600;">Pedregal y San Ángel</a>
            <a href="https://drfoam.com.mx/zonas/coyoacan" style="font-size:9.5px;padding:3px 8px;background:#eff6ff;color:#1d4ed8;border-radius:999px;font-weight:600;">Coyoacán</a>
          </div>
        </div>
      </div>

      <!-- Final Master Action Card -->
      <div style="background:linear-gradient(135deg, #060b16 0%, #0f172a 60%, #1d4ed8 100%);color:#ffffff;border-radius:16px;padding:18px 22px;text-align:center;">
        <h3 style="font-size:19px;font-weight:900;margin-bottom:4px;">
          Agenda hoy mismo tu Detallado Clínico a Domicilio
        </h3>
        <p style="font-size:11px;color:#cbd5e1;margin-bottom:12px;">
          Selecciona cualquiera de los botones inferiores para ir directamente a nuestra plataforma web, pagar en línea con Stripe o hablar con un especialista por WhatsApp:
        </p>
        <div style="display:flex;justify-content:center;gap:10px;flex-wrap:wrap;">
          <a href="https://drfoam.com.mx/reservar?utm_source=brochure_pdf" class="btn btn-blue" style="padding:10px 18px;font-size:11.5px;">
            🔒 RESERVAR Y PAGAR EN LÍNEA (drfoam.com.mx/reservar)
          </a>
          <a href="https://wa.me/525610846022?text=Hola%20Doctor%20Foam%2C%20le%C3%AD%20su%20Brochure%20Corporativo%20PDF%20y%20me%20gustar%C3%ADa%20agendar%20un%20servicio%20a%20domicilio" class="btn btn-green" style="padding:10px 18px;font-size:11.5px;">
            💬 AGENDAR POR WHATSAPP (+52 56 1084 6022)
          </a>
          <a href="https://drfoam.com.mx/?utm_source=brochure_pdf" class="btn btn-outline-dark" style="padding:10px 16px;font-size:11.5px;">
            🌐 VISITAR DRFOAM.COM.MX
          </a>
        </div>
      </div>
    </div>
  </div>

  <div class="page-footer">
    <div><strong>DOCTOR FOAM MÉXICO</strong> · WhatsApp: <a href="https://wa.me/525610846022">+52 56 1084 6022</a> · Lunes a Domingo 8:00 a 19:00 hrs</div>
    <div>Web Oficial: <a href="https://drfoam.com.mx">https://drfoam.com.mx</a> · Pág. 5 / 5</div>
  </div>
</div>

</body>
</html>`;

fs.writeFileSync(TEMP_HTML, html, "utf8");

const chromeCandidates = [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
];
const browserBin = chromeCandidates.find((p) => fs.existsSync(p));
if (!browserBin) {
    throw new Error("No Chromium/Edge binary found to render PDF");
}

const fileUrl = "file:///" + TEMP_HTML.replace(/\\/g, "/");
execFileSync(
    browserBin,
    [
        "--headless=new",
        "--disable-gpu",
        "--no-pdf-header-footer",
        "--print-to-pdf-no-header",
        `--print-to-pdf=${OUTPUT_PDF}`,
        fileUrl,
    ],
    { stdio: "inherit" }
);

fs.unlinkSync(TEMP_HTML);
const stat = fs.statSync(OUTPUT_PDF);
console.log(`Generated ${OUTPUT_PDF} (${(stat.size / 1024).toFixed(1)} KB)`);
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
