// Build a single self-contained HTML file (all JS/CSS inlined) for preview.
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const outDir = 'dist-single'

execSync('npx vite build --outDir dist-single --emptyOutDir', { stdio: 'inherit' })

const htmlPath = path.join(outDir, 'index.html')
let html = fs.readFileSync(htmlPath, 'utf8')

// Inline the module script
html = html.replace(
  /<script type="module"[^>]*src="([^"]+)"[^>]*><\/script>/,
  (_m, src) => `<script type="module">${fs.readFileSync(path.join(outDir, src), 'utf8')}</script>`,
)

// Inline the CSS
html = html.replace(
  /<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/,
  (_m, href) => `<style>${fs.readFileSync(path.join(outDir, href), 'utf8')}</style>`,
)

fs.writeFileSync(path.join(outDir, 'index.html'), html)
console.log('Single-file build written to dist-single/index.html')
