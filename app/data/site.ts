// Centralized, non-URL site metadata for SEO tags (OG, Twitter, JSON-LD).
// The site URL is NOT here: it comes from runtimeConfig.public.siteUrl (see
// nuxt.config.ts), overridable with the NUXT_PUBLIC_SITE_URL env var, so the
// (provisional) domain lives in exactly one place.
export const site = {
  name: 'Diego Amado',
  defaultLocale: 'es',
  twitterHandle: null as string | null
}
