import { useContext } from "react";
import { contextoAudio } from "../../contextos/ProveedorAudio.jsx";

const useProveedorAudio = () => {
    const datosAudio = useContext(contextoAudio);

    return datosAudio;
};

export default useProveedorAudio;