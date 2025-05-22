import { useState } from 'react';
import ListadoProductos from '../tienda/ListadoProductos.jsx';
import imagenHuevo from '../../resources/egg.png';

const TABS = [
    {
        key: "Clicks",
        label: "Mejoras",
        icon: "https://cdn-icons-png.flaticon.com/512/892/892692.png",
    },
    {
        key: "Egg",
        label: "Huevos",
        icon: imagenHuevo,
    }
];

const Tienda = ({onComprarHuevo, huevoPendiente}) => {
    const [tab, setTab] = useState("Clicks");

    return (
        <div className="flex-1 flex flex-col box-border min-w-0">
            <div className="border-b-4 border-black p-4 text-center box-border">
                <h2 className="font-['Karma_Future'] text-3xl">
                    TIENDA
                </h2>
            </div>
            {/* Caja de tabs */}
            <div className="flex justify-center mt-4 mb-6">
                <div className="bg-white rounded-xl shadow-md px-8 py-3 flex gap-8">
                    {TABS.map(t => (
                        <button
                            key={t.key}
                            onClick={() => setTab(t.key)}
                            className={`flex flex-col items-center px-4 py-2 rounded-lg transition cursor-pointer
                                ${tab === t.key ? "bg-blue-100 shadow font-bold" : "bg-white hover:bg-blue-50"}
                            `}
                        >
                            <img src={t.icon} alt={t.label} className="w-8 h-8 mb-1" />
                            <span>{t.label}</span>
                        </button>
                    ))}
                </div>
            </div>
            <ListadoProductos tipo={tab} onComprarHuevo={onComprarHuevo} huevoPendiente={huevoPendiente}/>
        </div>
    );
};

export default Tienda;