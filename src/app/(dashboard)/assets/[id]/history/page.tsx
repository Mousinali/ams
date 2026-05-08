import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function getAssetHistory(id: string) {
  return prisma.asset.findUnique({
    where: { id },
    include: {
      category: true,
      assignments: {
        orderBy: { assignedAt: "desc" },
        include: {
          employee: {
            include: { department: true, designation: true }
          }
        }
      }
    }
  });
}

export default async function AssetHistoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const asset = await getAssetHistory(id);

  if (!asset) return notFound();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/assets" className="w-10 h-10 bg-white border border-zinc-200 rounded-lg flex items-center justify-center hover:bg-zinc-50 transition">
          <i className="ri-arrow-left-line"></i>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Asset Log</h1>
          <p className="text-zinc-600 mt-1">
            History for <span className="font-medium text-black">{asset.name}</span> ({asset.assetTag})
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow border border-zinc-100 overflow-hidden">
        <div className="p-6 border-b border-zinc-100 bg-zinc-50 flex items-center gap-6">
          <div>
            <p className="text-sm text-zinc-500">Category</p>
            <p className="font-medium">{asset.category.name}</p>
          </div>
          <div>
            <p className="text-sm text-zinc-500">Current Status</p>
            <p className="font-medium">{asset.status}</p>
          </div>
          <div>
            <p className="text-sm text-zinc-500">Condition</p>
            <p className="font-medium">{asset.condition}</p>
          </div>
        </div>
        
        {asset.assignments.length === 0 ? (
          <div className="p-8 text-center text-zinc-500">
            This asset has never been assigned to anyone.
          </div>
        ) : (
          <div className="divide-y divide-zinc-100">
            {asset.assignments.map((assignment) => (
              <div key={assignment.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg">{assignment.employee.name}</h3>
                    <p className="text-sm text-zinc-600">
                      {assignment.employee.designation.name} &middot; {assignment.employee.department.name}
                    </p>
                  </div>
                  <div className="text-right text-sm">
                    <p className="font-medium text-zinc-800">
                      Assigned: {assignment.assignedAt.toISOString().split('T')[0]}
                    </p>
                    {assignment.returnedAt ? (
                      <p className="text-zinc-500">
                        Returned: {assignment.returnedAt.toISOString().split('T')[0]}
                      </p>
                    ) : (
                      <p className="text-emerald-600 font-medium bg-emerald-50 inline-block px-2 py-0.5 rounded mt-1">
                        Currently Holding
                      </p>
                    )}
                  </div>
                </div>

                {assignment.returnedAt && assignment.returnReason && (
                  <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-200 mt-2">
                    <p className="text-sm font-medium text-zinc-800 mb-1">
                      Return Reason: <span className="font-bold text-black">{assignment.returnReason}</span>
                    </p>
                    {assignment.returnNotes && (
                      <p className="text-sm text-zinc-600 italic">
                        "{assignment.returnNotes}"
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
