import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/utils/cnn";
import Pet from "@/models/Pet";

export async function GET(request, { params }) {
  try {
    await dbConnect();

    //TODO: mongodb espera un BbjectId
    const id = new mongoose.Types.ObjectId(params.id);
    const PetFound = await Pet.findById(id);

    //console.log(PetFound);
    if (!PetFound) {
      return NextResponse.json(`Pet by id ${params.id} NOT Found`);
    }
    return NextResponse.json(PetFound);
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ error: error.message });
  }
}

export async function PUT(request, { params }) {
  dbConnect();
  let id = new mongoose.Types.ObjectId(params.id);
  let body = await request.json();

  // console.log(id, body);
  try {
    const PetUpdated = await Pet.findByIdAndUpdate(id, body, {
      //devuelve el nuevo objeto actualizado
      new: true,
    });

    console.log(PetUpdated);
    if (!PetUpdated)
      return NextResponse.json(
        {
          message: "Pet not found",
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(PetUpdated);
  } catch (error) {
    // throw error.message;
    console.log(error.message);
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
export async function DELETE(request, { params }) {
  dbConnect();
  let id = new mongoose.Types.ObjectId(params.id);
  // let body = await request.json();

  try {
    const PetDeleted = await Pet.findByIdAndDelete(id);

    console.log(PetDeleted);
    if (!PetDeleted) {
      return NextResponse.json({
        message: "Pet NOT delete",
        status: 400,
      });
    }
    return NextResponse.json(PetDeleted);
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}
