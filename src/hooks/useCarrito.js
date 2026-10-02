import { useLocalStorage } from './useLocalStorage'

const CLAVE = 'tienda:carrito'

export function useCarrito() {
  const [list, setList, removerList] = useLocalStorage(CLAVE, [])

  const isInList = (item) => list.some((i) => i.id === item.id)

  const toggle = (item) => {
    setList((prev) =>
      prev.some((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, item]
    )
  }

  const remove = (item) => {
    setList((prev) => prev.filter((i) => i.id !== item.id))
  }

  const clear = () => {
    removerList()
  }

  return { list, total: list.length, isInList, toggle, remove, clear }
}