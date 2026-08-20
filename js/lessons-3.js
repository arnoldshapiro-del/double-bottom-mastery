/* ============================================================
   lessons-3.js — Part 5 (what goes wrong), Part 6 (managing),
                  Part 7 (practice, the card, how to learn it)
   ============================================================ */
(function (root) {
  "use strict";
  var D = root.DBM;
  var L = D.lessons;
  var EX = D.ex;

  /* ==========================================================
     CH 13 — THE FAILURE GALLERY
     ========================================================== */
  L.push({
    id: "fails", part: "What goes wrong", n: 14,
    title: "The failure gallery — six ways this kills you",
    render: function () { return [
      '<div class="eyebrow">Chapter 14 · What goes wrong</div>',
      '<h1>The failure gallery</h1>',
      '<p class="lead">You asked to be shown what can go wrong so you know when <b>not</b> to enter. This is that chapter, and it is the most important one in the course. Six failures, each animated, each with the tell that would have kept you out.</p>',

      '<div class="callout"><div class="ct">Why this chapter exists at all</div>' +
      '<p>Every double bottom in every book is, by construction, one that <b>worked</b> — the failures were never photographed, because there is no clean "after" picture to print. So you learned the middle of the category and never learned its edges.</p>' +
      '<p>Learning research is unambiguous about this: you learn a category from its <b>boundary</b>, by studying near-misses next to real ones. That is what the rest of this page is.</p></div>',

      '<h2 style="color:var(--red)">Failure 1 — buying because it "should" hold</h2>',
      '<p><b>The mistake:</b> price approaches the shelf and you buy, because it held there before. Nothing has turned yet. You are buying a falling price on the theory it is about to stop falling.</p>',
      '<p><b>The tell:</b> there is no low candle. No tail, no higher low, no reclaim, no stall. If you cannot point at a bar that has <i>already stopped going down</i>, there is nothing to put an order above.</p>',
      { chart: EX.failAnticipate() },

      '<h2 style="color:var(--red)">Failure 2 — trading it on a trend day</h2>',
      '<p><b>The mistake:</b> taking a reversal setup on a day where one side never lets go.</p>',
      '<p><b>The tell:</b> one-timeframing — every bar\'s high lower than the last, no real pullbacks. Five-second check, and it is the single highest-value filter you have.</p>',
      { chart: EX.failTrendDay() },

      '<h2 style="color:var(--red)">Failure 3 — the second low arrives louder than the first</h2>',
      '<p><b>The mistake:</b> reading the shape and not the energy. The W looks right. The sellers are not finished.</p>',
      '<p><b>The tell:</b> expanding bar range and expanding volume into the second low, and a low bar with a wide body that closes at its low with no tail.</p>',
      { chart: EX.decelBad() },

      '<h2 style="color:var(--red)">Failure 4 — the third tap</h2>',
      '<p><b>The mistake:</b> assuming that because it is the second touch, the pattern is set. It comes back a third time and grinds you out.</p>',
      '<p><b>The tell:</b> the rally off the second low <b>fails below the middle peak</b>. It never confirmed. And each rally topping out lower than the last is the market telling you buyers are getting weaker.</p>',
      { chart: EX.failThirdTap() },

      '<h2 style="color:var(--red)">Failure 5 — the bull trap at the neckline</h2>',
      '<p><b>The mistake:</b> buying the breakout close, which is exactly what you were taught to do — and it snaps straight back.</p>',
      '<p><b>The tell:</b> the breakout bar arrives on <b>below-average volume</b>. Uni wants 150% of average on the break. A quiet break has nobody behind it, and obvious levels are precisely where stops get hunted.</p>',
      { chart: EX.failBullTrap() },

      '<h2 style="color:var(--red)">Failure 6 — the pattern is too small to pay</h2>',
      '<p><b>The mistake:</b> trading a perfect shape that is entirely inside the noise.</p>',
      '<p><b>The tell:</b> measure it. Shelf to middle peak under 3× the average bar range means there is no room between your entry, a sane stop, and your target.</p>',
      { chart: EX.failTooSmall() },

      '<h2>The rest of the list</h2>',
      '<p>These four did not get their own chart but they cost real money too:</p>',
      '<table class="tbl"><thead><tr><th>Failure</th><th>The tell</th></tr></thead><tbody>' +
      '<tr><td><b>No prior downtrend</b> — a "double bottom" inside a range</td><td>Ask "what is this reversing?" If it has been sideways for an hour, nothing.</td></tr>' +
      '<tr><td><b>Lunchtime chop</b> — 11:30 to 1:30</td><td>Look at the clock before the chart. Thin volume manufactures perfect-looking shapes.</td></tr>' +
      '<tr><td><b>News inside your hold</b></td><td>Check the calendar. A scheduled number turns your pattern into a coin flip; the first spike after a release is almost always the trap.</td></tr>' +
      '<tr><td><b>The bust that keeps busting</b></td><td>About 1 in 5 confirmed double bottoms rises less than 10% and then breaks the pattern low. Of those, 35% do it a second time and 12% a third. One failure is not a reason to expect a bounce — it is a reason to leave.</td></tr>' +
      '</tbody></table>',

      '<div class="callout bad"><div class="ct">The near-miss pair — the most useful thing on this page</div>' +
      '<p>Below are two charts with the <b>same opening 22 bars</b>. One works, one does not. Scrub them side by side until you can feel the moment they separate. That moment is the skill.</p></div>',
      { chart: EX.fullTrade() },
      { chart: EX.pairFail() },

      '<div class="callout warn"><div class="ct">And the honest one: how good is this pattern really?</div>' +
      '<p>The serious academic work here is Lo, Mamaysky &amp; Wang (2000) in the <i>Journal of Finance</i>. They built an algorithm to find patterns objectively — <b>specifically because</b> human chart-reading is, in their words, in the eye of the beholder — and found several patterns did carry statistically detectable information. Head and shoulders tested strongest. Double bottoms were not among their headline results.</p>' +
      '<p>Statistically detectable is not the same as profitable after commissions. And their algorithm is not you, squinting at a 2-minute chart in real time. <b>The edge here is not the shape.</b> It is the risk-to-reward you can construct around a shape, and the discipline to skip the four out of five that fail the checklist.</p></div>'
    ]; }
  });

  /* ==========================================================
     CH 14 — MANAGING IT
     ========================================================== */
  L.push({
    id: "manage", part: "Managing it", n: 15,
    title: "Stops, targets, and the 70% retest",
    render: function () { return [
      '<div class="eyebrow">Chapter 15 · Managing it</div>',
      '<h1>Stops, targets, and the 70% retest</h1>',
      '<p class="lead">You are in. Now what. This chapter follows your existing Plan A rules — because they are already right — and adds the double-bottom-specific pieces.</p>',

      '<h2>The targets, in order</h2>',
      '<table class="tbl"><thead><tr><th>Target</th><th>Where</th><th>Why</th></tr></thead><tbody>' +
      '<tr><td><b>Target 1</b></td><td><b>The middle peak</b></td><td>Uni\'s rule #15 — the previous high is the first target. It is also the price where Door B traders are only now getting in.</td></tr>' +
      '<tr><td><b>Target 2</b></td><td>The measured move — pattern height added to the neckline</td><td>Reached 65–73% of the time on daily stock charts. Treat it as where the runners go, not where every trade goes.</td></tr>' +
      '<tr><td><b>Beyond</b></td><td>Your Fib extension rungs — 127.2, 161.8, 200</td><td>Your Plan A already runs A→B→C extensions. Nothing here changes that.</td></tr>' +
      '</tbody></table>',

      '<div class="callout bad"><div class="ct">The trap at target 1</div>' +
      '<p>Do <b>not</b> exit the whole position at the middle peak. Your own notes already flag this: full exit at the first target is roughly half a unit of risk, and it is the classic <b>win-small, lose-big</b> pattern that kills accounts slowly.</p>' +
      '<p><b>Peel a piece there.</b> Let the rest work to the measured move. That is what the tiny stop bought you — the right to still be in the trade when it pays properly.</p></div>',

      '<h2>The stop sequence — your Plan A rules, unchanged</h2>',
      '<p>Quoting your own settled ladder, because it is right and because re-deriving it has caused trouble before:</p>',
      '<table class="tbl"><thead><tr><th>Stage</th><th>What happens to the stop</th></tr></thead><tbody>' +
      '<tr><td><b>Before the first target</b></td><td>The stop is the one NinjaTrader set. <b>It does not move.</b></td></tr>' +
      '<tr><td><b>First target pays</b></td><td>Move the stop on <b>all remaining</b> contracts up under the <b>previous completed 2-minute swing</b>. Still below entry. <b>One move, not a trail.</b></td></tr>' +
      '<tr><td><b>Second target pays</b></td><td>Move the runners <b>past entry</b>, under the most recent completed 2-minute swing. <b>From here the trail is on</b>, walking up under each new completed swing.</td></tr>' +
      '<tr><td><b>Throughout</b></td><td>One regime: the 2-minute swing. One stop price for whatever is held. It only ever tightens — never wider, never back down.</td></tr>' +
      '</tbody></table>',
      '<p class="srcs"><b>Stops by structure, never by R-multiples.</b> The 5-minute guard number is not used at any stage, and BE+3 is retired. Those are your rules as of 2026-08-07, not mine.</p>',

      '<h2>The 70% retest</h2>',
      '<p>After the break above the neckline, expect a pullback back to it. Uni says 70% of breakouts test the level; Bulkowski measured 55–67%. Either way, it is the normal case, not a failure.</p>',
      '<ul class="clean">' +
      '<li><b>If you are already in:</b> this is not a reason to panic out. It is expected.</li>' +
      '<li><b>If you missed the entry:</b> this is your second chance, with a small stop under the neckline.</li>' +
      '<li><b>The health check:</b> a retest that holds <b>above</b> the neckline is healthy. One that trades back <b>through</b> it cuts the average subsequent move nearly in half. Reduce conviction hard.</li>' +
      '</ul>',

      '<h2>Two exits that are not the stop</h2>',
      '<ul class="clean">' +
      '<li><b>The time stop.</b> Your Plan A already has it: no first target in about ten candles, scratch it flat. A double bottom that is working tends to work fairly quickly — the buyers who absorbed the low are motivated. If it is sitting there doing nothing, the premise is stale.</li>' +
      '<li><b>The second failed retest.</b> Bulkowski\'s own advice: consider selling if price returns to the confirmation level a second time without upward momentum. The pattern has told you twice.</li>' +
      '</ul>',

      '<h2>Scale out, or all out?</h2>',
      '<p>Straight answer: the evidence cuts both ways and you should know both sides.</p>',
      '<div class="grid2">' +
      '<div class="card tight"><h3 style="color:var(--green)">For peeling</h3><p style="margin:0;font-size:.93rem">Once the first piece is off and the stop is moved, the trade cannot become a loser. That is a real, purchasable thing — and with many contracts from a tiny stop, you have the size to do it. A one-contract trade cannot be scaled at all.</p></div>' +
      '<div class="card tight"><h3 style="color:var(--orange)">Against peeling</h3><p style="margin:0;font-size:.93rem">One trader\'s backtest found habitual partials cut total profit nearly in half. Taking a piece off caps your big winners at the same rate it protects your small ones — and the big winners are what carry a system.</p></div>' +
      '</div>',
      '<p style="margin-top:14px"><b>My read for your situation:</b> peel. You are rebuilding confidence in a pattern that has burned you, and the psychological value of a trade that cannot lose is worth more right now than the last few percent of expectancy. Revisit it after fifty logged trades, when you have your own numbers instead of somebody else\'s.</p>'
    ]; }
  });

  /* ==========================================================
     CH 15 — THE DRILL
     ========================================================== */
  L.push({
    id: "drill", part: "Practice", n: 16,
    title: "The drill — call it before you see it",
    render: function () { return [
      '<div class="eyebrow">Chapter 16 · Practice</div>',
      '<h1>The drill — call it before you see it</h1>',
      '<p class="lead">Reading about this will not teach you to see it. This will. The chart stops at the moment of decision and you have to call it — and only then does it show you what happened.</p>',

      '<div class="callout"><div class="ct">Why it is built this way</div>' +
      '<p>This is the one mechanic in the whole app with hard science behind it. In sports research it is called <b>temporal occlusion</b>: show an athlete a play, cut it off before the outcome, make them predict, then reveal. A 2024 meta-analysis in <i>Sports Medicine</i> confirmed it measurably improves real-time anticipation — and that the improvement <b>transfers</b> to live performance, not just to the training clips.</p>' +
      '<p>Reading a forming chart is the same task: extract the outcome from partial information, under time pressure. So the drill makes you commit <b>before</b> the reveal. Guessing wrong is not failure here — a wrong prediction followed immediately by the right answer is one of the most reliable ways to learn there is.</p></div>',

      { drill: true },

      '<div class="callout good"><div class="ct">How to actually use it</div>' +
      '<ul class="clean" style="margin:8px 0 0">' +
      '<li><b>Say your reason out loud before you click.</b> "No trade — it is one-timeframing." If you cannot name the reason, you are pattern-matching on vibes.</li>' +
      '<li><b>Short sessions beat long ones.</b> Ten or fifteen calls, then stop. The research dose that produced real gains was around 120 trials over two days — not one marathon.</li>' +
      '<li><b>Do not skip the ones you get wrong.</b> Those are the whole point. Read the explanation before moving on.</li>' +
      '<li><b>It mixes good and bad deliberately.</b> Blocking all the winners together feels better and teaches less.</li>' +
      '</ul></div>'
    ]; }
  });

  /* ==========================================================
     CH 16 — THE CARD
     ========================================================== */
  L.push({
    id: "card", part: "Practice", n: 17,
    title: "The card — print this and put it on the desk",
    render: function () { return [
      '<div class="eyebrow">Chapter 17 · Practice</div>',
      '<h1>The card</h1>',
      '<p class="lead">Everything in this course, on one screen, in the order you actually need it. Print it. It is designed to be run in under a minute, after you have already made the call.</p>',

      '<div class="card" style="border-color:var(--gold);border-width:2px">' +
      '<h2 style="margin-top:0">① BEFORE YOU LOOK — the gate</h2>' +
      '<ul class="clean check">' +
      '<li><b>Gate 1 agrees.</b> Solid green or blue ▲ for a W; solid red or blue ▼ for an M. <span class="pill r">killer item</span></li>' +
      '<li><b>Not one-timeframing.</b> Last ten bars show two-sided action. <span class="pill r">killer item</span></li>' +
      '<li><b>Clock is clean.</b> Not 11:30–1:30. Nothing scheduled inside the hold. <span class="pill r">killer item</span></li>' +
      '<li><b>There was a real decline</b> for this to reverse.</li>' +
      '<li><b>The shelf is on a level I can name out loud.</b></li>' +
      '</ul>' +

      '<h2>② AT THE SECOND LOW — the read</h2>' +
      '<ul class="clean check">' +
      '<li><b>Tall enough:</b> shelf → middle peak ≥ 3× the average bar. On M2K, usually 4+ points.</li>' +
      '<li><b>It decelerated:</b> smaller bars, lighter volume, more time than the first drop.</li>' +
      '<li><b>There is a low candle:</b> a tail, a stall, an engulfing bar, or an undercut that reclaimed.</li>' +
      '<li><b>Master chess player:</b> could this be a triple bottom or a rectangle instead? Hold it as a candidate.</li>' +
      '</ul>' +

      '<h2>③ THE ORDER — Door A</h2>' +
      '<table class="tbl" style="margin-top:6px"><tbody>' +
      '<tr><td style="width:110px"><b>Entry</b></td><td>Buy-stop <b>2 ticks above the low candle\'s high</b>.</td></tr>' +
      '<tr><td><b>Stop</b></td><td><b>2 ticks below the low candle\'s low</b> — 0.5 pts beyond the newest 2-minute swing.</td></tr>' +
      '<tr><td><b>Size</b></td><td>Dollar risk ÷ (stop ticks × $0.50). Sanity-check commission is under a quarter of the risk.</td></tr>' +
      '<tr><td><b>Target 1</b></td><td><b>The middle peak.</b> Peel a piece. Never the whole thing.</td></tr>' +
      '<tr><td><b>Target 2</b></td><td>Measured move = neckline + pattern height.</td></tr>' +
      '</tbody></table>' +

      '<h2>④ AFTER — the ladder</h2>' +
      '<ul class="clean">' +
      '<li>A blue ring alone is not an entry — the 2-minute must still confirm.</li>' +
      '<li>Before target 1: <b>the stop does not move.</b></li>' +
      '<li>Target 1 pays → one move up under the previous completed 2-min swing. <b>Not a trail.</b></li>' +
      '<li>Target 2 pays → runners past entry, and <b>now</b> the trail is on.</li>' +
      '<li>No target 1 in ~10 candles → scratch it flat.</li>' +
      '<li>One re-entry maximum. Three losses on the idea and it is off the screen.</li>' +
      '</ul>' +

      '<h2 style="color:var(--red)">⑤ WALK AWAY IF</h2>' +
      '<ul class="clean cross">' +
      '<li><b>Gate 1 is yellow</b> — or blue pointing the wrong way for your direction.</li>' +
      '<li>Every high is lower than the last one.</li>' +
      '<li>The approach to the second low is getting <b>louder</b>.</li>' +
      '<li>The whole pattern is two candles tall.</li>' +
      '<li>Nothing has turned yet and you just want it to.</li>' +
      '<li>It is 12:30 in the afternoon.</li>' +
      '<li>Price closed below the shelf and <b>stayed</b> there.</li>' +
      '</ul>' +
      '</div>',

      '<div class="callout"><div class="ct">M2K numbers you should know cold</div>' +
      '<table class="tbl" style="margin:8px 0 0"><tbody>' +
      '<tr><td>1 tick</td><td class="n">0.10 points = <b>$0.50</b></td></tr>' +
      '<tr><td>1 point</td><td class="n">10 ticks = <b>$5.00</b></td></tr>' +
      '<tr><td>A 28-tick stop <span style="color:var(--mut)">(a typical morning candle)</span></td><td class="n">2.8 points = <b>$14.00</b> a contract</td></tr>' +
      '<tr><td>A 4-point pattern</td><td class="n">40 ticks = <b>$20</b> a contract from shelf to neckline</td></tr>' +
      '<tr><td>M2K daily range, mid-Aug 2026</td><td class="n">ATR(14) ≈ <b>41 points</b> ≈ $205 a contract</td></tr>' +
      '</tbody></table>' +
      '<p style="margin:10px 0 0;font-size:.8rem;color:var(--faint)">The ATR figure is a snapshot taken 2026-08-19 and drifts with volatility — re-check it rather than trusting it months from now.</p></div>'
    ]; }
  });

  /* ==========================================================
     CH 17 — HOW TO ACTUALLY LEARN THIS
     ========================================================== */
  L.push({
    id: "learn", part: "Practice", n: 18,
    title: "How to actually learn this — and how long it takes",
    render: function () { return [
      '<div class="eyebrow">Chapter 18 · Practice</div>',
      '<h1>How to actually learn this</h1>',
      '<p class="lead">You said you are determined. Good — but determination pointed at the wrong practice does not work, and I would rather tell you the real timeline than sell you a fast one.</p>',

      '<h2>The honest schedule</h2>',
      '<table class="tbl"><thead><tr><th>What</th><th>How long</th></tr></thead><tbody>' +
      '<tr><td><b>Telling a real double bottom from a fake one, most of the time</b></td><td>Days to a couple of weeks of short daily sessions — roughly <b>100–200 drill calls</b> total.</td></tr>' +
      '<tr><td><b>Seeing it instantly on a live chart, under pressure, without thinking</b></td><td><b>Months.</b> This is chunk-building and it compounds slowly.</td></tr>' +
      '<tr><td><b>Knowing your own numbers</b> — your real win rate with this setup</td><td><b>50–100 logged trades.</b> Anything less is noise. Your 20–30 was not a big enough sample to convict yourself on.</td></tr>' +
      '</tbody></table>',
      '<p class="srcs">Those dosing figures come from perceptual-learning studies — Kellman\'s modules produced large, durable gains in about 120 trials over two days, and radiology trainees improved and <i>transferred</i> to unseen images after four sessions. Nobody has run the study on chart patterns specifically, so treat these as a well-founded estimate rather than a measured fact for this task.</p>',

      '<h2>The four rules of practice that actually works</h2>',
      '<ul class="clean">' +
      '<li><b>Commit before the reveal.</b> Always say the call out loud, with the reason, before the next bar shows. Passive watching builds nothing.</li>' +
      '<li><b>Short and often beats long and rare.</b> Fifteen calls a day for two weeks beats two hours on a Sunday.</li>' +
      '<li><b>Mix the good with the bad.</b> Studying twenty winners in a row feels productive and teaches you least — you never have to <i>discriminate</i>. Interleaving feels harder and works better. That feeling of difficulty is the sign it is working.</li>' +
      '<li><b>Study the near-misses hardest.</b> The trades you <i>almost</i> got right are where the boundary of the category lives.</li>' +
      '</ul>',

      '<div class="callout warn"><div class="ct">Sim first — your own rule</div>' +
      '<p>Plan A is SIM only until a 20–25 trade scoreboard says otherwise. That is Uni\'s own rule #16 and it applies here with full force: <i>"practice this for 20–25 trades before you misbehave."</i></p>' +
      '<p>Take this pattern to Sim101 on M2K. Log every one. Come back with your own numbers.</p></div>',

      '<h2>What to write down for each one</h2>',
      '<table class="tbl"><thead><tr><th>Field</th><th>Why</th></tr></thead><tbody>' +
      '<tr><td>Time of day</td><td>If your losses cluster at 12:30, that is a free fix.</td></tr>' +
      '<tr><td>What level the shelf was on</td><td>If "no level I could name" correlates with losses, that is another free fix.</td></tr>' +
      '<tr><td>Deceleration: yes or no</td><td>The single highest-value field on this list.</td></tr>' +
      '<tr><td>Door A or Door B, and where the stop went</td><td>This is the one that caused the 80%.</td></tr>' +
      '<tr><td>Pattern height in points</td><td>You will find a size below which you should simply never trade.</td></tr>' +
      '<tr><td>Was it a re-entry?</td><td>Re-entries are a different trade with different odds. Tag them separately.</td></tr>' +
      '</tbody></table>',

      '<div class="callout bad"><div class="ct">Go back over the losing trades you already have</div>' +
      '<p>You have twenty or thirty of these in the past. If you can find them, score each one against the card in Chapter 17 — did it one-timeframe? Was the second low quieter? Where was the stop? Was the pattern tall enough?</p>' +
      '<p>Whichever box was empty most often is your actual problem, and it will be more useful than any general ranking I could give you. My money is on the stop.</p></div>',

      '<h2>The last thing</h2>',
      '<p>You gave this up after twenty or thirty tries, and that was a reasonable thing to do with the information you had. The information you had was wrong in one specific, fixable way: you were told to enter at the low <i>and</i> told to stop below the pattern, and nobody mentioned that those two instructions cancel each other out.</p>',
      '<p>Uni is not seeing something you cannot see. She waits for three things you now know how to check, enters two ticks above one specific candle, risks twelve ticks, and takes her first money at the middle peak. That is the whole method, and none of it is hidden.</p>',
      '<p style="font-size:1.06rem;color:var(--gold)"><b>Go do fifteen calls in the drill. Then take it to Sim.</b></p>'
    ]; }
  });

})(window);
