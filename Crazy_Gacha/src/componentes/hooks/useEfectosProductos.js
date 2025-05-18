const useEfectosProductos = (productosUsuario) => {
    const cursor = productosUsuario?.find(p => p.name === "+1 clic");
    const multiplicadorClics = cursor ? (cursor.pivot.count+1) : 1;

    const nido = productosUsuario?.find(p => p.name === "Nido (+1 clic/s)");
    const cantidadNido = nido ? nido.pivot.count : 0;

    return {
        multiplicadorClics,
        cantidadNido
    };
};

export default useEfectosProductos;