"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/login/actions";

const menuItems = [
  {
    group: "Organization",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: "ri-layout-grid-line" },
      { name: "Employees", href: "/employees", icon: "ri-team-line" },
      {
        name: "Assignments",
        href: "/assignments",
        icon: "ri-arrow-left-right-line",
      },
    ],
  },
  {
    group: "Management",
    items: [
      { name: "Assets", href: "/assets", icon: "ri-computer-line" },

      { name: "Categories", href: "/categories", icon: "ri-price-tag-3-line" },
      { name: "Departments", href: "/departments", icon: "ri-building-line" },
      { name: "Designations", href: "/designations", icon: "ri-id-card-line" },
    ],
  },
  {
    group: "Settings",
    items: [
      { name: "Reports", href: "/reports", icon: "ri-bar-chart-2-line" },
      { name: "Settings", href: "/settings", icon: "ri-settings-3-line" },
    ],
  },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  isCollapsed: boolean;
}

export default function Sidebar({
  isOpen,
  onClose,
  isCollapsed,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-zinc-950/20 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen flex-col border-r border-zinc-200 bg-white transition-all duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${isCollapsed ? "w-16 overflow-visible" : "w-64"}`}
      >
        {/* Workspace Switcher */}
        <div className={`shrink-0 border-b border-zinc-200 ${isCollapsed ? "py-4 flex justify-center" : "p-4 pr-12"}`}>
          <div
            className={`flex items-center gap-3 text-zinc-900 transition-colors ${isCollapsed ? "" : "hover:bg-zinc-100/80 rounded-lg p-2"}`}
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width={isCollapsed ? 32 : 40}
              height={isCollapsed ? 32 : 40}
              className="object-contain"
            />
            {!isCollapsed && (
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-semibold leading-none">
                  Turain Software
                </p>
                <p className="mt-1 truncate text-[11px] text-zinc-500 font-medium">
                  Private Limited
                </p>
              </div>
            )}
          </div>
          
          {/* Mobile Close Button - Moved inside the switcher for better alignment */}
          {!isCollapsed && (
            <button 
              onClick={onClose}
              className="absolute right-4 top-6 h-8 w-8 flex items-center justify-center rounded-lg bg-zinc-50 text-zinc-500 hover:bg-zinc-100 lg:hidden"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          )}
        </div>

        {/* Navigation */}
        <div
          className={`flex-1 py-4 scrollbar-hide space-y-6 ${isCollapsed ? "px-0 overflow-visible" : "px-4 overflow-y-auto overflow-x-hidden"}`}
        >
          {menuItems.map((group) => (
            <div key={group.group}>
              {!isCollapsed && (
                <h2 className="px-3 text-xs font-medium text-zinc-400 mb-2">
                  {group.group}
                </h2>
              )}
              <nav className="space-y-1">
                {group.items.map((item) => {
                  const active = pathname === item.href || pathname.startsWith(item.href + "/");
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={onClose}
                      className={`group relative flex items-center rounded-lg transition-all ${
                        active
                          ? "bg-gradient-to-b from-[#6D9AD1] to-[#4d4ad0] text-white font-medium"
                          : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                      } ${isCollapsed ? "justify-center h-10 w-10 mx-auto px-0" : "gap-3 px-3 py-2 text-sm"}`}
                    >
                      <i
                        className={`${item.icon} text-lg ${active ? "text-white" : "text-zinc-400"}`}
                      ></i>
                      {!isCollapsed && (
                        <span className="flex-1 truncate">{item.name}</span>
                      )}

                      {/* Tooltip Concept */}
                      {isCollapsed && (
                        <div className="absolute left-full ml-4 z-100 invisible group-hover:visible opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all pointer-events-none">
                          <div className="bg-zinc-950 text-zinc-50 text-[11px] font-medium px-2.5 py-1.5 rounded-md shadow-xl border border-white/10 whitespace-nowrap">
                            {item.name}
                          </div>
                          <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[6px] border-r-zinc-950"></div>
                        </div>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        {/* User Section (Bottom) */}
        <div
          className={`p-2 pb-4 shrink-0 ${isCollapsed ? "overflow-visible" : ""}`}
        >
          <div
            className={`flex items-center gap-3 rounded-lg p-2 text-zinc-900 transition-colors hover:bg-zinc-50 ${isCollapsed ? "justify-center" : ""}`}
          >
            <div className="h-8 w-8 min-w-[32px] rounded-md bg-zinc-100 flex items-center justify-center border border-zinc-200 overflow-hidden shadow-sm">
              <i className="ri-user-line text-zinc-500"></i>
            </div>
            {!isCollapsed && (
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-semibold leading-none">
                  Admin Account
                </p>
                <p className="mt-1 truncate text-[11px] text-zinc-500 font-medium tracking-tight">
                  admin@antigravity.io
                </p>
              </div>
            )}
            {!isCollapsed && (
              <form action={logoutAction} className="flex">
                <button
                  type="submit"
                  className="text-zinc-400 hover:text-red-600 p-1 transition-colors"
                  title="Logout"
                >
                  <i className="ri-logout-box-line text-lg"></i>
                </button>
              </form>
            )}

            {/* User Tooltip */}
            {isCollapsed && (
              <div className="absolute left-full ml-4 z-[100] invisible group-hover:visible opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all pointer-events-none">
                <div className="bg-zinc-950 text-zinc-50 text-[11px] font-medium px-2.5 py-1.5 rounded-md shadow-xl border border-white/10 whitespace-nowrap">
                  Admin Account
                </div>
                <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[6px] border-r-zinc-950"></div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
