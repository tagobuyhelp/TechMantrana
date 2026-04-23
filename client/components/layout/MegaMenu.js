"use client";

import { AnimatePresence, motion } from "framer-motion";

import MenuItemCard from "./MenuItemCard";

export default function MegaMenu({
  isOpen,
  isTablet,
  labelId,
  panelId,
  categories,
  onClose,
}) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          id={panelId}
          role="region"
          aria-labelledby={labelId}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.24, ease: "easeOut" }}
          className="absolute left-1/2 top-full z-50 hidden w-screen -translate-x-1/2 md:block"
        >
          <div className="mx-auto w-full max-w-7xl px-6">
            <div className="mt-3 overflow-hidden rounded-2xl border border-white/10 bg-[#0F172A] shadow-[0_22px_60px_rgba(0,0,0,0.6)] ring-1 ring-white/10 backdrop-blur-xl supports-backdrop-filter:bg-[#0F172A]">
              <div
                className={[
                  "grid gap-6 p-5 lg:p-6",
                  isTablet ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-4",
                ].join(" ")}
              >
                {categories.map((category) => (
                  <div key={category.title} className="min-w-0">
                    <div className="text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
                      {category.title}
                    </div>
                    <div className="mt-4 grid gap-3">
                      {category.items.map((item) => (
                        <MenuItemCard
                          key={item.title}
                          href={item.href}
                          title={item.title}
                          description={item.description}
                          icon={item.icon}
                          onNavigate={onClose}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
