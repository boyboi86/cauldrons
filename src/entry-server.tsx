import { renderToString } from 'react-dom/server'
import App from './App'

/**
 * Static prerender entry. `scripts/prerender.mjs` imports this after the SSR
 * build and injects the markup into `dist/index.html`, so the deployed site
 * renders without JavaScript and remains crawlable.
 */
export function render(): string {
  return renderToString(<App />)
}
