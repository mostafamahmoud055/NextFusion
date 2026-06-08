<script setup>
defineProps({
  hover: { type: Boolean, default: true },
  padding: { type: String, default: 'p-6 lg:p-8' },
  extraClass: { type: String, default: '' }
})
</script>

<template>
  <div
    :class="[
      hover ? 'nf-card' : 'nf-glass hover:!transform-none',
      padding,
      extraClass
    ]"
  >
    <slot />
  </div>
</template>
