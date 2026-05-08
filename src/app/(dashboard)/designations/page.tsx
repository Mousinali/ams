import Link from "next/link";
import { getDesignations, getDepartments, toggleDesignationActive, createDesignation } from "./actions";
import { Metadata } from "next";
import StatusToggle from "@/components/ui/StatusToggle";
import { revalidatePath } from "next/cache";

export const metadata: Metadata = {
  title: "Designations",
};

export default async function DesignationsPage() {
  const designations = await getDesignations();
  const departments = await getDepartments();

  async function handleSubmit(formData: FormData) {
    "use server";
    await createDesignation(formData);
    revalidatePath("/designations");
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900">Designations</h2>
          <p className="text-zinc-500 text-sm mt-1">Manage company roles and job titles.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-1">
          <form action={handleSubmit} className="bg-white p-6 rounded-xl shadow border border-zinc-100">
            <h3 className="text-lg font-bold mb-4">Add New Designation</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Department</label>
                <select name="departmentId" required className="w-full border rounded-lg p-2 bg-white">
                  <option value="">Select Department</option>
                  {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full border rounded-lg p-2"
                  placeholder="e.g. Senior Developer"
                />
              </div>
              <button type="submit" className="bg-black text-white px-5 py-2 rounded-lg w-full">
                Create Designation
              </button>
            </div>
          </form>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white border border-slate-200 rounded-xl shadow-[0_4px_14px_rgba(0,0,0,0.05)] overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#EFEEFF] text-[#4A4A6A] text-[13px] font-bold uppercase tracking-wide">
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4 text-center">Active</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {designations.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-zinc-400 italic">
                      No designations found.
                    </td>
                  </tr>
                ) : (
                  designations.map((desig) => (
                    <tr key={desig.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-zinc-700">{desig.name}</td>
                      <td className="px-6 py-4 text-zinc-600">{desig.department.name}</td>
                      <td className="px-6 py-4 text-center">
                        <StatusToggle 
                          id={desig.id} 
                          isActive={desig.isActive} 
                          onToggle={toggleDesignationActive} 
                        />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-3 text-lg">
                          <Link href={`/designations/edit/${desig.id}`} className="text-zinc-400 hover:text-emerald-600 transition-colors" title="Edit Designation">
                            <i className="ri-pencil-line"></i>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
