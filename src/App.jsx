import { useState } from 'react'
import { VISTAS } from './data/vistas'
import { useToggle } from './hooks/useToggle'
import Navbar from './components/layout/Navbar'
import Modal from './components/ui/Modal'
import CarritoModal from './components/CarritoModal'
import Tienda from './views/Tienda'

const App = () => {
  const [vista] = useState(VISTAS.TIENDA)
  const [carritoAbierto, toggleCarrito] = useToggle(false)

  return (
    <div className="min-h-screen bg-(--color-bg) text-(--color-text)">
      <Navbar onAbrirLista={toggleCarrito} />

      {vista === VISTAS.TIENDA && <Tienda />}

      {carritoAbierto && (
        <Modal titulo="Mi carrito" onCerrar={toggleCarrito}>
          <CarritoModal />
        </Modal>
      )}
    </div>
  )
}

export default App