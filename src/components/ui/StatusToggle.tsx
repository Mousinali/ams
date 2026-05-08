"use client";

import { useTransition } from "react";

interface StatusToggleProps {
  id: string;
  isActive: boolean;
  onToggle: (id: string, currentStatus: boolean) => Promise<any>;
}

export default function StatusToggle({ id, isActive, onToggle }: StatusToggleProps) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      await onToggle(id, isActive);
    });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
        isActive ? "bg-indigo-600" : "bg-zinc-200"
      } ${isPending ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          isActive ? "translate-x-5" : "translate-x-1"
        }`}
      />
    </button>
  );
}
