<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section id="inicio" class="relative overflow-hidden">
    <!-- Subtle background grid, slow seamless drift, disabled under prefers-reduced-motion -->
    <div
      class="motion-safe:animate-grid-drift pointer-events-none fixed inset-0 z-0 grid-bg opacity-60"
      aria-hidden="true"
    />
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
              class="flex items-center gap-2 border border-hairline bg-surface px-2 py-0.5 font-mono text-[11px] uppercase tracking-widest text-accent"
            >
              <span class="h-1.5 w-1.5 bg-accent" />
              {{ t('hero.eyebrow') }}
            </div>
          </div>

          <h1
            class="mb-6 font-sans text-5xl font-bold leading-[1.05] tracking-tight text-primary motion-safe:animate-fade-up sm:text-6xl md:text-7xl [animation-delay:80ms]"
          >
            {{ t('hero.name') }}
          </h1>

          <p
            class="mb-4 max-w-2xl font-sans text-xl font-normal leading-snug text-primary/95 motion-safe:animate-fade-up sm:text-2xl [animation-delay:160ms]"
          >
            {{ t('hero.statement') }}
          </p>

          <p
            class="mb-8 max-w-xl font-sans text-sm font-normal leading-relaxed text-secondary motion-safe:animate-fade-up sm:text-base [animation-delay:240ms]"
          >
            {{ t('hero.supporting') }}
          </p>

          <div class="mb-10 flex flex-wrap items-center gap-4 motion-safe:animate-fade-up [animation-delay:320ms]">
            <a
              href="#proyectos"
              class="group flex h-11 items-center gap-3 border border-hairline bg-surface px-6 font-mono text-xs uppercase tracking-wider text-primary transition-all hover:-translate-y-0.5 hover:border-accent"
            >
              <span class="h-1.5 w-1.5 bg-accent transition-transform group-hover:scale-125" />
              <span>{{ t('hero.ctaPrimary') }}</span>
              <span class="font-mono text-secondary transition-colors group-hover:text-accent">→</span>
            </a>

            <a
              href="/cv/diego-amado-cv.pdf"
              class="flex h-11 items-center gap-2 border border-transparent px-5 font-mono text-xs uppercase tracking-wider text-secondary transition-all hover:-translate-y-0.5 hover:border-hairline hover:text-primary"
            >
              <span>{{ t('hero.ctaSecondary') }}</span>
              <span class="font-mono text-accent">↓</span>
            </a>
          </div>

          <div class="flex flex-wrap items-center gap-4 border-t border-hairline pt-6 motion-safe:animate-fade-up [animation-delay:400ms]">
            <span class="relative flex h-2 w-2">
              <span class="absolute inline-flex h-full w-full animate-ping bg-accent opacity-75 motion-reduce:animate-none" />
              <span class="relative inline-flex h-2 w-2 bg-accent" />
            </span>
            <span class="font-mono text-xs font-medium uppercase tracking-widest text-secondary">
              {{ t('hero.availability') }}
            </span>
          </div>
        </div>

        <!-- Right: viewfinder-framed hero photo -->
        <div class="relative motion-safe:animate-fade-up lg:col-span-5 [animation-delay:200ms]">
          <div class="relative border border-hairline bg-surface/50 p-2.5">
            <div class="absolute -top-1 -left-1 h-3 w-3 border-t border-l border-accent" aria-hidden="true" />
            <div class="absolute -top-1 -right-1 h-3 w-3 border-t border-r border-accent" aria-hidden="true" />
            <div class="absolute -bottom-1 -left-1 h-3 w-3 border-b border-l border-accent" aria-hidden="true" />
            <div class="absolute -bottom-1 -right-1 h-3 w-3 border-b border-r border-accent" aria-hidden="true" />

            <div class="mb-2 flex items-center justify-between border-b border-hairline px-1 pb-2 font-mono text-[10px] text-secondary">
              <span class="tracking-widest">FIG. 01 // DEV_WORKSPACE</span>
              <span class="text-secondary/60 tracking-widest">REF · IA</span>
            </div>

            <div class="relative aspect-[4/3] overflow-hidden border border-hairline bg-bg">
              <img
                src="/images/hero-placeholder-ai.jpg"
                :alt="t('hero.photoAlt')"
                width="1200"
                height="896"
                loading="eager"
                fetchpriority="high"
                class="h-full w-full object-cover grayscale-[92%] contrast-[108%] brightness-[97%]"
              >
            </div>

            <div class="mt-2 flex items-center justify-between border-t border-hairline px-1 pt-2 font-mono text-[10px] text-secondary">
              <span class="text-secondary/80">PLACEHOLDER // POR REEMPLAZAR</span>
              <span class="font-mono text-accent">EST. 2025</span>
            </div>
          </div>

          <div class="mt-2.5 flex items-center justify-between px-1 font-mono text-[10px] text-secondary/60">
            <span>// HARDWARE & COGNITIVE CRAFT</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
