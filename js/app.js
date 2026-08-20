/* ============================================================
   app.js — sidebar, router, theme, progress
   ============================================================ */
(function (root) {
  "use strict";
  var D = root.DBM;
  var LS_THEME = "dbm_theme", LS_READ = "dbm_read", LS_LAST = "dbm_last";

  var view = document.getElementById("view");
  var nav = document.getElementById("sb-nav");
  var sidebar = document.getElementById("sidebar");
  var scrim = document.getElementById("scrim");
  var tbTitle = document.getElementById("tb-title");

  /* ---------- theme ---------- */
  function applyTheme(t) {
    if (t === "light") document.documentElement.setAttribute("data-theme", "light");
    else document.documentElement.removeAttribute("data-theme");
    try { localStorage.setItem(LS_THEME, t); } catch (e) {}
    setTimeout(function () { D.redrawAll(); }, 20);
  }
  /* ?theme=light / ?theme=dark overrides the stored preference and sticks */
  var qTheme = (location.search.match(/[?&]theme=(light|dark)/) || [])[1];
  try { applyTheme(qTheme || localStorage.getItem(LS_THEME) || "dark"); } catch (e) {}
  document.getElementById("theme-btn").onclick = function () {
    applyTheme(document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light");
  };

  /* ---------- progress ---------- */
  function readSet() {
    try { return JSON.parse(localStorage.getItem(LS_READ) || "[]"); } catch (e) { return []; }
  }
  function markRead(id) {
    var s = readSet();
    if (s.indexOf(id) < 0) { s.push(id); try { localStorage.setItem(LS_READ, JSON.stringify(s)); } catch (e) {} }
    paintProgress();
  }
  function paintProgress() {
    var s = readSet(), total = D.lessons.length;
    var pct = total ? Math.round((s.length / total) * 100) : 0;
    document.getElementById("prog-bar").style.width = pct + "%";
    document.getElementById("prog-lbl").textContent = s.length + " of " + total + " chapters read";
    Array.prototype.forEach.call(nav.querySelectorAll(".sb-link"), function (a) {
      a.classList.toggle("done", s.indexOf(a.dataset.id) >= 0);
    });
  }

  /* ---------- sidebar ---------- */
  function buildNav() {
    var html = "", part = null;
    D.lessons.forEach(function (l) {
      if (l.part !== part) { part = l.part; html += '<div class="sb-part">' + D.esc(part) + "</div>"; }
      html += '<div class="sb-link" data-id="' + l.id + '"><span class="sb-n">' + l.n + "</span><span>" + D.esc(l.title) + "</span></div>";
    });
    nav.innerHTML = html;
    Array.prototype.forEach.call(nav.querySelectorAll(".sb-link"), function (a) {
      a.onclick = function () { go(a.dataset.id); closeNav(); };
    });
  }
  function closeNav() { sidebar.classList.remove("open"); scrim.classList.remove("on"); }
  document.getElementById("menu-btn").onclick = function () {
    sidebar.classList.toggle("open"); scrim.classList.toggle("on");
  };
  scrim.onclick = closeNav;

  /* ---------- router ---------- */
  function go(id, noHash) {
    var i = 0;
    for (var k = 0; k < D.lessons.length; k++) if (D.lessons[k].id === id) i = k;
    var l = D.lessons[i];
    if (!l) { l = D.lessons[0]; i = 0; }

    D.stopAll();
    D._figs = [];
    view.innerHTML = "";
    document.body.classList.remove("fs-lock");

    var items = l.render();
    items.forEach(function (it) {
      if (typeof it === "string") {
        var d = document.createElement("div");
        d.innerHTML = it;
        while (d.firstChild) view.appendChild(d.firstChild);
      } else if (it.chart) {
        view.appendChild(D.chart(it.chart));
      } else if (it.calc) {
        view.appendChild(D.buildCalc());
      } else if (it.drill) {
        view.appendChild(D.buildDrill());
      }
    });

    /* prev / next */
    var row = document.createElement("div");
    row.className = "navrow";
    var prev = D.lessons[i - 1], next = D.lessons[i + 1];
    row.innerHTML =
      (prev ? '<button class="navbtn" data-go="' + prev.id + '"><small>← previous</small>' + D.esc(prev.title) + "</button>"
            : '<button class="navbtn" disabled><small>← previous</small>—</button>') +
      (next ? '<button class="navbtn" data-go="' + next.id + '" style="text-align:right"><small>next →</small>' + D.esc(next.title) + "</button>"
            : '<button class="navbtn" disabled style="text-align:right"><small>next →</small>you are done</button>');
    view.appendChild(row);
    Array.prototype.forEach.call(row.querySelectorAll("[data-go]"), function (b) {
      b.onclick = function () { go(b.dataset.go); };
    });

    tbTitle.textContent = l.n + " · " + l.title;
    document.title = l.title + " — The W and the M";
    Array.prototype.forEach.call(nav.querySelectorAll(".sb-link"), function (a) {
      a.classList.toggle("active", a.dataset.id === id);
    });
    markRead(l.id);
    try { localStorage.setItem(LS_LAST, l.id); } catch (e) {}
    if (!noHash) {
      if (location.hash !== "#" + l.id) location.hash = l.id;
      view.scrollIntoView({ block: "start" });
      root.scrollTo({ top: 0, behavior: "auto" });
    }
    if (root.Narrator && root.Narrator.stop) root.Narrator.stop();
  }

  root.addEventListener("hashchange", function () {
    var id = location.hash.replace("#", "");
    if (id) go(id, true);
  });

  /* ---------- keyboard ---------- */
  document.addEventListener("keydown", function (e) {
    if (e.target && /input|select|textarea|button/i.test(e.target.tagName)) return;
    var cur = location.hash.replace("#", "") || D.lessons[0].id;
    var i = 0;
    for (var k = 0; k < D.lessons.length; k++) if (D.lessons[k].id === cur) i = k;
    if (e.key === "ArrowRight" && D.lessons[i + 1]) go(D.lessons[i + 1].id);
    if (e.key === "ArrowLeft" && D.lessons[i - 1]) go(D.lessons[i - 1].id);
  });

  /* ---------- boot ---------- */
  buildNav();
  paintProgress();
  var start = location.hash.replace("#", "");
  if (!start) { try { start = localStorage.getItem(LS_LAST) || ""; } catch (e) {} }
  go(start || D.lessons[0].id);

  /* revised date stamp */
  var rev = document.getElementById("rev-date");
  if (rev) rev.textContent = "2026-08-20";

  /* service worker */
  if ("serviceWorker" in navigator) {
    root.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").catch(function () {});
    });
  }
})(window);
