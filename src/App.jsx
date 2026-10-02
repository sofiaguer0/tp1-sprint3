import { useState } from 'react'
import { VISTAS } from './data/vistas'
import Navbar from './components/layout/Navbar'
import Tienda from './views/Tienda'

const App = () => {
  const [vista, setVista] = useState(VISTAS.TIENDA)

  return (
    <div className="min-h-screen bg-(--color-bg)">
      <Navbar />
      {vista === VISTAS.TIENDA && <Tienda />}
    </div>
  )
}

export default App