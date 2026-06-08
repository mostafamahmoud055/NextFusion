<script setup>
import { useI18n } from 'vue-i18n'

const { company, values, homePillars, homeHighlights, localePath } = useSiteData()
const { t } = useI18n()

usePageSeo('about')

const pageRef = ref(null)
useFadeIn(pageRef)
</script>

<template>
  <div ref="pageRef">
    <PageHeader
      :title="t('about.title')"
      :description="t('about.subtitle')"
    />

    <!-- Story -->
    <UiContainer backdrop="about" surface>
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div class="nf-animate">
          <h2 class="nf-heading mb-6">
            {{ t('about.story.title') }}
          </h2>
          <div class="space-y-4">
            <p class="text-slate-400 leading-relaxed">
              {{ t('about.story.p1') }}
            </p>
            <p class="text-slate-400 leading-relaxed">
              {{ t('about.story.p2') }}
            </p>
            <p class="text-slate-400 leading-relaxed">
              {{ t('about.story.p3') }}
            </p>
          </div>
          <div class="nf-glass p-6 lg:p-8 mt-8">
            <UIcon
              name="i-lucide-quote"
              class="size-6 text-nf-cyan/60 mb-3"
            />
            <p class="text-base text-white font-medium leading-relaxed mb-3">
              {{ company.teamExpertise }}
            </p>
            <p class="text-sm text-slate-500">
              {{ company.tagline }}
            </p>
          </div>
        </div>

        <div class="nf-animate">
          <VisualMockup
            variant="erp"
            :label="t('home.about.mockupLabel')"
          />
        </div>
      </div>
    </UiContainer>

    <!-- Highlights -->
    <UiContainer extra-class="!pt-0">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-10 py-12 border-y border-white/8">
        <div
          v-for="item in homeHighlights"
          :key="item.label"
          class="text-center nf-animate"
        >
          <div class="nf-stat-value mb-2">
            {{ item.value }}
          </div>
          <div class="text-sm text-slate-400">
            {{ item.label }}
          </div>
        </div>
      </div>
    </UiContainer>

    <!-- Vision & Mission -->
    <UiContainer>
      <div class="grid lg:grid-cols-2 gap-6 lg:gap-8">
        <div class="nf-glass p-8 lg:p-10 h-full nf-animate">
          <div class="flex size-12 items-center justify-center rounded-lg bg-white/5 border border-white/8 mb-6">
            <UIcon name="i-lucide-eye" class="size-6 text-nf-cyan" />
          </div>
          <h2 class="text-xl font-semibold text-white mb-4">
            {{ t('about.vision.title') }}
          </h2>
          <p class="text-slate-400 leading-relaxed">
            {{ t('about.vision.text') }}
          </p>
        </div>

        <div class="nf-glass p-8 lg:p-10 h-full nf-animate">
          <div class="flex size-12 items-center justify-center rounded-lg bg-white/5 border border-white/8 mb-6">
            <UIcon name="i-lucide-target" class="size-6 text-nf-cyan" />
          </div>
          <h2 class="text-xl font-semibold text-white mb-4">
            {{ t('about.mission.title') }}
          </h2>
          <p class="text-slate-400 leading-relaxed">
            {{ t('about.mission.text') }}
          </p>
        </div>
      </div>
    </UiContainer>

    <!-- Approach -->
    <UiContainer>
      <UiSectionHeader
        :title="t('home.team.title')"
        :description="t('home.team.description')"
      />
      <div class="grid md:grid-cols-3 gap-6 lg:gap-8">
        <div
          v-for="pillar in homePillars"
          :key="pillar.key"
          class="nf-glass p-8 nf-animate"
        >
          <h3 class="text-lg font-semibold text-white mb-3">
            {{ pillar.title }}
          </h3>
          <p class="text-sm text-slate-400 leading-relaxed">
            {{ pillar.description }}
          </p>
        </div>
      </div>
    </UiContainer>

    <!-- Values -->
    <UiContainer>
      <UiSectionHeader
        :title="t('about.values.title')"
        :description="t('about.values.description')"
      />
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="value in values"
          :key="value.title"
          class="nf-glass p-6 nf-animate"
        >
          <div class="flex size-11 items-center justify-center rounded-lg bg-white/5 border border-white/8 mb-4">
            <UIcon
              :name="value.icon"
              class="size-5 text-nf-cyan"
            />
          </div>
          <h3 class="font-semibold text-white mb-2">
            {{ value.title }}
          </h3>
          <p class="text-sm text-slate-500 leading-relaxed">
            {{ value.description }}
          </p>
        </div>
      </div>
    </UiContainer>

    <!-- Methodology -->
    <UiContainer>
      <UiSectionHeader
        :title="t('home.methodology.title')"
        :description="t('home.methodology.description')"
      />
      <MethodologyTimeline />
      <div class="mt-12 text-center nf-animate">
        <UButton
          :to="localePath('/process')"
          :label="t('about.methodology.cta')"
          class="nf-btn-ghost text-white"
          trailing-icon="i-lucide-arrow-right"
        />
      </div>
    </UiContainer>

    <!-- Regional presence -->
    <UiContainer>
      <UiSectionHeader
        :title="t('about.presence.title')"
        :description="t('about.presence.description')"
      />
      <div class="grid sm:grid-cols-2 gap-6 max-w-3xl">
        <div
          v-for="location in company.locations"
          :key="location.city"
          class="nf-glass p-6 nf-animate"
        >
          <div class="flex items-start gap-4">
            <div class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/8">
              <UIcon name="i-lucide-map-pin" class="size-5 text-nf-cyan" />
            </div>
            <div>
              <h3 class="font-semibold text-white mb-1">
                {{ location.city }}, {{ location.country }}
              </h3>
              <p class="text-sm text-slate-500 leading-relaxed">
                {{ location.address }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </UiContainer>

    <!-- Leadership -->
    <UiContainer extra-class="!pt-0">
      <div class="nf-glass p-8 lg:p-10 text-center max-w-2xl mx-auto nf-animate">
        <div class="flex size-14 items-center justify-center rounded-lg bg-white/5 border border-white/8 mx-auto mb-5">
          <UIcon
            name="i-lucide-users-round"
            class="size-7 text-slate-400"
          />
        </div>
        <h3 class="font-semibold text-white text-lg mb-2">
          {{ t('about.leadership.title') }}
        </h3>
        <p class="text-sm text-slate-500 leading-relaxed">
          {{ t('about.leadership.description') }}
        </p>
      </div>
    </UiContainer>

    <div class="pb-24 lg:pb-32">
      <CTASection
        :title="t('about.cta.title')"
        :description="t('about.cta.description')"
        :primary-label="t('common.contactUs')"
      />
    </div>
  </div>
</template>
