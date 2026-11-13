import type { ImageName } from '@/lib/images'
import { diaries, store } from './site'

export interface TeamMember {
  id: 'sam' | 'mason' | 'hollie' | 'matt'
  name: string
  role: string
  photo: ImageName
  photoAlt: string
  email: string
  bio: string[]
  /** where "Book appointment" goes; omitted for Matt, who has a course instead */
  bookTo?: string
  /** Matt's online course in the store */
  courseUrl?: string
}

export const team: TeamMember[] = [
  {
    id: 'sam',
    name: 'Sam',
    role: 'Lead Practitioner',
    photo: 'team-sam',
    photoAlt: 'Sam Singh, Lead Practitioner',
    email: 'Sam@teamstraightspine.com',
    bookTo: '/book-with-sam',
    bio: [
      'Here at Body Alignment Clinic we provide a safe and fair health care system to our clients across the UK in a chain of clinics, whilst building a trustworthy brand.',
      'I started my studies in my 20’s, began practising in my 30’s and now in my 40’s I’ve really started to understand body mechanics and injuries. My approach and ethos is very unique and differs from conventional practitioners of today, as stated on my Google review page.',
      'I have a strong passion for helping others and I am committed to ensuring anyone that I provide my treatments to is given the best advice, support and bespoke aftercare to suit their needs.',
      'My treatment speciality is Body Alignment and Spinal Adjustment. I am committed to helping you and your body manage and recover from existing and pre-existing medical conditions and medical diagnostics.',
      'I am honoured to have looked after clients from all professions across the board with their injuries, rehab, nutrition and wellbeing management.',
      'Everyone is welcome.',
    ],
  },
  {
    id: 'mason',
    name: 'Mason',
    role: 'Practitioner · Soft Tissue Therapist',
    photo: 'team-mason',
    photoAlt: 'Mason, Soft Tissue Therapist',
    email: 'mason@teamstraightspine.com',
    bookTo: '/book-with-sam-mason',
    bio: [
      'I qualified as a soft tissue therapist in 2020 and have personally been a client of Sam’s for the last 10 years.',
      'I have worked with a variety of people, ranging from professional body builders, WWE wrestlers, builders and office workers. I enjoy working with people from all walks of life and helping them with their soft tissue and rehabilitation needs.',
      'My own experience in combat sports has provided me with a deeper understanding of the human body. I have always enjoyed fixing things. Seeing the difference in clients from the start of the session to the end of the session is the most fulfilling part of my job.',
      'I am proud to work alongside the team at Body Alignment Clinic and look forward to working with you.',
    ],
  },
  {
    id: 'hollie',
    name: 'Hollie',
    role: 'Lymphatic Drainage Massage',
    photo: 'team-hollie',
    photoAlt: 'Hollie, Lymphatic Drainage Therapist',
    email: 'hollie@teamstraightspine.com',
    bookTo: '/book-with-hollie',
    bio: [
      'I am a Lymphatic Drainage Therapist, passionate about aiding the body to heal and clear naturally from oedemas, post-op swelling and excess water.',
      'This treatment consists of opening up the lymph nodes followed by very gentle sweeping movements on the surface layer of the skin to drain all excess fluid and foreign abnormalities to be cleansed, then closing the lymph nodes to enable the system to get to work.',
      'I am delighted to be working alongside Sam and the Body Alignment team. I look forward to providing my services.',
    ],
  },
  {
    id: 'matt',
    name: 'Matt',
    role: 'Nutrition Coach',
    photo: 'team-matt',
    photoAlt: 'Matt, Nutrition Coach',
    email: 'Matt@teamstraightspine.com',
    courseUrl: store.hyper8TwelveWeek,
    bio: [
      'I have a huge passion in helping others live a healthier and happier lifestyle via nutrition and our Hyper 8 weight management, strengthen and rehab programme. With over 10 years experience, I’m confident I can help you achieve your goals.',
      'I’ve worked in all walks of life, from athletes to bus drivers and many in between. I help people reach their true potential and maximise their quality of life through nutrition. I believe with the right food tailored to your lifestyle, you’ll feel happier and more energetic.',
      'People often mistake what a healthy diet is. I’m here to navigate you in the right direction and educate you to follow a healthy lifestyle for the rest of your life.',
    ],
  },
]

export interface Practitioner {
  id: 'sam' | 'mason-sam' | 'hollie'
  /** as in "Book in with Sam" */
  name: string
  role: string
  photo: ImageName
  photoAlt: string
  /** our page that embeds the diary */
  to: string
  /** the Acuity diary itself */
  diary: string
}

/** The three practitioner diaries, in the order the current site lists them. */
export const practitioners: Practitioner[] = [
  {
    id: 'sam',
    name: 'Sam',
    role: 'Lead Practitioner · Body Alignment & Spinal Adjustment',
    photo: 'team-sam',
    photoAlt: 'Sam Singh',
    to: '/book-with-sam',
    diary: diaries.sam,
  },
  {
    id: 'mason-sam',
    name: 'Mason & Sam',
    role: 'Soft Tissue Therapy with Mason, alongside Sam',
    photo: 'team-mason',
    photoAlt: 'Mason',
    to: '/book-with-sam-mason',
    diary: diaries.masonSam,
  },
  {
    id: 'hollie',
    name: 'Hollie',
    role: 'Lymphatic Drainage Massage',
    photo: 'team-hollie',
    photoAlt: 'Hollie',
    to: '/book-with-hollie',
    diary: diaries.hollie,
  },
]
