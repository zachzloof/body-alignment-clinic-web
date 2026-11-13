<script setup lang="ts">
import type { Faq } from '@/content/shared'

/**
 * Native <details>, so it opens with a keyboard, a screen reader, or no
 * JavaScript at all. Where the browser supports it the panel height
 * animates; elsewhere the answer simply fades in.
 */
defineProps<{ items: Faq[] }>()
</script>

<template>
  <div class="faq">
    <details v-for="f in items" :key="f.q">
      <summary>
        <span>{{ f.q }}</span>
        <span class="sign" aria-hidden="true" />
      </summary>
      <div class="answer">
        <p v-for="p in f.a" :key="p">{{ p }}</p>
      </div>
    </details>
  </div>
</template>

<style scoped>
details {
  border-top: 1px solid color-mix(in srgb, var(--ink) 14%, transparent);
}
details:last-child {
  border-bottom: 1px solid color-mix(in srgb, var(--ink) 14%, transparent);
}
summary {
  cursor: pointer;
  padding: 1.1rem 0;
  min-height: 56px;
  font-family: var(--display);
  font-weight: 700;
  font-size: 1.05rem;
  line-height: 1.3;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  -webkit-tap-highlight-color: transparent;
}
summary::-webkit-details-marker {
  display: none;
}
summary:hover {
  color: var(--brand-deep);
}
/* plus that turns into a minus */
.sign {
  position: relative;
  flex: none;
  width: 16px;
  height: 16px;
  color: var(--brand-deep);
}
.sign::before,
.sign::after {
  content: '';
  position: absolute;
  inset: 7px 0;
  background: currentColor;
  border-radius: 2px;
  transition: transform 0.25s var(--ease-out);
}
.sign::after {
  transform: rotate(90deg);
}
details[open] .sign::after {
  transform: rotate(0deg);
}
.answer {
  padding-bottom: 1.2rem;
}
.answer p {
  margin: 0 0 0.6rem;
  color: var(--ink2);
  max-width: 60em;
}
.answer p:last-child {
  margin-bottom: 0;
}

@media (prefers-reduced-motion: no-preference) {
  details[open] .answer {
    animation: rise 0.3s var(--ease-out) both;
  }
  /* Smooth height where ::details-content and interpolate-size exist */
  @supports selector(::details-content) and (interpolate-size: allow-keywords) {
    details {
      interpolate-size: allow-keywords;
    }
    details::details-content {
      block-size: 0;
      overflow: clip;
      transition: block-size 0.3s var(--ease-out), content-visibility 0.3s allow-discrete;
    }
    details[open]::details-content {
      block-size: auto;
    }
  }
}
@media (prefers-reduced-motion: reduce) {
  .sign::before,
  .sign::after {
    transition: none;
  }
}
</style>
