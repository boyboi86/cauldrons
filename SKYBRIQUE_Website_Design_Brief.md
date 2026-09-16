# SKYBRIQUE — Website Design & Build Brief

## Brand
**Skybrique Lab** — `skybrique.com`  
Positioning: **Independent quantitative research lab.**

The website should feel like the place where systematic-investment ideas are **researched, built, tested and iterated**, not like a conventional hedge-fund marketing site.

Core visual metaphor:
**small units → organised structure → accumulation → higher level**

## Motto
# Build. Test. Compound.

This is preferred over “Building algorithms. Taking profits.” because it is shorter, more durable, and avoids an explicit performance claim.

Possible secondary micro-copy (use sparingly):
- Ideas into algorithms.
- Built from ideas. Tested with data.
- Failure is information.

## Mission
> Skybrique is an independent quantitative research lab exploring algorithms, statistical methods and machine learning for systematic investing. We develop ideas, test them against data, learn from failure and share useful research and tools through an open-source approach.

Communicate:
- quantitative research
- algorithms and statistical methods
- machine learning
- systematic investing
- empirical testing/backtesting
- iteration and learning from failure
- open source and reproducibility

Avoid exaggerated claims about alpha, profitability or institutional scale.

## Homepage structure

### 1. Header
Logo +:
**Research · Projects · Open Source · About · GitHub**

Keep it sparse.

### 2. Hero
Large:
**BUILD.**  
**TEST.**  
**COMPOUND.**

Supporting line:
> Quantitative research through algorithms, data and experimentation.

Optional CTAs: **Explore Research** / **GitHub**

Use the Skybrique matrix mark as a visual anchor.

### 3. Research process
Heading:
**From hypothesis to system.**

Visual sequence:
**HYPOTHESIS → DATA → ALGORITHM → BACKTEST → EVALUATION → ITERATION**

Represent stages with small modular blocks derived from the logo.

### 4. Mission
Heading:
**Research first.**

Use the mission paragraph above.

Optional micro-copy:
**Failure is information.**

### 5. Research areas
Use modular tiles, not generic SaaS cards:

**Systematic Strategies** — Momentum, mean reversion, cross-asset and ETF research.

**Machine Learning** — Sequential data, feature engineering, model evaluation and experimentation.

**Alternative Data** — Economic, trade, satellite and other non-traditional datasets.

**Market Research** — ETF flows, commodities, macro relationships and market structure.

### 6. Projects
Simple index:

**01 — ETF Rotation**  
Momentum / Relative Strength

**02 — Aegis**  
Rust-native machine learning

**03 — Alternative Data**  
Economic / Trade / Satellite Data

**04 — Systematic Strategies**  
Cross-asset / Mean Reversion

Use honest status labels:
`RESEARCH` / `EXPERIMENT` / `BUILDING` / `BACKTESTING` / `OPEN SOURCE`

### 7. Open source
Heading:
**Build in the open.**

> Useful research should not disappear inside a black box. Wherever practical, Skybrique shares experiments, tools, methodologies and engineering work so others can inspect, reproduce and build upon them.

CTA: **View GitHub**

### 8. Closing
> Skybrique began as a learning and research project and is evolving into a practical laboratory for systematic investment research.

Then:
**Research · Build · Test · Share**

Footer:
`© 2026 Skybrique Lab`

## Visual language

Target:
- analytical
- restrained
- intelligent
- modern
- technical
- institutional
- research-oriented
- slightly experimental

Avoid:
- generic fintech
- crypto aesthetic
- trading-dashboard aesthetic
- SaaS aesthetic
- property-development / architectural cues
- excessive gradients
- glassmorphism
- stock photography
- generic finance imagery
- decorative candlesticks
- giant “AI” graphics

The site should feel like a **quantitative research notebook evolved into an institutional research lab**.

## Logo integration

The logo's modular blocks are the site's visual vocabulary.

Use:
- small square/rounded-square modules
- grids
- modular cards
- ascending arrangements
- controlled negative space
- repeated geometric units

Concept:
**block = observation/data/idea**  
**matrix = organised knowledge**  
**ascending structure = synthesis/compounding**

Do NOT add arrows, candlesticks, dollar signs, binary code, AI brains, or obvious stock-price lines.

## Colour

Primary:
- Navy `#0B1F3B`
- Blue `#1459D9`
- Cyan `#18A7E8`

Use navy and white/off-white as the dominant environment. Blue/cyan are accents.

Avoid a strong blue→cyan→mint gradient across the site.

## Typography

Use a clean modern sans-serif:
- Inter
- IBM Plex Sans
- Geist
- or system sans-serif

Use monospace selectively for project numbers, status labels, metadata, technical annotations and dates.

Do not make the entire site monospace.

## CSS/SVG-first

GitHub Pages is a design constraint to embrace.

Prefer:
- CSS Grid
- Flexbox
- CSS variables
- pseudo-elements
- borders
- restrained gradients
- inline SVG
- lightweight JavaScript
- CSS transitions

Potential stack:
**React + TypeScript + Vite + CSS/Tailwind**

No backend unless genuinely necessary.

The site should remain visually strong with JavaScript disabled.

## Animation

Animation should communicate the concept.

Good:
- blocks appearing progressively
- subtle grid movement
- hover-revealed project metadata
- process stages activating sequentially
- gentle opacity/translate transitions

Avoid:
- heavy parallax
- spinning 3D objects
- particle systems
- excessive scroll effects
- flashy trading-chart animations

Respect `prefers-reduced-motion`.

## Layout

Use generous whitespace.

Prefer:
- disciplined asymmetry
- strong horizontal rules
- modular grids
- large headings
- compact technical metadata
- thin borders
- consistent alignment

Rhythm:
**large statement → explanation → modular detail → whitespace**

Do not fill every empty area.

## Future-proofing

V1 only needs:
1. Hero
2. Research process
3. Mission
4. Research areas
5. Projects
6. Open source
7. About/footer

Later additions can include:
- research notes
- experiment logs
- strategy write-ups
- backtest reports
- technical articles
- datasets
- GitHub projects

Design reusable components so these can be added without redesigning the homepage.

## KiloCode implementation guidance

1. Inspect the existing repository first.
2. Inspect available Skybrique logo assets.
3. Establish design tokens.
4. Build a coherent visual system rather than blindly copying a wireframe.
5. Make components reusable for future Research/Projects pages.
6. Test desktop, tablet and mobile.
7. Test logo/favicon rendering at small sizes.
8. Check accessibility, contrast, keyboard navigation and reduced motion.
9. Optimize for static GitHub Pages deployment.
10. Keep dependencies and runtime complexity low.

Prioritise **clarity, restraint and visual consistency** over adding features.

The finished site should feel like:

> **A quantitative research laboratory built from modular ideas.**

—not a generic financial-services website.
