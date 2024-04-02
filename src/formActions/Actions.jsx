//===================METODOS ====================================================

//================create===================
import { showNotification, showConfirmation } from "@/utils/Notifications";

export const createPet = async (form, router) => {
  try {
    await fetch("http://localhost:3000/api/pets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    showNotification("success", "Mascota creada con exito", 3000, "top-end");
    setTimeout(() => {
      router.push("/");
      router.refresh();
    }, 1200);
  } catch (error) {
    console.error(error);
  }
};

//=================================================================

export const handlerDelete = async (id, router) => {
  try {
    //const op = window.confirm("¿Desea eliminar este elemento?");
    const op = await showConfirmation(
      "¿Desea eliminar este elemento Mascota?",
      "Estas seguro que desea Eliminar??"
    );

    if (op) {
      const res = await fetch(`http://localhost:3000/api/pets/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      // Si la eliminación es exitosa, actualiza la lista de mascotas en la lista
      //esto sirve si no hay bd y todo pasa en memoria pero como teng bd refresco la pagina
      //const updatedPets = pets.filter((pet) => pet._id !== id);
      //setPets(updatedPets);
      // alert("Elemento eliminado correctamente");

      showNotification(
        "info",
        "Elemento mascota Eliminado ",
        2000,
        "bottom-start"
      );

      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 1200);
    } else {
      // El usuario canceló la notificación
      // console.log("El usuario canceló la notificación");
      showNotification("info", "Se cancelo la operacion", 1300, "bottom-start");
    }
  } catch (error) {
    console.error("Error al eliminar el elemento:", error.message);
    showNotification(
      "error",
      "Error al eliminar el elemento",
      1300,
      "bottom-start"
    );
  }
};

//========================================
//==============updated====================

export const updatePet = async (id, form, router) => {
  try {
    await fetch(`http://localhost:3000/api/pets/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    showNotification("info", "Mascota actualizada", 3000, "bottom-end");
    setTimeout(() => {
      router.push("/");
      router.refresh();
    }, 1500);
  } catch (error) {
    console.error(error);
  }
};
