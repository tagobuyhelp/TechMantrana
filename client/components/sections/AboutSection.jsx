"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Layers, MapPinned, ShieldCheck } from "lucide-react";
import Image from "next/image";

import Container from "../ui/Container";

const trustCards = [
  {
    title: "Unified Control Approach",
    description: "Governance aligned to execution with audit-ready evidence",
    icon: BadgeCheck,
  },
  {
    title: "Multi-Region Regulatory Knowledge",
    description: "Working exposure across India, GCC, and Europe",
    icon: MapPinned,
  },
  {
    title: "Enterprise & Regulated Environments",
    description: "Built for high-trust industries and critical systems",
    icon: ShieldCheck,
  },
  {
    title: "Defensible Outcomes",
    description: "Not just compliant—security that stands up in practice",
    icon: Layers,
  },
];

const highlights = [
  "Where governance meets execution—built for real-world resilience",
  "Cybersecurity, risk, compliance, privacy, and resilience as one integrated capability",
  "Unified control approach across frameworks, audits, and regulators",
  "Designed to be defensible—not only compliant",
];

function StatCard({ title, description, icon: Icon }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[rgba(15,23,42,0.72)] p-4 shadow-[0_16px_46px_rgba(0,0,0,0.28)] backdrop-blur sm:p-5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(520px_circle_at_18%_0%,rgba(1,95,196,0.12),transparent_60%)] opacity-60" />
      <div className="flex items-start gap-3">
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#015fc4] shadow-[0_12px_34px_rgba(1,95,196,0.18)] sm:h-12 sm:w-12">
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-[#E5E7EB]">{title}</div>
          <div className="mt-1 text-xs leading-relaxed text-[#94A3B8] sm:text-sm">
            {description}
          </div>
        </div>
      </div>
      <div className="mt-4 h-px w-10 bg-[#015FC4]/60 sm:mt-5" aria-hidden="true" />
    </div>
  );
}

function HighlightItem({ children }) {
  return (
    <li className="flex gap-3 text-sm text-[#94A3B8]">
      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#015FC4]" />
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
      className="tm-section tm-section--alt relative overflow-hidden border-t border-white/10 py-10 sm:py-14 md:py-16"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12] bg-[radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.55)_1px,transparent_0)] bg-size-[30px_30px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-28 top-10 h-130 w-130 rounded-full bg-[radial-gradient(circle_at_center,rgba(1,95,196,0.18),transparent_62%)] blur-2xl"
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
            <div className="tm-kicker">Behind the Brand</div>
            <div className="mt-3 text-sm font-semibold tracking-tight text-[#E5E7EB] sm:text-base">
              About TechMantrana
            </div>
            <h2 className="mt-3 font-heading text-2xl font-semibold leading-[1.1] tracking-tight text-[#F8FAFC] sm:text-3xl lg:text-4xl">
              Where governance meets execution.
            </h2>
            <div className="mt-3 h-px w-10 bg-[#015FC4]/60 sm:mt-4" aria-hidden="true" />
            <div className="mt-3 max-w-xl space-y-3 text-sm leading-relaxed text-[#A1AFC3] sm:text-base">
              <p>
                Most organizations do not have a cybersecurity problem alone. They have a fragmentation problem.
              </p>
              <p>
                Governance sits with one team, risk with another, compliance with a third, and privacy somewhere in between.
                Frameworks are addressed in silos, audits are treated as one-time events, and regulatory requirements are
                often managed in isolation. The result is an organization that may be busy with compliance, but not always
                genuinely resilient.
              </p>
              <p>
                TechMantrana was built to close that gap.
              </p>
              <p>
                We bring cybersecurity, risk, compliance, privacy, and resilience together as one integrated capability -
                designed not just to satisfy auditors, but to help organizations build security programs that work in practice.
              </p>
              <p>
                Our work spans governance, risk and compliance advisory, security testing and assurance, data privacy and
                protection, business continuity, DevSecOps, critical infrastructure security, virtual CISO services, and
                professional training programs.
              </p>
              <p>
                We operate across India, the GCC, and Europe, with working knowledge of the regulatory environments specific
                to each market - from the DPDP Act, RBI, SEBI, IRDAI, CERT-In, and NCIIPC in India, to UAE IA Standards, DESC
                ISR, ADHICS, and regional GCC frameworks, to GDPR, DORA, and NIS2 in Europe.
              </p>
            </div>

            <motion.div variants={fadeUp} className="mt-6 sm:mt-8">
              <div className="text-sm font-semibold text-[#E5E7EB]">
                What sets us apart
              </div>
              <ul className="mt-3 grid gap-2.5 sm:gap-3">
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
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(620px_circle_at_65%_0%,rgba(1,95,196,0.18),transparent_62%)]" />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#050B14]/75 via-transparent to-transparent" />
                <div className="pointer-events-none absolute inset-0 opacity-[0.14] bg-[radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.55)_1px,transparent_0)] bg-size-[34px_34px]" />

                <div className="relative h-60 sm:h-80 lg:h-96">
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
                  className="pointer-events-none absolute right-6 top-6 hidden h-20 w-20 items-center justify-center rounded-2xl border border-[#015FC4]/25 bg-[rgba(15,23,42,0.35)] shadow-[0_18px_60px_rgba(0,0,0,0.45)] backdrop-blur lg:flex"
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 64 64"
                    className="h-12 w-12 text-[#015FC4]/75"
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

            <div className="mt-4 grid gap-4 sm:mt-5 sm:grid-cols-2 sm:gap-6">
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
