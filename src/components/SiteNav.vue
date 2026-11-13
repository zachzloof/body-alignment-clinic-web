<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { brandOrder, brands } from '@/brands'
import ActionLink from '@/components/ActionLink.vue'
import BacImage from '@/components/BacImage.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import { useBrand } from '@/composables/useBrand'
import { contact, mainNav } from '@/content/site'
import type { ImageName } from '@/lib/images'

const route = useRoute()
const brand = useBrand()

const open = ref(false)
const menuButton = ref<HTMLButtonElement>()
const navEl = ref<HTMLElement>()

watch(() => route.fullPath, () => (open.value = false))

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && open.value) {
    open.value = false
    menuButton.value?.focus()
  }
}
function onPointerDown(e: PointerEvent) {
  if (open.value && navEl.value && !navEl.value.contains(e.target as Node)) open.value = false
}
onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  document.addEventListener('pointerdown', onPointerDown)
})
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
  document.removeEventListener('pointerdown', onPointerDown)
})
</script>

<template>
  <header ref="navEl" class="nav on-brand">
    <div class="wrap bar">
      <RouterLink to="/" class="home" :aria-label="`${brand.logoAlt}: home`">
        <!-- All four logos are in the DOM so the swap is instant when the
             colour floods; only the current brand's is visible. -->
        <BacImage
          v-for="key in brandOrder"
          :key="key"
          class="logo"
          :class="{ current: key === brand.key }"
          :name="brands[key].logo as ImageName"
          alt=""
          sizes="140px"
          :priority="key === brand.key"
        />
      </RouterLink>

      <nav class="links" aria-label="Main">
        <ul>
          <li v-for="item in mainNav" :key="item.to">
            <RouterLink :to="item.to" exact-active-class="on">
              <span v-if="item.brand" class="dot" :style="{ background: brands[item.brand].colour }" />{{ item.label }}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <ThemeToggle class="bar-theme" />

      <ActionLink class="btn ink cta" :to="brand.cta.to" :href="brand.cta.href">{{ brand.cta.label }}</ActionLink>

      <button
        ref="menuButton"
        class="burger"
        type="button"
        :aria-expanded="open"
        aria-controls="nav-sheet"
        @click="open = !open"
      >
        {{ open ? 'Close' : 'Menu' }}
      </button>
    </div>

    <div id="nav-sheet" class="sheet" :class="{ open }" :inert="!open">
      <nav class="wrap" aria-label="Menu">
        <ul>
          <li><RouterLink to="/" exact-active-class="on">Home</RouterLink></li>
          <li v-for="item in mainNav" :key="item.to">
            <RouterLink :to="item.to" exact-active-class="on">
              <span v-if="item.brand" class="dot" :style="{ background: brands[item.brand].colour }" />{{ item.label }}
            </RouterLink>
          </li>
        </ul>
        <!-- phones: the switch moves in here, where there is room for it -->
        <div class="sheet-theme">
          <span aria-hidden="true">Dark mode</span>
          <ThemeToggle />
        </div>
        <div class="sheet-actions">
          <RouterLink class="btn primary" to="/book-appointment">Book an appointment</RouterLink>
          <a class="btn" :href="contact.phoneHref">Call {{ contact.phone }}</a>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 20;
  background: var(--brand);
  color: var(--on-brand);
  padding-top: env(safe-area-inset-top, 0px);
  /* The desktop bar scales with the window: --grow runs from 0 at 1280px wide
     to 1px at 1440px and up, and the logo, links, button and gaps each add a
     multiple of it. Everything fits on one line at every width in between. */
  --grow: clamp(0px, (100vw - 1280px) / 160, 1px);
}
.bar {
  display: flex;
  align-items: center;
  gap: calc(1rem + var(--grow) * 6.4);
  height: var(--nav-h);
  /* On wide screens the bar runs a little wider than the page content, which
     is what gives the links and logo room to be this size. */
  max-width: 1400px;
}

/* logo: four stacked, one visible */
.home {
  position: relative;
  display: block;
  flex: none;
  border-radius: 6px;
}
.logo {
  height: calc(44px + var(--grow) * 4);
  width: auto;
  border-radius: 6px;
  border: 2px solid rgba(0, 0, 0, 0.8);
  background: none !important;
  opacity: 0;
  visibility: hidden;
  position: absolute;
  inset: 0 auto 0 0;
  transition: opacity 0.25s var(--ease-out), visibility 0s 0.25s;
}
.logo.current {
  position: static;
  opacity: 1;
  visibility: visible;
  transition: opacity 0.25s var(--ease-out);
}
.logo :deep(img) {
  height: 100%;
  width: auto;
  object-fit: contain;
}

.links {
  margin: 0 auto;
}
.links ul {
  display: flex;
  gap: calc(1rem + var(--grow) * 3.2);
  list-style: none;
  margin: 0;
  padding: 0;
}
.links a {
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  font-size: calc(0.88rem + var(--grow) * 1.6);
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  color: var(--on-brand-muted);
  padding: 0.3em 0;
  border-bottom: 2px solid transparent;
  transition: color 0.15s, border-color 0.15s;
}
.links a:hover,
.links a.on {
  color: var(--on-brand);
  border-color: var(--on-brand);
}

.links .dot {
  width: 11px;
  height: 11px;
}

.cta {
  flex: none;
  white-space: nowrap;
  font-size: calc(0.9rem + var(--grow) * 1.6);
}
/* The bar is the same in both themes: black on the brand colour. */
.nav .btn.ink {
  background: var(--on-brand);
  border-color: var(--on-brand);
  color: #fff;
}
.nav .btn.ink:hover {
  background: #fff;
  border-color: #fff;
  color: var(--on-brand);
}
.sheet-theme {
  display: none;
}

.burger {
  display: none;
  flex: none;
  min-height: 44px;
  min-width: 76px;
  background: transparent;
  border: 2px solid var(--on-brand);
  border-radius: 12px;
  padding: 0.5em 0.9em;
  color: var(--on-brand);
  font-family: var(--display);
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.15s, color 0.15s, transform 0.12s var(--ease-press);
}
.burger:active {
  transform: scale(0.96);
}
.burger[aria-expanded='true'] {
  background: var(--on-brand);
  color: #fff;
}

/* mobile sheet */
.sheet {
  display: none;
}

@media (max-width: 1279px) {
  .links {
    display: none;
  }
  .bar-theme {
    margin-left: auto;
  }
  .cta {
    min-height: 44px;
    padding: 0.6em 1em;
    font-size: 0.9rem;
  }
  .burger {
    display: block;
  }
  .bar {
    gap: 0.5rem;
  }
  .logo {
    height: 40px;
  }
  .sheet {
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    max-height: calc(100dvh - var(--nav-h) - env(safe-area-inset-top, 0px));
    overflow-y: auto;
    overscroll-behavior: contain;
    background: var(--bg);
    color: var(--ink);
    border-bottom: 1px solid var(--line);
    box-shadow: 0 24px 40px rgba(13, 15, 18, 0.16);
    --focus: var(--brand-deep);
    visibility: hidden;
    opacity: 0;
    transform: translateY(-8px);
    transition: opacity 0.18s var(--ease-out), transform 0.18s var(--ease-out), visibility 0s 0.18s;
  }
  .sheet.open {
    visibility: visible;
    opacity: 1;
    transform: none;
    transition: opacity 0.18s var(--ease-out), transform 0.18s var(--ease-out);
  }
  .sheet ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .sheet li a {
    display: flex;
    align-items: center;
    gap: 0.7em;
    min-height: 52px;
    padding: 0.8rem 0;
    border-bottom: 1px solid var(--line);
    text-decoration: none;
    font-weight: 700;
  }
  .sheet li a.on {
    color: var(--brand-deep);
  }
  .sheet-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.6rem;
    padding-block: 1rem 1.2rem;
  }
}
@media (max-width: 520px) {
  .sheet-actions {
    grid-template-columns: 1fr;
  }
  /* no room in the bar: the switch is the last row of the menu */
  .bar-theme {
    display: none;
  }
  .cta {
    margin-left: auto;
  }
  .sheet-theme {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    min-height: 60px;
    border-bottom: 1px solid var(--line);
    font-weight: 700;
    --tt-on: var(--bg);
  }
}
@media (max-width: 400px) {
  .logo {
    height: 35px;
  }
  .cta,
  .burger {
    font-size: 0.84rem;
    padding-inline: 0.75em;
  }
  .burger {
    min-width: 0;
  }
}
/* very narrow phones: the call to action lives in the menu instead */
@media (max-width: 359px) {
  .cta {
    display: none;
  }
  .burger {
    margin-left: auto;
  }
}
@media (prefers-reduced-motion: reduce) {
  .sheet,
  .sheet.open,
  .logo,
  .logo.current {
    transition: none;
  }
}
</style>
