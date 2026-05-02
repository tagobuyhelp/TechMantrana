"use client";

import Link from "next/link";

export default function NavItem({ href, isActive, children, onNavigate, icon: Icon }) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={[
        "relative inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold tracking-tight transition-[color,background-color] duration-200 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015FC4]/60",
        "after:absolute after:inset-x-3 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:opacity-0 after:bg-linear-to-r after:from-transparent after:via-[#015FC4] after:to-transparent after:transition-[transform,opacity] after:duration-300",
        "hover:after:scale-x-100 hover:after:opacity-100 focus-visible:after:scale-x-100 focus-visible:after:opacity-100",
        isActive
          ? "text-[#015FC4] after:scale-x-100 after:opacity-100"
          : "text-[#E5E7EB]/80 hover:text-[#015FC4]",
      ].join(" ")}
    >
      {Icon ? (
        <Icon
          className={[
            "h-4 w-4",
            "text-[#015FC4]",
          ].join(" ")}
          aria-hidden="true"
        />
      ) : null}
      {children}
    </Link>
  );
}
