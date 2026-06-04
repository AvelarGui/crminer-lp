/* ============================================================
   HERO — Animação scroll-driven (GSAP + ScrollTrigger scrub)
   ============================================================ */
(function () {
  'use strict';

  var driver       = document.getElementById('hero-scroll-driver');
  if (!driver) return;

  var isMobile     = window.innerWidth < 768;

  var content      = driver.querySelector('.hero-content');
  var cards        = gsap.utils.toArray('#hero-sticky .hero-card');
  var finaleEl     = driver.querySelector('.hero-finale');
  var finLine1     = driver.querySelector('.finale-line-1');
  var finLine2     = driver.querySelector('.finale-line-2');
  var finScrollCta = driver.querySelector('.finale-scroll-cta');
  var h1           = content.querySelector('h1');
  var lead         = content.querySelector('.hc-lead');

  var SCROLL_END = 4500;

  /* ── Estado inicial ── */
  gsap.set(cards, { x: 50, opacity: 0 });

  // Desabilita transições CSS que conflitariam com o scrub
  h1.style.transition   = 'none';
  lead.style.transition = 'none';

  /* ── Toggle do layout esquerdo (anim-active) ── */
  var firstAnimDone = false;
  ScrollTrigger.create({
    trigger: driver,
    start: 'top+=8% top',
    onEnter: function () {
      if (!firstAnimDone) {
        firstAnimDone = true;
        content.classList.add('first-anim');
        content.addEventListener('transitionend', function cleanup(e) {
          if (e.propertyName === 'padding-left') {
            content.classList.remove('first-anim');
            content.removeEventListener('transitionend', cleanup);
          }
        });
      }
      content.classList.add('anim-active');
    },
    onLeaveBack: function () { content.classList.remove('anim-active'); }
  });

  /* ── Toggle do overlay do finale ── */
  ScrollTrigger.create({
    trigger: driver,
    start: 'top+=' + Math.round(SCROLL_END * 0.58) + 'px top',
    onEnter:     function () { finaleEl.classList.add('visible'); },
    onLeaveBack: function () { finaleEl.classList.remove('visible'); }
  });

  /* ── Switch linha 1 → linha 2 (posição no DOM) ── */
  ScrollTrigger.create({
    trigger: driver,
    start: 'top+=' + Math.round(SCROLL_END * 0.76) + 'px top',
    onEnter: function () {
      finLine1.style.display   = 'none';
      finLine2.style.position  = 'static';
    },
    onLeaveBack: function () {
      finLine1.style.display   = '';
      finLine2.style.position  = 'absolute';
    }
  });

  /* ── Timeline principal scrubada ── */
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: driver,
      start: 'top top',
      end: '+=' + SCROLL_END,
      scrub: 1.2
    }
  });

  tl
    /* Phase 1 — content vai para esquerda, h1 e lead encolhem (desktop only) */
    .fromTo(content, { x: 0 },
      { x: isMobile ? 0 : '-5vw', ease: 'power2.out', duration: 3 }, 1.2)
    .fromTo(h1, { scale: 1 },
      { scale: isMobile ? 1 : 0.68, transformOrigin: 'left top', ease: 'power2.out', duration: 3 }, 1.2)
    .fromTo(lead, { scale: 1 },
      { scale: isMobile ? 1 : 0.85, transformOrigin: 'left top', ease: 'power2.out', duration: 3 }, 1.2);

  /* Cards entram um por um da direita — apenas no desktop (no mobile estão hidden via CSS) */
  if (!isMobile) {
    tl
      .fromTo(cards[0], { x: 50, opacity: 0 }, { x: 0, opacity: 1, ease: 'power2.out', duration: 0.8 }, 1.5)
      .fromTo(cards[1], { x: 50, opacity: 0 }, { x: 0, opacity: 1, ease: 'power2.out', duration: 0.8 }, 2.0)
      .fromTo(cards[2], { x: 50, opacity: 0 }, { x: 0, opacity: 1, ease: 'power2.out', duration: 0.8 }, 2.5)
      .fromTo(cards[3], { x: 50, opacity: 0 }, { x: 0, opacity: 1, ease: 'power2.out', duration: 0.8 }, 3.0)
      .fromTo(cards[4], { x: 50, opacity: 0 }, { x: 0, opacity: 1, ease: 'power2.out', duration: 0.8 }, 3.5);
  }

  tl
    /* Phase 2 — content some (cards só existem no desktop) */
    .to(isMobile ? [content] : cards.concat([content]), { opacity: 0, ease: 'power2.in', duration: 0.6 }, 5.2)

    /* Finale — linha 1 aparece e some */
    .fromTo(finLine1, { opacity: 0 }, { opacity: 1, ease: 'none', duration: 0.5 }, 5.8)
    .to(finLine1,     { opacity: 0, ease: 'none', duration: 0.3 }, 6.8)

    /* Finale — linha 2 aparece */
    .fromTo(finLine2, { opacity: 0 }, { opacity: 1, ease: 'none', duration: 0.5 }, 7.2)

    /* CTA aparece */
    .fromTo(finScrollCta, { opacity: 0 }, { opacity: 1, ease: 'none', duration: 0.4 }, 7.8);

  /* ── CTA → transição branca de tela inteira para Dobra 2 ── */
  if (finScrollCta) {
    var transEl   = document.getElementById('page-transition');
    var transPath = document.getElementById('pt-path');

    var PT_FLAT = 'M 0 100 V 100 Q 50 100 100 100 V 100 z';
    var PT_WAVE = 'M 0 100 V 50 Q 50 0 100 50 V 100 z';
    var PT_FILL = 'M 0 100 V 0 Q 50 0 100 0 V 100 z';

    finScrollCta.addEventListener('click', function () {
      var next = driver.nextElementSibling;
      if (!next) return;

      if (!transEl || !transPath) {
        if (typeof lenis !== 'undefined') lenis.scrollTo(next);
        else next.scrollIntoView({ behavior: 'smooth' });
        return;
      }

      transEl.classList.add('active');

      gsap.timeline()
        .to(transPath, { attr: { d: PT_WAVE }, ease: 'power2.in',  duration: 0.40 })
        .to(transPath, { attr: { d: PT_FILL }, ease: 'power2.out', duration: 0.30,
          onComplete: function () {
            if (typeof lenis !== 'undefined') {
              lenis.scrollTo(next, { immediate: true });
            } else {
              window.scrollTo(0, next.offsetTop);
            }
          }
        })
        .to(transPath, { attr: { d: PT_WAVE }, ease: 'power2.in',  duration: 0.35, delay: 0.08 })
        .to(transPath, { attr: { d: PT_FLAT }, ease: 'power2.out', duration: 0.45,
          onComplete: function () { transEl.classList.remove('active'); }
        });
    });
  }

  /* ── Magnetic + Drift: logo silhouette ── */
  var logo = driver.querySelector('.hero-logo-bg img');
  if (logo) {
    var mouseHeroX = window.innerWidth  / 2;
    var mouseHeroY = window.innerHeight / 2;

    gsap.ticker.add(function (time) {
      var driftY     = Math.sin(time * 0.35) * 9;
      var driftScale = 1 + Math.sin(time * 0.35) * 0.013;
      var magnetX    = (mouseHeroX - window.innerWidth  / 2) * 0.05;
      var magnetY    = (mouseHeroY - window.innerHeight / 2) * 0.04;
      gsap.set(logo, { x: magnetX, y: driftY + magnetY, scale: driftScale });
    });

    driver.addEventListener('mousemove', function (e) {
      mouseHeroX = e.clientX;
      mouseHeroY = e.clientY;
    });

    driver.addEventListener('mouseleave', function () {
      mouseHeroX = window.innerWidth  / 2;
      mouseHeroY = window.innerHeight / 2;
    });
  }

})();
