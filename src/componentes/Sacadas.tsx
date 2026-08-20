import { SACADAS } from '../dados/conteudo'
import { Secao } from './Base'

export function Sacadas() {
  return (
    <Secao
      id="sacadas"
      selo="O que este manifesto tem de próprio"
      titulo="Quatro mecanismos que nenhum manifesto socialista clássico traz."
      larga
    >
      <div className="grid gap-6 md:grid-cols-2">
        {SACADAS.map((s) => (
          <article
            key={s.n}
            className="group relative rounded-lg border border-tinta-700 bg-tinta-900 p-7 transition duration-300 hover:border-rubro-600/60 hover:bg-tinta-800"
          >
            <span className="font-sans text-xs font-semibold tabular-nums text-rubro-400">
              {s.n}
            </span>
            <h3 className="mt-3 text-xl font-semibold leading-snug tracking-titulo">{s.titulo}</h3>
            <p className="mt-4 leading-relaxed text-papel-300">{s.texto}</p>
            <p className="mt-5 font-sans text-[0.7rem] uppercase tracking-widest text-papel-400">
              {s.onde}
            </p>
          </article>
        ))}
      </div>
    </Secao>
  )
}
