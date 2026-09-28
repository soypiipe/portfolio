<script setup lang="ts">
import type { StackItem } from '~/data/experience'

// Technologies of a row. `compact` = the collapsed one-line summary (names
// only, first `max`, then "+N"); default = the full list with icons.
const props = withDefaults(defineProps<{ items: StackItem[]; label: string; compact?: boolean; max?: number }>(), {
  compact: false,
  max: 5
})

const shown = computed(() => (props.compact ? props.items.slice(0, props.max) : props.items))
const hidden = computed(() => props.items.length - shown.value.length)
</script>

<template>
  <ul
    v-if="compact"
    class="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[13px] text-secondary"
    :aria-label="label"
  >
    <!-- Separator trails each item (not leads the next), so a wrapped line never starts with a dot. -->
    <li
      v-for="tech in shown"
      :key="tech.name"
      class="inline-flex items-center gap-2 after:text-hairline after:content-['·'] last:after:content-none"
    >
      {{ tech.name }}
    </li>
    <li v-if="hidden > 0" class="text-accent-hover">
      +{{ hidden }}
    </li>
  </ul>

  <ul v-else class="flex flex-wrap gap-x-5 gap-y-2.5" :aria-label="label">
    <li
      v-for="tech in shown"
      :key="tech.name"
      class="inline-flex items-center gap-2 whitespace-nowrap font-mono text-[13px] text-secondary"
    >
      <Icon :name="tech.icon" class="h-4 w-4 shrink-0" aria-hidden="true" />
      {{ tech.name }}
    </li>
  </ul>
</template>
