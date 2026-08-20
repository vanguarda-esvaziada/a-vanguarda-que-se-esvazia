import { manifesto } from '../dados/manifesto'

export function Rodape() {
  const { titulo, subtitulo, autor, cidade, ano, licenca, licencaNome, licencaUrl } = manifesto

  return (
    <footer className="border-t border-tinta-700 px-5 py-16 font-sans text-sm text-papel-400 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 sm:grid-cols-4">
          <div className="sm:col-span-1">
            <p className="font-serif text-base font-semibold text-papel-100">{titulo}</p>
            <p className="mt-1">{subtitulo}</p>
          </div>
          <dl className="grid grid-cols-2 gap-6 sm:col-span-3 sm:grid-cols-3">
            {autor && (
              <div>
                <dt className="selo">Autor</dt>
                <dd className="mt-1 text-papel-200">{autor}</dd>
              </div>
            )}
            <div>
              <dt className="selo">Local e ano</dt>
              <dd className="mt-1 text-papel-200">
                {cidade}, {ano}
              </dd>
            </div>
            <div>
              <dt className="selo">Licença</dt>
              <dd className="mt-1">
                <a
                  href={licencaUrl}
                  rel="license noreferrer"
                  target="_blank"
                  className="text-papel-200 underline decoration-tinta-600 underline-offset-4 hover:text-rubro-400"
                >
                  {licenca}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div className="regua my-10" />

        <p className="max-w-3xl leading-relaxed">
          © {ano} {autor || titulo}. Esta obra está licenciada sob a {licencaNome} ({licenca}): você pode
          copiar, redistribuir, adaptar e traduzir este texto, inclusive para fins comerciais, desde
          que credite o autor e distribua as versões derivadas sob a mesma licença.
        </p>
        <p className="mt-4 text-papel-400/80">
          Documento de trabalho. Escrito com fonte, número e data para que possa ser cobrado — a
          fundamentação está em{' '}
          <a
            href="#referencias"
            className="text-papel-200 underline decoration-tinta-600 underline-offset-4 hover:text-rubro-400"
          >
            Referências bibliográficas
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
