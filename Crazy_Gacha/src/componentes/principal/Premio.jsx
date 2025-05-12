import React from 'react';

const Premio = ({ resetearEstado }) => {
    const rarityStyles = {
        comun:      'text-gray-500',
        rara:       'text-green-500',
        especial:   'text-blue-500',
        epica:      'text-purple-500',
        legendaria: 'text-yellow-400',
    };

    const colorRareza = rarityStyles.legendaria;
    
    return (
        <div className="flex-1 flex flex-col items-center justify-center p-2 min-h-0 w-full h-full overflow-hidden">
            {/* Nombre - Texto más responsive */}
            <h2 className={`font-['Karma_Future'] text-center
                text-3xl sm:text-4xl md:text-5xl lg:text-6xl
                font-bold mb-2 md:mb-4
                transition-all duration-300`}>
                Nombre
            </h2>

            {/* Contenedor imagen + rareza */}
            <div className="w-[90%] max-w-[65vmin] aspect-square relative mb-2 md:mb-4">
                {/* Rareza vertical - Mantener posición y orientación */}
                <span
                    style={{ writingMode: 'vertical-rl' }}
                    className={`
                        absolute 
                        top-1/2 
                        left-[-3vw] /* Ajusta este valor para el espaciado en móviles */
                        sm:left-[-2vw] /* Espaciado en pantallas más grandes */
                        transform -translate-y-1/2 rotate-180
                        text-[3.5vw] sm:text-[3vw] md:text-[2.5vw] lg:text-[2vw] /* Tamaño responsive */
                        font-bold 
                        uppercase
                        ${colorRareza}
                        transition-all duration-300
                    `}
                >
                    LEGENDARIA
                </span>

                {/* Imagen del premio - Mantiene relación de aspecto */}
                <img
                    src="https://i.imgur.com/3kmYVQC.jpg"
                    alt="Premio"
                    className="w-full h-full object-contain p-[2vw]"
                />
            </div>

            {/* Importe - Tamaño más adaptable */}
            <p className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2 md:mb-4">
                Importe: <span className="text-green-500">1000</span>
            </p>

            {/* Botón de aceptar - Tamaño responsive */}
            <button
                onClick={resetearEstado}
                className="bg-blue-500 text-white 
                    px-4 py-1 md:px-6 md:py-2 
                    text-lg md:text-xl
                    rounded-lg font-bold 
                    hover:bg-blue-600 transition-all duration-200"
            >
                Aceptar
            </button>
        </div>
    );
};

export default Premio;