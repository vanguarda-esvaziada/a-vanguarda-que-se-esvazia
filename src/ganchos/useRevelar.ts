import { useEffect, useRef, useState } from 'react'

/** Revela o elemento quando ele entra na tela — uma vez só. */
export function useRevelar<T extends HTMLElement = HTMLDivElement>(margem = '-12% 0px') {
  const alvo = useRef<T>(null)
  const [visivel, setVisivel] = useState(false)

  useEffect(() => {
    const el = alvo.current
    if (!el || visivel) return
    if (typeof IntersectionObserver === 'undefined') {
      setVisivel(true)
      return
    }
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisivel(true)
          observador.disconnect()
        }
      },
      { rootMargin: margem },
    )
    observador.observe(el)
    return () => observador.disconnect()
  }, [margem, visivel])

  return { alvo, visivel }
}
