# THE W AND THE M — Double Bottom & Double Top Mastery

A 17-chapter, baby-steps course that teaches Arnie to find and trade double bottoms and
double tops on the **2-minute M2K** chart, built around **Uni's** (Andrea "Uni" Webber, TTG)
actual documented method.

**Created 2026-08-19.**

---

## What it is

A single-page static app. No build step, no framework, no dependencies. Open `index.html`
and it runs.

- **17 chapters** across 7 parts: See it → When to look → The moment → The two doors →
  What goes wrong → Managing it → Practice.
- **20 animated candlestick charts.** Bars reveal one at a time under the learner's
  control — play, pause, step, scrub, replay. **Double-click any chart to fill the screen,
  double-click again to put it back** (Esc also exits).
- **A live position calculator** with real M2K mechanics comparing the two entries.
- **A freeze-and-call practice drill** — the chart stops at the decision bar, you commit,
  then it reveals what happened.
- **The Narrator** on every page (copied from `trend-check-pro/narrator.js`, unmodified
  except the localStorage key prefix and the control-selector list).
- Dark by default, light toggle, PWA/offline, left sidebar, progress tracking.

## The thesis of the course

Arnie lost ~80% of his double-bottom attempts. The diagnosis the research supports:
he took **Uni's entry** (in at the low, before confirmation) with **a textbook's stop**
(below the whole pattern). That combination cannot win, because:

- Roughly **44–50% of apparent double bottoms never confirm at all** (Bulkowski, daily
  stock charts) — entering pre-confirmation means eating that failure rate every trade.
- Surviving it requires the loss to be *cheap*. Uni's stop is ~12 ticks ($6/contract on
  M2K); her first target is the middle peak, ~48 ticks. **4:1, so a 20% win rate breaks
  even.**
- With a 60-tick stop the same entry needs **56%** — against a pattern that confirms
  about half the time. Impossible arithmetic.

**The tiny stop is not a perk of entering early. It is what makes entering early legal.**

## Uni's method, as sourced

Everything attributed to Uni comes from her own documents on Arnie's machine
(`Desktop\Day Trading\`), not from the web:

- **Entry** — Bull Flag Rule Set rule 3: *"Trade 20 cents above the high of the low day."*
  On a 2-minute chart: **2 ticks above the high of the low candle.**
- **First target** — rules 15/28: *"first profit target was the initial previous high."*
  On a W that is the middle peak.
- **Weight of the Evidence** — 50% Trend, 30% Support & Resistance, 15% Momentum, 5% Volume.
- **Confirmation** — *"increased volume as price is breaking resistance"*; elsewhere
  *"breakout volume 150% above average."*
- **The retest** — *"Remember 70% of breakouts will test breakout level."*
- **The master chess player** — *"If price does not break the support level, but bounces
  off of it… Was there an equal or higher low? What other pattern could this be forming?"*

Independently, Linda Raschke & Larry Connors published the same entry logic in *Street
Smarts* (1995) as **Turtle Soup**: a buy-stop just above the prior low so the trade only
triggers if the new low is already failing.

## Honesty rules the content follows

- Every statistic says where it came from, and **every Bulkowski number is labelled as
  daily stock charts** — nobody has published the equivalent study for 2-minute index
  futures, and the app says so.
- Claims that could not be verified are called out as unverified rather than dropped or
  laundered (e.g. no study links momentum divergence specifically to double-bottom win
  rates; the "stairs up, elevator down" explanation is labelled reasoning, not measurement).
- The skeptical view is included — Lo/Mamaysky/Wang, survivorship bias in trading
  education, apophenia.
- **The charts are hand-authored teaching examples, not recordings of real sessions**, and
  every chart says so in its corner. Real M2K mechanics throughout: 0.10-point ticks,
  $0.50/tick, $5.00/point.

## Files

| File | What it does |
|---|---|
| `index.html` | Shell, full CSS, sidebar, narrator markup |
| `js/bars.js` | Deterministic 2-minute bar builder + M2K constants |
| `js/chart.js` | Canvas chart engine — animation, annotations, fullscreen, theming |
| `js/examples.js` | The 16 teaching chart definitions |
| `js/lessons-1/2/3.js` | Chapter content (1–6, 7–12, 13–17) + the calculator |
| `js/drill.js` | The freeze-and-call trainer (10 scenarios) |
| `js/app.js` | Router, sidebar, theme, progress |
| `narrator.js` | Read-aloud, copied from trend-check-pro |
| `sw.js` / `manifest.json` | PWA offline shell |

## Notes for future sessions

- **Script tags carry `?v=<timestamp>`.** Bump them when you change a JS file or browsers
  (and the service worker) will serve the old one. Bump `CACHE` in `sw.js` too.
- Chart annotation colours are fixed hex in `examples.js`; `chart.js` maps them through
  `LIGHT_MAP` for light mode. Add any new accent colour to that map.
- `?theme=light` / `?theme=dark` in the URL overrides the stored preference.
- The teaching examples are deterministic (seeded PRNG) — the same seed always draws the
  same chart. Changing a `seed` or a `legs` entry redraws that chart, so re-check the
  annotation bar indices (`showAt`, `i`, `fromI`) if you do.
