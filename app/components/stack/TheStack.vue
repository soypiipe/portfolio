<script setup lang="ts">
import { stackCategories } from '~/data/stack'

const { t } = useI18n()
</script>

<template>
  <section id="stack" class="border-t border-hairline">
    <div class="mx-auto max-w-7xl px-6 py-20 md:py-28">
      <div class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <div v-reveal class="lg:col-span-3">
          <div class="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-secondary">
            <span class="text-accent-hover">05.</span>
            <span>{{ t('stack.eyebrow') }}</span>
          </div>
        </div>

        <div class="lg:col-span-9">
          <h2 v-reveal="80" class="mb-10 max-w-3xl font-sans text-4xl font-bold leading-[1.1] tracking-tight text-primary sm:text-5xl">
            {{ t('stack.heading') }}
          </h2>

          <dl class="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div v-for="(category, i) in stackCategories" :key="category.id" v-reveal="(i % 2) * 100" class="border-t border-hairline pt-5">
              <dt class="mb-4 font-mono text-xs uppercase tracking-widest text-secondary">
                {{ t(category.labelKey) }}
              </dt>
              <dd class="flex flex-wrap gap-x-6 gap-y-3.5">
                <span v-for="item in category.items" :key="item.name" class="group inline-flex flex-col whitespace-nowrap font-sans text-base text-primary">
                  <span class="inline-flex items-center gap-2">
                    <Icon :name="item.icon" class="h-[18px] w-[18px] shrink-0 text-secondary transition-colors group-hover:text-accent" aria-hidden="true" />
                    {{ item.name }}
                  </span>
                  <!-- w-0 + min-w-full: the label takes the width of the icon + name
                       above it without ever widening the item; justify then spreads
                       the letters across exactly that width. -->
                  <span
                    v-if="item.level"
                    class="mt-1 w-0 min-w-full font-mono text-[9px] uppercase leading-none text-secondary/80 [text-align-last:justify] [text-justify:inter-character]"
                  >
                    {{ t(`stack.levels.${item.level}`) }}
                  </span>
                </span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </section>
</template>
