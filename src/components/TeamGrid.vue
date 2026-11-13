<script setup lang="ts">
import { RouterLink } from 'vue-router'
import BacImage from '@/components/BacImage.vue'
import { team } from '@/content/team'
</script>

<template>
  <ul v-reveal="'stagger'" class="team">
    <li v-for="m in team" :key="m.id">
      <RouterLink :to="`/our-team#${m.id}`">
        <BacImage :name="m.photo" :alt="m.photoAlt" position="top" sizes="(max-width: 860px) 50vw, 300px" />
        <span class="who">
          <b>{{ m.name }}</b>
          <span>{{ m.role }}</span>
        </span>
      </RouterLink>
    </li>
  </ul>
</template>

<style scoped>
.team {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.9rem;
  list-style: none;
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
  display: grid;
  gap: 0.6rem;
  border-radius: 16px;
}
a :deep(.pic) {
  aspect-ratio: 4 / 5;
  border-radius: 16px;
}
a :deep(img) {
  transition: transform 0.4s var(--ease-out);
}
a:hover :deep(img) {
  transform: scale(1.04);
}
b {
  font-family: var(--display);
  font-weight: 800;
  display: block;
}
.who span {
  font-size: 0.85rem;
  color: var(--ink2);
  display: block;
}
@media (max-width: 860px) {
  .team {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (prefers-reduced-motion: reduce) {
  a :deep(img) {
    transition: none;
  }
}
</style>
