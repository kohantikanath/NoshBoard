import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const dishes = await prisma.dish.findMany({
    orderBy: { dishId: "asc" },
  });
  return NextResponse.json(dishes);
}
