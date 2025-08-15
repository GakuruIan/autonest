import { NextResponse, NextRequest } from "next/server";

import { db } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return new NextResponse("Missing car id", { status: 400 });
    }

    const car = await db.car.findUnique({
      where: { id },
      include: {
        thumbnail: true,
        photos: true,
      },
    });

    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    return NextResponse.json(car);
  } catch (error) {
    console.log(`[SERVER ERROR]: ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
