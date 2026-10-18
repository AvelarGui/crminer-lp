(() => {
  'use strict';

  // Tarifas em reais por mensagem entregue para destinatários no Brasil.
  // Atualize este objeto quando a tabela da Meta mudar; a interface e o cálculo usam a mesma fonte.
  const whatsappPricing = Object.freeze({
    marketing: 0.3217,
    utility: 0.0350,
    service: 0.0350,
    serviceFreeTier: 1000,
    effectiveFrom: '2026-10-01'
  });
  const maxMessages = 1_000_000_000; // Proteção do simulador, não um limite de plano.
  const fields = {
    marketing: document.getElementById('marketing-messages'),
    utility: document.getElementById('utility-messages'),
    service: document.getElementById('service-messages')
  };
  const outputs = {
    marketing: document.getElementById('marketing-cost'),
    utility: document.getElementById('utility-cost'),
    service: document.getElementById('service-cost'),
    total: document.getElementById('meta-estimate')
  };
  if ([...Object.values(fields), ...Object.values(outputs)].some((element) => !element)) return;

  const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  const fourDecimals = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 4, maximumFractionDigits: 4 });
  const ratesInTenThousandths = {
    marketing: Math.round(whatsappPricing.marketing * 10000),
    utility: Math.round(whatsappPricing.utility * 10000),
    service: Math.round(whatsappPricing.service * 10000)
  };
  const rateLabel = (value) => `R$ ${fourDecimals.format(value)} por mensagem entregue`;
  document.getElementById('marketing-rate').textContent = rateLabel(whatsappPricing.marketing);
  document.getElementById('utility-rate').textContent = rateLabel(whatsappPricing.utility);
  document.getElementById('service-rate').textContent = `Primeiras ${new Intl.NumberFormat('pt-BR').format(whatsappPricing.serviceFreeTier)} grátis; depois ${rateLabel(whatsappPricing.service)}`;
  const formatCount = new Intl.NumberFormat('pt-BR');
  document.getElementById('service-free-title').textContent = `${formatCount.format(whatsappPricing.serviceFreeTier)} mensagens de serviço gratuitas`;
  document.getElementById('service-free-explanation').textContent = `A franquia é mensal e por número comercial. Até ${formatCount.format(whatsappPricing.serviceFreeTier)} mensagens de Serviço no mês, o custo dessa categoria é R$ 0; com ${formatCount.format(whatsappPricing.serviceFreeTier + 500)}, somente 500 são cobradas. Ela não se aplica a Marketing ou Utilidade.`;
  const effectiveDate = new Date(`${whatsappPricing.effectiveFrom}T12:00:00`);
  document.getElementById('pricing-effective-date').textContent = new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }).format(effectiveDate).replace(/^1 de /, '1º de ');

  const messageCount = (field) => {
    const value = Number(field.value);
    if (!Number.isFinite(value)) return 0;
    return Math.min(maxMessages, Math.max(0, Math.trunc(value)));
  };
  const update = () => {
    const marketing = messageCount(fields.marketing) * ratesInTenThousandths.marketing;
    const utility = messageCount(fields.utility) * ratesInTenThousandths.utility;
    const billableService = Math.max(0, messageCount(fields.service) - whatsappPricing.serviceFreeTier);
    const service = billableService * ratesInTenThousandths.service;
    outputs.marketing.textContent = money.format(marketing / 10000);
    outputs.utility.textContent = money.format(utility / 10000);
    outputs.service.textContent = money.format(service / 10000);
    outputs.total.textContent = money.format((marketing + utility + service) / 10000);
  };

  Object.values(fields).forEach((field) => {
    field.addEventListener('input', () => {
      const entered = Number(field.value);
      if (field.value !== '' && Number.isFinite(entered) && (entered < 0 || entered > maxMessages)) {
        field.value = String(messageCount(field));
      }
      update();
    });
    field.addEventListener('change', () => {
      field.value = String(messageCount(field));
      update();
    });
  });
  update();
})();
