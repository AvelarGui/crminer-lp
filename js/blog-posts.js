// Matérias publicadas, da mais recente para a mais antiga. Consulte BLOG.md.
window.CRMINER_BLOG_POSTS = [
  {
    slug: 'whatsapp-business-api-cobranca-outubro-2026',
    url: '/blog/whatsapp-business-api-cobranca-outubro-2026',
    title: 'WhatsApp Business API mudou em 1º de outubro de 2026: entenda a nova cobrança da Meta',
    summary: 'Veja o que muda na cobrança de mensagens de serviço e utilidade, a franquia mensal e os valores de referência para o Brasil.',
    category: 'WhatsApp Business',
    date: '2026-10-01',
    author: 'CRMiner',
    cover: '/assets/contents/capa-blog-whatsapp-api-900x506.png',
    coverAlt: 'Capa da matéria WhatsApp API: quanto custa agora?'
  }
];

(function () {
  var locale = window.crmLocale || 'pt';
  if (locale === 'pt') return;
  var post = window.CRMINER_BLOG_POSTS[0];
  var copy = {
    en: {
      url: '/en/blog/whatsapp-business-api-cobranca-outubro-2026',
      title: 'WhatsApp Business API changed on October 1, 2026: Meta’s new pricing for Brazil',
      summary: 'Understand service and utility message charges, the monthly allowance, and reference rates for recipients in Brazil.',
      cover: '/assets/contents/whatsapp-api-cover-en.png',
      coverAlt: 'WhatsApp API pricing article cover for Brazil'
    },
    es: {
      url: '/es/blog/whatsapp-business-api-cobranca-outubro-2026',
      title: 'WhatsApp Business API cambió el 1 de octubre de 2026: nuevas tarifas de Meta para Brasil',
      summary: 'Conoce los cargos por mensajes de servicio y utilidad, la franquicia mensual y las tarifas de referencia para destinatarios en Brasil.',
      cover: '/assets/contents/whatsapp-api-cover-es.png',
      coverAlt: 'Portada del artículo sobre tarifas de WhatsApp API en Brasil'
    }
  }[locale];
  Object.keys(copy).forEach(function (key) { post[key] = copy[key]; });
})();
