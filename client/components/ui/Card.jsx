export default function Card({ children, className = "" }) {
  return (
    <div
      className={[
        "rounded-2xl border border-white/10 bg-(--tm-bg-card) p-5 shadow-[0_14px_40px_rgba(0,0,0,0.28)] transition-[transform,background-color,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-[#015FC4]/25 hover:bg-[rgba(15,23,42,0.96)] hover:shadow-[0_22px_60px_rgba(0,0,0,0.45)]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
