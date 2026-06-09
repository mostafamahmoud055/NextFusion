<script setup>
import { useI18n } from 'vue-i18n'

defineProps({
  service: { type: Object, required: true }
})

const { t } = useI18n()
</script>

<template>
  <NuxtLink
    :to="service.to"
    class="nf-service-card nf-card p-8 h-full flex flex-col group nf-animate"
  >
    <div class="flex items-start gap-4 mb-6">
      <div class="nf-icon-box flex size-12 shrink-0 items-center justify-center rounded-lg group-hover:bg-nf-cyan/12">
        <UIcon
          :name="service.icon"
          class="size-6 text-nf-cyan"
        />
      </div>
      <div class="flex-1 min-w-0">
        <h3 class="font-semibold text-white text-lg mb-2 group-hover:text-nf-cyan/80 transition-colors">
          {{ service.title }}
        </h3>
        <p
          v-if="service.shortDescription"
          class="text-slate-500 text-sm leading-relaxed"
        >
          {{ service.shortDescription }}
        </p>
      </div>
    </div>
    <span class="inline-flex items-center gap-1 text-sm text-nf-cyan font-medium mt-auto">
      {{ t('common.learnMore') }}
      <UIcon name="i-lucide-arrow-right" class="size-4 group-hover:translate-x-0.5 transition-transform" />
    </span>
  </NuxtLink>
</template>
