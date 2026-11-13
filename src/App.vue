<script setup lang="ts">
import { useHead } from '@unhead/vue'
import manropeUrl from '@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2?url'
import soraUrl from '@fontsource-variable/sora/files/sora-latin-wght-normal.woff2?url'
import { computed, nextTick, ref } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import { brandVars } from '@/brands'
import SiteFooter from '@/components/SiteFooter.vue'
import SiteNav from '@/components/SiteNav.vue'
import { useBrand } from '@/composables/useBrand'
import { contact, site, social } from '@/content/site'

const route = useRoute()
const router = useRouter()

// ----- the colour system -----
// The route's sub-brand becomes CSS custom properties on the app root.
// Everything on the page reads those, so nothing else needs to know which
// brand is active. The light/dark theme is separate: see useTheme.ts.
const brand = useBrand()
const vars = computed(() => brandVars(brand.value))

// ----- per-page <head> -----
const pageTitle = computed(() =>
  route.name === 'home' ? `${site.name} | ${route.meta.title}` : `${route.meta.title} | ${site.name}`,
)
const canonical = computed(() => site.url + (route.path === '/' ? '/' : route.path))
const ogImage = computed(() => `${site.url}/og/${route.meta.ogImage ?? 'home'}.jpg`)

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${site.url}/#clinic`,
  name: site.name,
  alternateName: site.alternateName,
  description: site.tagline,
  url: site.url + '/',
  telephone: contact.phoneE164,
  email: contact.email,
  image: `${site.url}/og/home.jpg`,
  address: { '@type': 'PostalAddress', ...contact.postal },
  hasMap: contact.mapsUrl,
  founder: { '@type': 'Person', name: 'Sam Singh' },
  sameAs: [social.instagram, social.youtube, social.facebook],
}

useHead({
  htmlAttrs: { lang: 'en-GB' },
  title: pageTitle,
  link: [
    { rel: 'canonical', href: canonical },
    { rel: 'preload', as: 'font', type: 'font/woff2', href: soraUrl, crossorigin: 'anonymous' },
    { rel: 'preload', as: 'font', type: 'font/woff2', href: manropeUrl, crossorigin: 'anonymous' },
  ],
  meta: [
    { name: 'description', content: () => route.meta.description },
    // phones tint their browser chrome with the page's brand colour
    { name: 'theme-color', content: () => brand.value.colour },
    { property: 'og:site_name', content: site.name },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'en_GB' },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: () => route.meta.description },
    { property: 'og:url', content: canonical },
    { property: 'og:image', content: ogImage },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'robots', content: () => (route.name === 'not-found' ? 'noindex' : 'index, follow') },
  ],
  script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(localBusiness) }],
})

// ----- accessibility on route change -----
// Move focus to the new page and announce its title to screen readers.
const main = ref<HTMLElement>()
const announcement = ref('')
router.afterEach((to, from) => {
  if (import.meta.env.SSR || !from.matched.length || to.path === from.path) return
  void nextTick(() => {
    if (!to.hash) main.value?.focus({ preventScroll: true })
    announcement.value = `${to.meta.title} page`
  })
})
</script>

<template>
  <div class="app" :style="vars" :data-brand="brand.key">
    <a class="skip" href="#main">Skip to content</a>
    <SiteNav />
    <main id="main" ref="main" tabindex="-1">
      <RouterView />
    </main>
    <SiteFooter />
    <div class="sr-only" aria-live="polite" aria-atomic="true">{{ announcement }}</div>
  </div>
</template>
