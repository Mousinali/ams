"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { toggleAssetActive } from "../actions";
import Link from "next/link";
import StatusToggle from "@/components/ui/StatusToggle";

type Asset = {
  id: string;
  assetTag: string;
  name: string;
  category: {
    name: string;
  };
  status: string;
  isActive: boolean;
};

const columns: ColumnDef<Asset>[] = [
  {
    accessorKey: "assetTag",
    header: "Tag",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "category.name",
    header: "Category",
  },
  {
    accessorKey: "status",
    header: "Asset Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <span className={`inline-flex items-center rounded-full px-4 py-1 text-xs font-semibold tracking-wide ${
          status === 'AVAILABLE' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-blue-50 text-blue-600 border border-blue-100'
        }`}>
          {status}
        </span>
      );
    }
  },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row }) => {
      const isActive = row.original.isActive;
      const id = row.original.id;
      return (
        <StatusToggle 
          id={id} 
          isActive={isActive} 
          onToggle={toggleAssetActive} 
        />
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Action</div>,
    cell: ({ row }) => {
      const asset = row.original;
      return (
        <div className="flex items-center justify-end gap-3 text-lg">
          <Link href={`/assets/${asset.id}/history`} className="text-zinc-400 hover:text-indigo-600 transition-colors" title="View History">
            <i className="ri-history-line"></i>
          </Link>
          <Link href={`/assets/edit/${asset.id}`} className="text-zinc-400 hover:text-emerald-600 transition-colors" title="Edit Asset">
            <i className="ri-pencil-line"></i>
          </Link>
        </div>
      );
    }
  }
];

export default function AssetTable({ 
  assets, 
  totalCount,
  pageIndex,
  pageSize,
  searchValue 
}: { 
  assets: any[], 
  totalCount: number,
  pageIndex: number,
  pageSize: number,
  searchValue: string
}) {
  return (
    <DataTable 
      columns={columns} 
      data={assets} 
      totalCount={totalCount}
      pageIndex={pageIndex}
      pageSize={pageSize}
      searchValue={searchValue}
      searchPlaceholder="Search assets by name, tag, brand..." 
      isServerSide
    />
  );
}