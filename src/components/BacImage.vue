<script setup lang="ts">
import { computed } from 'vue'
import { imageUrl, images, srcset, type ImageName } from '@/lib/images'

/**
 * Responsive image from the pipeline (scripts/optimize-images.mjs):
 * AVIF with a WebP fallback, real width/height so nothing shifts while it
 * loads, lazy by default.
 */
const props = withDefaults(
  defineProps<{
    name: ImageName
    /** Describe the photo. Pass "" only when the image is purely decorative. */
    alt: string
    /** CSS `sizes`: how wide the image is displayed. */
    sizes?: string
    /** Set on the one image that is the page's main above-the-fold visual. */
    priority?: boolean
    /** object-position, for crops */
    position?: string
  }>(),
  { sizes: '100vw', priority: false, position: undefined },
)

const info = computed(() => images[props.name])
</script>

<template>
  <picture class="pic" :style="info.alpha ? undefined : { backgroundColor: info.bg }">
    <source type="image/avif" :srcset="srcset(name, 'avif')" :sizes="sizes" />
    <img
      :src="imageUrl(name, 800)"
      :srcset="srcset(name, 'webp')"
      :sizes="sizes"
      :width="info.w"
      :height="info.h"
      :alt="alt"
      :loading="priority ? 'eager' : 'lazy'"
      :fetchpriority="priority ? 'high' : undefined"
      decoding="async"
      :style="position ? { objectPosition: position } : undefined"
    />
  </picture>
</template>

<style>
.pic {
  display: block;
  overflow: hidden;
}
.pic img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
