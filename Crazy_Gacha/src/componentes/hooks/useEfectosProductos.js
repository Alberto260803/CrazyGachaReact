const useEfectosProductos = (productosUsuario) => {
    const cursor = productosUsuario?.find(p => p.name === "+1 clic");
    const multiplicadorClics = cursor ? (cursor.pivot.count+1) : 1;

    return {
        multiplicadorClics
    };
};

export default useEfectosProductos;