import moneda from '../../resources/moneda.png'; // Ajusta la ruta si es necesario

const rarityStyles = {
    Común:      'text-gray-500',
    Rara:       'text-green-500',
    Especial:   'text-blue-500',
    Épica:      'text-purple-500',
    Legendaria: 'text-yellow-400',
};

const DetallesPremio = ({ premio, onClose }) => {
    if (!premio) return null;

    const colorRareza = premio.rarity ? rarityStyles[premio.rarity] : rarityStyles['Común'];

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-10 w-[28rem] relative">
                {/* Imagen del premio */}
                <img
                    src={premio.image || 'https://via.placeholder.com/300'}
                    alt={premio.name || 'Premio'}
                    className="w-full h-80 object-contain mb-6"
                />

                {/* Nombre del premio */}
                <h2 className="text-3xl font-bold text-center text-blue-800 mb-4">
                    {premio.name || 'Nombre del premio'}
                </h2>

                {/* Rareza */}
                <p className={`text-center mb-2 font-semibold ${colorRareza}`}>
                    Rareza: <span className="font-bold">{premio.rarity || 'Desconocida'}</span>
                </p>

                {/* Recompensa */}
                <p className="text-center text-gray-600 mb-6 flex items-center justify-center gap-2">
                    Recompensa: 
                    <span className="font-bold">{premio.reward || 0}</span>
                    <img
                        src={moneda}
                        alt="Moneda"
                        className="w-6 h-6 object-contain inline-block"
                    />
                </p>

                {/* Botón de volver */}
                <button
                    onClick={onClose}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-600 transition-all w-full cursor-pointer"
                >
                    Volver
                </button>
            </div>
        </div>
    );
};

export default DetallesPremio;