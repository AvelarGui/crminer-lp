/* Shared interface copy for text created after the HTML loads. */
(function () {
  var lang = document.documentElement.lang || 'pt-BR';
  var locale = lang.indexOf('es') === 0 ? 'es' : lang.indexOf('en') === 0 ? 'en' : 'pt';
  var copy = {
    en: {
      openMenu: 'Open menu', closeMenu: 'Close menu',
      openingForm: 'Opening form…', openingDemo: 'Opening demo form', requestDemo: 'Request a crminer demo',
      step: 'Step', of: 'of', nextStep: 'Next step', startOver: 'Back to start', firstStep: 'Back to the first step', advanceStep: 'Go to the next step',
      cookieDialog: 'Privacy and cookies notice', cookieTitle: 'Cookies and privacy',
      cookieText: 'With your permission, we use browsing data to understand how this site is used. You can change your choice later.',
      privacyPolicy: 'Privacy Policy (Portuguese)', decline: 'Decline', accept: 'Accept',
      previousExample: 'View previous example', nextExample: 'View next example',
      articleSingular: 'article', articlePlural: 'articles', readArticle: 'Read article', by: 'By',
      previousArticle: '← Previous article', nextArticle: 'Next article →',
      storiesTitle: 'How crminer works', storiesLabel: 'crminer · Demo (Portuguese video)',
      toggleSound: 'Turn sound on or off', close: 'Close', previous: 'Previous', next: 'Next',
      moreThanContacts: 'More than 5,000 active contacts per month: talk to a specialist.',
      legalLanguage: 'Available in Portuguese'
    },
    es: {
      openMenu: 'Abrir menú', closeMenu: 'Cerrar menú',
      openingForm: 'Abriendo formulario…', openingDemo: 'Abriendo formulario de demostración', requestDemo: 'Solicitar una demostración de crminer',
      step: 'Etapa', of: 'de', nextStep: 'Siguiente etapa', startOver: 'Volver al inicio', firstStep: 'Volver a la primera etapa', advanceStep: 'Ir a la siguiente etapa',
      cookieDialog: 'Aviso de privacidad y cookies', cookieTitle: 'Cookies y privacidad',
      cookieText: 'Con tu permiso, usamos datos de navegación para comprender cómo se utiliza este sitio. Puedes cambiar tu elección más adelante.',
      privacyPolicy: 'Política de Privacidad (en portugués)', decline: 'Rechazar', accept: 'Aceptar',
      previousExample: 'Ver ejemplo anterior', nextExample: 'Ver ejemplo siguiente',
      articleSingular: 'artículo', articlePlural: 'artículos', readArticle: 'Leer artículo', by: 'Por',
      previousArticle: '← Artículo anterior', nextArticle: 'Artículo siguiente →',
      storiesTitle: 'Cómo funciona crminer', storiesLabel: 'crminer · Demostración (video en portugués)',
      toggleSound: 'Activar o desactivar el sonido', close: 'Cerrar', previous: 'Anterior', next: 'Siguiente',
      moreThanContacts: 'Más de 5.000 contactos activos al mes: habla con un especialista.',
      legalLanguage: 'Disponible en portugués'
    }
  };
  window.crmLocale = locale;
  window.crmT = function (key, fallback) { return (copy[locale] && copy[locale][key]) || fallback || key; };
})();
