import React from 'react'
import { Route, Routes } from 'react-router-dom'
import IniciarSesion from '../paginas/IniciarSesion'
import Registrar from '../paginas/Registrar'

const Rutas = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<IniciarSesion/>}/>
                <Route path='/register' element={<Registrar/>}/>
            </Routes>
        </>
    )
}

export default Rutas