/* ============================================================
   drill.js — the freeze-and-call trainer
   ------------------------------------------------------------
   The chart is built ONLY up to the decision bar, so there is
   nothing to peek at. You commit, then the rest is revealed.
   Good and bad setups are interleaved on purpose.
   ============================================================ */
(function (root) {
  "use strict";
  var D = root.DBM;
  var B = D.buildBars;

  var GOLD = "#FBBF24", CYAN = "#22D3EE", PINK = "#EC4899",
      LIME = "#A3E635", ORANGE = "#FB923C", VIOLET = "#A78BFA", RED = "#F43F5E";

  var ENTER = "enter", WAIT = "wait", NONE = "none";

  /* ---- the all-time record, kept in localStorage ----
     Calls, how many were right, the best streak ever, and every stop
     placement measured in ticks beyond the candle. Storage can be off or
     full, so every read and write is wrapped. */
  var REC_KEY = "dbm_drill", REC_MAX = 200;

  function blankRec() { return { calls: 0, right: 0, stops: [], best: 0 }; }

  function loadRec() {
    var rec = blankRec();
    try {
      var raw = root.localStorage.getItem(REC_KEY);
      if (raw) {
        var o = JSON.parse(raw);
        if (o && typeof o === "object") {
          rec.calls = Math.max(0, +o.calls || 0);
          rec.right = Math.max(0, +o.right || 0);
          rec.best = Math.max(0, +o.best || 0);
          if (Object.prototype.toString.call(o.stops) === "[object Array]") rec.stops = o.stops.slice(-REC_MAX);
        }
      }
    } catch (e) {}
    return rec;
  }

  function saveRec(rec) {
    try { root.localStorage.setItem(REC_KEY, JSON.stringify(rec)); } catch (e) {}
  }

  /* ---- the two stop panels under the Part 2 verdict ---- */
  function statRow(k, v, extra) {
    return '<div class="dstat' + (extra ? " " + extra : "") + '"><span>' + k + "</span><span>" + v + "</span></div>";
  }

  function doorHTML(name, sub, risk, reward, target, uni, bad) {
    var M = D.money;
    var live = risk > 0 && reward > 0;
    var rr = live ? (reward / risk).toFixed(2) + " : 1" : "—";
    var be = live ? Math.round((risk / (risk + reward)) * 100) + "%" : "—";
    return '<div class="door' + (uni ? " a" : "") + '" style="border-color:' + (uni ? "rgba(163,230,53,.55)" : "rgba(244,63,94,.5)") + '">' +
      '<h4 style="color:' + (uni ? "var(--lime)" : "var(--red)") + '">' + name + "</h4>" +
      '<div class="sub">' + sub + "</div>" +
      statRow("Risk", M.tickWord(risk) + " · " + M.usd(risk)) +
      statRow("First target — the " + target, M.tickWord(reward)) +
      statRow("Reward : risk", rr, bad ? "warnv" : "hero") +
      statRow("Win rate needed to break even", be) +
      "</div>";
  }

  /* ---- each round: full bar series + the bar we freeze at ---- */
  var ROUNDS = [
    {
      why: "Quiet second low on a named level, two-sided tape.",
      gate: "ALL FIVE GATES OPEN",
      answer: ENTER,
      freeze: 27,
      spec: { seed: 2201, start: 2350.6, startTime: "10:10", unit: 0.88, baseVolume: 1500, legs: [
        { to: 2342.0, bars: 8, vol: "climax", energy: "drive", wickBias: "lower" },
        { to: 2347.8, bars: 7, vol: "normal", energy: "grind" },
        { to: 2344.4, bars: 5, vol: "low", energy: "grind" },
        { to: 2342.3, bars: 7, vol: "dry", energy: "stall", wickBias: "lower" },
        { to: 2348.0, bars: 7, vol: "high", energy: "drive" },
        { to: 2353.2, bars: 8, vol: "normal", energy: "drive" } ] },
      shelf: 2342.1, neck: 2347.8,
      good: "<b>Enter.</b> The second low took seven bars against the first low's eight, on dry volume, with a tail — deceleration. The shelf is at yesterday's low. The tape is two-sided. Buy-stop 2 ticks above that low candle, stop 2 ticks under it, first target 2347.8.",
      after: "It ran straight to the neckline and through it."
    },
    {
      why: "One-timeframing — every high lower than the last.",
      gate: "KILLER CHECK · ONE-TIMEFRAMING — the tide owns the day",
      answer: NONE,
      freeze: 26,
      spec: { seed: 2202, start: 2357.0, startTime: "09:40", unit: 1.0, baseVolume: 1900, legs: [
        { to: 2350.0, bars: 7, vol: "high", energy: "drive" },
        { to: 2351.8, bars: 3, vol: "low", energy: "grind" },
        { to: 2345.0, bars: 6, vol: "high", energy: "drive" },
        { to: 2347.0, bars: 4, vol: "low", energy: "grind" },
        { to: 2345.2, bars: 6, vol: "low", energy: "stall" },
        { to: 2336.5, bars: 9, vol: "climax", energy: "drive" },
        { to: 2332.0, bars: 6, vol: "high", energy: "drive" } ] },
      shelf: 2345.0, neck: 2347.0,
      good: "<b>No trade.</b> The shape at 2345 is a fine-looking double bottom — but look at the whole chart: every bar's high is lower than the last, with no real pullback. That is a trend day. Reversal patterns fail as a class on these, because the market never rotates back to build the right side of the W.",
      after: "Straight through on climax volume, and it kept going."
    },
    {
      why: "Second low arrives on expanding range and rising volume.",
      gate: "GATE 4 · THE QUIET APPROACH — it came back louder",
      answer: NONE,
      freeze: 26,
      spec: { seed: 2203, start: 2351.0, startTime: "10:22", unit: 0.9, baseVolume: 1500, legs: [
        { to: 2343.0, bars: 8, vol: "high", energy: "drive", wickBias: "lower" },
        { to: 2348.4, bars: 7, vol: "normal", energy: "grind" },
        { to: 2345.6, bars: 4, vol: "normal", energy: "drive" },
        { to: 2343.4, bars: 6, vol: "climax", energy: "drive" },
        { to: 2335.0, bars: 10, vol: "climax", energy: "drive" } ] },
      shelf: 2343.0, neck: 2348.4,
      good: "<b>No trade.</b> The shape is right and the energy is wrong. The bars coming down are getting <i>bigger</i> and volume is <i>rising</i> — sellers are reloading, not exhausted. The low bar has a wide body and no tail. This one fails the deceleration test before you risk anything.",
      after: "It sliced through the shelf without pausing."
    },
    {
      why: "Undercut of the shelf on light volume, reclaimed on heavy.",
      gate: "GATES 3 + 5 · THE SPRING — light-volume undercut, fast reclaim",
      answer: ENTER,
      freeze: 29,
      spec: { seed: 2204, start: 2349.0, startTime: "10:36", unit: 0.85, baseVolume: 1500, legs: [
        { to: 2341.5, bars: 8, vol: "high", energy: "drive", wickBias: "lower" },
        { to: 2347.0, bars: 7, vol: "normal", energy: "grind" },
        { to: 2343.2, bars: 5, vol: "low", energy: "grind" },
        { to: 2340.6, bars: 4, vol: "low", energy: "grind", wickBias: "lower" },
        { to: 2343.0, bars: 5, vol: "high", energy: "drive" },
        { to: 2347.4, bars: 6, vol: "high", energy: "drive" },
        { to: 2351.6, bars: 7, vol: "normal", energy: "drive" } ] },
      shelf: 2341.5, neck: 2347.0,
      good: "<b>Enter.</b> This is the best version there is. It poked below the shelf on <i>light</i> volume — nobody actually wanted to sell down there — and closed back above it on heavy volume. Everyone who shorted the breakdown is now trapped. Wyckoff calls it a spring; Raschke called it Turtle Soup.",
      after: "The reclaim ran all the way through the neckline."
    },
    {
      why: "Lunchtime, and the whole pattern is one point tall.",
      gate: "KILLER CHECKS · THE CLOCK AND THE SIZE — no gate can rescue these",
      answer: NONE,
      freeze: 24,
      spec: { seed: 2205, start: 2345.0, startTime: "12:06", unit: 0.4, baseVolume: 600, legs: [
        { to: 2343.2, bars: 7, vol: "low", energy: "grind", wickBias: "lower" },
        { to: 2344.3, bars: 5, vol: "dry", energy: "chop" },
        { to: 2343.3, bars: 6, vol: "dry", energy: "chop", wickBias: "lower" },
        { to: 2344.2, bars: 6, vol: "dry", energy: "chop" },
        { to: 2343.1, bars: 7, vol: "dry", energy: "chop", wickBias: "lower" },
        { to: 2344.0, bars: 8, vol: "dry", energy: "chop" } ] },
      shelf: 2343.2, neck: 2344.3,
      good: "<b>No trade.</b> Shape is perfect, size is impossible. Shelf to middle peak is 1.1 points — 11 ticks — while the bars themselves are 4 ticks tall. There is no room between entry, a sane stop and the target. And it is 12:06, the thinnest part of the day, which is exactly what manufactures shapes like this.",
      after: "It chopped sideways in the same one-point box for another half hour."
    },
    {
      why: "Approaching the shelf but nothing has turned yet.",
      gate: "GATE 5 · THE PROOF — the case is built, the proof is not in",
      answer: WAIT,
      freeze: 22,
      spec: { seed: 2206, start: 2352.0, startTime: "10:02", unit: 0.9, baseVolume: 1600, legs: [
        { to: 2344.0, bars: 8, vol: "climax", energy: "drive", wickBias: "lower" },
        { to: 2349.6, bars: 7, vol: "normal", energy: "grind" },
        { to: 2346.2, bars: 4, vol: "low", energy: "grind" },
        { to: 2344.4, bars: 5, vol: "dry", energy: "stall", wickBias: "lower" },
        { to: 2349.8, bars: 7, vol: "high", energy: "drive" },
        { to: 2354.0, bars: 7, vol: "normal", energy: "drive" } ] },
      shelf: 2344.0, neck: 2349.6,
      good: "<b>Not yet — wait.</b> Everything is lining up: real decline, proper middle peak, quiet approach. But price is still coming <i>down</i>. There is no low candle yet — no tail, no stall, no reclaim, nothing that has stopped going down. Buying here is the anticipation error. Let it print the bar, then put your order two ticks above it.",
      after: "Three bars later it stalled, printed a tail, and that was the entry."
    },
    {
      why: "Equal lows inside a range — nothing to reverse.",
      gate: "GATE 1 · THE TIDE — a range has no tide; equal lows are what ranges do",
      answer: NONE,
      freeze: 25,
      spec: { seed: 2207, start: 2344.0, startTime: "11:50", unit: 0.72, baseVolume: 900, legs: [
        { to: 2341.0, bars: 6, vol: "low", energy: "chop", wickBias: "lower" },
        { to: 2345.2, bars: 6, vol: "low", energy: "chop" },
        { to: 2341.2, bars: 7, vol: "dry", energy: "chop", wickBias: "lower" },
        { to: 2345.0, bars: 6, vol: "dry", energy: "chop" },
        { to: 2341.1, bars: 7, vol: "dry", energy: "chop", wickBias: "lower" },
        { to: 2344.6, bars: 7, vol: "dry", energy: "chop" } ] },
      shelf: 2341.1, neck: 2345.1,
      good: "<b>No trade.</b> Ask the first question: what is this reversing? Nothing — price has been rotating in a four-point box for an hour. In a range, price touches the same low over and over; that is what a range <i>is</i>. A W only means something at the end of a decline.",
      after: "It touched the same low twice more before finally leaving the box."
    },
    {
      why: "Neckline broke, pulled back, and is holding above it.",
      gate: "GATE 5 · THE PROOF — confirmed, and the retest holds the line",
      answer: ENTER,
      freeze: 34,
      spec: { seed: 2208, start: 2350.0, startTime: "09:58", unit: 0.88, baseVolume: 1600, legs: [
        { to: 2342.5, bars: 8, vol: "climax", energy: "drive", wickBias: "lower" },
        { to: 2348.0, bars: 6, vol: "normal", energy: "grind" },
        { to: 2344.6, bars: 4, vol: "low", energy: "grind" },
        { to: 2342.8, bars: 5, vol: "dry", energy: "stall", wickBias: "lower" },
        { to: 2348.6, bars: 6, vol: "high", energy: "drive" },
        { to: 2348.2, bars: 5, vol: "low", energy: "grind" },
        { to: 2353.6, bars: 8, vol: "normal", energy: "drive" } ] },
      shelf: 2342.6, neck: 2348.0,
      good: "<b>Enter.</b> This is the 70% retest — Uni's number, and Bulkowski measured 55–67%. The break happened, price came back to the neckline, and it is <b>holding above it</b>. Old resistance is acting as support. You get a confirmed pattern with a small stop just under the neckline. The health check passes: the pullback did not trade back down through the breakout price.",
      after: "It held the line and ran to the measured move."
    },
    {
      why: "Third tap — the rally never closed above the middle peak.",
      gate: "GATE 5 · THE PROOF — it never confirmed; the master chess player walks",
      answer: NONE,
      freeze: 30,
      spec: { seed: 2209, start: 2349.0, startTime: "10:48", unit: 0.85, baseVolume: 1400, legs: [
        { to: 2342.0, bars: 8, vol: "high", energy: "drive", wickBias: "lower" },
        { to: 2346.8, bars: 6, vol: "normal", energy: "grind" },
        { to: 2342.2, bars: 7, vol: "low", energy: "grind", wickBias: "lower" },
        { to: 2345.6, bars: 5, vol: "low", energy: "grind" },
        { to: 2342.1, bars: 6, vol: "dry", energy: "grind", wickBias: "lower" },
        { to: 2344.4, bars: 4, vol: "dry", energy: "stall" },
        { to: 2337.0, bars: 9, vol: "high", energy: "drive" } ] },
      shelf: 2342.1, neck: 2346.8,
      good: "<b>No trade.</b> Uni's master-chess-player question: was there an equal or higher low, and what else could this be? The rally off the second low <b>failed below the middle peak</b> — it never confirmed — and each bounce is topping out lower than the last. Buyers are getting weaker. This is a rectangle heading for a breakdown, not a W.",
      after: "The third tap gave way and it broke down hard."
    },
    {
      why: "A double top: second high quieter, valley below it.",
      gate: "ALL FIVE GATES OPEN — the M version (tide down, quiet second high)",
      answer: ENTER,
      freeze: 28,
      spec: { seed: 2210, start: 2336.0, startTime: "14:10", unit: 0.9, baseVolume: 1500, legs: [
        { to: 2344.5, bars: 8, vol: "climax", energy: "drive", wickBias: "upper" },
        { to: 2339.0, bars: 7, vol: "normal", energy: "grind" },
        { to: 2342.2, bars: 5, vol: "low", energy: "grind" },
        { to: 2344.2, bars: 7, vol: "dry", energy: "stall", wickBias: "upper" },
        { to: 2338.6, bars: 6, vol: "high", energy: "drive" },
        { to: 2332.0, bars: 9, vol: "climax", energy: "drive" } ] },
      shelf: 2344.4, neck: 2339.0, isTop: true,
      good: "<b>Enter — short.</b> The M, and it passes everything: a real advance into the first high, a proper middle valley at 2339.0, and a second high that took more bars on lighter volume with a tail on top. Sell-stop 2 ticks below the high candle's low, stop 2 ticks above it, first target the middle valley. Take the first target briskly — drops move faster than rises.",
      after: "It broke the valley and dropped quickly."
    }
  ];

  /* ============================================================
     BUILD
     ============================================================ */
  D.buildDrill = function () {
    var host = document.createElement("div");
    host.className = "card";
    var order = [], idx = 0, score = 0, done = 0, streak = 0, best = 0;

    var pass = 0;
    function reshuffle() {
      /* Interleave good and bad on purpose — blocking all the winners together
         feels productive and teaches least. The stride rotates each pass so a
         second run through is not the same sequence in the same order. */
      var n = ROUNDS.length;
      var strides = [7, 3, 9, 1];
      var s = strides[pass % strides.length];
      order = [];
      for (var i = 0; i < n; i++) order.push((i * s + pass) % n);
      // guarantee every round appears exactly once even if the stride shares a factor
      var seen = {}, clean = [];
      order.forEach(function (v) { if (!seen[v]) { seen[v] = 1; clean.push(v); } });
      for (var k = 0; k < n; k++) if (!seen[k]) clean.push(k);
      order = clean;
      pass++; idx = 0;
    }
    reshuffle();

    host.innerHTML =
      '<div class="calc-row" style="justify-content:space-between">' +
        '<div><b style="font-family:var(--head);color:var(--gold)">Freeze &amp; Call</b> ' +
        '<span class="fig-hint" id="dr-count"></span></div>' +
        '<div class="fig-hint mono" id="dr-score"></div>' +
      "</div>" +
      '<div class="calc-row" id="dr-recrow" style="justify-content:flex-end;gap:10px;margin-top:-6px;display:none">' +
        '<div class="fig-hint mono" id="dr-record"></div>' +
        '<button class="cbtn" id="dr-reset" type="button" style="font-size:.66rem;padding:3px 9px">reset record</button>' +
      "</div>" +
      '<div id="dr-body"></div>';

    var body = host.querySelector("#dr-body");

    /* ---- the all-time line, and the two-click reset next to it ---- */
    function renderRecord() {
      var row = host.querySelector("#dr-recrow"), line = host.querySelector("#dr-record");
      if (!row || !line) return;
      var rec = loadRec();
      if (!rec.calls) { row.style.display = "none"; return; }
      row.style.display = "flex";
      var pct = Math.round((rec.right / rec.calls) * 100);
      var txt = "all-time: " + rec.calls + (rec.calls === 1 ? " call" : " calls") +
        " · " + pct + "% right · best streak " + rec.best;
      if (rec.stops.length) {
        var sum = 0;
        for (var i = 0; i < rec.stops.length; i++) sum += (+rec.stops[i] || 0);
        txt += " · your stops average " + (sum / rec.stops.length).toFixed(1) + " ticks off the candle (course: 2)";
      }
      line.textContent = txt;
    }

    var resetArmed = false, resetTimer = null;
    var resetBtn = host.querySelector("#dr-reset");
    if (resetBtn) resetBtn.onclick = function () {
      if (resetArmed) {
        if (resetTimer) { root.clearTimeout(resetTimer); resetTimer = null; }
        resetArmed = false;
        resetBtn.textContent = "reset record";
        saveRec(blankRec());
        renderRecord();
        return;
      }
      resetArmed = true;
      resetBtn.textContent = "sure? click again";
      resetTimer = root.setTimeout(function () {
        resetArmed = false; resetTimer = null; resetBtn.textContent = "reset record";
      }, 4000);
    };
    renderRecord();

    function render() {
      var r = ROUNDS[order[idx]];
      var frozen = D.buildBars(r.spec);
      var cut = frozen.slice(0, r.freeze);

      host.querySelector("#dr-count").textContent =
        "· setup " + (done + 1) + " · " + (r.spec.legs ? "" : "") + (cut[cut.length - 1] ? cut[cut.length - 1].t : "");
      host.querySelector("#dr-score").textContent =
        score + " / " + done + (best > 1 ? "   ·   best streak " + best : "");

      body.innerHTML = "";
      var fig = D.chart({
        title: (r.isTop ? "M2K · 2-minute · what do you do here?" : "M2K · 2-minute · what do you do here?"),
        bars: cut, startAt: cut.length, volume: true,
        stamp: "the chart stops here — nothing to peek at",
        annotations: [
          { type: "level", price: r.shelf, label: r.isTop ? "the high shelf" : "the shelf", color: r.isTop ? GOLD : CYAN, style: "dash", showAt: 0 },
          { type: "level", price: r.neck, label: r.isTop ? "middle valley" : "middle peak", color: r.isTop ? CYAN : GOLD, style: "dash", showAt: 0 }
        ],
        caption: "<b>Run the card.</b> One-timeframing? Clock clean? Real decline? Tall enough? Did it decelerate? Is there a candle to work off?"
      });
      body.appendChild(fig);

      var q = document.createElement("div");
      q.innerHTML =
        '<h3 style="margin-top:18px">Your call — commit before you look further</h3>' +
        '<div class="q-opts">' +
        opt(ENTER, "A", "Enter now", "There is a bar to work off and the checks pass.") +
        opt(WAIT, "B", "Not yet — wait", "It could still become a trade, but nothing has turned.") +
        opt(NONE, "C", "No trade", "This one is disqualified. Walk away.") +
        "</div>" +
        '<div class="q-fb" id="dr-fb"></div>';
      body.appendChild(q);

      q.querySelectorAll(".q-opt").forEach(function (btn) {
        btn.onclick = function () { answer(btn.dataset.v, r, frozen, q, cut, fig); };
      });

      function opt(v, k, t, s) {
        return '<button class="q-opt" data-v="' + v + '" type="button"><span class="k">' + k + "</span>" +
          "<span><b>" + t + "</b><br><span style='color:var(--mut);font-size:.85rem'>" + s + "</span></span></button>";
      }
    }

    function answer(v, r, fullBars, q, cut, fig) {
      var right = v === r.answer;
      done++;
      if (right) { score++; streak++; if (streak > best) best = streak; } else streak = 0;

      q.querySelectorAll(".q-opt").forEach(function (b) {
        b.disabled = true;
        if (b.dataset.v === r.answer) b.classList.add("right");
        else if (b.dataset.v === v) b.classList.add("wrong");
      });

      var fb = q.querySelector("#dr-fb");
      fb.className = "q-fb show " + (right ? "ok" : "no");
      fb.innerHTML = (r.gate ? '<span class="pill v">' + r.gate + "</span><br><br>" : "") +
        "<b>" + (right ? "✓ Correct." : "✗ Not this time.") + "</b> " + r.good +
        "<br><br><span style='color:var(--mut)'><b>What happened next:</b> " + r.after + "</span>";

      host.querySelector("#dr-score").textContent =
        score + " / " + done + (best > 1 ? "   ·   best streak " + best : "");

      var rec = loadRec();
      rec.calls++;
      if (right) rec.right++;
      if (streak > rec.best) rec.best = streak;
      saveRec(rec);
      renderRecord();

      /* Every round that was a real entry now asks the second question.
         The call was never the part he got wrong — the stop was. */
      if (r.answer === ENTER && cut && fig && fig._api) placeStop(r, fullBars, cut, fig, q);
      else finish(r, fullBars, null, fig);
    }

    /* ============================================================
       PART 2 — where does the stop go?
       Entering at the low is only legal if being wrong is cheap.
       ============================================================ */
    function placeStop(r, fullBars, cut, fig, q) {
      var M = D.money, U = D.util;
      var isTop = !!r.isTop;
      var ci = isTop ? U.highestIdx(cut, cut.length - 8, cut.length - 1)
                     : U.lowestIdx(cut, cut.length - 8, cut.length - 1);
      var candle = cut[ci];
      var uniStop = isTop ? U.round1(candle.h + 0.2) : U.round1(candle.l - 0.2);
      var entry = isTop ? U.round1(candle.l - 0.2) : U.round1(candle.h + 0.2);

      var p2 = document.createElement("div");
      p2.innerHTML =
        '<h3 style="margin-top:18px">Part 2 — now place your stop</h3>' +
        "<p>Click the chart where your stop goes. " +
        (isTop ? "(For an M, that is above the high candle.)" : "(For a W, that is below the low candle.)") + "</p>" +
        '<div class="q-fb" id="dr-sfb"></div>' +
        '<div id="dr-scmp"></div>';
      /* Part 2 sits directly under the chart he has to click, and the chart
         scrolls back into view — the options he just used are below it. */
      body.insertBefore(p2, q && q.parentNode === body ? q : null);
      var titleEl = fig.querySelector(".fig-title");
      if (titleEl) titleEl.textContent = "Part 2 · click the chart where your stop goes";
      try { root.scrollTo({ top: fig.getBoundingClientRect().top + root.scrollY - 64, behavior: "smooth" }); } catch (e) {}

      fig._api.pick({ label: "YOUR STOP", hint: "click to place it", color: RED }, function (price) {
        if (titleEl) titleEl.textContent = "Your stop against the course's";
        var beyond = isTop ? Math.round((price - candle.h) * 10) : Math.round((candle.l - price) * 10);
        var side = isTop ? "above the high" : "under the low";
        var cls = "no", msg;

        if (beyond <= 0) {
          msg = "<b>✗ Inside the candle.</b> A stop at or " +
            (isTop ? "below the high candle's high" : "above the low candle's low") +
            " gets hit by ordinary noise — the candle already traded there.";
        } else if (beyond <= 4) {
          cls = "ok";
          msg = "<b>✓ Off the candle.</b> " + M.tickWord(beyond) + " " + side +
            " (the course's is 2). This is the stop that makes entering early legal.";
        } else if (beyond <= 15) {
          msg = '<b style="color:var(--orange)">Loose.</b> ' + M.tickWord(beyond) + " " + side +
            " candle — the course's is 2. Every extra tick is money you pay to be wrong, and half of these never confirm.";
        } else {
          msg = "<b>✗ That is the platform's stop, not the chart's.</b> " + M.tickWord(beyond) + " " + side +
            " — the ~50-tick default is what lost you 80%.";
        }

        var sfb = p2.querySelector("#dr-sfb");
        sfb.className = "q-fb show " + cls;
        sfb.innerHTML = msg;

        /* the two stops, priced out side by side */
        var risk = M.ticksBetween(entry, price);
        var uniRisk = M.ticksBetween(entry, uniStop);
        var tgtPrice = r.neck, target = isTop ? "middle valley" : "middle peak";
        if (isTop ? tgtPrice >= entry : tgtPrice <= entry) {
          /* on the neckline retest the middle peak is already behind the
             entry, so the first target is the measured move instead */
          tgtPrice = isTop ? U.round1(r.neck - (r.shelf - r.neck)) : U.round1(r.neck + (r.neck - r.shelf));
          target = "measured move";
        }
        var reward = M.ticksBetween(entry, tgtPrice);
        p2.querySelector("#dr-scmp").innerHTML =
          '<div class="calc-out">' +
            doorHTML("Your stop", "WHERE YOU CLICKED · " + M.fmt(price), risk, reward, target, false, beyond <= 0) +
            doorHTML("The course's stop", "2 TICKS " + (isTop ? "ABOVE" : "UNDER") + " THE CANDLE · " + M.fmt(uniStop),
                     uniRisk, reward, target, true) +
          "</div>";

        /* draw both of them on the frozen chart */
        fig._api.addAnnotations([
          { type: "level", price: entry, label: "ENTRY", color: GOLD, style: "dash", fromI: cut.length - 7, showAt: 0 },
          { type: "level", price: price, label: "YOUR STOP", color: RED, style: "dash", fromI: cut.length - 7, showAt: 0 },
          { type: "level", price: uniStop, label: "THE COURSE'S STOP", color: LIME, style: "dash", fromI: cut.length - 7, showAt: 0 },
          { type: "ruler", i: cut.length - 3, p1: entry, p2: price, color: RED, side: "left", showAt: 0 },
          { type: "ruler", i: cut.length - 5, p1: entry, p2: uniStop, color: LIME, side: "left", showAt: 0 }
        ]);

        var rec2 = loadRec();
        rec2.stops.push(beyond);
        if (rec2.stops.length > REC_MAX) rec2.stops = rec2.stops.slice(-REC_MAX);
        saveRec(rec2);
        renderRecord();

        finish(r, fullBars, { entry: entry, price: price, uniStop: uniStop }, fig);
      });
    }

    /* ---- the reveal, then the way out ---- */
    function finish(r, fullBars, stop, fig) {
      var annos = [
        { type: "level", price: r.shelf, label: r.isTop ? "high shelf" : "shelf", color: r.isTop ? GOLD : CYAN, style: "dash", showAt: 0 },
        { type: "level", price: r.neck, label: r.isTop ? "middle valley" : "middle peak", color: r.isTop ? CYAN : GOLD, showAt: 0 },
        { type: "note", i: r.freeze - 1, price: r.isTop ? r.shelf + 1.4 : r.shelf - 1.4, text: "◀ you decided here", color: VIOLET, showAt: 0 }
      ];
      if (stop) {
        annos.push({ type: "level", price: stop.entry, label: "ENTRY", color: GOLD, style: "dash", fromI: r.freeze - 7, showAt: 0 });
        annos.push({ type: "level", price: stop.price, label: "YOUR STOP", color: RED, style: "dash", fromI: r.freeze - 7, showAt: 0 });
        annos.push({ type: "level", price: stop.uniStop, label: "THE COURSE'S STOP", color: LIME, style: "dash", fromI: r.freeze - 7, showAt: 0 });
      }

      /* reveal the rest of the chart */
      var reveal = D.chart({
        title: "…and here is the rest of it",
        bars: fullBars, startAt: r.freeze, speed: 300,
        verdict: r.answer === ENTER ? "good" : r.answer === WAIT ? "warn" : "bad",
        verdictText: r.answer === ENTER ? "TAKE IT" : r.answer === WAIT ? "WAIT" : "SKIP IT",
        stamp: "press Play to watch it finish",
        annotations: annos,
        caption: "<b>" + r.why + "</b>" +
          (r.gate ? '<br><span style="font-family:var(--head);font-size:.74rem;letter-spacing:.8px;color:var(--violet)">' + r.gate + "</span>" : "")
      });
      body.appendChild(reveal);

      var nav = document.createElement("div");
      nav.style.marginTop = "16px";
      nav.innerHTML = '<button class="cbtn on" id="dr-next" type="button" style="font-size:.88rem;padding:9px 16px">Next setup →</button>';
      body.appendChild(nav);
      nav.querySelector("#dr-next").onclick = function () {
        if (fig && fig._api) { try { fig._api.cancelPick(); } catch (e) {} }
        idx++;
        if (idx >= order.length) { reshuffle(); }
        D.stopAll();
        render();
        host.scrollIntoView({ behavior: "smooth", block: "start" });
      };
    }

    setTimeout(render, 10);
    return host;
  };

})(window);
