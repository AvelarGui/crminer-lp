# Páginas legais (termos.html / privacidade.html) — checklist

> Criadas como **páginas prontas** (branco + logo crminer, CSS embutido, prontas pra abrir como iframe/modal). O conteúdo veio dos rascunhos do cofre (`Termos de Uso.md`, `Política de Privacidade.md`).
>
> ⚠️ **ANTES DE PUBLICAR: validar todo o conteúdo com advogado(a)/DPO.** São rascunhos juridicamente não revisados.

## 1. Preencher os placeholders (marcados em amarelo nas páginas)

Procure os trechos com fundo amarelo `[ASSIM]` e substitua:

- [ ] **[RAZÃO SOCIAL]** — razão social da empresa do crminer · em `termos.html` (1.1) e `privacidade.html` (1.1)
- [ ] **[CNPJ]** — CNPJ da empresa · `termos.html` (1.1) e `privacidade.html` (1.1)
- [ ] **[E-MAIL DE SUPORTE]** — e-mail de suporte · `termos.html` em 3 lugares (3.2, 6.4, 12.3)
- [ ] **[CIDADE/UF DO FORO]** — foro eleito · `termos.html` (12.2)
- [ ] **[NOME DO ENCARREGADO]** — nome do Encarregado (DPO) · `privacidade.html` (10)
- [ ] **[DATA DE VIGÊNCIA]** — data em que as páginas entram em vigor · topo das duas páginas
- [ ] Conferir o ano do rodapé (`© 2026 crminer`) e a **Versão 1.0**.

## 2. Confirmar / validar com jurídico

- [ ] `privacidade@crminer.com.br` está **ativo** e responde (canal do Encarregado).
- [ ] **Limitação de responsabilidade** — `termos.html` 9.3 (limite de 12 meses): confirmar com advogado.
- [ ] **Transferência internacional** — `privacidade.html` §6: confirmar onde os dados são hospedados (ex.: Neon/EUA) e as cláusulas com o fornecedor.
- [ ] **Foro** — §12.2 dos Termos: confirmar comarca vs. foro do consumidor/domicílio.
- [ ] Retenção (24 meses / 5 anos de prova) e menores (18+) batem com a operação real.

## 3. Publicação e rotas

- [ ] Definir as URLs finais (ex.: `crminer.com.br/termos` e `/privacidade` — hoje os arquivos são `termos.html` e `privacidade.html`).
- [ ] **Linkar no rodapé do site** (`index.html`) para `/termos` e `/privacidade`.
- [ ] Apontar os links do **signup** (app) para estas páginas (gap #10/#11 do produto).

## 4. Embed como iframe/modal

- [ ] As páginas são **auto-contidas** (CSS inline, sem JS) — abrem direto em `<iframe>`.
- [ ] Para embutir em **outro domínio** (ex.: `linkminer.app`), configurar no servidor o header **`Content-Security-Policy: frame-ancestors 'self' https://*.crminer.com.br https://linkminer.app`** (sem isso, o navegador pode bloquear o enquadramento).
- [ ] O **termo de consentimento por loja** (com nome da loja injetado) é outra página, servida pelo produto em `linkminer.app/{nomedocliente}/termo` — não está aqui (ver `Kit LGPD — Plano de Implementação` no cofre).

## 5. Manutenção

- [ ] **Fonte única:** se editar o texto, manter sincronizado com os `.md` do cofre (`Termos de Uso.md`, `Política de Privacidade.md`) — ou eleger um dos dois como fonte.
- [ ] Logo usado: `assets/logo/logo_black.png` (escuro sobre branco). Trocar se quiser outra versão.
- [ ] Conferir que não voltou nenhum "wordvirtua"/"orbit".
