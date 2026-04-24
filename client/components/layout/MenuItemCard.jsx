"use client";

import Link from "next/link";

export default function MenuItemCard({
  href,
  title,
  description,
  icon: Icon,
  onNavigate,
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="group flex gap-3 rounded-xl border border-white/10 bg-(--tm-bg-card) p-4 shadow-[0_12px_34px_rgba(0,0,0,0.25)] transition-[border-color,background-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-[#26C1D3]/35 hover:bg-[rgba(15,23,42,0.96)] hover:shadow-[0_18px_44px_rgba(0,0,0,0.38)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26C1D3]/60 active:translate-y-px"
    >
      <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#26C1D3]">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <div className="text-sm font-semibold text-[#E5E7EB] transition-colors group-hover:text-[#26C1D3]">
          {title}
        </div>
        <div className="mt-1 line-clamp-1 text-sm text-[#94A3B8]">
          {description}
        </div>
      </div>
    </Link>
  );
}
