<script setup lang="ts">
import { projects } from '~/data/projects'

const { t } = useI18n()
</script>

<template>
  <section id="proyectos" v-reveal class="border-t border-hairline">
    <div class="mx-auto max-w-7xl px-6 py-20 md:py-28">
      <div class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <div class="lg:col-span-3">
          <div class="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-secondary">
            <span class="text-accent">03.</span>
            <span>{{ t('projects.eyebrow') }}</span>
          </div>
        </div>

        <div class="lg:col-span-9">
          <h2 class="mb-10 max-w-2xl font-sans text-3xl font-bold leading-tight tracking-tight text-primary sm:text-4xl">
            {{ t('projects.heading') }}
          </h2>

          <div>
            <ProjectCard
              v-for="(project, index) in projects"
              :key="project.id"
              :project="project"
              :index="index"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
