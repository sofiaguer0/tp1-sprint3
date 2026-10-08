import { useCarritoContext } from '../context/CarritoContext'
import { formatearPrecio } from '../utils/formato'
import CarritoItem from './CarritoItem'

const CarritoModal = ({ onIrCheckout }) => {
  const { carrito, total, vaciar } = useCarritoContext()
  const vacio = carrito.length === 0

  return (
    <>
      {vacio ? (
        <p className="text-sm text-(--color-muted)">
          Tu carrito está vacío, sumá algo de la tienda.
        </p>
      ) : (
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
        </>
      )}

      <button
        onClick={onIrCheckout}
        disabled={vacio}
        className="mt-4 w-full rounded-xl bg-(--color-primary) px-4 py-2 font-semibold text-white hover:bg-(--color-primary-hover) disabled:cursor-not-allowed disabled:opacity-50"
      >
        Ir al checkout
      </button>

      {!vacio && (
        <button onClick={vaciar} className="mt-3 text-sm font-semibold text-(--color-danger)">
          Vaciar carrito
        </button>
      )}
    </>
  )
}

export default CarritoModal