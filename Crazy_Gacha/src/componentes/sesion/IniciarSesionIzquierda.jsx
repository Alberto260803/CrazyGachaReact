import React from 'react'
import Logo from '../../resources/Logo.png'
import { TEInput, TERipple } from 'tw-elements-react'
import useProveedorSesion from '../hooks/useProveedorSesion'
import { useNavigate } from 'react-router-dom'

const IniciarSesionIzquierda = () => {
    const {iniciarSesion, datos, error, cargando, actualizarUsuario} = useProveedorSesion();
    const navegar = useNavigate(null);

    return (
        <>
            <div className="px-4 md:px-0 lg:w-6/12 flex items-center justify-center">
                <div className="md:mx-6 md:p-12 w-full">
                    <div className="text-center">
                    <img
                        className="mx-auto w-48"
                        src={Logo}
                        alt="logo"
                    />
                    </div>

                    <form>
                    <p className="mb-4">Inicia sesión</p>
                    {/* <!--Username input--> */}
                    <TEInput
                        type="text"
                        label="Nombre de usuario"
                        className="mb-4"
                        name='name'
                        onChange={(e)=>{actualizarUsuario(e)}}
                    ></TEInput>

                    {/* <!--Password input--> */}
                    <TEInput
                        type="password"
                        label="Contraseña"
                        className="mb-4"
                        name='password'
                        onChange={(e)=>{actualizarUsuario(e)}}
                    ></TEInput>

                    {/* <!--Submit button--> */}
                    <div className="mb-12 pb-1 pt-1 text-center">
                        <TERipple rippleColor="light" className="w-full">
                        <button
                            className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] cursor-pointer"
                            type="button"
                            style={{
                            background:
                                "linear-gradient(to right, #1e3a8a, #1e40af)", // Cambia el color del botón a azul oscuro
                            }}
                            onClick={() => { iniciarSesion() }}
                        >
                            Iniciar Sesión
                        </button>
                        </TERipple>

                        {/* <!--Forgot password link--> */}
                        <a href="#!">¿Te has olvidado de la contraseña?</a>
                    </div>

                    {/* <!--Register button--> */}
                    <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">¿No tienes una cuenta?</p>
                        <TERipple rippleColor="light">
                        <button
                            type="button"
                            className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-black focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                            onClick={()=>{navegar('/register')}}
                        >
                            Registrarse
                        </button>
                        </TERipple>
                    </div>
                    </form>
                    {cargando && <p>Iniciando sesión...</p>}
                    {error && <p style={{ color: "red" }}>Error: {error}</p>}
                    {Array.isArray(datos) && datos.length > 0 && (
                        <p style={{ color: "green" }}>Usuario registrado correctamente</p>
                    )}
                </div>
                </div>
        </>
    )
}

export default IniciarSesionIzquierda