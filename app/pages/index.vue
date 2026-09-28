<script setup lang="ts">
const { t } = useI18n()

// The only navigation between routes of this page is the ES/EN switch, and
// Nuxt's default there is "scroll to top" (or to the URL's hash). Turning it
// off keeps the reader where they are. In-page anchors (#proyectos, …) are
// handled by a different branch of Nuxt's scrollBehavior and are unaffected.
definePageMeta({ scrollToTop: false })

// No ogImage on purpose: the only image on the site right now is the
// hero's AI placeholder photo (visibly marked "PLACEHOLDER // POR
// REEMPLAZAR" on the page) — using it as the social-share preview would
// mean that text shows up when someone shares the link. Add ogImage once
// the real photo exists (see docs/progress.md, Fase 8).
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
