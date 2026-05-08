"use server";

import { prisma } from "@/lib/prisma";

export async function getReportData() {
  const [totalAssignments, activeAssignments, returnedAssignments, conditionData] = await Promise.all([
    prisma.assignment.count(),
    prisma.assignment.count({ where: { returnedAt: null } }),
    prisma.assignment.count({ where: { returnedAt: { not: null } } }),
    prisma.asset.groupBy({
      by: ['condition'],
      _count: { id: true }
    })
  ]);

  const assignments = await prisma.assignment.findMany({
    orderBy: { assignedAt: "desc" },
    include: {
      asset: { include: { category: true } },
      employee: { include: { department: true, designation: true } }
    }
  });

  return {
    totalAssignments,
    activeAssignments,
    returnedAssignments,
    assignments,
    conditionStats: conditionData.map(c => ({ name: c.condition, value: c._count.id }))
  };
}
