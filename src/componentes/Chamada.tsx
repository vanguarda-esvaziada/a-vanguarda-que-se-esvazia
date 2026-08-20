import { manifesto, URL_LEITURA } from '../dados/manifesto'
import { Botao, BotaoPdf, Secao } from './Base'

export function Chamada() {
  const { epigrafe, numeros } = manifesto

  return (
    <Secao classe="border-t border-tinta-700 bg-tinta-900">
      <div className="text-center">
        <p className="mx-auto max-w-[24ch] text-3xl font-semibold leading-tight tracking-titulo sm:text-4xl">
          “{epigrafe}”
        </p>
        <p className="mx-auto mt-6 max-w-leitura text-papel-300">
          O manifesto inteiro — proclamação, {numeros.capitulos} capítulos, antítese e síntese — em
          um volume de bolso, pronto para imprimir e distribuir.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <BotaoPdf detalhado />
          <Botao href={URL_LEITURA} variante="vazado">
            Ler no navegador
          </Botao>
        </div>
      </div>
    </Secao>
  )
}
