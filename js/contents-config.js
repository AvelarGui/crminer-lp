/* Fonte editorial da homepage. Nenhuma pauta é publicada automaticamente.
 * Para publicar: incluir conteúdo real, URL revisada e status: 'published'.
 * Temas: Captura, Conversão, Relacionamento.
 * Categorias: Na mídia, Conteúdo, Aprenda, Cases, Parcerias, Novidades.
 * A homepage exibe até 3 itens; o botão revela os demais no mesmo componente.
 */
window.crmContents = {
  items: [
    {
      id: 'blog-whatsapp-business-api-outubro-2026',
      status: 'published',
      category: 'Conteúdo',
      topic: 'Relacionamento',
      title: 'WhatsApp Business API: entenda a cobrança que mudou em outubro de 2026',
      description: 'Veja o que mudou para mensagens de serviço e utilidade, a franquia mensal e os valores de referência no Brasil.',
      image: 'assets/contents/capa-blog-whatsapp-api-900x506.png',
      imageAlt: 'Capa da matéria WhatsApp API: quanto custa agora?',
      url: '/blog/whatsapp-business-api-cobranca-outubro-2026'
    },
    {
      id: 'abioptica-programa-crminer',
      status: 'published',
      category: 'Na mídia',
      topic: 'Captura',
      title: 'Abióptica e CRMiner lançam programa para ajudar óticas a transformar intenção de compra em oportunidades de negócio',
      description: 'A parceria ajuda óticas associadas a identificar potenciais clientes e manter o relacionamento antes mesmo da conclusão da venda.',
      image: 'assets/contents/abioptica-crminer.png',
      imageAlt: 'Abióptica e CRMiner apresentam programa de captação estratégica para óticas',
      url: 'https://www.abioptica.com.br/abioptica-e-crminer-lancam-programa-para-ajudar-oticas-a-transformar-intencao-de-compra-em-oportunidades-de-negocio/'
    },
    {
      id: 'opticanet-programa-crminer',
      status: 'published',
      category: 'Na mídia',
      topic: 'Captura',
      title: 'Abióptica e CRMiner lançam programa especial para óticas associadas',
      description: 'O Portal Opticanet apresenta a iniciativa que ajuda óticas a identificar sinais de interesse antes da venda e acompanhar clientes em decisão.',
      image: 'assets/contents/opticanet-crminer.png',
      imageAlt: 'Publicação do Portal Opticanet sobre o programa CRMiner e Abióptica',
      url: 'https://opticanet.com.br/secao/lancamentos/abioptica-e-crminer-lancam-programa-especial-para-oticas-associadas/32117'
    },
    {
      id: 'crminer-instagram-reel-dcqvsa2xq8w',
      status: 'published',
      category: 'Na mídia',
      topic: 'Na mídia',
      title: 'CRMiner no Instagram',
      description: 'Confira este conteúdo do CRMiner no Instagram.',
      url: 'https://www.instagram.com/reels/DcQvSA2xq8w/'
    }
  ],
  // Exemplo exclusivo de desenvolvimento; nunca entra na lista pública.
  developmentExample: {
    id: 'placeholder-desenvolvimento',
    status: 'draft',
    placeholder: true,
    category: 'Aprenda',
    topic: 'Captura',
    title: '[PLACEHOLDER DE DESENVOLVIMENTO] Título do conteúdo',
    description: '[PLACEHOLDER DE DESENVOLVIMENTO] Resumo do conteúdo real.',
    url: ''
  }
};

/* Localized editorial cards. External publication titles remain their original titles. */
(function () {
  var locale = window.crmLocale || 'pt';
  if (locale === 'pt') return;
  var copy = {
    en: [
      { category: 'Article', topic: 'Customer relationships', title: 'WhatsApp Business API: understand the October 2026 pricing change', description: 'What changed for service and utility messages, the monthly allowance, and reference rates for Brazil.', imageAlt: 'WhatsApp API pricing article cover for Brazil', image: 'assets/contents/whatsapp-api-cover-en.png', url: '/en/blog/whatsapp-business-api-cobranca-outubro-2026' },
      { category: 'In the media', topic: 'Lead capture', description: 'The partnership helps optical stores identify potential customers and stay in touch before a purchase.', titleSuffix: ' (article in Portuguese)' },
      { category: 'In the media', topic: 'Lead capture', description: 'Portal Opticanet covers the initiative helping optical stores identify interest before the sale.', titleSuffix: ' (article in Portuguese)' },
      { category: 'In the media', topic: 'In the media', title: 'crminer on Instagram', description: 'See this crminer post on Instagram.' }
    ],
    es: [
      { category: 'Artículo', topic: 'Relación con clientes', title: 'WhatsApp Business API: qué cambió en los precios de octubre de 2026', description: 'Qué cambió en los mensajes de servicio y utilidad, la franquicia mensual y las tarifas de referencia para Brasil.', imageAlt: 'Portada del artículo sobre tarifas de WhatsApp API en Brasil', image: 'assets/contents/whatsapp-api-cover-es.png', url: '/es/blog/whatsapp-business-api-cobranca-outubro-2026' },
      { category: 'En los medios', topic: 'Captación', description: 'La alianza ayuda a las ópticas a identificar posibles clientes y mantener el contacto antes de la compra.', titleSuffix: ' (artículo en portugués)' },
      { category: 'En los medios', topic: 'Captación', description: 'Portal Opticanet presenta la iniciativa para detectar interés antes de la venta.', titleSuffix: ' (artículo en portugués)' },
      { category: 'En los medios', topic: 'En los medios', title: 'crminer en Instagram', description: 'Mira esta publicación de crminer en Instagram.' }
    ]
  }[locale];
  window.crmContents.items.forEach(function (item, index) {
    var localized = copy[index];
    if (localized.titleSuffix) item.title += localized.titleSuffix;
    Object.keys(localized).forEach(function (key) { if (key !== 'titleSuffix') item[key] = localized[key]; });
  });
})();
