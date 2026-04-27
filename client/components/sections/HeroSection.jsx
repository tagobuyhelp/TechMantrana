"use client";

import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Globe, Shield } from "lucide-react";
import Image from "next/image";

import Button from "../ui/Button";
import Container from "../ui/Container";

function TrustBadge({ icon: Icon, children }) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#0F172A]/60 px-3 py-1 text-[11px] font-medium text-[#E5E7EB] shadow-[0_4px_14px_rgba(0,0,0,0.2)] backdrop-blur-md lg:gap-2 lg:px-3.5 lg:py-1.5 lg:text-xs">
      <Icon className="h-4 w-4 text-[#26C1D3]" aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}

function StatItem({ value, label }) {
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 shadow-[0_14px_40px_rgba(0,0,0,0.2)] backdrop-blur-sm sm:px-5 sm:py-4 lg:px-6 lg:py-5">
      <div className="text-[18px] md:text-[20px] font-bold tracking-tight text-[#26C1D3] sm:text-2xl lg:text-3xl">
        {value}
      </div>
      <div className="mt-1 text-xs font-medium text-[#94A3B8] sm:text-sm">{label}</div>
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
    <section className="tm-section tm-section--image relative overflow-hidden pt-5 pb-5 lg:py-14">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      >
        <div className="absolute right-[10%] top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-[#26C1D3]/15 blur-[100px] lg:h-[500px] lg:w-[500px]" />
        
        <Image
          src="/images/techmantrana-hero-cybersecurity-consulting-dark-ui-wide.png"
          alt=""
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 70vw"
          className="object-cover object-right opacity-50 brightness-125 contrast-110 sm:opacity-60 lg:object-contain lg:opacity-90"
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#050B14]/30 via-transparent to-[#050B14]/90" />
        <div className="absolute inset-0 bg-linear-to-r from-[#050B14] via-[#050B14]/85 to-transparent lg:via-[#050B14]/65" />
      </div>

      <Container className="relative z-10">
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

            <h1 className="mx-auto mt-4 max-w-2xl font-heading text-[28px] leading-[1.1] tracking-tight text-balance sm:mt-5 sm:text-4xl sm:leading-[1.1] lg:mx-0 lg:text-5xl">
              Integrated <span className="text-[#26C1D3]">Cyber</span>, Risk,{" "}
              <span className="text-[#26C1D3]">Privacy</span>, and{" "}
              <span className="text-[#26C1D3]">Resilience</span> for Modern Enterprises
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-[14px] leading-relaxed text-[#E5E7EB]/90 sm:mt-4 sm:text-[17px] lg:mx-0">
              TechMantrana helps enterprises across India, GCC, and Europe
              strengthen resilience and achieve regulatory alignment through
              advisory-led cybersecurity, risk, and governance programs.
            </p>

            <div className="mt-5 flex flex-row items-center justify-center gap-3 sm:mt-7 sm:gap-4 md:justify-start lg:justify-start">
              <motion.div variants={fadeUp} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => scrollToId("contact")}
                  aria-label="Talk to Experts"
                  className="bg-[#2AE2F8] text-[#050B14] shadow-[0_0_30px_rgba(38,193,211,0.4)] hover:bg-[#2CE5FA]"
                >
                  <span className="inline-flex items-center gap-2">
                    Talk to Experts{" "}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </Button>
              </motion.div>

              <motion.div variants={fadeUp} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="secondary"
                  onClick={() => scrollToId("services")}
                  aria-label="Explore Services"
                  className="border-white/10 bg-transparent text-[#E5E7EB]/80 hover:bg-white/5 hover:text-white"
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
              className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3 lg:mt-10 lg:justify-start"
            >
              <TrustBadge icon={BadgeCheck}>ISO/IEC 27001:2022 Certified</TrustBadge>
              <TrustBadge icon={Globe}>India | GCC | Europe</TrustBadge>
              <TrustBadge icon={Shield}>Enterprise-ready delivery</TrustBadge>
            </motion.div>

            <motion.div variants={fadeUp} className="mx-auto mt-6 grid max-w-xl grid-cols-2 gap-3 text-center sm:mt-8 sm:gap-5 md:text-[16px] lg:mx-0 lg:text-left text-[12px]">
              <StatItem value="Global" label="Regulatory Reach" />
              <StatItem value="Enterprise" label="Grade Security" />
            </motion.div>
          </motion.div>


        </motion.div>
      </Container>
    </section>
  );
}
