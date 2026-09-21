<script setup lang="ts">
const { t } = useI18n()

// Fixed, known set of keys — simpler and safer than tm()/rt() here, which
// return the raw message node (not the resolved string) for object trees.
const labelKeys = ['analisis', 'desarrollo', 'automatizacion', 'ia', 'aprendizaje'] as const
</script>

<template>
  <section id="sobre-mi" v-reveal class="border-t border-hairline">
    <div class="mx-auto max-w-7xl px-6 py-20 md:py-28">
      <div class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <!-- Index + eyebrow, left rail -->
        <div class="lg:col-span-3">
          <div class="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-secondary">
            <span class="text-accent">02.</span>
            <span>{{ t('about.eyebrow') }}</span>
          </div>
        </div>

        <!-- Heading + body -->
        <div class="lg:col-span-9">
          <h2 class="mb-6 max-w-2xl font-sans text-3xl font-bold leading-tight tracking-tight text-primary sm:text-4xl">
            {{ t('about.heading') }}
          </h2>

          <p class="mb-10 max-w-2xl font-sans text-base leading-relaxed text-secondary sm:text-lg">
            {{ t('about.body') }}
          </p>

          <ul class="flex flex-wrap gap-3" aria-label="Capacidades">
            <li
              v-for="key in labelKeys"
              :key="key"
              class="border border-hairline px-3 py-1.5 font-mono text-xs uppercase tracking-wide text-secondary"
            >
              {{ t(`about.labels.${key}`) }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
