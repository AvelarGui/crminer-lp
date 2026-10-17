# CRMiner Landing Page

Landing page moderna e responsiva para CRMiner — solução de captura de leads antes da venda.

## Idiomas do site público

- Português é a versão padrão (`/`); inglês e espanhol latino-americano ficam em `/en/` e `/es/`.
- Início, LinkMiner, blog e o artigo publicado têm versões próprias. Preços não estão publicados nesta etapa; documentos legais continuam em português e são identificados nos links traduzidos.
- A cópia portuguesa é a fonte. As traduções estáticas ficam em `locales/en.json` e `locales/es.json`, com revisões editoriais em `locales/overrides.json`.
- Ao mudar o texto português, confira as novas frases com `python3 scripts/build-locales.py --extract`, atualize os dicionários e gere novamente as páginas com `python3 scripts/build-locales.py`. O script interrompe a geração se faltar tradução.
- Textos criados por JavaScript ficam em `js/i18n.js`; os cards editoriais localizados ficam em `js/contents-config.js` e `js/blog-posts.js`.

## 📁 Estrutura do Projeto

```
Landing Page crminer/
├── index.html                 # Arquivo HTML principal
├── css/
│   ├── index.css             # Arquivo principal que importa os outros
│   ├── global.css            # Estilos globais, variáveis e componentes base
│   └── responsive.css        # Media queries para responsividade
├── js/
│   └── main.js               # JavaScript — sticky header e scroll reveal
├── assets/
│   ├── logo/                 # Logos da marca
│   │   ├── logo_white.png
│   │   └── logo_icon.svg
│   └── screenshots/          # Screenshots de referência
├── uploads/                  # Logos alternativos (backup)
└── README.md                 # Este arquivo
```

## 🎨 Paleta de Cores

As cores estão definidas em variáveis CSS no `global.css`:

- **--bg**: `#FFFFFF` — Fundo principal
- **--cream**: `#FAFAFA` — Superfície secundária neutra
- **--card**: `#FFFFFF` — Fundo de cards
- **--border**: `#E4E4E7` — Bordas padrão
- **--gold**: `#FFE450` — Amarelo da marca e ações
- **--gold-dark**: `#F9D000` — Segunda cor do gradiente de ação
- **--text**: `#2A2F35` — Texto principal
- **--muted**: `#71717A` — Texto secundário

## 📱 Breakpoints Responsivos

O projeto utiliza uma abordagem mobile-first com breakpoints em:

- **1024px** — Tablets
- **768px** — Tablets pequenos
- **430px** — Smartphones

## 🚀 Uso

1. Abra `index.html` no navegador
2. O CSS é carregado através de `css/index.css` que importa `global.css` e `responsive.css`
3. O JavaScript em `js/main.js` gerencia:
   - **Sticky Header**: Header fixo com blur após 100px de scroll
   - **Scroll Reveal**: Animações ao entrar na viewport

## 🔧 Personalizações

### Adicionar Cores
Edite as variáveis CSS em `css/global.css`:

```css
:root {
  --seu-cor: #XXXXXX;
}
```

### Modificar Breakpoints
Edite `css/responsive.css` para ajustar os breakpoints.

### Adicionar Scripts
Adicione novos scripts em `js/main.js` ou importe novos arquivos em `index.html`:

```html
<script src="js/novo-script.js"></script>
```

## 📦 Assets

- Logos estão em `assets/logo/`
- Screenshots de referência em `assets/screenshots/`
- Logos alternativos em `uploads/` (backup)

## ✨ Recursos

- Visual alinhado ao front do app: Inter, branco, cinzas neutros e amarelo da marca
- Totalmente responsivo (mobile, tablet, desktop)
- Animações suaves (reveal ao scroll, hero scene animado)
- Otimizado para performance
- Acessibilidade incluída (aria-labels, roles)

## 🔗 Fontes

- **Tipografia**: Inter (Google Fonts)
- **Smooth Scroll**: CSS native `scroll-behavior`

---

**Desenvolvido com ❤️ para CRMiner**
