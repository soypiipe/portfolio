<script setup lang="ts">
// Visual-only "VER DETALLES +" cue at the bottom of a collapsed row. The
// real semantics (aria-expanded) live on the row's button, so this is
// aria-hidden. The plus is two 1px bars; opening scales the vertical one
// away, leaving a minus — transform only.
defineProps<{ open: boolean }>()
const { t } = useI18n()
</script>

<template>
  <span
    class="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-secondary transition-colors group-hover:text-accent-hover"
    :class="{ 'text-accent-hover': open }"
    aria-hidden="true"
  >
    {{ open ? t('common.hideDetails') : t('common.showDetails') }}
    <span class="relative block h-3 w-3">
      <span class="absolute inset-x-0 top-1/2 h-px bg-current" />
      <span
        class="absolute inset-y-0 left-1/2 w-px bg-current transition-transform duration-300"
        :class="open ? 'scale-y-0' : 'scale-y-100'"
      />
    </span>
  </span>
</template>
