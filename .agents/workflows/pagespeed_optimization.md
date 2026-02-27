---
description: Automated PageSpeed Optimization Loop
---

// turbo-all

Este workflow automatiza la optimización de todas las páginas para alcanzar los siguientes puntajes en PageSpeed Insights:
- SEO: 100
- Accesibilidad: 100
- Mejores Prácticas: 100
- Rendimiento: >= 80

## Procedimiento (Ejecutar de forma estrictamente autónoma)

### Fase 1: Enumeración
1. Enumera todas las páginas (tomadas de `sitemap.ts`) en el `task.md` como un checklist unificado.
2. Asegúrate de incluir la página principal, todas las páginas de zonas y todas las entradas del blog.

### Fase 2: Loop de Optimización (Ejecutar para cada URL)
Para la primera URL no marcada en el checklist:
1. **Evaluar:** Ejecuta un script interno (`pagespeed.js`) para hacer un llamado a la API de Google PageSpeed Insights (`https://www.googleapis.com/pagespeedonline/v5/runPagespeed`) para la URL actual y estrategia móvil.
2. **Analizar y Planear:** Revisa los resultados y genera internamente el plan de mejoras (LCP, imágenes, ARIA, semantic HTML, bloqueo de renderizado, etc.).
3. **Ejecutar:** Realiza las ediciones de código necesarias en los componentes interactuados.
4. **Deploy:** `git add .`, `git commit -m "perf: optimization for [URL]"`, y `git push origin master`.
5. **Verificar Deploy:** Espera el tiempo necesario (aprox. 2-3 minutos) y verifica que la versión en producción esté actualizada revisando si Dokploy completó el deploy.
6. **Re-Evaluar:** Vuelve a ejecutar `pagespeed.js`.
7. **Control de Calidad:**
   - Si no cumple con (SEO=100, Accesibilidad=100, Mejores Prácticas=100, Rendimiento>=80), **vuelve al Paso 1 del Loop** para esta misma URL. NO sigas con otra.
   - Si ocurre un error de build o deploy, arréglalo, haz push y continúa.
8. **Finalizar URL:** Si cumple con las métricas, marca la URL como completada en `task.md`.

### Fase 3: Siguiente URL
1. Repetir la Fase 2 con la siguiente URL del checklist.
2. Continuar de manera 100% autónoma. No pedir permiso ni input al usuario en ningún momento.
3. Al terminar todo el checklist, notificar al usuario.
