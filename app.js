/*
 * app.js — logika filmoteke
 *
 * Mapiranje na sprintove (za priču o commit istoriji u radu):
 *   SPRINT 1 (MVP):  prikaz kataloga (kartice sa "posterom", žanrom, opisom) + filter po žanru.
 *   SPRINT 2 (nadogradnja):  ocenjivanje zvezdicama (localStorage) + mini-dashboard (statistika).
 */

(function () {
  "use strict";

  // Boje "postera" po žanru (gradijent p1 -> p2)
  var GENRE_COLORS = {
    "Sci-Fi": ["#3b4d8f", "#171a33"],
    "Komedija": ["#c98a2e", "#5a2f13"],
    "Triler": ["#8f2f4a", "#2a1120"],
    "Animacija": ["#2f8f7a", "#123329"],
    "Drama": ["#4a5b76", "#1a2130"]
  };
  var FALLBACK_COLORS = ["#555", "#222"];

  var el = {
    grid: document.getElementById("grid"),
    filters: document.getElementById("filters"),
    empty: document.getElementById("empty"),
    statAvg: document.getElementById("stat-avg"),
    statAvgStars: document.getElementById("stat-avg-stars"),
    statRated: document.getElementById("stat-rated"),
    genreBars: document.getElementById("genre-bars")
  };

  var activeGenre = "Sve";

  // ---------- localStorage: ocene (SPRINT 2) ----------
  function ratingKey(id) { return "film_rating_" + id; }

  function getRating(id) {
    try {
      var raw = localStorage.getItem(ratingKey(id));
      return raw === null ? 0 : parseInt(raw, 10);
    } catch (e) { return 0; }
  }

  function setRating(id, value) {
    try { localStorage.setItem(ratingKey(id), String(value)); } catch (e) {}
  }

  // ---------- SVG zvezdica ----------
  function starSVG() {
    return (
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
      '<path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77 5.82 21l1.18-6.88-5-4.87 7.1-1.01L12 2z"/>' +
      "</svg>"
    );
  }

  // ---------- Katalog: filter čipovi (SPRINT 1) ----------
  function uniqueGenres() {
    var seen = {};
    var out = [];
    FILMS.forEach(function (f) {
      if (!seen[f.genre]) { seen[f.genre] = true; out.push(f.genre); }
    });
    return out;
  }

  function renderFilters() {
    var genres = ["Sve"].concat(uniqueGenres());
    el.filters.innerHTML = "";
    genres.forEach(function (g) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "chip" + (g === activeGenre ? " is-active" : "");
      btn.textContent = g;
      btn.setAttribute("aria-pressed", g === activeGenre ? "true" : "false");
      btn.addEventListener("click", function () {
        activeGenre = g;
        renderFilters();
        renderGrid();
      });
      el.filters.appendChild(btn);
    });
  }

  // ---------- Katalog: kartice (SPRINT 1) ----------
  function renderGrid() {
    var list = FILMS.filter(function (f) {
      return activeGenre === "Sve" || f.genre === activeGenre;
    });

    el.grid.innerHTML = "";
    el.empty.hidden = list.length !== 0;

    list.forEach(function (film) {
      var colors = GENRE_COLORS[film.genre] || FALLBACK_COLORS;
      var card = document.createElement("article");
      card.className = "card";
      card.innerHTML =
        '<div class="poster" style="--p1:' + colors[0] + ';--p2:' + colors[1] + '">' +
          '<span class="poster-genre">' + film.genre + "</span>" +
          '<span class="poster-title">' + film.title + "</span>" +
          '<span class="poster-year">' + film.year + "</span>" +
        "</div>" +
        '<div class="card-body">' +
          '<p class="card-blurb">' + film.blurb + "</p>" +
          '<div class="rate" data-id="' + film.id + '">' +
            '<span class="stars"></span>' +
            '<span class="rate-label"></span>' +
          "</div>" +
        "</div>";

      buildStars(card.querySelector(".rate"), film.id);
      el.grid.appendChild(card);
    });
  }

  // ---------- Ocenjivanje zvezdicama (SPRINT 2) ----------
  function buildStars(rateEl, id) {
    var starsEl = rateEl.querySelector(".stars");
    var labelEl = rateEl.querySelector(".rate-label");
    var current = getRating(id);

    starsEl.innerHTML = "";
    for (var i = 1; i <= 5; i++) {
      (function (value) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "star" + (value <= current ? " on" : "");
        b.innerHTML = starSVG();
        b.setAttribute("aria-label", "Oceni " + value + " od 5");
        b.addEventListener("click", function () {
          setRating(id, value);
          buildStars(rateEl, id); // osveži ovu karticu
          renderStats(); // osveži dashboard
        });
        starsEl.appendChild(b);
      })(i);
    }
    labelEl.textContent = current ? current + " / 5" : "Nije ocenjen";
  }

  // ---------- Dashboard / statistika (SPRINT 2) ----------
  function renderStats() {
    // prosečna ocena (samo ocenjeni filmovi)
    var sum = 0, rated = 0;
    FILMS.forEach(function (f) {
      var r = getRating(f.id);
      if (r > 0) { sum += r; rated++; }
    });

    var avg = rated ? sum / rated : 0;
    el.statAvg.textContent = rated ? avg.toFixed(1) : "—";
    el.statRated.textContent = "Ocenjeno: " + rated + " / " + FILMS.length;

    // star-metar prosečne ocene
    el.statAvgStars.innerHTML = "";
    for (var i = 1; i <= 5; i++) {
      var s = document.createElement("span");
      s.className = "star" + (i <= Math.round(avg) ? " on" : "");
      s.style.cursor = "default";
      s.innerHTML = starSVG();
      el.statAvgStars.appendChild(s);
    }

    // broj filmova po žanru
    var counts = {};
    FILMS.forEach(function (f) { counts[f.genre] = (counts[f.genre] || 0) + 1; });
    var genres = uniqueGenres();
    var max = Math.max.apply(null, genres.map(function (g) { return counts[g]; }));

    el.genreBars.innerHTML = "";
    genres.forEach(function (g) {
      var pct = Math.round((counts[g] / max) * 100);
      var row = document.createElement("div");
      row.className = "bar-row";
      row.innerHTML =
        '<span class="bar-name">' + g + "</span>" +
        '<span class="bar-track"><span class="bar-fill" style="width:' + pct + '%"></span></span>' +
        '<span class="bar-val">' + counts[g] + "</span>";
      el.genreBars.appendChild(row);
    });
  }

  // ---------- Inicijalizacija ----------
  function init() {
    if (!window.FILMS || !Array.isArray(window.FILMS)) {
      el.grid.innerHTML = '<p class="empty">Greška: podaci (films.js) nisu učitani.</p>';
      return;
    }
    renderFilters();
    renderGrid();
    renderStats();
  }

  init();
})();
