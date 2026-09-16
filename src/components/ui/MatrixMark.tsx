import { vars } from '../../lib/style'

/**
 * The Skybrique matrix mark: an ascending staircase of modules.
 *
 * Geometry and colour stops are taken directly from the supplied brand asset
 * (`assets/skybrique-icon.svg`) so the on-page mark matches the logo exactly.
 */
const COLUMN_HEIGHTS = [1, 2, 2, 3, 4, 5] as const
const COLUMN_COLORS = ['#1459D9', '#1459D9', '#1A72DF', '#1A72DF', '#18A7E8', '#18A7E8'] as const
const ROWS = 5

interface MatrixMarkProps {
  className?: string
  /** Draw the empty modules of the full grid as faint outlines. */
  outline?: boolean
  /** Stagger the modules in, bottom-left first. */
  animated?: boolean
}

export function MatrixMark({ className, outline = false, animated = true }: MatrixMarkProps) {
  const cells = []

  for (let row = ROWS - 1; row >= 0; row -= 1) {
    for (let col = 0; col < COLUMN_HEIGHTS.length; col += 1) {
      const isFilled = row < COLUMN_HEIGHTS[col]
      cells.push(
        <span
          key={`${col}-${row}`}
          className={isFilled ? 'sb-matrix__cell sb-matrix__cell--on' : 'sb-matrix__cell'}
          style={vars({ '--col': COLUMN_COLORS[col], '--i': col + row })}
        />,
      )
    }
  }

  const classes = [
    'sb-matrix',
    outline ? 'sb-matrix--outline' : '',
    animated ? 'sb-matrix--animated' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} role="presentation" aria-hidden="true">
      {cells}
    </div>
  )
}

interface ModuleClusterProps {
  /** How many modules are filled. */
  count: number
  /** Total modules rendered, filled plus empty. */
  total?: number
  className?: string
  tone?: 'light' | 'dark'
}

/**
 * A short run of modules used as an inline counter — the smallest unit of the
 * site's visual vocabulary (block = observation, count = accumulation).
 */
export function ModuleCluster({ count, total = 6, className, tone = 'light' }: ModuleClusterProps) {
  const classes = ['sb-cluster', `sb-cluster--${tone}`, className ?? ''].filter(Boolean).join(' ')

  return (
    <span className={classes} aria-hidden="true">
      {Array.from({ length: total }, (_, index) => (
        <span
          key={index}
          className={index < count ? 'sb-cluster__unit sb-cluster__unit--on' : 'sb-cluster__unit'}
          style={vars({ '--i': index })}
        />
      ))}
    </span>
  )
}
