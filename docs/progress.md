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
**Estado:** pendiente

## Fase 4 — Experiencia + Contacto
**Estado:** pendiente

## Fase 5 — Motion
**Estado:** pendiente

## Fase 6 — Bilingüe
**Estado:** pendiente

## Fase 7 — Calidad (responsive, a11y, performance, SEO)
**Estado:** pendiente

## Fase 8 — Content lock
**Estado:** pendiente — bloqueada hasta tener CV final, experiencia exacta, proyectos confirmados, contactos reales y foto final.

---

## Siguiente paso
Fase 3 — Proyectos: `ProjectCard` reusable + datos tipados, con solo Miattend y Amadia Technology (el tercer proyecto está "TO BE CONFIRMED" en `content.md` — no inventar uno). Insertar en `index.vue` entre About y Stack.
