import { refreshScrollTriggers } from '~/utils/gsapScroll'

export default defineNuxtPlugin((nuxtApp) => {
  const pendingScrollRestore = useState('nf-pending-scroll-restore', () => null)
  const isLocaleSwitch = useState('nf_locale-switch', () => false)
  const { calculateActiveSection, setupSectionObserver, isHomePage } = useActiveSection()

  nuxtApp.hook('page:finish', () => {
    const scrollY = pendingScrollRestore.value
    if (scrollY == null) return

    pendingScrollRestore.value = null

    const restore = () => {
      window.scrollTo({ top: scrollY, left: 0, behavior: 'auto' })
    }

    const finish = () => {
      restore()
      refreshScrollTriggers('locale-scroll')

      const route = useRoute()
      if (isHomePage(route.path)) {
        setupSectionObserver()
        calculateActiveSection()
      }

      isLocaleSwitch.value = false
    }

    nextTick(() => {
      restore()
      requestAnimationFrame(finish)
      setTimeout(finish, 80)
      setTimeout(finish, 200)
    })
  })
})
