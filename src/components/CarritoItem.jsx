import { useCarritoContext } from '../context/CarritoContext'
import { formatearPrecio } from '../utils/formato'

const CarritoItem = ({ item }) => {
  const { cambiarCantidad, quitar } = useCarritoContext()

  return (
    <li className="flex flex-col gap-2 border-b border-(--color-border) pb-3">
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm font-medium text-(--color-text)">{item.nombre}</span>
        <button onClick={() => quitar(item.id)} aria-label={`Quitar ${item.nombre}`}>✕</button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => cambiarCantidad(item.id, -1)}
            aria-label={`Restar uno a ${item.nombre}`}
            className="h-8 w-8 rounded-lg border border-(--color-border)"
          >
            -
          </button>
          <span className="w-6 text-center text-sm">{item.cantidad}</span>
          <button
            onClick={() => cambiarCantidad(item.id, 1)}
            disabled={item.cantidad >= item.stock}
            aria-label={`Sumar uno a ${item.nombre}`}
            className="h-8 w-8 rounded-lg border border-(--color-border) disabled:opacity-40 disabled:cursor-not-allowed"
          >
            +
          </button>
        </div>
        <span className="text-sm font-semibold">{formatearPrecio(item.precio * item.cantidad)}</span>
      </div>
    </li>
  )
}

export default CarritoItem