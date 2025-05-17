import { useContext } from "react"
import { contextoProductos } from "../../contextos/ProveedorProductos.jsx"

const useProveedorProdutos = () => {
    const datosProductos = useContext(contextoProductos);

    return datosProductos;
}

export default useProveedorProdutos;