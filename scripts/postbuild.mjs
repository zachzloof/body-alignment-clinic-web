// Runs after vite-ssg: writes sitemap.xml and robots.txt for the prerendered pages.
import { readdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { site } from '../src/content/site.ts'

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist')
const pages = (await readdir(dist))
  .filter((f) => f.endsWith('.html') && f !== '404.html')
  .map((f) => (f === 'index.html' ? '/' : '/' + f.replace(/\.html$/, '')))
  .sort()

const today = new Date().toISOString().slice(0, 10)
const lines = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...pages.map((p) => `  <url><loc>${site.url}${p}</loc><lastmod>${today}</lastmod></url>`),
  '</urlset>',
  '',
]

await writeFile(join(dist, 'sitemap.xml'), lines.join('\n'))
await writeFile(join(dist, 'robots.txt'), ['User-agent: *', 'Allow: /', '', `Sitemap: ${site.url}/sitemap.xml`, ''].join('\n'))
console.log(`postbuild: sitemap.xml lists ${pages.length} pages`)
