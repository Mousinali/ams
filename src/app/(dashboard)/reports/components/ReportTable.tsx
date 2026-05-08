"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";

type ReportItem = {
  id: string;
  asset: { name: string; assetTag: string; category: { name: string } };
  employee: { name: string; department: { name: string }; designation: { name: string } };
  assignedAt: Date;
  returnedAt: Date | null;
  returnReason: string | null;
  returnNotes: string | null;
};

const columns: ColumnDef<ReportItem>[] = [
  {
    accessorKey: "asset.name",
    header: "Asset",
    cell: ({ row }) => (
      <div>
        <p className="font-bold text-zinc-900">{row.original.asset.name}</p>
        <p className="text-[10px] text-zinc-400 font-mono tracking-tighter uppercase">{row.original.asset.assetTag}</p>
      </div>
    )
  },
  {
    accessorKey: "asset.category.name",
    header: "Category",
    cell: ({ row }) => (
      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
        {row.original.asset.category.name}
      </span>
    )
  },
  {
    accessorKey: "employee.name",
    header: "Recipient",
    cell: ({ row }) => (
      <div>
        <p className="font-semibold text-zinc-800">{row.original.employee.name}</p>
        <p className="text-[11px] text-zinc-400">{row.original.employee.designation.name}</p>
      </div>
    )
  },
  {
    accessorKey: "employee.department.name",
    header: "Dept",
    cell: ({ row }) => <span className="text-zinc-500 font-medium text-sm">{row.original.employee.department.name}</span>
  },
  {
    accessorKey: "assignedAt",
    header: "Assigned",
    cell: ({ row }) => <span className="text-zinc-600 text-sm font-medium">{new Date(row.getValue("assignedAt")).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
  },
  {
    accessorKey: "returnedAt",
    header: "Status",
    cell: ({ row }) => {
      const returnedAt = row.original.returnedAt;
      return returnedAt ? (
        <div className="flex flex-col">
          <span className="text-zinc-500 text-xs font-bold line-through decoration-zinc-300">
            {new Date(returnedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
          </span>
          <span className="text-[10px] text-zinc-400 italic">Returned</span>
        </div>
      ) : (
        <span className="inline-flex items-center gap-1.5 text-emerald-600 font-bold text-[11px] uppercase tracking-wider">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          Active
        </span>
      );
    }
  },
  {
    accessorKey: "returnReason",
    header: "Remarks",
    cell: ({ row }) => {
      const reason = row.original.returnReason;
      if (!reason) return <span className="text-zinc-200">—</span>;
      return (
        <div className="max-w-[150px]">
          <p className="text-xs font-bold text-zinc-700 truncate">{reason}</p>
          {row.original.returnNotes && (
            <p className="text-[10px] text-zinc-400 italic truncate" title={row.original.returnNotes}>
              {row.original.returnNotes}
            </p>
          )}
        </div>
      );
    }
  }
];

export default function ReportTable({ data }: { data: ReportItem[] }) {
  return (
    <DataTable 
      columns={columns} 
      data={data} 
      searchPlaceholder="Search history by asset, employee or reason..." 
    />
  );
}
