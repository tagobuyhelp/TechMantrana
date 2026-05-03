"use client";

import { motion } from "framer-motion";
import { BadgeCheck, ShieldCheck } from "lucide-react";

import Container from "../ui/Container";

const pillars = [
  {
    title: "Confidentiality",
    description: "Protect sensitive information with access controls and least-privilege governance.",
  },
  {
    title: "Integrity",
    description: "Maintain accuracy and trust through change control, validation, and evidence-driven assurance.",
  },
  {
    title: "Availability",
    description: "Sustain business operations with resilience planning, recovery readiness, and continuity practices.",
  },
];

function PillarCard({ item }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[rgba(15,23,42,0.72)] p-3 shadow-[0_16px_46px_rgba(0,0,0,0.28)] backdrop-blur sm:p-3.5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(520px_circle_at_18%_0%,rgba(1,95,196,0.12),transparent_60%)] opacity-55" />
      <div className="relative">
        <div className="text-base font-semibold tracking-tight text-[#F8FAFC]">
          {item.title}
        </div>
        <p className="mt-1.5 text-[13px] leading-relaxed text-[#A1AFC3] sm:text-sm">
          {item.description}
        </p>
      </div>
      <div className="relative mt-auto pt-3" aria-hidden="true">
        <div className="h-px w-10 bg-[#015FC4]/60" />
      </div>
    </div>
  );
}

export default function InfoSecuritySection() {
  const fadeUp = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  return (
    <section
      id="infosec"
      className="tm-section tm-section--alt relative overflow-hidden border-t border-white/10 py-8 sm:py-10 md:py-12"
      aria-label="Information Security and Data Privacy"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12] bg-[radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.55)_1px,transparent_0)] bg-size-[30px_30px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-28 top-12 h-130 w-130 rounded-full bg-[radial-gradient(circle_at_center,rgba(1,95,196,0.18),transparent_62%)] blur-2xl"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-160px" }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="tm-kicker">Certification</div>
          <h2 className="mt-3 font-heading text-2xl font-semibold leading-[1.1] tracking-tight text-[#F8FAFC] sm:text-3xl lg:text-4xl">
            Information Security Statement
          </h2>
          <p className="mt-2.5 text-sm leading-relaxed text-[#A1AFC3] sm:text-base">
            ISO/IEC 27001:2022 Certified. Our delivery is anchored in confidentiality, integrity, and availability supported by clear controls and audit-ready evidence.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-160px" }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
          }}
          className="mt-5 grid gap-4 sm:mt-7 sm:gap-6"
        >
          <motion.div variants={fadeUp}>
            <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-[rgba(15,23,42,0.72)] p-3 shadow-[0_16px_46px_rgba(0,0,0,0.28)] backdrop-blur sm:p-3.5">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(620px_circle_at_18%_0%,rgba(1,95,196,0.14),transparent_60%)] opacity-60" />
              <div className="relative flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#015FC4] text-white shadow-[0_12px_34px_rgba(1,95,196,0.22)] sm:h-10 sm:w-10">
                  <BadgeCheck className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-[#F8FAFC]">
                    ISO/IEC 27001:2022 Certified
                  </div>
                  <div className="mt-1.5 space-y-1 text-[13px] leading-relaxed text-[#A1AFC3] sm:text-sm">
                    <p>
                      TechMantrana is committed to protecting the confidentiality, integrity, and availability of information across our operations and client engagements.
                    </p>
                    <p>
                      We maintain a certified Information Security Management System (ISMS) in accordance with ISO/IEC 27001:2022, supported by risk-based controls, defined
                      information security policies, and a program of continual improvement.
                    </p>
                    <p>
                      Our ISMS has been independently verified and certified by an accredited certification body. Certificate details are available on request.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative mt-3 flex items-center gap-2 text-xs font-medium text-[#E5E7EB]/75">
                <span className="flex h-7.5 w-7.5 items-center justify-center rounded-xl border border-white/10 bg-[#015FC4] text-white shadow-[0_12px_34px_rgba(1,95,196,0.2)]">
                  <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                </span>
                CIA-aligned controls across delivery
              </div>
            </div>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
            {pillars.map((item) => (
              <motion.div key={item.title} variants={fadeUp} className="h-full">
                <PillarCard item={item} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
