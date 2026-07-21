const routes = [
  '',
  '/about',
  '/process',
  '/services',
  '/services/erp',
  '/services/digital-transformation',
  '/services/web-applications',
  '/services/mobile-applications',
  '/services/government-systems',
  '/services/enterprise-platforms',
  '/services/cloud-solutions',
  '/services/api-first-architecture',
  '/services/integration',
  '/services/artificial-intelligence',
  '/services/ecommerce',
  '/consulting',
  '/products',
  '/products/nextflow-erp',
  '/products/nextflow-hr',
  '/products/nextflow-pos',
  '/products/nextflow-ecommerce',
  '/contact'
]

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export default defineEventHandler((event) => {
  const siteRoot = String(process.env.NUXT_PUBLIC_SITE_URL || 'https://nextfusion.net').replace(/\/$/, '')
  const appBase = String(process.env.NUXT_APP_BASE_URL || '/').replace(/\/$/, '')
  const prefix = appBase && appBase !== '/' ? appBase : ''

  const urlFor = (locale, path) => {
    const segment = path ? `/${locale}${path}` : `/${locale}`
    return `${siteRoot}${prefix}${segment}`.replace(/([^:]\/)\/+/g, '$1')
  }

  const entries = routes.map((path) => {
    const en = urlFor('en', path)
    const ar = urlFor('ar', path)
    const priority = path === '' ? '1.0' : path.split('/').length <= 2 ? '0.9' : '0.8'

    return `  <url>
    <loc>${escapeXml(en)}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(en)}" />
    <xhtml:link rel="alternate" hreflang="ar" href="${escapeXml(ar)}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(en)}" />
    <changefreq>${path === '' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${priority}</priority>
  </url>
  <url>
    <loc>${escapeXml(ar)}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(en)}" />
    <xhtml:link rel="alternate" hreflang="ar" href="${escapeXml(ar)}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(en)}" />
    <changefreq>${path === '' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${priority}</priority>
  </url>`
  })

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>`

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  return xml
})
