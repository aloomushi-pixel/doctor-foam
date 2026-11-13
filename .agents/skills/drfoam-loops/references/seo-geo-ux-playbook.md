# Playbook SEO, GEO y Monitores UX Conscientes — Doctor Foam México

## 1. SEO Técnico y CTR en Google Search Console
- **Títulos (`<title>`):** `< 60` caracteres cuando sea posible, front-load de keyword + diferenciador (`$2,400`, `95% Real`, `A Domicilio`).
- **Meta Descriptions:** `< 160` caracteres con propuesta de valor en los primeros 150 caracteres (agua purificada, planta propia, `-10% Miembros`).
- **Paridad Schema JSON-LD 1:1:** Todo precio, FAQ o servicio en `FAQPage`, `Service`, `OfferCatalog` y `BreadcrumbList` debe coincidir exactamente con el texto visible en la página.

## 2. GEO (Generative Engine Optimization)
- **Atribución Automática:** `AiGeoConciergeBanner.tsx` y `WhatsAppButton.tsx` detectan `chatgpt`, `openai`, `perplexity`, `gemini`, `claude`.
- **`public/llms.txt`:** Fuente canónica para agentes IA con precios oficiales (`$2,400` Interior, `$7,499` Signature, `$10,999` Cerámico 9H, `$990/mes` Membresía) y URLs de acción directa.

## 3. Monitores UX Conscientes (`DrFoamTelemetry.tsx` -> `public.drfoam_ux_events`)
- **`js_runtime_error` (`ux_friction`):** Captura `window.onerror` y `unhandledrejection` (máx. 3 por página para evitar ruido).
- **`mobile_small_tap_target` (`ux_friction`):** Detecta toques móviles en enlaces/botones con `width < 44px` o `height < 44px` para corregir ergonomía táctil (`>= 44×44 px`).
- **`rage_click` (`ux_friction`):** 3+ clics en `<750ms` dentro de `40px`.
- **Patrones de Conversión Validados:**
  - Píldoras de colonia/tema `0%-scroll` con mensaje prellenado en WhatsApp (responsables de leads en Huixquilucan y Polanco ChatGPT).
  - CTAs primarios verdes de WhatsApp antes de tarjetas explicativas largas en móvil.
