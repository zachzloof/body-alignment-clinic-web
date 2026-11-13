import { contact } from '@/content/site'

export interface Enquiry {
  /** which form this came from */
  form: 'contact' | 'emergency-home-visit'
  /** subject line for the clinic's inbox */
  subject: string
  /** the visitor's answers, in form order: [label, value] */
  answers: [label: string, value: string][]
}

export type SubmitResult =
  /** delivered to the clinic by the form endpoint */
  | { status: 'sent' }
  /** handed to the visitor's own email app, pre-filled, for them to send */
  | { status: 'email-draft'; mailto: string }

/* ==========================================================================
 *  GO-LIVE: THIS IS THE ONE FUNCTION THAT SENDS THE FORMS
 * ==========================================================================
 *  Both forms on the site (the contact form and the emergency / home visit
 *  request form) call this and nothing else.
 *
 *  Today, on Squarespace, form submissions are emailed to the clinic by
 *  Squarespace itself. This site is static, so it needs somewhere to POST to.
 *
 *  - If VITE_FORM_ENDPOINT is set at build time, the answers are POSTed there
 *    as JSON. Any form backend works (Formspree, Basin, Netlify Forms, a
 *    small serverless function that emails Sam). Adjust the request below to
 *    match whichever is chosen.
 *
 *  - Until then, the visitor's own email app is opened with the message
 *    already written and addressed to the clinic, and the form says so. That
 *    works with no backend, but it depends on the visitor pressing send.
 * ========================================================================== */
export async function submitEnquiry(enquiry: Enquiry): Promise<SubmitResult> {
  const endpoint = import.meta.env.VITE_FORM_ENDPOINT

  if (endpoint) {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        form: enquiry.form,
        subject: enquiry.subject,
        ...Object.fromEntries(enquiry.answers),
      }),
    })
    if (!response.ok) throw new Error(`Form endpoint responded ${response.status}`)
    return { status: 'sent' }
  }

  const body = enquiry.answers.map(([label, value]) => `${label}: ${value}`).join('\n')
  const mailto = `${contact.emailHref}?subject=${encodeURIComponent(enquiry.subject)}&body=${encodeURIComponent(body)}`
  window.open(mailto, '_self')
  return { status: 'email-draft', mailto }
}
