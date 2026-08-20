import { useMemo, useState } from 'react'
import { manifesto, URL_LEITURA, type Artigo, type Petrea } from '../dados/manifesto'
import { Secao } from './Base'

const semAcento = (t: string) =>
  t
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

const ordinal = (n: number) => (n <= 9 ? `${n}º` : String(n))

/** Um artigo da Carta: caput, incisos, cláusulas que realiza e comentário. */
function Dispositivo({ artigo, clausulas }: { artigo: Artigo; clausulas: Petrea[] }) {
  const [aberto, setAberto] = useState(false)

  return (
    <article id={`art-${artigo.n}`} className="scroll-mt-24 border-t border-tinta-800 py-6">
      <h4 className="text-lg font-semibold leading-snug tracking-titulo">
        <span className="font-sans text-sm text-rubro-400">Art. {ordinal(artigo.n)}</span>{' '}
        <span className="text-papel-400">—</span> {artigo.titulo}
      </h4>

      <p className="mt-3 leading-relaxed text-papel-200">{artigo.caput}</p>

      {artigo.incisos.length > 0 && (
        <ul className="mt-3 space-y-1.5 border-l border-tinta-700 pl-4 text-[0.95rem] leading-relaxed text-papel-300">
          {artigo.incisos.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      )}

      {artigo.marcacaoAutor && (
        <p className="mt-3 rounded border border-rubro-600/50 bg-rubro-700/10 px-3 py-2 font-sans text-xs text-rubro-400">
          Dispositivo em aberto — {artigo.marcacaoAutor}.
        </p>
      )}

      {(clausulas.length > 0 || artigo.todasAsPetreas) && (
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-sans text-xs text-papel-400">
          {artigo.todasAsPetreas && <li>realiza as 121 cláusulas, quanto à irrevogabilidade</li>}
          {clausulas.map((c) => (
            <li key={c.n}>
              <span className="tabular-nums text-rubro-400">{c.n}</span> {c.titulo.toLowerCase()}
            </li>
          ))}
        </ul>
      )}

      {(artigo.comentario.length > 0 || artigo.fontes) && (
        <>
          <button
            type="button"
            onClick={() => setAberto(!aberto)}
            aria-expanded={aberto}
            className="mt-3 font-sans text-xs text-rubro-400 hover:underline"
          >
            {aberto ? 'fechar o comentário' : 'comentário doutrinário'}
          </button>
          {aberto && (
            <div className="mt-3 animate-subir space-y-3 border-l-2 border-rubro-600/40 pl-4 text-sm leading-relaxed text-papel-300">
              {artigo.comentario.map((c) => (
                <p key={c.slice(0, 40)}>{c}</p>
              ))}
              {artigo.fontes && (
                <p className="font-sans text-[0.7rem] text-papel-400">
                  Detalhamento organizado de: {artigo.fontes}.
                </p>
              )}
            </div>
          )}
        </>
      )}
    </article>
  )
}

export function Carta() {
  const { carta: materias, articulado } = manifesto
  const [busca, setBusca] = useState('')

  /** Cláusula por número, para exibir dentro do artigo que a realiza. */
  const porClausula = useMemo(() => {
    const m = new Map<number, Petrea>()
    materias.forEach((mat) => mat.itens.forEach((i) => m.set(i.n, i)))
    return m
  }, [materias])

  const totalClausulas = porClausula.size

  /** O articulado agrupado como a Carta se lê: Título, depois Capítulo. */
  const titulos = useMemo(() => {
    const termo = semAcento(busca.trim())
    const combina = (a: Artigo) =>
      !termo ||
      semAcento(
        `art ${a.n} ${a.titulo} ${a.caput} ${a.incisos.join(' ')} ${a.petreas
          .map((n) => `${n} ${porClausula.get(n)?.titulo ?? ''}`)
          .join(' ')}`,
      ).includes(termo)

    const saida: { titulo: string; capitulos: { capitulo: string; artigos: Artigo[] }[] }[] = []
    articulado.filter(combina).forEach((a) => {
      let t = saida[saida.length - 1]
      if (!t || t.titulo !== a.secao) {
        t = { titulo: a.secao, capitulos: [] }
        saida.push(t)
      }
      let c = t.capitulos[t.capitulos.length - 1]
      if (!c || c.capitulo !== a.capitulo) {
        c = { capitulo: a.capitulo, artigos: [] }
        t.capitulos.push(c)
      }
      c.artigos.push(a)
    })
    return saida
  }, [articulado, busca, porClausula])

  const achados = titulos.reduce(
    (s, t) => s + t.capitulos.reduce((c, cap) => c + cap.artigos.length, 0),
    0,
  )

  if (!articulado.length) return null

  return (
    <Secao
      id="carta"
      selo="A Carta Magna"
      titulo="Uma constituição, e não uma lista de promessas."
      intro={
        <>
          <p>
            Conquista que depende de maioria eventual se perde em maioria eventual: dez anos para
            tirar o país do Mapa da Fome, dois para voltar. A cláusula pétrea é a resposta
            institucional a essa assimetria — e aqui ela alcança o que nenhuma constituição liberal
            alcança: propriedade coletiva dos meios de produção, fim do assalariamento, autogestão
            como norma, crédito coletivo.
          </p>
          <p className="mt-4">
            Quatro quintos das cláusulas são <strong>incapacidades do Estado</strong>, não
            distribuições a uma maioria. Abaixo, o articulado na ordem em que a Carta se lê: cada
            artigo com seus incisos, as cláusulas pétreas que ele realiza e o comentário
            doutrinário, que declara de onde no manifesto vem cada regra.
          </p>
        </>
      }
      larga
    >
      <dl className="grid gap-px overflow-hidden rounded-lg border border-tinta-700 bg-tinta-700 sm:grid-cols-4">
        {[
          { valor: String(articulado.length), rotulo: 'artigos' },
          { valor: String(titulos.length || 13), rotulo: 'títulos' },
          { valor: String(totalClausulas), rotulo: 'cláusulas pétreas' },
          { valor: String(materias.length), rotulo: 'matérias blindadas' },
        ].map((f) => (
          <div key={f.rotulo} className="bg-tinta-900 px-6 py-5">
            <dt className="font-sans text-3xl font-semibold tabular-nums tracking-titulo text-rubro-400">
              {f.valor}
            </dt>
            <dd className="mt-1 font-sans text-xs uppercase tracking-widest text-papel-400">
              {f.rotulo}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-8">
        <label htmlFor="busca-carta" className="sr-only">
          Buscar artigo por número, matéria ou palavra
        </label>
        <input
          id="busca-carta"
          type="search"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar na Carta — “greve”, “tortura”, “laudo”, “art 73”…"
          className="w-full rounded-lg border border-tinta-600 bg-tinta-900 px-4 py-3 font-sans text-sm text-papel-100 placeholder:text-papel-400 focus:border-rubro-500 focus:outline-none"
        />
        <p className="mt-2 font-sans text-xs text-papel-400" aria-live="polite">
          {achados} de {articulado.length} artigos
        </p>
      </div>

      <div className="mt-12 space-y-14">
        {titulos.map((t) => (
          <section key={t.titulo}>
            <h3 className="text-xl font-semibold tracking-titulo text-papel-100 sm:text-2xl">
              {t.titulo}
            </h3>
            {t.capitulos.map((c) => (
              <div key={c.capitulo || 'sem-capitulo'} className="mt-8">
                {c.capitulo && <p className="selo text-rubro-400">{c.capitulo}</p>}
                <div className="mt-2">
                  {c.artigos.map((a) => (
                    <Dispositivo
                      key={a.n}
                      artigo={a}
                      clausulas={a.petreas
                        .map((n) => porClausula.get(n))
                        .filter((x): x is Petrea => Boolean(x))}
                    />
                  ))}
                </div>
              </div>
            ))}
          </section>
        ))}
        {!achados && (
          <p className="py-10 text-center text-papel-400">Nada encontrado para “{busca}”.</p>
        )}
      </div>

      <p className="mt-10 font-sans text-sm text-papel-400">
        A Carta fecha o volume como Apêndice I —{' '}
        <a href={`${URL_LEITURA}#carta`} className="text-rubro-400 hover:underline">
          ver na edição de leitura →
        </a>{' '}
        A razão das pétreas e o rito de emenda estão no{' '}
        <a href={`${URL_LEITURA}#cap-17`} className="text-rubro-400 hover:underline">
          capítulo 17
        </a>
        .
      </p>
    </Secao>
  )
}
