"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";

import { CTAButton } from "../ui/CTAButton";
import { MegaMenu } from "./MegaMenu";
import { MobileMenu } from "./MobileMenu";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useScroll } from "../../hooks/useScroll";

function cx(...values) {
  return values.filter(Boolean).join(" ");
}

function Icon({ name, className, "aria-hidden": ariaHidden = true }) {
  return (
    <span
      className={cx("material-symbols-outlined select-none leading-none", className)}
      aria-hidden={ariaHidden}
    >
      {name}
    </span>
  );
}

export function Header() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const reduceMotion = useReducedMotion();
  const { isScrolled } = useScroll({ threshold: 8 });

  const openTimerRef = useRef(null);
  const closeTimerRef = useRef(null);
  const servicesWrapperRef = useRef(null);

  const navItems = useMemo(
    () => [
      { href: "/case-studies", label: "Case Studies", icon: "stacked_line_chart" },
      { href: "/blog", label: "Blog", icon: "article" },
      { href: "/about", label: "About", icon: "info" },
      { href: "/contact", label: "Contact", icon: "mail" }
    ],
    []
  );

  const megaTopOffset = useMemo(() => (isScrolled ? "72px" : "116px"), [isScrolled]);

  const linkBase = useMemo(
    () =>
      cx(
        "group relative inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-body font-medium text-onPrimary",
        "hover:bg-headerHover active:bg-headerHover",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary",
        "after:content-[''] after:absolute after:bottom-1.5 after:left-4 after:right-4 after:h-[2px] after:origin-left after:scale-x-0 after:rounded-full after:bg-white/80 after:transition-transform after:duration-150",
        "hover:after:scale-x-100"
      ),
    []
  );

  useOutsideClick(servicesWrapperRef, () => setServicesOpen(false), servicesOpen);

  const clearTimers = useCallback(() => {
    if (openTimerRef.current) window.clearTimeout(openTimerRef.current);
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    openTimerRef.current = null;
    closeTimerRef.current = null;
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const scheduleOpen = useCallback(() => {
    clearTimers();
    openTimerRef.current = window.setTimeout(() => setServicesOpen(true), 150);
  }, [clearTimers]);

  const scheduleClose = useCallback(() => {
    clearTimers();
    closeTimerRef.current = window.setTimeout(() => setServicesOpen(false), 140);
  }, [clearTimers]);

  const closeServicesNow = useCallback(() => {
    clearTimers();
    setServicesOpen(false);
  }, [clearTimers]);

  const onServicesKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        closeServicesNow();
        return;
      }

      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setServicesOpen((v) => !v);
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setServicesOpen(true);
        window.setTimeout(() => {
          const firstLink = document.querySelector("#services-mega-menu a");
          firstLink?.focus?.();
        }, 0);
      }
    },
    [closeServicesNow]
  );

  return (
    <LazyMotion features={domAnimation}>
      <m.header
        initial={reduceMotion ? false : { y: -12, opacity: 0 }}
        animate={reduceMotion ? undefined : { y: 0, opacity: 1 }}
        transition={reduceMotion ? undefined : { type: "spring", stiffness: 520, damping: 46 }}
        className={cx("sticky top-0 z-50 w-full", isScrolled && "shadow-lg shadow-black/[0.10]")}
      >
        <div className={cx("absolute inset-0 pointer-events-none backdrop-blur")}>
          <m.div
            className="absolute inset-0 bg-headerBg"
            animate={{ opacity: isScrolled ? 0 : 1 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.22, ease: "easeOut" }}
          />
          <m.div
            className="absolute inset-0 bg-primary"
            animate={{ opacity: isScrolled ? 1 : 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.22, ease: "easeOut" }}
          />
          <m.div
            className="absolute bottom-0 left-0 right-0 h-px bg-borderOnBrand"
            animate={{ opacity: isScrolled ? 1 : 0.7 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.22, ease: "easeOut" }}
          />
        </div>

        <m.div
          className="relative hidden overflow-hidden border-b border-borderOnBrand bg-secondary md:block"
          initial={false}
          animate={{ height: isScrolled ? 0 : 36, opacity: isScrolled ? 0 : 1 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.2, ease: "easeOut" }}
          aria-hidden={isScrolled ? "true" : "false"}
        >
          <div className="mx-auto flex h-9 max-w-7xl items-center justify-between gap-4 px-4 text-[12.5px] text-onPrimary sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <div className="inline-flex min-w-0 items-center gap-2">
                <Icon name="verified" className="text-[16px] text-onPrimary" />
                <span className="truncate text-onPrimaryMuted">Trusted by 100+ businesses</span>
              </div>
              <span className="hidden text-onPrimaryMuted/60 lg:inline">•</span>
              <Link
                href="/contact"
                className={cx(
                  "hidden items-center gap-2 rounded-md px-2 py-1 font-medium text-onPrimary lg:inline-flex",
                  "hover:bg-headerHover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-secondary"
                )}
              >
                <Icon name="bolt" className="text-[16px] text-onPrimary" />
                <span>Free Strategy Session Available</span>
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="mailto:hello@businesstree.com"
                className={cx(
                  "hidden items-center gap-2 rounded-md px-2 py-1 text-onPrimaryMuted lg:inline-flex",
                  "hover:text-onPrimary hover:bg-headerHover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-secondary"
                )}
                aria-label="Email Business Tree"
              >
                <Icon name="mail" className="text-[16px]" />
                <span>hello@businesstree.com</span>
              </a>
              <a
                href="tel:+10000000000"
                className={cx(
                  "inline-flex items-center gap-2 rounded-md px-2 py-1 text-onPrimaryMuted",
                  "hover:text-onPrimary hover:bg-headerHover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-secondary"
                )}
                aria-label="Call Business Tree"
              >
                <Icon name="call" className="text-[16px]" />
                <span className="hidden sm:inline">+1 (000) 000-0000</span>
              </a>
            </div>
          </div>
        </m.div>

        <nav aria-label="Primary" className="relative">
          <m.div
            className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
            initial={false}
            animate={{ height: isScrolled ? 72 : 80 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.2, ease: "easeOut" }}
            style={{ height: isScrolled ? 72 : 80 }}
          >
            <Link
              href="/"
              className={cx(
                "inline-flex items-center gap-3 rounded-md",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
              )}
              aria-label="Business Tree home"
            >
              <Image
                src="/images/logos/logo2iconwhite.png"
                alt="Business Tree"
                width={220}
                height={72}
                priority
                className={cx("block w-auto", isScrolled ? "h-9" : "h-10")}
              />
              <span className={cx("font-heading text-onPrimary", isScrolled ? "text-[18px]" : "text-h4")}>
                Business Tree
              </span>
            </Link>

            <div className="hidden items-center gap-1 lg:flex">
              <div
                ref={servicesWrapperRef}
                className="relative"
                onMouseEnter={scheduleOpen}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  className={cx(
                    linkBase,
                    servicesOpen && "after:scale-x-100 after:bg-white",
                    "font-semibold"
                  )}
                  aria-haspopup="menu"
                  aria-expanded={servicesOpen}
                  aria-controls="services-mega-menu"
                  onKeyDown={onServicesKeyDown}
                  onClick={() => setServicesOpen((v) => !v)}
                >
                  <Icon name="grid_view" className="text-[20px] text-onPrimaryMuted" />
                  <span>Services</span>
                  <Icon
                    name={servicesOpen ? "expand_less" : "expand_more"}
                    className="text-[20px] text-onPrimaryMuted"
                  />
                </button>

                <MegaMenu
                  id="services-mega-menu"
                  isOpen={servicesOpen}
                  topOffset={megaTopOffset}
                  onClose={closeServicesNow}
                  onMouseEnter={scheduleOpen}
                  onMouseLeave={scheduleClose}
                  onItemClick={closeServicesNow}
                />
              </div>

              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className={linkBase}>
                  <Icon name={item.icon} className="text-[20px] text-onPrimaryMuted" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            <div className="hidden items-center gap-3 lg:flex">
              <a
                href="tel:+10000000000"
                className={cx(
                  "inline-flex h-11 w-11 items-center justify-center rounded-md",
                  "border border-borderOnBrand bg-transparent text-onPrimary hover:bg-headerHover active:bg-headerHover",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                )}
                aria-label="Call Business Tree"
              >
                <Icon name="call" className="text-[22px] text-onPrimary" />
              </a>
              <a
                href="https://wa.me/10000000000?text=Hi%20Business%20Tree%20%E2%80%94%20I%27d%20like%20a%20free%20strategy%20call."
                target="_blank"
                rel="noreferrer"
                className={cx(
                  "inline-flex h-11 w-11 items-center justify-center rounded-md",
                  "border border-borderOnBrand bg-transparent text-onPrimary hover:bg-headerHover active:bg-headerHover",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                )}
                aria-label="Message Business Tree on WhatsApp"
              >
                <Icon name="chat" className="text-[22px] text-onPrimary" />
              </a>

              <CTAButton
                label="Get Free Strategy"
                className={cx(
                  "!bg-white !text-black hover:!bg-white active:!bg-white",
                  "shadow-xl ring-1 ring-white/15 hover:ring-white/25"
                )}
              />
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className={cx(
                  "inline-flex h-12 w-12 items-center justify-center rounded-md",
                  "border border-borderOnBrand bg-transparent text-onPrimary hover:bg-headerHover",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                )}
                aria-label="Open menu"
              >
                <Icon name="menu" className="text-[24px] text-onPrimary" />
              </button>
            </div>
          </m.div>
        </nav>
      </m.header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </LazyMotion>
  );
}
