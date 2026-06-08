<script setup>
import { useI18n } from 'vue-i18n'

defineProps({
  product: { type: Object, required: true }
})

const { t } = useI18n()
</script>

<template>
  <UiGlassCard class="nf-product-card nf-animate h-full flex flex-col">
    <div class="flex items-start justify-between gap-3 mb-4">
      <div class="flex size-12 items-center justify-center rounded-lg bg-white/5 border border-white/8">
        <UIcon
          :name="product.icon"
          class="size-6 text-nf-cyan"
        />
      </div>
      <UBadge
        :label="product.status"
        :color="product.statusColor"
        variant="subtle"
        class="border border-white/8"
      />
    </div>
    <h3 class="font-semibold text-white text-lg mb-2">
      {{ product.name }}
    </h3>
    <p class="text-slate-500 text-sm leading-relaxed flex-1 mb-4">
      {{ product.description }}
    </p>
    <UButton
      v-if="product.to"
      :to="product.to"
      :label="t('common.learnMore')"
      variant="ghost"
      trailing-icon="i-lucide-arrow-right"
      class="self-start text-nf-cyan -ml-2"
    />
  </UiGlassCard>
</template>
