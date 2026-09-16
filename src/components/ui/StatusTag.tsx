import type { ProjectStatus } from '../../data/site'

const TONE_BY_STATUS: Record<ProjectStatus, string> = {
  RESEARCH: 'blue',
  EXPERIMENT: 'indigo',
  BUILDING: 'cyan',
  BACKTESTING: 'navy',
  'OPEN SOURCE': 'navy',
}

interface StatusTagProps {
  status: ProjectStatus
}

export function StatusTag({ status }: StatusTagProps) {
  const tone = TONE_BY_STATUS[status]

  return (
    <span className={`sb-status sb-status--${tone}`}>
      <span className="sb-status__dot" aria-hidden="true" />
      <span className="sb-status__label sb-mono">{status}</span>
    </span>
  )
}
