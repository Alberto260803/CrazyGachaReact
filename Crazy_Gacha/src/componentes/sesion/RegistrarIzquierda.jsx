import React, { useState } from 'react';
import useProveedorSesion from '../hooks/useProveedorSesion.js';
import { TEInput, TERipple } from 'tw-elements-react';
import Logo from '../../resources/Logo.png';
import { useNavigate } from 'react-router-dom';

const RegistrarIzquierda = () => {
    const { actualizarUsuario, registrarUsuario, datos, cargando, error } = useProveedorSesion();
    const navegar = useNavigate(null);

    // Estado para controlar la visibilidad de la contraseña
    const [mostrarContrasena, setMostrarContrasena] = useState(false);

    return (
        <>
            <div className="px-4 md:px-0 lg:w-6/12 flex items-center justify-center">
                <div className="md:mx-6 md:p-12 w-full">
                    {/* Logo */}
                    <div className="text-center">
                        <img
                            className="mx-auto w-48"
                            src={Logo}
                            alt="logo"
                        />
                    </div>

                    <form>
                        <p className="mb-4">Registra tu cuenta</p>

                        {/* Input de correo electrónico */}
                        <TEInput
                            type="email"
                            label="Correo electrónico"
                            className="mb-4"
                            name="email"
                            onChange={(e) => { actualizarUsuario(e) }}
                        ></TEInput>

                        {/* Input de username */}
                        <TEInput
                            type="text"
                            label="Nombre de usuario"
                            className="mb-4"
                            name="name"
                            onChange={(e) => { actualizarUsuario(e) }}
                        ></TEInput>

                        {/* Input de contraseña con toggle de visibilidad */}
                        <div className="relative mb-4">
                            <TEInput
                                type={mostrarContrasena ? "text" : "password"}
                                label="Contraseña"
                                className="w-full"
                                name="password"
                                onChange={(e) => { actualizarUsuario(e) }}
                            ></TEInput>
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                onClick={() => setMostrarContrasena(!mostrarContrasena)}
                            >
                                {mostrarContrasena ? (
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/94/94674.png"
                                        alt="Ojo abierto"
                                        className="h-5 w-5"
                                    />
                                ) : (
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/829/829117.png"
                                        alt="Ojo cerrado"
                                        className="h-5 w-5"
                                    />
                                )}
                            </button>
                        </div>

                        {/* Botón de registro */}
                        <div className="mb-12 pb-1 pt-1 text-center">
                            <TERipple rippleColor="light" className="w-full">
                                <button
                                    className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] cursor-pointer"
                                    type="button"
                                    style={{
                                        background:
                                            "linear-gradient(to right, #1e3a8a, #1e40af)", // Cambia el color del botón a azul oscuro
                                    }}
                                    onClick={() => { registrarUsuario() }}
                                >
                                    Registrarse
                                </button>
                            </TERipple>
                        </div>

                        {/* Botón de login */}
                        <div className="flex items-center justify-between pb-6">
                            <p className="mb-0 mr-2">¿Ya tienes una cuenta?</p>
                            <TERipple rippleColor="light">
                                <button
                                    type="button"
                                    className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-black focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                                    onClick={() => { navegar('/login') }}
                                >
                                    Iniciar sesión
                                </button>
                            </TERipple>
                        </div>
                        {cargando && <p>Registrando usuario...</p>}
                        {error && <p style={{ color: "red" }}>Error: {error}</p>}
                        {Array.isArray(datos) && datos.length > 0 && (
                            <p style={{ color: "green" }}>Usuario registrado correctamente</p>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
}

export default RegistrarIzquierda;