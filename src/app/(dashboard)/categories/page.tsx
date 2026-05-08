import Link from "next/link";
import { getCategories, toggleCategoryActive, createCategory } from "./actions";
import { Metadata } from "next";
import StatusToggle from "@/components/ui/StatusToggle";
import { revalidatePath } from "next/cache";

export const metadata: Metadata = {
  title: "Categories",
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  async function handleSubmit(formData: FormData) {
    "use server";
    await createCategory(formData);
    revalidatePath("/categories");
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900">Categories</h2>
          <p className="text-zinc-500 text-sm mt-1">Manage asset classifications and types.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-1">
          <form action={handleSubmit} className="bg-white p-6 rounded-xl shadow border border-zinc-100">
            <h3 className="text-lg font-bold mb-4">Add New Category</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full border rounded-lg p-2"
                  placeholder="e.g. Laptops"
                />
              </div>
              <button type="submit" className="bg-black text-white px-5 py-2 rounded-lg w-full">
                Create Category
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
                  <th className="px-6 py-4 text-center">Active</th>
                  <th className="px-6 py-4">Created At</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-zinc-400 italic">
                      No categories found.
                    </td>
                  </tr>
                ) : (
                  categories.map((category) => (
                    <tr key={category.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-zinc-700">{category.name}</td>
                      <td className="px-6 py-4 text-center">
                        <StatusToggle 
                          id={category.id} 
                          isActive={category.isActive} 
                          onToggle={toggleCategoryActive} 
                        />
                      </td>
                      <td className="px-6 py-4 text-zinc-500 text-sm">{category.createdAt.toISOString().split('T')[0]}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-3 text-lg">
                          <Link href={`/categories/edit/${category.id}`} className="text-zinc-400 hover:text-emerald-600 transition-colors" title="Edit Category">
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
