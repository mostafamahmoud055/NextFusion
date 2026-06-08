<script setup>
import { useI18n } from 'vue-i18n'

const { industries } = useSiteData()
const { t } = useI18n()

usePageSeo('industries')

const pageRef = ref(null)
useFadeIn(pageRef)
</script>

<template>
  <div ref="pageRef">
    <PageHeader
      :title="t('industries.title')"
      :description="t('industries.subtitle')"
    />

    <UiContainer>
      <p class="text-slate-400 leading-relaxed max-w-3xl mx-auto text-center mb-12">
        {{ t('industries.intro') }}
      </p>

      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <IndustryCard
          v-for="industry in industries"
          :key="industry.key"
          :industry="industry"
        />
      </div>
    </UiContainer>

    <div class="pb-24 lg:pb-32">
      <CTASection
        :title="t('industries.cta.title')"
        :description="t('industries.cta.description')"
        :primary-label="t('common.contactUs')"
      />
    </div>
  </div>
</template>
