/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional. When set, enquiry and request forms POST JSON here. See src/lib/submitEnquiry.ts */
  readonly VITE_FORM_ENDPOINT?: string
}
