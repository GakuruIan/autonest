import { NextResponse, NextRequest } from "next/server";

import { db } from "@/lib/prisma";
import { currentUser } from "@/lib/current-user";

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();

    const { carId } = await req.json();

    if (!user) {
      return new NextResponse("Umauthorized", { status: 401 });
    }

    await db.$transaction(async (db) => {
      let cart = await db.cart.findUnique({
        where: { userId: user.id },
      });

      if (!cart) {
        cart = await db.cart.create({
          data: {
            userId: user.id,
          },
        });
      }

      return await db.cartItem.upsert({
        where: {
          cartId_carId: { cartId: cart.id, carId },
        },
        create: {
          cartId: cart.id,
          carId,
        },
        update: {
          quantity: {
            increment: 1,
          },
        },
      });
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log(`[CART ERROR]: ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const cart = await db.cart.findUnique({
      where: { userId: user.id },
      select: {
        id: true,
        userId: true,
        item: {
          where: {
            sold: false,
          },
          select: {
            quantity: true,
            id: true,
            car: {
              select: {
                thumbnail: true,
                id: true,
                price: true,
                model: true,
                category: true,
                brand: true,
              },
            },
          },
        },
      },
    });

    if (!cart) {
      if (!cart) {
        return NextResponse.json({
          id: null,
          userId: user.id,
          items: [],
          totalItems: 0,
          createdAt: null,
          updatedAt: null,
        });
      }
    }

    const totalItems = cart.item.reduce((sum, item) => sum + item.quantity, 0);

    return NextResponse.json({
      id: cart.id,
      userId: cart.userId,
      items: cart.item,
      totalItems,
    });
  } catch (error) {
    console.log(`[CART ERROR]: ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
