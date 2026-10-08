import { useState } from 'react'
import { VISTAS } from './data/vistas'
import { useToggle } from './hooks/useToggle'
import Navbar from './components/layout/Navbar'
import Modal from './components/ui/Modal'
import CarritoModal from './components/CarritoModal'
import Tienda from './views/Tienda'
import Checkout from './views/Checkout'
import Confirmacion from './views/Confirmacion'

const App = () => {
  const [vista, setVista] = useState(VISTAS.TIENDA)
  const [pedido, setPedido] = useState(null)
  const [carritoAbierto, toggleCarrito] = useToggle(false)

  const irACheckout = () => {
    toggleCarrito()
    setVista(VISTAS.CHECKOUT)
  }

  const confirmarPedido = (nuevoPedido) => {
    setPedido(nuevoPedido)
    setVista(VISTAS.CONFIRMACION)
  }

  const volverATienda = () => {
    setPedido(null)
    setVista(VISTAS.TIENDA)
  }

  return (
    <div className="min-h-screen bg-(--color-bg) text-(--color-text)">
      <Navbar onAbrirLista={toggleCarrito} />

      {vista === VISTAS.TIENDA && <Tienda />}
      {vista === VISTAS.CHECKOUT && (
        <Checkout onVolver={volverATienda} onConfirmar={confirmarPedido} />
      )}
      {vista === VISTAS.CONFIRMACION && (
        <Confirmacion pedido={pedido} onVolver={volverATienda} />
      )}

      {carritoAbierto && (
        <Modal titulo="Mi carrito" onCerrar={toggleCarrito}>
          <CarritoModal onIrCheckout={irACheckout} />
        </Modal>
      )}
    </div>
  )
}

export default App