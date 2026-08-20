import type { ReactNode } from 'react'
import { useRevelar } from '../ganchos/useRevelar'
import { manifesto, peso } from '../dados/manifesto'

/* ------------------------------------------------------------------ ícones */

export function IconePdf({ classe = 'h-4 w-4' }: { classe?: string }) {
  return (
    <svg
      className={classe}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="M7 10l5 5 5-5" />
      <path d="M12 15V3" />
    </svg>
  )
}

/* ------------------------------------------------------------------ botões */

interface BotaoProps {
  href: string
  children: ReactNode
  variante?: 'cheio' | 'vazado'
  baixar?: boolean
  classe?: string
}

export function Botao({
  href,
  children,
  variante = 'cheio',
  baixar = false,
  classe = '',
}: BotaoProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-sans ' +
    'text-sm font-semibold transition duration-200 active:translate-y-px ' +
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ' +
    'focus-visible:outline-rubro-400'
  const estilo =
    variante === 'cheio'
      ? 'bg-rubro-600 text-papel-100 hover:bg-rubro-500 shadow-lg shadow-rubro-700/30'
      : 'border border-tinta-600 text-papel-200 hover:border-papel-400 hover:bg-tinta-800'

  return (
    <a
      href={href}
      {...(baixar ? { download: manifesto.pdf.baixarComo } : {})}
      className={`${base} ${estilo} ${classe}`}
    >
      {children}
    </a>
  )
}

export function BotaoPdf({
  detalhado = false,
  classe = '',
}: {
  detalhado?: boolean
  classe?: string
}) {
  const { paginas, kb, arquivo } = manifesto.pdf
  const ficha = [paginas ? `${paginas} páginas` : null, peso(kb)].filter(Boolean).join(' · ')

  return (
    <Botao href={arquivo} baixar classe={classe}>
      <IconePdf />
      Baixar o PDF
      {detalhado && ficha && <span className="font-normal opacity-70">({ficha})</span>}
    </Botao>
  )
}

/* ------------------------------------------------------------------ seções */

interface SecaoProps {
  id?: string
  selo?: string
  titulo?: ReactNode
  intro?: ReactNode
  children: ReactNode
  classe?: string
  larga?: boolean
}

export function Secao({
  id,
  selo,
  titulo,
  intro,
  children,
  classe = '',
  larga = false,
}: SecaoProps) {
  const { alvo, visivel } = useRevelar<HTMLElement>()

  return (
    <section
      id={id}
      ref={alvo}
      className={`px-5 py-20 sm:px-8 sm:py-28 ${visivel ? 'animate-subir' : 'opacity-0'} ${classe}`}
    >
      <div className={`mx-auto ${larga ? 'max-w-6xl' : 'max-w-3xl'}`}>
        {selo && <p className="selo mb-4">{selo}</p>}
        {titulo && (
          <h2 className="mb-5 text-3xl font-semibold leading-tight tracking-titulo sm:text-4xl">
            {titulo}
          </h2>
        )}
        {intro && <div className="mb-10 max-w-leitura text-papel-300">{intro}</div>}
        {children}
      </div>
    </section>
  )
}
