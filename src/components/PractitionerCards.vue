<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import BacImage from '@/components/BacImage.vue'
import { practitioners, type Practitioner } from '@/content/team'

/** "Book in with…" cards. Each opens that practitioner's diary page. */
const props = defineProps<{ exclude?: Practitioner['id'] }>()
const list = computed(() => practitioners.filter((p) => p.id !== props.exclude))
</script>

<template>
  <ul v-reveal="'stagger'" class="cards" :class="{ pair: list.length === 2 }">
    <li v-for="p in list" :key="p.id">
      <RouterLink :to="p.to" class="card">
        <BacImage :name="p.photo" :alt="p.photoAlt" position="top" sizes="(max-width: 700px) 96px, 380px" />
        <span class="txt">
          <span class="name">Book in with {{ p.name }}</span>
          <span class="role">{{ p.role }}</span>
          <span class="go">Open diary <span class="arrow" aria-hidden="true">→</span></span>
        </span>
      </RouterLink>
    </li>
  </ul>
</template>

<style scoped>
.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.9rem;
  list-style: none;
  margin: 0;
  padding: 0;
}
.cards.pair {
  grid-template-columns: repeat(2, 1fr);
}
.card {
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100%;
  text-decoration: none;
  border: 2px solid var(--line);
  border-radius: 20px;
  overflow: hidden;
  background: var(--bg);
  transition: border-color 0.2s, transform 0.2s var(--ease-out), box-shadow 0.2s var(--ease-out);
}
.card:hover {
  border-color: var(--ink);
  transform: translateY(-4px);
  box-shadow: 0 14px 30px -14px rgba(13, 15, 18, 0.3);
}
.card:active {
  transform: translateY(-1px) scale(0.99);
}
.card :deep(.pic) {
  aspect-ratio: 4 / 3;
}
.pair .card :deep(.pic) {
  aspect-ratio: 16 / 9;
}
.txt {
  display: grid;
  gap: 0.3rem;
  align-content: start;
  padding: 1.2rem;
}
.name {
  font-family: var(--display);
  font-weight: 800;
  font-size: 1.25rem;
  line-height: 1.1;
  letter-spacing: -0.025em;
}
.role {
  color: var(--ink2);
  font-size: 0.92rem;
}
.go {
  font-family: var(--display);
  font-weight: 700;
  font-size: 0.85rem;
  margin-top: 0.5rem;
  color: var(--brand-deep);
}
.arrow {
  display: inline-block;
  transition: transform 0.2s var(--ease-out);
}
.card:hover .arrow {
  transform: translateX(4px);
}
/* phones: compact rows, so all three fit on one screen */
@media (max-width: 700px) {
  .cards,
  .cards.pair {
    grid-template-columns: 1fr;
    gap: 0.6rem;
  }
  .card {
    grid-template-columns: 96px 1fr;
    grid-template-rows: auto;
    align-items: stretch;
  }
  .card :deep(.pic),
  .pair .card :deep(.pic) {
    aspect-ratio: auto;
    height: 100%;
    min-height: 112px;
  }
  .txt {
    padding: 0.9rem 1rem;
  }
  .name {
    font-size: 1.1rem;
  }
}
@media (prefers-reduced-motion: reduce) {
  .card,
  .arrow {
    transition: none;
  }
}
</style>
