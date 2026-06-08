<template>
  <div class="flex flex-col min-h-screen relative bg-nf-bg">
    <UiGlobalBackground />
    <LayoutAppHeader />
    <main class="flex-1 relative z-10">
      <slot />
    </main>
    <LayoutAppFooter />
  </div>
</template>
