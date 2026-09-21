// Generated at request time, not a static file — the `Sitemap:` directive
// requires an absolute URL per spec (a relative one fails validation), so
// this needs runtimeConfig.public.siteUrl the same way sitemap.xml.ts does.
// Never a hardcoded domain guess.
//
// Deliberately blocking all crawling for now — content isn't locked yet
// (About bio is still a draft, hero photo is an AI placeholder, contact
// info isn't filled in — see docs/progress.md, Fase 8 "Content lock").
// Flip `Disallow: /` to `Disallow:` once the site is actually ready to be
// found and deployed to a real domain.
export default defineEventHandler((event) => {
  const { siteUrl } = useRuntimeConfig(event).public
  setHeader(event, 'content-type', 'text/plain')
  return `User-agent: *
Disallow: /

Sitemap: ${siteUrl}/sitemap.xml
`
})
