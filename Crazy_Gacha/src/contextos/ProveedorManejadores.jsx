import { createContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import useProveedorSesion from '../componentes/hooks/useProveedorSesion';

const contextoManejadores = createContext();
const ProveedorManejadores = ({children}) => {
    const {sesionIniciada} = useProveedorSesion()

    const [modoNocturno, setModoNocturno] = useState(false);
    const [volumen, setVolumen] = useState(0.5);

    const contadorInicial = 10;
    const [contador, setContador] = useState(contadorInicial);
    const [haLlegadoACero, setHaLlegadoACero] = useState(false);
    const [imagenHuevo, setImagenHuevo] = useState(imagenHuevoNormal);
    const [pendienteImagenHuevo, setPendienteImagenHuevo] = useState(null);
    const [pendienteContador, setPendienteContador] = useState(null);
    const [huevoComprado, setHuevoComprado] = useState(false);

    const location = useLocation();

    useEffect(() => {
        const isAuthPage =
            location.pathname === "/login" ||
            location.pathname === "/register" ||
            (location.pathname === "/" && !sesionIniciada);

        if (modoNocturno && !isAuthPage) {
            document.body.classList.add("modo-nocturno");
        } else {
            document.body.classList.remove("modo-nocturno");
        }
    }, [modoNocturno, location.pathname, sesionIniciada]);

    const datosProveedor = {
        modoNocturno,
        setModoNocturno,
        volumen,
        setVolumen,
        contador,
        setContador,
        haLlegadoACero,
        setHaLlegadoACero,
        imagenHuevo,
        setImagenHuevo,
        pendienteImagenHuevo,
        setPendienteImagenHuevo,
        pendienteContador,
        setPendienteContador,
        huevoComprado,
        setHuevoComprado
    }

    return (
        <contextoManejadores.Provider value={datosProveedor}>
            {children}
        </contextoManejadores.Provider>
    )
}

export default ProveedorManejadores
export { contextoManejadores }