import { NextRequest, NextResponse } from "next/server";

// current user
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
      return new NextResponse("Unauthorized", { status: 404 });
    }

    if (!id) {
      return new NextResponse("Missing car id", { status: 400 });
    }

    await db.wishlist.delete({
      where: {
        userId_carId: {
          carId: id,
          userId: user.id,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(`[WISHLIST ERROR]: ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
