import { useMemo, useState } from 'react'
import { manifesto, milhar, peso, type PontoPrograma } from '../dados/manifesto'
import { Botao, IconePdf, Secao } from './Base'

const QUANDO: Record<string, { rotulo: string; classe: string }> = {
  hoje: { rotulo: 'cabe hoje', classe: 'border-rubro-600 bg-rubro-700/20 text-rubro-400' },
  emenda: { rotulo: 'exige emenda', classe: 'border-tinta-600 text-papel-300' },
  depois: { rotulo: 'só depois da ruptura', classe: 'border-tinta-600 text-papel-400' },
}

const TODOS = 'Todos'

export function Programa() {
  const { programa } = manifesto
  const [filtro, setFiltro] = useState<string>(TODOS)

  const visiveis = useMemo<PontoPrograma[]>(
    () =>
      filtro === TODOS
        ? programa.pontos
        : programa.pontos.filter((p) => p.quando.includes(filtro)),
    [programa.pontos, filtro],
  )

  const contagem = useMemo(() => {
    const c: Record<string, number> = { hoje: 0, emenda: 0, depois: 0 }
    programa.pontos.forEach((p) => p.quando.forEach((q) => (c[q] = (c[q] ?? 0) + 1)))
    return c
  }, [programa.pontos])

  if (!programa?.pontos?.length) return null

  const ficha = [programa.paginas ? `${programa.paginas} páginas` : null, peso(programa.kb)]
    .filter(Boolean)
    .join(' · ')

  return (
    <Secao
      id="programa"
      selo={`Caderno de programa · ${programa.data}`}
      titulo="E o que vocês fariam na segunda-feira?"
      intro={
        <>
          <p>
            A resposta não está no volume, e a razão é simples: programa de governo se escreve com
            número, e número tem validade. O caderno anda separado, com data na capa, e se atualiza
            sem republicar o livro — a doutrina e a Carta não envelhecem com o orçamento do ano.
          </p>
          <p className="mt-4">
            São três documentos. Cada medida vem marcada pelo que é:{' '}
            <strong className="text-rubro-400">cabe hoje</strong> na ordem vigente, exige emenda
            constitucional, ou só existe depois da ruptura.
          </p>
        </>
      }
    >
      <div className="grid gap-3 sm:grid-cols-3">
        {programa.documentos.map((d) => (
          <div key={d.slug} className="rounded-lg border border-tinta-700 bg-tinta-900 px-5 py-4">
            <p className="font-sans text-[0.68rem] uppercase tracking-widest text-rubro-400">
              Documento {d.letra}
            </p>
            <p className="mt-1.5 font-semibold leading-snug tracking-titulo">{d.titulo}</p>
            <p className="mt-1 text-sm italic text-papel-400">{d.subtitulo}</p>
            <p className="mt-2 font-sans text-[0.7rem] tabular-nums text-papel-400">
              {milhar(d.palavras)} palavras
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Botao href={programa.arquivo} variante="cheio">
          <IconePdf />
          Baixar o caderno
          {ficha && <span className="font-normal opacity-70">({ficha})</span>}
        </Botao>
        <p className="font-sans text-xs text-papel-400">
          atualizado em {programa.data} · o volume não muda quando ele muda
        </p>
      </div>

      <h3 className="selo mt-14 border-b border-tinta-700 pb-3 text-rubro-400">
        O programa mínimo, em {programa.pontos.length} pontos
      </h3>

      <div className="mt-5 flex flex-wrap gap-2">
        {[TODOS, 'hoje', 'emenda', 'depois'].map((chave) => (
          <button
            key={chave}
            type="button"
            onClick={() => setFiltro(chave)}
            aria-pressed={filtro === chave}
            className={`rounded-full border px-4 py-2 font-sans text-xs font-semibold transition ${
              filtro === chave
                ? 'border-rubro-600 bg-rubro-600 text-papel-100'
                : 'border-tinta-600 text-papel-300 hover:border-papel-400 hover:text-papel-100'
            }`}
          >
            {chave === TODOS ? 'Todos' : QUANDO[chave].rotulo}
            {chave !== TODOS && (
              <span className="ml-1.5 tabular-nums opacity-60">{contagem[chave] ?? 0}</span>
            )}
          </button>
        ))}
      </div>

      <ol className="mt-8 divide-y divide-tinta-800 border-y border-tinta-800">
        {visiveis.map((p) => (
          <li key={p.n} className="flex gap-4 py-4">
            <span className="w-7 shrink-0 pt-1 font-sans text-xs font-semibold tabular-nums text-papel-400">
              {p.n}
            </span>
            <div className="min-w-0">
              {p.grupo && (
                <p className="font-sans text-[0.66rem] uppercase tracking-widest text-papel-400">
                  {p.grupo}
                </p>
              )}
              <p className="mt-1 leading-relaxed text-papel-200">{p.texto}</p>
              <p className="mt-2 flex flex-wrap gap-2">
                {p.quando.map((q) => (
                  <span
                    key={q}
                    className={`rounded-full border px-2.5 py-0.5 font-sans text-[0.66rem] ${QUANDO[q].classe}`}
                  >
                    {QUANDO[q].rotulo}
                  </span>
                ))}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-6 font-sans text-sm text-papel-400">
        Os pontos saem do <strong className="text-papel-300">Documento C</strong>; o custo de cada
        um, com fonte e data, está nos documentos A e B do caderno.
      </p>
    </Secao>
  )
}
