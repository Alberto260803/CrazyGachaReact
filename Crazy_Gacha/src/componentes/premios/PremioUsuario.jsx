import moneda from '../../resources/moneda.png';
import BotonesPremio from './BotonesPremio';


const PremioUsuario = ({ datos }) => {
    return (
        <>
            <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center gap-4 border border-blue-300 w-64">
                <img
                    src={datos.image || 'https://static.vecteezy.com/system/resources/previews/017/178/563/non_2x/cross-check-icon-symbol-on-transparent-background-free-png.png'}
                    alt={datos.name || 'Premio'}
                    className="w-32 h-32 object-contain rounded-lg"
                />
                <h3 className="font-['Karma_Future'] text-lg text-gray-800 text-center h-12 flex items-center justify-center">
                    {datos.name || 'Nombre del premio'}
                </h3>
                <div className="flex flex-col items-center gap-1">
                    <span className="text-gray-600 text-sm">
                        Cantidad: <span className="font-bold">{datos.pivot?.count || 0}</span>
                    </span>
                    <div className="flex items-center gap-1">
                        <span className="text-gray-600 text-sm">Precio:</span>
                        <span className="font-bold text-gray-800">{datos.reward || 0}</span>
                        <img src={moneda} alt="Moneda" className="w-5 h-5 object-contain" />
                    </div>
                </div>
                <BotonesPremio datos={datos}/>
            </div>
        </>
    );
};

export default PremioUsuario;
