import type { BrandKey } from '@/brands'
import type { ImageName } from '@/lib/images'

/** The four parts of the business, as shown on the Home page tiles. */
export interface Service {
  brand: BrandKey
  banner: ImageName
  tag: string
  blurb: string
}

export const services: Service[] = [
  {
    brand: 'clinic',
    banner: 'banner-clinic',
    tag: 'Pain management, treatment & rehab',
    blurb: 'Medical massage, acupuncture, spinal adjustment, cupping and sports physio in Rainham, Essex.',
  },
  {
    brand: 'pilates',
    banner: 'banner-pilates',
    tag: 'Reformer & mat Pilates',
    blurb: '1-1 and 2-1 Reformer sessions that teach you to move correctly and confidently.',
  },
  {
    brand: 'hyper8',
    banner: 'banner-hyper8',
    tag: '12 week strength & shred',
    blurb: 'Bespoke training, rehab and diet plans built around 8 movement patterns.',
  },
  {
    brand: 'academy',
    banner: 'banner-academy',
    tag: 'Courses & mentorship',
    blurb: 'Face-to-face training in Sam Singh’s clinic for therapists who want to treat the Body Alignment Clinic way.',
  },
]

export const about = {
  headline: 'At Body Alignment Clinic everyone is welcome.',
  body: [
    'We have a strong passion for helping others and ensuring that we give the best mentoring, support and aftercare to our clients’ individual needs, from injuries, rehab and weight management through to general wellbeing.',
    'We are committed to helping you and your body manage and recover from existing and pre-existing medical conditions and medical diagnostics.',
  ],
}

/**
 * "Our Clients". The photos and names are shown separately on purpose: the
 * photos cannot be reliably matched to the names, so no photo is captioned
 * with a name. Each name links to the Instagram profile the current site
 * links it to.
 */
export const clients = {
  intro: 'From world champions and Premier League players to builders and office workers.',
  names: [
    { name: 'Kem Cetinay', url: 'https://www.instagram.com/kemcetinay/' },
    { name: 'Courtney Black', url: 'https://www.instagram.com/courtneydblack' },
    { name: 'Joey Essex', url: 'https://www.instagram.com/joeyessex' },
    { name: 'Nicola McLean', url: 'https://www.instagram.com/nicolamclean30/' },
    { name: 'Olivia Bowen', url: 'https://www.instagram.com/oliviadbowen' },
    { name: 'Eddie Hearn', url: 'https://www.instagram.com/eddiehearn' },
    { name: 'Conor Benn', url: 'https://www.instagram.com/conorbennofficial/' },
    { name: 'Anton Ferdinand', url: 'https://www.instagram.com/anton_ferdinand5' },
  ],
  photos: [
    { image: 'client-4', alt: 'Sam with a client in the clinic' },
    { image: 'client-8', alt: 'Sam and a client raising their fists to the camera' },
    { image: 'client-6', alt: 'Sam standing with a client' },
    { image: 'client-7', alt: 'Sam and a client sitting on a treatment couch' },
    { image: 'client-5', alt: 'Sam with a client in the clinic' },
    { image: 'client-2', alt: 'Sam with a client' },
    { image: 'client-1', alt: 'Sam treating a client seated on a treatment couch' },
    { image: 'client-3', alt: 'Sam with a client in the clinic' },
  ] satisfies { image: ImageName; alt: string }[],
}

export interface Partner {
  name: string
  image: ImageName
  url: string
  /** logo artwork sits on black */
  dark?: boolean
}

export const partners: Partner[] = [
  { name: 'CThA, the Complementary Therapists Association', image: 'partner-ctha', url: 'https://www.ctha.com' },
  { name: 'CMA, the Complementary Medical Association', image: 'partner-cma', url: 'https://www.the-cma.org.uk' },
  { name: 'Simple CBD', image: 'partner-simplecbd', url: 'https://www.simplecbd.shop' },
  { name: 'CNHC, the Complementary & Natural Healthcare Council', image: 'partner-cnhc', url: 'https://www.cnhc.org.uk' },
  { name: 'The Acupuncture Society', image: 'partner-acupuncture', url: 'https://www.acupuncturesociety.org.uk', dark: true },
  { name: 'Hyperice', image: 'partner-hyperice', url: 'https://hyperice.com/en-GB/', dark: true },
]

/**
 * Instagram: a static snapshot of the posts shown on the current site
 * (the live feed is a Squarespace feature). Alt text quotes each caption.
 */
export const instagram: { image: ImageName; alt: string }[] = [
  { image: 'ig-01', alt: 'Instagram post: Sam with a boxer in the gym. “Does it again on home soil. Pure grit and heart from both fighters.”' },
  { image: 'ig-02', alt: 'Instagram post: Sam with a boxer in ring kit. “A fantastic performance showing his levels in this game of boxing.”' },
  { image: 'ig-04', alt: 'Instagram post: Sam on the steps of a private jet. “No caption for this.”' },
  { image: 'ig-05', alt: 'Instagram post: Sam with a friend at a restaurant. “A lovely evening celebrating with friends and family.”' },
  { image: 'ig-06', alt: 'Instagram post: Sam by a swimming pool. “Aging is mandatory. Falling apart is optional.”' },
  { image: 'ig-07', alt: 'Instagram post: Sam and a boxer taking a mirror selfie. “Fight week for young lion.”' },
  { image: 'ig-08', alt: 'Instagram post: Sam with a footballer in the clinic gym. “One last push this season.”' },
  { image: 'ig-11', alt: 'Instagram post: Sam at his desk with a client. “Pre-pre season work already underway.”' },
  { image: 'ig-12', alt: 'Instagram post: a boxer with a championship belt, Sam behind him. “Just wow. What a fight.”' },
]

export interface Faq {
  q: string
  a: string[]
}

export const generalFaq: Faq[] = [
  {
    q: 'What length of session do I need?',
    a: [
      'If it is your first session and you have an injury, I would suggest you book 1 hour minimum.',
      'Also, 1 hour sessions are best for maintenance.',
      'Only book 30 minutes if you don’t have any injuries and just want spinal adjustments.',
    ],
  },
  { q: 'Is there free parking?', a: ['We have free allocated parking for clients.'] },
  { q: 'Do you only treat athletes?', a: ['No, we treat anybody and everybody with a range of different ailments.'] },
]

/** Options for "What is your enquiry about?" on the contact form (from the current site's form). */
export const enquiryTopics = [
  'Body Alignment Clinic',
  'The Pilates Clinic',
  'Hyper 8',
  'Body Alignment Academy',
  'Treatment availability',
  'Emergency sessions',
  'Seminars',
  'Form correction',
  'Nutrition advice',
  'Diet plans',
  'General enquiry',
  'Other',
] as const
export type EnquiryTopic = (typeof enquiryTopics)[number]

/** Options and prices on the emergency / home visit request form (from the current site's form). */
export const requestTypes = ['Emergency - £200', 'Home Visit - £250'] as const
export type RequestType = (typeof requestTypes)[number]
