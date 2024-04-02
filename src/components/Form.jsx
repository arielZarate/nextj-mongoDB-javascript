"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { updatePet, createPet, handlerDelete } from "@/formActions/Actions";

//TODO: SE PUEDE HACER ASI EL FORM O USAR REACT-HOOK-FORM O VER SI EXISTE
//ALGUNA LIBREARIA DE NEXTJS
//DE MUCHAS FORMAS ES VALIDA Y HASTA SE RECOMIENDA USAR EXPRESIONES REGULARES MAS EN EL CASO DE
//PASSWORDS CUIL , TODO VALORES QUE SE DEBEN VALIDAR CON ALGUN PATRON COMO  POR JEMPLO CORREOS

function Form() {
  const [form, setForm] = useState({
    name: "",
    color: "",
    peso: "",
    age: "",
    type_animal: "",
    description: "",
  });

  const [error, setError] = useState({});
  //=============================
  const params = useParams();
  const router = useRouter();

  //============validadores inputs==============

  const validateInputs = () => {
    let errors = {};
    let isValid = true;

    if (!form.name) {
      errors.name = "El nombre es obligatorio";
      isValid = false;
    } else if (form.name.length <= 2 || form.name.length > 35) {
      errors.name = "El nombre debe ser entre 3 y un máximo 35 caracteres";
      isValid = false;
    }

    //===================
    if (!form.color) {
      errors.color = "El color es obligatorio"; // Corregido
      isValid = false;
    } else if (form.name.length > 35) {
      errors.color = "El color debe tener máximo 35 caracteres";
      isValid = false;
    }

    //===================
    if (!form.peso) {
      errors.peso = "El peso es obligatorio"; // Corregido
      isValid = false;
    } else if (isNaN(form.peso)) {
      errors.peso = "El peso debe ser numérico";
      isValid = false;
    } else if (form.peso.length > 3) {
      errors.peso = "El peso   debe tener máximo 3 digitos";
      isValid = false;
    }

    //==============
    if (!form.age) {
      errors.age = "La edad es obligatoria"; // Corregido
      isValid = false;
    } else if (isNaN(form.peso)) {
      errors.age = "la edad  debe ser numérico";
      isValid = false;
    } else if (form.age.length > 2) {
      errors.age = "La edad  debe tener máximo 2 digitos";
      isValid = false;
    } else if (form.age > 20) {
      errors.age = "La edad  maxima es de 20 años";
      isValid = false;
    }

    //====================
    if (!form.type_animal) {
      errors.type_animal = "El tipo de animal es obligatorio"; // Corregido
      isValid = false;
    } else if (form.type_animal.length > 20) {
      errors.type_animal = "El tipo de animal debe tener máximo 20 caracteres";
      isValid = false;
    }

    //==========================
    if (!form.description) {
      errors.description = "La descripción es obligatoria"; // Corregido
      isValid = false;
    } else if (form.description.length > 120) {
      errors.description = "La descripcion debe tener máximo 120 caracteres";
      isValid = false;
    }

    setError(errors); // Corregido
    return isValid;
  };

  //=======useEffect===========
  useEffect(() => {
    if (params.id) {
      //si existe el params que busque por ese params
      getPetByID();
    }
  }, []);

  //==========getPetByID=================

  const getPetByID = async () => {
    try {
      let res = await fetch(`http://localhost:3000/api/pets/${params.id}`);
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

  //========handlers==========

  //===================================================================
  const handlerSubmit = async (e) => {
    e.preventDefault();

    // console.log(form);
    //===========validamos antes de enviar==================
    if (validateInputs()) {
      if (params.id) {
        //el update para poder funcionar recibe ademar de los dos params el router
        updatePet(params.id, form, router);
      } else {
        //debo pasarle el form y el router
        createPet(form, router);
      }
    }
  };

  //==================================
  const handlerChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  //==============form=================
  return (
    <>
      <form
        onSubmit={handlerSubmit}
        //flex flex-col gap-3 border-solid border-4 border-green-300  my-24
        className="   "
      >
        <div className=" flex justify-between">
          <h1 className="font-bold text-3xl text-green-500  m-3">
            {params.id ? "Actualizar Mascota" : "Crear Mascota"}
          </h1>

          {/* Renderizar el botón de eliminar solo si params.id existe */}
          {params.id && (
            <button
              type="button"
              className="bg-red-700 text-white borde-1 rounded-md p-2 hover:cursor-pointer hover:bg-red-500 "
              onClick={() => handlerDelete(params.id, router)}
            >
              Eliminar Mascota
            </button>
          )}
        </div>

        <input
          type="text"
          name="name"
          placeholder="nombre"
          className=" bg-gray-800 border-2 w-full rounded-lg  py-2 px-2 my-3"
          onChange={handlerChange}
          value={form.name}
        />
        {error.name && <p className="text-red-500">{error.name}</p>}
        <input
          type="text"
          name="color"
          placeholder="color"
          className=" bg-gray-800 border-2 w-full rounded-lg  py-2 px-2 my-3"
          onChange={handlerChange}
          value={form.color}
        />

        {error.color && <p className="text-red-500">{error.color}</p>}

        <input
          type="text"
          name="peso"
          placeholder="peso"
          className=" bg-gray-800 border-2 w-full rounded-lg  py-2 px-2 my-3"
          onChange={handlerChange}
          value={form.peso}
        />

        {error.peso && <p className="text-red-500">{error.peso}</p>}
        <input
          type="text"
          name="age"
          placeholder="edad"
          className=" bg-gray-800 border-2 w-full rounded-lg  py-2 px-2 my-3"
          onChange={handlerChange}
          value={form.age}
        />

        {error.age && <p className="text-red-500">{error.age}</p>}
        <input
          type="text"
          name="type_animal"
          placeholder="tipo de animal"
          className=" bg-gray-800 border-2 w-full rounded-lg  py-2 px-2 my-3"
          onChange={handlerChange}
          value={form.type_animal}
        />
        {error.type_animal && (
          <p className="text-red-500">{error.type_animal}</p>
        )}
        <input
          type="text"
          name="description"
          placeholder="descripcion general del animal"
          className=" bg-gray-800 border-2 w-full rounded-lg  py-2 px-2 my-3"
          onChange={handlerChange}
          value={form.description}
        />
        {error.description && (
          <p className="text-red-500">{error.description}</p>
        )}

        <div className="flex justify-center m-3 ">
          <button
            type="submit"
            className="font bold bg-green-700 text-white w-80 text-2xl rounded-lg py-3 my-3 hover:cursor-pointer hover:bg-green-500"
          >
            {params.id ? "Actualizar" : "Agregar"}
          </button>
        </div>
      </form>
    </>
  );
}

export default Form;
