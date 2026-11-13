<script setup lang="ts">
import { nextTick, reactive, ref, useId } from 'vue'
import { contact } from '@/content/site'
import { submitEnquiry, type Enquiry, type SubmitResult } from '@/lib/submitEnquiry'

/**
 * One form component for both the contact form and the emergency / home
 * visit request form. The fields come in as data; validation, error
 * messages, focus handling and the sending states live here.
 *
 * Sending goes through submitEnquiry() and nowhere else.
 */
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select'
  autocomplete?: string
  options?: readonly string[]
  placeholder?: string
  /** shown when the field is left empty, e.g. "Enter your phone number." */
  requiredMessage: string
  /** preset value, e.g. the enquiry topic carried in from another page */
  initial?: string
}

const props = defineProps<{
  form: Enquiry['form']
  /** subject line of the message the clinic receives */
  subject: string
  fields: FormField[]
  submitLabel: string
}>()

const uid = useId()
const formEl = ref<HTMLFormElement>()
const resultEl = ref<HTMLElement>()

const values = reactive<Record<string, string>>(Object.fromEntries(props.fields.map((f) => [f.name, f.initial ?? ''])))
const errors = reactive<Record<string, string>>({})
const honeypot = ref('')
const state = ref<'idle' | 'sending' | 'failed'>('idle')
const result = ref<SubmitResult>()

function validate(field: FormField): string {
  const value = (values[field.name] ?? '').trim()
  if (!value) return field.requiredMessage
  if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
    return 'Enter an email address like name@example.com.'
  }
  if (field.type === 'tel' && value.replace(/\D/g, '').length < 10) {
    return 'Enter a phone number with at least 10 digits, like 07700 900123.'
  }
  return ''
}

// Errors clear as soon as the visitor fixes the field (on input), and are
// raised a moment after leaving it. The short delay matters: showing or
// hiding a message moves the layout, and doing that in the middle of a press
// on "Send" would slide the button out from under the visitor's finger.
let blurTimer: number | undefined
function onInput(field: FormField) {
  if (errors[field.name]) check(field)
}
function onBlur(field: FormField) {
  if (!values[field.name]) return
  window.clearTimeout(blurTimer)
  blurTimer = window.setTimeout(() => check(field), 200)
}

function check(field: FormField) {
  const message = validate(field)
  if (message) errors[field.name] = message
  else delete errors[field.name]
  return !message
}

async function onSubmit() {
  if (state.value === 'sending') return
  window.clearTimeout(blurTimer)
  const firstInvalid = props.fields.filter((f) => !check(f))[0]
  if (firstInvalid) {
    formEl.value?.querySelector<HTMLElement>(`[name="${firstInvalid.name}"]`)?.focus()
    return
  }
  // bots fill every field, including the one people never see
  if (honeypot.value) return

  state.value = 'sending'
  try {
    result.value = await submitEnquiry({
      form: props.form,
      subject: props.subject,
      answers: props.fields.map((f) => [f.label, (values[f.name] ?? '').trim()]),
    })
    state.value = 'idle'
    await nextTick()
    resultEl.value?.focus()
  } catch {
    state.value = 'failed'
  }
}

function editAgain() {
  result.value = undefined
}
</script>

<template>
  <!-- After sending -->
  <div v-if="result" ref="resultEl" class="result" tabindex="-1" role="status">
    <template v-if="result.status === 'sent'">
      <h3>Message sent</h3>
      <p>Thank you. Your message is with the team at Body Alignment Clinic.</p>
    </template>
    <template v-else>
      <h3>One more step: press send in your email app</h3>
      <p>
        Your email app should have opened with your message written and addressed to {{ contact.email }}. Press send
        there to finish.
      </p>
      <p class="actions">
        <a class="btn primary" :href="result.mailto">Open the email again</a>
        <a class="btn" :href="contact.phoneHref">Call {{ contact.phone }}</a>
      </p>
    </template>
    <p><button type="button" class="textlink plain" @click="editAgain">Change my answers</button></p>
  </div>

  <!-- `novalidate` because we show our own messages; without JavaScript the
       form posts nowhere, so the phone and email links beside it are the fallback. -->
  <form v-else ref="formEl" class="form" novalidate @submit.prevent="onSubmit">
    <div v-for="f in fields" :key="f.name" class="field" :class="{ wide: f.type === 'textarea' }">
      <label :for="`${uid}-${f.name}`">{{ f.label }}</label>

      <select
        v-if="f.type === 'select'"
        :id="`${uid}-${f.name}`"
        v-model="values[f.name]"
        :name="f.name"
        required
        :aria-invalid="errors[f.name] ? 'true' : undefined"
        :aria-describedby="errors[f.name] ? `${uid}-${f.name}-err` : undefined"
        @change="onInput(f)"
      >
        <option value="" disabled>Select…</option>
        <option v-for="o in f.options" :key="o" :value="o">{{ o }}</option>
      </select>

      <textarea
        v-else-if="f.type === 'textarea'"
        :id="`${uid}-${f.name}`"
        v-model="values[f.name]"
        :name="f.name"
        rows="5"
        autocomplete="off"
        required
        :placeholder="f.placeholder"
        :aria-invalid="errors[f.name] ? 'true' : undefined"
        :aria-describedby="errors[f.name] ? `${uid}-${f.name}-err` : undefined"
        @input="onInput(f)"
        @blur="onBlur(f)"
      />

      <input
        v-else
        :id="`${uid}-${f.name}`"
        v-model="values[f.name]"
        :name="f.name"
        :type="f.type"
        :inputmode="f.type === 'tel' ? 'tel' : f.type === 'email' ? 'email' : undefined"
        :autocomplete="f.autocomplete"
        :spellcheck="f.type === 'text' ? undefined : false"
        :placeholder="f.placeholder"
        required
        :aria-invalid="errors[f.name] ? 'true' : undefined"
        :aria-describedby="errors[f.name] ? `${uid}-${f.name}-err` : undefined"
        @input="onInput(f)"
        @blur="onBlur(f)"
      />

      <p v-if="errors[f.name]" :id="`${uid}-${f.name}-err`" class="error">{{ errors[f.name] }}</p>
    </div>

    <!-- honeypot: hidden from people and assistive tech -->
    <div class="hp" aria-hidden="true">
      <label :for="`${uid}-company`">Company</label>
      <input :id="`${uid}-company`" v-model="honeypot" type="text" name="company" tabindex="-1" autocomplete="off" />
    </div>

    <div class="submit wide">
      <button class="btn primary" type="submit" :aria-disabled="state === 'sending'">
        {{ state === 'sending' ? 'Sending…' : submitLabel }}
      </button>
      <p v-if="state === 'failed'" class="error" role="alert">
        That didn’t send. Please try again, or call
        <a :href="contact.phoneHref">{{ contact.phone }}</a> or email
        <a :href="contact.emailHref">{{ contact.email }}</a>.
      </p>
    </div>
  </form>
</template>

<style scoped>
.form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.1rem 0.9rem;
}
.wide,
/* a lone field left on its own row takes the full width */
.field:nth-child(odd):has(+ .wide) {
  grid-column: 1 / -1;
}
.submit {
  display: grid;
  gap: 0.8rem;
  justify-items: start;
}
.submit .error {
  color: var(--danger);
  font-weight: 600;
  font-size: 0.92rem;
  margin: 0;
}
.field .error {
  margin: 0;
}
.hp {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
.result {
  border: 2px solid var(--ink);
  border-radius: 20px;
  padding: 1.6rem;
  background: var(--bg);
}
.result:focus {
  outline: none;
}
.result h3 {
  font-size: 1.35rem;
  line-height: 1.15;
  margin-bottom: 0.7rem;
}
.result p {
  margin: 0 0 1rem;
  color: var(--ink2);
  max-width: 38em;
}
.result p:last-child {
  margin-bottom: 0;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}
.plain {
  background: none;
  border: 0;
  padding: 0.4rem 0;
  cursor: pointer;
}
@media (max-width: 560px) {
  .form {
    grid-template-columns: 1fr;
  }
  .submit .btn {
    width: 100%;
  }
}
</style>
