<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * The eight Hyper 8 movement patterns. Each tile acts out its own word:
 * "Jump" hops, "Push" shoves right, "Rotate" spins, and so on.
 *
 * They play once in sequence as the row scrolls into view, and again on
 * hover or touch (pointerenter fires for both). With reduced motion (or no JavaScript) they are plain tiles.
 */
const props = defineProps<{ movements: string[] }>()

const row = ref<HTMLElement>()
const active = ref<Set<number>>(new Set())
const timers: number[] = []
let observer: IntersectionObserver | undefined

const slug = (m: string) => m.toLowerCase().replace(/\s+/g, '-')

function play(i: number) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  active.value = new Set(active.value).add(i)
  timers.push(
    window.setTimeout(() => {
      const next = new Set(active.value)
      next.delete(i)
      active.value = next
    }, 750),
  )
}

onMounted(() => {
  if (!('IntersectionObserver' in window) || !row.value) return
  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return
      observer?.disconnect()
      props.movements.forEach((_, i) => timers.push(window.setTimeout(() => play(i), 350 + i * 130)))
    },
    { threshold: 0.5 },
  )
  observer.observe(row.value)
})
onBeforeUnmount(() => {
  observer?.disconnect()
  timers.forEach((t) => window.clearTimeout(t))
})
</script>

<template>
  <ul ref="row" v-reveal="'stagger'" class="moves">
    <li
      v-for="(m, i) in movements"
      :key="m"
      :class="[slug(m), { go: active.has(i) }]"
      @pointerenter="play(i)"
    >
      <span>{{ m }}</span>
    </li>
  </ul>
</template>

<style scoped>
.moves {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 0.6rem;
  list-style: none;
  margin: 0;
  padding: 0;
}
li {
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  border-radius: 14px;
  background: var(--bg2);
  border: 1px solid var(--line);
  font-family: var(--display);
  font-weight: 800;
  font-size: 1rem;
  text-align: center;
  padding: 0.5rem;
  min-width: 0;
  overflow: hidden;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s;
}
li:hover,
li.go {
  background: var(--brand);
  color: var(--on-brand);
  border-color: var(--brand);
}
li span {
  display: inline-block;
}
@media (max-width: 900px) {
  .moves {
    grid-template-columns: repeat(4, 1fr);
  }
}
@media (max-width: 400px) {
  li {
    font-size: 0.88rem;
  }
}

@media (prefers-reduced-motion: no-preference) {
  li.go span {
    animation: 0.7s var(--ease-out) both;
  }
  .sit-up.go span {
    transform-origin: 0 100%;
    animation-name: sit-up;
  }
  .stand-up.go span {
    transform-origin: 50% 100%;
    animation-name: stand-up;
  }
  .pick-up.go span {
    animation-name: pick-up;
  }
  .push.go span {
    animation-name: push;
  }
  .pull.go span {
    animation-name: pull;
  }
  .jump.go span {
    transform-origin: 50% 100%;
    animation-name: jump;
  }
  .rotate.go span {
    animation-name: rotate;
  }
  .walk.go span {
    animation-name: walk;
    animation-timing-function: linear;
  }

  @keyframes sit-up {
    0% { transform: rotate(0); }
    35% { transform: rotate(14deg); }
    70% { transform: rotate(-6deg); }
    100% { transform: rotate(0); }
  }
  @keyframes stand-up {
    0% { transform: scaleY(1); }
    35% { transform: scaleY(0.62); }
    70% { transform: scaleY(1.12); }
    100% { transform: scaleY(1); }
  }
  @keyframes pick-up {
    0% { transform: translateY(0); }
    35% { transform: translateY(12px); }
    75% { transform: translateY(-8px); }
    100% { transform: translateY(0); }
  }
  @keyframes push {
    0% { transform: translateX(0); }
    20% { transform: translateX(-4px); }
    55% { transform: translateX(14px); }
    100% { transform: translateX(0); }
  }
  @keyframes pull {
    0% { transform: translateX(0); }
    20% { transform: translateX(4px); }
    55% { transform: translateX(-14px); }
    100% { transform: translateX(0); }
  }
  @keyframes jump {
    0% { transform: translateY(0) scaleY(1); }
    20% { transform: translateY(3px) scaleY(0.8); }
    55% { transform: translateY(-16px) scaleY(1.06); }
    85% { transform: translateY(0) scaleY(0.92); }
    100% { transform: translateY(0) scaleY(1); }
  }
  @keyframes rotate {
    from { transform: rotate(0); }
    to { transform: rotate(360deg); }
  }
  @keyframes walk {
    0% { transform: translateX(0) rotate(0); }
    20% { transform: translateX(-6px) rotate(-5deg); }
    40% { transform: translateX(-2px) rotate(4deg); }
    60% { transform: translateX(4px) rotate(-4deg); }
    80% { transform: translateX(7px) rotate(4deg); }
    100% { transform: translateX(0) rotate(0); }
  }
}
</style>
