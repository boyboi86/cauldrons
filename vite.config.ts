import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Baked into both the client and SSR bundles so the prerendered markup and the
 * first client render agree on the copyright year. The footer then rolls the
 * year forward on the client at runtime.
 */
const buildYear = String(new Date().getFullYear())

export default defineConfig(({ isSsrBuild }) => ({
  base: '/',
  plugins: [react()],
  define: {
    __BUILD_YEAR__: JSON.stringify(buildYear),
  },
  build: {
    outDir: isSsrBuild ? 'dist-ssr' : 'dist',
    emptyOutDir: true,
    copyPublicDir: !isSsrBuild,
    target: 'es2020',
    cssTarget: 'chrome80',
    assetsInlineLimit: 2048,
    // Never ship source maps: the public site should expose as little of the
    // original source structure as possible.
    sourcemap: false,
  },
}))
