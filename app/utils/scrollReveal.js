export const REVEAL_PRESETS = {
  'fade-up': { y: 20, opacity: 0 },
  fade: { y: 0, opacity: 0 },
  scale: { scale: 0.97, opacity: 0 },
  'slide-up': { y: 28, opacity: 0 }
}

export const REVEAL_TO = {
  'fade-up': { y: 0, opacity: 1 },
  fade: { y: 0, opacity: 1 },
  scale: { scale: 1, opacity: 1 },
  'slide-up': { y: 0, opacity: 1 }
}

export const REVEAL_TIMING = {
  duration: 0.5,
  ease: 'power2.out',
  stagger: 0.07,
  maxStagger: 0.35,
  scrollStart: 'top 90%',
  heroStagger: 0.09
}

export function prefersReducedMotion() {
  return import.meta.client
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function getRevealVariant(el) {
  return el.dataset.reveal || 'fade-up'
}

export function getRevealFromVars(el) {
  const variant = getRevealVariant(el)
  const preset = REVEAL_PRESETS[variant] || REVEAL_PRESETS['fade-up']
  const delay = el.dataset.revealDelay ? Number.parseFloat(el.dataset.revealDelay) : 0
  return { variant, preset, delay }
}

export function getRevealToVars(variant = 'fade-up') {
  return REVEAL_TO[variant] || REVEAL_TO['fade-up']
}

export function isHeroElement(el) {
  return !!el.closest('#home, [data-reveal-immediate]')
}

export function shouldStaggerGroup(parent, items) {
  if (items.length < 2) return false
  if (!parent) return false
  const tag = parent.tagName
  if (tag === 'SECTION') return items.length >= 2
  return parent.classList.contains('grid')
    || parent.classList.contains('flex')
    || parent.classList.contains('nf-panel')
}

export function buildScrollTriggerConfig(trigger, start = REVEAL_TIMING.scrollStart) {
  return {
    trigger,
    start,
    once: true,
    toggleActions: 'play none none none',
    invalidateOnRefresh: true
  }
}

export function getGroupPreset(variant) {
  if (variant === 'scale') return { from: REVEAL_PRESETS.scale, to: REVEAL_TO.scale }
  if (variant === 'fade') return { from: REVEAL_PRESETS.fade, to: REVEAL_TO.fade }
  return { from: REVEAL_PRESETS['fade-up'], to: REVEAL_TO['fade-up'] }
}
