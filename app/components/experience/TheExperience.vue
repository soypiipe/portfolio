<script setup lang="ts">
const { t } = useI18n()

// No hay entradas todavía a propósito — content.md prohíbe explícitamente
// inventar fechas o cargos. Cuando exista el CV definitivo, esto pasa a
// ser un array tipado en app/data/experience.ts, igual que projects.ts.
</script>

<template>
  <section id="experiencia" class="border-t border-hairline">
    <div class="mx-auto max-w-7xl px-6 py-20 md:py-28">
      <div class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <div class="lg:col-span-3">
          <div class="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-secondary">
            <span class="text-accent">04.</span>
            <span>{{ t('experience.eyebrow') }}</span>
          </div>
        </div>

        <div class="lg:col-span-9">
          <h2 class="mb-10 max-w-2xl font-sans text-3xl font-bold leading-tight tracking-tight text-primary sm:text-4xl">
            {{ t('experience.heading') }}
          </h2>

          <div class="border border-dashed border-hairline px-6 py-10 text-center sm:px-10">
            <p class="font-mono text-sm uppercase tracking-wide text-secondary">
              {{ t('experience.pending') }}
            </p>
            <p class="mt-2 font-sans text-sm text-secondary/70">
              {{ t('experience.pendingNote') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
