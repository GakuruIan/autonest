import { NextResponse, NextRequest } from "next/server";

import { currentUser } from "@/lib/current-user";

import { db } from "@/lib/prisma";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await currentUser();

    const { id } = params;

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!id) {
      return new NextResponse("Missing item is parameter", { status: 400 });
    }

    await db.$transaction(async (db) => {
      const cartItem = await db.cartItem.findUnique({
        where: {
          id,
        },
        select: {
          cart: {
            select: {
              userId: true,
            },
          },
        },
      });

      if (!cartItem) {
        return new NextResponse("Cart Item not found", { status: 404 });
      }

      if (cartItem.cart.userId !== user.id) {
        return new NextResponse("Unauthorized to delete this cart item", {
          status: 404,
        });
      }

      await db.cartItem.delete({ where: { id } });
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log(`[SERVER ERROR]: ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
