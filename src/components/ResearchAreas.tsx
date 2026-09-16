import { researchAreas } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import { vars } from '../lib/style'
import { ModuleCluster } from './ui/MatrixMark'
import { SectionHeader } from './ui/SectionHeader'

export function ResearchAreas() {
  const gridRef = useReveal<HTMLDivElement>({ threshold: 0.08 })

  return (
    <section className="sb-section sb-areas" id="research" aria-labelledby="research-title">
      <div className="sb-container">
        <SectionHeader
          index="04 / Research"
          titleId="research-title"
          title="Research areas."
          lede="Four threads of work. Each one is measured against data rather than narrative."
        />

        <div className="sb-areas__grid" ref={gridRef}>
          {researchAreas.map((area, index) => (
            <article className="sb-areas__tile" key={area.code} style={vars({ '--i': index })}>
              <p className="sb-areas__code sb-mono">{area.code}</p>
              <h3 className="sb-areas__name">{area.name}</h3>
              <p className="sb-areas__detail">{area.detail}</p>
              <p className="sb-areas__tags sb-mono">{area.tags.join(' · ')}</p>
              <ModuleCluster className="sb-areas__units" count={index + 1} total={4} />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
