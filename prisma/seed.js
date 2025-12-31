import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const demoUserId = "1fc93aab-d5ec-411b-ae2d-2e7df0ea9ec8";

  // Create 25 products
  await prisma.product.createMany({
    data: Array.from({ length: 25 }).map((_, i) => ({
      userId: demoUserId,
      name: `Product ${i + 1}`,
      sku: `SKU${1000 + i}`, // unique SKU
      price: Math.floor(Math.random() * 90 + 10) + 50, // random price 50–1049
      quantity: Math.floor(Math.random() * 20), // random stock 0–49
      lowStockAt: 5,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * (i * 5)),
    })),
  });

  // Fetch all products
  const products = await prisma.product.findMany();
  console.log(products);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
