import { Skeleton } from "@/components/ui/Skeleton";

export default function ReportsLoading() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-40 rounded-2xl" />
        ))}
      </div>

      <div className="bg-white border border-zinc-200 rounded-2xl p-6 h-[400px]">
        <Skeleton className="h-full w-full rounded-xl" />
      </div>
    </div>
  );
}
