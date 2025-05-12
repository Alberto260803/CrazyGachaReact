import React from 'react'
import imagenMoneda from '../../resources/moneda.png';

const Tienda = () => {
    return (
        <>
        {/* Sección Derecha */}
        <div className="flex-1 flex flex-col box-border min-w-0">
                <div className="border-b-4 border-black p-4 text-center box-border">
                    <h2 className="font-['Karma_Future'] text-3xl font-black">
                        TIENDA
                    </h2>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 box-border">
                    {[1, 2, 3].map((item) => (
                        <div 
                            key={item}
                            className="flex justify-between items-center p-3 border-2 border-black rounded-lg box-border mx-2"
                        >
                            <button className="bg-[cornflowerblue] px-4 py-2 rounded-lg text-white text-lg hover:brightness-110 transition-all">
                                +1 click
                            </button>
                            
                            <div className="flex items-center gap-2">
                                <span className="text-xl font-bold">100</span>
                                <img 
                                    src={imagenMoneda} 
                                    alt="Moneda" 
                                    className="w-6 h-6"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Tienda