import { manifesto, URL_LEITURA } from '../dados/manifesto'
import { Secao } from './Base'

export function Objecoes() {
  const { objecoes, numeros } = manifesto

  return (
    <Secao
      id="objecoes"
      selo="Parte V"
      titulo="As objeções vêm de frente."
      intro={
        <p>
          Nenhuma delas é enfraquecida antes de ser respondida. A antítese que fecha o volume é
          escrita na voz do adversário, com fontes reais das duas tradições — e a síntese responde
          com o dobro da extensão, apoiada em {numeros.obras ?? 'dezenas de'} obras da biblioteca.
        </p>
      }
    >
      <ul className="space-y-3">
        {objecoes.map((c) => (
          <li key={c.slug}>
            <details className="group rounded-lg border border-tinta-700 bg-tinta-900 px-6 py-5 transition open:border-rubro-600/60">
              <summary className="flex cursor-pointer list-none items-baseline gap-4 text-lg font-semibold tracking-titulo marker:content-none">
                <span className="font-sans text-xs tabular-nums text-rubro-400">{c.n}</span>
                {c.titulo}
                <span
                  aria-hidden="true"
                  className="ml-auto font-sans text-papel-400 transition group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              {c.subtitulo && (
                <p className="mt-4 leading-relaxed text-papel-300">{c.subtitulo}</p>
              )}
              <a
                href={`${URL_LEITURA}#${c.slug}`}
                className="mt-4 inline-block font-sans text-sm text-rubro-400 hover:underline"
              >
                Ler o capítulo →
              </a>
            </details>
          </li>
        ))}
      </ul>
    </Secao>
  )
}
