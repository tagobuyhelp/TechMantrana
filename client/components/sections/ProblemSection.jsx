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
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[rgba(15,23,42,0.72)] p-4 shadow-[0_16px_46px_rgba(0,0,0,0.28)] backdrop-blur transition-[box-shadow,background-color,border-color,transform] duration-200 hover:border-[#015FC4]/25 hover:bg-[rgba(15,23,42,0.82)] hover:shadow-[0_26px_70px_rgba(0,0,0,0.5)] sm:p-5"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(420px_circle_at_20%_10%,rgba(1,95,196,0.14),transparent_62%)] opacity-60" />
      <div className="relative flex flex-1 flex-col">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#015FC4] text-white shadow-[0_12px_34px_rgba(1,95,196,0.22)] transition-colors sm:h-12 sm:w-12">
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

        <div className="mt-4 h-px w-10 bg-[#015FC4]/60 sm:mt-5" aria-hidden="true" />
      </div>

      <div
        className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-linear-to-r from-transparent via-[#015FC4]/35 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
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
    <section className="tm-section tm-section--alt tm-section--image relative overflow-hidden border-t border-white/10 py-10 sm:py-14 md:py-16">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <Image
          src="/images/techmantrana-problem-section-wide.png"
          alt=""
          fill
          priority={false}
          sizes="(max-width: 768px) 100vw, 98vw"
          className="object-cover object-center opacity-15 sm:opacity-20 lg:opacity-25"
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#050B14]/98 via-[#050B14]/92 to-[#050B14]/78" />
        <div className="absolute inset-0 bg-linear-to-b from-[#050B14]/78 via-[#050B14]/82 to-[#050B14]/92" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12] bg-[radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.55)_1px,transparent_0)] bg-size-[30px_30px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 top-10 h-130 w-130 rounded-full bg-[radial-gradient(circle_at_center,rgba(1,95,196,0.25),transparent_62%)] blur-2xl"
        aria-hidden="true"
      />
      <Container className="relative z-10">
        <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-160px" }}
            className="mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-none lg:text-left"
          >
            <div className="tm-kicker">The Fragmentation Problem</div>
            <h2 className="mt-3 font-heading text-2xl font-semibold leading-[1.1] tracking-tight text-[#F8FAFC] sm:text-3xl lg:text-4xl">
              Most Organizations Don’t Have a Cybersecurity Problem Alone
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#A1AFC3] sm:text-base">
              They have a fragmentation problem. Governance sits with one team, risk with another,
              compliance with a third, and privacy somewhere in between. Frameworks are addressed in silos,
              audits are treated as one-time events, and regulatory requirements are often managed in isolation.
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
          className="mt-7 grid grid-cols-2 gap-4 sm:mt-9 sm:gap-6 lg:grid-cols-4"
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
