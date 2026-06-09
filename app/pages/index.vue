<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const {
  services,
  products,
  industries,
  homePillars,
  homeHighlights,
  whyNextFusion,
  company,
  localePath
} = useSiteData()

usePageSeo('home')

const route = useRoute()
const { initHomeSections, isHomePage } = useActiveSection()
const pageRef = ref(null)

useFadeIn(pageRef)

const pillarIcons = {
  focus: 'i-lucide-target',
  flexible: 'i-lucide-layers',
  expertise: 'i-lucide-award'
}

function syncHomeScroll() {
  initHomeSections(route.hash)
}

function scrollToServices() {
  initHomeSections('#services')
}

onMounted(() => {
  nextTick(syncHomeScroll)
})

watch(
  () => route.hash,
  () => {
    if (isHomePage(route.path)) {
      nextTick(syncHomeScroll)
    }
  }
)
</script>

<template>
  <div ref="pageRef" class="relative z-10 w-full">
    <!-- Hero -->
    <section id="home" class="nf-page-section nf-section-layer min-h-screen flex items-center px-6 border-b border-white/[0.06]">
      <UiSectionBackdrop variant="hero" />
      <div class="nf-section-content max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-16 lg:py-20">
        <div class="nf-animate">
          <h1 class="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-white leading-tight tracking-tight mb-6">
            {{ t('home.hero.title') }}
          </h1>
          <p class="nf-lead mb-8">
            {{ t('home.hero.description') }}
          </p>
          <div class="flex flex-wrap gap-4">
            <UButton
              :to="localePath('/contact')"
              :label="t('common.contactUs')"
              size="xl"
              trailing-icon="i-lucide-arrow-right"
              class="nf-btn-primary text-white border-0 px-8"
            />
            <UButton
              :label="t('home.hero.ctaExplore')"
              size="xl"
              class="nf-btn-ghost text-white px-8"
              trailing-icon="i-lucide-arrow-down"
              @click="scrollToServices"
            />
            <UButton
              :to="localePath('/process')"
              :label="t('home.hero.ctaProcess')"
              size="xl"
              variant="ghost"
              class="text-nf-cyan -ml-1"
              trailing-icon="i-lucide-arrow-right"
            />
          </div>
        </div>

        <div class="nf-animate">
          <VisualMockup
            variant="dashboard"
            :label="t('home.hero.mockupLabel')"
          />
        </div>
      </div>
    </section>

    <!-- Highlights -->
    <section class="nf-section nf-section-layer nf-section-surface px-6 !py-12 lg:!py-14">
      <UiSectionBackdrop variant="stats" />
      <div class="nf-section-content max-w-7xl mx-auto">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <div
            v-for="item in homeHighlights"
            :key="item.label"
            class="nf-stat-card nf-animate"
          >
            <div class="nf-stat-value text-nf-cyan/90 mb-2">
              {{ item.value }}
            </div>
            <div class="text-sm text-slate-400">
              {{ item.label }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Global reach -->
    <section class="nf-section nf-section-layer nf-section-surface--alt px-6">
      <UiSectionBackdrop variant="default" />
      <div class="nf-section-content max-w-7xl mx-auto">
        <UiSectionHeader
          :title="t('home.global.title')"
          align="center"
        />
        <div class="grid md:grid-cols-3 gap-6 lg:gap-8">
          <div
            v-for="(key, idx) in ['p1', 'p2', 'p3']"
            :key="key"
            class="nf-card p-6 lg:p-8 nf-animate"
          >
            <div class="nf-icon-box flex size-10 items-center justify-center rounded-lg mb-4">
              <UIcon
                :name="['i-lucide-globe', 'i-lucide-building-2', 'i-lucide-handshake'][idx]"
                class="size-5 text-nf-cyan"
              />
            </div>
            <p class="text-slate-400 leading-relaxed text-sm lg:text-base">
              {{ t(`home.global.${key}`) }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Services -->
    <section id="services" class="nf-page-section nf-section nf-section-layer nf-section-surface px-6">
      <UiSectionBackdrop variant="services" />
      <div class="nf-section-content max-w-7xl mx-auto">
        <UiSectionHeader
          :title="t('home.expertise.title')"
          :description="t('home.expertise.description')"
        />
        <p class="nf-eyebrow text-center mb-10 nf-animate">
          {{ t('services.detail.executionTitle') }}
        </p>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ServiceCard
            v-for="service in services"
            :key="service.slug"
            :service="service"
          />
        </div>

        <div class="mt-12 flex flex-wrap justify-center gap-4 nf-animate">
          <UButton
            :to="localePath('/services')"
            :label="t('common.viewAll')"
            class="nf-btn-ghost text-white"
            trailing-icon="i-lucide-arrow-right"
          />
          <UButton
            :to="localePath('/consulting')"
            :label="t('home.consulting.cta')"
            variant="ghost"
            class="text-nf-cyan"
            trailing-icon="i-lucide-arrow-right"
          />
        </div>
      </div>
    </section>

    <!-- Why NextFusion -->
    <section class="nf-section nf-section-layer px-6">
      <UiSectionBackdrop variant="default" />
      <div class="nf-section-content max-w-7xl mx-auto">
        <UiSectionHeader
          :title="t('home.why.title')"
          :description="t('home.why.description')"
          align="center"
        />
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          <div
            v-for="item in whyNextFusion"
            :key="item.title"
            class="nf-card p-6 nf-animate"
          >
            <div class="nf-icon-box flex size-10 items-center justify-center rounded-lg mb-4">
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
      </div>
    </section>

    <!-- About -->
    <section id="about" class="nf-page-section nf-section nf-section-layer nf-section-surface--alt px-6">
      <UiSectionBackdrop variant="about" />
      <div class="nf-section-content max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-12 lg:mb-16">
          <div class="nf-animate order-2 lg:order-1">
            <VisualMockup
              variant="analytics"
              :label="t('home.about.mockupLabel')"
            />
          </div>

          <div class="order-1 lg:order-2 nf-animate">
            <h2 class="nf-heading mb-4">
              {{ t('home.team.title') }}
            </h2>
            <p class="nf-lead mb-6">
              {{ t('home.team.description') }}
            </p>
            <div class="nf-quote-card mb-8">
              <UIcon name="i-lucide-quote" class="size-5 text-nf-cyan/60 mb-3" />
              <p class="text-base text-white font-medium leading-relaxed">
                {{ company.teamExpertise }}
              </p>
            </div>
            <UButton
              :to="localePath('/about')"
              :label="t('home.team.cta')"
              variant="ghost"
              trailing-icon="i-lucide-arrow-right"
              class="text-nf-cyan -ml-2"
            />
          </div>
        </div>

        <div class="grid md:grid-cols-3 gap-6 lg:gap-8">
          <div
            v-for="pillar in homePillars"
            :key="pillar.key"
            class="nf-card p-8 nf-animate"
          >
            <div class="nf-icon-box flex size-11 items-center justify-center rounded-lg mb-5">
              <UIcon :name="pillarIcons[pillar.key]" class="size-5 text-nf-cyan" />
            </div>
            <h3 class="text-lg font-semibold text-white mb-3">
              {{ pillar.title }}
            </h3>
            <p class="text-slate-400 text-sm leading-relaxed">
              {{ pillar.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Process -->
    <section id="process" class="nf-page-section nf-section nf-section-layer nf-section-surface px-6">
      <UiSectionBackdrop variant="process" />
      <div class="nf-section-content max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-12 lg:mb-14">
          <UiSectionHeader
            :title="t('home.methodology.title')"
            :description="t('home.methodology.description')"
          />
          <VisualMockup
            variant="transformation"
            :label="t('home.methodology.mockupLabel')"
            class="hidden lg:block"
          />
        </div>
        <div class="nf-panel">
          <ProcessFlow />
        </div>
        <div class="mt-12 flex flex-wrap justify-center gap-4 nf-animate">
          <UButton
            :to="localePath('/process')"
            :label="t('home.methodology.cta')"
            class="nf-btn-primary text-white border-0 px-8"
            trailing-icon="i-lucide-arrow-right"
          />
          <UButton
            :to="localePath('/contact')"
            :label="t('common.getInTouch')"
            class="nf-btn-ghost text-white px-8"
          />
        </div>
      </div>
    </section>

    <!-- Products -->
    <section id="products" class="nf-page-section nf-section nf-section-layer nf-section-surface--alt px-6">
      <UiSectionBackdrop variant="products" />
      <div class="nf-section-content max-w-7xl mx-auto">
        <UiSectionHeader
          :title="t('home.products.title')"
          :description="t('home.products.description')"
        />

        <div class="grid sm:grid-cols-2 gap-6 lg:gap-8">
          <NuxtLink
            v-for="product in products"
            :key="product.slug"
            :to="product.to"
            class="nf-card p-8 lg:p-10 block nf-animate group"
          >
            <div class="flex items-start justify-between gap-4 mb-6">
              <div class="nf-icon-box flex size-12 items-center justify-center rounded-lg">
                <UIcon :name="product.icon" class="size-6 text-nf-cyan" />
              </div>
              <UBadge
                :label="product.status"
                :color="product.statusColor"
                variant="subtle"
                class="border border-white/10 shrink-0"
              />
            </div>
            <h3 class="text-xl font-semibold text-white mb-3">
              {{ product.name }}
            </h3>
            <p class="text-slate-400 leading-relaxed mb-4">
              {{ product.description }}
            </p>
            <span class="text-sm text-nf-cyan font-medium inline-flex items-center gap-1">
              {{ t('common.learnMore') }}
              <UIcon name="i-lucide-arrow-right" class="size-4" />
            </span>
          </NuxtLink>
        </div>

        <div class="mt-12 text-center nf-animate">
          <UButton
            :to="localePath('/products')"
            :label="t('common.viewAll')"
            class="nf-btn-ghost text-white"
            trailing-icon="i-lucide-arrow-right"
          />
        </div>
      </div>
    </section>

    <!-- Industries -->
    <section class="nf-section nf-section-layer nf-section-surface px-6">
      <UiSectionBackdrop variant="services" />
      <div class="nf-section-content max-w-7xl mx-auto">
        <UiSectionHeader
          :title="t('home.industries.title')"
          :description="t('home.industries.description')"
          align="center"
        />
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ">
          <IndustryCard
            v-for="industry in industries"
            :key="industry.key"
            :industry="industry"
          />
        </div>
      </div>
    </section>

    <!-- Consulting -->
    <section class="nf-section nf-section-layer px-6">
      <UiSectionBackdrop variant="cta" />
      <div class="nf-section-content max-w-7xl mx-auto">
        <div class="nf-featured-panel p-8 lg:p-10 nf-animate">
          <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <p class="nf-eyebrow mb-3">
                {{ t('nav.consulting') }}
              </p>
              <h2 class="text-xl font-semibold text-white mb-3">
                {{ t('home.consulting.title') }}
              </h2>
              <p class="text-slate-400 leading-relaxed text-sm lg:text-base mb-6">
                {{ t('home.consulting.description') }}
              </p>
              <UButton
                :to="localePath('/consulting')"
                :label="t('home.consulting.cta')"
                class="nf-btn-ghost text-white"
                trailing-icon="i-lucide-arrow-right"
              />
            </div>
            <div class="hidden lg:block">
              <VisualMockup
                variant="analytics"
                :label="t('home.about.mockupLabel')"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="nf-section px-6 pb-24 lg:pb-32">
      <CTASection />
    </section>
  </div>
</template>
