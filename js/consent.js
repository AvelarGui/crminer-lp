/* ============================================================
   CONSENTIMENTO LGPD — banner + Google Consent Mode v2 + Clarity
   - Default (negado) é setado no <head> antes do gtag.js.
   - Aqui aplicamos a escolha salva e mostramos o banner quando
     ainda não houver decisão. Persistência em localStorage.
   ============================================================ */
(function () {
  "use strict";

  var KEY = "crm_consent";          // "granted" | "denied"
  var stored = null;
  try { stored = localStorage.getItem(KEY); } catch (e) {}

  /* Aplica a decisão nas duas ferramentas. */
  function apply(decision) {
    var granted = decision === "granted";

    // Google Consent Mode v2
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        ad_storage:         granted ? "granted" : "denied",
        analytics_storage:  granted ? "granted" : "denied",
        ad_user_data:       granted ? "granted" : "denied",
        ad_personalization: granted ? "granted" : "denied"
      });
    }

    // Microsoft Clarity (a fila window.clarity já existe desde o <head>)
    if (typeof window.clarity === "function") {
      window.clarity("consent", granted);
    }
  }

  function save(decision) {
    try { localStorage.setItem(KEY, decision); } catch (e) {}
    apply(decision);
  }

  // Visitante recorrente: reaplica a escolha e não mostra banner.
  if (stored === "granted" || stored === "denied") {
    apply(stored);
    return;
  }

  // Primeira visita: por padrão o Clarity também fica sem cookie até decidir.
  if (typeof window.clarity === "function") window.clarity("consent", false);

  /* ── Banner ── */
  function buildBanner() {
    var el = document.createElement("div");
    el.className = "crm-consent";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-live", "polite");
    el.setAttribute("aria-label", "Aviso de privacidade e cookies");
    el.innerHTML =
      '<p class="crm-consent__text">' +
        'Usamos cookies para entender como você usa o site e melhorá-lo. ' +
        'Veja nossa <a href="privacidade.html">Política de Privacidade</a>.' +
      '</p>' +
      '<div class="crm-consent__actions">' +
        '<button type="button" class="crm-consent__btn crm-consent__btn--ghost" data-consent="denied">Recusar</button>' +
        '<button type="button" class="crm-consent__btn crm-consent__btn--primary" data-consent="granted">Aceitar</button>' +
      '</div>';

    el.addEventListener("click", function (e) {
      var b = e.target.closest("[data-consent]");
      if (!b) return;
      save(b.getAttribute("data-consent"));
      el.classList.remove("is-visible");
      // remove do DOM após a transição de saída
      setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 320);
    });

    document.body.appendChild(el);
    // força reflow antes de animar a entrada
    requestAnimationFrame(function () { el.classList.add("is-visible"); });
  }

  if (document.readyState !== "loading") buildBanner();
  else document.addEventListener("DOMContentLoaded", buildBanner);
})();
