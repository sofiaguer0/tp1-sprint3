import { useLocalStorage } from './useLocalStorage'

const CLAVE = 'tienda:carrito'

export function useCarrito() {
  const [carrito, setCarrito, limpiar] = useLocalStorage(CLAVE, [])

  // derivados: NO son useState
  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0)
  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)

  const agregar = (producto) => {
    setCarrito((prev) => {
      const yaEsta = prev.find((item) => item.id === producto.id)
      const cantidadActual = yaEsta ? yaEsta.cantidad : 0

      if (cantidadActual >= producto.stock) return prev   // no hay más stock

      if (yaEsta) {
        return prev.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        )
      }

      return [...prev, { ...producto, cantidad: 1 }]
    })
  }

  const cambiarCantidad = (id, delta) => {
    setCarrito((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, cantidad: Math.min(item.cantidad + delta, item.stock) }
            : item
        )
        .filter((item) => item.cantidad > 0)   // el que llegó a 0, se va
    )
  }

  const quitar = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id))
  }

  const vaciar = () => {
    limpiar()
  }

  return { carrito, cantidadTotal, total, agregar, cambiarCantidad, quitar, vaciar }
}