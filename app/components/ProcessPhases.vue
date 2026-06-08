<script setup>
import { useI18n } from 'vue-i18n'

const { processPhases } = useSiteData()
const { t } = useI18n()

const tabItems = computed(() =>
  processPhases.value.map((phase, index) => ({
    label: phase.title,
    icon: phase.icon,
    value: phase.key,
    index: index + 1,
    description: phase.description,
    steps: phase.steps
  }))
)
</script>

<template>
  <UTabs
    :items="tabItems"
    :default-value="tabItems[0]?.value"
    class="w-full"
    :ui="{
      list: 'flex flex-wrap gap-2 p-1.5 nf-glass rounded-xl border border-white/8',
      trigger: 'px-4 py-2.5 text-sm font-medium text-slate-400 data-[state=active]:text-white rounded-lg transition-colors gap-2',
      indicator: 'bg-white/8 rounded-lg',
      content: 'pt-8 lg:pt-10'
    }"
  >
    <template #leading="{ item }">
      <span class="text-[10px] font-bold text-nf-cyan/80 tabular-nums">
        {{ String(item.index).padStart(2, '0') }}
      </span>
    </template>

    <template #content="{ item }">
      <div class="grid lg:grid-cols-5 gap-8 lg:gap-12">
        <div class="lg:col-span-2">
          <div class="nf-glass p-6 lg:p-8 lg:sticky lg:top-28">
            <div class="flex items-center gap-4 mb-5">
              <div class="flex size-14 items-center justify-center rounded-xl bg-nf-cyan/10 border border-nf-cyan/20">
                <UIcon :name="item.icon" class="size-7 text-nf-cyan" />
              </div>
              <div>
                <p class="text-xs font-semibold text-nf-cyan/80 uppercase tracking-wider mb-1">
                  {{ t('process.phases.phaseLabel') }} {{ String(item.index).padStart(2, '0') }}
                </p>
                <h3 class="text-lg font-semibold text-white">
                  {{ item.label }}
                </h3>
              </div>
            </div>
            <p class="text-slate-400 leading-relaxed text-sm lg:text-base">
              {{ item.description }}
            </p>
          </div>
        </div>

        <div class="lg:col-span-3 space-y-4">
          <div
            v-for="(step, stepIndex) in item.steps"
            :key="step.title"
            class="nf-phase-step nf-glass p-5 lg:p-6 flex gap-4 nf-animate"
          >
            <div class="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/8 text-xs font-bold text-slate-400 tabular-nums">
              {{ stepIndex + 1 }}
            </div>
            <div>
              <h4 class="font-semibold text-white text-sm mb-2">
                {{ step.title }}
              </h4>
              <p class="text-sm text-slate-500 leading-relaxed">
                {{ step.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </UTabs>
</template>
