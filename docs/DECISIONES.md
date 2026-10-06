# Decisiones — portfolio

Decisiones con consecuencias: qué se decidió, qué se descartó y por qué. Si
una decisión se revierte, se agrega una entrada nueva; no se borra la vieja.

Reconstruido el 2026-10-05 al migrar a la metodología, a partir del antiguo
`progress.md` (hoy repartido en `notas/`), `ux-ui.md` y el código. Donde la razón no está escrita en
ningún lado, dice `[RAZÓN NO DOCUMENTADA]`; no se inventó.

---

## 001 — Stack: Nuxt 4 + Vue + TypeScript + Tailwind + @nuxtjs/i18n

**Decisión:** Nuxt 4 con Vue 3, TypeScript, Tailwind (`@nuxtjs/tailwindcss`) e
i18n (`@nuxtjs/i18n`). Una idea anterior de usar Astro quedó descartada
(`02-personal/CLAUDE.md` la menciona como obsoleta).
**Alternativas descartadas:** Astro.
**Razón:** el brief original pedía Nuxt y Vue. Por qué Nuxt frente a Astro u
otras opciones: [RAZÓN NO DOCUMENTADA].

## 002 — Paleta Charcoal + Rust

**Decisión:** fondo `#0C0A09`, acento `#B9502C`, tokens centralizados en
`tailwind.config.ts`.
**Alternativas descartadas:** Graphite + Teal (la recomendación inicial),
Neutral + Cobalt, Warm Technical.
**Razón:** al explorar el hero en Stitch, todo el sistema Graphite + Teal
tenía un sesgo verdoso, no solo el acento sino los neutros (`ux-ui.md` §3).

## 003 — i18n: español sin prefijo, inglés en `/en`, sin detección automática

**Decisión:** `strategy: 'prefix_except_default'` y
`detectBrowserLanguage: false`; el visitante cambia de idioma con el selector.
**Alternativas descartadas:** detección automática por `Accept-Language`.
**Razón:** la detección redirigía `/` a `/en` con un 302 a cualquier visitante
o crawler con `Accept-Language` en inglés (lo marcó Lighthouse, costaba
~610 ms) y contradecía que el español sea el idioma principal.

## 004 — Experiencia y Proyectos como accordion vertical

**Decisión:** accordion editorial vertical, un solo item abierto a la vez,
en lugar del timeline horizontal que pedía `ux-ui.md` §10.
**Alternativas descartadas:** timeline horizontal en desktop; varios items
abiertos a la vez.
**Razón:** los datos reales (responsabilidades, logros con métrica, stack
por rol) eran más densos que lo que el spec anticipaba, y en tarjetas
horizontales se volvían ilegibles. Un solo item abierto: en una lista de
tres, varios abiertos empujan el resto fuera de pantalla.

## 005 — Amadia y Miattend fuera de Proyectos

**Decisión:** la sección muestra solo notify-engine y energy-ai. Amadia
Technology no aparece ni en Proyectos ni en About.
**Razón (Amadia):** todavía no tiene su primer cliente y una frase que
sugiera lo contrario exageraría. Se vuelve a agregar cuando haya cliente o
resultados que se puedan afirmar. **Razón (Miattend):** [RAZÓN NO
DOCUMENTADA]; se quitó a pedido de Diego el 2026-09-21 y sigue siendo un
proyecto real.

## 006 — La imagen del hero es una ilustración, rotulada como tal

**Decisión:** ilustración pixel-art generada con IA como imagen definitiva,
en marco 1:1, con el rótulo "AI ILLUSTRATION" y sin filtro de grises. No va
en el campo `image` del JSON-LD `Person`.
**Alternativas descartadas:** la "fotografía cinemática" que describía el
`CLAUDE.md` original; una foto real.
**Razón:** Diego confirmó esta imagen como definitiva (2026-10-03). Rotularla
es honesto, y ponerla como "su imagen" en datos estructurados sería falso.

## 007 — `robots.txt` bloquea todo el crawling

**Decisión:** `Disallow: /` mientras el contenido no estaba cerrado y el
dominio no era el definitivo.
**Razón:** evitar indexar un sitio con bio en borrador y foto provisional, y
evitar posicionar un dominio que luego cambiaría. Las razones de contenido ya
no aplican. La decisión vigente es la 008.

## 008 — Abrir la indexación en `pages.dev` (decidida y ejecutada el 2026-10-05)

**Fecha:** 2026-10-05.
**Decisión:** abrir el sitio a buscadores en `diegoamado.pages.dev` con el
canonical actual, y migrar después al dominio definitivo con un 301 y el
"Cambio de dirección" de Search Console.
**Alternativas descartadas:** esperar a comprar `diegoamado.dev` y abrir
recién entonces.
**Razón:** visibilidad inmediata mientras el dominio sigue sin comprarse
(depende del presupuesto), a cambio de una migración posterior. Los
argumentos de las dos opciones están en `notas/09-lanzamiento.md`; Diego no
agregó otra razón.
**Condición previa:** verificar que Cloudflare Pages no envíe
`X-Robots-Tag: noindex` en `pages.dev`; si lo envía, el `robots.txt` solo no
alcanza. **Verificada el 2026-10-05:** ninguna ruta (`/`, `/en`,
`/robots.txt`, `/sitemap.xml`, el CV) devuelve esa cabecera y el HTML no trae
`meta robots`; solo la página 404 es `noindex`, a propósito.

## 009 — Fondo animado de 48 s y excepción a "sin gradientes"

**Decisión:** el grid del fondo se desliza una celda en 48 s (el spec decía
70 s), y `CursorGlow.vue` queda como excepción explícita a "sin gradientes".
**Razón:** el movimiento se hizo más perceptible a propósito en la iteración
de legibilidad y motion; la luz que sigue al cursor es una capa dinámica de
iluminación, no un gradiente decorativo del diseño. El `linear-gradient` que
dibuja las líneas del grid no está cubierto por esa excepción escrita:
tarea en la Fase 10.

## 010 — CV con fondo blanco, color rust y un PDF por idioma

**Decisión:** dos PDF en `public/cv/`, recoloreados al rust `#B9502C` (solo
ese color; el texto no se tocó), con fondo blanco.
**Alternativas descartadas:** un CV oscuro, a juego con el sitio.
**Razón:** un CV se imprime y lo leen ATS y reclutadores; uno oscuro sería
peor práctica. El PDF dice "Diego Felipe Ariza Amado": ver la tarea de
decisión del nombre en la Fase 9.

## 011 — i18n "solo runtime" probado y revertido

**Decisión:** no usar `i18n.bundle: { runtimeOnly: true, dropMessageCompiler: true }`.
**Razón:** ahorraba ~16 KB de JS, pero la hidratación fallaba
(`unhandled node type: 0`) y la página quedaba en blanco en el navegador.
No reintentar sin un test de hidratación en navegador real.

## 012 — Íconos con lista explícita en `clientBundle.icons`

**Decisión:** `@nuxt/icon` con `provider: 'none'`, `serverBundle: false` y
la lista de íconos escrita en `nuxt.config.ts`.
**Razón:** los nombres de ícono vienen de datos dinámicos, así que el
escaneo estático no los ve y empaquetaba las colecciones completas (~5 MB).
**Consecuencia:** un ícono nuevo que no se sume a la lista no se muestra y no
da error.

## 013 — About sin nombrar Amadia

**Decisión:** el About menciona proyectos propios con agentes y
automatización, y el uso diario de IA, sin nombrar Amadia.
**Razón:** Amadia no tiene primer cliente (ver 005); una primera propuesta
("…para negocios reales") se descartó por exagerar.

## 014 — Cloudflare Pages en plan gratuito

**Decisión:** desplegar en Cloudflare Pages, conectado al repo, con
despliegue por push a `main`.
**Razón:** restricción de costo de Diego (sin empleo por ahora): el único
costo recurrente previsto es el dominio.
**Nota:** contradice el `architecture.md` original (ya eliminado), que decía
no acoplarse a un proveedor todavía.

## 015 — Sin librería de motion

**Decisión:** todo el motion es CSS, `transform`/`opacity` e
IntersectionObserver; no hay librería de animación.
**Contexto:** el `CLAUDE.md` original pedía "a lightweight motion library".
**Razón:** [RAZÓN NO DOCUMENTADA]. El mismo `CLAUDE.md` decía también
preferir CSS y evitar dependencias innecesarias, pero no queda escrito que la
ausencia de la librería fuera una decisión.

## 016 — El About dice "más de seis años", sin año de inicio

**Fecha:** 2026-10-05.
**Decisión:** el About conserva "más de seis años" (ES) y "more than six
years" (EN). El detalle cronológico lo da la sección Experiencia, donde las
fechas se ven. No se usa "desde 2018" ni ninguna cifra con año de inicio.
**Alternativas descartadas:** "desde 2018"; subir la cifra ("más de siete").
**Razón:** las fechas ya viven en Experiencia, así que el About no necesita
repetirlas. El `CLAUDE.md` de la raíz del segundo cerebro se alineó
("más de 6 años de experiencia", antes "en producción desde 2017") para que
no contradiga al sitio.
