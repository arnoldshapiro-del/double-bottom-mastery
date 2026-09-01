/* ============================================================
   examples.js — the teaching charts
   ------------------------------------------------------------
   Every chart is hand-authored to make ONE point. Real market
   context is kept (session times, M2K price territory, realistic
   volume behaviour) but these are illustrations, not recordings.
   ============================================================ */
(function (root) {
  "use strict";
  var D = root.DBM;
  var B = D.buildBars;
  var EX = D.ex = {};

  var GOLD = "#FBBF24", CYAN = "#22D3EE", PINK = "#EC4899",
      LIME = "#A3E635", ORANGE = "#FB923C", VIOLET = "#A78BFA",
      GREEN = "#4ADE80", RED = "#F43F5E";

  /* ============================================================
     1. ANATOMY OF THE W — the four points, named
     ============================================================ */
  EX.anatomy = function () {
    var bars = B({
      seed: 41, start: 2352.4, startTime: "09:44", unit: 0.95, baseVolume: 1500,
      legs: [
        { to: 2346.0, bars: 6, vol: "high",   energy: "drive", wickBias: "none" },
        { to: 2338.0, bars: 7, vol: "climax", energy: "drive", wickBias: "lower", tag: "L1" },
        { to: 2345.0, bars: 8, vol: "normal", energy: "grind", wickBias: "none",  tag: "MP" },
        { to: 2341.2, bars: 5, vol: "low",    energy: "grind", wickBias: "none" },
        { to: 2338.4, bars: 6, vol: "dry",    energy: "grind", wickBias: "lower", tag: "L2" },
        { to: 2345.2, bars: 7, vol: "high",   energy: "drive", wickBias: "none" },
        { to: 2352.6, bars: 9, vol: "high",   energy: "drive", wickBias: "none" }
      ]
    });
    var i1 = 12, iMP = 20, i2 = 31, iBrk = 36;
    return {
      title: "The four points of a W — that is the entire pattern",
      verdict: "good", verdictText: "TEXTBOOK",
      bars: bars, startAt: 1, speed: 300,
      stepIntro: "<b>Press Play.</b> Watch the four points arrive one at a time. Nothing else on this chart matters.",
      steps: [
        { at: 6,  text: "<b>Point 0 — the decline.</b> A W is a <i>reversal</i>. If there was no real decline first, there is nothing to reverse and no pattern here." },
        { at: 13, text: "<b>Point 1 — the first low (L1).</b> Heavy volume, wide bars, a long tail. Sellers finally overdid it. This is the price level everything else gets measured against." },
        { at: 21, text: "<b>Point 2 — the middle peak (MP).</b> Buyers took control, briefly. This peak is the <b>neckline</b>. It is the level that confirms the pattern, and it is Uni's first profit target." },
        { at: 32, text: "<b>Point 3 — the second low (L2).</b> Price came back — but look at the bars and the volume. Quieter. Smaller. That is the whole tell, and Chapter 11 is about nothing else." },
        { at: 37, text: "<b>Point 4 — the break.</b> A 2-minute <i>close</i> above the middle peak starts the confirmation — Uni\'s full intraday rule (and Murphy\'s) wants a <b>second candle to agree</b>. Before the close it was only a candidate." },
        { at: 43, text: "<b>And there it is — the W.</b> Decline, first low, middle peak, second low, break. Every chart in this course is a variation on those five strokes." }
      ],
      annotations: [
        { type: "level", price: 2338.2, label: "the low shelf", color: CYAN, style: "dash", showAt: 13 },
        { type: "level", price: 2345.1, label: "NECKLINE", color: GOLD, showAt: 21 },
        { type: "pivot", i: i1, side: "low", label: "L1 · first low", color: CYAN, showAt: 13 },
        { type: "pivot", i: iMP, side: "high", label: "MP · middle peak", color: GOLD, showAt: 21 },
        { type: "pivot", i: i2, side: "low", label: "L2 · second low", color: CYAN, showAt: 32 },
        { type: "vbar", i: i1, color: "rgba(236,72,153,.75)", label: "climax", showAt: 13 },
        { type: "vbar", i: i2, color: "rgba(163,230,53,.7)", label: "quiet", showAt: 32 },
        { type: "note", i: iBrk + 1, price: 2347.6, text: "close ABOVE the neckline = confirmed", color: LIME, showAt: 38 },
        { type: "measured", lowPrice: 2338.2, neckPrice: 2345.1, fromI: 31, label: "measured move → 2352.0", color: VIOLET, showAt: 40 },
        { type: "path", points: [{ i: 0, side: "high" }, { i: i1, side: "low" }, { i: iMP, side: "high" }, { i: i2, side: "low" }, { i: 41, side: "high" }],
          label: "THE W", labelI: 21, labelPrice: 2336.5, color: GOLD, showAt: 42 }
      ],
      caption: "<b>Four points, in order: decline → L1 → middle peak → L2 → break.</b> Miss any one of them and what you are looking at is not a double bottom. The distance from the low shelf up to the neckline is the pattern's <b>height</b> — here about 7 points, which on M2K is 70 ticks, or $35 a contract."
    };
  };

  /* ============================================================
     2. THE M — the mirror image
     ============================================================ */
  EX.theM = function () {
    var bars = B({
      seed: 77, start: 2331.0, startTime: "13:36", unit: 0.95, baseVolume: 1500,
      legs: [
        { to: 2337.4, bars: 7, vol: "high",   energy: "drive" },
        { to: 2344.0, bars: 6, vol: "climax", energy: "drive", wickBias: "upper", tag: "H1" },
        { to: 2337.6, bars: 8, vol: "normal", energy: "grind", tag: "MV" },
        { to: 2341.0, bars: 5, vol: "low",    energy: "grind" },
        { to: 2343.6, bars: 6, vol: "dry",    energy: "grind", wickBias: "upper", tag: "H2" },
        { to: 2337.2, bars: 6, vol: "high",   energy: "drive" },
        { to: 2330.4, bars: 9, vol: "climax", energy: "drive" }
      ]
    });
    return {
      title: "The M — same pattern, upside down, and it fails more often",
      verdict: "warn", verdictText: "HARDER",
      bars: bars, startAt: 1, speed: 300,
      stepIntro: "<b>Press Play.</b> Everything you learn about the W applies here — flipped.",
      steps: [
        { at: 14, text: "<b>H1 — the first high.</b> Buyers pushed, ran out, and left a tail on top." },
        { at: 22, text: "<b>MV — the middle valley.</b> This is the neckline for an M. A 2-minute close <i>below</i> it confirms." },
        { at: 33, text: "<b>H2 — the second high.</b> It failed to get through. Note the smaller bars and lighter volume — the same deceleration tell, upside down." },
        { at: 40, text: "<b>The break.</b> Close below the middle valley. And notice the speed — the drop away is faster and steeper than the W's rise was." },
        { at: 46, text: "<b>The M, traced.</b> Advance, first high, middle valley, second high, break. The W upside down — and the drop out of it is the fast part." }
      ],
      annotations: [
        { type: "level", price: 2343.9, label: "the high shelf", color: GOLD, style: "dash", showAt: 14 },
        { type: "level", price: 2337.5, label: "NECKLINE", color: CYAN, showAt: 22 },
        { type: "pivot", i: 12, side: "high", label: "H1", color: GOLD, showAt: 14 },
        { type: "pivot", i: 20, side: "low", label: "MV · middle valley", color: CYAN, showAt: 22 },
        { type: "pivot", i: 31, side: "high", label: "H2", color: GOLD, showAt: 33 },
        { type: "note", i: 41, price: 2333.5, text: "faster down than up", color: RED, showAt: 41 },
        { type: "path", points: [{ i: 0, side: "low" }, { i: 12, side: "high" }, { i: 20, side: "low" }, { i: 31, side: "high" }, { i: 44, side: "low" }],
          label: "THE M", labelI: 21, labelPrice: 2345.4, color: GOLD, showAt: 45 }
      ],
      caption: "<b>The M is the W's mirror — but the odds are worse.</b> On daily stock charts Bulkowski measured that about <b>63% of apparent double tops never confirm at all</b>, versus 44% of double bottoms; and once confirmed, tops fail their first 5% about 20–25% of the time versus 12–16% for bottoms. Trade Ms, but respect that they are the harder side."
    };
  };

  /* ============================================================
     3. THE DECELERATION TELL — the good second low
     ============================================================ */
  EX.decelGood = function () {
    var bars = B({
      seed: 23, start: 2349.0, startTime: "10:12", unit: 0.9, baseVolume: 1500,
      legs: [
        { to: 2340.0, bars: 9,  vol: "climax", energy: "drive", wickBias: "lower", tag: "L1" },
        { to: 2345.6, bars: 7,  vol: "normal", energy: "grind" },
        { to: 2342.6, bars: 5,  vol: "low",    energy: "grind" },
        { to: 2340.3, bars: 8,  vol: "dry",    energy: "stall", wickBias: "lower", tag: "L2" },
        { to: 2345.8, bars: 7,  vol: "high",   energy: "drive" }
      ]
    });
    return {
      title: "A second low that is QUIETER than the first — this is the one you want",
      verdict: "good",
      bars: bars, startAt: 1, speed: 320,
      stepIntro: "<b>Press Play</b> and watch the bars themselves, not the price.",
      steps: [
        { at: 9,  text: "<b>The first low was violent.</b> Wide bars, huge volume, a long tail. That is capitulation — sellers hitting the exit all at once." },
        { at: 22, text: "<b>Now the approach back down.</b> Look how small these bars are. Look how the volume has dried up. Price is <i>drifting</i> down, not being <i>driven</i> down." },
        { at: 29, text: "<b>The second low arrives on almost no volume.</b> Sellers have stopped showing up. It took more bars to get here and less force. <b>That is the deceleration tell.</b>" },
        { at: 34, text: "<b>And then it leaves loudly.</b> Quiet into the low, loud out of it. That combination is the signature." }
      ],
      annotations: [
        { type: "level", price: 2340.1, label: "the shelf", color: CYAN, style: "dash", showAt: 9 },
        { type: "pivot", i: 8, side: "low", label: "L1 — loud", color: PINK, showAt: 9 },
        { type: "pivot", i: 28, side: "low", label: "L2 — quiet", color: LIME, showAt: 29 },
        { type: "vbar", i: 8, color: "rgba(236,72,153,.8)", label: "climax", showAt: 9 },
        { type: "vbar", i: 28, color: "rgba(163,230,53,.8)", label: "dry", showAt: 29 },
        { type: "zone", y1: 2340.0, y2: 2341.4, fromI: 21, toI: 30, color: "rgba(163,230,53,.12)", label: "narrow, slow, low volume", textColor: LIME, showAt: 24 },
        { type: "note", i: 33, price: 2344.6, text: "loud OUT of the low", color: LIME, showAt: 33 }
      ],
      caption: "<b>Quiet in, loud out.</b> The second low should take <i>more time</i> and <i>less force</i> than the first. Narrower bars, lighter volume, a slower descent. Bulkowski's data agrees from a different angle: his rounded, slow \"Eve &amp; Eve\" double bottom is the best-performing variant of all four (12% failure, 50% average rise on daily stock charts) while the sharp spike-and-spike \"Adam &amp; Adam\" is the worst."
    };
  };

  /* ============================================================
     4. THE DECELERATION TELL — the bad second low
     ============================================================ */
  EX.decelBad = function () {
    var bars = B({
      seed: 88, start: 2349.0, startTime: "10:12", unit: 0.9, baseVolume: 1500,
      legs: [
        { to: 2340.0, bars: 9,  vol: "high",   energy: "drive", wickBias: "lower", tag: "L1" },
        { to: 2345.4, bars: 7,  vol: "normal", energy: "grind" },
        { to: 2342.0, bars: 4,  vol: "normal", energy: "drive" },
        { to: 2339.9, bars: 5,  vol: "climax", energy: "drive", wickBias: "none", tag: "L2" },
        { to: 2332.0, bars: 11, vol: "climax", energy: "drive" }
      ]
    });
    return {
      title: "The SAME shape — but the second low arrives with more force, not less",
      verdict: "bad",
      bars: bars, startAt: 1, speed: 320,
      stepIntro: "<b>Press Play.</b> This looks identical to the last chart until bar 21. Watch for the moment it stops being a double bottom.",
      steps: [
        { at: 9,  text: "<b>Same first low.</b> Wide bars, real volume. So far this is indistinguishable from the good one." },
        { at: 16, text: "<b>Same middle peak.</b> Still looks like a W forming. This is exactly where the eye says <i>'a bottom is forming.'</i>" },
        { at: 22, text: "<b>⚠ Here is the difference.</b> The bars coming down are getting <b>bigger</b>, not smaller. Volume is <b>rising</b>, not falling. Sellers are not exhausted — they are reloading." },
        { at: 25, text: "<b>The second low prints on climax volume with a wide body.</b> No tail, no rejection, no pause. Nobody is defending this level." },
        { at: 30, text: "<b>And it goes straight through.</b> This is the trade that cost you money 20 times. The shape was right. The <b>energy</b> was wrong." }
      ],
      annotations: [
        { type: "level", price: 2340.0, label: "the shelf", color: CYAN, style: "dash", showAt: 9 },
        { type: "pivot", i: 8, side: "low", label: "L1", color: CYAN, showAt: 9 },
        { type: "pivot", i: 24, side: "low", label: "L2 — LOUDER", color: RED, showAt: 25 },
        { type: "vbar", i: 8, color: "rgba(34,211,238,.7)", label: "big", showAt: 9 },
        { type: "vbar", i: 24, color: "rgba(244,63,94,.85)", label: "BIGGER", showAt: 25 },
        { type: "zone", y1: 2339.6, y2: 2343.2, fromI: 20, toI: 25, color: "rgba(244,63,94,.13)", label: "expanding range · expanding volume", textColor: RED, showAt: 22 },
        { type: "note", i: 31, price: 2336.0, text: "no support here — never was", color: RED, showAt: 31 }
      ],
      caption: "<b>Put this chart next to the one above it.</b> Same shape, opposite energy. A second low made with <i>expanding</i> range and <i>expanding</i> volume has failed the test before you ever risk a dollar. This is the single cheapest filter in the whole course: <b>if the approach to the second low is getting louder, there is no trade.</b>"
    };
  };

  /* ============================================================
     5. THE UNDERCUT AND RECLAIM — the best version there is
     ============================================================ */
  EX.undercut = function () {
    var bars = B({
      seed: 132, start: 2347.5, startTime: "09:58", unit: 0.85, baseVolume: 1500,
      legs: [
        { to: 2340.0, bars: 8,  vol: "high",   energy: "drive", wickBias: "lower", tag: "L1" },
        { to: 2345.4, bars: 7,  vol: "normal", energy: "grind" },
        { to: 2341.4, bars: 5,  vol: "low",    energy: "grind" },
        { to: 2339.1, bars: 4,  vol: "low",    energy: "grind", wickBias: "lower", tag: "SWEEP" },
        { to: 2341.6, bars: 3,  vol: "high",   energy: "drive" },
        { to: 2345.6, bars: 6,  vol: "high",   energy: "drive" },
        { to: 2350.0, bars: 7,  vol: "normal", energy: "drive" }
      ]
    });
    return {
      title: "The undercut and reclaim — price dips UNDER the first low, then takes it back",
      verdict: "good", verdictText: "BEST VERSION",
      bars: bars, startAt: 1, speed: 330,
      stepIntro: "<b>Press Play.</b> This one will look like a failure right up until the moment it becomes the best setup on the chart.",
      steps: [
        { at: 8,  text: "<b>First low at 2340.</b> Everyone watching this chart now has the same line drawn." },
        { at: 20, text: "<b>Coming back down, quietly.</b> Small bars, thin volume. So far, a normal second low." },
        { at: 24, text: "<b>⚠ It breaks the low.</b> Every stop sitting under 2340 just got filled. Every breakout seller just got short. This is the moment you would have given up." },
        { at: 26, text: "<b>But look at the volume on that break — it is LIGHT.</b> Nobody actually wanted to sell down there. The break had no participation behind it." },
        { at: 28, text: "<b>And now it is back above 2340, on heavy volume.</b> That is the reclaim. The people who sold the break are now trapped, and their buy-stops are fuel." },
        { at: 34, text: "<b>This is what a stop run looks like from the inside.</b> The undercut was not the pattern failing — it was the pattern clearing out the weak holders before it worked." }
      ],
      annotations: [
        { type: "level", price: 2340.0, label: "the line everyone drew", color: CYAN, showAt: 8 },
        { type: "pivot", i: 7, side: "low", label: "L1", color: CYAN, showAt: 8 },
        { type: "zone", y1: 2338.9, y2: 2340.0, fromI: 22, toI: 27, color: "rgba(236,72,153,.17)", label: "the sweep — stops taken", textColor: PINK, showAt: 24 },
        { type: "pivot", i: 23, side: "low", label: "L2 — undercut", color: PINK, showAt: 25 },
        { type: "vbar", i: 23, color: "rgba(236,72,153,.55)", label: "light!", showAt: 26 },
        { type: "vbar", i: 27, color: "rgba(163,230,53,.85)", label: "heavy", showAt: 28 },
        { type: "arrow", i: 24, price: 2339.2, toI: 28, toPrice: 2342.4, text: "RECLAIM", color: LIME, showAt: 28 },
        { type: "note", i: 33, price: 2347.0, text: "trapped sellers = fuel", color: LIME, showAt: 34 }
      ],
      caption: "<b>An undercut is not a disqualification — the data says it is an upgrade.</b> Bulkowski's study of the \"2B\" pattern found that when the second low dipped <b>4% or more below</b> the first, the average subsequent gain was <b>43%</b>, versus <b>32%</b> when the second low sat above the first. Wyckoff called this a <b>spring</b>. Linda Raschke built a whole published system on it called <b>Turtle Soup</b>. What makes it work is the volume: <b>light going through the low, heavy coming back</b>."
    };
  };

  /* ============================================================
     6. UNI'S ENTRY — 2 ticks above the high of the low candle
     ============================================================ */
  EX.uniEntry = function () {
    var bars = B({
      seed: 61, start: 2348.6, startTime: "10:26", unit: 0.85, baseVolume: 1500,
      legs: [
        { to: 2340.0, bars: 8,  vol: "climax", energy: "drive", wickBias: "lower", tag: "L1" },
        { to: 2346.0, bars: 7,  vol: "normal", energy: "grind" },
        { to: 2342.4, bars: 5,  vol: "low",    energy: "grind" },
        { to: 2340.2, bars: 6,  vol: "dry",    energy: "stall", wickBias: "lower", tag: "L2" },
        { to: 2343.4, bars: 4,  vol: "high",   energy: "drive" },
        { to: 2346.2, bars: 5,  vol: "high",   energy: "drive" },
        { to: 2351.4, bars: 8,  vol: "normal", energy: "drive" }
      ]
    });
    var iL2 = 25;
    return {
      title: "Door A — Uni's entry: 2 ticks above the high of the low candle",
      verdict: "good",
      bars: bars, startAt: 1, speed: 330,
      stepIntro: "<b>Press Play.</b> Watch for the candle that makes the second low — everything hangs off that one bar.",
      steps: [
        { at: 8,  text: "<b>First low: 2340.0.</b> Draw the line." },
        { at: 16, text: "<b>Middle peak: 2346.0.</b> Draw that line too. It is going to be your first target." },
        { at: 26, text: "<b>There it is — the low candle.</b> It made the second low at 2340.2 and its high is 2341.0. Quiet volume, small body, a tail underneath. That candle is now the whole trade." },
        { at: 27, text: "<b>The order:</b> a buy-stop <b>2 ticks above that candle's high</b> — 2341.2. You do not predict. You do not buy the low. You let price come and take you in." },
        { at: 28, text: "<b>Filled.</b> Stop goes 2 ticks under the low candle: 2340.0. In this drawn example the risk is <b>12 ticks</b>. On your own morning bars the candle is bigger and it usually measures nearer <b>28</b>. The rule is the stop coming off the candle, never a fixed number." },
        { at: 33, text: "<b>First target is the middle peak, 2346.0.</b> That is 48 ticks in this drawing. On your own recorded bars a typical morning base risks 28 to make 38 — about <b>1.4 to 1</b> — and that is still the best ratio of the whole trading day." }
      ],
      annotations: [
        { type: "level", price: 2340.1, label: "L1 shelf", color: CYAN, style: "dash", showAt: 8 },
        { type: "level", price: 2346.0, label: "MIDDLE PEAK = target 1", color: GOLD, showAt: 16 },
        { type: "pivot", i: 7, side: "low", label: "L1", color: CYAN, showAt: 8 },
        { type: "pivot", i: 15, side: "high", label: "MP", color: GOLD, showAt: 16 },
        { type: "pivot", i: iL2, side: "low", label: "the LOW CANDLE", color: LIME, showAt: 26 },
        { type: "note", i: iL2 + 2, price: 2338.1, text: "↑ everything hangs off this one bar", color: LIME, showAt: 26 },
        /* the bracket's own rulers now show the risk and the reward in ticks and dollars */
        { type: "trade", entry: 2341.2, stop: 2340.0, target: 2346.0, targetLabel: "TARGET 1", fromI: 26, showAt: 28 }
      ],
      caption: "<b>This is Uni's own rule, moved onto a 2-minute chart.</b> Her Bull Flag rule set says <i>\"trade 20 cents above the high of the low day\"</i> — on a daily chart. On the 2-minute, the low <i>day</i> becomes the low <i>candle</i>, and 20 cents becomes 2 ticks. Her rule #15 says the first profit target is <i>\"the initial previous high\"</i> — on a W, that is the middle peak. Linda Raschke published the identical logic in 1995 as <b>Turtle Soup</b>: a buy-stop just above the old low, so the trade only triggers if the new low is already failing."
    };
  };

  /* ============================================================
     7. DOOR B — the neckline entry, honestly drawn
     ============================================================ */
  EX.necklineEntry = function () {
    var bars = B({
      seed: 61, start: 2348.6, startTime: "10:26", unit: 0.85, baseVolume: 1500,
      legs: [
        { to: 2340.0, bars: 8,  vol: "climax", energy: "drive", wickBias: "lower", tag: "L1" },
        { to: 2346.0, bars: 7,  vol: "normal", energy: "grind" },
        { to: 2342.4, bars: 5,  vol: "low",    energy: "grind" },
        { to: 2340.2, bars: 6,  vol: "dry",    energy: "stall", wickBias: "lower", tag: "L2" },
        { to: 2343.4, bars: 4,  vol: "high",   energy: "drive" },
        { to: 2346.2, bars: 5,  vol: "high",   energy: "drive" },
        { to: 2351.4, bars: 8,  vol: "normal", energy: "drive" }
      ]
    });
    return {
      title: "Door B — wait for the close above the middle of the W",
      verdict: "warn", verdictText: "SAFER ENTRY, WORSE MATH",
      bars: bars, startAt: 1, speed: 330,
      stepIntro: "<b>Same chart as before.</b> This time you wait for proof.",
      steps: [
        { at: 26, text: "<b>The second low forms — and you do nothing.</b> No order. You are waiting for the market to prove it, not to promise it." },
        { at: 30, text: "<b>Still nothing.</b> Price is rallying but has not closed above the neckline. Uni is already 30 ticks in profit here. You are flat." },
        { at: 32, text: "<b>NOW.</b> A 2-minute candle closed above 2346.0. The pattern is confirmed — the single best-supported rule in all of chart-pattern research. You buy 2346.4." },
        { at: 33, text: "<b>But look where your stop has to go:</b> under the second low at 2340.0. That is <b>64 ticks of risk</b> — more than five times Uni's." },
        { at: 40, text: "<b>And your target?</b> The measured move is the height of the W added to the neckline: 2352.0. That is 56 ticks of reward for 64 ticks of risk. <b>Less than 1 to 1.</b>" }
      ],
      annotations: [
        { type: "level", price: 2340.1, label: "L1 shelf", color: CYAN, style: "dash", showAt: 8 },
        { type: "level", price: 2346.0, label: "NECKLINE", color: GOLD, showAt: 16 },
        { type: "pivot", i: 25, side: "low", label: "L2", color: CYAN, showAt: 26 },
        { type: "note", i: 28, price: 2343.2, text: "Uni is already long here", color: VIOLET, showAt: 30 },
        { type: "trade", entry: 2346.4, stop: 2340.0, target: 2352.0, targetLabel: "MEASURED MOVE", fromI: 31, showAt: 33 },
        { type: "measured", lowPrice: 2340.1, neckPrice: 2346.0, fromI: 31, label: "5.9 pts projected up", color: VIOLET, showAt: 40 }
      ],
      caption: "<b>Door B is the honest, textbook entry — and its arithmetic is brutal.</b> You get a much higher chance of being right, because you only trade patterns that actually confirmed. But you paid for that proof with the entire lower half of the move, and your stop is now five times wider. <b>Door B only works if you do NOT put the stop under the second low</b> — Chapter 16 shows the two ways to fix it."
    };
  };

  /* ============================================================
     8. FAILURE — no prior downtrend (range chop)
     ============================================================ */
  EX.failNoTrend = function () {
    var bars = B({
      seed: 205, start: 2343.0, startTime: "11:48", unit: 0.75, baseVolume: 900,
      legs: [
        { to: 2340.2, bars: 6, vol: "low", energy: "chop", wickBias: "lower" },
        { to: 2344.6, bars: 6, vol: "low", energy: "chop" },
        { to: 2340.4, bars: 7, vol: "dry", energy: "chop", wickBias: "lower" },
        { to: 2344.4, bars: 6, vol: "dry", energy: "chop" },
        { to: 2340.3, bars: 6, vol: "dry", energy: "chop", wickBias: "lower" },
        { to: 2343.8, bars: 6, vol: "dry", energy: "chop" },
        { to: 2340.5, bars: 6, vol: "dry", energy: "chop", wickBias: "lower" }
      ]
    });
    return {
      title: "FAILURE #1 — a 'double bottom' with nothing to reverse",
      verdict: "bad",
      bars: bars, startAt: 1, speed: 260,
      stepIntro: "<b>Press Play.</b> Count how many 'double bottoms' you can find in here.",
      steps: [
        { at: 13, text: "<b>There is your double bottom.</b> Two lows at 2340, a peak in between. Textbook. Buy it?" },
        { at: 25, text: "<b>And there is another one.</b> And another. In a sideways range, price touches the same low over and over — that is what a range <i>is</i>." },
        { at: 38, text: "<b>Nothing here was ever a reversal pattern</b>, because there was no trend to reverse. A W only means something at the <b>end of a decline</b>." }
      ],
      annotations: [
        { type: "level", price: 2340.3, label: "range low", color: CYAN, style: "dash", showAt: 8 },
        { type: "level", price: 2344.5, label: "range high", color: GOLD, style: "dash", showAt: 12 },
        { type: "zone", y1: 2340.3, y2: 2344.5, color: "rgba(148,163,184,.09)", label: "this is a RANGE, not a pattern", textColor: ORANGE, showAt: 14 },
        { type: "pivot", i: 5,  side: "low", label: "'L1'", color: CYAN, showAt: 13 },
        { type: "pivot", i: 18, side: "low", label: "'L2'", color: CYAN, showAt: 13 },
        { type: "pivot", i: 30, side: "low", label: "'L3'", color: ORANGE, showAt: 25 },
        { type: "pivot", i: 42, side: "low", label: "'L4'…", color: RED, showAt: 38 }
      ],
      caption: "<b>Early warning sign: ask \"what is this reversing?\" before you count the lows.</b> If the answer is \"nothing, it has been sideways for an hour,\" walk away. Researchers who study this call the underlying mistake <b>apophenia</b> — the brain finds patterns in noise because a pattern is cheaper to process than randomness. On a 2-minute chart, equal lows happen constantly by pure chance."
    };
  };

  /* ============================================================
     9. FAILURE — the trend day (one-timeframing)
     ============================================================ */
  EX.failTrendDay = function () {
    var bars = B({
      seed: 318, start: 2358.0, startTime: "09:36", unit: 1.05, baseVolume: 1900,
      legs: [
        { to: 2351.0, bars: 7, vol: "high",   energy: "drive" },
        { to: 2353.2, bars: 3, vol: "normal", energy: "grind" },
        { to: 2345.0, bars: 7, vol: "high",   energy: "drive" },
        { to: 2347.0, bars: 3, vol: "low",    energy: "grind" },
        { to: 2345.2, bars: 3, vol: "low",    energy: "stall", tag: "'L2'" },
        { to: 2337.0, bars: 8, vol: "climax", energy: "drive" },
        { to: 2339.4, bars: 3, vol: "low",    energy: "grind" },
        { to: 2330.0, bars: 8, vol: "high",   energy: "drive" }
      ]
    });
    return {
      title: "FAILURE #2 — every double bottom fails on a trend day",
      verdict: "bad",
      bars: bars, startAt: 1, speed: 250,
      stepIntro: "<b>Press Play.</b> There are three 'double bottoms' in this chart. All three lose.",
      steps: [
        { at: 10, text: "<b>Watch what each bounce does.</b> It rises for two or three bars and dies without ever taking out the previous high." },
        { at: 20, text: "<b>Here is a picture-perfect double bottom at 2345.</b> Two lows, a peak between them, a quiet second low. It has everything." },
        { at: 28, text: "<b>And it is gone.</b> Straight through, on climax volume." },
        { at: 34, text: "<b>The name for this day is 'one-timeframing.'</b> Every bar's high is lower than the last bar's high. Sellers never give the buyers a two-sided fight — and a W <i>requires</i> a two-sided fight to exist." }
      ],
      annotations: [
        { type: "line", i1: 2, p1: 2355.5, i2: 40, p2: 2331.0, color: RED, style: "dash", weight: 2, showAt: 12 },
        { type: "pivot", i: 13, side: "low", label: "'L1'", color: CYAN, showAt: 20 },
        { type: "pivot", i: 22, side: "low", label: "'L2'", color: CYAN, showAt: 20 },
        { type: "note", i: 20, price: 2349.5, text: "looks perfect", color: ORANGE, showAt: 20 },
        { type: "note", i: 29, price: 2340.0, text: "and it just keeps going", color: RED, showAt: 28 },
        { type: "note", i: 10, price: 2356.0, text: "every high lower than the last = ONE-TIMEFRAMING", color: RED, showAt: 34 }
      ],
      caption: "<b>The single most valuable filter in this course.</b> Before you look for a W, look at the last ten bars: is each high lower than the one before it, with no real pullbacks? That is a trend day, and it is roughly <b>one session in ten</b>. On those days reversal patterns do not fail occasionally — they fail as a class, because the market never rotates back to build the right side of the W. <b>Check this first. It costs you five seconds.</b>"
    };
  };

  /* ============================================================
     10. FAILURE — the third tap
     ============================================================ */
  EX.failThirdTap = function () {
    var bars = B({
      seed: 412, start: 2348.0, startTime: "10:44", unit: 0.85, baseVolume: 1400,
      legs: [
        { to: 2341.0, bars: 8, vol: "high",   energy: "drive", wickBias: "lower" },
        { to: 2345.8, bars: 6, vol: "normal", energy: "grind" },
        { to: 2341.2, bars: 7, vol: "low",    energy: "grind", wickBias: "lower" },
        { to: 2344.6, bars: 5, vol: "low",    energy: "grind" },
        { to: 2341.1, bars: 6, vol: "dry",    energy: "grind", wickBias: "lower" },
        { to: 2343.6, bars: 4, vol: "dry",    energy: "stall" },
        { to: 2336.5, bars: 9, vol: "high",   energy: "drive" }
      ]
    });
    return {
      title: "FAILURE #3 — the third tap, and Uni's 'master chess player' question",
      verdict: "bad",
      bars: bars, startAt: 1, speed: 290,
      stepIntro: "<b>Press Play.</b> The pattern is real. The trade still loses. Watch why.",
      steps: [
        { at: 15, text: "<b>Two lows at 2341, quiet second one.</b> Everything the checklist wants." },
        { at: 22, text: "<b>The rally comes — but it fails BELOW the middle peak.</b> It never closed above 2345.8. The pattern never confirmed." },
        { at: 28, text: "<b>Third tap.</b> Now what is this? Uni's question: <i>'Was there an equal or higher low? What other pattern could this be forming?'</i>" },
        { at: 32, text: "<b>The answer was a rectangle, and then a breakdown.</b> Each rally topped out lower than the last — the buyers were getting weaker, not stronger." }
      ],
      annotations: [
        { type: "level", price: 2341.1, label: "the shelf", color: CYAN, showAt: 8 },
        { type: "level", price: 2345.8, label: "neckline — never closed above", color: GOLD, style: "dash", showAt: 15 },
        { type: "pivot", i: 7,  side: "low", label: "1", color: CYAN, showAt: 8 },
        { type: "pivot", i: 20, side: "low", label: "2", color: CYAN, showAt: 15 },
        { type: "pivot", i: 31, side: "low", label: "3", color: ORANGE, showAt: 28 },
        { type: "line", i1: 14, p1: 2345.8, i2: 35, p2: 2343.4, color: RED, style: "dash", showAt: 32 },
        { type: "note", i: 25, price: 2347.4, text: "lower high…", color: ORANGE, showAt: 25 },
        { type: "note", i: 35, price: 2346.2, text: "…and lower again", color: RED, showAt: 32 }
      ],
      caption: "<b>Uni's own words on this exact situation:</b> <i>\"If price does not break the support level, but bounces off of it, we need to think like a master chess player. Was there an equal or higher low? What other pattern could this be forming?\"</i> And then the follow-up she writes on every one of these slides: <i>\"If there is no break, is it a rectangle?\"</i> This is why the neckline close matters — it is the line between a pattern and a hope."
    };
  };

  /* ============================================================
     11. FAILURE — the bull trap at the neckline
     ============================================================ */
  EX.failBullTrap = function () {
    var bars = B({
      seed: 519, start: 2349.0, startTime: "14:06", unit: 0.85, baseVolume: 1400,
      legs: [
        { to: 2341.0, bars: 8, vol: "high",   energy: "drive", wickBias: "lower" },
        { to: 2346.4, bars: 6, vol: "normal", energy: "grind" },
        { to: 2341.4, bars: 7, vol: "low",    energy: "grind", wickBias: "lower" },
        { to: 2347.2, bars: 6, vol: "dry",    energy: "grind", wickBias: "upper" },
        { to: 2344.0, bars: 4, vol: "normal", energy: "drive" },
        { to: 2338.0, bars: 9, vol: "high",   energy: "drive" }
      ]
    });
    return {
      title: "FAILURE #4 — it broke out, you bought it, and it snapped straight back",
      verdict: "bad",
      bars: bars, startAt: 1, speed: 300,
      stepIntro: "<b>Press Play.</b> This one does everything right — and still loses. There is one tell.",
      steps: [
        { at: 15, text: "<b>Clean W.</b> Real decline before it, quiet second low, proper middle peak at 2346.4." },
        { at: 26, text: "<b>The breakout close.</b> Above the neckline. Confirmed. By every rule in the book this is the trade." },
        { at: 27, text: "<b>⚠ But look at the volume on that breakout bar.</b> It is <i>lighter</i> than average. Nobody came. A real break brings participation with it." },
        { at: 31, text: "<b>Back below the neckline within four bars.</b> That is a bull trap — and the buy-stops it triggered are now the fuel for the move down." },
        { at: 36, text: "<b>Also look at the clock: 2:06pm.</b> A late-afternoon breakout into thin conditions is a different animal from a 10am one." }
      ],
      annotations: [
        { type: "level", price: 2341.2, label: "the shelf", color: CYAN, style: "dash", showAt: 8 },
        { type: "level", price: 2346.4, label: "NECKLINE", color: GOLD, showAt: 15 },
        { type: "vbar", i: 25, color: "rgba(251,146,60,.85)", label: "thin", showAt: 27 },
        { type: "note", i: 25, price: 2348.6, text: "breakout on LIGHT volume", color: ORANGE, showAt: 27 },
        { type: "arrow", i: 27, price: 2347.4, toI: 31, toPrice: 2343.6, text: "TRAP", color: RED, showAt: 31 },
        { type: "note", i: 36, price: 2340.0, text: "buyers from the break are now trapped sellers", color: RED, showAt: 36 }
      ],
      caption: "<b>The tell was the volume on the breakout bar.</b> Uni's rule is <b>\"increased volume as price is breaking resistance\"</b>, and she puts a number on it elsewhere: <b>breakout volume 150% above average</b>. A break that arrives on below-average volume has no participation behind it, and obvious levels are exactly where stop-hunting lives. <b>Honest footnote:</b> Bulkowski's data complicates this — on daily stock charts some double-bottom variants actually performed <i>better</i> on below-average breakout volume. On a 2-minute futures chart, where a break is a real-time liquidity event, take the volume seriously."
    };
  };

  /* ============================================================
     12. FAILURE — too small to pay
     ============================================================ */
  EX.failTooSmall = function () {
    var bars = B({
      seed: 640, start: 2344.4, startTime: "12:14", unit: 0.42, baseVolume: 620,
      legs: [
        { to: 2342.6, bars: 7,  vol: "low", energy: "grind", wickBias: "lower" },
        { to: 2343.7, bars: 5,  vol: "dry", energy: "chop" },
        { to: 2342.7, bars: 6,  vol: "dry", energy: "chop", wickBias: "lower" },
        { to: 2343.9, bars: 6,  vol: "dry", energy: "chop" },
        { to: 2342.5, bars: 6,  vol: "dry", energy: "chop", wickBias: "lower" },
        { to: 2343.4, bars: 8,  vol: "dry", energy: "chop" }
      ]
    });
    return {
      title: "FAILURE #5 — a perfect W that is too small to pay you",
      verdict: "bad",
      bars: bars, startAt: 1, speed: 240,
      stepIntro: "<b>Press Play.</b> The shape is flawless. The trade is still impossible.",
      steps: [
        { at: 13, text: "<b>A textbook W.</b> Two lows at 2342.6, middle peak at 2343.7. Every box ticked." },
        { at: 20, text: "<b>Now measure it.</b> The whole pattern is 1.1 points tall — <b>11 ticks</b>. Your stop needs to be a few ticks under the low, and your first target is 11 ticks away." },
        { at: 26, text: "<b>The bars themselves are 4 to 5 ticks tall.</b> The entire pattern is barely two candles high. There is no room between entry, a sane stop, and the target." },
        { at: 32, text: "<b>And it is 12:14 in the afternoon.</b> Lunchtime, thin volume — the exact conditions that manufacture patterns like this one out of pure noise." }
      ],
      annotations: [
        { type: "level", price: 2342.6, label: "L1/L2 — 11 ticks apart from the peak", color: CYAN, style: "dash", showAt: 13 },
        { type: "level", price: 2343.75, label: "'neckline'", color: GOLD, style: "dash", showAt: 13 },
        { type: "zone", y1: 2342.6, y2: 2343.75, color: "rgba(251,146,60,.13)", label: "the whole pattern lives in here", textColor: ORANGE, showAt: 20 },
        { type: "note", i: 24, price: 2345.0, text: "1.1 points tall · bars are 0.5 points", color: ORANGE, showAt: 26 },
        { type: "note", i: 33, price: 2341.6, text: "12:14pm — lunch chop", color: RED, showAt: 32 }
      ],
      caption: "<b>The working rule: the W must be at least three times the height of a typical bar, or there is no trade.</b> Measure the average range of the last ten 2-minute bars. If the distance from the low shelf to the middle peak is not comfortably bigger than three of those, the pattern is inside the noise. Bulkowski put it bluntly for daily charts: <i>\"always trade tall patterns and ignore short ones.\"</i>"
    };
  };

  /* ============================================================
     13. FAILURE — the anticipation error
     ============================================================ */
  EX.failAnticipate = function () {
    var bars = B({
      seed: 733, start: 2352.0, startTime: "10:04", unit: 0.95, baseVolume: 1600,
      legs: [
        { to: 2344.0, bars: 8,  vol: "high",   energy: "drive", wickBias: "lower" },
        { to: 2349.0, bars: 6,  vol: "normal", energy: "grind" },
        { to: 2345.4, bars: 5,  vol: "normal", energy: "drive" },
        { to: 2344.2, bars: 3,  vol: "normal", energy: "drive" },
        { to: 2338.0, bars: 8,  vol: "climax", energy: "drive" },
        { to: 2334.0, bars: 6,  vol: "high",   energy: "drive" }
      ]
    });
    return {
      title: "FAILURE #6 — buying because it 'should' hold. This is the big one.",
      verdict: "bad", verdictText: "THE 80% KILLER",
      bars: bars, startAt: 1, speed: 300,
      stepIntro: "<b>Press Play.</b> Stop the chart the moment you would have bought.",
      steps: [
        { at: 8,  text: "<b>First low at 2344.</b> Good, heavy, climactic." },
        { at: 14, text: "<b>Bounce to 2349.</b> A real middle peak. So far this is a perfectly good W candidate." },
        { at: 21, text: "<b>Price comes back toward 2344 — and here is the moment.</b> The level is <i>right there</i>. It held last time. Every instinct says buy it." },
        { at: 22, text: "<b>⚠ But nothing has turned yet.</b> There is no low candle, no higher low, no reclaim. You would be buying a <b>falling</b> price on the theory that it is about to stop falling." },
        { at: 30, text: "<b>It did not stop.</b> The second low never formed at all — price went straight through on climax volume and kept going." },
        { at: 36, text: "<b>You cannot know a low is the second low until price turns away from it.</b> Uni does not buy at the low. She buys 2 ticks above the high of a candle that has <i>already stopped going down</i>." }
      ],
      annotations: [
        { type: "level", price: 2344.1, label: "the level that 'should' hold", color: CYAN, showAt: 8 },
        { type: "level", price: 2349.0, label: "middle peak", color: GOLD, style: "dash", showAt: 14 },
        { type: "note", i: 21, price: 2347.6, text: "◀ the moment you want to buy", color: ORANGE, showAt: 21 },
        { type: "zone", y1: 2343.0, y2: 2345.4, fromI: 19, toI: 24, color: "rgba(251,146,60,.14)", label: "no turn has happened yet", textColor: ORANGE, showAt: 22 },
        { type: "arrow", i: 24, price: 2343.6, toI: 30, toPrice: 2338.6, text: "no second low — ever", color: RED, showAt: 30 }
      ],
      caption: "<b>If you fix one thing, fix this one.</b> Bulkowski measured that on daily stock charts, <b>44–50% of apparent double bottoms never confirm at all</b> — they simply never close above the middle peak. Anticipating the second low means taking that entire failure rate onto your account, on every trade. There is a way to survive entering early — it is the tiny stop — and that is the whole subject of Chapter 15."
    };
  };

  /* ============================================================
     14. ADAM vs EVE — the shape of the low matters
     ============================================================ */
  EX.adamEve = function () {
    var bars = B({
      seed: 850, start: 2350.0, startTime: "09:52", unit: 0.85, baseVolume: 1500,
      legs: [
        { to: 2341.0, bars: 7,  vol: "climax", energy: "drive", wickBias: "lower", tag: "ADAM" },
        { to: 2347.0, bars: 6,  vol: "normal", energy: "grind" },
        { to: 2343.4, bars: 5,  vol: "low",    energy: "grind" },
        { to: 2341.6, bars: 4,  vol: "dry",    energy: "stall" },
        { to: 2341.3, bars: 6,  vol: "dry",    energy: "stall" },
        { to: 2342.4, bars: 4,  vol: "dry",    energy: "stall", tag: "EVE" },
        { to: 2347.4, bars: 6,  vol: "high",   energy: "drive" },
        { to: 2353.0, bars: 8,  vol: "normal", energy: "drive" }
      ]
    });
    return {
      title: "Adam and Eve — a sharp spike low and a wide rounded low",
      verdict: "good",
      bars: bars, startAt: 1, speed: 300,
      stepIntro: "<b>Press Play.</b> The two lows are at the same price but they are not the same thing.",
      steps: [
        { at: 8,  text: "<b>That is an ADAM low.</b> One sharp plunge, a long tail, straight back up. Narrow and pointed — a panic, over in a couple of bars." },
        { at: 26, text: "<b>And that is an EVE low.</b> Wide, rounded, flat-bottomed. It took fifteen bars to do what Adam did in two. Selling was absorbed slowly instead of exploding." },
        { at: 34, text: "<b>Eve lows test better.</b> Bulkowski's best-performing double bottom of all four combinations is Eve &amp; Eve — the slow, rounded one on both sides." }
      ],
      annotations: [
        { type: "level", price: 2341.2, label: "same price, different character", color: CYAN, style: "dash", showAt: 8 },
        { type: "pivot", i: 6, side: "low", label: "ADAM — sharp", color: PINK, showAt: 8 },
        { type: "zone", y1: 2341.0, y2: 2342.6, fromI: 17, toI: 28, color: "rgba(163,230,53,.13)", label: "EVE — wide and rounded", textColor: LIME, showAt: 26 },
        { type: "note", i: 12, price: 2338.6, text: "2 bars", color: PINK, showAt: 9 },
        { type: "note", i: 23, price: 2338.6, text: "15 bars", color: LIME, showAt: 27 }
      ],
      caption: "<b>Adam is a spike. Eve is a bowl.</b> On daily stock charts Bulkowski ranked all four combinations: <b>Eve &amp; Eve is best</b> (12% failure, 50% average rise), <b>Adam &amp; Adam is worst</b> (16% failure, 39% average rise). He reports it as a measured fact without claiming a mechanism — but it lines up exactly with the deceleration idea: a wide, slow, boring low means supply was genuinely absorbed, while a single panic spike means one flush and nothing more."
    };
  };

  /* ============================================================
     15. THE COMPLETE TRADE — everything together
     ============================================================ */
  EX.fullTrade = function () {
    var bars = B({
      seed: 951, start: 2354.0, startTime: "10:08", unit: 0.9, baseVolume: 1600,
      legs: [
        { to: 2346.2, bars: 9,  vol: "high",   energy: "drive" },
        { to: 2342.0, bars: 5,  vol: "climax", energy: "drive", wickBias: "lower", tag: "L1" },
        { to: 2348.4, bars: 8,  vol: "normal", energy: "grind" },
        { to: 2344.6, bars: 5,  vol: "low",    energy: "grind" },
        { to: 2341.6, bars: 6,  vol: "dry",    energy: "grind", wickBias: "lower", tag: "L2" },
        { to: 2344.2, bars: 3,  vol: "high",   energy: "drive" },
        { to: 2348.6, bars: 5,  vol: "high",   energy: "drive" },
        { to: 2346.6, bars: 4,  vol: "low",    energy: "grind", tag: "retest" },
        { to: 2352.0, bars: 7,  vol: "normal", energy: "drive" },
        { to: 2355.4, bars: 6,  vol: "normal", energy: "drive" }
      ]
    });
    return {
      title: "The whole trade, start to finish",
      verdict: "good",
      bars: bars, startAt: 1, speed: 300,
      aspect: 0.56,
      stepIntro: "<b>Press Play.</b> Every idea in this course, on one chart.",
      steps: [
        { at: 14, text: "<b>1 — A real decline into a real low.</b> Climax volume at 2342.0. Draw the shelf." },
        { at: 22, text: "<b>2 — Middle peak at 2348.4.</b> Draw it. That is the neckline, and it is target one." },
        { at: 32, text: "<b>3 — The quiet return.</b> Six bars, dry volume, a small undercut of the shelf and a tail. Sellers are done." },
        { at: 34, text: "<b>4 — ENTRY.</b> 2 ticks above the low candle's high: 2342.6. Stop 2 ticks under the low: 2341.4 &mdash; 12 ticks in this drawing." },
        { at: 40, text: "<b>5 — TARGET 1 pays at the neckline, 2348.4.</b> 58 ticks on 12 ticks of risk in this example. Take the first piece off here — this is Uni's rule #15, the previous high is the first target." },
        { at: 44, text: "<b>6 — The retest.</b> Uni: <i>\"70% of breakouts will test the breakout level.\"</i> This pullback is normal — and it is the second-chance entry for anyone who missed the first one." },
        { at: 51, text: "<b>7 — The measured move.</b> Pattern height 6.4 points added to the neckline: 2354.8. The runners work up to there." }
      ],
      annotations: [
        { type: "level", price: 2341.9, label: "the shelf", color: CYAN, style: "dash", showAt: 14 },
        { type: "level", price: 2348.4, label: "NECKLINE = target 1", color: GOLD, showAt: 22 },
        { type: "pivot", i: 13, side: "low", label: "L1", color: CYAN, showAt: 14 },
        { type: "pivot", i: 21, side: "high", label: "MP", color: GOLD, showAt: 22 },
        { type: "pivot", i: 31, side: "low", label: "L2", color: LIME, showAt: 32 },
        { type: "vbar", i: 13, color: "rgba(236,72,153,.8)", label: "climax", showAt: 14 },
        { type: "vbar", i: 31, color: "rgba(163,230,53,.8)", label: "dry", showAt: 32 },
        { type: "trade", entry: 2342.6, stop: 2341.4, target: 2348.4, targetLabel: "TARGET 1", fromI: 32, showAt: 34 },
        { type: "note", i: 44, price: 2345.4, text: "the 70% retest", color: VIOLET, showAt: 44 },
        { type: "measured", lowPrice: 2341.9, neckPrice: 2348.4, fromI: 40, label: "measured move 2354.8", color: VIOLET, showAt: 51 }
      ],
      caption: "<b>In this example: risk 12 ticks, first target 58, measured move 122.</b> Your own bars run smaller &mdash; median 28 risk against a 38-tick first target. On M2K that is $6 of risk a contract to make $29 at target one and $61 if the runners reach the measured move. This is the trade you watched Uni take — and the reason it looked easy is that she never had much at stake."
    };
  };

  /* ============================================================
     16. SIDE BY SIDE — the same setup that fails, for the drill
     ============================================================ */
  EX.pairFail = function () {
    var bars = B({
      seed: 1077, start: 2354.0, startTime: "10:08", unit: 0.9, baseVolume: 1600,
      legs: [
        { to: 2346.2, bars: 9,  vol: "high",   energy: "drive" },
        { to: 2342.0, bars: 5,  vol: "climax", energy: "drive", wickBias: "lower", tag: "L1" },
        { to: 2348.4, bars: 8,  vol: "normal", energy: "grind" },
        { to: 2345.0, bars: 4,  vol: "normal", energy: "drive" },
        { to: 2342.2, bars: 5,  vol: "high",   energy: "drive", tag: "L2?" },
        { to: 2336.0, bars: 9,  vol: "climax", energy: "drive" },
        { to: 2332.0, bars: 6,  vol: "high",   energy: "drive" }
      ]
    });
    return {
      title: "The near-miss — put this beside the chart above",
      verdict: "bad",
      bars: bars, startAt: 1, speed: 300,
      stepIntro: "<b>Press Play.</b> Identical opening. One difference decides it.",
      steps: [
        { at: 14, text: "<b>Same first low, same climax.</b> Bar for bar, this is the winning chart." },
        { at: 22, text: "<b>Same middle peak at 2348.4.</b> Still identical." },
        { at: 28, text: "<b>⚠ Here.</b> The approach to the second low is on <b>rising</b> volume with <b>bigger</b> bars, and there is no tail, no pause, no undercut-and-reclaim. That is the only difference — and it is enough." },
        { at: 34, text: "<b>Straight through.</b> Same shape, opposite energy, opposite outcome." }
      ],
      annotations: [
        { type: "level", price: 2341.9, label: "the shelf", color: CYAN, style: "dash", showAt: 14 },
        { type: "level", price: 2348.4, label: "neckline", color: GOLD, style: "dash", showAt: 22 },
        { type: "pivot", i: 13, side: "low", label: "L1", color: CYAN, showAt: 14 },
        { type: "vbar", i: 13, color: "rgba(236,72,153,.8)", label: "climax", showAt: 14 },
        { type: "vbar", i: 30, color: "rgba(244,63,94,.85)", label: "RISING", showAt: 28 },
        { type: "zone", y1: 2341.8, y2: 2345.2, fromI: 26, toI: 31, color: "rgba(244,63,94,.13)", label: "loud into the low = no trade", textColor: RED, showAt: 28 }
      ],
      caption: "<b>Learning a category needs the near-misses, not just the winners.</b> This is why courses that only show you clean examples do not work — every double bottom in a textbook is, by construction, one that worked. The losers were never photographed."
    };
  };

  /* ============================================================
     17. TWO STOPS — the diagnosis, animated (Chapter 1)
     Same entry, Uni's stop and the platform's stop on one chart,
     on one of the ~half of Ws that never confirm. Indices were
     computed from the seeded bars: L1 = 12, MP = 19, the low
     candle = 30 (h 2339.0 / l 2338.2), fill at bar 32, the candle
     stop is hit at bar 35, the default stop at bar 40.
     ============================================================ */
  EX.twoStops = function () {
    var bars = B({
      seed: 311, start: 2352.0, startTime: "09:48", unit: 0.95, baseVolume: 1500,
      legs: [
        { to: 2346.2, bars: 6, vol: "high",   energy: "drive" },
        { to: 2339.0, bars: 7, vol: "climax", energy: "drive", wickBias: "lower", tag: "L1" },
        { to: 2344.8, bars: 7, vol: "normal", energy: "grind", tag: "MP" },
        { to: 2341.8, bars: 5, vol: "low",    energy: "grind" },
        { to: 2338.3, bars: 6, vol: "dry",    energy: "stall", wickBias: "lower", tag: "L2" },
        { to: 2340.0, bars: 3, vol: "normal", energy: "grind" },
        { to: 2337.0, bars: 4, vol: "normal", energy: "drive" },
        { to: 2332.6, bars: 7, vol: "climax", energy: "drive" },
        { to: 2333.8, bars: 4, vol: "low",    energy: "grind" }
      ]
    });
    var ENTRY = 2339.2, STOP_A = 2338.0, STOP_B = 2334.2, NECK = 2345.0, SHELF = 2338.0;
    return {
      title: "Same entry, two stops — on one of the half that never confirm",
      verdict: "bad", verdictText: "THE DIAGNOSIS",
      bars: bars, startAt: 1, speed: 320,
      stepIntro: "<b>Press Play.</b> This is the trade you took twenty times, with both stops drawn on it.",
      steps: [
        { at: 13, text: "<b>The first low.</b> Climax volume, a long tail. Same as every W you have ever seen." },
        { at: 20, text: "<b>The middle peak — the neckline.</b> Seven points above the shelf. A real pattern with a real target." },
        { at: 31, text: "<b>The second low — and it looks right.</b> Smaller bars, drying volume, a quiet close. This is a legitimate Door A candidate. Uni would put a buy-stop 2 ticks above this candle's high, at 2339.2. So did you." },
        { at: 33, text: "<b>Filled.</b> Now the only question that matters: where is the stop? Uni's is 2 ticks under the low candle — 2338.0, <b>12 ticks</b>, $6.00 a contract. The platform's default sat <b>50 ticks</b> down at 2334.2 — $25.00 a contract. Same entry. Same chart." },
        { at: 36, text: "<b>Bar 35: the candle stop is hit.</b> −12 ticks, −$6.00. Annoying. Survivable. About half of all Ws never confirm, and this is one of them. You are out, flat, and able to think." },
        { at: 41, text: "<b>Five bars later the platform's stop is hit.</b> −50 ticks, −$25.00. Same entry, same chart, same call — four times the loss, and you sat through every bar of it hoping." },
        { at: 49, text: "<b>That is the 80%.</b> Not the chart-reading. The stop. Fix the stop and this exact trade becomes a small, boring loss you can take twenty times and shrug at." }
      ],
      annotations: [
        { type: "level", price: SHELF, label: "the shelf", color: CYAN, style: "dash", showAt: 13 },
        { type: "level", price: NECK, label: "NECKLINE", color: GOLD, showAt: 20 },
        { type: "pivot", i: 12, side: "low", label: "L1 · loud", color: CYAN, showAt: 13 },
        { type: "pivot", i: 19, side: "high", label: "MP · middle peak", color: GOLD, showAt: 20 },
        { type: "pivot", i: 30, side: "low", label: "L2 · quiet", color: LIME, showAt: 31 },
        { type: "vbar", i: 12, color: "rgba(236,72,153,.75)", label: "climax", showAt: 13 },
        { type: "vbar", i: 30, color: "rgba(163,230,53,.7)", label: "dry", showAt: 31 },
        { type: "trade", entry: ENTRY, stop: STOP_A, target: NECK, targetLabel: "TARGET 1 · neckline", fromI: 32, showAt: 32 },
        { type: "level", price: STOP_B, label: "PLATFORM DEFAULT −50", color: ORANGE, style: "dash", fromI: 32, showAt: 32 },
        { type: "ruler", i: 46, p1: ENTRY, p2: STOP_B, color: ORANGE, side: "left", label: "50 ticks · $25.00 — the default", labelY: 2338.5, showAt: 32 },
        { type: "note", i: 37, price: 2343.6, text: "bar 35: candle stop hit, −12 ticks, −$6.00", color: RED, showAt: 35 },
        { type: "note", i: 40, price: 2331.3, text: "stopped out: −50 ticks, −$25.00", color: ORANGE, showAt: 40 }
      ],
      caption: "<b>Twelve ticks or fifty — that was the entire difference.</b> On this drawn example the candle stop is 12 ticks ($6.00 a contract) and the platform's default is 50 ($25.00). On your own morning bars the candle stop measured about 28 ticks — bigger bars, same principle: the stop comes off the candle, not off the platform, and it is always a fraction of the default. Both stops lost here. Only one of them you can afford to lose twenty times."
    };
  };

  /* ============================================================
     THE STORY OF A BOTTOM — Wyckoff's whole map on one chart
     (added 2026-09-01 rebuild)
     ============================================================ */
  EX.wyckoffStory = function () {
    var bars = B({
      seed: 501, start: 2358.0, startTime: "09:32", unit: 0.95, baseVolume: 1600,
      legs: [
        { to: 2348.0, bars: 7, vol: "high",   energy: "drive" },
        { to: 2341.0, bars: 5, vol: "climax", energy: "drive", wickBias: "lower", tag: "SC" },
        { to: 2348.4, bars: 6, vol: "high",   energy: "drive", tag: "AR" },
        { to: 2342.8, bars: 6, vol: "low",    energy: "grind", wickBias: "lower", tag: "ST" },
        { to: 2346.4, bars: 5, vol: "low",    energy: "chop" },
        { to: 2343.2, bars: 5, vol: "dry",    energy: "chop" },
        { to: 2340.2, bars: 4, vol: "low",    energy: "grind", wickBias: "lower", tag: "SPRING" },
        { to: 2344.2, bars: 5, vol: "dry",    energy: "stall" },
        { to: 2350.2, bars: 7, vol: "high",   energy: "drive" },
        { to: 2348.0, bars: 4, vol: "low",    energy: "grind" },
        { to: 2354.0, bars: 6, vol: "high",   energy: "drive" }
      ]
    });
    return {
      title: "One real bottom, start to finish — and the two Ws inside it",
      verdict: "good", verdictText: "THE MAP",
      bars: bars, startAt: 1, speed: 300,
      stepIntro: "<b>Press Play</b> and watch a bottom get BUILT — this is the whole story the W is only one chapter of.",
      steps: [
        { at: 12, text: "<b>The selling climax (SC).</b> Panic volume, wide bars, a long tail, closing off the low. The public sells everything; someone bigger is on the other side of it. This sets the floor of the box." },
        { at: 18, text: "<b>The automatic rally (AR).</b> Supply is spent, so even modest buying snaps price up. The high of this rally sets the CEILING of the box. From here on, the bottom is a range, not a line." },
        { at: 24, text: "<b>The secondary test (ST) — quiet.</b> Price revisits the climax area on visibly less volume and smaller bars. That diminishment is the requirement. And look at the shape so far: climax, rally, test — <b>a W. This is the FIRST W, and it is not a buy.</b> It only draws the box." },
        { at: 33, text: "<b>Phase B — the boring middle.</b> Chop, chop, chop inside the box while big money absorbs supply. Most fake double bottoms get bought right here and die of boredom or breakdown." },
        { at: 38, text: "<b>THE SPRING.</b> Price undercuts the box floor — the thing that 'invalidates the pattern' — takes out every stop under the lows, and comes straight back. This is the shakeout. It is not the pattern failing; it is the pattern finishing." },
        { at: 42, text: "<b>The quiet test.</b> One more small dip on almost no volume that holds above the spring low. Sellers were invited back and did not show up. <b>Spring + test = the SECOND W — the one worth money.</b> This is what Uni's entry, IBD's shakeout and your sweep-at-a-real-level are all catching." },
        { at: 49, text: "<b>The sign of strength.</b> Wide bars, rising volume, and the ceiling of the box breaks. Demand is now running the tape." },
        { at: 54, text: "<b>The pullback that holds higher.</b> The retest of the broken ceiling — arriving on schedule, exactly your 70% retest — and it holds above the box." },
        { at: 58, text: "<b>Markup.</b> The part everyone else screenshots. You now know the eight scenes that came before it — which means next time you can recognise the play by scene three." }
      ],
      annotations: [
        { type: "level", price: 2341.0, label: "the box floor (SC low)", color: CYAN, style: "dash", showAt: 12 },
        { type: "level", price: 2348.4, label: "the box ceiling (AR high)", color: GOLD, style: "dash", showAt: 18 },
        { type: "pivot", i: 11, side: "low", label: "SC", color: PINK, showAt: 12 },
        { type: "vbar", i: 11, color: "rgba(236,72,153,.75)", label: "climax", showAt: 12 },
        { type: "pivot", i: 17, side: "high", label: "AR", color: GOLD, showAt: 18 },
        { type: "pivot", i: 23, side: "low", label: "ST · quiet", color: CYAN, showAt: 24 },
        { type: "vbar", i: 23, color: "rgba(163,230,53,.7)", label: "lighter", showAt: 24 },
        { type: "path", points: [{ i: 11, side: "low" }, { i: 17, side: "high" }, { i: 23, side: "low" }],
          label: "the FIRST W — not a buy", labelI: 16, labelPrice: 2338.9, color: ORANGE, showAt: 26 },
        { type: "zone", y1: 2342.9, y2: 2346.6, fromI: 24, toI: 33, color: "rgba(148,163,184,.10)", label: "phase B — the boring middle", textColor: "#94A3B8", showAt: 33 },
        { type: "pivot", i: 37, side: "low", label: "SPRING — under the floor", color: LIME, showAt: 38 },
        { type: "note", i: 41, price: 2339.0, text: "the quiet test holds", color: LIME, showAt: 42 },
        { type: "path", points: [{ i: 33, side: "high" }, { i: 37, side: "low" }, { i: 44, side: "high" }],
          label: "the SECOND W — the trade", labelI: 39, labelPrice: 2337.4, color: LIME, showAt: 45 },
        { type: "note", i: 47, price: 2351.4, text: "SOS — the ceiling breaks", color: GREEN, showAt: 49 },
        { type: "note", i: 52, price: 2345.4, text: "the retest holds higher", color: VIOLET, showAt: 54 }
      ],
      caption: "<b>A real bottom is a process with two Ws in it.</b> The first W (climax → rally → quiet test) only draws the box — buying it is buying the middle of Phase B. The tradable W is the spring and its quiet test at the end. Honesty rider: the phases and events are sourced Wyckoff doctrine; the two-Ws framing is this course's synthesis of those definitions, and nobody publishes statistics on it — the chart is drawn to teach the map, not to promise the frequency."
    };
  };

  /* ============================================================
     THE UPTHRUST M — the second top is designed to sweep
     (added 2026-09-01 rebuild)
     ============================================================ */
  EX.upthrustM = function () {
    var bars = B({
      seed: 502, start: 2340.0, startTime: "13:52", unit: 0.95, baseVolume: 1500,
      legs: [
        { to: 2346.0, bars: 7, vol: "high",   energy: "drive" },
        { to: 2352.0, bars: 6, vol: "climax", energy: "drive", wickBias: "upper", tag: "H1" },
        { to: 2346.2, bars: 6, vol: "high",   energy: "drive" },
        { to: 2350.4, bars: 5, vol: "low",    energy: "grind" },
        { to: 2352.9, bars: 3, vol: "dry",    energy: "grind", wickBias: "upper", tag: "UT" },
        { to: 2347.2, bars: 5, vol: "high",   energy: "drive" },
        { to: 2341.8, bars: 8, vol: "climax", energy: "drive" }
      ]
    });
    return {
      title: "The upthrust — why the M's second top goes ABOVE the first",
      verdict: "warn", verdictText: "THE TRAP",
      bars: bars, startAt: 1, speed: 300,
      stepIntro: "<b>Press Play</b> — and watch what the second high does to everyone who drew a line at the first one.",
      steps: [
        { at: 13, text: "<b>H1 — the buying climax.</b> Urgent volume into a spike high with a tail on top. Everyone watching now has a line drawn at this price." },
        { at: 19, text: "<b>The middle valley.</b> The sharp reaction down sets the M's neckline. So far it looks exactly like the mirror of a W." },
        { at: 26, text: "<b>The second high goes ABOVE the first.</b> To a breakout buyer this is the moment to buy; to everyone short, it is the stop being hit. Both of them are the fuel." },
        { at: 29, text: "<b>…and it fails back inside.</b> The poke could not hold — it closes back under the old high. That is the <b>upthrust</b>: a sweep of the level, not a breakout. The 'double top' just printed its second top — half a point higher than the first." },
        { at: 34, text: "<b>The break.</b> Trapped breakout buyers sell out, fresh shorts pile on, and the middle valley gives way fast — drops move quicker than rallies." },
        { at: 39, text: "<b>The lesson.</b> In a real top the second high USUALLY trades above the first before failing. Shorting the touch of the old high is standing in front of the sweep — the entry works off the candle that fails back inside, never the touch." }
      ],
      annotations: [
        { type: "level", price: 2352.1, label: "H1 — everyone's line", color: GOLD, style: "dash", showAt: 13 },
        { type: "level", price: 2346.1, label: "middle valley (NECKLINE)", color: CYAN, showAt: 19 },
        { type: "pivot", i: 12, side: "high", label: "H1 · climax", color: GOLD, showAt: 13 },
        { type: "pivot", i: 26, side: "high", label: "H2 — the upthrust", color: PINK, showAt: 27 },
        { type: "zone", y1: 2352.1, y2: 2353.5, fromI: 20, toI: 28, color: "rgba(236,72,153,.12)", label: "stops + breakout buyers lived here", textColor: PINK, showAt: 27 },
        { type: "note", i: 29, price: 2349.2, text: "closes back inside — the trap springs", color: RED, showAt: 29 },
        { type: "note", i: 33, price: 2344.2, text: "the M's real entry works off this failure", color: LIME, showAt: 33 },
        { type: "path", points: [{ i: 0, side: "low" }, { i: 12, side: "high" }, { i: 18, side: "low" }, { i: 26, side: "high" }, { i: 38, side: "low" }],
          label: "THE M — with the sweep built in", labelI: 19, labelPrice: 2354.6, color: GOLD, showAt: 38 }
      ],
      caption: "<b>An M with two politely equal tops is the rare case.</b> In Wyckoff's map of distribution the second top routinely prints as an upthrust — a sweep above the first high that fails back inside, engineered to hand size to sellers at the best prices. Expect the sweep, and work off the candle that fails — never the touch of the old high."
    };
  };

})(window);
