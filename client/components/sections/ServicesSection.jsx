"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  Bug,
  FileLock,
  Gavel,
  Globe,
  Radar,
  ShieldCheck,
  UserCog,
  Wrench,
} from "lucide-react";
import Image from "next/image";

import Container from "../ui/Container";

const services = [
  {
    title: "GRC & Compliance Advisory",
    description:
      "Build and operate governance programs that translate regulatory expectations into practical controls, evidence, and executive reporting.",
    category: "Advisory",
    icon: ShieldCheck,
    href: "/#services",
    bullets: [
      "Control mapping across frameworks (ISO 27001, SOC 2, NIST, PCI, RBI/SEBI-ready)",
      "Policy, risk, and control library development",
      "Audit readiness, evidence packs, and remediation tracking",
    ],
    standards: ["ISO 27001", "ISO 27017", "ISO 27035", "ISO 22301"],
  },
  {
    title: "Cybersecurity Consulting",
    description:
      "Establish a security strategy that aligns to business priorities, accelerates measurable risk reduction, and supports enterprise-scale execution.",
    category: "Advisory",
    icon: BadgeCheck,
    href: "/#services",
    bullets: [
      "Security maturity assessments and target-state roadmap",
      "Operating model, governance, and stakeholder alignment",
      "Assurance-led programs with metrics and executive reporting",
    ],
    standards: ["NIST CSF 2.0", "CIS Controls", "ISO 27001"],
  },
  {
    title: "Risk Assessment & Threat Analysis",
    description:
      "Identify and quantify risk across assets, applications, and third parties to prioritize controls and investments with clear business context.",
    category: "Risk",
    icon: Radar,
    href: "/#services",
    bullets: [
      "Threat modeling and attack path analysis",
      "Asset, application, and third-party risk assessments",
      "Risk register, treatment plans, and measurable mitigation",
    ],
    standards: ["ISO 27005", "NIST SP 800-30", "MITRE ATT&CK"],
  },
  {
    title: "VAPT & Security Testing",
    description:
      "Validate security posture through targeted offensive testing with clear findings, reproducible evidence, and remediation guidance.",
    category: "Testing",
    icon: Bug,
    href: "/#services",
    bullets: [
      "Network, web, API, and cloud configuration testing",
      "Exploit validation with risk-based prioritization",
      "Remediation guidance and re-test closure support",
    ],
    standards: ["OWASP Top 10", "OWASP ASVS", "NIST SP 800-115"],
  },
  {
    title: "Security Engineering & DevSecOps",
    description:
      "Embed security into architecture and delivery pipelines to reduce exposure early and standardize secure engineering across teams.",
    category: "Engineering",
    icon: Wrench,
    href: "/#services",
    bullets: [
      "Secure architecture reviews and design patterns",
      "CI/CD security: SAST, DAST, SCA, and policy gates",
      "Cloud and infrastructure hardening with guardrails",
    ],
    standards: ["NIST SSDF", "OWASP SAMM", "SLSA"],
  },
  {
    title: "Cybersecurity Regulatory Requirements",
    description:
      "Align security controls to regulatory requirements with governance that stays consistent across regions, audits, and business units.",
    category: "Compliance",
    icon: Gavel,
    href: "/#services",
    bullets: [
      "Regulatory mapping and control harmonization",
      "Evidence strategy and audit coordination support",
      "Continuous compliance monitoring and reporting",
    ],
    standards: ["UAE: ISR (DESC)", "UAE IA (NESA)", "SVF (CBUAE)"],
  },
  {
    title: "Data Privacy & Protection",
    description:
      "Implement privacy-by-design with strong data protection governance to reduce risk, support compliance, and improve trust with customers.",
    category: "Privacy",
    icon: FileLock,
    href: "/#services",
    bullets: [
      "Data discovery, classification, and protection controls",
      "Privacy risk assessments and DPIA-style workflows",
      "Retention, access governance, and incident readiness",
    ],
    standards: ["ISO 27701", "GDPR", "India DPDP Act"],
  },
  {
    title: "Business Continuity & Resilience",
    description:
      "Strengthen operational resilience through structured continuity planning, testing, and crisis execution aligned to enterprise expectations.",
    category: "Resilience",
    icon: Globe,
    href: "/#services",
    bullets: [
      "BCP/DR strategy, plans, and recovery objectives",
      "Tabletop exercises and recovery testing programs",
      "Operational resilience governance and reporting",
    ],
    standards: ["ISO 22301", "NIST SP 800-34"],
  },
  {
    title: "Virtual CISO",
    description:
      "Provide executive-level security leadership to drive governance, prioritize investments, and lead programs with board-ready clarity.",
    category: "Leadership",
    icon: UserCog,
    href: "/#services",
    bullets: [
      "Security leadership, oversight, and program governance",
      "Executive reporting and risk-based prioritization",
      "Vendor, audit, and stakeholder engagement support",
    ],
    standards: ["NIST CSF 2.0", "ISO 27001", "CIS Controls"],
  },
];

function ServiceCard({ service }) {
  const Icon = service.icon;

  return (
    <motion.a
      href={service.href}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[rgba(15,23,42,0.72)] p-4 shadow-[0_16px_46px_rgba(0,0,0,0.28)] backdrop-blur transition-[border-color,background-color,box-shadow,transform] duration-200 hover:border-[#26C1D3]/35 hover:bg-[rgba(15,23,42,0.82)] hover:shadow-[0_26px_70px_rgba(0,0,0,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26C1D3]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050B14] sm:p-5"
      aria-label={service.title}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(520px_circle_at_18%_0%,rgba(38,193,211,0.14),transparent_60%)] opacity-70" />
      <div className="relative flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#26C1D3] shadow-[0_10px_26px_rgba(0,0,0,0.25)] transition-colors group-hover:text-[#26C1D3] sm:h-12 sm:w-12">
            <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
          </div>
          <div className="shrink-0 rounded-full border border-white/10 bg-[#26C1D3] px-2.5 py-0.5 text-[7px] font-semibold uppercase tracking-[0.14em] text-black backdrop-blur sm:px-3 sm:py-1 sm:text-[8px]">
            {service.category}
          </div>
        </div>

        <div className="mt-3 flex-1 sm:mt-4">
          <div className="text-sm font-semibold leading-snug text-[#E5E7EB] transition-colors group-hover:text-[#26C1D3] sm:text-base">
            {service.title}
          </div>
          <p className="mt-2 text-xs leading-relaxed text-[#94A3B8] sm:text-sm">
            {service.description}
          </p>
          {service.bullets?.length ? (
            <ul className="mt-3 space-y-1.5 text-xs text-[#A1AFC3] sm:text-sm">
              {service.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#26C1D3]" />
                  <span className="min-w-0 break-words leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>
          ) : null}
          {service.standards?.length ? (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {service.standards.map((item) => (
                <span
                  key={item}
                  className="inline-flex max-w-full items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-semibold tracking-tight text-[#E5E7EB]/75 whitespace-normal break-words"
                >
                  {item}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div className="mt-4 h-px w-10 bg-[#26C1D3]/60 sm:mt-5" aria-hidden="true" />
      </div>

      <div
        className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-linear-to-r from-transparent via-[#26C1D3]/35 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        aria-hidden="true"
      />
    </motion.a>
  );
}

export default function ServicesSection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: "easeOut" },
    },
  };

  return (
    <section
      id="services"
      className="tm-section tm-section--image relative overflow-hidden border-t border-white/10 py-10 sm:py-14 md:py-16"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      >
        <Image
          src="/images/techmantrana-services-section.png"
          alt=""
          fill
          priority={false}
          sizes="100vw"
          className="object-cover object-center opacity-25 sm:opacity-30 lg:opacity-40"
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#050B14]/82 via-[#050B14]/65 to-[#050B14]/88" />
      </div>
      <Container className="relative z-10">
        <div className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="tm-kicker">Core Capabilities</div>
            <h2 className="mt-3 font-heading text-2xl font-semibold leading-[1.1] tracking-tight text-[#F8FAFC] sm:text-3xl lg:text-4xl">
              Integrated Cybersecurity &amp; Risk Services
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#A1AFC3] sm:text-base">
              A structured consulting model spanning governance, risk, engineering,
              and resilience—designed for enterprise environments and regulated
              industries.
            </p>
          </div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-160px" }}
          className="mt-7 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:mt-9 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={item}
              className="h-full w-[85%] shrink-0 snap-start sm:w-auto sm:snap-none"
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
