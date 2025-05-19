import { createContext, useRef, useState } from 'react'
import audioBienvenida from '../resources/cancion_fondo.mp3';

const contextoAudio = createContext();
const ProveedorAudio = ({children}) => {
    const audioRef = useRef(new Audio(audioBienvenida));
    const [audioBloqueado, setAudioBloqueado] = useState(false);

    audioRef.current.loop = true; // Repetir el audio
    audioRef.current.volume = 0.5; // Volumen inicial

    // Función para reproducir el audio
    const reproducirAudio = () => {
        audioRef.current.play()
            .then(() => setAudioBloqueado(false))
            .catch(() => setAudioBloqueado(true));
    };

    const detenerAudio = () => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // Reiniciar el audio.
    };

    const datosProveer = {
        audioRef,
        audioBloqueado,
        reproducirAudio,
        detenerAudio
    }

    return (
        <contextoAudio.Provider value={datosProveer}>
            {children}
        </contextoAudio.Provider>
    );
}

export default ProveedorAudio
export { contextoAudio }