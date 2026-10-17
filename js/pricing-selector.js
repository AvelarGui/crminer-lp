(() => {
  const selector = document.querySelector('#contact-volume');
  const grid = document.querySelector('.plan-grid');
  const result = document.querySelector('#volume-result');
  const sales = document.querySelector('#volume-sales');
  const compare = document.querySelector('#comparar');
  const compareLink = document.querySelector('.compare-link');
  const tableRegion = compare?.querySelector('.table-scroll');
  const table = tableRegion?.querySelector('table');
  if (!selector || !grid || !result || !sales || !compare || !compareLink || !table) return;

  const plans = [
    { id: 'basic', name: 'Basic', limit: 100, price: 'R$ 79,90' },
    { id: 'plus', name: 'Plus', limit: 250, price: 'R$ 199' },
    { id: 'pro', name: 'Pro', limit: 500, price: 'R$ 390' },
    { id: 'growth', name: 'Growth', limit: 2000, price: 'R$ 690' },
    { id: 'scale', name: 'Scale', limit: 5000, price: 'R$ 990' },
  ];
  const cards = new Map(plans.map((plan) => [plan.id, document.getElementById(plan.id)]));
  const header = table.tHead.rows[0];
  const rows = Array.from(table.tBodies[0].rows);

  // Growth inherits Pro; Scale inherits Growth. Add their columns to the existing comparison.
  for (const plan of plans.slice(3)) {
    const th = document.createElement('th');
    th.scope = 'col';
    th.innerHTML = `${plan.name}<br><strong>${plan.price}/mês</strong>`;
    header.append(th);
  }
  for (const row of rows) {
    if (row.classList.contains('category-row')) continue;
    const label = row.querySelector('th')?.textContent.trim();
    const proValue = row.cells[3].textContent;
    for (const plan of plans.slice(3)) {
      const cell = document.createElement('td');
      cell.textContent = label === 'Contatos ativos/mês'
        ? `Até ${plan.limit.toLocaleString('pt-BR')}`
        : proValue;
      row.append(cell);
    }
  }

  const body = table.tBodies[0];
  const category = document.createElement('tr');
  category.className = 'category-row';
  category.innerHTML = '<th colspan="6" scope="row">Escala e gestão</th>';
  body.append(category);
  const addFeature = (label, values) => {
    const row = document.createElement('tr');
    const heading = document.createElement('th');
    heading.scope = 'row';
    heading.textContent = label;
    row.append(heading);
    for (const value of values) {
      const cell = document.createElement('td');
      cell.textContent = value;
      row.append(cell);
    }
    body.append(row);
  };
  addFeature('Maior capacidade de automações e IA', ['—', '—', '—', '✓', '✓']);
  addFeature('Dashboards avançados de conversão, atendimento e funil', ['—', '—', '—', '✓', '✓']);
  addFeature('Gestão por vendedor, unidade e origem', ['—', '—', '—', '—', '✓']);
  addFeature('Relatórios gerenciais avançados', ['—', '—', '—', '—', '✓']);

  const update = () => {
    const more = selector.value === 'more';
    const volume = more ? Infinity : Number(selector.value) || 100;
    const visible = plans.filter((plan) => plan.limit >= volume).slice(0, 3);
    const names = new Set(visible.map((plan) => plan.id));

    for (const plan of plans) cards.get(plan.id).hidden = !names.has(plan.id);
    grid.hidden = more;
    grid.dataset.count = String(visible.length);
    sales.hidden = !more;
    compare.hidden = more;
    compareLink.hidden = more;

    const headers = Array.from(header.cells).slice(1);
    for (let i = 0; i < plans.length; i += 1) headers[i].hidden = !names.has(plans[i].id);
    for (const row of body.rows) {
      if (row.classList.contains('category-row')) {
        row.cells[0].colSpan = visible.length + 1;
        continue;
      }
      for (let i = 0; i < plans.length; i += 1) row.cells[i + 1].hidden = !names.has(plans[i].id);
    }

    if (more) {
      result.textContent = 'Mais de 5.000 contatos ativos por mês: fale com um especialista.';
    } else {
      const planNames = visible.map((plan) => plan.name).join(', ').replace(/, ([^,]*)$/, ' e $1');
      result.textContent = `Planos para até ${volume.toLocaleString('pt-BR')} contatos ativos por mês: ${planNames}.`;
      tableRegion.setAttribute('aria-label', `Comparação dos planos ${planNames}`);
    }
  };

  selector.disabled = false;
  selector.addEventListener('change', update);
  update();
})();
