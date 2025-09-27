import { Route, Routes } from 'react-router-dom';
import IniciarSesion from '../paginas/IniciarSesion.jsx';
import Registrar from '../paginas/Registrar.jsx';
import useProveedorSesion from '../hooks/useProveedorSesion.js';
import Principal from '../paginas/Principal.jsx';
import PremiosUsuario from '../paginas/PremiosUsuario.jsx';
import { useEffect } from 'react';
import useProveedorAudio from '../hooks/useProveedorAudio.js';
import Error from '../paginas/Error.jsx';
import Ruleta from '../paginas/Ruleta.jsx';

const Rutas = () => {
    const { sesionIniciada } = useProveedorSesion();
    const { reproducirAudio, detenerAudio } = useProveedorAudio();

    // Controlar el audio según la ruta activa.
    useEffect(() => {
        if (sesionIniciada) {
            reproducirAudio(); // Reproducir audio en Principal e Inventario.
        } else {
            detenerAudio(); // Pausar audio en otras rutas.
        }
    }, [sesionIniciada]);

    return (
        <Routes>
            <Route path="/" element={sesionIniciada ? <Principal /> : <IniciarSesion />} />
            <Route path="/register" element={<Registrar />} />
            <Route path="/login" element={<IniciarSesion />} />
            <Route path="/inventario" element={sesionIniciada ? <PremiosUsuario /> : <Error/>} />
            <Route path="/ruleta" element={sesionIniciada ? <Ruleta /> : <IniciarSesion />} />
            <Route path="*" element={<Error />} />
        </Routes>
    );
};

export default Rutas;