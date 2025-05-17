import useProveedorAudio from '../hooks/useProveedorAudio.js';

const Audio = () => {
    const { audioBloqueado, reproducirAudio } = useProveedorAudio();

    return (
        <>
            {/* Botón de emergencia para audio */}
            {audioBloqueado && (
                <div className="fixed bottom-4 right-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white p-3 rounded-lg shadow-xl animate-bounce z-50">
                    <button 
                        onClick={reproducirAudio}
                        className="flex items-center gap-2 font-bold"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M16 20.334v-2.438a2.25 2.25 0 0 1 .94-1.827l3.379-2.454a2.25 2.25 0 0 0 .932-1.826V9.887a2.25 2.25 0 0 0-.932-1.826L16.94 5.607a2.25 2.25 0 0 1-.94-1.827V2.667h-.5a2.25 2.25 0 0 0-2.25 2.25v14.166a2.25 2.25 0 0 0 2.25 2.25h.5zM6.75 4.917a2.25 2.25 0 0 0-2.25 2.25v9.666a2.25 2.25 0 0 0 2.25 2.25H7.5V4.917H6.75z"/>
                        </svg>
                        ¡Haz clic para sonido!
                    </button>
                </div>
            )}
        </>
    );
};

export default Audio;