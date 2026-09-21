<script setup lang="ts">
import type { Project } from '~/data/projects'

const props = defineProps<{ project: Project; index: number }>()
const { t } = useI18n()

const initial = computed(() => t(props.project.nameKey).charAt(0))
</script>

<template>
  <article class="grid grid-cols-1 gap-6 border-t border-hairline py-8 first:border-t-0 first:pt-0 sm:grid-cols-12 sm:gap-8">
    <!-- Index + placeholder mark -->
    <div class="flex items-center gap-4 sm:col-span-3 sm:flex-col sm:items-start sm:gap-3">
      <span class="font-mono text-[11px] text-secondary">{{ String(index + 1).padStart(2, '0') }}</span>
      <div class="relative flex h-16 w-16 items-center justify-center border border-hairline bg-surface font-sans text-xl font-bold text-hairline">
        {{ initial }}
        <span class="absolute -top-1 -left-1 h-2 w-2 border-t border-l border-accent" aria-hidden="true" />
        <span class="absolute -bottom-1 -right-1 h-2 w-2 border-b border-r border-accent" aria-hidden="true" />
      </div>
    </div>

    <!-- Content -->
    <div class="sm:col-span-9">
      <div class="mb-2 font-mono text-[11px] uppercase tracking-widest text-accent">
        {{ t(project.kindKey) }}
      </div>

      <h3 class="mb-2 font-sans text-xl font-bold text-primary sm:text-2xl">
        {{ t(project.nameKey) }}
      </h3>

      <p class="mb-4 max-w-2xl font-sans text-sm leading-relaxed text-secondary sm:text-base">
        {{ t(project.descriptionKey) }}
      </p>

      <ul class="flex flex-wrap gap-x-5 gap-y-2" :aria-label="t('projects.techAriaLabel', { name: t(project.nameKey) })">
        <li
          v-for="tech in project.technologies"
          :key="tech.name"
          class="inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-xs text-secondary"
        >
          <Icon :name="tech.icon" class="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {{ tech.name }}
        </li>
      </ul>

      <a
        v-if="project.href"
        :href="project.href"
        target="_blank"
        rel="noopener"
        class="group mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-secondary transition-colors hover:text-primary"
      >
        <span>{{ t('projects.viewMore') }}</span>
        <span class="transition-transform group-hover:translate-x-0.5">→</span>
      </a>
    </div>
  </article>
</template>
