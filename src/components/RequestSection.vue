<script setup lang="ts">
import EnquiryForm from '@/components/EnquiryForm.vue'
import { requestFields } from '@/content/forms'
import { clinic } from '@/content/pages'
import { contact } from '@/content/site'
</script>

<template>
  <section id="emergency" class="block band" aria-labelledby="emergency-h">
    <div class="wrap split">
      <div v-reveal>
        <p class="eyebrow">Request form</p>
        <h2 id="emergency-h">{{ clinic.request.heading }}</h2>
        <p class="lede">{{ clinic.request.intro }}</p>
        <p class="call">
          Prefer to talk? Call <a class="textlink" :href="contact.phoneHref">{{ contact.phone }}</a>
        </p>
      </div>
      <EnquiryForm
        form="emergency-home-visit"
        subject="Emergency / home visit request"
        :fields="requestFields"
        submit-label="Send request"
      />
    </div>
  </section>
</template>

<style scoped>
.lede {
  margin: 1rem 0 0;
}
.call {
  margin: 1rem 0 0;
}
</style>
