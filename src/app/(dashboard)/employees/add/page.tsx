import EmployeeForm from "../components/EmployeeForm";
import { getDepartmentsWithDesignations } from "../actions";
import BackButton from "@/components/ui/BackButton";

export default async function AddEmployeePage() {
  const departments = await getDepartmentsWithDesignations();

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <BackButton href="/employees" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Add New Employee</h1>
          <p className="text-zinc-500 mt-1">Onboard a new employee to the system.</p>
        </div>
      </div>

      <EmployeeForm departments={departments} />
    </div>
  );
}
