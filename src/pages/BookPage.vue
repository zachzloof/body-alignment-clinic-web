<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { brands, type BrandKey } from '@/brands'
import ActionLink from '@/components/ActionLink.vue'
import ContactBand from '@/components/ContactBand.vue'
import PageHero from '@/components/PageHero.vue'
import PractitionerCards from '@/components/PractitionerCards.vue'
import RequestSection from '@/components/RequestSection.vue'
import { services } from '@/content/shared'
import { contact } from '@/content/site'

// Everything bookable outside the clinic diaries: each sub-brand's own call to action.
const others: BrandKey[] = ['pilates', 'academy', 'hyper8']
const tag = (key: BrandKey) => services.find((s) => s.brand === key)?.tag
</script>

<template>
  <PageHero
    eyebrow="Booking"
    title="Book an appointment"
    lead="Choose who you’d like to see and pick a time in their diary."
  >
    <RouterLink class="btn" :to="{ hash: '#emergency' }">Emergency & home visits</RouterLink>
    <a class="btn" :href="contact.phoneHref">Call {{ contact.phone }}</a>
  </PageHero>

  <section class="block" aria-labelledby="clinic-h">
    <div class="wrap">
      <div class="head">
        <h2 id="clinic-h">Body Alignment Clinic</h2>
        <RouterLink class="btn" to="/body-alignment-clinic">View more info</RouterLink>
      </div>
      <PractitionerCards />
    </div>
  </section>

  <section class="block" aria-labelledby="others-h">
    <div class="wrap">
      <div class="head"><h2 id="others-h">Pilates, courses & Hyper 8</h2></div>
      <ul v-reveal="'stagger'" class="others">
        <li v-for="key in others" :key="key" :style="{ '--c': brands[key].colour }">
          <div>
            <h3>{{ brands[key].name }}</h3>
            <p>{{ tag(key) }}</p>
          </div>
          <div class="acts">
            <ActionLink class="btn ink" :to="brands[key].cta.to" :href="brands[key].cta.href">
              {{ brands[key].cta.label }}
            </ActionLink>
            <RouterLink class="more" :to="brands[key].path">
              Learn more<span class="sr-only"> about {{ brands[key].name }}</span>
            </RouterLink>
          </div>
        </li>
      </ul>
    </div>
  </section>

  <RequestSection />
  <ContactBand />
</template>

<style scoped>
.others {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.9rem;
  list-style: none;
  margin: 0;
  padding: 0;
}
.others li {
  --focus: var(--ink);
  display: grid;
  gap: 1.4rem;
  align-content: space-between;
  padding: 1.4rem;
  border-radius: 18px;
  background: var(--c);
  color: #0d0f12;
  min-width: 0;
}
.others h3 {
  font-size: 1.3rem;
  line-height: 1.1;
}
.others p {
  margin: 0.4rem 0 0;
  font-weight: 700;
  font-size: 0.9rem;
}
.acts {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem 1.1rem;
}
.others .btn.ink:hover {
  background: #fff;
  border-color: #fff;
  color: var(--ink);
}
.more {
  font-family: var(--display);
  font-weight: 700;
  font-size: 0.88rem;
  padding-block: 0.6rem;
  text-underline-offset: 3px;
}
@media (max-width: 860px) {
  .others {
    grid-template-columns: 1fr;
  }
}
</style>
