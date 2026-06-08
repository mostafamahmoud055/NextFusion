<script setup>
import { useI18n } from 'vue-i18n'

const {
  company,
  processTeam,
  processHighlights,
  processPrinciples,
  processEngagement,
  processRoleGroups,
  localePath
} = useSiteData()
const { t } = useI18n()

usePageSeo('process')

const pageRef = ref(null)
useFadeIn(pageRef)
</script>

<template>
  <div ref="pageRef">
    <PageHeader
      :title="t('process.title')"
      :description="t('process.subtitle')"
    />

    <!-- Highlights -->
    <UiContainer extra-class="!pt-0">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 py-12 border-y border-white/8">
        <div
          v-for="item in processHighlights"
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

    <!-- Overview + flow -->
    <UiContainer backdrop="process" surface>
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-14 lg:mb-16">
        <div class="nf-animate">
          <UiSectionHeader
            :title="t('process.overview.title')"
            :description="t('process.overview.description')"
          />
          <div class="nf-glass p-6 lg:p-8 mt-8">
            <UIcon name="i-lucide-quote" class="size-6 text-nf-cyan/60 mb-3" />
            <p class="text-white font-medium leading-relaxed mb-3">
              {{ t('process.quote.text') }}
            </p>
            <p class="text-sm text-slate-500">
              {{ company.tagline }}
            </p>
          </div>
        </div>

        <div class="nf-animate">
          <VisualMockup
            variant="transformation"
            :label="t('home.methodology.mockupLabel')"
          />
        </div>
      </div>

      <div class="grid sm:grid-cols-2 gap-4 mb-14 lg:mb-16 nf-animate">
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

      <div class="nf-animate">
        <p class="nf-eyebrow mb-6 text-center">
          {{ t('process.flow.label') }}
        </p>
        <ProcessFlow />
      </div>
    </UiContainer>

    <!-- Phases -->
    <UiContainer>
      <UiSectionHeader
        :title="t('process.phases.title')"
        :description="t('process.phases.description')"
      />
      <ProcessPhases />
    </UiContainer>

    <!-- Engagement models -->
    <UiContainer surface>
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

    <!-- Team -->
    <UiContainer>
      <UiSectionHeader
        :title="t('process.team.title')"
        :description="t('process.team.description')"
      />
      <div class="grid md:grid-cols-3 gap-6 lg:gap-8">
        <div
          v-for="item in processTeam"
          :key="item.title"
          class="nf-glass p-8 nf-animate text-center group hover:border-white/12 transition-colors"
        >
          <div class="inline-flex items-center justify-center size-16 rounded-2xl bg-nf-cyan/10 border border-nf-cyan/18 mb-5 group-hover:bg-nf-cyan/12 transition-colors">
            <span class="text-xl font-bold text-nf-cyan">
              {{ item.stat }}
            </span>
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

    <!-- Team structure -->
    <UiContainer surface>
      <UiSectionHeader
        :title="t('process.structure.title')"
        :description="t('process.structure.description')"
      />
      <div class="space-y-10 lg:space-y-12">
        <div
          v-for="group in processRoleGroups"
          :key="group.title"
          class="nf-animate"
        >
          <div class="mb-5">
            <h3 class="text-lg font-semibold text-white mb-1">
              {{ group.title }}
            </h3>
            <p class="text-sm text-slate-500">
              {{ group.description }}
            </p>
          </div>
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <div
              v-for="role in group.roles"
              :key="role.key"
              class="nf-glass p-5 flex items-start gap-3"
            >
              <div class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/8">
                <UIcon :name="role.icon" class="size-4 text-nf-cyan" />
              </div>
              <div>
                <h4 class="font-semibold text-white text-sm mb-1">
                  {{ role.title }}
                </h4>
                <p class="text-xs text-slate-500 leading-relaxed">
                  {{ role.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UiContainer>

    <!-- Related -->
    <UiContainer extra-class="!pt-0">
      <div class="nf-glass p-8 lg:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 nf-animate">
        <div>
          <h3 class="text-lg font-semibold text-white mb-2">
            {{ t('process.related.title') }}
          </h3>
          <p class="text-sm text-slate-500 max-w-xl">
            {{ t('process.related.description') }}
          </p>
        </div>
        <div class="flex flex-wrap gap-3 shrink-0">
          <UButton
            :to="localePath('/services')"
            :label="t('nav.services')"
            class="nf-btn-ghost text-white"
            trailing-icon="i-lucide-arrow-right"
          />
          <UButton
            :to="localePath('/consulting')"
            :label="t('nav.consulting')"
            class="nf-btn-ghost text-white"
            trailing-icon="i-lucide-arrow-right"
          />
        </div>
      </div>
    </UiContainer>

    <div class="pb-24 lg:pb-32">
      <CTASection
        :title="t('process.cta.title')"
        :description="t('process.cta.description')"
        :primary-label="t('common.getInTouch')"
      />
    </div>
  </div>
</template>
