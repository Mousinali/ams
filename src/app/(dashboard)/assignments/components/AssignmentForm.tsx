"use client";

import { createAssignment } from "../actions";
import { useRouter } from "next/navigation";

export default function AssignmentForm({ assets, employees }: { assets: any[], employees: any[] }) {
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    const res = await createAssignment(formData);
    if (res.success) {
      router.push("/assignments");
    }
  }

  return (
    <form action={handleSubmit} className="space-y-5 bg-white p-6 rounded-xl shadow border border-zinc-100 max-w-2xl">
      <div>
        <label className="block mb-2 font-medium text-sm">Asset</label>
        <select 
          name="assetId" 
          required 
          className="w-full border rounded-lg p-3 bg-white text-sm"
        >
          <option value="">Select an available asset</option>
          {assets.map((asset) => (
            <option key={asset.id} value={asset.id}>
              {asset.name} ({asset.assetTag})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-2 font-medium text-sm">Employee</label>
        <select 
          name="employeeId" 
          required 
          className="w-full border rounded-lg p-3 bg-white text-sm"
        >
          <option value="">Select an employee</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name} - {emp.department.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-3 pt-2">
        <button 
          type="submit" 
          className="bg-black text-white px-6 py-3 rounded-lg text-sm font-bold"
        >
          Complete Assignment
        </button>
        <button 
          type="button" 
          onClick={() => router.back()}
          className="border border-zinc-200 px-6 py-3 rounded-lg text-sm font-bold"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
