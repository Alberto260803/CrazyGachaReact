import { useContext } from "react"
import { contextoSesion } from "../../contextos/ProveedorSesion.jsx"

const useProveedorSesion = () => {
    const datosSesion = useContext(contextoSesion);

    return datosSesion;
};

export default useProveedorSesion;