# Landing — *A Vanguarda que se Esvazia*

Página de apresentação do manifesto, em React 18 + TypeScript + Tailwind CSS 3.3.2 (Vite).

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/
npm run checar   # tsc --noEmit
```

## Como o conteúdo chega aqui

`../build.py` lê `manuscrito/` e escreve **`src/dados/manifesto.json`** — título, autor,
licença, números do volume, partes, capítulos e a bibliografia (de
`manuscrito/bibliografia.md`, que é a fonte única das referências do PDF, do site e daqui).
Esse arquivo é gerado: não editar à mão.
O mesmo build copia para `public/`:

- `manifesto.pdf` — alvo do botão de download;
- `leitura/index.html` — a edição de leitura completa (o `site/index.html`), que a landing
  linka como *“Ler a íntegra”* (`URL_LEITURA` em `src/dados/manifesto.ts`).

Ou seja: **rode `python build.py` antes de `npm run build`**. O `dist/` sai autocontido
(caminhos relativos), pronto para qualquer hospedagem estática.

## Onde mexer

| Arquivo | O que é |
| --- | --- |
| `src/dados/conteudo.ts` | texto editorial da página (tese, quatro sacadas, declarações, o bloco de abertura) — extraído do manuscrito |
| `src/dados/manifesto.ts` | tipos, dados gerados e helpers |
| `src/componentes/Base.tsx` | botões, ícone de PDF e o invólucro `Secao` (com revelação ao rolar) |
| `tailwind.config.js` | paleta (`tinta`, `papel`, `rubro`), fontes e animações |
