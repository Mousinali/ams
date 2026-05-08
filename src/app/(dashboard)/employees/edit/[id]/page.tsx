import EmployeeForm from "../../components/EmployeeForm";
import { getEmployee, getDepartmentsWithDesignations } from "../../actions";
import { notFound } from "next/navigation";
import BackButton from "@/components/ui/BackButton";

export default async function EditEmployeePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const employee = await getEmployee(id);
  if (!employee) return notFound();

  const departments = await getDepartmentsWithDesignations();

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <BackButton href="/employees" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Edit Employee</h1>
          <p className="text-zinc-600 mt-1">Update employee information</p>
        </div>
      </div>

      <EmployeeForm departments={departments} initialData={employee} />
    </div>
  );
}
