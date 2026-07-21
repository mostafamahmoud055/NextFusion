<script setup>
import { useI18n } from 'vue-i18n'
import { useLocalePath } from '#i18n'

const { navLinks } = useSiteData()
const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const { locale, availableLocales, switchLocale } = useLocaleSwitch()
const {
  teardownSectionObserver,
  isHomePage,
  isNavLinkActive,
  navigateToHomeSection
} = useActiveSection()

const scrolled = ref(false)
const mobileOpen = ref(false)

const navLinkClass = (link) => {
  const active = isNavLinkActive(link, route.path)
  return [
    'px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md',
    active
      ? 'text-white'
      : 'text-slate-400 hover:text-nf-cyan-bright'
  ]
}

async function onLogoClick(event) {
  event?.preventDefault()
  mobileOpen.value = false
  await navigateToHomeSection('home')
}

async function onNavClick(link, event) {
  if (link.section === 'contact' || !link.section) {
    mobileOpen.value = false
    return
  }

  event?.preventDefault()
  mobileOpen.value = false
  await navigateToHomeSection(link.section)
}

const mobileNavLinkClass = (link) => {
  const active = isNavLinkActive(link, route.path)
  return [
    'block px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200',
    active
      ? 'text-white bg-white/[0.06]'
      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
  ]
}

function localeLabel(code) {
  return t(`common.locales.${code}`)
}

function localeAriaLabel(loc) {
  return t('layout.switchLocale', { language: loc.name })
}

onMounted(() => {
  const onScroll = () => { scrolled.value = window.scrollY > 10 }
  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
})

watch(
  () => route.path,
  (path) => {
    if (!isHomePage(path)) {
      teardownSectionObserver()
    }
  }
)

onUnmounted(() => {
  teardownSectionObserver()
})
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b transition-colors duration-300"
    :class="scrolled ? 'bg-nf-bg-elevated border-white/8 shadow-[var(--shadow-nf-xs)]' : 'bg-nf-bg/0 border-transparent'"
  >
    <div class="max-w-7xl mx-auto px-6">
      <div class="flex items-center justify-between h-28 lg:h-32">
        <NuxtLink
          :to="localePath({ path: '/', hash: '#home' })"
          class="flex items-center shrink-0"
          :aria-label="t('layout.homeAria')"
          @click="onLogoClick"
        >
          <AppLogo />
        </NuxtLink>

        <nav
          class="hidden lg:flex items-center gap-1"
          :aria-label="t('layout.mainNav')"
        >
          <NuxtLink
            v-for="link in navLinks"
            :key="link.section"
            :to="link.to"
            :class="navLinkClass(link)"
            :aria-current="isNavLinkActive(link, route.path) ? 'page' : undefined"
            @click="onNavClick(link, $event)"
          >
            <span
              v-if="isNavLinkActive(link, route.path)"
              class="inline-block w-1 h-1 rounded-full bg-nf-cyan me-1.5 align-middle"
              aria-hidden="true"
            />
            {{ link.label }}
          </NuxtLink>
        </nav>

        <div class="flex items-center gap-3">
          <div
            class="flex items-center rounded-md border border-white/8 bg-white/[0.03] p-0.5"
            role="group"
            :aria-label="t('common.language')"
          >
            <button
              v-for="loc in availableLocales"
              :key="loc.code"
              type="button"
              :class="[
                'px-2.5 py-1 text-xs font-semibold rounded transition-colors',
                locale === loc.code ? 'bg-nf-cyan/10 text-nf-cyan-bright border border-nf-cyan/20' : 'text-slate-500 hover:text-slate-300'
              ]"
              :aria-label="localeAriaLabel(loc)"
              :aria-pressed="locale === loc.code"
              :title="loc.name"
              @click="switchLocale(loc.code)"
            >
              {{ localeLabel(loc.code) }}
            </button>
          </div>

          <UButton
            :to="localePath('/contact')"
            :label="t('common.contactUs')"
            size="sm"
            class="hidden md:flex nf-btn-primary text-white border-0"
          />

          <UButton
            icon="i-lucide-menu"
            color="neutral"
            variant="ghost"
            class="lg:hidden"
            :aria-label="mobileOpen ? t('common.closeMenu') : t('common.openMenu')"
            @click="mobileOpen = !mobileOpen"
          />
        </div>
      </div>

      <div
        v-if="mobileOpen"
        class="lg:hidden pb-4 border-t border-white/8 pt-3 space-y-1"
      >
        <NuxtLink
          v-for="link in navLinks"
          :key="link.section"
          :to="link.to"
          :class="mobileNavLinkClass(link)"
          :aria-current="isNavLinkActive(link, route.path) ? 'page' : undefined"
          @click="onNavClick(link, $event)"
        >
          {{ link.label }}
        </NuxtLink>

        <div
          class="flex items-center gap-2 px-4 pt-3 mt-2 border-t border-white/8"
          role="group"
          :aria-label="t('common.language')"
        >
          <button
            v-for="loc in availableLocales"
            :key="loc.code"
            type="button"
            :class="[
              'flex-1 px-3 py-2 text-sm font-semibold rounded-lg transition-colors',
              locale === loc.code ? 'bg-nf-cyan/10 text-nf-cyan-bright border border-nf-cyan/20' : 'text-slate-400 hover:text-white border border-white/8'
            ]"
            :aria-label="localeAriaLabel(loc)"
            :aria-pressed="locale === loc.code"
            @click="switchLocale(loc.code); mobileOpen = false"
          >
            {{ localeLabel(loc.code) }}
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
