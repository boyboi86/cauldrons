import { site } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import { MatrixMark } from './ui/MatrixMark'

export function Mission() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section className="sb-section sb-mission" id="mission" aria-labelledby="mission-title">
      <div className="sb-container sb-mission__inner sb-reveal" ref={ref}>
        <div className="sb-mission__aside">
          <p className="sb-mono sb-mission__index">03 / Mission</p>
          <MatrixMark className="sb-mission__matrix" animated={false} />
        </div>

        <div className="sb-mission__body">
          <h2 className="sb-mission__title" id="mission-title">
            Research first.
          </h2>
          <p className="sb-mission__text">{site.mission}</p>
          <p className="sb-mission__micro sb-mono">Failure is information.</p>
        </div>
      </div>
    </section>
  )
}
