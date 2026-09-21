// Centralized, non-URL site metadata for SEO tags (OG, Twitter, JSON-LD).
// The site URL is NOT here — no domain is confirmed yet. It comes from
// runtimeConfig.public.siteUrl (see nuxt.config.ts), driven by the
// NUXT_PUBLIC_SITE_URL env var, so nothing invents a domain that might
// not even be the one Diego ends up using.
export const site = {
  name: 'Diego Amado',
  defaultLocale: 'es',
  twitterHandle: null as string | null
}
