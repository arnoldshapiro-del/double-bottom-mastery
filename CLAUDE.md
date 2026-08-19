# double-bottom-mastery — "THE W AND THE M"

Teaching app: how to find and trade **double bottoms and double tops on the 2-minute M2K
chart**, built around Uni's (Andrea "Uni" Webber, TTG) documented method.
Created 2026-08-19. Global rules in `~\.claude\CLAUDE.md` govern; nothing here repeats them.

## What this app is for

Arnie tried double bottoms 20–30 times and lost ~80%. The course's whole thesis is the
diagnosis: he took **Uni's entry** (at the low, pre-confirmation) with **a textbook's stop**
(below the pattern). Roughly 44–50% of apparent double bottoms never confirm, so entering
early only survives if being wrong is cheap. **The tiny stop is the mechanism, not a bonus.**
If you edit content, do not undermine that spine.

## Stack

Plain static HTML + vanilla JS. **No build step, no framework, no dependencies, no dev
server needed** — open `index.html`. Deploy = GitHub → Netlify auto-build (global rule 1).

## Hard-won gotchas — READ BEFORE EDITING

1. **Script tags carry `?v=<timestamp>`.** After changing ANY file in `js/`, bump the version
   on every script tag in `index.html` AND bump `CACHE` in `sw.js`. Without this the browser
   and the service worker serve the old file and you will chase a ghost — this cost real time
   on 2026-08-19, where three separate fixes looked broken when they were only cached.
2. **Charts are deterministic.** `js/bars.js` uses a seeded PRNG. Change a `seed` or any
   `legs` entry in `js/examples.js` and the bars move — which silently breaks every
   annotation that references a bar index (`showAt`, `i`, `fromI`, `toI`) and every `steps`
   `at`. Re-check them after any data edit.
3. **Annotation colours are fixed hex** in `examples.js`/`drill.js`, deliberately. `chart.js`
   maps them for light mode via `LIGHT_MAP`. **Add any new accent colour to that map** or it
   will be unreadable on white.
4. **Verifying with a hidden Browser pane:** `IntersectionObserver` (the charts' roll-once-
   on-scroll) does NOT fire in a non-painting tab — `document.hidden` is true. That is a
   harness artifact, not a bug. Use `javascript_tool` for behaviour and headless Chrome
   `--screenshot` for pixels. See memories `verify-in-hidden-browser-pane` and
   `headless-chrome-screenshot-harness`.
5. **`?theme=light` / `?theme=dark`** in the URL overrides the stored theme — that is how you
   screenshot light mode in a fresh headless profile.
6. **narrator.js is a verbatim copy** of `trend-check-pro/narrator.js`. Only two things were
   adapted: the localStorage keys (`dbm_tts_*`) and the `CTRL_SEL` control list. **Never
   rebuild it** (memory `feedback_narrator_every_app`). `#view` carries `data-narrate` so the
   sidebar is not read aloud.

## Content rules specific to this app

- **Every Bulkowski statistic must be labelled "daily stock charts."** No one has published
  the equivalent study for 2-minute index futures, and pretending otherwise would be
  fabrication (global rule 3). The app says this explicitly in several places — keep it.
- **Charts are teaching examples, not real market data**, and every chart stamps that in its
  corner. Do not relabel them as real captures.
- Uni quotes come from **her own documents on this machine** (`Desktop\Day Trading\` —
  Advanced TA Bootcamp PDF, Bull Flag Swing Trade Rule Set). Quote them exactly; do not
  paraphrase into new "Uni rules."
- Trade management follows **Plan A as written** (memory `plan-a-trading-like-uni`): stops by
  structure never by R, the two-stage stop sequence, no 5-minute guard number, BE+3 retired.

## Not in scope

This is a *teaching* app. It places no orders, connects to no broker, and reads no live data.

The separate April-2026 repo `double-top-bottom-teaching` is a different, older, 33-tab
generalist playbook built around retired R-multiple / 0.75R-breakeven doctrine — **leave it
alone.** This app does not replace or modify it.
