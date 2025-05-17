import { useState } from 'react';
import useProveedorSesion from '../hooks/useProveedorSesion.js';
import ListadoPremiosUsuario from '../premios/ListadoPremiosUsuario.jsx';
import { useNavigate } from 'react-router-dom';
import moneda from '../../resources/moneda.png';
import ModalConfirmarTodos from '../premios/ModalConfirmarTodos.jsx';

const PremiosUsuario = () => {
    const { usuario } = useProveedorSesion();
    const navigate = useNavigate();
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

    const quitarModal = () => {
        setMostrarConfirmacion(false);
    };

    return (
        <div className="relative min-h-screen w-full bg-gradient-to-br from-blue-100 to-blue-300 p-8 flex items-start justify-center">
            {/* Botón de volver - arriba a la izquierda */}
            <button
                onClick={() => navigate('/')}
                className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md hover:scale-105 transition-transform duration-200 cursor-pointer z-10"
            >
                <img
                    src="https://cdn-icons-png.flaticon.com/512/2/2144.png"
                    alt="Volver al menú"
                    className="w-8 h-8 object-contain"
                />
            </button>

            {/* Contenedor principal del inventario */}
            <div className="w-full max-w-[150vh] bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-blue-200 min-h-[80vh] mt-16">
                
                {/* Título */}
                <h2 className="font-['Karma_Future'] text-3xl text-blue-800 font-bold text-center mb-2">
                    Inventario de {usuario?.name || 'Usuario'}
                </h2>

                {/* Dinero del usuario */}
                <p className="text-center text-lg text-green-700 font-semibold mb-6 flex items-center justify-center gap-2">
                    Dinero actual: {usuario?.money ?? 0}
                    <img
                        src={moneda}
                        alt="Moneda"
                        className="w-6 h-6 object-contain inline-block"
                        style={{ marginLeft: '0.5rem' }}
                    />
                </p>

                {/* Botón "Vender todos los premios repetidos" */}
                <div className="flex justify-center mb-8">
                    <button
                        onClick={() => setMostrarConfirmacion(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-200 cursor-pointer"
                    >
                        Vender todos los premios repetidos
                    </button>
                </div>

                {/* Modal de confirmación */}
                {mostrarConfirmacion && (
                    <ModalConfirmarTodos quitarModal={quitarModal}/>
                )}

                {/* Premios */}
                <div className="flex flex-wrap justify-center gap-6 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-200 max-h-[70vh]">
                    <ListadoPremiosUsuario />
                </div>
            </div>
        </div>
    );
};

export default PremiosUsuario;