import { useI18n } from 'vue-i18n'
import { useSwitchLocalePath } from '#i18n'

const STORAGE_KEY = 'nf-locale'

export function useLocaleSwitch() {
  const { locale, locales } = useI18n()
  const switchLocalePath = useSwitchLocalePath()
  const isLocaleSwitch = useState('nf-locale-switch', () => false)
  const pendingScrollRestore = useState('nf-pending-scroll-restore', () => null)

  const availableLocales = computed(() => locales.value)

  async function switchLocale(code) {
    if (code === locale.value) return

    const route = useRoute()

    if (import.meta.client) {
      isLocaleSwitch.value = true
      pendingScrollRestore.value = window.scrollY
      localStorage.setItem(STORAGE_KEY, code)
      document.cookie = `${STORAGE_KEY}=${code};path=/;max-age=31536000;SameSite=Lax`
    }

    await navigateTo({
      path: switchLocalePath(code),
      hash: route.hash || undefined
    })
  }

  return {
    locale,
    availableLocales,
    switchLocalePath,
    switchLocale
  }
}
