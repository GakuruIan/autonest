import { NextRequest, NextResponse } from "next/server";

// current user
import { currentUser } from "@/lib/current-user";

// prisma
import { db } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();

    const body = await req.json();

    const { carId } = body;

    if (!user) {
      return new NextResponse("Unauthorized", { status: 404 });
    }

    if (!carId) {
      return new NextResponse("Car ID is required", { status: 400 });
    }

    await db.wishlist.create({
      data: {
        userId: user.id,
        carId,
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.log(`[SERVER ERROR]: ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    const wishlist = await db.wishlist.findMany({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        car: {
          select: {
            id: true,
            brand: true,
            thumbnail: {
              select: {
                url: true,
              },
            },
            model: true,
            category: true,
            price: true,
          },
        },
      },
    });

    return NextResponse.json(wishlist);
  } catch (error) {
    console.log(`[SERVER ERROR]: ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
