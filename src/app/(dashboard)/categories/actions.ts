"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getCategories() {
  return prisma.category.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function createCategory(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    await prisma.category.create({
      data: { name },
    });
    revalidatePath("/categories");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to create category" };
  }
}

export async function getCategory(id: string) {
  return prisma.category.findUnique({ where: { id } });
}

export async function updateCategory(id: string, formData: FormData) {
  try {
    await prisma.category.update({
      where: { id },
      data: { name: formData.get("name") as string }
    });
    revalidatePath("/categories");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update category" };
  }
}

export async function toggleCategoryActive(id: string, currentStatus: boolean) {
  try {
    await prisma.category.update({
      where: { id },
      data: { isActive: !currentStatus }
    });
    revalidatePath("/categories");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
