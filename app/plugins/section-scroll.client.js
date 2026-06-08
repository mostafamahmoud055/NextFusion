export default defineNuxtPlugin((nuxtApp) => {
  const { initHomeSections, isHomePage, pendingSection, setupSectionObserver } = useActiveSection()
  const isLocaleSwitch = useState('nf-locale-switch', () => false)

  nuxtApp.hook('page:finish', () => {
    const route = useRoute()

    if (isLocaleSwitch.value) {
      isLocaleSwitch.value = false
      if (isHomePage(route.path)) {
        nextTick(() => setupSectionObserver())
      }
      return
    }

    if (!isHomePage(route.path)) return
    if (!route.hash && !pendingSection.value) return
    nextTick(() => initHomeSections(route.hash))
  })
})
