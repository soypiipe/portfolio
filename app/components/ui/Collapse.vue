<script setup lang="ts">
// Animated height reveal for the Experience / Projects rows. Height is
// animated through grid-template-rows (0fr → 1fr), which handles content of
// unknown height without JS measuring. The content stays in the DOM (so it
// is still crawlable) and `inert` keeps it out of the tab order and the
// accessibility tree while collapsed.
defineProps<{ open: boolean }>()
</script>

<template>
  <div class="disclosure" :class="{ 'is-open': open }" :inert="open ? undefined : true">
    <div class="disclosure-clip">
      <div class="disclosure-body">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.disclosure {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.45s var(--ease-soft);
}
.disclosure.is-open {
  grid-template-rows: 1fr;
}

/* Small side margin/padding pair: keeps focus outlines of links at the
   edge of the content from being clipped by overflow hidden. */
.disclosure-clip {
  min-height: 0;
  overflow: hidden;
  margin: 0 -6px;
}
.disclosure-body {
  padding: 0 6px;
  opacity: 0;
  transform: translateY(-8px);
  transition:
    opacity 0.25s ease,
    transform 0.45s var(--ease-soft);
}
.is-open .disclosure-body {
  opacity: 1;
  transform: none;
  /* Content fades in a beat after the height starts opening. */
  transition:
    opacity 0.4s ease 0.12s,
    transform 0.45s var(--ease-soft) 0.05s;
}

@media (prefers-reduced-motion: reduce) {
  .disclosure,
  .disclosure-body,
  .is-open .disclosure-body {
    transition: none;
  }
}
</style>
