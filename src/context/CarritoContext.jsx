import { createContext, useContext } from 'react'
import { useCarrito } from '../hooks/useCarrito'

const CarritoContext = createContext(null)   // sin export

export function CarritoProvider({ children }) {
  const valor = useCarrito()   // tu hook, sin reescribirlo

  return (
    <CarritoContext.Provider value={valor}>
      {children}
    </CarritoContext.Provider>
  )
}

export function useCarritoContext() {
  const contexto = useContext(CarritoContext)

  if (!contexto) {
    throw new Error('useCarritoContext() tiene que usarse adentro de <CarritoProvider>')
  }

  return contexto
}