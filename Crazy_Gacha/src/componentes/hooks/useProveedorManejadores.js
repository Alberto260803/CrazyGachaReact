import { useContext } from "react";
import { contextoManejadores } from "../../contextos/ProveedorManejadores";

const useProveedorManejadores = () => {
    const datosManejadores = useContext(contextoManejadores);

    return datosManejadores;
};

export default useProveedorManejadores;
