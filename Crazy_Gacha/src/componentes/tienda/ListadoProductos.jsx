import React from 'react';
import useProveedorProdutos from '../hooks/useProveedorProductos.js';
import Producto from './Producto.jsx';

const ListadoProductos = () => {
    const { productos, productosUsuario, cargando } = useProveedorProdutos();

    return (
        <div className="relative flex-grow flex flex-col items-center justify-start">
            {cargando ? (
                <div className="flex items-center justify-center mt-32"> {/* Ajusta el margen superior */}
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
                </div>
            ) : (
                productos && productos.length > 0 && Array.isArray(productos) ? (
                    <div className="w-full">
                        {productos.map((producto) => {
                            // Buscar si el usuario tiene este producto
                            const listaUsuario = Array.isArray(productosUsuario) ? productosUsuario : [];
                            const productoUsuario = listaUsuario.find(pu => pu.id === producto.id);

                            // Si lo tiene, obtener el count del pivot, si no, 0
                            const count = productoUsuario?.pivot?.count || 0;

                            // Pasar el count como prop adicional
                            return (
                                <Producto
                                    key={producto.id}
                                    datos={producto}
                                    cantidad={count}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 mt-32"> {/* Ajusta el margen superior */}
                        No hay productos disponibles.
                    </div>
                )
            )}
        </div>
    );
};

export default ListadoProductos;