<script setup lang="ts">
// Ambient light that trails the pointer: a very faint, very large warm glow
// on the background layer — not a cursor, it never sits under the pointer
// exactly. It lags behind (exponential easing) and fades out when the mouse
// leaves the window.
//
// - Softness comes from the gradient itself (gaussian-ish falloff over 900px),
//   not from `filter: blur`, which would be costly on an element this big.
// - Only `transform` changes per frame; the loop stops once the light has
//   caught up, so an idle page runs no animation at all.
// - Off entirely (nothing rendered, no listeners) on touch / coarse pointers
//   and under prefers-reduced-motion. Touch is never simulated.
const SIZE = 900
// Fraction of the remaining distance covered per 60fps frame (~250ms lag).
const EASE = 0.07

const el = ref<HTMLElement | null>(null)
const enabled = ref(false)
const visible = ref(false)

let x = 0
let y = 0
let targetX = 0
let targetY = 0
let placed = false
let raf = 0
let last = 0

function render() {
  if (el.value) el.value.style.transform = `translate3d(${x - SIZE / 2}px, ${y - SIZE / 2}px, 0)`
}

function tick(now: number) {
  // Frame-rate independent easing; dt is capped so a background-tab pause
  // doesn't teleport the light.
  const k = 1 - (1 - EASE) ** (Math.min(now - last, 64) / 16.667)
  last = now
  x += (targetX - x) * k
  y += (targetY - y) * k
  render()
  raf = Math.abs(targetX - x) + Math.abs(targetY - y) > 0.5 ? requestAnimationFrame(tick) : 0
}

function onMove(e: PointerEvent) {
  if (e.pointerType !== 'mouse') return
  targetX = e.clientX
  targetY = e.clientY
  if (!placed) {
    // First move (or re-entry): appear at the pointer instead of gliding in.
    x = targetX
    y = targetY
    placed = true
    render()
  }
  visible.value = true
  if (!raf) {
    last = performance.now()
    raf = requestAnimationFrame(tick)
  }
}

function onLeave() {
  visible.value = false
  placed = false
}

function attach() {
  window.addEventListener('pointermove', onMove, { passive: true })
  document.documentElement.addEventListener('mouseleave', onLeave)
}

function detach() {
  window.removeEventListener('pointermove', onMove)
  document.documentElement.removeEventListener('mouseleave', onLeave)
  cancelAnimationFrame(raf)
  raf = 0
  visible.value = false
  placed = false
}

onMounted(() => {
  const mq = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
  const sync = () => {
    enabled.value = mq.matches
    if (mq.matches) attach()
    else detach()
  }
  sync()
  mq.addEventListener('change', sync)
  onUnmounted(() => {
    mq.removeEventListener('change', sync)
    detach()
  })
})
</script>

<template>
  <div v-if="enabled" ref="el" class="cursor-glow" :class="{ 'is-visible': visible }" aria-hidden="true" />
</template>

<style scoped>
/* Same layer as TheBackground (fixed, z -10, painted after it), so text and
   content always sit above the light. */
.cursor-glow {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -10;
  width: 900px;
  height: 900px;
  pointer-events: none;
  opacity: 0;
  will-change: transform, opacity;
  transition: opacity 0.8s var(--ease-soft);
  /* Warm accent at a peak of ~8% alpha, gaussian-ish falloff to nothing. */
  background: radial-gradient(
    closest-side,
    theme('colors.accent-hover / 8%') 0%,
    theme('colors.accent-hover / 7%') 20%,
    theme('colors.accent-hover / 4.8%') 40%,
    theme('colors.accent-hover / 2.5%') 60%,
    theme('colors.accent-hover / 0.8%') 80%,
    theme('colors.accent-hover / 0%') 100%
  );
}
.cursor-glow.is-visible {
  opacity: 1;
}
</style>
