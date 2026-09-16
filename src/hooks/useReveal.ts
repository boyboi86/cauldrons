import { useEffect, useRef } from 'react'

interface RevealOptions {
  rootMargin?: string
  threshold?: number
}

/**
 * Progressive-enhancement reveal.
 *
 * Elements are visible by default. The inline script in `index.html` adds a
 * `js` class to <html> before first paint, and CSS uses `.js .sb-reveal` to
 * hide the element until `.is-in` is applied. This keeps the page fully
 * readable when JavaScript is unavailable.
 */
export function useReveal<T extends HTMLElement>(options: RevealOptions = {}) {
  const { rootMargin = '0px 0px -12% 0px', threshold = 0.12 } = options
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (typeof IntersectionObserver === 'undefined') {
      element.classList.add('is-in')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            observer.unobserve(entry.target)
          }
        }
      },
      { rootMargin, threshold },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [rootMargin, threshold])

  return ref
}
