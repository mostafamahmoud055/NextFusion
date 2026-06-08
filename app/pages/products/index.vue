<script setup>
import { useI18n } from 'vue-i18n'

const { products } = useSiteData()
const { t } = useI18n()

usePageSeo('products')

const pageRef = ref(null)
useFadeIn(pageRef)
</script>

<template>
  <div ref="pageRef">
    <PageHeader
      :title="t('products.title')"
      :description="t('products.subtitle')"
    />

    <UiContainer backdrop="products" surface>
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-12">
        <UAlert
          icon="i-lucide-info"
          color="info"
          variant="subtle"
          :title="t('products.alert.title')"
          :description="t('products.alert.description')"
          class="nf-animate border border-white/10 bg-white/5"
          data-reveal="fade"
        />
        <VisualMockup
          variant="erp"
          :label="t('services.erp.mockupLabel')"
          class="hidden lg:block"
        />
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <ProductCard
          v-for="product in products"
          :key="product.slug"
          :product="product"
        />
      </div>
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
