<script setup>
const { technologies } = useSiteData()
const gridRef = ref(null)

useRevealGroup(gridRef, '[data-tech]')
</script>

<template>
  <div
    ref="gridRef"
    class="flex flex-wrap justify-center gap-4"
    data-reveal-container
    data-reveal-group="scale"
  >
    <div
      v-for="tech in technologies"
      :key="tech.name"
      data-tech
      class="nf-glass rounded-lg px-5 py-3 flex items-center gap-2.5"
    >
      <UIcon
        :name="tech.icon"
        class="size-5 text-nf-cyan"
      />
      <span class="text-sm text-slate-300 font-medium">{{ tech.name }}</span>
    </div>
  </div>
</template>
