"use client";

import { isNewSession, trackDrFoamEvent } from "@/lib/telemetry";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const WHATSAPP_FALLBACK_URL =
  "https://wa.me/525610846022?text=Hola%2C%20me%20interesa%20un%20servicio%20de%20Doctor%20Foam";

export default function DrFoamTelemetry() {
  const pathname = usePathname();
  const pageEnterRef = useRef<number>(Date.now());
  const maxScrollRef = useRef<number>(0);
  const milestonesSentRef = useRef<Set<number>>(new Set());
  const recentClicksRef = useRef<Array<{ t: number; x: number; y: number }>>([]);

  // Track route changes & session start
  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return;

    pageEnterRef.current = Date.now();
    maxScrollRef.current = 0;
    milestonesSentRef.current = new Set();

    const fullPath =
      typeof window !== "undefined"
        ? window.location.pathname + window.location.search
        : pathname;

    if (isNewSession()) {
      trackDrFoamEvent({
        event_name: "session_start",
        event_category: "navigation",
        path: fullPath,
      });
    }

    trackDrFoamEvent({
      event_name: "page_view",
      event_category: "navigation",
      path: fullPath,
    });

    if (pathname.startsWith("/pago-exitoso")) {
      let savedPkg = "Servicio Doctor Foam";
      try {
        const raw = localStorage.getItem("bookingPayload");
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed?.packageId) savedPkg = parsed.packageId;
        }
      } catch {
        // ignore
      }
      trackDrFoamEvent({
        event_name: "checkout_completed",
        event_category: "conversion_booking",
        path: fullPath,
        package_name: savedPkg,
      });
    }
  }, [pathname]);

  // Global listeners: Scroll, Clicks (WhatsApp, CTAs, Rage/Dead clicks), Page Leave
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      if (window.location.pathname.startsWith("/admin")) return;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const pct = Math.min(100, Math.round((window.scrollY / docHeight) * 100));
      if (pct > maxScrollRef.current) {
        maxScrollRef.current = pct;
      }
      for (const milestone of [50, 90]) {
        if (pct >= milestone && !milestonesSentRef.current.has(milestone)) {
          milestonesSentRef.current.add(milestone);
          trackDrFoamEvent({
            event_name: "scroll_depth",
            event_category: "ux_interaction",
            scroll_pct: milestone,
            duration_ms: Date.now() - pageEnterRef.current,
          });
        }
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (window.location.pathname.startsWith("/admin")) return;
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const durationMs = Date.now() - pageEnterRef.current;
      const scrollPct = maxScrollRef.current;

      // 1. Rage click detection (3+ clicks within 750ms in a 40px radius)
      const now = Date.now();
      recentClicksRef.current = recentClicksRef.current.filter(
        (c) => now - c.t < 750
      );
      recentClicksRef.current.push({ t: now, x: e.clientX, y: e.clientY });
      if (recentClicksRef.current.length >= 3) {
        const first = recentClicksRef.current[0];
        const dist = Math.hypot(e.clientX - first.x, e.clientY - first.y);
        if (dist < 40) {
          recentClicksRef.current = [];
          trackDrFoamEvent({
            event_name: "rage_click",
            event_category: "ux_friction",
            duration_ms: durationMs,
            scroll_pct: scrollPct,
            element_tag: target.tagName.toLowerCase(),
            element_text: (target.innerText || "").trim().slice(0, 100),
          });
        }
      }

      const interactive = target.closest("a, button") as HTMLElement | null;
      if (interactive) {
        const href =
          interactive.getAttribute("href") ||
          (interactive as HTMLAnchorElement).href ||
          "";
        const text = (
          interactive.innerText ||
          interactive.getAttribute("aria-label") ||
          ""
        )
          .trim()
          .replace(/\s+/g, " ")
          .slice(0, 120);

        // 2. Intercept ?chat=open links -> route to WhatsApp and track WhatsApp conversion
        if (href.includes("?chat=open")) {
          e.preventDefault();
          trackDrFoamEvent({
            event_name: "whatsapp_click",
            event_category: "conversion_whatsapp",
            whatsapp_destination: "chat_support_to_whatsapp",
            duration_ms: durationMs,
            scroll_pct: scrollPct,
            element_tag: interactive.tagName.toLowerCase(),
            element_text: text || "Chat en línea -> WhatsApp",
            metadata: { original_href: href },
          });
          window.open(WHATSAPP_FALLBACK_URL, "_blank", "noopener,noreferrer");
          return;
        }

        // 3. Track any WhatsApp click (wa.me / api.whatsapp.com)
        if (/wa\.me|whatsapp\.com/i.test(href)) {
          let destination = "inline_whatsapp_cta";
          const currentPath = window.location.pathname;
          if (
            interactive.getAttribute("aria-label") === "Contactar por WhatsApp" ||
            interactive.id === "drfoam-floating-whatsapp"
          ) {
            destination = "floating_whatsapp_button";
          } else if (interactive.closest("footer")) {
            destination = "footer_whatsapp_link";
          } else if (currentPath.includes("membresia")) {
            destination = "membresia_whatsapp_cta";
          } else if (currentPath.includes("corporativo")) {
            destination = "corporativo_b2b_whatsapp_cta";
          } else if (currentPath.includes("pago-exitoso")) {
            destination = "post_pago_whatsapp_confirm";
          } else if (currentPath.includes("reservar")) {
            destination = "reservar_whatsapp_help";
          }

          trackDrFoamEvent({
            event_name: "whatsapp_click",
            event_category: "conversion_whatsapp",
            whatsapp_destination: destination,
            duration_ms: durationMs,
            scroll_pct: scrollPct,
            element_tag: interactive.tagName.toLowerCase(),
            element_text: text || "WhatsApp",
            metadata: {
              href,
              from_page: currentPath,
            },
          });
          return;
        }

        // 4. Track Stripe Subscription links (buy.stripe.com)
        if (href.includes("buy.stripe.com")) {
          const isFoamMaint = href.includes("4gM00kclRcDc8e92Zg3ZK03");
          trackDrFoamEvent({
            event_name: "stripe_subscription_click",
            event_category: "conversion_booking",
            package_name: isFoamMaint
              ? "Foam Maintenance Recurrente"
              : "Membresía Doctor Foam",
            estimated_value_mxn: isFoamMaint ? 1800 : 1160,
            duration_ms: durationMs,
            scroll_pct: scrollPct,
            element_tag: "a",
            element_text: text,
            metadata: { href },
          });
          return;
        }

        // 5. Track /reservar CTA clicks
        if (href.includes("/reservar")) {
          let pkgName: string | undefined;
          try {
            const urlObj = new URL(href, window.location.origin);
            pkgName = urlObj.searchParams.get("paquete") || undefined;
          } catch {
            // ignore
          }
          trackDrFoamEvent({
            event_name: "cta_reservar_click",
            event_category: "conversion_booking",
            package_name: pkgName,
            duration_ms: durationMs,
            scroll_pct: scrollPct,
            element_tag: interactive.tagName.toLowerCase(),
            element_text: text || "Ir a Reservar",
            metadata: { href },
          });
          return;
        }
      }
    };

    const handleVisibilityChange = () => {
      if (window.location.pathname.startsWith("/admin")) return;
      if (document.visibilityState === "hidden") {
        const durationMs = Date.now() - pageEnterRef.current;
        if (durationMs > 1000) {
          trackDrFoamEvent({
            event_name: "page_leave",
            event_category: "navigation",
            duration_ms: durationMs,
            scroll_pct: maxScrollRef.current,
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("click", handleClick, { capture: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClick, { capture: true });
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return null;
}
