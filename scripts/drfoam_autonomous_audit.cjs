/**
 * Doctor Foam México — Script de Auditoría Autónoma (Estándar Maestro v2.1)
 * 1. Consulta Google Search Console API (filtrando exclusivamente drfoam.com.mx / doctorfoam.mx)
 * 2. Consulta Telemetría UX & Conversiones WhatsApp en public.drfoam_ux_events (Supabase J. Denis)
 * 3. Verifica salud de producción en https://drfoam.com.mx
 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const https = require("https");

const SUPABASE_URL = "https://zdciwzeokkrwcxvsgusc.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkY2l3emVva2tyd2N4dnNndXNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2NTM3NTksImV4cCI6MjA4ODIyOTc1OX0.qbXG0M2Zsjz-rOXY0CgAV2RfLledS67nqBw_dnvzkbg";

function httpJson(url, options = {}, body = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        try {
          resolve({ status: res.statusCode, data: data ? JSON.parse(data) : null });
        } catch {
          resolve({ status: res.statusCode, data });
        }
      });
    });
    req.on("error", reject);
    if (body) req.write(body);
    req.end();
  });
}

async function auditGsc() {
  const credPath = path.join(__dirname, "..", ".gsc-credentials.json");
  if (!fs.existsSync(credPath)) {
    return { status: "missing_credentials_file", drfoamSites: [] };
  }
  const creds = JSON.parse(fs.readFileSync(credPath, "utf8"));
  const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
  const now = Math.floor(Date.now() / 1000);
  const claim = Buffer.from(
    JSON.stringify({
      iss: creds.client_email,
      scope: "https://www.googleapis.com/auth/webmasters.readonly",
      aud: creds.token_uri,
      exp: now + 3600,
      iat: now,
    })
  ).toString("base64url");
  const sign = crypto.createSign("RSA-SHA256");
  sign.update(`${header}.${claim}`);
  const signature = sign.sign(creds.private_key, "base64url");
  const jwt = `${header}.${claim}.${signature}`;

  const tokenBody = `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`;
  const tokenRes = await httpJson(
    creds.token_uri,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": Buffer.byteLength(tokenBody),
      },
    },
    tokenBody
  );

  if (!tokenRes.data || !tokenRes.data.access_token) {
    return { status: "auth_error", error: tokenRes.data };
  }

  const accessToken = tokenRes.data.access_token;
  const sitesRes = await httpJson("https://www.googleapis.com/webmasters/v3/sites", {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const allSites = (sitesRes.data && sitesRes.data.siteEntry) || [];
  const drfoamSites = allSites.filter(
    (s) => s.siteUrl.includes("drfoam") || s.siteUrl.includes("doctorfoam")
  );

  const verifiedSite = drfoamSites.find((s) => s.permissionLevel !== "siteUnverifiedUser");
  let analytics = null;

  if (verifiedSite) {
    const endDate = new Date().toISOString().slice(0, 10);
    const startDate = new Date(Date.now() - 28 * 86400000).toISOString().slice(0, 10);
    const queryBody = JSON.stringify({
      startDate,
      endDate,
      dimensions: ["query", "page"],
      rowLimit: 25,
    });
    const qRes = await httpJson(
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(verifiedSite.siteUrl)}/searchAnalytics/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(queryBody),
        },
      },
      queryBody
    );
    analytics = qRes.data;
  }

  return {
    status: verifiedSite ? "verified_active" : "awaiting_gsc_property_verification",
    serviceAccount: creds.client_email,
    drfoamSites,
    analytics,
  };
}

async function auditSupabaseUx() {
  const res = await httpJson(
    `${SUPABASE_URL}/rest/v1/drfoam_ux_events?select=*&order=created_at.desc&limit=1000`,
    {
      method: "GET",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    }
  );
  const rows = Array.isArray(res.data) ? res.data : [];
  const humanRows = rows.filter((r) => !r.is_bot && r.event_category !== "autonomous_cycle");
  const visitors = new Set(humanRows.map((r) => r.visitor_id || r.session_id));
  const sessions = new Set(humanRows.map((r) => r.session_id));
  const waRows = humanRows.filter((r) => r.event_name === "whatsapp_click");
  const waVisitors = new Set(waRows.map((r) => r.visitor_id || r.session_id));
  const bookingRows = humanRows.filter(
    (r) =>
      r.event_name === "booking_step_view" ||
      r.event_name === "cta_reservar_click" ||
      r.event_name === "checkout_initiated"
  );
  const rageRows = humanRows.filter((r) => r.event_name === "rage_click");

  return {
    totalEventsStored: rows.length,
    humanVisitorsEntered: visitors.size,
    humanSessions: sessions.size,
    whatsappVisitors: waVisitors.size,
    whatsappTotalClicks: waRows.length,
    whatsappConversionPct:
      visitors.size > 0 ? Math.round((waVisitors.size / visitors.size) * 1000) / 10 : 0,
    bookingFunnelEvents: bookingRows.length,
    rageClicks: rageRows.length,
  };
}

async function main() {
  const [gsc, ux] = await Promise.all([auditGsc(), auditSupabaseUx()]);
  console.log(JSON.stringify({ timestamp: new Date().toISOString(), gsc, ux }, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
