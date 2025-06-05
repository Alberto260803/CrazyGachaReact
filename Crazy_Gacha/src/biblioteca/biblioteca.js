// Función para gestionar datos de manera asíncrona
const gestionarDatos = async (url, method, body = null, token = "") => {
    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
    };

    const requestOptions = {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
    };

    const response = await fetch(url, requestOptions);
    const data = await response.json();

    if (!response.ok) {
        throw data; // esto activa el catch en obtenerDatos()
    }

    return data;
};



export {gestionarDatos}