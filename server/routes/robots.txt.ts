// Generated at request time, not a static file — the `Sitemap:` directive
// requires an absolute URL per spec (a relative one fails validation), so
// this needs runtimeConfig.public.siteUrl the same way sitemap.xml.ts does.
// Never a hardcoded domain guess.
//
// Crawling is still blocked. The original reasons (draft bio, placeholder
// photo, missing contact info) no longer apply: the content is locked. What
// remains is the indexing decision: Diego decided to OPEN it on the current
// pages.dev domain (docs/DECISIONES.md, entry 008), pending a check that
// Cloudflare Pages doesn't also send `X-Robots-Tag: noindex` (docs/PLAN.md,
// Fase 9, first task). Until that task runs, keep `Disallow: /`; the change
// is `Disallow:` (empty).
export default defineEventHandler((event) => {
  const { siteUrl } = useRuntimeConfig(event).public
  setHeader(event, 'content-type', 'text/plain')
  return `User-agent: *
Disallow: /

Sitemap: ${siteUrl}/sitemap.xml
`
})
