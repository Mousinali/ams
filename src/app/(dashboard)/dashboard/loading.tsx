import { Skeleton } from "@/components/ui/Skeleton";

export default function DashboardPageLoading() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-4 w-96" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-2xl" />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Skeleton className="h-[400px] rounded-2xl" />
        </div>
        <div className="lg:col-span-1">
          <Skeleton className="h-[400px] rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
