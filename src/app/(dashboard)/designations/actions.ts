"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getDesignations() {
  return prisma.designation.findMany({
    orderBy: { createdAt: "desc" },
    include: { department: true }
  });
}

export async function getDepartments() {
  return prisma.department.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" }
  });
}

export async function createDesignation(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const departmentId = formData.get("departmentId") as string;
    await prisma.designation.create({
      data: { name, departmentId },
    });
    revalidatePath("/designations");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to create designation" };
  }
}

export async function getDesignation(id: string) {
  return prisma.designation.findUnique({ where: { id } });
}

export async function updateDesignation(id: string, formData: FormData) {
  try {
    await prisma.designation.update({
      where: { id },
      data: { 
        name: formData.get("name") as string,
        departmentId: formData.get("departmentId") as string
      }
    });
    revalidatePath("/designations");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update designation" };
  }
}

export async function toggleDesignationActive(id: string, currentStatus: boolean) {
  try {
    await prisma.designation.update({
      where: { id },
      data: { isActive: !currentStatus }
    });
    revalidatePath("/designations");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
