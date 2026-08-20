import { Barra } from './componentes/Barra'
import { Capa } from './componentes/Capa'
import { Choque } from './componentes/Choque'
import { Tese } from './componentes/Tese'
import { Sacadas } from './componentes/Sacadas'
import { Carta } from './componentes/Carta'
import { Sumario } from './componentes/Sumario'
import { Objecoes } from './componentes/Objecoes'
import { Bibliografia } from './componentes/Bibliografia'
import { Chamada } from './componentes/Chamada'
import { Rodape } from './componentes/Rodape'

export default function App() {
  return (
    <>
      <Barra />
      <main>
        <Capa />
        <Choque />
        <Tese />
        <Sacadas />
        <Carta />
        <Sumario />
        <Objecoes />
        <Bibliografia />
        <Chamada />
      </main>
      <Rodape />
    </>
  )
}
