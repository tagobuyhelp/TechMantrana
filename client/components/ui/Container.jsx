export default function Container({ children, className = "" }) {
  return (
    <div className={["mx-auto w-full max-w-7xl px-4", className].join(" ")}>
      {children}
    </div>
  );
}
