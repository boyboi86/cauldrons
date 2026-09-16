import { heroWords, site } from '../data/site'
import { vars } from '../lib/style'
import { LinkButton } from './ui/LinkButton'
import { MatrixMark, ModuleCluster } from './ui/MatrixMark'

const HERO_META: readonly string[] = [
  'Algorithms',
  'Statistical methods',
  'Machine learning',
  'Systematic investing',
]

export function Hero() {
  return (
    <section className="sb-hero" id="top" aria-labelledby="hero-title">
      <div className="sb-hero__grid" aria-hidden="true" />

      <div className="sb-container sb-hero__inner">
        <div className="sb-hero__copy">
          <p className="sb-eyebrow sb-mono">Independent quantitative research lab</p>

          <h1 className="sb-hero__title" id="hero-title">
            {heroWords.map((word, index) => (
              <span className="sb-hero__line" key={word.text} style={vars({ '--i': index })}>
                <span className="sb-hero__word">{word.text}</span>
                <ModuleCluster
                  className="sb-hero__units"
                  count={word.units}
                  total={6}
                  tone="light"
                />
              </span>
            ))}
          </h1>

          <p className="sb-hero__lede">{site.tagline}</p>

          <div className="sb-hero__actions">
            <LinkButton href="#research" variant="primary">
              Explore research
            </LinkButton>
            <LinkButton href={site.github} variant="outline" external>
              GitHub
            </LinkButton>
          </div>
        </div>

        <figure className="sb-hero__figure">
          <MatrixMark className="sb-hero__matrix" outline />
          <figcaption className="sb-figure-caption sb-mono">
            <span>fig. 01</span>
            <span>module matrix</span>
          </figcaption>
        </figure>
      </div>

      <div className="sb-container">
        <ul className="sb-hero__meta sb-mono">
          {HERO_META.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
