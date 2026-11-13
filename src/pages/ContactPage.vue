<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import BacImage from '@/components/BacImage.vue'
import EnquiryForm from '@/components/EnquiryForm.vue'
import FaqList from '@/components/FaqList.vue'
import PageHero from '@/components/PageHero.vue'
import { contactFields, isEnquiryTopic } from '@/content/forms'
import { generalFaq } from '@/content/shared'
import { contact, social } from '@/content/site'

// Other pages link here with ?topic=… so the right subject is already chosen.
const route = useRoute()
const topic = computed(() => (isEnquiryTopic(route.query.topic) ? route.query.topic : undefined))
</script>

<template>
  <PageHero eyebrow="About · FAQ & Contact" title="FAQ & contact">
    <RouterLink class="btn ink" :to="{ hash: '#contact' }">Contact us</RouterLink>
    <a class="btn" :href="contact.phoneHref">Call {{ contact.phone }}</a>
  </PageHero>

  <section class="block" aria-labelledby="faq-h">
    <div class="wrap split">
      <div>
        <p class="eyebrow">Before you book</p>
        <h2 id="faq-h">FAQ</h2>
      </div>
      <FaqList :items="generalFaq" />
    </div>
  </section>

  <section id="contact" class="block band" aria-labelledby="contact-h">
    <div class="wrap split">
      <div v-reveal>
        <p class="eyebrow">Reach out</p>
        <h2 id="contact-h">Contact us</h2>
        <dl class="details">
          <div>
            <dt>Contact number</dt>
            <dd><a :href="contact.phoneHref">{{ contact.phone }}</a></dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd><a class="email" :href="`${contact.emailHref}?subject=General%20Enquiry`">{{ contact.email }}</a></dd>
          </div>
          <div>
            <dt>Find us</dt>
            <dd>
              <address>
                Body Alignment Clinic<br />
                <template v-for="line in contact.addressLines" :key="line">{{ line }}<br /></template>
              </address>
              <a class="textlink" :href="contact.mapsUrl" target="_blank" rel="noopener">
                Get directions to clinic<span class="sr-only"> (opens Google Maps in a new tab)</span>
              </a>
            </dd>
          </div>
          <div>
            <dt>Follow</dt>
            <dd class="social">
              <a class="textlink" :href="social.instagram" target="_blank" rel="noopener">Instagram</a>
              <a class="textlink" :href="social.youtube" target="_blank" rel="noopener">YouTube</a>
              <a class="textlink" :href="social.facebook" target="_blank" rel="noopener">Facebook</a>
            </dd>
          </div>
        </dl>
      </div>
      <div>
        <!-- keyed so a new ?topic= resets the form -->
        <EnquiryForm
          :key="topic ?? 'general'"
          form="contact"
          :subject="topic ? `Website enquiry: ${topic}` : 'Website enquiry'"
          :fields="contactFields(topic)"
          submit-label="Send message"
        />
      </div>
    </div>
  </section>

  <section class="block" aria-label="The clinic">
    <div v-reveal class="wrap">
      <BacImage
        class="room"
        name="book-banner"
        alt="Inside Body Alignment Clinic: treatment couches, a skeleton model and gym equipment"
        sizes="(max-width: 1272px) calc(100vw - 32px), 1240px"
      />
    </div>
  </section>
</template>

<style scoped>
.details {
  display: grid;
  gap: 1.3rem;
  margin: 1.6rem 0 0;
}
dt {
  font-size: 0.85rem;
  color: var(--ink2);
}
dd {
  margin: 0.1rem 0 0;
}
dd > a:not(.textlink) {
  font-family: var(--display);
  font-weight: 700;
  font-size: 1.15rem;
  text-decoration: none;
  display: inline-block;
  padding-block: 0.2rem;
}
dd > a:not(.textlink):hover {
  text-decoration: underline;
  text-decoration-color: var(--brand-deep);
  text-decoration-thickness: 2px;
  text-underline-offset: 4px;
}
.email {
  word-break: break-all;
}
address {
  font-style: normal;
  margin-bottom: 0.5rem;
}
.social {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem 1.2rem;
}
.social a {
  padding-block: 0.3rem;
}
.room {
  aspect-ratio: 2500 / 883;
  border-radius: 20px;
}
@media (max-width: 700px) {
  .room {
    aspect-ratio: 16 / 9;
  }
}
</style>
