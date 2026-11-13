import { ViteSSG } from 'vite-ssg'
import '@fontsource-variable/sora/wght.css'
import '@fontsource-variable/manrope/wght.css'
import './styles/base.css'
import App from './App.vue'
import { vReveal } from './lib/reveal'
import { installViewTransitions } from './lib/viewTransition'
import { routes } from './router/routes'

// vite-ssg prerenders every route in `routes` to its own HTML file at build
// time, then hydrates it in the browser as a normal Vue app.
export const createApp = ViteSSG(
  App,
  {
    routes,
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) return savedPosition
      if (to.hash) {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const samePage = to.path === from.path
        // offset clears the sticky nav
        return { el: to.hash, top: 86, behavior: samePage && !reduce ? 'smooth' : 'auto' }
      }
      if (to.path === from.path) return false
      return { top: 0 }
    },
  },
  ({ app, router, isClient }) => {
    app.directive('reveal', vReveal)
    if (isClient) installViewTransitions(router)
  },
)
