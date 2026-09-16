import { site } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import { LinkButton } from './ui/LinkButton'
import { MatrixMark } from './ui/MatrixMark'

export function OpenSource() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section className="sb-section sb-open" id="open-source" aria-labelledby="open-title">
      <div className="sb-container sb-open__inner sb-reveal" ref={ref}>
        <div className="sb-open__aside">
          <p className="sb-mono sb-open__index">06 / Open source</p>
          <MatrixMark className="sb-open__matrix" animated={false} />
        </div>

        <div className="sb-open__body">
          <h2 className="sb-open__title" id="open-title">
            Build in the open.
          </h2>
          <p className="sb-open__text">{site.openSource}</p>
          <div className="sb-open__actions">
            <LinkButton href={site.github} variant="on-dark" external>
              View GitHub
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  )
}
