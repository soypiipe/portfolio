# Diego Amado — Portfolio

Personal site of Diego Amado, Systems Engineer / Software Engineer. One page,
fully bilingual (Spanish is the primary language, English is a complete second
locale), built to be fast, accessible and SEO-friendly.

Live at <https://diegoamado.pages.dev>.

## Stack

Nuxt 4, Vue 3, TypeScript, Tailwind CSS, `@nuxtjs/i18n`, `@nuxt/icon` and
`@nuxt/fonts` (self-hosted fonts). Deployed on Cloudflare Pages.

## Run it

```bash
npm install
npm run dev      # development server
npm run build    # production build
npm run lint
```

`NUXT_PUBLIC_SITE_URL` sets the absolute URL used for the canonical link,
`hreflang`, Open Graph tags, `sitemap.xml` and `robots.txt`. Set it at build
time and at runtime.

## Structure

- `app/` — Nuxt 4 source: components by section, composables, layout, plugins.
- `app/data/` — typed content: projects, experience, stack, contact, navigation.
- `i18n/locales/` — `es.json` and `en.json`.
- `server/routes/` — dynamic `sitemap.xml` and `robots.txt`.
- `public/` — images and the CV (one PDF per language).
- `docs/` — plan, decisions and per-phase notes (in Spanish).

## License

The source code is released under the [MIT License](LICENSE).

The personal content of the site — biography, work history, project write-ups,
photographs and the name and likeness of Diego Amado (`app/data/`, `i18n/`,
`public/`) — is not covered by that license. All rights reserved; please do
not reuse it without permission.
