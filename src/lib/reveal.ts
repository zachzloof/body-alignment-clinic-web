import type { ObjectDirective } from 'vue'

/**
 * v-reveal: a one-off rise-and-fade as a block scrolls into view.
 * v-reveal="'stagger'": the block's direct children rise one after another.
 *
 * Safety first: prerendered HTML carries no hidden state at all. An element
 * is only hidden here, in the browser, once we know that
 *   - IntersectionObserver exists,
 *   - the visitor has not asked for reduced motion, and
 *   - the element is currently below the fold.
 * If any of that fails, or JavaScript never runs, content is simply visible.
 */
let observer: IntersectionObserver | undefined

function getObserver(): IntersectionObserver {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.replace('reveal-wait', 'reveal-in')
        observer?.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
  )
  return observer
}

export const vReveal: ObjectDirective<HTMLElement, 'stagger' | undefined> = {
  mounted(el, binding) {
    if (!('IntersectionObserver' in window)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (binding.value === 'stagger') el.dataset.reveal = 'stagger'
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return
    el.classList.add('reveal-wait')
    getObserver().observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
  // nothing is rendered on the server for this directive
  getSSRProps: () => ({}),
}
