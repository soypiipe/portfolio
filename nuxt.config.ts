// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  // Off on purpose: the devtools overlay shows a floating Nuxt-branded
  // button in the browser during `npm run dev` — not something we want
  // visible while reviewing the site itself.
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n', '@nuxt/eslint', '@nuxt/icon'],

  css: ['~/assets/css/main.css'],

  components: [
    { path: '~/components', pathPrefix: false }
  ],

  app: {
    head: {
      htmlAttrs: { lang: 'es' }
    }
  },

  i18n: {
    baseUrl: '/',
    defaultLocale: 'es',
    strategy: 'prefix_except_default',
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
        'lucide:layers'
      ]
    }
  }
})