<template>
  <div
    class="nf-global-bg fixed inset-0 z-0 pointer-events-none overflow-hidden"
    aria-hidden="true"
  >
    <!-- Base canvas -->
    <div class="nf-global-bg__base absolute inset-0" />

    <!-- Tech grid -->
    <div class="nf-global-bg__grid absolute inset-0" />

    <!-- Fine dot matrix -->
    <div class="nf-global-bg__dots absolute inset-0" />

    <!-- Large geometric shapes -->
    <svg
      class="nf-global-bg__geometry absolute inset-0 size-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="1180"
        cy="140"
        r="280"
        stroke="rgb(61 110 168)"
        stroke-opacity="0.06"
        stroke-width="1"
      />
      <circle
        cx="1180"
        cy="140"
        r="200"
        stroke="rgb(30 58 95)"
        stroke-opacity="0.04"
        stroke-width="1"
        stroke-dasharray="6 10"
      />
      <circle
        cx="180"
        cy="720"
        r="220"
        stroke="rgb(255 255 255)"
        stroke-opacity="0.04"
        stroke-width="1"
      />
      <path
        d="M0 420 C360 380, 480 520, 840 480 S1320 360, 1440 400"
        stroke="rgb(61 110 168)"
        stroke-opacity="0.05"
        stroke-width="1"
      />
      <path
        d="M1200 0 L1440 0 L1440 320"
        stroke="rgb(255 255 255)"
        stroke-opacity="0.05"
        stroke-width="1"
      />
      <rect
        x="80"
        y="120"
        width="160"
        height="160"
        rx="12"
        stroke="rgb(61 110 168)"
        stroke-opacity="0.04"
        stroke-width="1"
        transform="rotate(12 160 200)"
      />
      <polygon
        points="1320,620 1380,560 1440,620 1380,680"
        stroke="rgb(184 151 90)"
        stroke-opacity="0.05"
        stroke-width="1"
      />
    </svg>

    <!-- Soft ambient light — very low opacity, no neon -->
    <div class="nf-global-bg__glow nf-global-bg__glow--top absolute" />
    <div class="nf-global-bg__glow nf-global-bg__glow--side absolute" />
  </div>
</template>
