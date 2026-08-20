/* ============================================================
   lessons-1.js — Part 1 (See it) and Part 2 (When to look)
   ============================================================ */
(function (root) {
  "use strict";
  var D = root.DBM;
  var L = D.lessons = D.lessons || [];
  var EX = D.ex;

  /* ==========================================================
     CH 1 — THE DIAGNOSIS
     ========================================================== */
  L.push({
    id: "why", part: "Start here", n: 1,
    title: "Why you lost 80% of the time",
    render: function () { return [
      '<div class="eyebrow">Chapter 1 · Start here</div>',
      '<h1>Why you lost 80% of the time</h1>',
      '<p class="lead">You tried this twenty or thirty times and lost most of them, and then you watched Uni do it and it looked easy. Both of those things can be true at once, and there is a specific reason they are. Let me give you the answer first and spend the rest of the course earning it.</p>',

      '<div class="callout bad"><div class="ct">The short answer</div>' +
      '<p>You almost certainly took <b>Uni\'s entry</b> — in at the low, before anything was confirmed — and paired it with <b>a textbook\'s stop</b>, somewhere well below the pattern.</p>' +
      '<p>That combination is the worst of both worlds, and it loses money even when your pattern-reading is fine. Uni is not making a different <i>call</i> than you. She is making the same call with <b>roughly half the risk distance</b> — her stop comes off the candle, yours came off the platform\'s default — and that single difference is what flips the arithmetic.</p></div>',

      '<div class="callout good"><div class="ct">And this is not me guessing — your own records already said so</div>' +
      '<p>The research done on <b>your 116 recorded M2K trades</b> on 2026-08-18 measured your actual stop distance. Across <b>111 of them, your initial risk sat between 49 and 51 ticks.</b> That is the platform\'s default stop, not a stop chosen from the chart.</p>' +
      '<p><b>A stop taken from the candle itself, in your morning window, measures about 28 ticks.</b> So you were carrying roughly twice the risk the setup actually called for — and 52 of those 116 trades had the stop widened <i>further</i> after entry.</p>' +
      '<p>Two separate pieces of work, a day apart, from completely different directions, landed on the same single cause. That is about as close to proof as this gets.</p></div>',

      '<h2>The number nobody tells you</h2>',
      '<p>Thomas Bulkowski has run the largest published study of chart patterns there is — thousands of double bottoms across 1,326 stocks going back to 1991. Here is the finding that matters most, and it is almost never quoted:</p>',

      '<table class="tbl"><thead><tr><th>Of every 100 things that look like a double bottom…</th><th>Bull market</th><th>Bear market</th></tr></thead><tbody>' +
      '<tr><td><b>Double bottoms</b> that never confirm — price never closes above the middle peak</td><td class="n">44</td><td class="n">50</td></tr>' +
      '<tr><td><b>Double tops</b> that never confirm</td><td class="n">63</td><td class="n">53</td></tr>' +
      '</tbody></table>',

      '<p>Read that again. Roughly <b>half of everything that looks like a W never becomes one.</b> Not "fails after the breakout" — never even gets to the breakout. It just keeps going down.</p>',
      '<p class="srcs"><b>Honest caveat, and it matters:</b> those numbers are from <i>daily charts of individual stocks</i>, not 2-minute M2K. Nobody has published the equivalent study for intraday index futures. The practitioner consensus is that intraday is <i>worse</i>, not better — more noise, more false shapes. So treat 44–50% as the friendly end of the range.</p>',

      '<h2>Now put the two entries side by side</h2>',
      '<p>Say the pattern is 6 points tall — a normal M2K W on the 2-minute. Here is what each door actually costs you.</p>',

      '<div class="calc-out">' +
      '<div class="door a"><h4>Stop under the candle</h4><div class="sub">the way Uni does it</div>' +
      '<div class="dstat"><span>Stop distance</span><span>28 ticks</span></div>' +
      '<div class="dstat"><span>Risk per contract</span><span>$14.00</span></div>' +
      '<div class="dstat"><span>First target (middle peak)</span><span>38 ticks</span></div>' +
      '<div class="dstat hero"><span>Reward : risk</span><span>1.36 : 1</span></div>' +
      '<div class="dstat"><span>Win rate needed to break even</span><span>42%</span></div></div>' +

      '<div class="door b" style="border-color:rgba(244,63,94,.5)"><h4 style="color:var(--red)">The platform\'s default stop</h4><div class="sub">what you were actually doing</div>' +
      '<div class="dstat"><span>Stop distance</span><span>50 ticks</span></div>' +
      '<div class="dstat"><span>Risk per contract</span><span>$25.00</span></div>' +
      '<div class="dstat"><span>First target (middle peak)</span><span>38 ticks</span></div>' +
      '<div class="dstat hero warnv"><span>Reward : risk</span><span>0.76 : 1</span></div>' +
      '<div class="dstat"><span>Win rate needed to break even</span><span>57%</span></div></div>' +
      '</div>' +
      '<p class="srcs"><b>These are measured, not illustrated.</b> The 28 and the 38 are the median stop and median first-target distance across every double bottom found in your own recorded 2-minute bars during your morning window. The 50 is your ATM\'s default, measured across 111 of your trades. Nothing here is a drawn example.</p>',

      '<div class="callout"><div class="ct">This is the whole thing</div>' +
      '<p>Same entry. Same chart. Same skill. But the left column needs to be right <b>42% of the time</b>, and the right column needs to be right <b>57%</b> — against a pattern that only confirms about half the time. That gap is the whole difference between a method that can work and one that cannot.</p>' +
      '<p>The right-hand column cannot win. Not because you read the chart badly, but because the arithmetic was impossible before you clicked the mouse.</p></div>',

      '<h2>The tiny stop is not a bonus. It is the whole point.</h2>',
      '<p>Here is the part that took me a while to see, and it reframes everything:</p>',
      '<p>Entering at the low means you accept the ~50% of patterns that never confirm. You cannot avoid them — by definition you got in before the proof existed. So the only way that entry survives is if being wrong is <b>cheap relative to the move you are chasing</b> — which is not the same as cheap in ticks. On your morning chart that means about 28 ticks of risk against a 38-tick first target, not some fixed small number.</p>',
      '<p>Get that ratio right and half your trades stopping out is survivable. Get it wrong — by letting the platform pick your stop — and no amount of chart-reading rescues it. That is the machine. <b>The small stop is not a perk of entering early — it is the thing that makes entering early legal at all.</b></p>',

      '<div class="callout good"><div class="ct">And the other honest possibility</div>' +
      '<p>Twenty to thirty trades is a small sample. Traders who study this properly say you need <b>50–100 trades</b> before a win rate means anything. So some of that 80% was probably bad luck.</p>' +
      '<p>But not all of it. Losing 4 out of 5 that many times in a row is a lot worse than a coin flip, and that gap is the part we can fix. The rest of this course is the fix, in order.</p></div>',

      '<h2>What you are going to learn, in order</h2>',
      '<ul class="clean">' +
      '<li><b>Chapters 2–4 · See it.</b> The four points of the W, the M, and why the <i>shape</i> of a low tells you how good it is.</li>' +
      '<li><b>Chapters 5–7 · When to start looking.</b> Uni\'s Weight of the Evidence, the three things that must be true before you even care, and the one tell that separates a real second low from a fake one.</li>' +
      '<li><b>Chapters 8–12 · The moment, and the two doors.</b> The checklist at the second low, the undercut-and-reclaim, both entries, and a calculator with your real M2K numbers.</li>' +
      '<li><b>Chapter 13 · What goes wrong.</b> Six ways this trade kills you, each one animated, each one with the early warning sign.</li>' +
      '<li><b>Chapters 14–17 · Managing it and practising it.</b> Stops, targets, the 70% retest, a drill that makes you call the chart before it shows you the answer, and a card for the desk.</li>' +
      '</ul>',

      '<p class="srcs"><b>A word about the charts in this course.</b> They are drawn bar by bar to teach one idea each, in real M2K price territory with real M2K mechanics — 0.10-point ticks, $0.50 a tick, $5.00 a point. They are illustrations, not recordings of specific sessions, and every chart says so in its corner. Where I quote a statistic I say where it came from and whether it transfers to your 2-minute chart.</p>'
    ]; }
  });

  /* ==========================================================
     CH 2 — THE FOUR POINTS
     ========================================================== */
  L.push({
    id: "anatomy", part: "See it", n: 2,
    title: "The four points of a W",
    render: function () { return [
      '<div class="eyebrow">Chapter 2 · See it</div>',
      '<h1>The four points of a W</h1>',
      '<p class="lead">Before anything moves, learn the names. There are only four things on this chart and every rule in the course refers to one of them. Get these four and the rest is bookkeeping.</p>',

      '<table class="tbl"><thead><tr><th>Name</th><th>What it is</th><th>What it is for</th></tr></thead><tbody>' +
      '<tr><td><b style="color:var(--cyan)">L1 — first low</b></td><td>The bottom of the decline. Usually made in a rush, on heavy volume, with a tail underneath.</td><td>Sets <b>the shelf</b> — the price everything else gets measured against.</td></tr>' +
      '<tr><td><b style="color:var(--gold)">MP — middle peak</b></td><td>The rally between the two lows. Also called <b>the neckline</b>.</td><td>Two jobs: a close above it <b>confirms</b> the pattern, and it is Uni\'s <b>first profit target</b>.</td></tr>' +
      '<tr><td><b style="color:var(--cyan)">L2 — second low</b></td><td>Price returns to the shelf. This is where the whole decision happens.</td><td>Where your <b>stop</b> goes, and the bar that triggers your <b>entry</b>.</td></tr>' +
      '<tr><td><b style="color:var(--lime)">The break</b></td><td>A 2-minute <i>close</i> above the middle peak.</td><td>The moment a candidate becomes a pattern.</td></tr>' +
      '</tbody></table>',

      { chart: EX.anatomy() },

      '<div class="callout"><div class="ct">The height, and why you measure it before you trade</div>' +
      '<p>The distance from <b>the shelf</b> up to <b>the middle peak</b> is the pattern\'s <b>height</b>. On the chart above that is about 7 points — <b>70 ticks</b>, or <b>$35 a contract</b> on M2K.</p>' +
      '<p>Height decides three things at once: whether the pattern is big enough to bother with, where your first target sits, and where the measured move lands. Measure it before you do anything else.</p></div>',

      '<h2>The measured move</h2>',
      '<p>The classic target: take the height and add it to the neckline.</p>',
      '<p class="mono" style="font-size:1.05rem;color:var(--gold);text-align:center;padding:14px;background:var(--panel2);border-radius:11px">target &nbsp;=&nbsp; neckline &nbsp;+&nbsp; (neckline − shelf)</p>',
      '<p>On daily stock charts, double bottoms actually reach that target <b>65–73%</b> of the time depending on the variant; double tops only <b>43–64%</b>. Bulkowski is blunt that the naive full-height target "doesn\'t work well" on its own — treat it as the far target for a runner, not as the place you expect every trade to go.</p>',

      '<div class="callout warn"><div class="ct">Say the names out loud</div>' +
      '<p>This sounds silly and it is not. Research on teaching complex visual processes is clear that people learn a moving pattern far better if they already know the <b>names of its parts</b> before they watch it move. Shelf. Middle peak. Second low. The break. Four words. Say them while you scrub the chart above back and forth a couple of times.</p></div>'
    ]; }
  });

  /* ==========================================================
     CH 3 — THE M
     ========================================================== */
  L.push({
    id: "them", part: "See it", n: 3,
    title: "The M — the same thing upside down",
    render: function () { return [
      '<div class="eyebrow">Chapter 3 · See it</div>',
      '<h1>The M — the same thing upside down</h1>',
      '<p class="lead">Everything you just learned flips. Two highs at the same level, a valley between them, and a close <i>below</i> that valley confirms it. But the odds are genuinely worse on this side, and you should know that going in.</p>',

      { chart: EX.theM() },

      '<h2>The M really is harder. Here are the numbers.</h2>',
      '<table class="tbl"><thead><tr><th>Measured on daily stock charts</th><th>Double bottom (W)</th><th>Double top (M)</th></tr></thead><tbody>' +
      '<tr><td>Never confirms at all (bull market)</td><td class="n" style="color:var(--green)">44%</td><td class="n" style="color:var(--red)">63%</td></tr>' +
      '<tr><td>Fails to move 5% after confirming</td><td class="n" style="color:var(--green)">12–16%</td><td class="n" style="color:var(--red)">20–25%</td></tr>' +
      '<tr><td>Reaches the measured-move target</td><td class="n" style="color:var(--green)">65–73%</td><td class="n" style="color:var(--red)">43–64%</td></tr>' +
      '</tbody></table>',
      '<p>Bulkowski\'s own summary of double tops: <i>"light on performance."</i> Every gate is worse.</p>',

      '<div class="callout warn"><div class="ct">But read that fairly</div>' +
      '<p>Part of that gap is real and part is an artifact. His whole dataset sits inside thirty-odd years of a rising US stock market, so <i>every</i> bullish pattern looks better than <i>every</i> bearish one in his tables. You trade a two-sided intraday futures market where that drift does not exist within your holding period.</p>' +
      '<p>The honest takeaway: trade Ms, size them the same, but demand a bit more evidence before you do — and be quicker to take the first target.</p></div>',

      '<h2>The one real difference in behaviour</h2>',
      '<p>Watch the chart above again and look at the shape of the move <i>away</i> from the pattern. The rise into the highs was a grind; the drop out of it was fast. That is the old floor-trader line — <b>stairs up, elevator down</b> — and it has a straightforward reason behind it: fear acts faster than greed. People sell to get out in a hurry far more urgently than they buy to get in.</p>',
      '<p>Practically, for you: on an M, the move after the break often comes quicker and steeper. Your first target can fill in a couple of bars. Do not be slow taking it.</p>',
      '<p class="srcs"><b>Flagging this honestly:</b> the "stairs up, elevator down" idea is well-observed folklore with real behavioural logic behind it, but I could not find a rigorous study proving it explains the double-top/double-bottom gap specifically. The <i>statistics</i> above are measured; the <i>explanation</i> is reasoning.</p>'
    ]; }
  });

  /* ==========================================================
     CH 4 — ADAM AND EVE
     ========================================================== */
  L.push({
    id: "adameve", part: "See it", n: 4,
    title: "Adam and Eve — the shape of a low",
    render: function () { return [
      '<div class="eyebrow">Chapter 4 · See it</div>',
      '<h1>Adam and Eve — the shape of a low</h1>',
      '<p class="lead">Two lows can sit at exactly the same price and be completely different animals. Bulkowski named the two shapes decades ago, and the naming turns out to carry real information about which patterns work.</p>',

      '<div class="grid2">' +
      '<div class="card tight"><h3 style="color:var(--pink)">ADAM — the spike</h3><p style="margin:0">Narrow and pointed. Often one sharp plunge with a long tail, over in a bar or two. A panic. Selling <b>exploded</b> and then stopped.</p></div>' +
      '<div class="card tight"><h3 style="color:var(--lime)">EVE — the bowl</h3><p style="margin:0">Wide, rounded, flat-bottomed, takes its time. Several small pokes rather than one big one. Selling was <b>absorbed</b>, slowly.</p></div>' +
      '</div>',

      '<p>Bulkowski\'s shortcut for telling which combination you have: <i>ask whether the two lows look similar or different. Similar means Adam &amp; Adam or Eve &amp; Eve. Different means Adam &amp; Eve or Eve &amp; Adam.</i></p>',

      { chart: EX.adamEve() },

      '<h2>The ranking</h2>',
      '<table class="tbl"><thead><tr><th>Double bottom variant</th><th>Fails to move 5%</th><th>Average rise</th><th>Verdict</th></tr></thead><tbody>' +
      '<tr><td><b>Eve &amp; Eve</b> — rounded, rounded</td><td class="n">12%</td><td class="n">50%</td><td><span class="pill g">best of all 4</span></td></tr>' +
      '<tr><td>Adam &amp; Eve — spike then bowl</td><td class="n">12%</td><td class="n">43%</td><td><span class="pill c">good</span></td></tr>' +
      '<tr><td>Eve &amp; Adam — bowl then spike</td><td class="n">12%</td><td class="n">42%</td><td><span class="pill c">good</span></td></tr>' +
      '<tr><td><b>Adam &amp; Adam</b> — spike, spike</td><td class="n">16%</td><td class="n">39%</td><td><span class="pill a">weakest</span></td></tr>' +
      '</tbody></table>',
      '<p class="srcs">Daily stock charts, ~4,000 patterns, 1991–2025. "Fails to move 5%" is Bulkowski\'s break-even failure rate.</p>',

      '<div class="callout"><div class="ct">Why rounder is better — and what is actually proven</div>' +
      '<p>Bulkowski reports the ranking as a measured fact. He does <b>not</b> give a reason for it, and I am not going to pretend he did.</p>' +
      '<p>But it lines up exactly with what the next three chapters are about. A wide, slow, boring low means a lot of selling got quietly soaked up over many bars. A single sharp spike means one flush happened and then nothing — which tells you much less about whether the sellers are actually finished.</p>' +
      '<p><b>Practical version for your 2-minute chart:</b> a second low that takes its time and goes nowhere is better than one that stabs down and rockets back. Boring is good.</p></div>'
    ]; }
  });

  /* ==========================================================
     CH 5 — WEIGHT OF THE EVIDENCE
     ========================================================== */
  L.push({
    id: "woe", part: "When to look", n: 5,
    title: "Uni's Weight of the Evidence",
    render: function () { return [
      '<div class="eyebrow">Chapter 5 · When to look</div>',
      '<h1>Uni\'s Weight of the Evidence</h1>',
      '<p class="lead">This is Uni\'s own decision framework, straight out of her Advanced Technical Analysis Bootcamp. It is how she decides whether anything is worth trading, and it explains why she passes on setups that look fine to you.</p>',

      '<blockquote class="uni-quote">"I use Weight of the Evidence in my Decision Making Process."<cite>Uni — Advanced Technical Analysis Bootcamp</cite></blockquote>',

      '<div class="grid2" style="align-items:center">' +
      '<div>' +
      '<table class="tbl"><thead><tr><th>Factor</th><th>Weight</th></tr></thead><tbody>' +
      '<tr><td><b style="color:var(--gold)">Trend</b></td><td class="n" style="font-size:1.2rem;color:var(--gold)">50%</td></tr>' +
      '<tr><td><b style="color:var(--cyan)">Support &amp; Resistance</b> <span style="color:var(--mut)">(15% support + 15% resistance)</span></td><td class="n" style="font-size:1.2rem;color:var(--cyan)">30%</td></tr>' +
      '<tr><td><b style="color:var(--violet)">Momentum</b></td><td class="n" style="font-size:1.2rem;color:var(--violet)">15%</td></tr>' +
      '<tr><td><b style="color:var(--lime)">Volume</b></td><td class="n" style="font-size:1.2rem;color:var(--lime)">5%</td></tr>' +
      '</tbody></table></div>' +
      '<div class="card tight"><h3>What this tells you immediately</h3>' +
      '<ul class="clean" style="margin:0">' +
      '<li><b>Trend is half of everything.</b> Not the pattern. The trend.</li>' +
      '<li>The pattern itself lives inside the 30% — a double bottom is just support and resistance drawn in a particular shape.</li>' +
      '<li><b>Volume is only 5%.</b> It confirms; it never decides.</li>' +
      '<li>Nothing here is "the shape looks like a W." The shape is not a factor at all.</li>' +
      '</ul></div></div>',

      '<blockquote class="uni-quote">"The Trend is the most important component of Technical Analysis and the starting point for each and every single one of my trades."<cite>Uni — Advanced Technical Analysis Bootcamp</cite></blockquote>',

      '<div class="callout bad"><div class="ct">Here is the trap that framework protects you from</div>' +
      '<p>When you spot a W, your eye has found a shape — which is worth <b>30% at most</b>, and only if the level it sits on is a real one. If you have not checked the trend, you have not looked at half the evidence.</p>' +
      '<p>And "trend" on a double bottom means something specific and slightly odd: <b>you need a decline for the pattern to reverse, but you must not be standing in front of a train that is still moving.</b> Chapter 6 is how to tell those two apart.</p></div>',

      '<h2>Her other numbers worth writing down</h2>',
      '<table class="tbl"><thead><tr><th>Uni\'s rule</th><th>What it means for your W</th></tr></thead><tbody>' +
      '<tr><td><b>"Breakout volume 150% above average"</b></td><td>The break above the middle peak should arrive with real participation. A quiet break is a warning.</td></tr>' +
      '<tr><td><b>"Remember 70% of breakouts will test the breakout level"</b></td><td>Expect a pullback to the neckline after the break. It is normal, not failure — and it is your second-chance entry.</td></tr>' +
      '<tr><td><b>"Markets trend about 50–60% of the time"</b></td><td>Which means 40–50% of the time they are ranging — and in a range, two equal lows mean nothing at all.</td></tr>' +
      '<tr><td><b>"Confirmation: increased volume as price is breaking resistance"</b></td><td>Her stated confirmation rule for the double bottom, in her own words.</td></tr>' +
      '</tbody></table>',

      '<div class="callout uni"><div class="ct">The master chess player</div>' +
      '<p>This line appears on both her double top and double bottom slides, and it is the most useful sentence in her whole deck:</p>' +
      '<p><i>"If price does not break the support level, but bounces off of it, we need to think like a master chess player. Was there an equal or higher low? What other pattern could this be forming?"</i></p>' +
      '<p>She is telling you not to marry the shape. The moment you decide "this is a double bottom," you stop seeing the triple bottom, the rectangle, the head and shoulders that it might actually be. <b>Hold it as a candidate, not a conclusion, until the neckline close.</b></p></div>'
    ]; }
  });

  /* ==========================================================
     CH 6 — THE THREE THINGS BEFORE YOU CARE
     ========================================================== */
  L.push({
    id: "before", part: "When to look", n: 6,
    title: "The three things that must be true before you care",
    render: function () { return [
      '<div class="eyebrow">Chapter 6 · When to look</div>',
      '<h1>The three things that must be true before you care</h1>',
      '<p class="lead">This is your "it looks like a bottom is forming" moment — the thing Uni says out loud and you want to be able to say too. It is not a feeling. It is three checks, and they take about ten seconds.</p>',

      '<h2>Check 1 — Is there something to reverse?</h2>',
      '<p>A double bottom is a <b>reversal</b> pattern. If price has been going sideways for the last hour, there is nothing to reverse, and the two equal lows you are looking at are just what a range does.</p>',
      { chart: EX.failNoTrend() },
      '<p><b>What to look for:</b> a genuine decline into the first low — several bars of net downward progress, not a wiggle. On the 15-minute chart you should be able to see it as an actual leg down.</p>',

      '<h2>Check 2 — Is today a trend day?</h2>',
      '<p>This is the most valuable filter in the entire course and it costs you five seconds. Look at the last ten 2-minute bars and ask one question: <b>is each bar\'s high lower than the one before it, with no real pullback?</b></p>',
      '<p>That is called <b>one-timeframing</b>, and it means one side is in total control. A W needs a two-sided fight — price has to come back up, then come back down, then get rejected. A one-timeframing market never gives you the middle of the pattern.</p>',
      { chart: EX.failTrendDay() },
      '<div class="callout warn"><div class="ct">How often is it a trend day?</div>' +
      '<p>Roughly <b>one session in ten</b> by the usual trader estimate. But here is the thing that matters for you specifically: <b>M2K is the choppiest and most volatile of the major index futures.</b> The Russell moves more than the S&amp;P and trends less cleanly. That cuts both ways — more good reversals on the range days, and uglier, faster damage on the trend days. So the check matters more on your instrument, not less.</p></div>',

      '<h2>Check 3 — Is the low sitting on a level anyone else cares about?</h2>',
      '<p>Support works because <b>other people have orders there</b>. A low in the middle of nowhere is just a low. Before you take a W seriously, the shelf should line up with something on this list:</p>',
      '<table class="tbl"><thead><tr><th>Level</th><th>Strength</th></tr></thead><tbody>' +
      '<tr><td><b>Prior day\'s low, high, or settlement</b></td><td><span class="pill g">strongest</span></td></tr>' +
      '<tr><td><b>Prior session value area low or point of control</b> (the price with the most volume traded)</td><td><span class="pill g">strongest</span></td></tr>' +
      '<tr><td><b>Initial balance low</b> — the low of the first hour</td><td><span class="pill c">strong</span></td></tr>' +
      '<tr><td><b>Overnight (Globex) low</b>, or the overnight midpoint</td><td><span class="pill c">good — but thin volume made it, so lower conviction alone</span></td></tr>' +
      '<tr><td><b>A prior swing low</b> on the 15-minute chart</td><td><span class="pill c">good</span></td></tr>' +
      '<tr><td><b>Round numbers</b> — the 00s and 50s</td><td><span class="pill a">helps, never enough by itself</span></td></tr>' +
      '</tbody></table>',

      '<div class="callout good"><div class="ct">Say it like Uni says it</div>' +
      '<p>When all three are true, you have earned the sentence <b>"it looks like a bottom is forming."</b> Out loud, in those words:</p>' +
      '<p style="font-size:1.05rem"><b>"There was a real decline. Today is not one-timeframing. And this low is sitting on <span style="color:var(--cyan)">[the level]</span>."</b></p>' +
      '<p>That sentence is not a trade. It is permission to start watching. The trade is still three chapters away — and the whole point is that you now have something to watch <i>for</i> instead of something to hope for.</p></div>',

      '<h2>And one check on the clock</h2>',
      '<p>Time of day changes the odds more than most people admit. In US Eastern time:</p>',
      '<table class="tbl"><thead><tr><th>Window</th><th>What it does to a W</th></tr></thead><tbody>' +
      '<tr><td class="n">9:30–10:30</td><td>Highest volume of the day. Great reversals — <i>if</i> it is not a trend day. This is where the trend-day check earns its keep.</td></tr>' +
      '<tr><td class="n">~10:00</td><td>Scheduled data lands here (ISM, confidence, home sales). Sharp moves that reverse. Know if something is due.</td></tr>' +
      '<tr><td class="n">11:30–13:30</td><td><span class="pill r">worst window</span> Institutions step away, volume dries up, spreads widen. Chop <i>manufactures</i> W shapes that have nothing behind them.</td></tr>' +
      '<tr><td class="n">14:00–15:00</td><td>Repositioning, direction usually visible. Decent. (FOMC days: 2:00pm is a different world — stand aside.)</td></tr>' +
      '<tr><td class="n">15:00–16:00</td><td>Power hour. Second-highest volume, and genuinely reversal-prone.</td></tr>' +
      '</tbody></table>'
    ]; }
  });

})(window);
