import { projects } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import { vars } from '../lib/style'
import { SectionHeader } from './ui/SectionHeader'
import { StatusTag } from './ui/StatusTag'

export function Projects() {
  const listRef = useReveal<HTMLUListElement>({ threshold: 0.05 })

  return (
    <section className="sb-section sb-projects" id="projects" aria-labelledby="projects-title">
      <div className="sb-container">
        <SectionHeader
          index="05 / Projects"
          titleId="projects-title"
          title="Projects."
          lede="A working index. Status labels are honest, not promotional."
        />

        <ul className="sb-projects__list" ref={listRef}>
          {projects.map((project, index) => (
            <li className="sb-project" key={project.number} style={vars({ '--i': index })}>
              <div className="sb-project__row">
                <span className="sb-project__number sb-mono">{project.number}</span>
                <span className="sb-project__main">
                  <span className="sb-project__name">{project.name}</span>
                  <span className="sb-project__focus">{project.focus}</span>
                </span>
                <span className="sb-project__side">
                  <StatusTag status={project.status} />
                  <span className="sb-project__tags sb-mono">{project.tags.join(' · ')}</span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
