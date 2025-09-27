import React, { createContext, useEffect, useState } from 'react'
import useDatos from '../componentes/hooks/useDatos.js';
import { useNavigate } from 'react-router-dom';
import { URL_LOCAL } from '../biblioteca/biblioteca.js';

const contextoSesion = createContext();
const ProveedorSesion = ({children}) => {
    const usuarioInicial = {
        "name":"",
        "email":"",
        "password":"",
        "money":0,
    };
    const sesionIniciadaInicial = false;

    const [usuario, setUsuario] = useState(usuarioInicial);
    const [sesionIniciada, setSesionIniciada] = useState(sesionIniciadaInicial);
    const [token, setToken] = useState("");
    const [idUsuario, setIdUsuario] = useState(0);
    const [usuarioPendiente, setUsuarioPendiente] = useState(null);

    const {error, cargando, obtenerDatos} = useDatos();
    const navegar = useNavigate(null);

    // Función para actualizar los datos del usuario.
    const actualizarUsuario = (evento) => {
        const { name, value } = evento.target;
        setUsuario({ ...usuario, [name]: value });
    };

    const registrarUsuario = async () => {
        const url = `${URL_LOCAL}/api/register`;
        const method = "POST";
        const body = usuario;

        const respuesta = await obtenerDatos(url, method, body);

        if (respuesta && respuesta.token) {
            setToken(respuesta.token);
            setIdUsuario(respuesta.data.id);
            setUsuarioPendiente(respuesta.data.id);
            navegar("/");
            setSesionIniciada(true);
        } else {
            setSesionIniciada(false);
        }
    };

    const iniciarSesion = async () => {
        const url = `${URL_LOCAL}/api/login`;
        const method = "POST";
        const { email, ...body } = usuario;
        const respuesta = await obtenerDatos(url, method, body);

        if (respuesta && respuesta.token) {
            setToken(respuesta.token);
            setIdUsuario(respuesta.data.id);
            setUsuarioPendiente(respuesta.data.id);
            navegar("/");
            setSesionIniciada(true);
        } else {
            setSesionIniciada(false);
        }
    };

    const cerrarSesion = async () => {
        const url = `${URL_LOCAL}/api/logout`;
        const method = "POST";

        await obtenerDatos(url, method, null, token);
        setSesionIniciada(false);
        setToken("");
    };

    const obtenerUsuario = async (id) => {
        const url = `${URL_LOCAL}/api/users/${id}`;
        const method = "GET";

        const respuesta = await obtenerDatos(url, method, null, token);

        if (respuesta) {
            setUsuario(respuesta.data);
        } else {
            setUsuario(usuarioInicial);
        }
    };

    // Efecto que se dispara cuando hay token y usuarioPendiente
    useEffect(() => {
        if (token && usuarioPendiente) {
            obtenerUsuario(usuarioPendiente);
            setUsuarioPendiente(null); // Limpia el pendiente
        }
    }, [token, usuarioPendiente]);

    const datosProveer = {
        actualizarUsuario,
        usuario,
        registrarUsuario,
        error,
        cargando,
        sesionIniciada,
        iniciarSesion,
        cerrarSesion,
        token,
        idUsuario,
        obtenerUsuario
    };

    return (
        <contextoSesion.Provider value={datosProveer}>
            {children}
        </contextoSesion.Provider>
    )
}

export default ProveedorSesion
export {contextoSesion}