import { useCarritoContext } from '../../context/CarritoContext'
import { useThemeContext } from '../../context/ThemeContext'

const Navbar = ({ onAbrirLista }) => {
  const { cantidadTotal } = useCarritoContext()
  const { tema, alternarTema } = useThemeContext()

  return (
    <header>
      <nav className="bg-(--color-surface) border-b border-(--color-border) px-6 py-4 flex justify-between items-center gap-3">
        <h1 className="text-2xl font-bold text-(--color-text)">Steam de Temu</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={alternarTema}
            className="px-3 py-2 text-sm font-semibold rounded-xl border border-(--color-border) text-(--color-text)"
          >
            {tema === 'claro' ? 'Modo oscuro' : 'Modo claro'}
          </button>
          <button
            onClick={onAbrirLista}
            className="relative flex items-center gap-2 px-4 py-2 bg-(--color-primary) text-white font-semibold rounded-xl hover:bg-(--color-primary-hover) active:scale-95 transition-all"
          >
            Mi carrito
            {cantidadTotal > 0 && (
              <span className="bg-(--color-secondary) text-(--color-secondary-dark) text-xs font-bold px-2 py-0.5 rounded-full">
                {cantidadTotal}
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar