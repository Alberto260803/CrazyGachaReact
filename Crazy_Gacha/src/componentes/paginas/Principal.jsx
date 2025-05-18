import { useEffect, useState } from 'react';
import Tienda from '../principal/Tienda.jsx';
import Huevo from '../principal/Huevo.jsx';
import Premio from '../principal/Premio.jsx';
import useProveedorPremios from '../hooks/useProveedorPremios.js';
import useProveedorProdutos from '../hooks/useProveedorProductos.js';
import Usuario from '../principal/Usuario.jsx';
import useEfectosProductos from '../hooks/useEfectosProductos.js';
import ControlVolumen from '../principal/ControlVolumen.jsx';
import imagenHuevoNormal from '../../resources/egg.png';

const Principal = () => {
    const { obtenerPremio } = useProveedorPremios();
    const { obtenerProductos, obtenerProductosUsuario, productosUsuario, comprando } = useProveedorProdutos();
    const { multiplicadorClics, cantidadNido } = useEfectosProductos(productosUsuario);

    const contadorInicial = 10;
    const [contador, setContador] = useState(contadorInicial);
    const [haLlegadoACero, setHaLlegadoACero] = useState(false);
    const [imagenHuevo, setImagenHuevo] = useState(imagenHuevoNormal);
    const [pendienteImagenHuevo, setPendienteImagenHuevo] = useState(null);
    const [pendienteContador, setPendienteContador] = useState(null);

    // Cuando el usuario compra un huevo, actualiza la imagen
    const handleComprarHuevo = (nuevoHuevo) => {
        let nuevoContador = contadorInicial;
        if (nuevoHuevo.name === "Huevo raro") nuevoContador = 50;
        if (nuevoHuevo.name === "Huevo épico") nuevoContador = 100;
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
        setContador(pendienteContador || contadorInicial);
        setPendienteImagenHuevo(null);
        setPendienteContador(null);
    };

    useEffect(() => {
        setContador(contadorInicial);
    }, [multiplicadorClics]);

    const clicarHuevo = () => {
        if (contador > 0) {
            setContador(prev => Math.max(0, prev - multiplicadorClics));
        }
    };

    useEffect(() => {
        if (cantidadNido > 0 && contador > 0 && !haLlegadoACero && !comprando) {
            const interval = setInterval(() => {
                setContador(prev => Math.max(0, prev - cantidadNido));
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [cantidadNido, contador, haLlegadoACero, comprando]);

    useEffect(() => {
        if (contador === 0) {
            const timeout = setTimeout(() => {
                setHaLlegadoACero(true);
                obtenerPremio();
            }, 1000);
            return () => clearTimeout(timeout);
        }
    }, [contador]);

    useEffect(() => {
        obtenerProductos();
        obtenerProductosUsuario();
    }, []);

    return (
        <div className="h-screen w-screen flex overflow-hidden box-border bg-gradient-to-br from-blue-100 to-blue-300">
            {/* Sección Izquierda */}
            <div className="flex-1 flex flex-col box-border bg-white rounded-lg shadow-lg m-4 p-4 border border-blue-300 overflow-hidden relative">
                <ControlVolumen />
                <div className="p-4 box-border">
                    <Usuario />
                </div>
                <div className="flex-1 flex flex-col box-border h-full overflow-hidden">
                    {/* Clicks automáticos por segundo */}
                    <div className="w-full text-center py-2 mb-2 font-['Karma_Future'] text-lg text-blue-800">
                        <span className="text-green-600">{cantidadNido}</span> clics/s
                    </div>
                    {!haLlegadoACero ? (
                        <Huevo contador={contador} clicarHuevo={clicarHuevo} imagenHuevo={imagenHuevo} />
                    ) : (
                        <div className="flex-1 min-w-0 w-full overflow-hidden">
                            <Premio resetearEstado={resetearEstado} />
                        </div>
                    )}
                </div>
            </div>
            {/* Separador */}
            <div className="h-[95%] w-[2px] bg-gradient-to-b from-blue-400 to-blue-600 my-auto" />
            {/* Tienda */}
            <div className="flex-1 bg-white rounded-lg shadow-lg m-4 p-4 border border-blue-300 overflow-hidden">
                <Tienda onComprarHuevo={handleComprarHuevo} />
            </div>
        </div>
    );
};

export default Principal;