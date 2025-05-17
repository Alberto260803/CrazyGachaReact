import { useState, useContext } from "react";
import { contextoAudio } from "../../contextos/ProveedorAudio";
import useProveedorManejadores from "../hooks/useProveedorManejadores";

const ControlVolumen = () => {
    const { audioRef } = useContext(contextoAudio);
    const {volumen, setVolumen} = useProveedorManejadores();

    const handleChange = (e) => {
        const value = Number(e.target.value);
        setVolumen(value);
        if (audioRef.current) {
            audioRef.current.volume = value;
        }
    };

    return (
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/80 rounded-lg px-3 py-1 shadow z-10">
            <img
                src="https://cdn-icons-png.flaticon.com/512/483/483365.png"
                alt="volumen"
                className="w-5 h-5"
            />
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volumen}
                onChange={handleChange}
                className="w-24 accent-blue-500"
            />
        </div>
    );
};

export default ControlVolumen;