<script setup>
import { useI18n } from 'vue-i18n'
import { useLocalePath } from '#i18n'

const { t } = useI18n()
const localePath = useLocalePath()

defineProps({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  primaryLabel: { type: String, default: '' },
  primaryTo: { type: String, default: '/contact' }
})
</script>

<template>
  <UiContainer backdrop="cta" surface>
    <UiReveal>
      <div class="nf-featured-panel px-8 py-14 lg:px-16 lg:py-16 text-center max-w-3xl mx-auto">
        <h2 class="nf-heading mb-4">
          {{ title || t('home.cta.title') }}
        </h2>
        <p class="nf-lead text-base mb-8">
          {{ description || t('home.cta.description') }}
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <UButton
            :to="localePath(primaryTo)"
            :label="primaryLabel || t('common.requestDemo')"
            size="lg"
            trailing-icon="i-lucide-arrow-right"
            class="nf-btn-primary text-white border-0 px-8"
          />
          <UButton
            :to="localePath('/contact')"
            :label="t('common.contactUs')"
            size="lg"
            class="nf-btn-ghost text-white px-8"
          />
        </div>
      </div>
    </UiReveal>
  </UiContainer>
</template>
