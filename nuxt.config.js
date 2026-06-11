// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@vueuse/nuxt'
  ],

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://nextfusion.com'
    }
  },

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    classSuffix: '',
    storageKey: 'nf-color-mode-disabled'
  },

  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      title: 'NextFusion',
      titleTemplate: (titleChunk) => {
        if (!titleChunk || titleChunk === 'NextFusion') return 'NextFusion'
        return `${titleChunk} | NextFusion`
      },
      link: [
        { rel: 'icon', type: 'image/png', href: '/nextfusion-logo.png' },
        { rel: 'apple-touch-icon', href: '/nextfusion-logo.png' }
      ],
      meta: [
        { name: 'application-name', content: 'NextFusion' },
        { name: 'author', content: 'NextFusion' },
        { name: 'theme-color', content: '#0a0f1a' },
        { name: 'format-detection', content: 'telephone=no' }
      ]
    },
    pageTransition: { name: 'page', mode: 'default' },
    layoutTransition: { name: 'layout', mode: 'default' }
  },

  i18n: {
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://nextfusion.com',
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json', dir: 'ltr' },
      { code: 'ar', language: 'ar-EG', name: 'العربية', file: 'ar.json', dir: 'rtl' }
    ],
    defaultLocale: 'en',
    lazy: true,
    restructureDir: false,
    langDir: 'locales',
    strategy: 'prefix_except_default',
    vueI18n: './i18n/i18n.config.js',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'nf_locale',
      redirectOn: 'root',
      // alwaysRedirect: true,
      fallbackLocale: 'en'
    }
  },

  compatibilityDate: '2025-01-15',

  nitro: {
    prerender: {
      routes: ['/sitemap.xml', '/robots.txt']
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
