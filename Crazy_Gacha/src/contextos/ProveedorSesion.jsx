import React, { createContext, useState } from 'react'

const contextoSesion = createContext();
const ProveedorSesion = ({children}) => {
    const usuarioInicial = {
        "name":"",
        "email":"",
        "password":""
    };

    const [usuario, setUsuario] = useState(usuarioInicial);

    // Función para actualizar los datos del usuario.
    const actualizarUsuario = (evento) => {
        const { name, value } = evento.target;
        setUsuario({ ...datosSesion, [name]: value });
    };

    const datosProveer = {
        actualizarUsuario,
        usuario
    };

    return (
        <contextoSesion.Provider value={datosProveer}>
            {children}
        </contextoSesion.Provider>
    )
}

export default ProveedorSesion
export {contextoSesion}