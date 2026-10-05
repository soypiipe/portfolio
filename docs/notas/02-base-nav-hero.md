# Notas — Fase 2 — Base, navegación y hero

> Texto movido **sin cambios** desde `docs/progress.md` en la migración a la
> metodología (2026-10-05). Es un registro histórico: las casillas y los
> "pendientes" que aparecen abajo son de esa fecha; el estado vigente está
> en `PLAN.md`.

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
