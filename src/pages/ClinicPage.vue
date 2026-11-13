<script setup lang="ts">
import { RouterLink } from 'vue-router'
import BacImage from '@/components/BacImage.vue'
import ClientsBand from '@/components/ClientsBand.vue'
import ContactBand from '@/components/ContactBand.vue'
import PageHero from '@/components/PageHero.vue'
import PartnerLogos from '@/components/PartnerLogos.vue'
import PractitionerCards from '@/components/PractitionerCards.vue'
import RequestSection from '@/components/RequestSection.vue'
import { clinic } from '@/content/pages'
</script>

<template>
  <PageHero v-bind="clinic.hero" wide>
    <RouterLink class="btn ink" to="/book-appointment">Book now for clinic</RouterLink>
    <RouterLink class="btn" :to="{ hash: '#emergency' }">Emergency & home visits</RouterLink>
  </PageHero>

  <section class="block" aria-labelledby="about-h">
    <div class="wrap about">
      <BacImage
        v-reveal
        class="photo"
        name="clinic-3761"
        alt="Sam treating a client’s shoulder on the treatment couch"
        sizes="(max-width: 860px) calc(100vw - 32px), 480px"
      />
      <div>
        <p class="eyebrow">About</p>
        <h2 id="about-h">{{ clinic.hero.lead }}</h2>
        <p class="lede">{{ clinic.about }}</p>

        <h3 id="treatments-h">{{ clinic.treatmentsHeading }}</h3>
        <ul v-reveal="'stagger'" class="treatments" aria-labelledby="treatments-h">
          <li v-for="t in clinic.treatments" :key="t">{{ t }}</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="block" aria-labelledby="bookwith-h">
    <div class="wrap">
      <div class="head">
        <h2 id="bookwith-h">Book in with</h2>
        <RouterLink class="btn" to="/our-team">Meet the team</RouterLink>
      </div>
      <PractitionerCards />
    </div>
  </section>

  <RequestSection />
  <ClientsBand class="plain" />
  <PartnerLogos />
  <ContactBand topic="Body Alignment Clinic" />
</template>

<style scoped>
.about {
  display: grid;
  grid-template-columns: 5fr 7fr;
  gap: 3rem;
  align-items: start;
}
.photo {
  aspect-ratio: 4 / 5;
  border-radius: 20px;
}
h2 {
  font-size: clamp(1.8rem, 3.4vw, 2.8rem);
  margin-top: 0.6rem;
}
.lede {
  margin: 1.2rem 0 0;
}
h3 {
  font-size: 1.2rem;
  margin: 2.2rem 0 1rem;
}
.treatments {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.treatments li {
  font-family: var(--display);
  font-weight: 700;
  font-size: 0.9rem;
  line-height: 1.2;
  padding: 0.7em 1em;
  border-radius: 12px;
  background: var(--brand-soft);
  border: 1.5px solid color-mix(in srgb, var(--brand) 45%, transparent);
}
/* Two soft bands in a row would merge, so the clients band goes white here. */
.plain.band {
  background: var(--bg);
  border-top: 1px solid var(--line);
}
@media (max-width: 860px) {
  .about {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  .photo {
    aspect-ratio: 4 / 3;
  }
}
</style>
