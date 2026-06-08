<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  tagline: { type: String, default: '' },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  description: { type: String, default: '' },
  icon: { type: String, default: 'i-lucide-briefcase' },
  mockupVariant: {
    type: String,
    default: 'dashboard',
    validator: v => ['dashboard', 'analytics', 'erp', 'transformation'].includes(v)
  },
  mockupLabel: { type: String, default: '' }
})
</script>

<template>
  <section
    class="nf-section-layer nf-section-surface pt-32 pb-12 lg:pt-40 lg:pb-16"
    data-reveal-immediate
  >
    <UiSectionBackdrop variant="hero" />
    <div class="nf-section-content max-w-7xl mx-auto px-6">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div class="nf-animate">
          <p
            v-if="eyebrow"
            class="nf-eyebrow mb-4"
          >
            {{ eyebrow }}
          </p>
          <p
            v-if="tagline"
            class="text-xs sm:text-sm font-semibold tracking-[0.12em] text-nf-gold/85 uppercase mb-5 leading-relaxed"
          >
            {{ tagline }}
          </p>
          <h1 class="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-white leading-tight tracking-tight mb-5">
            {{ title }}
          </h1>
          <p
            v-if="subtitle"
            class="text-lg text-slate-300 font-medium mb-4 max-w-xl"
          >
            {{ subtitle }}
          </p>
          <p
            v-if="description"
            class="nf-lead mb-8"
          >
            {{ description }}
          </p>
          <slot />
        </div>

        <div class="nf-animate">
          <VisualMockup
            :variant="mockupVariant"
            :label="mockupLabel"
          />
        </div>
      </div>
    </div>
  </section>
</template>
