import type { RouteRecordRaw } from 'vue-router'

/**
 * Every page declares its sub-brand in `meta.brand`. That one value drives
 * the colour tokens, the nav logo and the primary call to action (see
 * src/brands.ts and App.vue). Pages that don't belong to a sub-brand are
 * clinic blue.
 *
 * Paths match the current Squarespace site so existing links keep working.
 */
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
    meta: {
      brand: 'clinic',
      title: 'Pain management, treatment & rehab in Rainham, Essex',
      description:
        'Body Alignment Clinic in Rainham, Essex. Medical massage, acupuncture, spinal adjustment, cupping and sports physio with Sam Singh and the team. Everyone is welcome.',
      ogImage: 'home',
    },
  },
  {
    path: '/our-team',
    name: 'team',
    component: () => import('@/pages/TeamPage.vue'),
    meta: {
      brand: 'clinic',
      title: 'Our Team',
      description:
        'Meet Sam, Mason, Hollie and Matt, the team at Body Alignment Clinic in Rainham, Essex, and book an appointment with the practitioner you need.',
      ogImage: 'team',
    },
  },
  {
    path: '/faq-contact',
    name: 'contact',
    component: () => import('@/pages/ContactPage.vue'),
    meta: {
      brand: 'clinic',
      title: 'FAQ & Contact',
      description:
        'Session lengths, parking and who we treat, plus how to call, email or find Body Alignment Clinic at Rainham House, New Road, Rainham, Essex RM13 8RE.',
      ogImage: 'home',
    },
  },
  {
    path: '/body-alignment-clinic',
    name: 'clinic',
    component: () => import('@/pages/ClinicPage.vue'),
    meta: {
      brand: 'clinic',
      title: 'Body Alignment Clinic: treatments',
      description:
        'Medical massage, acupuncture, cupping, spinal adjustment, kinesiology taping and sports physio in Rainham, Essex. Book in clinic, or request an emergency or home visit.',
      ogImage: 'clinic',
    },
  },
  {
    path: '/the-pilates-clinic',
    name: 'pilates',
    component: () => import('@/pages/PilatesPage.vue'),
    meta: {
      brand: 'pilates',
      title: 'The Pilates Clinic: Reformer & mat Pilates',
      description:
        '1-1 and 2-1 Reformer Pilates and mat Pilates in Rainham, Essex. Rehabilitation, core strength and form correction with a bespoke programme. Book online.',
      ogImage: 'pilates',
    },
  },
  {
    path: '/hyper-8',
    name: 'hyper8',
    component: () => import('@/pages/Hyper8Page.vue'),
    meta: {
      brand: 'hyper8',
      title: 'Hyper 8: strength & shred plans',
      description:
        'Hyper 8 is a simple approach to strengthen your body whilst dropping unwanted body fat. The 12 week bespoke plan is £549, or follow the home plan for £80.',
      ogImage: 'hyper8',
    },
  },
  {
    path: '/body-alignment-academy',
    name: 'academy',
    component: () => import('@/pages/AcademyPage.vue'),
    meta: {
      brand: 'academy',
      title: 'Body Alignment Academy: courses & mentorship',
      description:
        'Face-to-face courses and mentorship with Sam Singh at Body Alignment Clinic, Rainham: master class, acupuncture and cupping, massage, and a day in clinic.',
      ogImage: 'academy',
    },
  },

  // ----- booking -----
  {
    path: '/book-appointment',
    name: 'book',
    component: () => import('@/pages/BookPage.vue'),
    meta: {
      brand: 'clinic',
      title: 'Book an appointment',
      description:
        'Book an appointment at Body Alignment Clinic, Rainham. Choose Sam, Mason & Sam or Hollie, book Reformer Pilates, or request an emergency or home visit.',
      ogImage: 'clinic',
    },
  },
  {
    path: '/book-with-sam',
    name: 'book-sam',
    component: () => import('@/pages/BookWithPage.vue'),
    props: { practitionerId: 'sam' },
    meta: {
      brand: 'clinic',
      title: 'Book with Sam',
      description: 'Book an appointment with Sam Singh at Body Alignment Clinic, Rainham, Essex, using the online diary.',
      ogImage: 'clinic',
    },
  },
  {
    path: '/book-with-sam-mason',
    name: 'book-mason-sam',
    component: () => import('@/pages/BookWithPage.vue'),
    props: { practitionerId: 'mason-sam' },
    meta: {
      brand: 'clinic',
      title: 'Book with Mason & Sam',
      description: 'Book an appointment with Mason and Sam at Body Alignment Clinic, Rainham, Essex, using the online diary.',
      ogImage: 'clinic',
    },
  },
  {
    path: '/book-with-hollie',
    name: 'book-hollie',
    component: () => import('@/pages/BookWithPage.vue'),
    props: { practitionerId: 'hollie' },
    meta: {
      brand: 'clinic',
      title: 'Book with Hollie',
      description: 'Book an appointment with Hollie at Body Alignment Clinic, Rainham, Essex, using the online diary.',
      ogImage: 'clinic',
    },
  },
  {
    path: '/body-alignment-academy-booking-page',
    name: 'book-academy',
    component: () => import('@/pages/BookAcademyPage.vue'),
    meta: {
      brand: 'academy',
      title: 'Book an Academy course',
      description:
        'Book a Body Alignment Academy course with Sam Singh, or ask about upcoming dates for the master class, acupuncture and cupping, and massage courses.',
      ogImage: 'academy',
    },
  },

  // ----- old addresses -----
  // These also need a server-side redirect on the host; see public/_redirects.
  { path: '/home', redirect: '/' },
  { path: '/book-with-mason', redirect: '/book-with-sam-mason' },
  { path: '/body-alignment-clinic-booking-page', redirect: '/book-appointment' },

  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/NotFoundPage.vue'),
    meta: {
      brand: 'clinic',
      title: 'Page not found',
      description: 'That page is not here. Find the clinic, the team and booking from the home page.',
    },
  },
]
