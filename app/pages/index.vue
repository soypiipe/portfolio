<script setup lang="ts">
const { t } = useI18n()

// The only navigation between routes of this page is the ES/EN switch, and
// Nuxt's default there is "scroll to top" (or to the URL's hash). Turning it
// off keeps the reader where they are. In-page anchors (#proyectos, …) are
// handled by a different branch of Nuxt's scrollBehavior and are unaffected.
definePageMeta({ scrollToTop: false })

// og:image / twitter:image are not set here: app.vue defines them for every
// page (public/images/og.jpg, 1200x630). Only the per-page text goes here.
useSeoMeta({
  title: () => `${t('hero.name')} — ${t('hero.eyebrow')}`,
  description: () => t('hero.statement'),
  ogTitle: () => `${t('hero.name')} — ${t('hero.eyebrow')}`,
  ogDescription: () => t('hero.statement')
})
</script>

<template>
  <div>
    <TheHero />
    <TheAbout />
    <TheProjects />
    <TheExperience />
    <TheStack />
    <TheContact />
  </div>
</template>
