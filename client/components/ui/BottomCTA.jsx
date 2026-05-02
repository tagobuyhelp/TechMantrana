"use client";

import { useEffect, useRef, useState } from "react";

import { openLeadForm } from "./LeadFormModal";

export default function BottomCTA({ href = "/#contact" }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isNearFooter, setIsNearFooter] = useState(false);
  const isVisibleRef = useRef(false);
  const rafIdRef = useRef(null);

  useEffect(() => {
    const updateVisibility = () => {
      rafIdRef.current = null;
      const next = window.scrollY > 300;
      if (next !== isVisibleRef.current) {
        isVisibleRef.current = next;
        setIsVisible(next);
      }
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
      { root: null, threshold: 0, rootMargin: "0px 0px 220px 0px" }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const shouldShow = isVisible && !isNearFooter;

  return (
    <div
      className={[
        "fixed bottom-6 left-1/2 z-50 w-[min(1100px,calc(100%-1.5rem))] -translate-x-1/2 px-0",
        "transition-[opacity,transform] duration-300 ease-out",
        shouldShow
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      ].join(" ")}
      role="region"
      aria-label="Consultation call to action"
    >
      <div className="flex flex-col items-stretch justify-between gap-4 rounded-2xl border border-[#1E293B] bg-[#050B14]/80 p-4 shadow-[0_18px_55px_rgba(1,95,196,0.16)] backdrop-blur-xl sm:flex-row sm:items-center sm:gap-6 sm:p-5">
        <div className="hidden min-w-0 sm:block">
          <div className="text-sm text-[#94A3B8]">
            Build a resilient cybersecurity foundation
          </div>
          <div className="mt-1 text-lg font-semibold tracking-tight text-[#E5E7EB]">
            Start your free consultation today
          </div>
        </div>

        <a
          href={href}
          onClick={(e) => {
            e.preventDefault();
            openLeadForm({ source: "bottom_cta" });
          }}
          aria-label="Talk to cybersecurity experts"
          className="inline-flex w-full items-center justify-center rounded-xl bg-[#015FC4] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(1,95,196,0.18)] transition-[transform,box-shadow,background-color] duration-200 hover:scale-[1.03] hover:bg-[#014FAD] hover:shadow-[0_22px_60px_rgba(1,95,196,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015FC4]/60 active:scale-[0.99] sm:w-auto"
        >
          Talk to Experts →
        </a>
      </div>
    </div>
  );
}
