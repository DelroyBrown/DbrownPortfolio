# Delroy J. Brown — Portfolio

An interactive digital exhibition for a creative full-stack software developer:
practical systems (CareCompass), playable browser experiments (Pendulum,
Thread, Invader Storm) and an honest account of an AI-assisted development
workflow — directed, inspected and verified by a human.

**Live: https://delroybrown.github.io/DbrownPortfolio/**

**Live games showcased inside the portfolio:**

- [Pendulum](https://delroybrown.github.io/pendulum/) · [repository](https://github.com/DelroyBrown/pendulum)
- [Thread](https://delroybrown.github.io/thread/) · [repository](https://github.com/DelroyBrown/thread)
- [Invader Storm](https://delroybrown.github.io/Invader/) · [repository](https://github.com/DelroyBrown/Invader)

---

## Design concept

The site reads as an exhibition, not a template: editorial typography
(Space Grotesk / Manrope / IBM Plex Mono, weights 300–500), a dark
blue-black canvas with restrained cyan / coral / gold accents, and a
"signal line" motif that changes character per section — a plotted path in
the hero, a swinging rope in Pendulum's exhibit, a glowing fibre in
Thread's, a hand-drawn signature at the close. Each project carries its own
palette; nothing is a uniform card grid.

Motion is one system: soft quartic easing, one-time masked reveals, a few
scroll-choreographed sequences (workflow spine, pendulum rope), and a
complete reduced-motion experience (see Accessibility).

## Technology

- **React 19 + TypeScript + Vite** — strict TS, no `any`
- **GSAP + ScrollTrigger** for scroll choreography, **Lenis** for inertial scrolling
- **prism-react-renderer** for code excerpts (custom theme, real line numbers)
- **lucide-react** icons (brand icons inlined — lucide v1 removed them)
- **Vitest + React Testing Library** for unit tests, **Playwright** for e2e
- **sharp** (dev-only) for screenshot/OG image processing

Framer Motion and Three.js were deliberately omitted: GSAP + CSS cover every
transition in the design, and no visual here earns a WebGL context's battery
cost. The hero "development field" is plain 2D canvas.

## Local setup

```bash
npm ci
npx playwright install chromium   # once — for e2e tests + screenshot capture
npm run dev
```

No environment variables are required for development.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run build` | typecheck + production build (also emits `dist/404.html`) |
| `npm run preview` | serve the production build |
| `npm run lint` / `npm run typecheck` | quality gates |
| `npm run test` / `npm run test:run` | unit tests (watch / CI) |
| `npm run test:e2e` | Playwright tests against the preview server |
| `npm run capture:projects` | re-capture real game screenshots |
| `npm run sync:excerpts` | refresh code excerpts from the game repos |
| `npm run generate:social` | regenerate the Open Graph image |

## Content management

All copy, links and project data live in typed files under `src/content/` —
no layout component contains personal text.

- `profile.ts` — name, title, availability, email, phone, GitHub, LinkedIn,
  CV URL, site URL. **To update personal details, edit only this file.**
  Setting `email`/`phone` to null removes those links; `linkedin`/`cvUrl`
  surface automatically when set.
- `experience.ts` — professional history and education, mirrored from the CV.
  When the CV changes, update this file and replace
  `public/cv/delroy-brown-cv.pdf`.
- `projects.ts` — all project case-study data. A commented template at the
  bottom shows how to add a project; drop imagery in
  `public/projects/<slug>/` and add the object to the `projects` array.
- `skills.ts`, `principles.ts`, `aiWorkflow.ts`, `diagrams.ts` — the
  remaining section content.
- `codeExcerpts.ts` — the editorial layer over `codeExcerpts.gen.ts`
  (generated; do not edit by hand).

## Real code excerpts

Excerpts are **real code from the shipped games**, never retyped:

1. `scripts/excerpts.manifest.json` declares repo, path and line range per excerpt.
2. `npm run sync:excerpts` fetches those exact lines from
   `raw.githubusercontent.com` and regenerates `src/content/codeExcerpts.gen.ts`
   (committed, so builds are hermetic — production never calls GitHub).
3. Each excerpt links to its exact lines (`.../blob/main/...#L51-L111`).
4. If an upstream file changes shape, the script fails loudly with the file's
   new length — update the manifest range and re-run.

## Screenshots

`npm run capture:projects` drives Playwright Chromium against the live
GitHub Pages builds, waits for each game to initialise (Pendulum's menu runs
a live attract-mode simulation; Thread needs the Play flow to reach its
canvas; Invader Storm is driven through its menu into an actual firefight),
performs a few real inputs for gameplay shots, and writes optimised WebP files:

```
public/projects/pendulum/{cover,gameplay}.webp
public/projects/thread/{cover,gameplay}.webp
public/projects/invader-storm/{cover,gameplay}.webp
```

**Manual fallback** if automated capture is blocked: open the live game,
set the browser device toolbar to 1600×900, take a screenshot, convert to
WebP, and save it to the paths above. The site only ever reads these local
files — a missing file falls back to a designed title panel, never an empty
rectangle.

## How the live game embeds work

Games are **never loaded on page load**. Each exhibit shows a local
screenshot with a *Play inside the portfolio* control; the iframe is created
only on that interaction, shows a loading state, and is fully torn down on
close (focus returns to the play control). The frame chrome offers restart,
fullscreen, and open-in-new-tab; a 15-second load timeout swaps in an honest
failure panel with an external link. *Focus mode* (`?mode=focus` on a game's
case study) is a distraction-free exhibit with focus trapping and Escape to
exit. Thread's exhibits recommend landscape on narrow screens.

## Routing

`BrowserRouter` with clean URLs (`/work/care-compass`, `/experiments/pendulum`, …).
GitHub Pages compatibility uses the documented `404.html` fallback: the build
copies `index.html` to `404.html` (see `spaFallback()` in `vite.config.ts`),
so deep links and hard refreshes serve the app and the router resolves the
path. Trade-off: those responses carry a 404 status, which is why the
sitemap lists every route explicitly.

## Deployment (GitHub Pages)

**Live at https://delroybrown.github.io/DbrownPortfolio/**

`.github/workflows/deploy.yml` runs on pushes to `main`:
checkout → Node 22 → configure Pages → `npm ci` → typecheck → lint → unit
tests → build → upload → deploy. **Deployment only happens if every gate
passes.** `actions/configure-pages` runs with `enablement: true`, so the
workflow turns Pages on itself — no manual repo-settings step is required.

The site is served from a subpath (`/DbrownPortfolio/`), not a domain root.
The Vite base path is injected by the workflow as
`PORTFOLIO_BASE=/<repository-name>/`, which prefixes every asset URL and
sets the React Router `basename`. **If the repository is renamed, nothing
in the build needs changing** — but update `siteUrl` in
`src/content/profile.ts` and the URLs in `public/sitemap.xml` /
`public/robots.txt`, which are absolute for canonical/SEO reasons.

For a custom domain or a `<user>.github.io` root repo, leave
`PORTFOLIO_BASE` unset (it defaults to `/`).

To test the subpath build locally exactly as Pages serves it:

```bash
PORTFOLIO_BASE=/DbrownPortfolio/ npm run build
PORTFOLIO_BASE=/DbrownPortfolio/ npm run preview
# → http://localhost:4173/DbrownPortfolio/
```

## Accessibility

- Semantic landmarks, logical heading order, skip-to-content link
- Full keyboard support: focus-visible styles, focus-trapped menu/focus-mode
  dialogs, Escape to close, focus restoration after overlays close
- `prefers-reduced-motion`: smooth scrolling, parallax, the custom cursor,
  the intro sequence and all scroll choreography are disabled; content
  appears via instant/short transitions and nothing is lost
- Icon-only controls carry labels; embeds explain how to return focus to the page
- Unit tests run under reduced motion, so that experience is the tested one

## Performance decisions

- Route-level code splitting; case studies and secondary pages lazy-load
- Game iframes exist only after explicit interaction and are torn down on close
- Screenshots are local WebP; fonts are self-hosted subsets (no CDN)
- Canvas/scroll work pauses off-screen (IntersectionObserver) and when the
  tab is hidden; pointer effects never touch React state
- Manual chunks separate React and motion vendors; no source maps in production

## Known limitations

- **CI installs with `npm install`, not `npm ci`.** `npm ci` currently fails on
  the Ubuntu runner (the lockfile, authored on Windows, can't be reproduced
  there), so the workflow falls back to `npm install` and emits a warning
  annotation when it does. The typecheck/lint/test/build gates all run on the
  re-resolved tree before the deploy job, so this can't ship a broken build —
  but the install isn't byte-for-byte reproducible until the lockfile is
  regenerated on Linux. To fix properly, run `npm install` once on Linux (or in
  a `node:22` container) and commit the resulting `package-lock.json`.

- The contact form has no backend — it says so honestly and points to email.
  Wire up a form service, then replace the notice in
  `src/features/contact/ContactPanel.tsx`.
- Cross-origin iframes can't report *why* they failed; the fallback is a
  timeout, so a very slow connection may briefly show the failure panel.
- GitHub Pages' SPA fallback returns HTTP 404 for deep links (see Routing).
- CareCompass ships without product screenshots by design (care data is
  sensitive); its identity is the animated audit blueprint.
#   D b r o w n P o r t f o l i o  
 