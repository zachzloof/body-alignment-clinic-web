<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { brands } from '@/brands'
import BacImage from '@/components/BacImage.vue'
import { services } from '@/content/shared'
</script>

<template>
  <div v-reveal="'stagger'" class="tiles">
    <RouterLink
      v-for="s in services"
      :key="s.brand"
      class="tile"
      :to="brands[s.brand].path"
      :style="{ '--c': brands[s.brand].colour }"
    >
      <BacImage :name="s.banner" alt="" sizes="(max-width: 540px) calc(100vw - 32px), (max-width: 960px) 50vw, 300px" />
      <span class="txt">
        <span class="tag">{{ s.tag }}</span>
        <span class="name">{{ brands[s.brand].name }}</span>
        <span class="blurb">{{ s.blurb }}</span>
        <span class="go">Open <span class="arrow" aria-hidden="true">→</span></span>
      </span>
    </RouterLink>
  </div>
</template>

<style scoped>
.tiles {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.9rem;
}
.tile {
  --focus: var(--ink);
  display: grid;
  grid-template-rows: auto 1fr;
  text-decoration: none;
  border-radius: 18px;
  overflow: hidden;
  background: var(--c);
  color: #0d0f12;
  min-width: 0;
  transition: transform 0.2s var(--ease-out), box-shadow 0.2s var(--ease-out);
}
.tile:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 30px -12px rgba(13, 15, 18, 0.35);
}
.tile:active {
  transform: translateY(-1px) scale(0.99);
}
.tile :deep(.pic) {
  aspect-ratio: 1036 / 342;
}
.txt {
  padding: 1.2rem;
  display: grid;
  gap: 0.35rem;
  align-content: start;
}
.name {
  font-family: var(--display);
  font-weight: 800;
  font-size: 1.1rem;
  line-height: 1.1;
  letter-spacing: -0.025em;
}
.tag {
  font-size: 0.78rem;
  font-weight: 700;
}
.blurb {
  font-size: 0.92rem;
}
.go {
  font-family: var(--display);
  font-weight: 700;
  font-size: 0.8rem;
  margin-top: 0.4rem;
}
.arrow {
  display: inline-block;
  transition: transform 0.2s var(--ease-out);
}
.tile:hover .arrow {
  transform: translateX(4px);
}
@media (max-width: 960px) {
  .tiles {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 540px) {
  .tiles {
    grid-template-columns: 1fr;
  }
}
@media (prefers-reduced-motion: reduce) {
  .tile,
  .arrow {
    transition: none;
  }
}
</style>
