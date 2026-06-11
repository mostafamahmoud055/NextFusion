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
  const isScrollHashSync = useState('nf-scroll-hash-sync', () => false)

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

  function syncUrlHash(sectionId) {
    if (!import.meta.client || pinnedSection.value) return

    const route = useRoute()
    if (!isHomePage(route.path)) return

    const hash = `#${sectionId}`
    if (window.location.hash === hash) return

    // Update the address bar only — avoid router navigation (it re-triggers
    // initHomeSections and scrolls the section back to its top).
    isScrollHashSync.value = true
    const url = `${window.location.pathname}${window.location.search}${hash}`
    window.history.replaceState(window.history.state, '', url)
    nextTick(() => {
      isScrollHashSync.value = false
    })
  }

  function isNearSection(sectionId) {
    if (sectionId === 'home') {
      return window.scrollY < HOME_SCROLL_MAX + 40
    }

    const el = document.getElementById(sectionId)
    if (!el) return false

    const sectionTop = el.getBoundingClientRect().top + window.scrollY - SECTION_SCROLL_OFFSET
    const scrollY = window.scrollY

    return scrollY >= sectionTop - 100 && scrollY < sectionTop + el.offsetHeight - 120
  }

  function isLocaleScrollLocked() {
    if (!import.meta.client) return false
    const pendingScrollRestore = useState('nf-pending-scroll-restore', () => null)
    const isLocaleSwitch = useState('nf_locale-switch', () => false)
    return isLocaleSwitch.value || pendingScrollRestore.value != null
  }

  function shouldScrollToSection(sectionId) {
    if (isLocaleScrollLocked()) return false
    if (pendingSection.value) return true
    if (isNearSection(sectionId)) return false
    return true
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

    let next = sections[0].id

    if (window.scrollY < HOME_SCROLL_MAX) {
      next = 'home'
    } else if (scrollBottom >= docHeight - 60) {
      next = sections[sections.length - 1].id
    } else {
      for (const section of sections) {
        const top = section.getBoundingClientRect().top
        if (top <= ACTIVATION_LINE) {
          next = section.id
        }
      }
    }

    if (activeSection.value !== next) {
      activeSection.value = next
      syncUrlHash(next)
    }
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
    process: '/process',
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
    setupSectionObserver()

    if (isLocaleScrollLocked()) {
      activeSection.value = sectionId
      return
    }

    if (!shouldScrollToSection(sectionId)) {
      activeSection.value = sectionId
      return
    }

    const token = ++initToken
    pinSection(sectionId)
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
    isScrollHashSync,
    isLocaleScrollLocked,
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
