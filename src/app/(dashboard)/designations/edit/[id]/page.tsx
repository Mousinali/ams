import { getDesignation, updateDesignation, getDepartments } from "../../actions";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export default async function EditDesignationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const designation = await getDesignation(id);
  if (!designation) return notFound();
  
  const departments = await getDepartments();

  async function handleSubmit(formData: FormData) {
    "use server";
    const res = await updateDesignation(id, formData);
    if (res.success) redirect("/designations");
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/designations" className="w-10 h-10 bg-white border border-zinc-200 rounded-lg flex items-center justify-center hover:bg-zinc-50 transition">
          <i className="ri-arrow-left-line"></i>
        </Link>
        <h1 className="text-2xl font-bold">Edit Designation</h1>
      </div>

      <form action={handleSubmit} className="bg-white p-6 rounded-xl shadow border border-zinc-100">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              defaultValue={designation.name}
              required
              className="w-full border border-zinc-300 rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Department</label>
            <select
              name="departmentId"
              defaultValue={designation.departmentId}
              required
              className="w-full border border-zinc-300 rounded-lg p-2"
            >
              {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
          <button type="submit" className="bg-black text-white px-5 py-2 rounded-lg">
            Update Designation
          </button>
        </div>
      </form>
    </div>
  );
}
