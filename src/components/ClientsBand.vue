<script setup lang="ts">
import BacImage from '@/components/BacImage.vue'
import { clients } from '@/content/shared'
</script>

<template>
  <section class="block band" aria-labelledby="clients-h">
    <div class="wrap">
      <div class="head">
        <h2 id="clients-h">Our clients</h2>
        <p>{{ clients.intro }}</p>
      </div>
      <div v-reveal="'stagger'" class="photos">
        <BacImage
          v-for="p in clients.photos"
          :key="p.image"
          :name="p.image"
          :alt="p.alt"
          position="top"
          sizes="(max-width: 860px) 25vw, 150px"
        />
      </div>
      <!-- Names are a separate list, not captions: see content/shared.ts -->
      <ul class="names" aria-label="Clients include">
        <li v-for="c in clients.names" :key="c.name">
          <a :href="c.url" target="_blank" rel="noopener">{{ c.name }}<span class="sr-only"> on Instagram (opens in a new tab)</span></a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.photos {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 0.6rem;
}
.photos :deep(.pic) {
  aspect-ratio: 4 / 5;
  border-radius: 12px;
}
.names {
  display: flex;
  flex-wrap: wrap;
  gap: 0.2rem 1.4rem;
  margin: 1.2rem 0 0;
  padding: 0;
  list-style: none;
  font-family: var(--display);
  font-weight: 700;
  font-size: 0.82rem;
  color: var(--ink2);
}
.names a {
  display: inline-block;
  padding-block: 0.4rem;
  text-decoration: none;
  transition: color 0.15s;
}
.names a:hover {
  color: var(--ink);
  text-decoration: underline;
  text-underline-offset: 3px;
}
@media (max-width: 860px) {
  .photos {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
