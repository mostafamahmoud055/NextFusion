<script setup>
import { useI18n } from 'vue-i18n'

const {
  consultingServices,
  consultingHighlights,
  consultingWhy,
  company,
  processPrinciples,
  processEngagement,
  localePath
} = useSiteData()
const { t } = useI18n()

usePageSeo('consulting')

const pageRef = ref(null)
useFadeIn(pageRef)
</script>

<template>
  <div ref="pageRef">
    <PageHeader
      :title="t('consulting.title')"
      :description="t('consulting.subtitle')"
    />

    <!-- Highlights -->
    <UiContainer extra-class="!pt-0">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 py-12 border-y border-white/8">
        <div
          v-for="item in consultingHighlights"
          :key="item.label"
          class="text-center nf-animate"
        >
          <div class="nf-stat-value text-nf-cyan/90 mb-2">
            {{ item.value }}
          </div>
          <div class="text-sm text-slate-400">
            {{ item.label }}
          </div>
        </div>
      </div>
    </UiContainer>

    <!-- Overview -->
    <UiContainer backdrop="about" surface>
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div class="nf-animate">
          <UiSectionHeader
            :title="t('consulting.overview.title')"
            :description="t('consulting.overview.description')"
          />
          <p class="text-slate-400 leading-relaxed mt-6 nf-lead !max-w-none">
            {{ t('consulting.intro') }}
          </p>
        </div>

        <div class="nf-animate hidden lg:block">
          <VisualMockup
            variant="analytics"
            :label="t('home.about.mockupLabel')"
          />
        </div>
      </div>

      <div class="grid sm:grid-cols-2 gap-4 mt-10 lg:mt-12 nf-animate">
        <div
          v-for="principle in processPrinciples"
          :key="principle.title"
          class="nf-glass p-5 flex gap-4"
        >
          <div class="flex size-11 shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/8">
            <UIcon :name="principle.icon" class="size-5 text-nf-cyan" />
          </div>
          <div>
            <h3 class="font-semibold text-white text-sm mb-1.5">
              {{ principle.title }}
            </h3>
            <p class="text-xs text-slate-500 leading-relaxed">
              {{ principle.description }}
            </p>
          </div>
        </div>
      </div>

      <div class="nf-glass p-6 lg:p-8 mt-8 nf-animate">
        <UIcon name="i-lucide-quote" class="size-6 text-nf-cyan/60 mb-3" />
        <p class="text-white font-medium leading-relaxed mb-3">
          {{ t('consulting.quote.text') }}
        </p>
        <p class="text-sm text-slate-500">
          {{ company.tagline }}
        </p>
      </div>
    </UiContainer>

    <!-- Practice areas -->
    <UiContainer surface>
      <UiSectionHeader
        :title="t('consulting.servicesSection.title')"
        :description="t('consulting.servicesSection.description')"
      />
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="service in consultingServices"
          :key="service.key"
          class="nf-glass p-6 lg:p-8 h-full nf-animate group hover:border-white/12 transition-colors"
        >
          <div class="flex size-12 items-center justify-center rounded-lg bg-nf-cyan/10 border border-nf-cyan/18 mb-5 group-hover:bg-nf-cyan/12 transition-colors">
            <UIcon :name="service.icon" class="size-6 text-nf-cyan" />
          </div>
          <h3 class="font-semibold text-white text-lg mb-3">
            {{ service.title }}
          </h3>
          <p class="text-sm text-slate-500 leading-relaxed">
            {{ service.description }}
          </p>
        </div>
      </div>
    </UiContainer>

    <!-- Engagement models -->
    <UiContainer>
      <UiSectionHeader
        :title="t('process.engagement.title')"
        :description="t('process.engagement.description')"
      />
      <div class="grid md:grid-cols-3 gap-6 lg:gap-8">
        <div
          v-for="item in processEngagement"
          :key="item.title"
          class="nf-glass p-8 nf-animate relative overflow-hidden"
        >
          <span class="absolute top-4 end-4 text-3xl font-bold text-white/[0.04] tabular-nums select-none">
            {{ item.step }}
          </span>
          <div class="flex size-12 items-center justify-center rounded-lg bg-white/5 border border-white/8 mb-6">
            <UIcon :name="item.icon" class="size-6 text-nf-cyan" />
          </div>
          <h3 class="text-lg font-semibold text-white mb-3">
            {{ item.title }}
          </h3>
          <p class="text-sm text-slate-500 leading-relaxed">
            {{ item.description }}
          </p>
        </div>
      </div>
    </UiContainer>

    <!-- Why consult -->
    <UiContainer surface>
      <UiSectionHeader
        :title="t('consulting.why.title')"
        :description="t('consulting.why.description')"
        align="center"
      />
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
        <div
          v-for="item in consultingWhy"
          :key="item.title"
          class="nf-glass p-6 nf-animate text-center"
        >
          <div class="inline-flex size-11 items-center justify-center rounded-lg bg-white/5 border border-white/8 mb-4">
            <UIcon :name="item.icon" class="size-5 text-nf-cyan" />
          </div>
          <h3 class="font-semibold text-white text-sm mb-2">
            {{ item.title }}
          </h3>
          <p class="text-xs text-slate-500 leading-relaxed">
            {{ item.description }}
          </p>
        </div>
      </div>
    </UiContainer>

    <!-- Methodology -->
    <UiContainer surface>
      <UiSectionHeader
        :title="t('consulting.methodology.title')"
        :description="t('consulting.methodology.description')"
      />
      <ProcessFlow />
      <div class="mt-12 flex flex-wrap justify-center gap-4 nf-animate">
        <UButton
          :to="localePath('/process')"
          :label="t('consulting.methodology.cta')"
          class="nf-btn-primary text-white border-0 px-8"
          trailing-icon="i-lucide-arrow-right"
        />
        <UButton
          :to="localePath('/contact')"
          :label="t('common.getInTouch')"
          class="nf-btn-ghost text-white px-8"
        />
      </div>
    </UiContainer>



    <div class="pb-24 lg:pb-32">
      <CTASection
        :title="t('consulting.cta.title')"
        :description="t('consulting.cta.description')"
        :primary-label="t('common.getInTouch')"
      />
    </div>
  </div>
</template>
