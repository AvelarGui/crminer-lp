# 📊 Estrutura do Projeto CRMiner Landing Page

## 🎯 Arquivos Principais

```
Landing Page crminer/
│
├── 📄 index.html
│   └── Arquivo HTML principal (renomeado de "CRMiner Landing Page.html")
│   └── Contém toda a marcação semântica da landing page
│   └── Referencia CSS através de: css/index.css
│   └── Referencia JS através de: js/main.js
│
├── 📁 css/
│   ├── 📄 index.css                    ← ARQUIVO PRINCIPAL
│   │   └── Importa global.css e responsive.css
│   │
│   ├── 📄 global.css                   ← ESTILOS BASE
│   │   ├── Variáveis CSS (:root)
│   │   ├── Reset de estilos
│   │   ├── Tipografia
│   │   ├── Componentes:
│   │   │   ├── Buttons (.btn, .btn-primary, .btn-ghost, .btn-link)
│   │   │   ├── Badge (.badge)
│   │   │   ├── Header (sticky header)
│   │   │   ├── Hero section (.hero-grid, .scene)
│   │   │   ├── Cards (.sig, .lead-card, .step-card)
│   │   │   ├── Grids (.signals, .steps, .benefits)
│   │   │   ├── Timeline (.timeline-scroll)
│   │   │   ├── Compare section (.compare, .cmp)
│   │   │   └── Footer
│   │   └── Animações:
│   │       ├── @keyframes drift (silhuetas)
│   │       ├── @keyframes pulse (pontos)
│   │       ├── @keyframes flow (linhas)
│   │       ├── @keyframes floaty (cards)
│   │       └── @keyframes reveal (fade in)
│   │
│   └── 📄 responsive.css               ← MEDIA QUERIES
│       ├── Breakpoint 1024px (tablets)
│       ├── Breakpoint 768px (tablets pequenos)
│       └── Breakpoint 430px (smartphones)
│
├── 📁 js/
│   └── 📄 main.js                      ← JAVASCRIPT
│       ├── Sticky Header
│       │   └── Adiciona classe "scrolled" após 100px
│       │
│       └── Scroll Reveal
│           ├── Monitora elementos com classe .reveal
│           ├── Anima quando entram na viewport
│           └── Safety net: mostra tudo após 2.5s
│
├── 📁 assets/
│   ├── 📁 logo/                        ← LOGOS ORGANIZADOS
│   │   ├── 📄 logo_white.png
│   │   └── 📄 logo_icon.svg
│   │
│   └── 📁 screenshots/                 ← SCREENSHOTS DE REFERÊNCIA
│       └── [diversos arquivos PNG]
│
├── 📁 uploads/                         ← LOGOS ALTERNATIVOS (BACKUP)
│   └── [logos em diferentes variações]
│
├── 📄 README.md                        ← DOCUMENTAÇÃO PRINCIPAL
└── 📄 STRUCTURE.md                     ← ESTE ARQUIVO
```

## 🎨 Paleta de Cores (CSS Variables)

| Variável | Cor | Uso |
|----------|-----|-----|
| `--bg` | `#121417` | Fundo principal |
| `--card` | `#1C2026` | Fundo de cards |
| `--border` | `#2A2F38` | Bordas padrão |
| `--border-bright` | `#3A414D` | Bordas em hover |
| `--gold` | `#FFC800` | Cor primária |
| `--cyan` | `#00E5FF` | Cor secundária |
| `--text` | `#F8F9FA` | Texto principal |
| `--muted` | `#B6BAC6` | Texto secundário |

## 📱 Breakpoints Responsivos

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 430px

## 🚀 Seções da Landing Page

1. **Header** (sticky)
   - Logo + Navigation
   - Botões de CTA

2. **Hero Section (Dobra 1)**
   - Título destacado
   - Descrição
   - Botões de ação
   - Scene (SVG com animações)

3. **Sinais Perdidos (Dobra 2)**
   - 5 cards com exemplos
   - Grande pergunta ("Quantos viraram lead?")

4. **O Problema / Iceberg (Dobra 3)**
   - Descrição do problema
   - SVG de iceberg
   - Comparação visual

5. **Como Funciona (Dobra 4)**
   - 5 steps numerados
   - Step card com lead identificado
   - Descrição de fluxo

6. **Timeline Comparativa (Dobra 5)**
   - SVG de linha do tempo
   - Comparação CRM Tradicional vs CRMiner

7. **Impacto Financeiro (Dobra 6)**
   - Flow visual de conversão
   - Comparison cards (CRM Tradicional vs CRMiner)

8. **CTA Final (Dobra 7)**
   - Grande caixa de call-to-action
   - 5 benefícios em cards

9. **Footer**
   - Quote final
   - Logo + Assinatura

## ✨ Características Implementadas

✅ Design moderno com tema escuro  
✅ Totalmente responsivo  
✅ Animações suaves (reveal ao scroll)  
✅ Hero scene com animações SVG  
✅ Sticky header com blur effect  
✅ Otimizado para performance  
✅ Acessibilidade incluída (aria-labels)  
✅ Print-friendly  
✅ Suporte para preferências de movimento reduzido  

## 🔗 Dependências Externas

- **Font**: Plus Jakarta Sans (Google Fonts)
- **Smooth Scroll**: CSS nativo

## 📋 Checklist de Qualidade

- [x] HTML semântico
- [x] CSS organizado (global + responsive)
- [x] JavaScript limpo e eficiente
- [x] Imagens otimizadas
- [x] Assets organizados em pastas
- [x] Variáveis CSS reutilizáveis
- [x] Media queries funcionais
- [x] Sem erros no console
- [x] Funciona em desktop, tablet e mobile
- [x] Documentação completa

---

**Projeto estruturado com excelência. Pronto para produção! 🚀**
