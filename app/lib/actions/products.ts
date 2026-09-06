"use server";

import { redirect } from "next/navigation";
import { getCurrentUser } from "../aut";
import { prisma } from "../prisma";
import { z } from "zod";

const ProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.coerce.number().nonnegative("Price must be non-negative"),
  quantity: z.coerce.number().int().min(0, "Quantity must be non-negative"),
  sku: z.string().optional(),
  lowStockAt: z.coerce.number().min(0).optional(),
});

export async function deleteProducts(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const id = String(formData.get("id") || "");

  await prisma.product.deleteMany({
    where: {
      id,
      userId: user.id,
    },
  });

  redirect("/inventory");
}

export async function createProducts(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const parsed = ProductSchema.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    quantity: formData.get("quantity"),
    sku: formData.get("sku") || undefined,
    lowStockAt:
      formData.get("lowStockAt") === ""
        ? undefined
        : formData.get("lowStockAt"),
  });

  if (!parsed.success) {
    console.log(parsed.error.flatten().fieldErrors);
    throw new Error("Validation failed");
  }

  await prisma.product.create({
    data: {
      ...parsed.data,
      userId: user.id,
    },
  });

  redirect("/inventory");
}
