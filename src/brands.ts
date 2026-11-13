/**
 * The one place the four sub-brands are defined.
 *
 * A route declares `meta.brand`; everything else follows from the record here:
 * the colour tokens (written onto the app root as CSS custom properties), the
 * logo shown in the nav, and the primary call to action.
 *
 * Colours come from the approved "Concept 4, Colour" mock. Two were nudged so
 * text passes WCAG AA (4.5:1). `npm run check:contrast` verifies every pair.
 *   - Hyper 8 red: mock #E8141C gave black text 4.16:1, now #F22A30 (4.71:1).
 *   - Clinic blue "deep": mock #0A7FA6 gave 4.11:1 on the soft band, now #08739A.
 *
 * Keep this file free of imports so Node can load it directly for the
 * contrast check.
 */

export type BrandKey = 'clinic' | 'pilates' | 'hyper8' | 'academy'

export interface BrandAction {
  label: string
  /** internal route path */
  to?: string
  /** external URL (opens in a new tab) */
  href?: string
}

export interface Brand {
  key: BrandKey
  name: string
  /** route of the sub-brand's own page */
  path: string
  /** the flood colour: nav, hero, primary buttons, footer accent */
  colour: string
  /** darker shade for small text and focus rings on white */
  deep: string
  /** pale tint for alternate section bands */
  soft: string
  /** text colour on top of `colour` */
  onBrand: string
  /**
   * How much of `onBrand` goes into secondary text on the brand colour
   * (0-100). Red has no contrast to spare, so it stays at 100.
   */
  mute: number
  /** key into the image manifest */
  logo: string
  logoAlt: string
  /** the primary call to action in the nav while this brand is active */
  cta: BrandAction
}

export const INK = '#0d0f12'

export const brands: Record<BrandKey, Brand> = {
  clinic: {
    key: 'clinic',
    name: 'Body Alignment Clinic',
    path: '/body-alignment-clinic',
    colour: '#01b1e5',
    deep: '#08739a',
    soft: '#e4f6fc',
    onBrand: INK,
    mute: 82,
    logo: 'logo-clinic',
    logoAlt: 'Body Alignment Clinic',
    cta: { label: 'Book now', to: '/book-appointment' },
  },
  pilates: {
    key: 'pilates',
    name: 'The Pilates Clinic',
    path: '/the-pilates-clinic',
    colour: '#4acdb7',
    deep: '#0f766a',
    soft: '#e0f7f2',
    onBrand: INK,
    mute: 82,
    logo: 'banner-pilates',
    logoAlt: 'The Pilates Clinic',
    cta: { label: 'Book Pilates', to: '/the-pilates-clinic#book' },
  },
  hyper8: {
    key: 'hyper8',
    name: 'Hyper 8',
    path: '/hyper-8',
    colour: '#f22a30',
    deep: '#b10d13',
    soft: '#fde9ea',
    onBrand: INK,
    mute: 100,
    logo: 'logo-hyper8',
    logoAlt: 'Hyper 8',
    cta: { label: 'Buy Hyper 8', href: 'https://www.teamstraightspine.com/store/p/nutritionplan' },
  },
  academy: {
    key: 'academy',
    name: 'Body Alignment Academy',
    path: '/body-alignment-academy',
    colour: '#ffe600',
    deep: '#7a6c00',
    soft: '#fff9c4',
    onBrand: INK,
    mute: 82,
    logo: 'logo-academy',
    logoAlt: 'Body Alignment Academy',
    cta: { label: 'Book a course', to: '/body-alignment-academy-booking-page' },
  },
}

export const brandOrder: BrandKey[] = ['clinic', 'pilates', 'hyper8', 'academy']

/** CSS custom properties for a brand, applied to the app root. */
export function brandVars(brand: Brand): Record<string, string> {
  return {
    '--brand': brand.colour,
    '--brand-deep': brand.deep,
    '--brand-soft': brand.soft,
    '--on-brand': brand.onBrand,
    '--on-brand-muted': `color-mix(in srgb, ${brand.onBrand} ${brand.mute}%, ${brand.colour})`,
  }
}
