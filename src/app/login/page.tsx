"use client";

import { loginAction } from "./actions";
import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await loginAction(formData);
    if (result && !result.success) {
      setError(result.error || "An error occurred");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo or Brand */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-black/10">
            <i className="ri-shield-keyhole-line text-3xl"></i>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">MY AMS</h1>
          <p className="text-zinc-500 mt-2">Asset Management System</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-2xl shadow-black/5 border border-zinc-100">
          <h2 className="text-xl font-bold mb-6">Welcome back</h2>
          
          <form action={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-zinc-700 mb-2">Username</label>
              <div className="relative">
                <i className="ri-user-line absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"></i>
                <input 
                  type="text" 
                  name="username" 
                  required
                  placeholder="Enter your username"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-black/5 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-zinc-700 mb-2">Password</label>
              <div className="relative">
                <i className="ri-lock-2-line absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"></i>
                <input 
                  type="password" 
                  name="password" 
                  required
                  placeholder="••••••••"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-black/5 focus:bg-white transition-all"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                <i className="ri-error-warning-line text-lg"></i>
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Sign In
                  <i className="ri-arrow-right-line"></i>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-zinc-100">
            <p className="text-center text-sm text-zinc-400">
              Initial Login: <span className="font-medium text-zinc-600">admin</span> / <span className="font-medium text-zinc-600">123456</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
