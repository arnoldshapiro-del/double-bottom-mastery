/* ============================================================
   chart.js — the animated 2-minute candle engine
   ------------------------------------------------------------
   Bars reveal one at a time under the learner's control (play,
   pause, step, scrub, replay). Annotations switch on as the
   reveal reaches them, so the story builds instead of arriving
   pre-solved. Double-click the chart to fill the screen; double-
   click again to put it back.

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
    txt: "#E6EDF7", mut: "#94A3B8", bg: "#081120", panel: "#0F1B2D"
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
      txt: "#101B2D", mut: "#51637C", bg: "#FFFFFF", panel: "#F1F5FB"
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

  var seq = 0;

  /* ============================================================
     DBM.chart(spec) → returns the figure element
     ============================================================ */
  D.chart = function (spec) {
    var id = "fig" + (++seq);
    var bars = spec.bars || [];
    var showVol = spec.volume !== false;
    var steps = (spec.steps || []).slice().sort(function (a, b) { return a.at - b.at; });

    var fig = document.createElement("figure");
    fig.className = "fig";
    fig.id = id;

    /* ---------- head ---------- */
    var head = document.createElement("div");
    head.className = "fig-head";
    head.innerHTML =
      '<span class="fig-title">' + esc(spec.title || "M2K · 2-minute") + "</span>" +
      (spec.verdict ? '<span class="pill ' + verdictCls(spec.verdict) + '">' + esc(spec.verdictText || verdictWord(spec.verdict)) + "</span>" : "") +
      '<span class="fig-hint">double-click chart = full screen</span>';
    fig.appendChild(head);

    /* ---------- canvas ---------- */
    var wrap = document.createElement("div");
    wrap.className = "fig-canvas-wrap";
    var cv = document.createElement("canvas");
    wrap.appendChild(cv);
    fig.appendChild(wrap);

    /* ---------- step caption ---------- */
    var stepBox = null;
    if (steps.length) {
      stepBox = document.createElement("div");
      stepBox.className = "fig-step";
      fig.appendChild(stepBox);
    }

    /* ---------- controls ---------- */
    var ctr = document.createElement("div");
    ctr.className = "fig-ctrls";
    ctr.innerHTML =
      '<button class="cbtn play" type="button">▶ Play</button>' +
      '<button class="cbtn back" type="button" title="One bar back">◀</button>' +
      '<button class="cbtn fwd" type="button" title="One bar forward">▶|</button>' +
      '<input class="fig-scrub" type="range" min="1" max="' + bars.length + '" value="' + bars.length + '">' +
      '<span class="fig-hint bar-lbl mono"></span>' +
      '<button class="cbtn all" type="button">Show all</button>' +
      '<button class="cbtn rst" type="button">↺ Replay</button>' +
      '<button class="cbtn fs" type="button">⛶ Full screen</button>';
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
    var timer = null, playing = false;

    var elPlay = ctr.querySelector(".play"),
        elBack = ctr.querySelector(".back"),
        elFwd = ctr.querySelector(".fwd"),
        elScrub = ctr.querySelector(".fig-scrub"),
        elLbl = ctr.querySelector(".bar-lbl"),
        elAll = ctr.querySelector(".all"),
        elRst = ctr.querySelector(".rst"),
        elFs = ctr.querySelector(".fs");

    function setShown(n, fromScrub) {
      shown = Math.max(1, Math.min(bars.length, n));
      if (!fromScrub) elScrub.value = shown;
      elLbl.textContent = shown + " / " + bars.length + (bars[shown - 1] ? "  ·  " + bars[shown - 1].t : "");
      updateStep();
      draw();
    }
    function updateStep() {
      if (!stepBox) return;
      var cur = null;
      for (var i = 0; i < steps.length; i++) if (steps[i].at <= shown) cur = steps[i];
      stepBox.innerHTML = cur ? cur.text : (spec.stepIntro || "<b>Press Play</b> — the bars will build one at a time.");
    }
    function play() {
      if (playing) { stop(); return; }
      if (shown >= bars.length) setShown(1);
      playing = true; elPlay.textContent = "⏸ Pause"; elPlay.classList.add("on");
      timer = setInterval(function () {
        if (shown >= bars.length) { stop(); return; }
        setShown(shown + 1);
      }, spec.speed || 340);
    }
    function stop() {
      var was = playing;
      playing = false; clearInterval(timer); timer = null;
      elPlay.textContent = "▶ Play"; elPlay.classList.remove("on");
      /* repaint so the "newest bar" highlight box doesn't stay stuck on the
         final candle after playback ends */
      if (was) draw();
    }

    elPlay.onclick = play;
    elBack.onclick = function () { stop(); setShown(shown - 1); };
    elFwd.onclick = function () { stop(); setShown(shown + 1); };
    elScrub.oninput = function () { stop(); setShown(parseInt(elScrub.value, 10), true); };
    elAll.onclick = function () { stop(); setShown(bars.length); };
    elRst.onclick = function () { stop(); setShown(1); play(); };
    elFs.onclick = function (e) { e.stopPropagation(); toggleFs(); };

    /* ---------- full screen ---------- */
    function toggleFs() {
      var on = fig.classList.toggle("fs");
      document.body.classList.toggle("fs-lock", on);
      elFs.textContent = on ? "⛶ Exit full screen" : "⛶ Full screen";
      setTimeout(draw, 30);
    }
    wrap.addEventListener("dblclick", function (e) { e.preventDefault(); toggleFs(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && fig.classList.contains("fs")) toggleFs();
    });

    /* ============================================================
       DRAW
       ============================================================ */
    function draw() {
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
      var dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      cv.width = Math.round(cssW * dpr); cv.height = Math.round(cssH * dpr);
      cv.style.width = cssW + "px"; cv.style.height = cssH + "px";
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
      (spec.annotations || []).forEach(function (a) {
        ["price", "y1", "y2", "entry", "stop", "target", "lowPrice", "neckPrice", "toPrice"].forEach(function (k) {
          if (typeof a[k] === "number") { lo = Math.min(lo, a[k]); hi = Math.max(hi, a[k]); }
        });
      });
      var pad = (hi - lo) * 0.09 || 1;
      lo -= pad; hi += pad;

      var n = bars.length;
      var slot = plotW / n;
      var bw = Math.max(2.4, Math.min(slot * 0.66, 22 * scale));

      function X(i) { return padL + slot * (i + 0.5); }
      function Y(v) { return padT + plotH * (1 - (v - lo) / (hi - lo)); }

      /* ---------- grid + price axis ---------- */
      g.font = (10.5 * scale).toFixed(1) + "px 'Space Mono',monospace";
      g.textBaseline = "middle";
      var stepP = niceStep((hi - lo) / (full ? 9 : 6));
      for (var v = Math.ceil(lo / stepP) * stepP; v <= hi; v += stepP) {
        var y = Y(v);
        g.strokeStyle = p.grid; g.lineWidth = 1;
        g.beginPath(); g.moveTo(padL, y + .5); g.lineTo(padL + plotW, y + .5); g.stroke();
        g.fillStyle = p.mut; g.textAlign = "left";
        g.fillText(v.toFixed(1), padL + plotW + 7, y);
      }

      /* ---------- time axis ---------- */
      g.textAlign = "center"; g.fillStyle = p.mut;
      var tEvery = Math.max(1, Math.round(n / (full ? 14 : 8)));
      for (var i = 0; i < n; i++) {
        if (i % tEvery === 0 && bars[i]) g.fillText(bars[i].t, X(i), cssH - padB / 2 - 2);
      }

      var annos = (spec.annotations || []).filter(function (a) {
        return (a.showAt == null ? 0 : a.showAt) < shown;
      });

      /* ---------- zones (behind candles) ---------- */
      annos.filter(function (a) { return a.type === "zone"; }).forEach(function (a) {
        var y1 = Y(Math.max(a.y1, a.y2)), y2 = Y(Math.min(a.y1, a.y2));
        g.fillStyle = CC(a.color, "rgba(34,211,238,.10)");
        var x0 = a.fromI != null ? X(a.fromI) - slot / 2 : padL;
        var x1 = a.toI != null ? X(a.toI) + slot / 2 : padL + plotW;
        g.fillRect(x0, y1, x1 - x0, y2 - y1);
        if (a.label) {
          g.fillStyle = CC(a.textColor, p.cyan); g.textAlign = "left";
          g.font = "700 " + (10.5 * scale).toFixed(1) + "px Oxanium,sans-serif";
          g.fillText(a.label, x0 + 6, y1 + 10 * scale);
        }
      });

      /* ---------- measured-move boxes ---------- */
      annos.filter(function (a) { return a.type === "measured"; }).forEach(function (a) {
        var h = a.neckPrice - a.lowPrice;
        var x0 = X(a.fromI != null ? a.fromI : 0) - slot / 2;
        var x1 = padL + plotW;
        // lower box (the W's height)
        g.strokeStyle = CC(a.color, p.violet); g.lineWidth = 1.4; g.setLineDash([5, 4]);
        g.strokeRect(x0, Y(a.neckPrice), x1 - x0, Y(a.lowPrice) - Y(a.neckPrice));
        // projected box
        g.fillStyle = "rgba(167,139,250,.13)";
        g.fillRect(x0, Y(a.neckPrice + h), x1 - x0, Y(a.neckPrice) - Y(a.neckPrice + h));
        g.strokeRect(x0, Y(a.neckPrice + h), x1 - x0, Y(a.neckPrice) - Y(a.neckPrice + h));
        g.setLineDash([]);
        /* label sits INSIDE the projected box on the left — right-aligning it
           crowds the price axis on narrow charts */
        g.fillStyle = CC(a.color, p.violet); g.textAlign = "left";
        g.font = "700 " + (11 * scale).toFixed(1) + "px Oxanium,sans-serif";
        g.fillText(a.label || ("measured move  " + (Math.round(h * 10) / 10) + " pts"),
          x0 + 9, Y(a.neckPrice + h) + 13 * scale);
      });

      /* ---------- horizontal levels ---------- */
      annos.filter(function (a) { return a.type === "level"; }).forEach(function (a) {
        var y = Y(a.price);
        g.strokeStyle = CC(a.color, p.gold); g.lineWidth = a.weight || 1.7;
        g.setLineDash(a.style === "dash" ? [7, 5] : a.style === "dot" ? [2, 4] : []);
        var x0 = a.fromI != null ? X(a.fromI) - slot / 2 : padL;
        g.beginPath(); g.moveTo(x0, y + .5); g.lineTo(padL + plotW, y + .5); g.stroke();
        g.setLineDash([]);
        if (a.label) {
          g.font = "700 " + (10.5 * scale).toFixed(1) + "px Oxanium,sans-serif";
          var tw = g.measureText(a.label).width + 10;
          g.fillStyle = CC(a.color, p.gold);
          g.fillRect(padL + plotW - tw - 2, y - 8 * scale, tw, 16 * scale);
          g.fillStyle = themeIsLight() ? "#fff" : "#0A1525"; g.textAlign = "center";
          g.fillText(a.label, padL + plotW - tw / 2 - 2, y);
        }
      });

      /* ---------- trendlines / necklines ---------- */
      annos.filter(function (a) { return a.type === "line"; }).forEach(function (a) {
        g.strokeStyle = CC(a.color, p.gold); g.lineWidth = a.weight || 1.8;
        g.setLineDash(a.style === "dash" ? [7, 5] : []);
        g.beginPath(); g.moveTo(X(a.i1), Y(a.p1)); g.lineTo(X(a.i2), Y(a.p2)); g.stroke();
        g.setLineDash([]);
      });

      /* ---------- CANDLES ---------- */
      for (var k = 0; k < shown && k < n; k++) {
        var b = bars[k], x = X(k);
        var up = b.c >= b.o;
        var col = up ? p.up : p.dn;
        var isNew = (k === shown - 1) && playing;
        g.strokeStyle = col; g.lineWidth = Math.max(1, bw * 0.16);
        g.beginPath(); g.moveTo(x, Y(b.h)); g.lineTo(x, Y(b.l)); g.stroke();
        var yO = Y(b.o), yC = Y(b.c);
        var top = Math.min(yO, yC), hgt = Math.max(Math.abs(yC - yO), 1.4);
        g.fillStyle = col; g.globalAlpha = up ? 0.92 : 0.92;
        g.fillRect(x - bw / 2, top, bw, hgt);
        g.globalAlpha = 1;
        if (isNew) { // gentle flash on the freshest bar
          g.strokeStyle = p.gold; g.lineWidth = 1.6;
          g.strokeRect(x - bw / 2 - 2, Y(b.h) - 2, bw + 4, Y(b.l) - Y(b.h) + 4);
        }
      }

      /* ---------- VOLUME ---------- */
      if (showVol) {
        var vTop = padT + plotH + 10, maxV = 1;
        bars.forEach(function (b) { maxV = Math.max(maxV, b.v); });
        var vAnn = {};
        annos.filter(function (a) { return a.type === "vbar"; }).forEach(function (a) { vAnn[a.i] = a; });
        for (var j = 0; j < shown && j < n; j++) {
          var bb = bars[j], hh = (bb.v / maxV) * volH;
          var va = vAnn[j];
          g.fillStyle = va ? CC(va.color) : (bb.c >= bb.o ? p.upSoft : p.dnSoft);
          g.fillRect(X(j) - bw / 2, vTop + volH - hh, bw, hh);
        }
        g.strokeStyle = p.grid; g.beginPath();
        g.moveTo(padL, vTop + volH + .5); g.lineTo(padL + plotW, vTop + volH + .5); g.stroke();
        g.fillStyle = p.mut; g.textAlign = "left";
        g.font = (9.5 * scale).toFixed(1) + "px 'Space Mono',monospace";
        g.fillText("vol", padL + plotW + 7, vTop + volH - 6);
        annos.filter(function (a) { return a.type === "vbar" && a.label; }).forEach(function (a) {
          if (a.i >= shown) return;
          g.fillStyle = CC(a.color, p.gold); g.textAlign = "center";
          g.font = "700 " + (9.5 * scale).toFixed(1) + "px Oxanium,sans-serif";
          g.fillText(a.label, X(a.i), vTop - 3);
        });
      }

      /* ---------- pivots ---------- */
      annos.filter(function (a) { return a.type === "pivot"; }).forEach(function (a) {
        var b = bars[a.i]; if (!b) return;
        var yy = a.side === "high" ? Y(b.h) - 9 * scale : Y(b.l) + 9 * scale;
        var col = CC(a.color, a.side === "high" ? p.gold : p.cyan);
        g.strokeStyle = col; g.lineWidth = 2;
        g.beginPath(); g.arc(X(a.i), yy, 6.5 * scale, 0, Math.PI * 2); g.stroke();
        g.fillStyle = col; g.globalAlpha = .22;
        g.beginPath(); g.arc(X(a.i), yy, 6.5 * scale, 0, Math.PI * 2); g.fill();
        g.globalAlpha = 1;
        if (a.label) {
          g.font = "800 " + (11.5 * scale).toFixed(1) + "px Oxanium,sans-serif";
          g.fillStyle = col; g.textAlign = "center";
          var ly = a.side === "high" ? yy - 13 * scale : yy + 19 * scale;
          drawTag(g, a.label, X(a.i), ly, col, scale);
        }
      });

      /* ---------- floating text labels ---------- */
      annos.filter(function (a) { return a.type === "note"; }).forEach(function (a) {
        var x = X(a.i), y = Y(a.price) + (a.dy || 0) * scale;
        drawTag(g, a.text, x, y, CC(a.color, p.orange), scale, a.align);
      });

      /* ---------- arrows ---------- */
      annos.filter(function (a) { return a.type === "arrow"; }).forEach(function (a) {
        var x1 = X(a.i), y1 = Y(a.price), x2 = X(a.toI), y2 = Y(a.toPrice);
        g.strokeStyle = CC(a.color, p.lime); g.lineWidth = 2.1;
        g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke();
        var ang = Math.atan2(y2 - y1, x2 - x1), hl = 9 * scale;
        g.fillStyle = CC(a.color, p.lime);
        g.beginPath();
        g.moveTo(x2, y2);
        g.lineTo(x2 - hl * Math.cos(ang - 0.42), y2 - hl * Math.sin(ang - 0.42));
        g.lineTo(x2 - hl * Math.cos(ang + 0.42), y2 - hl * Math.sin(ang + 0.42));
        g.closePath(); g.fill();
        if (a.text) drawTag(g, a.text, (x1 + x2) / 2, (y1 + y2) / 2 - 12 * scale, CC(a.color, p.lime), scale);
      });

      /* ---------- trade brackets (entry / stop / target) ---------- */
      annos.filter(function (a) { return a.type === "trade"; }).forEach(function (a) {
        var x0 = X(a.fromI) - slot / 2, x1 = padL + plotW;
        if (a.target != null) {
          g.fillStyle = "rgba(74,222,128,.13)";
          g.fillRect(x0, Y(a.target), x1 - x0, Y(a.entry) - Y(a.target));
        }
        if (a.stop != null) {
          g.fillStyle = "rgba(244,63,94,.15)";
          g.fillRect(x0, Y(a.entry), x1 - x0, Y(a.stop) - Y(a.entry));
        }
        /* The whole point of Door A is that entry and stop are only a few ticks
           apart — so their labels WILL collide if both sit above their line.
           Entry and target label upward, the stop labels downward. */
        [["entry", a.entry, p.gold, "ENTRY " + fmt(a.entry), -1],
         ["stop", a.stop, p.dn, "STOP " + fmt(a.stop), 1],
         ["target", a.target, p.up, (a.targetLabel || "TARGET") + " " + fmt(a.target), -1]].forEach(function (r) {
          if (r[1] == null) return;
          var y = Y(r[1]);
          g.strokeStyle = r[2]; g.lineWidth = 1.7; g.setLineDash([6, 4]);
          g.beginPath(); g.moveTo(x0, y + .5); g.lineTo(x1, y + .5); g.stroke();
          g.setLineDash([]);
          g.font = "800 " + (10 * scale).toFixed(1) + "px Oxanium,sans-serif";
          var tw = g.measureText(r[3]).width, th = 14 * scale;
          var ly = y + r[4] * (th * 0.62 + 2);
          g.fillStyle = themeIsLight() ? "rgba(255,255,255,.9)" : "rgba(8,17,32,.86)";
          g.fillRect(x0 + 4, ly - th / 2, tw + 8, th);
          g.fillStyle = r[2]; g.textAlign = "left"; g.textBaseline = "middle";
          g.fillText(r[3], x0 + 8, ly + .5);
          g.textBaseline = "alphabetic";
        });
      });

      /* ---------- corner stamp ---------- */
      g.font = "600 " + (9.5 * scale).toFixed(1) + "px Oxanium,sans-serif";
      g.fillStyle = p.mut; g.textAlign = "left";
      g.fillText(spec.stamp || "M2K · 2-minute · teaching example, not real market data", padL + 4, padT + 8);
    }

    function drawTag(g, text, x, y, col, scale, align) {
      g.font = "800 " + (11 * scale).toFixed(1) + "px Oxanium,sans-serif";
      var w = g.measureText(text).width + 12 * scale, h = 17 * scale;
      var lx = align === "left" ? x : align === "right" ? x - w : x - w / 2;
      g.fillStyle = themeIsLight() ? "rgba(255,255,255,.93)" : "rgba(8,17,32,.9)";
      roundRect(g, lx, y - h / 2, w, h, 5 * scale); g.fill();
      g.strokeStyle = col; g.lineWidth = 1.2;
      roundRect(g, lx, y - h / 2, w, h, 5 * scale); g.stroke();
      g.fillStyle = col; g.textAlign = "center"; g.textBaseline = "middle";
      g.fillText(text, lx + w / 2, y + .5);
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
    function fmt(v) { return (Math.round(v * 10) / 10).toFixed(1); }

    /* ---------- wire up ---------- */
    var ro = null;
    if (root.ResizeObserver) { ro = new ResizeObserver(function () { draw(); }); ro.observe(wrap); }
    else root.addEventListener("resize", draw);

    fig._render = function () { setShown(shown); };
    fig._draw = draw;
    fig._stop = stop;
    D._figs.push(fig);

    setTimeout(function () {
      setShown(shown);
      if (spec.autoplay) { setShown(1); play(); }
    }, 20);

    /* ---- roll it once when it first scrolls into view ----
       A chart parked on bar 1 reads as broken. So the first time the figure
       is actually on screen it plays itself through once; after that it is
       entirely hand-driven. Learner control is preserved — every button
       still works and a single click stops it. */
    if (spec.startAt != null && spec.startAt <= 2 && root.IntersectionObserver) {
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

  D._figs = [];
  D.redrawAll = function () { D._figs.forEach(function (f) { if (f.isConnected) f._draw(); }); };
  D.stopAll = function () {
    D._figs.forEach(function (f) {
      try { f._stop(); } catch (e) {}
      try { if (f._io) f._io.disconnect(); } catch (e) {}
    });
    D._figs = D._figs.filter(function (f) { return f.isConnected; });
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
})(window);
