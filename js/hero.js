(function () {
  'use strict';

  // DOM refs
  var driver       = document.getElementById('hero-scroll-driver');
  var sticky       = document.getElementById('hero-sticky');
  var content      = sticky ? sticky.querySelector('.hero-content')    : null;
  var cardsEl      = sticky ? sticky.querySelector('.hero-cards')      : null;
  var finale       = sticky ? sticky.querySelector('.hero-finale')     : null;
  var finLine1     = finale ? finale.querySelector('.finale-line-1')   : null;
  var finLine2     = finale ? finale.querySelector('.finale-line-2')   : null;
  var finScrollCta = finale ? finale.querySelector('.finale-scroll-cta') : null;
  var cardEls      = cardsEl
    ? Array.prototype.slice.call(cardsEl.querySelectorAll('.hero-card'))
    : [];

  if (!driver) return;

  // ── STATE ────────────────────────────────────────────────────
  var animTriggered = false;   // first scroll fired
  var animDone      = false;   // all cards visible
  var finaleDone    = false;   // "É captura" appeared

  // ── TIMING (ms após o trigger) ───────────────────────────────
  // Texto: 0ms → desliza em 600ms
  // Cards: entram espaçados, cada um com 550ms de intervalo
  var TEXT_DURATION  = 600;
  var CARD_INTERVAL  = 500;   // ms entre cada card
  var CARD_START     = 500;   // ms depois do texto começar a mover

  // ── SCROLL PROGRESS ─────────────────────────────────────────
  function getProgress() {
    var rect    = driver.getBoundingClientRect();
    var scrollH = driver.offsetHeight - window.innerHeight;
    return Math.max(0, Math.min(1, -rect.top / scrollH));
  }

  // ── SEQUENCE ─────────────────────────────────────────────────
  function startSequence() {
    animTriggered = true;

    // 1. Texto desliza para a esquerda + h1 encolhe
    if (content) {
      content.style.transition =
        'transform ' + TEXT_DURATION + 'ms cubic-bezier(0.22, 0.61, 0.36, 1)';
      content.style.transform = 'translateX(-5vw)';
      content.classList.add('anim-active');
    }

    // 2. Cards entram um a um
    cardEls.forEach(function (card, i) {
      var delay = CARD_START + i * CARD_INTERVAL;
      setTimeout(function () {
        card.classList.add('visible');
      }, delay);
    });

    // 3. Marca animação completa após o último card aparecer
    var totalTime = CARD_START + (cardEls.length - 1) * CARD_INTERVAL + 700;
    setTimeout(function () {
      animDone = true;
      // Se o usuário já rolou o suficiente, dispara finale imediatamente
      if (!finaleDone && getProgress() > 0.60) {
        finaleDone = true;
        triggerFinale();
      }
    }, totalTime);
  }

  // ── FINALE ───────────────────────────────────────────────────
  function triggerFinale() {
    // Esconde os cards
    cardEls.forEach(function (c) {
      c.classList.remove('visible');
      c.classList.add('fading');
    });

    setTimeout(function () {
      if (!finale) return;
      finale.classList.add('visible');

      setTimeout(function () {
        if (finLine1) finLine1.classList.add('show');

        setTimeout(function () {
          if (finLine1) finLine1.classList.add('hide');
          setTimeout(function () {
            if (finLine1) finLine1.style.display = 'none';
            if (finLine2) finLine2.classList.add('show');
            setTimeout(function () {
              if (finScrollCta) finScrollCta.classList.add('show');
            }, 600);
          }, 320);
        }, 950);
      }, 150);
    }, 300);
  }

  // ── SCROLL LISTENER ──────────────────────────────────────────
  var rafPending = false;
  function onScroll() {
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(function () {
      rafPending = false;
      var p = getProgress();

      // Qualquer scroll > limiar → dispara sequência (uma vez só)
      if (!animTriggered && p > 0.04) {
        startSequence();
      }

      // Depois da animação → segundo scroll dispara o finale
      if (animDone && !finaleDone && p > 0.60) {
        finaleDone = true;
        triggerFinale();
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Scroll CTA → próxima seção
  if (finScrollCta) {
    finScrollCta.addEventListener('click', function () {
      var next = driver.nextElementSibling;
      if (next) next.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    });
  }

})();
