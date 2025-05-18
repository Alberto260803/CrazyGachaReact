import React, { createContext, useState } from 'react'
import useDatos from '../componentes/hooks/useDatos.js';
import useProveedorSesion from '../componentes/hooks/useProveedorSesion.js';

const contextoPremios = createContext();
const ProveedorPremios = ({children}) => {

    const {idUsuario, token, obtenerUsuario} = useProveedorSesion();

    const premioInicial = {
        "name": "",
        "rarity": "",
        "reward": 0,
        "image": "",
    };

    const premiosIniciales = [];
    const [premiosUsuario, setPremiosUsuario] = useState(premiosIniciales);

    const [premio, setPremio] = useState(premioInicial);

    const {error, cargando, obtenerDatos} = useDatos();

    const obtenerPremio = async () => {
        const url = "http://localhost:8087/api/prizes/random";
        const method = "GET";

        const respuesta = await obtenerDatos(url, method, null, token);
        console.log(respuesta.data.probabilities)

        if (respuesta) {
            setPremio(respuesta.data.prize);
        } else {
            setPremio(premioInicial);
        }
    };

    const obtenerPremiosUsuario = async () => {
        const url = `http://localhost:8087/api/users/${idUsuario}/prizes`;
        const method = "GET";

        const respuesta = await obtenerDatos(url, method, null, token);
        if (respuesta) {
            setPremiosUsuario(respuesta);
        } else {
            setPremiosUsuario(premiosIniciales);
        }
    };

    const venderRepetidos = async (idPremio) => {
        const url = `http://localhost:8087/api/prizes/${idPremio}/sell`;
        const method = "POST";
        const respuesta = await obtenerDatos(url, method, null, token);

        if (respuesta.message && respuesta.data === null) {
            return respuesta?.message
        }
        await obtenerUsuario(idUsuario);
        await obtenerPremiosUsuario();
        return null;
    };

    const venderTodosRepetidos = async () => {
        const url = `http://localhost:8087/api/prizes/sellAllDuplicates`;
        const method = "POST";
        const respuesta = await obtenerDatos(url, method, null, token);
        if(respuesta.message && respuesta.data === null) {
            return respuesta?.message
        }
        await obtenerUsuario(idUsuario);
        await obtenerPremiosUsuario();
    };

    const datosProveer = {
        premio,
        cargando,
        obtenerPremio,
        obtenerPremiosUsuario,
        premiosUsuario,
        venderRepetidos,
        venderTodosRepetidos,
        error
    }

    return (
        <contextoPremios.Provider value={datosProveer}>
            {children}
        </contextoPremios.Provider>
    )
}

export default ProveedorPremios
export { contextoPremios }