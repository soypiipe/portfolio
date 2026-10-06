// Generated at request time, not a static file — the `Sitemap:` directive
// requires an absolute URL per spec (a relative one fails validation), so
// this needs runtimeConfig.public.siteUrl the same way sitemap.xml.ts does.
// Never a hardcoded domain guess.
//
// Crawling is open (empty `Disallow:`) on the current pages.dev domain, per
// docs/DECISIONES.md, entry 008. Before opening it, Cloudflare Pages was
// checked: it sends no `X-Robots-Tag` header and the HTML has no robots meta
// (only the 404 page is `noindex`, on purpose). When the final domain
// replaces pages.dev, see the migration task in docs/PLAN.md, Fase 9.
export default defineEventHandler((event) => {
  const { siteUrl } = useRuntimeConfig(event).public
  setHeader(event, 'content-type', 'text/plain')
  return `User-agent: *
Disallow:

Sitemap: ${siteUrl}/sitemap.xml
`
})
