
export function carga() {
    Swal.fire({
        title: "¡Movimiento cargado!",
        text: "Se ha cargado con éxito el nuevo movimiento.",
        icon: "success",
        confirmButtonText: "Ok"
    });
}

export async function eliminar() {
    const {isConfirmed} = await Swal.fire({
        title: "¿Confirma que desea eliminar este elemento?",
        text: "Se eliminará el elemento seleccionado",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar",
        cancelButtonText: "cancelar"
    });
    return isConfirmed
}

export function eliminadoConfirmacion() {
    Swal.fire({
        title: "¡Movimiento Eliminado!",
        text: "Se ha eliminado el movimiento seleccionado.",
        icon: "success",
        confirmButtonText: "Ok"
    });
}