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

## 2026-08-20 — v1.1.0: the course learns the gate the panel actually enforces

**What we did.** One commit, `3486302` **THE W AND THE M v1.1.0 — Gate 1 and the blue ring**.
The course now teaches the 15-minute gate that FinalEdgeGates **v5.61.0** enforces, without
changing one thing about the double bottom / double top pattern itself.

**NEW Chapter 7 — "Gate 1 and the blue ring"**, placed in *When to look*, directly after the
three things that must be true before you care. What it teaches:

- the 15-minute circle judges **swing structure**, nothing else
- solid green = higher low + higher high · solid red = lower high + lower low · yellow = mixed,
  including too few confirmed swings
- **the higher low is compulsory**; a 15m *close* beyond the last confirmed swing can stand in
  for the higher high (mirrored for red) — which is also why a green built that way can demote
  later
- solid states lock at the 15m close and never repaint
- a bright **blue ring with an arrow** = price is beyond the key swing level right now and the
  15m candle has not closed: **GATE 1 IS OPEN, PROVISIONAL**
- provisional = **permission to hunt on the 5m/2m, not permission to trust**
- a blue arrow standing against a solid colour is a **warning, not a cancellation**; the 5m and
  2m rings grant nothing

**Wired into the places that decide when he may trade** — a chapter nobody acts on is decoration:
- the second-low checklist is now **seven items**, with *"Gate 1 agrees with your direction"* as
  killer item #1 — it is the only item on the list he can read without thinking
- the **desk card** gains the gate in section (1), a blue-ring warning in the ladder, and
  *"Gate 1 is yellow"* in WALK AWAY IF
- Chapter 6 now hands off to the gate instead of ending on a count

**A blue ring alone is never an entry.** The 2-minute must still confirm: the pullback holds the
broken level and 2-minute structure turns his way. That sentence appears in the new chapter, on
the desk card, and in the checklist — three places, because one place is where things get missed.

**What's working.** Chapters 7–17 renumbered to 8–18; every in-text cross-reference re-pointed
and verified; all 18 chapters render under 8 part headings with 18 sidebar links; `node --check`
clean on every script; CRLF/LF preserved per file. Verified on the **production URL** at wrap-up,
not on a preview: root returns 200, `js/lessons-1.js` returns 200 and contains "blue ring" 9
times, and the live `index.html` serves `?v=20260820134049` — the same stamp as the local file,
so Netlify's build is today's build.

**Gotcha #1 was honoured, and it is the reason this shipped clean.** Every script tag was bumped
to `?v=20260820134049` and `CACHE` in `sw.js` went to `dbm-v5`. That is the fix for the
stale-cache trap that ate hours on 2026-08-19 — do it on every future change under `js/`.

**Important decisions.**
- **Nothing visual moved.** No font, colour, layout, component or feature change; the Narrator is
  untouched; every pattern rule, entry, door and number is exactly as it was. This was a content
  insertion, not a redesign — which is also why the gallery card still represents the app
  correctly and was left alone.
- **The course and the indicator are now coupled on purpose.** Chapter 7 describes the 15m law as
  GATES v5.61.0 implements it. If that law changes in `final-edge-nt8-indicator`, Chapter 7, the
  seven-item checklist and the desk card all have to change with it, or the course starts
  teaching a gate the panel no longer enforces.
- Fixed in passing: the cross-reference in `js/examples.js` that already pointed at the wrong
  chapter for Door B's two fixes now points at Door B. That was a pre-existing error, not one
  the renumber introduced.

**Problems encountered.** None. The renumber was the only real risk — 11 chapters shifting by one
with cross-references scattered across three lesson files — and it was verified by rendering all
18 chapters rather than by trusting the edit.

**What's next (nothing blocking).** Unchanged from launch: Arnie does ~15 drill calls, then takes
the pattern to Sim101 on M2K and logs the trades; after ~50 logged trades, revisit Chapter 14's
scale-out advice using his own numbers. New: when the indicator's blue provisional ring is first
seen firing on live tape, re-read Chapter 7 against what actually appeared on the card.
