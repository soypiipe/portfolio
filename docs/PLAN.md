# Plan — portfolio

Fuente de verdad del avance. `STATUS.yaml` se genera desde este archivo;
no se edita a mano.

Estados de tarea: `[ ]` pendiente · `[~]` en progreso · `[x]` completada
Estados de fase: no_iniciada · en_progreso · completada

Reconstruido el 2026-10-05 al migrar el proyecto a la metodología. Las
fases 0 a 8 describen lo que ya existía; solo están marcadas `[x]` las
tareas que el código demuestra. El detalle de cada fase está en
`notas/<NN>-*.md` (mismo número que la fase, salvo `00` y `01` que son
contexto y diseño).

Nota de numeración: la fase 6 (motion) va antes de la 7 (bilingüe, SEO y
accesibilidad) porque así ocurrió. El motion tuvo además dos rondas de
iteración posteriores, que quedan dentro de la fase 6.

---

## Fase 0 — Contexto
**Estado:** completada

- [x] Describir el problema y a quién le sirve (carta de presentación profesional, bilingüe)
- [x] Inventariar el contenido a mostrar (hecho en un `content.md` ya eliminado; hoy vive en `app/data/` e `i18n/`)
- [x] Definir alcance: página única y concisa, sin secciones de relleno
- [x] Listar restricciones: costo mínimo (solo el dominio), no inventar contenido, ES principal y EN completo

---

## Fase 1 — Diseño
**Estado:** completada

- [x] Dirección visual y paleta aprobadas (Charcoal + Rust, explorado en Stitch)
- [x] Tipografía (Inter + JetBrains Mono) y lenguaje de motion (una curva, tres duraciones)
- [x] Estructura de la página y orden de secciones
- [x] Modelo de contenido tipado (`app/data/*.ts`) y estructura de i18n (`i18n/locales/`)
- [x] Decisiones técnicas registradas en `DECISIONES.md`

---

## Fase 2 — Construcción: base, navegación y hero
**Estado:** completada

- [x] Nuxt 4 + TypeScript + Tailwind + lint + i18n configurados, con tokens de color centralizados
- [x] Navegación desktop y móvil con selector ES/EN
- [x] Hero: tipografía, CTAs, indicador de disponibilidad e imagen definitiva en AVIF/WebP/JPEG
- [x] Grid de fondo y limpieza de rastros de marca Nuxt (favicon propio, devtools apagado)

---

## Fase 3 — Construcción: About y Stack
**Estado:** completada

- [x] About con 4 párrafos y etiquetas de capacidades, en ES y EN
- [x] Stack agrupado por categoría con íconos monocromos, sin muro de logos
- [x] React marcado como "fundamentos" (campo `level` en `app/data/stack.ts`)
- [x] Lista explícita de íconos en `nuxt.config.ts` (`clientBundle.icons`)

---

## Fase 4 — Construcción: Proyectos
**Estado:** completada

- [x] Datos tipados en `app/data/projects.ts` y `ProjectCard.vue` como accordion
- [x] notify-engine con datos reales
- [x] energy-ai con datos reales
- [x] Amadia y Miattend fuera de la sección (ver `DECISIONES.md`)

---

## Fase 5 — Construcción: Experiencia, contacto y footer
**Estado:** completada

- [x] Experiencia con el historial real (3 empleos) como accordion editorial
- [x] Contacto con email, WhatsApp, LinkedIn, GitHub y CV
- [x] Footer en el layout, con la navegación reutilizada de `navigation.ts`
- [x] Orden de secciones coincide con el de la navegación

---

## Fase 6 — Construcción: Motion y fondo
**Estado:** completada

- [x] Entrada escalonada del hero y reveal re-entrante al hacer scroll (`v-reveal`)
- [x] Hover, scrollspy de la navegación (con corrección para llegar a Contacto)
- [x] Fondo con vida (`TheBackground.vue`) y luz ambiental (`CursorGlow.vue`)
- [x] Cambio de idioma sin salto de scroll
- [x] `prefers-reduced-motion` respetado en todas las animaciones

---

## Fase 7 — Construcción: Bilingüe, SEO y accesibilidad base
**Estado:** completada

- [x] Contenido completo en ES y EN, con `hreflang` y selector accesible
- [x] Metadata: title, description, canonical, Open Graph y Twitter Card
- [x] JSON-LD `Person`, sitemap y robots dinámicos desde `siteUrl`
- [x] Foco visible, contraste calculado y `aria-label` traducidos
- [x] Página 404/500 propia y bilingüe (`app/error.vue`)
- [x] Fuentes autoalojadas y compresión de assets estáticos

---

## Fase 8 — Contenido definitivo
**Estado:** completada

- [x] Historial de experiencia y proyectos a mostrar confirmados
- [x] Canales de contacto reales en `app/data/contact.ts`
- [x] CV en PDF, uno por idioma, servido según el idioma del sitio
- [x] Texto de About definitivo en ES y EN
- [x] Imagen definitiva del hero (ilustración rotulada como tal)

---

## Fase 9 — Lanzamiento
**Estado:** en_progreso

Sitio publicado en `https://diegoamado.pages.dev` (Cloudflare Pages, plan
gratuito, despliegue con cada push a `main`). Indexación decidida: abrir en
`pages.dev` (ver `DECISIONES.md`, 008). Argumentos de las decisiones
abiertas en `notas/09-lanzamiento.md`.

- [x] Verificar si Cloudflare Pages agrega `X-Robots-Tag: noindex` en `diegoamado.pages.dev` (con `curl -I`); si lo hace, el `robots.txt` no alcanza
- [x] Abrir indexación en `pages.dev`: `Disallow:` vacío en `server/routes/robots.txt.ts`, con el canonical actual (DECISIONES 008)
- [ ] Registrar `diegoamado.pages.dev` en Google Search Console y enviar el sitemap
- [ ] Decidir el nombre en el CV, LinkedIn y el sitio; registrar en `DECISIONES.md`
- [x] Hosting en Cloudflare Pages con despliegue por push a `main`
- [x] Verificación en `pages.dev`: rutas, sitemap, robots, CV, 404 propio y Lighthouse
- [x] `og.jpg` con `og:image` y `twitter:image`
- [ ] Verificar que `diegoamado.dev` esté libre (plan B: `.com` o `.co`)
- [ ] Comprar el dominio al costo, sin extras de hosting ni correo
- [ ] Conectar el dominio, definir `NUXT_PUBLIC_SITE_URL` (build y runtime) y la redirección `www` a raíz
- [ ] Migrar de `pages.dev` al dominio: 301 y "Cambio de dirección" en Search Console
- [ ] Repetir la verificación y Lighthouse en el dominio definitivo
- [ ] Opcional: correo del dominio con Cloudflare Email Routing

---

## Fase 10 — Endurecimiento
**Estado:** no_iniciada

- [ ] Inventario de los cuatro estados por vista (cargando, vacío, error, con datos): cuáles aplican y cuáles no
- [ ] Implementar los estados que apliquen y documentar los que no
- [ ] Medir contraste WCAG AA con herramienta sobre el sitio construido (etiqueta de 9 px, metadata de 11 px, texto sobre el pico de `CursorGlow`)
- [ ] Navegación por teclado completa: accordions, menú móvil, cambio de idioma, orden de foco
- [ ] Agregar skip-link al contenido principal
- [ ] Probar en un dispositivo móvil real, incluida la descarga del CV en iOS
- [ ] Definir y agregar pruebas mínimas: smoke test de hidratación (ES y EN) en navegador real, y las verificaciones de íconos y claves i18n que hoy se hacen con scripts sueltos
- [ ] Corregir el rango "sept de 2026 — sept de 2026" de energy-ai en `app/data/projects.ts`
- [ ] Mover `eslint` y `@nuxt/eslint` a `devDependencies` y verificar que el build de Cloudflare siga pasando
- [ ] Agregar el script `typecheck` (`nuxt typecheck`) a `package.json`
- [ ] Cubrir con una excepción escrita el `linear-gradient` del grid de `TheBackground.vue` (hoy solo `CursorGlow` está exceptuado)

---

## Fase 11 — Auditoría independiente
**Estado:** no_iniciada

Ejecutada por el agente `auditor`, que no escribió el código. Los hallazgos
vuelven a este plan como tareas nuevas.

- [ ] Auditoría de UI y accesibilidad: cuatro estados, contraste, teclado, skip-link, celular y consistencia entre pantallas
- [ ] Auditoría de seguridad: cabeceras, enlaces externos, datos públicos en el HTML, dependencias
- [ ] Auditoría de arquitectura: contradicciones entre `CLAUDE.md` y el código, abstracciones sin segunda implementación
- [ ] Incorporar los hallazgos al plan y resolverlos en pasos aparte

---

## Bloqueos

Cosas que impiden avanzar y no dependen de mí. Si está vacío, se deja vacío.

- La compra del dominio depende del presupuesto
