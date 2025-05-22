import Swal from 'sweetalert2';
import useProveedorPremios from '../hooks/useProveedorPremios';
import { useEffect } from 'react';
import moneda from '../../resources/moneda.png';

const ModalConfirmarTodos = ({ quitarModal }) => {
    const { venderTodosRepetidos } = useProveedorPremios();

    useEffect(() => {
        const confirmarVenta = async () => {
            const result = await Swal.fire({
                title: "¿Seguro que quieres vender todos los premios repetidos?",
                text: "No podrás deshacer esta acción.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#22c55e",
                cancelButtonColor: "#6b7280",
                confirmButtonText: "Sí, vender todos",
                cancelButtonText: "Cancelar"
            });

            if (!result.isConfirmed) {
                quitarModal();
                return;
            }

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

            const resultado = await venderTodosRepetidos();

            Swal.close();

            if (resultado.error) {
                await Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error,
                });
                quitarModal();
                return;
            }

            const totalGeneral = resultado.vendidos.reduce((acc, v) => acc + v.totalGanado, 0);

            await Swal.fire({
            title: "Premios vendidos",
            html: `
                <div style="max-height: 300px; overflow-y: auto; margin-bottom: 1rem;">
                <table style="width:100%; text-align:left; border-collapse:collapse;">
                    <thead>
                    <tr>
                        <th style="padding: 4px 8px; word-break: break-word;">Premio</th>
                        <th style="padding: 4px 8px;">Cantidad</th>
                        <th style="padding: 4px 8px;">Ganado</th>
                    </tr>
                    </thead>
                    <tbody>
                    ${resultado.vendidos.map(
                        v => `
                        <tr>
                            <td style="padding: 4px 8px; word-break: break-word; max-width: 200px;"><b>${v.name}</b></td>
                            <td style="padding: 4px 8px;">${v.cantidadVendida}</td>
                            <td style="padding: 4px 8px;">
                            <div style="display: flex; align-items: center; gap: 4px;">
                                <b>${v.totalGanado}</b>
                                <img src="${moneda}" alt="moneda" style="width:16px;height:16px;" />
                            </div>
                            </td>
                        </tr>`
                    ).join("")}
                    </tbody>
                </table>
                </div>
                <div style="text-align: right; font-weight: bold; font-size: 1rem;">
                Total ganado: 
                <span style="display: inline-flex; align-items: center; gap: 4px;">
                    ${totalGeneral}
                    <img src="${moneda}" alt="moneda" style="width:16px;height:16px;" />
                </span>
                </div>
            `,
            icon: "success",
            confirmButtonColor: "#22c55e",
            confirmButtonText: "Cerrar",
            });

            quitarModal();
        };

        confirmarVenta();
    }, []);

    return null;
};

export default ModalConfirmarTodos;