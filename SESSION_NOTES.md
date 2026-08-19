# SESSION NOTES — double-bottom-mastery

## 2026-08-19 — Built from scratch, v1.0.0

**Ask:** Arnie asked for the deepest possible research and a multimedia teaching app for
double bottoms and tops — baby steps, animated gorgeous charts, double-click to fullscreen
and back, when to start looking ("it looks like a bottom is forming"), what can go wrong so
he knows when NOT to enter, and both entries side by side (Uni's first-candle entry vs. the
close above the middle of the W). He had tried the pattern 20–30 times, lost about 80%, and
given up on it.

**Research:** five parallel Sonnet workers — classic Bulkowski statistics · intraday futures
context · the tiny-stop entry and its maths · why the pattern fails · how to actually train
pattern recognition. Then a local dig that beat all of it: **Uni's own documents were already
on this machine** — `Desktop\Day Trading\Uni's Advanced Technical Analysis Bootcamp.pdf` and
`Bull_Flag_Swing_Trade_Rule_Set.pdf`, extracted with `pdftotext -layout`.

**The finding the whole app is built on:** roughly 44–50% of apparent double bottoms never
confirm at all (Bulkowski, daily stock charts). Entering at the low means accepting that
failure rate on every trade, which only works if the loss is tiny. Arnie was almost certainly
pairing Uni's early entry with a textbook stop below the pattern — 0.8:1, needing a 56% win
rate. Uni's version is 4:1, needing 20%. Same call, opposite arithmetic.

**Uni's entry, decoded:** her Bull Flag rule 3 is *"trade 20 cents above the high of the low
day."* On a 2-minute chart that becomes **2 ticks above the high of the low candle** —
exactly the "first candle after the double bottom" Arnie described watching her take. Her
rule 15 makes the **previous high** the first target, which on a W is the middle peak. Linda
Raschke and Larry Connors published the same logic in *Street Smarts* (1995) as **Turtle
Soup**. Her Weight of the Evidence (50% trend / 30% S&R / 15% momentum / 5% volume) became
the course's decision frame, and her "master chess player" line became the discipline of not
marrying the pattern.

**Built:** 17 chapters, 20 animated charts, a live M2K position calculator (Door A vs Door B,
with the commission ceiling made visible), a 10-scenario freeze-and-call drill, the standard
Narrator, PWA, dark/light.

**Verified locally** (static server on :8791, hidden Browser pane + headless Chrome): all 17
chapters render, zero console errors, ~65K characters of content, 20 canvases all painting,
fullscreen in and out, calculator maths, 13 drill rounds including the reshuffle, light and
dark palettes, 500px mobile.

### Bugs found and fixed during verification

- Charts parked on bar 1 looked broken → they now roll once on first scroll into view.
  Threshold is **pixel-based, not ratio-based**: a figure taller than the viewport can never
  reach a high intersection ratio.
- **ENTRY and STOP labels collided** — they are only 12 ticks apart, which is the entire
  point of the method. The stop now labels below its line, entry and target above, each with
  a backing plate.
- The "newest bar" highlight box stayed stuck on the final candle after playback → `stop()`
  now repaints.
- Measured-move label crowded the price axis → moved inside the projected box, left-aligned.
- **Light mode showed raw dark-theme annotation colours** (bright yellow on white). Added
  `LIGHT_MAP` + `CC()` in chart.js; verified by identical annotation pixel counts in both
  themes.
- Annotation text crowded on phone widths → scale floor lowered 0.82 → 0.70.
- Door B stop dropdown was truncated → selects now size to content.
- **Stale-cache trap.** Three "fixes that didn't work" were actually the browser and the
  service worker serving old JS. Added `?v=<timestamp>` to every script tag and bumped the SW
  cache name. **Bump both on every future JS change.**

### Deliberate non-fabrication calls

- Every Bulkowski number is labelled as daily stock charts, because no intraday-futures
  equivalent study exists.
- The app states plainly that no verifiable study links momentum divergence specifically to
  double-bottom win rates, despite that claim being everywhere online.
- "Stairs up, elevator down" is labelled as reasoning, not measurement.
- Bulkowski's finding that some double-bottom variants performed *better* on below-average
  breakout volume is included even though it complicates Uni's 150%-volume rule.
- The skeptical view is in the course: Lo/Mamaysky/Wang, survivorship bias in trading
  education, apophenia.
- Two statistics the research surfaced were flagged as likely fabricated SEO content and were
  **not used**: a "2019 Journal of Behavioral Finance, 12–18% improvement from journaling"
  claim, and an "87% win rate on deep undercuts" figure.

**Not touched:** the older `double-top-bottom-teaching` repo (April 2026) — a 33-tab
generalist playbook built on retired R-multiple / 0.75R-breakeven doctrine. Arnie thought
this problem had never been built; that repo is not the same thing and was deliberately left
alone rather than modified or replaced.

**Shipped 2026-08-19** after his explicit go (global rule 9: verify → summarise → ask → wait).
GitHub → Netlify auto-build, site created via the API against GitHub App installation 77160536
so it is properly repo-linked. Live at https://double-bottom-mastery.netlify.app, `.url`
shortcut created in the Working Apps folder. **Gallery card in `arnies-app-showcase`: asked
first (that repo is on the ask-first list, global rule 12), he said yes, card added and pushed
— gallery went 159 → 160 cards, trading 32 → 33.** He said no to putting the session's Q&A on
the live Trend Check page, so that stayed a Desktop-only file.

---

## Wrap-up summary — 2026-08-19

**What we did.** Researched double bottoms and tops five ways in parallel, then found Uni's
own source PDFs already on the machine and built them into a 17-chapter course. Shipped live.

**What's working.** Everything. 17 chapters, 20 animated charts, the M2K calculator, the
10-scenario drill, Narrator, PWA, dark/light, mobile. Verified on the production URL rather
than a preview: all chapters render, every asset returns 200, zero JS errors.

**What's next (nothing is blocking).**
- Arnie does ~15 drill calls, then takes the pattern to Sim101 on M2K and logs the trades.
- Gallery card in `arnies-app-showcase`: **done** — asked first per rule 12, he said yes.
  Screenshot gotcha worth keeping: the naive `#anatomy` shot caught the chart mid-animation and
  looked broken, so the shipped shot clicks "Show all" and scrolls the figure clear of the
  sticky top bar first. Do that for any app whose charts animate in.
- After ~50 logged trades, revisit Chapter 14's scale-out advice using his own numbers
  instead of somebody else's backtest.

**Important decisions.**
- Built a NEW repo rather than extending `double-top-bottom-teaching` (April 2026). That app
  is a 33-tab generalist playbook built on retired R-multiple / 0.75R-breakeven doctrine, and
  double bottoms are only 2 of its tabs. It was deliberately left untouched.
- The course's spine is the diagnosis, not a pattern tutorial: he took Uni's early entry with
  a ~50-tick stop when that entry only survives at ~12. Corroborated by his own 116-trade
  record, so Chapter 1 states it as measured fact rather than hedging.
- Every Bulkowski statistic is labelled "daily stock charts" and every chart is labelled a
  teaching example. Two likely-fabricated SEO statistics surfaced by the research were
  rejected rather than used.

**Problems encountered.**
- **The stale-cache trap cost the most time.** Three fixes appeared not to work when the
  browser and the service worker were simply serving old JS. Fixed permanently with `?v=` on
  every script tag, a bumped SW cache name, and a `must-revalidate` header on the shell.
  **Bump the script version AND the SW cache on every future `js/` change.**
- `IntersectionObserver` never fires in a hidden Browser pane — a harness artifact that looks
  exactly like a broken feature. Confirmed via `document.hidden`.
- Light mode initially rendered raw dark-theme annotation colours; fixed with `LIGHT_MAP`.
- A shell command whose *prose* contained a banned CLI phrase tripped the branch-guard hook
  twice. Write prose with the file tools, not heredocs, when it quotes forbidden commands.

**Post-launch addition (same day):** Chapter 1 now cites his OWN 116-trade record — the
2026-08-18 research measured his initial risk at 49–51 ticks across 111 trades (the ATM
default, not structure), with 52 of 116 stops widened after entry. Uni's is ~12. Two
independent analyses a day apart found the same single cause, which turns the chapter from a
hypothesis into a measured fact. See memory `double-bottom-the-stop-is-the-method`.
