"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getDepartments() {
  return prisma.department.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function createDepartment(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    await prisma.department.create({
      data: { name },
    });
    revalidatePath("/departments");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to create department" };
  }
}

export async function getDepartment(id: string) {
  return prisma.department.findUnique({ where: { id } });
}

export async function updateDepartment(id: string, formData: FormData) {
  try {
    await prisma.department.update({
      where: { id },
      data: { name: formData.get("name") as string }
    });
    revalidatePath("/departments");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update department" };
  }
}

export async function toggleDepartmentActive(id: string, currentStatus: boolean) {
  try {
    await prisma.department.update({
      where: { id },
      data: { isActive: !currentStatus }
    });
    revalidatePath("/departments");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
