<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { contact } from '@/content/site'
import type { EnquiryTopic } from '@/content/shared'

/**
 * "Reach out": the contact strip the current site repeats on most pages.
 * `topic` pre-selects the subject on the contact form.
 */
defineProps<{ topic?: EnquiryTopic }>()
</script>

<template>
  <section class="block tight" aria-labelledby="reach-h">
    <div v-reveal class="wrap reach">
      <div>
        <p class="eyebrow">Reach out</p>
        <h2 id="reach-h">Contact us</h2>
      </div>
      <ul>
        <li>
          <span class="k">Contact number</span>
          <a :href="contact.phoneHref">{{ contact.phone }}</a>
        </li>
        <li>
          <span class="k">Email</span>
          <a class="email" :href="contact.emailHref">{{ contact.email }}</a>
        </li>
      </ul>
      <div class="actions">
        <RouterLink class="btn primary" :to="{ path: '/faq-contact', query: topic ? { topic } : undefined, hash: '#contact' }">
          Send a message
        </RouterLink>
        <a class="btn" :href="contact.mapsUrl" target="_blank" rel="noopener">
          Get directions<span class="ext" aria-hidden="true">↗</span><span class="sr-only"> (opens Google Maps in a new tab)</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.reach {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1.5rem 3rem;
  align-items: center;
}
.eyebrow {
  margin: 0 0 0.5rem;
}
h2 {
  font-size: clamp(1.7rem, 3vw, 2.3rem);
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 2.5rem;
}
.k {
  display: block;
  font-size: 0.85rem;
  color: var(--ink2);
}
li a {
  font-family: var(--display);
  font-weight: 700;
  font-size: 1.1rem;
  text-decoration: none;
  display: inline-block;
  padding-block: 0.25rem;
}
li a:hover {
  text-decoration: underline;
  text-decoration-color: var(--brand-deep);
  text-decoration-thickness: 2px;
  text-underline-offset: 4px;
}
.email {
  word-break: break-all;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}
@media (max-width: 1000px) {
  .reach {
    grid-template-columns: 1fr;
  }
}
</style>
