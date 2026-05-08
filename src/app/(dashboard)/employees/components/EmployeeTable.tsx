"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { toggleEmployeeActive } from "../actions";
import Link from "next/link";
import StatusToggle from "@/components/ui/StatusToggle";

type Employee = {
  id: string;
  employeeId: string | null;
  name: string;
  email: string;
  department: { name: string };
  designation: { name: string };
  isActive: boolean;
};

const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "employeeId",
    header: "ID",
    cell: ({ row }) => <span className="text-zinc-500 font-mono text-xs">{row.getValue("employeeId") || "-"}</span>
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <span className="font-semibold text-zinc-900">{row.getValue("name")}</span>
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <span className="text-zinc-600">{row.getValue("email")}</span>
  },
  {
    accessorKey: "department.name",
    header: "Department",
    cell: ({ row }) => (
      <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold bg-indigo-50 text-indigo-600 border border-indigo-100">
        {row.original.department.name}
      </span>
    )
  },
  {
    accessorKey: "designation.name",
    header: "Designation",
    cell: ({ row }) => <span className="text-zinc-500 text-sm">{row.original.designation.name}</span>
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
          onToggle={toggleEmployeeActive} 
        />
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Action</div>,
    cell: ({ row }) => {
      const employee = row.original;
      return (
        <div className="flex items-center justify-end gap-3 text-lg">
          <Link href={`/employees/edit/${employee.id}`} className="text-zinc-400 hover:text-emerald-600 transition-colors" title="Edit Employee">
            <i className="ri-pencil-line"></i>
          </Link>
        </div>
      );
    }
  }
];

export default function EmployeeTable({ 
  employees, 
  totalCount,
  pageIndex,
  pageSize,
  searchValue 
}: { 
  employees: any[], 
  totalCount: number,
  pageIndex: number,
  pageSize: number,
  searchValue: string
}) {
  return (
    <DataTable 
      columns={columns} 
      data={employees} 
      totalCount={totalCount}
      pageIndex={pageIndex}
      pageSize={pageSize}
      searchValue={searchValue}
      searchPlaceholder="Search employees by name, ID or email..." 
      isServerSide
    />
  );
}
