import React, { useEffect, useRef, useState } from 'react';
import Tienda from '../principal/Tienda.jsx';
import Huevo from '../principal/Huevo.jsx';
import Premio from '../principal/Premio.jsx';
import useProveedorPremios from '../hooks/useProveedorPremios.js';
import useProveedorProdutos from '../hooks/useProveedorProductos.js';
import Usuario from '../principal/Usuario.jsx';
import useEfectosProductos from '../hooks/useEfectosProductos.js';
import ControlVolumen from '../principal/ControlVolumen.jsx';

const Principal = () => {
    const { obtenerPremio } = useProveedorPremios();
    const { obtenerProductos, obtenerProductosUsuario, productosUsuario } = useProveedorProdutos();
    const { multiplicadorClics } = useEfectosProductos(productosUsuario)

    const contadorInicial = 5;
    const [contador, setContador] = useState(contadorInicial);
    const [haLlegadoACero, setHaLlegadoACero] = useState(false);

    useEffect(() => {
        setContador(contadorInicial);
    }, [multiplicadorClics]);

    const clicarHuevo = () => {
        if (contador > 0) {
            setContador(prev => Math.max(0, prev - multiplicadorClics));
        }
    };

    // Detectar cuando el contador llega a 0
    useEffect(() => {
        if (contador === 0) {
            const timeout = setTimeout(() => {
                setHaLlegadoACero(true);
                setContador(contadorInicial); // Reiniciar el contador
                obtenerPremio(); // Obtener un nuevo premio
            }, 1000); // Duración de la animación (1s)

            return () => clearTimeout(timeout); // Limpiar el timeout
        }
    }, [contador]);

    // Función para resetear el estado
    const resetearEstado = () => {
        setHaLlegadoACero(false);
    };

    // Intenta reproducir al cargar el componente
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
                    {!haLlegadoACero ? (
                        <Huevo contador={contador} clicarHuevo={clicarHuevo} />
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
                <Tienda />
            </div>
        </div>
    );
};

export default Principal;