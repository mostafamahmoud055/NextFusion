import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { refreshScrollTriggers, revealStatic } from '~/utils/gsapScroll'
import { prefersReducedMotion } from '~/utils/scrollReveal'

export default defineNuxtPlugin((nuxtApp) => {
  gsap.registerPlugin(ScrollTrigger)

  if (import.meta.client) {
    document.documentElement.classList.add('nf-js')

    if (prefersReducedMotion()) {
      document.documentElement.classList.add('nf-reduced-motion')
      revealStatic(document)
    }

    // Prevent a permanent blank page if reveal init fails on static hosting.
    window.setTimeout(() => {
      const hidden = document.querySelector('html.nf-js:not(.nf-reduced-motion) .nf-animate')
      if (hidden && getComputedStyle(hidden).opacity === '0') {
        revealStatic(document)
      }
    }, 1500)

    // Initial layout after full page load (images, fonts)
    window.addEventListener('load', () => {
      refreshScrollTriggers('window-load')
    }, { once: true })
  }

  nuxtApp.hook('page:finish', () => {
    nextTick(() => {
      refreshScrollTriggers('page-finish')
    })
  })

  const router = useRouter()
  router.afterEach(() => {
    nextTick(() => {
      refreshScrollTriggers('router-afterEach')
    })
  })

  nuxtApp.hook('app:mounted', () => {
    const i18n = nuxtApp.$i18n
    if (!i18n?.locale) return

    watch(i18n.locale, () => {
      nextTick(() => {
        refreshScrollTriggers('locale-change')
      })
    })
  })

  return {
    provide: {
      gsap,
      ScrollTrigger,
      refreshScrollTriggers
    }
  }
})
