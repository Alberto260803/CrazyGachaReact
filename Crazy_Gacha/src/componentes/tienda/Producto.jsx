import moneda from '../../resources/moneda.png';
import useProveedorProdutos from '../hooks/useProveedorProductos.js';
import useProveedorSesion from '../hooks/useProveedorSesion.js';

const Producto = ({ cantidad, datos, onComprarHuevo, huevoPendiente }) => {
    const { comprarProducto, comprando, setComprando } = useProveedorProdutos();
    const { usuario } = useProveedorSesion();
    const { id, name, price, linkImage, type } = datos;   

    const esHuevo = type === "Egg";
    const puedeComprar = usuario?.money >= price && (!esHuevo || !huevoPendiente);

    const handleComprar = async () => {
        if (!puedeComprar) return;
        setComprando(true);
        await comprarProducto(id);
        setComprando(false);
        if (type === "Egg" && onComprarHuevo) {
            onComprarHuevo(datos);
        }
    };

    return (
        <div
            className={`flex items-center justify-between p-2 md:p-6 border-b border-gray-300 transition duration-200 cursor-pointer
                ${comprando || !puedeComprar ? 'opacity-50 pointer-events-none' : 'hover:bg-gray-100'}
                ${!puedeComprar ? 'bg-gray-200' : ''}
            `}
            style={{ fontSize: '1rem' }}
            onClick={() => {
                puedeComprar && !comprando && handleComprar();
            }}
        >
            <div className="flex items-center gap-2 md:gap-8">
                <img
                    src={linkImage}
                    alt={name}
                    className="w-12 h-12 md:w-20 md:h-20 object-contain"
                    style={{ filter: !puedeComprar ? 'grayscale(100%)' : 'none' }}
                />
                <div>
                    <h3 className="text-lg md:text-2xl font-['Karma_Future']">{name}</h3>
                    <div className="flex items-center gap-1 md:gap-2">
                        <span className="text-base md:text-lg text-gray-700 font-['Karma_Future']">{price}</span>
                        <img
                            src={moneda}
                            alt="Moneda"
                            className="w-4 h-4 md:w-6 md:h-6 object-contain"
                        />
                    </div>
                </div>
            </div>
            <div className="text-lg md:text-2xl text-gray-800 font-['Karma_Future']">
                {type === "Egg" ? "" : cantidad}
            </div>
        </div>
    );
};

export default Producto;