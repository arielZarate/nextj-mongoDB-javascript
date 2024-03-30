"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
function Form() {
  const [form, setForm] = useState({
    name: "",
    color: "",
    peso: "",
    age: "",
    type_animal: "",
    description: "",
  });

  //=============================
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    if (params.id) {
      //si existe el params que busque por ese params
      getPetByID();
    }
  }, []);

  //=======================================
  const handlerSubmit = async (e) => {
    e.preventDefault();

    if (params.id) {
      updatePet();
    } else {
      createPet();
    }
  };

  //==============updated====================
  const updatePet = async () => {
    try {
      await fetch(`http://localhost:3000/api/pets/${params.id}`, {
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

  //===========================

  const getPetByID = async () => {
    try {
      let res = await fetch(`http://localhost:3000/api/pets/${params.id}`);
      const data = await res.json();
      console.log(data);
      setForm({
        name: data.name,
        color: data.color,
        peso: data.peso,
        age: data.age,
        type_animal: data.type_animal,
        description: data.description,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  //================create===================

  const createPet = async () => {
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

  //==================================
  const handlerChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  //===============================
  return (
    <>
      <form
        onSubmit={handlerSubmit}
        className=" container w-100 flex flex-col gap-3 border-solid border-4 border-green-300  my-24  "
      >
        <h1 className="font-bold text-2xl text-green-500  m-3">
          {params.id ? "Update Pet" : "Create Pet"}
        </h1>

        <input
          type="text"
          name="name"
          placeholder="nombre"
          className=" text-black rounded-lg  py-1 px-2 m-3"
          onChange={handlerChange}
          value={form.name}
        />
        <input
          type="text"
          name="color"
          placeholder="color"
          className="font-bold text-black rounded-lg  py-1 px-2 m-3"
          onChange={handlerChange}
          value={form.color}
        />
        <input
          type="text"
          name="peso"
          placeholder="peso"
          className="font-bold text-black rounded-lg py-1 px-2 m-3"
          onChange={handlerChange}
          value={form.peso}
        />
        <input
          type="text"
          name="age"
          placeholder="edad"
          className="font-bold text-black rounded-lg py-1 px-2 m-3"
          onChange={handlerChange}
          value={form.age}
        />
        <input
          type="text"
          name="type_animal"
          placeholder="tipo de animal"
          className="font-bold text-black rounded-lg py-1 px-2 m-3"
          onChange={handlerChange}
          value={form.type_animal}
        />
        <input
          type="text"
          name="description"
          placeholder="descripcion general del animal"
          className="font-bold text-black rounded-lg py-1 px-2 m-3"
          onChange={handlerChange}
          value={form.description}
        />

        <div className="flex justify-center m-3 ">
          <button
            type="submit"
            className="font bold  text-green-500  text-2xl bg-slate-700 w-40 rounded-lg py-3"
          >
            {params.id ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </>
  );
}

export default Form;
