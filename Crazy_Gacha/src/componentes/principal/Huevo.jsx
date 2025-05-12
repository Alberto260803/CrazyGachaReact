import React, { useEffect, useState } from 'react'
import imagenEgg from '../../resources/egg.png';
import './Huevo.css';

const Huevo = ({ contador, clicarHuevo }) => {
    const [animar, setAnimar] = useState(false);

    useEffect(() => {
        if (contador === 0) {
            setAnimar(true); // Activar la animación
            const timeout = setTimeout(() => setAnimar(false), 1000); // Duración de la animación (1s)
            return () => clearTimeout(timeout); // Limpiar el timeout
        }
    }, [contador]);

    return (
        <div className="flex-1 flex flex-col items-center justify-center pb-4 min-h-0">
            <div className="font-['Karma_Future'] text-6xl font-bold mb-8">{contador}</div>
            <div
                className={`w-[65vmin] h-[65vmin] cursor-pointer flex items-center justify-center ${
                    animar ? 'huevo-shake' : ''
                }`}
            >
                <img
                    src={imagenEgg}
                    alt="Huevo"
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-200"
                    onClick={() => clicarHuevo()}
                />
            </div>
        </div>
    );
};

export default Huevo;