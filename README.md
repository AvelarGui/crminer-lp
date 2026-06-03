# CRMiner Landing Page

Landing page moderna e responsiva para CRMiner — solução de captura de leads antes da venda.

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

- **--bg**: `#121417` — Fundo principal
- **--card**: `#1C2026` — Fundo de cards
- **--border**: `#2A2F38` — Bordas padrão
- **--border-bright**: `#3A414D` — Bordas em hover
- **--gold**: `#FFC800` — Cor primária (destaque)
- **--cyan**: `#00E5FF` — Cor secundária (acentos)
- **--text**: `#F8F9FA` — Texto principal
- **--muted**: `#B6BAC6` — Texto secundário

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

- Design moderno com tema escuro
- Totalmente responsivo (mobile, tablet, desktop)
- Animações suaves (reveal ao scroll, hero scene animado)
- Otimizado para performance
- Acessibilidade incluída (aria-labels, roles)

## 🔗 Fontes

- **Tipografia**: Plus Jakarta Sans (Google Fonts)
- **Smooth Scroll**: CSS native `scroll-behavior`

---

**Desenvolvido com ❤️ para CRMiner**
