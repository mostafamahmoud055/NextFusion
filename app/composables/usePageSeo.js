import { useI18n } from 'vue-i18n'
import { useLocaleHead } from '#i18n'

function buildJsonLd(pageKey, { fullTitle, description, url, locale, siteRoot, imageUrl, logoUrl }) {
  const webPage = {
    '@type': 'WebPage',
    name: fullTitle,
    description,
    url,
    inLanguage: locale === 'ar' ? 'ar-EG' : 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      name: 'NextFusion',
      url: siteRoot
    }
  }

  if (pageKey !== 'home') {
    return {
      '@context': 'https://schema.org',
      ...webPage
    }
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteRoot}/#organization`,
        name: 'NextFusion',
        url: siteRoot,
        logo: logoUrl,
        email: 'info@nextfusion.net',
        description,
        areaServed: ['EG', 'JO', 'MENA'],
        sameAs: []
      },
      {
        '@type': 'WebSite',
        '@id': `${siteRoot}/#website`,
        name: 'NextFusion',
        url: siteRoot,
        publisher: { '@id': `${siteRoot}/#organization` },
        inLanguage: ['en-US', 'ar-EG']
      },
      {
        ...webPage,
        '@id': `${url}#webpage`,
        about: { '@id': `${siteRoot}/#organization` },
        isPartOf: { '@id': `${siteRoot}/#website` }
      }
    ]
  }
}

export function usePageSeo(pageKey) {
  const { t, locale } = useI18n()
  const route = useRoute()
  const { absoluteUrl, siteRoot } = useSiteUrl()
  const i18nHead = useLocaleHead({ addDirAttribute: true, addSeoAttributes: true })

  const title = t(`seo.${pageKey}.title`)
  const description = t(`seo.${pageKey}.description`)
  const fullTitle = title === 'NextFusion' ? 'NextFusion' : `${title} | NextFusion`
  const canonical = absoluteUrl(route.fullPath)
  const ogImage = absoluteUrl('/og-image.svg')
  const logoUrl = absoluteUrl('/nextfusion-logo.png')
  const ogLocale = locale.value === 'ar' ? 'ar_EG' : 'en_US'
  const ogLocaleAlternate = locale.value === 'ar' ? 'en_US' : 'ar_EG'

  useSeoMeta({
    title,
    description,
    ogTitle: fullTitle,
    ogDescription: description,
    ogType: 'website',
    ogUrl: canonical,
    ogImage,
    ogSiteName: 'NextFusion',
    ogLocale,
    ogLocaleAlternate,
    twitterCard: 'summary_large_image',
    twitterTitle: fullTitle,
    twitterDescription: description,
    twitterImage: ogImage,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1'
  })

  const jsonLd = buildJsonLd(pageKey, {
    fullTitle,
    description,
    url: canonical,
    locale: locale.value,
    siteRoot,
    imageUrl: ogImage,
    logoUrl
  })

  useHead(() => ({
    htmlAttrs: {
      lang: i18nHead.value.htmlAttrs?.lang ?? locale.value,
      dir: i18nHead.value.htmlAttrs?.dir ?? (locale.value === 'ar' ? 'rtl' : 'ltr'),
      class: 'dark'
    },
    link: [
      { rel: 'canonical', href: canonical },
      ...(i18nHead.value.link || [])
    ],
    meta: [...(i18nHead.value.meta || [])],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(jsonLd)
      }
    ]
  }))
}
