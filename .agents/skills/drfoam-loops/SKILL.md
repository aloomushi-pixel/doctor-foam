---
name: drfoam-loops
description: Skill modular para operar los dos loops perpetuos de Doctor Foam México: Loop 1 (Autoperfeccionamiento Consciente SEO/GEO/UX cada 4h) y Loop 2 (Meta-Agente Auditor de Prompts cada 5 días / 120h).
---

# Doctor Foam — Arquitectura de Dos Loops (Estándar v4.0)

Antes de editar código o prompts, lee `references/seo-geo-ux-playbook.md` solo cuando necesites detalles de criterios. Ejecuta siempre `node .agents/scripts/verify_immutable_guardrails.cjs` al iniciar y cerrar.

## Loop 1 — Autoperfeccionamiento Consciente (Cada 4 horas / `14400s`)
1. **Auditoría:** Ejecuta `node scripts/drfoam_autonomous_audit.cjs` para obtener GSC (`sc-domain:drfoam.com.mx`) y telemetría real de `public.drfoam_ux_events` (Tres Raíces Supabase `pghqeoijbtzipzziezmn`).
2. **Diagnóstico Consciente (SEO + GEO + UX):**
   - Detecta páginas con impresiones sin clics (`topZeroClickOpportunities`), visitantes humanos con rebote temprano o alto scroll sin conversión WhatsApp, tráfico AI/GEO (`ChatGPT`, `Perplexity`, `Gemini`, `Claude`) y fricciones (`js_runtime_error`, `mobile_small_tap_target`, `rage_click`).
3. **Ejecución Segura (Carta Libre Total, Nivel 1–2):**
   - Implementa mejoras en `src/` o `public/llms.txt` sin tocar `priceCentavos` en `src/lib/packages.ts`, sin exponer `/admin` (`307`), y **sin enviar correos**.
   - Valida `node node_modules/typescript/bin/tsc --noEmit` (`0` errores).
4. **Despliegue y Cierre:**
   - Bump `public/__version.json`, commit + push `origin/master`, ejecuta `deploy_coolify.cjs` (`status: finished`), verifica endpoints en vivo, registra `autonomous_cycle_summary` en `public.drfoam_ux_events` y añade 1 línea JSONL a `.agents/state/prompt_performance_ledger.jsonl`.
   - Programa el siguiente timer del Loop 1 (`14400s`, `TimerCondition: "never"`) sin emitir `GOAL_COMPLETE`.

## Loop 2 — Meta-Agente Auditor de Prompts (Cada 5 días / `432000s`)
1. **Verificación Criptográfica Inicial:** `node .agents/scripts/verify_immutable_guardrails.cjs`. Si falla, aborta inmediatamente.
2. **Auditoría Empírica:** Lee `.agents/state/prompt_performance_ledger.jsonl` y consulta los últimos `autonomous_cycle_summary` en `public.drfoam_ux_events`. Mide evolución de clics GSC, CTR, tasa de conversión WhatsApp, fricciones UX y tasa de éxito al primer intento (`tsc` / Coolify).
3. **Refinamiento Recursivo del Prompt:**
   - Guarda respaldo fechado en `.agents/state/prompt_history/SKILL.<YYYYMMDD-HHMM>.md`.
   - Actualiza `.agents/skills/drfoam-loops/SKILL.md`, `references/seo-geo-ux-playbook.md` y la sección no-sellada de `.agents/rules/reglas_autonomas_doctor_foam.md` eliminando instrucciones redundantes e incorporando los patrones de mayor conversión comprobada.
4. **Verificación Criptográfica Final y Registro:** Ejecuta `node .agents/scripts/verify_immutable_guardrails.cjs`, registra `meta_prompt_audit_summary` en `public.drfoam_ux_events` y reprograma el Loop 2 (`432000s` o `14400s`? No: `432000s` / 5 días, o si el máximo de timer lo permite; verificar límite de `schedule`).
