import { NextResponse, NextRequest } from "next/server";

import { DeleteFromCloudinary } from "@/lib/cloudinary";

// prisma
import { db } from "@/lib/prisma";
// current user
import { currentUser } from "@/lib/current-user";

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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await currentUser();
  const { id } = params;

  try {
    if (!id) {
      return new NextResponse("Missing car id", { status: 400 });
    }

    if (!user || user.role !== "admin") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const car = await db.car.findUnique({
      where: {
        id: id,
      },
      include: {
        thumbnail: {
          select: {
            fileId: true,
          },
        },
        photos: {
          select: {
            fileId: true,
          },
        },
      },
    });

    if (!car) {
      return new NextResponse("Car not found", { status: 404 });
    }

    await DeleteFromCloudinary(car.thumbnail.fileId);

    const photos =
      car.photos?.map((photo) => photo.fileId).filter(Boolean) || [];

    if (photos.length > 0) {
      await DeleteFromCloudinary(photos);
    }

    await db.car.delete({
      where: {
        id: car.id,
      },
    });

    return NextResponse.json({ succes: true }, { status: 200 });
  } catch (error) {
    console.log(`[SERVER ERROR]: ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
