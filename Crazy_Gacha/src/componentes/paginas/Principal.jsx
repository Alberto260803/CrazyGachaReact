import React, { useEffect, useRef, useState } from 'react';
import imagenUsuario from '../../resources/usuario.png';
import useProveedorSesion from '../hooks/useProveedorSesion.js';
import audioBienvenida from '../../resources/cancion_fondo.mp3';
import Tienda from '../principal/Tienda.jsx';
import Huevo from '../principal/Huevo.jsx';
import Premio from '../principal/Premio.jsx';

const Principal = () => {
    const { usuario, cerrarSesion } = useProveedorSesion();
    const audioRef = useRef(null);
    const [audioBloqueado, setAudioBloqueado] = useState(false);

    const contadorInicial = 5;
    const [contador, setContador] = useState(contadorInicial);

    const [haLlegadoACero, setHaLlegadoACero] = useState(false);

    const clicarHuevo = () => {
        if (contador > 0) {
            setContador(contador - 1);
        }
    };

    // Detectar cuando el contador llega a 0
    useEffect(() => {
        if (contador === 0) {
            // Esperar a que termine la animación antes de cambiar a Premio
            const timeout = setTimeout(() => {
                setHaLlegadoACero(true);
                setContador(contadorInicial); // Reiniciar el contador
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
        const intentarReproducir = async () => {
            try {
                audioRef.current.volume = 1;
                await audioRef.current.play();
            } catch (error) {
                setAudioBloqueado(true);
            }
        };

        intentarReproducir();

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        };
    }, []);

    // Función para reproducir manualmente
    const forzarReproduccion = () => {
        audioRef.current.play()
            .then(() => setAudioBloqueado(false))
            .catch(() => setAudioBloqueado(true));
    };

    return (
        <div className="h-screen w-screen flex overflow-hidden box-border min-w-0">
            {/* Elemento de audio */}
            <audio 
                ref={audioRef}
                src={audioBienvenida}
                loop
                muted={false}
            />

            {/* Botón de emergencia para audio */}
            {audioBloqueado && (
                <div className="fixed bottom-4 right-4 bg-red-500 text-white p-3 rounded-lg shadow-xl animate-bounce z-50">
                    <button 
                        onClick={forzarReproducir}
                        className="flex items-center gap-2 font-bold"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M16 20.334v-2.438a2.25 2.25 0 0 1 .94-1.827l3.379-2.454a2.25 2.25 0 0 0 .932-1.826V9.887a2.25 2.25 0 0 0-.932-1.826L16.94 5.607a2.25 2.25 0 0 1-.94-1.827V2.667h-.5a2.25 2.25 0 0 0-2.25 2.25v14.166a2.25 2.25 0 0 0 2.25 2.25h.5zM6.75 4.917a2.25 2.25 0 0 0-2.25 2.25v9.666a2.25 2.25 0 0 0 2.25 2.25H7.5V4.917H6.75z"/>
                        </svg>
                        ¡Haz clic para sonido!
                    </button>
                </div>
            )}

            {/* Sección Izquierda */}
            <div className="flex-1 flex flex-col box-border min-w-0">
                <div className="p-4 box-border">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                            <img 
                                src={imagenUsuario} 
                                alt="Usuario" 
                                className="w-12 h-12 object-contain"
                            />
                            <span className="font-['Karma_Future'] text-2xl">
                                Hola, {usuario.name}
                            </span>
                        </div>
                        <button 
                            onClick={cerrarSesion}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 cursor-pointer"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="flex-1 flex flex-col box-border min-w-0 h-full overflow-hidden">
                    {!haLlegadoACero
                    ? (
                        <Huevo contador={contador} clicarHuevo={clicarHuevo}/>
                    )
                    : (
                        <div className="flex-1 min-w-0 w-full h-full overflow-auto">
                        <Premio resetearEstado={resetearEstado}/>
                        </div>
                    )
                    } 
                </div>
            </div>

            {/* Separador */}
            <div className="h-full w-[2px] bg-black/20 my-4" />

            <Tienda/>
        </div>
    );
};

export default Principal;