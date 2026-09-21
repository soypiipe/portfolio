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
    <!--
      TODO Fase 4: TheExperience va AQUÍ, entre Proyectos y Stack — el
      orden visual debe coincidir con el del nav (Inicio, Sobre mí,
      Proyectos, Experiencia, Stack, Contacto). TheStack ya quedó
      numerado como "05." previendo ese orden final.
    -->
    <TheStack />
  </div>
</template>
