import { useMemo, useState } from 'react'
import { manifesto, peso } from '../dados/manifesto'
import { Secao } from './Base'

const TODOS = 'Todos'

export function Bibliografia() {
  const grupos = manifesto.bibliografia
  const [grupo, setGrupo] = useState<string>(TODOS)
  const [idioma, setIdioma] = useState<string>(TODOS)
  const [busca, setBusca] = useState('')

  const total = useMemo(() => grupos.reduce((s, g) => s + g.obras.length, 0), [grupos])
  const comExemplar = useMemo(
    () => grupos.reduce((s, g) => s + g.obras.filter((o) => o.existe).length, 0),
    [grupos],
  )

  const visiveis = useMemo(() => {
    const semAcento = (t: string) =>
      t
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
    const termo = semAcento(busca.trim())
    const combina = (t: string) => !termo || semAcento(t).includes(termo)

    return grupos
      .filter((g) => grupo === TODOS || g.grupo === grupo)
      .map((g) => ({
        ...g,
        obras: g.obras.filter(
          (o) =>
            combina(`${o.autor} ${o.obra} ${o.ano} ${o.uso}`) &&
            (idioma === TODOS || o.idioma === idioma),
        ),
      }))
      .filter((g) => g.obras.length > 0)
  }, [grupos, grupo, idioma, busca])

  const porIdioma = useMemo(() => {
    const c: Record<string, number> = {}
    grupos.forEach((g) => g.obras.forEach((o) => o.idioma && (c[o.idioma] = (c[o.idioma] ?? 0) + 1)))
    return c
  }, [grupos])

  const achados = visiveis.reduce((s, g) => s + g.obras.length, 0)

  if (!grupos.length) return null

  return (
    <Secao
      id="referencias"
      selo="Apêndice"
      titulo="Referências bibliográficas"
      intro={
        <p>
          As {total} obras que sustentam o manifesto, agrupadas por frente de argumento. O ano é o
          da publicação original, não o da edição consultada; o uso capítulo a capítulo está
          detalhado em <code className="text-papel-200">manuscrito/fontes.md</code>. Onde há
          exemplar na biblioteca — {comExemplar} das {total} —, ele abre e baixa daqui: a
          fundamentação deste manifesto é conferível sem sair da página.
        </p>
      }
      larga
    >
      <div className="flex flex-wrap items-center gap-2">
        {[TODOS, ...grupos.map((g) => g.grupo)].map((nome) => (
          <button
            key={nome}
            type="button"
            onClick={() => setGrupo(nome)}
            aria-pressed={grupo === nome}
            className={`rounded-full border px-4 py-2 font-sans text-xs font-semibold transition ${
              grupo === nome
                ? 'border-rubro-600 bg-rubro-600 text-papel-100'
                : 'border-tinta-600 text-papel-300 hover:border-papel-400 hover:text-papel-100'
            }`}
          >
            {nome}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="font-sans text-[0.68rem] uppercase tracking-widest text-papel-400">
          Idioma do exemplar
        </span>
        {[
          { chave: TODOS, rotulo: 'Todos' },
          { chave: 'pt', rotulo: `português (${porIdioma.pt ?? 0})` },
          { chave: 'en', rotulo: `inglês (${porIdioma.en ?? 0})` },
        ].map((o) => (
          <button
            key={o.chave}
            type="button"
            onClick={() => setIdioma(o.chave)}
            aria-pressed={idioma === o.chave}
            className={`rounded-full border px-3 py-1.5 font-sans text-[0.7rem] font-semibold transition ${
              idioma === o.chave
                ? 'border-rubro-600 bg-rubro-600 text-papel-100'
                : 'border-tinta-600 text-papel-300 hover:border-papel-400 hover:text-papel-100'
            }`}
          >
            {o.rotulo}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <label htmlFor="busca-biblio" className="sr-only">
          Buscar por autor, obra ou uso
        </label>
        <input
          id="busca-biblio"
          type="search"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar autor, obra ou capítulo…"
          className="w-full rounded-lg border border-tinta-600 bg-tinta-900 px-4 py-3 font-sans text-sm text-papel-100 placeholder:text-papel-400 focus:border-rubro-500 focus:outline-none"
        />
        <p className="mt-2 font-sans text-xs text-papel-400" aria-live="polite">
          {achados} de {total} obras
        </p>
      </div>

      <div className="mt-10 space-y-12">
        {visiveis.map((g) => (
          <section key={g.grupo}>
            <h3 className="selo border-b border-tinta-700 pb-3 text-rubro-400">{g.grupo}</h3>
            <ul className="divide-y divide-tinta-700">
              {g.obras.map((o) => (
                <li key={`${o.autor}-${o.obra}`} className="py-4">
                  <p className="leading-snug">
                    <span className="font-semibold">{o.autor}</span>.{' '}
                    <span className="italic text-papel-200">{o.obra}</span>
                    {o.ano && <span className="tabular-nums text-papel-400"> ({o.ano})</span>}
                  </p>
                  <p className="mt-1.5 font-sans text-sm text-papel-300">{o.uso}</p>
                  {o.existe ? (
                    <p className="mt-2 flex flex-wrap items-center gap-2">
                      <a
                        href={`biblioteca/${o.arquivo}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-rubro-600 bg-rubro-700/20 px-3 py-1 font-sans text-[0.7rem] font-semibold text-rubro-400 transition hover:bg-rubro-700/40"
                      >
                        Ler
                      </a>
                      <a
                        href={`biblioteca/${o.arquivo}`}
                        download
                        className="rounded-full border border-tinta-600 px-3 py-1 font-sans text-[0.7rem] text-papel-300 transition hover:border-papel-400 hover:text-papel-100"
                      >
                        Baixar
                      </a>
                      <span className="font-sans text-[0.68rem] uppercase tracking-widest text-papel-400">
                        {o.tipo}
                        {o.kb ? ` · ${peso(o.kb)}` : ''}
                      </span>
                      {o.idioma && o.idioma !== 'pt' && (
                        <span className="rounded-full border border-tinta-600 px-2.5 py-0.5 font-sans text-[0.66rem] text-papel-300">
                          em {o.idiomaNome}
                        </span>
                      )}
                    </p>
                  ) : (
                    <p className="mt-1 font-sans text-[0.7rem] italic text-papel-400">
                      citada sem exemplar na biblioteca
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
        {!achados && (
          <p className="py-10 text-center text-papel-400">Nada encontrado para “{busca}”.</p>
        )}
      </div>
    </Secao>
  )
}
