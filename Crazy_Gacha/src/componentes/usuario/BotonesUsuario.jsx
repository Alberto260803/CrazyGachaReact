import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useProveedorSesion from '../hooks/useProveedorSesion.js';
import useProveedorPremios from '../hooks/useProveedorPremios.js';
import useProveedorModoNocturno from '../hooks/useProveedorManejadores.js';

const BotonesUsuario = () => {
    const { cerrarSesion, cargando } = useProveedorSesion();
    const { obtenerPremiosUsuario } = useProveedorPremios();
    const { modoNocturno, setModoNocturno } = useProveedorModoNocturno();

    const navegar = useNavigate(null);

    const navegarInventarioUsuario = () => {
        obtenerPremiosUsuario();
        navegar('/inventario');
    };

    return (
        <>
            {/* Botones de inventario, cerrar sesión y modo nocturno */}
            <div className="flex items-center justify-center gap-4">
                {/* Ícono de inventario */}
                <img
                    src="https://cdn-icons-png.flaticon.com/512/2263/2263418.png"
                    alt="Inventario"
                    onClick={() => {
                        navegarInventarioUsuario();
                    }}
                    className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform duration-200"
                />
                {/* Botón de modo nocturno */}
                <img
                    src={
                        !modoNocturno
                            ? "https://cdn-icons-png.flaticon.com/512/3601/3601689.png" // Ícono de sol (modo diurno)
                            : "https://cdn-icons-png.flaticon.com/512/6661/6661565.png" // Ícono de luna (modo nocturno)
                    }
                    alt={modoNocturno ? "Modo diurno" : "Modo nocturno"}
                    onClick={() => setModoNocturno(!modoNocturno)}
                    className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform duration-200"
                />
                {/* Botón de cerrar sesión */}
                <div className="relative flex items-center">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/1250/1250678.png"
                        alt="Cerrar sesión"
                        onClick={() => {
                            cerrarSesion();
                        }}
                        className="w-8 h-8 cursor-pointer hover:scale-110 transition-transform duration-200"
                    />
                    {cargando && (
                        <div className="absolute left-9 top-1/2 transform -translate-y-1/2">
                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-blue-500 border-solid"></div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default BotonesUsuario;