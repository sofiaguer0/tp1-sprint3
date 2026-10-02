import { useCarritoContext } from '../context/CarritoContext'
import { formatearPrecio } from '../utils/formato'
import CarritoItem from './CarritoItem'

const CarritoModal = () => {
  const { carrito, total, vaciar } = useCarritoContext()

  if (carrito.length === 0) {
    return (
      <p className="text-sm text-(--color-muted)">
        Tu carrito está vacío, sumá algo de la tienda.
      </p>
    )
  }

  return (
    <>
      <ul className="flex flex-col gap-4">
        {carrito.map((item) => (
          <CarritoItem key={item.id} item={item} />
        ))}
      </ul>

      <div className="mt-6 flex justify-between border-t border-(--color-border) pt-4 font-bold">
        <span>Total</span>
        <span>{formatearPrecio(total)}</span>
      </div>

      <button onClick={vaciar} className="mt-4 text-sm font-semibold text-(--color-danger)">
        Vaciar carrito
      </button>
    </>
  )
}

export default CarritoModal