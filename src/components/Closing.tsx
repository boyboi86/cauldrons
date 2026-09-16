import { creed, site } from '../data/site'
import { useReveal } from '../hooks/useReveal'

export function Closing() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <section className="sb-section sb-closing" id="about" aria-labelledby="about-title">
      <div className="sb-container sb-closing__inner sb-reveal" ref={ref}>
        <p className="sb-mono sb-closing__index">07 / About</p>
        <h2 className="sb-closing__statement" id="about-title">
          {site.closing}
        </h2>
        <ul className="sb-closing__creed">
          {creed.map((item) => (
            <li className="sb-mono" key={item}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
