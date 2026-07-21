<script setup>
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const toast = useToast()
const config = useRuntimeConfig()

const contactEmail = computed(() => config.public.contactEmail || 'info@nextfusion.net')

const state = reactive({
  name: '',
  email: '',
  company: '',
  phone: '',
  subject: '',
  message: ''
})

const submitting = ref(false)

const inputUi = {
  base: 'bg-white/[0.03] border-white/8 ring-0 focus:ring-1 focus:ring-nf-cyan/35'
}

const subjectOptions = computed(() => {
  void locale.value
  return [
    { label: t('contact.form.subjects.general'), value: 'general' },
    { label: t('contact.form.subjects.demo'), value: 'demo' },
    { label: t('contact.form.subjects.erp'), value: 'erp' },
    { label: t('contact.form.subjects.consulting'), value: 'consulting' },
    { label: t('contact.form.subjects.products'), value: 'products' },
    { label: t('contact.form.subjects.partnership'), value: 'partnership' }
  ]
})

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validate(formState) {
  const errors = []

  if (!formState.name?.trim()) {
    errors.push({ name: 'name', message: t('contact.form.errors.name') })
  }

  if (!formState.email?.trim() || !isValidEmail(formState.email)) {
    errors.push({ name: 'email', message: t('contact.form.errors.email') })
  }

  if (!formState.subject) {
    errors.push({ name: 'subject', message: t('contact.form.errors.subject') })
  }

  if (!formState.message?.trim() || formState.message.trim().length < 20) {
    errors.push({ name: 'message', message: t('contact.form.errors.message') })
  }

  return errors
}

function subjectLabel(value) {
  return subjectOptions.value.find(option => option.value === value)?.label || value
}

async function onSubmit() {
  submitting.value = true

  try {
    await $fetch(`https://formsubmit.co/ajax/${contactEmail.value}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: {
        name: state.name.trim(),
        email: state.email.trim(),
        company: state.company.trim() || '—',
        phone: state.phone.trim() || '—',
        subject: subjectLabel(state.subject),
        message: state.message.trim(),
        _replyto: state.email.trim(),
        _subject: `NextFusion Contact: ${subjectLabel(state.subject)}`,
        _template: 'table',
        _captcha: 'false'
      }
    })

    toast.add({
      title: t('common.messageSent'),
      description: t('common.messageSentDesc'),
      color: 'success',
      icon: 'i-lucide-check-circle'
    })

    Object.assign(state, {
      name: '',
      email: '',
      company: '',
      phone: '',
      subject: '',
      message: ''
    })
  } catch {
    toast.add({
      title: t('common.messageError'),
      description: t('common.messageErrorDesc'),
      color: 'error',
      icon: 'i-lucide-alert-circle'
    })
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div>
    <div class="mb-8">
      <h2 class="text-xl font-semibold text-white mb-2">
        {{ t('contact.form.title') }}
      </h2>
      <p class="text-sm text-slate-500 leading-relaxed">
        {{ t('contact.form.description') }}
      </p>
    </div>

    <UForm
      :state="state"
      :validate="validate"
      :validate-on="['submit']"
      class="space-y-5"
      @submit="onSubmit"
    >
      <div class="grid gap-5 sm:grid-cols-2">
        <UFormField
          :label="t('contact.form.name')"
          name="name"
          required
        >
          <UInput
            v-model="state.name"
            :placeholder="t('contact.form.namePlaceholder')"
            icon="i-lucide-user"
            :ui="{ root: 'w-full', base: inputUi.base }"
            autocomplete="name"
          />
        </UFormField>

        <UFormField
          :label="t('contact.form.email')"
          name="email"
          required
        >
          <UInput
            v-model="state.email"
            type="email"
            :placeholder="t('contact.form.emailPlaceholder')"
            icon="i-lucide-mail"
            :ui="{ root: 'w-full', base: inputUi.base }"
            autocomplete="email"
          />
        </UFormField>
      </div>

      <div class="grid gap-5 sm:grid-cols-2">
        <UFormField
          :label="t('contact.form.company')"
          name="company"
        >
          <UInput
            v-model="state.company"
            :placeholder="t('contact.form.companyPlaceholder')"
            icon="i-lucide-building-2"
            :ui="{ root: 'w-full', base: inputUi.base }"
            autocomplete="organization"
          />
        </UFormField>

        <UFormField
          :label="t('contact.form.phone')"
          name="phone"
        >
          <UInput
            v-model="state.phone"
            type="tel"
            :placeholder="t('contact.form.phonePlaceholder')"
            icon="i-lucide-phone"
            :ui="{ root: 'w-full', base: inputUi.base }"
            autocomplete="tel"
          />
        </UFormField>
      </div>

      <UFormField
        :label="t('contact.form.subject')"
        name="subject"
        required
      >
        <USelect
          v-model="state.subject"
          :items="subjectOptions"
          :placeholder="t('contact.form.subjectPlaceholder')"
          :content="{ position: 'popper', side: 'bottom', sideOffset: 4 }"
          :ui="{ root: 'w-full', base: `${inputUi.base} w-full` }"
        />
      </UFormField>

      <UFormField
        :label="t('contact.form.message')"
        name="message"
        required
      >
        <UTextarea
          v-model="state.message"
          :placeholder="t('contact.form.messagePlaceholder')"
          :rows="6"
          class="w-full"
          :ui="{ root: 'w-full', base: `${inputUi.base} w-full resize-y min-h-[140px]` }"
        />
      </UFormField>

      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
        <p class="text-xs text-slate-600 max-w-sm">
          {{ t('contact.form.privacy') }}
        </p>
        <UButton
          type="submit"
          :label="t('common.sendMessage')"
          size="lg"
          icon="i-lucide-send"
          :loading="submitting"
          :disabled="submitting"
          class="nf-btn-primary text-white border-0 w-full sm:w-auto px-8 shrink-0"
        />
      </div>
    </UForm>
  </div>
</template>
