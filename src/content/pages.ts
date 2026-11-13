import type { ImageName } from '@/lib/images'
import type { Faq } from './shared'
import { store } from './site'

/** Copy for each sub-brand page. The client's wording, with plain typos fixed. */

export const home = {
  hero: {
    eyebrow: 'Body Alignment Clinic · Rainham, Essex',
    title: 'Pain management, treatment & rehab. Everyone is welcome.',
    lead: 'Injuries, rehab, weight management and wellbeing, with the mentoring, support and aftercare to match. Sam Singh and the team treat anybody and everybody.',
    image: 'sam-skeleton' as ImageName,
    imageAlt: 'Sam Singh explaining sciatica on a skeleton model',
  },
}

export const clinic = {
  hero: {
    eyebrow: 'Solutions · Body Alignment Clinic',
    title: 'Body Alignment Clinic',
    lead: 'At Body Alignment Clinic everyone is welcome.',
    image: 'clinic-room' as ImageName,
    imageAlt: 'The treatment room at Body Alignment Clinic, with a skeleton model, treatment couch and gym rack',
  },
  about:
    'We have a strong passion for helping others and ensuring that we give the best advice, support and aftercare to our clients’ bespoke needs, from injuries, rehab and nutrition through to wellbeing.',
  treatmentsHeading: 'Muscular treatments we offer',
  treatments: [
    'Various forms of medical massage',
    'Acupuncture',
    'Muscular Symmetry',
    'Exercise Form Correction',
    'Kinesiology Taping',
    'Muscle Testing',
    'Cupping',
    'Injury Prevention',
    'Weight Management & Nutrition Plans',
    'Strength & Conditioning Plans',
    'Spinal Adjustment',
    'Seminars',
    'Sports Physio',
  ],
  request: {
    heading: 'Emergency & home visits',
    intro: 'For emergency and home visit bookings please use the request form below.',
  },
}

export const pilates = {
  hero: {
    eyebrow: 'Solutions · The Pilates Clinic',
    title: 'Reformer & mat Pilates',
    lead: 'Welcome to the Pilates Clinic, where we offer Rehabilitation and Reformer Pilates sessions, as well as Mat-based Pilates.',
    image: 'pilates-1' as ImageName,
    imageAlt: 'Hollie standing in the Pilates studio beside a Reformer, under the Pilates Clinic sign',
  },
  about: [
    'Our aim is to teach you to move correctly and confidently, aligning mind, body, and soul.',
    'Our sessions also support you with injury rehabilitation, helping you become more agile, develop greater core strength, and improve your overall body condition.',
  ],
  sessions: ['1-1 Reformer Pilates', '2-1 Reformer Pilates'],
  included: [
    { icon: 'icon-yoga' as ImageName, text: 'Form correction' },
    { icon: 'icon-book' as ImageName, text: 'Bespoke programme' },
    { icon: 'icon-education' as ImageName, text: '1-1 teaching' },
  ],
  achieve: [
    'If you are post-op or recovering from an injury, we can support you with a rehabilitation programme to help strengthen your body and restore your optimal movement performance.',
    'If you’re looking to increase your range of movement, build core strength, and improve your overall body condition, we can offer a programme to support you in achieving that.',
    'You will learn how to move your body correctly and in alignment using the Reformer.',
    'And of course, we’ll have lots of fun while doing so!',
  ],
  offer: 'Book in 10 classes and receive a unique code to book 2 classes for free!',
  offerEmail: 'Hollie@teamstraightspine.com',
  photos: [
    { image: 'pilates-3' as ImageName, alt: 'Hollie working on the Reformer with her legs raised' },
    { image: 'pilates-2' as ImageName, alt: 'The Pilates studio, with Reformers along the window wall' },
  ],
  video: {
    src: '/media/pilates-clinic.mp4',
    poster: 'pilates-video-poster' as ImageName,
    label: 'A Reformer Pilates session at the Pilates Clinic (21 seconds)',
  },
}

export interface Plan {
  name: string
  label: string
  price: string
  url: string
  includes: string[]
  featured?: boolean
}

export const hyper8 = {
  hero: {
    eyebrow: 'Solutions · Hyper 8',
    title: 'Strengthen your body. Drop the body fat.',
    lead: 'A simple approach to strengthen your body whilst dropping unwanted body fat. Eight movement patterns, a bespoke training and rehab plan, and a diet built around foods you actually enjoy.',
    image: 'hyper8-hero' as ImageName,
    imageAlt: 'The Hyper 8 team of five standing in the studio in front of the Hyper 8 logo',
  },
  movements: ['Sit up', 'Stand up', 'Pick up', 'Push', 'Pull', 'Jump', 'Rotate', 'Walk'],
  plans: [
    {
      name: '12 Week Strength & Shred Plan',
      label: '12 weeks · with the team',
      price: '£549',
      url: store.hyper8TwelveWeek,
      featured: true,
      includes: [
        'Bespoke training / rehab plan built around your needs and pre-existing injuries to help strengthen your body',
        'Bespoke weight management diet plan built around foods you enjoy eating whilst shredding unwanted body fat',
        'Weekly check-ins with the team',
        'Support network',
      ],
    },
    {
      name: 'Home Strength & Shred Plan',
      label: 'At home · one-off',
      price: '£80',
      url: store.hyper8Home,
      includes: [
        'Follow a pre-recorded home workout / rehab plan on your TV or device',
        'Follow a fast-acting shred / weight management diet plan',
        'One-off purchase',
      ],
    },
  ] satisfies Plan[],
  /** From the 12 week plan's page in the store. */
  howItWorks: [
    'This all starts with a deep dive consultation where we work together to tap into what you’re looking to achieve and the best route to get you strengthened and shredded.',
    'We then provide a plan that’s personalised and developed specifically for you, followed by weekly check-ins to track progress and tweak the plan where needed. On average we work with clients for a minimum of 3 months to ensure we’re supporting in the long run.',
    'After purchase, we will contact you for a consult call to ensure we get all the correct details to build the right plan for you.',
  ],
  gallery: [
    { image: 'hyper8-2' as ImageName, alt: 'The Hyper 8 team of five in training kit in the studio' },
    { image: 'hyper8-1' as ImageName, alt: 'Two Hyper 8 coaches beside the words “12 week nutrition and gym programme”' },
    { image: 'book-banner' as ImageName, alt: 'The clinic, with treatment couches, a skeleton model and gym equipment' },
  ],
  faq: [
    {
      q: 'What is Hyper 8?',
      a: [
        'Hyper 8 is a simple approach to strengthen your body whilst dropping unwanted body fat.',
        'We incorporate our 8 movement patterns: sit up, stand up, pick up, push, pull, jump, rotate and walk.',
        'Join my 12 week or one-off programme to achieve your goal.',
      ],
    },
    {
      q: 'How can it improve my health?',
      a: [
        'Hyper 8 can help your health, as a bespoke training / rehab plan built around your needs and pre-existing injuries to strengthen your body. The bespoke diet plan is built around foods you enjoy eating whilst shredding unwanted body fat.',
      ],
    },
  ] satisfies Faq[],
}

export interface Course {
  name: string
  /** Shown under the name. Live dates are stale (2024/25), so none are shown. */
  when: string
  price?: string
  action: 'enquire' | 'email'
}

export const academy = {
  hero: {
    eyebrow: 'Solutions · Body Alignment Academy',
    title: 'Learn to treat the Body Alignment Clinic way.',
    lead: 'Interactive & mentorship courses located at Body Alignment Clinic. Face-to-face, in Sam Singh’s own clinical setting, with 1-2-1 tuition and follow-up support.',
    image: 'academy-3' as ImageName,
    imageAlt: 'Academy graduates holding their certificates, with Sam seated in front',
  },
  vision:
    'My vision for Body Alignment Academy is to create a training platform whereby I can share my knowledge and expertise, by training individuals face to face in my own clinical setting, to enable them to obtain the skills and understanding to confidently treat clients the Body Alignment Clinic way.',
  achieveHeading: 'What you can expect to achieve',
  achieve:
    'You will gain knowledge and skills to advise a diverse range of clients with differing medical conditions and long-term goals, to enable you to set rehab and treatment plans. You will obtain specific training that is exclusive to Body Alignment Clinic, setting your place in the industry as the elite category of pain management.',
  courses: [
    { name: '5 Day Master Class', when: 'Dates to be announced', action: 'enquire' },
    { name: 'Advanced Acupuncture & Cupping', when: 'Dates to be announced', action: 'enquire' },
    { name: 'Advanced Massage', when: 'Dates to be announced', action: 'enquire' },
    { name: '1 Day in Clinic with Sam Singh', when: 'Email to book and arrange a day', price: '£999', action: 'email' },
  ] satisfies Course[],
  included: [
    { icon: 'icon-mortarboard' as ImageName, text: '1-2-1 tuition with Head Therapist Sam Singh' },
    { icon: 'tss-black' as ImageName, text: 'Access to group learning' },
    { icon: 'icon-video' as ImageName, text: 'Follow-up video call and support' },
    { icon: 'logo-academy' as ImageName, text: 'Use of the BAC training accreditation logo on all social platforms' },
  ],
  photos: [
    { image: 'academy-1' as ImageName, alt: 'Sam teaching a group of students seated around treatment couches' },
    { image: 'academy-2' as ImageName, alt: 'Students practising a technique on a treatment couch while Sam looks on' },
    { image: 'academy-day-in-clinic' as ImageName, alt: 'Sam working on a client’s shoulder in the clinic' },
  ],
  /** Course guides and teaching photos (the gallery on the current site). */
  material: [
    { image: 'course-1' as ImageName, alt: 'Cover of the Body Alignment Academy sciatica course guide: “Teaching future therapists”' },
    { image: 'course-3' as ImageName, alt: 'Sam pointing out the spine on a skeleton model during a lesson on the skeletal system' },
    { image: 'course-2' as ImageName, alt: 'Course guide page on frozen shoulder, with a diagram of the shoulder joint' },
    { image: 'course-4' as ImageName, alt: 'Sam holding a model pelvis in front of a slide of the gluteal nerve' },
    { image: 'course-5' as ImageName, alt: 'Course guide page listing contraindications to treatment' },
    { image: 'course-6' as ImageName, alt: 'Sam demonstrating on a knee model in front of a slide of the rectus femoris muscle' },
    { image: 'course-7' as ImageName, alt: 'Course guide page on plantar fasciitis and the functional anatomy of the foot' },
    { image: 'course-8' as ImageName, alt: 'Sam beside a skeleton model in front of a slide of the pectoral muscles' },
  ],
  dayInClinic: {
    title: '1 Day in Clinic with Sam Singh',
    text: '1 day shadow. Email to book and arrange a day.',
    price: '£999',
    mailSubject: 'Book 1 Day in Clinic with Sam Singh',
  },
}
