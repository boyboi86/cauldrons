/**
 * Asset preparation: copies only the latin subsets of the self-hosted fonts
 * into public/fonts, so the deployed site ships three woff2 files instead of
 * every subset fontsource emits.
 *
 * Source of truth: @fontsource-variable/inter and @fontsource/ibm-plex-mono.
 * Run from the repository root:  node scripts/copy-fonts.js
 */
import { copyFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const outDir = path.join(root, 'public', 'fonts')
mkdirSync(outDir, { recursive: true })

const files = [
  'node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2',
  'node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2',
  'node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2',
]

for (const file of files) {
  const name = path.basename(file)
  copyFileSync(path.join(root, file), path.join(outDir, name))
  console.log(`copied ${name}`)
}
