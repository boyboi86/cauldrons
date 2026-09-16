import { processStages } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import { vars } from '../lib/style'
import { ModuleCluster } from './ui/MatrixMark'
import { SectionHeader } from './ui/SectionHeader'

export function Process() {
  const trackRef = useReveal<HTMLOListElement>({ threshold: 0.05 })

  return (
    <section className="sb-section sb-process" id="process" aria-labelledby="process-title">
      <div className="sb-container">
        <SectionHeader
          index="02 / Process"
          titleId="process-title"
          title="From hypothesis to system."
          lede="Every idea follows the same path. Most stop early — that is expected, and it is information."
        />

        <ol className="sb-process__track" ref={trackRef}>
          {processStages.map((stage, index) => (
            <li className="sb-process__stage" key={stage.index} style={vars({ '--i': index })}>
              <span className="sb-process__index sb-mono">{stage.index}</span>
              <ModuleCluster className="sb-process__units" count={index + 1} total={6} />
              <h3 className="sb-process__name">{stage.name}</h3>
              <p className="sb-process__detail">{stage.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
