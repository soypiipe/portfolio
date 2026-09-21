<script setup lang="ts">
import type { Project } from '~/data/projects'

const props = defineProps<{ project: Project; index: number }>()
const { t, locale } = useI18n()
const { pick } = useLocalized()

const initial = computed(() => t(props.project.nameKey).charAt(0))

const description = computed(() =>
  props.project.summary ? pick(props.project.summary) : t(props.project.descriptionKey ?? '')
)

const dateRangeLabel = computed(() => {
  if (!props.project.startDate) return null
  return formatDateRange(props.project.startDate, props.project.endDate, props.project.current, locale.value, t('common.present'))
})
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
      <div v-if="dateRangeLabel" class="font-mono text-[11px] text-secondary/70 sm:text-left">
        {{ dateRangeLabel }}
      </div>
    </div>

    <!-- Content -->
    <div class="sm:col-span-9">
      <div class="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-widest text-accent-hover">
        <span>{{ t(project.kindKey) }}</span>
        <template v-if="project.role">
          <span class="text-hairline">/</span>
          <span class="text-secondary normal-case">{{ pick(project.role) }}</span>
        </template>
      </div>

      <h3 class="mb-2 font-sans text-xl font-bold text-primary sm:text-2xl">
        {{ t(project.nameKey) }}
      </h3>

      <p class="mb-4 max-w-2xl font-sans text-sm leading-relaxed text-secondary sm:text-base">
        {{ description }}
      </p>

      <ul v-if="project.responsibilities" class="mb-6 flex flex-col gap-2">
        <li
          v-for="(item, i) in pick(project.responsibilities)"
          :key="i"
          class="flex gap-2.5 font-sans text-sm leading-relaxed text-secondary"
        >
          <span class="mt-2 h-1 w-1 shrink-0 bg-hairline" aria-hidden="true" />
          <span>{{ item }}</span>
        </li>
      </ul>

      <div v-if="project.achievements?.length" class="mb-6 flex flex-col gap-4 border-l-2 border-accent pl-4">
        <div v-for="(achievement, i) in project.achievements" :key="i">
          <p class="font-mono text-[11px] uppercase tracking-widest text-primary">
            {{ pick(achievement.title) }}
          </p>
          <p class="mt-1 max-w-2xl font-sans text-sm leading-relaxed text-secondary">
            {{ pick(achievement.description) }}
          </p>
          <p class="mt-1.5 font-mono text-xs text-accent-hover">
            {{ pick(achievement.metric) }}
          </p>
        </div>
      </div>

      <ul class="mb-4 flex flex-wrap gap-x-5 gap-y-2" :aria-label="t('projects.techAriaLabel', { name: t(project.nameKey) })">
        <li
          v-for="tech in project.technologies"
          :key="tech.name"
          class="inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-xs text-secondary"
        >
          <Icon :name="tech.icon" class="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {{ tech.name }}
        </li>
      </ul>

      <div v-if="project.links?.length" class="flex flex-wrap gap-4">
        <a
          v-for="link in project.links"
          :key="link.url"
          :href="link.url"
          target="_blank"
          rel="noopener"
          class="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-secondary transition-all hover:-translate-y-0.5 hover:text-primary"
        >
          <span>{{ pick(link.label) }}</span>
          <span class="transition-transform group-hover:translate-x-0.5">→</span>
        </a>
      </div>
    </div>
  </article>
</template>
