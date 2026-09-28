<script setup lang="ts">
// Technical grid + a handful of crosshair marks. Everything here is
// decorative and compositor-only (transform / opacity), so it costs almost
// nothing per frame:
//
//   1. .bg-parallax — shifts up slowly as the page scrolls (scroll-driven
//      animation, no JS). Browsers without `animation-timeline` just skip it.
//   2. .bg-drift    — the grid slides one full cell (48px) in 48s, diagonally.
//      One cell = the pattern period, so the loop is seamless.
//   3. .bg-mark     — crosshairs sitting on grid intersections that fade in
//      and out. Their periods divide the drift period (48s), so they are all
//      at opacity 0 whenever the drift loop restarts — the jump is invisible.
//
// All of it is off under prefers-reduced-motion (grid stays, static).
const CELL = 48

// [column, row] in grid cells, and pulse period in seconds (must divide 48).
const marks: Array<[number, number, number]> = [
  [5, 3, 12],
  [14, 2, 16],
  [9, 8, 8],
  [21, 6, 24],
  [3, 13, 16],
  [17, 12, 12]
]
</script>

<template>
  <div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
    <div class="bg-parallax">
      <div class="bg-drift">
        <span
          v-for="[col, row, period] in marks"
          :key="`${col}-${row}`"
          class="bg-mark"
          :style="{ left: `${col * CELL}px`, top: `${row * CELL}px`, '--mark-period': `${period}s` }"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-parallax {
  position: absolute;
  inset: 0;
  /* Room for the scroll parallax to travel up without exposing the bottom. */
  bottom: -160px;
}

.bg-drift {
  position: absolute;
  /* One cell of overscan top/left so the drift never reveals an edge. */
  inset: -48px 0 0 -48px;
  background-size: 48px 48px;
  background-image:
    linear-gradient(to right, rgba(44, 38, 32, 0.45) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(44, 38, 32, 0.45) 1px, transparent 1px);
  opacity: 0.7;
}

/* Crosshair: two 1px lines, centred on a grid intersection. */
.bg-mark {
  position: absolute;
  width: 13px;
  height: 13px;
  margin: -6px 0 0 -6px;
  opacity: 0;
}
.bg-mark::before,
.bg-mark::after {
  content: '';
  position: absolute;
  background: theme('colors.accent');
}
.bg-mark::before {
  left: 6px;
  top: 0;
  width: 1px;
  height: 13px;
}
.bg-mark::after {
  top: 6px;
  left: 0;
  height: 1px;
  width: 13px;
}

@media (prefers-reduced-motion: no-preference) {
  .bg-drift {
    will-change: transform;
    animation: bg-drift 48s linear infinite;
  }
  .bg-mark {
    animation: bg-mark var(--mark-period, 12s) ease-in-out infinite;
  }
  @supports (animation-timeline: scroll()) {
    .bg-parallax {
      animation: bg-parallax linear both;
      animation-timeline: scroll(root block);
    }
  }
}

@keyframes bg-drift {
  to {
    transform: translate3d(48px, 48px, 0);
  }
}
@keyframes bg-mark {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 0.55;
  }
}
@keyframes bg-parallax {
  to {
    transform: translate3d(0, -160px, 0);
  }
}
</style>
