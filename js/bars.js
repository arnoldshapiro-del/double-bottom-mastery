/* ============================================================
   bars.js — deterministic 2-minute bar builder
   ------------------------------------------------------------
   These are TEACHING EXAMPLES, hand-authored bar by bar so each
   chart makes exactly one point. They are NOT recordings of real
   market data and the app says so on every chart. Prices are set
   in realistic M2K territory (Russell 2000 ~2340) with real M2K
   mechanics: 0.10-point ticks, $0.50 a tick, $5.00 a point.
   ============================================================ */
(function (root) {
  "use strict";

  /* ---------- M2K contract truth (verified vs. CME-derived specs) ---------- */
  var M2K = {
    name: "M2K — Micro E-mini Russell 2000",
    tick: 0.10,          // index points per tick
    tickValue: 0.50,     // dollars per tick
    pointValue: 5.00,    // dollars per index point
    ticksPerPoint: 10
  };

  /* ---------- seeded PRNG so every chart is identical every load ---------- */
  function rng(seed) {
    var a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function round1(x) { return Math.round(x * 10) / 10; }   // snap to a 0.1 tick

  /* ------------------------------------------------------------
     buildBars(spec)
       spec.seed    – integer, makes the series deterministic
       spec.start   – opening price
       spec.startTime – "09:30"
       spec.legs    – array of leg objects:
          { to, bars, vol, energy, wickBias, tag }
          to       : price this leg ends at
          bars     : how many 2-minute bars the leg takes
          vol      : volume character 'climax'|'high'|'normal'|'low'|'dry'
          energy   : 'drive' (big bodies) | 'grind' (small bodies)
                     | 'chop' (two-sided) | 'stall'
          wickBias : 'lower' | 'upper' | 'none' — where the tails poke
          tag      : optional label stamped on the last bar of the leg
     ------------------------------------------------------------ */
  var VOL = { climax: 2.7, high: 1.7, normal: 1.0, low: 0.62, dry: 0.4 };
  var ENERGY = {
    drive: { body: 0.78, range: 1.25, follow: 0.86 },
    grind: { body: 0.40, range: 0.72, follow: 0.66 },
    chop:  { body: 0.34, range: 0.95, follow: 0.34 },
    stall: { body: 0.22, range: 0.52, follow: 0.50 }
  };

  function buildBars(spec) {
    var rand = rng(spec.seed || 7);
    var px = spec.start;
    var bars = [];
    var t = parseTime(spec.startTime || "09:30");
    var baseVol = spec.baseVolume || 1400;
    var unit = spec.unit || 0.9;   // typical bar range in points

    (spec.legs || []).forEach(function (leg) {
      var n = Math.max(1, leg.bars);
      var from = px;
      var span = leg.to - from;
      var e = ENERGY[leg.energy || "grind"];
      var volMul = VOL[leg.vol || "normal"];

      for (var i = 0; i < n; i++) {
        var prog0 = i / n, prog1 = (i + 1) / n;
        // ease so legs start and finish naturally rather than as a ramp
        var eased0 = ease(prog0, leg.energy), eased1 = ease(prog1, leg.energy);
        var o = from + span * eased0;
        var c = from + span * eased1;

        // two-sided noise; chop legs overshoot both ways
        var wobble = (rand() - 0.5) * unit * e.range * (leg.energy === "chop" ? 1.5 : 0.85);
        c += wobble * (1 - e.follow);

        // guarantee the leg lands exactly on its target price
        if (i === n - 1) c = leg.to;

        var body = Math.abs(c - o);
        var minBody = unit * e.body * (0.45 + rand() * 0.75);
        if (body < minBody && leg.energy !== "stall") {
          var dir = c >= o ? 1 : -1;
          if (i !== n - 1) c = o + dir * minBody;
        }

        var rangeExtra = unit * e.range * (0.30 + rand() * 0.85);
        var hi = Math.max(o, c), lo = Math.min(o, c);
        var upWick = rangeExtra * (leg.wickBias === "upper" ? 1.5 : leg.wickBias === "lower" ? 0.25 : 0.6);
        var dnWick = rangeExtra * (leg.wickBias === "lower" ? 1.5 : leg.wickBias === "upper" ? 0.25 : 0.6);
        hi += upWick * rand();
        lo -= dnWick * rand();

        var v = Math.round(baseVol * volMul * (0.72 + rand() * 0.62));

        bars.push({
          o: round1(o), h: round1(hi), l: round1(lo), c: round1(c),
          v: v, t: fmtTime(t),
          tag: (i === n - 1 ? leg.tag : null) || null
        });
        t += 2;
      }
      px = leg.to;
    });

    // final safety: high/low must actually contain open/close
    bars.forEach(function (b) {
      b.h = round1(Math.max(b.h, b.o, b.c));
      b.l = round1(Math.min(b.l, b.o, b.c));
    });
    return bars;
  }

  function ease(p, energy) {
    if (energy === "drive") return 1 - Math.pow(1 - p, 1.8);   // fast then settle
    if (energy === "grind") return Math.pow(p, 1.22);          // reluctant
    if (energy === "chop") return p;
    return p;
  }

  function parseTime(s) {
    var p = s.split(":");
    return parseInt(p[0], 10) * 60 + parseInt(p[1], 10);
  }
  function fmtTime(mins) {
    var h = Math.floor(mins / 60) % 24, m = mins % 60;
    var ampm = h >= 12 ? "p" : "a";
    var hh = h % 12; if (hh === 0) hh = 12;
    return hh + ":" + (m < 10 ? "0" : "") + m + ampm;
  }

  /* ---------- helpers the lessons use ---------- */
  function pts(a, b) { return Math.round(Math.abs(a - b) * 10) / 10; }
  function ticks(a, b) { return Math.round(Math.abs(a - b) * 10); }
  function dollars(points, contracts) {
    return Math.round(points * M2K.pointValue * (contracts || 1) * 100) / 100;
  }
  /* index of the lowest low / highest high inside a bar range */
  function lowestIdx(bars, from, to) {
    var bi = from, bv = Infinity;
    for (var i = from; i <= Math.min(to, bars.length - 1); i++) { if (bars[i].l < bv) { bv = bars[i].l; bi = i; } }
    return bi;
  }
  function highestIdx(bars, from, to) {
    var bi = from, bv = -Infinity;
    for (var i = from; i <= Math.min(to, bars.length - 1); i++) { if (bars[i].h > bv) { bv = bars[i].h; bi = i; } }
    return bi;
  }
  /* average range of the N bars ending at idx — the app's "is this pattern big enough" yardstick */
  function avgRange(bars, idx, n) {
    var s = 0, k = 0;
    for (var i = Math.max(0, idx - n + 1); i <= idx; i++) { s += (bars[i].h - bars[i].l); k++; }
    return k ? Math.round((s / k) * 100) / 100 : 0;
  }
  function avgVol(bars, idx, n) {
    var s = 0, k = 0;
    for (var i = Math.max(0, idx - n + 1); i <= idx; i++) { s += bars[i].v; k++; }
    return k ? Math.round(s / k) : 0;
  }

  root.DBM = root.DBM || {};
  root.DBM.M2K = M2K;
  root.DBM.buildBars = buildBars;
  root.DBM.util = {
    pts: pts, ticks: ticks, dollars: dollars,
    lowestIdx: lowestIdx, highestIdx: highestIdx,
    avgRange: avgRange, avgVol: avgVol, round1: round1
  };
})(window);
