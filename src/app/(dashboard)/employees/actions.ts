"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getEmployees(search = "", page = 1, pageSize = 10) {
  const where = search
    ? {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { email: { contains: search, mode: "insensitive" as const } },
          { employeeId: { contains: search, mode: "insensitive" as const } },
        ],
      }
    : {};

  const [employees, total] = await Promise.all([
    prisma.employee.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { name: "asc" },
      include: { department: true, designation: true }
    }),
    prisma.employee.count({ where }),
  ]);

  return { employees, total };
}

export async function getDepartmentsWithDesignations() {
  return prisma.department.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
    include: { 
      designations: {
        where: { isActive: true },
        orderBy: { name: "asc" }
      }
    }
  });
}

export async function createEmployee(formData: FormData) {
  try {
    await prisma.employee.create({
      data: {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        employeeId: formData.get("employeeId") as string,
        departmentId: formData.get("departmentId") as string,
        designationId: formData.get("designationId") as string,
      }
    });

    revalidatePath("/employees");
    return { success: true };
  } catch (error) {
    console.error("CREATE EMPLOYEE ERROR:", error);
    return { success: false };
  }
}

export async function getEmployee(id: string) {
  return prisma.employee.findUnique({ 
    where: { id },
    include: { designation: true }
  });
}

export async function updateEmployee(id: string, formData: FormData) {
  try {
    await prisma.employee.update({
      where: { id },
      data: {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        employeeId: formData.get("employeeId") as string,
        departmentId: formData.get("departmentId") as string,
        designationId: formData.get("designationId") as string,
      }
    });
    revalidatePath("/employees");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function toggleEmployeeActive(id: string, currentStatus: boolean) {
  try {
    await prisma.employee.update({
      where: { id },
      data: { isActive: !currentStatus }
    });
    revalidatePath("/employees");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
