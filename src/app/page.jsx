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

  return (
    <div className="container mx-auto">
      <h1 className="font-bold text-green-700 px-4 mt-5 py-2 mb-24 bg-slate-100">
        crud nextjs include api of next/server with mongoDB-compass and react
        with taildwind css
      </h1>

      <Link href="/pet/form" className="flex justify-end ">
        <button className=" font-bold  w-80 bg-slate-800 text-cyan-500 rounded-lg p-3">
          Agregar Mascota
        </button>
      </Link>

      <h1 className="font-bold   text-4xl text-center text-black bg-yellow-500  p-3 rounded-sm m-4 ">
        Lista de Mascotas
      </h1>

      {loading ? (
        <div className="flex justify-center font-bold text-3xl text-gray-500 ">
          Cargando espere...
        </div>
      ) : (
        //el div debe envolver a todo para que quede como grid, NO DENTRO del map
        <div className="grid sm:grid-cols-1  md:grid-cols-2  lg:grid-cols-3 gap-3  my-3 mx-auto">
          {pets?.map((pet) => (
            <Card pet={pet} key={pet._id} />
          ))}
        </div>
      )}
    </div>
  );
}
