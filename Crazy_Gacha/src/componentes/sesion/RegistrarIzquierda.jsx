import React from 'react'

const RegistrarIzquierda = () => {
    return (
        <>
        <div className="px-4 md:px-0 lg:w-6/12">
            <div className="md:mx-6 md:p-12">
                {/* Logo */}
                <div className="text-center">
                    <img
                        className="mx-auto w-48"
                        src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                        alt="logo"
                    />
                    <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                        We are The Lotus Team
                    </h4>
                </div>

                <form>
                    <p className="mb-4">Please register an account</p>

                    {/* Input de correo electrónico */}
                    <TEInput
                        type="email"
                        label="Email"
                        className="mb-4"
                    ></TEInput>

                    {/* Input de username */}
                    <TEInput
                        type="text"
                        label="Username"
                        className="mb-4"
                    ></TEInput>

                    {/* Input de contraseña */}
                    <TEInput
                        type="password"
                        label="Password"
                        className="mb-4"
                    ></TEInput>

                    {/* Botón de registro */}
                    <div className="mb-12 pb-1 pt-1 text-center">
                        <TERipple rippleColor="light" className="w-full">
                            <button
                                className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                                type="button"
                                style={{
                                    background:
                                        "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                                }}
                            >
                                Sign up
                            </button>
                        </TERipple>

                        {/* Enlace de términos y condiciones */}
                        <a href="#!">Terms and conditions</a>
                    </div>

                    {/* Botón de login */}
                    <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">Have an account?</p>
                        <TERipple rippleColor="light">
                            <button
                                type="button"
                                className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                                onClick={() => { navegar('/') }}
                            >
                                Login
                            </button>
                        </TERipple>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
    }

export default RegistrarIzquierda