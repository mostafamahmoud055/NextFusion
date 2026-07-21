export default defineEventHandler((event) => {
  const siteRoot = String(process.env.NUXT_PUBLIC_SITE_URL || 'https://nextfusion.net').replace(/\/$/, '')
  const appBase = String(process.env.NUXT_APP_BASE_URL || '/').replace(/\/$/, '')
  const prefix = appBase && appBase !== '/' ? appBase : ''
  const sitemapUrl = `${siteRoot}${prefix}/sitemap.xml`.replace(/([^:]\/)\/+/g, '$1')

  const body = `User-agent: *
Allow: /

Sitemap: ${sitemapUrl}
`

  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  return body
})
