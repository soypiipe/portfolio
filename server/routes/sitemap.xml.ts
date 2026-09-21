// Generated at request time (not a static file) so it always uses the
// real site URL from runtimeConfig.public.siteUrl — never a hardcoded
// domain guess. Two URLs: the one-page site in each locale.
export default defineEventHandler((event) => {
  const { siteUrl } = useRuntimeConfig(event).public
  const paths = [
    { loc: '/', hreflang: { es: '/', en: '/en' } },
    { loc: '/en', hreflang: { es: '/', en: '/en' } }
  ]

  const urls = paths
    .map(
      ({ loc, hreflang }) => `
  <url>
    <loc>${siteUrl}${loc}</loc>
    <xhtml:link rel="alternate" hreflang="es" href="${siteUrl}${hreflang.es}" />
    <xhtml:link rel="alternate" hreflang="en" href="${siteUrl}${hreflang.en}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}${hreflang.es}" />
  </url>`
    )
    .join('')

  setHeader(event, 'content-type', 'application/xml')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}
</urlset>`
})
