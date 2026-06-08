<script setup>
defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: v => [
      'default',
      'hero',
      'services',
      'about',
      'process',
      'products',
      'stats',
      'cta',
      'page'
    ].includes(v)
  }
})
</script>

<template>
  <div
    class="nf-section-backdrop"
    :class="`nf-section-backdrop--${variant}`"
    aria-hidden="true"
  >
    <!-- Hero — dashboard-inspired arcs -->
    <svg
      v-if="variant === 'hero'"
      class="nf-section-backdrop__svg"
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="620" cy="300" r="240" stroke="rgb(34 211 238)" stroke-opacity="0.07" stroke-width="1" />
      <circle cx="620" cy="300" r="180" stroke="rgb(255 255 255)" stroke-opacity="0.04" stroke-width="1" stroke-dasharray="4 8" />
      <path d="M520 80 L720 80 L720 520" stroke="rgb(34 211 238)" stroke-opacity="0.06" stroke-width="1" />
      <rect x="560" y="200" width="120" height="80" rx="8" stroke="rgb(255 255 255)" stroke-opacity="0.05" stroke-width="1" />
    </svg>

    <!-- Services — module grid -->
    <svg
      v-else-if="variant === 'services'"
      class="nf-section-backdrop__svg"
      viewBox="0 0 600 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="40" y="40" width="100" height="70" rx="8" stroke="rgb(34 211 238)" stroke-opacity="0.06" stroke-width="1" />
      <rect x="160" y="40" width="100" height="70" rx="8" stroke="rgb(255 255 255)" stroke-opacity="0.04" stroke-width="1" />
      <rect x="280" y="40" width="100" height="70" rx="8" stroke="rgb(255 255 255)" stroke-opacity="0.04" stroke-width="1" />
      <path d="M40 200 H500" stroke="rgb(34 211 238)" stroke-opacity="0.05" stroke-width="1" stroke-dasharray="5 7" />
      <circle cx="480" cy="280" r="80" stroke="rgb(139 92 246)" stroke-opacity="0.05" stroke-width="1" />
    </svg>

    <!-- About — analytics lines -->
    <svg
      v-else-if="variant === 'about'"
      class="nf-section-backdrop__svg"
      viewBox="0 0 700 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M60 380 L160 300 L240 340 L340 220 L440 260 L540 180" stroke="rgb(34 211 238)" stroke-opacity="0.07" stroke-width="1.5" stroke-linecap="round" />
      <rect x="480" y="60" width="180" height="120" rx="10" stroke="rgb(255 255 255)" stroke-opacity="0.05" stroke-width="1" />
      <line x1="500" y1="100" x2="640" y2="100" stroke="rgb(255 255 255)" stroke-opacity="0.04" stroke-width="1" />
      <line x1="500" y1="130" x2="600" y2="130" stroke="rgb(255 255 255)" stroke-opacity="0.04" stroke-width="1" />
    </svg>

    <!-- Process — workflow nodes -->
    <svg
      v-else-if="variant === 'process'"
      class="nf-section-backdrop__svg"
      viewBox="0 0 800 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="80" y="160" width="80" height="56" rx="8" stroke="rgb(34 211 238)" stroke-opacity="0.06" stroke-width="1" />
      <rect x="240" y="160" width="80" height="56" rx="8" stroke="rgb(255 255 255)" stroke-opacity="0.05" stroke-width="1" />
      <rect x="400" y="160" width="80" height="56" rx="8" stroke="rgb(255 255 255)" stroke-opacity="0.05" stroke-width="1" />
      <rect x="560" y="160" width="80" height="56" rx="8" stroke="rgb(232 185 35)" stroke-opacity="0.05" stroke-width="1" />
      <path d="M160 188 H240 M320 188 H400 M480 188 H560" stroke="rgb(255 255 255)" stroke-opacity="0.05" stroke-width="1" stroke-dasharray="4 6" />
      <circle cx="680" cy="100" r="60" stroke="rgb(34 211 238)" stroke-opacity="0.05" stroke-width="1" />
    </svg>

    <!-- Products — platform blocks -->
    <svg
      v-else-if="variant === 'products'"
      class="nf-section-backdrop__svg"
      viewBox="0 0 600 450"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="380" y="80" width="180" height="140" rx="12" stroke="rgb(34 211 238)" stroke-opacity="0.06" stroke-width="1" />
      <rect x="400" y="110" width="140" height="8" rx="4" fill="rgb(255 255 255)" fill-opacity="0.03" />
      <rect x="400" y="140" width="100" height="6" rx="3" fill="rgb(255 255 255)" fill-opacity="0.025" />
      <rect x="400" y="160" width="120" height="6" rx="3" fill="rgb(255 255 255)" fill-opacity="0.025" />
      <circle cx="120" cy="320" r="100" stroke="rgb(255 255 255)" stroke-opacity="0.04" stroke-width="1" />
    </svg>

    <!-- Stats — metric ticks -->
    <svg
      v-else-if="variant === 'stats'"
      class="nf-section-backdrop__svg nf-section-backdrop__svg--wide"
      viewBox="0 0 1200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="0" y1="100" x2="1200" y2="100" stroke="rgb(34 211 238)" stroke-opacity="0.05" stroke-width="1" />
      <line x1="200" y1="60" x2="200" y2="140" stroke="rgb(255 255 255)" stroke-opacity="0.04" stroke-width="1" />
      <line x1="400" y1="70" x2="400" y2="130" stroke="rgb(255 255 255)" stroke-opacity="0.04" stroke-width="1" />
      <line x1="600" y1="50" x2="600" y2="150" stroke="rgb(255 255 255)" stroke-opacity="0.04" stroke-width="1" />
      <line x1="800" y1="70" x2="800" y2="130" stroke="rgb(255 255 255)" stroke-opacity="0.04" stroke-width="1" />
      <line x1="1000" y1="60" x2="1000" y2="140" stroke="rgb(255 255 255)" stroke-opacity="0.04" stroke-width="1" />
    </svg>

    <!-- CTA — focused spotlight frame -->
    <svg
      v-else-if="variant === 'cta'"
      class="nf-section-backdrop__svg nf-section-backdrop__svg--center"
      viewBox="0 0 600 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="100" y="80" width="400" height="240" rx="16" stroke="rgb(34 211 238)" stroke-opacity="0.06" stroke-width="1" />
      <rect x="130" y="110" width="340" height="180" rx="12" stroke="rgb(255 255 255)" stroke-opacity="0.04" stroke-width="1" stroke-dasharray="6 8" />
    </svg>

    <!-- Default / page -->
    <svg
      v-else
      class="nf-section-backdrop__svg"
      viewBox="0 0 600 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="500" cy="200" r="140" stroke="rgb(255 255 255)" stroke-opacity="0.04" stroke-width="1" />
      <path d="M40 320 L200 200 L360 280" stroke="rgb(34 211 238)" stroke-opacity="0.05" stroke-width="1" />
      <rect x="60" y="60" width="100" height="100" rx="8" stroke="rgb(255 255 255)" stroke-opacity="0.035" stroke-width="1" transform="rotate(-8 110 110)" />
    </svg>

    <div class="nf-section-backdrop__glow" />
  </div>
</template>
