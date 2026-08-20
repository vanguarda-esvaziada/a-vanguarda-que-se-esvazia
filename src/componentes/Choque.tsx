import { CHOQUE, NEGACOES } from '../dados/conteudo'
import { Secao } from './Base'

export function Choque() {
  return (
    <>
      <Secao id="choque" selo={`Em ${CHOQUE.ano}, neste país`} larga>
        <div className="grid gap-px overflow-hidden rounded-lg bg-tinta-700 sm:grid-cols-3">
          {CHOQUE.itens.map((item) => (
            <div key={item.rotulo} className="bg-tinta-950 px-6 py-10">
              <p className="text-4xl font-semibold tracking-titulo text-rubro-400 sm:text-5xl">
                {item.valor}
              </p>
              <p className="mt-3 font-sans text-sm text-papel-300">{item.rotulo}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-leitura text-center">
          <p className="text-lg text-papel-300">{CHOQUE.remate}</p>
          <p className="mt-8 text-3xl font-semibold leading-tight tracking-titulo sm:text-4xl">
            {CHOQUE.golpe}
          </p>
        </div>
      </Secao>

      <Secao selo="O que não somos" larga>
        <div className="grid gap-8 sm:grid-cols-3">
          {NEGACOES.map((n) => (
            <article key={n.titulo} className="border-t border-tinta-600 pt-6">
              <h3 className="text-xl font-semibold leading-snug tracking-titulo">{n.titulo}</h3>
              <p className="mt-3 text-[0.97rem] leading-relaxed text-papel-300">{n.texto}</p>
            </article>
          ))}
        </div>
      </Secao>
    </>
  )
}
