"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";

import { Button } from "../ui/Button";

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

const SERVICES_GROUPS = [
  {
    items: [
      {
        href: "/services/seo",
        icon: "travel_explore",
        title: "SEO"
      },
      {
        href: "/services/performance-marketing",
        icon: "campaign",
        title: "Performance Marketing"
      },
      {
        href: "/services/web-development",
        icon: "code",
        title: "Web Development"
      },
      {
        href: "/services/social-media",
        icon: "insights",
        title: "Social Media"
      },
      {
        href: "/services/youtube-growth",
        icon: "smart_display",
        title: "YouTube Growth"
      },
      {
        href: "/services/linkedin-branding",
        icon: "badge",
        title: "LinkedIn Branding"
      },
      {
        href: "/services/influencer-marketing",
        icon: "groups",
        title: "Influencer Marketing"
      },
      {
        href: "/services/pr-authority",
        icon: "verified",
        title: "PR & Authority"
      }
    ]
  }
];

export const MobileMenu = memo(function MobileMenu({ isOpen, onClose }) {
  const panelRef = useRef(null);
  const closeBtnRef = useRef(null);
  const previousFocusRef = useRef(null);
  const [servicesOpen, setServicesOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const closeMenu = useCallback(() => {
    setServicesOpen(false);
    onClose?.();
  }, [onClose]);

  const navLinks = useMemo(
    () => [
      { href: "/case-studies", label: "Case Studies", icon: "workspace_premium" },
      { href: "/about", label: "About", icon: "info" },
      { href: "/blog", label: "Blog", icon: "article" },
      { href: "/contact", label: "Contact", icon: "mail" }
    ],
    []
  );

  useEffect(() => {
    if (!isOpen) return;
    document.body.classList.add("overflow-hidden");
    previousFocusRef.current = document.activeElement;
    closeBtnRef.current?.focus?.();
    return () => {
      document.body.classList.remove("overflow-hidden");
      previousFocusRef.current?.focus?.();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeMenu();
      if (e.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;

      const focusables = panel.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      const list = Array.from(focusables).filter((el) => el.getClientRects().length > 0);
      if (list.length === 0) return;

      const first = list[0];
      const last = list[list.length - 1];
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

  const onOverlayMouseDown = useCallback(
    (e) => {
      if (e.target === e.currentTarget) closeMenu();
    },
    [closeMenu]
  );

  const onNavigate = useCallback(() => {
    closeMenu();
  }, [closeMenu]);

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {isOpen ? (
          <m.div
            className="fixed inset-0 z-[60]"
            onMouseDown={onOverlayMouseDown}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={reduceMotion ? undefined : { opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.18 }}
          >
            <m.div
              className="absolute inset-0 bg-overlay"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={reduceMotion ? undefined : { opacity: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.18 }}
            />

            <m.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className={cx(
                "absolute right-0 top-0 h-full w-full sm:max-w-md",
                "border-l border-border bg-surface shadow-lg"
              )}
              initial={reduceMotion ? false : { x: "100%" }}
              animate={reduceMotion ? undefined : { x: 0 }}
              exit={reduceMotion ? undefined : { x: "100%" }}
              transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 520, damping: 48 }}
            >
              <div className="flex items-center justify-between border-b border-border px-4 py-4">
                <Link
                  href="/"
                  onClick={onNavigate}
                  className={cx(
                    "inline-flex min-h-[44px] items-center gap-2 rounded-md pr-2",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                  )}
                  aria-label="Business Tree home"
                >
                  <Image
                    src="/images/logos/logo2iconwhite.png"
                    alt="Business Tree"
                    width={160}
                    height={52}
                    className="block h-9 w-auto"
                    priority
                  />
                  <span className="font-heading text-body font-semibold text-textPrimary">Business Tree</span>
                </Link>
                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={closeMenu}
                  className={cx(
                    "inline-flex h-11 w-11 items-center justify-center rounded-md",
                    "text-textPrimary hover:bg-bg",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                  )}
                  aria-label="Close menu"
                >
                  <Icon name="close" className="text-[22px]" />
                </button>
              </div>

              <div className="flex h-[calc(100%-72px)] flex-col">
                <div className="flex-1 overflow-y-auto px-4 py-4">
                <m.div
                  className="space-y-2"
                  initial={reduceMotion ? false : "hidden"}
                  animate={reduceMotion ? undefined : "show"}
                  variants={{
                    hidden: { opacity: 0 },
                    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
                  }}
                >
                  <m.div
                    variants={{
                      hidden: { opacity: 0, y: 6 },
                      show: { opacity: 1, y: 0 }
                    }}
                  >
                    <Link
                      href="/"
                      onClick={onNavigate}
                      className={cx(
                        "flex min-h-[44px] items-center gap-3 rounded-md px-3 py-3 text-body font-medium text-textPrimary",
                        "hover:bg-bg active:bg-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                      )}
                    >
                      <Icon name="home" className="text-[22px] text-textSecondary" />
                      <span>Home</span>
                    </Link>
                  </m.div>

                  <m.div
                    variants={{
                      hidden: { opacity: 0, y: 6 },
                      show: { opacity: 1, y: 0 }
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setServicesOpen((v) => !v)}
                      className={cx(
                        "flex w-full min-h-[44px] items-center justify-between rounded-md px-3 py-3 text-body font-semibold text-textPrimary",
                        "hover:bg-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                      )}
                      aria-expanded={servicesOpen}
                      aria-controls="mobile-services"
                    >
                      <span className="inline-flex items-center gap-3">
                        <Icon name="grid_view" className="text-[22px] text-textSecondary" />
                        <span>Services</span>
                      </span>
                      <Icon name={servicesOpen ? "expand_less" : "expand_more"} className="text-[22px]" />
                    </button>
                  </m.div>

                  <AnimatePresence initial={false}>
                    {servicesOpen ? (
                      <m.div
                        id="mobile-services"
                        className="grid gap-2 overflow-hidden rounded-xl border border-border bg-bg p-2"
                        initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                        animate={reduceMotion ? undefined : { height: "auto", opacity: 1 }}
                        exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                        transition={reduceMotion ? { duration: 0 } : { duration: 0.2 }}
                      >
                        {SERVICES_GROUPS.map((group) => (
                          <div key="services" className="space-y-1">
                              {group.items.map((item) => (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  onClick={onNavigate}
                                  className={cx(
                                    "flex min-h-[44px] items-center gap-3 rounded-lg border border-transparent px-3 py-2.5",
                                    "hover:border-border hover:bg-surface active:bg-surface",
                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                                  )}
                                >
                                  <Icon name={item.icon} className="text-[22px] text-textSecondary" />
                                  <span className="text-body font-medium text-textPrimary">{item.title}</span>
                                </Link>
                              ))}
                          </div>
                        ))}
                      </m.div>
                    ) : null}
                  </AnimatePresence>

                  {navLinks.map((l) => (
                    <m.div
                      key={l.href}
                      variants={{
                        hidden: { opacity: 0, y: 6 },
                        show: { opacity: 1, y: 0 }
                      }}
                    >
                      <Link
                        href={l.href}
                        onClick={onNavigate}
                        className={cx(
                          "flex min-h-[44px] items-center gap-3 rounded-md px-3 py-3 text-body font-medium text-textPrimary",
                          "hover:bg-bg active:bg-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                        )}
                      >
                        <Icon name={l.icon} className="text-[22px] text-textSecondary" />
                        <span>{l.label}</span>
                      </Link>
                    </m.div>
                  ))}
                </m.div>

                <div className="mt-8 rounded-2xl border border-border bg-tint p-4">
                  <div className="text-small font-semibold text-textPrimary">Quick links</div>
                  <div className="mt-3 grid gap-2">
                    <Link
                      href="/services"
                      onClick={onNavigate}
                      className={cx(
                        "flex min-h-[44px] items-center justify-between rounded-lg border border-border bg-surface px-3 py-2.5 text-body font-medium text-textPrimary",
                        "hover:bg-bg active:bg-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-tint"
                      )}
                    >
                      <span className="inline-flex items-center gap-3">
                        <Icon name="apps" className="text-[22px] text-textSecondary" />
                        <span>All Services</span>
                      </span>
                      <Icon name="arrow_forward" className="text-[20px] text-textSecondary" />
                    </Link>
                    <Link
                      href="/careers"
                      onClick={onNavigate}
                      className={cx(
                        "flex min-h-[44px] items-center justify-between rounded-lg border border-border bg-surface px-3 py-2.5 text-body font-medium text-textPrimary",
                        "hover:bg-bg active:bg-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-tint"
                      )}
                    >
                      <span className="inline-flex items-center gap-3">
                        <Icon name="work" className="text-[22px] text-textSecondary" />
                        <span>Careers</span>
                      </span>
                      <Icon name="arrow_forward" className="text-[20px] text-textSecondary" />
                    </Link>
                  </div>
                </div>
                </div>

                <div className="border-t border-border bg-surface px-4 py-4">
                  <Button className="w-full" asChild>
                    <Link href="/contact" onClick={onNavigate}>
                      Get Free Strategy
                    </Link>
                  </Button>
                  <div className="mt-3 text-center text-[12px] text-textSecondary">No spam. No commitment.</div>
                </div>
              </div>
            </m.div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </LazyMotion>
  );
});
