<script setup lang="ts">
import { cvHref } from '~/data/contact'
import { navLinks } from '~/data/navigation'

const { t, locale } = useI18n()
const { pick } = useLocalized()
const switchLocalePath = useSwitchLocalePath()

const otherLocale = computed(() => (locale.value === 'es' ? 'en' : 'es'))
// switchLocalePath carries over the current #hash. Drop it: the page keeps
// the reader's scroll position across the switch, so a stale "#contacto"
// would only mislead (and would jump there on reload).
const switchPath = computed(() => switchLocalePath(otherLocale.value).split('#')[0])
const isMobileOpen = ref(false)

function closeMobile() {
  isMobileOpen.value = false
}

// Scrollspy: highlights the nav link for whichever section is currently
// crossing the band at 40% of the viewport height. Client-only — defaults to
// "inicio" during SSR, which is correct for a fresh page load anyway.
//
// Exception: at the very bottom of the page the last section wins. On tall
// viewports the page can't scroll far enough to bring the last section (a
// short one) up to the band, so it would never be marked — not even after
// clicking its own nav link.
const activeId = ref('inicio')
const BAND = 0.4

onMounted(() => {
  const sections = [...document.querySelectorAll<HTMLElement>('main section[id]')]
  const lastId = sections[sections.length - 1]?.id
  const atBottom = () => window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2

  const observer = new IntersectionObserver(
    (entries) => {
      if (lastId && atBottom()) {
        activeId.value = lastId
        return
      }
      for (const entry of entries) {
        if (entry.isIntersecting) activeId.value = entry.target.id
      }
    },
    { rootMargin: `-${BAND * 100}% 0px -55% 0px`, threshold: 0 }
  )
  sections.forEach((section) => observer.observe(section))

  // The observer only fires when a section crosses the band, so entering and
  // leaving the bottom of the page needs its own check.
  let wasAtBottom = false
  function onScrollOrResize() {
    const bottom = atBottom()
    if (bottom === wasAtBottom) return
    wasAtBottom = bottom
    if (bottom) {
      if (lastId) activeId.value = lastId
      return
    }
    // Left the bottom: go back to the section that sits on the band.
    const y = window.innerHeight * BAND
    const current = sections.find((section) => {
      const rect = section.getBoundingClientRect()
      return rect.top <= y && rect.bottom > y
    })
    if (current) activeId.value = current.id
  }
  window.addEventListener('scroll', onScrollOrResize, { passive: true })
  window.addEventListener('resize', onScrollOrResize, { passive: true })
  onScrollOrResize()

  onUnmounted(() => {
    observer.disconnect()
    window.removeEventListener('scroll', onScrollOrResize)
    window.removeEventListener('resize', onScrollOrResize)
  })
})
</script>

<template>
  <header class="sticky top-0 z-30 border-b border-hairline bg-bg/95 backdrop-blur-sm motion-safe:animate-fade-down">
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
      <!-- Brand & monogram -->
      <NuxtLink to="#inicio" class="flex items-center gap-3" @click="closeMobile">
        <span
          class="relative flex h-8 w-8 items-center justify-center border border-hairline bg-surface font-mono text-xs font-medium tracking-wider text-primary"
        >
          <span class="absolute -top-1 -left-1 font-mono text-[10px] leading-none text-accent-hover">[</span>
          DA
          <span class="absolute -bottom-1 -right-1 font-mono text-[10px] leading-none text-accent-hover">]</span>
        </span>
        <span class="flex flex-col leading-none">
          <span class="font-sans text-base font-medium tracking-tight text-primary">{{ t('nav.brand') }}</span>
          <span class="font-mono text-[11px] uppercase tracking-widest text-secondary">// SYS.ENG</span>
        </span>
      </NuxtLink>

      <!-- Desktop links -->
      <nav :aria-label="t('nav.ariaMain')" class="hidden items-center gap-8 font-mono text-[13px] tracking-wide text-secondary xl:flex">
        <a
          v-for="link in navLinks"
          :key="link.id"
          :href="link.href"
          class="link-line flex items-center gap-1.5 transition-colors hover:text-primary"
          :class="activeId === link.href.slice(1) ? 'text-primary' : ''"
          :aria-current="activeId === link.href.slice(1) ? 'true' : undefined"
        >
          <span class="text-[11px]" :class="activeId === link.href.slice(1) ? 'text-accent-hover' : 'text-secondary/80'">{{ link.id }}.</span>
          <span>{{ t(link.labelKey) }}</span>
        </a>
      </nav>

      <div class="flex items-center gap-5">
      <!-- Trailing controls (tablet and up) -->
      <div class="hidden items-center gap-5 sm:flex">
        <NuxtLink
          :to="switchPath"
          class="flex items-center border border-hairline bg-surface/80 px-2.5 py-1.5 font-mono text-xs transition-colors hover:border-secondary"
          :aria-label="otherLocale === 'en' ? 'Switch to English' : 'Cambiar a español'"
        >
          <span :class="locale === 'es' ? 'text-accent-hover font-medium' : 'text-secondary'">ES</span>
          <span class="mx-1.5 text-hairline">/</span>
          <span :class="locale === 'en' ? 'text-accent-hover font-medium' : 'text-secondary'">EN</span>
        </NuxtLink>

        <a
          :href="pick(cvHref)"
          download
          class="link-line hidden items-center gap-1.5 font-mono text-[13px] text-secondary transition-colors hover:text-primary xl:inline-flex"
        >
          <span>{{ t('nav.cv') }}</span>
          <span class="text-accent-hover">↓</span>
        </a>

        <a
          href="#contacto"
          class="flex h-10 items-center justify-center border border-accent-hover bg-accent-hover px-5 font-sans text-[13px] font-medium tracking-wide text-bg transition-all hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0"
        >
          {{ t('nav.hablemos') }}
        </a>
      </div>

      <!-- Mobile menu button -->
      <button
        type="button"
        class="flex h-10 w-10 items-center justify-center border border-hairline text-primary xl:hidden"
        :aria-expanded="isMobileOpen"
        aria-controls="mobile-menu"
        :aria-label="isMobileOpen ? t('nav.closeMenu') : t('nav.openMenu')"
        @click="isMobileOpen = !isMobileOpen"
      >
        <svg v-if="!isMobileOpen" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M2 5h14M2 13h14" stroke="currentColor" stroke-width="1.5" />
        </svg>
        <svg v-else width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" stroke-width="1.5" />
        </svg>
      </button>
      </div>
    </div>

    <!-- Mobile full-screen menu -->
    <Transition name="menu">
      <div
        v-if="isMobileOpen"
        id="mobile-menu"
        class="flex flex-col gap-6 border-t border-hairline bg-bg px-6 py-8 xl:hidden"
      >
      <nav :aria-label="t('nav.ariaMainMobile')" class="flex flex-col gap-5 font-mono text-base text-secondary">
        <a
          v-for="link in navLinks"
          :key="link.id"
          :href="link.href"
          class="flex items-center gap-2 transition-colors hover:text-primary"
          :class="activeId === link.href.slice(1) ? 'text-primary' : ''"
          @click="closeMobile"
        >
          <span class="text-[13px]" :class="activeId === link.href.slice(1) ? 'text-accent-hover' : 'text-secondary/80'">{{ link.id }}.</span>
          <span>{{ t(link.labelKey) }}</span>
        </a>
      </nav>

      <div class="flex items-center gap-4 border-t border-hairline pt-6">
        <NuxtLink
          :to="switchPath"
          class="flex items-center border border-hairline bg-surface/80 px-2.5 py-1.5 font-mono text-xs sm:hidden"
        >
          <span :class="locale === 'es' ? 'text-accent-hover font-medium' : 'text-secondary'">ES</span>
          <span class="mx-1.5 text-hairline">/</span>
          <span :class="locale === 'en' ? 'text-accent-hover font-medium' : 'text-secondary'">EN</span>
        </NuxtLink>
        <a :href="pick(cvHref)" download class="font-mono text-[13px] text-secondary">{{ t('nav.cv') }}</a>
      </div>

      <a
        href="#contacto"
        class="flex h-12 items-center justify-center border border-accent-hover bg-accent-hover font-sans text-[15px] font-medium text-bg sm:hidden"
        @click="closeMobile"
      >
        {{ t('nav.hablemos') }}
      </a>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.menu-enter-active,
.menu-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.35s var(--ease-soft);
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
@media (prefers-reduced-motion: reduce) {
  .menu-enter-active,
  .menu-leave-active {
    transition: none;
  }
}
</style>
