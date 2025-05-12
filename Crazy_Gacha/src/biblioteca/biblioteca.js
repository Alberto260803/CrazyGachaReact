// Función para gestionar datos de manera asíncrona
const gestionarDatos = async (url, method, body = null, token = "") => {
    const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {}) // Agregar token si existe
    };

    const requestOptions = {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
    };
    
    try {
        const response = await fetch(url, requestOptions);

        if (!response.ok) {
            const errorDetails = await response.json();
            return { success: false, message: `Error: ${response.status} - ${response.statusText}`, details: errorDetails };
        } else {
            return await response.json();
        }
    } catch (error) {
        return { success: false, message: `Error: ${error.message}` };
    }
};


export {gestionarDatos}