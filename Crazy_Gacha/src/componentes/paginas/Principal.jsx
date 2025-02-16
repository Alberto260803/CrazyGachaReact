import React from 'react'
import imagenUsuario from '../../resources/usuario.png'
import imagenEgg from '../../resources/egg.png'
import './Principal.css'
import useProveedorSesion from '../hooks/useProveedorSesion'

const Principal = () => {
    const {usuario, cerrarSesion} = useProveedorSesion();


    return (
        <>
        <div className="dock-panel">
          {/* Header */}
          <div className="header">
              <div className="user-info">
                  <img src={imagenUsuario} alt="Usuario" className="user-icon" />
                  <span className="user-name">{usuario.name}</span>
                  <img 
                      src="https://cdn-icons-png.flaticon.com/512/59/59399.png"
                      alt="Cerrar sesión" 
                      className="logout-icon" 
                      onClick={()=>{cerrarSesion()}}
                  />
              </div>
              <label className="num-egg">0</label>
          </div>

          {/* Main Content */}
          <div className="main-content">
              {/* Egg Container */}
              <div className="egg-container">
                  <img 
                      src={imagenEgg}
                      alt="Egg" 
                      className="egg" 
                      id="egg" 
                  />
              </div>

              {/* Sidebar */}
              <div className="sidebar">
                  <div className="top-bar"></div>
                  <div className="scrollable">
                      <div className="store-title">TIENDA</div>
                      <div className="tab">
                          <h3>Mejoras ratón</h3>
                          <ul className="list">
                              <li className="list-item">Mejora 1</li>
                              <li className="list-item">Mejora 2</li>
                              <li className="list-item">Mejora 3</li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
        </div>
        </>
    )
}

export default Principal