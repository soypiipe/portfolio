# Notas — Fase 0: Contexto

## Qué es

Sitio personal de Diego Amado: carta de presentación profesional en español (principal) e inglés. Una sola página con Hero, About, Proyectos, Experiencia, Stack y Contacto. Código bajo licencia MIT; el contenido personal (bio, historial, fotos, nombre) no está cubierto por esa licencia (ver `README.md`).

## Estado al migrar (2026-10-05)

- Publicado en `https://diegoamado.pages.dev` (Cloudflare Pages, plan gratuito). El dominio `diegoamado.dev` no está comprado.
- `robots.txt` bloquea todo el crawling. Decisión tomada: abrirlo en `pages.dev` (`DECISIONES.md`, 008), pendiente de ejecutar.
- La construcción y el contenido definitivo están hechos (fases 2 a 8 del plan). Lo abierto es el lanzamiento (fase 9), el endurecimiento (10) y una auditoría independiente (11), que no se ha hecho.
- No hay pruebas automatizadas. Las verificaciones (íconos contra `clientBundle.icons`, claves i18n ES/EN, Lighthouse, Chrome headless) se hicieron con scripts sueltos que no están en el repo.

## Alcance

Entra: una página concisa, bilingüe, rápida, accesible y con SEO correcto desde el inicio. No entra: secciones de relleno, backend, contenido inventado (ver "Lo que NO se hace aquí" en `CLAUDE.md`).

## Restricciones

Costo mínimo: el único gasto recurrente previsto es el dominio (~12–15 USD/año). Hosting, HTTPS, CDN y CI/CD, gratuitos.

## Documentación previa

Antes de la migración el avance vivía en `progress.md`, el plan inicial en `implementation-plan.md`, y había `architecture.md` y `content.md`. Esos cuatro archivos se reemplazaron por `PLAN.md`, `DECISIONES.md`, `notas/` y `CLAUDE.md`, y se eliminaron en un commit aparte; siguen disponibles en el historial de git. El texto de `progress.md` está repartido sin cambios en las notas 01 a 09.
