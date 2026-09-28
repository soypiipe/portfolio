<script setup lang="ts">
import { experience } from '~/data/experience'
import type { ExperienceEntry } from '~/data/experience'

const { t, locale } = useI18n()
const { pick } = useLocalized()
const { openId, toggle } = useAccordion('experience')

function dateRange(entry: ExperienceEntry) {
  return formatDateRange(entry.startDate, entry.endDate, entry.current, locale.value, t('common.present'))
}
</script>

<template>
  <section id="experiencia" class="border-t border-hairline">
    <div class="mx-auto max-w-7xl px-6 py-20 md:py-28">
      <div class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <div v-reveal class="lg:col-span-3">
          <div class="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-secondary">
            <span class="text-accent-hover">04.</span>
            <span>{{ t('experience.eyebrow') }}</span>
          </div>
        </div>

        <div class="lg:col-span-9">
          <h2 v-reveal="80" class="mb-10 max-w-3xl font-sans text-4xl font-bold leading-[1.1] tracking-tight text-primary sm:text-5xl">
            {{ t('experience.heading') }}
          </h2>

          <ol class="flex flex-col">
            <li v-for="(entry, index) in experience" :key="entry.id" v-reveal data-accordion-item class="group">
              <div
                class="-mx-3 px-3 transition-colors hover:bg-surface/50 sm:-mx-4 sm:px-4"
                :class="{ 'bg-surface/50': openId === entry.id }"
              >
                <div class="border-t border-hairline group-first:border-t-0">
                  <!-- Compact state: enough to identify the role without opening it.
                       This block (padding included, edge to edge) is the click target:
                       it is the positioned ancestor the button's ::after stretches over.
                       Nothing between it and the button may have a transform/filter, or
                       that element becomes the ::after's box instead (that was the bug
                       that shrank the target to just the title on hover). A real link
                       placed in here needs `relative z-20` to stay above the overlay. -->
                  <div class="relative -mx-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 px-3 py-8 sm:-mx-4 sm:grid-cols-[3rem_1fr_auto] sm:gap-x-6 sm:px-4">
                    <span class="pt-2 font-mono text-[13px] text-accent-hover">{{ String(index + 1).padStart(2, '0') }}</span>

                    <div class="min-w-0">
                      <h3 class="font-sans text-2xl font-bold leading-tight text-primary sm:text-3xl">
                        <button
                          type="button"
                          class="text-left outline-none after:absolute after:inset-0 after:z-10 after:content-[''] focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:-outline-offset-2 focus-visible:after:outline-accent"
                          :aria-expanded="openId === entry.id"
                          :aria-controls="`exp-${entry.id}`"
                          @click="toggle(entry.id, $event.currentTarget as HTMLElement)"
                        >
                          <span class="inline-block transition-transform group-hover:translate-x-1">{{ entry.company }}</span>
                        </button>
                      </h3>
                      <p class="mt-1.5 font-sans text-base text-primary/90 sm:text-lg">
                        {{ pick(entry.role) }}
                        <span class="font-mono text-[13px] uppercase tracking-widest text-secondary">· {{ pick(entry.companyCountry) }}</span>
                      </p>
                    </div>

                    <p class="col-start-2 font-mono text-[13px] text-secondary sm:col-start-3 sm:row-start-1 sm:pt-2 sm:text-right">
                      {{ dateRange(entry) }}
                    </p>

                    <div class="col-start-2 sm:col-span-1 sm:col-start-2">
                      <p class="mb-4 max-w-2xl font-sans text-base leading-relaxed text-secondary sm:text-lg">
                        {{ pick(entry.summary) }}
                      </p>
                      <TechList compact :items="entry.stack" :label="t('projects.techAriaLabel', { name: entry.company })" />
                      <ExpandHint class="mt-5" :open="openId === entry.id" />
                    </div>
                  </div>

                  <!-- Expanded state: everything else. -->
                  <Collapse :id="`exp-${entry.id}`" :open="openId === entry.id">
                    <div class="pb-8 sm:pl-[4.5rem]">
                      <p class="mb-6 font-mono text-[13px] text-secondary">
                        {{ pick(entry.modality) }} · {{ pick(entry.location) }}
                      </p>

                      <h4 class="mb-4 font-mono text-xs uppercase tracking-widest text-secondary">{{ t('common.responsibilities') }}</h4>
                      <ul class="mb-8 flex max-w-3xl flex-col gap-3">
                        <li
                          v-for="(item, i) in pick(entry.responsibilities)"
                          :key="i"
                          class="flex gap-3 font-sans text-base leading-relaxed text-secondary"
                        >
                          <span class="mt-2.5 h-1 w-1 shrink-0 bg-accent" aria-hidden="true" />
                          <span>{{ item }}</span>
                        </li>
                      </ul>

                      <template v-if="entry.achievements.length">
                        <h4 class="mb-4 font-mono text-xs uppercase tracking-widest text-secondary">{{ t('common.results') }}</h4>
                        <div class="mb-8 flex max-w-3xl flex-col gap-6 border-l-2 border-accent pl-5">
                          <div v-for="(achievement, i) in entry.achievements" :key="i">
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
                      <TechList class="pb-1" :items="entry.stack" :label="t('projects.techAriaLabel', { name: entry.company })" />
                    </div>
                  </Collapse>
                </div>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </section>
</template>
