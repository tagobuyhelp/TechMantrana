"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Check,
  Mail,
  MapPin,
  ShieldCheck,
  UserRound,
} from "lucide-react";

const quickLinks = [
  { label: "About", href: "/#about", icon: UserRound },
  { label: "Services", href: "/#services", icon: ShieldCheck },
  { label: "Regions", href: "/#regions", icon: MapPin },
  { label: "Contact", href: "/#contact", icon: Mail },
];

const services = [
  "Cybersecurity Strategy",
  "GRC & Compliance",
  "Digital Risk Consulting",
  "Security Assessments",
];

function LinkedInMark({ className, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M16 8a5 5 0 0 1 5 5v7h-4v-7a2 2 0 0 0-4 0v7H9V9h4v2" />
      <path d="M5 9h4v11H5z" />
      <path d="M7 5.5h0.01" />
    </svg>
  );
}

function XMark({ className, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M5 4h4l10 16h-4z" />
      <path d="M19 4h-4L5 20h4z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="tm-section tm-section--image relative mt-14 overflow-hidden border-t border-white/10 sm:mt-20">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <Image
          src="/images/techmantrana-footer-section.png"
          alt="TechMantrana Footer Section"
          fill
          priority={false}
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#050B14]/12 via-[#050B14]/25 to-[#050B14]/56" />
        <div className="absolute inset-0 bg-linear-to-r from-[#050B14]/12 via-[#050B14]/28 to-[#050B14]/55" />
      </div>
      <div
        className="pointer-events-none absolute -right-24 top-10 h-130 w-130 rounded-full bg-[radial-gradient(circle_at_center,rgba(38,193,211,0.14),transparent_62%)] blur-2xl"
        aria-hidden="true"
      />
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:py-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1fr_1fr] lg:gap-12">
          <div className="md:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center rounded-xl p-1 transition-[transform,background-color] duration-200 hover:scale-[1.01] hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26C1D3]/60"
              aria-label="TechMantrana home"
            >
              <Image
                src="/images/logos/logoHorizontal.png"
                alt=""
                width={240}
                height={40}
                className="h-7 w-auto sm:h-8"
              />
            </Link>
            <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E5E7EB]/55">
              Secure. Compliant. Resilient.
            </div>
            <p className="mt-2.5 max-w-xs text-sm leading-relaxed text-[#E5E7EB]/70 sm:mt-3">
              Intelligence Secured. Future Assured.
            </p>

            <div className="mt-4 flex items-center gap-2.5 sm:mt-6 sm:gap-3">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[rgba(15,23,42,0.42)] text-[#26C1D3] shadow-[0_16px_50px_rgba(0,0,0,0.35)] transition-[background-color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-[#26C1D3]/30 hover:bg-[rgba(15,23,42,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26C1D3]/60 active:translate-y-px sm:h-11 sm:w-11"
                aria-label="LinkedIn"
              >
                <LinkedInMark className="h-5 w-5" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[rgba(15,23,42,0.42)] text-[#26C1D3] shadow-[0_16px_50px_rgba(0,0,0,0.35)] transition-[background-color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-[#26C1D3]/30 hover:bg-[rgba(15,23,42,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26C1D3]/60 active:translate-y-px sm:h-11 sm:w-11"
                aria-label="X"
              >
                <XMark className="h-5 w-5" />
              </a>
              <a
                href="mailto:contact@techmantrana.com"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[rgba(15,23,42,0.42)] text-[#26C1D3] shadow-[0_16px_50px_rgba(0,0,0,0.35)] transition-[background-color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-[#26C1D3]/30 hover:bg-[rgba(15,23,42,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26C1D3]/60 active:translate-y-px sm:h-11 sm:w-11"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 md:contents">
            <div>
              <h3 className="text-sm font-semibold text-[#E5E7EB]">Quick links</h3>
              <ul className="mt-3 space-y-2 sm:mt-4 sm:space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href} className="group">
                    <Link
                      href={link.href}
                      className={[
                        "relative flex items-center gap-3 rounded-2xl border border-white/10 bg-[rgba(15,23,42,0.38)] px-3 py-2.5 text-sm text-[#E5E7EB]/80 shadow-[0_18px_60px_rgba(0,0,0,0.35)] transition-[border-color,background-color,transform] duration-200 sm:px-4 sm:py-3",
                        "after:pointer-events-none after:absolute after:inset-x-4 after:bottom-0 after:h-px after:bg-linear-to-r after:from-transparent after:via-white/12 after:to-transparent after:opacity-80",
                        "hover:-translate-y-0.5 hover:border-[#26C1D3]/28 hover:bg-[rgba(15,23,42,0.55)]",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26C1D3]/60 active:translate-y-px",
                      ].join(" ")}
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#26C1D3] transition-[border-color,background-color] duration-200 group-hover:border-[#26C1D3]/28 group-hover:bg-white/7 sm:h-10 sm:w-10">
                        <link.icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[#E5E7EB]">Services</h3>
              <ul className="mt-3 space-y-2 sm:mt-4 sm:space-y-3">
                {services.map((item) => (
                  <li key={item}>
                    <div className="relative flex items-center gap-3 rounded-2xl border border-white/10 bg-[rgba(15,23,42,0.38)] px-3 py-2.5 text-sm text-[#E5E7EB]/80 shadow-[0_18px_60px_rgba(0,0,0,0.35)] sm:px-4 sm:py-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#26C1D3] sm:h-10 sm:w-10">
                        <Check className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span>{item}</span>
                      <span
                        className="pointer-events-none absolute inset-x-4 bottom-0 h-px bg-linear-to-r from-transparent via-white/12 to-transparent opacity-80"
                        aria-hidden="true"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#E5E7EB]">Contact</h3>
            <div className="mt-3 sm:mt-4">
              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-[rgba(15,23,42,0.38)] px-3 py-2.5 text-sm shadow-[0_18px_60px_rgba(0,0,0,0.35)] sm:px-4 sm:py-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#26C1D3] sm:h-10 sm:w-10">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                </span>
                <a
                  href="mailto:contact@techmantrana.com"
                  className="mt-2 font-medium text-[#26C1D3] transition-colors hover:text-[#1EA7B8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26C1D3]/60"
                >
                  contact@techmantrana.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-5 sm:mt-16 sm:gap-4 sm:pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[#E5E7EB]/60">
            © {new Date().getFullYear()} TechMantrana. All rights reserved.
          </p>
          <p className="text-xs text-[#E5E7EB]/60">
            Cybersecurity, GRC, and Digital Risk Consulting
          </p>
        </div>
      </div>
    </footer>
  );
}
