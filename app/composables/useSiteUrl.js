export function useSiteUrl() {
  const config = useRuntimeConfig()
  const siteRoot = String(config.public.siteUrl || 'https://nextfusion.net').replace(/\/$/, '')

  function absoluteUrl(path = '') {
    const cleanPath = path.startsWith('/') ? path : `/${path}`
    return `${siteRoot}${cleanPath}`.replace(/([^:]\/)\/+/g, '$1')
  }

  return {
    siteRoot,
    absoluteUrl
  }
}
