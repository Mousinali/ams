import { getReportData } from "./actions";
import ReportTable from "./components/ReportTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reports",
};

export default async function ReportsPage() {
  const data = await getReportData();

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-900">Distribution Reports</h1>
          <p className="text-zinc-500 mt-2 text-base sm:text-lg">Comprehensive analytics and assignment history.</p>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Logs */}
        <div className="group bg-white border border-slate-200 rounded-xl p-6 shadow-[0_4px_14px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition-all duration-300 flex justify-between items-center">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Logs</p>
            <h3 className="text-2xl font-bold text-zinc-900 tracking-tight">{data.totalAssignments.toLocaleString()}</h3>
          </div>
          <div className="w-14 h-14 rounded-2xl border bg-blue-50/50 border-blue-100 text-blue-600 flex items-center justify-center transition-transform group-hover:scale-110">
            <i className="ri-history-line text-2xl"></i>
          </div>
        </div>

        {/* Active Now */}
        <div className="group bg-white border border-slate-200 rounded-xl p-6 shadow-[0_4px_14px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition-all duration-300 flex justify-between items-center">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Active Now</p>
            <h3 className="text-2xl font-bold text-zinc-900 tracking-tight">{data.activeAssignments.toLocaleString()}</h3>
          </div>
          <div className="w-14 h-14 rounded-2xl border bg-emerald-50/50 border-emerald-100 text-emerald-600 flex items-center justify-center transition-transform group-hover:scale-110">
            <i className="ri-checkbox-circle-line text-2xl"></i>
          </div>
        </div>

        {/* Total Returns */}
        <div className="group bg-white border border-slate-200 rounded-xl p-6 shadow-[0_4px_14px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition-all duration-300 flex justify-between items-center">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Total Returns</p>
            <h3 className="text-2xl font-bold text-zinc-900 tracking-tight">{data.returnedAssignments.toLocaleString()}</h3>
          </div>
          <div className="w-14 h-14 rounded-2xl border bg-orange-50/50 border-orange-100 text-orange-600 flex items-center justify-center transition-transform group-hover:scale-110">
            <i className="ri-arrow-go-back-line text-2xl"></i>
          </div>
        </div>

        {/* Efficiency */}
        <div className="group bg-white border border-slate-200 rounded-xl p-6 shadow-[0_4px_14_rgba(0,0,0,0.05)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition-all duration-300 flex justify-between items-center">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Efficiency</p>
            <h3 className="text-2xl font-bold text-zinc-900 tracking-tight">94.2%</h3>
          </div>
          <div className="w-14 h-14 rounded-2xl border bg-purple-50/50 border-purple-100 text-purple-600 flex items-center justify-center transition-transform group-hover:scale-110">
            <i className="ri-sparkling-line text-2xl"></i>
          </div>
        </div>
      </div>

      {/* Main Report Table */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-zinc-900 tracking-tight">Assignment History</h3>
        </div>
        <ReportTable data={data.assignments} />
      </div>
    </div>
  );
}
