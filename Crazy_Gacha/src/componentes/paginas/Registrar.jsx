import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegistrarIzquierda from '../sesion/RegistrarIzquierda.jsx';

const Registrar = () => {
    return (
        <>
            <section className="min-h-screen flex items-center justify-center bg-neutral-200 dark:bg-neutral-700">
                <div className="container mx-auto p-10">
                    <div className="flex flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
                        <div className="w-full max-w-6xl"> {/* Aumenta el tamaño máximo del contenedor */}
                            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                                <div className="lg:flex lg:flex-wrap">
                                    {/* Columna izquierda */}
                                    <RegistrarIzquierda/>

                                    {/* Columna derecha */}
                                    <div
                                        className="flex items-center justify-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                                        style={{
                                            background:
                                                "linear-gradient(to right, #a1c4fd, #c2e9fb)", // Cambia el gradiente a azul claro a azul oscuro
                                        }}
                                    >
                                        <div className="px-4 py-6 text-black md:mx-6 md:p-12"> {/* Cambia el color del texto a negro */}
                                            <h4 className="mb-6 text-xl font-semibold">
                                                Crazy Gacha
                                            </h4>
                                            <p className="text-sm">
                                                En Crazy Gacha, cada clic te acerca a la sorpresa. Rompe huevos de pascua para descubrir premios únicos, véndelos para conseguir monedas y mejora tu velocidad de apertura. Cuanto más juegues, más rápido progresarás, desbloqueando huevos especiales con mayores recompensas. ¡Haz crecer tu colección y optimiza tu estrategia para convertirte en el maestro del gacha!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Registrar;