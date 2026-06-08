<script setup>
import { useI18n } from 'vue-i18n'

const props = defineProps({
  serviceKey: { type: String, required: true },
  seoKey: { type: String, required: true }
})

const { getServiceDetail, getRelatedServices, localePath } = useSiteData()
const service = computed(() => getServiceDetail(props.serviceKey))
const relatedServices = computed(() => getRelatedServices(props.serviceKey))
const { t } = useI18n()

const SERVICE_MOCKUPS = {
  erp: 'erp',
  digitalTransformation: 'transformation',
  softwareDevelopment: 'dashboard',
  integration: 'transformation',
  businessIntelligence: 'analytics',
  ecommerce: 'dashboard'
}

const mockupVariant = computed(() => SERVICE_MOCKUPS[props.serviceKey] || 'dashboard')
const mockupLabel = computed(() => t(`services.${props.serviceKey}.mockupLabel`))

usePageSeo(props.seoKey)

const pageRef = ref(null)
useFadeIn(pageRef)

const featuresRef = ref(null)
const benefitsRef = ref(null)

useRevealGroup(featuresRef, '.nf-service-feature')
useRevealGroup(benefitsRef, '.nf-service-benefit')
</script>

<template>
  <div ref="pageRef">
    <!-- Hero -->
    <ServiceHero
      :eyebrow="service.eyebrow"
      :tagline="service.heroTagline"
      :title="service.title"
      :subtitle="service.shortDescription"
      :description="service.description"
      :icon="service.icon"
      :mockup-variant="mockupVariant"
      :mockup-label="mockupLabel"
    >
      <div class="flex flex-wrap gap-4">
        <UButton
          :to="localePath('/contact')"
          :label="t('common.contactUs')"
          size="lg"
          class="nf-btn-primary text-white border-0 px-8"
          trailing-icon="i-lucide-arrow-right"
        />
        <UButton
          :to="localePath('/process')"
          :label="t('services.detail.viewProcess')"
          size="lg"
          class="nf-btn-ghost text-white px-8"
          trailing-icon="i-lucide-arrow-right"
        />
      </div>
    </ServiceHero>

    <!-- Overview -->
    <UiContainer backdrop="services" surface>
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <div class="nf-animate">
          <h2 class="nf-heading text-2xl mb-6">
            {{ service.overview.title }}
          </h2>
          <div class="space-y-4 max-w-3xl">
            <p
              v-for="(paragraph, idx) in service.overview.paragraphs"
              :key="idx"
              class="text-slate-400 leading-relaxed"
            >
              {{ paragraph }}
            </p>
          </div>
        </div>

        <div class="nf-glass p-8 lg:p-10 nf-animate">
          <div class="flex size-14 items-center justify-center rounded-xl bg-nf-cyan/10 border border-nf-cyan/20 mb-6">
            <UIcon :name="service.icon" class="size-7 text-nf-cyan" />
          </div>
          <p class="text-lg text-white font-medium leading-relaxed mb-4">
            {{ service.overview.highlight }}
          </p>
          <p class="text-sm text-slate-500 leading-relaxed">
            {{ t('services.detail.overviewNote') }}
          </p>
        </div>
      </div>
    </UiContainer>

    <!-- Features -->
    <UiContainer v-if="service.featureBlocks.length">
      <UiSectionHeader
        :title="t('services.detail.executionTitle')"
        :description="t('services.detail.executionDescription')"
        align="center"
      />
      <p class="nf-eyebrow text-center mb-10 nf-animate">
        {{ t('services.detail.features') }}
      </p>
      <div
        ref="featuresRef"
        class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
        data-reveal-container
        data-reveal-group="fade-up"
      >
        <div
          v-for="feature in service.featureBlocks"
          :key="feature.title"
          class="nf-service-feature nf-glass p-6 lg:p-8"
        >
          <div class="flex size-11 items-center justify-center rounded-lg bg-white/5 border border-white/8 mb-5">
            <UIcon :name="feature.icon" class="size-5 text-nf-cyan" />
          </div>
          <h3 class="font-semibold text-white mb-3">
            {{ feature.title }}
          </h3>
          <p class="text-sm text-slate-500 leading-relaxed">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </UiContainer>

    <!-- Process -->
    <UiContainer
      v-if="service.process.steps.length"
      backdrop="process"
      surface
    >
      <UiSectionHeader
        :title="service.process.title"
        :description="service.process.description"
      />
      <ServiceSteps :steps="service.process.steps" />
    </UiContainer>

    <!-- Benefits -->
    <UiContainer v-if="service.benefits.items.length">
      <UiSectionHeader
        :title="service.benefits.title"
        :description="service.benefits.description"
      />
      <div
        ref="benefitsRef"
        class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
        data-reveal-container
        data-reveal-group="scale"
      >
        <div
          v-for="benefit in service.benefits.items"
          :key="benefit.title"
          class="nf-service-benefit nf-glass p-6"
        >
          <div class="flex items-start gap-4">
            <div class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/8">
              <UIcon :name="benefit.icon" class="size-5 text-nf-cyan" />
            </div>
            <div>
              <h3 class="font-semibold text-white text-sm mb-2">
                {{ benefit.title }}
              </h3>
              <p class="text-sm text-slate-500 leading-relaxed">
                {{ benefit.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </UiContainer>

    <!-- Related services -->
    <UiContainer v-if="relatedServices.length">
      <UiSectionHeader
        :title="t('services.detail.related')"
        :description="t('services.detail.relatedDescription')"
      />
      <div class="grid md:grid-cols-3 gap-6">
        <ServiceCard
          v-for="item in relatedServices"
          :key="item.slug"
          :service="item"
        />
      </div>
      <div class="mt-10 text-center nf-animate">
        <UButton
          :to="localePath('/services')"
          :label="t('services.detail.allServices')"
          class="nf-btn-ghost text-white"
          icon="i-lucide-arrow-left"
        />
      </div>
    </UiContainer>

    <div class="pb-24 lg:pb-32">
      <CTASection
        :title="service.cta.title"
        :description="service.cta.description"
        :primary-label="t('common.getInTouch')"
      />
    </div>
  </div>
</template>
