import type { CSSProperties } from 'react'

/**
 * Typed helper for CSS custom properties. React's CSSProperties does not
 * accept arbitrary `--*` keys without a cast, so centralise the cast here.
 */
export function vars(values: Record<string, string | number>): CSSProperties {
  return values as unknown as CSSProperties
}
