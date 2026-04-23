"use client";

import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Globe, Shield } from "lucide-react";
import Image from "next/image";

import Button from "../ui/Button";
import Container from "../ui/Container";

function TrustBadge({ icon: Icon, children }) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/0 px-2.5 py-0.5 text-[11px] font-medium text-[#94A3B8] lg:gap-2 lg:px-3 lg:py-1 lg:text-xs">
      <Icon className="h-4 w-4 text-[#26C1D3]" aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}

function StatItem({ value, label }) {
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-(--tm-bg-card) px-3 py-3 shadow-[0_14px_40px_rgba(0,0,0,0.28)] sm:px-4 sm:py-3.5 lg:px-5 lg:py-4">
      <div className="text-[14px] md:text-[16px] font-semibold tracking-tight text-[#E5E7EB] sm:text-2xl lg:text-2xl">
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
    <section className="relative overflow-hidden pt-5 pb-5 lg:py-14">
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
          className="object-cover object-right opacity-35 lg:object-contain lg:opacity-100"
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#050B14]/50 via-[#050B14]/35 to-[#050B14]/85 lg:hidden" />
      </div>

      <Container className="relative z-10 bg-linear-to-b from-[#050B14] via-[#050B14]/88 to-[#050B14]/65 lg:bg-linear-to-r lg:from-[#050B14] lg:via-[#050B14]/92 lg:to-transparent lg:via-[#050B14]/75">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-160px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
          }}
          className="grid items-center gap-6 lg:grid-cols-2 lg:gap-6"
        >
          <motion.div variants={fadeUp} className="text-center lg:text-left">
            <div className="inline-flex items-center justify-center rounded-full border border-[#26C1D3]/20 bg-[#0F172A]/40 px-4 py-1.5 text-[10px] md:text-[12px] font-semibold uppercase tracking-[0.18em] text-[#26C1D3]">
              Cybersecurity • GRC • Digital Risk
            </div>

            <h1 className="mt-4 font-heading text-[28px] leading-[1.06] tracking-tight sm:mt-5 sm:text-4xl sm:leading-[1.08] lg:text-5xl">
              <span className="block">
                Integrated <span className="text-[#26C1D3]">Cybersecurity</span>,
              </span>
              <span className="block">
                Risk &amp; <span className="text-[#26C1D3]">Compliance</span> for
              </span>
              <span className="block">Modern Enterprises</span>
            </h1>

            <p className="mx-auto mt-2.5 max-w-xl text-[12px] md:text-[16px] leading-relaxed text-[#E5E7EB]/75 sm:mt-3 sm:text-lg lg:mx-0">
              TechMantrana helps enterprises across India, GCC, and Europe
              strengthen resilience and achieve regulatory alignment through
              advisory-led cybersecurity, risk, and governance programs.
            </p>

            <div className="mt-4 flex flex-row items-center justify-center  md:justify-start gap-2 sm:mt-5 sm:gap-3  sm:items-center lg:justify-start">
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
              className="mt-4 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 lg:mt-5 lg:justify-start"
            >
              <TrustBadge icon={BadgeCheck}>ISO/IEC 27001:2022 Certified</TrustBadge>
              <TrustBadge icon={Globe}>India | GCC | Europe</TrustBadge>
              <TrustBadge icon={Shield}>Enterprise-ready delivery</TrustBadge>
            </motion.div>

            <motion.div variants={fadeUp} className="mx-auto mt-6 grid max-w-xl grid-cols-3 gap-2 sm:mt-8 sm:gap-4 lg:mx-0 text-center lg:text-left text-[12px] md:text-[16px]">
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
