/// <reference types="vite-ssg" />
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  // Every route is prerendered to its own HTML file (see src/main.ts).
  ssgOptions: {
    script: 'async',
    // /our-team -> dist/our-team.html, so URLs match the current site exactly
    // (no trailing slash). Netlify, Cloudflare Pages, Vercel and GitHub Pages
    // all serve this layout as-is.
    dirStyle: 'flat',
    formatting: 'minify',
  },
})
