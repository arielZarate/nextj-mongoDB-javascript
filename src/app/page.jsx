"use client";

import React, { useState, useEffect } from "react";
import Card from "@/components/Card";
import Link from "next/link";
import { MdEdit, MdDelete } from "react-icons/md";

//======home===============
export default function Home() {
  const [pets, setPets] = useState([]);

  const [loading, setLoading] = useState(false);

  //=====fetch data===============
  const fetchData = async () => {
    setLoading(true); // Establecer loading en true antes de la solicitud
    try {
      const res = await fetch("http://localhost:3000/api/pets");

      if (!res.ok) {
        throw new Error("Network error status 200");
      }

      const data = await res.json();
      setPets(data);
    } catch (error) {
      console.log("#######Error fetching data#######\n", error.message);
    } finally {
      setTimeout(() => {
        setLoading(false); // Establecer loading en false después de recibir los datos
      }, 1200);
    }
  };

  //useEfectt
  useEffect(() => {
    fetchData();
  }, []);

  //========handlers==========

  const handlerDelete = async (id) => {
    /* const op = window.confirm("desea eliminar este elemento ??!!");

    if (op) {
      alert("vamos a eliminar con una funcion");

      const res = fetch(`http://localhost:3000/api/pets/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(res);
      console.log(res.json());
       if (res) {
        throw new Error("Network response was not ok");
      }

      // Si la eliminación es exitosa, actualiza la lista de mascotas
      const updatedPets = pets.filter((pet) => pet._id !== id);
      setPets(updatedPets);
      alert("Elemento eliminado correctamente"); 
    }*/

    const op = window.confirm("¿Desea eliminar este elemento?");

    if (op) {
      try {
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
        const updatedPets = pets.filter((pet) => pet._id !== id);
        setPets(updatedPets);
        alert("Elemento eliminado correctamente");
      } catch (error) {
        console.error("Error al eliminar el elemento:", error.message);
      }
    }
  };

  return (
    <>
      <h1 className="font-bold text-green-700 px-4 my-5 py-2">
        crud nextjs include api of next/server with mongoDB-compass and react
        with taildwind css
      </h1>

      <div className="flex row justify-between">
        <h1 className="font-bold text-slate-700  bg-amber-500 p-3 rounded-sm">
          List Pets
        </h1>

        <Link href="/pet/form">
          <button className="font-bold text-cyan-800 bg-slate-200 rounded-lg p-3">
            add Pet
          </button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center font-bold text-2xl text-red-800">
          cargando ...
        </div>
      ) : (
        pets?.map((pet) => (
          <div
            className="bg-slate-700  rounded-e-md  p-3 my-4 gap-4"
            key={pet._id}
          >
            {/* link del edit */}
            <Link href="/pet/edit">
              <div className="flex justify-end">
                <MdEdit size={35} color="#158b25" />
              </div>
            </Link>

            {/* ============================ */}
            <Card pet={pet} />
            {/* ====================== */}

            {/* div del delete  */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  handlerDelete(pet._id);
                }}
              >
                <MdDelete size={35} color="#9c2727" />
              </button>
            </div>
            {/* ==========fin div delete========== */}
          </div>
        ))
      )}
    </>
  );
}
