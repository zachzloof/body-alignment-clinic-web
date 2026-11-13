// Verifies that every text/background pairing the design uses passes WCAG AA
// on all four brand colours, in both the light and the dark theme. Reads the
// tokens straight from src/brands.ts.
//
//   npm run check:contrast
import { brands, neutrals } from '../src/brands.ts'

const lin = (c) => ((c /= 255) <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))
const lum = (hex) => {
  const [r, g, b] = rgb(hex)
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}
const ratio = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}
// same maths as CSS color-mix(in srgb, a p%, b)
const mix = (a, b, p) => {
  const A = rgb(a)
  const B = rgb(b)
  return '#' + A.map((v, i) => Math.round((v * p + B[i] * (100 - p)) / 100).toString(16).padStart(2, '0')).join('')
}

let failures = 0
const row = (label, fg, bg, min = 4.5) => {
  const r = ratio(fg, bg)
  const pass = r >= min
  if (!pass) failures++
  console.log(`  ${pass ? 'pass' : 'FAIL'}  ${r.toFixed(2).padStart(5)}:1  (needs ${min})  ${label}  ${fg} on ${bg}`)
}

for (const b of Object.values(brands)) {
  console.log(`\n${b.name}: on the brand colour (same in both themes)`)
  row('text on brand colour (nav, hero, primary button)', b.onBrand, b.colour)
  row('muted text on brand colour (inactive nav link, hero eyebrow)', mix(b.onBrand, b.colour, b.mute), b.colour)
  row('focus ring on brand colour (non-text, 3:1)', b.onBrand, b.colour, 3)

  for (const [theme, n] of Object.entries(neutrals)) {
    const deep = theme === 'dark' ? b.deepDark : b.deep
    const soft = theme === 'dark' ? b.softDark : b.soft
    // text accent on the inverted blocks (footer link hover, offer eyebrow)
    const panelAccent = theme === 'dark' ? b.deep : b.colour
    console.log(`${b.name}: ${theme} theme`)
    row('eyebrow / link text on page', deep, n.bg)
    row('eyebrow text on soft band', deep, soft)
    row('eyebrow text on grey panel', deep, n.bg2)
    row('body text on soft band', n.ink, soft)
    row('secondary text on soft band', n.ink2, soft)
    row('accent text on inverted block (footer hover)', panelAccent, n.panel)
    row('focus ring on page (non-text, 3:1)', deep, n.bg, 3)
  }
}

for (const [theme, n] of Object.entries(neutrals)) {
  console.log(`\nShared: ${theme} theme`)
  row('body text on page', n.ink, n.bg)
  row('secondary text on page', n.ink2, n.bg)
  row('secondary text on grey panel', n.ink2, n.bg2)
  row('muted text on inverted block (footer)', mix(n.onPanel, n.panel, n.onPanelMutedAlpha), n.panel)
}

console.log(failures ? `\n${failures} pairing(s) fail` : '\nAll pairings pass')
process.exitCode = failures ? 1 : 0
