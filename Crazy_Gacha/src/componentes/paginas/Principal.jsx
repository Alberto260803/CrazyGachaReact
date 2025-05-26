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
import useProveedorManejadores from '../hooks/useProveedorManejadores.js';

const Principal = () => {
    const { obtenerPremio, premio } = useProveedorPremios();
    const { obtenerProductos, obtenerProductosUsuario, productosUsuario, comprando } = useProveedorProdutos();
    const { multiplicadorClics, clicsAutomaticos, cantidadCritico } = useEfectosProductos(productosUsuario);
    const {
        contador,
        setContador,
        haLlegadoACero,
        setHaLlegadoACero,
        imagenHuevo,
        huevoComprado,
        handleComprarHuevo,
        resetearEstado
    } = useProveedorManejadores();

    const [menuAbierto, setMenuAbierto] = useState(false);
    const [mostrarTienda, setMostrarTienda] = useState(false);

    const clicarHuevo = () => {
        if (contador > 0 && !comprando) {
            let clics = multiplicadorClics;
            if (cantidadCritico > 0) {
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
        if (contador === 0 && !premio?.name) {
            const timeout = setTimeout(() => {
                setHaLlegadoACero(true);
                obtenerPremio();
            }, 1000);
            return () => clearTimeout(timeout);
        }
    }, [contador, premio]);

    useEffect(() => {
        obtenerProductos();
        obtenerProductosUsuario();
    }, []);

    const huevoPendiente = huevoComprado && !haLlegadoACero && imagenHuevo !== imagenHuevoNormal;

    return (
        <div className="h-screen w-screen flex overflow-hidden box-border bg-gradient-to-br from-blue-100 to-blue-300 relative">
            {/* ControlVolumen SOLO móvil */}
            <div className="md:hidden absolute top-16 right-4 z-50">
                <ControlVolumen />
            </div>

            {/* Clics por segundo en móvil (fijo arriba) */}
            <div className="fixed md:hidden top-4 left-1/2 -translate-x-1/2 text-blue-800 text-sm bg-white/80 rounded-lg px-3 py-1 shadow z-50 font-['Karma_Future']">
                <span className="text-green-600">{clicsAutomaticos}</span> clics/s
            </div>

            {/* Botón hamburguesa para usuario en móvil */}
            <button
                className="lg:hidden absolute top-4 left-4 z-50 p-2 bg-blue-200 rounded"
                onClick={() => setMenuAbierto(!menuAbierto)}
            >
                <div className="w-6 h-0.5 bg-blue-800 mb-1"></div>
                <div className="w-6 h-0.5 bg-blue-800 mb-1"></div>
                <div className="w-6 h-0.5 bg-blue-800"></div>
            </button>

            {/* Botón carrito tienda en móvil */}
            <button
                className="md:hidden absolute top-4 right-4 z-50 p-2 bg-blue-200 rounded cursor-pointer"
                onClick={() => setMostrarTienda(!mostrarTienda)}
            >
                <img
                    src="https://cdn-icons-png.flaticon.com/512/107/107831.png"
                    alt="Carrito"
                    className="w-6 h-6"
                />
            </button>

            {/* Menú Usuario en móvil */}
            {menuAbierto && (
                <div className="md:hidden absolute top-16 left-4 right-4 bg-white border border-blue-300 rounded-lg shadow-lg z-40 p-4 cursor-pointer">
                    <Usuario />
                </div>
            )}

            {/* Tienda en móvil */}
            {mostrarTienda && (
                <div className="md:hidden absolute top-16 left-4 right-4 bg-white border border-blue-300 rounded-lg shadow-lg z-40 p-4">
                    <Tienda onComprarHuevo={handleComprarHuevo} huevoPendiente={huevoPendiente} />
                </div>
            )}

            {/* Pantalla principal en escritorio */}
            <div className="hidden md:flex flex-1 flex-col box-border bg-white rounded-lg shadow-lg m-4 p-4 border border-blue-300 overflow-hidden relative">
                {/* ControlVolumen SOLO escritorio, arriba a la derecha de la sección izquierda */}
                <div className="absolute top-4 right-4 z-50">
                    <ControlVolumen />
                </div>

                <div className="p-4 box-border">
                    <Usuario />
                </div>

                {/* Clics por segundo en escritorio (encima del huevo/premio) */}
                <div className="hidden md:block text-blue-800 text-lg bg-white/80 rounded-lg px-3 py-1 shadow font-['Karma_Future'] text-center w-fit mx-auto mb-2">
                    <span className="text-green-600">{clicsAutomaticos}</span> clics/s
                </div>

                <div className="flex-1 flex flex-col box-border h-full overflow-hidden">
                    {!haLlegadoACero ? (
                        <Huevo contador={contador} clicarHuevo={clicarHuevo} imagenHuevo={imagenHuevo} />
                    ) : (
                        <div className="flex-1 min-w-0 w-full overflow-hidden">
                            <Premio resetearEstado={resetearEstado} />
                        </div>
                    )}
                </div>
            </div>

            {/* Pantalla principal en móvil */}
            <div className="md:hidden absolute top-32 left-4 right-4 bottom-4 bg-white border border-blue-300 rounded-lg shadow-lg z-30 p-4 overflow-y-auto">
                {!haLlegadoACero ? (
                    <Huevo contador={contador} clicarHuevo={clicarHuevo} imagenHuevo={imagenHuevo} />
                ) : (
                    <Premio resetearEstado={resetearEstado} />
                )}
            </div>

            {/* Separador solo escritorio */}
            <div className="hidden md:block h-[95%] w-[2px] bg-gradient-to-b from-blue-400 to-blue-600 my-auto" />

            {/* Tienda escritorio */}
            <div className="hidden md:block flex-1 bg-white rounded-lg shadow-lg m-4 p-4 border border-blue-300 overflow-hidden">
                <Tienda onComprarHuevo={handleComprarHuevo} huevoPendiente={huevoPendiente} />
            </div>
        </div>
    );

};

export default Principal;
