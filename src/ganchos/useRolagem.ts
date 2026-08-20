import { useEffect, useState } from 'react'

export interface Rolagem {
  /** 0 a 1 — quanto da página já foi percorrido. */
  progresso: number
  /** Passou da dobra: liga a barra fixa. */
  passouDobra: boolean
}

export function useRolagem(): Rolagem {
  const [estado, setEstado] = useState<Rolagem>({ progresso: 0, passouDobra: false })

  useEffect(() => {
    let agendado = false

    const medir = () => {
      agendado = false
      const alcance = document.body.scrollHeight - window.innerHeight
      setEstado({
        progresso: alcance > 0 ? Math.min(window.scrollY / alcance, 1) : 0,
        passouDobra: window.scrollY > window.innerHeight * 0.7,
      })
    }

    const aoRolar = () => {
      if (!agendado) {
        agendado = true
        requestAnimationFrame(medir)
      }
    }

    medir()
    window.addEventListener('scroll', aoRolar, { passive: true })
    window.addEventListener('resize', aoRolar, { passive: true })
    return () => {
      window.removeEventListener('scroll', aoRolar)
      window.removeEventListener('resize', aoRolar)
    }
  }, [])

  return estado
}
