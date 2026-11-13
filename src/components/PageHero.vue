<script setup lang="ts">
import { useHead } from '@unhead/vue'
import BacImage from '@/components/BacImage.vue'
import { srcset, type ImageName } from '@/lib/images'

/**
 * The flooded band at the top of every page: brand colour edge to edge,
 * black type, calls to action, and (on the main pages) a photo.
 * Buttons go in the default slot.
 */
const props = defineProps<{
  eyebrow: string
  title: string
  lead?: string
  image?: ImageName
  imageAlt?: string
  /** landscape photo with all four corners rounded, instead of the tall one that sits on the fold */
  wide?: boolean
}>()

const sizes = '(max-width: 900px) calc(100vw - 32px), 500px'

// Start fetching the hero photo before the stylesheet and script are parsed.
if (props.image) {
  useHead({
    link: [
      {
        rel: 'preload',
        as: 'image',
        type: 'image/avif',
        imagesrcset: srcset(props.image, 'avif'),
        imagesizes: sizes,
        fetchpriority: 'high',
      },
    ],
  })
}
</script>

<template>
  <header class="hero on-brand" :class="{ plain: !image }">
    <div class="wrap">
      <div class="txt">
        <p class="eyebrow">{{ eyebrow }}</p>
        <h1>{{ title }}</h1>
        <p v-if="lead" class="lead">{{ lead }}</p>
        <div v-if="$slots.default" class="ctas"><slot /></div>
      </div>
      <figure v-if="image">
        <BacImage :name="image" :alt="imageAlt ?? ''" :class="{ wide }" :sizes="sizes" priority position="top" />
      </figure>
    </div>
  </header>
</template>

<style scoped>
.hero {
  background: var(--brand);
  color: var(--on-brand);
  overflow: hidden;
}
.wrap {
  display: grid;
  grid-template-columns: 7fr 5fr;
  gap: 3rem;
  align-items: center;
  padding-block: 3.5rem 0;
}
.txt {
  padding-bottom: 3.5rem;
}
.eyebrow {
  margin: 0;
  color: var(--on-brand-muted);
}
h1 {
  font-size: clamp(2.6rem, 6.2vw, 5.6rem);
  margin-top: 1rem;
}
.lead {
  font-size: 1.15rem;
  max-width: 34em;
  margin: 1.4rem 0 0;
}
.ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 1.8rem;
}
.ctas :deep(.btn) {
  border-color: var(--on-brand);
  color: var(--on-brand);
}
.ctas :deep(.btn.ink) {
  background: var(--on-brand);
  color: #fff;
}
.ctas :deep(.btn.ink:hover) {
  background: #fff;
  color: var(--on-brand);
  border-color: #fff;
}
.ctas :deep(.btn:not(.ink):hover) {
  background: var(--on-brand);
  color: #fff;
}
figure {
  margin: 0;
  align-self: end;
}
figure :deep(.pic) {
  aspect-ratio: 4 / 5;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -20px 60px rgba(0, 0, 0, 0.15);
}
figure :deep(.pic.wide) {
  aspect-ratio: 4 / 3;
  border-radius: 20px;
  margin-bottom: 3rem;
}

/* pages without a photo: a shorter band */
.plain .wrap {
  grid-template-columns: 1fr;
  padding-block: 3rem 0;
}
.plain .txt {
  padding-bottom: 3rem;
  max-width: 54rem;
}
.plain h1 {
  font-size: clamp(2.4rem, 5.4vw, 4.4rem);
}

@media (max-width: 900px) {
  .wrap {
    grid-template-columns: 1fr;
    gap: 1.75rem;
    padding-top: 2.25rem;
  }
  .txt {
    padding-bottom: 0;
  }
  .plain .txt {
    padding-bottom: 2.5rem;
  }
  figure :deep(.pic),
  figure :deep(.pic.wide) {
    aspect-ratio: 4 / 3;
  }
  figure :deep(.pic.wide) {
    margin-bottom: 2rem;
  }
}

/* The page-load moment: headline first, then supporting copy and buttons a
   beat behind, while the photo rises into place. Pure CSS, so it plays with
   or without JavaScript, and the photo never fades (it is the LCP element). */
@media (prefers-reduced-motion: no-preference) {
  .txt > * {
    animation: rise 0.5s var(--ease-out) both;
  }
  .txt > :nth-child(2) {
    animation-delay: 0.05s;
  }
  .txt > :nth-child(3) {
    animation-delay: 0.11s;
  }
  .txt > :nth-child(4) {
    animation-delay: 0.17s;
  }
  figure {
    animation: lift 0.7s var(--ease-out) both;
  }
  @keyframes lift {
    from {
      transform: translateY(36px);
    }
    to {
      transform: none;
    }
  }
}
</style>
