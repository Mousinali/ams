"use client";

import { updateCredentialsAction } from "./actions";
import { logoutAction } from "@/app/login/actions";
import { useState } from "react";
import { toast } from "sonner";

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    const result = await updateCredentialsAction(formData);
    setLoading(false);

    if (result.success) {
      toast.success("Credentials updated successfully");
      // Clear password fields manually if needed, or just let revalidate happen
    } else {
      toast.error(result.error || "Failed to update credentials");
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-zinc-600 mt-1">Manage your account credentials</p>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl shadow-black/5 p-8 border border-zinc-100">
        <div className="flex items-center gap-3 mb-8 border-b border-zinc-100 pb-6">
          <div className="w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center text-zinc-500">
            <i className="ri-user-settings-line text-2xl"></i>
          </div>
          <div>
            <h2 className="text-xl font-bold">Account Security</h2>
            <p className="text-sm text-zinc-500">Update your login information</p>
          </div>
        </div>

        <form action={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold text-sm text-zinc-700">Username</label>
            <input 
              type="text" 
              name="username" 
              required
              placeholder="admin"
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black/5 focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-sm text-zinc-700">Current Password</label>
            <input 
              type="password" 
              name="currentPassword" 
              required
              placeholder="••••••••"
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black/5 focus:bg-white transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-semibold text-sm text-zinc-700">New Password (Optional)</label>
              <input 
                type="password" 
                name="newPassword" 
                placeholder="••••••••"
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black/5 focus:bg-white transition-all"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-sm text-zinc-700">Confirm New Password</label>
              <input 
                type="password" 
                name="confirmPassword" 
                placeholder="••••••••"
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black/5 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="pt-6 flex justify-end">
            <button 
              type="submit" 
              disabled={loading}
              className="bg-black text-white px-8 py-3.5 rounded-xl font-bold hover:bg-zinc-800 transition-all flex items-center gap-2 disabled:opacity-50 active:scale-[0.98]"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : "Update Credentials"}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl shadow-black/5 p-8 border border-zinc-100 mt-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-500">
              <i className="ri-logout-circle-line text-2xl"></i>
            </div>
            <div>
              <h2 className="text-xl font-bold text-zinc-900">Sign Out</h2>
              <p className="text-sm text-zinc-500">End your current session safely</p>
            </div>
          </div>
          
          <form action={logoutAction}>
            <button 
              type="submit"
              className="bg-red-500 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-red-600 transition-all flex items-center gap-2 active:scale-[0.98]"
            >
              Log Out
              <i className="ri-logout-box-r-line"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
