import { useEffect, useState } from 'react'
import { githubNav, nav, site } from '../data/site'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const headerClasses = ['sb-header', scrolled ? 'is-scrolled' : '', menuOpen ? 'is-open' : '']
    .filter(Boolean)
    .join(' ')

  return (
    <header className={headerClasses}>
      <div className="sb-container sb-header__inner">
        <a className="sb-header__brand" href="#top" aria-label={`${site.name} — home`}>
          <img
            className="sb-header__logo"
            src="/brand/skybrique-wordmark.png"
            alt="Skybrique"
            width={1536}
            height={270}
          />
        </a>

        <button
          className="sb-header__toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span className="sb-header__toggle-bars" aria-hidden="true" />
        </button>

        <nav
          className={menuOpen ? 'sb-header__nav is-open' : 'sb-header__nav'}
          id="primary-navigation"
          aria-label="Primary"
        >
          <ul className="sb-header__list">
            {nav.map((item) => (
              <li key={item.href}>
                <a className="sb-header__link sb-mono" href={item.href} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                className="sb-header__link sb-header__link--external sb-mono"
                href={githubNav.href}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => setMenuOpen(false)}
              >
                {githubNav.label}
                <span className="sb-sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
