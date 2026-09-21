<script setup lang="ts">
import { site } from '~/data/site'

const config = useRuntimeConfig()
const route = useRoute()
const { t } = useI18n()

// html lang/dir + hreflang alternates for the current route, per locale.
const i18nHead = useLocaleHead()
useHead(() => ({
  htmlAttrs: { lang: i18nHead.value.htmlAttrs?.lang, dir: i18nHead.value.htmlAttrs?.dir },
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    // Preconnect lets the browser start the connection before it even
    // parses the stylesheet link below; a plain <link rel="stylesheet">
    // (vs. the old CSS @import) is discovered immediately instead of only
    // after the rest of main.css has downloaded and parsed.
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap'
    },
    ...(i18nHead.value.link ?? [])
  ],
  meta: [{ name: 'theme-color', content: '#0C0A09' }, ...(i18nHead.value.meta ?? [])]
}))

// Site-wide OG/Twitter defaults. Page-specific title/description
// (set via useSeoMeta in pages/index.vue) override these per-route.
const canonicalUrl = computed(() => `${config.public.siteUrl}${route.fullPath}`)

useSeoMeta({
  ogSiteName: site.name,
  ogType: 'website',
  ogUrl: canonicalUrl,
  twitterCard: 'summary_large_image'
})

useHead({
  link: [{ rel: 'canonical', href: canonicalUrl }]
})

// Person structured data — only facts confirmed elsewhere in this repo.
// No `image` (the hero photo is an AI placeholder, not a real photo of
// Diego) and no LinkedIn/email (still unconfirmed placeholders in
// docs/content.md). github.com/soypiipe is his real, confirmed account.
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: site.name,
        url: config.public.siteUrl,
        jobTitle: t('hero.eyebrow'),
        sameAs: ['https://github.com/soypiipe']
      })
    }
  ]
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
