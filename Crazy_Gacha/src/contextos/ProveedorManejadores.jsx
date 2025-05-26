import { createContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import useProveedorSesion from '../componentes/hooks/useProveedorSesion';
import imagenHuevoNormal from '../resources/egg.png';

const contextoManejadores = createContext();
const ProveedorManejadores = ({children}) => {
    const {sesionIniciada} = useProveedorSesion();

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

    // Cuando el usuario compra un huevo, actualiza la imagen
    const handleComprarHuevo = (nuevoHuevo) => {
        setHuevoComprado(true);
        let nuevoContador = 10;
        if (nuevoHuevo.name === "Huevo raro") nuevoContador = 50;
        if (nuevoHuevo.name === "Huevo especial") nuevoContador = 100;
        if (nuevoHuevo.name === "Huevo épico") nuevoContador = 250;
        if (nuevoHuevo.name === "Huevo legendario") nuevoContador = 500;
        const nuevaImagen = nuevoHuevo.linkImage || imagenHuevoNormal;

        if (!haLlegadoACero) {
            setContador(nuevoContador);
            setImagenHuevo(nuevaImagen);
        } else {
            setPendienteContador(nuevoContador);
            setPendienteImagenHuevo(nuevaImagen);
        }
    };

    // Cuando se recibe el premio, resetea la imagen
    const resetearEstado = () => {
        setHaLlegadoACero(false);
        setImagenHuevo(pendienteImagenHuevo || imagenHuevoNormal);
        setContador(pendienteContador || 10);
        setPendienteImagenHuevo(null);
        setPendienteContador(null);
    };

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
        setHuevoComprado,
        handleComprarHuevo,
        resetearEstado
    }

    return (
        <contextoManejadores.Provider value={datosProveedor}>
            {children}
        </contextoManejadores.Provider>
    )
}

export default ProveedorManejadores
export { contextoManejadores }