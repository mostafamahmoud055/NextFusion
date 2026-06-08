<script setup>
useHead({
  htmlAttrs: {
    class: 'dark'
  }
})
</script>

<template>
  <UApp :toaster="{ position: 'top-right' }">
    <div class="min-h-screen text-white relative">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </UApp>
</template>
