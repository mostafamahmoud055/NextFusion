<script setup>
const { methodology } = useSiteData()
const timelineRef = ref(null)

useRevealGroup(timelineRef, '.nf-step')
</script>

<template>
  <div
    ref="timelineRef"
    class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
    data-reveal-container
    data-reveal-group="fade-up"
  >
    <div
      v-for="(step, index) in methodology"
      :key="step.title"
      class="nf-step nf-glass p-6"
    >
      <div class="flex size-10 items-center justify-center rounded-lg bg-white/5 border border-white/8 mb-4">
        <UIcon :name="step.icon" class="size-5 text-nf-cyan" />
      </div>
      <h3 class="font-semibold text-white text-sm mb-2">
        {{ step.title }}
      </h3>
      <p class="text-sm text-slate-500 leading-relaxed">
        {{ step.description }}
      </p>
    </div>
  </div>
</template>
