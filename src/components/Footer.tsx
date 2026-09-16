import { useEffect, useState } from 'react'
import { site } from '../data/site'
import { MatrixMark } from './ui/MatrixMark'

const FOOTER_TAGS: readonly string[] = [
  'Quantitative research',
  'Algorithms',
  'Statistics',
  'Machine learning',
]

export function Footer() {
  // Starts from the build-time year so the first client render matches the
  // prerendered markup, then rolls forward on the client. The copyright line
  // is therefore never frozen at the year the site was last built.
  const [year, setYear] = useState<string>(__BUILD_YEAR__)

  useEffect(() => {
    const current = String(new Date().getFullYear())
    if (current !== __BUILD_YEAR__) setYear(current)
  }, [])

  return (
    <footer className="sb-footer">
      <div className="sb-container sb-footer__inner">
        <div className="sb-footer__brand">
          <img
            className="sb-footer__logo"
            src="/brand/skybrique-wordmark-dark.png"
            alt="Skybrique"
            width={1536}
            height={270}
          />
          <ul className="sb-footer__tags sb-mono">
            {FOOTER_TAGS.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>

        <nav className="sb-footer__nav" aria-label="Footer">
          <ul className="sb-footer__links">
            <li>
              <a className="sb-footer__link sb-mono" href="#research">
                Research
              </a>
            </li>
            <li>
              <a className="sb-footer__link sb-mono" href="#projects">
                Projects
              </a>
            </li>
            <li>
              <a className="sb-footer__link sb-mono" href="#open-source">
                Open Source
              </a>
            </li>
            <li>
              <a className="sb-footer__link sb-mono" href="#about">
                About
              </a>
            </li>
            <li>
              <a
                className="sb-footer__link sb-mono"
                href={site.github}
                target="_blank"
                rel="noreferrer noopener"
              >
                GitHub
                <span className="sb-sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </nav>

        <div className="sb-footer__legal">
          <MatrixMark className="sb-footer__matrix" animated={false} />
          <p className="sb-mono">© {year} {site.name}</p>
          <p className="sb-mono">All rights reserved · {site.domain}</p>
        </div>
      </div>
    </footer>
  )
}
