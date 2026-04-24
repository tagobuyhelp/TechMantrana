"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

function PhoneIcon({ className, ...props }) {
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
      <path d="M22 16.9v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.18 2 2 0 0 1 4.08 2h3a2 2 0 0 1 2 1.72c.12.9.3 1.77.54 2.62a2 2 0 0 1-.45 2.11L8.1 9.9a16 16 0 0 0 6 6l1.45-1.08a2 2 0 0 1 2.11-.45c.85.24 1.72.42 2.62.54A2 2 0 0 1 22 16.9Z" />
    </svg>
  );
}

function ChatIcon({ className, ...props }) {
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
      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" />
    </svg>
  );
}

function AssessmentIcon({ className, ...props }) {
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
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8" />
      <path d="M8 17h5" />
    </svg>
  );
}

function ArrowUpIcon({ className, ...props }) {
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
      <path d="M12 19V5" />
      <path d="M6 11l6-6 6 6" />
    </svg>
  );
}

export default function MultiCTA({
  phoneHref = "tel:+971522933862",
  whatsappHref = "https://wa.me/971522933862",
  assessmentHref = "/#contact",
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isNearFooter, setIsNearFooter] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isVisibleRef = useRef(false);
  const rafIdRef = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    const getInitial = () =>
      typeof document !== "undefined" &&
      document.documentElement?.dataset?.tmMenuOpen === "1";
    setIsMenuOpen(getInitial());

    const onMenu = (e) => setIsMenuOpen(Boolean(e?.detail?.open));
    window.addEventListener("tm:menu", onMenu);
    return () => window.removeEventListener("tm:menu", onMenu);
  }, []);

  useEffect(() => {
    const updateVisibility = () => {
      rafIdRef.current = null;
      const next = window.scrollY > 300;
      if (next !== isVisibleRef.current) {
        isVisibleRef.current = next;
        setIsVisible(next);
      }
      if (!next) setIsExpanded(false);
    };

    const onScroll = () => {
      if (rafIdRef.current != null) return;
      rafIdRef.current = window.requestAnimationFrame(updateVisibility);
    };

    updateVisibility();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafIdRef.current != null) {
        window.cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsNearFooter(entry.isIntersecting),
      { root: null, threshold: 0, rootMargin: "0px 0px 240px 0px" }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isExpanded) return;

    const onPointerDown = (event) => {
      const root = rootRef.current;
      if (!root) return;
      if (root.contains(event.target)) return;
      setIsExpanded(false);
    };

    const onKeyDown = (event) => {
      if (event.key === "Escape") setIsExpanded(false);
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isExpanded]);

  const shouldShow = isVisible && !isNearFooter && !isMenuOpen;

  const actions = useMemo(
    () => [
      {
        key: "call",
        label: "Call Now",
        href: phoneHref,
        icon: PhoneIcon,
        ariaLabel: "Call cybersecurity consultants",
        variant: "secondary",
      },
      {
        key: "whatsapp",
        label: "WhatsApp",
        href: whatsappHref,
        icon: ChatIcon,
        ariaLabel: "Chat on WhatsApp",
        variant: "secondary",
      },
      {
        key: "assessment",
        label: "Request Assessment",
        href: assessmentHref,
        icon: AssessmentIcon,
        ariaLabel: "Request a cybersecurity assessment",
        variant: "primary",
      },
    ],
    [phoneHref, whatsappHref, assessmentHref]
  );

  const onBackToTop = useCallback(() => {
    setIsExpanded(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div
      ref={rootRef}
      className={[
        "fixed bottom-6 left-1/2 z-50 w-[min(1100px,calc(100%-1.5rem))] -translate-x-1/2",
        "transition-[opacity,transform] duration-300 ease-out",
        shouldShow
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      ].join(" ")}
      role="region"
      aria-label="Consultation call to action"
    >
      <div className="rounded-2xl border border-[#1E293B] bg-[#050B14]/80 shadow-[0_18px_55px_rgba(38,193,211,0.16)] backdrop-blur-xl">
        <div className="flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-4">
          <div className="hidden min-w-0 sm:block">
            <div className="text-sm text-[#94A3B8]">
              Build a resilient cybersecurity foundation
            </div>
            <div className="mt-1 text-base font-semibold tracking-tight text-[#E5E7EB]">
              Start your free consultation today
            </div>
          </div>

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onBackToTop}
              aria-label="Back to top"
              className="hidden h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-[rgba(15,23,42,0.45)] text-[#26C1D3] shadow-[0_16px_45px_rgba(0,0,0,0.32)] transition-[transform,box-shadow,background-color,border-color] duration-200 hover:-translate-y-0.5 hover:border-[#26C1D3]/25 hover:bg-[rgba(15,23,42,0.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26C1D3]/60 active:translate-y-px sm:inline-flex"
            >
              <ArrowUpIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => setIsExpanded((v) => !v)}
              aria-label="Talk to cybersecurity experts"
              aria-expanded={isExpanded}
              className={[
                "inline-flex w-full items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold",
                "transition-[transform,box-shadow,background-color] duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26C1D3]/60 active:scale-[0.99]",
                isExpanded
                  ? "bg-[rgba(15,23,42,0.55)] text-[#E5E7EB] shadow-[0_18px_50px_rgba(0,0,0,0.35)] hover:-translate-y-0.5 hover:bg-[rgba(15,23,42,0.7)]"
                  : "bg-[#26C1D3] text-[#050B14] shadow-[0_16px_40px_rgba(38,193,211,0.18)] hover:scale-[1.03] hover:bg-[#1EA7B8] hover:shadow-[0_22px_60px_rgba(38,193,211,0.28)]",
              ].join(" ")}
            >
              Talk to Experts →
            </button>
          </div>
        </div>

        <div
          className={[
            "grid overflow-hidden px-3 pb-3 sm:px-4 sm:pb-4",
            "transition-[grid-template-rows,opacity,transform] duration-250 ease-out",
            isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          ].join(" ")}
          aria-hidden={!isExpanded}
        >
          <div
            className={[
              "min-h-0",
              "transition-[transform,opacity] duration-250 ease-out",
              isExpanded ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0",
            ].join(" ")}
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-3">
              {actions.map((action) => {
                const Icon = action.icon;
                const isPrimary = action.variant === "primary";

                return (
                  <a
                    key={action.key}
                    href={action.href}
                    onClick={() => setIsExpanded(false)}
                    aria-label={action.ariaLabel}
                    className={[
                      "group inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold",
                      "transition-[transform,box-shadow,background-color,border-color,color] duration-200",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26C1D3]/60 active:scale-[0.99]",
                      "hover:-translate-y-0.5",
                      isPrimary
                        ? "bg-[#26C1D3] text-[#050B14] shadow-[0_16px_40px_rgba(38,193,211,0.18)] hover:bg-[#1EA7B8] hover:shadow-[0_22px_60px_rgba(38,193,211,0.28)]"
                        : "border border-white/10 bg-[rgba(15,23,42,0.45)] text-[#E5E7EB] shadow-[0_16px_45px_rgba(0,0,0,0.32)] hover:border-[#26C1D3]/25 hover:bg-[rgba(15,23,42,0.65)]",
                      "sm:w-auto",
                    ].join(" ")}
                  >
                    <Icon
                      className={[
                        "h-4 w-4",
                        isPrimary ? "text-[#050B14]" : "text-[#26C1D3]",
                      ].join(" ")}
                    />
                    <span>{action.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
