"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  ClipboardList,
  Factory,
  GraduationCap,
  Landmark,
  LayoutGrid,
  Lock,
  Monitor,
  RefreshCcw,
  ShieldCheck,
  Star,
  Wrench,
} from "lucide-react";

import Container from "../ui/Container";

function TabButton({ isActive, onClick, icon: Icon, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold tracking-tight transition-[background-color,border-color,color,transform] duration-200",
        isActive
          ? "border-[#015FC4]/40 bg-[#015FC4]/15 text-[#E5E7EB] shadow-[0_10px_26px_rgba(0,0,0,0.25)]"
          : "border-white/10 bg-white/5 text-[#E5E7EB]/75 hover:bg-white/7 hover:text-[#E5E7EB]",
      ].join(" ")}
      aria-pressed={isActive}
    >
      <Icon className={["h-4 w-4", isActive ? "text-[#015FC4]" : "text-[#94A3B8]"].join(" ")} aria-hidden="true" />
      <span className="whitespace-nowrap">{children}</span>
    </button>
  );
}

function ListItem({ children }) {
  return (
    <li className="flex gap-3 text-sm text-[#A1AFC3]">
      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#015FC4]" />
      <span className="min-w-0 break-words">{children}</span>
    </li>
  );
}

function ProgramCard({ icon: Icon, title, description }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_14px_40px_rgba(0,0,0,0.2)] backdrop-blur-sm sm:p-5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(520px_circle_at_18%_0%,rgba(1,95,196,0.12),transparent_60%)] opacity-55" />
      <div className="relative flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#015FC4] text-white shadow-[0_12px_34px_rgba(1,95,196,0.22)] sm:h-12 sm:w-12">
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <div className="text-xl font-semibold text-[#E5E7EB]">
            {title}
          </div>
          <p className="mt-1 text-xs leading-relaxed text-[#A1AFC3] sm:text-sm">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TrainingSection() {
  const tabs = useMemo(
    () => [
      {
        key: "career",
        label: "Career Entry & Transition Programs",
        icon: GraduationCap,
        title: "Career Entry & Transition Programs",
        lead:
          "Structured job-oriented programs for students, fresh graduates, and professionals transitioning into cybersecurity. Each program is built around a specific career focus area - covering the skills, knowledge, and tools required to enter that domain.",
        sublead:
          "No prior cybersecurity experience is required for most programs. Hands-on labs, case studies, and real-world scenario practice are included throughout.",
        programs: [
          {
            icon: Monitor,
            title: "Security Operations",
            description:
              "Covers SOC analyst skills, SIEM platforms, log management, security event monitoring, alert triage, and incident detection. Designed for learners targeting operational roles in security monitoring and threat detection.",
          },
          {
            icon: ClipboardList,
            title: "Governance, Risk and Compliance",
            description:
              "Covers information security governance, risk assessment, ISMS fundamentals, compliance documentation, audit basics, and security policy development. Suitable for non-technical professionals, commerce and MBA graduates, legal professionals, and career switchers.",
          },
          {
            icon: RefreshCcw,
            title: "Cyber Risk and Business Resilience",
            description:
              "Covers cyber risk management, Business Impact Analysis, business continuity planning, disaster recovery, and crisis management. Designed for business and operations professionals interested in organizational resilience roles.",
          },
          {
            icon: Lock,
            title: "Data Privacy and Protection",
            description:
              "Covers data classification, privacy principles, personal data handling, breach response, privacy impact assessments, and data protection compliance. Targeted at legal, HR, compliance, and business professionals.",
          },
          {
            icon: Bot,
            title: "AI-Enabled Cybersecurity",
            description:
              "Covers AI-assisted threat detection, security analytics, anomaly detection, automation in SOC environments, and responsible use of AI tools in cybersecurity practice.",
          },
          {
            icon: Star,
            title: "Flagship: Cybersecurity Career Entry & Transition Program",
            description:
              "The complete job-readiness program. Combines SOC, SIEM, GRC, risk, and privacy fundamentals with a capstone project, resume preparation, and interview readiness. Designed for beginners and career switchers.",
          },
        ],
      },
      {
        key: "iso",
        label: "ISO Certification Programs",
        icon: ShieldCheck,
        title: "ISO Certification Programs",
        lead:
          "Lead Auditor and Lead Implementer training available for the following ISO standards. These programs are suited for learners pursuing implementation, consulting, audit, and governance roles across information security, privacy, business continuity, service management, quality, and AI management disciplines.",
        groups: [
          {
            title: "ISO Standards",
            programs: [
              {
                icon: ShieldCheck,
                title: "ISO/IEC 27001",
                description:
                  "Information Security Management. Lead Auditor and Lead Implementer pathways for ISMS implementation, governance, and audit roles.",
              },
              {
                icon: RefreshCcw,
                title: "ISO 22301",
                description:
                  "Business Continuity Management. Lead Auditor and Lead Implementer pathways for BCMS implementation and continuity audit roles.",
              },
              {
                icon: Lock,
                title: "ISO/IEC 27701",
                description:
                  "Privacy Information Management. Lead Auditor and Lead Implementer pathways for privacy governance and data protection roles.",
              },
              {
                icon: Wrench,
                title: "ISO/IEC 20000-1",
                description:
                  "IT Service Management. Lead Auditor and Lead Implementer pathways for IT service management system implementation and audit roles.",
              },
              {
                icon: LayoutGrid,
                title: "ISO 9001",
                description:
                  "Quality Management. Lead Auditor and Lead Implementer pathways for quality management system implementation and audit roles.",
              },
              {
                icon: Bot,
                title: "ISO/IEC 42001",
                description:
                  "Artificial Intelligence Management. Lead Auditor and Lead Implementer pathways for AI management system governance and audit roles.",
              },
            ],
          },
          {
            title: "Specialized Risk Training",
            programs: [
              {
                icon: ClipboardList,
                title: "ISO 31000",
                description:
                  "Risk Management. Specialist training on risk management principles, framework design, and risk assessment processes aligned to the ISO 31000 standard.",
              },
              {
                icon: Bot,
                title: "ISO/IEC 23894",
                description:
                  "Artificial Intelligence Risk Management. Specialist training on AI-specific risk identification, assessment, and treatment aligned to ISO/IEC 23894 guidance.",
              },
            ],
          },
        ],
      },
      {
        key: "advanced",
        label: "Advanced Cybersecurity Programs",
        icon: Factory,
        title: "Advanced Cybersecurity Programs",
        lead:
          "Specialist programs designed for experienced practitioners, security professionals, and enterprise teams looking to deepen capability in focused domains.",
        sublead:
          "These programs go beyond foundational knowledge, covering program design, operational implementation, and domain-specific expertise.",
        programs: [
          {
            icon: ShieldCheck,
            title: "Regulatory Readiness and Audit Management",
            description:
              "Covers regulatory compliance program design, audit planning and execution, evidence management, and readiness assessment across cybersecurity and data protection frameworks.",
          },
          {
            icon: LayoutGrid,
            title: "Third-Party and Supply Chain Risk",
            description:
              "Covers vendor and supplier risk assessment, third-party due diligence, contract security requirements, control validation, and ongoing supply chain risk monitoring programs.",
          },
          {
            icon: ClipboardList,
            title: "Cyber Vulnerability, Threat and Risk Management",
            description:
              "Covers vulnerability lifecycle management, threat intelligence, risk-based prioritization, threat modelling, and integrated threat and vulnerability program design for security operations and risk teams.",
          },
          {
            icon: Wrench,
            title: "OT, ICS and SCADA Cyber Security",
            description:
              "Covers operational technology security principles, ICS and SCADA environment risk, IT and OT network convergence, industrial control system security controls, and OT-specific incident response.",
          },
          {
            icon: Factory,
            title: "Critical Infrastructure Security and Resilience",
            description:
              "Covers governance, resilience planning, sector-specific regulatory alignment, and incident readiness for essential service operators and organizations managing critical information infrastructure.",
          },
          {
            icon: Landmark,
            title: "Cybersecurity for India Power Sector",
            description:
              "Specialist program for professionals in India's power generation, transmission, and distribution ecosystem. Covers NCIIPC and CERT-In obligations for power entities, IT and OT security in utility environments, SCADA and energy management system protection, and cybersecurity governance for State Load Dispatch Centres and critical infrastructure designations.",
          },
        ],
      },
      {
        key: "why",
        label: "Why TechMantrana Training",
        icon: Star,
        title: "Why TechMantrana Training",
        items: [
          { title: "Job-role focused", description: "Programs are structured around specific job roles such as SOC Analyst, GRC Analyst, and Risk Associate, not generic cybersecurity topics." },
          { title: "Beginner-friendly pathway", description: "Designed for students and professionals with no prior cybersecurity background. No technical prerequisites for most programs." },
          { title: "Practical, hands-on learning", description: "Every program includes labs, simulations, case studies, mock exercises, and real-world scenario practice." },
          { title: "Broad domain coverage", description: "SOC, SIEM, GRC, risk, privacy, AI security, and ISO certification pathways in one structured catalog." },
          { title: "Outcome-focused delivery", description: "Flexible delivery without rigid duration positioning, focused on achieving employability rather than course completion." },
          { title: "ISO Standard certification pathways", description: "ISO Standards Lead Auditor and Lead Implementer add-on tracks for learners pursuing GRC, audit, and consulting careers." },
          { title: "Career support included", description: "Resume preparation, interview readiness sessions, and job-role guidance included in the flagship program." },
          { title: "Accessible pricing", description: "Structured pricing for India with bundle options and career support." },
        ],
      },
    ],
    [],
  );

  const [activeKey, setActiveKey] = useState(tabs[0].key);
  const active = tabs.find((t) => t.key === activeKey) ?? tabs[0];

  const fadeUp = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  };

  return (
    <section
      id="training"
      className="tm-section tm-section--alt relative overflow-hidden border-t border-white/10 py-10 sm:py-14 md:py-16"
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
          <div className="tm-kicker">Training Programs</div>
          <h2 className="mt-3 font-heading text-2xl font-semibold leading-[1.1] tracking-tight text-[#F8FAFC] sm:text-3xl lg:text-4xl">
            Cybersecurity training programs built around where you are in your career.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#A1AFC3] sm:text-base">
            TechMantrana offers structured cybersecurity training programs for career entrants, certification aspirants, experienced
            practitioners, enterprise security teams, and critical infrastructure professionals. Our training portfolio combines
            job-oriented learning, ISO certification pathways, and advanced cybersecurity capability-building delivered through expert
            trainers and specialized security partners.
          </p>
        </motion.div>

        <div className="mt-7 sm:mt-9">
          <div className="flex -mx-4 gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:gap-3 sm:overflow-visible sm:px-0 sm:pb-0">
            {tabs.map((tab) => (
              <TabButton
                key={tab.key}
                isActive={tab.key === activeKey}
                onClick={() => setActiveKey(tab.key)}
                icon={tab.icon}
              >
                {tab.label}
              </TabButton>
            ))}
          </div>

          <motion.div
            key={active.key}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-5 overflow-hidden rounded-3xl border border-white/10 bg-[rgba(15,23,42,0.70)] shadow-[0_22px_70px_rgba(0,0,0,0.45)] backdrop-blur sm:mt-6"
          >
            <div className="p-5 sm:p-6 lg:p-7">
              <div className="text-sm font-semibold text-[#F8FAFC] sm:text-base">
                {active.title}
              </div>
              {active.lead ? (
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#A1AFC3] sm:text-base">
                  {active.lead}
                </p>
              ) : null}
              {active.sublead ? (
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#A1AFC3] sm:text-base">
                  {active.sublead}
                </p>
              ) : null}

              {active.programs?.length ? (
                <div className="mt-5 grid gap-4 sm:mt-6 sm:grid-cols-2 sm:gap-6">
                  {active.programs.map((program) => (
                    <ProgramCard
                      key={program.title}
                      icon={program.icon}
                      title={program.title}
                      description={program.description}
                    />
                  ))}
                </div>
              ) : null}

              {active.groups?.length ? (
                <div className="mt-5 space-y-6 sm:mt-6">
                  {active.groups.map((group) => (
                    <div key={group.title}>
                      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#94A3B8]">
                        {group.title}
                      </div>
                      <div className="mt-3 grid gap-4 sm:grid-cols-2 sm:gap-6">
                        {group.programs.map((program) => (
                          <ProgramCard
                            key={`${group.title}-${program.title}`}
                            icon={program.icon}
                            title={program.title}
                            description={program.description}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}

              {active.items?.length ? (
                <div className="mt-5 grid gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-4">
                  {active.items.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_14px_40px_rgba(0,0,0,0.2)] backdrop-blur-sm sm:p-5"
                    >
                      <div className="text-sm font-semibold text-[#E5E7EB]">
                        {item.title}
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-[#A1AFC3]">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
