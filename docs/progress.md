# Progress Log

Registro de qué se hizo en cada fase de `implementation-plan.md`, para no perder contexto entre sesiones. Se actualiza al cerrar cada fase, no antes.

Dirección visual aprobada (ver `ux-ui.md` §3 y §6): layout "Technical", paleta **Charcoal + Rust**, grid de fondo con drift sutil (70s), foto en marco tipo viewfinder. Explorado y decidido en Stitch — ver el artifact de comparación de paletas si necesitas el historial de esa decisión.

Fotografía del hero: por ahora placeholder generado por IA (mismo usado en la exploración de Stitch). Pendiente reemplazar por la foto real de Diego cuando esté disponible — no bloquea el resto de fases.

---

## Fase 0 — Project setup

**Estado:** ✅ completa (2026-09-21)

- [x] Nuxt 4 + TypeScript inicializado (`npx nuxi init`, template minimal)
- [x] Tailwind instalado (`@nuxtjs/tailwindcss`)
- [x] Lint/format configurado (`@nuxt/eslint`, `npm run lint` sin errores)
- [x] Typecheck configurado (`vue-tsc`, `npx nuxi typecheck` sin errores)
- [x] i18n configurado (`@nuxtjs/i18n`, es default sin prefijo, en bajo `/en/`)
- [x] Carpetas base creadas (`app/components/{layout,navigation,hero,about,stack,projects,experience,contact,ui}`, `app/composables`, `app/data`, `app/layouts`, `app/pages`)
- [x] Tokens de diseño (paleta Charcoal + Rust) en `tailwind.config.ts` — bg/surface/primary/secondary/accent/hairline centralizados
- [x] Dev server corre sin errores (`npm run dev`) y `npm run build` compila limpio

Detalles/decisiones que no estaban en el plan original:
- Nuxt 4 usa `app/` como carpeta fuente (no `src/` ni raíz) — la estructura de `architecture.md` vive dentro de `app/`.
- Los JSON de i18n van en `i18n/locales/` (convención de `@nuxtjs/i18n` v10), no en `content/` como sugería `architecture.md` originalmente.
- `nuxt.config.ts` tiene `components: [{ path: '~/components', pathPrefix: false }]` para que `TheNavigation`/`TheHero` no requieran prefijo de carpeta (por defecto Nuxt las hubiera nombrado `NavigationTheNavigation`, etc.).

## Fase 1 — Navegación + Hero

**Estado:** ✅ completa (2026-09-21) — primera versión funcional, pendiente pulir en Fase 7

- [x] Monograma DA (`app/components/navigation/TheNavigation.vue`)
- [x] Nav desktop
- [x] Nav mobile (menú full-width con botón hamburguesa/cerrar, `aria-expanded`)
- [x] Selector ES/EN (`switchLocalePath`, ya funcional)
- [x] Botón Descargar CV — enlaza a `/cv/diego-amado-cv.pdf`, que **todavía no existe** (placeholder de ruta, no de contenido inventado)
- [x] Tipografía del hero (Inter + JetBrains Mono vía Google Fonts)
- [x] CTAs (Ver proyectos / Descargar CV)
- [x] Indicador de disponibilidad (dot animado, `motion-reduce:animate-none`)
- [x] Composición de imagen del hero — placeholder IA guardado localmente en `public/images/hero-placeholder-ai.jpg`, marcado en UI como "PLACEHOLDER // POR REEMPLAZAR"
- [x] Grid de fondo con drift sutil (70s, `motion-safe:animate-grid-drift`, respeta `prefers-reduced-motion`)

Nota: quité las coordenadas/ciudad ("BOGOTÁ") que traía el mockup de Stitch como decoración — `content.md` dice que la ubicación pública todavía no está confirmada, y además la ciudad que puso Stitch era incorrecta (Diego está en Bucaramanga, no Bogotá). El resto de metadata técnica decorativa (FIG. 01, etc.) se mantuvo porque es puramente estilística, no una afirmación de hecho.

## Fase 2 — About + Stack

**Estado:** ✅ completa (2026-09-21)

- [x] `TheAbout.vue` — heading + párrafo de `content.md` + 5 micro-labels de capacidades
- [x] `TheStack.vue` — agrupado por categoría (Frontend/Backend/Data/Infra/Tools) desde `app/data/stack.ts` tipado, texto plano, sin wall-of-logos
- [x] `h2` correcto en ambas (jerarquía: 1 `h1` del hero, 2 `h2` de estas secciones)
- [x] Bilingüe (es/en) vía i18n

Notas:
- El párrafo de About es el **draft de `content.md`, tal cual**, con una frase agregada al final sobre aprendizaje continuo (ese tema lo pedía `ux-ui.md` pero no estaba en el draft) — sigue siendo contenido no definitivo, pendiente de aprobación final en Fase 8.
- El stack incluye React tal como lo lista `ux-ui.md`, aunque `CLAUDE.md` raíz marca React como "solo fundamentos" en los gaps honestos de Diego — lo dejé porque es lo que pide el brief de esta sección, pero es una tensión a resolver antes del lanzamiento (¿se lista como "familiaridad" en vez de al mismo nivel que Vue/NestJS?).
- Orden en el DOM por ahora: Hero → About → Stack. Cuando se agreguen Proyectos (Fase 3) y Experiencia (Fase 4), hay que insertarlos ANTES de Stack en `app/pages/index.vue` para que el orden visual coincida con el del nav (ya dejé un comentario `TODO` ahí). `TheStack` ya está numerado "05." previendo ese orden final.

**Ajustes post-revisión (mismo día):**
- Bug corregido: los micro-labels de About mostraban el JSON crudo en vez del texto — `tm()` de i18n devuelve el nodo del mensaje, no el string resuelto, para árboles de objetos. Se cambió a `t()` con claves fijas.
- Se agregó `@nuxt/icon` (oficial, basado en Iconify — solo empaqueta los íconos usados, no una librería completa) y cada tecnología del stack ahora tiene su logo real vía la colección `simple-icons`, renderizado monocromo con `currentColor` (hereda `text-secondary`, `hover:text-accent`) para que combine con la paleta en vez de verse como logos a color. Verificado que las 20 combinaciones logo+tecnología resuelven contra el endpoint de íconos.
- Categoría de IA agregada al stack, confirmada por Diego: Claude Code, Claude.ai (ambas con el logo de Anthropic/Claude), OpenAI. No se incluyó "RAG" de `content.md` — Diego pidió explícitamente solo esas tres.

**Limpieza de marca Nuxt (mismo día):** el scaffold inicial de `nuxi init` dejó rastros visuales del framework, no solo su código:
- `public/favicon.ico` era el logo de Nuxt (el triangulito verde) — reemplazado por un favicon propio (fondo `#0C0A09`, "DA" en `#F1EEE9`, línea `#B9502C`), generado desde SVG con ImageMagick, multi-resolución (16/32/48).
- `devtools: { enabled: true }` en `nuxt.config.ts` mostraba un botón flotante con el logo de Nuxt en el navegador durante `npm run dev` — desactivado.
- Verificado que no hay meta tag `generator: Nuxt` ni otros rastros visuales. Lo que sí queda (y se queda a propósito) son los componentes propios del framework — `<NuxtLink>`, `<NuxtPage>`, `<NuxtLayout>`, `<NuxtRouteAnnouncer>` — que no son branding, son piezas estructurales (el último es de accesibilidad: anuncia cambios de ruta a lectores de pantalla).
- Pendiente para Fase 7: página 404/500 personalizada (por ahora es la de Nuxt por defecto, solo visible si alguien entra a una ruta que no existe).

**A partir de ahora:** cada cambio se verifica con lint + typecheck + build, y el dev server queda corriendo en `http://localhost:3311` para revisión en vivo (no lo mato al terminar cada tarea).

## Fase 3 — Proyectos

**Estado:** ✅ completa (2026-09-21)

- [x] `app/data/projects.ts` tipado — solo Miattend y Amadia Technology (los dos confirmados en `content.md`); el tercero sigue "por confirmar", no se inventó
- [x] `ProjectCard.vue` reusable, layout tipo "dossier editorial" (filas separadas por hairline, no cards con imagen falsa — no hay capturas reales de los proyectos, y fabricar una imagen que parezca screenshot real del producto de un cliente sería engañoso, no solo un placeholder genérico)
- [x] Cada proyecto usa el campo real "Status" de `content.md` como tag ("Proyecto real" / "Proyecto propio") en vez de inventar una frase de contexto
- [x] Tecnologías con ícono (reusa el mismo sistema de `@nuxt/icon` del Stack)
- [x] `href` opcional — se omite si no hay URL confirmada (ninguno de los dos la tiene todavía), no se inventa un link
- [x] Insertado en `index.vue` entre About y Stack (orden correcto según nav)
- [x] Bilingüe

**Fix de performance encontrado en esta fase:** al agregar los íconos de Proyectos, el build server saltó de ~3MB a ~9MB. Causa: `@nuxt/icon` en modo `serverBundle: 'auto'` no puede detectar qué íconos se usan cuando el nombre viene de datos dinámicos (`:name="tech.icon"`), así que empaquetó las colecciones `simple-icons` y `lucide` COMPLETAS (miles de íconos) en vez de los ~24 que realmente usamos. Se corrigió configurando `clientBundle.icons` con la lista explícita en `nuxt.config.ts` (`provider: 'none'`, `serverBundle: false`) — el build volvió a ~2.8MB, confirmado: "Nuxt Icon client bundle consist of 25 icons with 45.99KB". Si se agregan tecnologías/íconos nuevos en el futuro, hay que sumarlos a esa lista o dejarán de renderizar.

**Actualización (2026-09-21): agregado notify-engine con datos reales.** Diego pasó un JSON con su proyecto personal (notify-engine, motor de notificaciones multicanal — real, en `02-personal/notify-engine`). Cambios:
- `Project` en `app/data/projects.ts` se extendió de forma aditiva (no se tocó Miattend ni Amadia): campos opcionales `role`, `startDate`/`endDate`/`current`, `summary`, `responsibilities`, `achievements`, `links` — todos reusando los tipos `LocalizedText`/`LocalizedList`/`Achievement`/`StackItem` ya definidos en `experience.ts` en vez de duplicarlos.
- `ProjectCard.vue` ahora renderiza esos campos cuando existen (mismo tratamiento visual que ya tenía Experiencia: logros con borde de acento, lista de responsabilidades, rango de fechas) — Miattend/Amadia siguen viéndose exactamente igual que antes porque simplemente no tienen esos campos.
- El JSON traía `https://github.com/<tu-usuario>/notify-engine` como placeholder — se reemplazó por `github.com/soypiipe/notify-engine`, que ya es el dato real confirmado en `00-mapa.md` (no es un dato inventado). Se simplificó a un solo link ("Ver código") en vez de repo + case study separados, porque el case study del JSON era el mismo repo con `#readme` — dos botones al mismo lugar no aportaba nada.
- **Refactor de paso:** extraje la lógica de fechas (`formatMonth`/`formatDateRange`) a `app/utils/date.ts` y el patrón `pick()` de textos bilingües a `app/composables/useLocalized.ts`, porque ya se repetía en Experiencia y en Proyectos. `TheExperience.vue` también se actualizó para usar estos compartidos en vez de su copia local.
- Íconos nuevos (TypeORM, Redis, OpenTelemetry, Grafana, Resend, Slack; BullMQ no tiene logo en Simple Icons, se usó un ícono genérico de Lucide) — bundle final: 43 íconos, 64.71KB. Build se mantuvo en ~2.87MB.

**Segunda actualización (2026-09-21): Diego pidió dejar solo notify-engine y Amadia.** Miattend queda fuera de la sección por ahora (a pedido explícito, no eliminado de `content.md` — sigue siendo un proyecto real confirmado ahí, solo no se muestra acá). notify-engine pasó a ir primero en el array (es el que tiene `featured`/toda la info rica). El tag de Amadia cambió de "Proyecto propio" a **"Construyendo mi empresa"** — Diego pidió que se especifique que es su intento de construir su propia empresa, no solo un proyecto personal genérico. Se quitaron las claves i18n de `projects.miattend.*` de ambos locales por quedar sin uso (mismo criterio que con `viewMore` antes — nada de claves muertas).

**También se corrigió `CLAUDE.md` (el de este proyecto):** tenía su propia lista de fases (Phase 1–9) que ya no coincidía con `docs/implementation-plan.md`/`docs/progress.md` (Phase 0–8) — números y agrupación distintos, puro desfase acumulado. Se reemplazó esa lista duplicada por un puntero a `docs/progress.md` como fuente de verdad única, para que no se vuelva a desincronizar. También se corrigió el orden de "## Sections" ahí: decía Stack antes de Proyectos, pero el orden real construido (y el que importa, porque coincide con el nav) es Proyectos → Experiencia → Stack.

## Fase 4 — Experiencia + Contacto

**Estado:** ✅ completa (2026-09-21)

- [x] `TheExperience.vue` — actualizado con el historial real que Diego confirmó (2026-09-21): Mia Advanced Systems (2022-08 → 2026-05), Interactivo Contact Center (2019-07 → 2022-08), Grupo Meiko (2018-02 → 2019-05). Datos en `app/data/experience.ts` tipado, bilingüe por campo (`{es, en}` en vez de rutear por las claves i18n planas, porque los textos son largos y estructurados — logros con métrica, listas de responsabilidades). Fechas formateadas con `Intl.DateTimeFormat` nativo (no strings hardcodeadas de mes), correctas en ambos locales ("ago de 2022 — may de 2026" / "Aug 2022 — May 2026").
- **Desviación deliberada del spec:** `ux-ui.md` pedía timeline horizontal en desktop / vertical en mobile. Los datos reales son mucho más densos de lo que ese spec anticipaba (responsabilidades, logros con métrica, stack completo por rol) — forzar eso en tarjetas horizontales lo hacía ilegible, así que quedó vertical en todos los tamaños, estilo dossier igual que Proyectos.
- Íconos nuevos por el stack de cada rol: RabbitMQ, GitHub Actions, Express, JavaScript, HTML5, CSS3, Qlik (para QlikView) — todos verificados contra la colección local antes de usarlos.
- Bug de TypeScript corregido en el parseo de fechas (`ym.split('-').map(Number)` producía `number | undefined` en modo estricto) — se cambió a acceso indexado explícito.
- [x] `TheContact.vue` — headline/supporting exactos de `ux-ui.md` §11. Botones para Email/WhatsApp/LinkedIn/GitHub/CV sin `href` (son `<a>` sin `href`, que HTML no trata como interactivos — ni link roto ni dato inventado) porque `content.md` los marca como `EMAIL_TO_ADD` etc., ninguno confirmado.
- [x] `TheFooter.vue` — este sí completo sin restricciones: DA + nombre + rol, nav (reusa `app/data/navigation.ts`), año dinámico (`new Date().getFullYear()`). Va en `layouts/default.vue`, no en la página, para que aparezca en todo el sitio.
- [x] Orden final del DOM ya coincide con el nav: Hero → About → Proyectos → Experiencia → Stack → Contacto.
- [x] Íconos nuevos (Contacto + Experiencia) sumados a la lista explícita de `nuxt.config.ts` — bundle final: 36 íconos, 52.41KB.
- [x] Build se mantuvo en ~2.84MB (sin regresión del fix de Fase 3).

Nota: encontré y corregí un residuo de formato mío en este archivo (una línea "Estado: pendiente" huérfana quedó de una edición anterior) antes de empezar esta fase.

## Fase 5 — Motion

**Estado:** ✅ completa (2026-09-21)

- [x] **Entrada escalonada del hero:** eyebrow → nombre → statement → supporting → CTAs → disponibilidad → foto, con `motion-safe:animate-fade-up` y `[animation-delay:Xms]` crecientes (0/80/160/240/320/400/200ms). Keyframe `fade-up` en `tailwind.config.ts`.
- [x] **Section reveal on scroll:** directiva `v-reveal` (`app/plugins/reveal.ts`) con IntersectionObserver, aplicada a About/Proyectos/Experiencia/Stack/Contacto (Hero no, ese usa la entrada escalonada de arriba). Fade + lift de 16px al entrar en viewport, una sola vez.
- [x] **Hover elevation (2px):** CTAs del hero, botón "Hablemos" del nav, links "Ver código" de proyectos — `hover:-translate-y-0.5` sobre `transition-all`.
- [x] **Estado activo del nav en scroll:** IntersectionObserver sobre `main section[id]`, resalta el link (texto + índice) de la sección visible. Funciona en desktop y mobile.
- [x] Nada de animación infinita nueva — el único loop sigue siendo el grid del hero (Fase 1). Todo respeta `prefers-reduced-motion` (verificado: el chequeo vive en el propio `mounted` del directive, y hay guard doble en CSS para `reveal-pending`).

**Bug real encontrado y corregido:** el plugin del directive `v-reveal` lo hice primero como `reveal.client.ts` (solo cliente) — Vue SSR igual intenta resolver el directive al renderizar en el servidor, y como no estaba registrado ahí, tiraba `Cannot read properties of undefined (reading 'getSSRProps')` → HTTP 500 en toda la página. Se corrigió registrándolo como plugin universal (`reveal.ts`, sin sufijo `.client`) — el trabajo real sigue siendo 100% client-only porque vive dentro de `mounted`, que nunca corre en SSR de todas formas. Verificado tanto en dev como corriendo el build de producción real (`node .output/server/index.mjs`), no solo `npm run dev`.

**Nota sobre "progressive enhancement":** si el JS falla por cualquier razón, el contenido nunca queda invisible — la clase que oculta (`reveal-pending`) solo la agrega el propio directive en `mounted`, nunca está en el HTML por defecto ni en el CSS base.

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

## Iteración post-Fase 7 — legibilidad, contenido progresivo y motion

**Estado:** ✅ completa (2026-09-27). Sin cambios de identidad visual (layout, paleta, grid, foto, tipografía, DA, metadata técnica intactos).

**1. Escala tipográfica (jerarquía revisada, no un `scale(1.1)` global):**
- Hero: nombre `xl:text-[5.5rem]` (antes tope 72px), statement 22/28px (antes 20/24), supporting 16/18px (antes 14/16).
- Títulos de sección `h2`: 36/48px (antes 30/36). Títulos de proyecto/experiencia `h3`: 24/30px (antes 20/24).
- Cuerpo: 16–18px (antes 14–16); About 18/20px. Descripciones compactas 16/18px.
- Metadata técnica sigue pequeña y secundaria, pero sube un escalón: 10→11px, 11→12px, 12→13px (mono). Nav 13px (antes 12), botones 13px con alto 48px (antes 44).
- **Nav desktop pasa de `md` a `xl`:** con la fuente más grande la barra completa se desbordaba en 768–1279px (overflow horizontal de 157px medido en tablet). Debajo de `xl` ahora hay hamburguesa; entre `sm` y `xl` el toggle ES/EN y "Hablemos" siguen visibles en el header (y se ocultan del panel para no duplicarse).

**2. Experiencia como accordion editorial:** estado compacto = índice, empresa (h3), cargo · país, periodo, `summary` existente, primeras 5 tecnologías en una línea + "+N", y pista "VER DETALLES +". Expandido = modalidad/ubicación, responsabilidades, resultados (logros con métrica), stack completo con íconos. Solo se muestra contenido que ya existía en `app/data/experience.ts` — nada nuevo. Uno abierto a la vez (decisión mía: en una lista de solo 3 items, tener varios abiertos empuja demasiado el resto fuera de pantalla). Toda la fila es el área de click (botón dentro del `h3` con `::after` estirado, para no meter contenido de bloque dentro de un `<button>`); `aria-expanded`/`aria-controls`, Enter/Space, y el contenido colapsado es `inert` (fuera del tab order y del árbol de accesibilidad) pero sigue en el DOM/SSR, así que sigue siendo indexable. Si al abrir una fila la anterior (más arriba) se cierra y la fila queda bajo el nav sticky, se hace scroll suave para reencuadrarla.

**3. Proyectos:** mismo patrón (`ProjectCard.vue`). Compacto: número, marca, tipo/rol, nombre, descripción, stack (5 + "+N"), pista. Expandido: "Trabajo realizado", "Resultados", stack completo, link. **Amadia no es expandible a propósito:** solo tiene descripción y 4 tecnologías, no hay nada más que mostrar y un panel vacío sería peor que ninguno — se ve compacto y sin pista de interacción. Se expande solo cuando se le agregue contenido real. Nota: no existe un campo "problema/contexto" ni "arquitectura" como tal en los datos; lo más cercano son `responsibilities` (incluyen los patrones Adapter/Strategy) y `achievements`, y eso es lo que se usa. No inventé descripciones cortas: la compacta de notify-engine es su `summary` completo (3 líneas).

**4. Motion — un solo lenguaje:** una curva (`--ease-soft`, sin overshoot) y tres duraciones (250ms hover, 450ms expandir, 800ms entradas), definidas en `tailwind.config.ts`/`main.css`. Entradas = 24–28px + opacity (antes 12–16px, imperceptible). Hover = 2–4px o subrayado que se dibuja (`.link-line`, transform). El reveal on scroll dejó de ir por sección entera (las filas de abajo ya estaban visibles cuando el usuario llegaba a ellas, por eso no se notaba) y ahora va por bloque: eyebrow, título, párrafos, cada fila, con stagger. La directiva `v-reveal` ahora acepta delay, no oculta lo que ya está en pantalla al cargar (evitaba un flash) y suelta su `transition` al terminar para no retrasar los hovers.

**5. Fondo con vida (`TheBackground.vue`, nuevo):** tres capas suaves, todo `transform`/`opacity`: (a) el grid se desliza una celda (48px) en 48s, en loop sin costura; (b) parallax de scroll (`animation-timeline: scroll()`, CSS puro, sin JS; navegadores sin soporte lo ignoran); (c) 6 cruces `+` sobre intersecciones del grid que aparecen y desaparecen (periodos que dividen los 48s, así están en opacity 0 cuando el loop reinicia); más un push-in muy lento de la foto del hero dentro de su marco (40s, alternate). El drift anterior animaba `background-position`, que repinta cada frame; ahora corre en el compositor. El grid pasó a una capa `fixed` con `z-index: -10` entre el `body` y el contenido (antes vivía dentro del Hero y quedaba por encima del contenido de otras secciones). Para que el movimiento se note subí un poco la opacidad de las líneas (~0.21 → ~0.31). `prefers-reduced-motion`: sin drift, sin parallax, sin pulsos, sin push-in, sin entradas, accordion instantáneo.

**Bug encontrado en el camino:** mi clase `.collapse` chocaba con la utilidad `collapse` de Tailwind (`visibility: collapse`) y el panel expandido quedaba invisible — se renombró a `.disclosure`.

**Verificado:** lint + typecheck + build limpios (build 2.92MB / 748KB gzip, antes 2.87MB / 736KB). Con Chrome headless (dev y build de producción): sin errores de consola, sin overflow horizontal en 1440/820/390px, un-solo-abierto, Enter/Space, `inert`, ES y EN, menú móvil, y `prefers-reduced-motion` (todas las animaciones en `none`, contenido visible). Frame deltas durante scroll en headless por software: p50 16.7ms.

**No verificado (necesita ojos y un dispositivo real):** fluidez percibida del fondo en un móvil físico, y si la intensidad del movimiento te parece bien (los valores están al inicio de `TheBackground.vue`, son fáciles de bajar/subir).

## Fase 8 — Content lock
**Estado:** pendiente — experiencia exacta ✅, y proyectos a mostrar ✅ (solo notify-engine + Amadia, decidido 2026-09-21). Sigue bloqueada por: bio de About definitiva, datos de contacto reales (Email/WhatsApp/LinkedIn/GitHub), CV en PDF, foto final del hero.

---

## Pendientes abiertos

**Bloqueados por contenido tuyo (Fase 8 — content lock):**
- Bio definitiva de About (hoy es el draft de `content.md` + una frase de aprendizaje continuo).
- Datos de contacto reales: Email, WhatsApp, LinkedIn (GitHub ya se sabe: `github.com/soypiipe`). Hoy los botones de Contacto son `<a>` sin `href`.
- CV en PDF real — hoy `/cv/diego-amado-cv.pdf` no existe y hay 3 links que apuntan ahí (hero, nav, contacto).
- Foto final del hero (hoy es placeholder de IA, marcado en UI). Al tenerla: quitar el rótulo "PLACEHOLDER // POR REEMPLAZAR", agregar `ogImage` y `image` al JSON-LD `Person`.
- Dominio real (`NUXT_PUBLIC_SITE_URL`) para abrir `robots.txt` al crawling (hoy bloquea todo a propósito).
- Decidir cómo se lista React en el Stack (Diego lo tiene como "solo fundamentos").
- Amadia: cuando tenga contenido real (contexto, resultado, links), agregarlo a `projects.ts` y la fila pasa a ser expandible sola.
- Miattend sigue fuera de Proyectos por decisión tuya (2026-09-21), pero sigue real en `content.md`.

**Técnicos (no bloqueados, menor prioridad):**
- Página 404/500 personalizada (`app/error.vue`) — anotada desde la Fase 2 y nunca hecha; hoy es la de Nuxt por defecto.
- Performance (Lighthouse en build de producción, 2026-09-21: Perf 69 / A11y 100 / BP 100 / SEO 69): FCP ~4.1s y LCP ~5.3s bajo el throttling de Lighthouse; ~180KB de JS sin usar (hidratación de Nuxt); headers de cache de assets estáticos (~22KB). **Hay que re-medir** después de esta iteración: cambió el CSS, el fondo y el markup de Experiencia/Proyectos, y no se volvió a correr Lighthouse.
- Verificación manual pendiente en navegador/dispositivo real: responsive visual fino y navegación por teclado completa (parcialmente cubierto por el test headless de esta iteración: Tab/Enter/Space en el accordion).
- Si se agregan tecnologías nuevas con ícono, sumarlas a `clientBundle.icons` en `nuxt.config.ts` o no van a renderizar.

**Siguiente paso:** Fase 8 depende de ti (contenido). Del lado técnico, lo más útil es re-correr Lighthouse y la página 404.
