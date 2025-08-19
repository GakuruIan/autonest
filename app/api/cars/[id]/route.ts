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
    const relatedLimit = 5;

    if (!id) {
      return new NextResponse("Missing car id", { status: 400 });
    }

    const car = await db.car.update({
      where: {
        id,
      },
      data: { views: { increment: 1 } },
      include: {
        thumbnail: true,
        photos: true,
      },
    });

    let relatedCars = await db.car.findMany({
      where: {
        category: car.category,
        id: { not: car.id },
        price: {
          gte: car.price * 0.7, // 30% below current car price
          lte: car.price * 1.3, // 30% above current car price
        },
      },
      select: {
        id: true,
        model: true,
        price: true,
        thumbnail: { select: { url: true } },
      },
      orderBy: [
        { createdAt: "desc" },
        { views: "desc" }, // Popular cars first
      ],
      take: relatedLimit,
    });

    // If we don't have enough similar-priced cars, fill with any cars from same category
    if (relatedCars.length < relatedLimit) {
      const additionalCars = await db.car.findMany({
        where: {
          category: car.category,
          id: {
            not: car.id,
            notIn: relatedCars.map((c) => c.id),
          },
        },
        select: {
          id: true,
          model: true,
          price: true,
          thumbnail: { select: { url: true } },
        },
        orderBy: { createdAt: "desc" },
        take: relatedLimit - relatedCars.length,
      });

      relatedCars = [...relatedCars, ...additionalCars];
    }

    return NextResponse.json({
      car,
      related: relatedCars,
    });
  } catch (error) {
    console.log(`[SERVER ERROR]: ${error}`);
    if (error?.code === "P2025") {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

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
