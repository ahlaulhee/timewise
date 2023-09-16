import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    const tasks = await prisma.toDo.findMany({
      where: {
        userId: userId,
      },
    });
    if (tasks.length === 0)
      return NextResponse.json(
        { error: "This user has no tasks" },
        { status: 404 }
      );
    return NextResponse.json({ tasks }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
