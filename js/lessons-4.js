/* ============================================================
   lessons-4.js — the 2026-09-01 rebuild chapters
   ------------------------------------------------------------
   Six new chapters from the two-round deep research (the Win-Rate
   Dial, the Story of a Bottom, the Tide, the Truth Ladder, the M
   doctrine, the Bottom Grader) + THE SPINE at the bottom of this
   file, which is the single authority on chapter order, numbering
   and part names. In-file `n`/`part` values elsewhere are ignored.
   ============================================================ */
(function (root) {
  "use strict";
  var D = root.DBM;
  var L = D.lessons;
  var EX = D.ex;

  /* ==========================================================
     THE WIN-RATE DIAL
     ========================================================== */
  L.push({
    id: "dial", part: "Start here", n: 2,
    title: "The win-rate dial — what 80% really is",
    render: function () { return [
      '<div class="eyebrow">Chapter 2 · Start here</div>',
      '<h1>The win-rate dial — what 80% really is</h1>',
      '<p class="lead">You watched Uni call true bottoms about 8 times in 10 and wondered what she sees that you don\'t. The research went hunting for every documented win rate above 75% in the entire trading literature. It found them — in exactly one place — and that discovery dissolves the whole mystery.</p>',

      '<h2>Where 75–85% actually lives</h2>',
      '<p>The only setups with documented win rates that high are the <b>daily-chart mean-reversion family</b> (Larry Connors\' RSI(2) and "Double 7s" studies and their re-tests). Look at their four conditions:</p>',
      '<ul class="clean check">' +
      '<li><b>Daily charts</b> of indexes and liquid stocks.</li>' +
      '<li><b>Only in an uptrend</b> — every one of them requires price above the 200-day average before a buy is even allowed. The famous numbers simply do not exist on the downtrend side; it is never tested long.</li>' +
      '<li><b>Buy the pullback low, exit into the FIRST strength</b> — the first close above a short average. No far targets.</li>' +
      '<li><b>Room, not tight stops.</b> Cesar Alvarez, who ran many of these tests, wrote it plainly: <i>"In general for mean reversion adding any kind of stop seems to make the numbers worse."</i></li>' +
      '</ul>',
      '<p>Daily chart. Uptrend required. Buy the dip. Bank the first bounce. Give it room. <b>That is structurally Uni\'s exact trade</b> — which is why her hit rate can be honestly high, on her chart, with her rules.</p>',
      '<p class="srcs"><b>Sources and honesty:</b> Connors-family win rates are reported at roughly 76–82% across several tests (one independent re-test that could be read in full: 76% across 60 trades, exit on strength, no stop). These are daily-bar studies of stocks and index ETFs — nobody has published anything like them for 2-minute futures.</p>',

      '<h2>The other end of the dial</h2>',
      '<p>Now listen to the people who trade the way this course trades — proof entries, structure stops, targets a multiple of the risk:</p>',
      '<table class="tbl"><thead><tr><th>Who</th><th>Their own number</th></tr></thead><tbody>' +
      '<tr><td><b>Al Brooks</b> (5-minute futures)</td><td class="n">~40% on trend reversals — worth taking because the reward is a multiple of the risk</td></tr>' +
      '<tr><td><b>Peter Brandt</b> (50 years of classical patterns)</td><td class="n">patterns morph ~50% · fail after breakout ~25% · pay ~25%</td></tr>' +
      '<tr><td><b>Qullamaggie</b> ($5K → $100M, by his own account)</td><td class="n">~25–30% win rate overall, stated openly</td></tr>' +
      '<tr><td><b>Uni\'s own playbook</b></td><td class="n">"Traders can win only 25–33% of the time and still break even" at 1:2–1:3</td></tr>' +
      '</tbody></table>',

      '<div class="callout"><div class="ct">The dial, in one picture</div>' +
      '<p><b>Wide-room end:</b> daily chart · uptrend filter · buy the dip · exit into the first strength → win rate honestly 65–85%, small wins. <b>Tight-stop end:</b> 2-minute chart · stop off the low candle · targets 2–5× the risk → win rate honestly 25–40%, big wins. <b>Same five gates at both ends. The win rate is a dial setting, not a skill score.</b></p>' +
      '<p>Her 80% and your 16% were never two levels of chart-reading. They are the same trade sampled at opposite ends of one dial — and your 16% had a third ingredient: no gates at all. What loses money is not your end of the dial. It is <b>mixing the ends</b> — a tight-stop entry with a wide-stop mindset, or wide-room win-rate expectations on a tight-stop chart.</p></div>',

      '<div class="callout good"><div class="ct">What this changes about your goal</div>' +
      '<p>Stop chasing 80%. It is not on this chart, for anyone, and it never has been in print. The goal that IS available: <b>pass on everything that fails the gates, and let the geometry pay on the few that pass.</b> At your end of the dial, 35% with 2.5:1 is a good business. The rest of this course is how to get the 35% honestly.</p></div>',

      '<p class="srcs">The one academic intraday validation worth knowing: the New York Fed (Osler, 2000) tested real support/resistance levels published by six firms — intraday prices bounced at them 60.8% of the time versus 56.2% at made-up levels, and the real levels won in all sixteen firm-currency pairs (reported figures, FX data). Even genuinely good levels bounce about 6 times in 10 — hold that number next to anyone\'s 80% claim.</p>'
    ]; }
  });

  /* ==========================================================
     THE STORY OF A BOTTOM (Wyckoff)
     ========================================================== */
  L.push({
    id: "story", part: "The story of a bottom", n: 4,
    title: "The story of a bottom — and the two Ws inside it",
    render: function () { return [
      '<div class="eyebrow">Chapter 4 · The story of a bottom</div>',
      '<h1>The story of a bottom — and the two Ws inside it</h1>',
      '<p class="lead">A hundred years ago Richard Wyckoff mapped how real bottoms are built, and his map explains something nobody tells W-hunters: <b>a genuine bottom usually contains two different Ws — and only the second one is the trade.</b> Learn the story and you will see bottoms forming half an hour before the shape completes.</p>',

      { chart: EX.wyckoffStory() },

      '<h2>The five phases, in plain English</h2>',
      '<table class="tbl"><thead><tr><th>Phase</th><th>Events</th><th>The question it answers</th></tr></thead><tbody>' +
      '<tr><td class="n"><b>A</b></td><td><b>Selling Climax → Automatic Rally → Secondary Test</b></td><td>"Has the fall stopped?" The panic low (huge volume, closes off the low), the snap-back, and a quieter revisit. <b>This is the FIRST W — and it is not a buy.</b> It only draws the box price will now live in.</td></tr>' +
      '<tr><td class="n"><b>B</b></td><td>Choppy range-building</td><td>"Is a cause being built?" The longest, most boring stretch. Most fake "double bottoms" get bought here, in the chop, and die.</td></tr>' +
      '<tr><td class="n"><b>C</b></td><td><b>The spring → the quiet test</b></td><td>"Is it ready?" The undercut of the lows that shakes everyone out, then a narrow, low-volume test that holds. <b>This is the SECOND W — the one worth money.</b></td></tr>' +
      '<tr><td class="n"><b>D</b></td><td>Sign of Strength → the pullback that holds higher</td><td>"Does demand now run the tape?" The strong rally out of the range, then the retest that arrives on schedule — your 70% retest, by its older name.</td></tr>' +
      '<tr><td class="n"><b>E</b></td><td>Markup</td><td>The trend everyone else sees afterward.</td></tr>' +
      '</tbody></table>',

      '<div class="callout"><div class="ct">Why this matters to YOUR chart</div>' +
      '<p>Uni\'s entry, IBD\'s shakeout, SMB\'s failed breakdown, Raschke\'s Turtle Soup and your own sweep-at-a-real-level are all, in Wyckoff\'s language, <b>the spring and its test</b>. Different schools, one event. When your second low undercuts the first at a real level and comes back quietly — that is not a broken pattern. That is the pattern, reaching its best chapter.</p>' +
      '<p>And the first W\'s job is to teach you patience: when you see climax → rally → quiet retest, the right response is not "buy the double bottom." It is <b>"the box is drawn — now watch its edges."</b></p></div>',

      '<h2>Effort versus result — the law that reads a second low</h2>',
      '<p>Wyckoff\'s third law: volume is the <i>effort</i>, price movement is the <i>result</i>. At a second low, <b>big volume with no further downward progress is absorption</b> — sellers pouring effort in, price refusing to fall, someone large quietly taking everything they sell. That is the mechanical reason a heavy-volume second test that <i>goes nowhere</i> is bullish, not bearish.</p>',

      '<p class="srcs"><b>Honesty rider:</b> the phases and events are sourced doctrine (StockCharts\' Wyckoff course and the Wyckoff-method teachers). The mapping "first W = climax + test, second W = spring + test" is this course\'s reasoned synthesis of those definitions — reasonable, but no one publishes statistics on it. Wyckoff\'s own record says the method "worked remarkably well for daytrading," and his modern teachers state the schematic transfers intact to intraday, compressed; nobody publishes how many 2-minute bars a phase "should" take, and this course will not invent that number.</p>'
    ]; }
  });

  /* ==========================================================
     THE TIDE (the missing gate)
     ========================================================== */
  L.push({
    id: "tide", part: "The five gates", n: 8,
    title: "The Tide — the half of her method you never had",
    render: function () { return [
      '<div class="eyebrow">Chapter 8 · The five gates</div>',
      '<h1>The Tide — the half of her method you never had</h1>',
      '<p class="lead">Trend is 50% of Uni\'s Weight of the Evidence — half of everything. This chapter is what "trend" concretely means to her for a double bottom, in her own words — including a rule she gave you personally that never made it into any of your apps.</p>',

      '<h2>A true W is a pullback in a bigger up-move</h2>',
      '<blockquote class="uni-quote">"When a MACD Bullish Divergence occurs after a longer-term uptrend and a multi week pullback, they are the most powerful and gives a very significant edge to a trader… At its core it at least shows the return to the previous high is the most probable next price action."<cite>Uni — Advanced Technical Analysis Bootcamp, her MACD nuances</cite></blockquote>',
      '<p>Read the conditions: <b>after a longer-term uptrend</b>, at the end of <b>a pullback</b>. Her best bottoms are not the end of a crash — they are the moment a rising market finishes catching its breath. And notice her target logic: "the return to the previous high is the most probable next price action." Her first profit target — your middle peak — is not a hope. It is the statistically favourite next move.</p>',
      '<p>Al Brooks teaches the identical split from the futures side: a double bottom forming <i>inside</i> an up-move is a bull flag — a continuation trade with decent odds. A double bottom trying to <i>reverse</i> a bear trend is a major-trend-reversal bet he prices around 40%. <b>Same shape. Two different animals. The trend context is the only thing that separates them.</b></p>',

      '<h2>The rule she gave you — and you proved — in your own chat</h2>',
      '<blockquote class="uni-quote">"yes the tl crosses the 20 and price is above the TL and the 20"<cite>Uni — your saved conversation, Desktop\\Day Trading</cite></blockquote>',
      '<p>The tradeline crosses above the 20-period average, and price is above both — before any long. In that same conversation you backtested a $730 losing day and found <b>every single losing trade</b> had been entered while the 20 was still below the tradeline. Your own words that day: <i>"I would have lost $0."</i> You discovered this gate yourself, years ago, celebrated it — and it never got built into anything. Now it is Gate 1.</p>',

      '<h2>The market tide</h2>',
      '<blockquote class="uni-quote">"Remember that 75% to 80% of stocks follow the markets trend, 12.5% do the opposite and 12.5 will just go sideways. Markets typically change into a Sideways trend before they change directions."<cite>Uni — Advanced Technical Analysis Bootcamp, her trend nuances</cite></blockquote>',
      '<p>Two lessons in one quote. First: she never fought the broad market — on your instrument that means a glance at the bigger index tide before a long. Second: <b>markets go sideways before they turn.</b> A V-shaped instant reversal is the rare case; a real turn builds a base first — which is exactly the Wyckoff story from Chapter 4, and exactly why a W needs time between its lows.</p>',

      '<h2>The whole world agrees with her on this gate</h2>',
      '<ul class="clean">' +
      '<li><b>Stan Weinstein</b> built a famous book on it: never buy the declining stage; a bottom is a <i>base</i> — flat long average, shrinking volume — and you buy the breakout from the base, never the fall into it.</li>' +
      '<li><b>Mark Minervini\'s</b> best bases form inside existing uptrends — his signature (each pullback smaller than the last, volume drying up) is this gate stacked on the quiet-approach gate.</li>' +
      '<li><b>The quantitative clincher:</b> every documented high-win-rate buy-the-low strategy (Chapter 2) requires price above the 200-day average <i>as a precondition</i>. The published edge only exists on the uptrend side.</li>' +
      '</ul>',

      '<div class="callout good"><div class="ct">Your version, on your panel</div>' +
      '<p>You do not have a 20-day average on a 2-minute chart — you have something better: <b>Gate 1, the 15-minute circle</b> (next chapters). Solid green or blue ▲ = the tide agrees with a W. Solid red or blue ▼ = the tide agrees with an M. Yellow = there is no tide, and a W in no-tide water is just chop wearing a costume. The circle is Uni\'s tradeline-and-20 rule, automated and enforced.</p>' +
      '<p><b>Say it before every W:</b> "This W is a pullback in a bigger up-move — I can point at the up-move." If you cannot point at it, Gate 1 is closed, whatever the circle\'s colour of the moment.</p></div>'
    ]; }
  });

  /* ==========================================================
     THE TRUTH LADDER
     ========================================================== */
  L.push({
    id: "ladder", part: "The moment", n: 14,
    title: "The truth ladder — six lie detectors for a second low",
    render: function () { return [
      '<div class="eyebrow">Chapter 14 · The moment</div>',
      '<h1>The truth ladder — six lie detectors for a second low</h1>',
      '<p class="lead">"The candles at the very bottom" — your phrase, and you were right. The research found the candle is rung one of a six-rung ladder: six independent ways a second low can prove itself or betray itself. Here they are in the order you can actually use them, with honest labels on each.</p>',

      '<table class="tbl"><thead><tr><th style="width:30px">#</th><th>The test</th><th>A true bottom looks like</th><th>Check it with</th></tr></thead><tbody>' +
      '<tr><td class="n"><b>1</b></td><td><b>The tail</b></td><td>A long lower shadow, close off the low. Her whole candle sheet compresses to one sentence printed on it: the bottoming signals "all have a long lower tail." Market-profile\'s version: an <i>excess</i> low (long tail) tends to hold on retest; a <i>poor</i> low (flat, no tail) tends to get revisited and broken — so the FIRST low\'s tail predicts whether the second test will hold.</td><td>Your eyes, today.</td></tr>' +
      '<tr><td class="n"><b>2</b></td><td><b>The shape pair</b></td><td>Sharp, violent first low; dull, rounded second. Edwards &amp; Magee demanded exactly this in 1948 — first bottom "distinct and sharp," second "conspicuously dull… quite rounded." Bulkowski\'s tables agree from the data side: the rounded-second-low variants lead.</td><td>Your eyes, today.</td></tr>' +
      '<tr><td class="n"><b>3</b></td><td><b>The no-supply bar</b></td><td>The most concrete definition of "quiet" found anywhere: a <b>down</b> bar, <b>narrow</b> range, with <b>volume lower than each of the previous two bars</b>, after strength has already shown (the VSA school\'s retest tell — sellers were invited and didn\'t come). Its mirror for tops: the no-demand bar.</td><td>Price + the volume pane you already run.</td></tr>' +
      '<tr><td class="n"><b>4</b></td><td><b>The reclaim stopwatch</b></td><td>If the second low undercut the shelf, the reclaim must be FAST. SMB Capital\'s Bellafiore, verbatim: it has to "drop and re-bid within like a two-three minute period… otherwise you could just get stuck." The sweep schools say closed back inside within 1–3 bars. Your panel\'s six-minute clock is the same idea with a looser watch.</td><td>The clock — today.</td></tr>' +
      '<tr><td class="n"><b>5</b></td><td><b>The anchored-VWAP hold</b></td><td>Brian Shannon\'s control test: anchor a VWAP at the first low. Everyone who bought since that low has an average cost on that line — price holding <b>above</b> it on the retest means those buyers are still winning and still defending; losing it means they folded. A mechanical absorption gauge.</td><td>Needs an anchored-VWAP plot in NinjaTrader — check availability before relying on it.</td></tr>' +
      '<tr><td class="n"><b>6</b></td><td><b>Inside the candle</b></td><td>Order-flow absorption: heavy selling hitting a level that refuses to drop (opposition), versus exhaustion: the push dying on shrinking volume (fuel gone). Honesty first: one order-flow school\'s own guide warns that delta divergence at a low — the thing most order-flow courses sell — is "most of the time just absorption working through, <i>not</i> a directional signal." Nothing on this rung is tested anywhere.</td><td>Order Flow+ tools — optional, last, least proven.</td></tr>' +
      '</tbody></table>',

      '<div class="callout warn"><div class="ct">What did NOT make the ladder</div>' +
      '<p><b>Market internals</b> (NYSE TICK washouts and divergences at index lows) are taught everywhere and verified nowhere — the research found claims, vendor marketing, and zero published hit rates, and could not even confirm the exact rules usually attributed to Linda Raschke. <b>TD Sequential</b> counts were reviewed and excluded: no rigorous independent validation. If a tool cannot show its evidence, it does not get a rung.</p></div>',

      '<div class="callout good"><div class="ct">How to use the ladder</div>' +
      '<p>You do not need all six. Rungs 1–4 are free and visible on the chart you already run: <b>tail · shape pair · no-supply bar · fast reclaim</b>. Two or more of those at a second low that sits on a named level, with the tide behind it, is as good as this trade gets. One rung alone is a coincidence, not a case — remember the candle evidence: of 83 candlestick rules tested on 5-minute data, only 5 survived costs and luck-correction. The rungs are voices in Uni\'s weight of the evidence, never verdicts.</p></div>'
    ]; }
  });

  /* ==========================================================
     THE M DOCTRINE
     ========================================================== */
  L.push({
    id: "mdoctrine", part: "What goes wrong", n: 19,
    title: "The M is a different animal — the upthrust",
    render: function () { return [
      '<div class="eyebrow">Chapter 19 · What goes wrong</div>',
      '<h1>The M is a different animal — the upthrust</h1>',
      '<p class="lead">Chapter 5 told you the M\'s numbers are worse. This chapter tells you <i>why</i>, and it changes how you trade the second high forever: in a real top, the second high is usually <b>designed to go above the first</b>.</p>',

      { chart: EX.upthrustM() },

      '<h2>The upthrust — the top\'s dirty secret</h2>',
      '<p>In Wyckoff\'s map of distribution, the retest of a buying climax routinely prints as an <b>upthrust</b>: price pokes <i>above</i> the first high, triggers the breakout buyers and the shorts\' stops, fails, and closes back inside. The deliberate version — the "UTAD" — is a full false breakout whose entire job is to hand size to sellers at the best possible prices.</p>',
      '<p><b>So an M with two politely equal tops is the rare case.</b> The normal case sweeps the first high before it turns. If you have been shorting the touch of the old high and getting blown out by "one last push" — that push was not bad luck. It was the pattern, doing what the pattern does. The M\'s real entry logic mirrors the W\'s spring: <b>let it sweep above, fail, and come back inside — then work off the candle that failed.</b></p>',

      '<h2>The numbers that set the bar higher</h2>',
      '<table class="tbl"><thead><tr><th>Measured on daily stock charts</th><th>The W</th><th>The M</th></tr></thead><tbody>' +
      '<tr><td>Twin shapes that never confirm</td><td class="n" style="color:var(--green)">~48%</td><td class="n" style="color:var(--red)">~60%</td></tr>' +
      '<tr><td>Confirmed patterns that still fail their first 5%</td><td class="n" style="color:var(--green)">12–16%</td><td class="n" style="color:var(--red)">20–25%</td></tr>' +
      '<tr><td>Confirmed patterns that <b>bust</b> (break out, go almost nowhere, reverse through the far side)</td><td class="n" style="color:var(--green)">~20%</td><td class="n" style="color:var(--red)">~36%</td></tr>' +
      '</tbody></table>',
      '<p class="srcs">Bulkowski\'s data, daily stock charts, as always. The bust line is the one to sit with: better than one in three confirmed double tops fails <i>after</i> confirming.</p>',

      '<div class="callout good"><div class="ct">The busted M — often the better trade</div>' +
      '<p>Here is the twist in that 36%: when a confirmed double top busts — breaks down, travels less than 10%, then reverses back up through the pattern — the move that follows averages <b>bigger than the decline the M was supposed to deliver</b> (Bulkowski measured a 54% average rise after single busts, daily stocks). The failed M is not your enemy. Watched with cold eyes, it is a long setup: the sellers\' best shot, fully absorbed.</p></div>',

      '<div class="callout warn"><div class="ct">The M rules, upgraded</div>' +
      '<ul class="clean" style="margin:8px 0 0">' +
      '<li><b>Expect the sweep.</b> Plan for the second high to trade above the first. The entry works off the candle that fails back inside — never the touch of the old high.</li>' +
      '<li><b>Demand more evidence than a W</b> — the never-confirm and bust numbers earn it. Two rungs of the truth ladder minimum, plus the tide pointing down.</li>' +
      '<li><b>Take the first target briskly.</b> Drops move faster than rallies; the M\'s edge is speed, not distance.</li>' +
      '<li><b>Respect the failed M.</b> If a confirmed M breaks down, stalls, and reclaims the valley — stop shorting. You are probably looking at the next long.</li>' +
      '</ul></div>'
    ]; }
  });

  /* ==========================================================
     THE BOTTOM GRADER
     ========================================================== */
  L.push({
    id: "grader", part: "Practice", n: 22,
    title: "The Bottom Grader — score the chart in front of you",
    render: function () { return [
      '<div class="eyebrow">Chapter 22 · Practice</div>',
      '<h1>The Bottom Grader</h1>',
      '<p class="lead">The whole course as one panel. Answer honestly for the chart in front of you — the killer checks first, then the five gates — and it hands back a grade, a door, and a size, with its reasoning in plain sight. It grades the chart; it places nothing.</p>',
      { grader: true },
      '<div class="callout"><div class="ct">How to use it without fooling yourself</div>' +
      '<ul class="clean" style="margin:8px 0 0">' +
      '<li><b>Answer what the chart shows, not what you want.</b> If you have to squint to call the approach "quieter," it is not quieter.</li>' +
      '<li><b>The grader is deliberately stricter than your urge.</b> Most candidates should grade SKIP or WAIT — remember, roughly half of all W-shapes never confirm at all.</li>' +
      '<li><b>Log the grade with the trade.</b> After 20–30 graded reps, your own numbers will show which gates carry the weight on YOUR chart — that beats every study in this course.</li>' +
      '</ul></div>'
    ]; }
  });

  /* ==========================================================
     THE GRADER ITSELF
     ========================================================== */
  D.buildGrader = function () {
    var wrap = document.createElement("div");
    wrap.className = "card";

    function seg(id, label, opts) {
      var h = '<div class="calc-row" style="align-items:flex-start"><label style="min-width:230px;padding-top:6px">' + label + "</label>" +
              '<div class="q-opts" style="flex:1;margin:0;gap:6px" data-seg="' + id + '">';
      opts.forEach(function (o, k) {
        h += '<button class="q-opt" type="button" data-v="' + o.v + '" style="padding:8px 12px"><span class="k">' +
             "ABC".charAt(k) + '</span><span><b>' + o.t + "</b>" +
             (o.s ? '<br><span style="color:var(--mut);font-size:.8rem">' + o.s + "</span>" : "") + "</span></button>";
      });
      return h + "</div></div>";
    }

    wrap.innerHTML =
      '<div class="calc-row"><b style="font-family:var(--head);color:var(--gold)">Killer checks — any red and nothing else matters</b></div>' +
      seg("k1", "Is one side in total control (one-timeframing)?", [
        { v: "0", t: "No — two-sided tape" }, { v: "1", t: "Yes — every high lower (or low higher) than the last" }]) +
      seg("k2", "Is the clock clean?", [
        { v: "0", t: "Clean", s: "Not 11:30–1:30 · nothing scheduled inside the hold · not an FOMC minefield" },
        { v: "1", t: "Dirty" }]) +
      seg("k3", "Is the pattern tall enough to pay?", [
        { v: "0", t: "Yes — shelf to neckline ≥ 3× the average bar", s: "On M2K usually 4+ points" },
        { v: "1", t: "No — it lives inside the noise" }]) +
      '<div class="calc-row" style="margin-top:14px"><b style="font-family:var(--head);color:var(--gold)">The five gates</b></div>' +
      seg("g1", "1 · THE TIDE — is this a pullback in a bigger move your way?", [
        { v: "2", t: "Yes — Gate 1 solid (or blue arrow my way), and I can point at the bigger move" },
        { v: "1", t: "Mixed — yellow, or I cannot point at the move" },
        { v: "0", t: "No — the tide is against me" }]) +
      seg("g2", "2 · THE ADDRESS — is the shelf a level from before today?", [
        { v: "2", t: "Yes — I can name it out loud", s: "Prior day low/high · session level · 5-minute swing · big round number with company" },
        { v: "1", t: "Sort of — a minor level" },
        { v: "0", t: "No — it is just where price stopped" }]) +
      seg("g3", "3 · THE CANDLES — has the low shown rejection?", [
        { v: "2", t: "Yes — a tail / engulfing / stall, or an undercut already reclaimed" },
        { v: "1", t: "Not yet — still printing" },
        { v: "0", t: "The opposite — closing beyond the shelf and staying there" }]) +
      seg("g4", "4 · THE QUIET APPROACH — how did it come back to the shelf?", [
        { v: "2", t: "Quieter — smaller bars, lighter volume, more time than the first drop" },
        { v: "1", t: "About the same" },
        { v: "0", t: "Louder — bigger bars, rising volume" }]) +
      seg("g5", "5 · THE PROOF — what has the market proven?", [
        { v: "a", t: "A low candle printed — my order can sit above it (Door A)" },
        { v: "b", t: "Confirmed — two closes beyond the neckline, or a retest holding above it (Door B)" },
        { v: "0", t: "Nothing yet — price is still falling" }]) +
      '<div id="gr-out" style="margin-top:16px"></div>' +
      '<p class="srcs" style="margin-top:14px">This panel grades a chart. It places nothing, sizes nothing, and outranks nothing — your Plan A ladder, day stop and loss rules still govern. Grades are the course\'s rules made visible, not a measured win rate.</p>';

    var state = {};
    Array.prototype.forEach.call(wrap.querySelectorAll("[data-seg]"), function (segEl) {
      Array.prototype.forEach.call(segEl.querySelectorAll(".q-opt"), function (btn) {
        btn.onclick = function () {
          Array.prototype.forEach.call(segEl.querySelectorAll(".q-opt"), function (b) { b.classList.remove("right"); });
          btn.classList.add("right");
          state[segEl.getAttribute("data-seg")] = btn.getAttribute("data-v");
          grade();
        };
      });
    });

    function lamp(cls, head, body) {
      return '<div class="callout ' + cls + '" style="margin:0"><div class="ct">' + head + "</div>" + body + "</div>";
    }

    function grade() {
      var out = wrap.querySelector("#gr-out");
      var need = ["k1", "k2", "k3", "g1", "g2", "g3", "g4", "g5"].filter(function (k) { return !(k in state); });
      if (need.length) {
        out.innerHTML = '<div class="q-fb show" style="background:var(--panel2);border-left:4px solid var(--line2)">' +
          (8 - need.length) + " of 8 answered — keep going.</div>";
        return;
      }
      var reasons = [];
      if (state.k1 === "1") reasons.push("one-timeframing — reversal patterns fail as a class on trend days");
      if (state.k2 === "1") reasons.push("the clock is dirty — thin or news-bent tape manufactures fake shapes");
      if (state.k3 === "1") reasons.push("too small — entry, stop and target all live inside one candle’s noise");
      if (reasons.length) {
        out.innerHTML = lamp("bad", "NO TRADE — a killer check is red",
          "<p>" + reasons.join(" · ") + ".</p><p>No gate can rescue a killer. Walk away and keep the ammunition.</p>");
        return;
      }
      if (state.g1 === "0" || state.g2 === "0") {
        out.innerHTML = lamp("bad", "NO TRADE — the foundation gates are closed",
          "<p>" + (state.g1 === "0" ? "The tide is against you — a W against the tide is Brooks’s ~40% major-reversal bet at best, and that is with everything else perfect. " : "") +
          (state.g2 === "0" ? "The shelf is not a real level — a low in the middle of nowhere is just a low; there are no orders there to defend it." : "") + "</p>");
        return;
      }
      if (state.g3 === "0") {
        out.innerHTML = lamp("bad", "NO TRADE — the shelf is breaking, not holding",
          "<p>Price closing beyond the shelf and staying there is a breakdown, not a bottom. The undercut only becomes bullish when it is <b>reclaimed</b> — fast.</p>");
        return;
      }
      if (state.g5 === "0" || state.g3 === "1") {
        out.innerHTML = lamp("warn", "WAIT — the case is building, the proof is not in",
          "<p>Everything can be true except proof, and it is still not a trade. Let the low candle print, or let the neckline confirm. Set the alert, write the plan, and sit on your hands — the whole edge of this method is refusing to buy a falling price.</p>");
        return;
      }
      var score = (+state.g1) + (+state.g2) + (+state.g4);   /* g3 is 2 by here, g5 is a door */
      var greens = [state.g1, state.g2, state.g4].filter(function (v) { return v === "2"; }).length;
      var door = state.g5 === "a"
        ? "<b>Door A</b> — buy-stop 2 ticks above the low candle’s high, stop 2 ticks below its low, first money at the middle peak"
        : "<b>Door B</b> — the confirmed side: two closes beyond the neckline or the retest holding above it, stop a few ticks back through the line, runners to the measured move";
      if (greens === 3) {
        out.innerHTML = lamp("good", "A+ — this is the trade the whole course is about",
          "<p>All five gates open, no killers. " + door + ".</p>" +
          '<p style="margin-bottom:0">Size: your normal Plan A ladder. Then manage it by the book — the stop only ever tightens.</p>');
      } else if (greens === 2 && score >= 5) {
        out.innerHTML = lamp("good", "A− — a real trade, one soft spot",
          "<p>" + door + ".</p><p style=\"margin-bottom:0\">One gate answered “mixed” — take it at <b>reduced size</b> and demand the first target arrives on schedule (no first target in ~10 candles, scratch it).</p>");
      } else {
        out.innerHTML = lamp("warn", "SKIP — too many maybes",
          "<p>Nothing here is disqualified, but a stack of “sort of” answers is how 16% happens. The next A+ costs nothing to wait for.</p>");
      }
    }

    return wrap;
  };

  /* ==========================================================
     THE SPINE — single authority on order, numbering, parts
     ========================================================== */
  var SPINE = [
    ["why", "Start here"], ["dial", "Start here"],
    ["anatomy", "The story of a bottom"], ["story", "The story of a bottom"],
    ["them", "The story of a bottom"], ["adameve", "The story of a bottom"],
    ["woe", "The five gates"], ["tide", "The five gates"], ["before", "The five gates"],
    ["gate1", "The five gates"], ["decel", "The five gates"],
    ["checklist", "The moment"], ["undercut", "The moment"], ["ladder", "The moment"],
    ["doora", "The two doors"], ["doorb", "The two doors"], ["calc", "The two doors"],
    ["fails", "What goes wrong"], ["mdoctrine", "What goes wrong"],
    ["manage", "Managing it"],
    ["drill", "Practice"], ["grader", "Practice"], ["card", "Practice"], ["learn", "Practice"]
  ];
  var byId = {};
  L.forEach(function (l) { byId[l.id] = l; });
  var ordered = [];
  SPINE.forEach(function (row) {
    var l = byId[row[0]];
    if (l) { l.part = row[1]; ordered.push(l); delete byId[row[0]]; }
  });
  /* anything not named in the SPINE keeps existing but lands at the end */
  L.forEach(function (l) { if (byId[l.id]) { ordered.push(l); delete byId[l.id]; } });
  ordered.forEach(function (l, i) { l.n = i + 1; });
  L.length = 0;
  ordered.forEach(function (l) { L.push(l); });

})(window);
