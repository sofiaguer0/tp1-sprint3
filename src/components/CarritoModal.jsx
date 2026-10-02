import Modal from './ui/Modal'
import { formatearPrecio } from '../utils/formato'

const CarritoModal = ({ carrito, onQuitar, onVaciar, onCerrar }) => (
  <Modal titulo={`Mi carrito (${carrito.length})`} onCerrar={onCerrar}>
    {carrito.length === 0 ? (
      <p className="text-sm text-(--color-muted)">Tu carrito está vacío, sumá algo de la tienda.</p>
    ) : (
      <>
        <ul className="flex flex-col gap-3">
          {carrito.map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-2">
              <span className="text-sm">{item.nombre} · {formatearPrecio(item.precio)}</span>
              <button onClick={() => onQuitar(item)} aria-label={`Quitar ${item.nombre}`}>✕</button>
            </li>
          ))}
        </ul>
        <button onClick={onVaciar} className="mt-4 text-sm">Vaciar carrito</button>
      </>
    )}
  </Modal>
)

export default CarritoModal