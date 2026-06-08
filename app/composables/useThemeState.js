import { ref, readonly } from 'vue'

export const themes = {
  home: {
    c1: '59, 130, 246',
    c2: '139, 92, 246',
    c3: '6, 182, 212'
  },
  services: {
    c1: '6, 182, 212',
    c2: '59, 130, 246',
    c3: '14, 165, 233'
  },
  industries: {
    c1: '16, 185, 129',
    c2: '20, 184, 166',
    c3: '45, 212, 191'
  },
  products: {
    c1: '168, 85, 247',
    c2: '217, 70, 239',
    c3: '192, 132, 252'
  }
}

const activeSection = ref('home')

export function useThemeState() {
  function setTheme(section) {
    if (!themes[section]) return
    if (activeSection.value === section) return

    activeSection.value = section

    if (!import.meta.client) return

    const theme = themes[section]
    const root = document.documentElement

    root.dataset.activeSection = section
    root.style.setProperty('--theme-c1', theme.c1)
    root.style.setProperty('--theme-c2', theme.c2)
    root.style.setProperty('--theme-c3', theme.c3)
  }

  return {
    activeSection: readonly(activeSection),
    setTheme
  }
}
