import React, { useEffect, useRef, useState } from 'react';
import useProveedorPremios from '../hooks/useProveedorPremios.js';
import ReactConfetti from 'react-confetti';
import imagenMoneda from '../../resources/moneda.png';

const Premio = ({ resetearEstado }) => {
    const { premio, cargando } = useProveedorPremios();
    const contenedorRef = useRef(null);
    const [dimensiones, setDimensiones] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const observer = new ResizeObserver(entries => {
            for (let entry of entries) {
                const { width, height } = entry.contentRect;
                setDimensiones({ width, height });
            }
        });

        if (contenedorRef.current) {
            observer.observe(contenedorRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    const rarityStyles = {
        Común:      'text-gray-500',
        Rara:       'text-green-500',
        Especial:   'text-blue-500',
        Épica:      'text-purple-500',
        Legendaria: 'text-yellow-400',
    };

    const colorRareza = premio?.rarity ? rarityStyles[premio.rarity] : "Común";

    return (
        <div
            ref={contenedorRef}
            className="relative flex flex-col justify-between items-center w-full h-full min-h-0 p-2 sm:p-4 md:p-8 overflow-hidden box-border z-10 mt-2 sm:mt-4"
        >
            {cargando ? (
                <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-4 border-blue-500 border-solid"></div>
                </div>
            ) : (
                <>
                    {/* Confetti ajustado al tamaño del componente */}
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                        <ReactConfetti
                            width={dimensiones.width}
                            height={dimensiones.height}
                            numberOfPieces={150}
                            gravity={0.8}
                            recycle={false}
                            run={true}
                        />
                    </div>

                    {/* Nombre del premio */}
                    <h2 className={`font-['Karma_Future'] text-center
                        text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl
                        font-bold mb-2 sm:mb-4
                        transition-all duration-300
                        break-words max-w-[95%]
                    `}>
                        {premio.name || 'Nombre del premio'}
                    </h2>

                    {/* Contenido principal con scroll si hace falta */}
                    <div className="flex-1 min-h-0 w-full flex flex-col items-center justify-center overflow-auto">
                        <div className="w-[70vw] max-w-[250px] aspect-square relative mb-4 sm:mb-6 shrink-0">
                            <span
                                style={{ writingMode: 'vertical-rl' }}
                                className={`absolute 
                                    top-1/2 
                                    left-[-7vw] sm:left-[-3vw]
                                    transform -translate-y-1/2 rotate-180
                                    text-[4vw] sm:text-[2vw] md:text-[1.5vw]
                                    font-bold 
                                    uppercase
                                    ${colorRareza}
                                    transition-all duration-300
                                `}
                            >
                                {premio.rarity || 'Rareza'}
                            </span>

                            <img
                                src={premio.image || 'https://www.freeiconspng.com/thumbs/error-icon/error-icon-4.png'}
                                alt="Premio"
                                className="w-full h-full object-contain p-[2vw] sm:p-[1vw]"
                            />
                        </div>

                        <p className="text-base sm:text-lg md:text-xl font-semibold mb-4 sm:mb-6 flex items-center justify-center gap-2">
                            Recompensa: 
                            <span className="flex items-center gap-1">
                                <span>{premio.reward || 0}</span>
                                <img 
                                    src={imagenMoneda}
                                    alt="Moneda"
                                    className="w-[1.5em] h-[1.5em] sm:w-[2em] sm:h-[2em] object-contain"
                                />
                            </span>
                        </p>
                    </div>

                    {/* Botón siempre visible abajo */}
                    <div className="w-full flex justify-center mt-2 sm:mt-4">
                        <button
                            onClick={resetearEstado}
                            className="bg-blue-500 text-white 
                                px-4 py-2 sm:px-6 sm:py-3 
                                text-base sm:text-lg md:text-xl
                                rounded-lg font-bold 
                                hover:bg-blue-600 transition-all duration-200
                                cursor-pointer w-full max-w-xs"
                        >
                            Aceptar
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Premio;