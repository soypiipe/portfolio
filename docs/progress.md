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
**Estado:** pendiente (parcialmente ya cubierto) — como el sitio se viene construyendo bilingüe desde la Fase 1 (principio de "no dejar SEO/i18n para después"), todo el contenido ES/EN y el selector ya existen. Lo que falta específicamente de esta fase: `hreflang`/`og:locale` alternates para SEO — eso se hace junto con el resto de metadata en Fase 7, no por separado.

## Fase 7 — Calidad (responsive, a11y, performance, SEO)
**Estado:** pendiente

## Fase 8 — Content lock
**Estado:** pendiente — experiencia exacta ✅, y proyectos a mostrar ✅ (solo notify-engine + Amadia, decidido 2026-09-21). Sigue bloqueada por: bio de About definitiva, datos de contacto reales (Email/WhatsApp/LinkedIn/GitHub), CV en PDF, foto final del hero.

---

## Siguiente paso
Fase 7 — Calidad (responsive, a11y, performance, SEO). Fase 6 (bilingüe) ya está prácticamente cubierta salvo `hreflang`/`og:locale` alternates, que se hacen junto con el resto de metadata acá mismo — no como fase separada. Cubre: revisión responsive real (mobile→desktop), navegación por teclado, contraste, `useSeoMeta`/OG completos, sitemap, robots.txt (hoy bloquea todo el crawling, hay que decidir si cambia), sin errores de consola, imágenes optimizadas, sin layout shift.
