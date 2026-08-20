<div align="center">

# A Vanguarda que se Esvazia

**Manifesto do federalismo autogestionário** — landing page oficial

[![Deploy](https://img.shields.io/badge/deploy-GitHub%20Pages-222222?logo=github&logoColor=white)](https://manifesto.jaopd.dev)
[![React](https://img.shields.io/badge/react-18-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/typescript-5.6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/tailwindcss-3.3-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: CC BY-SA 4.0](https://img.shields.io/badge/license-CC%20BY--SA%204.0-lightgrey)](LICENSE)

[**Ver o site →**](https://manifesto.jaopd.dev)

</div>

---

## Sobre

Landing page do manifesto **_A Vanguarda que se Esvazia_**: tese, quatro
sacadas centrais, declarações e chamada à leitura da íntegra e da Carta
(a constituição proposta pelo manifesto). Publicada em
[manifesto.jaopd.dev](https://manifesto.jaopd.dev).

O conteúdo — texto, articulado, bibliografia — não é escrito aqui. Ele vem de
`manuscrito/`, na raiz do projeto, e chega a este site através de um pipeline
de build (veja [Pipeline de conteúdo](#pipeline-de-conteúdo)). Este
repositório é só a apresentação.

## Stack

| Camada       | Tecnologia                                          |
| ------------ | ---------------------------------------------------- |
| Framework    | [React 18](https://react.dev) + TypeScript          |
| Build        | [Vite 5](https://vitejs.dev)                        |
| Estilo       | [Tailwind CSS 3.3](https://tailwindcss.com)         |
| Deploy       | GitHub Pages, via [`gh-pages`](https://github.com/tschaub/gh-pages) |

Sem backend, sem banco — site 100% estático, com caminhos relativos, então o
`dist/` gerado roda em qualquer hospedagem estática (ou até em `file://`).

## Como rodar localmente

Pré-requisitos: Node.js 18+.

```bash
npm install
npm run dev        # http://localhost:5173
```

## Scripts

| Script            | O que faz                                                     |
| ------------------ | -------------------------------------------------------------- |
| `npm run dev`      | Servidor de desenvolvimento com hot reload                    |
| `npm run build`    | Checa os tipos (`tsc`) e gera o build de produção em `dist/`  |
| `npm run preview`  | Serve `dist/` localmente, como em produção                    |
| `npm run checar`   | Só a checagem de tipos, sem build                              |
| `npm run deploy`   | Publica `dist/` no branch `gh-pages`                           |

## Pipeline de conteúdo

```
manuscrito/*.md  ──▶  ../build.py  ──▶  src/dados/manifesto.json
                                    ├──▶ public/manifesto.pdf
                                    ├──▶ public/leitura/index.html
                                    └──▶ public/biblioteca/
```

[`../build.py`](../build.py) lê os capítulos em `manuscrito/` e escreve
`src/dados/manifesto.json` — título, licença, partes, capítulos e a
bibliografia (cuja fonte única é `manuscrito/bibliografia.md`, compartilhada
com o PDF e com o site de leitura). O mesmo script copia para `public/`:

- **`manifesto.pdf`** — alvo do botão de download;
- **`leitura/index.html`** — a edição de leitura completa, linkada pela
  landing como *"Ler a íntegra"* (`URL_LEITURA` em `src/dados/manifesto.ts`);
- **`biblioteca/`** — os exemplares locais das fontes citadas na bibliografia.

Antes de um build que precise refletir mudanças no manuscrito:

```bash
cd .. && python3 build.py && cd landing
npm run build
```

`src/dados/manifesto.json` é **gerado** — não editar à mão.

## Estrutura

```
landing/
├── src/
│   ├── componentes/     # Capa, Tese, Sacadas, Carta, Bibliografia, Rodapé...
│   ├── dados/           # conteudo.ts (texto editorial) + manifesto.json (gerado)
│   └── ganchos/         # useRevelar, useRolagem
├── public/              # PDF, edição de leitura e biblioteca (gerados, gitignored)
└── vite.config.ts
```

## Onde mexer

| Arquivo                     | O que é                                                                       |
| ---------------------------- | ------------------------------------------------------------------------------ |
| `src/dados/conteudo.ts`      | Texto editorial da página (tese, sacadas, declarações) — extraído do manuscrito |
| `src/dados/manifesto.ts`     | Tipos, dados gerados e helpers                                                |
| `src/componentes/Base.tsx`   | Botões, ícone de PDF e o invólucro `Secao` (com revelação ao rolar)           |
| `tailwind.config.js`         | Paleta (`tinta`, `papel`, `rubro`), fontes e animações                        |

## Deploy

Publicado no GitHub Pages a partir do branch `gh-pages`, com domínio
customizado (`public/CNAME` → `manifesto.jaopd.dev`):

```bash
python3 ../build.py     # regenera o conteúdo, se mudou
npm run build
npm run deploy
```

## Licença

O conteúdo deste manifesto está licenciado sob
**[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.pt-br)**
— veja [`LICENSE`](LICENSE). Você pode copiar, redistribuir, adaptar e
traduzir, inclusive para fins comerciais, desde que credite a obra e
distribua as versões derivadas sob a mesma licença.
