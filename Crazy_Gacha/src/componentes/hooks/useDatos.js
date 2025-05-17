import { useState } from "react";
import { gestionarDatos } from "../../biblioteca/biblioteca.js";

const useDatos = () => {
    const datosIniciales = [];
    const errorInicial = "";
    const cargandoInicial = false;

    const [datos, setDatos] = useState(datosIniciales);
    const [error, setError] = useState(errorInicial);
    const [cargando, setCargando] = useState(cargandoInicial);
    

    const obtenerDatos = async (url, method, body = null, token = "") => {
        setCargando(true);
        setError(errorInicial);
    
        try {
            const informacion = await gestionarDatos(url, method, body, token);
            
            if (informacion && informacion.data !== null) {
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

    return {datos,error,cargando,obtenerDatos};
};

export default useDatos;