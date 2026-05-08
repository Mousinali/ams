import { getAvailableAssets, getEmployeesForAssignment } from "../actions";
import BackButton from "@/components/ui/BackButton";
import AssignmentForm from "../components/AssignmentForm";

export default async function AddAssignmentPage() {
  const assets = await getAvailableAssets();
  const employees = await getEmployeesForAssignment();

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <BackButton href="/assignments" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Assign Asset</h1>
          <p className="text-zinc-500 mt-1">Allocate an available asset to an employee.</p>
        </div>
      </div>

      <AssignmentForm assets={assets} employees={employees} />
    </div>
  );
}
