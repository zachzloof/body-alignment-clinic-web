// Type augmentations. The imports make this file a module, so the
// `declare module` blocks below extend the libraries' types rather than
// replacing them.
import type { BrandKey } from './brands'
import type { vReveal } from './lib/reveal'

declare module 'vue-router' {
  interface RouteMeta {
    /** Which sub-brand's colour, logo and call to action this page takes. */
    brand: BrandKey
    /** <title> and og:title (the site name is added automatically) */
    title: string
    /** meta description and og:description */
    description: string
    /** file name (without extension) in public/og/ */
    ogImage?: string
  }
}

declare module 'vue' {
  interface GlobalDirectives {
    vReveal: typeof vReveal
  }
}
