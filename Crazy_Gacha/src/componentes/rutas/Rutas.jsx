import React from 'react'
import { Route, Routes } from 'react-router-dom'
import IniciarSesion from '../paginas/IniciarSesion'
import Registrar from '../paginas/Registrar'
import useProveedorSesion from '../hooks/useProveedorSesion'
import Principal from '../paginas/Principal'

const Rutas = () => {
    const {sesionIniciada} = useProveedorSesion();
    return (
        <>
            <Routes>
                <Route path='/' element={sesionIniciada ? <Principal/> : <IniciarSesion/>}/>
                <Route path='/register' element={<Registrar/>}/>
                <Route path='/login' element={<IniciarSesion/>}/>
            </Routes>
        </>
    )
}

export default Rutas