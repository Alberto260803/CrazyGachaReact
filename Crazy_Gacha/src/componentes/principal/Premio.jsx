import React, { useEffect, useRef, useState } from 'react';
import useProveedorPremios from '../hooks/useProveedorPremios.js';
import ReactConfetti from 'react-confetti';
import imagenMoneda from '../../resources/moneda.png';

const Premio = ({ resetearEstado }) => {
    const { premio, cargando } = useProveedorPremios();
    const contenedorRef = useRef(null);
    const [dimensiones, setDimensiones] = useState({ width: 0, height: 0 });

    // ResizeObserver para actualizar las dimensiones dinámicamente
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
            className="relative flex flex-col items-center justify-center w-full flex-grow h-full p-8 overflow-hidden mt-12 box-border z-10"
        >
            {cargando ? (
                <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
                </div>
            ) : (
                <>
                    {/* Confetti ajustado al tamaño del componente */}
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                        <ReactConfetti
                            width={dimensiones.width}
                            height={dimensiones.height}
                            numberOfPieces={150} // Ajustamos la cantidad de confeti
                            gravity={0.8} // Hacemos que caiga más lentamente
                            recycle={false}
                            run={true}
                        />
                    </div>

                    <h2 className={`font-['Karma_Future'] text-center
                        text-2xl sm:text-3xl md:text-[1rem] lg:text-[1.5rem]
                        font-bold mb-6
                        transition-all duration-300
                        break-words max-w-[90%] // Limitar el ancho del texto y permitir ajuste de línea
                    `}>
                        {premio.name || 'Nombre del premio'}
                    </h2>

                    <div className="w-[70%] max-w-[50vmin] aspect-square relative mb-6 shrink-0">
                        <span
                            style={{ writingMode: 'vertical-rl' }}
                            className={`absolute 
                                top-1/2 
                                left-[-3vw] sm:left-[-2vw]
                                transform -translate-y-1/2 rotate-180
                                text-[3vw] sm:text-[2.5vw] md:text-[2vw] lg:text-[1.8vw]
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
                            className="w-full h-full object-contain p-[1vw]"
                        />
                    </div>

                    <p className="text-lg md:text-xl lg:text-2xl font-semibold mb-6 flex items-center justify-center gap-2">
                        Recompensa: 
                        <span className="flex items-center gap-1">
                            <span>{premio.reward || 0}</span>
                            <img 
                                src={imagenMoneda}
                                alt="Moneda"
                                className="w-[2em] h-[2em] object-contain"
                            />
                        </span>
                    </p>

                    <button
                        onClick={resetearEstado}
                        className="bg-blue-500 text-white 
                            px-6 py-3 
                            text-lg md:text-xl
                            rounded-lg font-bold 
                            hover:bg-blue-600 transition-all duration-200
                            cursor-pointer"
                    >
                        Aceptar
                    </button>
                </>
            )}
        </div>
    );
};

export default Premio;