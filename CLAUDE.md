# Diego Amado — Portfolio

Sitio personal de Diego Amado, Systems Engineer / Software Engineer: su carta
de presentación profesional, en español (principal) e inglés (completo).
Una sola página que debe sentirse como un producto diseñado por un
desarrollador, no como una plantilla generada por IA.

## Dónde está cada cosa

- Esta carpeta es el repositorio del proyecto, montado como submódulo del
  segundo cerebro.
- El plan, las notas y las decisiones están en `docs/`, versionados junto
  al código.
- Las reglas de trabajo comunes están en `METODOLOGIA.md`, en la raíz del
  segundo cerebro (dos niveles arriba). Este archivo solo añade lo
  específico de este proyecto.
- El spec de diseño original está en `docs/ux-ui.md`; donde el sitio se
  desvió de él, manda `docs/DECISIONES.md`.

Antes de tocar código: leer `docs/PLAN.md` para saber en qué fase y tarea
vamos, y la nota de la fase actual en `docs/notas/`.

## Stack

Nuxt 4, Vue 3, TypeScript, Tailwind (`@nuxtjs/tailwindcss`), `@nuxtjs/i18n`,
`@nuxt/icon`, `@nuxt/fonts`. Desplegado en Cloudflare Pages (plan gratuito,
deploy con cada push a `main`). Sin backend, sin librería de motion.

Estructura: `app/` (código de Nuxt 4), `app/data/*.ts` (contenido tipado:
proyectos, experiencia, stack, contacto, navegación), `i18n/locales/`
(es.json y en.json), `server/routes/` (sitemap.xml y robots.txt dinámicos),
`public/` (imágenes, CV en PDF).

## Cómo correrlo

```bash
npm install
npm run dev          # servidor de desarrollo
npm run build        # build de producción
npm run lint
npx nuxi typecheck   # hasta que exista el script (Fase 10 del plan)
```

`NUXT_PUBLIC_SITE_URL` define la URL absoluta de canonical, `hreflang`,
Open Graph, sitemap y robots. Debe estar definida **en el build y en
runtime**. Hoy vale `https://diegoamado.pages.dev` en Cloudflare; el
`https://diegoamado.dev` de `nuxt.config.ts` es solo el valor de respaldo.

## Principios de este proyecto

Los generales están en `METODOLOGIA.md`. Lo propio de este código:

- **Dirección visual aprobada:** oscuro, editorial y técnico. Paleta
  Charcoal + Rust con tokens centralizados en `tailwind.config.ts` (nunca
  colores sueltos en los componentes). Inter + JetBrains Mono. Mucho espacio
  negativo, motion sutil.
- **Marca:** nombre **Diego Amado**; posicionamiento "Software Engineer · AI
  · Automation"; monograma DA pequeño arriba a la izquierda. La imagen del
  hero es una ilustración y está rotulada así; el perro es un detalle
  personal, nunca el tema del sitio.
- **Colores planos, sin gradientes**, con dos excepciones: `CursorGlow.vue`
  (luz ambiental muy tenue que sigue al cursor) y las líneas del grid de
  `TheBackground.vue` (1 px). La segunda aún no está escrita como excepción
  formal: tarea en la Fase 10.
- **Motion:** una curva (`--ease-soft`) y tres duraciones (250 ms hover,
  450 ms expandir, 800 ms entradas), solo `transform` y `opacity`. Todo
  respeta `prefers-reduced-motion`. Sin animación infinita decorativa más
  allá del fondo.
- **Orden de secciones** (igual al de la navegación): Hero, About,
  Proyectos, Experiencia, Stack, Contacto, Footer. La página es concisa a
  propósito.
- **Contenido separado de la presentación:** proyectos, experiencia, stack,
  contacto y navegación salen de datos tipados en `app/data/`. Los textos
  traducibles, de `i18n/locales/`. En inglés no se traduce literal si hay una
  expresión profesional más natural.
- **Íconos:** los nombres vienen de datos dinámicos, así que todo ícono nuevo
  hay que sumarlo a `clientBundle.icons` en `nuxt.config.ts`; si no, no se
  muestra y no da error.
- **Solo lo necesario:** ninguna dependencia, abstracción, componente o
  configuración "por si acaso". Si un `<button>` basta, no hace falta un
  `Button.vue`.
- **SEO desde el día uno:** un solo `h1`, jerarquía de encabezados, `alt`
  con sentido y `useSeoMeta`/`useHead` reales en cada vista.
- **Seguro por defecto:** sin secretos en el repo, sin `v-html` sobre
  contenido no confiable, validar todo lo que toque un formulario o datos
  externos.
- **Flujo de cada cambio:** correr lint, typecheck y build y arreglar lo que
  salga antes de seguir; dejar el servidor de desarrollo corriendo para
  revisar en vivo; reportar qué cambió y qué placeholders siguen sin
  resolver.
- **Commits sin atribución de IA** en el autor ni en el mensaje.

## Lo que NO se hace aquí

- No se muestran Amadia Technology ni Miattend en Proyectos o About hasta
  que haya primer cliente o resultados que se puedan afirmar (DECISIONES 005
  y 013).
- No se inventa contenido: experiencia, proyectos, métricas, clientes,
  fotos ni datos de contacto. Lo que falta se marca como placeholder.
- No se toca `Disallow: /` de `server/routes/robots.txt.ts` fuera de la
  tarea de indexación de la Fase 9 (DECISIONES 008).
- No se pone la ilustración del hero en el campo `image` del JSON-LD
  `Person`: no es una foto real.
- No se usa i18n "solo runtime" (`runtimeOnly`/`dropMessageCompiler`): rompe
  la hidratación. Solo se reintenta con un test de hidratación en navegador
  real (DECISIONES 011).
- No se agregan gradientes decorativos, muros de logos, glassmorphism, objetos
  3D ni animaciones que bloqueen la lectura o muevan el layout.
- No se agrega una librería de motion, un `Button.vue` ni capas de
  abstracción mientras CSS y los componentes actuales alcancen.
- No se indexa ni se redirige entre dominios sin pasar por las tareas de la
  Fase 9.

## Ciclo de trabajo

1. Leer `docs/PLAN.md`, marcar la tarea `[~]`.
2. Implementar solo esa tarea.
3. Escribir en `docs/notas/<fase>.md` qué se hizo y por qué.
4. Tests y commit — un commit por tarea, con código y documentación juntos.
5. Regenerar `docs/STATUS.yaml`.

Si aparece trabajo no previsto, se agrega al plan como tarea aparte. No se
mezcla con la tarea en curso.
