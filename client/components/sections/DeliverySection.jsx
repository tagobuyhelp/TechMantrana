"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  BookOpen,
  ArrowRight,
  Globe2,
  Landmark,
  MapPin,
  Shield,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import Container from "../ui/Container";

const steps = [
  {
    number: "01",
    title: "Advisory",
    description:
      "Define objectives, assess risk, and map requirements into a practical control plan aligned to your business and regulators.",
    icon: Shield,
  },
  {
    number: "02",
    title: "Implementation",
    description:
      "Operationalize controls through secure architecture, engineering, and rollout across teams, tools, and environments.",
    icon: Wrench,
  },
  {
    number: "03",
    title: "Assurance",
    description:
      "Validate effectiveness with testing and evidence, close gaps, and deliver audit-ready outcomes with measurable assurance.",
    icon: BadgeCheck,
  },
  {
    number: "04",
    title: "Training",
    description:
      "Enable teams with role-based training, playbooks, and exercises to sustain adoption and improve operational readiness.",
    icon: BookOpen,
  },
];

const regionalAlignment = [
  {
    title: "India",
    label: "National & Sectoral",
    subtitle: "Security, privacy, and incident expectations",
    icon: Landmark,
    accent: {
      text: "text-[#26C1D3]",
      dot: "bg-[#26C1D3]",
      glow: "from-[#26C1D3]/16",
      line: "via-[#26C1D3]/55",
    },
    items: [
      "DPDP Act",
      "CERT-In Directions (2022)",
      "RBI Cyber Security Framework",
      "SEBI Cyber Resilience",
    ],
  },
  {
    title: "GCC",
    label: "UAE Frameworks",
    subtitle: "Government and financial sector alignment",
    icon: MapPin,
    accent: {
      text: "text-[#A78BFA]",
      dot: "bg-[#A78BFA]",
      glow: "from-[#A78BFA]/14",
      line: "via-[#A78BFA]/50",
    },
    items: ["UAE: ISR (DESC)", "UAE IA (NESA)", "SVF (CBUAE)"],
  },
  {
    title: "Europe",
    label: "EU / UK",
    subtitle: "Operational resilience and cyber directives",
    icon: Globe2,
    accent: {
      text: "text-[#34D399]",
      dot: "bg-[#34D399]",
      glow: "from-[#34D399]/12",
      line: "via-[#34D399]/45",
    },
    items: ["GDPR", "NIS2 Directive", "DORA", "ISO/IEC 27001 alignment"],
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
    <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-linear-to-b from-[#071426]/90 via-[#061324]/88 to-[#050B14]/95 p-4 shadow-[0_22px_70px_rgba(0,0,0,0.55)] transition hover:border-white/15 sm:p-5">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(700px circle at 15% 0%, rgba(38,193,211,0.12), transparent 55%), radial-gradient(500px circle at 85% 10%, rgba(148,163,184,0.06), transparent 62%)",
        }}
      />

      <div className="relative flex items-start justify-between gap-6">
        <div className="text-xl font-semibold tracking-tight text-[#26C1D3] sm:text-2xl">
          {step.number}
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#26C1D3] sm:h-12 sm:w-12">
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
        </div>
      </div>

      <div className="relative mt-4 sm:mt-5">
        <div className="text-base font-semibold text-[#E5E7EB] sm:text-lg">
          {step.title}
        </div>
        <div className="mt-2 h-px w-10 bg-[#26C1D3]/70" />
        <p className="mt-3 text-xs leading-relaxed text-[#94A3B8] sm:text-sm">
          {step.description}
        </p>
      </div>
    </div>
  );
}

function RegionAlignmentCard({ region, activeRegion, onActivate }) {
  const Icon = region.icon;
  const accent = region.accent;
  const isActive = activeRegion ? activeRegion === region.title : true;

  return (
    <div
      className={[
        "relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-linear-to-b from-[#071426]/90 via-[#061324]/88 to-[#050B14]/95 p-4 shadow-[0_22px_70px_rgba(0,0,0,0.55)] backdrop-blur transition-[border-color,opacity] duration-200 sm:p-5 lg:min-h-[320px]",
        "hover:border-white/15",
        activeRegion ? (isActive ? "opacity-100" : "opacity-55") : "opacity-100",
      ].join(" ")}
      onMouseEnter={() => onActivate(region.title)}
      onMouseLeave={() => onActivate(null)}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        aria-hidden="true"
        style={{
          background: `radial-gradient(700px circle at 18% 0%, rgba(38,193,211,0.08), transparent 58%), radial-gradient(520px circle at 84% 8%, rgba(148,163,184,0.06), transparent 60%)`,
        }}
      />
      <div
        className={[
          "pointer-events-none absolute left-0 top-0 h-16 w-40 bg-linear-to-r to-transparent opacity-70",
          accent.glow,
        ].join(" ")}
        aria-hidden="true"
      />
      <div
        className={[
          "pointer-events-none absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent to-transparent opacity-80",
          accent.line,
        ].join(" ")}
        aria-hidden="true"
      />

      <div className="relative flex items-start justify-between gap-6">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className={["h-2 w-2 shrink-0 rounded-full", accent.dot].join(" ")} />
            <div className="text-lg font-semibold tracking-tight text-[#E5E7EB] sm:text-xl">
              {region.title}
            </div>
          </div>
          <div className="mt-2">
            <div
              className={[
                "text-[11px] font-semibold uppercase tracking-[0.14em]",
                accent.text,
              ].join(" ")}
            >
              {region.label}
            </div>
            <div className="mt-1 text-xs text-[#94A3B8] sm:text-sm">
              {region.subtitle}
            </div>
          </div>
        </div>
        <div
          className={[
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-[0_10px_26px_rgba(0,0,0,0.25)] sm:h-12 sm:w-12",
            accent.text,
          ].join(" ")}
        >
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
        </div>
      </div>

      <div className="relative mt-4 flex flex-1 flex-col">
        <div className="h-px w-10 bg-white/10" />
        <div className="mt-4 flex flex-wrap gap-2">
          {region.items.map((item) => (
            <span
              key={item}
              className={[
                "inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-[11px] font-medium tracking-tight text-[#E5E7EB]/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]",
              ].join(" ")}
            >
              <span className={["h-1.5 w-1.5 shrink-0 rounded-full", accent.dot].join(" ")} />
              <span className="min-w-0 break-words">{item}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function RegionMapCard({ regions, activeRegion, onActivate }) {
  const positions = {
    India: { x: 164, y: 102 },
    GCC: { x: 146, y: 92 },
    Europe: { x: 124, y: 74 },
  };

  const markers = regions
    .map((region) => {
      const pos = positions[region.title];
      if (!pos) return null;
      return { region, ...pos };
    })
    .filter(Boolean);

  const europe = markers.find((m) => m.region.title === "Europe");
  const gcc = markers.find((m) => m.region.title === "GCC");
  const india = markers.find((m) => m.region.title === "India");

  const isHighlighted = (title) => {
    if (!activeRegion) return true;
    return activeRegion === title;
  };

  return (
    <div
      className={[
        "relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-linear-to-b from-[#071426]/90 via-[#061324]/88 to-[#050B14]/95 p-4 shadow-[0_22px_70px_rgba(0,0,0,0.55)] backdrop-blur sm:p-5",
        activeRegion ? "opacity-95" : "opacity-100",
      ].join(" ")}
      onMouseLeave={() => onActivate(null)}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(760px circle at 18% 0%, rgba(38,193,211,0.14), transparent 58%), radial-gradient(520px circle at 86% 14%, rgba(148,163,184,0.08), transparent 60%)",
        }}
      />

      <div className="relative flex items-start justify-between gap-6">
        <div className="min-w-0">
          <div className="text-base font-semibold tracking-tight text-[#E5E7EB] sm:text-lg">
            Coverage Map
          </div>
          <div className="mt-1 text-xs text-[#94A3B8] sm:text-sm">
            India • GCC • Europe alignment
          </div>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#26C1D3] shadow-[0_10px_26px_rgba(0,0,0,0.25)] sm:h-12 sm:w-12">
          <Globe2 className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
        </div>
      </div>

      <div className="relative mt-4 overflow-hidden rounded-2xl border border-white/10 bg-[#061424]/55 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:p-4">
        <svg
          viewBox="0 0 240 160"
          className="h-32 w-full sm:h-36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="tmGlobeStroke" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="rgba(38,193,211,0.55)" />
              <stop offset="100%" stopColor="rgba(148,163,184,0.25)" />
            </linearGradient>
          </defs>

          <circle cx="120" cy="80" r="58" stroke="url(#tmGlobeStroke)" strokeWidth="1.6" />
          <ellipse cx="120" cy="80" rx="44" ry="58" stroke="rgba(148,163,184,0.22)" strokeWidth="1.2" />
          <ellipse cx="120" cy="80" rx="20" ry="58" stroke="rgba(148,163,184,0.16)" strokeWidth="1.1" />
          <path d="M62 80H178" stroke="rgba(148,163,184,0.22)" strokeWidth="1.2" />
          <path d="M68 64H172" stroke="rgba(148,163,184,0.14)" strokeWidth="1.1" />
          <path d="M68 96H172" stroke="rgba(148,163,184,0.14)" strokeWidth="1.1" />

          <path
            d={
              europe && gcc
                ? `M${europe.x} ${europe.y} C ${europe.x + 12} ${europe.y + 10}, ${gcc.x - 18} ${gcc.y - 8}, ${gcc.x} ${gcc.y}`
                : ""
            }
            stroke="rgba(167,139,250,0.42)"
            strokeWidth="1.2"
            strokeDasharray="3 5"
            opacity={
              !activeRegion || activeRegion === "Europe" || activeRegion === "GCC"
                ? 1
                : 0.18
            }
          />
          <path
            d={
              gcc && india
                ? `M${gcc.x} ${gcc.y} C ${gcc.x + 16} ${gcc.y + 10}, ${india.x - 10} ${india.y - 6}, ${india.x} ${india.y}`
                : ""
            }
            stroke="rgba(38,193,211,0.42)"
            strokeWidth="1.2"
            strokeDasharray="3 5"
            opacity={
              !activeRegion || activeRegion === "India" || activeRegion === "GCC"
                ? 1
                : 0.18
            }
          />

          {markers.map((m) => (
            <g key={m.region.title}>
              <circle
                cx={m.x}
                cy={m.y}
                r={isHighlighted(m.region.title) ? 7 : 6}
                fill="rgba(0,0,0,0.35)"
                opacity={isHighlighted(m.region.title) ? 1 : 0.55}
              />
              <circle
                cx={m.x}
                cy={m.y}
                r={isHighlighted(m.region.title) ? 5.5 : 4.5}
                fill="currentColor"
                className={m.region.accent.text}
                opacity={isHighlighted(m.region.title) ? 1 : 0.6}
              />
              <circle
                cx={m.x}
                cy={m.y}
                r={isHighlighted(m.region.title) ? 13 : 10}
                stroke="currentColor"
                className={m.region.accent.text}
                opacity={isHighlighted(m.region.title) ? 0.3 : 0.14}
              />
            </g>
          ))}
        </svg>

        <div className="mt-3 flex flex-wrap gap-2">
          {regions.map((region) => (
            <div
              key={`legend-${region.title}`}
              className={[
                "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[#A1AFC3] transition-[opacity,border-color] duration-200 hover:border-white/15",
                activeRegion
                  ? activeRegion === region.title
                    ? "opacity-100"
                    : "opacity-55"
                  : "opacity-100",
              ].join(" ")}
              onMouseEnter={() => onActivate(region.title)}
            >
              <span className={["h-2 w-2 rounded-full", region.accent.dot].join(" ")} />
              <span className="font-semibold tracking-tight">{region.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DeliverySection() {
  const [activeRegion, setActiveRegion] = useState(null);
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
      id="regions"
      className="tm-section tm-section--image relative overflow-hidden border-t border-white/10 py-10 sm:py-14 md:py-16"
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <Image
          src="/images/techmantrana-delivery-model-section.png"
          alt=""
          fill
          priority={false}
          sizes="100vw"
          className="object-cover object-center opacity-25 sm:opacity-30 lg:opacity-40"
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#050B14]/84 via-[#050B14]/66 to-[#050B14]/88" />
      </div>
      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="tm-kicker">Delivery Model</div>
          <h2 className="mt-3 font-heading text-2xl font-semibold leading-[1.1] tracking-tight text-[#F8FAFC] sm:text-3xl lg:text-4xl">
            Structured Execution from Strategy to Resilience
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#A1AFC3] sm:text-base">
            A phase-wise delivery model: Advisory → Implementation → Assurance →
            Training. Each phase produces clear outcomes and evidence, keeping
            programs audit-ready and execution-led.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-160px" }}
          className="mt-7 sm:mt-9"
        >
          <Timeline steps={steps} item={item} />

          <div className="mt-5 grid grid-cols-2 gap-4 sm:mt-6 sm:gap-6 lg:mt-7 lg:grid-cols-4">
            {steps.map((step) => (
              <motion.div key={step.title} variants={item} className="h-full">
                <StepCard step={step} />
              </motion.div>
            ))}
          </div>

          <div className="mt-9 sm:mt-10">
            <div className="mx-auto max-w-3xl text-center">
              <div className="tm-kicker">Regional Regulatory Alignment</div>
              <h3 className="mt-3 font-heading text-xl font-semibold leading-[1.1] tracking-tight text-[#F8FAFC] sm:text-2xl">
                Regulations We Align Against Across Regions
              </h3>
              <div className="mt-3 text-sm font-semibold leading-relaxed text-[#E5E7EB]/85 sm:text-base">
                Built for enterprises operating across{" "}
                <span className="text-[#26C1D3]">India</span>,{" "}
                <span className="text-[#A78BFA]">GCC</span>, and{" "}
                <span className="text-[#34D399]">Europe</span>—mapped into a unified control approach with audit-ready evidence.
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#A1AFC3] sm:text-base">
                Regulations grouped by region for fast scanning and clear delivery alignment.
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:mt-8 lg:grid-cols-12 lg:items-start lg:gap-6">
              <motion.div variants={item} className="lg:col-span-4">
                <RegionMapCard
                  regions={regionalAlignment}
                  activeRegion={activeRegion}
                  onActivate={setActiveRegion}
                />
              </motion.div>
              <div className="grid items-stretch gap-4 sm:grid-cols-3 sm:gap-6 lg:col-span-8 lg:grid-cols-3">
                {regionalAlignment.map((region) => (
                  <motion.div key={region.title} variants={item} className="h-full">
                    <RegionAlignmentCard
                      region={region}
                      activeRegion={activeRegion}
                      onActivate={setActiveRegion}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#26C1D3] px-5 py-3 text-sm font-semibold text-[#050B14] shadow-[0_18px_40px_rgba(38,193,211,0.16)] transition-[background-color,transform,box-shadow] duration-200 hover:scale-[1.03] hover:bg-[#1EA7B8] hover:shadow-[0_24px_60px_rgba(38,193,211,0.22)] active:scale-[0.99] active:bg-[#168A99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26C1D3]/60"
              >
                Explore Regulatory Alignment <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
