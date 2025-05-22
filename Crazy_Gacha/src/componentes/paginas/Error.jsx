import { useNavigate } from 'react-router-dom';

const Error = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
            <div className="bg-white rounded-lg shadow-lg p-10 border border-blue-300 flex flex-col items-center">
                <h1 className="text-4xl font-bold text-blue-600 mb-4">¡Ups! Ha habido un problema</h1>
                <p className="text-lg text-gray-700 mb-8 text-center">
                    No tienes permiso para acceder a esta página o ha ocurrido un error inesperado.
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors font-semibold cursor-pointer"
                >
                    Volver al inicio
                </button>
            </div>
        </div>
    );
};

export default Error;