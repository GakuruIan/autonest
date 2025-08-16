import { NextResponse } from "next/server";

import { db } from "@/lib/prisma";

export async function GET() {
  try {
    const featured = await db.car.findMany({
      where: {
        featured: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        thumbnail: {
          select: {
            url: true,
          },
        },
        model: true,
        price: true,
      },
      take: 4,
    });

    return NextResponse.json(featured);
  } catch (error) {
    console.log(`[CART ERROR]: ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
