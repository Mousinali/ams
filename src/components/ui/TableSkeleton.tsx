import { Skeleton } from "./Skeleton";

export function TableSkeleton() {
  return (
    <div className="space-y-4 w-full">
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
        <div className="bg-zinc-50 border-b border-zinc-200 p-4 grid grid-cols-4 gap-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24 ml-auto" />
        </div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="p-4 grid grid-cols-4 gap-4 border-b border-zinc-100 last:border-0">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-28" />
            <div className="flex justify-end gap-2">
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-4 w-8" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
