import type { ReactNode } from 'react'

interface LinkButtonProps {
  href: string
  children: ReactNode
  variant?: 'primary' | 'outline' | 'on-dark'
  external?: boolean
  className?: string
}

/**
 * Text link styled as a control. The trailing module block shifts diagonally
 * on hover — a small nod to the matrix vocabulary rather than an arrow glyph.
 */
export function LinkButton({
  href,
  children,
  variant = 'primary',
  external = false,
  className,
}: LinkButtonProps) {
  const externalProps = external
    ? { target: '_blank', rel: 'noreferrer noopener' }
    : {}

  const classes = ['sb-btn', `sb-btn--${variant}`, className ?? ''].filter(Boolean).join(' ')

  return (
    <a className={classes} href={href} {...externalProps}>
      <span className="sb-btn__label">{children}</span>
      <span className="sb-btn__mark" aria-hidden="true" />
      {external ? <span className="sb-sr-only"> (opens in a new tab)</span> : null}
    </a>
  )
}
