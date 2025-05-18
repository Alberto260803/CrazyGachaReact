import React from 'react';
import useProveedorProdutos from '../hooks/useProveedorProductos.js';
import Producto from './Producto.jsx';

const ListadoProductos = ({ tipo, onComprarHuevo }) => {
    const { productos, productosUsuario, cargando } = useProveedorProdutos();

    // Filtrar productos por tipo
    const productosFiltrados = productos?.filter(p => p.type === tipo) || [];

    return (
        <div className="relative flex-grow flex flex-col items-center justify-start">
            {cargando ? (
                <div className="flex items-center justify-center mt-32">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
                </div>
            ) : (
                productosFiltrados.length > 0 ? (
                    <div className="w-full">
                        {productosFiltrados.map((producto) => {
                            const listaUsuario = Array.isArray(productosUsuario) ? productosUsuario : [];
                            const productoUsuario = listaUsuario.find(pu => pu.id === producto.id);
                            const count = productoUsuario?.pivot?.count || 0;
                            return (
                                <Producto
                                    key={producto.id}
                                    datos={producto}
                                    cantidad={count}
                                    onComprarHuevo={onComprarHuevo}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 mt-32">
                        No hay productos disponibles.
                    </div>
                )
            )}
        </div>
    );
};

export default ListadoProductos;