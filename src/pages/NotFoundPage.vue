<script setup lang="ts">
import { RouterLink } from 'vue-router'
import PageHero from '@/components/PageHero.vue'
import { mainNav } from '@/content/site'
</script>

<template>
  <PageHero eyebrow="Error 404" title="Page not found" lead="That address isn’t on this site. Try one of these instead.">
    <RouterLink class="btn ink" to="/">Go to the home page</RouterLink>
    <RouterLink class="btn" to="/book-appointment">Book an appointment</RouterLink>
  </PageHero>

  <section class="block" aria-label="Pages">
    <ul class="wrap pages">
      <li v-for="item in mainNav" :key="item.to">
        <RouterLink class="textlink" :to="item.to">{{ item.label }}</RouterLink>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.pages {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem 1.8rem;
  margin-block: 0;
}
.pages a {
  display: inline-block;
  padding-block: 0.5rem;
}
</style>
