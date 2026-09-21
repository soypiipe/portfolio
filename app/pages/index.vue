<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => `${t('hero.name')} — ${t('hero.eyebrow')}`,
  description: () => t('hero.statement')
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
