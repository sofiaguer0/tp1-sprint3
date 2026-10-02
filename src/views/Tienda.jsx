import { useState } from 'react'
import { productos } from '../data/productos'
import ProductoList from '../components/ProductoList'

const Tienda = () => {
  const [busqueda, setBusqueda] = useState('')

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <label htmlFor="busqueda" className="sr-only">Buscar productos</label>
      <input
        id="busqueda"
        type="search"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscá un juego..."
        className="mb-6 w-full rounded-xl border border-(--color-border) px-4 py-2"
      />

      {productosFiltrados.length === 0 ? (
        <p>No encontramos nada para "{busqueda}"</p>
      ) : (
        <ProductoList items={productosFiltrados} />
      )}
    </main>
  )
}

export default Tienda