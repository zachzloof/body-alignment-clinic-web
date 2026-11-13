<script setup lang="ts">
import { RouterLink } from 'vue-router'
import AcuityEmbed from '@/components/AcuityEmbed.vue'
import EnquiryForm from '@/components/EnquiryForm.vue'
import PageHero from '@/components/PageHero.vue'
import { contactFields } from '@/content/forms'
import { academy } from '@/content/pages'
import { diaries } from '@/content/site'
</script>

<template>
  <PageHero eyebrow="Body Alignment Academy · Direct booking page" title="Book a course">
    <RouterLink class="btn" to="/body-alignment-academy">View more info</RouterLink>
  </PageHero>

  <section class="block" aria-labelledby="dates-h">
    <div class="wrap split">
      <div>
        <p class="eyebrow">Available courses</p>
        <h2 id="dates-h">Dates to be announced</h2>
        <ul class="courses">
          <li v-for="c in academy.courses" :key="c.name">
            <b>{{ c.name }}</b>
            <span>{{ c.price ? `${c.price} · ${c.when}` : c.when }}</span>
          </li>
        </ul>
      </div>
      <div>
        <p class="lede">
          New course dates appear in the diary below as they are released. To ask about a course in the meantime, send
          us a message.
        </p>
        <EnquiryForm
          form="contact"
          subject="Website enquiry: Body Alignment Academy"
          :fields="contactFields('Body Alignment Academy')"
          submit-label="Send message"
        />
      </div>
    </div>
  </section>

  <section class="block band" aria-labelledby="diary-h">
    <div class="wrap">
      <div class="head"><h2 id="diary-h">Academy diary</h2></div>
      <AcuityEmbed :src="diaries.academy" title="Book a Body Alignment Academy course" />
    </div>
  </section>
</template>

<style scoped>
.courses {
  list-style: none;
  margin: 1.6rem 0 0;
  padding: 0;
  display: grid;
  gap: 0.9rem;
}
.courses b {
  display: block;
  font-family: var(--display);
  font-weight: 700;
}
.courses span {
  color: var(--ink2);
  font-size: 0.92rem;
}
.lede {
  margin: 0 0 1.6rem;
}
</style>
