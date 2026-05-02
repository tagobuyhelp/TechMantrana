"use client";

const variants = {
  primary:
    "bg-[#015FC4] text-white hover:bg-[#014FAD] active:bg-[#013F8F]",
  secondary:
    "border border-[#1E293B] bg-transparent text-[#E5E7EB] hover:bg-white/5",
  ghost:
    "bg-transparent text-[#E5E7EB]/80 hover:bg-white/5 hover:text-[#E5E7EB]",
};

export default function Button({
  children,
  variant = "primary",
  onClick,
  className = "",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={[
        "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015FC4]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050B14] disabled:pointer-events-none disabled:opacity-50",
        variants[variant] ?? variants.primary,
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
