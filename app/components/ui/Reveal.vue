<script setup>
const el = ref(null)

useReveal(el)
</script>

<template>
  <div ref="el" class="nf-animate" data-reveal="fade-up">
    <slot />
  </div>
</template>
