const STORAGE_KEY = 'nf-locale'

export default defineNuxtPlugin((nuxtApp) => {
  const i18n = nuxtApp.$i18n

  const applyDocumentLocale = (code) => {
    document.documentElement.lang = code
    document.documentElement.dir = code === 'ar' ? 'rtl' : 'ltr'
  }

  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored && ['en', 'ar'].includes(stored)) {
    document.cookie = `${STORAGE_KEY}=${stored};path=/;max-age=31536000;SameSite=Lax`
  }

  watch(
    () => i18n.locale.value,
    (code) => {
      localStorage.setItem(STORAGE_KEY, code)
      applyDocumentLocale(code)
    },
    { immediate: true }
  )
})
