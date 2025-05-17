import useProveedorPremios from '../hooks/useProveedorPremios.js';
import useProveedorSesion from '../hooks/useProveedorSesion.js';

const ModalConfirmar = ({datos, quitarModal}) => {
    const {venderRepetidos} = useProveedorPremios();
    const {obtenerUsuario, idUsuario} = useProveedorSesion();

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 w-96 relative">
                <h2 className="text-xl font-bold text-center text-blue-800 mb-4">
                    ¿Seguro que quieres vender este premio?
                </h2>
                <div className="flex justify-center gap-4 mt-6">
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 cursor-pointer font-bold"
                        onClick={() => {
                            venderRepetidos(datos.id);
                            obtenerUsuario(idUsuario);
                            quitarModal();
                        }}
                    >
                        Sí, vender
                    </button>
                    <button
                        onClick={() => quitarModal()}
                        className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 cursor-pointer font-bold"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalConfirmar