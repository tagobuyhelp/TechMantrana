"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Bug,
  Cloud,
  Cpu,
  FileLock,
  Gavel,
  Globe,
  Layers,
  Mail,
  MapPin,
  Phone,
  Radar,
  Shield,
  ShieldCheck,
  UserRound,
  UserCog,
  Wrench,
} from "lucide-react";

import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";

import NavItem from "./NavItem";
import { openLeadForm } from "../ui/LeadFormModal";

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

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

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
  const [mobileOpen, setMobileOpen] = useState(false);

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");

  const servicesButtonId = useId();
  const servicesPanelId = useId();
  const aboutButtonId = useId();
  const aboutPanelId = useId();

  const openTimerRef = useRef(null);
  const closeTimerRef = useRef(null);

  const isServicesOpen = openDesktopMenu === "services";
  const isAboutOpen = openDesktopMenu === "about";

  const isServicesActive = pathname === "/" && activeHash === "#services";
  const isRegionsActive = pathname === "/" && activeHash === "#regions";
  const isAboutActive =
    pathname === "/" &&
    ["#about", "#founders-note", "#infosec"].includes(activeHash);

  const clearTimers = useCallback(() => {
    if (openTimerRef.current) window.clearTimeout(openTimerRef.current);
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    openTimerRef.current = null;
    closeTimerRef.current = null;
  }, []);

  const closeAll = useCallback(() => {
    clearTimers();
    setOpenDesktopMenu(null);
    setMobileOpen(false);
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

  const mobileNavLinks = useMemo(
    () => [
      { key: "about", label: "Behind the Brand", href: "/#about" },
      { key: "services", label: "Services" },
      { key: "training", label: "Training", href: "/#training" },
      { key: "delivery", label: "Delivery", href: "/#delivery" },
      { key: "regions", label: "Regions", href: "/#regions" },
      { key: "contact", label: "Contact", href: "/#contact" },
    ],
    [],
  );

  useEffect(() => {
    document.documentElement.dataset.tmMenuOpen = mobileOpen ? "1" : "0";
    window.dispatchEvent(
      new CustomEvent("tm:menu", { detail: { open: Boolean(mobileOpen) } }),
    );
    return () => {
      document.documentElement.dataset.tmMenuOpen = "0";
      window.dispatchEvent(new CustomEvent("tm:menu", { detail: { open: false } }));
    };
  }, [mobileOpen]);

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
        "sticky top-0 z-40 w-full border-b backdrop-blur-xl backdrop-saturate-150 transition-[background-color,box-shadow,border-color] duration-300 lg:z-50",
        isScrolled
          ? "border-(--tm-header-border-scrolled) bg-(--tm-header-bg-scrolled) shadow-[0_14px_44px_rgba(0,0,0,0.5)]"
          : "border-(--tm-header-border) bg-(--tm-header-bg)",
      ].join(" ")}
      onMouseLeave={() => {
        if (!isDesktop) return;
        scheduleClose();
      }}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1300px] items-center justify-between px-6 lg:h-20">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="inline-flex items-center rounded-xl p-1 transition-[transform,background-color] duration-200 hover:scale-[1.01] hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015FC4]/60"
            aria-label="TechMantrana home"
          >
            <Image
              src="/images/logos/logoHorizontal.png"
              alt=""
              width={290}
              height={90}
              priority
              className="h-14 w-auto drop-shadow-[0_0_22px_rgba(1,95,196,0.22)] lg:h-16"
            />
          </Link>
        </div>

        <div className="hidden items-center justify-center md:flex">
          <ul className="flex items-center gap-2">
            <li className="relative">
              <button
                id={aboutButtonId}
                type="button"
                className={[
                  "relative inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold tracking-tight transition-[color,background-color] duration-200 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015FC4]/60 active:translate-y-px",
                  "after:absolute after:inset-x-3 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:opacity-0 after:bg-linear-to-r after:from-transparent after:via-[#015FC4] after:to-transparent after:transition-[transform,opacity] after:duration-300",
                  "hover:after:scale-x-100 hover:after:opacity-100",
                  isAboutOpen || isAboutActive
                    ? "text-[#015FC4] after:scale-x-100 after:opacity-100"
                    : "text-[#E5E7EB]/80 hover:text-[#015FC4]",
                ].join(" ")}
                aria-expanded={isAboutOpen}
                aria-controls={aboutPanelId}
                onMouseEnter={() => {
                  if (!isDesktop) return;
                  scheduleOpen("about");
                }}
                onFocus={() => setOpenDesktopMenu("about")}
                onClick={() =>
                  setOpenDesktopMenu((v) => (v === "about" ? null : "about"))
                }
              >
                <UserRound className="h-4 w-4 text-[#015FC4]" aria-hidden="true" />
                Behind the Brand
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className={[
                    "transition-transform duration-200",
                    isAboutOpen ? "rotate-180" : "rotate-0",
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
                {isAboutOpen ? (
                  <motion.div
                    id={aboutPanelId}
                    role="region"
                    aria-labelledby={aboutButtonId}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="absolute left-1/2 top-full z-50 hidden w-[min(360px,calc(100vw-2rem))] -translate-x-1/2 md:block"
                    onMouseEnter={() => {
                      clearTimers();
                      setOpenDesktopMenu("about");
                    }}
                  >
                    <div className="mt-3 overflow-hidden rounded-2xl border border-white/10 bg-[#0F172A] shadow-[0_22px_60px_rgba(0,0,0,0.6)] ring-1 ring-white/10 backdrop-blur-xl">
                      <div className="grid gap-2 p-3">
                        <Link
                          href="/#about"
                          onClick={() => setOpenDesktopMenu(null)}
                          className="group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm font-semibold text-[#E5E7EB]/85 transition-[background-color,border-color,transform,color] duration-200 hover:translate-x-0.5 hover:border-[#015FC4]/25 hover:bg-white/7 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015FC4]/60"
                        >
                          <span className="flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-[#015FC4] text-white">
                              <UserRound className="h-4 w-4" aria-hidden="true" />
                            </span>
                            About Us
                          </span>
                          <span className="text-[#015FC4] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                            →
                          </span>
                        </Link>
                        <Link
                          href="/#founders-note"
                          onClick={() => setOpenDesktopMenu(null)}
                          className="group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm font-semibold text-[#E5E7EB]/85 transition-[background-color,border-color,transform,color] duration-200 hover:translate-x-0.5 hover:border-[#015FC4]/25 hover:bg-white/7 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015FC4]/60"
                        >
                          <span className="flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-[#015FC4] text-white">
                              <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                            </span>
                            Founder&apos;s Note
                          </span>
                          <span className="text-[#015FC4] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                            →
                          </span>
                        </Link>
                        <Link
                          href="/#infosec"
                          onClick={() => setOpenDesktopMenu(null)}
                          className="group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm font-semibold text-[#E5E7EB]/85 transition-[background-color,border-color,transform,color] duration-200 hover:translate-x-0.5 hover:border-[#015FC4]/25 hover:bg-white/7 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015FC4]/60"
                        >
                          <span className="flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-[#015FC4] text-white">
                              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                            </span>
                            Certification
                          </span>
                          <span className="text-[#015FC4] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                            →
                          </span>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </li>

            <li className="relative">
              <button
                id={servicesButtonId}
                type="button"
                className={[
                  "relative inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold tracking-tight transition-[color,background-color] duration-200 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015FC4]/60 active:translate-y-px",
                  "after:absolute after:inset-x-3 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:opacity-0 after:bg-linear-to-r after:from-transparent after:via-[#015FC4] after:to-transparent after:transition-[transform,opacity] after:duration-300",
                  "hover:after:scale-x-100 hover:after:opacity-100",
                  isServicesOpen || isServicesActive
                    ? "text-[#015FC4] after:scale-x-100 after:opacity-100"
                    : "text-[#E5E7EB]/80 hover:text-[#015FC4]",
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
                <ShieldCheck
                  className={[
                    "h-4 w-4",
                    "text-[#015FC4]",
                  ].join(" ")}
                  aria-hidden="true"
                />
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

            <li>
              <NavItem
                href="/#training"
                isActive={pathname === "/" && activeHash === "#training"}
                icon={BookOpen}
              >
                Training
              </NavItem>
            </li>

            <li>
              <NavItem
                href="/#delivery"
                isActive={pathname === "/" && activeHash === "#delivery"}
                icon={Layers}
              >
                Delivery
              </NavItem>
            </li>

            <li>
              <NavItem href="/#regions" isActive={isRegionsActive} icon={MapPin}>
                Regions
              </NavItem>
            </li>

            <li>
              <NavItem
                href="/#contact"
                isActive={pathname === "/" && activeHash === "#contact"}
                icon={Mail}
              >
                Contact
              </NavItem>
            </li>
          </ul>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          
          <Link
            href="/#contact"
            onClick={(e) => {
              e.preventDefault();
              openLeadForm({ source: "navbar_cta" });
            }}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#015FC4] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(1,95,196,0.16)] transition-[background-color,transform,box-shadow] duration-200 hover:scale-[1.03] hover:bg-[#014FAD] hover:shadow-[0_24px_60px_rgba(1,95,196,0.22)] active:scale-[0.99] active:bg-[#013F8F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015FC4]/60"
          >
            Talk to Experts <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            className="relative inline-flex items-center justify-center rounded-lg p-2 text-[#E5E7EB] transition-[background-color,color,transform] duration-200 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015FC4]/60 active:translate-y-px"
          >
            <span
              className="absolute h-0.5 w-5 -translate-y-1.5 rounded-full bg-current"
              aria-hidden="true"
            />
            <span
              className="absolute h-0.5 w-5 rounded-full bg-current"
              aria-hidden="true"
            />
            <span
              className="absolute h-0.5 w-5 translate-y-1.5 rounded-full bg-current"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navLinks={mobileNavLinks}
        servicesCategories={servicesCategories}
      />
    </nav>
  );
}
