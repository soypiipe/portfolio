# Notas — Fase 5 — Experiencia, contacto y footer

Registro histórico. El estado real de las tareas está en docs/PLAN.md.

> Texto movido **sin cambios** desde `docs/progress.md` en la migración a la
> metodología (2026-10-05). Es un registro histórico: las casillas y los
> "pendientes" que aparecen abajo son de esa fecha; el estado vigente está
> en `PLAN.md`.

---

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
