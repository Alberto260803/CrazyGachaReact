import './App.css'
import Rutas from './componentes/rutas/Rutas.jsx'
import ProveedorSesion from './contextos/ProveedorSesion.jsx'

function App() {

  return (
    <>
      <ProveedorSesion>
        <Rutas/>
      </ProveedorSesion>
    </>
  )
}

export default App
