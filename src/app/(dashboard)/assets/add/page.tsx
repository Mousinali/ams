import AssetForm from "../components/AssetForm";
import { prisma } from "@/lib/prisma";
import BackButton from "@/components/ui/BackButton";

export default async function AddAssetPage() {
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" }
  });

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <BackButton href="/assets" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Add New Asset</h1>
          <p className="text-zinc-500 mt-1">Register a new company asset to the inventory.</p>
        </div>
      </div>

      <AssetForm categories={categories} />
    </div>
  );
}