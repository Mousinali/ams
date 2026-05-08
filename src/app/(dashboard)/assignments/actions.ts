"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAssignments(search = "", page = 1, pageSize = 10) {
  const where = search
    ? {
        OR: [
          { asset: { name: { contains: search, mode: "insensitive" as const } } },
          { employee: { name: { contains: search, mode: "insensitive" as const } } },
          { employee: { employeeId: { contains: search, mode: "insensitive" as const } } },
        ],
      }
    : {};

  const [assignments, total] = await Promise.all([
    prisma.assignment.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { assignedAt: "desc" },
      include: {
        asset: true,
        employee: {
          include: { department: true }
        }
      }
    }),
    prisma.assignment.count({ where }),
  ]);

  return { assignments, total };
}

export async function getAvailableAssets() {
  return prisma.asset.findMany({
    where: { status: "AVAILABLE", isActive: true },
    orderBy: { name: "asc" }
  });
}

export async function getEmployeesForAssignment() {
  return prisma.employee.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
    include: { department: true }
  });
}

export async function createAssignment(formData: FormData) {
  try {
    const assetId = formData.get("assetId") as string;
    const employeeId = formData.get("employeeId") as string;

    await prisma.$transaction([
      prisma.assignment.create({
        data: {
          assetId,
          employeeId,
        }
      }),
      prisma.asset.update({
        where: { id: assetId },
        data: { status: "ASSIGNED" }
      })
    ]);

    revalidatePath("/assignments");
    revalidatePath("/assets");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function getAssignment(id: string) {
  return prisma.assignment.findUnique({
    where: { id },
    include: {
      asset: true,
      employee: true
    }
  });
}

export async function returnAsset(assignmentId: string, assetId: string, formData: FormData) {
  try {
    const returnReason = formData.get("returnReason") as string;
    const returnNotes = formData.get("returnNotes") as string;
    await prisma.$transaction([
      prisma.assignment.update({
        where: { id: assignmentId },
        data: { 
          returnedAt: new Date(),
          returnReason,
          returnNotes
        }
      }),
      prisma.asset.update({
        where: { id: assetId },
        data: { status: "AVAILABLE" }
      })
    ]);

    revalidatePath("/assignments");
    revalidatePath("/assets");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("RETURN ASSET ERROR:", error);
    return { success: false };
  }
}
