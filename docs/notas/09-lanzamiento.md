# Notas — Fase 9: Lanzamiento

## Decisiones de Diego (2026-10-05)

Las tareas están en `PLAN.md`, Fase 9. Aquí quedan los argumentos.

### Indexación — decidida: abrir en `pages.dev`

Hoy el sitio sirve su sitemap, `hreflang` y canonical con `diegoamado.pages.dev` (la variable `NUXT_PUBLIC_SITE_URL` está definida en Cloudflare; el `diegoamado.dev` de `nuxt.config.ts` es solo el valor de respaldo) y `robots.txt` responde `Disallow: /`.

- **Abrir ahora** (elegida). A favor: se te encuentra buscando tu nombre mientras buscas empleo, y no cuesta nada. En contra: al pasar a `diegoamado.dev` hay que redirigir con un 301 desde `pages.dev` y usar el "Cambio de dirección" de Search Console; si ambos dominios quedan vivos, hay contenido duplicado. Sin verificar: si Cloudflare Pages permite ese 301 hacia un dominio externo y si Search Console acepta el cambio de dirección desde `pages.dev`.
- **Esperar al dominio definitivo** (descartada). A favor: una sola identidad desde el primer día, sin duplicados ni migración. En contra: sin visibilidad en buscadores hasta comprar el dominio, y la compra depende del presupuesto, así que el plazo es abierto.
- Detalle común: un `Disallow: /` no impide que Google muestre la URL sin descripción si alguien la enlaza.
- **Condición previa:** comprobar con `curl -I` que Cloudflare Pages no agrega `X-Robots-Tag: noindex` en `pages.dev`. Si lo hace, el `robots.txt` no alcanza.
- **Resultado (2026-10-05):** no la agrega. Se revisaron `/`, `/en`, `/robots.txt`, `/sitemap.xml` y el PDF del CV: 0 cabeceras `X-Robots-Tag`, y el HTML de `/` y `/en` no tiene `meta robots`. Solo `error.vue` (la 404) es `noindex`, a propósito. Con eso se abrió el `robots.txt` (`Disallow:` vacío) ese mismo día.
- **Archivo de verificación de Search Console (2026-10-06).** Se agregó `public/google8eb9aa2851eef5af.html` con la línea exacta que pide Google (53 bytes, sin HTML alrededor). Primer intento: la URL respondía **308** a `/google8eb9aa2851eef5af`, porque Cloudflare Pages quita la extensión `.html` de los archivos estáticos (no es Nuxt). Para que Google reciba un 200 en la URL exacta se agregó `public/_redirects` con un rewrite: `/google8eb9aa2851eef5af.html /google8eb9aa2851eef5af 200`. Nitro conserva ese archivo en el build de Cloudflare Pages (`dist/_redirects`). Verificado en producción: 200, cuerpo idéntico a la línea esperada, sin `Location`. Cualquier otro `.html` estático que se agregue a `public/` tendrá el mismo 308 y necesitará su propia regla.
- **Search Console hecho (2026-10-06).** La propiedad `diegoamado.pages.dev` quedó verificada con el archivo HTML y el `sitemap.xml` está enviado. Justo después de enviarlo, Search Console lo muestra como "No se ha podido obtener", que es lo normal en ese momento; el sitemap es XML válido y el `robots.txt` permite todo, ambos comprobados en producción. "Solicitar indexación" devolvió un error del lado de Google; no es necesario y no se cuenta como pendiente. Queda por revisar, sin fecha, que el estado del sitemap pase a "Correcto" cuando Google lo procese.
- Cambio respecto al plan anterior: Search Console pasa a registrarse para `pages.dev` justo después de abrir, y el cambio de dirección queda para la migración al dominio.

### Nombre en el CV — decidido

"Diego Amado" en el sitio, LinkedIn y JSON-LD; el nombre legal completo en los CV, que es lo normal en un documento formal con dos apellidos. Ver `DECISIONES.md`, 017 (corregida el mismo día: una primera versión pedía el nombre corto también en el CV). Los PDF se publicaron como estaban; la única diferencia con la versión anterior es que agregan `diegoamado.pages.dev` a la línea de contacto. Su metadata es tarea de la Fase 10.

### "Más de seis años" — decidido

El About conserva "más de seis años" y Experiencia da las fechas. Ver `DECISIONES.md`, 016. No queda tarea.

---

## Registro histórico (movido de `progress.md`)

Registro histórico. El estado real de las tareas está en docs/PLAN.md.

> Texto movido **sin cambios** desde `docs/progress.md` en la migración a la
> metodología (2026-10-05). Es un registro histórico: las casillas y los
> "pendientes" que aparecen abajo son de esa fecha; el estado vigente está
> en `PLAN.md`.

## Fase 9 — Lanzamiento (plan, 2026-10-03)

**Estado:** 🟡 en curso. Desplegado en Cloudflare Pages: `https://diegoamado.pages.dev` (2026-10-03, verificado: `/`, `/en`, sitemap, robots, CVs, 404 propio, brotli); falta el dominio. Restricción de Diego: **lo más económico posible** (sin empleo por ahora). El dominio definitivo es `diegoamado.dev` (aún no comprado). Único costo recurrente: el dominio (~12–15 USD/año, confirmar al comprar); hosting, HTTPS, CDN y despliegue continuo, gratis. Mientras no se compre, el sitio puede probarse gratis en un subdominio `*.pages.dev`.

- [ ] Verificar que `diegoamado.dev` esté libre (plan B: `.com`/`.co`; el cambio en código es solo la variable de entorno)
- [ ] Comprar el dominio a precio de costo (Cloudflare Registrar o Porkbun), sin extras de hosting ni correo
- [ ] Hosting en Cloudflare Pages (plan gratuito, conectado al repo, despliega con cada push a `main`). **Por verificar:** que el preset de Nitro para Cloudflare mantenga `sitemap.xml`, `robots.txt` y `/en`; si no, prerenderizar
- [ ] Definir `NUXT_PUBLIC_SITE_URL=https://diegoamado.dev` en build y runtime
- [ ] Conectar el dominio (+ redirección `www` → raíz) y confirmar HTTPS
- [x] Verificado en `diegoamado.pages.dev` (2026-10-03): sitemap, robots, hreflang, canonical, PDFs del CV, 404 propio y HTML con brotli. **Lighthouse en producción real (3 corridas cada uno):** móvil Performance 79–85 (FCP 2.6s, LCP 3.3–3.4s, TBT 200–380ms, CLS 0), escritorio **100** (FCP 0.6s, LCP 0.7s, CLS 0); Accessibility 100 y Best Practices 100 en ambos; SEO 69 por el `Disallow: /` deliberado. Móvil igual que antes (83–86 local): la ilustración nueva no empeoró el LCP. Falta repetir al conectar el dominio definitivo
- [ ] Abrir indexación (`Disallow:` en `server/routes/robots.txt.ts`) solo cuando lo anterior pase
- [ ] Google Search Console (gratis) y enviar el sitemap
- [x] `ogImage` (2026-10-03): `public/images/og.jpg`, 1200×630, ~100 KB (ilustración + nombre + cargo sobre fondo charcoal; sin el dominio escrito en la imagen, por si cambia), con `og:image`/`twitter:image`, ancho/alto y alt en ES/EN (`hero.ogImageAlt`). Sigue sin ir en el JSON-LD `Person` (no es una foto real)
- [ ] Opcional y gratis: correo con el dominio vía Cloudflare Email Routing (reenvío a Outlook)

## Prueba final en producción (2026-10-03)

**Estado:** ✅ sin hallazgos que corregir. Sitio vivo en `https://diegoamado.pages.dev` (Cloudflare Pages, plan gratuito, despliegue automático con cada push a `main`). Decisión de Diego: **se queda ahí por ahora; el dominio `diegoamado.dev` no se compra todavía.** Probado con Chrome headless real contra la URL pública:
- **Rutas y recursos:** `/`, `/en`, `sitemap.xml`, `robots.txt`, los dos CV (PDF), `og.jpg` y las variantes del hero responden 200 con el tipo correcto; HTML con brotli; 404 propio en ES (`/nope`) y EN (`/en/nope`) con título y `lang` correctos.
- **Escritorio (1440), tablet (820) y móvil (390), ES y EN:** 0 errores de consola (en las 404 solo el aviso del propio status 404), 1 `h1`, `lang` `es-CO`/`en-US`, 0 overflow horizontal, 0 imágenes rotas, 0 claves i18n sin traducir, 6 secciones en el orden del nav, el hero sirve AVIF.
- **Enlaces:** GitHub (perfil, notify-engine, energy-ai) 200; WhatsApp redirige (302, normal); LinkedIn devuelve 999 a clientes sin sesión (es su bloqueo anti-bots, no un enlace roto); `mailto:diego_amado_@outlook.com` correcto.
- **Interacción:** accordions (6 botones, `aria-expanded` pasa a `true`), cambio ES→EN (misma sección, ±32px por el largo del texto, URL `/en`, los 4 botones de CV pasan a `-en.pdf`), menú móvil (el botón pasa a "Cerrar menú").
- **Lighthouse (3 corridas):** escritorio 100/100/100, móvil 79–85/100/100; SEO 69 por el `Disallow: /` deliberado.
- **Cosas que parecen fallas pero no lo son:** (1) una captura de página completa sale con las secciones vacías: es el reveal al hacer scroll (contenido oculto hasta que entra en pantalla, y se vuelve a armar al salir); recorriendo la página se ve todo. (2) `energy-ai` muestra "sept de 2026 — sept de 2026" porque inicio y fin caen en el mismo mes; si se quiere, es un cambio de dato en `projects.ts`, no de código.

## Qué falta (resumen, 2026-10-03)

**Nada obligatorio del lado técnico.** Lo pendiente depende de decisiones tuyas:
1. **Comprar `diegoamado.dev`** (cuando haya presupuesto, ~12–15 USD/año; confirmar precio). Después: conectarlo en Pages → Custom domains, cambiar `NUXT_PUBLIC_SITE_URL` a `https://diegoamado.dev` (build y runtime), repetir esta prueba y Lighthouse, abrir `robots.txt` (`Disallow:` en `server/routes/robots.txt.ts`) y enviar el sitemap en Search Console. Hasta entonces **no abrir** `robots.txt`: indexar `pages.dev` y cambiar de dominio después duplica y pierde posicionamiento.
2. Opcional y gratis, con dominio: correo `@diegoamado.dev` con Cloudflare Email Routing (reenvío a Outlook).
3. Si cambia el CV: reemplazar los PDF de `public/cv/` conservando los nombres.
4. Si se agrega Amadia/Miattend a Proyectos o una tecnología con ícono: ver "Pendientes abiertos" (el ícono hay que sumarlo a `clientBundle.icons`).
5. **Fuera de este repo:** `00-mapa.md` y `02-personal/CLAUDE.md` del `second-brain` siguen diciendo "Fases 0-7 hechas, falta la Fase 8" y que energy-ai es privado; actualizar cuando se pueda.

## Pendientes abiertos

**Bloqueados por contenido tuyo (Fase 8):**
- ~~Foto final del hero~~ resuelto (ver sección abajo). Sigue siendo una ilustración IA, así que **no** va en `image` del JSON-LD `Person`; `ogImage` es opcional y no se agregó.
- Dominio definitivo: cuando se decida, definir `NUXT_PUBLIC_SITE_URL` (build + runtime). **Abrir `robots.txt` al crawling** solo cuando la foto final esté puesta *y* el dominio sea el definitivo (ver arriba). La bio ya está.
- Amadia (fuera de Proyectos desde 2026-09-28, aún sin primer cliente): cuando tenga primer cliente o resultados que se puedan afirmar, volver a agregarla en `app/data/projects.ts` (el historial de git conserva la entrada, con sus textos en `projects.amadia.*` de i18n) y la fila pasa a ser compacta/no expandible hasta que tenga contexto, resultado y links. Si vuelve `lucide:sparkles`, agregarlo otra vez a `clientBundle.icons`.
- Miattend sigue fuera de Proyectos por decisión tuya (2026-09-21), pero sigue real en `content.md`.

**Técnicos (no bloqueados, menor prioridad):**
- Verificación manual pendiente en navegador/dispositivo real: responsive visual fino, navegación por teclado completa, y que el CV se descargue bien en móvil (iOS Safari abre PDFs en visor en vez de descargar, comportamiento normal del navegador).
- Si cambia el CV: reemplazar los PDFs en `public/cv/` conservando los nombres (y, si se recolorea de nuevo, el rust es `#B9502C`).
- Si se agregan tecnologías nuevas con ícono, sumarlas a `clientBundle.icons` en `nuxt.config.ts` o no van a renderizar (pasó dos veces ya — ver la sección de arriba).
- Si se agrega un idioma: una línea en `cvHref` (`app/data/contact.ts`) + su PDF en `public/cv/`.
- Rendimiento: no queda nada de bajo riesgo por mejorar (ver sección 4). Compresión del HTML de SSR (~145KB → ~39KB) depende del proxy/CDN del deploy: verificar que `gzip`/`br` esté activo ahí.

**Siguiente paso:** el sitio ya está desplegado y verificado (Fase 9 en pausa hasta comprar el dominio). Fase 8 está cerrada salvo las observaciones opcionales de contenido de About.
