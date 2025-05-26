import imagenUsuario from '../../resources/usuario.png';
import moneda from '../../resources/moneda.png';
import useProveedorSesion from '../hooks/useProveedorSesion.js';
import BotonesUsuario from '../usuario/BotonesUsuario.jsx';

const Usuario = () => {
    const { usuario } = useProveedorSesion();

    // Si usuario es null o undefined, muestra un loader o un fallback
    if (!usuario) {
        return (
            <div className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-4 border border-blue-300 w-64 fixed top-4 left-4 z-50">
                <span className="text-gray-500">Cargando usuario...</span>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-4 border border-blue-300 w-64 fixed top-4 left-4 z-50">
            {/* Sección superior: Imagen, saludo y dinero */}
            <div className="flex items-center gap-4">
                <img 
                    src={imagenUsuario} 
                    alt="Usuario" 
                    className="w-16 h-16 object-contain rounded-full border-2 border-blue-400"
                />
                <div className="flex flex-col">
                    <span className="font-['Karma-Future'] text-lg text-gray-800">
                        Hola, {usuario.name || "Usuario"}
                    </span>
                    <div className="flex items-center gap-2">
                        <span className="font-['Karma-Future'] text-md text-gray-800">
                            {usuario.money ?? 0}
                        </span>
                        <img 
                            src={moneda} 
                            alt="Moneda" 
                            className="w-6 h-6 object-contain"
                        />
                    </div>
                </div>
            </div>
            <BotonesUsuario/>
        </div>
    );
};

export default Usuario;