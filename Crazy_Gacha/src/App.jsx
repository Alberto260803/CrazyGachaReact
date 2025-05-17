import './App.css'
import Rutas from './componentes/rutas/Rutas.jsx'
import ProveedorAudio from './contextos/ProveedorAudio.jsx'
import ProveedorManejadores from './contextos/ProveedorManejadores.jsx'
import ProveedorPremios from './contextos/ProveedorPremios.jsx'
import ProveedorProductos from './contextos/ProveedorProductos.jsx'
import ProveedorSesion from './contextos/ProveedorSesion.jsx'

function App() {

  return (
    <>
      <ProveedorSesion>
        <ProveedorPremios>
          <ProveedorProductos>
            <ProveedorAudio>
              <ProveedorManejadores>
                <Rutas/>
              </ProveedorManejadores>
            </ProveedorAudio>
          </ProveedorProductos>
        </ProveedorPremios>
      </ProveedorSesion>
    </>
  )
}

export default App
