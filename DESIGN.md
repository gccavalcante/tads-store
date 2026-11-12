# DESIGN.md · NexusTech (tads-store)

Fonte de verdade visual do projeto. Mudou token ou padrão? Atualize aqui e registre no fim.

## Leitura

> Loja de eletrônicos para quem quer comparar e comprar rápido, uma página de **operar** com linguagem de varejo técnico (a marca é "circuito"), em React + CSS puro. Intensidade: **Variação baixa–média, Movimento baixo, Densidade média–alta.**

- O padrão de e-commerce (sidebar + grid, carrinho em lista, resumo à direita) fica, porque é o que o usuário já conhece.
- A personalidade mora nos detalhes: preço em mono, estoque e frete reais, estados vazios, foco.
- O único lugar com Variação média é o detalhe do produto (divisão 7/5).

## Tokens (em `src/App.css`)

| Grupo | Tokens | Regra |
|---|---|---|
| Superfície | `--surface-0/1/2`, `--line`, `--line-strong` | Neutros puxados pro verde. `surface-2` é a "prateleira" da foto |
| Texto | `--ink`, `--ink-soft`, `--ink-faint` | `ink-faint` ≥ 4.5:1 sobre `surface-0` |
| Acento | `--accent` `#05d55a` (logo), `--on-accent`, `--accent-ink`, `--accent-tint` | O verde **preenchido** só na ação principal da tela e no estado ativo. O texto sobre o verde é sempre `--on-accent` (escuro). Para verde como texto, use `--accent-ink` |
| Estado | `--danger`, `--warn` | Só para remover/erro e estoque baixo. Nunca decorativo |
| Tipo | IBM Plex Sans (400/500/600) + IBM Plex Mono (500/600) | Mono só em número: preço, quantidade, contagem, SKU |
| Escala | 13 · 14 · 16 · 19 · 23 · 28 · 33 · 40 (razão 1.2) | `--fs-*` |
| Espaço | 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 | `--s-1` … `--s-8` |
| Raio | `--r-sm` 4px (controles), `--r-md` 8px (cards/painéis), `--r-full` só em badge numérico e no favorito |
| Movimento | `--t-rapido` 120ms, só cor/borda/fundo | Sem translate, scale, blur ou glow. Respeita `prefers-reduced-motion` |

## Padrões

- **Card de produto:** foto em `surface-2` 1:1, marca e nota numa linha, título com 2 linhas, preço em mono e **uma** ação (ícone de carrinho). O card inteiro linka para o detalhe (link esticado). O desconto só aparece a partir de 10% (`LIMIAR_DESCONTO`), e "Só N em estoque" abaixo de 10 unidades.
- **Botões:** `.btn-primario` (no máximo um por tela), `.btn-secundario` (contorno), `.btn-link` (ações terciárias e destrutivas).
- **Formulários:** `.campo` sempre com `<label>` visível. O `readonly` é visualmente distinto (sem borda, `surface-2`). Os erros ficam inline (`.campo-erro`), nunca em `alert()`.
- **Header:** sólido, ganha uma borda de 1px ao rolar. Sem vidro, sem neon.
- **Rótulos de categoria:** em português via `rotuloCategoria()`. O filtro continua usando o slug da API.

## Proibido aqui (tells)

Glassmorphism, glow/neon, card que levanta no hover, dois botões cheios por card, selo vermelho em todo produto, texto branco sobre o verde, hex solto em componente, `transition: all`, `!important` para brigar com especificidade.

## Registro de decisões

| Data | Decisão | Motivo |
|---|---|---|
| 2026-11-12 | Redesign com base na auditoria ui-humanizer | Contraste reprovado no CTA (2:1), tema claro quebrado no header, tells de "tech genérico" |
| 2026-11-12 | IBM Plex Sans + Mono | Voz de engenharia e hardware, coerente com o logo de circuito. Mono deixa os preços tabulares |
| 2026-11-12 | Preço em `--ink`; verde só no desconto e na ação | Um acento, uma função. O preço é lido pelo peso e pelo tamanho |
| 2026-11-12 | "Comprar agora" saiu do card e foi para o detalhe | 76 botões verdes por tela sumiam como papel de parede |
