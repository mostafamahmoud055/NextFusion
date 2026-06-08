<script setup>
defineProps({
  steps: { type: Array, required: true }
})

const stepsRef = ref(null)
useRevealGroup(stepsRef, '.nf-service-step')
</script>

<template>
  <div
    ref="stepsRef"
    class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
    data-reveal-container
    data-reveal-group="fade-up"
  >
    <div
      v-for="(step, index) in steps"
      :key="step.title"
      class="nf-service-step nf-glass p-5 lg:p-6 flex gap-4"
    >
      <div class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-nf-cyan/10 border border-nf-cyan/20 text-xs font-bold text-nf-cyan tabular-nums">
        {{ index + 1 }}
      </div>
      <div>
        <h4 class="font-semibold text-white text-sm mb-2">
          {{ step.title }}
        </h4>
        <p class="text-sm text-slate-500 leading-relaxed">
          {{ step.description }}
        </p>
      </div>
    </div>
  </div>
</template>
