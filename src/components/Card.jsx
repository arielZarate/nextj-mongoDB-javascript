import React from "react";

function Card({ pet }) {
  return (
    <div className="">
      <h2 className="">
        Nombre de mascota:
        <span className=" mx-3 font-bold text-orange-800 text-2xl">
          {pet.name}
        </span>
      </h2>
      <h5>
        identificador:
        <span className=" mx-3font-bold   text-green-500">{pet._id}</span>
      </h5>

      <h5>
        tipo de animal:
        <span className="mx-3 font bold text-amber-500">{pet.type_animal}</span>
      </h5>
      <p>
        peso:
        <span className="mx-3 font-bold text-blue-500">{` ${pet.peso} kg`}</span>{" "}
      </p>
      <p>
        color: <span className="mx-3 font-bold text-lime-500"> {pet.peso}</span>
      </p>

      <p>
        {pet.age === undefined ? (
          <span className="font-bold text-cyan-500">
            {" "}
            edad mascota :No data
          </span>
        ) : (
          <span className="font-bold text-pink-500">edad: {pet.age} años</span>
        )}
      </p>
      <p>
        descripcion:{" "}
        <span className="font-bold text-indigo-500">{pet.description}</span>
      </p>
    </div>
  );
}

export default Card;
