"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import Link from "next/link";

type Assignment = {
  id: string;
  assetId: string;
  assignedAt: Date;
  returnedAt: Date | null;
  asset: { name: string; assetTag: string };
  employee: { name: string; employeeId: string | null; department: { name: string } };
};

export default function AssignmentTable({ 
  assignments, 
  totalCount,
  pageIndex,
  pageSize,
  searchValue 
}: { 
  assignments: any[], 
  totalCount: number,
  pageIndex: number,
  pageSize: number,
  searchValue: string
}) {
  const columns: ColumnDef<Assignment>[] = [
    {
      accessorKey: "asset.name",
      header: "Asset",
      cell: ({ row }) => (
        <div>
          <p className="font-semibold text-zinc-900">{row.original.asset.name}</p>
          <p className="text-xs text-zinc-400 font-mono">{row.original.asset.assetTag}</p>
        </div>
      )
    },
    {
      accessorKey: "employee.name",
      header: "Employee",
      cell: ({ row }) => (
        <div>
          <p className="font-semibold text-zinc-900">{row.original.employee.name}</p>
          <p className="text-xs text-zinc-500">{row.original.employee.employeeId || "-"}</p>
        </div>
      )
    },
    {
      accessorKey: "assignedAt",
      header: "Assign Date",
      cell: ({ row }) => <span className="text-zinc-600 text-sm font-medium">{new Date(row.getValue("assignedAt")).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
    },
    {
      accessorKey: "returnedAt",
      header: "Return Date",
      cell: ({ row }) => (
        <span className="text-zinc-500 text-sm">
          {row.original.returnedAt 
            ? new Date(row.original.returnedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
            : <span className="text-zinc-300 italic">Pending</span>
          }
        </span>
      )
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }) => {
        const returnedAt = row.original.returnedAt;
        return (
          <span className={`inline-flex items-center rounded-full px-4 py-1 text-xs font-semibold tracking-wide ${
            returnedAt 
            ? "bg-red-50 text-red-500 border border-red-100" 
            : "bg-emerald-50 text-emerald-600 border border-emerald-100"
          }`}>
            {returnedAt ? "Returned" : "Active"}
          </span>
        );
      }
    },
    {
      id: "actions",
      header: () => <div className="text-right">Action</div>,
      cell: ({ row }) => {
        const assignment = row.original;
        return (
          <div className="flex items-center justify-end gap-3 text-lg">
            {!assignment.returnedAt && (
              <Link href={`/assignments/return/${assignment.id}`} className="text-orange-400 hover:text-orange-600 transition-colors bg-orange-100 px-3 py-2 rounded-lg text-sm font-bold flex items-center gap-1" title="Return Asset">
                <i className="ri-arrow-go-back-line"></i> <span>Return</span>
              </Link>
            )}
          </div>
        );
      }
    }
  ];

  return (
    <DataTable 
      columns={columns} 
      data={assignments} 
      totalCount={totalCount}
      pageIndex={pageIndex}
      pageSize={pageSize}
      searchValue={searchValue}
      searchPlaceholder="Search assignments by asset, employee or ID..." 
      isServerSide
    />
  );
}
