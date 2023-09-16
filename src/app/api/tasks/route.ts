import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const tasks = await prisma.toDo.findMany();
    return NextResponse.json({ tasks }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export const POST = async (request: Request) => {
  try {
    const newTask = await request.json();
    const { title, description, userId, status } = newTask;
    const allowedStatusValues = ["TODO", "INPROGRESS", "DONE"];

    if (
      !title ||
      !description ||
      !userId ||
      (status && !allowedStatusValues.includes(status))
    ) {
      return NextResponse.json(
        {
          error:
            "You must provide title, description, userId, and a valid status",
        },
        { status: 500 }
      );
    }

    const storedTask = await prisma.toDo.create({
      data: {
        title,
        description,
        status,
        userId,
      },
    });

    return NextResponse.json({ storedTask });
  } catch (error) {
    return NextResponse.json({ error });
  }
};
