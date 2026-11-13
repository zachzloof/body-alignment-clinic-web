<script setup lang="ts">
import { RouterLink } from 'vue-router'
import AcuityEmbed from '@/components/AcuityEmbed.vue'
import BacImage from '@/components/BacImage.vue'
import ContactBand from '@/components/ContactBand.vue'
import PageHero from '@/components/PageHero.vue'
import { pilates } from '@/content/pages'
import { diaries } from '@/content/site'
import { imageUrl } from '@/lib/images'
</script>

<template>
  <PageHero v-bind="pilates.hero">
    <RouterLink class="btn ink" :to="{ hash: '#book' }">Book now</RouterLink>
    <a class="btn" :href="`mailto:${pilates.offerEmail}`">Email Hollie</a>
  </PageHero>

  <section class="block" aria-labelledby="about-h">
    <div v-reveal class="wrap split">
      <div>
        <BacImage class="roundel" name="logo-pilates" alt="" sizes="120px" />
        <p class="eyebrow">About</p>
        <h2 id="about-h">Move correctly and <mark>confidently</mark></h2>
      </div>
      <div class="prose">
        <p v-for="p in pilates.about" :key="p">{{ p }}</p>
        <h3 id="sessions-h">Sessions available</h3>
        <ul class="sessions" aria-labelledby="sessions-h">
          <li v-for="s in pilates.sessions" :key="s">{{ s }}</li>
        </ul>
        <RouterLink class="btn primary" :to="{ hash: '#book' }">Book now</RouterLink>
      </div>
    </div>
  </section>

  <section class="block band" aria-labelledby="incl-h">
    <div class="wrap">
      <div class="head"><h2 id="incl-h">What’s included</h2></div>
      <ul v-reveal="'stagger'" class="incl">
        <li v-for="i in pilates.included" :key="i.text">
          <BacImage :name="i.icon" alt="" sizes="48px" />
          <b>{{ i.text }}</b>
        </li>
      </ul>
    </div>
  </section>

  <section class="block" aria-labelledby="achieve-h">
    <div v-reveal class="wrap split">
      <div>
        <p class="eyebrow">Rehabilitation & strength</p>
        <h2 id="achieve-h">What you can expect to achieve</h2>
      </div>
      <div class="prose">
        <p v-for="p in pilates.achieve" :key="p">{{ p }}</p>
      </div>
    </div>
  </section>

  <section class="block" aria-label="Inside the Pilates Clinic">
    <div v-reveal="'stagger'" class="wrap studio">
      <!-- Not autoplayed and nothing downloads until play is pressed. -->
      <video
        controls
        playsinline
        preload="none"
        :poster="imageUrl(pilates.video.poster, 1080)"
        :aria-label="pilates.video.label"
        width="1920"
        height="1080"
      >
        <source :src="pilates.video.src" type="video/mp4" />
        <a :href="pilates.video.src">Download the video</a>
      </video>
      <BacImage
        v-for="p in pilates.photos"
        :key="p.image"
        :name="p.image"
        :alt="p.alt"
        sizes="(max-width: 760px) 50vw, 300px"
      />
    </div>
  </section>

  <section class="block" aria-labelledby="offer-h">
    <div class="wrap">
      <div v-reveal class="offer on-ink">
        <div>
          <p class="eyebrow">Class offer</p>
          <h2 id="offer-h">{{ pilates.offer }}</h2>
        </div>
        <a class="btn primary" :href="`mailto:${pilates.offerEmail}`">{{ pilates.offerEmail }}</a>
      </div>
    </div>
  </section>

  <section id="book" class="block band" aria-labelledby="book-h">
    <div class="wrap">
      <div class="head">
        <h2 id="book-h">Book Reformer Pilates</h2>
        <p>Choose a 1-1 or 2-1 session in Hollie’s diary.</p>
      </div>
      <AcuityEmbed :src="diaries.pilates" title="Book Reformer Pilates at The Pilates Clinic" />
    </div>
  </section>

  <ContactBand topic="The Pilates Clinic" />
</template>

<style scoped>
.roundel {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  margin-bottom: 1.4rem;
}
.prose h3 {
  font-size: 1.2rem;
  margin: 1.8rem 0 0.8rem;
}
.sessions {
  list-style: none;
  margin: 0 0 1.4rem;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.sessions li {
  font-family: var(--display);
  font-weight: 700;
  font-size: 0.95rem;
  padding: 0.7em 1em;
  border-radius: 12px;
  background: var(--brand-soft);
  border: 1.5px solid color-mix(in srgb, var(--brand) 55%, transparent);
}

.incl {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.9rem;
  list-style: none;
  margin: 0;
  padding: 0;
}
.incl li {
  background: var(--bg);
  border: 1.5px solid var(--line);
  border-radius: 16px;
  padding: 1.4rem;
  display: grid;
  gap: 0.9rem;
  align-content: start;
}
.incl :deep(.pic) {
  width: 44px;
  height: 44px;
}
.incl :deep(img) {
  object-fit: contain;
}
.incl b {
  font-family: var(--display);
  font-weight: 700;
  font-size: 1.05rem;
  line-height: 1.3;
}

/* video on the left, two portrait photos beside it */
.studio {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 0.6rem;
}
.studio video {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  border-radius: 14px;
  background: #000;
  align-self: start;
}
.studio :deep(.pic) {
  position: relative;
  border-radius: 14px;
}
.studio :deep(.pic img) {
  position: absolute;
  inset: 0;
}

.offer {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1.5rem 2rem;
  align-items: center;
  padding: 2rem;
  border-radius: 20px;
  background: var(--ink);
  color: #fff;
}
.offer .eyebrow {
  margin: 0 0 0.6rem;
  color: var(--brand);
}
.offer h2 {
  font-size: clamp(1.4rem, 2.6vw, 2rem);
  line-height: 1.1;
  max-width: 24em;
}
.offer .btn.primary:hover {
  background: #fff;
  border-color: #fff;
  color: var(--ink);
}

@media (max-width: 760px) {
  .incl {
    grid-template-columns: 1fr;
  }
  .incl li {
    grid-template-columns: auto 1fr;
    align-items: center;
    padding: 1.1rem 1.2rem;
  }
  .studio {
    grid-template-columns: 1fr 1fr;
  }
  .studio video {
    grid-column: 1 / -1;
  }
  .studio :deep(.pic) {
    aspect-ratio: 3 / 4;
  }
  .offer {
    grid-template-columns: 1fr;
    padding: 1.5rem;
  }
  .offer .btn {
    word-break: break-all;
  }
}
</style>
