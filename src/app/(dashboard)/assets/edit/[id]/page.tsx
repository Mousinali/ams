import AssetForm from "../../components/AssetForm";
import { getAsset } from "../../actions";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import BackButton from "@/components/ui/BackButton";

export default async function EditAssetPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const asset = await getAsset(id);
  if (!asset) return notFound();

  const categories = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" }
  });

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <BackButton href="/assets" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Edit Asset</h1>
          <p className="text-zinc-600 mt-1">Update asset information</p>
        </div>
      </div>

      <AssetForm categories={categories} initialData={asset} />
    </div>
  );
}
