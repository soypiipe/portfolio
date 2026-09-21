<script setup lang="ts">
import { stackCategories } from '~/data/stack'

const { t } = useI18n()
</script>

<template>
  <section id="stack" v-reveal class="border-t border-hairline">
    <div class="mx-auto max-w-7xl px-6 py-20 md:py-28">
      <div class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <div class="lg:col-span-3">
          <div class="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-secondary">
            <span class="text-accent-hover">05.</span>
            <span>{{ t('stack.eyebrow') }}</span>
          </div>
        </div>

        <div class="lg:col-span-9">
          <h2 class="mb-10 max-w-2xl font-sans text-3xl font-bold leading-tight tracking-tight text-primary sm:text-4xl">
            {{ t('stack.heading') }}
          </h2>

          <dl class="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div v-for="category in stackCategories" :key="category.id" class="border-t border-hairline pt-4">
              <dt class="mb-3 font-mono text-[11px] uppercase tracking-widest text-secondary">
                {{ t(category.labelKey) }}
              </dt>
              <dd class="flex flex-wrap gap-x-5 gap-y-3">
                <span
                  v-for="item in category.items"
                  :key="item.name"
                  class="group inline-flex items-center gap-2 whitespace-nowrap font-sans text-sm text-primary"
                >
                  <Icon :name="item.icon" class="h-4 w-4 shrink-0 text-secondary transition-colors group-hover:text-accent" aria-hidden="true" />
                  {{ item.name }}
                </span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </section>
</template>
