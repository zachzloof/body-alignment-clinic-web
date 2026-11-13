<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

/**
 * The light/dark switch. It takes its colour from the text around it, so it
 * works on the brand colour (nav) and on the page (mobile menu). Set
 * `--tt-on` to the colour the active icon should be on top of the thumb.
 */
const { theme, toggle } = useTheme()
</script>

<template>
  <button
    class="theme-toggle"
    type="button"
    role="switch"
    :aria-checked="theme === 'dark'"
    aria-label="Dark mode"
    @click="toggle($event.currentTarget as Element)"
  >
    <span class="track" aria-hidden="true">
      <span class="thumb" />
      <svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round">
        <circle cx="12" cy="12" r="4.2" fill="currentColor" stroke="none" />
        <path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5.3 5.3 7 7M17 17l1.7 1.7M18.7 5.3 17 7M7 17l-1.7 1.7" />
      </svg>
      <svg class="moon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.4 14.6A8.6 8.6 0 0 1 9.4 3.6a.7.7 0 0 0-.9-.9 9.6 9.6 0 1 0 12.8 12.8.7.7 0 0 0-.9-.9Z" />
      </svg>
    </span>
  </button>
</template>

<!-- Not scoped: the thumb position follows <html data-theme>, which is set
     before first paint, so the switch never slides into place on page load. -->
<style>
.theme-toggle {
  display: inline-grid;
  place-items: center;
  flex: none;
  min-height: 44px;
  padding: 0;
  border: 0;
  background: none;
  color: inherit;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.theme-toggle:focus-visible {
  border-radius: 999px;
}
.theme-toggle .track {
  position: relative;
  display: block;
  width: 64px;
  height: 34px;
  border: 2px solid currentColor;
  border-radius: 999px;
  transition: background-color 0.18s var(--ease-out);
}
.theme-toggle:hover .track {
  background-color: color-mix(in srgb, currentColor 12%, transparent);
}
.theme-toggle .thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: currentColor;
  transition: transform 0.28s var(--ease-out);
}
.theme-toggle svg {
  position: absolute;
  top: 8px;
  width: 14px;
  height: 14px;
  transition: color 0.2s;
}
.theme-toggle .sun {
  left: 8px;
  color: var(--tt-on, #fff);
}
.theme-toggle .moon {
  right: 8px;
}
:root[data-theme='dark'] .theme-toggle .thumb {
  transform: translateX(30px);
}
:root[data-theme='dark'] .theme-toggle .sun {
  color: inherit;
}
:root[data-theme='dark'] .theme-toggle .moon {
  color: var(--tt-on, #fff);
}
@media (prefers-reduced-motion: reduce) {
  .theme-toggle .thumb,
  .theme-toggle svg {
    transition: none;
  }
}
</style>
