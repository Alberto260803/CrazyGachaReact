import { useContext } from "react"
import { contextoPremios } from "../../contextos/ProveedorPremios.jsx"

const useProveedorPremios = () => {
    const datosPremios = useContext(contextoPremios);

    return datosPremios;
};

export default useProveedorPremios;