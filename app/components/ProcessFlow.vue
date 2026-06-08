<script setup>
const { methodology } = useSiteData()
const flowRef = ref(null)

useRevealGroup(flowRef, '.nf-process-flow__step')
</script>

<template>
  <div
    ref="flowRef"
    class="nf-process-flow"
    data-reveal-container
    data-reveal-group="fade-up"
  >
    <div
      v-for="(step, index) in methodology"
      :key="step.title"
      class="nf-process-flow__step"
    >
      <div class="nf-process-flow__track">
        <div class="nf-process-flow__node">
          <span class="nf-process-flow__number">{{ String(index + 1).padStart(2, '0') }}</span>
          <UIcon :name="step.icon" class="size-4 text-nf-cyan" />
        </div>
        <div
          v-if="index < methodology.length - 1"
          class="nf-process-flow__line"
          aria-hidden="true"
        />
      </div>
      <div class="nf-process-flow__body">
        <h3 class="text-sm font-semibold text-white mb-1.5 leading-snug">
          {{ step.title }}
        </h3>
        <p class="text-xs text-slate-500 leading-relaxed">
          {{ step.description }}
        </p>
      </div>
    </div>
  </div>
</template>
