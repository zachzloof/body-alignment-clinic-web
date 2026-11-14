<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { brands, type BrandKey } from '@/brands'
import ClientsBand from '@/components/ClientsBand.vue'
import ContactBand from '@/components/ContactBand.vue'
import InstagramGrid from '@/components/InstagramGrid.vue'
import PageHero from '@/components/PageHero.vue'
import PartnerLogos from '@/components/PartnerLogos.vue'
import ServiceTiles from '@/components/ServiceTiles.vue'
import TeamGrid from '@/components/TeamGrid.vue'
import { home } from '@/content/pages'
import { about } from '@/content/shared'

// The services heading: one word per part of the business, in the same order
// as the tiles below it, each highlighted in that part's colour.
const verbs: { brand: BrandKey; word: string }[] = [
  { brand: 'clinic', word: 'Treat.' },
  { brand: 'pilates', word: 'Move.' },
  { brand: 'hyper8', word: 'Train.' },
  { brand: 'academy', word: 'Learn.' },
]
</script>

<template>
  <PageHero v-bind="home.hero" :image-alt="home.hero.imageAlt">
    <RouterLink class="btn ink" to="/book-appointment">Book an appointment</RouterLink>
    <RouterLink class="btn" to="/our-team">Meet the team</RouterLink>
  </PageHero>

  <section class="block" aria-labelledby="services-h">
    <div class="wrap">
      <div class="head">
        <h2 id="services-h" class="verbs">
          <template v-for="(v, i) in verbs" :key="v.brand">
            <mark :style="{ '--brand': brands[v.brand].colour }">{{ v.word }}</mark>{{ i < verbs.length - 1 ? ' ' : '' }}
          </template>
        </h2>
        <p>Four ways to work with Sam Singh and the team in Rainham.</p>
      </div>
      <ServiceTiles />
    </div>
  </section>

  <section class="block" aria-labelledby="about-h">
    <div v-reveal class="wrap split">
      <div>
        <p class="eyebrow">About us</p>
        <h2 id="about-h">{{ about.headline }}</h2>
      </div>
      <div class="prose">
        <p v-for="p in about.body" :key="p">{{ p }}</p>
        <RouterLink class="btn primary" to="/book-appointment">Book now</RouterLink>
      </div>
    </div>
  </section>

  <section class="block" aria-labelledby="team-h">
    <div class="wrap">
      <div class="head">
        <h2 id="team-h">The team</h2>
        <RouterLink class="btn" to="/our-team">Read their stories</RouterLink>
      </div>
      <TeamGrid />
    </div>
  </section>

  <ClientsBand />
  <PartnerLogos />
  <InstagramGrid />
  <ContactBand />
</template>

<style scoped>
.verbs {
  /* each word is its own block, so wrapped rows on phones keep a clear gap */
  display: flex;
  flex-wrap: wrap;
  gap: 0.22em;
}
/* phones: two even rows, never three words and one */
@media (max-width: 600px) {
  .verbs {
    display: grid;
    grid-template-columns: repeat(2, max-content);
  }
}
.verbs mark {
  /* black type on every colour, in both themes */
  color: #0d0f12;
  padding: 0.02em 0.24em 0.06em;
  border-radius: 8px;
}
.prose .btn {
  margin-top: 0.4rem;
}
</style>
