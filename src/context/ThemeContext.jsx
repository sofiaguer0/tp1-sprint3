import { createContext, useContext, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [tema, setTema] = useLocalStorage('tienda:tema', 'claro')

  useEffect(() => {
    document.documentElement.dataset.theme = tema
  }, [tema])

  const alternarTema = () => setTema((prev) => (prev === 'claro' ? 'oscuro' : 'claro'))

  return (
    <ThemeContext.Provider value={{ tema, alternarTema }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useThemeContext() {
  const contexto = useContext(ThemeContext)

  if (!contexto) {
    throw new Error('useThemeContext() tiene que usarse adentro de <ThemeProvider>')
  }

  return contexto
}