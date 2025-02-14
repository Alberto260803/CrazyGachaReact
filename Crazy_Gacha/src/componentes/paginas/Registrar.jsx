import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TEInput, TERipple } from 'tw-elements-react';

const Registrar = () => {
    const navegar = useNavigate(null);

    return (
        <>
            <section className="h-full bg-neutral-200 dark:bg-neutral-700">
                <div className="container h-full p-10">
                    <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
                        <div className="w-full">
                            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                                <div className="g-0 lg:flex lg:flex-wrap">
                                    {/* Columna izquierda */}
                                    

                                    {/* Columna derecha */}
                                    <div
                                        className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                                        style={{
                                            background:
                                                "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                                        }}
                                    >
                                        <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                                            <h4 className="mb-6 text-xl font-semibold">
                                                We are more than just a company
                                            </h4>
                                            <p className="text-sm">
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                                                sed do eiusmod tempor incididunt ut labore et dolore magna
                                                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                                ullamco laboris nisi ut aliquip ex ea commodo consequat.
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