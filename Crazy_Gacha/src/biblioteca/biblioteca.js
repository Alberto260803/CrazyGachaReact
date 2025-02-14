const obtenerDatos = (url, opcionesRequest) => {
    return fetch(url, opcionesRequest)
    .then((respuesta)=>{
        return respuesta.json();
    })
    .then((datos)=>{
        return datos;
    })
    .catch((error)=>{
        setError(error);
    });
}

export {obtenerDatos}