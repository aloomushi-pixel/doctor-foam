/**
 * Doctor Foam México — Script de Auditoría Autónoma (Estándar Maestro v2.1 + GSC siteOwner Activo)
 * 1. Consulta Google Search Console API (sc-domain:drfoam.com.mx y https://drfoam.com.mx/)
 * 2. Envía/actualiza sitemap.xml automáticamente vía webmasters/v3
 * 3. Sincroniza el snapshot de Search Console y el resumen ejecutivo de clientes/WhatsApp
 *    en la ÚNICA tabla aislada: public.drfoam_ux_events en el proyecto Supabase de Tres Raíces (pghqeoijbtzipzziezmn)
 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const https = require("https");

const SUPABASE_URL = "https://pghqeoijbtzipzziezmn.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnaHFlb2lqYnR6aXB6emllem1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2NTY1MzAsImV4cCI6MjA5MDIzMjUzMH0.e7YfCBC9diL1KDaKz52EBPfEUa8R2iahXpXF0xctsNg";

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
      scope: "https://www.googleapis.com/auth/webmasters",
      aud: creds.token_uri,
      exp: now + 3600,
      iat: now,
    })
  ).toString("base64url");
  const sign = crypto.createSign("RSA-SHA256");
  sign.update(header + "." + claim);
  const signature = sign.sign(creds.private_key, "base64url");
  const jwt = header + "." + claim + "." + signature;

  const tokenBody = "grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=" + jwt;
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
    headers: { Authorization: "Bearer " + accessToken },
  });

  const allSites = (sitesRes.data && sitesRes.data.siteEntry) || [];
  const drfoamSites = allSites.filter(
    (s) => s.siteUrl.includes("drfoam") || s.siteUrl.includes("doctorfoam")
  );

  const verifiedSite =
    drfoamSites.find(
      (s) => s.siteUrl === "sc-domain:drfoam.com.mx" && s.permissionLevel !== "siteUnverifiedUser"
    ) || drfoamSites.find((s) => s.permissionLevel !== "siteUnverifiedUser");

  let summary = null;

  if (verifiedSite) {
    await httpJson(
      "https://www.googleapis.com/webmasters/v3/sites/" +
        encodeURIComponent(verifiedSite.siteUrl) +
        "/sitemaps/" +
        encodeURIComponent("https://drfoam.com.mx/sitemap.xml"),
      {
        method: "PUT",
        headers: { Authorization: "Bearer " + accessToken },
      }
    );

    const endDate = new Date().toISOString().slice(0, 10);
    const startDate = "2025-01-01";

    const queryBody = JSON.stringify({
      startDate,
      endDate,
      dimensions: ["query", "page"],
      rowLimit: 50,
    });
    const qRes = await httpJson(
      "https://www.googleapis.com/webmasters/v3/sites/" +
        encodeURIComponent(verifiedSite.siteUrl) +
        "/searchAnalytics/query",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(queryBody),
        },
      },
      queryBody
    );

    const rows = (qRes.data && qRes.data.rows) || [];
    let totalClicks = 0;
    let totalImpressions = 0;
    let weightedPosSum = 0;

    rows.forEach((r) => {
      totalClicks += r.clicks || 0;
      totalImpressions += r.impressions || 0;
      weightedPosSum += (r.position || 0) * (r.impressions || 1);
    });

    const avgCtr = totalImpressions > 0 ? Math.round((totalClicks / totalImpressions) * 1000) / 10 : 0;
    const avgPosition =
      totalImpressions > 0 ? Math.round((weightedPosSum / totalImpressions) * 10) / 10 : 0;

    const topQueries = rows.slice(0, 20).map((r) => ({
      query: r.keys[0],
      page: r.keys[1] ? r.keys[1].replace("https://drfoam.com.mx", "") || "/" : "/",
      clicks: r.clicks,
      impressions: r.impressions,
      ctr: Math.round((r.ctr || 0) * 1000) / 10,
      position: Math.round((r.position || 0) * 10) / 10,
    }));

    summary = {
      property: verifiedSite.siteUrl,
      permissionLevel: verifiedSite.permissionLevel,
      sitemapSubmitted: "https://drfoam.com.mx/sitemap.xml",
      totalClicks,
      totalImpressions,
      avgCtr,
      avgPosition,
      topQueries,
      syncedAt: new Date().toISOString(),
    };

    const syncBody = JSON.stringify([
      {
        session_id: "gsc-sync-" + Date.now(),
        visitor_id: "google-search-console-bot",
        event_name: "gsc_search_analytics_sync",
        event_category: "autonomous_cycle",
        path: "/",
        attribution_channel: "organic_search",
        device_type: "desktop",
        is_bot: true,
        bot_name: "GoogleSearchConsoleAPI",
        element_text: "GSC Sync: " + totalClicks + " clics / " + totalImpressions + " impresiones",
        metadata: summary,
      },
    ]);

    await httpJson(
      SUPABASE_URL + "/rest/v1/drfoam_ux_events",
      {
        method: "POST",
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: "Bearer " + SUPABASE_ANON_KEY,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
      },
      syncBody
    );
  }

  return {
    status: verifiedSite ? "verified_active" : "awaiting_gsc_property_verification",
    serviceAccount: creds.client_email,
    drfoamSites,
    summary,
  };
}

async function auditSupabaseUx() {
  const res = await httpJson(
    SUPABASE_URL + "/rest/v1/drfoam_ux_events?select=*&order=created_at.desc&limit=1000",
    {
      method: "GET",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: "Bearer " + SUPABASE_ANON_KEY,
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

  const whatsappByButton = {};
  const whatsappByPage = {};
  waRows.forEach((r) => {
    const btn = r.element_text || r.element_id || "WhatsApp CTA";
    const pg = r.path || "/";
    whatsappByButton[btn] = (whatsappByButton[btn] || 0) + 1;
    whatsappByPage[pg] = (whatsappByPage[pg] || 0) + 1;
  });

  const uxSummary = {
    supabaseProject: "pghqeoijbtzipzziezmn (Tres Raices)",
    isolatedTable: "public.drfoam_ux_events",
    totalEventsStored: rows.length,
    humanVisitorsEntered: visitors.size,
    humanSessions: sessions.size,
    whatsappVisitors: waVisitors.size,
    whatsappTotalClicks: waRows.length,
    whatsappConversionPct:
      visitors.size > 0 ? Math.round((waVisitors.size / visitors.size) * 1000) / 10 : 0,
    whatsappByButton,
    whatsappByPage,
    bookingFunnelEvents: bookingRows.length,
    rageClicks: rageRows.length,
  };

  // Persist latest executive summary snapshot directly inside public.drfoam_ux_events
  const execSummaryBody = JSON.stringify([
    {
      session_id: "exec-summary-" + Date.now(),
      visitor_id: "drfoam-executive-summary",
      event_name: "drfoam_executive_summary",
      event_category: "autonomous_cycle",
      path: "/",
      is_bot: true,
      bot_name: "DrFoamExecutiveSummary",
      element_text: `Clientes que entraron: ${visitors.size} | Se fueron por WhatsApp: ${waVisitors.size} (${uxSummary.whatsappConversionPct}%)`,
      metadata: uxSummary,
    },
  ]);

  await httpJson(
    SUPABASE_URL + "/rest/v1/drfoam_ux_events",
    {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: "Bearer " + SUPABASE_ANON_KEY,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
    },
    execSummaryBody
  );

  return uxSummary;
}

async function main() {
  const [gsc, ux] = await Promise.all([auditGsc(), auditSupabaseUx()]);
  console.log(JSON.stringify({ timestamp: new Date().toISOString(), gsc, ux }, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
