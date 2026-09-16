# Skybrique — website

Static marketing site for **Skybrique Lab** (`skybrique.com`), an independent quantitative research lab.

Concept: *small units → organised structure → accumulation → higher level*. The logo's modular blocks are the site's visual vocabulary.

## Stack

- **React 19 + TypeScript**, bundled with **Vite**
- Plain CSS with design tokens (no CSS framework, no runtime CSS-in-JS)
- Self-hosted fonts: Inter (variable) + IBM Plex Mono, latin subsets only
- **Static prerender**: the build renders the full page to HTML, so the site is readable with JavaScript disabled
- No backend, no analytics, no third-party requests

## Commands

```bash
npm install        # install dependencies
npm run dev        # local dev server
npm run typecheck  # tsc --noEmit
npm run build      # typecheck + client build + SSR build + prerender -> dist/
npm run preview    # serve the built dist/ locally
npm run deploy     # build, then publish dist/ to the gh-pages branch
```

## Project structure

```
index.html               Vite entry; contains the pre-paint `js` class script
public/                  Copied verbatim to dist/ (CNAME, favicons, fonts, crawler files)
  CNAME                  skybrique.com — must ship with the deployment
  fonts/                 latin woff2 subsets
  brand/                 wordmarks, matrix mark SVGs, social image
  robots.txt             crawler policy: search engines and AI assistants allowed,
                         bulk harvesters and SEO data crawlers disallowed
  sitemap.xml            fallback sitemap; regenerated into dist/ on every build
  llms.txt               curated, machine-readable summary of the site for LLMs
  llms-full.txt          the complete homepage content as Markdown
  404.html               standalone branded not-found page (noindex)
scripts/
  prerender.mjs          injects the SSR render into dist/index.html
  trim-logo.js           regenerates the trimmed wordmarks in public/brand/
  copy-fonts.js          regenerates the latin font subsets in public/fonts/
src/
  main.tsx               client entry (hydrates the prerendered markup)
  entry-server.tsx       SSR entry used by the prerender step
  App.tsx                page composition
  data/site.ts           ALL page copy and content lives here
  components/            Header, Hero, Process, Mission, ResearchAreas,
                         Projects, OpenSource, Closing, Footer
  components/ui/         MatrixMark, ModuleCluster, StatusTag, SectionHeader,
                         LinkButton
  hooks/useReveal.ts     IntersectionObserver reveal helper
  lib/style.ts           typed CSS custom-property helper
  styles/
    tokens.css           colours, type scale, spacing, motion
    base.css             reset, typography, utilities, reduced motion
    components.css       header, buttons, matrix mark, status tags
    sections.css         per-section layout and responsive rules
```

## Editing content

Almost all copy, navigation, research areas and projects live in a single file: `src/data/site.ts`.
Adding a project means adding one entry to the `projects` array — the layout, status tag and hover
metadata are generated from it.

## Design tokens

Defined in `src/styles/tokens.css`. Brand palette:

| Token | Value | Use |
| --- | --- | --- |
| `--navy` | `#0B1F3B` | dominant text, dark panels, footer |
| `--blue` | `#1459D9` | primary accent, links, active states |
| `--cyan` | `#18A7E8` | accent on dark surfaces, decorative modules only |

Cyan is decorative on light surfaces (it does not meet text contrast there); it is used for text only
on navy. Monospace (`IBM Plex Mono`) is reserved for indices, status labels, metadata and dates.

## Deployment

The site is served from the **root of the `gh-pages` branch** on the `skybrique.com` custom domain,
so `base` is `/` in `vite.config.ts` and `public/CNAME` is required.

Recommended workflow — keep source and build on separate branches:

```bash
# 1. keep this source on master/main
git switch master
git add -A && git commit -m "Redesign site for Skybrique Lab"

# 2. build and publish dist/ to the gh-pages branch root
npm run build
npm run deploy
```

Note: `npm run deploy` (`gh-pages -d dist`) **replaces the contents of the `gh-pages` branch** with
the built site. That is correct for a deployment branch, which is why the source should live on
`master`/`main` rather than on `gh-pages` itself.

Alternatives that avoid publishing the source to `gh-pages`:
- commit source to `master`, deploy `dist/` to `gh-pages` (above); or
- add a GitHub Actions workflow that runs `npm ci && npm run build` and publishes `dist/`.

If the site is ever served from a project subpath instead of a custom domain, set
`base: '/<repo-name>/'` in `vite.config.ts`.

## Accessibility and progressive enhancement

- Semantic landmarks (`header`/`nav`/`main`/`footer`), one `h1`, section-labelled headings
- Visible `:focus-visible` outlines; a skip-to-content link
- Mobile navigation supports `Escape` to close and exposes `aria-expanded`
- `prefers-reduced-motion: reduce` disables animation and reveal transitions
- Reveal animations are gated behind a `js` class added before first paint, so with JavaScript
  disabled the page is fully visible; the prerendered HTML means content is present without JS
- Hover-revealed project metadata is supplementary only, and stays visible on touch devices

## Regenerating brand assets

The wordmarks in `public/brand/` are trimmed to their true content bounds so they can be sized with a
plain CSS height. To regenerate after the source assets in `assets/` change:

```bash
node scripts/trim-logo.js
node scripts/copy-fonts.js
```

## Crawlers, AI access and reuse

The site is deliberately readable by search engines and AI assistants, while bulk harvesting is
discouraged:

- **Prerendered HTML.** Every page is served as complete, semantic HTML, so crawlers that do not
  execute JavaScript still see the full content. This is the single most important factor for both
  search and AI visibility.
- **`public/robots.txt`** allows all search engines plus named AI assistants and answer engines
  (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot,
  Perplexity-User, Google-Extended, Applebot, Applebot-Extended, meta-externalagent, cohere-ai) and
  disallows bulk harvesters and SEO data crawlers (CCBot, Bytespider, AhrefsBot, SemrushBot,
  MJ12bot, DotBot, DataForSeoBot, BLEXBot, PetalBot, ZoominfoBot, SeekportBot, serpstatbot,
  magpie-crawler, ImagesiftBot, Diffbot, Omgilibot). Edit this file to change the policy.
- **`public/llms.txt`** and **`public/llms-full.txt`** give LLMs a curated summary and the full page
  text in Markdown, with an explicit usage statement.
- **Structured data.** `index.html` embeds JSON-LD describing the organisation, the website and the
  page (`ResearchOrganization`, `WebSite`, `WebPage`).
- **`LICENSE`** asserts proprietary rights over the design, code and brand assets and permits
  indexing and summarising with attribution.

### What is not possible

It is not possible to hide HTML, CSS or JavaScript from anyone who opens browser developer tools,
because the browser must download that code in order to render the page. Any "disable right-click"
or "block DevTools" script is bypassed in one keystroke (view source, disable JavaScript, or fetch
the URL) while breaking accessibility, copy-paste and normal browser features, so none was added.
Client-side minification only raises the effort slightly.

What actually reduces copying:

1. **Keep the source private.** This is the real exposure. If the repository holding `src/`,
   `SKYBRIQUE_Website_Design_Brief.md` and the raw `assets/` is public, the entire design system and
   brand strategy are readable regardless of anything the site does. Publish only the built `dist/`
   output. On GitHub Pages, a private source repository needs a paid plan to serve Pages directly,
   so the practical free-tier arrangement is: private source repository, and `npm run deploy`
   pushing the built site to a public repository whose only contents are the built files.
2. **Put a CDN in front.** GitHub Pages has no WAF or rate limiting. Cloudflare (free tier) adds bot
   management, rate limiting and hotlink protection for `/brand/*`, and lets you set `X-Robots-Tag`
   response headers that GitHub Pages cannot send.
3. `robots.txt` only influences crawlers that choose to comply. It is a signal, not an enforcement
   mechanism.

## Copyright year

`vite.config.ts` inlines `__BUILD_YEAR__` into both the client and SSR bundles. The footer renders
that literal first, so the prerendered markup and the first client render agree and hydration stays
silent, then rolls the year forward on the client with `useEffect`. The visible year is therefore
never frozen at the year the site was last built, and visitors with JavaScript disabled see the
build year until the next build.

## Build hardening

`build.sourcemap` is `false` in `vite.config.ts`, so the deployed site never ships source maps and
exposes no original file structure. JavaScript and CSS are minified by the production build.
