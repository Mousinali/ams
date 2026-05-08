"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SettingsTabs() {
  const pathname = usePathname();

  const tabs = [
    { name: "Categories", href: "/settings/categories" },
    { name: "Departments", href: "/settings/departments" },
    { name: "Designations", href: "/settings/designations" },
  ];

  return (
    <div className="flex border-b border-zinc-200">
      {tabs.map((tab) => {
        const isActive = pathname.includes(tab.href);
        return (
          <Link
            key={tab.name}
            href={tab.href}
            className={`px-6 py-4 text-sm font-medium transition-colors ${
              isActive
                ? "border-b-2 border-black text-black"
                : "text-zinc-500 hover:text-black"
            }`}
          >
            {tab.name}
          </Link>
        );
      })}
    </div>
  );
}
