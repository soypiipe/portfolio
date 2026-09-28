// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  // Off on purpose: the devtools overlay shows a floating Nuxt-branded
  // button in the browser during `npm run dev` — not something we want
  // visible while reviewing the site itself.
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n', '@nuxt/eslint', '@nuxt/icon', '@nuxt/fonts'],

  css: ['~/assets/css/main.css'],

  // Self-hosted fonts: downloaded at build time and served from our own
  // origin (no third-party connection, no render-blocking stylesheet from
  // Google). Only the weights and the latin subset the site actually uses
  // (Spanish accents live in latin). The module also preloads them and
  // generates a metric-adjusted fallback so swapping in the real font
  // causes no layout shift.
  fonts: {
    provider: 'google',
    // preload is off by default for fonts that ship a unicode-range (Google's
    // do), but both files here are used in the first paint, so preload them.
    defaults: { subsets: ['latin'], styles: ['normal'], preload: true },
    families: [
      { name: 'Inter', provider: 'google', weights: [400, 500, 700] },
      { name: 'JetBrains Mono', provider: 'google', weights: [400, 500] }
    ]
  },

  // Pre-compress every static asset (JS, CSS, ...) to .gz and .br at build
  // time. Without this the Node server sends them raw (~445KB of JS over
  // the wire vs ~150KB compressed). HTML from SSR is not covered — a
  // reverse proxy or CDN in front normally compresses that.
  nitro: { compressPublicAssets: true },

  // Files in public/ have stable URLs (no content hash), so they can't be
  // `immutable` like /_nuxt/* — a day of browser cache is a safe middle
  // ground: repeat visits skip the download, and swapping the real hero
  // photo or favicon later shows up within a day.
  routeRules: {
    '/images/**': { headers: { 'cache-control': 'public, max-age=86400' } },
    '/favicon.ico': { headers: { 'cache-control': 'public, max-age=86400' } },
    '/apple-touch-icon.png': { headers: { 'cache-control': 'public, max-age=86400' } },
    // CVs get updated more often than the images: one hour.
    '/cv/**': { headers: { 'cache-control': 'public, max-age=3600' } }
  },

  components: [
    { path: '~/components', pathPrefix: false }
  ],

  runtimeConfig: {
    public: {
      // Provisional domain (not the final one). Everything that needs an
      // absolute URL — canonical, OG, hreflang, sitemap, robots — reads it
      // from here, so switching domains is one env var
      // (NUXT_PUBLIC_SITE_URL), not a code change.
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://diegoamado.dev'
    }
  },

  // html lang/dir and hreflang alternates come from @nuxtjs/i18n's
  // useLocaleHead() in app.vue — no static htmlAttrs here, it would be
  // wrong for the /en/ route.

  i18n: {
    // Needs to be an absolute origin (not '/') for hreflang alternates to
    // be generated as absolute URLs, which is what search engines expect.
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://diegoamado.dev',
    defaultLocale: 'es',
    strategy: 'prefix_except_default',
    // Explicitly off: the module's default browser-language detection was
    // silently 302-redirecting "/" to "/en" for any visitor (or crawler)
    // with an English Accept-Language header — found via a real Lighthouse
    // run ("Avoid multiple page redirects"). Spanish is the primary
    // language by design (see CLAUDE.md); visitors switch manually via the
    // nav toggle. This also keeps "/" a single stable, crawlable URL.
    detectBrowserLanguage: false,
    locales: [
      { code: 'es', language: 'es-CO', name: 'Español', file: 'es.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' }
    ],
    langDir: 'locales/'
  },

  icon: {
    // Icon names come from app/data/*.ts (dynamic `:name` bindings), so
    // the module's static-usage scan can't see them — without this it
    // falls back to bundling the ENTIRE simple-icons + lucide collections
    // (~5MB) instead of the ~24 icons we actually use. Server bundle is
    // off entirely: no runtime icon-fetch route needed for a fixed list.
    provider: 'none',
    serverBundle: false,
    clientBundle: {
      scan: true,
      icons: [
        'simple-icons:vuedotjs',
        'simple-icons:react',
        'simple-icons:angular',
        'simple-icons:typescript',
        'simple-icons:nodedotjs',
        'simple-icons:nestjs',
        'simple-icons:python',
        'simple-icons:dotnet',
        'simple-icons:microsoftsqlserver',
        'simple-icons:postgresql',
        'simple-icons:mysql',
        'simple-icons:mongodb',
        'simple-icons:docker',
        'simple-icons:linux',
        'simple-icons:nginx',
        'simple-icons:amazonaws',
        'simple-icons:git',
        'simple-icons:github',
        'simple-icons:visualstudiocode',
        'simple-icons:claude',
        'simple-icons:openai',
        'simple-icons:whatsapp',
        'simple-icons:linkedin',
        'simple-icons:rabbitmq',
        'simple-icons:githubactions',
        'simple-icons:express',
        'simple-icons:javascript',
        'simple-icons:html5',
        'simple-icons:css3',
        'simple-icons:qlik',
        'simple-icons:typeorm',
        'simple-icons:redis',
        'simple-icons:opentelemetry',
        'simple-icons:grafana',
        'simple-icons:resend',
        'simple-icons:slack',
        'lucide:workflow',
        'lucide:sparkles',
        'lucide:database',
        'lucide:mail',
        'lucide:file-down',
        'lucide:webhook',
        'lucide:layers',
        'lucide:arrow-left'
      ]
    }
  }
})