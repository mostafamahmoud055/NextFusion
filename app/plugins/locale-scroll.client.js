import { refreshScrollTriggers } from '~/utils/gsapScroll'

export default defineNuxtPlugin((nuxtApp) => {
  const pendingScrollRestore = useState('nf-pending-scroll-restore', () => null)

  nuxtApp.hook('page:finish', () => {
    const scrollY = pendingScrollRestore.value
    if (scrollY == null) return

    pendingScrollRestore.value = null

    const restore = () => {
      window.scrollTo({ top: scrollY, left: 0, behavior: 'auto' })
    }

    nextTick(() => {
      restore()
      requestAnimationFrame(() => {
        restore()
        refreshScrollTriggers('locale-scroll')
      })
      setTimeout(() => {
        restore()
        refreshScrollTriggers('locale-scroll-delayed')
      }, 50)
    })
  })
})
