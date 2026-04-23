"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Bug,
  Cloud,
  Cpu,
  FileLock,
  Gavel,
  Globe,
  Radar,
  Shield,
  ShieldCheck,
  UserCog,
  Wrench,
} from "lucide-react";

import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu.jsx";
import NavItem from "./NavItem";

const hoverOpenDelayMs = 140;
const hoverCloseDelayMs = 160;

const servicesCategories = [
  {
    title: "GRC & Advisory",
    items: [
      {
        title: "GRC & Compliance",
        description: "Governance and regulatory alignment",
        href: "/#services",
        icon: ShieldCheck,
      },
      {
        title: "Cybersecurity Consulting",
        description: "Strategy, programs, and assurance",
        href: "/#services",
        icon: BadgeCheck,
      },
      {
        title: "Regulatory Requirements",
        description: "Controls mapped to industry frameworks",
        href: "/#services",
        icon: Gavel,
      },
    ],
  },
  {
    title: "Security & Risk",
    items: [
      {
        title: "Risk Assessment",
        description: "Risk visibility across systems and processes",
        href: "/#services",
        icon: Radar,
      },
      {
        title: "Threat Analysis",
        description: "Threat modeling and adversary mapping",
        href: "/#services",
        icon: Shield,
      },
      {
        title: "VAPT & Testing",
        description: "Offensive testing and validation",
        href: "/#services",
        icon: Bug,
      },
    ],
  },
  {
    title: "Engineering",
    items: [
      {
        title: "DevSecOps",
        description: "Secure CI/CD with policy and automation",
        href: "/#services",
        icon: Wrench,
      },
      {
        title: "Security Engineering",
        description: "Architecture and secure design reviews",
        href: "/#services",
        icon: Cpu,
      },
      {
        title: "Cloud Security",
        description: "Secure workloads across cloud platforms",
        href: "/#services",
        icon: Cloud,
      },
    ],
  },
  {
    title: "Resilience & Privacy",
    items: [
      {
        title: "Data Privacy",
        description: "Privacy-by-design and data protection",
        href: "/#services",
        icon: FileLock,
      },
      {
        title: "Business Continuity",
        description: "Operational resilience planning",
        href: "/#services",
        icon: Globe,
      },
      {
        title: "Virtual CISO",
        description: "Executive leadership on-demand",
        href: "/#services",
        icon: UserCog,
      },
    ],
  },
];

const regions = [
  {
    title: "Middle East",
    description: "GCC and MENA delivery",
    href: "/#regions",
  },
  {
    title: "Europe",
    description: "UK and EU programs",
    href: "/#regions",
  },
  {
    title: "Asia Pacific",
    description: "APAC engagements",
    href: "/#regions",
  },
  {
    title: "North America",
    description: "US and Canada support",
    href: "/#regions",
  },
];

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const [openDesktopMenu, setOpenDesktopMenu] = useState(null);

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");

  const servicesButtonId = useId();
  const regionsButtonId = useId();
  const servicesPanelId = useId();
  const regionsPanelId = useId();

  const openTimerRef = useRef(null);
  const closeTimerRef = useRef(null);

  const isServicesOpen = openDesktopMenu === "services";
  const isRegionsOpen = openDesktopMenu === "regions";

  const isServicesActive = pathname === "/" && activeHash === "#services";
  const isRegionsActive = pathname === "/" && activeHash === "#regions";

  const clearTimers = useCallback(() => {
    if (openTimerRef.current) window.clearTimeout(openTimerRef.current);
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    openTimerRef.current = null;
    closeTimerRef.current = null;
  }, []);

  const closeAll = useCallback(() => {
    clearTimers();
    setOpenDesktopMenu(null);
  }, [clearTimers]);

  const scheduleOpen = useCallback(
    (menuKey) => {
      clearTimers();
      openTimerRef.current = window.setTimeout(() => {
        setOpenDesktopMenu(menuKey);
      }, hoverOpenDelayMs);
    },
    [clearTimers],
  );

  const scheduleClose = useCallback(() => {
    clearTimers();
    closeTimerRef.current = window.setTimeout(() => {
      setOpenDesktopMenu(null);
    }, hoverCloseDelayMs);
  }, [clearTimers]);

  useEffect(() => {
    const update = () => setIsScrolled(window.scrollY > 8);

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const updateHash = () => setActiveHash(window.location.hash || "");
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      closeAll();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [pathname, closeAll]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeAll();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeAll]);

  return (
    <nav
      aria-label="Primary"
      className={[
        "sticky top-0 z-50 w-full border-b backdrop-blur-xl backdrop-saturate-150 transition-[background-color,box-shadow,border-color] duration-300",
        isScrolled
          ? "border-[#1E293B]/70 bg-[#050B14]/80 shadow-[0_14px_44px_rgba(0,0,0,0.5)] supports-backdrop-filter:bg-[#050B14]/65"
          : "border-[#1E293B]/45 bg-[#050B14]/55 supports-backdrop-filter:bg-[#050B14]/35",
      ].join(" ")}
      onMouseLeave={() => {
        if (!isDesktop) return;
        scheduleClose();
      }}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 lg:h-20">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="inline-flex items-center rounded-xl p-1 transition-[transform,background-color] duration-200 hover:scale-[1.01] hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26C1D3]/60"
            aria-label="TechMantrana home"
          >
            <Image
              src="/images/logos/logoHorizontal.png"
              alt=""
              width={290}
              height={70}
              priority
              className="h-8 w-auto drop-shadow-[0_0_22px_rgba(38,193,211,0.22)] lg:h-9"
            />
          </Link>
        </div>

        <div className="hidden items-center justify-center md:flex">
          <ul className="flex items-center gap-7">
            <li>
              <NavItem
                href="/#about"
                isActive={pathname === "/" && activeHash === "#about"}
              >
                About
              </NavItem>
            </li>

            <li className="relative">
              <button
                id={servicesButtonId}
                type="button"
                className={[
                  "relative inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold tracking-tight transition-[color,background-color] duration-200 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26C1D3]/60 active:translate-y-px",
                  "after:absolute after:inset-x-3 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:opacity-0 after:bg-linear-to-r after:from-transparent after:via-[#26C1D3] after:to-transparent after:transition-[transform,opacity] after:duration-300",
                  "hover:after:scale-x-100 hover:after:opacity-100",
                  isServicesOpen || isServicesActive
                    ? "text-[#26C1D3] after:scale-x-100 after:opacity-100"
                    : "text-[#E5E7EB]/80 hover:text-[#26C1D3]",
                ].join(" ")}
                aria-expanded={isServicesOpen}
                aria-controls={servicesPanelId}
                onMouseEnter={() => {
                  if (!isDesktop) return;
                  scheduleOpen("services");
                }}
                onFocus={() => setOpenDesktopMenu("services")}
                onClick={() =>
                  setOpenDesktopMenu((v) => (v === "services" ? null : "services"))
                }
              >
                Services
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className={[
                    "transition-transform duration-200",
                    isServicesOpen ? "rotate-180" : "rotate-0",
                  ].join(" ")}
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <MegaMenu
                isOpen={isServicesOpen}
                isTablet={isTablet}
                labelId={servicesButtonId}
                panelId={servicesPanelId}
                categories={servicesCategories}
                onClose={() => setOpenDesktopMenu(null)}
              />
            </li>

            <li className="relative">
              <button
                id={regionsButtonId}
                type="button"
                className={[
                  "relative inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold tracking-tight transition-[color,background-color] duration-200 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26C1D3]/60 active:translate-y-px",
                  "after:absolute after:inset-x-3 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:opacity-0 after:bg-linear-to-r after:from-transparent after:via-[#26C1D3] after:to-transparent after:transition-[transform,opacity] after:duration-300",
                  "hover:after:scale-x-100 hover:after:opacity-100",
                  isRegionsOpen || isRegionsActive
                    ? "text-[#26C1D3] after:scale-x-100 after:opacity-100"
                    : "text-[#E5E7EB]/80 hover:text-[#26C1D3]",
                ].join(" ")}
                aria-expanded={isRegionsOpen}
                aria-controls={regionsPanelId}
                onMouseEnter={() => {
                  if (!isDesktop) return;
                  scheduleOpen("regions");
                }}
                onFocus={() => setOpenDesktopMenu("regions")}
                onClick={() =>
                  setOpenDesktopMenu((v) => (v === "regions" ? null : "regions"))
                }
              >
                Regions
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className={[
                    "transition-transform duration-200",
                    isRegionsOpen ? "rotate-180" : "rotate-0",
                  ].join(" ")}
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <AnimatePresence>
                {isRegionsOpen ? (
                  <motion.div
                    id={regionsPanelId}
                    role="region"
                    aria-labelledby={regionsButtonId}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="absolute left-0 top-full hidden md:block"
                    onMouseEnter={() => {
                      if (!isDesktop) return;
                      clearTimers();
                    }}
                  >
                    <div className="mt-3 w-105 overflow-hidden rounded-2xl border border-white/10 bg-[#0F172A]/85 shadow-[0_22px_60px_rgba(0,0,0,0.6)] ring-1 ring-white/10 backdrop-blur-xl supports-backdrop-filter:bg-[#0F172A]/65">
                      <div className="grid gap-2 p-3">
                        {regions.map((region) => (
                          <Link
                            key={region.title}
                            href={region.href}
                            onClick={() => setOpenDesktopMenu(null)}
                            className="group flex items-start gap-3 rounded-xl border border-transparent p-3 transition-[border-color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:border-[#26C1D3]/35 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26C1D3]/60 active:translate-y-px"
                          >
                            <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#26C1D3]">
                              <Globe className="h-5 w-5" aria-hidden="true" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-[#E5E7EB] group-hover:text-[#26C1D3]">
                                {region.title}
                              </div>
                              <div className="mt-1 text-sm text-[#94A3B8]">
                                {region.description}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </li>

            <li>
              <NavItem
                href="/#contact"
                isActive={pathname === "/" && activeHash === "#contact"}
              >
                Contact
              </NavItem>
            </li>
          </ul>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#26C1D3] px-5 py-3 text-sm font-semibold text-[#050B14] shadow-[0_18px_40px_rgba(38,193,211,0.16)] transition-[background-color,transform,box-shadow] duration-200 hover:scale-[1.03] hover:bg-[#1EA7B8] hover:shadow-[0_24px_60px_rgba(38,193,211,0.22)] active:scale-[0.99] active:bg-[#168A99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26C1D3]/60"
          >
            Talk to Experts <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <MobileMenu />
      </div>
    </nav>
  );
}
