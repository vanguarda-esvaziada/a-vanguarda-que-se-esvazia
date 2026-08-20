import { manifesto, URL_LEITURA } from '../dados/manifesto'
import { useRolagem } from '../ganchos/useRolagem'
import { BotaoPdf } from './Base'

export function Barra() {
  const { progresso, passouDobra } = useRolagem()

  return (
    <>
      <div
        className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-rubro-500"
        style={{ transform: `scaleX(${progresso})` }}
        aria-hidden="true"
      />
      <header
        className={`fixed inset-x-0 top-0 z-40 border-b transition duration-300 ${
          passouDobra
            ? 'translate-y-0 border-tinta-700 bg-tinta-950/85 backdrop-blur'
            : '-translate-y-full border-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3 sm:px-8">
          <a href="#topo" className="min-w-0 font-sans text-sm font-semibold">
            <span className="block truncate">{manifesto.titulo}</span>
          </a>
          <nav className="ml-auto flex items-center gap-4">
            <a
              href="#carta"
              className="hidden font-sans text-sm text-papel-300 transition hover:text-papel-100 md:block"
            >
              A Carta
            </a>
            <a
              href="#referencias"
              className="hidden font-sans text-sm text-papel-300 transition hover:text-papel-100 md:block"
            >
              Referências
            </a>
            <a
              href={URL_LEITURA}
              className="hidden font-sans text-sm text-papel-300 transition hover:text-papel-100 sm:block"
            >
              Ler a íntegra
            </a>
            <BotaoPdf classe="!px-4 !py-2.5 !text-xs" />
          </nav>
        </div>
      </header>
    </>
  )
}
