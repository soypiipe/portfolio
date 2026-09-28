<script setup lang="ts">
import { projects } from '~/data/projects'

const { t } = useI18n()
const { openId, toggle } = useAccordion('projects')
</script>

<template>
  <section id="proyectos" class="border-t border-hairline">
    <div class="mx-auto max-w-7xl px-6 py-20 md:py-28">
      <div class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <div v-reveal class="lg:col-span-3">
          <div class="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-secondary">
            <span class="text-accent-hover">03.</span>
            <span>{{ t('projects.eyebrow') }}</span>
          </div>
        </div>

        <div class="lg:col-span-9">
          <h2 v-reveal="80" class="mb-10 max-w-3xl font-sans text-4xl font-bold leading-[1.1] tracking-tight text-primary sm:text-5xl">
            {{ t('projects.heading') }}
          </h2>

          <div>
            <ProjectCard
              v-for="(project, index) in projects"
              :key="project.id"
              v-reveal
              :project="project"
              :index="index"
              :open="openId === project.id"
              @toggle="(trigger) => toggle(project.id, trigger)"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
