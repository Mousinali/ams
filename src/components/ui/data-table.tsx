"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
} from "@tanstack/react-table";

import { useState, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function debounce(fn: Function, ms: number) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchPlaceholder?: string;
  isServerSide?: boolean;
  totalCount?: number;
  pageIndex?: number;
  pageSize?: number;
  searchValue?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchPlaceholder = "Search...",
  isServerSide = false,
  totalCount,
  pageIndex = 0,
  pageSize = 10,
  searchValue = "",
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [internalGlobalFilter, setInternalGlobalFilter] = useState(searchValue);

  const createQueryString = useCallback(
    (params: Record<string, string | number | null>) => {
      const newParams = new URLSearchParams(searchParams.toString());
      
      Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === "") {
          newParams.delete(key);
        } else {
          newParams.set(key, String(value));
        }
      });

      return newParams.toString();
    },
    [searchParams]
  );

  const updateSearch = useCallback(
    debounce((value: string) => {
      router.push(`${pathname}?${createQueryString({ search: value, page: 1 })}`);
    }, 500),
    [pathname, router, createQueryString]
  );

  const onSearchChange = (value: string) => {
    setInternalGlobalFilter(value);
    updateSearch(value);
  };

  const exportToCSV = () => {
    // Get headers
    const headers = columns
      .map((col: any) => {
        if (col.id === "actions" || col.id === "status") return null;
        return col.header || col.accessorKey;
      })
      .filter(Boolean);

    // Get data
    const csvRows = data.map((row: any) => {
      return columns
        .map((col: any) => {
          if (col.id === "actions" || col.id === "status") return null;
          const key = col.accessorKey;
          if (!key) return null;
          
          // Handle nested keys like "category.name"
          const val = key.split('.').reduce((obj: any, k: string) => obj?.[k], row);
          return `"${String(val || "").replace(/"/g, '""')}"`;
        })
        .filter(val => val !== null)
        .join(",");
    });

    const csvContent = [headers.join(","), ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `report_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const table = useReactTable({
    data,
    columns,
    pageCount: isServerSide ? Math.ceil((totalCount || 0) / pageSize) : undefined,
    manualPagination: isServerSide,
    manualFiltering: isServerSide,
    state: {
      sorting,
      pagination: {
        pageIndex,
        pageSize,
      },
      globalFilter: isServerSide ? searchValue : internalGlobalFilter,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: isServerSide ? undefined : setInternalGlobalFilter,
  });

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-[0_4px_14px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden">
      {/* Table Controls (Search & Entries) */}
      <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-zinc-600">
            <span>Show</span>
            <select 
              className="bg-white border border-slate-200 rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
              value={pageSize}
              onChange={e => {
                const newSize = e.target.value;
                router.push(`${pathname}?${createQueryString({ pageSize: newSize, page: 1 })}`);
              }}
            >
              {[10, 25, 50, 100].map(size => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span>entries</span>
          </div>

          <button 
            onClick={exportToCSV}
            className="flex items-center gap-2 px-3 py-1.5 text-xs bg-green-700 cursor-pointer text-white font-bold rounded-lg hover:bg-green-800 transition-all active:scale-95"
            title="Export to CSV"
          >
            <i className="ri-download-2-line text-sm"></i>
            Export
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"></i>
          <input
            placeholder={searchPlaceholder}
            value={internalGlobalFilter}
            onChange={(event) => onSearchChange(event.target.value)}
            className="pl-9 pr-4 py-2 w-full bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
          {internalGlobalFilter && (
            <button 
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
            >
              <i className="ri-close-circle-line"></i>
            </button>
          )}
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-[#EFEEFF] text-[#4A4A6A] text-[13px] font-bold uppercase tracking-wide">
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id} className="px-6 py-4 whitespace-nowrap">
                      {header.isPlaceholder ? null : (
                        <div
                          className={
                            header.column.getCanSort()
                              ? "cursor-pointer select-none flex items-center gap-2 hover:text-indigo-600 transition-colors"
                              : ""
                          }
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getCanSort() && (
                            <i className={`text-zinc-400 text-xs ${
                              {
                                asc: "ri-arrow-up-s-line",
                                desc: "ri-arrow-down-s-line",
                              }[header.column.getIsSorted() as string] || "ri-arrow-up-down-line"
                            }`}></i>
                          )}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-slate-100">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-slate-50/50 transition-colors data-[state=selected]:bg-slate-50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="h-48 text-center bg-slate-50/20">
                  <div className="flex flex-col items-center justify-center text-zinc-400">
                    <i className="ri-inbox-line text-4xl mb-2 opacity-20"></i>
                    <p className="text-sm italic">No records found matching your search.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 bg-slate-50/30">
        <div className="text-sm text-zinc-500 font-medium order-2 sm:order-1">
          {isServerSide ? (
            <>
              Showing <span className="text-zinc-900">{Math.min(pageIndex * pageSize + 1, totalCount || 0)}</span> to{" "}
              <span className="text-zinc-900">{Math.min((pageIndex + 1) * pageSize, totalCount || 0)}</span> of{" "}
              <span className="text-zinc-900">{totalCount}</span> entries
            </>
          ) : (
            `Page ${table.getState().pagination.pageIndex + 1} of ${table.getPageCount() || 1}`
          )}
        </div>
        
        <div className="flex items-center gap-2 order-1 sm:order-2">
          <button
            className="h-9 w-9 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-zinc-400 hover:text-zinc-900 disabled:opacity-30 transition-all hover:shadow-sm"
            onClick={() => {
              if (isServerSide) {
                router.push(`${pathname}?${createQueryString({ page: 1 })}`);
              } else {
                table.setPageIndex(0);
              }
            }}
            disabled={isServerSide ? pageIndex === 0 : !table.getCanPreviousPage()}
          >
            <i className="ri-arrow-left-double-line"></i>
          </button>
          <button
            className="h-9 w-9 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-zinc-400 hover:text-zinc-900 disabled:opacity-30 transition-all hover:shadow-sm"
            onClick={() => {
              if (isServerSide) {
                router.push(`${pathname}?${createQueryString({ page: pageIndex })}`);
              } else {
                table.previousPage();
              }
            }}
            disabled={isServerSide ? pageIndex === 0 : !table.getCanPreviousPage()}
          >
            <i className="ri-arrow-left-s-line"></i>
          </button>

          <div className="flex items-center gap-1 px-2 text-sm font-bold text-zinc-900 bg-white border border-slate-200 rounded-lg h-9 min-w-[36px] justify-center">
             {isServerSide ? pageIndex + 1 : table.getState().pagination.pageIndex + 1}
          </div>

          <button
            className="h-9 w-9 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-zinc-400 hover:text-zinc-900 disabled:opacity-30 transition-all hover:shadow-sm"
            onClick={() => {
              if (isServerSide) {
                router.push(`${pathname}?${createQueryString({ page: pageIndex + 2 })}`);
              } else {
                table.nextPage();
              }
            }}
            disabled={isServerSide ? (pageIndex + 1) >= Math.ceil((totalCount || 0) / pageSize) : !table.getCanNextPage()}
          >
            <i className="ri-arrow-right-s-line"></i>
          </button>
          <button
            className="h-9 w-9 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-zinc-400 hover:text-zinc-900 disabled:opacity-30 transition-all hover:shadow-sm"
            onClick={() => {
              if (isServerSide) {
                const lastPage = Math.ceil((totalCount || 0) / pageSize);
                router.push(`${pathname}?${createQueryString({ page: lastPage })}`);
              } else {
                table.setPageIndex(table.getPageCount() - 1);
              }
            }}
            disabled={isServerSide ? (pageIndex + 1) >= Math.ceil((totalCount || 0) / pageSize) : !table.getCanNextPage()}
          >
            <i className="ri-arrow-right-double-line"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
