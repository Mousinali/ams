import { getDashboardStats } from "./actions";
import AssetChart from "./components/AssetChart";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

// Ensure Remix Icon is imported in your layout.tsx or globals.css
// e.g., import 'remixicon/fonts/remixicon.css'

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  const kpis = [
    {
      label: "Total Assets",
      value: stats.totalAssets,
      icon: "ri-box-3-line",
      color: "text-blue-600",
      bg: "bg-blue-50/50",
      border: "border-blue-100",
    },
    {
      label: "Total Employees",
      value: stats.totalEmployees,
      icon: "ri-group-line",
      color: "text-purple-600",
      bg: "bg-purple-50/50",
      border: "border-purple-100",
    },
    {
      label: "Available Assets",
      value: stats.activeAssets,
      icon: "ri-checkbox-circle-line",
      color: "text-emerald-600",
      bg: "bg-emerald-50/50",
      border: "border-emerald-100",
    },
    {
      label: "Assigned Assets",
      value: stats.totalAssets - stats.activeAssets,
      icon: "ri-user-shared-2-line",
      color: "text-orange-600",
      bg: "bg-orange-50/50",
      border: "border-orange-100",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10">
      {/* --- Header --- */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
            Dashboard
          </h1>
          <p className="text-xs sm:text-sm font-medium text-zinc-500 mt-1">
            Manage and track your company assets with ease.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/assets"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-zinc-900 px-6 text-sm font-bold text-zinc-50 transition-all hover:bg-zinc-800 shadow-lg shadow-zinc-200 active:scale-95"
          >
            New Asset
          </Link>
        </div>
      </div>

      {/* --- KPI Cards (Clean Design) --- */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, i) => (
          <div
            key={i}
            className="group bg-white border border-slate-200 rounded-xl p-6
              shadow-[0_4px_14px_rgba(0,0,0,0.05)]
              hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)]
              transition-all duration-300 flex justify-between items-center"
          >
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500 capitalize">
                {kpi.label}
              </p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-2xl font-bold text-zinc-900 tracking-tight">
                  {kpi.value.toLocaleString()}
                </h3>
              </div>
            </div>

            <div
              className={`w-14 h-14 rounded-2xl border ${kpi.bg} ${kpi.border} ${kpi.color} flex items-center justify-center transition-transform group-hover:scale-110`}
            >
              <i className={`${kpi.icon} text-2xl`}></i>
            </div>
          </div>
        ))}
      </div>

      {/* --- Row 1: Chart & Recent Assets --- */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Analytics Section */}
        <div className="lg:col-span-2">
          <div
            className="bg-white border border-slate-200 rounded-xl p-6
              shadow-[0_4px_14px_rgba(0,0,0,0.05)]
              hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)]
              transition-all duration-300 h-full"
          >
            <div className="flex flex-col space-y-1.5 pb-8">
              <h3 className="text-xl font-bold text-zinc-900 tracking-tight">
                Distribution by Category
              </h3>
              <p className="text-sm font-medium text-zinc-400">
                Current inventory status across all categories.
              </p>
            </div>
            <AssetChart data={stats.chartData} />
          </div>
        </div>

        {/* Recent Assets Sidebar */}
        <div className="lg:col-span-1">
          <div
            className="bg-white border border-slate-200 rounded-xl p-6
              shadow-[0_4px_14px_rgba(0,0,0,0.05)]
              hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)]
              transition-all duration-300 h-full"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-1 border-b border-slate-200 pb-3">
                <h3 className="text-xl font-bold text-zinc-900 tracking-tight">
                  Recent Assets
                </h3>
                <Link
                  href="/assets"
                  className="text-xs font-bold text-zinc-400 hover:text-zinc-900 transition-colors "
                >
                  See all
                </Link>
              </div>

              <div className="flex-1 divide-y divide-slate-100 -mx-6">
                {stats.recentAssets.map((asset: any) => {
                  const categoryColors: Record<string, string> = {
                    Laptop: "bg-blue-50 text-blue-600 border-blue-100",
                    Desktop: "bg-indigo-50 text-indigo-600 border-indigo-100",
                    Monitor: "bg-purple-50 text-purple-600 border-purple-100",
                    Phone: "bg-emerald-50 text-emerald-600 border-emerald-100",
                    Tablet: "bg-cyan-50 text-cyan-600 border-cyan-100",
                    Keyboard: "bg-orange-50 text-orange-600 border-orange-100",
                    Mouse: "bg-rose-50 text-rose-600 border-rose-100",
                    Furniture: "bg-amber-50 text-amber-600 border-amber-100",
                  };

                  const badgeClass =
                    categoryColors[asset.category.name] ||
                    "bg-zinc-50 text-zinc-600 border-zinc-100";

                  return (
                    <div
                      key={asset.id}
                      className="group flex items-center gap-4 px-6 py-3 hover:bg-slate-50/80 transition-all cursor-pointer"
                    >
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-bold text-zinc-900 truncate block group-hover:text-indigo-600 transition-colors">
                          {asset.name}
                        </span>
                      </div>
                      
                      <div className="flex-shrink-0">
                        <span
                          className={`text-[9px] px-3 py-1 rounded-full border font-bold uppercase tracking-wider ${badgeClass}`}
                        >
                          {asset.category.name}
                        </span>
                      </div>

                      <Link
                        href={`/assets/edit/${asset.id}`}
                        className="flex-shrink-0 text-zinc-300 group-hover:text-zinc-900 transition-all"
                      >
                        <i className="ri-arrow-right-up-line text-lg"></i>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Row 2: Latest Assigns (Full Width) --- */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-[0_4px_14px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden">
        {/* Table Header */}
        <div className="px-6 py-5 flex items-center justify-between border-b border-slate-100">
          <h3 className="text-xl font-bold text-zinc-900 tracking-tight">
            Latest Assigns
          </h3>
          <Link
            href="/assignments"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors uppercase tracking-widest flex items-center gap-2"
          >
            See more
            <i className="ri-arrow-right-s-line text-lg"></i>
          </Link>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#EFEEFF] text-[#4A4A6A] text-[13px] font-bold uppercase tracking-wide">
                <th className="px-6 py-4">Asset Name</th>
                <th className="px-6 py-4">Employee ID</th>
                <th className="px-6 py-4">Employee Name</th>
                <th className="px-6 py-4">Assign Date</th>
                <th className="px-6 py-4">Return Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stats.recentAssignments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-16 text-zinc-400 text-sm font-medium italic">No recent activity.</td>
                </tr>
              ) : (
                stats.recentAssignments.map((assignment: any) => (
                  <tr key={assignment.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-zinc-700">
                      {assignment.asset.name}
                    </td>
                    <td className="px-6 py-4 text-zinc-500 font-mono text-xs">
                      {assignment.employee.employeeId || "-"}
                    </td>
                    <td className="px-6 py-4 text-zinc-600 font-medium">
                      {assignment.employee.name}
                    </td>
                    <td className="px-6 py-4 text-zinc-500 text-sm">
                      {new Date(assignment.assignedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-zinc-500 text-sm">
                      {assignment.returnedAt 
                        ? new Date(assignment.returnedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                        : <span className="text-zinc-300 italic">Pending</span>
                      }
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-full px-4 py-1 text-xs font-bold ${
                        assignment.returnedAt 
                        ? "bg-red-50 text-red-500 border border-red-100" 
                        : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                      }`}>
                        {assignment.returnedAt ? "Returned" : "Active"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {!assignment.returnedAt ? (
                        <Link href={`/assignments/return/${assignment.id}`} className="inline-flex h-8 w-8 items-center justify-center text-orange-400 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-all" title="Return Asset">
                          <i className="ri-arrow-go-back-line text-lg"></i>
                        </Link>
                      ) : (
                        <span className="text-zinc-300 text-xs font-medium">Completed</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
