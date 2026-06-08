import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  debugRevealLog,
  useScrollRevealScheduler,
  whenDomReady
} from '~/utils/gsapScroll'
import {
  REVEAL_TIMING,
  buildScrollTriggerConfig,
  getGroupPreset,
  getRevealFromVars,
  getRevealToVars,
  isHeroElement,
  prefersReducedMotion
} from '~/utils/scrollReveal'

/**
 * GSAP reveal for a single element.
 */
export function useReveal(target) {
  let ctx = null

  const cleanup = () => {
    ctx?.revert()
    ctx = null
  }

  const resolveTarget = () => {
    if (typeof target === 'string') return document.querySelector(target)
    return unref(target)
  }

  useScrollRevealScheduler(async (source) => {
    cleanup()

    const el = resolveTarget()
    if (!el) {
      debugRevealLog('useReveal', 'target', 0, `skipped — null target (${source})`)
      return
    }

    if (prefersReducedMotion()) {
      el.style.opacity = '1'
      el.style.transform = 'none'
      return
    }

    await whenDomReady()

    const node = resolveTarget()
    if (!node) return

    if (!node.classList.contains('nf-animate')) {
      node.classList.add('nf-animate')
    }

    debugRevealLog('useReveal', 'target', 1, source)

    const { variant, delay } = getRevealFromVars(node)
    const toVars = getRevealToVars(variant)

    ctx = gsap.context(() => {
      if (isHeroElement(node)) {
        gsap.to(node, {
          ...toVars,
          duration: 0.55,
          ease: REVEAL_TIMING.ease,
          delay
        })
        return
      }

      gsap.to(node, {
        ...toVars,
        duration: REVEAL_TIMING.duration,
        ease: REVEAL_TIMING.ease,
        delay,
        scrollTrigger: buildScrollTriggerConfig(node)
      })
    }, node)
  }, 'useReveal')

  onUnmounted(() => {
    cleanup()
  })
}

/**
 * GSAP staggered group reveal — cards, steps, timeline items.
 */
export function useRevealGroup(containerRef, itemSelector = '[data-reveal]') {
  let ctx = null

  const cleanup = () => {
    ctx?.revert()
    ctx = null
  }

  useScrollRevealScheduler(async (source) => {
    cleanup()

    if (!containerRef?.value) {
      debugRevealLog('useRevealGroup', itemSelector, 0, `skipped — null container (${source})`)
      return
    }

    if (prefersReducedMotion()) {
      containerRef.value.querySelectorAll(itemSelector).forEach((el) => {
        el.style.opacity = '1'
        el.style.transform = 'none'
      })
      return
    }

    await whenDomReady()

    const container = containerRef.value
    if (!container) return

    const items = [...container.querySelectorAll(itemSelector)]
    debugRevealLog('useRevealGroup', itemSelector, items.length, source)

    if (!items.length) return

    items.forEach((item) => {
      if (!item.classList.contains('nf-animate')) {
        item.classList.add('nf-animate')
      }
    })

    const variant = container.dataset.revealGroup
      || items[0]?.dataset.revealGroup
      || items[0]?.dataset.reveal
      || 'fade-up'
    const { to } = getGroupPreset(variant)

    ctx = gsap.context(() => {
      gsap.to(items, {
        ...to,
        duration: 0.45,
        ease: REVEAL_TIMING.ease,
        stagger: REVEAL_TIMING.stagger,
        scrollTrigger: buildScrollTriggerConfig(container, 'top 88%')
      })
    }, container)
  }, 'useRevealGroup')

  onUnmounted(() => {
    cleanup()
  })
}
