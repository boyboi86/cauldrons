export type ProjectStatus =
  | 'RESEARCH'
  | 'EXPERIMENT'
  | 'BUILDING'
  | 'BACKTESTING'
  | 'OPEN SOURCE'

export interface NavItem {
  label: string
  href: string
  external?: boolean
}

export interface HeroWord {
  text: string
  /** Number of modules shown beside the word — communicates accumulation. */
  units: number
}

export interface ProcessStage {
  index: string
  name: string
  detail: string
}

export interface ResearchArea {
  code: string
  name: string
  detail: string
  tags: readonly string[]
}

export interface Project {
  number: string
  name: string
  focus: string
  status: ProjectStatus
  tags: readonly string[]
}

export const site = {
  name: 'Skybrique Lab',
  wordmark: 'Skybrique',
  url: 'https://skybrique.com',
  domain: 'skybrique.com',
  github: 'https://github.com/Skybrique-Lab',
  tagline: 'Quantitative research through algorithms, data and experimentation.',
  mission:
    'Skybrique is an independent quantitative research lab exploring algorithms, statistical methods and machine learning for systematic investing. We develop ideas, test them against data, learn from failure and share useful research and tools through an open-source approach.',
  openSource:
    'Useful research should not disappear inside a black box. Wherever practical, Skybrique shares experiments, tools, methodologies and engineering work so others can inspect, reproduce and build upon them.',
  closing:
    'Skybrique began as a learning and research project and is evolving into a practical laboratory for systematic investment research.',
} as const

export const nav: readonly NavItem[] = [
  { label: 'Research', href: '#research' },
  { label: 'Projects', href: '#projects' },
  { label: 'Open Source', href: '#open-source' },
  { label: 'About', href: '#about' },
]

export const githubNav: NavItem = {
  label: 'GitHub',
  href: site.github,
  external: true,
}

export const heroWords: readonly HeroWord[] = [
  { text: 'Build.', units: 1 },
  { text: 'Test.', units: 3 },
  { text: 'Compound.', units: 6 },
]

export const processStages: readonly ProcessStage[] = [
  {
    index: '01',
    name: 'Hypothesis',
    detail: 'Frame a testable idea about how a market actually behaves.',
  },
  {
    index: '02',
    name: 'Data',
    detail: 'Acquire, align, clean and validate the inputs before anything else.',
  },
  {
    index: '03',
    name: 'Algorithm',
    detail: 'Encode the idea as explicit, reproducible rules.',
  },
  {
    index: '04',
    name: 'Backtest',
    detail: 'Run the system across historical data without look-ahead bias.',
  },
  {
    index: '05',
    name: 'Evaluation',
    detail: 'Test robustness, not only headline returns.',
  },
  {
    index: '06',
    name: 'Iteration',
    detail: 'Refine, discard or promote. Failure is information.',
  },
]

export const researchAreas: readonly ResearchArea[] = [
  {
    code: 'A.01',
    name: 'Systematic Strategies',
    detail: 'Momentum, mean reversion, cross-asset and ETF research.',
    tags: ['momentum', 'mean reversion', 'cross-asset'],
  },
  {
    code: 'A.02',
    name: 'Machine Learning',
    detail: 'Sequential data, feature engineering, model evaluation and experimentation.',
    tags: ['sequences', 'features', 'evaluation'],
  },
  {
    code: 'A.03',
    name: 'Alternative Data',
    detail: 'Economic, trade, satellite and other non-traditional datasets.',
    tags: ['economic', 'trade', 'satellite'],
  },
  {
    code: 'A.04',
    name: 'Market Research',
    detail: 'ETF flows, commodities, macro relationships and market structure.',
    tags: ['etf flows', 'commodities', 'macro'],
  },
]

export const projects: readonly Project[] = [
  {
    number: '01',
    name: 'ETF Rotation',
    focus: 'Momentum / Relative Strength',
    status: 'RESEARCH',
    tags: ['momentum', 'relative strength', 'etf universe'],
  },
  {
    number: '02',
    name: 'Aegis',
    focus: 'Rust-native machine learning',
    status: 'BUILDING',
    tags: ['rust', 'ml runtime', 'engineering'],
  },
  {
    number: '03',
    name: 'Alternative Data',
    focus: 'Economic / Trade / Satellite Data',
    status: 'EXPERIMENT',
    tags: ['economic', 'trade', 'satellite'],
  },
  {
    number: '04',
    name: 'Systematic Strategies',
    focus: 'Cross-asset / Mean Reversion',
    status: 'BACKTESTING',
    tags: ['cross-asset', 'mean reversion'],
  },
]

export const creed: readonly string[] = ['Research', 'Build', 'Test', 'Share']
