<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const { t } = useI18n()
const localePath = useLocalePath()

const isNotFound = computed(() => props.error.statusCode === 404)
const code = computed(() => (isNotFound.value ? t('error.notFoundCode') : t('error.genericCode')))
const title = computed(() => (isNotFound.value ? t('error.notFoundTitle') : t('error.genericTitle')))
const text = computed(() => (isNotFound.value ? t('error.notFoundText') : t('error.genericText')))

// error.vue replaces app.vue, so the html lang/dir that app.vue sets from
// useLocaleHead() has to be repeated here.
const i18nHead = useLocaleHead()

// Error pages must not be indexed. clearError also resets the URL to home.
useHead(() => ({
  htmlAttrs: { lang: i18nHead.value.htmlAttrs?.lang, dir: i18nHead.value.htmlAttrs?.dir },
  meta: [{ name: 'robots', content: 'noindex' }]
}))
useSeoMeta({ title: () => `${title.value} — ${t('nav.brand')}` })

function goHome() {
  clearError({ redirect: localePath('/') })
}
</script>

<template>
  <div class="flex min-h-screen flex-col text-primary">
    <TheBackground />

    <header class="border-b border-hairline">
      <div class="mx-auto flex h-16 max-w-7xl items-center px-6">
        <a :href="localePath('/')" class="flex items-center gap-3" @click.prevent="goHome">
          <span
            class="relative flex h-8 w-8 items-center justify-center border border-hairline bg-surface font-mono text-xs font-medium tracking-wider text-primary"
          >
            <span class="absolute -top-1 -left-1 font-mono text-[10px] leading-none text-accent-hover">[</span>
            DA
            <span class="absolute -bottom-1 -right-1 font-mono text-[10px] leading-none text-accent-hover">]</span>
          </span>
          <span class="font-sans text-base font-medium tracking-tight text-primary">{{ t('nav.brand') }}</span>
        </a>
      </div>
    </header>

    <main class="mx-auto flex w-full max-w-7xl flex-1 items-center px-6 py-20">
      <div>
        <p class="mb-6 font-mono text-xs uppercase tracking-widest text-secondary">
          <span class="text-accent-hover">//</span> {{ code }}
        </p>
        <h1 class="mb-5 max-w-3xl font-sans text-4xl font-bold leading-[1.1] tracking-tight text-primary sm:text-5xl">
          {{ title }}
        </h1>
        <p class="mb-10 max-w-xl font-sans text-lg text-secondary sm:text-xl">
          {{ text }}
        </p>
        <a
          :href="localePath('/')"
          class="inline-flex h-12 items-center gap-2.5 border border-hairline px-5 font-mono text-[13px] uppercase tracking-wide text-primary transition-all hover:-translate-y-0.5 hover:border-accent-hover"
          @click.prevent="goHome"
        >
          <Icon name="lucide:arrow-left" class="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
          {{ t('error.home') }}
        </a>
      </div>
    </main>
  </div>
</template>
