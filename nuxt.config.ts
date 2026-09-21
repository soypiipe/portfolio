// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n', '@nuxt/eslint'],

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
  }
})