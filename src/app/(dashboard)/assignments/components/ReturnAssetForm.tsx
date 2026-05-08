"use client";

import { returnAsset } from "../actions";
import { useRouter } from "next/navigation";

export default function ReturnAssetForm({ assignmentId, assetId }: { assignmentId: string, assetId: string }) {
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    const res = await returnAsset(assignmentId, assetId, formData);
    if (res.success) {
      router.push("/assignments");
    }
  }

  return (
    <form action={handleSubmit} className="space-y-5 bg-white p-6 rounded-xl shadow border border-zinc-100 max-w-2xl">
      <div>
        <label className="block mb-2 font-medium text-sm">Return Reason</label>
        <select name="returnReason" required className="w-full border rounded-lg p-3 bg-white text-sm">
          <option value="">Select a reason</option>
          <option value="Resignation">Resignation</option>
          <option value="Termination">Termination</option>
          <option value="Repair/Maintenance">Repair/Maintenance</option>
          <option value="Lost/Stolen">Lost/Stolen</option>
          <option value="Upgrade">Upgrade</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label className="block mb-2 font-medium text-sm">Additional Notes (Optional)</label>
        <textarea 
          name="returnNotes" 
          rows={4} 
          className="w-full border rounded-lg p-3 text-sm" 
          placeholder="Condition of asset, details about return, etc."
        ></textarea>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" className="bg-black text-white px-6 py-3 rounded-lg text-sm font-bold">
          Confirm Return
        </button>
        <button type="button" onClick={() => router.back()} className="border border-zinc-200 px-6 py-3 rounded-lg text-sm font-bold">
          Cancel
        </button>
      </div>
    </form>
  );
}
