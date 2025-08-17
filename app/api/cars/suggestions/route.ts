import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const search = searchParams.get("search") || "";

    if (!search) {
      return NextResponse.json([]);
    }

    const suggestions = await db.car.findMany({
      where: {
        model: { contains: search, mode: "insensitive" },
      },
      select: {
        id: true,
        model: true,
        brand: true,
        category: true,
      },
      take: 10,
    });

    return NextResponse.json(suggestions);
  } catch (error) {
    console.log(`[SERVER ERROR]: ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
