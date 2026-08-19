/* ============================================================
   lessons-2.js — Part 2 end (the tell) + Part 3 (the moment)
                  + Part 4 (the two doors and the calculator)
   ============================================================ */
(function (root) {
  "use strict";
  var D = root.DBM;
  var L = D.lessons;
  var EX = D.ex;

  /* ==========================================================
     CH 7 — THE DECELERATION TELL
     ========================================================== */
  L.push({
    id: "decel", part: "When to look", n: 7,
    title: "The tell — quiet in, loud out",
    render: function () { return [
      '<div class="eyebrow">Chapter 7 · When to look</div>',
      '<h1>The tell — quiet in, loud out</h1>',
      '<p class="lead">If you only take one idea from this whole course, take this one. Two charts can have the identical shape and opposite outcomes, and the thing that separates them is not the shape at all. It is <b>how much force it took to get back down to the low</b>.</p>',

      '<div class="callout"><div class="ct">The rule in one line</div>' +
      '<p style="font-size:1.1rem"><b>The second low should take MORE time and LESS force than the first.</b></p>' +
      '<p>Narrower bars. Lighter volume. A slower, more reluctant descent. If the approach to the second low is getting <i>louder</i> — bigger bars, rising volume — the sellers are not exhausted, they are reloading, and the level is going to break.</p></div>',

      '<h2>The good one</h2>',
      { chart: EX.decelGood() },

      '<h2>The bad one — same shape, opposite energy</h2>',
      '<p>Scrub these two charts back and forth against each other. Through bar 16 they are the same trade. Everything that matters happens after that.</p>',
      { chart: EX.decelBad() },

      '<h2>The four things you are comparing</h2>',
      '<table class="tbl"><thead><tr><th>Compare L2 against L1</th><th>Want to see</th><th>Warning</th></tr></thead><tbody>' +
      '<tr><td><b>Bar range</b> — how tall are the candles coming down?</td><td>Smaller than they were into L1</td><td>Equal or bigger</td></tr>' +
      '<tr><td><b>Volume</b> — how much is trading on the way down?</td><td>Lighter than into L1</td><td>Equal or heavier</td></tr>' +
      '<tr><td><b>Time</b> — how many bars did it take to get here?</td><td>More bars than the first drop took</td><td>Same or fewer — it fell just as fast</td></tr>' +
      '<tr><td><b>The low bar itself</b></td><td>A tail underneath, small body, closes off the low</td><td>Wide body, closes at the low, no tail</td></tr>' +
      '</tbody></table>',

      '<div class="callout good"><div class="ct">And then the second half — loud OUT</div>' +
      '<p>Quiet coming in, and then <b>volume expansion on the way out</b>. That combination is the signature. Uni\'s stated confirmation for the double bottom is exactly this: <i>"increased volume as price is breaking resistance."</i></p>' +
      '<p>Do not confuse the two halves. You want volume <b>low going into</b> the low and <b>high coming off</b> it. People muddle those and then argue about whether "volume should be higher or lower" — the answer is both, at different moments.</p></div>',

      '<h2>Momentum divergence — useful, but do not oversell it</h2>',
      '<p>The same idea shows up on an oscillator. If price makes an equal-or-lower second low while RSI or MACD makes a <b>higher</b> low, that is saying the second push down was weaker than the first. It is the deceleration tell, drawn as a line.</p>',
      '<p>Uni uses this and puts it well:</p>',
      '<blockquote class="uni-quote">"Whenever there is an Extremely Deep MACD (Red Bars) I begin looking for a bullish Divergence and/or Reversal Pattern. It\'s usually an alert for a potential reversal. I also remember that the Market can rally without a Divergence."<cite>Uni — Advanced Technical Analysis Bootcamp</cite></blockquote>',
      '<p class="srcs"><b>Being straight with you about the evidence:</b> Bulkowski measured RSI divergence on its own and found it worked 76–82% of the time, but he does not publish a sample size for that, and I could not find <b>any</b> verifiable study linking divergence at a double bottom\'s second low to that pattern\'s win rate. Every claim I found connecting the two came from marketing pages with no methodology. So: use divergence as a <b>confirming</b> voice alongside the bars and the volume. Do not treat it as proof, and do not let it override what the candles are telling you.</p>',

      '<div class="callout warn"><div class="ct">What "absorption" actually looks like</div>' +
      '<p>The professional way to describe a good second low is that selling is being <b>absorbed</b>. In plain English: sellers keep hitting the bid, and <b>the bid does not crack</b>. Somebody large is quietly buying everything they throw at it.</p>' +
      '<p>You see it on the chart as bars that go down a tick or two, stall, and refuse to make progress despite obvious selling. When the sellers finally run out, the person who absorbed all of it is holding a big long position — and price snaps up. That snap is your entry trigger.</p></div>'
    ]; }
  });

  /* ==========================================================
     CH 8 — THE SECOND-LOW CHECKLIST
     ========================================================== */
  L.push({
    id: "checklist", part: "The moment", n: 8,
    title: "The second-low checklist",
    render: function () { return [
      '<div class="eyebrow">Chapter 8 · The moment</div>',
      '<h1>The second-low checklist</h1>',
      '<p class="lead">You have said "it looks like a bottom is forming." Now price is at the shelf and you have about four minutes to decide. This is the list — six items, ten seconds each.</p>',

      '<div class="callout"><div class="ct">Use it the right way round</div>' +
      '<p>Airline and surgical checklist research is clear on this: for something you already know how to do, the checklist is a <b>DO-CONFIRM</b>, not a READ-DO. You make the call first — that is the skill this course is building — and <i>then</i> you run the list as a catch-net.</p>' +
      '<p>The design rules those researchers landed on: <b>5–9 items, one screen, under a minute, killer items first.</b> That is what this is.</p></div>',

      '<h2>The six</h2>',
      '<table class="tbl"><thead><tr><th style="width:34px">#</th><th>Check</th><th>Pass looks like</th></tr></thead><tbody>' +
      '<tr><td class="n"><b style="color:var(--red)">1</b></td><td><b>Not one-timeframing.</b> <span class="pill r">killer item</span></td><td>The last ten bars show two-sided action, not every high lower than the last.</td></tr>' +
      '<tr><td class="n"><b style="color:var(--red)">2</b></td><td><b>The clock is clean.</b> <span class="pill r">killer item</span></td><td>Not 11:30–1:30. No scheduled number due inside your hold. Not two minutes before FOMC.</td></tr>' +
      '<tr><td class="n"><b>3</b></td><td><b>There was a real decline into L1</b>, and the shelf sits on a level that matters.</td><td>You can name the level out loud.</td></tr>' +
      '<tr><td class="n"><b>4</b></td><td><b>The pattern is tall enough to pay.</b></td><td>Shelf-to-middle-peak is at least <b>3× the average 2-minute bar</b>. On M2K that usually means <b>4 points or more</b>.</td></tr>' +
      '<tr><td class="n"><b>5</b></td><td><b>The approach decelerated.</b></td><td>Smaller bars, lighter volume, more time than the first drop took.</td></tr>' +
      '<tr><td class="n"><b>6</b></td><td><b>There is a low candle to work off.</b></td><td>A bar with a tail underneath that closed off its low — something to put an order above and a stop below.</td></tr>' +
      '</tbody></table>',

      '<div class="callout bad"><div class="ct">Any "no" on 1 or 2 and you are done</div>' +
      '<p>Those two are the killer items — the ones that, when skipped, produce the worst outcomes. They are also the two that are easiest to check and easiest to skip when you are excited. No exceptions, no "but this one looks really good."</p></div>',

      '<h2>How tall is tall enough? Do the measurement.</h2>',
      '<p>There is no published rule for minimum pattern size on a 2-minute futures chart — I looked, and the honest answer is nobody has studied it. So here is a working rule built from things that <i>are</i> established, and you should treat it as a rule of thumb rather than a law:</p>',
      '<p class="mono" style="font-size:1rem;color:var(--gold);text-align:center;padding:14px;background:var(--panel2);border-radius:11px">pattern height &nbsp;≥&nbsp; 3 × (average range of the last 10 bars)</p>',
      '<p>The reasoning: stops tighter than about one ATR get taken out by ordinary noise. Your stop lives just under the low, and your first target is the middle peak. If the whole pattern is only two bars tall, then the distance between "stopped out" and "target reached" is inside the range of a single candle — and you are flipping coins with commission attached.</p>',
      { chart: EX.failTooSmall() },

      '<h2>What a good second low actually looks like when it prints</h2>',
      '<p>Any one of these is enough to give you a bar to work off. You do not need all of them.</p>',
      '<ul class="clean check">' +
      '<li><b>A hammer / long lower tail</b> — price went down, got rejected, closed near the top of its range.</li>' +
      '<li><b>A bullish engulfing bar</b> — a green bar whose body swallows the previous red one.</li>' +
      '<li><b>An undercut and reclaim</b> — it poked below the shelf and closed back above it. This is the best one, and it is Chapter 9.</li>' +
      '<li><b>A stall</b> — two or three tiny bars in a row that simply refuse to go lower. That is absorption.</li>' +
      '</ul>',
      '<p class="srcs">On the confirmation question generally, the measured evidence is consistent: a hammer taken <i>with</i> confirmation (waiting for a break of its high) tests around 60% versus roughly 41–52% for the raw unconfirmed candle; bullish engulfing tests around 63% confirmed versus 47% unconfirmed. Waiting for one bar of proof is worth real money — which is exactly what the entry in the next chapter is.</p>'
    ]; }
  });

  /* ==========================================================
     CH 9 — THE UNDERCUT AND RECLAIM
     ========================================================== */
  L.push({
    id: "undercut", part: "The moment", n: 9,
    title: "The undercut and reclaim",
    render: function () { return [
      '<div class="eyebrow">Chapter 9 · The moment</div>',
      '<h1>The undercut and reclaim</h1>',
      '<p class="lead">Here is the version that makes you the most money and feels the worst while it happens. Price breaks the first low — the thing you were told invalidates the pattern — and then immediately takes it back. Learn to want this instead of fearing it.</p>',

      { chart: EX.undercut() },

      '<h2>Why this is better, not worse</h2>',
      '<p>Everyone watching this chart drew the same line at the first low. Under that line sit two kinds of orders: <b>stop-losses</b> from people who bought earlier, and <b>sell-stops</b> from people waiting to short the breakdown. That is a pool of liquidity, and it is exactly what a large buyer needs in order to get filled without pushing the price up against themselves.</p>',
      '<p>So price dips through, fills all of it, and comes straight back. Now the people who sold the breakdown are offside, and their buy-stops sit right above — which becomes the fuel for the first leg up.</p>',

      '<div class="callout good"><div class="ct">The data says undercuts are an upgrade</div>' +
      '<p>Bulkowski tested this directly as the "2B" pattern:</p>' +
      '<ul class="clean" style="margin:8px 0 0">' +
      '<li>Second low <b>undercuts</b> the first by 4% or more → average gain <b>43%</b></li>' +
      '<li>The two lows roughly equal → average gain <b>40%</b></li>' +
      '<li>Second low sits <b>above</b> the first by 3–4% → average gain <b>30–32%</b></li>' +
      '</ul>' +
      '<p style="margin-top:10px">In his words: <i>"When the first valley was above the second by 4%, gains averaged 43%, versus 32% when the first valley was below the second."</i> The common belief that "the second low must hold above the first or the pattern is broken" is simply not what the numbers say.</p></div>',

      '<h2>This has three names, and they are all the same trade</h2>',
      '<table class="tbl"><thead><tr><th>Name</th><th>Where it comes from</th><th>The rule</th></tr></thead><tbody>' +
      '<tr><td><b>The spring</b></td><td>Wyckoff, 1930s</td><td>Price penetrates below the range low, then reverses back inside — the last test of supply before markup.</td></tr>' +
      '<tr><td><b>Turtle Soup</b></td><td>Linda Raschke &amp; Larry Connors, <i>Street Smarts</i>, 1995</td><td>Price makes a new 20-bar low; place a <b>buy-stop 5–10 ticks above the previous 20-bar low</b> so you only get in if the new low is already failing.</td></tr>' +
      '<tr><td><b>Swing failure / liquidity sweep</b></td><td>Modern order-flow trading</td><td>The <b>wick</b> goes beyond the level but the <b>close</b> comes back inside.</td></tr>' +
      '</tbody></table>',
      '<p>Notice how close Turtle Soup is to what Uni does. Raschke\'s rule is an order resting just above the old low, so the trade only triggers on the failure. Uni\'s rule is an order two ticks above the high of the low candle. Same idea, same reason: <b>never buy the falling price — buy the proof that it stopped falling.</b></p>',

      '<h2>Telling a real reclaim from a real breakdown</h2>',
      '<p>This is the part that decides whether you are early or wrong. Three things:</p>',
      '<table class="tbl"><thead><tr><th></th><th>Real spring <span class="pill g">buy it</span></th><th>Real breakdown <span class="pill r">get out of the way</span></th></tr></thead><tbody>' +
      '<tr><td><b>Volume on the break</b></td><td><b>Light.</b> Nobody actually wanted to sell down there.</td><td><b>Heavy.</b> Real supply is coming out.</td></tr>' +
      '<tr><td><b>How deep</b></td><td>Shallow — a poke, a wick, a few ticks.</td><td>Deep and it keeps extending.</td></tr>' +
      '<tr><td><b>The close</b></td><td>Closes back <b>above</b> the level, fast — same bar or the next one.</td><td>Closes <b>below</b> the level and stays there.</td></tr>' +
      '</tbody></table>',
      '<div class="callout"><div class="ct">The one rule that decides it</div>' +
      '<p>Every source that addressed this said the same thing: it is <b>the close, not the distance</b>. There is no magic number of ticks. A wick through the level that closes back inside is a sweep. A close below the level that holds is a breakdown.</p>' +
      '<p><b>Practical version:</b> price can go under your line. Price cannot <i>close and stay</i> under your line. If it does, the trade is dead and you leave — which is cheap, because your stop was twelve ticks.</p></div>'
    ]; }
  });

  /* ==========================================================
     CH 10 — DOOR A: UNI'S ENTRY
     ========================================================== */
  L.push({
    id: "doora", part: "The two doors", n: 10,
    title: "Door A — Uni's entry, at the low",
    render: function () { return [
      '<div class="eyebrow">Chapter 10 · The two doors</div>',
      '<h1>Door A — Uni\'s entry, at the low</h1>',
      '<p class="lead">This is the entry you watched her take. Here it is as a mechanical rule you can place in NinjaTrader, in her own words, translated onto your 2-minute chart.</p>',

      '<blockquote class="uni-quote">"Trade 20 cents above the high of the low day."<cite>Uni — Bull Flag Swing Trade Rule Set, rule 3</cite></blockquote>',
      '<p>That is written for a daily chart, where each candle is a day. On your 2-minute chart the <b>low day</b> becomes the <b>low candle</b>, and 20 cents becomes <b>2 ticks</b>. That is the entire translation.</p>',

      '<div class="card" style="border-color:rgba(167,139,250,.45)">' +
      '<h3 style="color:var(--violet)">The rule, mechanically</h3>' +
      '<table class="tbl" style="margin:8px 0 0"><tbody>' +
      '<tr><td style="width:120px"><b>Identify</b></td><td>The candle that made the second low. Call it <b>the low candle</b>.</td></tr>' +
      '<tr><td><b>Entry</b></td><td>A <b>buy-stop 2 ticks above the low candle\'s high</b>. It sits there. If price never gets there, you are never in the trade — which is the point.</td></tr>' +
      '<tr><td><b>Stop</b></td><td><b>2 ticks below the low candle\'s low.</b> Per your Plan A: 0.5 points beyond the newest completed 2-minute swing.</td></tr>' +
      '<tr><td><b>Target 1</b></td><td><b>The middle peak.</b> Uni\'s rule #15: <i>"first profit target was the initial previous high."</i></td></tr>' +
      '<tr><td><b>Then</b></td><td>The measured move for the runners — pattern height added to the neckline.</td></tr>' +
      '</tbody></table></div>',

      { chart: EX.uniEntry() },

      '<div class="callout uni"><div class="ct">Why "2 ticks above the high" and not "buy the low"</div>' +
      '<p>Because a buy-stop above the bar makes the market prove something before it takes your money. If price never trades above that candle\'s high, the low was not in and you were never involved.</p>' +
      '<p>Uni never buys a falling price. Neither does Raschke. Neither should you. The whole art is in choosing <b>which bar</b> to put the order above — and that is what Chapters 7 and 8 were for.</p></div>',

      '<h2>The one thing that makes this work</h2>',
      '<p>Say it again because it is the thesis of the whole course: <b>you are entering before the pattern is confirmed, so roughly half of these will not work.</b> You are not avoiding that. You are surviving it, by being wrong for twelve ticks and right for forty-eight.</p>',
      '<p>Which means the tiny stop is not optional. If you take this entry and then give it "a bit more room," you have removed the only thing holding the method up.</p>',

      '<div class="callout warn"><div class="ct">The cost nobody mentions: commissions</div>' +
      '<p>A tight stop means more contracts for the same dollar risk. More contracts means <b>more commission on every single trade</b> — it scales exactly in step.</p>' +
      '<p>At roughly <b>$1.90 round-turn</b> per M2K contract, on a $100 risk budget: a 20-tick stop gives you 10 contracts and about $19 of commission. A 4-tick stop gives you 50 contracts and about <b>$95</b> of commission — <b>95% of your risk budget, gone to fees before the trade even moves.</b></p>' +
      '<p>Slippage does the same thing. One tick of slippage on 10 contracts is $5. On 50 contracts it is $25. <b>There is a floor on how tight you can usefully go</b>, and the calculator in Chapter 12 shows you exactly where yours is.</p></div>',

      '<h2>Getting stopped out, and going again</h2>',
      '<p>You will get stopped out of good setups with a stop this tight. That is the deal. The discipline that goes with it:</p>',
      '<ul class="clean">' +
      '<li><b>One re-entry maximum</b> — which is already your Plan A rule.</li>' +
      '<li><b>Re-enter only on new evidence</b>, not the same reason that just failed. Something has to have changed: a higher low, a reclaim, a fresh low candle.</li>' +
      '<li><b>Three losses on the same idea and it is off the screen for the day.</b> After that many, the decision-making is no longer yours.</li>' +
      '<li><b>Log the re-entries separately.</b> They are a different trade with different odds, and after fifty of them you will actually know whether yours are worth taking.</li>' +
      '</ul>'
    ]; }
  });

  /* ==========================================================
     CH 11 — DOOR B
     ========================================================== */
  L.push({
    id: "doorb", part: "The two doors", n: 11,
    title: "Door B — the close above the middle of the W",
    render: function () { return [
      '<div class="eyebrow">Chapter 11 · The two doors</div>',
      '<h1>Door B — the close above the middle of the W</h1>',
      '<p class="lead">You said you are willing to try this one again. Good — but not the way it is usually taught, because the standard version has arithmetic that cannot work. Here is what is wrong with it and the two ways to fix it.</p>',

      '<p>The rule itself is the single best-supported thing in all of chart-pattern research. Bulkowski states it identically on every page: <b>a double bottom confirms once price closes above the peak between the two valleys.</b> Wait for that close and you skip the entire 44–50% of patterns that never confirm.</p>',

      { chart: EX.necklineEntry() },

      '<h2>The problem</h2>',
      '<div class="callout bad"><div class="ct">The textbook version loses money on maths alone</div>' +
      '<p>Entry above the neckline, stop below the second low, target the measured move. Run the numbers on a 6-point M2K pattern:</p>' +
      '<ul class="clean cross" style="margin:8px 0 0">' +
      '<li>Risk: the whole height of the W plus a bit — about <b>64 ticks</b></li>' +
      '<li>Reward to the measured move: about <b>56 ticks</b></li>' +
      '<li><b>Less than 1 to 1</b> — which means you need to win about 53% of the time just to break even, before commissions</li>' +
      '</ul>' +
      '<p style="margin-top:10px">You waited for proof, you paid for it with the bottom half of the move, and then you put your stop as far away as it can possibly go. That is why Door B disappointed you.</p></div>',

      '<h2>Fix 1 — move the stop, not the entry</h2>',
      '<p>The stop does not have to go under the second low. Once price has <i>closed</i> above the neckline, the thing that invalidates the trade is price falling back <b>below the neckline and staying there</b> — not price revisiting the second low, which would be a catastrophe anyway.</p>',
      '<table class="tbl"><thead><tr><th>Stop placement</th><th>Risk on a 6-pt pattern</th><th>Reward : risk to measured move</th></tr></thead><tbody>' +
      '<tr><td>Under the second low <span class="pill r">textbook</span></td><td class="n">~64 ticks</td><td class="n" style="color:var(--red)">0.9 : 1</td></tr>' +
      '<tr><td>Middle of the pattern</td><td class="n">~34 ticks</td><td class="n" style="color:var(--orange)">1.6 : 1</td></tr>' +
      '<tr><td>A few ticks under the neckline <span class="pill g">what it should be</span></td><td class="n">~10 ticks</td><td class="n" style="color:var(--green)">5.6 : 1</td></tr>' +
      '</tbody></table>',
      '<p>The last row is a genuinely good trade. The cost is that a normal pullback will stop you out — which brings us to the thing Uni already warned you about.</p>',

      '<h2>Fix 2 — trade the retest instead of the break</h2>',
      '<blockquote class="uni-quote">"Remember 70% of breakouts will test the breakout level."<cite>Uni — Advanced Technical Analysis Bootcamp</cite></blockquote>',
      '<p>Bulkowski measured the same thing and got <b>55–67%</b> depending on the variant. Either way, most breakouts come back. So instead of buying the break, let it break, let it come back to the neckline, and buy it <b>holding</b> — old resistance now acting as support.</p>',
      '<p>You get a Door-B-quality entry with a Door-A-sized stop. The cost is that roughly a third of the time it never comes back and you miss it entirely.</p>',

      '<div class="callout warn"><div class="ct">One number that decides whether the retest is healthy</div>' +
      '<p>Bulkowski found this and it is worth memorising: when the pullback <b>does not</b> dip below the breakout price, the average subsequent rise was <b>41.3%</b>. When it <b>did</b> dip below, it was <b>26.7%</b>.</p>' +
      '<p>So: a shallow retest that holds above the neckline is a normal, healthy pullback and a good entry. A retest that trades back down <i>through</i> the neckline has told you something, and your conviction should drop hard even if you are not stopped out.</p></div>',

      '<h2>So which door?</h2>',
      '<div class="calc-out">' +
      '<div class="door a"><h4>Door A suits you when…</h4>' +
      '<ul class="clean" style="margin:6px 0 0;font-size:.92rem">' +
      '<li>There is a clean low candle to work off</li>' +
      '<li>The pattern is tall — 5 points or more</li>' +
      '<li>You want size, and you can take being stopped out repeatedly without it getting to you</li>' +
      '<li>It is the morning, and volume is real</li>' +
      '</ul></div>' +
      '<div class="door b"><h4>Door B suits you when…</h4>' +
      '<ul class="clean" style="margin:6px 0 0;font-size:.92rem">' +
      '<li>The second low was messy and there is no clean bar to anchor to</li>' +
      '<li>You missed Door A and price is already moving</li>' +
      '<li>You want fewer, better trades and can accept smaller size</li>' +
      '<li>You take the <b>retest</b>, not the break itself</li>' +
      '</ul></div></div>',
      '<p style="margin-top:14px"><b>And here is the elegant part.</b> Door A\'s first profit target is the neckline — which is the exact price where Door B is only just getting in. When you take Uni\'s entry, you are taking money off the table at the moment the other kind of trader is first putting money at risk.</p>'
    ]; }
  });

  /* ==========================================================
     CH 12 — THE CALCULATOR
     ========================================================== */
  L.push({
    id: "calc", part: "The two doors", n: 12,
    title: "The calculator — your real M2K numbers",
    render: function () { return [
      '<div class="eyebrow">Chapter 12 · The two doors</div>',
      '<h1>The calculator — your real M2K numbers</h1>',
      '<p class="lead">Stop taking my word for it. Move the sliders and watch the two doors trade places. Everything here is real M2K arithmetic: 0.10-point ticks, $0.50 a tick, $5.00 a point, and commissions that actually get charged.</p>',
      { calc: true },
      '<div class="callout"><div class="ct">Three things to go and try right now</div>' +
      '<ul class="clean" style="margin:8px 0 0">' +
      '<li><b>Drag the pattern height down to 3 points.</b> Watch both doors collapse. That is why Chapter 8 has a minimum size rule.</li>' +
      '<li><b>Drag Door A\'s stop from 12 ticks down to 4.</b> Watch the contracts pile up — and then watch the commission line eat the whole trade. That is the floor.</li>' +
      '<li><b>Set Door B\'s stop to "under the second low."</b> Watch the break-even win rate go over 50%. That is the trade that disappointed you, shown as arithmetic.</li>' +
      '</ul></div>',
      '<p class="srcs"><b>About the commission figure.</b> The $1.90 default is a published round-turn all-in rate for M2K on one broker\'s most expensive plan. Yours will differ — put your real number in the box. The point is not the exact figure, it is that commission scales one-for-one with contract count, so it hurts the tight-stop door far more than the wide-stop one.</p>'
    ]; }
  });

  /* ==========================================================
     THE CALCULATOR ITSELF
     ========================================================== */
  D.buildCalc = function () {
    var wrap = document.createElement("div");
    wrap.className = "card";
    wrap.innerHTML =
      '<div class="calc-row"><label>Pattern height (points)</label>' +
        '<input type="range" id="c-h" min="2" max="14" step="0.5" value="6">' +
        '<input type="number" id="c-hn" value="6" step="0.5"></div>' +
      '<div class="calc-row"><label>Door A stop (ticks)</label>' +
        '<input type="range" id="c-sa" min="3" max="40" step="1" value="12">' +
        '<input type="number" id="c-san" value="12" step="1"></div>' +
      '<div class="calc-row"><label>Door B stop goes…</label>' +
        '<select id="c-sb">' +
          '<option value="neck">a few ticks under the neckline</option>' +
          '<option value="mid">middle of the pattern</option>' +
          '<option value="low" selected>under the second low (textbook)</option>' +
        '</select></div>' +
      '<div class="calc-row"><label>Dollar risk per trade</label>' +
        '<input type="number" id="c-risk" value="60" step="10"> ' +
        '<span class="fig-hint">Plan A: 4–6 contracts · day stop −$450 / 3 losses</span></div>' +
      '<div class="calc-row"><label>Commission (round turn, per contract)</label>' +
        '<input type="number" id="c-comm" value="1.90" step="0.05"></div>' +
      '<div class="calc-row"><label>Slippage on the stop (ticks)</label>' +
        '<select id="c-slip"><option value="0">0 — perfect fill</option><option value="1" selected>1 tick</option><option value="2">2 ticks</option></select></div>' +
      '<div class="calc-out" id="c-out"></div>';

    var $ = function (id) { return wrap.querySelector("#" + id); };

    function link(rangeId, numId) {
      var r = $(rangeId), n = $(numId);
      r.oninput = function () { n.value = r.value; go(); };
      n.oninput = function () { r.value = n.value; go(); };
    }
    link("c-h", "c-hn"); link("c-sa", "c-san");
    ["c-sb", "c-risk", "c-comm", "c-slip"].forEach(function (id) { $(id).oninput = go; $(id).onchange = go; });

    function go() {
      var TICK = 0.50;                       // dollars per M2K tick
      var hPts = parseFloat($("c-h").value) || 6;
      var hTicks = Math.round(hPts * 10);
      var stopA = Math.max(2, parseInt($("c-sa").value, 10) || 12);
      var budget = Math.max(10, parseFloat($("c-risk").value) || 100);
      var comm = Math.max(0, parseFloat($("c-comm").value) || 0);
      var slip = parseInt($("c-slip").value, 10) || 0;
      var sbMode = $("c-sb").value;

      /* Door A — buy 2 ticks above the low candle's high */
      var tgtA = Math.max(1, hTicks - 2);                     // to the middle peak
      var mmA = Math.max(1, hTicks * 2 - 2);                  // to the measured move

      /* Door B — buy 4 ticks above the neckline */
      var stopB = sbMode === "low" ? hTicks + 6 : sbMode === "mid" ? Math.round(hTicks / 2) + 4 : 10;
      var tgtB = Math.max(1, hTicks - 4);                     // to the measured move

      $("c-out").innerHTML =
        door("a", "Door A — Uni's entry", "in 2 ticks above the low candle", stopA, tgtA, "middle peak", mmA) +
        door("b", "Door B — the neckline", "in 4 ticks above the middle peak", stopB, tgtB, "measured move", null);

      function door(cls, name, sub, stopT, tgtT, tgtName, farT) {
        var perCt = stopT * TICK;
        var cts = Math.max(1, Math.floor(budget / perCt));
        var commission = cts * comm;
        var slipCost = cts * slip * TICK;
        var netLoss = cts * perCt + commission + slipCost;
        var netWin = cts * tgtT * TICK - commission;
        var R = netWin / netLoss;
        var be = 100 / (1 + R);
        var commPct = (commission / (cts * perCt)) * 100;
        var far = farT ? cts * farT * TICK - commission : null;

        var rColor = R >= 2 ? "var(--green)" : R >= 1 ? "var(--orange)" : "var(--red)";
        var beColor = be <= 35 ? "var(--green)" : be <= 50 ? "var(--orange)" : "var(--red)";
        var cColor = commPct >= 50 ? "var(--red)" : commPct >= 25 ? "var(--orange)" : "var(--txt)";

        return '<div class="door ' + cls + '"><h4>' + name + '</h4><div class="sub">' + sub + '</div>' +
          row("Stop distance", stopT + " ticks") +
          row("Risk per contract", "$" + perCt.toFixed(2)) +
          row("Contracts the maths allows", "<b>" + cts + "</b>" +
              (cts > 6 ? ' <span class="pill a">over your Plan A ladder</span>' : "")) +
          row("Commission this trade", "$" + commission.toFixed(2), cColor) +
          row("…as % of your risk", commPct.toFixed(0) + "%", cColor) +
          row("Loss if stopped (all in)", "−$" + netLoss.toFixed(2), "var(--red)") +
          row("Win at " + tgtName + " (net)", "+$" + netWin.toFixed(2), "var(--green)") +
          (far != null ? row("Win at measured move (net)", "+$" + far.toFixed(2), "var(--green)") : "") +
          '<div class="dstat hero"><span>Reward : risk</span><span style="color:' + rColor + '">' + R.toFixed(1) + " : 1</span></div>" +
          '<div class="dstat hero"><span>Win rate needed to break even</span><span style="color:' + beColor + '">' + be.toFixed(0) + "%</span></div>" +
          "</div>";
      }
      function row(a, b, col) {
        return '<div class="dstat"><span>' + a + "</span><span" + (col ? ' style="color:' + col + '"' : "") + ">" + b + "</span></div>";
      }
    }
    setTimeout(go, 10);
    return wrap;
  };

})(window);
