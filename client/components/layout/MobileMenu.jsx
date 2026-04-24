"use client";

import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
} from "framer-motion";

function getFocusableElements(root) {
  if (!root) return [];
  const nodes = root.querySelectorAll(
    'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])',
  );
  return Array.from(nodes).filter((el) => el.getClientRects().length > 0);
}

function ChevronIcon({ className }) {
  return (
    <svg
      width="18"
      height="18"
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

function XIcon({ className }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6 6L18 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
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

const MobileMenu = memo(function MobileMenu({
  isOpen,
  onClose,
  navLinks,
  servicesCategories,
}) {
  const panelRef = useRef(null);
  const closeBtnRef = useRef(null);
  const previousFocusRef = useRef(null);
  const [servicesOpen, setServicesOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const closeMenu = useCallback(() => {
    setServicesOpen(false);
    onClose?.();
  }, [onClose]);

  const onOverlayMouseDown = useCallback(
    (e) => {
      if (e.target === e.currentTarget) closeMenu();
    },
    [closeMenu],
  );

  const flatServices = useMemo(() => {
    const result = [];
    for (const category of servicesCategories || []) {
      for (const item of category.items || []) result.push(item);
    }
    return result;
  }, [servicesCategories]);

  useEffect(() => {
    if (!isOpen) return;
    previousFocusRef.current = document.activeElement;
    closeBtnRef.current?.focus?.();

    const scrollY = window.scrollY;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
      window.scrollTo(0, scrollY);
      previousFocusRef.current?.focus?.();
      previousFocusRef.current = null;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu();
        return;
      }

      if (e.key !== "Tab") return;

      const focusables = getFocusableElements(panelRef.current);
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
        return;
      }

      if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeMenu, isOpen]);

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {isOpen ? (
          <m.div
            className="fixed inset-0 z-[9999]"
            onMouseDown={onOverlayMouseDown}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={reduceMotion ? undefined : { opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.18 }}
          >
            <m.div
              className="absolute inset-0 bg-black/50"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={reduceMotion ? undefined : { opacity: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.18 }}
              aria-hidden="true"
            />
            <m.div
              className="absolute inset-0 bg-[#0B1220] backdrop-blur-xl"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={reduceMotion ? undefined : { opacity: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.18 }}
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-linear-to-b from-[#0B1220] to-[#0E1628]"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.12] bg-[radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.55)_1px,transparent_0)] bg-size-[28px_28px]"
              aria-hidden="true"
            />

            <m.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className="absolute right-0 top-0 h-full w-full bg-linear-to-b from-[#0B1220] to-[#0E1628] shadow-[0_24px_90px_rgba(0,0,0,0.7)]"
              initial={reduceMotion ? false : { x: "100%" }}
              animate={reduceMotion ? undefined : { x: 0 }}
              exit={reduceMotion ? undefined : { x: "100%" }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 520, damping: 48 }
              }
            >
              <div className="relative flex h-full flex-col">
                <div className="flex items-center justify-between px-6 py-8">
                  <Link
                    href="/"
                    onClick={closeMenu}
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
                    ref={closeBtnRef}
                    type="button"
                    onClick={closeMenu}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-[#111827]/45 text-white transition-[background-color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-[#26C1D3]/25 hover:bg-[#111827]/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26C1D3]/60 active:translate-y-px"
                    aria-label="Close menu"
                  >
                    <XIcon className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 pb-28">
                  <nav aria-label="Mobile" className="space-y-5">
                    {navLinks?.map((item) => {
                      if (item.key !== "services") {
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={closeMenu}
                            className="group flex min-h-12 items-center justify-between rounded-2xl border border-white/10 bg-[#111827]/35 px-4 py-3 text-lg font-semibold text-white transition-[transform,background-color,border-color] duration-200 hover:translate-x-0.5 hover:border-[#26C1D3]/25 hover:bg-[#111827]/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26C1D3]/60"
                          >
                            <span>{item.label}</span>
                            <span className="text-[#26C1D3] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                              →
                            </span>
                          </Link>
                        );
                      }

                      return (
                        <div
                          key={item.key}
                          className="rounded-2xl border border-white/10 bg-[#111827]/35"
                        >
                          <button
                            type="button"
                            onClick={() => setServicesOpen((v) => !v)}
                            className="flex min-h-12 w-full items-center justify-between px-4 py-3 text-left text-lg font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26C1D3]/60"
                            aria-expanded={servicesOpen}
                            aria-controls="mobile-services"
                          >
                            <span>Services</span>
                            <ChevronIcon
                              className={[
                                "text-[#A1AFC3] transition-transform duration-200",
                                servicesOpen ? "rotate-180" : "rotate-0",
                              ].join(" ")}
                            />
                          </button>

                          <AnimatePresence initial={false}>
                            {servicesOpen ? (
                              <m.div
                                id="mobile-services"
                                className="grid overflow-hidden px-3 pb-3"
                                initial={
                                  reduceMotion
                                    ? false
                                    : { height: 0, opacity: 0 }
                                }
                                animate={
                                  reduceMotion
                                    ? undefined
                                    : { height: "auto", opacity: 1 }
                                }
                                exit={
                                  reduceMotion
                                    ? undefined
                                    : { height: 0, opacity: 0 }
                                }
                                transition={
                                  reduceMotion ? { duration: 0 } : { duration: 0.2 }
                                }
                              >
                                <div className="space-y-2 pt-1">
                                  {flatServices.map((svc) => {
                                    const Icon = svc.icon;
                                    return (
                                      <Link
                                        key={svc.title}
                                        href={svc.href}
                                        onClick={closeMenu}
                                        className="group flex min-h-12 items-center gap-3 rounded-xl border border-white/10 bg-[#111827]/45 px-4 py-3 text-sm font-medium text-[#A1AFC3] transition-[transform,background-color,border-color,color] duration-200 hover:translate-x-0.5 hover:border-[#26C1D3]/25 hover:bg-[#111827]/65 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26C1D3]/60"
                                      >
                                        {Icon ? (
                                          <Icon
                                            className="h-4 w-4 shrink-0 text-[#26C1D3]"
                                            aria-hidden="true"
                                          />
                                        ) : null}
                                        <span className="flex-1">{svc.title}</span>
                                        <span className="text-[#26C1D3] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                                          →
                                        </span>
                                      </Link>
                                    );
                                  })}
                                </div>
                              </m.div>
                            ) : null}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </nav>
                </div>

                <div className="fixed inset-x-0 bottom-0 border-t border-white/10 bg-[#0B1220] px-6 py-6 backdrop-blur-xl">
                  <div className="space-y-4">
                    <div className="flex flex-col gap-3">
                      <Link
                        href="/#contact"
                        onClick={closeMenu}
                        aria-label="Talk to Experts"
                        className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#26C1D3] px-5 py-3 text-sm font-semibold text-black shadow-[0_16px_40px_rgba(38,193,211,0.18)] transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-0.5 hover:bg-[#1EA7B8] hover:shadow-[0_22px_60px_rgba(38,193,211,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26C1D3]/60 active:translate-y-px"
                      >
                        Talk to Experts →
                      </Link>
                      <Link
                        href="/#contact"
                        onClick={closeMenu}
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
            </m.div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </LazyMotion>
  );
});

export default MobileMenu;

