import ListadoProductos from '../tienda/ListadoProductos.jsx';

const Tienda = () => {
    return (
        <>
        {/* Sección Derecha */}
        <div className="flex-1 flex flex-col box-border min-w-0">
                <div className="border-b-4 border-black p-4 text-center box-border">
                    <h2 className="font-['Karma_Future'] text-3xl">
                        TIENDA
                    </h2>
                </div>

                <ListadoProductos />
            </div>
        </>
    )
}

export default Tienda