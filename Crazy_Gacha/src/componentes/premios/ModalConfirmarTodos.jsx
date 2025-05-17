import Swal from 'sweetalert2';
import useProveedorPremios from '../hooks/useProveedorPremios';
import { useEffect } from 'react';

const ModalConfirmarTodos = ({ quitarModal }) => {
    const { venderTodosRepetidos } = useProveedorPremios();

    useEffect(() => {
        Swal.fire({
            title: "¿Seguro que quieres vender todos los premios repetidos?",
            text: "No podrás deshacer esta acción.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#22c55e",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Sí, vender todos",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                // Animación de carga
                Swal.fire({
                    title: "Vendiendo...",
                    html: `<div class="flex justify-center items-center">
                              <span class="animate-spin inline-block w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full"></span>
                           </div>
                           <p class="mt-4">Procesando venta...</p>`,
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                });

                const error = await venderTodosRepetidos();

                if (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: error,
                    }).then(() => {
                        quitarModal();
                    });
                } else {
                    Swal.fire({
                        title: "¡Vendidos!",
                        text: "Todos los premios repetidos han sido vendidos.",
                        icon: "success",
                        confirmButtonColor: "#22c55e"
                    }).then(() => {
                        quitarModal();
                    });
                }
            } else {
                quitarModal();
            }
        });
    }, []);

    return null;
};

export default ModalConfirmarTodos;