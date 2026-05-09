"use server";

import { prisma } from "@/lib/prisma";

import { unstable_cache } from "next/cache";

export const getDashboardStats = unstable_cache(
  async () => {
    const [totalAssets, totalEmployees, activeAssets, categoryData] = await Promise.all([
      prisma.asset.count({ where: { isActive: true } }),
      prisma.employee.count({ where: { isActive: true } }),
      prisma.asset.count({ where: { status: "AVAILABLE", isActive: true } }),
      prisma.category.findMany({
        where: { isActive: true },
        include: {
          _count: {
            select: { 
              assets: {
                where: { isActive: true }
              }
            }
          }
        }
      })
    ]);

    const recentAssets = await prisma.asset.findMany({
      where: { isActive: true },
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { category: true }
    });

    const recentAssignments = await prisma.assignment.findMany({
      where: {
        asset: { isActive: true },
        employee: { isActive: true }
      },
      take: 5,
      orderBy: { assignedAt: "desc" },
      include: {
        asset: true,
        employee: true
      }
    });

    const chartData = categoryData.map(c => ({
      name: c.name,
      assets: c._count.assets
    }));

    return {
      totalAssets,
      totalEmployees,
      activeAssets,
      recentAssets,
      recentAssignments,
      chartData
    };
  },
  ["dashboard-stats"],
  { revalidate: 60, tags: ["dashboard", "assets", "assignments", "employees"] }
);
