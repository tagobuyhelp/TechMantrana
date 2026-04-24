"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, ShieldCheck, UserRound } from "lucide-react";

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

function getFocusableElements(root) {
  if (!root) return [];
  const nodes = root.querySelectorAll(
    'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])',
  );
  return Array.from(nodes).filter((el) => el.getClientRects().length > 0);
}

export default function MobileMenu({
  isOpen,
  onClose,
  navLinks = [],
  servicesCategories = [],
}) {
  const canUseDOM = typeof document !== "undefined";
  const panelRef = useRef(null);
  const closeBtnRef = useRef(null);
  const previousFocusRef = useRef(null);

  const closeMenu = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const hasServices = Array.isArray(servicesCategories) && servicesCategories.length > 0;
  const [links, servicesLink] = useMemo(() => {
    const items = Array.isArray(navLinks) ? navLinks : [];
    const svc = items.find((l) => l?.key === "services");
    const rest = items.filter((l) => l && l.key !== "services");
    return [rest, svc];
  }, [navLinks]);

  const navIconByKey = useMemo(
    () => ({
      about: UserRound,
      services: ShieldCheck,
      regions: MapPin,
      contact: Mail,
    }),
    [],
  );

  const serviceItems = useMemo(() => {
    const result = [];
    for (const category of servicesCategories || []) {
      for (const item of category.items || []) {
        if (item?.href && item?.title) result.push(item);
      }
    }
    return result;
  }, [servicesCategories]);

  const onOverlayMouseDown = useCallback(
    (e) => {
      if (!isOpen) return;
      if (panelRef.current && panelRef.current.contains(e.target)) return;
      closeMenu();
    },
    [closeMenu, isOpen],
  );

  useEffect(() => {
    if (!isOpen) return;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement;
    closeBtnRef.current?.focus?.();

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
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      previousFocusRef.current?.focus?.();
      previousFocusRef.current = null;
    };
  }, [closeMenu, isOpen]);

  if (!canUseDOM || !isOpen) return null;

  const content = (
    <div
      className={[
        "fixed inset-0 z-9999",
        isOpen ? "pointer-events-auto" : "pointer-events-none",
      ].join(" ")}
      style={{ zIndex: 9999 }}
      onMouseDown={onOverlayMouseDown}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        onClick={closeMenu}
        className={[
          "absolute inset-0 bg-black transition-opacity duration-200",
          isOpen ? "opacity-55" : "opacity-0",
        ].join(" ")}
        aria-label="Close menu"
      />
      <div
        className={[
          "pointer-events-none absolute inset-0 bg-[#0B1220] backdrop-blur-xl transition-opacity duration-200",
          isOpen ? "opacity-95" : "opacity-0",
        ].join(" ")}
        aria-hidden="true"
      />
      <div
        className={[
          "pointer-events-none absolute inset-0 bg-linear-to-b from-[#0B1220] to-[#0E1628] transition-opacity duration-200",
          isOpen ? "opacity-100" : "opacity-0",
        ].join(" ")}
        aria-hidden="true"
      />
      <div
        className={[
          "pointer-events-none absolute inset-0 opacity-[0.10] bg-[radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.55)_1px,transparent_0)] bg-size-[28px_28px] transition-opacity duration-200",
          isOpen ? "opacity-100" : "opacity-0",
        ].join(" ")}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        tabIndex={-1}
        className={[
          "absolute right-0 top-0 h-full w-full max-w-md border-l border-white/10 bg-linear-to-b from-[#0B1220] to-[#0E1628] shadow-[0_24px_90px_rgba(0,0,0,0.7)]",
          "transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
        style={{ zIndex: 10000 }}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
            <Link
              href="/"
              onClick={closeMenu}
              className="inline-flex items-center rounded-xl p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26C1D3]/60"
              aria-label="TechMantrana home"
            >
              <Image
                src="/images/logos/logoHorizontal.png"
                alt=""
                width={240}
                height={40}
                priority={false}
                className="h-7 w-auto"
              />
            </Link>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={closeMenu}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-[background-color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-[#26C1D3]/25 hover:bg-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26C1D3]/60 active:translate-y-px"
              aria-label="Close menu"
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-5">
            <nav aria-label="Mobile" className="space-y-3">
              {links
                .filter((l) => l && l.href)
                .map((l) => {
                  const Icon = navIconByKey[l.key];
                  return (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={closeMenu}
                      className="group flex min-h-12 items-center justify-between rounded-2xl border border-white/10 bg-[#111827]/35 px-4 py-3 text-lg font-semibold text-white transition-[transform,background-color,border-color] duration-200 hover:translate-x-0.5 hover:border-[#26C1D3]/25 hover:bg-[#111827]/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26C1D3]/60"
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#26C1D3]">
                          {Icon ? <Icon className="h-4 w-4" aria-hidden="true" /> : null}
                        </span>
                        <span className="truncate">{l.label}</span>
                      </span>
                      <span className="text-[#26C1D3] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        →
                      </span>
                    </Link>
                  );
                })}

              {servicesLink || hasServices ? (
                <div className="rounded-2xl border border-white/10 bg-[#111827]/35">
                  <details className="group">
                    <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-4 py-3 text-lg font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26C1D3]/60">
                      <span className="flex min-w-0 items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#26C1D3]">
                          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span className="truncate">{servicesLink?.label || "Services"}</span>
                      </span>
                      <ChevronIcon className="text-[#A1AFC3] transition-transform duration-200 group-open:rotate-180" />
                    </summary>
                    <div className="px-3 pb-3">
                      <div className="space-y-2 pt-1">
                        {serviceItems.length ? (
                          serviceItems.map((svc) => (
                            <Link
                              key={svc.title}
                              href={svc.href}
                              onClick={closeMenu}
                              className="group flex min-h-12 items-center justify-between rounded-xl border border-white/10 bg-[#111827]/45 px-4 py-3 text-sm font-medium text-[#A1AFC3] transition-[transform,background-color,border-color,color] duration-200 hover:translate-x-0.5 hover:border-[#26C1D3]/25 hover:bg-[#111827]/65 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26C1D3]/60"
                            >
                              <span className="flex min-w-0 flex-1 items-center gap-3">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#26C1D3]">
                                  {svc.icon ? (
                                    <svc.icon className="h-4 w-4" aria-hidden="true" />
                                  ) : null}
                                </span>
                                <span className="truncate">{svc.title}</span>
                              </span>
                              <span className="text-[#26C1D3] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                                →
                              </span>
                            </Link>
                          ))
                        ) : (
                          <Link
                            href="/#services"
                            onClick={closeMenu}
                            className="flex min-h-12 items-center rounded-xl border border-white/10 bg-[#111827]/45 px-4 py-3 text-sm font-medium text-[#A1AFC3] hover:bg-[#111827]/65 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26C1D3]/60"
                          >
                            <span className="flex min-w-0 items-center gap-3">
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#26C1D3]">
                                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                              </span>
                              <span className="truncate">View Services →</span>
                            </span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </details>
                </div>
              ) : null}
            </nav>
          </div>

          <div className="sticky bottom-0 border-t border-white/10 bg-[#0B1220]/92 px-6 py-5 backdrop-blur-xl">
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
              <div className="text-center text-xs text-[#A1AFC3]">
                ISO 27001 Certified • Enterprise Ready
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
