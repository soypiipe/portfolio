<script setup lang="ts">
const { t } = useI18n()

// Fixed, known set of keys — simpler and safer than tm()/rt() here, which
// return the raw message node (not the resolved string) for object trees.
const paragraphKeys = ['p1', 'p2', 'p3', 'p4'] as const
const labelKeys = ['backend', 'arquitectura', 'asincronos', 'cloud', 'ia'] as const
</script>

<template>
  <section id="sobre-mi" class="border-t border-hairline">
    <div class="mx-auto max-w-7xl px-6 py-20 md:py-28">
      <div class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <!-- Index + eyebrow, left rail -->
        <div v-reveal class="lg:col-span-3">
          <div class="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-secondary">
            <span class="text-accent-hover">02.</span>
            <span>{{ t('about.eyebrow') }}</span>
          </div>
        </div>

        <!-- Heading + body -->
        <div class="lg:col-span-9">
          <h2 v-reveal="80" class="mb-6 max-w-3xl font-sans text-4xl font-bold leading-[1.1] tracking-tight text-primary sm:text-5xl">
            {{ t('about.heading') }}
          </h2>

          <div class="mb-10 max-w-2xl space-y-5">
            <p
              v-for="(key, i) in paragraphKeys"
              :key="key"
              v-reveal="160 + i * 80"
              class="font-sans text-lg leading-relaxed text-secondary sm:text-xl sm:leading-relaxed"
            >
              {{ t(`about.paragraphs.${key}`) }}
            </p>
          </div>

          <ul v-reveal="520" class="flex flex-wrap gap-3" :aria-label="t('about.ariaLabel')">
            <li
              v-for="key in labelKeys"
              :key="key"
              class="border border-hairline px-3.5 py-2 font-mono text-[13px] uppercase tracking-wide text-secondary transition-colors hover:border-secondary/40 hover:text-primary"
            >
              {{ t(`about.labels.${key}`) }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
