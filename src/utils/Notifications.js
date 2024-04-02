import Swal from "sweetalert2";

/* 

Esta función showNotification acepta los siguientes parámetros:

type: puede ser 'success', 'warning', 'error' o cualquier o 'info
message: El mensaje que se mostrará en la notificación.
duration: La duración en milisegundos que la notificación estará visible. Por defecto, es 3000 ms (3 segundos).
position:  Puede ser 'top', 'top-start', 'top-end', 'center', 'center-start', 'center-end', 'bottom', 'bottom-start', o 'bottom-end'. Por defecto, es 'top-end'.


*/

export const showNotification = (
  type,
  message,
  duration = 3000,
  position = "top-end"
) => {
  let icon = "";
  switch (type) {
    case "success":
      icon = "success";
      break;
    case "warning":
      icon = "warning";
      break;
    case "error":
      icon = "error";
      break;
    default:
      icon = "info";
  }

  Swal.fire({
    icon,
    text: message,
    position,
    showConfirmButton: false,
    timer: duration,
  });
};

//funcion para la confirmacion de algo , si pone aceptar o cancelar ejecutar lo que desida en el mensaje
export const showConfirmation = async (
  title = "Confirmación",
  text = "¿Estás seguro?",
  icon = "question",
  confirmButtonText = "Aceptar",
  cancelButtonText = "Cancelar"
) => {
  // la confrmacion me retorna un true o false
  // si es true yo se que debo eliminar
  return new Promise((resolve) => {
    // Crear una nueva promesa
    Swal.fire({
      title, // Título del cuadro de diálogo de confirmación
      text, // Mensaje de confirmación que se muestra debajo del título
      icon, // Ícono que se muestra junto al título (puede ser 'warning', 'error', 'success', 'info' o 'question')
      showCancelButton: true, // Indica si se debe mostrar el botón de cancelar (true para mostrar, false para ocultar)
      confirmButtonText, // Texto del botón de confirmación (normalmente es el botón 'Aceptar')
      cancelButtonText, // Texto del botón de cancelación (normalmente es el botón 'Cancelar')
    }).then((result) => {
      if (result.isConfirmed) {
        resolve(true); // Resuelve la promesa si el usuario confirma la notificación
      } else {
        resolve(false); // Resuelve la promesa si el usuario cancela la notificación
      }
    });
  });
};
