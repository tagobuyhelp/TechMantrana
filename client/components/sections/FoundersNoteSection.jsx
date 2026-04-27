"use client";

import { motion } from "framer-motion";
import { Globe, ShieldCheck, Target } from "lucide-react";

import Container from "../ui/Container";

const pillars = [
  {
    title: "Integrated Vision",
    description:
      "Unify cybersecurity, risk, and compliance into one execution-led capability.",
    icon: Target,
  },
  {
    title: "Enterprise Execution",
    description:
      "Translate frameworks into controls, evidence, and outcomes that stand up to scrutiny.",
    icon: ShieldCheck,
  },
  {
    title: "Global Exposure",
    description:
      "Delivery perspective shaped across India, the GCC, and global markets.",
    icon: Globe,
  },
];

function PillarCard({ item }) {
  const Icon = item.icon;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[rgba(15,23,42,0.68)] p-4 shadow-[0_18px_60px_rgba(0,0,0,0.42)] backdrop-blur sm:p-5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(520px_circle_at_18%_0%,rgba(38,193,211,0.12),transparent_60%)] opacity-70" />
      <div className="relative flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#26C1D3] shadow-[0_10px_26px_rgba(0,0,0,0.25)] sm:h-12 sm:w-12">
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-[#E5E7EB] sm:text-base">
            {item.title}
          </div>
          <p className="mt-1 text-xs leading-relaxed text-[#94A3B8] sm:text-sm">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FoundersNoteSection() {
  const fadeUp = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  return (
    <section
      className="tm-section tm-section--alt relative overflow-hidden border-t border-white/10 py-10 sm:py-14 md:py-16"
      aria-label="Founder’s Note"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12] bg-[radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.55)_1px,transparent_0)] bg-size-[30px_30px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-28 top-10 h-130 w-130 rounded-full bg-[radial-gradient(circle_at_center,rgba(38,193,211,0.18),transparent_62%)] blur-2xl"
        aria-hidden="true"
      />
      <Container>
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-160px" }}
          >
            <div className="tm-kicker">Founder’s Note</div>
            <h2 className="mt-3 font-heading text-2xl font-semibold leading-[1.1] tracking-tight text-[#F8FAFC] sm:text-3xl lg:text-4xl">
              Building Resilience Through Integrated Cybersecurity, Risk &amp; Compliance
            </h2>
            <div className="mt-3 h-px w-10 bg-[#26C1D3]/60 sm:mt-4" aria-hidden="true" />

            <div className="mt-4 space-y-3 text-sm leading-relaxed text-[#A1AFC3] sm:mt-5 sm:text-base">
              <p>
                TechMantrana was founded with a clear vision to bring cybersecurity,
                risk, and compliance together as one integrated, execution-led
                capability.
              </p>
              <p>
                Across industries and regions, organizations today are overwhelmed by
                the growing number of frameworks, regulations, and compliance
                requirements. Managing these in isolation often leads to complexity
                without clarity.
              </p>
              <p>
                At TechMantrana, we address this challenge by helping organizations
                simplify and align their security programs through a unified control
                approach, enabling consistent governance across regulatory
                environments.
              </p>
              <p>
                Having worked across India, the GCC, and global markets, we believe
                that effective cybersecurity is not just about controls — it is about
                context, execution, and sustainability.
              </p>
              <p>
                Our focus is to help organizations move from compliance-driven
                security to resilience-driven transformation, building secure and
                future-ready digital ecosystems.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.08, delayChildren: 0.04 },
              },
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-160px" }}
            className="grid gap-3 sm:gap-4"
          >
            {pillars.map((item) => (
              <motion.div key={item.title} variants={fadeUp}>
                <PillarCard item={item} />
              </motion.div>
            ))}
            <motion.div variants={fadeUp} className="rounded-2xl border border-white/10 bg-[rgba(5,11,20,0.40)] px-4 py-4 text-sm text-[#E5E7EB]/80 shadow-[0_18px_60px_rgba(0,0,0,0.42)] sm:px-5 sm:py-5">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#94A3B8]">
                Commitment
              </div>
              <div className="mt-2 leading-relaxed">
                Clear governance, pragmatic execution, and audit-ready assurance —
                delivered with enterprise discipline.
              </div>
              <div className="mt-4 h-px w-10 bg-[#26C1D3]/60" aria-hidden="true" />
              <div className="mt-3 text-sm font-semibold text-[#E5E7EB]">
                Founder, TechMantrana
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
