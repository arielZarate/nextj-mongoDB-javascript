//===================METODOS ====================================================

//================create===================

export const createPet = async (form, router) => {
  try {
    await fetch("http://localhost:3000/api/pets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    alert("dato creado");
    setTimeout(() => {
      router.push("/");
      router.refresh();
    }, 1200);
  } catch (error) {
    console.error(error);
  }
};

//=================================================================

//==========getPetByID=================

export const getPetByID = async (id) => {
  try {
    let res = await fetch(`http://localhost:3000/api/pets/${id}`);
    const data = await res.json();
    // console.log(data);
    setForm({
      name: data.name,
      color: data.color,
      peso: data.peso,
      age: data.age,
      type_animal: data.type_animal,
      description: data.description,
    });

    //return data;
  } catch (error) {
    console.log(error.message);
  }
};

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

    window.alert("datos actualizados... ");
    setTimeout(() => {
      router.push("/");
      router.refresh();
    }, 1500);
  } catch (error) {
    console.error(error);
  }
};
