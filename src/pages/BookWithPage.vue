<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import AcuityEmbed from '@/components/AcuityEmbed.vue'
import FaqList from '@/components/FaqList.vue'
import PageHero from '@/components/PageHero.vue'
import PractitionerCards from '@/components/PractitionerCards.vue'
import { generalFaq } from '@/content/shared'
import { practitioners, type Practitioner } from '@/content/team'

/** One page component for all three practitioner diaries; the route says which. */
const props = defineProps<{ practitionerId: Practitioner['id'] }>()
const who = computed(() => practitioners.find((p) => p.id === props.practitionerId)!)
</script>

<template>
  <PageHero eyebrow="Booking · Body Alignment Clinic" :title="`Book in with ${who.name}`" :lead="who.role">
    <RouterLink class="btn" to="/book-appointment">All booking options</RouterLink>
  </PageHero>

  <section class="block" :aria-label="`${who.name}’s diary`">
    <div class="wrap">
      <!-- keyed so moving between practitioners loads a fresh diary -->
      <AcuityEmbed :key="who.id" :src="who.diary" :title="`Book in with ${who.name}`" />
    </div>
  </section>

  <section class="block band" aria-labelledby="faq-h">
    <div class="wrap split">
      <div>
        <p class="eyebrow">Before you book</p>
        <h2 id="faq-h">FAQ</h2>
      </div>
      <FaqList :items="generalFaq" />
    </div>
  </section>

  <section class="block" aria-labelledby="others-h">
    <div class="wrap">
      <div class="head"><h2 id="others-h">Book in with other members of the team</h2></div>
      <PractitionerCards :exclude="who.id" />
    </div>
  </section>
</template>
