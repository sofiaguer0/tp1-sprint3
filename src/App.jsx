import { useState } from 'react'
import { VISTAS } from './data/vistas'
import Navbar from './components/layout/Navbar'
import CarritoModal from './components/CarritoModal'
import Tienda from './views/Tienda'
import { useCarrito } from './hooks/useCarrito'
import { useToggle } from './hooks/useToggle'

const App = () => {
  const [vista] = useState(VISTAS.TIENDA)
  const { list: carrito, total, isInList, toggle, clear } = useCarrito()
  const [carritoAbierto, toggleCarrito] = useToggle(false)

  return (
    <div className="min-h-screen bg-(--color-bg)">
      <Navbar cantidadEnLista={total} onAbrirLista={toggleCarrito} />

      {vista === VISTAS.TIENDA && <Tienda isInList={isInList} onToggle={toggle} />}

      {carritoAbierto && (
        <CarritoModal carrito={carrito} onQuitar={toggle} onVaciar={clear} onCerrar={toggleCarrito} />
      )}
    </div>
  )
}

export default App