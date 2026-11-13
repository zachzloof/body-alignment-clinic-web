<script setup lang="ts">
import { RouterLink } from 'vue-router'
import BacImage from '@/components/BacImage.vue'
import { contact, mainNav, site, social } from '@/content/site'
</script>

<template>
  <footer class="footer on-ink">
    <div class="wrap cols">
      <div class="brand">
        <!-- white artwork on the dark footer, black on the light one -->
        <BacImage class="tss for-light" name="tss-white" alt="Team Straight Spine" sizes="120px" />
        <BacImage class="tss for-dark" name="tss-black" alt="Team Straight Spine" sizes="120px" />
        <p>{{ site.name }} · {{ site.alternateName }}. {{ site.tagline }}</p>
        <RouterLink class="btn primary" to="/book-appointment">Book an appointment</RouterLink>
      </div>

      <div>
        <h2>Visit</h2>
        <address>
          <span v-for="line in contact.addressLines" :key="line">{{ line }}</span>
        </address>
        <p>
          <a :href="contact.mapsUrl" target="_blank" rel="noopener">
            Open Google Maps <span aria-hidden="true">↗</span><span class="sr-only">(opens in a new tab)</span>
          </a>
        </p>
      </div>

      <div>
        <h2>Contact</h2>
        <p><a :href="contact.phoneHref">{{ contact.phone }}</a></p>
        <p><a class="email" :href="contact.emailHref">{{ contact.email }}</a></p>
        <p><RouterLink to="/faq-contact#contact">Send a message</RouterLink></p>
      </div>

      <nav aria-label="Footer">
        <h2>Explore</h2>
        <ul>
          <li><RouterLink to="/">Home</RouterLink></li>
          <li v-for="item in mainNav" :key="item.to">
            <RouterLink :to="item.to">{{ item.label }}</RouterLink>
          </li>
        </ul>
      </nav>

      <div>
        <h2>Follow</h2>
        <ul>
          <li><a :href="social.instagram" target="_blank" rel="noopener">Instagram</a></li>
          <li><a :href="social.youtube" target="_blank" rel="noopener">YouTube</a></li>
          <li><a :href="social.facebook" target="_blank" rel="noopener">Facebook</a></li>
        </ul>
      </div>
    </div>
    <div class="wrap legal">
      <p>© {{ site.name }}</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--panel);
  color: var(--on-panel);
  border-top: 8px solid var(--brand);
}
.cols {
  display: grid;
  grid-template-columns: 2fr 1fr 1.25fr 1.25fr 0.8fr;
  gap: 2rem;
  padding-block: 3rem 2rem;
}
h2 {
  font-size: 0.74rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  line-height: 1.4;
  margin: 0 0 0.8rem;
  color: var(--on-panel-muted);
}
p,
li,
address {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.7;
  font-style: normal;
}
address span {
  display: block;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
a:not(.btn) {
  text-decoration: none;
  display: inline-block;
  padding-block: 0.2rem;
  transition: color 0.15s;
}
a:not(.btn):hover {
  color: var(--panel-accent);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.email {
  word-break: break-all;
}
.brand p {
  margin: 0.8rem 0 1.2rem;
  max-width: 30em;
  color: var(--on-panel-muted);
}
.tss {
  width: 86px;
  height: auto;
  background: none !important;
}
.tss.for-dark,
:global(:root[data-theme='dark'] .footer .tss.for-light) {
  display: none;
}
:global(:root[data-theme='dark'] .footer .tss.for-dark) {
  display: block;
}
.footer .btn.primary:hover {
  background: var(--on-panel);
  border-color: var(--on-panel);
  color: var(--panel);
}
.legal {
  padding-block: 1.2rem calc(1.4rem + env(safe-area-inset-bottom, 0px));
  border-top: 1px solid var(--panel-line);
}
.legal p {
  font-size: 0.82rem;
  color: var(--on-panel-muted);
}
@media (max-width: 1000px) {
  .cols {
    grid-template-columns: 1fr 1fr;
  }
  .brand {
    grid-column: 1 / -1;
  }
}
@media (max-width: 480px) {
  .cols {
    grid-template-columns: 1fr;
    gap: 1.6rem;
  }
  a:not(.btn) {
    padding-block: 0.6rem;
  }
}
</style>
