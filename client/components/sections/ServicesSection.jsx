"use client";

import { motion } from "framer-motion";
import {
  Bug,
  FileLock,
  Globe,
  Radar,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import Image from "next/image";

import Container from "../ui/Container";

const services = [
  {
    title: "Governance, Risk and Security Advisory",
    description:
      "Strategy, governance design, risk management, and security leadership - from program design to ongoing oversight.",
    category: "Advisory",
    icon: ShieldCheck,
    href: "/#services",
    bullets: [
      "Security strategy, maturity assessment, and program roadmap development",
      "Information security governance framework, control design, and policy development",
      "ISMS internal audit - planning, execution, nonconformity reporting, and corrective action follow-up",
      "Virtual CISO - on-demand security leadership and governance oversight",
    ],
  },
  {
    title: "Regulatory Compliance and Privacy",
    description:
      "Alignment with cybersecurity and data protection obligations across India, GCC, and Europe - from gap assessment to ongoing compliance.",
    category: "Compliance",
    icon: FileLock,
    href: "/#services",
    bullets: [
      "India: RBI, SEBI CSCRF, IRDAI, DPDP Act, NCIIPC, MeitY Guidelines",
      "UAE: UAE IAR, DESC ISR, CBUAE SVF, ADHICS",
      "GCC: NCA Framework, SAMA Cyber Security and BCM Framework, Qatar NIA, NISCF, QCB Cybersecurity Requirement",
      "Europe: GDPR, NIS2, DORA",
    ],
  },
  {
    title: "Security Assessment and Testing",
    description:
      "Independent validation of security posture through structured testing, technical assessment, adversarial simulation, and secure engineering.",
    category: "Testing",
    icon: Bug,
    href: "/#services",
    bullets: [
      "Network, web application, mobile, and API security testing",
      "Red team exercises, threat-led penetration testing, and security control validation",
      "Secure architecture design, DevSecOps integration, and application security review",
      "Security automation and findings remediation support",
    ],
    standards: ["OWASP Top 10", "OWASP ASVS", "NIST SP 800-115"],
  },
  {
    title: "Risk Assessment and Threat Analysis",
    description:
      "Identifying, quantifying, and prioritizing risk exposure across the organization, its supply chain, and its digital environment.",
    category: "Risk",
    icon: Radar,
    href: "/#services",
    bullets: [
      "Enterprise cyber risk assessment and threat landscape analysis",
      "Attack surface review and vulnerability prioritization",
      "Third-party and supply chain risk management",
      "Risk treatment planning and executive risk reporting",
    ],
  },
  {
    title: "Business Continuity and Operational Resilience",
    description:
      "Building the organizational capability to withstand, respond to, and recover from disruptions - tested and validated under real conditions.",
    category: "Resilience",
    icon: Globe,
    href: "/#services",
    bullets: [
      "Business Impact Analysis and recovery objective definition",
      "Business continuity and disaster recovery plan development",
      "Crisis management framework and incident response planning",
      "Continuity testing, tabletop exercises, and resilience validation",
    ],
  },
  {
    title: "Critical Infrastructure and OT Security",
    description:
      "Protecting operational technology, industrial control systems, and essential services where the impact of failure extends beyond data.",
    category: "OT/ICS",
    icon: Wrench,
    href: "/#services",
    bullets: [
      "OT and ICS environment security assessment and architecture review",
      "IT and OT network segmentation and control design",
      "Threat detection, monitoring, and incident readiness for OT environments",
      "Resilience planning for critical and essential service environments",
    ],
  },
];

function ServiceCard({ service }) {
  const Icon = service.icon;

  return (
    <motion.a
      href={service.href}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[rgba(15,23,42,0.72)] p-4 shadow-[0_16px_46px_rgba(0,0,0,0.28)] backdrop-blur transition-[border-color,background-color,box-shadow,transform] duration-200 hover:border-[#015FC4]/35 hover:bg-[rgba(15,23,42,0.82)] hover:shadow-[0_26px_70px_rgba(0,0,0,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015FC4]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050B14] sm:p-5"
      aria-label={service.title}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(520px_circle_at_18%_0%,rgba(1,95,196,0.14),transparent_60%)] opacity-70" />
      <div className="relative flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#015FC4] text-white shadow-[0_12px_34px_rgba(1,95,196,0.22)] transition-colors sm:h-12 sm:w-12">
            <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
          </div>
          <div className="shrink-0 rounded-full border border-white/10 bg-[#7348C1]/70 px-2.5 py-0.5 text-[7px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur sm:px-3 sm:py-1 sm:text-[8px]">
            {service.category}
          </div>
        </div>

        <div className="mt-3 flex-1 sm:mt-4">
          <div className="text-xl font-semibold leading-snug text-[#E5E7EB] transition-colors group-hover:text-[#015FC4]">
            {service.title}
          </div>
          <p className="mt-2 text-xs leading-relaxed text-[#94A3B8] sm:text-sm">
            {service.description}
          </p>
          {service.bullets?.length ? (
            <ul className="mt-3 space-y-1.5 text-xs text-[#A1AFC3] sm:text-sm">
              {service.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#015FC4]" />
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

        <div className="mt-4 h-px w-10 bg-[#015FC4]/60 sm:mt-5" aria-hidden="true" />
      </div>

      <div
        className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-linear-to-r from-transparent via-[#015FC4]/35 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
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
          className="object-cover object-center opacity-15 sm:opacity-20 lg:opacity-25"
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#050B14]/98 via-[#050B14]/90 to-[#050B14]/82" />
        <div className="absolute inset-0 bg-linear-to-b from-[#050B14]/86 via-[#050B14]/80 to-[#050B14]/94" />
      </div>
      <Container className="relative z-10">
        <div className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="tm-kicker">Services</div>
            <h2 className="mt-3 font-heading text-2xl font-semibold leading-[1.1] tracking-tight text-[#F8FAFC] sm:text-3xl lg:text-4xl">
              Core Services
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#A1AFC3] sm:text-base">
              Six integrated service areas for enterprise and regulated environments.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#A1AFC3] sm:text-base">
              Our services connect governance, risk, compliance, privacy, technical security, and resilience into one coherent program -
              designed to work in practice, not just on paper.
            </p>
          </div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-160px" }}
          className="mt-7 -mx-4 flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:mt-9 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={item}
              className="h-full w-[85%] shrink-0 snap-start self-stretch sm:w-auto sm:snap-none"
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
