import { getAssignment } from "../../actions";
import { notFound } from "next/navigation";
import BackButton from "@/components/ui/BackButton";
import ReturnAssetForm from "../../components/ReturnAssetForm";

export default async function ReturnAssetPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const assignment = await getAssignment(id);
  if (!assignment || assignment.returnedAt) return notFound();

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <BackButton href="/assignments" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Return Asset</h1>
          <p className="text-zinc-600 mt-1">
            Returning <span className="font-medium text-black">{assignment.asset.name}</span> from <span className="font-medium text-black">{assignment.employee.name}</span>
          </p>
        </div>
      </div>

      <ReturnAssetForm assignmentId={id} assetId={assignment.assetId} />
    </div>
  );
}
