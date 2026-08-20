import { DECLARACOES, TESE } from '../dados/conteudo'
import { Secao } from './Base'

export function Tese() {
  return (
    <>
      <Secao
        id="tese"
        selo="A tese"
        titulo="Cabe em três linhas."
        intro={
          <p>
            Chamamos isto de <strong className="text-papel-100">federalismo autogestionário</strong>.
            O argumento pela descentralização não é moral, é administrativo: este país é continental,
            e ninguém governa isso de Brasília.
          </p>
        }
        larga
      >
        <ol className="grid gap-px overflow-hidden rounded-lg bg-tinta-700 sm:grid-cols-3">
          {TESE.map((linha, i) => (
            <li key={linha.chave} className="bg-tinta-900 px-7 py-9">
              <span className="font-sans text-xs font-semibold tabular-nums text-rubro-400">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 text-lg font-semibold tracking-titulo">{linha.chave}</h3>
              <p className="mt-3 text-[0.97rem] leading-relaxed text-papel-300">{linha.texto}</p>
            </li>
          ))}
        </ol>
      </Secao>

      <Secao selo="O que declaramos" titulo="A parte que não se negocia.">
        <ul className="divide-y divide-tinta-700 border-y border-tinta-700">
          {DECLARACOES.map((d) => (
            <li key={d} className="flex gap-4 py-5">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rubro-500" />
              <p className="text-[1.02rem] leading-relaxed text-papel-200">{d}</p>
            </li>
          ))}
        </ul>
      </Secao>
    </>
  )
}
