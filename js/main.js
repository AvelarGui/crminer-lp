// ============================================
// STICKY HEADER — Aparece após 100px de scroll
// ============================================
(function () {
  var header = document.getElementById('site-header');

  function onScroll() {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ============================================
// SCROLL REVEAL — Anima elementos com classe .reveal
// ============================================
(function () {
  var els = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  var ticking = false;

  function reveal() {
    ticking = false;
    var vh = window.innerHeight || document.documentElement.clientHeight;

    for (var i = els.length - 1; i >= 0; i--) {
      var el = els[i];
      var top = el.getBoundingClientRect().top;

      if (top < vh * 0.9) {
        el.classList.add('in');
        els.splice(i, 1);
      }
    }
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(reveal);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  window.addEventListener('load', reveal);
  reveal();

  // Safety net: nunca deixa conteúdo escondido
  setTimeout(function () {
    els.forEach(function (el) {
      el.classList.add('in');
    });
  }, 2500);
})();

// ============================================
// HOW IT WORKS — Card Slider com peek do próximo
// ============================================
(function () {
  var section = document.getElementById('how');
  if (!section) return;

  var track   = section.querySelector('.how-cards-track');
  var cards   = Array.prototype.slice.call(section.querySelectorAll('.how-card'));
  var prevBtn = section.querySelector('.how-prev');
  var nextBtn = section.querySelector('.how-next');
  var curEl   = section.querySelector('.how-count-cur');
  var total   = cards.length;
  var current = 0;

  function updateSlider() {
    var cardW = cards[0].offsetWidth;
    var gap   = 16;
    track.style.transform = 'translateX(-' + (current * (cardW + gap)) + 'px)';
    if (curEl) curEl.textContent = String(current + 1).padStart(2, '0');
    cards.forEach(function (c, i) { c.classList.toggle('active', i === current); });
    prevBtn.disabled = (current === 0);
    nextBtn.disabled = (current === total - 1);
  }

  nextBtn.addEventListener('click', function () {
    if (current < total - 1) { current++; updateSlider(); }
  });

  prevBtn.addEventListener('click', function () {
    if (current > 0) { current--; updateSlider(); }
  });

  updateSlider();
})();
