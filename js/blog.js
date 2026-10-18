(function () {
  'use strict';

  var posts = Array.isArray(window.CRMINER_BLOG_POSTS) ? window.CRMINER_BLOG_POSTS : [];
  var locale = window.crmLocale || 'pt';
  var dateFormatter = new Intl.DateTimeFormat({ pt: 'pt-BR', en: 'en', es: 'es-419' }[locale], { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

  function articleUrl(post) {
    return post.url || '/' + (locale === 'pt' ? '' : locale + '/') + 'blog/artigo?slug=' + encodeURIComponent(post.slug);
  }

  function formatDate(date) {
    var value = new Date(date + 'T12:00:00Z');
    return isNaN(value.getTime()) ? '' : dateFormatter.format(value);
  }

  function textElement(tag, className, value) {
    var element = document.createElement(tag);
    if (className) element.className = className;
    element.textContent = value || '';
    return element;
  }

  function renderIndex() {
    var grid = document.getElementById('blog-grid');
    if (!grid) return;
    var empty = document.getElementById('blog-empty');
    var count = document.getElementById('blog-count');
    count.textContent = posts.length + ' ' + window.crmT(posts.length === 1 ? 'articleSingular' : 'articlePlural', posts.length === 1 ? 'matéria' : 'matérias');
    if (!posts.length) return;

    empty.hidden = true;
    grid.hidden = false;
    posts.forEach(function (post) {
      var card = textElement('article', 'blog-card', '');
      var link = document.createElement('a');
      link.href = articleUrl(post);
      link.className = 'blog-card__link';
      if (post.cover) {
        var image = document.createElement('img');
        image.src = post.cover;
        image.alt = post.coverAlt || '';
        image.loading = 'lazy';
        link.appendChild(image);
      }
      var content = textElement('div', 'blog-card__content', '');
      content.appendChild(textElement('span', 'blog-card__category', post.category));
      content.appendChild(textElement('h3', '', post.title));
      content.appendChild(textElement('p', '', post.summary));
      var bottom = textElement('span', 'blog-card__bottom', window.crmT('readArticle', 'Ler matéria') + '  ↗');
      var date = textElement('time', '', formatDate(post.date));
      date.dateTime = post.date;
      bottom.appendChild(date);
      content.appendChild(bottom);
      link.appendChild(content);
      card.appendChild(link);
      grid.appendChild(card);
    });
  }

  function renderBlock(container, block) {
    if (!block || !block.type) return;
    if (block.type === 'paragraph') {
      container.appendChild(textElement('p', '', block.text));
    } else if (block.type === 'heading') {
      container.appendChild(textElement('h2', '', block.text));
    } else if (block.type === 'subheading') {
      container.appendChild(textElement('h3', '', block.text));
    } else if (block.type === 'quote') {
      container.appendChild(textElement('blockquote', '', block.text));
    } else if (block.type === 'image' && block.src) {
      var figure = document.createElement('figure');
      var image = document.createElement('img');
      image.src = block.src;
      image.alt = block.alt || '';
      image.loading = 'lazy';
      figure.appendChild(image);
      if (block.caption) figure.appendChild(textElement('figcaption', '', block.caption));
      container.appendChild(figure);
    } else if ((block.type === 'list' || block.type === 'numbered-list') && Array.isArray(block.items)) {
      var list = document.createElement(block.type === 'numbered-list' ? 'ol' : 'ul');
      block.items.forEach(function (item) { list.appendChild(textElement('li', '', item)); });
      container.appendChild(list);
    }
  }

  function setSibling(anchor, post, label) {
    if (!post) return;
    anchor.href = articleUrl(post);
    anchor.appendChild(textElement('small', '', label));
    anchor.appendChild(textElement('strong', '', post.title));
    anchor.hidden = false;
  }

  function renderArticle() {
    var article = document.getElementById('article');
    var missing = document.getElementById('article-missing');
    if (!article || !missing) return;
    var slug = new URLSearchParams(window.location.search).get('slug');
    if (slug) document.querySelectorAll('.locale-switch a').forEach(function (link) { link.href += '?slug=' + encodeURIComponent(slug); });
    var index = posts.findIndex(function (post) { return post.slug === slug; });
    if (index < 0) {
      document.getElementById('article-missing').hidden = false;
      return;
    }
    var post = posts[index];
    if (!post.blocks && post.url) {
      window.location.replace(post.url);
      return;
    }
    article.hidden = false;
    document.title = post.title + ' | Blog CRMiner';
    document.querySelector('meta[name="description"]').content = post.summary;
    document.getElementById('article-canonical').href = 'https://crminer.com.br' + articleUrl(post);
    document.getElementById('article-robots').content = 'index,follow';
    document.getElementById('breadcrumb-title').textContent = post.title;
    document.getElementById('article-category').textContent = post.category;
    document.getElementById('article-title').textContent = post.title;
    document.getElementById('article-summary').textContent = post.summary;
    var meta = document.getElementById('article-meta');
    if (post.author) meta.appendChild(textElement('span', '', window.crmT('by', 'Por') + ' ' + post.author));
    var date = textElement('time', '', formatDate(post.date));
    date.dateTime = post.date;
    meta.appendChild(date);
    if (post.cover) {
      var cover = document.getElementById('article-cover');
      cover.src = post.cover;
      cover.alt = post.coverAlt || '';
      cover.hidden = false;
    }
    var body = document.getElementById('article-body');
    (post.blocks || []).forEach(function (block) { renderBlock(body, block); });
    var pagination = document.getElementById('article-pagination');
    setSibling(document.getElementById('article-prev'), posts[index + 1], window.crmT('previousArticle', '← Matéria anterior'));
    setSibling(document.getElementById('article-next'), posts[index - 1], window.crmT('nextArticle', 'Próxima matéria →'));
    pagination.hidden = posts.length < 2;
  }

  function renderStaticArticleNavigation() {
    var pagination = document.getElementById('static-article-pagination');
    if (!pagination) return;
    var slug = document.body.getAttribute('data-post-slug');
    var index = posts.findIndex(function (post) { return post.slug === slug; });
    if (index < 0 || posts.length < 2) return;
    var previous = document.getElementById('static-article-prev');
    var next = document.getElementById('static-article-next');
    setSibling(previous, posts[index + 1], window.crmT('previousArticle', '← Matéria anterior'));
    setSibling(next, posts[index - 1], window.crmT('nextArticle', 'Próxima matéria →'));
    pagination.hidden = false;
  }

  renderIndex();
  renderArticle();
  renderStaticArticleNavigation();
}());
