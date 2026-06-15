/* ============================================================
   STORIES — player estilo Instagram para os vídeos "Como funciona".
   Vídeos verticais 9:16 renderizados no Remotion (stories-remotion/).
   Cada entrada: { id, src, poster, label }.
   ============================================================ */
(function () {
  "use strict";

  // ── Config: adicione os próximos vídeos aqui conforme renderizar ──
  var STORIES = [
    {
      id: "crm",
      src: "assets/stories/crm.mp4",
      poster: "assets/stories/crm-poster.jpg",
      label: "CRM · Funil de vendas",
    },
    // { id: "captura",   src: "assets/stories/captura.mp4",   poster: "assets/stories/captura-poster.jpg",   label: "Captura · Canais" },
    // { id: "catalogo",  src: "assets/stories/catalogo.mp4",  poster: "assets/stories/catalogo-poster.jpg",  label: "Catálogo · Produtos" },
    // { id: "agenda",    src: "assets/stories/agenda.mp4",    poster: "assets/stories/agenda-poster.jpg",    label: "Agenda" },
    // { id: "financeiro",src: "assets/stories/financeiro.mp4",poster: "assets/stories/financeiro-poster.jpg",label: "Financeiro · Dashboard" },
  ];

  if (!STORIES.length) return;

  var overlay, stage, video, progressWrap, bars, captionEl, idLabel;
  var current = 0;
  var raf = null;
  var built = false;

  function buildDOM() {
    if (built) return;
    built = true;

    overlay = document.createElement("div");
    overlay.className = "stories-overlay";
    overlay.id = "stories-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Como funciona o crminer");
    overlay.setAttribute("aria-hidden", "true");

    var backdrop = document.createElement("div");
    backdrop.className = "stories-backdrop";
    backdrop.addEventListener("click", close);

    stage = document.createElement("div");
    stage.className = "stories-stage";

    // barras de progresso (uma por story)
    progressWrap = document.createElement("div");
    progressWrap.className = "stories-progress";
    bars = STORIES.map(function () {
      var i = document.createElement("i");
      var b = document.createElement("b");
      i.appendChild(b);
      progressWrap.appendChild(i);
      return b;
    });

    // cabeçalho
    var head = document.createElement("div");
    head.className = "stories-head";
    var idWrap = document.createElement("div");
    idWrap.className = "stories-id";
    var logo = document.createElement("img");
    logo.src = "assets/logo/logo_white.png";
    logo.alt = "crminer";
    idLabel = document.createElement("span");
    idWrap.appendChild(logo);
    idWrap.appendChild(idLabel);
    var closeBtn = document.createElement("button");
    closeBtn.className = "stories-close";
    closeBtn.setAttribute("aria-label", "Fechar");
    closeBtn.innerHTML = "&times;";
    closeBtn.addEventListener("click", close);
    head.appendChild(idWrap);
    head.appendChild(closeBtn);

    // vídeo
    video = document.createElement("video");
    video.className = "stories-video";
    video.muted = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.preload = "auto";
    video.addEventListener("ended", next);
    video.addEventListener("timeupdate", syncBar);

    // zonas de toque
    var prevZone = document.createElement("button");
    prevZone.className = "stories-nav prev";
    prevZone.setAttribute("aria-label", "Anterior");
    prevZone.addEventListener("click", prev);
    var nextZone = document.createElement("button");
    nextZone.className = "stories-nav next";
    nextZone.setAttribute("aria-label", "Próximo");
    nextZone.addEventListener("click", next);

    captionEl = document.createElement("div");
    captionEl.className = "stories-caption";

    stage.appendChild(video);
    stage.appendChild(prevZone);
    stage.appendChild(nextZone);
    stage.appendChild(progressWrap);
    stage.appendChild(head);
    stage.appendChild(captionEl);

    overlay.appendChild(backdrop);
    overlay.appendChild(stage);
    document.body.appendChild(overlay);
  }

  function setBars() {
    bars.forEach(function (b, i) {
      b.style.width = i < current ? "100%" : "0%";
    });
  }

  function syncBar() {
    if (!video.duration) return;
    var pct = Math.min(100, (video.currentTime / video.duration) * 100);
    if (bars[current]) bars[current].style.width = pct + "%";
  }

  // rAF suaviza a barra entre os eventos timeupdate
  function tick() {
    syncBar();
    raf = requestAnimationFrame(tick);
  }

  function load(i) {
    current = i;
    var s = STORIES[i];
    idLabel.textContent = s.label || "";
    captionEl.textContent = s.label || "";
    video.poster = s.poster || "";
    video.src = s.src;
    setBars();
    var p = video.play();
    if (p && p.catch) p.catch(function () {});
  }

  function next() {
    if (current < STORIES.length - 1) load(current + 1);
    else close();
  }

  function prev() {
    if (video.currentTime > 2 || current === 0) {
      video.currentTime = 0;
      syncBar();
    } else {
      load(current - 1);
    }
  }

  function open(i) {
    buildDOM();
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("stories-lock");
    if (typeof lenis !== "undefined" && lenis.stop) lenis.stop();
    document.addEventListener("keydown", onKey);
    load(i || 0);
    cancelAnimationFrame(raf);
    tick();
  }

  function close() {
    if (!overlay) return;
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("stories-lock");
    if (typeof lenis !== "undefined" && lenis.start) lenis.start();
    document.removeEventListener("keydown", onKey);
    cancelAnimationFrame(raf);
    video.pause();
    video.removeAttribute("src");
    video.load();
  }

  function onKey(e) {
    if (e.key === "Escape") close();
    else if (e.key === "ArrowRight") next();
    else if (e.key === "ArrowLeft") prev();
  }

  // Liga qualquer elemento [data-stories-open] ao player
  function wireTriggers() {
    var triggers = document.querySelectorAll("[data-stories-open]");
    triggers.forEach(function (t) {
      t.addEventListener("click", function (e) {
        e.preventDefault();
        open(0);
      });
    });
  }

  if (document.readyState !== "loading") wireTriggers();
  else document.addEventListener("DOMContentLoaded", wireTriggers);
})();
