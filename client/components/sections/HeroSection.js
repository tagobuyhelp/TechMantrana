"use client";

import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Globe, Shield } from "lucide-react";
import Image from "next/image";

import Button from "../ui/Button";
import Container from "../ui/Container";

function TrustBadge({ icon: Icon, children }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/0 px-3 py-1 text-xs font-medium text-[#94A3B8]">
      <Icon className="h-4 w-4 text-[#26C1D3]" aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}

function StatItem({ value, label }) {
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-(--tm-bg-card) px-5 py-4 shadow-[0_14px_40px_rgba(0,0,0,0.28)]">
      <div className="text-2xl font-semibold tracking-tight text-[#E5E7EB]">
        {value}
      </div>
      <div className="mt-1 text-xs font-medium text-[#94A3B8]">{label}</div>
    </div>
  );
}

export default function HeroSection() {
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  return (
    <section className="relative overflow-hidden py-10 lg:py-14">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <Image
          src="/images/techmantrana-hero-cybersecurity-consulting-dark-ui-wide.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-contain object-right"
        />
      </div>

      <Container className="relative z-10 bg-linear-to-r from-[#050B14] via-[#050B14]/92 to-transparent lg:via-[#050B14]/75">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-160px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
          }}
          className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12"
        >
          <motion.div variants={fadeUp} className="text-center lg:text-left">
            <div className="inline-flex items-center justify-center rounded-full border border-[#26C1D3]/20 bg-[#0F172A]/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#26C1D3]">
              Cybersecurity • GRC • Digital Risk
            </div>

            <h1 className="mt-5 font-heading text-3xl leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
              <span className="block">
                Integrated <span className="text-[#26C1D3]">Cybersecurity</span>,
              </span>
              <span className="block">
                Risk &amp; <span className="text-[#26C1D3]">Compliance</span> for
              </span>
              <span className="block">Modern Enterprises</span>
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#E5E7EB]/75 sm:text-lg lg:mx-0">
              TechMantrana helps enterprises across India, GCC, and Europe
              strengthen resilience and achieve regulatory alignment through
              advisory-led cybersecurity, risk, and governance programs.
            </p>

            <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
              <motion.div variants={fadeUp} whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.99 }}>
                <Button
                  onClick={() => scrollToId("contact")}
                  aria-label="Talk to Experts"
                  className="shadow-[0_18px_40px_rgba(38,193,211,0.12)]"
                >
                  <span className="inline-flex items-center gap-2">
                    Talk to Experts{" "}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </Button>
              </motion.div>

              <motion.div variants={fadeUp} whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.99 }}>
                <Button
                  variant="secondary"
                  onClick={() => scrollToId("services")}
                  aria-label="Explore Services"
                >
                  <span className="inline-flex items-center gap-2">
                    Explore Services{" "}
                    <Shield className="h-4 w-4" aria-hidden="true" />
                  </span>
                </Button>
              </motion.div>
            </div>

            <motion.div
              variants={fadeUp}
              className="mt-6 flex flex-wrap items-center justify-center gap-2 lg:justify-start"
            >
              <TrustBadge icon={BadgeCheck}>ISO/IEC 27001:2022 Certified</TrustBadge>
              <TrustBadge icon={Globe}>India | GCC | Europe</TrustBadge>
              <TrustBadge icon={Shield}>Enterprise-ready delivery</TrustBadge>
            </motion.div>

            <motion.div variants={fadeUp} className="mx-auto mt-8 grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-3 lg:mx-0">
              <StatItem value="100+" label="Assessments Delivered" />
              <StatItem value="3+" label="Regions Covered" />
              <StatItem value="Enterprise" label="Regulated Clients" />
            </motion.div>
          </motion.div>

        </motion.div>
      </Container>
    </section>
  );
}
