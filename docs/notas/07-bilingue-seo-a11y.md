# Notas — Fase 7 — Bilingüe, SEO y accesibilidad base

Registro histórico. El estado real de las tareas está en docs/PLAN.md.

> Texto movido **sin cambios** desde `docs/progress.md` en la migración a la
> metodología (2026-10-05). Es un registro histórico: las casillas y los
> "pendientes" que aparecen abajo son de esa fecha; el estado vigente está
> en `PLAN.md`.

---

## Fase 6 — Bilingüe
**Estado:** ✅ completa (2026-09-21, cerrada junto con Fase 7) — todo el contenido ES/EN, selector accesible, y ahora también `hreflang`/`og:locale` alternates vía `useLocaleHead()`.

## Fase 7 — Calidad (responsive, a11y, performance, SEO)

**Estado:** ✅ completa en lo que se puede verificar sin navegador (2026-09-21) — ver limitación honesta abajo.

**SEO:**
- [x] `useSeoMeta`/`useHead` completos: title, description, canonical, OG (title/description/url/site_name/type), Twitter Card, theme-color.
- [x] `hreflang` + `og:locale` alternates automáticos vía `useLocaleHead()` de `@nuxtjs/i18n` (verificado en `/` y `/en`: `es`, `es-CO`, `en`, `en-US`, `x-default`).
- [x] JSON-LD `Person` (`app.vue`) — solo datos ya confirmados en otro lado del repo: nombre, `jobTitle` (del propio i18n), `github.com/soypiipe`. **Sin** `image` (la foto del hero es placeholder de IA, no la cara real de Diego — incluirla como "su imagen" en structured data sería literalmente falso) y **sin** LinkedIn/email (siguen sin confirmar en `content.md`).
- [x] Sitemap dinámico (`server/routes/sitemap.xml.ts`, no un archivo estático) — usa `runtimeConfig.public.siteUrl` en tiempo de request, nunca un dominio inventado en el código. Dos URLs (`/`, `/en`) con alternates entre sí.
- [x] `robots.txt` actualizado: bloquea todo el crawling a propósito (contenido no bloqueado todavía — bio draft, foto placeholder, sin contacto real) con comentario explicando por qué y cuándo cambiarlo. Referencia al sitemap igual, para que quede listo.
- [x] `apple-touch-icon.png` (180×180, mismo monograma DA del favicon).
- **Sin dominio inventado en ningún lado:** `app/data/site.ts` ya no tiene `url` — la URL real sale de `NUXT_PUBLIC_SITE_URL` (`runtimeConfig.public.siteUrl`), con fallback a `localhost:3000` en dev. La primera versión de este archivo sí tenía un dominio inventado (`diegoamado.dev`) que corregí antes de commitear — anotado acá para que quede constancia del error y de que no llegó a shipearse.

**Accesibilidad:**
- [x] Foco visible on-brand (`:focus-visible` con outline color accent) en vez del outline azul por defecto del navegador.
- [x] **Auditoría real de contraste WCAG (cálculo matemático, no a ojo):** `accent` (#B9502C) sobre `bg`/`surface` da 4.00:1 / 3.73:1 — pasa el umbral de 3:1 para elementos gráficos (dots, bordes) pero **falla** el de 4.5:1 para texto normal. Encontré ~24 lugares donde `accent` se usaba como color de texto pequeño (índices "0X.", tags, métricas, links) — todos corregidos a `accent-hover` (#C16545), que sí cumple: 4.91:1 sobre bg, 4.59:1 sobre surface. El botón "Hablemos" (texto sobre fondo accent) tenía el mismo problema al revés — el fondo default pasa a `accent-hover`, con `hover:brightness-110` en vez de invertir a un color que volviera a fallar.
- [x] Semántica ya correcta de antes (1 `h1`, jerarquía de `h2`/`h3`, `aria-label` en controles icon-only, `<a>` sin `href` para los contactos pendientes en vez de links rotos).

**Performance / imágenes:**
- [x] Foto del hero convertida a WebP (22.5KB vs 42KB del JPEG original, ~46% menos) servida vía `<picture>` con fallback JPEG.
- [x] Build de producción se mantiene en ~2.87MB / ~736KB gzip — sin regresión pese a todo lo agregado esta fase.
- [x] Sin layout shift nuevo: imágenes con `width`/`height`, fuentes con `display=swap` (ya estaba desde Fase 0).

**Actualización — sí se pudo correr Lighthouse (mismo día):** encontré un Chrome real cacheado en el entorno (`~/.cache/puppeteer/chrome/...`) que una búsqueda anterior no había detectado por timeout. Corrí Lighthouse contra el **build de producción real** (`node .output/server/index.mjs`), no el dev server — el dev server sin minificar da métricas de performance completamente engañosas (lo comprobé: 46/100 en dev vs 65/100 en producción con el mismo código, antes de arreglar nada).

Primera corrida (producción, antes de estos fixes): Performance 65, Accessibility 96, Best Practices 100, SEO 69. Encontré 3 problemas reales, no cosméticos:

1. **Bug de contraste que sí sobrevivió a la auditoría manual anterior:** varios textos usaban `text-secondary/60` y `text-secondary/70` (opacidad reducida) — la opacidad diluye el color hacia el fondo y baja el contraste efectivo por debajo de los cálculos que hice a mano (que asumían el color sólido). Calculé el umbral real: `/80` es el mínimo que sigue pasando AA (5.11:1 sobre bg, 4.90:1 sobre surface); `/70` y `/60` fallan (4.15:1 y 3.33:1). Corregidas ~11 instancias en Hero/Contacto/Footer/Nav/Experiencia/Proyectos. **Accessibility pasó de 96 a 100.**
2. **Bug real de redirect:** `/` devolvía un `302` a `/en` para cualquier visitante (o crawler) con `Accept-Language: en*` — la detección automática de idioma de `@nuxtjs/i18n` estaba activa por defecto, sin que yo la hubiera configurado a propósito. Esto contradice que el español sea el idioma principal (`CLAUDE.md`) y le costaba ~610ms al performance. Se agregó `detectBrowserLanguage: false` — verificado que `/` ahora responde 200 incluso con `Accept-Language: en-US`.
3. **Render-blocking real:** las fuentes de Google se cargaban con `@import` en el CSS, que bloquea el render hasta que el navegador ya parseó todo `main.css` antes de siquiera descubrir la fuente. Cambiado a `<link rel="preconnect">` + `<link rel="stylesheet">` en `app.vue` — el ahorro estimado bajó de 910ms a 150ms.

Segunda corrida (producción, después de los 3 fixes): **Performance 69, Accessibility 100, Best Practices 100, SEO 69** (el 69 de SEO es 100% el bloqueo de indexación que pusimos a propósito — no hay más hallazgos ahí).

Lo que queda en Performance (menor prioridad, no arreglado hoy): FCP ~4.1s / LCP ~5.3s bajo el throttling agresivo que simula Lighthouse (probablemente más rápido en una red/CDN real), "Reduce unused JavaScript" (~180KB, mayormente overhead de hidratación de Nuxt, no fácil de recortar sin restructurar), "Use efficient cache lifetimes" (~22KB, headers de cache de assets estáticos).

Lo que seguí sin poder verificar: responsive visual real (no tomé screenshots, solo revisé que las clases `flex-wrap`/`max-w-*`/breakpoints estén bien usadas) y navegación por teclado a mano. Vale la pena que lo confirmes vos mismo en el navegador.

**Bug/flakiness encontrado y investigado (no es un defecto de código):** al probar `/sitemap.xml` contra el build de producción real, la primera vez tiró 404 con un error de Vue Router (`VUE_ROUTER_R0004`). Lo investigué a fondo — el route SÍ estaba compilado y registrado correctamente en el servidor. Repetí la prueba exacta dos veces más en instancias limpias del servidor y ambas veces funcionó perfecto (200, XML correcto). Conclusión: fue una condición de carrera transitoria en el cold-start de Nitro (carga lazy de rutas) al lanzar varias requests casi simultáneas justo después de arrancar el servidor — no algo que vaya a pasar en un deploy real, donde el servidor arranca y espera tráfico normalmente. Lo dejo anotado por transparencia, no porque haya "arreglado" algo — no cambié código para esto, simplemente no fue reproducible.

## Cierre de pendientes técnicos — 404/500, cache, Lighthouse

**Estado:** ✅ completa (2026-09-28). Solo se agregó lo que faltaba; nada de lo que ya funcionaba se modificó (contenido, layout, paleta, motion, componentes existentes intactos).

**1. Página de error personalizada (`app/error.vue`, nuevo).** Reemplaza la de Nuxt por defecto (anotada desde la Fase 2). Mismo lenguaje visual (monograma DA, grid de fondo, tipografía y botón del resto del sitio), bilingüe (`error.*` en ambos locales; el idioma sale del prefijo de la URL, así `/en/lo-que-sea` sale en inglés). Distingue 404 ("Página no encontrada") de cualquier otro error ("Algo salió mal"). `noindex`, `<html lang/dir>` propio (como `error.vue` reemplaza a `app.vue`, hay que repetirlo ahí), un solo `h1`, y el botón vuelve al inicio del locale actual con `clearError({ redirect })`. Ícono nuevo `lucide:arrow-left` sumado a `clientBundle.icons` (bundle: 44 íconos, 64.9KB). Verificado contra el build de producción: `/no-existe` → 404 en ES, `/en/no-existe` → 404 en EN, y captura en 1280px y 390px.

**2. Cache de assets estáticos (`routeRules` en `nuxt.config.ts`).** `/images/**`, `/favicon.ico` y `/apple-touch-icon.png` ahora salen con `cache-control: public, max-age=86400`. Un día y no más: no tienen hash en el nombre (a diferencia de `/_nuxt/*`, que ya era `immutable`), y la foto real del hero va a reemplazar a la actual. Lighthouse pasó de marcar ~22KB sin cache a ~9KB (solo el WebP del hero, que sigue marcado porque un día es menos de lo que Lighthouse considera "eficiente"; es el costo consciente de poder cambiar la foto sin esperar).

**3. Lighthouse re-medido** (build de producción, `/`, 4 corridas): **Performance 61–64**, **Accessibility 100**, **Best Practices 100**, **SEO 69** (el 69 sigue siendo 100% el `Disallow: /` a propósito). CLS 0. En EN, mismo rango. Antes de la iteración de legibilidad/motion eran 69: la baja de ~5–7 puntos es real pero pequeña (FCP ~4.3s, LCP ~5.4s, TBT ~300ms, bajo el throttling agresivo de Lighthouse). Una primera corrida en frío dio 43 con TBT 1340ms y no se repitió en las siguientes cuatro; no es representativa. **Lo que domina FCP:** la hoja de Google Fonts (bloqueante, ~850ms simulados) y el CSS de entrada. **Se resolvió justo después, ver la sección siguiente (fuentes autoalojadas + compresión).** El LCP es la foto del hero (ya con `fetchpriority=high`, WebP y descubrible en el HTML inicial), y hay ~12KB de ahorro posible en su tamaño servido que se resuelve solo con la foto final. `bf-cache` falla por "Internal error" de Chrome en headless, no accionable.

## Rendimiento (fuentes + compresión) y datos de contacto reales

**Estado:** ✅ completa (2026-09-28). Sin cambios de identidad visual, layout, paleta ni motion.

**1. Fuentes autoalojadas (`@nuxt/fonts`, dependencia nueva).** Antes: hoja de Google Fonts (bloqueante, ~850ms simulados en Lighthouse) más conexión a dos dominios de terceros, pidiendo pesos que no se usaban (300, 600). Ahora: `fonts` en `nuxt.config.ts` con Inter 400/500/700 y JetBrains Mono 400/500 (los únicos pesos usados en el código), solo subset `latin` (cubre los acentos del español), descargadas en el build y servidas desde `/_fonts/` con `cache-control: immutable` de un año. Resultan 2 archivos woff2 (fuentes variables, 48KB + 31KB). El módulo genera fuentes de respaldo con métricas ajustadas (sin salto de layout al cargar la real, CLS 0). **`preload: true` explícito:** por defecto el módulo no hace preload de fuentes con `unicode-range` (las de Google lo traen), pero ambos archivos se usan en el primer render. Se quitaron los `<link>` de Google de `app.vue` y se actualizó el comentario de `main.css`. Sitio y página de error sin ninguna petición a terceros. Nota: el CSS de salida trae los `@font-face` repetidos (mismo contenido, unos KB sin comprimir, insignificante gzip); no se tocó.

**2. Compresión de assets estáticos (`nitro.compressPublicAssets: true`, sin dependencias).** Hallazgo con el waterfall de Lighthouse: el servidor Node de producción mandaba JS/CSS **sin comprimir** (`transferSize == resourceSize`; ~445KB de JS). Ahora Nitro genera `.br` y `.gz` de cada asset en el build y los sirve según `Accept-Encoding` (verificado: 37.8KB → 9.7KB en un chunk de prueba). No cubre el HTML de SSR (~145KB sin comprimir, ~39KB gzip): en un deploy real lo comprime el proxy/CDN. De esos 145KB, ~80KB son el CSS inline de íconos que genera `@nuxt/icon` para el SSR — funciona bien, no se tocó.

**Lighthouse (build de producción, `/`, 4 corridas antes → 4 después):** Performance **62–69 → 83–85**, FCP 4.2s → 2.6s, LCP 4.9–5.4s → 3.3s, TBT ~200–420ms → 200–260ms, CLS 0. Accessibility/Best Practices sin cambios (100/100) y SEO 69 por el `Disallow: /` deliberado. Lo que queda: ~190KB de JS sin usar (hidratación de Nuxt) y el WebP del hero sobredimensionado (~12KB), que se resuelve con la foto final.

**3. Datos de contacto reales (Fase 8, parcial).** Nuevo `app/data/contact.ts` (tipado, el `href` es opcional: sin `href` el botón sigue siendo un `<a>` inerte y atenuado, igual que antes). Activos: **Email** (`mailto:diego_amado@outlook.com`), **WhatsApp** (`https://wa.me/573214048069`), **LinkedIn** (`https://www.linkedin.com/in/diegoamadodev`) y **GitHub** (`https://github.com/soypiipe`, ya confirmado en `00-mapa.md`). Los de web abren en pestaña nueva con `rel="noopener noreferrer"`. **CV** quedó inerte en ese momento (aún sin PDF); se activó en la sección siguiente. JSON-LD `Person`: `sameAs` ahora incluye LinkedIn (el email/teléfono no se ponen en datos estructurados a propósito). *(Correo corregido después: es `diego_amado_@outlook.com`, con guion bajo antes de la `@`; ver la sección siguiente.)*

## Auditoría general del sitio (2026-10-01)

**Estado:** ✅ completa, a pedido de Diego ("revisa que no quede nada más pendiente"). Barrido sistemático, no solo visual: build de producción, lint/typecheck limpios; cruce por script de **todos** los íconos usados en `app/data/*.ts` contra `clientBundle.icons` de `nuxt.config.ts` (47/47 usados están registrados, 0 huecos); cruce de **todas** las claves i18n (literales, dinámicas por prefijo, y las que vienen de datos — `nameKey`/`kindKey`/`labelKey`) contra ambos locales (ES/EN con paridad exacta, 0 huérfanas, 0 faltantes); grep de restos de debug (`TODO`/`FIXME`/`console.log`/`lorem ipsum`/"Ariza" — ninguno real, solo falsos positivos de substring como "método"); sweep en navegador real (ES/EN × desktop/móvil × `/` y 404) verificando `h1` único, `lang` correcto, sin overflow horizontal, sin imágenes rotas, sin texto de clave i18n sin traducir, 0 errores de consola; Lighthouse re-corrido (producción, 3 corridas): Performance 83–86, Accessibility 100, Best Practices 100, SEO 69 (sigue el `Disallow: /` deliberado) — sin regresión pese a todo lo agregado desde la última medición. `robots.txt`, `sitemap.xml`, OG/Twitter/JSON-LD y los PDFs del CV, verificados contra el dominio provisional `diegoamado.dev`.

**Encontrado y arreglado — accesibilidad bilingüe real, no solo la nota menor ya conocida sobre "Capacidades":** varios `aria-label` estaban escritos en español fijo y **no cambiaban en la versión en inglés** (invisibles en pantalla, solo los nota un lector de pantalla): `nav aria-label="Principal"` / `"Principal (móvil)"`, el botón de menú móvil (`aria-label="Abrir menú"`) y `footer nav aria-label="Footer"`. **Bug más serio del grupo:** el botón del menú móvil nunca decía "Cerrar menú" al abrirse — el ícono cambiaba (☰ → ✕) pero el nombre accesible seguía siendo "Abrir menú" incluso con el menú ya abierto, así que un lector de pantalla no se enteraba de que el botón ahora cerraba. Arreglado: nuevas claves `nav.ariaMain`, `nav.ariaMainMobile`, `nav.openMenu`/`nav.closeMenu` (el botón alterna según `isMobileOpen`), `about.ariaLabel`, `footer.ariaLabel`, en ambos locales. De paso, se quitó un `<span class="sr-only">Menú</span>` redundante dentro del botón (el nombre accesible ya lo da el `aria-label`, no hacía falta). Verificado en navegador: clic en el botón cambia el `aria-label` de "Abrir menú"/"Open menu" a "Cerrar menú"/"Close menu" en el acto, y los 3 `aria-label` de navegación salen traducidos en `/en`. Build/lint/typecheck sin errores.

**No se encontró nada más pendiente** fuera de lo ya documentado en "Pendientes abiertos" (foto del hero, dominio definitivo, Amadia, Miattend, verificación manual en dispositivo real).
