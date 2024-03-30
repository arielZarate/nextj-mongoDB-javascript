import { NextResponse, NextRequest } from "next/server";
import Pet from "@/models/Pet";
//podes usar esta conexion  directa con la db o usar
//el middleware que no te pide realizar la conexion cada vez
//que usas una ruta
import dbConnect from "@/utils/cnn";
//===========RUTAS GET | POST=============

export async function GET() {
  try {
    await dbConnect();
    const pets = await Pet.find();

    //console.log(JSON.stringify(pets));

    if (!pets) {
      return NextResponse({
        message: "List the Pets not found",
        status: 404,
      });
    }
    return NextResponse.json(pets);
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export const POST = async (req, res) => {
  try {
    await dbConnect();
    const body = await req.json();

    //console.log(body);
    const newPet = new Pet(body);
    const newPetSave = await newPet.save();

    if (newPetSave) {
      //console.log(JSON.stringify(newPetSave));
      return NextResponse.json(newPetSave);
    } else {
      return NextResponse.json("Error in the created Schema Pet");
    }
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
};
