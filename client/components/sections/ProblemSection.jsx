"use client";

import { motion } from "framer-motion";
import { Eye, LayoutGrid, Layers, Scale } from "lucide-react";
import Image from "next/image";

import Container from "../ui/Container";

const problems = [
  {
    title: "Fragmented Compliance Requirements",
    description:
      "Multiple frameworks and audits create overlapping obligations and gaps.",
    icon: Layers,
  },
  {
    title: "Lack of Unified Security Controls",
    description:
      "Controls are implemented inconsistently across teams, tools, and systems.",
    icon: LayoutGrid,
  },
  {
    title: "Increasing Regulatory Pressure",
    description:
      "Regulators expect evidence, governance, and continuous assurance outcomes.",
    icon: Scale,
  },
  {
    title: "Limited Visibility Across Risk & Security",
    description:
      "Leadership lacks a clear view of exposure, control coverage, and priorities.",
    icon: Eye,
  },
];

function ProblemCard({ item }) {
  const Icon = item.icon;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[rgba(15,23,42,0.72)] p-4 shadow-[0_16px_46px_rgba(0,0,0,0.28)] backdrop-blur transition-[box-shadow,background-color,border-color,transform] duration-200 hover:border-[#26C1D3]/25 hover:bg-[rgba(15,23,42,0.82)] hover:shadow-[0_26px_70px_rgba(0,0,0,0.5)] sm:p-5"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(420px_circle_at_20%_10%,rgba(38,193,211,0.14),transparent_62%)] opacity-60" />
      <div className="relative flex flex-1 flex-col">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#94A3B8] shadow-[0_10px_26px_rgba(0,0,0,0.25)] transition-colors group-hover:text-[#26C1D3] sm:h-12 sm:w-12">
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
        </div>

        <div className="mt-3 min-w-0 sm:mt-4">
          <div className="text-sm font-semibold leading-snug text-[#E5E7EB] sm:text-base">
            {item.title}
          </div>
          <p className="mt-2 text-xs leading-relaxed text-[#94A3B8] sm:text-sm">
            {item.description}
          </p>
        </div>

        <div className="mt-4 h-px w-10 bg-[#26C1D3]/60 sm:mt-5" aria-hidden="true" />
      </div>

      <div
        className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-linear-to-r from-transparent via-[#26C1D3]/35 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        aria-hidden="true"
      />
    </motion.div>
  );
}

export default function ProblemSection() {
  const fadeUp = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  return (
    <section className="tm-section tm-section--alt tm-section--image relative overflow-hidden border-t border-white/10 py-12 sm:py-16 md:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <Image
          src="/images/techmantrana-problem-section-wide.png"
          alt=""
          fill
          priority={false}
          sizes="(max-width: 768px) 100vw, 98vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#050B14]/95 via-[#050B14]/80 to-[#050B14]/55" />
        <div className="absolute inset-0 bg-linear-to-b from-[#050B14]/40 via-[#050B14]/25 to-[#050B14]/55" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12] bg-[radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.55)_1px,transparent_0)] bg-size-[30px_30px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 top-10 h-130 w-130 rounded-full bg-[radial-gradient(circle_at_center,rgba(38,193,211,0.25),transparent_62%)] blur-2xl"
        aria-hidden="true"
      />
      <Container>
        <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-160px" }}
            className="mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-none lg:text-left"
          >
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#26C1D3]">
              Challenges
            </div>
            <h2 className="mt-3 font-heading text-2xl leading-[1.1] tracking-tight text-[#E5E7EB] sm:text-3xl lg:text-4xl">
              Managing Cybersecurity Across Multiple Regulations Is Complex
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#94A3B8] sm:text-base">
              Most organizations operate across fragmented systems and overlapping
              frameworks—without a unified control model to connect security,
              compliance, and risk.
            </p>
          </motion.div>

        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-160px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.07, delayChildren: 0.05 },
            },
          }}
          className="mt-8 grid grid-cols-2 gap-4 sm:mt-10 sm:gap-6 lg:grid-cols-4"
        >
          {problems.map((item) => (
            <motion.div key={item.title} variants={fadeUp} className="h-full">
              <ProblemCard item={item} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
