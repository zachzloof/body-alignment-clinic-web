/**
 * Site-wide facts: contact details, social links, and the booking diaries.
 * Everything here is the client's own information, taken from
 * teamstraightspine.com. Edit here and every page updates.
 */

export const site = {
  name: 'Body Alignment Clinic',
  alternateName: 'Team Straight Spine',
  /** Canonical origin, used for canonical links, Open Graph and the sitemap. */
  url: 'https://www.teamstraightspine.com',
  tagline: 'Pain management, treatment and rehabilitation in Rainham, Essex.',
}

export const contact = {
  phone: '07745 206055',
  phoneHref: 'tel:+447745206055',
  phoneE164: '+447745206055',
  email: 'Sam@teamstraightspine.com',
  emailHref: 'mailto:Sam@teamstraightspine.com',
  addressLines: ['3rd Floor, Rainham House', 'New Road, Rainham', 'Essex, RM13 8RE'],
  postal: {
    streetAddress: '3rd Floor, Rainham House, New Road',
    addressLocality: 'Rainham',
    addressRegion: 'Essex',
    postalCode: 'RM13 8RE',
    addressCountry: 'GB',
  },
  mapsUrl: 'https://maps.app.goo.gl/JBDbQFh3NpyZdrh48?g_st=ic',
}

export const social = {
  instagramHandle: '@bodyalignmentclinic',
  instagram: 'https://www.instagram.com/bodyalignmentclinic/',
  youtube: 'https://www.youtube.com/channel/UCPwBwtSYf5AQMUpNQA0ipqw',
  facebook: 'https://www.facebook.com/BodyAlignmentEssex/',
}

/**
 * Acuity Scheduling diaries. These are the same diaries the current site
 * embeds, checked against Acuity itself on 13 Nov 2026:
 *
 *  - 986285bb is the clinic's own account ("Body Alignment Clinic"). Sam,
 *    Hollie and Mason & Sam are categories/calendars inside it.
 *  - b9fa31a1 is "Hollie Perfect - The Pilates Clinic" (Reformer sessions).
 *  - body-alignment-techniques.as.me is the Academy account. It loads but
 *    currently lists no bookable courses.
 *
 * NOT used: bodyalignmenttechnique.as.me, which the current site embeds as
 * the general clinic diary. Acuity reports that account as "Scheduling is
 * currently unavailable. Bookings are paused." General clinic booking goes
 * through the /book-appointment hub to the three working diaries instead.
 */
export const diaries = {
  sam: 'https://app.acuityscheduling.com/schedule/986285bb/?categories[]=1.%20Book%20with%20Sam%3A%20',
  masonSam: 'https://app.acuityscheduling.com/schedule.php?owner=20383843&calendarID=9664201',
  hollie: 'https://app.acuityscheduling.com/schedule/986285bb/?categories[]=2.%20Book%20with%20Hollie',
  pilates: 'https://app.acuityscheduling.com/schedule/b9fa31a1',
  academy: 'https://body-alignment-techniques.as.me/schedule.php',
} as const

/** Products in the existing Squarespace store. Purchase buttons link here. */
export const store = {
  hyper8TwelveWeek: 'https://www.teamstraightspine.com/store/p/nutritionplan',
  hyper8Home: 'https://www.teamstraightspine.com/store/p/home-strength-shred-plan',
} as const

export interface NavItem {
  label: string
  to: string
  /** shows this sub-brand's colour dot beside the label */
  brand?: 'clinic' | 'pilates' | 'hyper8' | 'academy'
}

export const mainNav: NavItem[] = [
  { label: 'Our Team', to: '/our-team' },
  { label: 'Body Alignment Clinic', to: '/body-alignment-clinic', brand: 'clinic' },
  { label: 'The Pilates Clinic', to: '/the-pilates-clinic', brand: 'pilates' },
  { label: 'Hyper 8', to: '/hyper-8', brand: 'hyper8' },
  { label: 'Body Alignment Academy', to: '/body-alignment-academy', brand: 'academy' },
  { label: 'FAQ & Contact', to: '/faq-contact' },
]
