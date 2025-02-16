import { useState } from "react";
import { gestionarDatos } from "../../biblioteca/biblioteca.js";

const useDatos = () => {
    const datosIniciales = [];
    const errorInicial = "";
    const cargandoInicial = false;

    const [datos, setDatos] = useState(datosIniciales);
    const [error, setError] = useState(errorInicial);
    const [cargando, setCargando] = useState(cargandoInicial);
    const [token, setToken] = useState("");
    

    const obtenerDatos = async (url, method, body = null) => {
        setCargando(true);
        setError(errorInicial);
    
        try {
            const informacion = await gestionarDatos(url, method, body, setError, token);
            if (informacion.token) {
                setToken(informacion.token); // Guardar el token si la respuesta lo tiene
            }
            setDatos(informacion);
        } catch (error) {
            setError(error.message);
        } finally {
            setCargando(false);
        }
    };

    return {datos,error,cargando, obtenerDatos, token};
};

export default useDatos;