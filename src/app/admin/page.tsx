"use client";

import {
    DrFoamTelemetryRow,
    SUPABASE_TELEMETRY_ANON_KEY,
    SUPABASE_TELEMETRY_URL,
    fetchDrFoamTelemetryEvents,
} from "@/lib/telemetry";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

interface AutonomousLogRow {
    id: string;
    cycle_number: number;
    project_name: string;
    version_tag?: string | null;
    short_summary?: string | null;
    changes_applied?: string[] | null;
    deployment_uuid?: string | null;
    commit_hash: string | null;
    Build_status: string | null;
    deploy_status: string | null;
    fixes_applied: string[] | null;
    email_sent: boolean | null;
    report_summary: Record<string, unknown> | null;
    created_at: string;
}

interface GscQueryRow {
    query: string;
    page: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
}

interface GscSyncMetadata {
    property?: string;
    permissionLevel?: string;
    sitemapSubmitted?: string;
    totalClicks?: number;
    totalImpressions?: number;
    avgCtr?: number;
    avgPosition?: number;
    topQueries?: GscQueryRow[];
    syncedAt?: string;
}

type DateFilter = "today" | "7d" | "30d" | "all";
type ActiveTab = "resumen" | "sesiones" | "autonomo";
type SessionFilter = "all" | "whatsapp" | "booking";

function formatWhatsappLocation(loc: string | null | undefined): string {
    if (!loc) return "Botón WhatsApp General";
    const map: Record<string, string> = {
        floating_whatsapp_button: "💬 Burbuja Flotante WhatsApp",
        floating_whatsapp_bubble: "💬 Burbuja Flotante WhatsApp",
        reservar_whatsapp_help: "📅 Ayuda en /reservar",
        reservar_ayuda_whatsapp: "📅 Ayuda en /reservar",
        post_pago_whatsapp_confirm: "✅ Confirmación Post-Pago",
        pago_exitoso_whatsapp: "✅ Confirmación Post-Pago",
        membresia_whatsapp_cta: "👑 Membresía VIP",
        corporativo_b2b_whatsapp_cta: "🏢 Flotillas / Corporativo B2B",
        footer_whatsapp_link: "🦶 Pie de Página",
        inline_whatsapp_cta: "🚀 Botón WhatsApp en Página",
        chat_support_to_whatsapp: "💬 Botón Chat / Ayuda",
    };
    return map[loc] || loc.replace(/_/g, " ");
}

function formatChannel(ch: string | null | undefined): { label: string; color: string; bg: string } {
    switch (ch) {
        case "organic_search":
            return { label: "🔍 Google Orgánico", color: "#059669", bg: "rgba(16, 185, 129, 0.12)" };
        case "geo_ai":
        case "ai_search":
            return { label: "🤖 IA (ChatGPT/Perplexity)", color: "#7c3aed", bg: "rgba(124, 58, 237, 0.12)" };
        case "paid":
        case "paid_ads":
            return { label: "📣 Campaña Pagada", color: "#d97706", bg: "rgba(245, 158, 11, 0.12)" };
        case "social":
            return { label: "📱 Redes Sociales", color: "#db2777", bg: "rgba(219, 39, 119, 0.12)" };
        case "referral":
            return { label: "🔗 Referencia Externa", color: "#2563eb", bg: "rgba(37, 99, 235, 0.12)" };
        default:
            return { label: "🌐 Tráfico Directo", color: "#475569", bg: "rgba(100, 116, 139, 0.12)" };
    }
}

export default function AdminDashboardPage() {
    const [events, setEvents] = useState<DrFoamTelemetryRow[]>([]);
    const [autoLogs, setAutoLogs] = useState<AutonomousLogRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
    const [dateFilter, setDateFilter] = useState<DateFilter>("30d");
    const [activeTab, setActiveTab] = useState<ActiveTab>("resumen");
    const [sessionFilter, setSessionFilter] = useState<SessionFilter>("all");
    const [includeBots, setIncludeBots] = useState(false);

    const loadAllData = useCallback(async () => {
        setRefreshing(true);
        try {
            const [uxRows, logsRes] = await Promise.all([
                fetchDrFoamTelemetryEvents(365),
                fetch(
                    `${SUPABASE_TELEMETRY_URL}/rest/v1/autonomous_evolution_logs?select=*&project_name=ilike.*Doctor%20Foam*&order=created_at.desc&limit=50`,
                    {
                        headers: {
                            apikey: SUPABASE_TELEMETRY_ANON_KEY,
                            Authorization: `Bearer ${SUPABASE_TELEMETRY_ANON_KEY}`,
                        },
                        cache: "no-store",
                    }
                ),
            ]);

            setEvents(uxRows || []);
            if (logsRes.ok) {
                const logsJson = (await logsRes.json()) as AutonomousLogRow[];
                setAutoLogs(logsJson || []);
            }
            setLastUpdated(new Date());
        } catch (err) {
            console.error("Error loading admin telemetry:", err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        loadAllData();
        const interval = setInterval(loadAllData, 30000);
        return () => clearInterval(interval);
    }, [loadAllData]);

    /* ─── Filtered Events by Date & Bot Toggle ─── */
    const filteredEvents = useMemo(() => {
        const now = new Date();
        let cutoff: Date | null = null;
        if (dateFilter === "today") {
            cutoff = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        } else if (dateFilter === "7d") {
            cutoff = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        } else if (dateFilter === "30d") {
            cutoff = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        }

        return events.filter((ev) => {
            if (ev.event_category === "autonomous_cycle") return false;
            if (!includeBots && ev.is_bot) return false;
            if (cutoff && new Date(ev.created_at) < cutoff) return false;
            return true;
        });
    }, [events, dateFilter, includeBots]);

    /* ─── Latest Google Search Console Sync from public.drfoam_ux_events ─── */
    const latestGsc = useMemo<GscSyncMetadata | null>(() => {
        const gscEvent = events.find((e) => e.event_name === "gsc_search_analytics_sync");
        if (!gscEvent || !gscEvent.metadata) return null;
        return gscEvent.metadata as unknown as GscSyncMetadata;
    }, [events]);

    /* ─── Core Executive Aggregations ─── */
    const stats = useMemo(() => {
        const uniqueVisitors = new Set<string>();
        const uniqueSessions = new Set<string>();
        const whatsappVisitors = new Set<string>();
        const whatsappSessions = new Set<string>();
        const bookingVisitors = new Set<string>();
        const checkoutVisitors = new Set<string>();
        const paidVisitors = new Set<string>();

        let totalPageViews = 0;
        let totalWhatsappClicks = 0;
        let totalReserveCtaClicks = 0;
        let totalCheckoutsInitiated = 0;
        let totalCheckoutsCompleted = 0;
        let totalRageClicks = 0;
        let estimatedPipelineMxn = 0;

        const durationValues: number[] = [];
        const scrollValues: number[] = [];

        const deviceCounts: Record<string, Set<string>> = {
            mobile: new Set(),
            desktop: new Set(),
            tablet: new Set(),
        };

        const channelCounts: Record<string, Set<string>> = {};
        const whatsappByLocation: Record<string, number> = {};
        const whatsappByPage: Record<string, number> = {};
        const packageInterest: Record<string, number> = {};

        // Step funnel counts (unique visitors)
        const stepVisitors: Record<number, Set<string>> = {
            1: new Set(),
            2: new Set(),
            3: new Set(),
            4: new Set(),
        };

        filteredEvents.forEach((ev) => {
            const vid = ev.visitor_id || ev.session_id;
            const sid = ev.session_id;
            uniqueVisitors.add(vid);
            uniqueSessions.add(sid);

            const dev = ev.device_type || "desktop";
            if (!deviceCounts[dev]) deviceCounts[dev] = new Set();
            deviceCounts[dev].add(vid);

            const ch = ev.attribution_channel || ev.utm_medium || "direct";
            if (!channelCounts[ch]) channelCounts[ch] = new Set();
            channelCounts[ch].add(vid);

            if (ev.package_name) {
                packageInterest[ev.package_name] = (packageInterest[ev.package_name] || 0) + 1;
            }

            if (ev.event_name === "page_view") {
                totalPageViews++;
                if (ev.path?.startsWith("/reservar")) {
                    bookingVisitors.add(vid);
                }
            }

            if (ev.event_name === "whatsapp_click") {
                totalWhatsappClicks++;
                whatsappVisitors.add(vid);
                whatsappSessions.add(sid);
                const loc = formatWhatsappLocation(ev.whatsapp_destination);
                whatsappByLocation[loc] = (whatsappByLocation[loc] || 0) + 1;
                const page = (ev.path || "/").split("?")[0];
                whatsappByPage[page] = (whatsappByPage[page] || 0) + 1;
            }

            if (ev.event_name === "cta_reservar_click" || ev.event_name === "stripe_subscription_click") {
                totalReserveCtaClicks++;
                bookingVisitors.add(vid);
            }

            if (ev.event_name === "booking_step_view" && ev.booking_step) {
                bookingVisitors.add(vid);
                if (stepVisitors[ev.booking_step]) {
                    stepVisitors[ev.booking_step].add(vid);
                }
            }

            if (ev.event_name === "checkout_initiated") {
                totalCheckoutsInitiated++;
                checkoutVisitors.add(vid);
                if (ev.estimated_value_mxn) {
                    estimatedPipelineMxn += Number(ev.estimated_value_mxn) || 0;
                }
            }

            if (ev.event_name === "checkout_completed") {
                totalCheckoutsCompleted++;
                paidVisitors.add(vid);
            }

            if (ev.event_name === "rage_click") {
                totalRageClicks++;
            }

            if (ev.duration_ms && ev.duration_ms > 0) {
                durationValues.push(Math.round(ev.duration_ms / 1000));
            }
            if (ev.scroll_pct && ev.scroll_pct > 0) {
                scrollValues.push(ev.scroll_pct);
            }
        });

        const visitorsCount = uniqueVisitors.size;
        const sessionsCount = uniqueSessions.size;
        const waVisitorsCount = whatsappVisitors.size;
        const waConversionRate = visitorsCount > 0 ? Math.round((waVisitorsCount / visitorsCount) * 1000) / 10 : 0;
        const bookingConversionRate = visitorsCount > 0 ? Math.round((bookingVisitors.size / visitorsCount) * 1000) / 10 : 0;

        const avgDuration = durationValues.length > 0
            ? Math.round(durationValues.reduce((a, b) => a + b, 0) / durationValues.length)
            : 0;
        const avgScroll = scrollValues.length > 0
            ? Math.round(scrollValues.reduce((a, b) => a + b, 0) / scrollValues.length)
            : 0;

        const mobilePct = visitorsCount > 0
            ? Math.round(((deviceCounts.mobile?.size || 0) / visitorsCount) * 100)
            : 0;

        return {
            visitorsCount,
            sessionsCount,
            totalPageViews,
            waVisitorsCount,
            waSessionsCount: whatsappSessions.size,
            totalWhatsappClicks,
            waConversionRate,
            bookingVisitorsCount: bookingVisitors.size,
            bookingConversionRate,
            totalReserveCtaClicks,
            checkoutVisitorsCount: checkoutVisitors.size,
            totalCheckoutsInitiated,
            paidVisitorsCount: paidVisitors.size,
            totalCheckoutsCompleted,
            estimatedPipelineMxn,
            avgDuration,
            avgScroll,
            totalRageClicks,
            mobilePct,
            desktopPct: Math.max(0, 100 - mobilePct),
            channelList: Object.entries(channelCounts)
                .map(([key, set]) => ({ key, count: set.size, ...formatChannel(key) }))
                .sort((a, b) => b.count - a.count),
            whatsappLocationList: Object.entries(whatsappByLocation)
                .map(([name, clics]) => ({ name, clics }))
                .sort((a, b) => b.clics - a.clics),
            whatsappPageList: Object.entries(whatsappByPage)
                .map(([page, clics]) => ({ page, clics }))
                .sort((a, b) => b.clics - a.clics),
            packageInterestList: Object.entries(packageInterest)
                .map(([name, interacciones]) => ({ name, interacciones }))
                .sort((a, b) => b.interacciones - a.interacciones),
            funnelSteps: {
                step1: stepVisitors[1].size,
                step2: stepVisitors[2].size,
                step3: stepVisitors[3].size,
                step4: stepVisitors[4].size,
            },
        };
    }, [filteredEvents]);

    /* ─── Daily Trend Chart (Last 7 Days) ─── */
    const dailyTrendData = useMemo(() => {
        const days = Array.from({ length: 7 }).map((_, idx) => {
            const d = new Date();
            d.setDate(d.getDate() - (6 - idx));
            return d.toISOString().split("T")[0];
        });

        return days.map((dateStr) => {
            const dayVisitors = new Set<string>();
            const dayWhatsappVisitors = new Set<string>();
            const dayBookingVisitors = new Set<string>();

            filteredEvents.forEach((ev) => {
                const evDate = new Date(ev.created_at).toISOString().split("T")[0];
                if (evDate !== dateStr) return;
                const vid = ev.visitor_id || ev.session_id;
                dayVisitors.add(vid);
                if (ev.event_name === "whatsapp_click") dayWhatsappVisitors.add(vid);
                if (
                    ev.event_name === "cta_reservar_click" ||
                    ev.event_name === "booking_step_view" ||
                    ev.event_name === "checkout_initiated"
                ) {
                    dayBookingVisitors.add(vid);
                }
            });

            return {
                fecha: new Date(dateStr + "T12:00:00").toLocaleDateString("es-MX", {
                    weekday: "short",
                    day: "numeric",
                }),
                entraron: dayVisitors.size,
                whatsapp: dayWhatsappVisitors.size,
                reservar: dayBookingVisitors.size,
            };
        });
    }, [filteredEvents]);

    /* ─── Per-Page Breakdown Table ─── */
    const pageBreakdown = useMemo(() => {
        const map: Record<
            string,
            {
                visitors: Set<string>;
                views: number;
                waClicks: number;
                waVisitors: Set<string>;
                reserveClicks: number;
                durations: number[];
                scrolls: number[];
            }
        > = {};

        filteredEvents.forEach((ev) => {
            const path = (ev.path || "/").split("?")[0];
            if (!map[path]) {
                map[path] = {
                    visitors: new Set(),
                    views: 0,
                    waClicks: 0,
                    waVisitors: new Set(),
                    reserveClicks: 0,
                    durations: [],
                    scrolls: [],
                };
            }
            const vid = ev.visitor_id || ev.session_id;
            map[path].visitors.add(vid);
            if (ev.event_name === "page_view") map[path].views++;
            if (ev.event_name === "whatsapp_click") {
                map[path].waClicks++;
                map[path].waVisitors.add(vid);
            }
            if (ev.event_name === "cta_reservar_click" || ev.event_name === "checkout_initiated") {
                map[path].reserveClicks++;
            }
            if (ev.duration_ms && ev.duration_ms > 0) {
                map[path].durations.push(Math.round(ev.duration_ms / 1000));
            }
            if (ev.scroll_pct && ev.scroll_pct > 0) {
                map[path].scrolls.push(ev.scroll_pct);
            }
        });

        return Object.entries(map)
            .map(([path, d]) => {
                const vCount = d.visitors.size;
                const waCount = d.waVisitors.size;
                const waRate = vCount > 0 ? Math.round((waCount / vCount) * 1000) / 10 : 0;
                const avgDur =
                    d.durations.length > 0
                        ? Math.round(d.durations.reduce((a, b) => a + b, 0) / d.durations.length)
                        : 0;
                const avgScr =
                    d.scrolls.length > 0
                        ? Math.round(d.scrolls.reduce((a, b) => a + b, 0) / d.scrolls.length)
                        : 0;
                return {
                    path,
                    visitors: vCount,
                    views: Math.max(d.views, vCount),
                    waVisitors: waCount,
                    waClicks: d.waClicks,
                    waRate,
                    reserveClicks: d.reserveClicks,
                    avgDur,
                    avgScr,
                };
            })
            .sort((a, b) => b.visitors - a.visitors);
    }, [filteredEvents]);

    /* ─── Live Visitor Sessions Summary (Customer-by-Customer Journey) ─── */
    const customerSessions = useMemo(() => {
        const map: Record<
            string,
            {
                sessionId: string;
                visitorId: string;
                firstSeen: string;
                lastSeen: string;
                device: string;
                channel: string;
                referrer: string;
                entryPage: string;
                lastPage: string;
                pagesVisited: Set<string>;
                wentToWhatsapp: boolean;
                whatsappClicks: number;
                whatsappLocation: string | null;
                whatsappText: string | null;
                wentToBooking: boolean;
                initiatedCheckout: boolean;
                completedCheckout: boolean;
                packageViewed: string | null;
                vehicleSize: string | null;
                estimatedValue: number;
                maxScroll: number;
                maxDuration: number;
            }
        > = {};

        // Process chronologically (oldest to newest)
        const chronological = [...filteredEvents].sort(
            (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );

        chronological.forEach((ev) => {
            const sid = ev.session_id;
            const cleanPath = (ev.path || "/").split("?")[0];
            if (!map[sid]) {
                map[sid] = {
                    sessionId: sid,
                    visitorId: ev.visitor_id,
                    firstSeen: ev.created_at,
                    lastSeen: ev.created_at,
                    device: ev.device_type || "desktop",
                    channel: ev.attribution_channel || ev.utm_medium || "direct",
                    referrer: ev.referrer || "direct",
                    entryPage: cleanPath,
                    lastPage: cleanPath,
                    pagesVisited: new Set([cleanPath]),
                    wentToWhatsapp: false,
                    whatsappClicks: 0,
                    whatsappLocation: null,
                    whatsappText: null,
                    wentToBooking: false,
                    initiatedCheckout: false,
                    completedCheckout: false,
                    packageViewed: ev.package_name || null,
                    vehicleSize: ev.vehicle_size || null,
                    estimatedValue: ev.estimated_value_mxn ? Number(ev.estimated_value_mxn) : 0,
                    maxScroll: ev.scroll_pct || 0,
                    maxDuration: ev.duration_ms ? Math.round(ev.duration_ms / 1000) : 0,
                };
            }

            const s = map[sid];
            s.lastSeen = ev.created_at;
            if (cleanPath) {
                s.lastPage = cleanPath;
                s.pagesVisited.add(cleanPath);
                if (cleanPath.startsWith("/reservar")) s.wentToBooking = true;
            }
            if (ev.package_name) s.packageViewed = ev.package_name;
            if (ev.vehicle_size) s.vehicleSize = ev.vehicle_size;
            if (ev.estimated_value_mxn && Number(ev.estimated_value_mxn) > s.estimatedValue) {
                s.estimatedValue = Number(ev.estimated_value_mxn);
            }
            if (ev.scroll_pct && ev.scroll_pct > s.maxScroll) s.maxScroll = ev.scroll_pct;
            if (ev.duration_ms) {
                const sec = Math.round(ev.duration_ms / 1000);
                if (sec > s.maxDuration) s.maxDuration = sec;
            }

            if (ev.event_name === "whatsapp_click") {
                s.wentToWhatsapp = true;
                s.whatsappClicks++;
                s.whatsappLocation = formatWhatsappLocation(ev.whatsapp_destination);
                s.whatsappText = ev.element_text || null;
            }
            if (
                ev.event_name === "cta_reservar_click" ||
                ev.event_name === "booking_step_view" ||
                ev.event_name === "stripe_subscription_click"
            ) {
                s.wentToBooking = true;
            }
            if (ev.event_name === "checkout_initiated") {
                s.wentToBooking = true;
                s.initiatedCheckout = true;
            }
            if (ev.event_name === "checkout_completed") {
                s.wentToBooking = true;
                s.completedCheckout = true;
            }
        });

        const allSessions = Object.values(map).sort(
            (a, b) => new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime()
        );

        if (sessionFilter === "whatsapp") {
            return allSessions.filter((s) => s.wentToWhatsapp);
        }
        if (sessionFilter === "booking") {
            return allSessions.filter((s) => s.wentToBooking || s.initiatedCheckout);
        }
        return allSessions;
    }, [filteredEvents, sessionFilter]);

    /* ─── Export CSV ─── */
    const handleExportCsv = () => {
        const headers = [
            "Fecha",
            "Sesion_ID",
            "Visitante_ID",
            "Evento",
            "Categoria",
            "Pagina",
            "Dispositivo",
            "Canal",
            "Ubicacion_WhatsApp",
            "Paquete",
            "Valor_MXN",
            "Duracion_Seg",
            "Scroll_Pct",
        ];
        const rows = filteredEvents.map((e) => [
            new Date(e.created_at).toLocaleString("es-MX"),
            e.session_id,
            e.visitor_id,
            e.event_name,
            e.event_category,
            e.path,
            e.device_type || "",
            e.attribution_channel || "direct",
            e.whatsapp_destination || "",
            e.package_name || "",
            e.estimated_value_mxn || "",
            e.duration_ms ? Math.round(e.duration_ms / 1000) : "",
            e.scroll_pct || "",
        ]);
        const csvContent =
            "data:text/csv;charset=utf-8," +
            [headers.join(","), ...rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))].join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `doctor-foam-ux-whatsapp-${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div style={{ minHeight: "100vh", background: "#f8fafc", color: "#0f172a", paddingBottom: "4rem" }}>
            {/* Top Navigation Bar */}
            <header
                style={{
                    background: "#ffffff",
                    borderBottom: "1px solid #e2e8f0",
                    position: "sticky",
                    top: 0,
                    zIndex: 50,
                    boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
                }}
            >
                <div
                    className="container"
                    style={{
                        maxWidth: "1320px",
                        margin: "0 auto",
                        padding: "1rem 1.5rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "1rem",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "1.35rem", color: "#0f172a" }}>
                                DOCTOR <span className="gradient-text">FOAM</span>
                            </span>
                        </Link>
                        <span
                            style={{
                                padding: "0.25rem 0.7rem",
                                borderRadius: "999px",
                                background: "rgba(37, 99, 235, 0.1)",
                                color: "#1d4ed8",
                                fontSize: "0.75rem",
                                fontWeight: 700,
                                fontFamily: "var(--font-heading)",
                                border: "1px solid rgba(37, 99, 235, 0.2)",
                            }}
                        >
                            📊 Panel Ejecutivo /admin · UX & WhatsApp
                        </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
                        {/* Date Range Selector */}
                        <div
                            style={{
                                display: "flex",
                                background: "#f1f5f9",
                                padding: "0.2rem",
                                borderRadius: "0.6rem",
                                border: "1px solid #e2e8f0",
                            }}
                        >
                            {(
                                [
                                    { id: "today", label: "Hoy" },
                                    { id: "7d", label: "7 días" },
                                    { id: "30d", label: "30 días" },
                                    { id: "all", label: "Todo" },
                                ] as { id: DateFilter; label: string }[]
                            ).map((d) => (
                                <button
                                    key={d.id}
                                    type="button"
                                    onClick={() => setDateFilter(d.id)}
                                    style={{
                                        padding: "0.35rem 0.75rem",
                                        borderRadius: "0.45rem",
                                        border: "none",
                                        fontSize: "0.78rem",
                                        fontWeight: 700,
                                        cursor: "pointer",
                                        fontFamily: "var(--font-heading)",
                                        background: dateFilter === d.id ? "#2563eb" : "transparent",
                                        color: dateFilter === d.id ? "#ffffff" : "#475569",
                                        transition: "all 0.2s",
                                    }}
                                >
                                    {d.label}
                                </button>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={loadAllData}
                            style={{
                                padding: "0.45rem 0.85rem",
                                borderRadius: "0.5rem",
                                background: "#ffffff",
                                border: "1px solid #cbd5e1",
                                color: "#0f172a",
                                fontSize: "0.8rem",
                                fontWeight: 600,
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.35rem",
                            }}
                        >
                            <span>{refreshing ? "⏳" : "↻"}</span>
                            <span>{refreshing ? "Actualizando..." : "Actualizar"}</span>
                        </button>

                        <button
                            type="button"
                            onClick={handleExportCsv}
                            style={{
                                padding: "0.45rem 0.85rem",
                                borderRadius: "0.5rem",
                                background: "#ecfdf5",
                                border: "1px solid #a7f3d0",
                                color: "#047857",
                                fontSize: "0.8rem",
                                fontWeight: 700,
                                cursor: "pointer",
                            }}
                        >
                            📥 Exportar CSV
                        </button>

                        <Link
                            href="/"
                            style={{
                                padding: "0.45rem 0.85rem",
                                borderRadius: "0.5rem",
                                background: "#f8fafc",
                                border: "1px solid #e2e8f0",
                                color: "#475569",
                                fontSize: "0.8rem",
                                fontWeight: 600,
                                textDecoration: "none",
                            }}
                        >
                            ↗ Ver Sitio
                        </Link>
                    </div>
                </div>
            </header>

            <main className="container" style={{ maxWidth: "1320px", margin: "0 auto", padding: "2rem 1.5rem 0" }}>
                {/* Subtitle + Status Banner */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "1rem",
                        marginBottom: "1.5rem",
                    }}
                >
                    <div>
                        <h1
                            style={{
                                fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)",
                                fontWeight: 900,
                                fontFamily: "var(--font-heading)",
                                color: "#0f172a",
                                margin: "0 0 0.3rem",
                            }}
                        >
                            Resumen de Clientes: Entradas al Sitio vs. Salidas a WhatsApp
                        </h1>
                        <p style={{ color: "#475569", fontSize: "0.9rem", margin: 0 }}>
                            Conectado en tiempo real a la tabla única{" "}
                            <code
                                style={{
                                    background: "#e2e8f0",
                                    padding: "0.15rem 0.45rem",
                                    borderRadius: "0.3rem",
                                    fontSize: "0.8rem",
                                    color: "#0f172a",
                                }}
                            >
                                public.drfoam_ux_events
                            </code>{" "}
                            en Supabase (Proyecto J. Denis).
                            {lastUpdated && (
                                <span style={{ marginLeft: "0.75rem", color: "#64748b", fontSize: "0.8rem" }}>
                                    · Última sincronización:{" "}
                                    {lastUpdated.toLocaleTimeString("es-MX", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        second: "2-digit",
                                    })}
                                </span>
                            )}
                        </p>
                    </div>

                    {/* Navigation Tabs */}
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                        {(
                            [
                                { id: "resumen", label: "📊 Resumen & WhatsApp" },
                                { id: "sesiones", label: `👥 Bitácora de Clientes (${customerSessions.length})` },
                                { id: "autonomo", label: `🤖 Loop Autónomo SEO (${autoLogs.length})` },
                            ] as { id: ActiveTab; label: string }[]
                        ).map((t) => (
                            <button
                                key={t.id}
                                type="button"
                                onClick={() => setActiveTab(t.id)}
                                style={{
                                    padding: "0.55rem 1rem",
                                    borderRadius: "0.6rem",
                                    fontSize: "0.83rem",
                                    fontWeight: 700,
                                    fontFamily: "var(--font-heading)",
                                    cursor: "pointer",
                                    border: activeTab === t.id ? "1.5px solid #2563eb" : "1px solid #cbd5e1",
                                    background: activeTab === t.id ? "rgba(37, 99, 235, 0.08)" : "#ffffff",
                                    color: activeTab === t.id ? "#1d4ed8" : "#475569",
                                }}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ═══════════════════════════════════════════════════════════════════
                    HERO KPI ROW: ¿CUÁNTOS ENTRARON? vs ¿CUÁNTOS SE FUERON POR WHATSAPP?
                   ═══════════════════════════════════════════════════════════════════ */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
                        gap: "1.25rem",
                        marginBottom: "2rem",
                    }}
                >
                    {/* HERO CARD 1: CLIENTES QUE ENTRARON */}
                    <div
                        style={{
                            background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)",
                            color: "#ffffff",
                            borderRadius: "1rem",
                            padding: "1.6rem",
                            boxShadow: "0 12px 28px rgba(37, 99, 235, 0.22)",
                            position: "relative",
                            overflow: "hidden",
                        }}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <div>
                                <span
                                    style={{
                                        fontSize: "0.75rem",
                                        fontWeight: 800,
                                        textTransform: "uppercase",
                                        letterSpacing: "0.08em",
                                        color: "#bfdbfe",
                                        display: "block",
                                        marginBottom: "0.35rem",
                                    }}
                                >
                                    👥 Clientes que Entraron al Sitio
                                </span>
                                <div
                                    style={{
                                        fontSize: "2.85rem",
                                        fontWeight: 900,
                                        fontFamily: "var(--font-heading)",
                                        lineHeight: 1.05,
                                    }}
                                >
                                    {loading ? "..." : stats.visitorsCount.toLocaleString("es-MX")}
                                </div>
                            </div>
                            <div
                                style={{
                                    width: "48px",
                                    height: "48px",
                                    borderRadius: "0.85rem",
                                    background: "rgba(255, 255, 255, 0.16)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "1.5rem",
                                }}
                            >
                                👥
                            </div>
                        </div>
                        <div
                            style={{
                                marginTop: "1rem",
                                paddingTop: "0.85rem",
                                borderTop: "1px solid rgba(255, 255, 255, 0.18)",
                                display: "flex",
                                justifyContent: "space-between",
                                fontSize: "0.82rem",
                                color: "#e0f2fe",
                                flexWrap: "wrap",
                                gap: "0.5rem",
                            }}
                        >
                            <span>
                                <strong>{stats.sessionsCount}</strong> sesiones iniciadas
                            </span>
                            <span>
                                <strong>{stats.totalPageViews}</strong> páginas vistas
                            </span>
                            <span>
                                📱 {stats.mobilePct}% Móvil · 💻 {stats.desktopPct}% PC
                            </span>
                        </div>
                    </div>

                    {/* HERO CARD 2: CLIENTES QUE SE FUERON POR WHATSAPP */}
                    <div
                        style={{
                            background: "linear-gradient(135deg, #065f46 0%, #10b981 100%)",
                            color: "#ffffff",
                            borderRadius: "1rem",
                            padding: "1.6rem",
                            boxShadow: "0 12px 28px rgba(16, 185, 129, 0.22)",
                            position: "relative",
                            overflow: "hidden",
                        }}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <div>
                                <span
                                    style={{
                                        fontSize: "0.75rem",
                                        fontWeight: 800,
                                        textTransform: "uppercase",
                                        letterSpacing: "0.08em",
                                        color: "#a7f3d0",
                                        display: "block",
                                        marginBottom: "0.35rem",
                                    }}
                                >
                                    💬 Clientes que se Fueron por WhatsApp
                                </span>
                                <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem" }}>
                                    <span
                                        style={{
                                            fontSize: "2.85rem",
                                            fontWeight: 900,
                                            fontFamily: "var(--font-heading)",
                                            lineHeight: 1.05,
                                        }}
                                    >
                                        {loading ? "..." : stats.waVisitorsCount.toLocaleString("es-MX")}
                                    </span>
                                    <span
                                        style={{
                                            padding: "0.2rem 0.6rem",
                                            borderRadius: "999px",
                                            background: "rgba(255, 255, 255, 0.22)",
                                            fontSize: "0.85rem",
                                            fontWeight: 800,
                                        }}
                                    >
                                        {stats.waConversionRate}% de conversión
                                    </span>
                                </div>
                            </div>
                            <div
                                style={{
                                    width: "48px",
                                    height: "48px",
                                    borderRadius: "0.85rem",
                                    background: "rgba(255, 255, 255, 0.18)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "1.5rem",
                                }}
                            >
                                💬
                            </div>
                        </div>
                        <div
                            style={{
                                marginTop: "1rem",
                                paddingTop: "0.85rem",
                                borderTop: "1px solid rgba(255, 255, 255, 0.2)",
                                display: "flex",
                                justifyContent: "space-between",
                                fontSize: "0.82rem",
                                color: "#d1fae5",
                                flexWrap: "wrap",
                                gap: "0.5rem",
                            }}
                        >
                            <span>
                                <strong>{stats.totalWhatsappClicks}</strong> clics totales a WhatsApp
                            </span>
                            <span>
                                De cada 100 que entran, <strong>{Math.round(stats.waConversionRate)}</strong> van a WhatsApp
                            </span>
                        </div>
                    </div>

                    {/* HERO CARD 3: EMBUDO DE RESERVA Y CHECKOUT STRIPE */}
                    <div
                        style={{
                            background: "#ffffff",
                            borderRadius: "1rem",
                            padding: "1.6rem",
                            border: "1.5px solid #e2e8f0",
                            boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)",
                        }}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <div>
                                <span
                                    style={{
                                        fontSize: "0.75rem",
                                        fontWeight: 800,
                                        textTransform: "uppercase",
                                        letterSpacing: "0.08em",
                                        color: "#2563eb",
                                        display: "block",
                                        marginBottom: "0.35rem",
                                    }}
                                >
                                    📅 Interés en Reserva Online (/reservar)
                                </span>
                                <div style={{ display: "flex", alignItems: "baseline", gap: "0.6rem" }}>
                                    <span
                                        style={{
                                            fontSize: "2.5rem",
                                            fontWeight: 900,
                                            fontFamily: "var(--font-heading)",
                                            color: "#0f172a",
                                            lineHeight: 1.05,
                                        }}
                                    >
                                        {loading ? "..." : stats.bookingVisitorsCount}
                                    </span>
                                    <span style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 600 }}>
                                        clientes ({stats.bookingConversionRate}%)
                                    </span>
                                </div>
                            </div>
                            <div
                                style={{
                                    width: "44px",
                                    height: "44px",
                                    borderRadius: "0.75rem",
                                    background: "rgba(37, 99, 235, 0.1)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "1.35rem",
                                }}
                            >
                                💳
                            </div>
                        </div>
                        <div
                            style={{
                                marginTop: "1rem",
                                paddingTop: "0.85rem",
                                borderTop: "1px solid #f1f5f9",
                                display: "flex",
                                justifyContent: "space-between",
                                fontSize: "0.8rem",
                                color: "#475569",
                                flexWrap: "wrap",
                                gap: "0.4rem",
                            }}
                        >
                            <span>
                                Checkouts Stripe: <strong>{stats.totalCheckoutsInitiated}</strong>
                            </span>
                            <span>
                                Pagos Confirmados: <strong style={{ color: "#10b981" }}>{stats.totalCheckoutsCompleted}</strong>
                            </span>
                            <span>
                                Valor Embudo: <strong>${stats.estimatedPipelineMxn.toLocaleString("es-MX")} MXN</strong>
                            </span>
                        </div>
                    </div>

                    {/* HERO CARD 4: SALUD UX & RETENCIÓN */}
                    <div
                        style={{
                            background: "#ffffff",
                            borderRadius: "1rem",
                            padding: "1.6rem",
                            border: "1.5px solid #e2e8f0",
                            boxShadow: "0 4px 15px rgba(15, 23, 42, 0.04)",
                        }}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <div>
                                <span
                                    style={{
                                        fontSize: "0.75rem",
                                        fontWeight: 800,
                                        textTransform: "uppercase",
                                        letterSpacing: "0.08em",
                                        color: "#7c3aed",
                                        display: "block",
                                        marginBottom: "0.35rem",
                                    }}
                                >
                                    ⚡ Experiencia de Usuario (UX)
                                </span>
                                <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem" }}>
                                    <span
                                        style={{
                                            fontSize: "2.35rem",
                                            fontWeight: 900,
                                            fontFamily: "var(--font-heading)",
                                            color: "#0f172a",
                                            lineHeight: 1.05,
                                        }}
                                    >
                                        {stats.avgDuration}s
                                    </span>
                                    <span style={{ fontSize: "0.9rem", color: "#64748b", fontWeight: 600 }}>
                                        tiempo prom. · {stats.avgScroll}% scroll
                                    </span>
                                </div>
                            </div>
                            <div
                                style={{
                                    width: "44px",
                                    height: "44px",
                                    borderRadius: "0.75rem",
                                    background: "rgba(124, 58, 237, 0.1)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "1.35rem",
                                }}
                            >
                                ⚡
                            </div>
                        </div>
                        <div
                            style={{
                                marginTop: "1rem",
                                paddingTop: "0.85rem",
                                borderTop: "1px solid #f1f5f9",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                fontSize: "0.8rem",
                                color: "#475569",
                            }}
                        >
                            <span>
                                Fricción / Rage Clicks:{" "}
                                <strong style={{ color: stats.totalRageClicks > 0 ? "#dc2626" : "#10b981" }}>
                                    {stats.totalRageClicks}
                                </strong>
                            </span>
                            <label style={{ display: "flex", alignItems: "center", gap: "0.35rem", cursor: "pointer", fontSize: "0.75rem" }}>
                                <input
                                    type="checkbox"
                                    checked={includeBots}
                                    onChange={(e) => setIncludeBots(e.target.checked)}
                                />
                                Incluir bots/auditorías
                            </label>
                        </div>
                    </div>
                </div>

                {/* ═══════════════════════════════════════════════════════════════════
                    TAB 1: RESUMEN EJECUTIVO, WHATSAPP & EMBUDO
                   ═══════════════════════════════════════════════════════════════════ */}
                {activeTab === "resumen" && (
                    <>
                        {/* Charts Row */}
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
                                gap: "1.5rem",
                                marginBottom: "2rem",
                            }}
                        >
                            {/* Chart 1: Daily Visitors vs WhatsApp Exits */}
                            <div
                                style={{
                                    background: "#ffffff",
                                    borderRadius: "1rem",
                                    padding: "1.5rem",
                                    border: "1px solid #e2e8f0",
                                    height: "360px",
                                }}
                            >
                                <div style={{ marginBottom: "1rem" }}>
                                    <h2 style={{ fontSize: "1.05rem", fontWeight: 800, margin: "0 0 0.2rem", color: "#0f172a" }}>
                                        📈 Clientes que Entraron vs. Se Fueron por WhatsApp (Últimos 7 días)
                                    </h2>
                                    <p style={{ fontSize: "0.8rem", color: "#64748b", margin: 0 }}>
                                        Comparativa diaria de visitantes únicos, salidas a WhatsApp e intentos de reserva
                                    </p>
                                </div>
                                <ResponsiveContainer width="100%" height="80%">
                                    <AreaChart data={dailyTrendData} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="gradEntraron" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.28} />
                                                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="gradWhatsapp" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis dataKey="fecha" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} allowDecimals={false} />
                                        <Tooltip
                                            contentStyle={{
                                                borderRadius: "0.75rem",
                                                border: "1px solid #e2e8f0",
                                                boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
                                            }}
                                        />
                                        <Legend />
                                        <Area
                                            type="monotone"
                                            name="Clientes que Entraron"
                                            dataKey="entraron"
                                            stroke="#2563eb"
                                            strokeWidth={3}
                                            fillOpacity={1}
                                            fill="url(#gradEntraron)"
                                        />
                                        <Area
                                            type="monotone"
                                            name="Se fueron por WhatsApp"
                                            dataKey="whatsapp"
                                            stroke="#10b981"
                                            strokeWidth={3}
                                            fillOpacity={1}
                                            fill="url(#gradWhatsapp)"
                                        />
                                        <Area
                                            type="monotone"
                                            name="Intentaron Reservar Online"
                                            dataKey="reservar"
                                            stroke="#8b5cf6"
                                            strokeWidth={2}
                                            fillOpacity={0}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Chart 2: WhatsApp Clicks by Button Location */}
                            <div
                                style={{
                                    background: "#ffffff",
                                    borderRadius: "1rem",
                                    padding: "1.5rem",
                                    border: "1px solid #e2e8f0",
                                    height: "360px",
                                }}
                            >
                                <div style={{ marginBottom: "1rem" }}>
                                    <h2 style={{ fontSize: "1.05rem", fontWeight: 800, margin: "0 0 0.2rem", color: "#0f172a" }}>
                                        💬 ¿Desde qué botón se van a WhatsApp?
                                    </h2>
                                    <p style={{ fontSize: "0.8rem", color: "#64748b", margin: 0 }}>
                                        Desglose de clics a WhatsApp según el botón o sección utilizada por el cliente
                                    </p>
                                </div>
                                {stats.whatsappLocationList.length === 0 ? (
                                    <div
                                        style={{
                                            height: "75%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: "#64748b",
                                            fontSize: "0.9rem",
                                        }}
                                    >
                                        Aún no hay clics registrados a WhatsApp en este periodo.
                                    </div>
                                ) : (
                                    <ResponsiveContainer width="100%" height="80%">
                                        <BarChart
                                            data={stats.whatsappLocationList}
                                            layout="vertical"
                                            margin={{ top: 5, right: 25, left: 10, bottom: 5 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                                            <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12, fill: "#64748b" }} />
                                            <YAxis
                                                dataKey="name"
                                                type="category"
                                                width={185}
                                                tick={{ fontSize: 11, fill: "#0f172a", fontWeight: 600 }}
                                            />
                                            <Tooltip
                                                contentStyle={{
                                                    borderRadius: "0.75rem",
                                                    border: "1px solid #e2e8f0",
                                                }}
                                            />
                                            <Bar dataKey="clics" name="Clics a WhatsApp" fill="#10b981" radius={[0, 6, 6, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                )}
                            </div>
                        </div>

                        {/* Two-Path Conversion Funnel + Channels */}
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
                                gap: "1.5rem",
                                marginBottom: "2rem",
                            }}
                        >
                            {/* Embudo Comparativo: WhatsApp vs Reserva Online */}
                            <div
                                style={{
                                    background: "#ffffff",
                                    borderRadius: "1rem",
                                    padding: "1.5rem",
                                    border: "1px solid #e2e8f0",
                                }}
                            >
                                <h2 style={{ fontSize: "1.05rem", fontWeight: 800, margin: "0 0 0.35rem", color: "#0f172a" }}>
                                    🧭 Embudo de Conversión: ¿Qué hacen los clientes al entrar?
                                </h2>
                                <p style={{ fontSize: "0.82rem", color: "#64748b", margin: "0 0 1.25rem" }}>
                                    Comparativa entre los clientes que prefieren atención directa por WhatsApp vs. el flujo de reserva en línea
                                </p>

                                <div style={{ display: "grid", gap: "0.75rem" }}>
                                    {[
                                        {
                                            label: "1. Clientes que Entraron al Sitio",
                                            count: stats.visitorsCount,
                                            pct: 100,
                                            color: "#2563eb",
                                            bg: "#eff6ff",
                                        },
                                        {
                                            label: "💬 Camino A: Se fueron directo por WhatsApp",
                                            count: stats.waVisitorsCount,
                                            pct: stats.waConversionRate,
                                            color: "#059669",
                                            bg: "#ecfdf5",
                                        },
                                        {
                                            label: "📅 Camino B: Entraron a /reservar (Paso 1: Servicio)",
                                            count: Math.max(stats.bookingVisitorsCount, stats.funnelSteps.step1),
                                            pct: stats.bookingConversionRate,
                                            color: "#7c3aed",
                                            bg: "#f5f3ff",
                                        },
                                        {
                                            label: "🗓️ Paso 2 en /reservar: Eligieron Fecha en Calendario",
                                            count: stats.funnelSteps.step2,
                                            pct:
                                                stats.visitorsCount > 0
                                                    ? Math.round((stats.funnelSteps.step2 / stats.visitorsCount) * 1000) / 10
                                                    : 0,
                                            color: "#6366f1",
                                            bg: "#eef2ff",
                                        },
                                        {
                                            label: "📝 Paso 3 en /reservar: Llenaron Datos y Vehículo",
                                            count: stats.funnelSteps.step3,
                                            pct:
                                                stats.visitorsCount > 0
                                                    ? Math.round((stats.funnelSteps.step3 / stats.visitorsCount) * 1000) / 10
                                                    : 0,
                                            color: "#4f46e5",
                                            bg: "#e0e7ff",
                                        },
                                        {
                                            label: "💳 Paso 4: Iniciaron Pago en Stripe",
                                            count: stats.checkoutVisitorsCount,
                                            pct:
                                                stats.visitorsCount > 0
                                                    ? Math.round((stats.checkoutVisitorsCount / stats.visitorsCount) * 1000) / 10
                                                    : 0,
                                            color: "#0ea5e9",
                                            bg: "#f0f9ff",
                                        },
                                    ].map((row) => (
                                        <div
                                            key={row.label}
                                            style={{
                                                padding: "0.75rem 1rem",
                                                borderRadius: "0.75rem",
                                                background: row.bg,
                                                border: "1px solid rgba(15, 23, 42, 0.06)",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    marginBottom: "0.35rem",
                                                }}
                                            >
                                                <span style={{ fontWeight: 700, fontSize: "0.85rem", color: "#0f172a" }}>
                                                    {row.label}
                                                </span>
                                                <span style={{ fontWeight: 800, fontSize: "0.9rem", color: row.color }}>
                                                    {row.count} clientes ({row.pct}%)
                                                </span>
                                            </div>
                                            <div
                                                style={{
                                                    width: "100%",
                                                    height: "7px",
                                                    background: "rgba(255,255,255,0.8)",
                                                    borderRadius: "999px",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: `${Math.min(100, Math.max(4, row.pct))}%`,
                                                        height: "100%",
                                                        background: row.color,
                                                        borderRadius: "999px",
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Orígenes de Tráfico + Paquetes más Cotizados */}
                            <div style={{ display: "grid", gap: "1.5rem" }}>
                                <div
                                    style={{
                                        background: "#ffffff",
                                        borderRadius: "1rem",
                                        padding: "1.5rem",
                                        border: "1px solid #e2e8f0",
                                    }}
                                >
                                    <h2 style={{ fontSize: "1.05rem", fontWeight: 800, margin: "0 0 0.75rem", color: "#0f172a" }}>
                                        🌐 ¿De dónde llegan los clientes que entran?
                                    </h2>
                                    <div style={{ display: "grid", gap: "0.6rem" }}>
                                        {stats.channelList.length === 0 ? (
                                            <div style={{ color: "#64748b", fontSize: "0.85rem" }}>Sin datos de origen aún.</div>
                                        ) : (
                                            stats.channelList.map((ch) => {
                                                const pct =
                                                    stats.visitorsCount > 0
                                                        ? Math.round((ch.count / stats.visitorsCount) * 100)
                                                        : 0;
                                                return (
                                                    <div
                                                        key={ch.key}
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            alignItems: "center",
                                                            padding: "0.6rem 0.85rem",
                                                            borderRadius: "0.6rem",
                                                            background: ch.bg,
                                                        }}
                                                    >
                                                        <span style={{ fontWeight: 700, fontSize: "0.85rem", color: ch.color }}>
                                                            {ch.label}
                                                        </span>
                                                        <span style={{ fontWeight: 800, fontSize: "0.88rem", color: "#0f172a" }}>
                                                            {ch.count} clientes ({pct}%)
                                                        </span>
                                                    </div>
                                                );
                                            })
                                        )}
                                    </div>
                                </div>

                                <div
                                    style={{
                                        background: "#ffffff",
                                        borderRadius: "1rem",
                                        padding: "1.5rem",
                                        border: "1px solid #e2e8f0",
                                    }}
                                >
                                    <h2 style={{ fontSize: "1.05rem", fontWeight: 800, margin: "0 0 0.75rem", color: "#0f172a" }}>
                                        🏆 Paquetes con Mayor Interés
                                    </h2>
                                    <div style={{ display: "grid", gap: "0.55rem" }}>
                                        {stats.packageInterestList.length === 0 ? (
                                            <div style={{ color: "#64748b", fontSize: "0.85rem" }}>
                                                Aún sin selecciones de paquete registradas.
                                            </div>
                                        ) : (
                                            stats.packageInterestList.slice(0, 6).map((pkg) => (
                                                <div
                                                    key={pkg.name}
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        alignItems: "center",
                                                        padding: "0.55rem 0.85rem",
                                                        borderRadius: "0.6rem",
                                                        background: "#f8fafc",
                                                        border: "1px solid #e2e8f0",
                                                    }}
                                                >
                                                    <span style={{ fontWeight: 700, fontSize: "0.85rem", color: "#0f172a" }}>
                                                        🧽 {pkg.name}
                                                    </span>
                                                    <span
                                                        style={{
                                                            fontWeight: 800,
                                                            fontSize: "0.82rem",
                                                            color: "#2563eb",
                                                            background: "#eff6ff",
                                                            padding: "0.2rem 0.6rem",
                                                            borderRadius: "999px",
                                                        }}
                                                    >
                                                        {pkg.interacciones} interacciones
                                                    </span>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Page Performance Table: ¿En qué páginas entran y desde cuáles se van a WhatsApp? */}
                        <div
                            style={{
                                background: "#ffffff",
                                borderRadius: "1rem",
                                padding: "1.5rem",
                                border: "1px solid #e2e8f0",
                                overflowX: "auto",
                            }}
                        >
                            <div style={{ marginBottom: "1rem" }}>
                                <h2 style={{ fontSize: "1.1rem", fontWeight: 800, margin: "0 0 0.25rem", color: "#0f172a" }}>
                                    📄 Desglose por Página: Entradas vs. Salidas a WhatsApp
                                </h2>
                                <p style={{ fontSize: "0.82rem", color: "#64748b", margin: 0 }}>
                                    Identifica exactamente qué páginas atraen más visitantes y cuáles generan más conversaciones de WhatsApp
                                </p>
                            </div>

                            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.86rem" }}>
                                <thead>
                                    <tr style={{ borderBottom: "2px solid #e2e8f0", textAlign: "left", color: "#475569" }}>
                                        <th style={{ padding: "0.75rem" }}>Página / Ruta</th>
                                        <th style={{ padding: "0.75rem" }}>👥 Clientes que Entraron</th>
                                        <th style={{ padding: "0.75rem" }}>👀 Vistas</th>
                                        <th style={{ padding: "0.75rem" }}>💬 Se fueron a WhatsApp</th>
                                        <th style={{ padding: "0.75rem" }}>% Conv. WhatsApp</th>
                                        <th style={{ padding: "0.75rem" }}>📅 Clics Reservar</th>
                                        <th style={{ padding: "0.75rem" }}>⏱️ Tiempo Prom.</th>
                                        <th style={{ padding: "0.75rem" }}>📜 Scroll Prom.</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pageBreakdown.length === 0 ? (
                                        <tr>
                                            <td colSpan={8} style={{ padding: "2rem", textAlign: "center", color: "#64748b" }}>
                                                Cargando métricas de páginas...
                                            </td>
                                        </tr>
                                    ) : (
                                        pageBreakdown.map((row) => (
                                            <tr key={row.path} style={{ borderBottom: "1px solid #f1f5f9" }}>
                                                <td style={{ padding: "0.8rem 0.75rem", fontWeight: 700, color: "#0f172a" }}>
                                                    <code>{row.path}</code>
                                                </td>
                                                <td style={{ padding: "0.8rem 0.75rem", fontWeight: 800, color: "#2563eb" }}>
                                                    {row.visitors}
                                                </td>
                                                <td style={{ padding: "0.8rem 0.75rem", color: "#475569" }}>{row.views}</td>
                                                <td style={{ padding: "0.8rem 0.75rem", fontWeight: 800, color: "#059669" }}>
                                                    {row.waVisitors} clientes ({row.waClicks} clics)
                                                </td>
                                                <td style={{ padding: "0.8rem 0.75rem" }}>
                                                    <span
                                                        style={{
                                                            padding: "0.2rem 0.55rem",
                                                            borderRadius: "999px",
                                                            fontWeight: 700,
                                                            fontSize: "0.78rem",
                                                            background:
                                                                row.waRate > 0 ? "rgba(16, 185, 129, 0.14)" : "#f1f5f9",
                                                            color: row.waRate > 0 ? "#047857" : "#64748b",
                                                        }}
                                                    >
                                                        {row.waRate}%
                                                    </span>
                                                </td>
                                                <td style={{ padding: "0.8rem 0.75rem", fontWeight: 700, color: "#7c3aed" }}>
                                                    {row.reserveClicks}
                                                </td>
                                                <td style={{ padding: "0.8rem 0.75rem", color: "#475569" }}>
                                                    {row.avgDur > 0 ? `${row.avgDur}s` : "—"}
                                                </td>
                                                <td style={{ padding: "0.8rem 0.75rem", color: "#475569" }}>
                                                    {row.avgScr > 0 ? `${row.avgScr}%` : "—"}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Google Search Console Live Section */}
                        {latestGsc && (
                            <div
                                style={{
                                    marginTop: "1.5rem",
                                    background: "#ffffff",
                                    borderRadius: "1rem",
                                    padding: "1.5rem",
                                    border: "1px solid #e2e8f0",
                                    overflowX: "auto",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        flexWrap: "wrap",
                                        gap: "0.75rem",
                                        marginBottom: "1rem",
                                    }}
                                >
                                    <div>
                                        <h2 style={{ fontSize: "1.1rem", fontWeight: 800, margin: "0 0 0.25rem", color: "#0f172a" }}>
                                            🔍 Google Search Console en Vivo ({latestGsc.property || "sc-domain:drfoam.com.mx"})
                                        </h2>
                                        <p style={{ fontSize: "0.82rem", color: "#64748b", margin: 0 }}>
                                            Métricas orgánicas reales sincronizadas en <code>public.drfoam_ux_events</code> · Permiso:{" "}
                                            <strong>{latestGsc.permissionLevel || "siteOwner"}</strong> · Sitemap enviado:{" "}
                                            <code>{latestGsc.sitemapSubmitted || "https://drfoam.com.mx/sitemap.xml"}</code>
                                        </p>
                                    </div>
                                    <span
                                        style={{
                                            padding: "0.3rem 0.75rem",
                                            borderRadius: "999px",
                                            background: "rgba(16, 185, 129, 0.14)",
                                            color: "#047857",
                                            fontWeight: 800,
                                            fontSize: "0.76rem",
                                        }}
                                    >
                                        ✅ Conectado a Google Search Console API
                                    </span>
                                </div>

                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                                        gap: "1rem",
                                        marginBottom: "1.25rem",
                                    }}
                                >
                                    <div style={{ padding: "1rem", borderRadius: "0.75rem", background: "#eff6ff", border: "1px solid #bfdbfe" }}>
                                        <div style={{ fontSize: "0.76rem", fontWeight: 700, color: "#1d4ed8", textTransform: "uppercase" }}>
                                            Clics Orgánicos Google
                                        </div>
                                        <div style={{ fontSize: "1.65rem", fontWeight: 900, color: "#1e3a8a", marginTop: "0.25rem" }}>
                                            {latestGsc.totalClicks ?? 0}
                                        </div>
                                    </div>
                                    <div style={{ padding: "1rem", borderRadius: "0.75rem", background: "#f5f3ff", border: "1px solid #ddd6fe" }}>
                                        <div style={{ fontSize: "0.76rem", fontWeight: 700, color: "#6d28d9", textTransform: "uppercase" }}>
                                            Impresiones en Google
                                        </div>
                                        <div style={{ fontSize: "1.65rem", fontWeight: 900, color: "#4c1d95", marginTop: "0.25rem" }}>
                                            {latestGsc.totalImpressions ?? 0}
                                        </div>
                                    </div>
                                    <div style={{ padding: "1rem", borderRadius: "0.75rem", background: "#ecfdf5", border: "1px solid #a7f3d0" }}>
                                        <div style={{ fontSize: "0.76rem", fontWeight: 700, color: "#047857", textTransform: "uppercase" }}>
                                            CTR Orgánico Promedio
                                        </div>
                                        <div style={{ fontSize: "1.65rem", fontWeight: 900, color: "#065f46", marginTop: "0.25rem" }}>
                                            {latestGsc.avgCtr ?? 0}%
                                        </div>
                                    </div>
                                    <div style={{ padding: "1rem", borderRadius: "0.75rem", background: "#fffbeb", border: "1px solid #fde68a" }}>
                                        <div style={{ fontSize: "0.76rem", fontWeight: 700, color: "#b45309", textTransform: "uppercase" }}>
                                            Posición Promedio Google
                                        </div>
                                        <div style={{ fontSize: "1.65rem", fontWeight: 900, color: "#78350f", marginTop: "0.25rem" }}>
                                            #{latestGsc.avgPosition ?? 0}
                                        </div>
                                    </div>
                                </div>

                                {Array.isArray(latestGsc.topQueries) && latestGsc.topQueries.length > 0 && (
                                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                                        <thead>
                                            <tr style={{ borderBottom: "2px solid #e2e8f0", textAlign: "left", color: "#475569" }}>
                                                <th style={{ padding: "0.65rem" }}>Búsqueda en Google (Query)</th>
                                                <th style={{ padding: "0.65rem" }}>Página que Posiciona</th>
                                                <th style={{ padding: "0.65rem" }}>Clics</th>
                                                <th style={{ padding: "0.65rem" }}>Impresiones</th>
                                                <th style={{ padding: "0.65rem" }}>CTR</th>
                                                <th style={{ padding: "0.65rem" }}>Posición</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {latestGsc.topQueries.slice(0, 12).map((q, idx) => (
                                                <tr key={`${q.query}-${q.page}-${idx}`} style={{ borderBottom: "1px solid #f1f5f9" }}>
                                                    <td style={{ padding: "0.65rem", fontWeight: 700, color: "#0f172a" }}>{q.query}</td>
                                                    <td style={{ padding: "0.65rem", color: "#475569" }}>
                                                        <code>{q.page}</code>
                                                    </td>
                                                    <td style={{ padding: "0.65rem", fontWeight: 800, color: "#2563eb" }}>{q.clicks}</td>
                                                    <td style={{ padding: "0.65rem", fontWeight: 700, color: "#6d28d9" }}>{q.impressions}</td>
                                                    <td style={{ padding: "0.65rem", color: "#047857", fontWeight: 700 }}>{q.ctr}%</td>
                                                    <td style={{ padding: "0.65rem", fontWeight: 800, color: "#b45309" }}>#{q.position}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        )}
                    </>
                )}

                {/* ═══════════════════════════════════════════════════════════════════
                    TAB 2: BITÁCORA EN VIVO DE CLIENTES (SESIÓN POR SESIÓN)
                   ═══════════════════════════════════════════════════════════════════ */}
                {activeTab === "sesiones" && (
                    <div
                        style={{
                            background: "#ffffff",
                            borderRadius: "1rem",
                            padding: "1.5rem",
                            border: "1px solid #e2e8f0",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                flexWrap: "wrap",
                                gap: "1rem",
                                marginBottom: "1.25rem",
                            }}
                        >
                            <div>
                                <h2 style={{ fontSize: "1.15rem", fontWeight: 800, margin: "0 0 0.25rem", color: "#0f172a" }}>
                                    👥 Bitácora Individual de Clientes (Recorrido de Experiencia de Usuario)
                                </h2>
                                <p style={{ fontSize: "0.83rem", color: "#64748b", margin: 0 }}>
                                    Cada fila representa un cliente real que entró al sitio y muestra exactamente qué hizo y si se fue por WhatsApp
                                </p>
                            </div>

                            <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap" }}>
                                {(
                                    [
                                        { id: "all", label: "👥 Todos los Clientes" },
                                        { id: "whatsapp", label: "💬 Solo los que se fueron a WhatsApp" },
                                        { id: "booking", label: "📅 Solo los que entraron a Reservar" },
                                    ] as { id: SessionFilter; label: string }[]
                                ).map((f) => (
                                    <button
                                        key={f.id}
                                        type="button"
                                        onClick={() => setSessionFilter(f.id)}
                                        style={{
                                            padding: "0.45rem 0.85rem",
                                            borderRadius: "999px",
                                            fontSize: "0.78rem",
                                            fontWeight: 700,
                                            cursor: "pointer",
                                            border: sessionFilter === f.id ? "1.5px solid #059669" : "1px solid #cbd5e1",
                                            background: sessionFilter === f.id ? "#ecfdf5" : "#ffffff",
                                            color: sessionFilter === f.id ? "#047857" : "#475569",
                                        }}
                                    >
                                        {f.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div style={{ overflowX: "auto" }}>
                            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.84rem" }}>
                                <thead>
                                    <tr style={{ borderBottom: "2px solid #e2e8f0", textAlign: "left", color: "#475569" }}>
                                        <th style={{ padding: "0.75rem" }}>Fecha / Hora</th>
                                        <th style={{ padding: "0.75rem" }}>Resultado del Cliente</th>
                                        <th style={{ padding: "0.75rem" }}>Origen / Canal</th>
                                        <th style={{ padding: "0.75rem" }}>Dispositivo</th>
                                        <th style={{ padding: "0.75rem" }}>Recorrido de Páginas</th>
                                        <th style={{ padding: "0.75rem" }}>Paquete / Interés</th>
                                        <th style={{ padding: "0.75rem" }}>Detalle Salida WhatsApp</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customerSessions.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} style={{ padding: "2rem", textAlign: "center", color: "#64748b" }}>
                                                No hay sesiones que coincidan con este filtro.
                                            </td>
                                        </tr>
                                    ) : (
                                        customerSessions.slice(0, 100).map((s) => {
                                            const ch = formatChannel(s.channel);
                                            return (
                                                <tr key={s.sessionId} style={{ borderBottom: "1px solid #f1f5f9" }}>
                                                    <td style={{ padding: "0.8rem 0.75rem", whiteSpace: "nowrap", color: "#475569" }}>
                                                        {new Date(s.lastSeen).toLocaleString("es-MX", {
                                                            day: "2-digit",
                                                            month: "short",
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })}
                                                    </td>
                                                    <td style={{ padding: "0.8rem 0.75rem" }}>
                                                        <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
                                                            {s.wentToWhatsapp && (
                                                                <span
                                                                    style={{
                                                                        padding: "0.22rem 0.6rem",
                                                                        borderRadius: "999px",
                                                                        background: "rgba(16, 185, 129, 0.15)",
                                                                        color: "#047857",
                                                                        fontWeight: 800,
                                                                        fontSize: "0.76rem",
                                                                    }}
                                                                >
                                                                    💬 Se fue por WhatsApp ({s.whatsappClicks})
                                                                </span>
                                                            )}
                                                            {s.completedCheckout && (
                                                                <span
                                                                    style={{
                                                                        padding: "0.22rem 0.6rem",
                                                                        borderRadius: "999px",
                                                                        background: "rgba(37, 99, 235, 0.15)",
                                                                        color: "#1d4ed8",
                                                                        fontWeight: 800,
                                                                        fontSize: "0.76rem",
                                                                    }}
                                                                >
                                                                    ✅ Pago Completado
                                                                </span>
                                                            )}
                                                            {!s.completedCheckout && s.initiatedCheckout && (
                                                                <span
                                                                    style={{
                                                                        padding: "0.22rem 0.6rem",
                                                                        borderRadius: "999px",
                                                                        background: "rgba(124, 58, 237, 0.15)",
                                                                        color: "#6d28d9",
                                                                        fontWeight: 800,
                                                                        fontSize: "0.76rem",
                                                                    }}
                                                                >
                                                                    💳 Inició Checkout Stripe
                                                                </span>
                                                            )}
                                                            {!s.wentToWhatsapp && !s.initiatedCheckout && s.wentToBooking && (
                                                                <span
                                                                    style={{
                                                                        padding: "0.22rem 0.6rem",
                                                                        borderRadius: "999px",
                                                                        background: "rgba(245, 158, 11, 0.15)",
                                                                        color: "#b45309",
                                                                        fontWeight: 700,
                                                                        fontSize: "0.76rem",
                                                                    }}
                                                                >
                                                                    📅 Cotizó en /reservar
                                                                </span>
                                                            )}
                                                            {!s.wentToWhatsapp && !s.wentToBooking && (
                                                                <span
                                                                    style={{
                                                                        padding: "0.22rem 0.6rem",
                                                                        borderRadius: "999px",
                                                                        background: "#f1f5f9",
                                                                        color: "#64748b",
                                                                        fontWeight: 600,
                                                                        fontSize: "0.76rem",
                                                                    }}
                                                                >
                                                                    👀 Exploró el sitio
                                                                </span>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td style={{ padding: "0.8rem 0.75rem" }}>
                                                        <span
                                                            style={{
                                                                padding: "0.2rem 0.55rem",
                                                                borderRadius: "0.4rem",
                                                                background: ch.bg,
                                                                color: ch.color,
                                                                fontWeight: 700,
                                                                fontSize: "0.75rem",
                                                            }}
                                                        >
                                                            {ch.label}
                                                        </span>
                                                    </td>
                                                    <td style={{ padding: "0.8rem 0.75rem", color: "#334155" }}>
                                                        {s.device === "mobile" ? "📱 Móvil" : s.device === "tablet" ? "📟 Tablet" : "💻 PC"}
                                                    </td>
                                                    <td style={{ padding: "0.8rem 0.75rem", color: "#0f172a" }}>
                                                        <div style={{ fontWeight: 600 }}>
                                                            {Array.from(s.pagesVisited).join(" → ")}
                                                        </div>
                                                        <div style={{ fontSize: "0.74rem", color: "#64748b" }}>
                                                            {s.maxDuration > 0 ? `⏱️ ${s.maxDuration}s` : ""}{" "}
                                                            {s.maxScroll > 0 ? `· 📜 ${s.maxScroll}% scroll` : ""}
                                                        </div>
                                                    </td>
                                                    <td style={{ padding: "0.8rem 0.75rem" }}>
                                                        {s.packageViewed ? (
                                                            <div>
                                                                <span style={{ fontWeight: 700, color: "#1e40af" }}>
                                                                    {s.packageViewed}
                                                                </span>
                                                                {s.estimatedValue > 0 && (
                                                                    <div style={{ fontSize: "0.75rem", color: "#059669", fontWeight: 700 }}>
                                                                        ${s.estimatedValue.toLocaleString("es-MX")} MXN
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ) : (
                                                            <span style={{ color: "#94a3b8" }}>—</span>
                                                        )}
                                                    </td>
                                                    <td style={{ padding: "0.8rem 0.75rem" }}>
                                                        {s.wentToWhatsapp ? (
                                                            <div>
                                                                <div style={{ fontWeight: 700, color: "#047857" }}>
                                                                    {s.whatsappLocation}
                                                                </div>
                                                                {s.whatsappText && (
                                                                    <div
                                                                        style={{
                                                                            fontSize: "0.74rem",
                                                                            color: "#64748b",
                                                                            maxWidth: "240px",
                                                                            overflow: "hidden",
                                                                            textOverflow: "ellipsis",
                                                                            whiteSpace: "nowrap",
                                                                        }}
                                                                    >
                                                                        &ldquo;{s.whatsappText}&rdquo;
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ) : (
                                                            <span style={{ color: "#94a3b8" }}>—</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* ═══════════════════════════════════════════════════════════════════
                    TAB 3: EVOLUCIÓN AUTÓNOMA (ESTÁNDAR MAESTRO V2.1 + GSC)
                   ═══════════════════════════════════════════════════════════════════ */}
                {activeTab === "autonomo" && (
                    <div
                        style={{
                            background: "#ffffff",
                            borderRadius: "1rem",
                            padding: "1.5rem",
                            border: "1px solid #e2e8f0",
                        }}
                    >
                        <div style={{ marginBottom: "1.25rem" }}>
                            <h2 style={{ fontSize: "1.15rem", fontWeight: 800, margin: "0 0 0.25rem", color: "#0f172a" }}>
                                🤖 Historial de Ciclos Autónomos (Estándar Maestro v2.1 · Modo /goal)
                            </h2>
                            <p style={{ fontSize: "0.84rem", color: "#64748b", margin: 0 }}>
                                Auditorías cada 4 horas de Telemetría UX + Google Search Console API + Gobernanza de Planes por Magnitud (Menor / Mediana / Mayor)
                            </p>
                        </div>

                        {autoLogs.length === 0 ? (
                            <div style={{ padding: "2rem", textAlign: "center", color: "#64748b" }}>
                                El primer ciclo autónomo de Doctor Foam está siendo registrado.
                            </div>
                        ) : (
                            <div style={{ display: "grid", gap: "1rem" }}>
                                {autoLogs.map((log) => (
                                    <div
                                        key={log.id}
                                        style={{
                                            padding: "1.25rem",
                                            borderRadius: "0.85rem",
                                            border: "1px solid #e2e8f0",
                                            background: "#f8fafc",
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                flexWrap: "wrap",
                                                gap: "0.5rem",
                                                marginBottom: "0.75rem",
                                            }}
                                        >
                                            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                                                <span
                                                    style={{
                                                        padding: "0.25rem 0.65rem",
                                                        borderRadius: "999px",
                                                        background: "#2563eb",
                                                        color: "#ffffff",
                                                        fontWeight: 800,
                                                        fontSize: "0.78rem",
                                                    }}
                                                >
                                                    Ciclo #{log.cycle_number}
                                                </span>
                                                <span style={{ fontWeight: 800, color: "#0f172a" }}>{log.project_name}</span>
                                                {log.commit_hash && (
                                                    <code
                                                        style={{
                                                            background: "#e2e8f0",
                                                            padding: "0.15rem 0.45rem",
                                                            borderRadius: "0.3rem",
                                                            fontSize: "0.78rem",
                                                        }}
                                                    >
                                                        commit: {log.commit_hash}
                                                    </code>
                                                )}
                                            </div>
                                            <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
                                                {new Date(log.created_at).toLocaleString("es-MX")}
                                            </span>
                                        </div>

                                        {log.short_summary && (
                                            <p style={{ margin: "0 0 0.5rem", color: "#0f172a", fontWeight: 600, fontSize: "0.88rem" }}>
                                                {log.short_summary}
                                            </p>
                                        )}

                                        {Array.isArray(log.changes_applied || log.fixes_applied) &&
                                            (log.changes_applied || log.fixes_applied)!.length > 0 && (
                                            <ul
                                                style={{
                                                    margin: "0.5rem 0 0",
                                                    paddingLeft: "1.25rem",
                                                    color: "#334155",
                                                    fontSize: "0.85rem",
                                                    lineHeight: "1.6",
                                                }}
                                            >
                                                {(log.changes_applied || log.fixes_applied)!.map((fix, i) => (
                                                    <li key={i}>{fix}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
