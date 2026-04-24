"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

function getFocusableElements(root) {
  if (!root) return [];
  const nodes = root.querySelectorAll(
    'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])'
  );
  return Array.from(nodes).filter(
    (el) => el.offsetParent !== null && !el.hasAttribute("disabled")
  );
}

function Chevron({ className }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldMark({ className }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M32 6C39 12 48 14 56 16V34C56 46 47 54 32 60C17 54 8 46 8 34V16C16 14 25 12 32 6Z"
        stroke="currentColor"
        strokeWidth="2.4"
      />
      <path
        d="M32 26C36.5 26 40 29.5 40 34V38H24V34C24 29.5 27.5 26 32 26Z"
        stroke="currentColor"
        strokeWidth="2.4"
      />
      <rect
        x="22"
        y="38"
        width="20"
        height="16"
        rx="5"
        stroke="currentColor"
        strokeWidth="2.4"
      />
    </svg>
  );
}

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const panelRef = useRef(null);
  const closeButtonRef = useRef(null);
  const prevFocusRef = useRef(null);

  const broadcastMenuState = useCallback((openState) => {
    document.documentElement.dataset.tmMenuOpen = openState ? "1" : "0";
    window.dispatchEvent(
      new CustomEvent("tm:menu", { detail: { open: Boolean(openState) } })
    );
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setServicesOpen(false);
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const services = useMemo(
    () => [
      { label: "Cybersecurity Strategy", href: "/#services" },
      { label: "GRC & Compliance", href: "/#services" },
      { label: "Risk Assessment", href: "/#services" },
      { label: "Security Testing", href: "/#services" },
    ],
    []
  );

  const navItems = useMemo(
    () => [
      { label: "About", href: "/#about" },
      { label: "Regions", href: "/#regions" },
      { label: "Contact", href: "/#contact" },
    ],
    []
  );

  useEffect(() => {
    broadcastMenuState(isOpen);
    return () => {
      if (typeof window === "undefined") return;
      broadcastMenuState(false);
    };
  }, [isOpen, broadcastMenuState]);

  useEffect(() => {
    if (!isOpen) return;

    prevFocusRef.current = document.activeElement;
    closeButtonRef.current?.focus();

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }

      if (e.key !== "Tab") return;

      const focusables = getFocusableElements(panelRef.current);
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (e.shiftKey) {
        if (active === first || active === panelRef.current) {
          e.preventDefault();
          last.focus();
        }
      } else if (active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      const prev = prevFocusRef.current;
      if (prev && typeof prev.focus === "function") prev.focus();
      prevFocusRef.current = null;
    };
  }, [isOpen, close]);

  useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (e) => {
      const panel = panelRef.current;
      if (!panel) return;
      if (panel.contains(e.target)) return;
      close();
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    return () => document.removeEventListener("pointerdown", onPointerDown, true);
  }, [isOpen, close]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => {
          if (!isOpen) open();
          else close();
        }}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        className="relative inline-flex items-center justify-center rounded-lg p-2 text-[#E5E7EB] transition-[background-color,color,transform] duration-200 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26C1D3]/60 active:translate-y-px"
      >
        <span
          className={[
            "absolute h-0.5 w-5 rounded-full bg-current transition-[transform,opacity] duration-200",
            isOpen ? "translate-y-0 rotate-45" : "-translate-y-1.5 rotate-0",
          ].join(" ")}
          aria-hidden="true"
        />
        <span
          className={[
            "absolute h-0.5 w-5 rounded-full bg-current transition-[transform,opacity] duration-200",
            isOpen ? "opacity-0" : "opacity-100",
          ].join(" ")}
          aria-hidden="true"
        />
        <span
          className={[
            "absolute h-0.5 w-5 rounded-full bg-current transition-[transform,opacity] duration-200",
            isOpen ? "translate-y-0 -rotate-45" : "translate-y-1.5 rotate-0",
          ].join(" ")}
          aria-hidden="true"
        />
      </button>

      <div
        className={[
          "fixed inset-0 z-[9999]",
          isOpen ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
        aria-hidden={!isOpen}
      >
        <div
          className={[
            "absolute inset-0 transition-opacity duration-300",
            isOpen ? "opacity-100" : "opacity-0",
          ].join(" ")}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-[#0B1220]/95 backdrop-blur-xl" />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-[#0B1220] to-[#0E1628]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.12] bg-[radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.55)_1px,transparent_0)] bg-size-[28px_28px]" />
        </div>

        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          tabIndex={-1}
          className={[
            "absolute inset-0 w-full bg-linear-to-b from-[#0B1220] to-[#0E1628]",
            "transition-transform duration-300 ease-out",
            isOpen ? "translate-x-0" : "translate-x-full",
          ].join(" ")}
        >
          <div className="relative h-full">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_15%_10%,rgba(38,193,211,0.14),transparent_55%)]" />

            <div className="relative flex h-full flex-col">
              <div className="flex items-center justify-between px-6 py-8">
                <Link
                  href="/"
                  onClick={close}
                  className="inline-flex items-center rounded-xl p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26C1D3]/60"
                  aria-label="TechMantrana home"
                >
                  <Image
                    src="/images/logos/logoHorizontal.png"
                    alt=""
                    width={220}
                    height={40}
                    priority
                    className="h-7 w-auto"
                  />
                </Link>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={close}
                  aria-label="Close menu"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-[#111827]/45 text-white transition-[background-color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-[#26C1D3]/25 hover:bg-[#111827]/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26C1D3]/60 active:translate-y-px"
                >
                  <span
                    className="relative h-0.5 w-5 rounded-full bg-current"
                    aria-hidden="true"
                    style={{ transform: "rotate(45deg)" }}
                  />
                  <span
                    className="absolute h-0.5 w-5 rounded-full bg-current"
                    aria-hidden="true"
                    style={{ transform: "rotate(-45deg)" }}
                  />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 pb-28">
                <nav aria-label="Mobile" className="space-y-5">
                  {navItems.slice(0, 1).map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={close}
                      className="group flex min-h-12 items-center justify-between rounded-2xl border border-white/10 bg-[#111827]/35 px-4 py-3 text-lg font-semibold text-white transition-[transform,background-color,border-color] duration-200 hover:translate-x-0.5 hover:border-[#26C1D3]/25 hover:bg-[#111827]/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26C1D3]/60"
                    >
                      <span>{item.label}</span>
                      <span className="text-[#26C1D3] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        →
                      </span>
                    </Link>
                  ))}

                  <div className="rounded-2xl border border-white/10 bg-[#111827]/35">
                    <button
                      type="button"
                      onClick={() => setServicesOpen((v) => !v)}
                      aria-label="Toggle services"
                      aria-expanded={servicesOpen}
                      className="flex min-h-12 w-full items-center justify-between px-4 py-3 text-left text-lg font-semibold text-white transition-[background-color] duration-200 hover:bg-[#111827]/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26C1D3]/60"
                    >
                      <span>Services</span>
                      <Chevron
                        className={[
                          "text-[#A1AFC3] transition-transform duration-200",
                          servicesOpen ? "rotate-180" : "rotate-0",
                        ].join(" ")}
                      />
                    </button>

                    <div
                      className={[
                        "grid overflow-hidden px-2 pb-2 transition-[grid-template-rows,opacity] duration-250 ease-out",
                        servicesOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0",
                      ].join(" ")}
                    >
                      <div className="min-h-0">
                        <div className="space-y-2 pt-1">
                          {services.map((item) => (
                            <Link
                              key={item.label}
                              href={item.href}
                              onClick={close}
                              className="group flex min-h-12 items-center justify-between rounded-xl border border-white/10 bg-[#111827]/45 px-4 py-3 text-sm font-medium text-[#A1AFC3] transition-[transform,background-color,border-color,color] duration-200 hover:translate-x-0.5 hover:border-[#26C1D3]/25 hover:bg-[#111827]/65 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26C1D3]/60"
                            >
                              <span>{item.label}</span>
                              <span className="text-[#26C1D3] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                                →
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="h-px w-full bg-white/10" aria-hidden="true" />

                  {navItems.slice(1).map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={close}
                      className="group flex min-h-12 items-center justify-between rounded-2xl border border-white/10 bg-[#111827]/35 px-4 py-3 text-lg font-semibold text-white transition-[transform,background-color,border-color] duration-200 hover:translate-x-0.5 hover:border-[#26C1D3]/25 hover:bg-[#111827]/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26C1D3]/60"
                    >
                      <span>{item.label}</span>
                      <span className="text-[#26C1D3] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        →
                      </span>
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="fixed inset-x-0 bottom-0 border-t border-white/10 bg-[#0B1220]/95 px-6 py-6 backdrop-blur-xl">
                <div className="space-y-4">
                  <div className="flex flex-col gap-3">
                    <Link
                      href="/#contact"
                      onClick={close}
                      aria-label="Talk to Experts"
                      className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#26C1D3] px-5 py-3 text-sm font-semibold text-black shadow-[0_16px_40px_rgba(38,193,211,0.18)] transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-0.5 hover:bg-[#1EA7B8] hover:shadow-[0_22px_60px_rgba(38,193,211,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26C1D3]/60 active:translate-y-px"
                    >
                      Talk to Experts →
                    </Link>
                    <Link
                      href="/#contact"
                      onClick={close}
                      aria-label="Request Assessment"
                      className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-[#1E293B] bg-transparent px-5 py-3 text-sm font-semibold text-white transition-[transform,background-color,border-color] duration-200 hover:-translate-y-0.5 hover:border-[#26C1D3]/25 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26C1D3]/60 active:translate-y-px"
                    >
                      Request Assessment
                    </Link>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[#A1AFC3]">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-[#111827]/35 text-[#26C1D3]">
                      <ShieldMark className="h-5 w-5" />
                    </span>
                    <span>ISO 27001 Certified • Enterprise Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
