import { isLocaleOnlyRouteChange } from './utils/localeRoute'

function isIndexPath(path) {
  const normalized = path.replace(/\/$/, '') || '/'
  return normalized === '/en' || normalized === '/ar' || normalized === '/'
}

export default {
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    if (isLocaleOnlyRouteChange(to, from)) {
      return false
    }

    // Hash scrolling on homepage is handled client-side after sections mount
    if (to.hash && isIndexPath(to.path)) {
      return false
    }

    return { top: 0, behavior: 'smooth' }
  }
}
