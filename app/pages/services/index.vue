<script setup>
import { useI18n } from 'vue-i18n'

const { services } = useSiteData()
const { t } = useI18n()

usePageSeo('services')

const pageRef = ref(null)
useFadeIn(pageRef)
</script>

<template>
  <div ref="pageRef">
    <PageHeader
      :title="t('services.title')"
      :description="t('services.subtitle')"
    />

    <UiContainer extra-class="!pt-0" backdrop="services" surface>
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-12 lg:mb-14">
        <p class="text-slate-400 leading-relaxed nf-animate nf-lead !max-w-none">
          {{ t('services.intro') }}
        </p>
        <VisualMockup
          variant="dashboard"
          :label="t('home.hero.mockupLabel')"
          class="hidden lg:block"
        />
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <ServiceCard
          v-for="service in services"
          :key="service.slug"
          :service="service"
        />
      </div>
    </UiContainer>

    <div class="pb-24 lg:pb-32">
      <CTASection
        :title="t('services.cta.title')"
        :description="t('services.cta.description')"
        :primary-label="t('common.getInTouch')"
      />
    </div>
  </div>
</template>
