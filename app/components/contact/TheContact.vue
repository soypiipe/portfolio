<script setup lang="ts">
import { contactActions } from '~/data/contact'

const { t } = useI18n()

const hasPendingChannel = contactActions.some((action) => !action.href)
</script>

<template>
  <section id="contacto" class="border-t border-hairline">
    <div class="mx-auto max-w-7xl px-6 py-20 md:py-28">
      <div class="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <div v-reveal class="lg:col-span-3">
          <div class="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-secondary">
            <span class="text-accent-hover">06.</span>
            <span>{{ t('contact.eyebrow') }}</span>
          </div>
        </div>

        <div class="lg:col-span-9">
          <h2 v-reveal="80" class="mb-5 max-w-3xl font-sans text-4xl font-bold leading-[1.1] tracking-tight text-primary sm:text-5xl">
            {{ t('contact.heading') }}
          </h2>
          <p v-reveal="160" class="mb-10 max-w-xl font-sans text-lg text-secondary sm:text-xl">
            {{ t('contact.supporting') }}
          </p>

          <ul v-reveal="240" class="flex flex-wrap gap-4">
            <li v-for="action in contactActions" :key="action.key">
              <!-- Channels without a confirmed href stay as a bare <a>: not
                   focusable, not a link, just a dimmed label. -->
              <a
                v-if="action.href"
                :href="action.href"
                :target="action.external ? '_blank' : undefined"
                :rel="action.external ? 'noopener noreferrer' : undefined"
                class="inline-flex items-center gap-2.5 border border-hairline px-5 py-3 font-mono text-[13px] uppercase tracking-wide text-primary transition-all hover:-translate-y-0.5 hover:border-accent-hover"
              >
                <Icon :name="action.icon" class="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
                {{ t(`contact.actions.${action.key}`) }}
              </a>
              <a
                v-else
                aria-disabled="true"
                class="inline-flex items-center gap-2.5 border border-hairline px-5 py-3 font-mono text-[13px] uppercase tracking-wide text-secondary/80"
              >
                <Icon :name="action.icon" class="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
                {{ t(`contact.actions.${action.key}`) }}
              </a>
            </li>
          </ul>

          <p v-if="hasPendingChannel" class="mt-5 font-mono text-[13px] text-secondary/80">
            {{ t('contact.pendingNote') }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
