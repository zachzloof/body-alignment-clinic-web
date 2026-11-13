<script setup lang="ts">
import { RouterLink } from 'vue-router'
import ClientsBand from '@/components/ClientsBand.vue'
import ContactBand from '@/components/ContactBand.vue'
import InstagramGrid from '@/components/InstagramGrid.vue'
import PageHero from '@/components/PageHero.vue'
import PartnerLogos from '@/components/PartnerLogos.vue'
import ServiceTiles from '@/components/ServiceTiles.vue'
import TeamGrid from '@/components/TeamGrid.vue'
import { home } from '@/content/pages'
import { about } from '@/content/shared'
</script>

<template>
  <PageHero v-bind="home.hero" :image-alt="home.hero.imageAlt">
    <RouterLink class="btn ink" to="/book-appointment">Book an appointment</RouterLink>
    <RouterLink class="btn" to="/our-team">Meet the team</RouterLink>
  </PageHero>

  <section class="block" aria-labelledby="services-h">
    <div class="wrap">
      <div class="head">
        <h2 id="services-h">One clinic, <mark>four colours</mark></h2>
        <p>Each part of the business keeps its own colour, so you always know where you are.</p>
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
.prose .btn {
  margin-top: 0.4rem;
}
</style>
