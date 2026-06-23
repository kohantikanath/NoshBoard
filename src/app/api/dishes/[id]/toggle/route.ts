import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const dish = await prisma.dish.findUnique({ where: { dishId: id } });
  if (!dish) {
    return NextResponse.json({ error: "Dish not found" }, { status: 404 });
  }

  const updated = await prisma.dish.update({
    where: { dishId: id },
    data: { isPublished: !dish.isPublished },
  });

  return NextResponse.json(updated);
}
