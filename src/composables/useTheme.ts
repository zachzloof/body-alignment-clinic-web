import { onMounted, readonly, ref, type Ref } from 'vue'
import { floodFrom } from '@/lib/viewTransition'

export type Theme = 'light' | 'dark'

/**
 * Light and dark theme.
 *
 * The theme lives in one place: `data-theme` on <html>. The inline script in
 * index.html sets it before first paint (the visitor's saved choice, else
 * their device setting), and the stylesheet reads it, so prerendered pages
 * never flash the wrong theme. This composable mirrors that attribute for
 * components and changes it when the switch is used.
 *
 * To ship one fixed theme instead, remove the switch from SiteNav.vue and
 * hard-code the attribute in index.html.
 */

/** Must match the key in the inline script in index.html. */
const STORAGE_KEY = 'bac-theme'

const theme = ref<Theme>('light')
let started = false

function saved(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

function apply(next: Theme): void {
  document.documentElement.dataset.theme = next
  theme.value = next
}

function start(): void {
  theme.value = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
  if (started) return
  started = true
  // Follow the device setting until the visitor has chosen for themselves.
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', (e) => {
    if (!saved()) apply(e.matches ? 'dark' : 'light')
  })
}

/**
 * Flip the theme and remember the choice. Given the element that was used,
 * the new theme floods out from it, like a change of brand.
 */
function toggle(from?: Element): void {
  const next: Theme = theme.value === 'dark' ? 'light' : 'dark'
  try {
    localStorage.setItem(STORAGE_KEY, next)
  } catch {
    // private browsing: the choice lasts for this visit only
  }
  if (from) floodFrom(from, () => apply(next))
  else apply(next)
}

export function useTheme(): { theme: Readonly<Ref<Theme>>; toggle: (from?: Element) => void } {
  // Read on mount, not during setup, so the first client render matches the
  // prerendered HTML (which cannot know the visitor's theme).
  onMounted(start)
  return { theme: readonly(theme), toggle }
}
