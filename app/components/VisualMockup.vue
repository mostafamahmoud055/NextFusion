<script setup>
defineProps({
  variant: {
    type: String,
    default: 'dashboard',
    validator: v => ['dashboard', 'analytics', 'erp', 'transformation'].includes(v)
  },
  label: { type: String, default: '' }
})
</script>

<template>
  <div class="nf-mockup-pedestal nf-animate" data-reveal="scale">
    <div class="nf-mockup">
    <div class="nf-mockup__chrome">
      <span class="nf-mockup__dot nf-mockup__dot--red" />
      <span class="nf-mockup__dot nf-mockup__dot--yellow" />
      <span class="nf-mockup__dot nf-mockup__dot--green" />
      <span v-if="label" class="nf-mockup__label">{{ label }}</span>
    </div>

    <!-- ERP / enterprise dashboard -->
    <svg
      v-if="variant === 'dashboard' || variant === 'erp'"
      class="nf-mockup__svg"
      viewBox="0 0 640 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      :aria-label="label || 'Enterprise dashboard mockup'"
    >
      <rect width="640" height="400" fill="#0f1419" />
      <rect x="0" y="0" width="140" height="400" fill="#121820" />
      <rect x="16" y="24" width="108" height="8" rx="4" fill="#1e293b" />
      <rect x="16" y="48" width="88" height="6" rx="3" fill="#22d3ee" fill-opacity="0.35" />
      <rect x="16" y="68" width="88" height="6" rx="3" fill="#1e293b" />
      <rect x="16" y="88" width="88" height="6" rx="3" fill="#1e293b" />
      <rect x="16" y="108" width="88" height="6" rx="3" fill="#1e293b" />
      <rect x="16" y="128" width="88" height="6" rx="3" fill="#1e293b" />
      <rect x="160" y="24" width="200" height="14" rx="4" fill="#1e293b" />
      <rect x="160" y="52" width="120" height="72" rx="8" fill="#121820" stroke="#1e293b" />
      <rect x="168" y="88" width="24" height="28" rx="3" fill="#22d3ee" fill-opacity="0.5" />
      <rect x="198" y="72" width="24" height="44" rx="3" fill="#8b5cf6" fill-opacity="0.45" />
      <rect x="228" y="80" width="24" height="36" rx="3" fill="#22d3ee" fill-opacity="0.35" />
      <rect x="258" y="64" width="24" height="52" rx="3" fill="#e8b923" fill-opacity="0.4" />
      <rect x="296" y="52" width="120" height="72" rx="8" fill="#121820" stroke="#1e293b" />
      <circle cx="356" cy="88" r="28" stroke="#22d3ee" stroke-opacity="0.4" stroke-width="8" fill="none" stroke-dasharray="120 40" transform="rotate(-90 356 88)" />
      <rect x="160" y="140" width="456" height="120" rx="8" fill="#121820" stroke="#1e293b" />
      <rect x="176" y="156" width="80" height="6" rx="3" fill="#334155" />
      <rect x="176" y="176" width="424" height="1" fill="#1e293b" />
      <rect x="176" y="192" width="100" height="6" rx="3" fill="#475569" />
      <rect x="300" y="192" width="80" height="6" rx="3" fill="#475569" />
      <rect x="404" y="192" width="60" height="6" rx="3" fill="#22d3ee" fill-opacity="0.5" />
      <rect x="500" y="192" width="80" height="6" rx="3" fill="#475569" />
      <rect x="176" y="212" width="100" height="6" rx="3" fill="#475569" />
      <rect x="300" y="212" width="80" height="6" rx="3" fill="#475569" />
      <rect x="404" y="212" width="60" height="6" rx="3" fill="#475569" />
      <rect x="500" y="212" width="80" height="6" rx="3" fill="#22d3ee" fill-opacity="0.35" />
      <rect x="160" y="276" width="220" height="100" rx="8" fill="#121820" stroke="#1e293b" />
      <path d="M176 350 L220 310 L260 330 L310 280 L360 300 L400 260" stroke="#22d3ee" stroke-width="2" stroke-opacity="0.6" stroke-linecap="round" stroke-linejoin="round" />
      <rect x="396" y="276" width="220" height="100" rx="8" fill="#121820" stroke="#1e293b" />
      <rect x="412" y="320" width="40" height="40" rx="4" fill="#22d3ee" fill-opacity="0.25" />
      <rect x="460" y="300" width="40" height="60" rx="4" fill="#8b5cf6" fill-opacity="0.25" />
      <rect x="508" y="310" width="40" height="50" rx="4" fill="#e8b923" fill-opacity="0.25" />
      <rect x="556" y="290" width="40" height="70" rx="4" fill="#22d3ee" fill-opacity="0.2" />
    </svg>

    <!-- Analytics dashboard -->
    <svg
      v-else-if="variant === 'analytics'"
      class="nf-mockup__svg"
      viewBox="0 0 640 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      :aria-label="label || 'Analytics dashboard mockup'"
    >
      <rect width="640" height="400" fill="#0f1419" />
      <rect x="24" y="24" width="180" height="10" rx="4" fill="#1e293b" />
      <rect x="24" y="48" width="280" height="140" rx="10" fill="#121820" stroke="#1e293b" />
      <path d="M48 160 L100 120 L150 140 L200 90 L260 110 L300 70" stroke="#22d3ee" stroke-width="2.5" stroke-opacity="0.65" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M48 170 L100 150 L150 155 L200 130 L260 135 L300 115" stroke="#8b5cf6" stroke-width="1.5" stroke-opacity="0.45" stroke-linecap="round" />
      <rect x="324" y="48" width="292" height="64" rx="10" fill="#121820" stroke="#1e293b" />
      <rect x="340" y="72" width="80" height="6" rx="3" fill="#22d3ee" fill-opacity="0.45" />
      <rect x="340" y="88" width="120" height="8" rx="4" fill="#f8fafc" fill-opacity="0.85" />
      <rect x="324" y="128" width="140" height="60" rx="10" fill="#121820" stroke="#1e293b" />
      <rect x="476" y="128" width="140" height="60" rx="10" fill="#121820" stroke="#1e293b" />
      <rect x="340" y="152" width="48" height="24" rx="4" fill="#22d3ee" fill-opacity="0.3" />
      <rect x="492" y="148" width="48" height="28" rx="4" fill="#e8b923" fill-opacity="0.3" />
      <rect x="24" y="208" width="592" height="168" rx="10" fill="#121820" stroke="#1e293b" />
      <rect x="48" y="320" width="36" height="40" rx="4" fill="#22d3ee" fill-opacity="0.35" />
      <rect x="96" y="290" width="36" height="70" rx="4" fill="#8b5cf6" fill-opacity="0.3" />
      <rect x="144" y="310" width="36" height="50" rx="4" fill="#22d3ee" fill-opacity="0.25" />
      <rect x="192" y="270" width="36" height="90" rx="4" fill="#e8b923" fill-opacity="0.3" />
      <rect x="240" y="300" width="36" height="60" rx="4" fill="#22d3ee" fill-opacity="0.3" />
      <rect x="288" y="285" width="36" height="75" rx="4" fill="#8b5cf6" fill-opacity="0.25" />
      <rect x="336" y="305" width="36" height="55" rx="4" fill="#22d3ee" fill-opacity="0.28" />
      <rect x="384" y="275" width="36" height="85" rx="4" fill="#e8b923" fill-opacity="0.25" />
      <rect x="432" y="295" width="36" height="65" rx="4" fill="#22d3ee" fill-opacity="0.32" />
      <rect x="480" y="315" width="36" height="45" rx="4" fill="#8b5cf6" fill-opacity="0.28" />
      <rect x="528" y="280" width="36" height="80" rx="4" fill="#22d3ee" fill-opacity="0.22" />
    </svg>

    <!-- Digital transformation workflow -->
    <svg
      v-else-if="variant === 'transformation'"
      class="nf-mockup__svg"
      viewBox="0 0 640 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      :aria-label="label || 'Digital transformation workflow mockup'"
    >
      <rect width="640" height="400" fill="#0f1419" />
      <rect x="40" y="60" width="120" height="80" rx="10" fill="#121820" stroke="#1e293b" />
      <rect x="56" y="88" width="88" height="6" rx="3" fill="#475569" />
      <rect x="56" y="104" width="64" height="6" rx="3" fill="#22d3ee" fill-opacity="0.4" />
      <path d="M160 100 H220" stroke="#334155" stroke-width="1.5" stroke-dasharray="4 4" />
      <polygon points="220,100 212,96 212,104" fill="#334155" />
      <rect x="220" y="60" width="120" height="80" rx="10" fill="#121820" stroke="#22d3ee" stroke-opacity="0.25" />
      <rect x="236" y="88" width="88" height="6" rx="3" fill="#475569" />
      <rect x="236" y="104" width="72" height="6" rx="3" fill="#8b5cf6" fill-opacity="0.4" />
      <path d="M340 100 H400" stroke="#334155" stroke-width="1.5" stroke-dasharray="4 4" />
      <polygon points="400,100 392,96 392,104" fill="#334155" />
      <rect x="400" y="60" width="120" height="80" rx="10" fill="#121820" stroke="#1e293b" />
      <rect x="416" y="88" width="88" height="6" rx="3" fill="#475569" />
      <rect x="416" y="104" width="56" height="6" rx="3" fill="#e8b923" fill-opacity="0.4" />
      <path d="M520 100 H580" stroke="#334155" stroke-width="1.5" stroke-dasharray="4 4" />
      <polygon points="580,100 572,96 572,104" fill="#334155" />
      <rect x="500" y="60" width="100" height="80" rx="10" fill="#121820" stroke="#1e293b" />
      <rect x="40" y="200" width="560" height="160" rx="10" fill="#121820" stroke="#1e293b" />
      <rect x="64" y="228" width="160" height="8" rx="4" fill="#334155" />
      <rect x="64" y="256" width="120" height="6" rx="3" fill="#475569" />
      <rect x="64" y="276" width="200" height="6" rx="3" fill="#475569" />
      <rect x="64" y="296" width="160" height="6" rx="3" fill="#475569" />
      <rect x="64" y="316" width="180" height="6" rx="3" fill="#22d3ee" fill-opacity="0.35" />
      <rect x="360" y="228" width="216" height="100" rx="8" fill="#0f1419" stroke="#1e293b" />
      <circle cx="420" cy="278" r="32" stroke="#22d3ee" stroke-opacity="0.35" stroke-width="6" fill="none" />
      <rect x="480" y="250" width="80" height="56" rx="6" fill="#1e293b" />
      <rect x="492" y="262" width="56" height="6" rx="3" fill="#22d3ee" fill-opacity="0.4" />
      <rect x="492" y="278" width="40" height="6" rx="3" fill="#475569" />
      <rect x="492" y="294" width="48" height="6" rx="3" fill="#475569" />
    </svg>
    </div>
  </div>
</template>
