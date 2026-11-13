import { nextTick } from 'vue'
import type { Router } from 'vue-router'

/**
 * The site's signature moment: when a navigation changes sub-brand, the new
 * page (and its colour) floods outward from the point the visitor tapped.
 * Same-brand navigations get a quick cross-fade instead.
 *
 * Uses the View Transitions API. Where it is missing, or the visitor prefers
 * reduced motion, navigation is instant and the colour tokens tween in CSS
 * (see the @supports block in styles/base.css).
 */
export function installViewTransitions(router: Router): void {
  const root = document.documentElement
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

  // Where the flood starts: the last tap/click, or the focused element when
  // the keyboard was used.
  let origin = { x: window.innerWidth / 2, y: 0 }
  window.addEventListener('pointerdown', (e) => (origin = { x: e.clientX, y: e.clientY }), { capture: true, passive: true })
  window.addEventListener(
    'keydown',
    (e) => {
      if (e.key !== 'Enter' || !(document.activeElement instanceof HTMLElement)) return
      const r = document.activeElement.getBoundingClientRect()
      origin = { x: r.left + r.width / 2, y: r.top + r.height / 2 }
    },
    { capture: true },
  )

  router.beforeResolve((to, from) => {
    const firstLoad = from.matched.length === 0
    if (firstLoad || to.path === from.path) return
    if (typeof document.startViewTransition !== 'function' || reducedMotion.matches) return

    const flood = to.meta.brand !== from.meta.brand
    if (flood) {
      const { x, y } = origin
      const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
      root.style.setProperty('--vt-x', `${x}px`)
      root.style.setProperty('--vt-y', `${y}px`)
      root.style.setProperty('--vt-r', `${Math.ceil(radius)}px`)
    }
    root.classList.toggle('vt-flood', flood)

    // The browser snapshots the old page, then we let the router continue and
    // tell the browser once Vue has rendered the new page and scrolled.
    let domReady!: () => void
    const domUpdated = new Promise<void>((resolve) => (domReady = resolve))
    const failsafe = window.setTimeout(domReady, 1200)
    const stop = router.afterEach(() => {
      stop()
      void nextTick(() => window.setTimeout(domReady, 0))
    })

    return new Promise<void>((snapshotTaken) => {
      const transition = document.startViewTransition(() => {
        snapshotTaken()
        return domUpdated
      })
      void transition.finished.finally(() => {
        window.clearTimeout(failsafe)
        root.classList.remove('vt-flood')
      })
    })
  })
}
