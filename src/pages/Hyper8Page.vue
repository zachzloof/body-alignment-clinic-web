<script setup lang="ts">
import { RouterLink } from 'vue-router'
import ActionLink from '@/components/ActionLink.vue'
import BacImage from '@/components/BacImage.vue'
import ContactBand from '@/components/ContactBand.vue'
import FaqList from '@/components/FaqList.vue'
import MovementTiles from '@/components/MovementTiles.vue'
import PageHero from '@/components/PageHero.vue'
import { hyper8 } from '@/content/pages'

// the featured plan is the one the hero sells
const twelveWeek = hyper8.plans.find((p) => p.featured)!
</script>

<template>
  <PageHero v-bind="hyper8.hero" :image-alt="hyper8.hero.imageAlt" wide>
    <ActionLink class="btn ink" :href="twelveWeek.url">Buy the 12 week plan · {{ twelveWeek.price }}</ActionLink>
    <RouterLink class="btn" :to="{ hash: '#plans' }">Explore Hyper 8 solutions</RouterLink>
  </PageHero>

  <section class="block" aria-labelledby="moves-h">
    <div class="wrap">
      <div class="head">
        <h2 id="moves-h">The <mark>8</mark> movement patterns</h2>
        <p>Everything in Hyper 8 is built on how your body actually moves day to day.</p>
      </div>
      <MovementTiles :movements="hyper8.movements" />
    </div>
  </section>

  <section id="plans" class="block" aria-labelledby="plans-h">
    <div class="wrap">
      <div class="head">
        <h2 id="plans-h">Choose your plan</h2>
        <p>Both are one-off purchases from the online store.</p>
      </div>
      <div v-reveal="'stagger'" class="plans">
        <article v-for="p in hyper8.plans" :key="p.name" class="plan" :class="{ hot: p.featured }">
          <p class="eyebrow">{{ p.label }}</p>
          <h3>{{ p.name }}</h3>
          <p class="price">{{ p.price }}</p>
          <ul>
            <li v-for="x in p.includes" :key="x">{{ x }}</li>
          </ul>
          <ActionLink class="btn primary" :href="p.url">Buy now · {{ p.price }}</ActionLink>
        </article>
      </div>
    </div>
  </section>

  <section class="block" aria-labelledby="how-h">
    <div v-reveal class="wrap split">
      <div>
        <p class="eyebrow">12 week programme</p>
        <h2 id="how-h">How the 12 week plan works</h2>
      </div>
      <div class="prose">
        <p v-for="p in hyper8.howItWorks" :key="p">{{ p }}</p>
      </div>
    </div>
  </section>

  <section class="block" aria-label="Hyper 8 photos">
    <div v-reveal="'stagger'" class="wrap gallery">
      <BacImage
        v-for="(g, i) in hyper8.gallery"
        :key="g.image"
        :name="g.image"
        :alt="g.alt"
        :sizes="i === 0 ? '(max-width: 760px) calc(100vw - 32px), 610px' : '(max-width: 760px) 50vw, 300px'"
      />
    </div>
  </section>

  <section class="block band" aria-labelledby="faq-h">
    <div class="wrap">
      <div class="head"><h2 id="faq-h">FAQ about Hyper 8</h2></div>
      <FaqList :items="hyper8.faq" />
    </div>
  </section>

  <ContactBand topic="Hyper 8" />
</template>

<style scoped>
.plans {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.9rem;
}
.plan {
  border: 2px solid var(--line);
  border-radius: 20px;
  padding: 2rem;
  display: grid;
  gap: 1rem;
  align-content: start;
  background: var(--bg);
  min-width: 0;
}
.plan.hot {
  border-color: var(--brand);
  background: var(--brand-soft);
}
.plan p {
  margin: 0;
}
.plan h3 {
  font-size: 1.4rem;
}
.price {
  font-family: var(--display);
  font-weight: 800;
  font-size: 2.6rem;
  line-height: 1;
  letter-spacing: -0.03em;
}
.plan ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.5rem;
  color: var(--ink2);
}
.plan li {
  display: flex;
  gap: 0.6rem;
}
.plan li::before {
  content: '';
  flex: none;
  width: 9px;
  height: 9px;
  margin-top: 0.55em;
  border-radius: 50%;
  background: var(--brand);
}
.plan .btn {
  justify-self: start;
  margin-top: 0.4rem;
}
@media (max-width: 760px) {
  .plans {
    grid-template-columns: 1fr;
  }
  .plan {
    padding: 1.4rem;
  }
  .plan .btn {
    justify-self: stretch;
  }
}
</style>
