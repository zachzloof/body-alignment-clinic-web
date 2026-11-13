<script setup lang="ts">
import { RouterLink } from 'vue-router'
import BacImage from '@/components/BacImage.vue'
import ContactBand from '@/components/ContactBand.vue'
import PageHero from '@/components/PageHero.vue'
import PartnerLogos from '@/components/PartnerLogos.vue'
import { academy } from '@/content/pages'
import { contact } from '@/content/site'

const enquire = { path: '/faq-contact', query: { topic: 'Body Alignment Academy' }, hash: '#contact' }
const dayMailto = `${contact.emailHref}?subject=${encodeURIComponent(academy.dayInClinic.mailSubject)}`
</script>

<template>
  <PageHero v-bind="academy.hero" :image-alt="academy.hero.imageAlt">
    <RouterLink class="btn ink" to="/body-alignment-academy-booking-page">Book a course</RouterLink>
    <RouterLink class="btn" :to="{ hash: '#courses' }">See available courses</RouterLink>
  </PageHero>

  <section class="block" aria-labelledby="vision-h">
    <div v-reveal class="wrap split">
      <div>
        <p class="eyebrow">The vision</p>
        <h2 id="vision-h">Share the knowledge. <mark>Raise the standard.</mark></h2>
      </div>
      <div class="prose">
        <p>{{ academy.vision }}</p>
        <h3>{{ academy.achieveHeading }}</h3>
        <p>{{ academy.achieve }}</p>
      </div>
    </div>
  </section>

  <section id="courses" class="block" aria-labelledby="courses-h">
    <div class="wrap">
      <div class="head">
        <h2 id="courses-h">Available courses</h2>
        <RouterLink class="btn primary" to="/body-alignment-academy-booking-page">Book courses now</RouterLink>
      </div>
      <ul v-reveal="'stagger'" class="courses">
        <li v-for="c in academy.courses" :key="c.name" class="course">
          <div>
            <h3>{{ c.name }}</h3>
            <p>{{ c.when }}</p>
          </div>
          <span v-if="c.price" class="price">{{ c.price }}</span>
          <a v-if="c.action === 'email'" class="btn" :href="dayMailto">Email to book</a>
          <RouterLink v-else class="btn" :to="enquire">Ask about dates</RouterLink>
        </li>
      </ul>
    </div>
  </section>

  <section class="block band" aria-labelledby="incl-h">
    <div class="wrap">
      <div class="head"><h2 id="incl-h">What’s included</h2></div>
      <ul v-reveal="'stagger'" class="incl">
        <li v-for="i in academy.included" :key="i.text">
          <BacImage :name="i.icon" :class="{ colour: i.colour }" alt="" sizes="140px" />
          <b>{{ i.text }}</b>
        </li>
      </ul>
    </div>
  </section>

  <section class="block" aria-label="Academy courses in progress">
    <div v-reveal="'stagger'" class="wrap gallery">
      <BacImage
        v-for="(p, i) in academy.photos"
        :key="p.image"
        :name="p.image"
        :alt="p.alt"
        :position="i === 2 ? 'top' : undefined"
        :sizes="i === 0 ? '(max-width: 760px) calc(100vw - 32px), 610px' : '(max-width: 760px) 50vw, 300px'"
      />
    </div>
  </section>

  <section class="block" aria-labelledby="material-h">
    <div class="wrap">
      <div class="head">
        <h2 id="material-h">Inside the courses</h2>
        <p>Course guides and teaching from Body Alignment Academy.</p>
      </div>
      <div v-reveal="'stagger'" class="material">
        <BacImage
          v-for="m in academy.material"
          :key="m.image"
          :name="m.image"
          :alt="m.alt"
          position="top"
          sizes="(max-width: 860px) 50vw, 300px"
        />
      </div>
    </div>
  </section>

  <section class="block" aria-labelledby="day-h">
    <div class="wrap">
      <div v-reveal class="shadow on-ink">
        <div>
          <h2 id="day-h">{{ academy.dayInClinic.title }}</h2>
          <p>{{ academy.dayInClinic.text }}</p>
        </div>
        <div class="buy">
          <span class="price">{{ academy.dayInClinic.price }}</span>
          <a class="btn primary" :href="dayMailto">Email to book</a>
        </div>
      </div>
    </div>
  </section>

  <PartnerLogos />
  <ContactBand topic="Body Alignment Academy" />
</template>

<style scoped>
.prose h3 {
  font-size: 1.2rem;
  margin: 1.6rem 0 0.6rem;
}

.courses {
  display: grid;
  gap: 0.6rem;
  list-style: none;
  margin: 0;
  padding: 0;
}
.course {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 1rem 1.5rem;
  align-items: center;
  padding: 1.2rem 1.4rem;
  border: 1.5px solid var(--line);
  border-radius: 14px;
  background: var(--bg);
  min-width: 0;
  transition: border-color 0.2s;
}
.course:hover {
  border-color: var(--ink);
}
.course h3 {
  font-size: 1.15rem;
  line-height: 1.15;
}
.course p {
  margin: 0.3rem 0 0;
  color: var(--ink2);
  font-size: 0.92rem;
}
.course .price {
  font-family: var(--display);
  font-weight: 800;
  font-size: 1.3rem;
}
.course .btn {
  grid-column: 3;
  min-width: 10.5rem;
}

.incl {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.9rem;
  list-style: none;
  margin: 0;
  padding: 0;
}
.incl li {
  background: var(--bg);
  border: 1.5px solid var(--line);
  border-radius: 16px;
  padding: 1.4rem;
  display: grid;
  gap: 0.9rem;
  align-content: start;
  min-width: 0;
}
.incl :deep(.pic) {
  height: 44px;
  width: fit-content;
  background: none !important;
}
.incl :deep(img) {
  height: 100%;
  width: auto;
  object-fit: contain;
}
.incl b {
  font-family: var(--display);
  font-weight: 700;
  font-size: 0.98rem;
  line-height: 1.3;
}

.material {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.6rem;
}
.material :deep(.pic) {
  aspect-ratio: 3 / 4;
  border-radius: 12px;
}

.shadow {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 2rem;
  align-items: center;
  padding: 2rem;
  border-radius: 20px;
  background: var(--panel);
  color: var(--on-panel);
}
.shadow h2 {
  font-size: 1.6rem;
  line-height: 1.1;
}
.shadow p {
  margin: 0.5rem 0 0;
  color: var(--on-panel-muted);
}
.shadow .price {
  font-family: var(--display);
  font-weight: 800;
  font-size: 2rem;
  line-height: 1;
}
.shadow .buy {
  display: grid;
  gap: 0.8rem;
  justify-items: end;
}
.shadow .btn.primary:hover {
  background: var(--on-panel);
  border-color: var(--on-panel);
  color: var(--panel);
}

@media (max-width: 860px) {
  .incl,
  .material {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 700px) {
  .course {
    grid-template-columns: 1fr auto;
  }
  .course .btn {
    grid-column: 1 / -1;
  }
  .shadow {
    grid-template-columns: 1fr;
    padding: 1.5rem;
  }
  .shadow .buy {
    justify-items: start;
    grid-template-columns: auto 1fr;
    align-items: center;
  }
}
</style>
