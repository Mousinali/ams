import { TableSkeleton } from "@/components/ui/TableSkeleton";

export default function DashboardLoading() {
  return (
    <div className="animate-in fade-in duration-500">
      <TableSkeleton />
    </div>
  );
}
