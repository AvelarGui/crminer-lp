(function () {
  var dock = document.querySelector('.agent-dock');
  if (!dock) return;

  var agents = Array.prototype.slice.call(dock.querySelectorAll('li'));
  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)');
  dock.dataset.dockReady = 'true';

  function reset() {
    agents.forEach(function (agent) {
      agent.style.removeProperty('--dock-scale');
      agent.style.removeProperty('--dock-lift');
      agent.style.zIndex = '';
    });
  }

  dock.addEventListener('pointermove', function (event) {
    if (!canHover.matches || event.pointerType !== 'mouse') return;

    var pointerX = event.clientX - dock.getBoundingClientRect().left;
    agents.forEach(function (agent) {
      var center = agent.offsetLeft + agent.offsetWidth / 2;
      var distance = Math.abs(pointerX - center);
      var reach = agent.offsetWidth * 1.85;
      var proximity = Math.max(0, 1 - distance / reach);
      var strength = proximity * proximity;

      agent.style.setProperty('--dock-scale', (1 + strength * 0.25).toFixed(3));
      agent.style.setProperty('--dock-lift', (-strength * 9).toFixed(1) + 'px');
      agent.style.zIndex = strength > 0 ? String(Math.ceil(strength * 10)) : '';
    });
  });

  dock.addEventListener('pointerleave', reset);
  dock.addEventListener('focusin', reset);
})();
