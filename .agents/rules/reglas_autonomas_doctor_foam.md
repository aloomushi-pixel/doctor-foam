# Reglas Autónomas — Ecosistema Doctor Foam México (Estándar Maestro v4.0 Adaptado)

<!-- IMMUTABLE_GUARDRAILS_START -->
## Candados Intocables Criptográficos (SHA-256)
1. **Cero Gasto Publicitario Pagado o Cargos Financieros:** Prohibido crear campañas CPC, gastar presupuesto publicitario o ejecutar cargos/reembolsos sin autorización explícita del propietario.
2. **Aislamiento Estricto de Base de Datos (Tabla Única):** Toda telemetría UX, auditoría GSC, resúmenes ejecutivos, registros de ciclos y auditorías de prompts se almacenan exclusivamente en la única tabla aislada `public.drfoam_ux_events` del proyecto Tres Raíces Supabase (`pghqeoijbtzipzziezmn`). Prohibido `DROP`, `TRUNCATE`, `DELETE` masivo o modificar cualquier otra tabla o proyecto Supabase.
3. **Integridad Comercial y Regla de Membresía:** Prohibido alterar `priceCentavos` o `priceBase` en `src/lib/packages.ts` sin autorización explícita. La Membresía Doctor Foam (`$990/mes` Sedán | `$1,160/mes` SUV) siempre requiere contratar primero un servicio de Lavado Profundo inicial y otorga seguimiento + `10%` de descuento permanente en paquetes especializados.
4. **Seguridad `/admin`, Cero Correos y Cero Secretos en Git:** La ruta `/admin` debe permanecer estrictamente protegida (`HTTP 307` sin sesión autenticada). Prohibido enviar correos vía Resend en los loops autónomos. Prohibido exponer `.env`, `.gsc-credentials.json` o llaves privadas en Git.
5. **Integridad de Producción:** Toda modificación de código debe pasar `node node_modules/typescript/bin/tsc --noEmit` (`0` errores) antes de hacer commit, push a `origin/master` y despliegue verificado en Coolify (`status: finished`).
<!-- IMMUTABLE_GUARDRAILS_END -->

---

## Arquitectura de Dos Loops (Operación Perpetua)
1. **Loop 1 — Loop Principal de Autoperfeccionamiento Consciente (SEO / GEO / UX):**
   - **Cadencia:** Cada **4 horas (`14,400s`)** en operación continua (Carta Libre Total, 100% auto-proceed).
   - **Skill:** `.agents/skills/drfoam-loops/SKILL.md` + `references/seo-geo-ux-playbook.md`.
   - **Alcance:** Auditoría GSC (`sc-domain:drfoam.com.mx`), telemetría real en `public.drfoam_ux_events` (humanos, WhatsApp, AI/GEO, PDF brochure, Google Maps `rwg_token`, monitores UX `js_runtime_error`, `mobile_small_tap_target`, `rage_click`), mejoras Nivel 1–2 verificadas en producción y registro en `.agents/state/prompt_performance_ledger.jsonl`.
2. **Loop 2 — Loop Secundario de Autoperfeccionamiento de Prompts (`meta-prompt-auditor`):**
   - **Cadencia:** Periodo más largo — cada **5 días (`120 horas` / `432,000s`, o cada ~30 ciclos efectivos del Loop 1)**.
   - **Alcance:** Audita `.agents/state/prompt_performance_ledger.jsonl` y los KPIs acumulados en `public.drfoam_ux_events`. Verifica `verify_immutable_guardrails.cjs` **antes y después**, guarda respaldo versionado en `.agents/state/prompt_history/`, refina `.agents/skills/drfoam-loops/SKILL.md`, `references/seo-geo-ux-playbook.md` y esta sección no-sellada para eliminar verbosidad, reforzar patrones ganadores (ej. píldoras de colonia `0%-scroll`, ergonomía táctil `>=44px`) y corregir cualquier fricción o reintento recurrente.

## Criterios Técnicos Vigentes (Actualizados por Loop 2)
- **SEO:** `<title> < 60c`, `<meta description> < 160c`, paridad `1:1` entre contenido visible y Schema JSON-LD (`FAQPage`, `Service`, `OfferCatalog`, `LocalBusiness`, `BreadcrumbList`).
- **GEO (AI Search):** Mantener `public/llms.txt` actualizado con precios vigentes, citas de acción directa y atribución `utm_source=chatgpt.com|perplexity|gemini|claude` en `AiGeoConciergeBanner.tsx` y `WhatsAppButton.tsx`.
- **Monitores UX Conscientes:** Todo CTA primario en móvil debe cumplir altura táctil `>= 44px`, visibilidad `0%-scroll` en páginas de entrada orgánica/IA y seguimiento de `js_runtime_error`, `rage_click` y `mobile_small_tap_target`.
