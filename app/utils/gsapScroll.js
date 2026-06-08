import { ScrollTrigger } from 'gsap/ScrollTrigger'

const DEBUG = import.meta.dev

/**
 * Log reveal group stats in development — never silent failures.
 */
export function debugRevealLog(label, selector, count, detail = '') {
  if (!DEBUG) return
  const suffix = detail ? ` — ${detail}` : ''
  if (count === 0) {
    console.warn(`[scroll-reveal] ${label}: 0 elements for "${selector}"${suffix}`)
  } else {
    console.info(`[scroll-reveal] ${label}: ${count} element(s) for "${selector}"${suffix}`)
  }
}

/**
 * ScrollTrigger.refresh after layout — use after init, route, locale, DOM updates.
 */
export function refreshScrollTriggers(source = 'manual') {
  if (!import.meta.client) return

  nextTick(() => {
    requestAnimationFrame(() => {
      ScrollTrigger.refresh(true)
      if (DEBUG) {
        console.info(`[scroll-reveal] ScrollTrigger.refresh (${source})`)
      }
    })
  })
}

/**
 * Wait for Vue DOM commit + paint before querying selectors.
 */
export function whenDomReady() {
  return new Promise((resolve) => {
    nextTick(() => {
      requestAnimationFrame(() => {
        nextTick(() => {
          requestAnimationFrame(() => resolve())
        })
      })
    })
  })
}

/**
 * Show content when animations are disabled — prevents invisible stuck state.
 */
export function revealStatic(root) {
  const scope = root || document
  scope.querySelectorAll('.nf-animate').forEach((el) => {
    el.style.opacity = '1'
    el.style.transform = 'none'
  })
}

/**
 * Schedule init on mount + page:finish (Nuxt DOM fully rendered).
 * Returns cleanup function.
 */
export function useScrollRevealScheduler(runInit, label = 'reveal') {
  if (!import.meta.client) return () => {}

  let disposed = false
  let chain = Promise.resolve()

  const execute = (source) => {
    if (disposed) return

    chain = chain.then(async () => {
      if (disposed) return

      await whenDomReady()
      if (disposed) return

      try {
        await runInit(source)
        refreshScrollTriggers(`${label}:${source}`)
      } catch (err) {
        console.error(`[scroll-reveal] ${label} failed (${source})`, err)
      }
    })
  }

  onMounted(() => {
    execute('mounted')
  })

  const nuxtApp = useNuxtApp()

  nuxtApp.hook('page:finish', () => {
    execute('page-finish')
  })

  const router = useRouter()
  const removeAfterEach = router.afterEach(() => {
    refreshScrollTriggers(`${label}:route`)
  })

  onUnmounted(() => {
    disposed = true
    removeAfterEach()
  })

  return () => {
    disposed = true
  }
}
