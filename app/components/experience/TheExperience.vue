<script setup lang="ts">
import { experience } from '~/data/experience'
import type { ExperienceEntry } from '~/data/experience'

const { t, locale } = useI18n()
const { pick } = useLocalized()

function dateRange(entry: ExperienceEntry) {
  return formatDateRange(entry.startDate, entry.endDate, entry.current, locale.value, t('common.present'))
}
</script>

<template>
  <section id="experiencia" v-reveal class="border-t border-hairline">
    <div class="mx-auto max-w-7xl px-6 py-20 md:py-28">
      <div class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <div class="lg:col-span-3">
          <div class="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-secondary">
            <span class="text-accent-hover">04.</span>
            <span>{{ t('experience.eyebrow') }}</span>
          </div>
        </div>

        <div class="lg:col-span-9">
          <h2 class="mb-10 max-w-2xl font-sans text-3xl font-bold leading-tight tracking-tight text-primary sm:text-4xl">
            {{ t('experience.heading') }}
          </h2>

          <ol class="flex flex-col">
            <li v-for="entry in experience" :key="entry.id" class="border-t border-hairline py-8 first:border-t-0 first:pt-0">
              <!-- Header row: dates / modality+location on the left rail, role+company on the right -->
              <div class="mb-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h3 class="font-sans text-xl font-bold text-primary sm:text-2xl">
                    {{ pick(entry.role) }}
                  </h3>
                  <p class="font-mono text-xs uppercase tracking-widest text-accent-hover">
                    {{ entry.company }} · {{ pick(entry.companyCountry) }}
                  </p>
                </div>
                <div class="shrink-0 text-left font-mono text-xs text-secondary sm:text-right">
                  <div>{{ dateRange(entry) }}</div>
                  <div class="text-secondary/70">{{ pick(entry.modality) }} · {{ pick(entry.location) }}</div>
                </div>
              </div>

              <p class="mb-4 max-w-2xl font-sans text-sm leading-relaxed text-secondary sm:text-base">
                {{ pick(entry.summary) }}
              </p>

              <ul class="mb-6 flex flex-col gap-2">
                <li
                  v-for="(item, i) in pick(entry.responsibilities)"
                  :key="i"
                  class="flex gap-2.5 font-sans text-sm leading-relaxed text-secondary"
                >
                  <span class="mt-2 h-1 w-1 shrink-0 bg-hairline" aria-hidden="true" />
                  <span>{{ item }}</span>
                </li>
              </ul>

              <div v-if="entry.achievements.length" class="mb-6 flex flex-col gap-4 border-l-2 border-accent pl-4">
                <div v-for="(achievement, i) in entry.achievements" :key="i">
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

              <ul class="flex flex-wrap gap-x-4 gap-y-2" :aria-label="t('projects.techAriaLabel', { name: entry.company })">
                <li
                  v-for="tech in entry.stack"
                  :key="tech.name"
                  class="inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-xs text-secondary"
                >
                  <Icon :name="tech.icon" class="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  {{ tech.name }}
                </li>
              </ul>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </section>
</template>
