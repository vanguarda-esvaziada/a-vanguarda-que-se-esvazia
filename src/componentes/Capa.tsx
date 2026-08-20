import { manifesto, milhar } from '../dados/manifesto'
import { URL_LEITURA } from '../dados/manifesto'
import { Botao, BotaoPdf } from './Base'

export function Capa() {
  const { titulo, subtitulo, epigrafe, autor, cidade, ano, numeros } = manifesto

  return (
    <section
      id="topo"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 py-24 text-center sm:px-8"
    >
      {/* clarão vermelho atrás do título */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-1/3 h-[80vh] bg-[radial-gradient(50rem_28rem_at_50%_40%,rgba(143,29,20,.38),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:64px_64px]"
      />

      <div className="relative mx-auto w-full max-w-4xl animate-subir">
        <p className="selo mb-8">
          {cidade} · {ano}
        </p>

        <h1 className="mx-auto max-w-[16ch] text-[clamp(2.8rem,10vw,6rem)] font-semibold leading-[0.95] tracking-titulo">
          {titulo}
        </h1>

        <p className="mt-6 font-sans text-xs font-semibold uppercase tracking-selo text-rubro-400 sm:text-sm">
          {subtitulo}
        </p>

        <p className="mx-auto mt-10 max-w-[26ch] text-xl italic leading-snug text-papel-300 sm:text-2xl">
          “{epigrafe}”
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <BotaoPdf detalhado />
          <Botao href={URL_LEITURA} variante="vazado">
            Ler a íntegra no navegador
          </Botao>
        </div>

        <dl className="mx-auto mt-14 grid max-w-2xl grid-cols-2 gap-y-6 border-t border-tinta-700 pt-8 font-sans sm:grid-cols-4">
          {[
            { valor: numeros.paginas ? `${numeros.paginas}` : '—', rotulo: 'páginas' },
            { valor: `${numeros.capitulos}`, rotulo: 'capítulos' },
            { valor: numeros.petreas ? `${numeros.petreas}` : '—', rotulo: 'cláusulas pétreas' },
            { valor: milhar(numeros.palavras), rotulo: 'palavras' },
          ].map((item) => (
            <div key={item.rotulo}>
              <dt className="text-2xl font-semibold tabular-nums text-papel-100">{item.valor}</dt>
              <dd className="mt-1 text-[0.7rem] uppercase tracking-widest text-papel-400">
                {item.rotulo}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-12 font-sans text-xs text-papel-400">
          {autor && <span className="text-papel-200">{autor} · </span>}{cidade}, {ano}
        </p>
      </div>

      <a
        href="#choque"
        className="selo absolute inset-x-0 bottom-6 animate-pulsar text-center"
        aria-label="Rolar para o início"
      >
        ↓
      </a>
    </section>
  )
}
