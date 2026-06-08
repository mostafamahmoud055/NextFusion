<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  description: { type: String, default: '' }
})
</script>

<template>
  <section
    class="nf-section-layer nf-section-surface pt-32 pb-16 lg:pt-40 lg:pb-20"
    data-reveal-immediate
  >
    <UiSectionBackdrop variant="page" />
    <div class="nf-section-content max-w-7xl mx-auto px-6">
      <div class="max-w-3xl nf-animate" data-reveal="fade-up">
        <p v-if="eyebrow" class="nf-eyebrow mb-4">
          {{ eyebrow }}
        </p>
        <h1 class="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-6">
          {{ title }}
        </h1>
        <p
          v-if="description"
          class="nf-lead"
        >
          {{ description }}
        </p>
      </div>
    </div>
  </section>
</template>
