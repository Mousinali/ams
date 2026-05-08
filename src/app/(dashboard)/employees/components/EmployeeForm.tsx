"use client";

import { createEmployee, updateEmployee } from "../actions";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function EmployeeForm({ departments, initialData }: { departments: any[], initialData?: any }) {
  const router = useRouter();
  const [selectedDeptId, setSelectedDeptId] = useState(initialData?.departmentId || "");
  const [selectedDesignationId, setSelectedDesignationId] = useState(initialData?.designationId || "");
  const [designations, setDesignations] = useState<any[]>([]);

  useEffect(() => {
    if (selectedDeptId) {
      const dept = departments.find(d => d.id === selectedDeptId);
      let deptDesignations = dept?.designations || [];
      
      // If we are in edit mode and the employee's current designation is from this department
      // but not in the active list, manually add it so it can be selected/shown.
      if (initialData?.designation && initialData.departmentId === selectedDeptId) {
        const exists = deptDesignations.find((d: any) => d.id === initialData.designationId);
        if (!exists) {
          deptDesignations = [...deptDesignations, initialData.designation];
        }
      }

      setDesignations(deptDesignations);
      
      // Reset designation if the new department doesn't contain the previously selected designation
      if (!deptDesignations.find((d: any) => d.id === selectedDesignationId)) {
        if (selectedDeptId !== initialData?.departmentId) {
          setSelectedDesignationId("");
        }
      }
    } else {
      setDesignations([]);
      setSelectedDesignationId("");
    }
  }, [selectedDeptId, departments, initialData]);

  async function handleSubmit(formData: FormData) {
    const res = initialData 
      ? await updateEmployee(initialData.id, formData)
      : await createEmployee(formData);
    
    if (res.success) {
      router.push("/employees");
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">{initialData ? 'Edit Employee' : 'Add New Employee'}</h1>
      <form action={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow border border-zinc-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Employee ID</label>
            <input
              type="text"
              name="employeeId"
              defaultValue={initialData?.employeeId}
              required
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              defaultValue={initialData?.name}
              required
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              defaultValue={initialData?.email}
              required
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Department</label>
            <select 
              name="departmentId" 
              value={selectedDeptId}
              onChange={(e) => setSelectedDeptId(e.target.value)}
              required 
              className="w-full border rounded-lg p-2 bg-white"
            >
              <option value="">Select Department</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Designation</label>
            <select 
              name="designationId" 
              value={selectedDesignationId}
              onChange={(e) => setSelectedDesignationId(e.target.value)}
              required 
              disabled={!selectedDeptId}
              className="w-full border rounded-lg p-2 bg-white disabled:opacity-50"
            >
              <option value="">Select Designation</option>
              {designations.map((d) => (
                <option key={d.id} value={d.id}>{d.name}{!d.isActive ? ' (Inactive)' : ''}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button type="submit" className="bg-black text-white px-6 py-2 rounded-lg">
            {initialData ? 'Update Employee' : 'Add Employee'}
          </button>
          <button type="button" onClick={() => router.back()} className="border px-6 py-2 rounded-lg">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
