"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Layers, MapPinned, ShieldCheck } from "lucide-react";
import Image from "next/image";

import Container from "../ui/Container";

const trustCards = [
  {
    title: "ISO/IEC 27001:2022 Certified",
    description: "Security governance aligned to global standards",
    icon: BadgeCheck,
  },
  {
    title: "India, GCC & Europe Coverage",
    description: "Delivery experience across multi-region programs",
    icon: MapPinned,
  },
  {
    title: "Enterprise & Regulated Environments",
    description: "Controls-first approach for high-trust industries",
    icon: ShieldCheck,
  },
  {
    title: "End-to-End Delivery Model",
    description: "From assessment to execution and assurance",
    icon: Layers,
  },
];

const highlights = [
  "Integrated cybersecurity, risk, and compliance capability",
  "Regulatory-aligned approach across frameworks and controls",
  "Execution beyond advisory with measurable outcomes",
  "Structured enterprise delivery with stakeholder clarity",
];

function StatCard({ title, description, icon: Icon }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[rgba(15,23,42,0.72)] p-6 shadow-[0_16px_46px_rgba(0,0,0,0.28)] backdrop-blur">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(520px_circle_at_18%_0%,rgba(38,193,211,0.12),transparent_60%)] opacity-60" />
      <div className="flex items-start gap-3">
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#26C1D3] shadow-[0_10px_26px_rgba(0,0,0,0.25)]">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-[#E5E7EB]">{title}</div>
          <div className="mt-1 text-sm leading-relaxed text-[#94A3B8]">
            {description}
          </div>
        </div>
      </div>
      <div className="mt-6 h-px w-10 bg-[#26C1D3]/60" aria-hidden="true" />
    </div>
  );
}

function HighlightItem({ children }) {
  return (
    <li className="flex gap-3 text-sm text-[#94A3B8]">
      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#26C1D3]" />
      <span>{children}</span>
    </li>
  );
}

export default function AboutSection() {
  const fadeUp = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  return (
    <section
      id="about"
      className="tm-section tm-section--alt relative overflow-hidden border-t border-white/10 py-24 lg:py-32"
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
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-160px" }}
          >
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#26C1D3]">
              About TechMantrana
            </div>
            <h2 className="mt-4 font-heading text-3xl leading-tight tracking-tight text-[#E5E7EB] sm:text-4xl">
              One Integrated Cybersecurity Capability
            </h2>
            <div className="mt-5 h-px w-10 bg-[#26C1D3]/60" aria-hidden="true" />
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[#94A3B8]">
              TechMantrana unifies cybersecurity, GRC, and risk into a single
              execution-led capability—built for enterprise environments across
              India, GCC, and Europe. We translate control requirements into
              practical delivery, aligning stakeholders from assessment through
              implementation and assurance.
            </p>

            <motion.div variants={fadeUp} className="mt-10">
              <div className="text-sm font-semibold text-[#E5E7EB]">
                What sets us apart
              </div>
              <ul className="mt-4 grid gap-3">
                {highlights.map((item) => (
                  <HighlightItem key={item}>{item}</HighlightItem>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-160px" }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.08, delayChildren: 0.05 },
              },
            }}
          >
            <motion.div variants={fadeUp} className="relative">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[rgba(15,23,42,0.55)] shadow-[0_26px_80px_rgba(0,0,0,0.55)] backdrop-blur">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(620px_circle_at_65%_0%,rgba(38,193,211,0.18),transparent_62%)]" />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#050B14]/75 via-transparent to-transparent" />
                <div className="pointer-events-none absolute inset-0 opacity-[0.14] bg-[radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.55)_1px,transparent_0)] bg-size-[34px_34px]" />

                <div className="relative h-72 sm:h-80 lg:h-96">
                  <Image
                    src="/images/techmantrana-about-cybersecurity-consulting-team.png"
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover object-center"
                    priority={false}
                  />
                </div>

                <div
                  className="pointer-events-none absolute right-6 top-6 hidden h-20 w-20 items-center justify-center rounded-2xl border border-[#26C1D3]/25 bg-[rgba(15,23,42,0.35)] shadow-[0_18px_60px_rgba(0,0,0,0.45)] backdrop-blur lg:flex"
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 64 64"
                    className="h-12 w-12 text-[#26C1D3]/75"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M32 6C39 12 48 14 56 16V34C56 46 47 54 32 60C17 54 8 46 8 34V16C16 14 25 12 32 6Z"
                      stroke="currentColor"
                      strokeWidth="2.4"
                    />
                    <path
                      d="M32 26C36.5 26 40 29.5 40 34V38H24V34C24 29.5 27.5 26 32 26Z"
                      stroke="currentColor"
                      strokeWidth="2.4"
                    />
                    <rect
                      x="22"
                      y="38"
                      width="20"
                      height="16"
                      rx="5"
                      stroke="currentColor"
                      strokeWidth="2.4"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {trustCards.map((card) => (
                <motion.div key={card.title} variants={fadeUp} className="h-full">
                  <StatCard {...card} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
