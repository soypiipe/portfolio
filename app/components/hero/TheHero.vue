<script setup lang="ts">
import { cvHref } from '~/data/contact'

const { t } = useI18n()
const { pick } = useLocalized()
</script>

<template>
  <section id="inicio" class="relative overflow-hidden">
    <div class="pointer-events-none fixed top-16 left-6 z-20 text-[11px] font-mono text-hairline" aria-hidden="true">+</div>
    <div class="pointer-events-none fixed top-16 right-6 z-20 text-[11px] font-mono text-hairline" aria-hidden="true">+</div>
    <div class="pointer-events-none fixed bottom-12 left-6 z-20 text-[11px] font-mono text-hairline" aria-hidden="true">+</div>
    <div class="pointer-events-none fixed bottom-12 right-6 z-20 text-[11px] font-mono text-hairline" aria-hidden="true">+</div>

    <div class="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center px-6 py-8 md:py-12">
      <div class="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <!-- Left: editorial + technical content -->
        <div class="flex flex-col justify-center lg:col-span-7 lg:pr-4">
          <div class="mb-4 inline-flex w-fit items-center gap-2 motion-safe:animate-fade-up">
            <div
              class="flex items-center gap-2 border border-hairline bg-surface px-2.5 py-1 font-mono text-xs uppercase tracking-wider text-accent-hover sm:tracking-widest"
            >
              <span class="h-1.5 w-1.5 bg-accent" />
              {{ t('hero.eyebrow') }}
            </div>
          </div>

          <h1
            class="mb-6 font-sans text-5xl font-bold leading-[1.05] tracking-tight text-primary motion-safe:animate-fade-up sm:text-6xl md:text-7xl xl:text-[5.5rem] [animation-delay:100ms]"
          >
            {{ t('hero.name') }}
          </h1>

          <p
            class="mb-4 max-w-2xl font-sans text-[1.375rem] font-normal leading-snug text-primary/95 motion-safe:animate-fade-up sm:text-[1.75rem] [animation-delay:220ms]"
          >
            {{ t('hero.statement') }}
          </p>

          <p
            class="mb-8 max-w-xl font-sans text-base font-normal leading-relaxed text-secondary motion-safe:animate-fade-up sm:text-lg [animation-delay:340ms]"
          >
            {{ t('hero.supporting') }}
          </p>

          <div class="mb-10 flex flex-wrap items-center gap-4 motion-safe:animate-fade-up [animation-delay:460ms]">
            <a
              href="#proyectos"
              class="group flex h-12 items-center gap-3 border border-hairline bg-surface px-6 font-mono text-[13px] uppercase tracking-wider text-primary transition-all hover:-translate-y-0.5 hover:border-accent active:translate-y-0"
            >
              <span class="h-1.5 w-1.5 bg-accent transition-transform group-hover:scale-150" />
              <span>{{ t('hero.ctaPrimary') }}</span>
              <span class="font-mono text-secondary transition-all group-hover:translate-x-1 group-hover:text-accent-hover">→</span>
            </a>

            <a
              :href="pick(cvHref)"
              download
              class="group flex h-12 items-center gap-2 border border-transparent px-5 font-mono text-[13px] uppercase tracking-wider text-secondary transition-all hover:-translate-y-0.5 hover:border-hairline hover:text-primary active:translate-y-0"
            >
              <span>{{ t('hero.ctaSecondary') }}</span>
              <span class="font-mono text-accent-hover transition-transform group-hover:translate-y-0.5">↓</span>
            </a>
          </div>

          <div class="flex flex-wrap items-center gap-4 border-t border-hairline pt-6 motion-safe:animate-fade-up [animation-delay:580ms]">
            <span class="relative flex h-2 w-2">
              <span class="absolute inline-flex h-full w-full animate-ping bg-accent opacity-75 motion-reduce:animate-none" />
              <span class="relative inline-flex h-2 w-2 bg-accent" />
            </span>
            <span class="font-mono text-[13px] font-medium uppercase tracking-widest text-secondary">
              {{ t('hero.availability') }}
            </span>
          </div>
        </div>

        <!-- Right: viewfinder-framed hero photo -->
        <div class="relative motion-safe:animate-fade-up lg:col-span-5 [animation-delay:280ms]">
          <div class="relative border border-hairline bg-surface/50 p-2.5">
            <div class="absolute -top-1 -left-1 h-3 w-3 border-t border-l border-accent" aria-hidden="true" />
            <div class="absolute -top-1 -right-1 h-3 w-3 border-t border-r border-accent" aria-hidden="true" />
            <div class="absolute -bottom-1 -left-1 h-3 w-3 border-b border-l border-accent" aria-hidden="true" />
            <div class="absolute -bottom-1 -right-1 h-3 w-3 border-b border-r border-accent" aria-hidden="true" />

            <div class="mb-2 flex items-center justify-between border-b border-hairline px-1 pb-2 font-mono text-[11px] text-secondary">
              <span class="tracking-widest">FIG. 01 // DEV_WORKSPACE</span>
              <span class="text-secondary/80 tracking-widest">REF · IA</span>
            </div>

            <div class="relative aspect-square overflow-hidden border border-hairline bg-bg">
              <picture>
                <source
                  type="image/avif"
                  srcset="/images/hero-800.avif 800w, /images/hero-1254.avif 1254w"
                  sizes="(min-width: 1024px) 520px, calc(100vw - 80px)"
                >
                <source
                  type="image/webp"
                  srcset="/images/hero-800.webp 800w, /images/hero-1254.webp 1254w"
                  sizes="(min-width: 1024px) 520px, calc(100vw - 80px)"
                >
                <img
                  src="/images/hero-1254.jpg"
                  srcset="/images/hero-800.jpg 800w, /images/hero-1254.jpg 1254w"
                  sizes="(min-width: 1024px) 520px, calc(100vw - 80px)"
                  :alt="t('hero.photoAlt')"
                  width="1254"
                  height="1254"
                  loading="eager"
                  fetchpriority="high"
                  class="hero-photo h-full w-full object-cover"
                >
              </picture>
            </div>

            <div class="mt-2 flex items-center justify-between border-t border-hairline px-1 pt-2 font-mono text-[11px] text-secondary">
              <span class="text-secondary/80">AI ILLUSTRATION</span>
              <span class="font-mono text-accent-hover">EST. 2025</span>
            </div>
          </div>

          <div class="mt-2.5 flex items-center justify-between px-1 font-mono text-[11px] text-secondary/80">
            <span>// HARDWARE & COGNITIVE CRAFT</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Ambient camera drift: the photo very slowly pushes in and pans a few
   pixels, inside its (overflow-hidden) viewfinder frame. Transform only. */
@media (prefers-reduced-motion: no-preference) {
  .hero-photo {
    will-change: transform;
    animation: hero-photo-drift 40s ease-in-out infinite alternate;
  }
}
@keyframes hero-photo-drift {
  from {
    transform: scale(1.02) translate3d(0, 0, 0);
  }
  to {
    transform: scale(1.07) translate3d(-1.2%, -0.8%, 0);
  }
}
</style>
