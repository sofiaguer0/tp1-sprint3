const Navbar = ({ cantidadEnLista, onAbrirLista }) => {
  return (
    <header>
      <nav className="bg-(--color-surface) border-b border-(--color-border) px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-(--color-text)">La tienda de jueguitos</h1>
        <button
          onClick={onAbrirLista}
          className="relative flex items-center gap-2 px-4 py-2 bg-(--color-primary) text-white font-semibold rounded-xl hover:bg-(--color-primary-hover) active:scale-95 transition-all"
        >
          Mi carrito
          {cantidadEnLista > 0 && (
            <span className="bg-(--color-secondary) text-(--color-secondary-dark) text-xs font-bold px-2 py-0.5 rounded-full">
              {cantidadEnLista}
            </span>
          )}
        </button>
      </nav>
    </header>
  )
}

export default Navbar