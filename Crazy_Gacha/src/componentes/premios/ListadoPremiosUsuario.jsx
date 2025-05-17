import useProveedorPremios from '../hooks/useProveedorPremios.js';
import PremioUsuario from './PremioUsuario.jsx';

const ListadoPremiosUsuario = () => {
    const {premiosUsuario, cargando} = useProveedorPremios();
    return (
        <>
            {cargando ? (
                <div className="flex items-center justify-center h-full overflow-hidden">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
                </div>
            ) : (
                premiosUsuario && premiosUsuario.length > 0 && Array.isArray(premiosUsuario) ? (
                    premiosUsuario.map((premio) => (
                        <PremioUsuario key={premio.id} datos={premio}/>
                    ))
                ) : (
                    <div className="text-center text-gray-500">No hay premios disponibles.</div>
                )
            )}
        </>
    )
}

export default ListadoPremiosUsuario