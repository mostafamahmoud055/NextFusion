<script setup>
import { useI18n } from 'vue-i18n'
import { useLocalePath } from '#i18n'

const { services, products } = useSiteData()
const { t, locale } = useI18n()
const localePath = useLocalePath()

const year = new Date().getFullYear()

const companyLinks = computed(() => {
  void locale.value
  return [
    { label: t('nav.home'), to: localePath({ path: '/', hash: '#home' }) },
    { label: t('nav.about'), to: localePath('/about') },
    { label: t('nav.process'), to: localePath('/process') },
    { label: t('nav.contact'), to: localePath('/contact') }
  ]
})

const serviceLinks = computed(() => {
  void locale.value
  return services.value.map(s => ({ label: s.title, to: s.to }))
})

const productLinks = computed(() => {
  void locale.value
  return products.value.map(p => ({ label: p.name, to: p.to }))
})
</script>

<template>
  <footer class="relative z-10 border-t border-white/8 bg-nf-bg">
    <div class="max-w-7xl mx-auto px-6 py-16 lg:py-20">
      <div class="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
        <div class="sm:col-span-2 lg:col-span-1">
          <NuxtLink
            :to="localePath({ path: '/', hash: '#home' })"
            :aria-label="t('layout.homeAria')"
          >
            <AppLogo class="mb-6" />
          </NuxtLink>
          <p class="text-sm text-slate-500 leading-relaxed max-w-xs">
            {{ t('footer.tagline') }}
          </p>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-white mb-4">
            {{ t('footer.quickLinks') }}
          </h3>
          <ul class="space-y-2.5">
            <li v-for="link in companyLinks" :key="link.to">
              <NuxtLink :to="link.to" class="text-sm text-slate-500 hover:text-nf-cyan transition-colors">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-white mb-4">
            {{ t('footer.services') }}
          </h3>
          <ul class="space-y-2.5">
            <li v-for="link in serviceLinks" :key="link.to">
              <NuxtLink :to="link.to" class="text-sm text-slate-500 hover:text-nf-cyan transition-colors">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-sm font-semibold text-white mb-4">
            {{ t('footer.products') }}
          </h3>
          <ul class="space-y-2.5">
            <li v-for="link in productLinks" :key="link.to">
              <NuxtLink :to="link.to" class="text-sm text-slate-500 hover:text-nf-cyan transition-colors">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <div class="nf-section-divider my-10" />

      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-600">
        <p>{{ t('footer.copyright', { year }) }}</p>
        <p class="text-xs">{{ t('footer.motto') }}</p>
      </div>
    </div>
  </footer>
</template>
