<script setup lang="ts">
import type { Project } from '~/data/projects'

const props = defineProps<{ project: Project; index: number; open: boolean }>()
const emit = defineEmits<{ toggle: [trigger: HTMLElement] }>()
const { t, locale } = useI18n()
const { pick } = useLocalized()

const name = computed(() => t(props.project.nameKey))
const initial = computed(() => name.value.charAt(0))

const description = computed(() =>
  props.project.summary ? pick(props.project.summary) : t(props.project.descriptionKey ?? '')
)

const dateRangeLabel = computed(() => {
  if (!props.project.startDate) return null
  return formatDateRange(props.project.startDate, props.project.endDate, props.project.current, locale.value, t('common.present'))
})

// A project only gets an expanded state if there is actually something more
// to show (a project with just a description and stack has nothing to expand).
const expandable = computed(
  () => !!(props.project.responsibilities || props.project.achievements?.length || props.project.links?.length)
)
const panelId = computed(() => `project-${props.project.id}`)
</script>

<template>
  <article data-accordion-item class="group">
    <div
      class="-mx-3 px-3 sm:-mx-4 sm:px-4"
      :class="{ 'transition-colors hover:bg-surface/50': expandable, 'bg-surface/50': open }"
    >
      <div class="border-t border-hairline group-first:border-t-0">
        <!-- Compact state. Same rules as TheExperience: this block is the click
             target (see the note there), so no transform between it and the
             button, and real links inside need `relative z-20`. -->
        <div class="relative -mx-3 grid grid-cols-1 gap-6 px-3 py-8 sm:-mx-4 sm:grid-cols-12 sm:gap-8 sm:px-4">
          <!-- Index + placeholder mark -->
          <div class="flex items-center gap-4 sm:col-span-3 sm:flex-col sm:items-start sm:gap-3">
            <span class="font-mono text-[13px] text-accent-hover">{{ String(index + 1).padStart(2, '0') }}</span>
            <div class="relative flex h-16 w-16 items-center justify-center border border-hairline bg-surface font-sans text-2xl font-bold text-hairline transition-colors group-hover:border-secondary/40">
              {{ initial }}
              <span class="absolute -top-1 -left-1 h-2 w-2 border-t border-l border-accent" aria-hidden="true" />
              <span class="absolute -bottom-1 -right-1 h-2 w-2 border-b border-r border-accent" aria-hidden="true" />
            </div>
            <div v-if="dateRangeLabel" class="font-mono text-xs text-secondary/80 sm:text-left">
              {{ dateRangeLabel }}
            </div>
          </div>

          <div class="sm:col-span-9">
            <div class="mb-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-widest text-accent-hover">
              <span>{{ t(project.kindKey) }}</span>
              <template v-if="project.role">
                <span class="text-hairline">/</span>
                <span class="text-secondary normal-case">{{ pick(project.role) }}</span>
              </template>
            </div>

            <h3 class="mb-3 font-sans text-2xl font-bold leading-tight text-primary sm:text-3xl">
              <button
                v-if="expandable"
                type="button"
                class="text-left outline-none after:absolute after:inset-0 after:z-10 after:content-[''] focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:-outline-offset-2 focus-visible:after:outline-accent"
                :aria-expanded="open"
                :aria-controls="panelId"
                @click="emit('toggle', $event.currentTarget as HTMLElement)"
              >
                <span class="inline-block transition-transform group-hover:translate-x-1">{{ name }}</span>
              </button>
              <template v-else>{{ name }}</template>
            </h3>

            <p class="mb-4 max-w-2xl font-sans text-base leading-relaxed text-secondary sm:text-lg">
              {{ description }}
            </p>

            <TechList compact :items="project.technologies" :label="t('projects.techAriaLabel', { name })" />
            <ExpandHint v-if="expandable" class="mt-5" :open="open" />
          </div>
        </div>

        <!-- Expanded state -->
        <Collapse v-if="expandable" :id="panelId" :open="open">
          <div class="grid grid-cols-1 sm:grid-cols-12 sm:gap-8">
            <div class="pb-8 sm:col-span-9 sm:col-start-4">
              <template v-if="project.responsibilities">
                <h4 class="mb-4 font-mono text-xs uppercase tracking-widest text-secondary">{{ t('common.work') }}</h4>
                <ul class="mb-8 flex flex-col gap-3">
                  <li
                    v-for="(item, i) in pick(project.responsibilities)"
                    :key="i"
                    class="flex gap-3 font-sans text-base leading-relaxed text-secondary"
                  >
                    <span class="mt-2.5 h-1 w-1 shrink-0 bg-accent" aria-hidden="true" />
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </template>

              <template v-if="project.achievements?.length">
                <h4 class="mb-4 font-mono text-xs uppercase tracking-widest text-secondary">{{ t('common.results') }}</h4>
                <div class="mb-8 flex flex-col gap-6 border-l-2 border-accent pl-5">
                  <div v-for="(achievement, i) in project.achievements" :key="i">
                    <p class="font-mono text-xs uppercase tracking-widest text-primary">
                      {{ pick(achievement.title) }}
                    </p>
                    <p class="mt-1.5 font-sans text-base leading-relaxed text-secondary">
                      {{ pick(achievement.description) }}
                    </p>
                    <p class="mt-2 font-mono text-[13px] text-accent-hover">
                      {{ pick(achievement.metric) }}
                    </p>
                  </div>
                </div>
              </template>

              <h4 class="mb-4 font-mono text-xs uppercase tracking-widest text-secondary">{{ t('common.technologies') }}</h4>
              <TechList class="mb-8" :items="project.technologies" :label="t('projects.techAriaLabel', { name })" />

              <div v-if="project.links?.length" class="flex flex-wrap gap-6 pb-1">
                <a
                  v-for="link in project.links"
                  :key="link.url"
                  :href="link.url"
                  target="_blank"
                  rel="noopener"
                  class="link-line group/link inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-wide text-primary transition-colors hover:text-accent-hover"
                >
                  <span>{{ pick(link.label) }}</span>
                  <span class="transition-transform group-hover/link:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  </article>
</template>
