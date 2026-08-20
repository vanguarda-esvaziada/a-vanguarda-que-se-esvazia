# A Vanguarda que se Esvazia — Landing

Landing page do manifesto **_A Vanguarda que se Esvazia_**, publicada em
[manifesto.jaopd.dev](https://manifesto.jaopd.dev).

React 18 + TypeScript + Tailwind CSS, servida como site estático via Vite e
publicada no GitHub Pages.

## Stack

- [Vite](https://vitejs.dev) — build e dev server
- [React 18](https://react.dev) + TypeScript
- [Tailwind CSS](https://tailwindcss.com) 3.3
- [gh-pages](https://github.com/tschaub/gh-pages) — deploy estático

## Pré-requisitos

- Node.js 18+
- Python 3 (só para regenerar o conteúdo, ver [Pipeline de conteúdo](#pipeline-de-conteúdo))

## Uso

```bash
npm install
npm run dev        # http://localhost:5173
```

## Scripts

| Script           | O que faz                                             |
| ---------------- | ------------------------------------------------------ |
| `npm run dev`     | Servidor de desenvolvimento com hot reload             |
| `npm run build`   | Checa os tipos (`tsc`) e gera o build de produção em `dist/` |
| `npm run preview` | Serve o conteúdo de `dist/` localmente, como em produção |
| `npm run checar`  | Só a checagem de tipos, sem build                       |
| `npm run deploy`  | Publica `dist/` no branch `gh-pages` do repositório     |

## Pipeline de conteúdo

Este projeto não é a fonte do conteúdo — ele é gerado.

[`../build.py`](../build.py) lê os capítulos em `manuscrito/` e escreve
`src/dados/manifesto.json` (título, licença, partes, capítulos e a
bibliografia, cuja fonte única é `manuscrito/bibliografia.md`). O mesmo script
copia para `public/`:

- `manifesto.pdf` — alvo do botão de download;
- `leitura/index.html` — a edição de leitura completa, linkada pela landing
  como "Ler a íntegra" (`URL_LEITURA` em `src/dados/manifesto.ts`);
- `biblioteca/` — os exemplares das fontes citadas.

Ou seja, antes de um `npm run build` que reflita mudanças no manuscrito:

```bash
cd .. && python3 build.py && cd landing
```

`src/dados/manifesto.json` é gerado — não editar à mão.

## Onde mexer

| Arquivo                          | O que é                                                                                          |
| --------------------------------- | ------------------------------------------------------------------------------------------------- |
| `src/dados/conteudo.ts`           | Texto editorial da página (tese, sacadas, declarações, bloco de abertura) — extraído do manuscrito |
| `src/dados/manifesto.ts`          | Tipos, dados gerados e helpers                                                                    |
| `src/componentes/Base.tsx`        | Botões, ícone de PDF e o invólucro `Secao` (com revelação ao rolar)                               |
| `tailwind.config.js`              | Paleta (`tinta`, `papel`, `rubro`), fontes e animações                                            |

## Deploy

O build sai autocontido (caminhos relativos em `vite.config.ts`), pronto para
qualquer hospedagem estática. Este projeto publica no GitHub Pages a partir do
branch `gh-pages`, com domínio customizado (`public/CNAME`):

```bash
python3 ../build.py     # regenera o conteúdo, se mudou
npm run build
npm run deploy
```

## Licença

O conteúdo do manifesto é licenciado sob
[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.pt-br).
