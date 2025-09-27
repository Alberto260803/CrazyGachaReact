import React, { createContext, useState } from 'react'
import useProveedorSesion from '../componentes/hooks/useProveedorSesion.js';
import useDatos from '../componentes/hooks/useDatos.js';
import { URL_LOCAL } from '../biblioteca/biblioteca.js';

const contextoProductos = createContext();
const ProveedorProductos = ({children}) => {
    const {idUsuario, token, obtenerUsuario} = useProveedorSesion();

    const productosIniciales = [];
    const [productosUsuario, setProductosUsuario] = useState(productosIniciales);
    const [productos, setProductos] = useState(productosIniciales);
    const [comprando, setComprando] = useState(false);

    const {cargando, obtenerDatos} = useDatos();

    const obtenerProductos = async () => {
        const url = `${URL_LOCAL}/api/shop`;
        const method = "GET";

        const respuesta = await obtenerDatos(url, method, null, token);

        if (respuesta) {
            setProductos(respuesta);
        } else {
            setProductos(productosIniciales);
        }
    };

    const obtenerProductosUsuario = async () => {
        const url = `${URL_LOCAL}/api/users/${idUsuario}/products`;
        const method = "GET";

        const respuesta = await obtenerDatos(url, method, null, token);

        if (respuesta) {
            setProductosUsuario(respuesta);
        } else {
            setProductosUsuario(productosIniciales);
        }
    };

    const comprarProducto = async (idProducto) => {
        const url = `${URL_LOCAL}/api/shop/${idProducto}/buy`;
        const method = "POST";

        await obtenerDatos(url, method, null, token);
        await obtenerUsuario(idUsuario);
        await obtenerProductosUsuario();
    };

    const datosProveer = {
        productos,
        cargando,
        obtenerProductos,
        obtenerProductosUsuario,
        productosUsuario,
        comprarProducto,
        comprando,
        setComprando
    }

    return (
        <contextoProductos.Provider value={datosProveer}>
            {children}
        </contextoProductos.Provider>
    )
}

export default ProveedorProductos
export { contextoProductos }