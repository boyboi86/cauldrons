import { useReveal } from '../../hooks/useReveal'

interface SectionHeaderProps {
  /** Technical index, e.g. "02 / Process". */
  index: string
  title: string
  lede?: string
  /** id applied to the <h2> so sections can use aria-labelledby. */
  titleId?: string
}

export function SectionHeader({ index, title, lede, titleId }: SectionHeaderProps) {
  const ref = useReveal<HTMLElement>()

  return (
    <header className="sb-section-header sb-reveal" ref={ref}>
      <p className="sb-section-header__index sb-mono">{index}</p>
      <h2 className="sb-section-header__title" id={titleId}>
        {title}
      </h2>
      {lede ? <p className="sb-section-header__lede">{lede}</p> : null}
    </header>
  )
}
