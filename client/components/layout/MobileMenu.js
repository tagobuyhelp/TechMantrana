"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export default function MobileMenu({
  isOpen,
  onClose,
  activeHash,
  servicesCategories,
  regions,
}) {
  const [openSection, setOpenSection] = useState(null);

  const servicesItems = useMemo(
    () => servicesCategories.flatMap((c) => c.items),
    [servicesCategories],
  );

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="fixed inset-0 z-60 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          onKeyDown={(e) => {
            if (e.key === "Escape") onClose();
          }}
        >
          <div
            className="absolute inset-0 bg-black/55 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="relative h-full w-full bg-[#050B14]"
          >
            <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
              <Link
                href="/"
                className="inline-flex items-center"
                onClick={onClose}
                aria-label="TechMantrana home"
              >
                <Image
                  src="/images/logos/logoHorizontal.png"
                  alt=""
                  width={240}
                  height={40}
                  priority
                  className="h-7 w-auto"
                />
              </Link>

              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-2 text-[#E5E7EB] hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26C1D3]/60"
                aria-label="Close menu"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M6 6L18 18M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="mx-auto w-full max-w-7xl px-6 pb-10 pt-6">
              <div className="flex flex-col gap-2">
                <Link
                  href="/#about"
                  className={[
                    "rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold transition-colors",
                    activeHash === "#about"
                      ? "text-[#26C1D3]"
                      : "text-[#E5E7EB] hover:bg-white/5",
                  ].join(" ")}
                  onClick={onClose}
                >
                  About
                </Link>

                <button
                  type="button"
                  className="flex items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-[#E5E7EB] hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26C1D3]/60"
                  aria-expanded={openSection === "services"}
                  onClick={() =>
                    setOpenSection((v) => (v === "services" ? null : "services"))
                  }
                >
                  <span>Services</span>
                  <span className="text-[#94A3B8]">
                    {openSection === "services" ? "−" : "+"}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {openSection === "services" ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="mt-2 grid gap-2 rounded-xl border border-white/10 bg-[#0F172A] p-3">
                        {servicesItems.map((item) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            onClick={onClose}
                            className="rounded-lg px-3 py-2 text-sm text-[#E5E7EB]/85 hover:bg-white/5 hover:text-[#26C1D3]"
                          >
                            {item.title}
                            <span className="ml-2 text-xs text-[#94A3B8]">
                              {item.description}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                <button
                  type="button"
                  className="flex items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-[#E5E7EB] hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26C1D3]/60"
                  aria-expanded={openSection === "regions"}
                  onClick={() =>
                    setOpenSection((v) => (v === "regions" ? null : "regions"))
                  }
                >
                  <span>Regions</span>
                  <span className="text-[#94A3B8]">
                    {openSection === "regions" ? "−" : "+"}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {openSection === "regions" ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="mt-2 grid gap-2 rounded-xl border border-white/10 bg-[#0F172A] p-3">
                        {regions.map((region) => (
                          <Link
                            key={region.title}
                            href={region.href}
                            onClick={onClose}
                            className="rounded-lg px-3 py-2 text-sm text-[#E5E7EB]/85 hover:bg-white/5 hover:text-[#26C1D3]"
                          >
                            {region.title}
                            <span className="ml-2 text-xs text-[#94A3B8]">
                              {region.description}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                <Link
                  href="/#contact"
                  className={[
                    "rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold transition-colors",
                    activeHash === "#contact"
                      ? "text-[#26C1D3]"
                      : "text-[#E5E7EB] hover:bg-white/5",
                  ].join(" ")}
                  onClick={onClose}
                >
                  Contact
                </Link>
              </div>

              <div className="mt-6">
                <Link
                  href="/#contact"
                  onClick={onClose}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-[#26C1D3] px-5 py-3 text-sm font-semibold text-[#050B14] transition-colors hover:bg-[#1EA7B8] active:bg-[#168A99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26C1D3]/60"
                >
                  Talk to Experts
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
