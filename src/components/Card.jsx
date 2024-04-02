import React from "react";
import Link from "next/link";
function Card({ pet }) {
  return (
    <Link href={`/pet/${pet._id}`}>
      <div className="bg-gray-800 py-3  px-5 rounded-lg hover:bg-gray-700 hover:cursor-pointer ">
        <h2 className="">
          Nombre de mascota:
          <span className=" mx-2 font-bold text-gray-300 py-2">{pet.name}</span>
        </h2>
        <h5>
          id:
          <span className=" mx-3  text-green-400 py-2">{pet._id}</span>
        </h5>

        <h5>
          tipo de animal:
          <span className="mx-3  text-gray-400 py-2">{pet.type_animal}</span>
        </h5>
        <p>
          peso:
          <span className="mx-3  text-gray-400 py-2">{` ${pet.peso} kg`}</span>{" "}
        </p>
        <p>
          color: <span className="mx-3  text-gray-400 py-2"> {pet.color}</span>
        </p>

        <p className="">
          {pet.age === undefined ? (
            <span className="  text-gray-400 py-2">edad mascota :No data</span>
          ) : (
            <p className=" ">
              Edad:
              <span className=" mx-2 text-gray-400 py-2">{`${pet.age} años`}</span>{" "}
            </p>
          )}
        </p>
        <p>
          descripcion:
          <span className="mx-2  text-gray-400 py-2">{pet.description}</span>
        </p>
      </div>
    </Link>
  );
}

export default Card;
