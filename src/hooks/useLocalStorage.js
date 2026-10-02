import { useState, useEffect } from 'react'

export function useLocalStorage(key, valorInicial) {
  // Guardo el valor inicial una sola vez, así su referencia no cambia entre renders
  const [inicial] = useState(valorInicial)

  // Lectura lazy: corre una sola vez, antes del primer render
  const [valor, setValor] = useState(() => {
    try {
      const guardado = localStorage.getItem(key) //al iniciar, valor guardado en localStorage
      return guardado !== null ? JSON.parse(guardado) : inicial
    } catch {
      return inicial // datos corruptos: arranco con el valor inicial
    }
  })

  // Sincroniza con localStorage cada vez que cambia el valor, 
  useEffect(() => {
    try {
      if (valor === inicial) {
        localStorage.removeItem(key) // si es exactamente el inicial se borra la clave, no el storage
      } else {
        localStorage.setItem(key, JSON.stringify(valor)) // si no es exactamente el inicial se guarda el storage
      }
    } catch {
      // storage lleno o bloqueado: no rompemos la app
    }
  }, [key, valor, inicial])

  const limpiar = () => setValor(inicial)

  return [valor, setValor, limpiar]
}