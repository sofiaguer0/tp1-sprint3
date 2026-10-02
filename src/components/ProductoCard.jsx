import { formatearPrecio } from '../utils/formato'

const ProductoCard = ({ item, enLista, onToggle }) => {
  return (
    <div className="bg-(--color-surface) rounded-2xl shadow-md overflow-hidden flex flex-col border border-(--color-border)">
      <div className="relative">
        <img
          src={item.imagen}
          alt={item.nombre}
          className="w-full h-44 object-cover"
        />
        {item.destacado && (
          <span className="absolute top-2 right-2 text-xs bg-(--color-secondary) text-(--color-secondary-dark) font-semibold px-2 py-0.5 rounded-full shadow">
            ⭐ Destacado
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col gap-1 flex-1">
        <h2 className="text-base font-bold text-(--color-text) leading-snug">{item.nombre}</h2>
        <p className="text-xs text-(--color-muted)">{item.genero} · {item.año}</p>
        <p className="text-sm font-semibold text-(--color-primary)">Puntaje: {item.puntaje}</p>

        <p className="text-lg font-bold text-(--color-text)">{formatearPrecio(item.precio)}</p>
        <p className="text-xs text-(--color-muted)">
          {item.stock > 0 ? `Stock: ${item.stock}` : 'Sin stock'}
        </p>

        <button
          onClick={() => onToggle(item)}
          className={`mt-auto px-4 py-2 text-sm font-semibold rounded-xl active:scale-95 transition-all ${
            enLista
              ? 'bg-(--color-success) text-(--color-success-text) hover:opacity-80'
              : 'bg-(--color-primary) text-white hover:bg-(--color-primary-hover)'
          }`}
        >
          {enLista ? '✓ En el carrito' : '+ Agregar al carrito'}
        </button>
      </div>
    </div>
  )
}

export default ProductoCard