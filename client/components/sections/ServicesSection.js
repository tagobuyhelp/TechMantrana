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
    description: "Governance, controls, and audit-ready programs",
    category: "Advisory",
    icon: ShieldCheck,
    href: "/#services",
  },
  {
    title: "Cybersecurity Consulting",
    description: "Strategy, maturity roadmaps, and assurance",
    category: "Advisory",
    icon: BadgeCheck,
    href: "/#services",
  },
  {
    title: "Risk Assessment & Threat Analysis",
    description: "Threat modeling and risk visibility across assets",
    category: "Risk",
    icon: Radar,
    href: "/#services",
  },
  {
    title: "VAPT & Security Testing",
    description: "Validation through offensive testing and reporting",
    category: "Testing",
    icon: Bug,
    href: "/#services",
  },
  {
    title: "Security Engineering & DevSecOps",
    description: "Secure architecture and CI/CD controls",
    category: "Engineering",
    icon: Wrench,
    href: "/#services",
  },
  {
    title: "Cybersecurity Regulatory Requirements",
    description: "Framework alignment across regulated industries",
    category: "Compliance",
    icon: Gavel,
    href: "/#services",
  },
  {
    title: "Data Privacy & Protection",
    description: "Privacy-by-design and data security governance",
    category: "Privacy",
    icon: FileLock,
    href: "/#services",
  },
  {
    title: "Business Continuity & Resilience",
    description: "Operational resilience planning and readiness",
    category: "Resilience",
    icon: Globe,
    href: "/#services",
  },
  {
    title: "Virtual CISO",
    description: "Executive security leadership on demand",
    category: "Leadership",
    icon: UserCog,
    href: "/#services",
  },
];

function ServiceCard({ service }) {
  const Icon = service.icon;

  return (
    <motion.a
      href={service.href}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[rgba(15,23,42,0.72)] p-7 shadow-[0_16px_46px_rgba(0,0,0,0.28)] backdrop-blur transition-[border-color,background-color,box-shadow,transform] duration-200 hover:border-[#26C1D3]/35 hover:bg-[rgba(15,23,42,0.82)] hover:shadow-[0_26px_70px_rgba(0,0,0,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26C1D3]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050B14]"
      aria-label={service.title}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(520px_circle_at_18%_0%,rgba(38,193,211,0.14),transparent_60%)] opacity-70" />
      <div className="relative flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#94A3B8] shadow-[0_10px_26px_rgba(0,0,0,0.25)] transition-colors group-hover:text-[#26C1D3]">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="shrink-0 rounded-full border border-white/10 bg-[rgba(5,11,20,0.45)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#94A3B8] backdrop-blur">
            {service.category}
          </div>
        </div>

        <div className="mt-5 flex-1">
          <div className="text-base font-semibold leading-snug text-[#E5E7EB] transition-colors group-hover:text-[#26C1D3]">
            {service.title}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-[#94A3B8]">
            {service.description}
          </p>
        </div>

        <div className="mt-6 h-px w-10 bg-[#26C1D3]/60" aria-hidden="true" />
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
      className="tm-section tm-section--image relative overflow-hidden border-t border-white/10 py-24 lg:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <Image
          src="/images/techmantrana-services-section.png"
          alt=""
          fill
          priority={false}
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#050B14]/75 via-[#050B14]/60 to-[#050B14]/85" />
      </div>
      <Container>
        <div className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#26C1D3]">
              Core Capabilities
            </div>
            <h2 className="mt-4 font-heading text-3xl leading-tight tracking-tight text-[#E5E7EB] sm:text-4xl">
              Integrated Cybersecurity &amp; Risk Services
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#94A3B8]">
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
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={item} className="h-full">
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
