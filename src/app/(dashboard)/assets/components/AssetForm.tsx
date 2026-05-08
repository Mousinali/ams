"use client";

import { createAsset, updateAsset } from "../actions";
import { useRouter } from "next/navigation";

export default function AssetForm({ categories, initialData }: { categories: any[], initialData?: any }) {
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    const res = initialData 
      ? await updateAsset(initialData.id, formData)
      : await createAsset(formData);
    
    if (res.success) {
      router.push("/assets");
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">{initialData ? 'Edit Asset' : 'Add New Asset'}</h1>
      <form action={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow border border-zinc-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Asset Tag</label>
            <input
              type="text"
              name="assetTag"
              defaultValue={initialData?.assetTag}
              required
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Asset Name</label>
            <input
              type="text"
              name="name"
              defaultValue={initialData?.name}
              required
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Category</label>
            <select name="categoryId" defaultValue={initialData?.categoryId} required className="w-full border rounded-lg p-2 bg-white">
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Brand</label>
            <input
              type="text"
              name="brand"
              defaultValue={initialData?.brand}
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Model</label>
            <input
              type="text"
              name="model"
              defaultValue={initialData?.model}
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Serial Number</label>
            <input
              type="text"
              name="serialNumber"
              defaultValue={initialData?.serialNumber}
              className="w-full border rounded-lg p-2"
            />
          </div>
          
          {initialData && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select name="status" defaultValue={initialData?.status} className="w-full border rounded-lg p-2 bg-white">
                  <option value="AVAILABLE">AVAILABLE</option>
                  <option value="ASSIGNED">ASSIGNED</option>
                  <option value="MAINTENANCE">MAINTENANCE</option>
                  <option value="RETIRED">RETIRED</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Condition</label>
                <select name="condition" defaultValue={initialData?.condition} className="w-full border rounded-lg p-2 bg-white">
                  <option value="GOOD">GOOD</option>
                  <option value="FAIR">FAIR</option>
                  <option value="POOR">POOR</option>
                  <option value="BROKEN">BROKEN</option>
                </select>
              </div>
            </>
          )}
        </div>

        <div className="flex gap-3 pt-4">
          <button type="submit" className="bg-black text-white px-6 py-2 rounded-lg">
            {initialData ? 'Update Asset' : 'Add Asset'}
          </button>
          <button type="button" onClick={() => router.back()} className="border px-6 py-2 rounded-lg">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}