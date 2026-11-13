import type { FormField } from '@/components/EnquiryForm.vue'
import { enquiryTopics, requestTypes, type EnquiryTopic } from './shared'

/** The contact form, as on the current site: Name, Email, Inquiries, Message. */
export function contactFields(topic?: EnquiryTopic): FormField[] {
  return [
    { name: 'name', label: 'Name', type: 'text', autocomplete: 'name', requiredMessage: 'Enter your name.' },
    { name: 'email', label: 'Email', type: 'email', autocomplete: 'email', requiredMessage: 'Enter your email address.' },
    {
      name: 'topic',
      label: 'Enquiry about',
      type: 'select',
      options: enquiryTopics,
      initial: topic,
      requiredMessage: 'Choose what your enquiry is about.',
    },
    { name: 'message', label: 'Message', type: 'textarea', requiredMessage: 'Enter your message.' },
  ]
}

/**
 * The emergency and home visit request form, as on the current site:
 * Name, Phone, Email, Reason for booking, Appointment (with the prices).
 */
export const requestFields: FormField[] = [
  { name: 'name', label: 'Name', type: 'text', autocomplete: 'name', requiredMessage: 'Enter your name.' },
  { name: 'phone', label: 'Phone', type: 'tel', autocomplete: 'tel', requiredMessage: 'Enter your phone number.' },
  { name: 'email', label: 'Email', type: 'email', autocomplete: 'email', requiredMessage: 'Enter your email address.' },
  {
    name: 'appointment',
    label: 'Appointment',
    type: 'select',
    options: requestTypes,
    requiredMessage: 'Choose emergency or home visit.',
  },
  { name: 'reason', label: 'Reason for booking', type: 'textarea', requiredMessage: 'Tell us the reason for booking.' },
]

export function isEnquiryTopic(value: unknown): value is EnquiryTopic {
  return typeof value === 'string' && (enquiryTopics as readonly string[]).includes(value)
}
