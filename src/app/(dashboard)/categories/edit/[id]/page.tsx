import { getCategory, updateCategory } from "../../actions";
import { notFound, redirect } from "next/navigation";
import BackButton from "@/components/ui/BackButton";

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = await getCategory(id);
  if (!category) return notFound();

  async function handleSubmit(formData: FormData) {
    "use server";
    const res = await updateCategory(id, formData);
    if (res.success) redirect("/categories");
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <BackButton href="/categories" />
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Edit Category</h1>
      </div>

      <form action={handleSubmit} className="bg-white p-6 rounded-xl shadow border border-zinc-100">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              defaultValue={category.name}
              required
              className="w-full border border-zinc-300 rounded-lg p-2"
            />
          </div>
          <button type="submit" className="bg-black text-white px-5 py-2 rounded-lg">
            Update Category
          </button>
        </div>
      </form>
    </div>
  );
}
