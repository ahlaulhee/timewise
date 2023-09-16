import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    const taskData = await request.json();
    const { title, description, status, timespent } = taskData;
    if (!Number.isInteger(id)) {
      return NextResponse.json(
        { error: "Id must be an integer" },
        { status: 400 }
      );
    }

    if (!title || !description || !status || !timespent) {
      return NextResponse.json(
        { error: "You must provide Title, Description, Status and Time Spent" },
        { status: 400 }
      );
    }

    const updatedTask = await prisma.toDo.update({
      data: {
        title,
        description,
        status,
        timeSpent: timespent,
      },
      where: {
        id: id,
      },
    });
    return NextResponse.json({ updatedTask }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    if (!Number.isInteger(id)) {
      return NextResponse.json(
        { error: "Id must be an integer" },
        { status: 400 }
      );
    }
    const deletedTask = await prisma.toDo.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json({ deletedTask }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
