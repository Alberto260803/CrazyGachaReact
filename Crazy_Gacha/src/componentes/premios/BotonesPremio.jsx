import { useState } from "react";
import DetallesPremio from './DetallesPremio.jsx';
import ModalConfirmar from "./ModalConfirmar.jsx";

const BotonesPremio = ({datos}) => {
    const [mostrarDetalles, setMostrarDetalles] = useState(false);
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

    const quitarModal = () => {
        setMostrarConfirmacion(false);
    }
    return (
        <>
            <div className="flex gap-2 mt-auto">
                <button
                    onClick={() => setMostrarDetalles(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-600 transition-all duration-200 cursor-pointer"
                >
                    Detalle
                </button>
                <button
                    onClick={() => setMostrarConfirmacion(true)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-600 transition-all duration-200 cursor-pointer"
                >
                    Vender repetidos
                </button>
            </div>
            {mostrarDetalles && (
                <DetallesPremio
                    premio={datos}
                    onClose={() => setMostrarDetalles(false)}
                />
            )}

            {/* Modal de confirmación */}
            {mostrarConfirmacion && (
                <ModalConfirmar quitarModal={quitarModal} datos={datos}/>
            )}
        </>
    )
}

export default BotonesPremio