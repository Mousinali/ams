"use client";

import { useRouter } from "next/navigation";

interface BackButtonProps {
  href?: string;
}

export default function BackButton({ href }: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <button
      onClick={handleBack}
      className="group flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all hover:bg-slate-50 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] active:scale-95"
      title="Go back"
    >
      <i className="ri-arrow-left-line text-zinc-600 transition-transform group-hover:-translate-x-0.5"></i>
    </button>
  );
}
