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
  '/industries',
  '/contact'
]

export default defineEventHandler((event) => {
  const baseUrl = 'https://nextfusion.com'

  const urls = routes.flatMap(path => [
    { loc: `${baseUrl}/en${path}` },
    { loc: `${baseUrl}/ar${path}` }
  ])

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${u.loc}</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>`).join('\n')}
</urlset>`

  setHeader(event, 'Content-Type', 'application/xml')
  return xml
})
