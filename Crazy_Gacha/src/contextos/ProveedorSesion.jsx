import React, { createContext, use, useState } from 'react'
import useDatos from '../componentes/hooks/useDatos.js';
import { useNavigate } from 'react-router-dom';

const contextoSesion = createContext();
const ProveedorSesion = ({children}) => {
    const usuarioInicial = {
        "name":"",
        "email":"",
        "password":""
    };
    const sesionIniciadaInicial = false;

    const [usuario, setUsuario] = useState(usuarioInicial);
    const [sesionIniciada, setSesionIniciada] = useState(sesionIniciadaInicial);

    const {datos, error, cargando, obtenerDatos} = useDatos();
    const navegar = useNavigate(null);

    // Función para actualizar los datos del usuario.
    const actualizarUsuario = (evento) => {
        const { name, value } = evento.target;
        setUsuario({ ...usuario, [name]: value });
    };

    const registrarUsuario = async () => {
        const url = "http://localhost:8087/api/register";
        const method = "POST";
        const body = usuario;

        await obtenerDatos(url, method, body);
        if(!error.length>0){
            navegar("/");
            setSesionIniciada(true);
        };
    };

    const iniciarSesion = async () => {
        const url = "http://localhost:8087/api/login"; 
        const method = "POST";
        
        const { email, ...body } = usuario;
    
        await obtenerDatos(url, method, body);
        if (!error.length>0) {
          navegar("/");
          setSesionIniciada(true);
        };
    };

    const cerrarSesion = async () => {
        const url = "http://localhost:8087/api/logout";
        const method = "POST";

        await obtenerDatos(url, method);
        setSesionIniciada(false);
    };

    const datosProveer = {
        actualizarUsuario,
        usuario,
        registrarUsuario,
        datos,
        error,
        cargando,
        sesionIniciada,
        iniciarSesion,
        cerrarSesion
    };

    return (
        <contextoSesion.Provider value={datosProveer}>
            {children}
        </contextoSesion.Provider>
    )
}

export default ProveedorSesion
export {contextoSesion}