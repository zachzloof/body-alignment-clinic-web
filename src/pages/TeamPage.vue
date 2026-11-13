<script setup lang="ts">
import { RouterLink } from 'vue-router'
import ActionLink from '@/components/ActionLink.vue'
import BacImage from '@/components/BacImage.vue'
import ContactBand from '@/components/ContactBand.vue'
import InstagramGrid from '@/components/InstagramGrid.vue'
import PageHero from '@/components/PageHero.vue'
import { about } from '@/content/shared'
import { team } from '@/content/team'
</script>

<template>
  <PageHero eyebrow="About · Our Team" title="Our team" :lead="about.headline">
    <RouterLink class="btn ink" to="/book-appointment">Book an appointment</RouterLink>
  </PageHero>

  <section v-for="(m, i) in team" :id="m.id" :key="m.id" class="block member" :aria-labelledby="`${m.id}-h`">
    <div v-reveal class="wrap" :class="{ flip: i % 2 === 1 }">
      <BacImage
        class="photo"
        :name="m.photo"
        :alt="m.photoAlt"
        position="top"
        :priority="i === 0"
        sizes="(max-width: 860px) calc(100vw - 32px), 480px"
      />
      <div>
        <p class="eyebrow">{{ m.role }}</p>
        <h2 :id="`${m.id}-h`">{{ m.name }}</h2>
        <div class="prose">
          <p v-for="p in m.bio" :key="p">{{ p }}</p>
        </div>
        <div class="actions">
          <RouterLink v-if="m.bookTo" class="btn primary" :to="m.bookTo">Book with {{ m.name }}</RouterLink>
          <ActionLink v-if="m.courseUrl" class="btn primary" :href="m.courseUrl">Buy online course now</ActionLink>
          <a class="btn" :href="`mailto:${m.email}`">Email {{ m.name }}</a>
        </div>
      </div>
    </div>
  </section>

  <InstagramGrid />
  <ContactBand />
</template>

<style scoped>
.member .wrap {
  display: grid;
  grid-template-columns: 5fr 7fr;
  gap: 3rem;
  align-items: start;
}
.member .flip .photo {
  order: 2;
}
.member .flip {
  grid-template-columns: 7fr 5fr;
}
.photo {
  aspect-ratio: 4 / 5;
  border-radius: 20px;
  position: sticky;
  top: calc(var(--nav-h) + 24px);
}
h2 {
  font-size: clamp(2.4rem, 5vw, 4rem);
  margin: 0.5rem 0 1.4rem;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1.6rem;
}
@media (max-width: 860px) {
  .member .wrap,
  .member .flip {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  .member .flip .photo {
    order: 0;
  }
  .photo {
    position: static;
    aspect-ratio: 1;
    max-width: 420px;
  }
}
</style>
