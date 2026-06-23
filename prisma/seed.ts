import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

const dishes = [
  {
    dishId: "1",
    dishName: "Jeera Rice",
    imageUrl: "https://nosh-assignment.s3.ap-south-1.amazonaws.com/jeera-rice.jpg",
    isPublished: true,
  },
  {
    dishId: "2",
    dishName: "Paneer Tikka",
    imageUrl: "https://nosh-assignment.s3.ap-south-1.amazonaws.com/paneer-tikka.jpg",
    isPublished: true,
  },
  {
    dishId: "3",
    dishName: "Rabdi",
    imageUrl: "https://nosh-assignment.s3.ap-south-1.amazonaws.com/rabdi.jpg",
    isPublished: true,
  },
  {
    dishId: "4",
    dishName: "Chicken Biryani",
    imageUrl: "https://nosh-assignment.s3.ap-south-1.amazonaws.com/chicken-biryani.jpg",
    isPublished: true,
  },
  {
    dishId: "5",
    dishName: "Alfredo Pasta",
    imageUrl: "https://nosh-assignment.s3.ap-south-1.amazonaws.com/alfredo-pasta.jpg",
    isPublished: true,
  },
];

async function main() {
  for (const dish of dishes) {
    await prisma.dish.upsert({
      where: { dishId: dish.dishId },
      update: {},
      create: dish,
    });
  }
  console.log("Seeded 5 dishes.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
