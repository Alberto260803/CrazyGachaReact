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
    const { multiplicadorClics, clicsAutomaticos, cantidadCritico } = useEfectosProductos(productosUsuario);

    const contadorInicial = 10;
    const [contador, setContador] = useState(contadorInicial);
    const [haLlegadoACero, setHaLlegadoACero] = useState(false);
    const [imagenHuevo, setImagenHuevo] = useState(imagenHuevoNormal);
    const [pendienteImagenHuevo, setPendienteImagenHuevo] = useState(null);
    const [pendienteContador, setPendienteContador] = useState(null);
    const [huevoComprado, setHuevoComprado] = useState(false);

    // Cuando el usuario compra un huevo, actualiza la imagen
    const handleComprarHuevo = (nuevoHuevo) => {
        setHuevoComprado(true);
        let nuevoContador = contadorInicial;
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
        setContador(pendienteContador || contadorInicial);
        setPendienteImagenHuevo(null);
        setPendienteContador(null);
    };

    const clicarHuevo = () => {
        if (contador > 0) {
            let clics = multiplicadorClics;
            if (cantidadCritico > 0) {
                // Probabilidad de crítico: 10% por cada producto
                const probabilidad = 0.1 * cantidadCritico;
                if (Math.random() < probabilidad) {
                    clics += 5;
                }
            }
            setContador(prev => Math.max(0, prev - clics));
        }
    };

    useEffect(() => {
        if (clicsAutomaticos > 0 && contador > 0 && !haLlegadoACero && !comprando) {
            const interval = setInterval(() => {
                setContador(prev => Math.max(0, prev - clicsAutomaticos));
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [clicsAutomaticos, contador, haLlegadoACero, comprando]);

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

    const huevoPendiente = huevoComprado && !haLlegadoACero && contador !== contadorInicial;

    return (
        <div className="h-screen w-screen flex flex-col md:flex-row overflow-hidden box-border bg-gradient-to-br from-blue-100 to-blue-300">
            {/* Sección Izquierda */}
            <div className="flex-1 flex flex-col box-border bg-white rounded-lg shadow-lg m-2 md:m-4 p-2 md:p-4 border border-blue-300 overflow-hidden relative">
                <ControlVolumen />
                <div className="p-2 md:p-4 box-border">
                    <Usuario />
                </div>
                <div className="flex-1 flex flex-col box-border h-full overflow-hidden">
                    {/* Clicks automáticos por segundo */}
                    <div className="w-full text-center py-1 md:py-2 mb-1 md:mb-2 font-['Karma_Future'] text-base md:text-lg text-blue-800">
                        <span className="text-green-600">{clicsAutomaticos}</span> clics/s
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
            {/* Separador solo en escritorio */}
            <div className="hidden md:block h-[95%] w-[2px] bg-gradient-to-b from-blue-400 to-blue-600 my-auto" />
            {/* Tienda */}
            <div className="flex-1 bg-white rounded-lg shadow-lg m-2 md:m-4 p-2 md:p-4 border border-blue-300 overflow-hidden">
                <Tienda onComprarHuevo={handleComprarHuevo} huevoPendiente={huevoPendiente}/>
            </div>
        </div>
    );
};

export default Principal;