"use client";

import { motion } from "framer-motion";
import { Globe, ShieldCheck, Target } from "lucide-react";

import Container from "../ui/Container";

const pillars = [
  {
    title: "Execution Lens",
    description:
      "Move beyond documentation to operational controls that work in practice.",
    icon: Target,
  },
  {
    title: "Integrated Programs",
    description:
      "GRC, testing, engineering, privacy, and resilience as one unified program.",
    icon: ShieldCheck,
  },
  {
    title: "Resilience Focus",
    description:
      "Harder to compromise, faster to detect, and better prepared to recover.",
    icon: Globe,
  },
];

function PillarCard({ item }) {
  const Icon = item.icon;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[rgba(15,23,42,0.68)] p-4 shadow-[0_18px_60px_rgba(0,0,0,0.42)] backdrop-blur sm:p-5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(520px_circle_at_18%_0%,rgba(1,95,196,0.12),transparent_60%)] opacity-70" />
      <div className="relative flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#015FC4] text-white shadow-[0_12px_34px_rgba(1,95,196,0.22)] sm:h-12 sm:w-12">
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
      id="founders-note"
      className="tm-section tm-section--alt relative overflow-hidden border-t border-white/10 py-10 sm:py-14 md:py-16"
      aria-label="Founder's Note"
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
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-12">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-160px" }}
          >
            <div className="tm-kicker">Founder's Note</div>
            <h2 className="mt-3 font-heading text-2xl font-semibold leading-[1.1] tracking-tight text-[#F8FAFC] sm:text-3xl lg:text-4xl">
              The question I kept asking
            </h2>
            <div className="mt-3 h-px w-10 bg-[#015FC4]/60 sm:mt-4" aria-hidden="true" />

            <div className="mt-4 space-y-3 text-sm leading-relaxed text-[#A1AFC3] sm:mt-5 sm:text-base">
              <p>
                I have seen security programs that looked excellent on paper: comprehensive policies, detailed risk registers,
                passed audits, and certifications displayed with confidence.
              </p>
              <p>
                But the real question is different. What happens when a control fails? Who receives the alert? Who makes the decision?
                How quickly can the organization respond and recover?
              </p>
              <p>
                Too often, the answer reveals a gap between documentation and execution.
              </p>
              <p>
                The policy exists, but the control behind it is not fully implemented. The vulnerability is identified but not remediated.
                The audit is passed, but the organization is still not prepared for what comes next.
              </p>
              <p>
                That gap between governance and execution, between policy and practice, between documentation and defense - is what TechMantrana
                was built to close.
              </p>
              <p>
                At TechMantrana, GRC and compliance advisory are not separate from penetration testing, security engineering, business continuity,
                data privacy, or incident readiness. They are part of the same integrated program, aligned to one objective: helping organizations become
                harder to compromise, faster to detect threats, and better prepared to recover when something goes wrong.
              </p>
              <p>
                I started TechMantrana because I believe effective cybersecurity does not require endless complexity. It requires clarity, alignment, execution,
                and sustainability.
              </p>
              <p>
                That is what we aim to build with every client.
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
            className="grid gap-3 sm:gap-4 lg:flex lg:flex-col lg:justify-center"
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
                Clear governance, pragmatic execution, and audit-ready assurance 
                delivered with enterprise discipline.
              </div>
              <div className="mt-4 h-px w-10 bg-[#015FC4]/60" aria-hidden="true" />
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
