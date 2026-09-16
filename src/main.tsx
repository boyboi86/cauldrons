import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App'

const container = document.getElementById('root')

if (!container) {
  throw new Error('Skybrique: root element #root was not found.')
}

const tree = (
  <StrictMode>
    <App />
  </StrictMode>
)

// `npm run build` prerenders the markup into #root, so hydrate when present.
// The dev server serves an empty root, which falls back to a client render.
if (container.hasChildNodes()) {
  hydrateRoot(container, tree)
} else {
  createRoot(container).render(tree)
}

// Tell the inline failsafe in index.html that the client took over, so it
// leaves the `js` class in place. Prevents reveal animations from leaving
// content hidden if this bundle ever fails to load.
document.documentElement.setAttribute('data-ready', 'true')
