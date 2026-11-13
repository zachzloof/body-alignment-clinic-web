<script setup lang="ts">
import { RouterLink } from 'vue-router'

/**
 * One link component for both kinds of destination: a route inside the site
 * (`to`) or an external URL (`href`, opens in a new tab and says so to
 * screen readers).
 */
defineProps<{
  to?: string
  href?: string
}>()
</script>

<template>
  <RouterLink v-if="to" :to="to"><slot /></RouterLink>
  <a v-else :href="href" target="_blank" rel="noopener">
    <slot /><span class="ext" aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span>
  </a>
</template>
