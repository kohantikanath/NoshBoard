import Dashboard from "@/components/Dashboard";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  const dishes = await prisma.dish.findMany({ orderBy: { dishId: "asc" } });
  return <Dashboard initialDishes={dishes} />;
}
