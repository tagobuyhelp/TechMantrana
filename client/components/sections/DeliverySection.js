"use client";

import { motion } from "framer-motion";
import { BadgeCheck, BookOpen, Shield, Wrench } from "lucide-react";
import Image from "next/image";

import Container from "../ui/Container";

const steps = [
  {
    number: "01",
    title: "Advisory",
    description: "Strategy, risk assessments, and regulatory alignment",
    icon: Shield,
  },
  {
    number: "02",
    title: "Implementation",
    description: "Controls rollout, engineering, and secure delivery execution",
    icon: Wrench,
  },
  {
    number: "03",
    title: "Assurance",
    description: "Validation, evidence, and audit-ready assurance outcomes",
    icon: BadgeCheck,
  },
  {
    number: "04",
    title: "Training",
    description: "Enablement for teams, stakeholders, and operational adoption",
    icon: BookOpen,
  },
];

function Timeline({ steps, item }) {
  return (
    <div className="relative hidden lg:block">
      <div
        className="pointer-events-none absolute left-1/2 top-6 h-56 w-[56rem] -translate-x-1/2 opacity-80"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(closest-side, rgba(38,193,211,0.12), transparent 62%), radial-gradient(closest-side, rgba(148,163,184,0.08), transparent 70%)",
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-7 h-44 w-44 -translate-x-1/2 rounded-full border border-white/10 opacity-80" />
      <div className="pointer-events-none absolute left-1/2 top-12 h-28 w-28 -translate-x-1/2 rounded-full border border-white/10 opacity-70" />
      <div className="pointer-events-none absolute left-1/2 top-16 h-20 w-20 -translate-x-1/2 rounded-full border border-white/10 opacity-60" />

      <svg
        className="pointer-events-none absolute left-0 top-0 h-28 w-full"
        viewBox="0 0 1000 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="tmLine" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="rgba(148,163,184,0.05)" />
            <stop offset="35%" stopColor="rgba(38,193,211,0.18)" />
            <stop offset="65%" stopColor="rgba(38,193,211,0.18)" />
            <stop offset="100%" stopColor="rgba(148,163,184,0.05)" />
          </linearGradient>
          <marker
            id="tmArrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(38,193,211,0.55)" />
          </marker>
        </defs>

        <path
          d="M125 48 L375 48"
          stroke="url(#tmLine)"
          strokeWidth="2"
          strokeDasharray="2 10"
          fill="none"
          markerEnd="url(#tmArrow)"
        />
        <path
          d="M375 48 L625 48"
          stroke="url(#tmLine)"
          strokeWidth="2"
          strokeDasharray="2 10"
          fill="none"
          markerEnd="url(#tmArrow)"
        />
        <path
          d="M625 48 L875 48"
          stroke="url(#tmLine)"
          strokeWidth="2"
          strokeDasharray="2 10"
          fill="none"
          markerEnd="url(#tmArrow)"
        />
      </svg>

      <div className="relative grid grid-cols-4">
        {steps.map((step) => {
          const Icon = step.icon;

          return (
            <motion.div
              key={`timeline-${step.title}`}
              variants={item}
              className="flex flex-col items-center"
            >
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-[#061424]/75 shadow-[0_22px_70px_rgba(0,0,0,0.55)]">
                <div
                  className="absolute inset-0 rounded-full opacity-90"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 35%, rgba(38,193,211,0.22), transparent 62%)",
                  }}
                />
                <Icon className="relative h-6 w-6 text-[#26C1D3]" aria-hidden="true" />
              </div>
              <div className="mt-4 flex flex-col items-center">
                <div className="h-10 w-px bg-white/10" />
                <div className="mt-1 h-2.5 w-2.5 rounded-full bg-[#26C1D3]/85 shadow-[0_0_0_6px_rgba(38,193,211,0.12)]" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function StepCard({ step }) {
  const Icon = step.icon;

  return (
    <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-linear-to-b from-[#071426]/90 via-[#061324]/88 to-[#050B14]/95 p-5 shadow-[0_22px_70px_rgba(0,0,0,0.55)] transition hover:border-white/15">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(700px circle at 15% 0%, rgba(38,193,211,0.12), transparent 55%), radial-gradient(500px circle at 85% 10%, rgba(148,163,184,0.06), transparent 62%)",
        }}
      />

      <div className="relative flex items-start justify-between gap-6">
        <div className="text-2xl font-semibold tracking-tight text-[#26C1D3]">
          {step.number}
        </div>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#26C1D3]">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>

      <div className="relative mt-5">
        <div className="text-lg font-semibold text-[#E5E7EB]">{step.title}</div>
        <div className="mt-2 h-px w-10 bg-[#26C1D3]/70" />
        <p className="mt-3 text-sm leading-relaxed text-[#94A3B8]">
          {step.description}
        </p>
      </div>
    </div>
  );
}

export default function DeliverySection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  };

  return (
    <section
      id="delivery"
      className="tm-section tm-section--image relative overflow-hidden border-t border-white/10 py-16 md:py-20"
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <Image
          src="/images/techmantrana-delivery-model-section.png"
          alt=""
          fill
          priority={false}
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#050B14]/80 via-[#050B14]/60 to-[#050B14]/85" />
      </div>
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#26C1D3]">
            Delivery Model
          </div>
          <h2 className="mt-3 font-heading text-3xl leading-[1.1] tracking-tight text-[#E5E7EB] sm:text-4xl">
            Structured Execution from Strategy to Resilience
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#94A3B8]">
            A methodical end-to-end approach designed for enterprise delivery:
            define the control strategy, implement securely, validate outcomes,
            and enable teams for sustained resilience.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-160px" }}
          className="mt-10"
        >
          <Timeline steps={steps} item={item} />

          <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-2 lg:mt-8 lg:grid-cols-4">
            {steps.map((step) => (
              <motion.div key={step.title} variants={item} className="h-full">
                <StepCard step={step} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
