const SECTION_IDS = ['home', 'services', 'about', 'process', 'products']

/** Matches nf-page-section scroll-margin-top (5.5rem). */
export const SECTION_SCROLL_OFFSET = 88

/** Pixels from top of viewport — section becomes active once its top crosses this line (below fixed header). */
const ACTIVATION_LINE = 130

/** Scroll position below this = home section is active. */
const HOME_SCROLL_MAX = 120

function parseSectionHash(hash) {
  const id = hash?.replace('#', '') || 'home'
  return SECTION_IDS.includes(id) ? id : 'home'
}

export function useActiveSection() {
  const activeSection = useState('nf-active-section', () => 'home')
  const pinnedSection = useState('nf-pinned-section', () => null)
  const pendingSection = useState('nf-pending-section', () => null)

  let scrollHandler = null
  let resizeHandler = null
  let rafId = null
  let scrollEndTimer = null
  let scrollEndListener = null
  let initToken = 0

  function getSections() {
    return Array.from(document.querySelectorAll('.nf-page-section'))
      .filter(section => SECTION_IDS.includes(section.id))
  }

  function pinSection(sectionId) {
    pinnedSection.value = sectionId
    activeSection.value = sectionId
  }

  function releasePin() {
    pinnedSection.value = null
    calculateActiveSection()
  }

  function waitForScrollEnd() {
    if (!import.meta.client) return

    if (scrollEndListener) {
      window.removeEventListener('scroll', scrollEndListener)
      scrollEndListener = null
    }
    if (scrollEndTimer) {
      clearTimeout(scrollEndTimer)
      scrollEndTimer = null
    }

    const finish = () => {
      if (scrollEndListener) {
        window.removeEventListener('scroll', scrollEndListener)
        scrollEndListener = null
      }
      if (scrollEndTimer) {
        clearTimeout(scrollEndTimer)
        scrollEndTimer = null
      }
      releasePin()
    }

    scrollEndListener = () => {
      if (scrollEndTimer) clearTimeout(scrollEndTimer)
      scrollEndTimer = setTimeout(finish, 120)
    }

    window.addEventListener('scroll', scrollEndListener, { passive: true })
    scrollEndTimer = setTimeout(finish, 1000)
  }

  function calculateActiveSection() {
    if (pinnedSection.value) {
      activeSection.value = pinnedSection.value
      return
    }

    const sections = getSections()
    if (!sections.length) return

    const scrollBottom = window.scrollY + window.innerHeight
    const docHeight = document.documentElement.scrollHeight

    if (window.scrollY < HOME_SCROLL_MAX) {
      activeSection.value = 'home'
      return
    }

    if (scrollBottom >= docHeight - 60) {
      activeSection.value = sections[sections.length - 1].id
      return
    }

    let current = sections[0].id

    for (const section of sections) {
      const top = section.getBoundingClientRect().top
      if (top <= ACTIVATION_LINE) {
        current = section.id
      }
    }

    activeSection.value = current
  }

  function setupSectionObserver() {
    if (!import.meta.client) return

    teardownSectionObserver()

    nextTick(() => {
      calculateActiveSection()

      scrollHandler = () => {
        if (rafId) return
        rafId = requestAnimationFrame(() => {
          calculateActiveSection()
          rafId = null
        })
      }

      resizeHandler = () => calculateActiveSection()

      window.addEventListener('scroll', scrollHandler, { passive: true })
      window.addEventListener('resize', resizeHandler, { passive: true })
    })
  }

  function teardownSectionObserver() {
    if (scrollHandler) {
      window.removeEventListener('scroll', scrollHandler)
      scrollHandler = null
    }
    if (resizeHandler) {
      window.removeEventListener('resize', resizeHandler)
      resizeHandler = null
    }
    if (rafId) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
    if (scrollEndListener) {
      window.removeEventListener('scroll', scrollEndListener)
      scrollEndListener = null
    }
    if (scrollEndTimer) {
      clearTimeout(scrollEndTimer)
      scrollEndTimer = null
    }
  }

  function isHomePage(path) {
    const normalized = path.replace(/\/$/, '') || '/'
    return normalized === '/en' || normalized === '/ar' || normalized === '/'
  }

  const pathSections = {
    services: '/services',
    about: '/about',
    products: '/products',
    contact: '/contact'
  }

  function resolveTargetSection(hash) {
    if (pendingSection.value) {
      const sectionId = pendingSection.value
      pendingSection.value = null
      return sectionId
    }
    return parseSectionHash(hash)
  }

  function scrollToSectionAfterMount(sectionId, attempt = 0) {
    if (!import.meta.client) return

    pinSection(sectionId)

    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: attempt === 0 ? 'smooth' : 'auto' })
      waitForScrollEnd()
      return
    }

    const el = document.getElementById(sectionId)
    if (!el) {
      if (attempt < 80) {
        requestAnimationFrame(() => scrollToSectionAfterMount(sectionId, attempt + 1))
      }
      return
    }

    const top = el.getBoundingClientRect().top + window.scrollY - SECTION_SCROLL_OFFSET
    window.scrollTo({
      top: Math.max(0, top),
      behavior: attempt < 2 ? 'smooth' : 'auto'
    })
    waitForScrollEnd()
  }

  function scrollToSection(sectionId) {
    if (!import.meta.client) return
    scrollToSectionAfterMount(sectionId)
  }

  function scheduleSectionScroll(sectionId, token) {
    const scroll = () => {
      if (token !== initToken) return
      scrollToSectionAfterMount(sectionId)
    }

    nextTick(scroll)
    setTimeout(scroll, 80)
    setTimeout(scroll, 250)
  }

  function initHomeSections(hash) {
    if (!import.meta.client) return

    const sectionId = resolveTargetSection(hash)
    const token = ++initToken
    pinSection(sectionId)
    setupSectionObserver()
    scheduleSectionScroll(sectionId, token)
  }

  async function navigateToHomeSection(sectionId) {
    if (!import.meta.client) return

    const localePath = useLocalePath()
    const path = localePath('/')
    const hash = `#${sectionId}`

    pendingSection.value = sectionId
    pinSection(sectionId)

    if (isHomePage(useRoute().path)) {
      scrollToSection(sectionId)
      await navigateTo({ path, hash }, { replace: true })
      return
    }

    await navigateTo({ path, hash })
  }

  function isNavLinkActive(link, currentPath) {
    if (!link.section) return false

    const pathPrefix = pathSections[link.section]
    if (pathPrefix && currentPath.includes(pathPrefix)) {
      return true
    }

    if (isHomePage(currentPath)) {
      return activeSection.value === link.section
    }

    if (link.section !== 'contact' && pinnedSection.value === link.section) {
      return true
    }

    return false
  }

  return {
    activeSection,
    pinnedSection,
    pendingSection,
    setupSectionObserver,
    teardownSectionObserver,
    isHomePage,
    isNavLinkActive,
    calculateActiveSection,
    scrollToSection,
    scrollToSectionAfterMount,
    initHomeSections,
    navigateToHomeSection,
    pinSection
  }
}
