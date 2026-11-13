// Turns the full-resolution originals in content/images/ into responsive
// AVIF + WebP files in public/img/, and writes src/data/images.manifest.json
// so components know each image's intrinsic size (no layout shift) and which
// widths exist.
//
//   node scripts/optimize-images.mjs [--force]
//
// Runs automatically before `dev` and `build`. Work is skipped for any output
// that is already newer than its source, so repeat runs are near-instant.
import { mkdir, readdir, stat, writeFile } from 'node:fs/promises'
import { dirname, extname, join, basename } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const srcDir = join(root, 'content', 'images')
const outDir = join(root, 'public', 'img')
const manifestPath = join(root, 'src', 'data', 'images.manifest.json')
const force = process.argv.includes('--force')

const LADDER = [160, 320, 480, 640, 800, 1080, 1360, 1600]

/** Largest width worth generating, by file-name prefix. Anything not listed gets the full ladder. */
const MAX_WIDTH = [
  [/^icon-/, 160],
  [/^partner-/, 480],
  [/^(logo-|tss-)/, 640],
  [/^(ig-|client-|course-|banner-)/, 1080],
]

/** Open Graph share images: 1200x630 JPEG crops, written to public/og/<name>.jpg */
const OG = {
  home: { from: 'clinic-room', position: 'centre' },
  team: { from: 'book-banner', position: 'centre' },
  clinic: { from: 'clinic-room', position: 'centre' },
  pilates: { from: 'pilates-video-poster', position: 'centre' },
  hyper8: { from: 'hyper8-hero', position: 'centre' },
  academy: { from: 'academy-3', position: 'top' },
}

const mtime = (p) => stat(p).then((s) => s.mtimeMs, () => 0)
const hex = ({ r, g, b }) => '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')

await mkdir(outDir, { recursive: true })
await mkdir(dirname(manifestPath), { recursive: true })
await mkdir(join(root, 'public', 'og'), { recursive: true })

const files = (await readdir(srcDir)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort()
const manifest = {}
let made = 0

for (const file of files) {
  const name = basename(file, extname(file))
  if (name === 'favicon-source') continue
  const src = join(srcDir, file)
  const srcTime = await mtime(src)
  // .rotate() bakes in EXIF orientation so phone photos are the right way up
  const image = sharp(src).rotate()
  const meta = await image.metadata()
  const swapped = (meta.orientation ?? 1) >= 5
  const w = swapped ? meta.height : meta.width
  const h = swapped ? meta.width : meta.height
  const cap = Math.min(w, MAX_WIDTH.find(([re]) => re.test(name))?.[1] ?? Infinity)
  const widths = LADDER.filter((x) => x <= cap)
  if (!widths.length || (widths.at(-1) < cap && cap < 1600)) widths.push(cap)

  for (const width of widths) {
    for (const format of ['avif', 'webp']) {
      const out = join(outDir, `${name}-${width}.${format}`)
      if (!force && (await mtime(out)) > srcTime) continue
      const pipeline = sharp(src).rotate().resize({ width, withoutEnlargement: true })
      if (format === 'avif') await pipeline.avif({ quality: 52, effort: 4 }).toFile(out)
      else await pipeline.webp({ quality: 78, effort: 5 }).toFile(out)
      made++
    }
  }

  // average colour: painted behind the image while it loads
  const { dominant } = await sharp(src).rotate().resize(64).flatten({ background: '#ffffff' }).stats()
  manifest[name] = { w, h, widths, bg: hex(dominant), alpha: Boolean(meta.hasAlpha) }
}

for (const [name, { from, position }] of Object.entries(OG)) {
  const srcFile = files.find((f) => basename(f, extname(f)) === from)
  if (!srcFile) throw new Error(`OG source "${from}" not found in content/images`)
  const src = join(srcDir, srcFile)
  const out = join(root, 'public', 'og', `${name}.jpg`)
  if (!force && (await mtime(out)) > (await mtime(src))) continue
  await sharp(src).rotate().resize(1200, 630, { fit: 'cover', position }).jpeg({ quality: 82, mozjpeg: true }).toFile(out)
  made++
}

// favicons from the client's existing 200px icon
const fav = join(srcDir, 'favicon-source.png')
if (await mtime(fav)) {
  for (const [file, size] of [['favicon-32.png', 32], ['favicon-192.png', 192], ['apple-touch-icon.png', 180]]) {
    const out = join(root, 'public', file)
    if (!force && (await mtime(out)) > (await mtime(fav))) continue
    await sharp(fav).resize(size, size).png().toFile(out)
    made++
  }
}

await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n')
console.log(`images: ${files.length} sources, ${made} files written, manifest has ${Object.keys(manifest).length} entries`)
