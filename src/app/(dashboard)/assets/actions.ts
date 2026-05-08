"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createAsset(formData: FormData) {
  try {
    await prisma.asset.create({
      data: {
        assetTag: formData.get("assetTag") as string,
        name: formData.get("name") as string,
        categoryId: formData.get("categoryId") as string,
        brand: formData.get("brand") as string,
        model: formData.get("model") as string,
        serialNumber: formData.get("serialNumber") as string,
        status: "AVAILABLE",
        condition: "GOOD",
      },
    });

    revalidatePath("/assets");

    return {
      success: true,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
    };
  }
}

export async function getAssets(search = "", page = 1, pageSize = 10) {
  const where = search
    ? {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { assetTag: { contains: search, mode: "insensitive" as const } },
          { brand: { contains: search, mode: "insensitive" as const } },
          { model: { contains: search, mode: "insensitive" as const } },
          { serialNumber: { contains: search, mode: "insensitive" as const } },
        ],
      }
    : {};

  const [assets, total] = await Promise.all([
    prisma.asset.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: true,
      },
    }),
    prisma.asset.count({ where }),
  ]);

  return { assets, total };
}

export async function getAsset(id: string) {
  return prisma.asset.findUnique({ where: { id } });
}

export async function updateAsset(id: string, formData: FormData) {
  try {
    const price = formData.get("price") as string;
    const purchaseDate = formData.get("purchaseDate") as string;
    const warrantyExpiry = formData.get("warrantyExpiry") as string;

    await prisma.asset.update({
      where: { id },
      data: {
        assetTag: formData.get("assetTag") as string,
        name: formData.get("name") as string,
        categoryId: formData.get("categoryId") as string,
        brand: formData.get("brand") as string || null,
        model: formData.get("model") as string || null,
        serialNumber: formData.get("serialNumber") as string || null,
        status: formData.get("status") as string || "AVAILABLE",
        condition: formData.get("condition") as string || "GOOD",
        location: formData.get("location") as string || null,
        price: price ? parseFloat(price) : null,
        purchaseDate: purchaseDate ? new Date(purchaseDate) : null,
        warrantyExpiry: warrantyExpiry ? new Date(warrantyExpiry) : null,
      }
    });

    revalidatePath("/assets");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function toggleAssetActive(id: string, currentStatus: boolean) {
  try {
    await prisma.asset.update({
      where: { id },
      data: { isActive: !currentStatus }
    });
    revalidatePath("/assets");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}