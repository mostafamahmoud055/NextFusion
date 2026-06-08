<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  align: { type: String, default: 'start' }
})
</script>

<template>
  <div
    class="max-w-3xl mb-16 nf-animate"
    data-reveal="fade-up"
    :class="align === 'center' ? 'mx-auto text-center' : ''"
  >
    <p v-if="eyebrow" class="nf-eyebrow mb-3">
      {{ eyebrow }}
    </p>
    <div
      class="nf-section-accent-line mb-5"
      :class="align === 'center' ? 'nf-section-accent-line--center' : ''"
      aria-hidden="true"
    />
    <h2 class="nf-heading mb-4">
      {{ title }}
    </h2>
    <p v-if="description" class="nf-lead">
      {{ description }}
    </p>
  </div>
</template>
