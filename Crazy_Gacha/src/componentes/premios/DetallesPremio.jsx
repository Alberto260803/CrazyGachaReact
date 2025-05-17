import React from 'react';

const DetallesPremio = ({ premio, onClose }) => {
    if (!premio) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 w-96 relative">
                {/* Imagen del premio */}
                <img
                    src={premio.image || 'https://via.placeholder.com/300'}
                    alt={premio.name || 'Premio'}
                    className="w-full h-64 object-contain mb-4"
                />

                {/* Nombre del premio */}
                <h2 className="text-2xl font-bold text-center text-blue-800 mb-4">
                    {premio.name || 'Nombre del premio'}
                </h2>

                {/* Rareza */}
                <p className="text-center text-gray-600 mb-2">
                    Rareza: <span className="font-bold">{premio.rarity || 'Desconocida'}</span>
                </p>

                {/* Recompensa */}
                <p className="text-center text-gray-600 mb-4">
                    Recompensa: <span className="font-bold">{premio.reward || 0}</span>
                </p>

                {/* Botón de volver */}
                <button
                    onClick={onClose}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-600 transition-all w-full"
                >
                    Volver
                </button>
            </div>
        </div>
    );
};

export default DetallesPremio;