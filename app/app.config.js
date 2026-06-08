export default defineAppConfig({
  ui: {
    colors: {
      primary: 'cyan',
      neutral: 'slate'
    },
    button: {
      slots: {
        base: 'font-medium transition-all duration-300'
      }
    },
    card: {
      slots: {
        root: 'nf-glass overflow-hidden'
      }
    }
  }
})
