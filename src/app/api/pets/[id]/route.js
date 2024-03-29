import { NextResponse, NextRequest } from "next/server";

export function GET(request, { params }) {
  try {
    console.log(params.id);
    /*   const taskFound = await Task.findById(params.id);

    if (!taskFound)*/
    // return NextResponse.json(`pest by id ${params.id}`);
    return NextResponse.json(`obteniendo  pets x id: ${params.id} `);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export function PUT(request, { params }) {
  return NextResponse.json(`update by id  ${params.id}`);
}
export function DELETE(request, { params }) {
  const id = params.id;
  //console.log(req.params.id);
  return NextResponse.json(`DELETE by id  ${id}`);
}

/* export const DELETE = (req, { params }, res) => {
  return NextResponse.json(`Deleting by id ${params}`);
};
export const PUT = (req, { params }, res) => {
  return NextResponse.json(`updateing by id ${params}`);
};
 */

/* 

import Task from "@/models/Task";
import { dbConnect } from "@/utils/mongoose";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  dbConnect();
  try {
    const taskFound = await Task.findById(params.id);

    if (!taskFound)
      return NextResponse.json(
        {
          message: "Task not found",
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(taskFound);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export async function PUT(request, { params }) {
  const body = await request.json();
  dbConnect();

  try {
    const taskUpdated = await Task.findByIdAndUpdate(params.id, body, {
      new: true,
    });

    if (!taskUpdated)
      return NextResponse.json(
        {
          message: "Task not found",
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(taskUpdated);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

export async function DELETE(request, { params }) {
  dbConnect();

  try {
    const taskDeleted = await Task.findByIdAndDelete(params.id);

    if (!taskDeleted)
      return NextResponse.json(
        {
          message: "Task not found",
        },
        {
          status: 404,
        }
      );

    return NextResponse.json(taskDeleted);
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400,
    });
  }
}

*/
