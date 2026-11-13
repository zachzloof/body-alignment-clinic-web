// Verifies that every text/background pairing the design uses passes WCAG AA
// on all four brand colours. Reads the tokens straight from src/brands.ts.
//
//   npm run check:contrast
import { brands, INK } from '../src/brands.ts'

const WHITE = '#ffffff'
const INK2 = '#55606b' // secondary text
const BG2 = '#f5f6f8'

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
  console.log(`\n${b.name}`)
  row('text on brand colour (nav, hero, primary button)', b.onBrand, b.colour)
  row('muted text on brand colour (inactive nav link, hero eyebrow)', mix(b.onBrand, b.colour, b.mute), b.colour)
  row('eyebrow / link text on white', b.deep, WHITE)
  row('eyebrow text on soft band', b.deep, b.soft)
  row('eyebrow text on grey panel', b.deep, BG2)
  row('body text on soft band', INK, b.soft)
  row('secondary text on soft band', INK2, b.soft)
  row('brand colour as link hover on dark footer', b.colour, INK)
  row('focus ring on white (non-text, 3:1)', b.deep, WHITE, 3)
  row('focus ring on brand colour (non-text, 3:1)', b.onBrand, b.colour, 3)
}
console.log('\nShared')
row('secondary text on white', INK2, WHITE)
row('secondary text on grey panel', INK2, BG2)
row('footer text (75% white on ink)', mix(WHITE, INK, 75), INK)

console.log(failures ? `\n${failures} pairing(s) fail` : '\nAll pairings pass')
process.exitCode = failures ? 1 : 0
