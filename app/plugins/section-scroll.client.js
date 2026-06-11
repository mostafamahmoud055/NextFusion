export default defineNuxtPlugin((nuxtApp) => {
  const {
    initHomeSections,
    isHomePage,
    pendingSection,
    isScrollHashSync
  } = useActiveSection()
  const pendingScrollRestore = useState('nf-pending-scroll-restore', () => null)
  const isLocaleSwitch = useState('nf_locale-switch', () => false)

  nuxtApp.hook('page:finish', () => {
    const route = useRoute()

    if (isLocaleSwitch.value || pendingScrollRestore.value != null) {
      return
    }

    if (!isHomePage(route.path)) return
    if (isScrollHashSync.value) return
    if (!route.hash && !pendingSection.value) return
    nextTick(() => initHomeSections(route.hash))
  })
})
