<script setup lang="ts">
import { navLinks } from '~/data/navigation'

const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-hairline">
    <div class="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-10 font-mono text-xs text-secondary sm:flex-row sm:justify-between">
      <div class="flex items-center gap-3">
        <span class="border border-hairline px-1.5 py-0.5 text-primary">DA</span>
        <div class="flex flex-col leading-tight">
          <span class="text-primary">{{ t('nav.brand') }}</span>
          <span class="text-secondary/70">{{ t('footer.role') }}</span>
        </div>
      </div>

      <nav aria-label="Footer" class="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
        <a v-for="link in navLinks" :key="link.id" :href="link.href" class="transition-colors hover:text-primary">
          {{ t(link.labelKey) }}
        </a>
      </nav>

      <span class="text-secondary/70">© {{ year }} Diego Amado. {{ t('footer.rights') }}</span>
    </div>
  </footer>
</template>
