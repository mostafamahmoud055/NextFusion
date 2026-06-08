import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  debugRevealLog,
  revealStatic,
  useScrollRevealScheduler,
  whenDomReady
} from '~/utils/gsapScroll'
import {
  REVEAL_TIMING,
  buildScrollTriggerConfig,
  getRevealFromVars,
  getRevealToVars,
  isHeroElement,
  prefersReducedMotion,
  shouldStaggerGroup
} from '~/utils/scrollReveal'

/**
 * GSAP ScrollTrigger page reveals — fade, slide-up, scale with optional stagger.
 * Initializes after DOM is ready (onMounted + nextTick + page:finish).
 */
export function useFadeIn(rootRef, selector = '.nf-animate') {
  let ctx = null

  const cleanup = () => {
    ctx?.revert()
    ctx = null
  }

  useScrollRevealScheduler(async (source) => {
    cleanup()

    if (!rootRef?.value) {
      debugRevealLog('useFadeIn', selector, 0, `skipped — null root (${source})`)
      return
    }

    if (prefersReducedMotion()) {
      revealStatic(rootRef.value)
      return
    }

    await whenDomReady()

    const root = rootRef.value
    if (!root) {
      debugRevealLog('useFadeIn', selector, 0, `skipped — root gone (${source})`)
      return
    }

    const elements = [...root.querySelectorAll(selector)].filter(
      el => !el.closest('[data-reveal-container]')
    )

    debugRevealLog('useFadeIn', selector, elements.length, source)

    if (!elements.length) return

    const heroItems = elements.filter(isHeroElement)
    const scrollItems = elements.filter(el => !isHeroElement(el))
    const handled = new Set()

    ctx = gsap.context(() => {
      if (heroItems.length) {
        debugRevealLog('useFadeIn:hero', selector, heroItems.length, source)
        gsap.to(heroItems, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.55,
          ease: REVEAL_TIMING.ease,
          stagger: REVEAL_TIMING.heroStagger,
          delay: 0.04
        })
        heroItems.forEach(el => handled.add(el))
      }

      const groups = new Map()

      scrollItems.forEach((el) => {
        const parent = el.parentElement
        const key = parent || root
        if (!groups.has(key)) groups.set(key, [])
        groups.get(key).push(el)
      })

      groups.forEach((items, parent) => {
        const pending = items.filter(el => !handled.has(el))
        if (!pending.length) return

        if (shouldStaggerGroup(parent, pending)) {
          const { variant } = getRevealFromVars(pending[0])
          const toVars = getRevealToVars(variant)
          debugRevealLog('useFadeIn:stagger', selector, pending.length, `${source} · ${variant}`)
          gsap.to(pending, {
            ...toVars,
            duration: REVEAL_TIMING.duration,
            ease: REVEAL_TIMING.ease,
            stagger: Math.min(
              REVEAL_TIMING.stagger,
              REVEAL_TIMING.maxStagger / pending.length
            ),
            scrollTrigger: buildScrollTriggerConfig(parent)
          })
          pending.forEach(el => handled.add(el))
          return
        }

        pending.forEach((el) => {
          const { variant, delay } = getRevealFromVars(el)
          const toVars = getRevealToVars(variant)
          gsap.to(el, {
            ...toVars,
            duration: REVEAL_TIMING.duration,
            ease: REVEAL_TIMING.ease,
            delay,
            scrollTrigger: buildScrollTriggerConfig(el)
          })
          handled.add(el)
        })
      })
    }, root)
  }, 'useFadeIn')

  onUnmounted(() => {
    cleanup()
  })
}
