import Link from "next/link";
import AssetTable from "./components/AssetTable";
import { getAssets } from "./actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Assets",
};

export default async function AssetsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const search = (params.search as string) || "";
  const page = Number(params.page) || 1;
  const pageSize = Number(params.pageSize) || 10;

  const { assets, total } = await getAssets(search, page, pageSize);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
            Assets
          </h1>
          <p className="text-zinc-600 mt-1">
            Manage and track company inventory across all departments.
          </p>
        </div>

        <Link
          href="/assets/add"
          className="bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-zinc-800 transition-all shadow-lg shadow-black/10 flex items-center gap-2"
        >
          <i className="ri-add-line"></i>
          Add Asset
        </Link>
      </div>

      <AssetTable 
        assets={assets} 
        totalCount={total}
        pageIndex={page - 1}
        pageSize={pageSize}
        searchValue={search}
      />
    </div>
  );
}