import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocalePath } from '#i18n'

export function usePageSeo(pageKey) {
  const { t, locale } = useI18n()

  const title = t(`seo.${pageKey}.title`)
  const description = t(`seo.${pageKey}.description`)

  useSeoMeta({
    title,
    description,
    ogTitle: title === 'NextFusion' ? 'NextFusion' : `${title} | NextFusion`,
    ogDescription: description,
    ogImage: '/og-image.svg',
    ogSiteName: 'NextFusion',
    ogLocale: locale.value === 'ar' ? 'ar_EG' : 'en_US',
    twitterCard: 'summary_large_image'
  })

  useHead({
    htmlAttrs: {
      lang: locale.value,
      dir: locale.value === 'ar' ? 'rtl' : 'ltr'
    }
  })
}

function resolveMessage(rt, message) {
  if (typeof message === 'string') return message
  if (message == null) return ''
  return rt(message)
}

function resolveList(rt, messages) {
  if (!Array.isArray(messages)) return []
  return messages.map(msg => resolveMessage(rt, msg))
}

function resolveSections(rt, raw) {
  if (!raw || typeof raw !== 'object') return null
  return Object.fromEntries(
    Object.entries(raw).map(([key, section]) => [
      key,
      {
        title: resolveMessage(rt, section?.title),
        items: resolveList(rt, section?.items)
      }
    ])
  )
}

function resolveSteps(rt, messages) {
  if (!Array.isArray(messages)) return []
  return messages.map(msg => ({
    title: resolveMessage(rt, msg?.title),
    description: resolveMessage(rt, msg?.description)
  }))
}

function resolveFeatureBlocks(rt, messages) {
  if (!Array.isArray(messages)) return []
  return messages.map(msg => ({
    title: resolveMessage(rt, msg?.title),
    description: resolveMessage(rt, msg?.description),
    icon: resolveMessage(rt, msg?.icon) || 'i-lucide-check-circle'
  }))
}

const SERVICE_ICONS = {
  erp: 'i-lucide-layout-grid',
  digitalTransformation: 'i-lucide-refresh-cw',
  webApplications: 'i-lucide-monitor',
  mobileApplications: 'i-lucide-smartphone',
  governmentSystems: 'i-lucide-landmark',
  enterprisePlatforms: 'i-lucide-building-2',
  cloudSolutions: 'i-lucide-cloud',
  apiFirstArchitecture: 'i-lucide-webhook',
  integration: 'i-lucide-plug',
  artificialIntelligence: 'i-lucide-brain',
  ecommerce: 'i-lucide-store'
}

export function useSiteData() {
  const { t, tm, rt, locale, te } = useI18n()
  const localePath = useLocalePath()

  const company = computed(() => ({
    name: 'NextFusion',
    email: 'info@nextfusion.com',
    website: 'www.nextfusion.com',
    tagline: t('company.tagline'),
    description: t('company.description'),
    teamExpertise: t('company.teamExpertise'),
    phones: [
      { label: t('contact.jordan'), number: t('contact.jordanPhone') },
      { label: t('contact.egypt'), number: t('contact.egyptPhone') }
    ],
    locations: [
      { city: t('contact.amman'), country: t('contact.jordan'), address: t('contact.ammanAddress') },
      { city: t('contact.alexandria'), country: t('contact.egypt'), address: t('contact.alexandriaAddress') }
    ]
  }))

  const navLinks = computed(() => {
    void locale.value
    return [
    { label: t('nav.home'), to: localePath({ path: '/', hash: '#home' }), section: 'home' },
    { label: t('nav.services'), to: localePath({ path: '/', hash: '#services' }), section: 'services' },
    { label: t('nav.about'), to: localePath({ path: '/', hash: '#about' }), section: 'about' },
    { label: t('nav.process'), to: localePath({ path: '/', hash: '#process' }), section: 'process' },
    { label: t('nav.products'), to: localePath({ path: '/', hash: '#products' }), section: 'products' },
    { label: t('nav.contact'), to: localePath('/contact'), section: 'contact' }
  ]
  })

  const homePillars = computed(() => {
    const keys = ['focus', 'flexible', 'expertise']
    return keys.map(key => ({
      key,
      title: t(`home.team.pillars.${key}.title`),
      description: t(`home.team.pillars.${key}.description`)
    }))
  })

  const services = computed(() => {
    void locale.value
    return [
    { slug: 'erp', key: 'erp', icon: 'i-lucide-layout-grid', to: localePath('/services/erp') },
    { slug: 'digital-transformation', key: 'digitalTransformation', icon: 'i-lucide-refresh-cw', to: localePath('/services/digital-transformation') },
    { slug: 'web-applications', key: 'webApplications', icon: 'i-lucide-monitor', to: localePath('/services/web-applications') },
    { slug: 'mobile-applications', key: 'mobileApplications', icon: 'i-lucide-smartphone', to: localePath('/services/mobile-applications') },
    { slug: 'government-systems', key: 'governmentSystems', icon: 'i-lucide-landmark', to: localePath('/services/government-systems') },
    { slug: 'enterprise-platforms', key: 'enterprisePlatforms', icon: 'i-lucide-building-2', to: localePath('/services/enterprise-platforms') },
    { slug: 'cloud-solutions', key: 'cloudSolutions', icon: 'i-lucide-cloud', to: localePath('/services/cloud-solutions') },
    { slug: 'api-first-architecture', key: 'apiFirstArchitecture', icon: 'i-lucide-webhook', to: localePath('/services/api-first-architecture') },
    { slug: 'integration', key: 'integration', icon: 'i-lucide-plug', to: localePath('/services/integration') },
    { slug: 'artificial-intelligence', key: 'artificialIntelligence', icon: 'i-lucide-brain', to: localePath('/services/artificial-intelligence') },
    { slug: 'ecommerce', key: 'ecommerce', icon: 'i-lucide-store', to: localePath('/services/ecommerce') }
  ].map(s => ({
    ...s,
    title: t(`services.${s.key}.title`),
    shortDescription: t(`services.${s.key}.shortDescription`)
  }))
  })

  const featuredServices = computed(() => services.value.slice(0, 4))

  const products = computed(() => {
    void locale.value
    return [
      { slug: 'nextflow-erp', key: 'erp', icon: 'i-lucide-boxes', statusColor: 'warning', to: localePath('/products/nextflow-erp') },
      { slug: 'nextflow-hr', key: 'hr', icon: 'i-lucide-user-cog', statusColor: 'info', to: localePath('/products/nextflow-hr') },
      { slug: 'nextflow-pos', key: 'pos', icon: 'i-lucide-shopping-cart', statusColor: 'info', to: localePath('/products/nextflow-pos') },
      { slug: 'nextflow-ecommerce', key: 'ecommerce', icon: 'i-lucide-store', statusColor: 'warning', to: localePath('/products/nextflow-ecommerce') }
    ].map(p => ({
      ...p,
      name: t(`products.${p.key}.name`),
      status: t(`products.${p.key}.status`),
      description: t(`products.${p.key}.description`),
      features: resolveList(rt, tm(`products.${p.key}.features`))
    }))
  })

  const industries = computed(() => {
    const keys = [
      'government', 'healthcare', 'education', 'manufacturing', 'retail', 'nonProfit'
    ]
    return keys.map(key => ({
      key,
      name: t(`industries.${key}.name`),
      description: t(`industries.${key}.description`),
      icon: t(`industries.${key}.icon`)
    }))
  })

  const consultingServices = computed(() => {
    const keys = [
      'businessAnalysis', 'erpConsulting', 'digitalTransformation', 'bpr', 'pmo', 'qaTesting'
    ]
    return keys.map(key => ({
      key,
      title: t(`consulting.${key}.title`),
      description: t(`consulting.${key}.description`),
      icon: t(`consulting.${key}.icon`)
    }))
  })

  const whyNextFusion = computed(() => {
    const keys = [
      'erpSpecialists', 'dtExperts', 'businessAnalysis', 'agileDelivery',
      'secureScalable', 'cloudReady', 'longTermSupport', 'customerCentric'
    ]
    return keys.map(key => ({
      title: t(`why.${key}.title`),
      description: t(`why.${key}.description`),
      icon: t(`why.${key}.icon`)
    }))
  })

  const methodology = computed(() => {
    const keys = [
      'discovery', 'businessAnalysis', 'solutionDesign', 'development',
      'testing', 'deployment', 'training', 'support'
    ]
    return keys.map(key => ({
      title: t(`methodology.${key}.title`),
      description: t(`methodology.${key}.description`),
      icon: t(`methodology.${key}.icon`)
    }))
  })

  const processPhases = computed(() => {
    void locale.value
    const keys = ['businessAnalysis', 'solutionDesign', 'development', 'quality']
    return keys.map(key => ({
      key,
      title: t(`process.phases.${key}.title`),
      description: t(`process.phases.${key}.description`),
      icon: t(`process.phases.${key}.icon`),
      steps: resolveSteps(rt, tm(`process.phases.${key}.steps`))
    }))
  })

  const processTeam = computed(() => {
    void locale.value
    const keys = ['expertise', 'flexibility', 'partnership']
    return keys.map(key => ({
      stat: t(`process.team.${key}.stat`),
      title: t(`process.team.${key}.title`),
      description: t(`process.team.${key}.description`)
    }))
  })

  const processHighlights = computed(() => {
    void locale.value
    const keys = ['phases', 'transparency', 'agile', 'support']
    return keys.map(key => ({
      value: t(`process.highlights.${key}.value`),
      label: t(`process.highlights.${key}.label`)
    }))
  })

  const consultingHighlights = computed(() => {
    void locale.value
    const keys = ['areas', 'models', 'delivery', 'support']
    return keys.map(key => ({
      value: t(`consulting.highlights.${key}.value`),
      label: t(`consulting.highlights.${key}.label`)
    }))
  })

  const consultingWhy = computed(() => {
    void locale.value
    const keys = ['businessAnalysis', 'agileDelivery', 'customerCentric', 'longTermSupport']
    return keys.map(key => ({
      title: t(`why.${key}.title`),
      description: t(`why.${key}.description`),
      icon: t(`why.${key}.icon`)
    }))
  })

  const processPrinciples = computed(() => {
    void locale.value
    const keys = ['businessFirst', 'iterative', 'quality']
    return keys.map(key => ({
      title: t(`process.principles.${key}.title`),
      description: t(`process.principles.${key}.description`),
      icon: t(`process.principles.${key}.icon`)
    }))
  })

  const processEngagement = computed(() => {
    void locale.value
    const raw = tm('process.engagement.items')
    if (!Array.isArray(raw)) return []
    return raw.map((item, index) => ({
      step: String(index + 1).padStart(2, '0'),
      title: resolveMessage(rt, item?.title),
      description: resolveMessage(rt, item?.description),
      icon: resolveMessage(rt, item?.icon)
    }))
  })

  const processRoleGroups = computed(() => {
    void locale.value
    const groups = [
      { groupKey: 'leadership', roleKeys: ['projectManager', 'productOwner', 'businessAnalyst', 'teamLead'] },
      { groupKey: 'engineering', roleKeys: ['solutionArchitect', 'backendDeveloper', 'frontendDeveloper'] },
      { groupKey: 'operations', roleKeys: ['qaEngineer', 'devopsEngineer'] }
    ]
    return groups.map(({ groupKey, roleKeys }) => ({
      title: t(`process.structure.groups.${groupKey}.title`),
      description: t(`process.structure.groups.${groupKey}.description`),
      roles: roleKeys.map(roleKey => ({
        key: roleKey,
        title: t(`process.structure.roles.${roleKey}.title`),
        description: t(`process.structure.roles.${roleKey}.description`),
        icon: t(`process.structure.roles.${roleKey}.icon`)
      }))
    }))
  })

  const technologies = computed(() => {
    const keys = ['cloud', 'ai', 'apiIntegration', 'bi', 'enterpriseArchitecture', 'workflowAutomation']
    return keys.map(key => ({
      name: t(`technologies.${key}`),
      icon: t(`technologies.${key}Icon`)
    }))
  })

  const values = computed(() => {
    const keys = ['innovation', 'excellence', 'integrity', 'customerSuccess', 'continuousImprovement', 'collaboration']
    return keys.map(key => ({
      title: t(`about.values.${key}.title`),
      description: t(`about.values.${key}.description`),
      icon: t(`about.values.${key}.icon`)
    }))
  })

  function getServiceDetail(key) {
    const base = `services.${key}`
    const overviewParagraphs = [
      t(`${base}.overview.p1`),
      t(`${base}.overview.p2`)
    ].filter(p => p && !p.startsWith(`${base}.overview`))

    return {
      key,
      icon: SERVICE_ICONS[key] || 'i-lucide-briefcase',
      eyebrow: t(`${base}.eyebrow`),
      heroTagline: t(`${base}.heroTagline`),
      title: t(`${base}.title`),
      shortDescription: t(`${base}.shortDescription`),
      description: t(`${base}.description`),
      overview: {
        title: t(`${base}.overview.title`),
        paragraphs: overviewParagraphs.length
          ? overviewParagraphs
          : [t(`${base}.description`)],
        highlight: t(`${base}.overview.highlight`)
      },
      featureBlocks: resolveFeatureBlocks(rt, tm(`${base}.featureBlocks`)),
      process: {
        title: t(`${base}.process.title`),
        description: t(`${base}.process.description`),
        steps: resolveSteps(rt, tm(`${base}.process.steps`))
      },
      benefits: {
        title: t(`${base}.benefits.title`),
        description: t(`${base}.benefits.description`),
        items: resolveFeatureBlocks(rt, tm(`${base}.benefits.items`))
      },
      cta: {
        title: t(`${base}.cta.title`) || t('home.cta.title'),
        description: t(`${base}.cta.description`) || t('home.cta.description')
      },
      features: resolveList(rt, tm(`${base}.features`)),
      modulesTitle: te(`${base}.modulesTitle`) ? t(`${base}.modulesTitle`) : null,
      sections: resolveSections(rt, tm(`${base}.sections`))
    }
  }

  function getRelatedServices(currentKey) {
    return services.value.filter(s => s.key !== currentKey).slice(0, 3)
  }

  function getProductDetail(key) {
    return {
      name: t(`products.${key}.name`),
      status: t(`products.${key}.status`),
      statusColor: key === 'erp' || key === 'ecommerce' ? 'warning' : 'info',
      description: t(`products.${key}.description`),
      longDescription: t(`products.${key}.longDescription`),
      features: resolveList(rt, tm(`products.${key}.features`))
    }
  }

  return {
    company,
    navLinks,
    homePillars,
    featuredServices,
    services,
    products,
    industries,
    consultingServices,
    whyNextFusion,
    methodology,
    processPhases,
    processTeam,
    processHighlights,
    consultingHighlights,
    consultingWhy,
    processPrinciples,
    processEngagement,
    processRoleGroups,
    technologies,
    values,
    getServiceDetail,
    getRelatedServices,
    getProductDetail,
    localePath
  }
}
