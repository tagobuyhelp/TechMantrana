export default function SectionWrapper({ children, className = "" }) {
  return (
    <section className={["py-16 md:py-20", className].join(" ")}>
      {children}
    </section>
  );
}
