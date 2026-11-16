# AGENTS.md - Working agreements for coding agents

## Modern web guidance (Google)

Before implementing or changing UI, CSS, or client-side JavaScript on this site,
consult Google's Modern Web Guidance:
https://github.com/GoogleChrome/modern-web-guidance

- Stewarded by the Chrome, Edge, Firefox and MDN teams. ~262 short guides with
  copy-ready modern patterns across CSS/layout, HTML/DOM, JS APIs, forms,
  accessibility, and performance.
- Read the guides directly as markdown under `skills/modern-web-guidance/guides/`
  in that repo. No installation is required. Do NOT install or run its npm
  CLI/plugin without explicit approval (third-party code, anonymous telemetry).
- Before adopting a feature, check the guide's Baseline browser-support section
  and ship the recommended fallback. Prefer native web platform features
  (details/summary, dialog, popover, etc.) over custom JS or heavy polyfills.
- Experimental features (origin trials, volatile single-engine APIs) are opt-in
  only; do not adopt them without explicit approval.

## Known modernization candidates (deferred - separate approved changes only)

- FAQ accordion: the custom JS accordion caps open answers at a fixed
  `max-height: 600px` (`styles.css` ~L705-722, `site.js` ~L49-66), which can
  clip long answers. Google's `ui-components/accordion.md` guide recommends
  native `details`/`summary` with `::details-content` and
  `interpolate-size: allow-keywords` (animation sized to actual content,
  find-in-page support, built-in accessibility, less custom JS).

## Scope rules

- Preparing guidance is not a site change: no live UI, copy, or dependency
  changes without explicit approval. Propose changes via PR with a preview;
  merge only after approval.
