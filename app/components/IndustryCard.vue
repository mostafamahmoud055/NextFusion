<script setup>
defineProps({
  industry: { type: Object, required: true }
})
</script>

<template>
  <div class="nf-industry-card nf-card h-full p-5 nf-animate">
    <div class="flex size-10 items-center justify-center rounded-lg bg-white/5 border border-white/8 mb-3">
      <UIcon :name="industry.icon" class="size-5 text-nf-cyan" />
    </div>
    <h3 class="font-medium text-white text-sm mb-1.5">
      {{ industry.name }}
    </h3>
    <p class="text-sm text-slate-500 leading-relaxed">
      {{ industry.description }}
    </p>
  </div>
</template>
