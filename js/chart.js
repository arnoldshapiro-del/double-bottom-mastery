/* ============================================================
   chart.js v2 — the animated 2-minute candle engine
   ------------------------------------------------------------
   v1 (2026-08-19): bars reveal one at a time under the learner's
   control (play, pause, step, scrub, replay). Annotations switch
   on as the reveal reaches them. Double-click = full screen.

   v2 (2026-08-22) — same spec format, nothing in examples.js or
   drill.js had to change to keep working — adds:
     • candles that FORM instead of popping in: open, a wick, the
       body, the close — so "wait for the 2-minute close" is a thing
       you watch happen, not a sentence
     • a live price line + axis tag that tracks the forming bar
     • annotations that draw themselves in when play or a single
       step reaches them (levels sweep, pivots ripple, tags pop,
       boxes grow, arrows draw) — instant when scrubbing
     • two new annotation types: "path" (the W or M traced through
       its points) and "ruler" (a vertical tick/dollar measure)
     • automatic risk + reward rulers on every "trade" bracket
     • hover crosshair with an OHLC readout and ticks-from-the-shelf
     • press-and-drag a box to measure any distance in ticks and $
     • ½× 1× 2× 4× playback speed, remembered across charts
     • keyboard control in full screen (space, ←, →, Esc)
     • a step strip (① ② ③ …) to jump straight to a teaching moment
     • DBM.chartPair(): two charts, one set of controls, in lockstep
     • fig._api — a small API the drill uses to ask "where is your
       stop?" and to draw the answer
   Honours prefers-reduced-motion: bars still reveal, nothing glides.

   Learner control is deliberate: animation only helps teaching a
   dynamic process when the learner drives it (Höffler & Leutner
   2007; Tversky, Morrison & Betrancourt 2002). Uncontrolled
   auto-play is measurably worse than static pictures.
   ============================================================ */
(function (root) {
  "use strict";
  var D = root.DBM = root.DBM || {};

  var C = {
    up: "#4ADE80", dn: "#F43F5E",
    upSoft: "rgba(74,222,128,.30)", dnSoft: "rgba(244,63,94,.30)",
    gold: "#FBBF24", cyan: "#22D3EE", pink: "#EC4899",
    lime: "#A3E635", orange: "#FB923C", violet: "#A78BFA",
    grid: "rgba(148,163,184,.11)", axis: "rgba(148,163,184,.55)",
    txt: "#E6EDF7", mut: "#94A3B8", bg: "#081120", panel: "#0F1B2D",
    tagBg: "rgba(8,17,32,.9)", tagInk: "#0A1525", hair: "rgba(230,237,247,.42)"
  };
  function themeIsLight() {
    return document.documentElement.getAttribute("data-theme") === "light";
  }
  function pal() {
    if (!themeIsLight()) return C;
    return Object.assign({}, C, {
      up: "#15803D", dn: "#BE123C",
      upSoft: "rgba(21,128,61,.26)", dnSoft: "rgba(190,18,60,.26)",
      gold: "#B4790A", cyan: "#0E7490", pink: "#BE185D",
      lime: "#4D7C0F", orange: "#C2410C", violet: "#6D28D9",
      grid: "rgba(30,41,59,.10)", axis: "rgba(30,41,59,.5)",
      txt: "#101B2D", mut: "#51637C", bg: "#FFFFFF", panel: "#F1F5FB",
      tagBg: "rgba(255,255,255,.93)", tagInk: "#FFFFFF", hair: "rgba(16,27,45,.42)"
    });
  }

  /* The lessons name annotation colours as fixed hex (GOLD, CYAN, …) so the
     examples stay readable on their own. On a white background those bright
     values wash out, so every annotation colour goes through this map. */
  var LIGHT_MAP = {
    "#FBBF24": "#8A5C05", "#22D3EE": "#0B5C71", "#EC4899": "#9D1247",
    "#A3E635": "#3F6A0B", "#FB923C": "#9A340A", "#A78BFA": "#5B21B6",
    "#4ADE80": "#116632", "#F43F5E": "#9F0F31"
  };
  function CC(c, fallback) {
    var v = c || fallback;
    if (!v) return fallback;
    if (!themeIsLight()) return v;
    return LIGHT_MAP[String(v).toUpperCase()] || v;
  }
  /* "#RRGGBB" → "rgba(r,g,b,a)"; anything else passes through untouched */
  function rgba(col, a) {
    var m = /^#([0-9a-f]{6})$/i.exec(col || "");
    if (!m) return col;
    var n = parseInt(m[1], 16);
    return "rgba(" + (n >> 16 & 255) + "," + (n >> 8 & 255) + "," + (n & 255) + "," + a + ")";
  }

  /* ---------- motion + timing ---------- */
  var REDUCED = false;
  try { REDUCED = !!(root.matchMedia && root.matchMedia("(prefers-reduced-motion: reduce)").matches); } catch (e) {}
  var ANNO_DUR = 720, FLASH_DUR = 620, STAGGER = 90;
  function now() { return (root.performance && performance.now) ? performance.now() : Date.now(); }
  function clamp01(t) { return t < 0 ? 0 : t > 1 ? 1 : t; }
  function easeOut(t) { t = clamp01(t); return 1 - Math.pow(1 - t, 3); }
  function easeInOut(t) { t = clamp01(t); return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function smooth(t) { t = clamp01(t); return t * t * (3 - 2 * t); }
  function easeOutBack(t) { t = clamp01(t); var c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); }

  /* ---------- M2K money ---------- */
  var TICK = 0.1, TICK_VALUE = 0.5;
  function fmt(v) { return (Math.round(v * 10) / 10).toFixed(1); }
  function ticksBetween(a, b) { return Math.round(Math.abs(a - b) * 10); }
  function usd(ticks) { var v = ticks * TICK_VALUE; return "$" + (Math.round(v * 100) / 100).toFixed(2); }
  function tickWord(n) { return n + (n === 1 ? " tick" : " ticks"); }
  function round1(x) { return Math.round(x * 10) / 10; }

  /* ---------- playback speed (global, remembered) ---------- */
  var LS_SPEED = "dbm_speed", speedMult = 1;
  try { var sv = parseFloat(localStorage.getItem(LS_SPEED)); if (sv > 0 && sv <= 8) speedMult = sv; } catch (e) {}
  var SPEEDS = [[0.5, "½×"], [1, "1×"], [2, "2×"], [4, "4×"]];
  D.speed = function (v) {
    if (v != null && v > 0) {
      speedMult = v;
      try { localStorage.setItem(LS_SPEED, String(v)); } catch (e) {}
      D._speedUIs.forEach(function (fn) { try { fn(); } catch (e) {} });
    }
    return speedMult;
  };
  D._speedUIs = [];
  function speedGroup() {
    var grp = document.createElement("span");
    grp.className = "cgroup";
    grp.title = "Playback speed";
    SPEEDS.forEach(function (s) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "cbtn"; b.textContent = s[1]; b.dataset.v = s[0];
      b.onclick = function () { D.speed(s[0]); };
      grp.appendChild(b);
    });
    function paint() {
      Array.prototype.forEach.call(grp.children, function (b) {
        b.classList.toggle("on", parseFloat(b.dataset.v) === speedMult);
      });
    }
    paint();
    D._speedUIs.push(paint);
    return grp;
  }

  /* The price path of a bar while it forms. Open first; then the wick on the
     side AWAY from the close; then the far extreme; then settle on the close.
     Returns the current price plus the running high and low so far. */
  function barPath(b, t) {
    var up = b.c >= b.o;
    var ks = up ? [[0, b.o], [0.28, b.l], [0.74, b.h], [1, b.c]]
                : [[0, b.o], [0.28, b.h], [0.74, b.l], [1, b.c]];
    var p = b.o, hi = b.o, lo = b.o;
    for (var i = 1; i < ks.length; i++) {
      var t0 = ks[i - 1][0], t1 = ks[i][0], v0 = ks[i - 1][1], v1 = ks[i][1];
      if (t >= t1) { p = v1; hi = Math.max(hi, v1); lo = Math.min(lo, v1); continue; }
      p = v0 + (v1 - v0) * smooth((t - t0) / (t1 - t0));
      hi = Math.max(hi, p); lo = Math.min(lo, p);
      break;
    }
    return { p: p, h: hi, l: lo };
  }

  var seq = 0;

  /* ============================================================
     DBM.chart(spec) → returns the figure element
     ============================================================ */
  D.chart = function (spec) {
    var id = "fig" + (++seq);
    var bars = spec.bars || [];
    var annosAll = spec.annotations = (spec.annotations || []).slice();
    var showVol = spec.volume !== false;
    var steps = (spec.steps || []).slice().sort(function (a, b) { return a.at - b.at; });

    var fig = document.createElement("figure");
    fig.className = "fig" + (spec.inPair ? " in-pair" : "");
    fig.id = id;

    /* ---------- head ---------- */
    var head = document.createElement("div");
    head.className = "fig-head";
    head.innerHTML =
      '<span class="fig-title">' + esc(spec.title || "M2K · 2-minute") + "</span>" +
      (spec.verdict ? '<span class="pill ' + verdictCls(spec.verdict) + '">' + esc(spec.verdictText || verdictWord(spec.verdict)) + "</span>" : "") +
      '<span class="fig-hint">hover = prices · drag = measure · double-click = full screen</span>';
    fig.appendChild(head);

    /* ---------- canvases (chart + overlay for the crosshair) ---------- */
    var wrap = document.createElement("div");
    wrap.className = "fig-canvas-wrap";
    var cv = document.createElement("canvas");
    var cv2 = document.createElement("canvas");
    cv2.className = "ov";
    wrap.appendChild(cv); wrap.appendChild(cv2);
    fig.appendChild(wrap);

    /* ---------- step caption + step strip ---------- */
    var stepBox = null, stepText = null, dots = [];
    if (steps.length) {
      stepBox = document.createElement("div");
      stepBox.className = "fig-step";
      stepText = document.createElement("div");
      stepText.className = "fig-step-text";
      stepBox.appendChild(stepText);
      var strip = document.createElement("div");
      strip.className = "fig-stepnav";
      strip.setAttribute("aria-label", "Jump to a step");
      steps.forEach(function (s, k) {
        var d = document.createElement("button");
        d.type = "button"; d.className = "sdot"; d.textContent = k + 1;
        d.title = "Jump to step " + (k + 1);
        d.onclick = function () { halt(); form = null; flash = null; setShown(s.at); };
        strip.appendChild(d); dots.push(d);
      });
      stepBox.appendChild(strip);
      fig.appendChild(stepBox);
    }

    /* ---------- controls ---------- */
    var ctr = document.createElement("div");
    ctr.className = "fig-ctrls";
    ctr.innerHTML =
      '<button class="cbtn play" type="button">▶ Play</button>' +
      '<button class="cbtn back" type="button" title="One bar back">◀</button>' +
      '<button class="cbtn fwd" type="button" title="One bar forward">▶|</button>' +
      '<input class="fig-scrub" type="range" min="1" max="' + bars.length + '" value="' + bars.length + '" aria-label="Bars shown">' +
      '<span class="fig-hint bar-lbl mono"></span>' +
      '<button class="cbtn all" type="button">Show all</button>' +
      '<button class="cbtn rst" type="button">↺ Replay</button>';
    ctr.appendChild(speedGroup());
    var elFs = document.createElement("button");
    elFs.className = "cbtn fs"; elFs.type = "button"; elFs.textContent = "⛶ Full screen";
    ctr.appendChild(elFs);
    fig.appendChild(ctr);

    /* ---------- caption ---------- */
    if (spec.caption) {
      var cap = document.createElement("figcaption");
      cap.className = "fig-cap";
      cap.innerHTML = spec.caption;
      fig.appendChild(cap);
    }

    /* ---------- state ---------- */
    var shown = spec.startAt != null ? spec.startAt : bars.length;
    var playing = false, raf = null;
    var form = null;     // { idx, t0, frozen? } — the bar currently forming
    var flash = null;    // { idx, t0 } — the close flash
    var born = {};       // annotation index → time it appeared (for the draw-in)
    var L = null;        // last layout, for the overlay + hit-testing
    var hover = null, drag = null, ruler = null, pick = null;
    var listeners = [];

    var elPlay = ctr.querySelector(".play"),
        elBack = ctr.querySelector(".back"),
        elFwd = ctr.querySelector(".fwd"),
        elScrub = ctr.querySelector(".fig-scrub"),
        elLbl = ctr.querySelector(".bar-lbl"),
        elAll = ctr.querySelector(".all"),
        elRst = ctr.querySelector(".rst");

    /* the reference level for the hover readout: spec.ref, else the first level */
    var ref = spec.ref || (function () {
      var best = null;
      annosAll.forEach(function (a) {
        if (a.type === "level" && a.label && typeof a.price === "number" &&
            (best == null || (a.showAt || 0) < (best.showAt || 0))) best = a;
      });
      return best ? { price: best.price, label: best.label } : null;
    })();

    function barDur() { return (spec.speed || 340) / speedMult; }
    function emit() { listeners.forEach(function (fn) { try { fn(); } catch (e) {} }); }
    function paintPlayBtn() {
      elPlay.textContent = playing ? "⏸ Pause" : "▶ Play";
      elPlay.classList.toggle("on", playing);
    }
    function requestFrame() {
      if (!raf) raf = root.requestAnimationFrame(frame);
    }

    function setShown(n, o) {
      o = o || {};
      var old = shown;
      shown = Math.max(1, Math.min(bars.length, n));
      if (!o.fromScrub) elScrub.value = shown;
      elLbl.textContent = shown + " / " + bars.length + (bars[shown - 1] ? "  ·  " + bars[shown - 1].t : "");
      if (o.instant || REDUCED) {
        born = {};
      } else if (shown > old) {
        /* everything that just became visible draws itself in, in order */
        var t = now(), k = 0;
        annosAll.forEach(function (a, idx) {
          var s = a.showAt == null ? 0 : a.showAt;
          if (s >= old && s < shown) born[idx] = t + (k++) * STAGGER;
        });
      } else if (shown < old) {
        annosAll.forEach(function (a, idx) {
          var s = a.showAt == null ? 0 : a.showAt;
          if (s >= shown) delete born[idx];
        });
      }
      updateStep(!o.instant);
      emit();
      requestFrame();
    }
    function updateStep(animate) {
      if (!stepBox) return;
      var cur = null, curIdx = -1;
      for (var i = 0; i < steps.length; i++) if (steps[i].at <= shown) { cur = steps[i]; curIdx = i; }
      var html = cur ? cur.text : (spec.stepIntro || "<b>Press Play</b> — the bars will build one at a time.");
      if (stepText.innerHTML !== html) {
        stepText.innerHTML = html;
        if (animate && !REDUCED) {
          stepText.classList.remove("swap"); void stepText.offsetWidth; stepText.classList.add("swap");
        }
      }
      dots.forEach(function (d, k) {
        d.classList.toggle("on", k === curIdx);
        d.classList.toggle("past", k < curIdx);
      });
    }

    /* ---------- transport ---------- */
    function play() {
      if (playing) { stop(); return; }
      if (shown >= bars.length) { form = null; flash = null; setShown(1, { instant: true }); }
      playing = true; paintPlayBtn();
      if (form && form.frozen != null) { form.t0 = now() - form.frozen; delete form.frozen; }
      else form = { idx: shown, t0: now() };
      emit(); requestFrame();
    }
    function stop() {                       // pause = freeze the forming bar where it is
      if (!playing) return;
      playing = false;
      if (form) form.frozen = now() - form.t0;
      paintPlayBtn(); emit(); requestFrame();
    }
    function halt() {                       // any manual navigation: drop the forming bar
      playing = false; paintPlayBtn();
    }
    function nav(n, o) { halt(); form = null; flash = null; setShown(n, o); }

    elPlay.onclick = play;
    elBack.onclick = function () { nav(shown - 1, { instant: true }); };
    elFwd.onclick = function () { nav(shown + 1); };
    elScrub.oninput = function () { nav(parseInt(elScrub.value, 10), { instant: true, fromScrub: true }); };
    elAll.onclick = function () { nav(bars.length, { instant: true }); };
    elRst.onclick = function () { nav(1, { instant: true }); play(); };
    elFs.onclick = function (e) { e.stopPropagation(); toggleFs(); elFs.blur(); };

    /* ---------- full screen ---------- */
    function toggleFs() {
      var on = fig.classList.toggle("fs");
      document.body.classList.toggle("fs-lock", on);
      elFs.textContent = on ? "⛶ Exit full screen" : "⛶ Full screen";
      setTimeout(requestFrame, 30);
    }
    wrap.addEventListener("dblclick", function (e) { e.preventDefault(); toggleFs(); });

    /* ============================================================
       FRAME LOOP — runs only while something is moving
       ============================================================ */
    function frame() {
      raf = null;
      if (!fig.isConnected) return;
      var t = now(), busy = false;
      if (playing && form) {
        var el = t - form.t0, dur = barDur();
        if (el >= dur) {
          var done = form.idx;
          flash = { idx: done, t0: t };
          form = null;
          setShown(done + 1);
          if (shown >= bars.length) { playing = false; paintPlayBtn(); emit(); }
          else form = { idx: shown, t0: t - Math.min(el - dur, dur * 0.5) };
        }
        if (playing) busy = true;
      }
      if (flash) { if (t - flash.t0 < FLASH_DUR) busy = true; else flash = null; }
      if (!busy) for (var k in born) { if (t - born[k] < ANNO_DUR) { busy = true; break; } }
      draw(t);
      if (busy) requestFrame();
    }
    function prog(idx, t) {
      if (REDUCED) return 1;
      var b = born[idx];
      if (b == null) return 1;
      var e = (t - b) / ANNO_DUR;
      if (e >= 1) { delete born[idx]; return 1; }
      return e < 0 ? 0 : e;
    }

    /* ============================================================
       DRAW
       ============================================================ */
    function draw(t) {
      var p = pal();
      var full = fig.classList.contains("fs");
      var cssW, cssH;
      if (full) {
        cssW = Math.min(wrap.clientWidth - 16, 2200);
        cssH = Math.max(320, wrap.clientHeight - 16);
      } else {
        cssW = wrap.clientWidth || 900;
        cssH = Math.round(cssW * (spec.aspect || 0.52));
      }
      if (cssW < 40) return;
      var dpr = Math.min(root.devicePixelRatio || 1, 2.5);
      [cv, cv2].forEach(function (c) {
        if (c.width !== Math.round(cssW * dpr) || c.height !== Math.round(cssH * dpr)) {
          c.width = Math.round(cssW * dpr); c.height = Math.round(cssH * dpr);
        }
        c.style.width = cssW + "px"; c.style.height = cssH + "px";
      });
      var g = cv.getContext("2d");
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.clearRect(0, 0, cssW, cssH);
      g.fillStyle = p.bg; g.fillRect(0, 0, cssW, cssH);

      /* annotation scale tracks canvas width — the 0.82 floor kept labels
         near full size on a phone-width canvas and they collided */
      var scale = full ? 1.35 : Math.max(0.7, Math.min(1.15, cssW / 900));
      var padR = 66 * scale, padL = 10 * scale, padT = 16 * scale, padB = 24 * scale;
      var volH = showVol ? Math.round((cssH - padT - padB) * 0.19) : 0;
      var plotW = cssW - padL - padR;
      var plotH = cssH - padT - padB - volH - (showVol ? 10 : 0);

      /* --- price range over ALL bars so the frame never jumps while animating --- */
      var lo = Infinity, hi = -Infinity;
      bars.forEach(function (b) { lo = Math.min(lo, b.l); hi = Math.max(hi, b.h); });
      annosAll.forEach(function (a) {
        ["price", "y1", "y2", "entry", "stop", "target", "lowPrice", "neckPrice", "toPrice", "p1", "p2"].forEach(function (k) {
          if (typeof a[k] === "number") { lo = Math.min(lo, a[k]); hi = Math.max(hi, a[k]); }
        });
        if (a.type === "path" && a.points) a.points.forEach(function (q) {
          if (typeof q.price === "number") { lo = Math.min(lo, q.price); hi = Math.max(hi, q.price); }
        });
      });
      var pad = (hi - lo) * 0.09 || 1;
      lo -= pad; hi += pad;

      var n = bars.length;
      var slot = plotW / n;
      var bw = Math.max(2.4, Math.min(slot * 0.66, 22 * scale));

      function X(i) { return padL + slot * (i + 0.5); }
      function Y(v) { return padT + plotH * (1 - (v - lo) / (hi - lo)); }

      L = { cssW: cssW, cssH: cssH, dpr: dpr, scale: scale, padL: padL, padT: padT, padB: padB,
            plotW: plotW, plotH: plotH, volH: volH, slot: slot, bw: bw, lo: lo, hi: hi, n: n,
            X: X, Y: Y, full: full };

      /* ---------- the forming bar, worked out before the axis so the live
                    price tag can suppress the gridline label it would cover ---------- */
      var live = null, formT = 0;
      if (form && form.idx === shown && form.idx < n) {
        var fb = bars[form.idx];
        var elapsed = (!playing && form.frozen != null) ? form.frozen : (t - form.t0);
        formT = clamp01(elapsed / barDur());
        var pp = barPath(fb, formT);
        live = { price: pp.p, up: pp.p >= fb.o, x: X(form.idx), h: pp.h, l: pp.l, o: fb.o };
      } else if (bars[shown - 1]) {
        var lb = bars[shown - 1];
        live = { price: lb.c, up: lb.c >= lb.o, x: X(shown - 1) };
      }
      var liveY = (live && spec.livePrice !== false) ? Y(live.price) : null;

      /* ---------- grid + price axis ---------- */
      g.font = (10.5 * scale).toFixed(1) + "px 'Space Mono',monospace";
      g.textBaseline = "middle";
      var stepP = niceStep((hi - lo) / (full ? 9 : 6));
      for (var v = Math.ceil(lo / stepP) * stepP; v <= hi; v += stepP) {
        var y = Y(v);
        g.strokeStyle = p.grid; g.lineWidth = 1;
        g.beginPath(); g.moveTo(padL, y + .5); g.lineTo(padL + plotW, y + .5); g.stroke();
        /* the live tag is 15*scale tall and the label ~10.5, so they need
           half of each in clearance or they visibly touch on a narrow canvas */
        if (liveY != null && Math.abs(y - liveY) < 19 * scale) continue;
        g.fillStyle = p.mut; g.textAlign = "left";
        g.fillText(v.toFixed(1), padL + plotW + 7, y);
      }

      /* ---------- time axis ---------- */
      g.textAlign = "center"; g.fillStyle = p.mut;
      var tEvery = Math.max(1, Math.round(n / (full ? 14 : 8)));
      for (var i = 0; i < n; i++) {
        if (i % tEvery === 0 && bars[i]) g.fillText(bars[i].t, X(i), cssH - padB / 2 - 2);
      }

      var annos = [];
      annosAll.forEach(function (a, idx) {
        if ((a.showAt == null ? 0 : a.showAt) < shown) annos.push({ a: a, k: idx });
      });
      function each(type, fn) { annos.forEach(function (r) { if (r.a.type === type) fn(r.a, prog(r.k, t)); }); }

      /* ---------- zones (behind candles) ---------- */
      each("zone", function (a, pr) {
        var y1 = Y(Math.max(a.y1, a.y2)), y2 = Y(Math.min(a.y1, a.y2));
        var x0 = a.fromI != null ? X(a.fromI) - slot / 2 : padL;
        var x1 = a.toI != null ? X(a.toI) + slot / 2 : padL + plotW;
        g.save(); g.globalAlpha = easeOut(pr);
        g.fillStyle = CC(a.color, "rgba(34,211,238,.10)");
        g.fillRect(x0, y1, x1 - x0, y2 - y1);
        if (a.label) {
          g.globalAlpha = clamp01((pr - .5) / .5);
          g.fillStyle = CC(a.textColor, p.cyan); g.textAlign = "left";
          g.font = "700 " + (10.5 * scale).toFixed(1) + "px Oxanium,sans-serif";
          g.fillText(a.label, x0 + 6, y1 + 10 * scale);
        }
        g.restore();
      });

      /* ---------- measured-move boxes ---------- */
      each("measured", function (a, pr) {
        var h = a.neckPrice - a.lowPrice;
        var x0 = X(a.fromI != null ? a.fromI : 0) - slot / 2;
        var x1 = padL + plotW;
        var col = CC(a.color, p.violet);
        g.save();
        g.globalAlpha = clamp01(pr / .45);
        g.strokeStyle = col; g.lineWidth = 1.4; g.setLineDash([5, 4]);
        g.strokeRect(x0, Y(a.neckPrice), x1 - x0, Y(a.lowPrice) - Y(a.neckPrice));      // the W's height
        var grow = easeOut((pr - .3) / .7);
        var topY = Y(a.neckPrice) - (Y(a.neckPrice) - Y(a.neckPrice + h)) * grow;        // projected box grows up
        g.globalAlpha = 1;
        g.fillStyle = rgba(col, .13);
        g.fillRect(x0, topY, x1 - x0, Y(a.neckPrice) - topY);
        g.strokeRect(x0, topY, x1 - x0, Y(a.neckPrice) - topY);
        g.setLineDash([]);
        if (pr > .8) {
          g.globalAlpha = clamp01((pr - .8) / .2);
          g.fillStyle = col; g.textAlign = "left";
          g.font = "700 " + (11 * scale).toFixed(1) + "px Oxanium,sans-serif";
          g.fillText(a.label || ("measured move  " + (Math.round(h * 10) / 10) + " pts"), x0 + 9, Y(a.neckPrice + h) + 13 * scale);
        }
        g.restore();
      });

      /* ---------- horizontal levels ---------- */
      each("level", function (a, pr) {
        var y = Y(a.price);
        var x0 = a.fromI != null ? X(a.fromI) - slot / 2 : padL;
        var x1 = padL + plotW;
        var xe = x0 + (x1 - x0) * easeOut(pr);
        g.strokeStyle = CC(a.color, p.gold); g.lineWidth = a.weight || 1.7;
        g.setLineDash(a.style === "dash" ? [7, 5] : a.style === "dot" ? [2, 4] : []);
        g.beginPath(); g.moveTo(x0, y + .5); g.lineTo(xe, y + .5); g.stroke();
        g.setLineDash([]);
        if (a.label && pr > .75) {
          g.save(); g.globalAlpha = clamp01((pr - .75) / .25);
          g.font = "700 " + (10.5 * scale).toFixed(1) + "px Oxanium,sans-serif";
          var tw = g.measureText(a.label).width + 10;
          g.fillStyle = CC(a.color, p.gold);
          g.fillRect(padL + plotW - tw - 2, y - 8 * scale, tw, 16 * scale);
          g.fillStyle = p.tagInk; g.textAlign = "center"; g.textBaseline = "middle";
          g.fillText(a.label, padL + plotW - tw / 2 - 2, y);
          g.restore();
        }
      });

      /* ---------- trendlines / necklines ---------- */
      each("line", function (a, pr) {
        var f = easeOut(pr);
        g.strokeStyle = CC(a.color, p.gold); g.lineWidth = a.weight || 1.8;
        g.setLineDash(a.style === "dash" ? [7, 5] : []);
        g.beginPath(); g.moveTo(X(a.i1), Y(a.p1));
        g.lineTo(X(a.i1) + (X(a.i2) - X(a.i1)) * f, Y(a.p1) + (Y(a.p2) - Y(a.p1)) * f); g.stroke();
        g.setLineDash([]);
      });

      /* ---------- CANDLES ---------- */
      function candle(k, b, alpha) {
        var x = X(k), up = b.c >= b.o, col = up ? p.up : p.dn;
        g.save(); g.globalAlpha = alpha;
        g.strokeStyle = col; g.lineWidth = Math.max(1, bw * 0.16);
        g.beginPath(); g.moveTo(x, Y(b.h)); g.lineTo(x, Y(b.l)); g.stroke();
        var yO = Y(b.o), yC = Y(b.c);
        var top = Math.min(yO, yC), hgt = Math.max(Math.abs(yC - yO), 1.4);
        g.fillStyle = col; g.globalAlpha = alpha * 0.92;
        g.fillRect(x - bw / 2, top, bw, hgt);
        g.restore();
      }
      for (var k = 0; k < shown && k < n; k++) candle(k, bars[k], 1);

      /* the forming bar — open, wick, body, close (computed above the axis) */
      if (live && live.h != null) candle(form.idx, { o: live.o, h: live.h, l: live.l, c: live.price }, 1);

      /* the close flash — the moment a 2-minute bar becomes final */
      if (flash && bars[flash.idx]) {
        var fa = 1 - (t - flash.t0) / FLASH_DUR;
        if (fa > 0) {
          var b2 = bars[flash.idx], fx = X(flash.idx);
          g.strokeStyle = rgba(p.gold, fa * .28); g.lineWidth = 6;
          g.strokeRect(fx - bw / 2 - 3, Y(b2.h) - 3, bw + 6, Y(b2.l) - Y(b2.h) + 6);
          g.strokeStyle = rgba(p.gold, fa * .95); g.lineWidth = 1.6;
          g.strokeRect(fx - bw / 2 - 2.5, Y(b2.h) - 2.5, bw + 5, Y(b2.l) - Y(b2.h) + 5);
        }
      }

      /* ---------- VOLUME ---------- */
      if (showVol) {
        var vTop = padT + plotH + 10, maxV = 1;
        bars.forEach(function (b) { maxV = Math.max(maxV, b.v); });
        var vAnn = {};
        annos.forEach(function (r) { if (r.a.type === "vbar") vAnn[r.a.i] = r; });
        var vCount = shown + (form && form.idx === shown && form.idx < n ? 1 : 0);
        for (var j = 0; j < vCount && j < n; j++) {
          var bb = bars[j], hh = (bb.v / maxV) * volH * (j === shown ? formT : 1);
          var va = vAnn[j];
          if (va) {
            var vp = prog(va.k, t);
            g.fillStyle = bb.c >= bb.o ? p.upSoft : p.dnSoft;
            g.fillRect(X(j) - bw / 2, vTop + volH - hh, bw, hh);
            g.save(); g.globalAlpha = easeOut(vp); g.fillStyle = CC(va.a.color);
            g.fillRect(X(j) - bw / 2, vTop + volH - hh, bw, hh); g.restore();
          } else {
            g.fillStyle = bb.c >= bb.o ? p.upSoft : p.dnSoft;
            g.fillRect(X(j) - bw / 2, vTop + volH - hh, bw, hh);
          }
        }
        g.strokeStyle = p.grid; g.beginPath();
        g.moveTo(padL, vTop + volH + .5); g.lineTo(padL + plotW, vTop + volH + .5); g.stroke();
        g.fillStyle = p.mut; g.textAlign = "left";
        g.font = (9.5 * scale).toFixed(1) + "px 'Space Mono',monospace";
        g.fillText("vol", padL + plotW + 7, vTop + volH - 6);
        each("vbar", function (a, pr) {
          if (!a.label || a.i >= shown) return;
          g.save(); g.globalAlpha = clamp01((pr - .4) / .6);
          g.fillStyle = CC(a.color, p.gold); g.textAlign = "center";
          g.font = "700 " + (9.5 * scale).toFixed(1) + "px Oxanium,sans-serif";
          g.fillText(a.label, X(a.i), vTop - 3);
          g.restore();
        });
        L.vTop = vTop;
      }

      /* ---------- the W / M traced through its points ---------- */
      each("path", function (a, pr) {
        var pts = [];
        (a.points || []).forEach(function (q) {
          var b = bars[q.i]; if (!b) return;
          var v = typeof q.price === "number" ? q.price : q.side === "high" ? b.h : q.side === "low" ? b.l : b.c;
          pts.push([X(q.i), Y(v)]);
        });
        if (pts.length < 2) return;
        var f = easeInOut(pr), col = CC(a.color, p.gold);
        var segs = [], total = 0;
        for (var i2 = 1; i2 < pts.length; i2++) {
          var dx = pts[i2][0] - pts[i2 - 1][0], dy = pts[i2][1] - pts[i2 - 1][1];
          var len = Math.sqrt(dx * dx + dy * dy); segs.push(len); total += len;
        }
        var want = total * f;
        g.save(); g.lineCap = "round"; g.lineJoin = "round";
        [[rgba(col, .22), 9 * scale], [col, 2.6 * scale]].forEach(function (st) {
          g.strokeStyle = st[0]; g.lineWidth = st[1];
          g.beginPath(); g.moveTo(pts[0][0], pts[0][1]);
          var acc = 0;
          for (var i3 = 1; i3 < pts.length; i3++) {
            if (acc + segs[i3 - 1] <= want) { g.lineTo(pts[i3][0], pts[i3][1]); acc += segs[i3 - 1]; }
            else {
              var ff = (want - acc) / segs[i3 - 1];
              g.lineTo(pts[i3 - 1][0] + (pts[i3][0] - pts[i3 - 1][0]) * ff, pts[i3 - 1][1] + (pts[i3][1] - pts[i3 - 1][1]) * ff);
              break;
            }
          }
          g.stroke();
        });
        var reach = 0;
        pts.forEach(function (q, i4) {
          if (i4 > 0) reach += segs[i4 - 1];
          if (reach <= want + 0.01) {
            g.fillStyle = col; g.beginPath(); g.arc(q[0], q[1], 4 * scale, 0, Math.PI * 2); g.fill();
            g.fillStyle = p.bg; g.beginPath(); g.arc(q[0], q[1], 1.6 * scale, 0, Math.PI * 2); g.fill();
          }
        });
        g.restore();
        if (a.label && pr > .85) {
          var lx = a.labelI != null ? X(a.labelI) : (pts[0][0] + pts[pts.length - 1][0]) / 2;
          var ly = typeof a.labelPrice === "number" ? Y(a.labelPrice) : Math.min.apply(null, pts.map(function (q) { return q[1]; })) - 16 * scale;
          drawTag(g, a.label, lx, ly, col, scale, a.align, clamp01((pr - .85) / .15), 1);
        }
      });

      /* ---------- pivots ---------- */
      each("pivot", function (a, pr) {
        var b = bars[a.i]; if (!b) return;
        var yy = a.side === "high" ? Y(b.h) - 9 * scale : Y(b.l) + 9 * scale;
        var col = CC(a.color, a.side === "high" ? p.gold : p.cyan);
        var r = 6.5 * scale * easeOutBack(pr);
        if (pr < 1) {                                  // the ripple
          g.strokeStyle = rgba(col, (1 - pr) * .6); g.lineWidth = 2;
          g.beginPath(); g.arc(X(a.i), yy, 6.5 * scale * (1 + 2.4 * pr), 0, Math.PI * 2); g.stroke();
        }
        g.strokeStyle = col; g.lineWidth = 2;
        g.beginPath(); g.arc(X(a.i), yy, Math.max(0.1, r), 0, Math.PI * 2); g.stroke();
        g.fillStyle = col; g.globalAlpha = .22;
        g.beginPath(); g.arc(X(a.i), yy, Math.max(0.1, r), 0, Math.PI * 2); g.fill();
        g.globalAlpha = 1;
        if (a.label) {
          var ly = a.side === "high" ? yy - 13 * scale : yy + 19 * scale;
          drawTag(g, a.label, X(a.i), ly, col, scale, null, clamp01((pr - .25) / .6), .7 + .3 * easeOutBack((pr - .25) / .6));
        }
      });

      /* ---------- floating text labels ---------- */
      each("note", function (a, pr) {
        var x = X(a.i), y = Y(a.price) + (a.dy || 0) * scale;
        drawTag(g, a.text, x, y, CC(a.color, p.orange), scale, a.align, pr, .6 + .4 * easeOutBack(pr));
      });

      /* ---------- arrows ---------- */
      each("arrow", function (a, pr) {
        var x1 = X(a.i), y1 = Y(a.price), x2 = X(a.toI), y2 = Y(a.toPrice);
        var f = easeOut(pr / .85), xe = x1 + (x2 - x1) * f, ye = y1 + (y2 - y1) * f;
        var col = CC(a.color, p.lime);
        g.strokeStyle = col; g.lineWidth = 2.1;
        g.beginPath(); g.moveTo(x1, y1); g.lineTo(xe, ye); g.stroke();
        if (pr > .8) {
          var ang = Math.atan2(y2 - y1, x2 - x1), hl = 9 * scale;
          g.save(); g.globalAlpha = clamp01((pr - .8) / .2); g.fillStyle = col;
          g.beginPath(); g.moveTo(xe, ye);
          g.lineTo(xe - hl * Math.cos(ang - 0.42), ye - hl * Math.sin(ang - 0.42));
          g.lineTo(xe - hl * Math.cos(ang + 0.42), ye - hl * Math.sin(ang + 0.42));
          g.closePath(); g.fill(); g.restore();
        }
        if (a.text) drawTag(g, a.text, (x1 + x2) / 2, (y1 + y2) / 2 - 12 * scale, col, scale, null, clamp01((pr - .6) / .4), 1);
      });

      /* ---------- a vertical tick / dollar ruler ---------- */
      function vruler(x, p1, p2, col, label, pr, side, lw, labelY) {
        var yTop = Y(Math.max(p1, p2)), yBot = Y(Math.min(p1, p2));
        var fromTop = p1 >= p2;                     // grow away from p1
        var yA = fromTop ? yTop : yBot, yB = fromTop ? yBot : yTop;
        var yE = yA + (yB - yA) * easeOut(pr);
        g.strokeStyle = col; g.lineWidth = lw || 1.6; g.setLineDash([]);
        g.beginPath(); g.moveTo(x, yA); g.lineTo(x, yE); g.stroke();
        g.beginPath(); g.moveTo(x - 5 * scale, yA); g.lineTo(x + 5 * scale, yA); g.stroke();
        if (pr > .97) { g.beginPath(); g.moveTo(x - 5 * scale, yB); g.lineTo(x + 5 * scale, yB); g.stroke(); }
        if (pr > .65) {
          var tk = ticksBetween(p1, p2);
          var txt = label || (tickWord(tk) + " · " + usd(tk));
          var tx = side === "left" ? x - 8 * scale : x + 8 * scale;
          var ty = typeof labelY === "number" ? Y(labelY) : (yTop + yBot) / 2;
          drawTag(g, txt, tx, ty, col, scale, side === "left" ? "right" : "left", clamp01((pr - .65) / .35), 1);
        }
      }
      each("ruler", function (a, pr) {
        vruler(X(a.i), a.p1, a.p2, CC(a.color, p.orange), a.label, pr, a.side || "right", a.weight, a.labelY);
      });

      /* ---------- trade brackets (entry / stop / target) ---------- */
      each("trade", function (a, pr) {
        var x0 = X(a.fromI) - slot / 2, x1 = padL + plotW;
        var pr1 = easeOut(pr / .4), pr2 = clamp01((pr - .3) / .5), pr3 = clamp01((pr - .55) / .45);
        var rulerX = x0 + 12 * scale, labelX = a.noRuler ? x0 + 8 : x0 + 26 * scale;
        g.save(); g.globalAlpha = pr2;
        if (a.target != null) {
          g.fillStyle = "rgba(74,222,128,.13)";
          g.fillRect(x0, Y(a.target), x1 - x0, Y(a.entry) - Y(a.target));
        }
        if (a.stop != null) {
          g.fillStyle = "rgba(244,63,94,.15)";
          g.fillRect(x0, Y(a.entry), x1 - x0, Y(a.stop) - Y(a.entry));
        }
        g.restore();
        /* The whole point of Door A is that entry and stop are only a few ticks
           apart — so their labels WILL collide if both sit above their line.
           Entry and target label upward, the stop labels downward. */
        [["entry", a.entry, p.gold, "ENTRY " + fmt(a.entry), -1, pr1],
         ["stop", a.stop, p.dn, "STOP " + fmt(a.stop), 1, pr2],
         ["target", a.target, p.up, (a.targetLabel || "TARGET") + " " + fmt(a.target), -1, pr2]].forEach(function (r) {
          if (r[1] == null || r[5] <= 0) return;
          var y = Y(r[1]);
          g.strokeStyle = r[2]; g.lineWidth = 1.7; g.setLineDash([6, 4]);
          g.beginPath(); g.moveTo(x0, y + .5); g.lineTo(x0 + (x1 - x0) * r[5], y + .5); g.stroke();
          g.setLineDash([]);
          if (r[5] < .6) return;
          g.save(); g.globalAlpha = clamp01((r[5] - .6) / .4);
          g.font = "800 " + (10 * scale).toFixed(1) + "px Oxanium,sans-serif";
          var tw = g.measureText(r[3]).width, th = 14 * scale;
          var ly = y + r[4] * (th * 0.62 + 2);
          g.fillStyle = themeIsLight() ? "rgba(255,255,255,.9)" : "rgba(8,17,32,.86)";
          g.fillRect(labelX - 4, ly - th / 2, tw + 8, th);
          g.fillStyle = r[2]; g.textAlign = "left"; g.textBaseline = "middle";
          g.fillText(r[3], labelX, ly + .5);
          g.textBaseline = "alphabetic";
          g.restore();
        });
        /* the rulers: what you risk, what you are paid — in ticks and dollars */
        if (!a.noRuler && pr3 > 0) {
          if (a.stop != null) vruler(rulerX, a.entry, a.stop, p.dn, a.riskLabel, pr3, "right");
          if (a.target != null) vruler(rulerX, a.entry, a.target, p.up, a.rewardLabel, pr3, "right");
        }
      });

      /* ---------- live price line + axis tag ---------- */
      if (liveY != null) {
        var ly2 = liveY, lc = live.up ? p.up : p.dn;
        g.strokeStyle = rgba(lc, .7); g.lineWidth = 1; g.setLineDash([2, 4]);
        g.beginPath(); g.moveTo(live.x + bw / 2 + 2, ly2 + .5); g.lineTo(padL + plotW, ly2 + .5); g.stroke();
        g.setLineDash([]);
        g.font = "700 " + (10 * scale).toFixed(1) + "px 'Space Mono',monospace";
        var ltxt = fmt(live.price), ltw = g.measureText(ltxt).width + 8 * scale, lth = 15 * scale;
        g.fillStyle = lc;
        roundRect(g, padL + plotW + 2, ly2 - lth / 2, ltw, lth, 3); g.fill();
        g.fillStyle = p.tagInk; g.textAlign = "left"; g.textBaseline = "middle";
        g.fillText(ltxt, padL + plotW + 2 + 4 * scale, ly2 + .5);
      }

      /* ---------- corner stamp ---------- */
      g.font = "600 " + (9.5 * scale).toFixed(1) + "px Oxanium,sans-serif";
      g.fillStyle = p.mut; g.textAlign = "left"; g.textBaseline = "middle";
      g.fillText(spec.stamp || "M2K · 2-minute · teaching example, not real market data", padL + 4, padT + 8);

      drawOverlay();
    }

    function drawTag(g, text, x, y, col, scale, align, alpha, k) {
      if (alpha != null && alpha <= 0) return;
      g.save();
      if (alpha != null) g.globalAlpha = Math.min(1, alpha);
      if (k != null && k !== 1) { g.translate(x, y); g.scale(k, k); g.translate(-x, -y); }
      g.font = "800 " + (11 * scale).toFixed(1) + "px Oxanium,sans-serif";
      var w = g.measureText(text).width + 12 * scale, h = 17 * scale;
      var lx = align === "left" ? x : align === "right" ? x - w : x - w / 2;
      g.fillStyle = pal().tagBg;
      roundRect(g, lx, y - h / 2, w, h, 5 * scale); g.fill();
      g.strokeStyle = col; g.lineWidth = 1.2;
      roundRect(g, lx, y - h / 2, w, h, 5 * scale); g.stroke();
      g.fillStyle = col; g.textAlign = "center"; g.textBaseline = "middle";
      g.fillText(text, lx + w / 2, y + .5);
      g.restore();
    }
    function roundRect(g, x, y, w, h, r) {
      g.beginPath();
      g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r);
      g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r);
      g.arcTo(x, y, x + w, y, r); g.closePath();
    }
    function niceStep(raw) {
      var p10 = Math.pow(10, Math.floor(Math.log(raw) / Math.LN10));
      var f = raw / p10;
      return (f > 5 ? 10 : f > 2 ? 5 : f > 1 ? 2 : 1) * p10;
    }

    /* ============================================================
       OVERLAY — crosshair, readout, drag ruler, the drill's picker
       ============================================================ */
    function priceAt(y) {
      /* L is only set by draw(). A pointer can in principle arrive before the
         first animation frame has run (a tab that has never painted), so draw
         once rather than hand back null — a null here became "23421 ticks" in
         the drill's stop verdict. */
      if (!L) draw(now());
      if (!L) return null;
      var v = L.lo + (L.hi - L.lo) * (1 - (y - L.padT) / L.plotH);
      return round1(Math.max(L.lo, Math.min(L.hi, v)));
    }
    function barAt(x) {
      if (!L) draw(now());
      if (!L) return -1;
      var i = Math.floor((x - L.padL) / L.slot);
      if (i < 0) i = 0;
      var vis = shown + (form && form.idx === shown ? 1 : 0);
      if (i > vis - 1) i = vis - 1;
      return Math.min(i, bars.length - 1);
    }
    function drawOverlay() {
      if (!L) return;
      var o = cv2.getContext("2d");
      o.setTransform(L.dpr, 0, 0, L.dpr, 0, 0);
      o.clearRect(0, 0, L.cssW, L.cssH);
      var p = pal(), s = L.scale, X = L.X, Y = L.Y;
      var plotBottom = L.padT + L.plotH + (showVol ? 10 + L.volH : 0);

      if (pick) {
        if (!hover) return;
        var pv = priceAt(hover.y), py = Y(pv), pc = CC(pick.color, p.dn);
        o.strokeStyle = pc; o.lineWidth = 1.8; o.setLineDash([8, 5]);
        o.beginPath(); o.moveTo(L.padL, py + .5); o.lineTo(L.padL + L.plotW, py + .5); o.stroke();
        o.setLineDash([]);
        drawTag(o, (pick.label || "HERE") + "  " + fmt(pv), L.padL + L.plotW - 8 * s, py - 14 * s, pc, s, "right", 1, 1);
        if (pick.hint) drawTag(o, pick.hint, L.padL + 8 * s, py + 14 * s, pc, s, "left", 1, 1);
        return;
      }

      function rulerBox(r) {
        var xa = Math.min(r.x1, r.x2), xb = Math.max(r.x1, r.x2);
        var ya = Math.min(r.y1, r.y2), yb = Math.max(r.y1, r.y2);
        var p1 = priceAt(r.y1), p2 = priceAt(r.y2);
        var i1 = barAt(r.x1), i2 = barAt(r.x2);
        var tk = ticksBetween(p1, p2), nb = Math.abs(i2 - i1) + 1;
        o.fillStyle = rgba(p.gold, .09); o.fillRect(xa, ya, xb - xa, yb - ya);
        o.strokeStyle = p.gold; o.lineWidth = 1.2; o.setLineDash([5, 4]);
        o.strokeRect(xa + .5, ya + .5, xb - xa, yb - ya); o.setLineDash([]);
        o.strokeStyle = p.gold; o.lineWidth = 1.6;
        o.beginPath(); o.moveTo(xb + 6 * s, ya); o.lineTo(xb + 6 * s, yb); o.stroke();
        o.beginPath(); o.moveTo(xb + 2 * s, ya); o.lineTo(xb + 10 * s, ya); o.stroke();
        o.beginPath(); o.moveTo(xb + 2 * s, yb); o.lineTo(xb + 10 * s, yb); o.stroke();
        var txt = tickWord(tk) + " · " + usd(tk) + "/contract · " + nb + (nb === 1 ? " bar" : " bars");
        var ty = ya - 14 * s; if (ty < L.padT + 12 * s) ty = yb + 14 * s;
        drawTag(o, txt, (xa + xb) / 2, ty, p.gold, s, null, 1, 1);
      }
      if (ruler) rulerBox(ruler);
      if (drag && drag.moved) rulerBox({ x1: drag.x, y1: drag.y, x2: drag.cx, y2: drag.cy });

      if (hover && !(drag && drag.moved)) {
        var i = barAt(hover.x); if (i < 0) return;
        var b = bars[i], x = X(i);
        var hy = Math.max(L.padT, Math.min(plotBottom, hover.y));
        var hp = priceAt(hy);
        o.strokeStyle = p.hair; o.lineWidth = 1; o.setLineDash([3, 3]);
        o.beginPath(); o.moveTo(x + .5, L.padT); o.lineTo(x + .5, plotBottom); o.stroke();
        if (hy <= L.padT + L.plotH) {
          o.beginPath(); o.moveTo(L.padL, hy + .5); o.lineTo(L.padL + L.plotW, hy + .5); o.stroke();
        }
        o.setLineDash([]);
        /* axis tags: the price under the cursor, the bar's time */
        o.font = "700 " + (10 * s).toFixed(1) + "px 'Space Mono',monospace";
        if (hy <= L.padT + L.plotH) {
          var ptxt = fmt(hp), ptw = o.measureText(ptxt).width + 8 * s, pth = 15 * s;
          o.fillStyle = p.txt; roundRect(o, L.padL + L.plotW + 2, hy - pth / 2, ptw, pth, 3); o.fill();
          o.fillStyle = p.bg; o.textAlign = "left"; o.textBaseline = "middle";
          o.fillText(ptxt, L.padL + L.plotW + 2 + 4 * s, hy + .5);
        }
        var ttw = o.measureText(b.t).width + 8 * s, tth = 14 * s;
        o.fillStyle = p.txt; roundRect(o, x - ttw / 2, L.cssH - L.padB / 2 - 2 - tth / 2, ttw, tth, 3); o.fill();
        o.fillStyle = p.bg; o.textAlign = "center"; o.fillText(b.t, x, L.cssH - L.padB / 2 - 2 + .5);

        /* the readout */
        var lines = [
          b.t + "   O " + fmt(b.o) + "   H " + fmt(b.h) + "   L " + fmt(b.l) + "   C " + fmt(b.c),
          "range " + tickWord(ticksBetween(b.h, b.l)) + "  ·  vol " + String(b.v).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        ];
        if (ref) {
          var d = Math.round((hp - ref.price) * 10);
          lines.push(d === 0 ? "right on " + ref.label : tickWord(Math.abs(d)) + (d > 0 ? " above " : " below ") + ref.label);
        }
        o.font = "600 " + (10.5 * s).toFixed(1) + "px 'Space Mono',monospace";
        var w = 0; lines.forEach(function (ln) { w = Math.max(w, o.measureText(ln).width); });
        w += 16 * s;
        var lh = 15 * s, h = lh * lines.length + 10 * s;
        var bx = x + 14 * s, by = hy - h - 10 * s;
        if (bx + w > L.padL + L.plotW) bx = x - 14 * s - w;
        if (by < L.padT + 4) by = hy + 14 * s;
        if (by + h > L.cssH - 4) by = L.cssH - 4 - h;
        o.fillStyle = p.tagBg; roundRect(o, bx, by, w, h, 6 * s); o.fill();
        o.strokeStyle = rgba(p.txt, .25); o.lineWidth = 1; roundRect(o, bx, by, w, h, 6 * s); o.stroke();
        o.textAlign = "left"; o.textBaseline = "middle";
        lines.forEach(function (ln, k) {
          o.fillStyle = k === 0 ? p.txt : k === 2 ? p.cyan : p.mut;
          o.fillText(ln, bx + 8 * s, by + 5 * s + lh * (k + .5));
        });
      }
    }

    /* ---------- pointer handling ---------- */
    function pt(e) {
      var r = cv.getBoundingClientRect();
      return { x: (e.clientX - r.left) * (L ? L.cssW / r.width : 1), y: (e.clientY - r.top) * (L ? L.cssH / r.height : 1) };
    }
    wrap.addEventListener("pointermove", function (e) {
      if (e.pointerType === "touch") return;
      hover = pt(e);
      if (drag) {
        drag.cx = hover.x; drag.cy = hover.y;
        if (!drag.moved && Math.abs(drag.cx - drag.x) + Math.abs(drag.cy - drag.y) > 5) { drag.moved = true; ruler = null; }
      }
      drawOverlay();
    });
    wrap.addEventListener("pointerleave", function (e) {
      if (e.pointerType === "touch") return;
      hover = null; drag = null; drawOverlay();
    });
    wrap.addEventListener("pointerdown", function (e) {
      if (e.button !== 0) return;
      var q = pt(e);
      if (e.pointerType === "touch") { drag = { x: q.x, y: q.y, cx: q.x, cy: q.y, touch: true }; return; }
      drag = { x: q.x, y: q.y, cx: q.x, cy: q.y, moved: false };
      try { wrap.setPointerCapture(e.pointerId); } catch (err) {}
    });
    wrap.addEventListener("pointerup", function (e) {
      var q = pt(e);
      if (e.pointerType === "touch") {
        var tap = drag && Math.abs(q.x - drag.x) + Math.abs(q.y - drag.y) < 10;
        drag = null;
        if (!tap) return;
        if (pick) { var cb = pick.cb; pick = null; wrap.classList.remove("picking"); hover = null; drawOverlay(); cb(priceAt(q.y), barAt(q.x)); return; }
        hover = (hover && Math.abs(hover.x - q.x) < 12) ? null : q;
        drawOverlay();
        return;
      }
      try { wrap.releasePointerCapture(e.pointerId); } catch (err) {}
      if (drag && drag.moved) ruler = { x1: drag.x, y1: drag.y, x2: q.x, y2: q.y };
      else ruler = null;
      drag = null;
      if (pick) { var cb2 = pick.cb; pick = null; wrap.classList.remove("picking"); drawOverlay(); cb2(priceAt(q.y), barAt(q.x)); return; }
      drawOverlay();
    });
    wrap.addEventListener("pointercancel", function () { drag = null; drawOverlay(); });

    /* ---------- wire up ---------- */
    var ro = null;
    if (root.ResizeObserver) { ro = new ResizeObserver(function () { requestFrame(); }); ro.observe(wrap); }
    else root.addEventListener("resize", requestFrame);

    fig._render = function () { setShown(shown, { instant: true }); };
    fig._draw = function () { draw(now()); };
    fig._stop = function () { halt(); form = null; if (raf) { root.cancelAnimationFrame(raf); raf = null; } };
    fig._api = {
      play: play,
      start: function () { if (!playing) play(); },
      pause: stop,
      step: function (d) { nav(shown + (d || 1), d < 0 ? { instant: true } : undefined); },
      seek: function (n, instant) { nav(n, instant ? { instant: true } : undefined); },
      shown: function () { return shown; },
      total: function () { return bars.length; },
      playing: function () { return playing; },
      bars: bars,
      ref: ref,
      onChange: function (fn) { listeners.push(fn); },
      toggleFs: toggleFs,
      isFs: function () { return fig.classList.contains("fs"); },
      addAnnotations: function (list) {
        (list || []).forEach(function (a) { annosAll.push(a); });
        requestFrame();
      },
      removeAnnotations: function (test) {
        for (var i = annosAll.length - 1; i >= 0; i--) if (test(annosAll[i])) annosAll.splice(i, 1);
        born = {}; requestFrame();
      },
      pick: function (opts, cb) {            // opts: { label, hint, color }
        pick = Object.assign({ cb: cb }, opts || {});
        wrap.classList.add("picking"); ruler = null; drawOverlay();
      },
      cancelPick: function () { pick = null; wrap.classList.remove("picking"); drawOverlay(); },
      priceAt: priceAt, barAt: barAt,
      redraw: requestFrame
    };
    D._figs.push(fig);

    setTimeout(function () {
      setShown(shown, { instant: true });
      draw(now());          /* paint once synchronously — rAF never runs in a tab that has not painted */
      if (spec.autoplay) { setShown(1, { instant: true }); play(); }
    }, 20);

    /* ---- roll it once when it first scrolls into view ----
       A chart parked on bar 1 reads as broken. So the first time the figure
       is actually on screen it plays itself through once; after that it is
       entirely hand-driven. Learner control is preserved — every button
       still works and a single click stops it. */
    if (spec.startAt != null && spec.startAt <= 2 && root.IntersectionObserver && !spec.noRoll) {
      var rolled = false;
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (rolled || !en.isIntersecting) return;
          /* pixel-based, not ratio-based: a figure taller than the viewport can
             never reach a high ratio, so ratio alone would never trigger on a
             small screen. Roll once ~a third of the figure is actually on screen. */
          var seen = en.intersectionRect ? en.intersectionRect.height : 0;
          if (seen < 240 && en.intersectionRatio < 0.3) return;
          rolled = true; io.disconnect();
          setTimeout(function () { if (!playing && shown <= 2) play(); }, 260);
        });
      }, { threshold: [0, 0.15, 0.3, 0.6, 1] });
      io.observe(fig);
      fig._io = io;
    }

    return fig;
  };

  /* ============================================================
     DBM.chartPair({ title, a, b, note }) — two charts, one set of
     controls, playing in lockstep. note(shown) → html under the bar.
     ============================================================ */
  D.chartPair = function (o) {
    var host = document.createElement("div");
    host.className = "fig-pair";
    o.a.inPair = true; o.b.inPair = true;
    o.a.aspect = o.a.aspect || 0.72; o.b.aspect = o.b.aspect || 0.72;
    o.a.noRoll = true; o.b.noRoll = true;
    var maxN = Math.max(o.a.bars.length, o.b.bars.length);

    var bar = document.createElement("div");
    bar.className = "fig-pair-bar";
    bar.innerHTML =
      '<span class="fig-pair-title">' + esc(o.title || "Side by side") + "</span>" +
      '<button class="cbtn play" type="button">▶ Play both</button>' +
      '<button class="cbtn back" type="button" title="One bar back">◀</button>' +
      '<button class="cbtn fwd" type="button" title="One bar forward">▶|</button>' +
      '<input class="fig-scrub" type="range" min="1" max="' + maxN + '" value="1" aria-label="Bars shown">' +
      '<span class="fig-hint bar-lbl mono"></span>' +
      '<button class="cbtn rst" type="button">↺ Replay both</button>';
    bar.appendChild(speedGroup());
    host.appendChild(bar);

    var grid = document.createElement("div");
    grid.className = "fig-pair-grid";
    var fa = D.chart(o.a), fb = D.chart(o.b);
    grid.appendChild(fa); grid.appendChild(fb);
    host.appendChild(grid);

    var note = null;
    if (o.note) { note = document.createElement("div"); note.className = "fig-pair-note"; host.appendChild(note); }

    var A = fa._api, B = fb._api;
    var elPlay = bar.querySelector(".play"), elScrub = bar.querySelector(".fig-scrub"), elLbl = bar.querySelector(".bar-lbl");
    function both(fn) { fn(A); fn(B); }
    function minShown() { return Math.min(A.shown(), B.shown()); }
    function anyPlaying() { return A.playing() || B.playing(); }
    var lastNote = "";
    function paint() {
      var s = minShown();
      elScrub.value = s;
      elLbl.textContent = s + " / " + maxN;
      elPlay.textContent = anyPlaying() ? "⏸ Pause both" : "▶ Play both";
      elPlay.classList.toggle("on", anyPlaying());
      if (note) {
        var h = o.note(s) || "";
        if (h !== lastNote) {
          lastNote = h; note.innerHTML = h;
          if (!REDUCED) { note.classList.remove("swap"); void note.offsetWidth; note.classList.add("swap"); }
        }
      }
    }
    elPlay.onclick = function () {
      if (anyPlaying()) { both(function (x) { x.pause(); }); }
      else {
        var s = minShown();
        if (s >= Math.min(A.total(), B.total())) s = 1;
        both(function (x) { x.seek(s, true); });
        both(function (x) { x.start(); });
      }
      paint();
    };
    bar.querySelector(".back").onclick = function () { both(function (x) { x.step(-1); }); };
    bar.querySelector(".fwd").onclick = function () { both(function (x) { x.step(1); }); };
    bar.querySelector(".rst").onclick = function () { both(function (x) { x.seek(1, true); }); both(function (x) { x.start(); }); paint(); };
    elScrub.oninput = function () { var v = parseInt(elScrub.value, 10); both(function (x) { x.seek(v, true); }); };
    A.onChange(paint); B.onChange(paint);
    setTimeout(paint, 40);

    /* roll once, together, when the pair scrolls into view */
    if (root.IntersectionObserver) {
      var rolled = false;
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (rolled || !en.isIntersecting) return;
          var seen = en.intersectionRect ? en.intersectionRect.height : 0;
          if (seen < 240 && en.intersectionRatio < 0.3) return;
          rolled = true; io.disconnect();
          setTimeout(function () { if (!anyPlaying() && minShown() <= 2) elPlay.onclick(); }, 260);
        });
      }, { threshold: [0, 0.15, 0.3, 0.6, 1] });
      io.observe(host);
      fa._io = io;
    }
    return host;
  };

  /* ---------- keyboard, only while a chart is full screen ---------- */
  document.addEventListener("keydown", function (e) {
    var f = document.querySelector(".fig.fs");
    if (!f || !f._api) return;
    if (e.target && /input|select|textarea/i.test(e.target.tagName)) return;
    if (e.key === "Escape") { f._api.toggleFs(); e.preventDefault(); }
    else if (e.key === " " || e.key === "Spacebar") { f._api.play(); e.preventDefault(); }
    else if (e.key === "ArrowRight") { f._api.step(1); e.preventDefault(); }
    else if (e.key === "ArrowLeft") { f._api.step(-1); e.preventDefault(); }
  });

  D._figs = [];
  D.redrawAll = function () { D._figs.forEach(function (f) { if (f.isConnected) f._api.redraw(); }); };
  D.stopAll = function () {
    D._figs.forEach(function (f) {
      try { f._stop(); } catch (e) {}
      try { if (f._io) f._io.disconnect(); } catch (e) {}
    });
    D._figs = D._figs.filter(function (f) { return f.isConnected; });
    D._speedUIs = D._speedUIs.slice(-40);
  };

  function verdictCls(v) { return v === "good" ? "g" : v === "bad" ? "r" : v === "warn" ? "a" : "c"; }
  function verdictWord(v) {
    return v === "good" ? "TAKE IT" : v === "bad" ? "SKIP IT" : v === "warn" ? "CAREFUL" : "STUDY";
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  D.esc = esc;
  D.money = { fmt: fmt, ticksBetween: ticksBetween, usd: usd, tickWord: tickWord };
})(window);
