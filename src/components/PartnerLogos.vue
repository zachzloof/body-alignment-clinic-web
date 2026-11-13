<script setup lang="ts">
import BacImage from '@/components/BacImage.vue'
import { partners } from '@/content/shared'
</script>

<template>
  <section class="block" aria-labelledby="partners-h">
    <div class="wrap">
      <div class="head"><h2 id="partners-h">Associated with</h2></div>
      <ul v-reveal="'stagger'" class="partners">
        <li v-for="p in partners" :key="p.name">
          <a :href="p.url" target="_blank" rel="noopener" :class="{ dark: p.dark }">
            <BacImage :name="p.image" :alt="p.name" sizes="160px" />
            <span class="sr-only">(opens in a new tab)</span>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.partners {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.7rem;
  list-style: none;
  margin: 0;
  padding: 0;
}
a {
  background: #fff;
  border-radius: 12px;
  display: grid;
  place-items: center;
  padding: 1rem;
  height: 100%;
  min-height: 90px;
  border: 1px solid var(--line);
  transition: transform 0.2s var(--ease-out), border-color 0.2s;
}
a.dark {
  background: #000;
}
a:hover {
  transform: translateY(-3px);
  border-color: var(--ink);
}
a :deep(.pic) {
  background: none !important;
}
a :deep(img) {
  max-height: 46px;
  width: auto;
  object-fit: contain;
}
@media (max-width: 860px) {
  .partners {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 420px) {
  .partners {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (prefers-reduced-motion: reduce) {
  a {
    transition: none;
  }
}
</style>
