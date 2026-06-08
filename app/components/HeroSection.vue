<script setup>
import { useI18n } from 'vue-i18n'
import { useLocalePath } from '#i18n'

const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <section class="relative nf-section flex items-center">
    <div class="w-full max-w-7xl mx-auto px-6">
      <div class="max-w-3xl">
        <p class="nf-eyebrow mb-4">
          {{ t('home.hero.badge') }}
        </p>

        <h1 class="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-white tracking-tight leading-tight mb-6">
          {{ t('home.hero.title') }}
        </h1>

        <p class="nf-lead mb-10">
          {{ t('home.hero.description') }}
        </p>

        <div class="flex flex-wrap gap-4">
          <UButton
            :to="localePath('/contact')"
            :label="t('common.requestDemo')"
            size="xl"
            trailing-icon="i-lucide-arrow-right"
            class="nf-btn-primary text-white border-0 px-8"
          />
          <UButton
            :to="localePath('/contact')"
            :label="t('common.contactUs')"
            size="xl"
            class="nf-btn-ghost text-white px-8"
          />
        </div>
      </div>
    </div>
  </section>
</template>
