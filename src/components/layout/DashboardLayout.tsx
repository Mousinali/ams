"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/login/actions";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  // Get current page title from pathname
  const segments = pathname.split("/").filter(Boolean);

  return (
    <div className="flex min-h-screen bg-white max-w-full overflow-x-hidden font-sans">
      {/* Sidebar - Handles its own off-canvas state */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        isCollapsed={isCollapsed}
      />

      {/* Main Content Area */}
      <div
        className={`flex flex-1 flex-col min-w-0 w-full transition-all duration-300 ${isCollapsed ? "lg:pl-16" : "lg:pl-64"}`}
      >
        {/* Minimal Header */}
        <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center gap-2 border-b border-zinc-200 bg-white px-4 lg:px-6">
          <div className="flex items-center gap-2">
            {/* Sidebar Toggle (Shadcn style) */}
            <button
              onClick={() => {
                if (window.innerWidth < 1024) {
                  setIsSidebarOpen(true);
                } else {
                  setIsCollapsed(!isCollapsed);
                }
              }}
              className="flex h-8 w-8 items-center justify-center rounded-md  bg-white text-zinc-500 transition-colors hover:bg-zinc-50"
            >
              <i className="ri-side-bar-line text-lg"></i>
            </button>
            <div className="lg:hidden">
              <Image src="/logo.png" alt="Logo" width={32} height={32} />
            </div>
            <div className="h-4 w-px bg-zinc-200 mx-2 hidden lg:block"></div>

            <div className="hidden lg:flex items-center gap-2 text-xs font-medium text-zinc-400 overflow-hidden">
              <span className="hover:text-zinc-950 transition-colors hidden sm:block">
                Platform
              </span>
              {segments.map((segment, index) => (
                <div key={index} className="flex items-center gap-2">
                  <i className="ri-arrow-right-s-line text-zinc-300 flex-shrink-0"></i>
                  <span
                    className={`capitalize truncate max-w-[80px] sm:max-w-none ${index === segments.length - 1 ? "text-zinc-950 font-semibold" : "hover:text-zinc-600 transition-colors"}`}
                  >
                    {segment.replace(/-/g, " ")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex ml-auto items-center gap-2">
            <p className="truncate text-sm font-semibold leading-none">
              Admin Account
            </p>
            <form action={logoutAction} className="flex">
              <button
                type="submit"
                className="text-red-600 p-1 transition-colors cursor-pointer"
                title="Logout"
              >
                <i className="ri-logout-box-line text-lg"></i>
              </button>
            </form>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#F1F5F9]">
          <div className="mx-auto w-full max-w-[1400px] p-4 sm:p-6 lg:p-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
