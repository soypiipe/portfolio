# Notas — Fase 8 — Contenido definitivo

> Texto movido **sin cambios** desde `docs/progress.md` en la migración a la
> metodología (2026-10-05). Es un registro histórico: las casillas y los
> "pendientes" que aparecen abajo son de esa fecha; el estado vigente está
> en `PLAN.md`.

---

## CV bilingüe, dominio provisional y rendimiento (2026-09-28)

**Estado:** ✅ completa. Sin cambios de identidad visual, layout, paleta ni motion.

**1. CV en PDF, un archivo por idioma.** Diego dejó `Diego-Ariza-CV-ES.pdf` y `Diego-Ariza-CV-EN.pdf` sueltos en `public/`. Ahora viven en **`public/cv/diego-amado-cv-es.pdf`** y **`public/cv/diego-amado-cv-en.pdf`** (carpeta propia, nombre en minúsculas con guiones y coherente con la marca del sitio; los originales con "Ariza" en el nombre se quitaron de `public/` para que no se sirvan; copia de respaldo fuera del repo en `~/cv-originales-backup/`). Cambios en los archivos, hechos con `pypdf`, sin tocar el texto (se verificó la extracción de texto idéntica al original):
- **Color:** el CV original usaba azul marino (`#1F3864`) en nombre, títulos de sección y líneas. Se cambió solo ese color (9 operadores de color) por el **rust `#B9502C`** del portfolio (4.95:1 sobre blanco, pasa AA). **Fondo blanco a propósito:** un CV se imprime y lo leen ATS/reclutadores; uno oscuro sería peor práctica.
- **Metadata:** Title ("Diego Amado — CV (Español/English)"), Author "Diego Amado" (antes "Un-named"), Subject, idioma del documento (`es-CO`/`en-US`) y `DisplayDocTitle` (el visor muestra el título, no el nombre del archivo). Streams recomprimidos: ~51KB cada uno.
- **Nombre dentro del PDF:** dice "DIEGO FELIPE ARIZA AMADO" (nombre completo con ambos apellidos, contenido del propio CV). No se modificó; el sitio sigue usando "Diego Amado".

**Selección por idioma:** `app/data/contact.ts` exporta `cvHref = { es, en }`; Nav (desktop y menú móvil), Hero y Contacto usan `pick(cvHref)` (el mismo `useLocalized` de todo el sitio), así que el link cambia al instante si el visitante cambia de idioma, sin recargar. Todos llevan `download` (descarga directa, nombre del archivo = el de la URL). Verificado en Chrome headless: en `/` los links apuntan al `-es.pdf`; tras cambiar a EN en cliente, al `-en.pdf`; al volver a ES, de nuevo `-es.pdf`, sin errores de consola. Cache de `/cv/**`: `max-age=3600` (1h, el CV cambia más que las imágenes); `Content-Type: application/pdf`. Se eliminó el código muerto: la nota "CV estará disponible pronto" y su clave i18n `contact.pendingNote`, y la rama de botón inerte (ya no queda ningún canal sin `href`, que ahora es obligatorio en `ContactAction`).

**2. Correo corregido:** `diego_amado_@outlook.com` (así aparece también en los dos CVs).

**3. Dominio provisional `diegoamado.dev`.** Es el default de `runtimeConfig.public.siteUrl` y de `i18n.baseUrl` en `nuxt.config.ts`; se sobreescribe con `NUXT_PUBLIC_SITE_URL` (para cambiar de dominio: variable de entorno **en el build y en runtime**, no código). Verificado que canonical, `hreflang`, `og:url`, JSON-LD, `sitemap.xml` y la línea `Sitemap:` de `robots.txt` salen todos con `https://diegoamado.dev`. **`robots.txt` sigue bloqueando todo (`Disallow: /`) a propósito**, aunque ya hay dominio: (a) el dominio no es el definitivo — indexar ahora y cambiar después pierde el posicionamiento y crea duplicados; (b) el contenido no está cerrado (bio en draft, foto del hero es un placeholder de IA rotulado en la UI). Cuando se cierren bio + foto y el dominio sea el definitivo: cambiar `Disallow: /` por `Disallow:` en `server/routes/robots.txt.ts`.

**4. Rendimiento — qué se probó y qué no (con medición).**
- **Probado y revertido: i18n "solo runtime"** (`i18n.bundle: { runtimeOnly: true, dropMessageCompiler: true }`). Ahorraba ~16KB de JS (~5KB comprimido), pero **rompe el sitio en el navegador**: el HTML del servidor sale bien, pero la hidratación falla (`unhandled node type: 0`) y la página queda en blanco. Los mensajes que llegan por `/_i18n/.../messages.json` sí necesitan el compilador en el cliente. No vale el riesgo ni la ganancia; no reintentar sin un test de hidratación en navegador real.
- **"JS sin usar" (~190KB): no es accionable.** Se inspeccionaron los chunks: 281KB es el runtime de Nuxt (router, i18n, unhead, ícono), 115KB es Vue; lo "sin usar" en la carga inicial es código de framework, no de la app. Recortarlo implicaría quitar i18n/router, que es justo el SEO bilingüe.
- **WebP del hero:** el placeholder es de 512×382 (menor que su marco); Lighthouse solo marcaba compresión (~12KB). No se optimiza un placeholder que se va a reemplazar. **Receta para la foto final:** exportar a 2 anchos (~800 y ~1600px de lado largo, relación 4:3) en WebP calidad ~75–80 (+ AVIF si se quiere), servirlos con `srcset`/`sizes` en el `<picture>`, mantener `width`/`height` reales (hoy dicen 1200×896 aunque el archivo es 512×382), `fetchpriority="high"` y `loading="eager"` como ahora (es el LCP).
- **Lighthouse final (build de producción, `/`, 3 corridas):** Performance 78–86 (el TBT oscila 160–390ms entre corridas; FCP 2.6–2.7s, LCP 3.4s, CLS 0), Accessibility 100, Best Practices 100, SEO 69. **El único audit de SEO que falla es `is-crawlable`** (el `Disallow: /` deliberado); canonical, hreflang, meta description, títulos y links pasan.

## About definitivo (2026-09-28)

**Estado:** ✅ aplicado en ES y EN. Texto escrito por Diego (4 párrafos: quién es y años de experiencia; backend/infra/frontend; cuatro años en remoto como referente técnico + interés en arquitectura; ubicación). Se aplicó **tal cual** en español y se redactó la versión en inglés para que suene natural (no literal, sin guiones largos): "go-to person on technical matters" para "referente técnico", "I also work across infrastructure" para "me muevo en infraestructura". Reemplaza al draft de `content.md` (y a la frase de aprendizaje continuo que se había agregado). Ubicación pública confirmada: **Santander, Colombia** (`content.md` la tenía como pendiente). Implementación: `about.body` (un solo párrafo) pasó a `about.paragraphs.p1..p4`; `TheAbout.vue` los renderiza como 4 `<p>` con reveal escalonado (160 + 80ms por párrafo) y las etiquetas de capacidades entran después (520ms). Título, etiquetas, layout y estilos de párrafo sin cambios. Verificado en producción en 1280px (ES y EN) y 390px: sin overflow ni errores de consola.

**Ajustes posteriores (mismo día, acordados con Diego):**
1. **Frase sobre IA (aplicada), sin nombrar Amadia.** Al final del párrafo 3: "Por mi cuenta construyo agentes con IA y automatizaciones, y uso IA a diario como parte de mi forma de desarrollar." / "On my own I build AI agents and automations, and I use AI daily as part of how I develop." Motivo: el hero, el Stack y las etiquetas presentan IA/automatización como parte central, y el texto de About era 100% backend. **Decisión de Diego: no nombrar Amadia en About** porque todavía no tiene su primer cliente; una primera propuesta ("…para negocios reales") se descartó por exagerar. La frase actual solo afirma lo verificable: proyectos propios con agentes/automatización y uso diario de Claude Code (está en el CV).
2. **Etiquetas de capacidades (aplicadas):** de "Análisis / Desarrollo / Automatización / IA / Aprendizaje continuo" a **"Backend / Arquitectura / Sistemas asíncronos / Cloud y DevOps / IA"** (EN: Backend / Architecture / Asynchronous systems / Cloud & DevOps / AI), para que coincidan con el texto. Claves i18n antiguas eliminadas (`analisis`, `desarrollo`, `automatizacion`, `aprendizaje`; nuevas: `backend`, `arquitectura`, `asincronos`, `cloud`; `ia` se mantiene). Verificado en producción (1280px ES/EN y 390px): sin overflow ni errores de consola.
3. **"Más de seis años" (sin cambiar, decisión de Diego):** las fechas de Experiencia empiezan en feb 2018 (~8 años a la fecha; ~7 desde el primer empleo no junior, jul 2019). "Más de seis" es verdadero y coincide con el CV, pero un reclutador que sume las fechas verá una diferencia. Recomendación: si se cambia, hacerlo en el About *y* en el CV a la vez ("más de siete"), aprovechando la próxima edición del documento original del CV.
4. **Amadia en Proyectos: quitada** (ver sección "Amadia fuera de Proyectos" abajo).

**Nota menor no tocada:** el `aria-label="Capacidades"` de la lista de etiquetas en `TheAbout.vue` está escrito en español fijo, también en la versión EN. Conviene pasarlo a una clave i18n cuando se vuelva a tocar ese componente.

## Fase 8 — Content lock
**Estado:** casi cerrada — experiencia ✅, proyectos a mostrar ✅ (solo notify-engine), contacto ✅ (Email/WhatsApp/LinkedIn/GitHub), CV ✅ (PDFs ES/EN, según idioma), dominio ✅ (provisional), About ✅ (2026-09-28). Imagen del hero ✅ (2026-10-03). Falta solo que el dominio sea el definitivo para abrir a buscadores, que el dominio sea el definitivo.

## Imagen definitiva del hero (2026-10-03)

**Estado:** ✅ hecho. Diego confirmó que `hero-ai.png` (ilustración pixel-art generada con IA, 1254×1254, 1.9 MB) es la imagen definitiva.
- **Optimización:** AVIF (q55), WebP y JPEG (q78) en 2 anchos (800 y 1254) con ImageMagick, sin metadata. 48–83 KB en AVIF, 71–134 KB en WebP, vs 1.9 MB del PNG. `<picture>` con `srcset`/`sizes` (AVIF → WebP → JPEG), `width`/`height` reales (1254×1254), `fetchpriority="high"`, `eager`. El PNG original se movió fuera del repo (`~/hero-originales-backup/`); placeholders anteriores eliminados.
- **Encuadre:** el marco pasó de 4:3 a **1:1** (`aspect-square`) para no recortar la composición (perro abajo a la izquierda, monitores al centro). El resto del hero queda igual; verificado en 1440px y 390px.
- **Filtro:** se quitó el `grayscale/contrast/brightness`; con esta imagen dejaba los tonos naranja/azul casi grises. Los colores cálidos combinan con el rust.
- **Rótulos:** "PLACEHOLDER // POR REEMPLAZAR" → "AI ILLUSTRATION" (honesto: no es una foto real). `photoAlt` reescrito en ES/EN para describir la escena real.
- **Verificado:** lint, typecheck y build con código 0 (2.94 MB / 752 kB gzip); las 6 variantes se sirven con `cache-control: max-age=86400`.
- **Nota:** el CLAUDE.md del proyecto describe una "fotografía cinemática"; la imagen final es ilustración. Decisión de Diego; no se cambió esa guía.
