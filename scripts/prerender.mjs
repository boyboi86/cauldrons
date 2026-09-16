import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const { render } = await import(path.join(root, 'dist-ssr', 'entry-server.js'))

const templatePath = path.join(root, 'dist', 'index.html')
const template = await readFile(templatePath, 'utf8')
const appHtml = render()

const marker = '<div id="root"></div>'
if (!template.includes(marker)) {
  throw new Error('prerender: could not find root marker in dist/index.html')
}

await writeFile(templatePath, template.replace(marker, `<div id="root">${appHtml}</div>`))
console.log(`prerender: injected ${appHtml.length} characters of static markup`)

// Keep the sitemap's lastmod accurate for every build.
const lastmod = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://skybrique.com/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`
await writeFile(path.join(root, 'dist', 'sitemap.xml'), sitemap)
console.log(`prerender: wrote sitemap.xml (lastmod ${lastmod})`)
