<script setup lang="ts">
const { t } = useI18n()

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
