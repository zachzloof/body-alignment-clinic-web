<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { onMounted } from 'vue'

/**
 * An Acuity Scheduling diary, embedded the way Acuity documents it: an
 * iframe plus their small embed script, which resizes the frame to fit.
 * The link underneath is there for anyone whose browser blocks the frame.
 */
const props = defineProps<{
  /** the diary URL, from content/site.ts */
  src: string
  /** accessible name for the frame, e.g. "Book in with Sam" */
  title: string
}>()

const SCRIPT = 'https://embed.acuityscheduling.com/js/embed.js'

// start connecting to Acuity while the visitor is still reading the top of the page
useHead({
  link: [
    { rel: 'preconnect', href: new URL(props.src).origin },
    { rel: 'preconnect', href: new URL(SCRIPT).origin },
  ],
})

onMounted(() => {
  if (document.querySelector(`script[src="${SCRIPT}"]`)) return
  const s = document.createElement('script')
  s.src = SCRIPT
  s.async = true
  document.head.append(s)
})
</script>

<template>
  <div class="acuity">
    <iframe :src="src" :title="title" width="100%" height="800" loading="lazy" />
    <p>
      Diary not loading?
      <a class="textlink" :href="src" target="_blank" rel="noopener">
        Open it in a new tab<span class="sr-only"> ({{ title }})</span>
      </a>
    </p>
  </div>
</template>

<style scoped>
.acuity {
  display: grid;
  gap: 0.8rem;
}
iframe {
  display: block;
  width: 100%;
  /* reserved up front so the page doesn't jump when the diary loads */
  min-height: 800px;
  border: 1.5px solid var(--line);
  border-radius: 20px;
  background: var(--bg);
}
p {
  margin: 0;
  font-size: 0.92rem;
  color: var(--ink2);
}
</style>
