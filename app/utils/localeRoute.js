export function stripLocalePrefix(path) {
  const normalized = (path || '/').replace(/\/$/, '') || '/'
  if (normalized === '/') return '/'

  const match = normalized.match(/^\/(en|ar)(\/.*)?$/)
  if (!match) return normalized

  return match[2] || '/'
}

export function isLocaleOnlyRouteChange(to, from) {
  if (!from?.path || !to?.path) return false
  if (stripLocalePrefix(to.path) !== stripLocalePrefix(from.path)) return false
  if ((to.hash || '') !== (from.hash || '')) return false

  return JSON.stringify(to.query || {}) === JSON.stringify(from.query || {})
}
