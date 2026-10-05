# Notas — Fase 3 — About y Stack

> Texto movido **sin cambios** desde `docs/progress.md` en la migración a la
> metodología (2026-10-05). Es un registro histórico: las casillas y los
> "pendientes" que aparecen abajo son de esa fecha; el estado vigente está
> en `PLAN.md`.

---

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

## React en el Stack (2026-09-28)

**Estado:** ✅ resuelto. Antes React aparecía al mismo nivel que Vue/NestJS, en tensión con el gap conocido (solo fundamentos; el CV dice "React (fundamentos)"). Ahora sigue listado pero con la etiqueta **"FUNDAMENTOS" / "FUNDAMENTALS"** y pasó al final de Frontend (Vue.js, Angular, TypeScript, React).

**Ajuste posterior (mismo día): la etiqueta va debajo y del ancho de "ícono + nombre".** Texto de 9px (mono, mayúsculas, `text-secondary/80`, contraste AA) en una segunda línea bajo el ícono y el nombre, con las letras repartidas para ocupar exactamente ese ancho (medido: fila 68.9px = etiqueta 68.9px = texto 68.9px, en ES, EN y móvil). Cómo funciona (`TheStack.vue`): cada item es `inline-flex flex-col` con la fila ícono+nombre arriba y la etiqueta debajo; la etiqueta lleva `w-0 min-w-full` (toma el ancho de la fila sin poder ensancharla) y `text-align-last: justify` + `text-justify: inter-character` para repartir las letras. **Limitación conocida:** `text-justify` no lo soportan todos los navegadores (Safari, p. ej.); ahí la etiqueta queda alineada a la izquierda con su ancho natural, es decir, se degrada sin romper nada. Los demás items no cambian de aspecto (su contenido sigue arriba y centrado igual que antes). Datos: campo opcional `level?: 'fundamentals'` en `StackItem` (`app/data/stack.ts`) y clave `stack.levels.fundamentals` en ambos locales; sirve para marcar cualquier otra tecnología igual (si se necesitaran más niveles: agregar el valor al tipo y su clave i18n). Verificado en el build de producción en 1280px y 390px: sin overflow horizontal ni errores de consola.
