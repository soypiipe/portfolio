# Notas — Fase 4 — Proyectos

> Texto movido **sin cambios** desde `docs/progress.md` en la migración a la
> metodología (2026-10-05). Es un registro histórico: las casillas y los
> "pendientes" que aparecen abajo son de esa fecha; el estado vigente está
> en `PLAN.md`.

---

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
