<script setup lang="ts">
import BacImage from '@/components/BacImage.vue'
import { instagram } from '@/content/shared'
import { social } from '@/content/site'
</script>

<template>
  <section class="block" aria-labelledby="ig-h">
    <div class="wrap">
      <div class="head">
        <h2 id="ig-h">{{ social.instagramHandle }}</h2>
        <a class="btn" :href="social.instagram" target="_blank" rel="noopener">
          Follow on Instagram<span class="ext" aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
      <!-- A snapshot of recent posts. Each opens the profile. -->
      <ul v-reveal="'stagger'" class="ig">
        <li v-for="p in instagram" :key="p.image">
          <a :href="social.instagram" target="_blank" rel="noopener">
            <BacImage :name="p.image" :alt="p.alt" sizes="(max-width: 860px) 33vw, 135px" />
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
/* one long unbreakable word: scale it with the screen so it always fits */
.head h2 {
  font-size: clamp(1.3rem, 6.4vw, 2.9rem);
}
.ig {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  gap: 0.4rem;
  list-style: none;
  margin: 0;
  padding: 0;
}
a {
  display: block;
  border-radius: 8px;
  overflow: hidden;
}
a :deep(.pic) {
  aspect-ratio: 1;
}
a :deep(img) {
  transition: transform 0.4s var(--ease-out);
}
a:hover :deep(img) {
  transform: scale(1.06);
}
@media (max-width: 860px) {
  .ig {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (prefers-reduced-motion: reduce) {
  a :deep(img) {
    transition: none;
  }
}
</style>
