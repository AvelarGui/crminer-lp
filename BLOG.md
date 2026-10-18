# Blog CRMiner

O blog está disponível em `/blog`. A listagem lê `js/blog-posts.js`. A primeira matéria usa HTML estático próprio em `blog/whatsapp-business-api-cobranca-outubro-2026.html` para que título, descrição e dados estruturados sejam legíveis sem JavaScript.

## Publicar uma matéria

Para uma nova matéria, crie uma página HTML em `blog/`, com título, descrição, canonical, Open Graph e conteúdo próprios. Adicione a rota correspondente em `vercel.json` e `sitemap.xml`. Depois, adicione um objeto no **início** de `window.CRMINER_BLOG_POSTS` em `js/blog-posts.js`:

```js
{
  slug: 'titulo-curto-sem-acentos',
  url: '/blog/titulo-curto-sem-acentos',
  title: 'Título da matéria',
  summary: 'Resumo curto para a listagem e a descrição da página.',
  category: 'Relacionamento',
  date: '2026-10-01',
  author: 'CRMiner',
  cover: '/assets/blog/nome-da-imagem.webp', // opcional
  coverAlt: 'Descrição da imagem',              // opcional
  blocks: [ // apenas para matérias renderizadas por /blog/artigo?slug=...
    { type: 'paragraph', text: 'Parágrafo de abertura.' },
    { type: 'heading', text: 'Seção principal' },
    { type: 'subheading', text: 'Subseção' },
    { type: 'list', items: ['Primeiro item', 'Segundo item'] },
    { type: 'numbered-list', items: ['Primeiro passo', 'Segundo passo'] },
    { type: 'quote', text: 'Uma frase em destaque.' },
    { type: 'image', src: '/assets/blog/imagem.webp', alt: 'Descrição', caption: 'Legenda opcional' }
  ]
}
```

Cada matéria aparece automaticamente na listagem. Em páginas estáticas, inclua `data-post-slug` no `<body>` e a navegação `static-article-pagination` do primeiro artigo; os links anterior/próximo são calculados pela ordem do array.

O modelo dinâmico `/blog/artigo?slug=...` permanece disponível para rascunhos ou conteúdo simples, mas metadados individuais de matérias públicas devem ficar em páginas HTML estáticas. Confira a página em telas grandes e pequenas antes de publicar.
