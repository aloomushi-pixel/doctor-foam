/**
 * Doctor Foam — Motor de Telemetría UX, Embudo y Conversión WhatsApp
 * Almacenado en una única tabla aislada en el proyecto Supabase de Tres Raíces:
 * Tabla: public.drfoam_ux_events (https://pghqeoijbtzipzziezmn.supabase.co)
 */

export const SUPABASE_TELEMETRY_URL =
  process.env.NEXT_PUBLIC_TRES_RAICES_SUPABASE_URL ||
  "https://pghqeoijbtzipzziezmn.supabase.co";

export const SUPABASE_TELEMETRY_ANON_KEY =
  process.env.NEXT_PUBLIC_TRES_RAICES_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnaHFlb2lqYnR6aXB6emllem1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2NTY1MzAsImV4cCI6MjA5MDIzMjUzMH0.e7YfCBC9diL1KDaKz52EBPfEUa8R2iahXpXF0xctsNg";

export const TELEMETRY_TABLE = "drfoam_ux_events";

export type DrFoamEventCategory =
  | "navigation"
  | "conversion_whatsapp"
  | "conversion_booking"
  | "conversion_brochure"
  | "ux_interaction"
  | "ux_friction"
  | "performance"
  | "seo_geo"
  | "autonomous_cycle";

export interface DrFoamTelemetryPayload {
  event_name: string;
  event_category: DrFoamEventCategory;
  path?: string;
  duration_ms?: number;
  scroll_pct?: number;
  element_tag?: string;
  element_id?: string;
  element_text?: string;
  whatsapp_destination?: string;
  package_name?: string;
  vehicle_size?: string;
  booking_step?: number;
  estimated_value_mxn?: number;
  metadata?: Record<string, unknown>;
}

export interface DrFoamTelemetryRow {
  id: string;
  created_at: string;
  session_id: string;
  visitor_id: string;
  event_name: string;
  event_category: string;
  path: string;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  attribution_channel: string | null;
  ai_engine: string | null;
  device_type: string | null;
  viewport_w: number | null;
  viewport_h: number | null;
  is_bot: boolean;
  bot_name: string | null;
  duration_ms: number | null;
  scroll_pct: number | null;
  element_tag: string | null;
  element_id: string | null;
  element_text: string | null;
  whatsapp_destination: string | null;
  package_name: string | null;
  vehicle_size: string | null;
  booking_step: number | null;
  estimated_value_mxn: number | null;
  metadata: Record<string, unknown> | null;
}

const SESSION_KEY = "drfoam_telemetry_session_id";
const VISITOR_KEY = "drfoam_telemetry_visitor_id";
const SESSION_STARTED_KEY = "drfoam_telemetry_session_started";
const UTM_KEY = "drfoam_telemetry_utms";
const ATTR_KEY = "drfoam_telemetry_attribution";

function generateUuid(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getDrFoamSessionId(): string {
  if (typeof window === "undefined") return "server";
  try {
    let sid = sessionStorage.getItem(SESSION_KEY);
    if (!sid) {
      sid = generateUuid();
      sessionStorage.setItem(SESSION_KEY, sid);
    }
    return sid;
  } catch {
    return generateUuid();
  }
}

export function getDrFoamVisitorId(): string {
  if (typeof window === "undefined") return "server";
  try {
    let vid = localStorage.getItem(VISITOR_KEY);
    if (!vid) {
      vid = generateUuid();
      localStorage.setItem(VISITOR_KEY, vid);
    }
    return vid;
  } catch {
    return generateUuid();
  }
}

export function isNewSession(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const started = sessionStorage.getItem(SESSION_STARTED_KEY);
    if (!started) {
      sessionStorage.setItem(SESSION_STARTED_KEY, "1");
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export function getDeviceType(): "mobile" | "tablet" | "desktop" {
  if (typeof window === "undefined") return "desktop";
  const w = window.innerWidth;
  if (w < 768) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

export function detectBot(ua: string): { is_bot: boolean; bot_name: string | null } {
  const lower = (ua || "").toLowerCase();
  const bots: Array<{ pattern: RegExp; name: string }> = [
    { pattern: /gptbot/i, name: "GPTBot" },
    { pattern: /oai-searchbot/i, name: "OAI-SearchBot" },
    { pattern: /chatgpt-user/i, name: "ChatGPT-User" },
    { pattern: /claudebot|anthropic-ai/i, name: "ClaudeBot" },
    { pattern: /perplexitybot/i, name: "PerplexityBot" },
    { pattern: /google-extended/i, name: "Google-Extended" },
    { pattern: /google-inspectiontool|googleother|adsbot-google|apis-google|mediapartners-google/i, name: "Googlebot-WRS" },
    { pattern: /googlebot/i, name: "Googlebot" },
    { pattern: /bingbot/i, name: "Bingbot" },
    { pattern: /applebot/i, name: "AppleBot" },
    { pattern: /ahrefsbot|semrushbot|dotbot|mj12bot|petalbot|bytespider|yandexbot|baiduspider/i, name: "SEOBot" },
    { pattern: /lighthouse|pagespeed|chrome-lighthouse|gtmetrix|pingdom|uptimerobot/i, name: "PerfAuditBot" },
    { pattern: /meta-externalagent|facebookexternalhit/i, name: "MetaBot" },
    { pattern: /bot|crawler|spider|headlesschrome/i, name: "GenericBot" },
  ];
  for (const b of bots) {
    if (b.pattern.test(lower)) {
      return { is_bot: true, bot_name: b.name };
    }
  }
  if (typeof window !== "undefined") {
    if (navigator.webdriver === true || (window.innerHeight && window.innerHeight >= 5000)) {
      return { is_bot: true, bot_name: "Googlebot-WRS" };
    }
    if (window.innerWidth === 0 || window.innerHeight === 0) {
      return { is_bot: true, bot_name: "HeadlessPreloadBot" };
    }
    const ref = (document.referrer || "").toLowerCase();
    if (
      (window.innerWidth === 800 && window.innerHeight === 600) ||
      ref.includes("aocr.org")
    ) {
      return { is_bot: true, bot_name: "HeadlessScraperBot" };
    }
  }
  return { is_bot: false, bot_name: null };
}

export function getUtmParams(): {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
} {
  if (typeof window === "undefined") {
    return { utm_source: null, utm_medium: null, utm_campaign: null };
  }
  try {
    const params = new URLSearchParams(window.location.search);
    const s = params.get("utm_source");
    const m = params.get("utm_medium");
    const c = params.get("utm_campaign");
    if (s || m || c) {
      const data = { utm_source: s, utm_medium: m, utm_campaign: c };
      sessionStorage.setItem(UTM_KEY, JSON.stringify(data));
      return data;
    }
    const saved = sessionStorage.getItem(UTM_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // ignore
  }
  return { utm_source: null, utm_medium: null, utm_campaign: null };
}

export function detectTrafficAttribution(): {
  attribution_channel: string;
  ai_engine: string | null;
} {
  if (typeof window === "undefined") {
    return { attribution_channel: "direct", ai_engine: null };
  }
  try {
    const saved = sessionStorage.getItem(ATTR_KEY);
    if (saved) return JSON.parse(saved);

    const ref = (document.referrer || "").toLowerCase();
    const search = (window.location.search || "").toLowerCase();
    const combined = `${ref} ${search}`;

    let result: { attribution_channel: string; ai_engine: string | null } = {
      attribution_channel: "direct",
      ai_engine: null,
    };

    if (combined.includes("chatgpt.com") || combined.includes("openai.com")) {
      result = { attribution_channel: "geo_ai", ai_engine: "ChatGPT" };
    } else if (combined.includes("perplexity.ai")) {
      result = { attribution_channel: "geo_ai", ai_engine: "Perplexity" };
    } else if (combined.includes("claude.ai") || combined.includes("anthropic.com")) {
      result = { attribution_channel: "geo_ai", ai_engine: "Claude" };
    } else if (combined.includes("gemini.google.com") || combined.includes("bard.google.com")) {
      result = { attribution_channel: "geo_ai", ai_engine: "Gemini" };
    } else if (combined.includes("copilot.microsoft.com")) {
      result = { attribution_channel: "geo_ai", ai_engine: "Copilot" };
    } else if (search.includes("rwg_token=")) {
      result = { attribution_channel: "google_maps_rwg", ai_engine: null };
    } else if (search.includes("utm_source=brochure_pdf")) {
      result = { attribution_channel: "brochure_pdf", ai_engine: null };
    } else if (/google\.|bing\.|duckduckgo\.|yahoo\./i.test(ref)) {
      result = { attribution_channel: "organic_search", ai_engine: null };
    } else if (/instagram\.|facebook\.|tiktok\.|t\.co|youtube\./i.test(ref)) {
      result = { attribution_channel: "social", ai_engine: null };
    } else if (
      search.includes("utm_medium=cpc") ||
      search.includes("gclid=") ||
      search.includes("fbclid=")
    ) {
      result = { attribution_channel: "paid", ai_engine: null };
    } else if (ref && !ref.includes(window.location.hostname)) {
      result = { attribution_channel: "referral", ai_engine: null };
    }

    sessionStorage.setItem(ATTR_KEY, JSON.stringify(result));
    return result;
  } catch {
    return { attribution_channel: "direct", ai_engine: null };
  }
}

export async function insertTelemetryRows(rows: Record<string, unknown>[]): Promise<void> {
  if (!rows.length) return;
  try {
    await fetch(`${SUPABASE_TELEMETRY_URL}/rest/v1/${TELEMETRY_TABLE}`, {
      method: "POST",
      keepalive: true,
      headers: {
        apikey: SUPABASE_TELEMETRY_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_TELEMETRY_ANON_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(rows),
    });
  } catch {
    // Silent fail: telemetry must never interrupt user experience
  }
}

export function trackDrFoamEvent(payload: DrFoamTelemetryPayload): void {
  if (typeof window === "undefined") return;
  // Do not pollute customer UX metrics with /admin dashboard visits unless explicitly logging a cycle
  if (
    window.location.pathname.startsWith("/admin") &&
    payload.event_category !== "autonomous_cycle"
  ) {
    return;
  }

  try {
    const pathname = payload.path || window.location.pathname + window.location.search;
    const utms = getUtmParams();
    const attribution = detectTrafficAttribution();
    const bot = detectBot(navigator.userAgent || "");

    const row: Record<string, unknown> = {
      session_id: getDrFoamSessionId(),
      visitor_id: getDrFoamVisitorId(),
      event_name: payload.event_name,
      event_category: payload.event_category,
      path: pathname,
      referrer: document.referrer || null,
      utm_source: utms.utm_source || attribution.ai_engine,
      utm_medium: utms.utm_medium || attribution.attribution_channel,
      utm_campaign: utms.utm_campaign,
      attribution_channel: attribution.attribution_channel,
      ai_engine: attribution.ai_engine,
      device_type: getDeviceType(),
      viewport_w: window.innerWidth || 0,
      viewport_h: window.innerHeight || 0,
      is_bot: bot.is_bot,
      bot_name: bot.bot_name,
      duration_ms: payload.duration_ms != null ? Math.round(payload.duration_ms) : null,
      scroll_pct: payload.scroll_pct != null ? Math.round(payload.scroll_pct) : null,
      element_tag: payload.element_tag ? payload.element_tag.slice(0, 64) : null,
      element_id: payload.element_id ? payload.element_id.slice(0, 120) : null,
      element_text: payload.element_text ? payload.element_text.slice(0, 200) : null,
      whatsapp_destination: payload.whatsapp_destination || null,
      package_name: payload.package_name || null,
      vehicle_size: payload.vehicle_size || null,
      booking_step: payload.booking_step != null ? payload.booking_step : null,
      estimated_value_mxn:
        payload.estimated_value_mxn != null ? payload.estimated_value_mxn : null,
      metadata: {
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "America/Mexico_City",
        language: navigator.language || "es-MX",
        ...(payload.metadata || {}),
      },
    };

    void insertTelemetryRows([row]);
  } catch {
    // Silent fail
  }
}

export async function fetchDrFoamTelemetryEvents(
  days: number = 30
): Promise<DrFoamTelemetryRow[]> {
  try {
    let url = `${SUPABASE_TELEMETRY_URL}/rest/v1/${TELEMETRY_TABLE}?select=*&order=created_at.desc&limit=5000`;
    if (days > 0) {
      const sinceIso = new Date(Date.now() - days * 86400 * 1000).toISOString();
      url += `&created_at=gte.${encodeURIComponent(sinceIso)}`;
    }
    const res = await fetch(url, {
      headers: {
        apikey: SUPABASE_TELEMETRY_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_TELEMETRY_ANON_KEY}`,
      },
      cache: "no-store",
    });
    if (!res.ok) return [];
    return (await res.json()) as DrFoamTelemetryRow[];
  } catch {
    return [];
  }
}
