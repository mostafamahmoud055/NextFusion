<script setup>
import { useI18n } from 'vue-i18n'

const props = defineProps({
  productKey: { type: String, required: true },
  seoKey: { type: String, required: true }
})

const { getProductDetail } = useSiteData()
const product = computed(() => getProductDetail(props.productKey))
const { t } = useI18n()

usePageSeo(props.seoKey)
</script>

<template>
  <div>
    <PageHeader
      :title="product.name"
      :description="product.description"
    />

    <UiContainer>
      <UiGlassCard padding="p-8 lg:p-10">
        <UBadge
          :label="product.status"
          :color="product.statusColor"
          variant="subtle"
          class="mb-6 border border-white/10"
        />
        <p class="text-slate-400 leading-relaxed text-lg max-w-3xl mb-8">
          {{ product.longDescription }}
        </p>
        <h2 class="text-lg font-semibold text-white mb-4">
          {{ t('products.plannedFeatures') }}
        </h2>
        <ul class="grid sm:grid-cols-2 gap-3">
          <li
            v-for="feature in product.features"
            :key="feature"
            class="flex items-start gap-3 text-slate-400 text-sm"
          >
            <UIcon
              name="i-lucide-check-circle"
              class="size-4 text-purple-400 shrink-0 mt-0.5"
            />
            {{ feature }}
          </li>
        </ul>
      </UiGlassCard>
    </UiContainer>

    <div class="pb-24 lg:pb-32">
      <CTASection
        :title="t('products.cta.title')"
        :description="t('products.cta.description')"
        :primary-label="t('common.requestDemo')"
      />
    </div>
  </div>
</template>
