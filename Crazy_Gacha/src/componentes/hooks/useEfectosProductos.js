const useEfectosProductos = (productosUsuario) => {
    const cursor = productosUsuario?.find(p => p.name === "+1 clic");
    const multiplicadorClics = cursor ? (cursor.pivot.count+1) : 1;

    // Suma todos los productos automáticos
    const nido = productosUsuario?.find(p => p.name === "Nido (+1 clic/s)");
    const granja = productosUsuario?.find(p => p.name === "Granja de huevos (+5 clics/s)");
    const fabrica = productosUsuario?.find(p => p.name === "Fábrica de huevos (+10 clics/s)");
    const planeta = productosUsuario?.find(p => p.name === "Planeta (+50 clics/s)");

    const cantidadNido = nido ? nido.pivot.count : 0;
    const cantidadGranja = granja ? granja.pivot.count : 0;
    const cantidadFabrica = fabrica ? fabrica.pivot.count : 0;
    const cantidadPlaneta = planeta ? planeta.pivot.count : 0;

    // Suma total de clics automáticos por segundo
    const clicsAutomaticos = 
        cantidadNido * 1 +
        cantidadGranja * 5 +
        cantidadFabrica * 10 +
        cantidadPlaneta * 50;

    const critico = productosUsuario?.find(p => p.name === "+10% golpe crítico (+5 clics)");
    const cantidadCritico = critico ? critico.pivot.count : 0;

    return {
        multiplicadorClics,
        clicsAutomaticos,
        cantidadCritico
    };
};

export default useEfectosProductos;