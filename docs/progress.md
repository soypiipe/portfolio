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

## Ronda de ajustes — accordion, reveal, luz ambiental, idioma

**Estado:** ✅ completa (2026-09-28). Sin cambios de contenido, layout, paleta ni identidad visual. Motion sin tocar: hover 250ms, expandir 450ms, entradas 800ms, misma curva `--ease-soft`.

**1. Toda la fila del accordion es clickeable (Experiencia y Proyectos).** Bug real, con causa medida: el botón usaba un `::after` estirado (`absolute inset-0`) para cubrir la fila, pero el `translate-x-1` del hover estaba en el `h3` que lo contiene. Un `transform` convierte a su elemento en *containing block* de los descendientes `absolute`, así que **en cuanto el cursor entraba a la fila** el área clickeable pasaba de 912×213px a 621×36px (solo el título). Arreglo: el translate pasa a un `<span>` dentro del botón (el `::after` ya no queda dentro de nada transformado), y el bloque compacto absorbió el padding vertical/horizontal de la fila (`-mx px py-8`), así que el área clickeable llega de borde a borde, padding incluido. El `::after` lleva `z-10` porque el ícono `+` de "VER DETALLES" es un elemento `relative` posterior en el DOM y quedaba por encima del overlay (ese pedacito no respondía). Altura de fila colapsada idéntica (277.5 / 295.5px), expandido visualmente igual. Enter/Space y `aria-expanded/controls` intactos. **Decisión:** la zona clickeable es el bloque compacto (lo que ves colapsado), no el cuerpo expandido — ahí hay texto que conviene poder seleccionar y links propios; los links del cuerpo expandido no disparan el accordion. Si en algún momento se agrega un link dentro del bloque compacto, necesita `relative z-20` (queda anotado en un comentario en ambos componentes). Amadia sigue sin botón (nada que expandir).

**2. Scroll reveal re-entrante (`app/plugins/reveal.ts`).** Antes: un solo observer con `unobserve` tras la primera entrada, y lo que ya estaba en pantalla al cargar quedaba fuera para siempre. Ahora: dos observers por elemento con histéresis — *enter* al 10% visible (misma franja de 60px abajo de antes) y *exit* solo cuando el elemento salió por completo. Un elemento parcialmente visible nunca se oculta; el re-armado ocurre fuera de pantalla, donde nadie ve el "snap". Al volver a entrar repite fade + translate (mismos 800ms/28px). Se limpia en `unmounted`. **Bug encontrado al probarlo:** al re-armar un elemento que salió por *arriba*, el estado oculto (`translateY(28px)`) lo empujaba de vuelta 28px hacia el viewport; si era chico, volvía a cruzar el umbral → se mostraba → salía → se re-armaba… **9–11 cambios de clase en 1.5s con el scroll quieto**. Se arregló con `rootMargin: '32px 0px'` en el exit observer (mayor que el desplazamiento) → 0 cambios. Si algún día se cambia el `28px` de `.reveal-pending`, hay que mantenerlo por debajo de esos 32px (comentado en ambos archivos).

**3. Luz ambiental que sigue al cursor (`app/components/layout/CursorGlow.vue`, nuevo).** Una capa `fixed` (`z-index: -10`, sobre el grid, bajo todo el contenido) con un `radial-gradient` de 900px, `accent-hover` a 8% de alpha en el pico y caída casi gaussiana hasta 0. El difuminado sale del propio gradiente, no de `filter: blur` (costoso en un elemento de ese tamaño). La posición se interpola con easing exponencial independiente del frame-rate (~250ms de retraso); solo cambia `transform`, y el loop de `requestAnimationFrame` se detiene cuando la luz alcanza al cursor (**0 rAF en reposo**, medido). Aparece *en* el cursor la primera vez (sin volar desde una esquina), hace fade al salir de la ventana. No se renderiza (ni escucha eventos) sin `(hover: hover) and (pointer: fine)` ni con `prefers-reduced-motion: reduce`, y reacciona si esa preferencia cambia en vivo; ignora `pointerType !== 'mouse'`. Medido en píxeles sobre el fondo real: pico `rgb(12,10,9)` → `rgb(26,16,13)` (Δ≈+14 en rojo), Δ≈+3 a 300px del centro, 0 a 450px. Contraste AA verificado aun en el peor caso (texto sobre el pico): `secondary/80` 4.92:1, `accent-hover` sobre fila en hover 4.60:1. **Los valores para afinar están al inicio de ese archivo** (`SIZE`, `EASE`) y en el gradiente al final (alpha pico 8%). Nota de identidad: es una excepción explícita y acotada a "sin gradients" (no es un gradiente decorativo del diseño sino una capa dinámica de luz); anotado también en `CLAUDE.md`.

**4. Cambio de idioma.** Causa medida: sin hash, Nuxt hace scroll al tope (su default); con hash, el link ES/EN heredaba el de la URL (tras usar cualquier link de la nav, `switchLocalePath` devuelve `/en#contacto`) y Nuxt saltaba a esa sección aunque hubieras subido — de ahí "me manda al final" (Contacto es lo último). Arreglo, sin reemplazar el `scrollBehavior` de Nuxt (que se llevaría su manejo de anchors): `definePageMeta({ scrollToTop: false })` en `pages/index.vue` (única navegación entre rutas de esta página = cambio de idioma; los anchors internos siguen por otra rama y no se afectan), y el link ES/EN descarta el hash. Además `useAccordion(key)` ahora guarda su estado en `useState` — sin eso, la fila abierta se cerraba al remontar la página en el otro locale y el layout cambiaba de altura (hasta ~500px) bajo los pies del lector. Resultado medido en 11 escenarios (ES→EN y EN→ES, desde inicio/about/proyectos/experiencia/stack, con hash previo, con fila abierta): misma sección y mismo offset dentro de ±1px (el `scrollY` cambia ~32px porque el texto EN es más corto, y el navegador lo compensa), URL sin hash, y solo termina al final si ya estabas al final.

**Verificado** (Chrome headless real, en dev **y** en el build de producción; la diferencia importa porque el CSS de dev se inyecta después de hidratar): 8 zonas de click × 2 secciones con el hover activo, "VER DETALLES +" y su ícono, Enter/Space, link del cuerpo expandido sin disparar el accordion; scroll ↓ / ↑ / re-entrada con muestreo de opacity (0 → .65 → .93 → 1 en cada pasada); 0 parpadeos en los bordes superior e inferior; luz con movimiento lento (retraso 60–80px a ~500px/s) y con saltos rápidos (alcanza el destino); táctil (0 elementos `.cursor-glow`, sin overflow horizontal, tap en toda la fila abre); `prefers-reduced-motion` (sin luz, nada oculto por reveal, accordion sin transición, y se activa/desactiva en vivo). Lint, typecheck y build con código 0. Build 2.92 MB / 750 kB gzip (antes 2.92 / 748).

**No verificado (necesita tus ojos):** si el naranja te parece bien de intensidad en tu monitor (el 8% se midió, la percepción depende del panel — está a un número de distancia de subirlo o bajarlo), y la sensación real del retraso con un mouse físico. Lighthouse sigue sin re-medirse desde la iteración anterior.

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

## React en el Stack (2026-09-28)

**Estado:** ✅ resuelto. Antes React aparecía al mismo nivel que Vue/NestJS, en tensión con el gap conocido (solo fundamentos; el CV dice "React (fundamentos)"). Ahora sigue listado pero con la etiqueta **"FUNDAMENTOS" / "FUNDAMENTALS"** y pasó al final de Frontend (Vue.js, Angular, TypeScript, React).

**Ajuste posterior (mismo día): la etiqueta va debajo y del ancho de "ícono + nombre".** Texto de 9px (mono, mayúsculas, `text-secondary/80`, contraste AA) en una segunda línea bajo el ícono y el nombre, con las letras repartidas para ocupar exactamente ese ancho (medido: fila 68.9px = etiqueta 68.9px = texto 68.9px, en ES, EN y móvil). Cómo funciona (`TheStack.vue`): cada item es `inline-flex flex-col` con la fila ícono+nombre arriba y la etiqueta debajo; la etiqueta lleva `w-0 min-w-full` (toma el ancho de la fila sin poder ensancharla) y `text-align-last: justify` + `text-justify: inter-character` para repartir las letras. **Limitación conocida:** `text-justify` no lo soportan todos los navegadores (Safari, p. ej.); ahí la etiqueta queda alineada a la izquierda con su ancho natural, es decir, se degrada sin romper nada. Los demás items no cambian de aspecto (su contenido sigue arriba y centrado igual que antes). Datos: campo opcional `level?: 'fundamentals'` en `StackItem` (`app/data/stack.ts`) y clave `stack.levels.fundamentals` en ambos locales; sirve para marcar cualquier otra tecnología igual (si se necesitaran más niveles: agregar el valor al tipo y su clave i18n). Verificado en el build de producción en 1280px y 390px: sin overflow horizontal ni errores de consola.

## Fix: nav no marcaba Contacto (2026-09-28)

**Estado:** ✅ resuelto. **Síntoma:** al llegar al final de la página (o al hacer clic en "Contacto" del nav) el link de Contacto no quedaba marcado; se quedaba en Stack. **Causa medida** (`TheNavigation.vue`): el scrollspy marca la sección que cruza una franja fija al 40% de la altura de la ventana (`rootMargin: -40% 0 -55% 0`). Contacto es la última sección y es corta (~406px + footer de 130px), así que en ventanas altas el scroll máximo de la página no alcanza para subirla hasta esa franja y nunca "cruzaba". Medido: 1440×900 → Contacto en y=364 (franja 360–405) ✅; 1920×1080 → y=544 (franja 432–486) ❌; 1440×1440 → y=904 (franja 576–648) ❌. **Arreglo (estándar para scrollspy):** si la página está scrolleada hasta el fondo (`innerHeight + scrollY >= scrollHeight - 2`), la sección activa es la última. Detalles: el callback del observer respeta ese estado; como el observer solo dispara al cruzar la franja, hay un listener `scroll`/`resize` (pasivo, solo actúa al *entrar o salir* del fondo) que marca la última sección al llegar al fondo y, al salir, vuelve a la sección que está sobre la franja; se limpia en `onUnmounted`. Sin dependencias, sin cambios visuales. **Verificado** (Chrome headless, build de producción, 1440×900, 1440×1080, 1920×1080, 1440×1440, 1280×720 y 390×844 con menú móvil): clic en Contacto → Contacto marcado en los 6; subir 250px → vuelve a la sección correcta; barridos completos ↑ y ↓ sin errores de consola. **Comportamiento previo que se mantiene (no es bug):** al *bajar*, una sección se marca hasta ~5% de pantalla antes de cruzar la línea del 40%, porque la franja mide 40–45% de alto.

## About definitivo (2026-09-28)

**Estado:** ✅ aplicado en ES y EN. Texto escrito por Diego (4 párrafos: quién es y años de experiencia; backend/infra/frontend; cuatro años en remoto como referente técnico + interés en arquitectura; ubicación). Se aplicó **tal cual** en español y se redactó la versión en inglés para que suene natural (no literal, sin guiones largos): "go-to person on technical matters" para "referente técnico", "I also work across infrastructure" para "me muevo en infraestructura". Reemplaza al draft de `content.md` (y a la frase de aprendizaje continuo que se había agregado). Ubicación pública confirmada: **Santander, Colombia** (`content.md` la tenía como pendiente). Implementación: `about.body` (un solo párrafo) pasó a `about.paragraphs.p1..p4`; `TheAbout.vue` los renderiza como 4 `<p>` con reveal escalonado (160 + 80ms por párrafo) y las etiquetas de capacidades entran después (520ms). Título, etiquetas, layout y estilos de párrafo sin cambios. Verificado en producción en 1280px (ES y EN) y 390px: sin overflow ni errores de consola.

**Ajustes posteriores (mismo día, acordados con Diego):**
1. **Frase sobre IA (aplicada), sin nombrar Amadia.** Al final del párrafo 3: "Por mi cuenta construyo agentes con IA y automatizaciones, y uso IA a diario como parte de mi forma de desarrollar." / "On my own I build AI agents and automations, and I use AI daily as part of how I develop." Motivo: el hero, el Stack y las etiquetas presentan IA/automatización como parte central, y el texto de About era 100% backend. **Decisión de Diego: no nombrar Amadia en About** porque todavía no tiene su primer cliente; una primera propuesta ("…para negocios reales") se descartó por exagerar. La frase actual solo afirma lo verificable: proyectos propios con agentes/automatización y uso diario de Claude Code (está en el CV).
2. **Etiquetas de capacidades (aplicadas):** de "Análisis / Desarrollo / Automatización / IA / Aprendizaje continuo" a **"Backend / Arquitectura / Sistemas asíncronos / Cloud y DevOps / IA"** (EN: Backend / Architecture / Asynchronous systems / Cloud & DevOps / AI), para que coincidan con el texto. Claves i18n antiguas eliminadas (`analisis`, `desarrollo`, `automatizacion`, `aprendizaje`; nuevas: `backend`, `arquitectura`, `asincronos`, `cloud`; `ia` se mantiene). Verificado en producción (1280px ES/EN y 390px): sin overflow ni errores de consola.
3. **"Más de seis años" (sin cambiar, decisión de Diego):** las fechas de Experiencia empiezan en feb 2018 (~8 años a la fecha; ~7 desde el primer empleo no junior, jul 2019). "Más de seis" es verdadero y coincide con el CV, pero un reclutador que sume las fechas verá una diferencia. Recomendación: si se cambia, hacerlo en el About *y* en el CV a la vez ("más de siete"), aprovechando la próxima edición del documento original del CV.
4. **Amadia en Proyectos: quitada** (ver sección "Amadia fuera de Proyectos" abajo).

**Nota menor no tocada:** el `aria-label="Capacidades"` de la lista de etiquetas en `TheAbout.vue` está escrito en español fijo, también en la versión EN. Conviene pasarlo a una clave i18n cuando se vuelva a tocar ese componente.

## Amadia fuera de Proyectos (2026-09-28)

**Estado:** ✅ hecho, a pedido de Diego: Amadia Technology todavía no tiene su primer cliente, así que no se muestra ni en About (ver arriba) ni en Proyectos. Ahora la sección muestra solo **notify-engine**. Cambios: entrada `amadia` eliminada de `app/data/projects.ts`; claves `projects.amadia.*` eliminadas de ES y EN (sin claves muertas); ícono `lucide:sparkles` (solo lo usaba Amadia) quitado de `clientBundle.icons` en `nuxt.config.ts` (bundle: 44 → 43 íconos, 64.4KB); comentarios de `projects.ts` y `ProjectCard.vue` actualizados. **No se tocó** la lógica de `ProjectCard` que decide si una fila es expandible (sigue siendo genérica y se necesitará cuando vuelva un proyecto sin detalle). Amadia sigue viva en `00-mapa.md` y `docs/content.md`. Verificado en el build de producción (1280px ES y 390px EN): una sola fila, 0 apariciones de "Amadia" en el HTML, íconos renderizando, sin overflow ni errores de consola.

**Observación (no cambiada):** el título de la sección sigue siendo "Proyectos seleccionados" / "Selected projects" (plural) con un solo proyecto. Se dejó así por ahora porque es contenido ya aprobado; si se prefiere, pasarlo a singular o esperar a sumar un segundo proyecto.

## Revisión de datos: nueva responsabilidad, ícono AWS y proyecto energy-ai (2026-09-28)

**Estado:** ✅ completo. Diego editó `experience.ts` y `projects.ts` directamente (agregó una responsabilidad a Mia Advanced Systems, corrigió el slug del ícono de AWS ahí, y agregó el proyecto **energy-ai** completo). Pedido: revisar que ambos archivos estén en el formato correcto, sin tocar nada de código salvo lo estrictamente necesario para que lo nuevo funcione.

**1. Formato de los dos archivos (solo estilo, cero contenido tocado):** la edición había quedado indentada a 4 espacios en el cuerpo de los arrays (`export const experience = [...]` / `export const projects = [...]`); el resto del repo usa 2 espacios (las interfaces del mismo archivo seguían en 2, así que solo el bloque de datos se re-indentó). También una comilla escapada (`didn\'t` dentro de comillas simples) se cambió a comillas dobles, que es como el resto del archivo ya resuelve los apóstrofes en inglés. `git diff` de ambos archivos queda limpio (solo indentación + esa comilla), lint/typecheck/build sin errores.

**2. Bug real encontrado (no de formato) — verificado en navegador, no solo leído:** el nuevo `energy-ai` usa `nameKey: 'projects.energyAi.name'` y `kindKey: 'projects.energyAi.kind'`, pero esas claves no existían en `i18n/locales/es.json` ni `en.json`. Sin ellas, vue-i18n muestra la clave cruda como texto: la tarjeta salía con el título literal **"projects.energyAi.name"** y el tag **"PROJECTS.ENERGYAI.KIND"**. Capturado en captura de pantalla antes de arreglarlo. Diego eligió el tag "Prueba técnica" / "Technical test" (sin nombrar la empresa, para no exponer para quién fue la prueba). Agregado `projects.energyAi = { name: "energy-ai", kind: "Prueba técnica" / "Technical test" }` en ambos locales.

**3. Íconos que no renderizaban — también verificado visualmente, no solo por inspección de código:** `@nuxt/icon` corre con `provider: 'none'` y una lista fija en `nuxt.config.ts` (los nombres de ícono vienen de datos dinámicos, el escaneo estático no los ve — ver comentario ahí). Sin estar en esa lista, el ícono no aparece: ni error de build ni de consola, simplemente el hueco queda vacío. Capturado antes de arreglar: el "AWS" de Mia Advanced Systems sin ícono, y en energy-ai, Go/PrimeVue/ECharts/JWT/Swagger sin ícono (5 de 10 tecnologías). Agregados a `clientBundle.icons`: `simple-icons:amazonwebservices`, `simple-icons:go`, `simple-icons:primevue`, `simple-icons:apacheecharts`, `simple-icons:swagger`, `lucide:key-round`. Bundle: 44 → 50 íconos, 73.05KB. Reverificado con captura tras el fix: los 10/10 íconos de energy-ai y el de AWS en Mia ya renderizan, en ES y en EN.

**Detalle técnico del punto 3 (para no repetir la confusión):** el slug correcto de Simple Icons para AWS hoy es `amazonwebservices` — `amazonaws` **ya no existe** en la versión instalada de `@iconify-json/simple-icons` (se verificó contra el paquete). El cambio de Diego en `experience.ts` (Mia → `amazonwebservices`) fue la corrección correcta; lo que faltaba era sumarlo a la lista de `nuxt.config.ts`. **Arreglado justo después (mismo día):** `app/data/stack.ts` (AWS de la sección Stack) y la entrada "AWS SQS" de notify-engine en `projects.ts` también usaban el slug viejo `amazonaws`. Cambiados ambos a `amazonwebservices` — ya estaba en `clientBundle.icons` por el fix anterior, así que no hizo falta tocar `nuxt.config.ts` de nuevo, solo quitar la entrada `simple-icons:amazonaws` (ya sin ninguna referencia en el código). Verificado con captura: AWS en Stack y AWS SQS en notify-engine renderizan. **Ya no queda ningún ícono roto de AWS en el sitio.**

**4. Repo de energy-ai:** el link "Ver código" (`github.com/soypiipe/energy-ai`) ya apuntaba a la URL correcta; solo era un problema de visibilidad del repo (estaba privado — ver `00-mapa.md`). Diego lo puso en público, así que no se tocó nada en `projects.ts` para esto. **Pendiente aparte, en otro repo:** actualizar la nota "repo privado" de `00-mapa.md` (fuera del repo del portfolio, no se tocó aquí).

## Fase 8 — Content lock
**Estado:** casi cerrada — experiencia ✅, proyectos a mostrar ✅ (solo notify-engine), contacto ✅ (Email/WhatsApp/LinkedIn/GitHub), CV ✅ (PDFs ES/EN, según idioma), dominio ✅ (provisional), About ✅ (2026-09-28). Falta solo la **foto final del hero**; y, para abrir a buscadores, que el dominio sea el definitivo.

---

## Pendientes abiertos

**Bloqueados por contenido tuyo (Fase 8):**
- Foto final del hero (hoy es placeholder de IA, marcado en UI). Al tenerla: quitar el rótulo "PLACEHOLDER // POR REEMPLAZAR", agregar `ogImage` y `image` al JSON-LD `Person`, y prepararla con la receta de la sección de rendimiento (2 anchos, WebP/AVIF, `srcset`).
- Dominio definitivo: cuando se decida, definir `NUXT_PUBLIC_SITE_URL` (build + runtime). **Abrir `robots.txt` al crawling** solo cuando la foto final esté puesta *y* el dominio sea el definitivo (ver arriba). La bio ya está.
- Amadia (fuera de Proyectos desde 2026-09-28, aún sin primer cliente): cuando tenga primer cliente o resultados que se puedan afirmar, volver a agregarla en `app/data/projects.ts` (el historial de git conserva la entrada, con sus textos en `projects.amadia.*` de i18n) y la fila pasa a ser compacta/no expandible hasta que tenga contexto, resultado y links. Si vuelve `lucide:sparkles`, agregarlo otra vez a `clientBundle.icons`.
- Miattend sigue fuera de Proyectos por decisión tuya (2026-09-21), pero sigue real en `content.md`.

**Técnicos (no bloqueados, menor prioridad):**
- Verificación manual pendiente en navegador/dispositivo real: responsive visual fino, navegación por teclado completa, y que el CV se descargue bien en móvil (iOS Safari abre PDFs en visor en vez de descargar, comportamiento normal del navegador).
- Si cambia el CV: reemplazar los PDFs en `public/cv/` conservando los nombres (y, si se recolorea de nuevo, el rust es `#B9502C`).
- Si se agregan tecnologías nuevas con ícono, sumarlas a `clientBundle.icons` en `nuxt.config.ts` o no van a renderizar (pasó dos veces ya — ver la sección de arriba).
- Si se agrega un idioma: una línea en `cvHref` (`app/data/contact.ts`) + su PDF en `public/cv/`.
- Rendimiento: no queda nada de bajo riesgo por mejorar (ver sección 4). Compresión del HTML de SSR (~145KB → ~39KB) depende del proxy/CDN del deploy: verificar que `gzip`/`br` esté activo ahí.

**Siguiente paso:** Fase 8 depende de ti (foto final; opcionalmente las 3 observaciones de contenido de la sección About). Del lado técnico no queda nada obligatorio.
