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
            const informacion = await gestionarDatos(url, method, body, token);
            
            if (informacion && informacion.data !== null) {
                if (informacion.token) {
                    setToken(informacion.token); // Guardar el token si la respuesta lo tiene
                }
                setDatos(informacion);
            } else {
                setError(informacion.message || "Error desconocido");
            }

            return informacion; // Retornar la información para su uso posterior
        } catch (error) {
            setError(error.message || "Error desconocido");
        } finally {
            setCargando(false);
        }
    };

    return {datos,error,cargando, obtenerDatos, token};
};

export default useDatos;