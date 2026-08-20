import { useState } from 'react'
import { manifesto, URL_LEITURA } from '../dados/manifesto'
import { Secao } from './Base'

export function Sumario() {
  const [aberta, setAberta] = useState<string | null>(manifesto.partes[0]?.rotulo ?? null)

  return (
    <Secao
      id="sumario"
      selo="O volume"
      titulo="Seis partes, do diagnóstico ao chamado."
      intro={
        <p>
          A proclamação abre em tom de manifesto; o restante é o aprofundamento teórico. No fim, a
          antítese — a refutação integral escrita na voz do adversário — e a síntese, que responde
          frente por frente.
        </p>
      }
      larga
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {manifesto.abertura.map((c) => (
          <a
            key={c.slug}
            href={`${URL_LEITURA}#${c.slug}`}
            className="rounded-lg border border-tinta-700 bg-tinta-900 px-5 py-4 transition hover:border-rubro-600/60"
          >
            <p className="font-sans text-[0.68rem] uppercase tracking-widest text-rubro-400">
              {c.rotulo}
            </p>
            <p className="mt-1.5 font-semibold tracking-titulo">{c.titulo}</p>
            {c.subtitulo && <p className="mt-1 text-sm italic text-papel-400">{c.subtitulo}</p>}
          </a>
        ))}
      </div>

      <ul className="mt-10 divide-y divide-tinta-700 border-y border-tinta-700">
        {manifesto.partes.map((parte) => {
          const escancarada = aberta === parte.rotulo
          return (
            <li key={parte.rotulo}>
              <button
                type="button"
                onClick={() => setAberta(escancarada ? null : parte.rotulo)}
                aria-expanded={escancarada}
                className="flex w-full items-baseline gap-4 py-5 text-left transition hover:text-rubro-400"
              >
                <span className="font-sans text-[0.68rem] font-semibold uppercase tracking-widest text-rubro-400">
                  {parte.rotulo}
                </span>
                <span className="text-lg font-semibold tracking-titulo sm:text-xl">
                  {parte.nome}
                </span>
                <span className="ml-auto font-sans text-xs text-papel-400">
                  {parte.capitulos.length} cap.
                </span>
                <span
                  aria-hidden="true"
                  className={`font-sans text-papel-400 transition ${escancarada ? 'rotate-45' : ''}`}
                >
                  +
                </span>
              </button>

              {escancarada && (
                <ol className="animate-subir pb-6 pl-0 sm:pl-[7.5rem]">
                  {parte.capitulos.map((c) => (
                    <li key={c.slug}>
                      <a
                        href={`${URL_LEITURA}#${c.slug}`}
                        className="flex items-baseline gap-3 rounded-md px-2 py-2 transition hover:bg-tinta-800"
                      >
                        <span className="w-6 shrink-0 font-sans text-xs tabular-nums text-papel-400">
                          {c.n}
                        </span>
                        <span className="text-papel-200">{c.titulo}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              )}
            </li>
          )
        })}
      </ul>
    </Secao>
  )
}
