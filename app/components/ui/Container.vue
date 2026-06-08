<script setup>
defineProps({
  as: { type: String, default: 'section' },
  id: { type: String, default: '' },
  extraClass: { type: String, default: '' },
  noPadding: { type: Boolean, default: false },
  backdrop: {
    type: String,
    default: '',
    validator: v => !v || [
      'default',
      'hero',
      'services',
      'about',
      'process',
      'products',
      'stats',
      'cta',
      'page'
    ].includes(v)
  },
  surface: { type: Boolean, default: false }
})
</script>

<template>
  <component
    :is="as"
    :id="id"
    :class="[
      'nf-section-layer',
      noPadding ? '' : 'nf-section',
      surface ? 'nf-section-surface' : '',
      extraClass
    ]"
  >
    <UiSectionBackdrop v-if="backdrop" :variant="backdrop" />
    <div class="nf-section-content max-w-7xl mx-auto px-6">
      <slot />
    </div>
  </component>
</template>
