<script setup>
import { useI18n } from 'vue-i18n'

const { company } = useSiteData()
const { t, tm, rt, locale } = useI18n()

usePageSeo('contact')

const pageRef = ref(null)
useFadeIn(pageRef)

const contactSteps = computed(() => {
  void locale.value
  const items = tm('contact.steps.items')
  if (!Array.isArray(items)) return []
  return items.map(item => (typeof item === 'string' ? item : rt(item)))
})

const officeLocations = computed(() => [
  {
    key: 'alexandria',
    title: t('contact.egyptOffice'),
    address: company.value.locations[0]?.address,
    mapSrc: 'https://maps.google.com/maps?q=Alexandria,Egypt&output=embed',
    mapTitle: t('contact.mapTitle.alexandria')
  },
  {
    key: 'amman',
    title: t('contact.jordanOffice'),
    address: company.value.locations[1]?.address,
    mapSrc: 'https://maps.google.com/maps?q=Amman,Jordan&output=embed',
    mapTitle: t('contact.mapTitle.amman')
  }
])
</script>

<template>
  <div ref="pageRef">
    <PageHeader
      :title="t('contact.subtitle')"
      :description="t('contact.intro')"
    />

    <UiContainer extra-class="pt-0" backdrop="default" surface>
      <div class="grid gap-12 lg:grid-cols-5 lg:gap-16">
        <!-- Sidebar -->
        <div class="lg:col-span-2 space-y-10">
          <div class="nf-animate">
            <h2 class="nf-heading text-xl mb-3">
              {{ t('contact.getInTouch') }}
            </h2>
            <p class="nf-lead text-base">
              {{ t('contact.intro') }}
            </p>
          </div>

          <!-- Contact channels -->
          <div class="space-y-3 nf-animate">
            <h3 class="text-sm font-semibold text-white mb-4">
              {{ t('contact.infoTitle') }}
            </h3>

            <div class="nf-glass p-4">
              <div class="flex items-center gap-3">
                <div class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/8">
                  <UIcon name="i-lucide-mail" class="size-5 text-nf-cyan" />
                </div>
                <div>
                  <p class="text-xs text-slate-500 mb-0.5">
                    {{ t('contact.email') }}
                  </p>
                  <a
                    :href="`mailto:${company.email}`"
                    class="text-sm text-white hover:text-nf-cyan transition-colors"
                  >
                    {{ company.email }}
                  </a>
                </div>
              </div>
            </div>

            <div
              v-for="phone in company.phones"
              :key="phone.number"
              class="nf-glass p-4"
            >
              <div class="flex items-center gap-3">
                <div class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/8">
                  <UIcon name="i-lucide-phone" class="size-5 text-nf-cyan" />
                </div>
                <div>
                  <p class="text-xs text-slate-500 mb-0.5">
                    {{ phone.label }}
                  </p>
                  <a
                    :href="`tel:${phone.number.replace(/\s/g, '')}`"
                    class="text-sm text-white hover:text-nf-cyan transition-colors"
                  >
                    {{ phone.number }}
                  </a>
                </div>
              </div>
            </div>

            <div class="nf-glass p-4">
              <div class="flex items-center gap-3">
                <div class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/8">
                  <UIcon name="i-lucide-globe" class="size-5 text-nf-cyan" />
                </div>
                <div>
                  <p class="text-xs text-slate-500 mb-0.5">
                    {{ t('contact.website') }}
                  </p>
                  <a
                    href="https://www.nextfusion.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-sm text-white hover:text-nf-cyan transition-colors"
                  >
                    {{ company.website }}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Response time -->
          <div class="nf-glass p-6 nf-animate">
            <div class="flex items-start gap-3">
              <div class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/8">
                <UIcon name="i-lucide-clock" class="size-5 text-nf-cyan" />
              </div>
              <div>
                <h3 class="font-semibold text-white text-sm mb-1">
                  {{ t('contact.response.title') }}
                </h3>
                <p class="text-sm text-slate-500 leading-relaxed">
                  {{ t('contact.response.description') }}
                </p>
              </div>
            </div>
          </div>

          <!-- What happens next -->
          <div class="nf-animate">
            <h3 class="text-sm font-semibold text-white mb-4">
              {{ t('contact.steps.title') }}
            </h3>
            <ol class="space-y-4">
              <li
                v-for="(step, index) in contactSteps"
                :key="index"
                class="flex items-start gap-3"
              >
                <span class="flex size-6 shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/8 text-xs font-medium text-slate-400">
                  {{ index + 1 }}
                </span>
                <p class="text-sm text-slate-500 leading-relaxed pt-0.5">
                  {{ step }}
                </p>
              </li>
            </ol>
          </div>

          <!-- Offices -->
          <div class="space-y-4 nf-animate">
            <h3 class="text-sm font-semibold text-white">
              {{ t('contact.locationsTitle') }}
            </h3>

            <div
              v-for="office in officeLocations"
              :key="office.key"
              class="nf-glass p-4"
            >
              <div class="flex items-start gap-3 mb-3">
                <UIcon
                  name="i-lucide-map-pin"
                  class="size-5 text-nf-cyan shrink-0 mt-0.5"
                />
                <div>
                  <p class="font-medium text-white text-sm">
                    {{ office.title }}
                  </p>
                  <p class="text-xs text-slate-500 mt-1">
                    {{ office.address }}
                  </p>
                </div>
              </div>
              <div class="rounded-lg overflow-hidden border border-white/8 h-36">
                <iframe
                  :src="office.mapSrc"
                  width="100%"
                  height="100%"
                  style="border:0"
                  loading="lazy"
                  :title="office.mapTitle"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Form — no scroll animation to avoid layout shift on interact -->
        <div class="lg:col-span-3">
          <div class="nf-glass p-6 lg:p-10">
            <ContactForm />
          </div>
        </div>
      </div>
    </UiContainer>

    <div class="pb-24 lg:pb-32" />
  </div>
</template>
