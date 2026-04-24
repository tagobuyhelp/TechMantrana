"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ClipboardList, Lock, Timer, Verified } from "lucide-react";
import Image from "next/image";

import Button from "../ui/Button";
import Container from "../ui/Container";

function InputField({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  error,
  textarea = false,
  options,
  className = "",
}) {
  const base =
    "mt-1 w-full rounded-xl border border-[#1E293B] bg-[#050B14] px-3.5 py-2 text-sm text-[#E5E7EB] placeholder:text-[#94A3B8]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26C1D3]/60 sm:px-4";

  if (options && !textarea) {
    return (
      <div className={className}>
        <label htmlFor={id} className="text-sm font-medium text-[#E5E7EB]">
          {label}
          {required ? <span className="text-[#94A3B8]"> *</span> : null}
        </label>
        <div className="relative">
          <select
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            className={[
              base,
              "appearance-none pr-10",
              error ? "border-[#26C1D3]/60" : "",
            ].join(" ")}
          >
            <option value="" disabled>
              {placeholder || "Select an option"}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {error ? (
          <div className="mt-2 text-xs font-medium text-[#94A3B8]">{error}</div>
        ) : null}
      </div>
    );
  }

  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-medium text-[#E5E7EB]">
        {label}
        {required ? <span className="text-[#94A3B8]"> *</span> : null}
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={3}
          className={[base, error ? "border-[#26C1D3]/60" : ""].join(" ")}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={[base, error ? "border-[#26C1D3]/60" : ""].join(" ")}
        />
      )}
      {error ? (
        <div className="mt-2 text-xs font-medium text-[#94A3B8]">{error}</div>
      ) : null}
    </div>
  );
}

function TrustRowItem({ icon: Icon, children }) {
  return (
    <div className="inline-flex items-center gap-1.5 text-xs text-[#94A3B8] sm:gap-2 sm:text-sm">
      <Icon className="h-3.5 w-3.5 text-[#26C1D3] sm:h-4 sm:w-4" aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}

export default function CTASection() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [touched, setTouched] = useState({});
  const [submitState, setSubmitState] = useState("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const errors = useMemo(() => {
    const e = {};
    if (!values.name.trim()) e.name = "Name is required.";
    if (!values.email.trim()) e.email = "Email is required.";
    if (values.email && !/^\S+@\S+\.\S+$/.test(values.email))
      e.email = "Enter a valid email.";
    if (values.phone && !/^[+()\d\s-]{7,}$/.test(values.phone))
      e.phone = "Enter a valid phone number.";
    return e;
  }, [values]);

  const canSubmit = Object.keys(errors).length === 0;

  const onChange = (key) => (evt) => {
    setValues((v) => ({ ...v, [key]: evt.target.value }));
  };

  const onSubmit = async (evt) => {
    evt.preventDefault();
    setTouched({
      name: true,
      email: true,
      phone: true,
      service: true,
      message: true,
    });
    if (!canSubmit) return;

    setSubmitState("submitting");
    setSubmitMessage("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          pageUrl: typeof window !== "undefined" ? window.location.href : "",
        }),
      });

      if (!res.ok) {
        let msg = "Submission failed. Please try again.";
        try {
          const data = await res.json();
          if (data?.error) msg = data.error;
        } catch {}
        setSubmitState("error");
        setSubmitMessage(msg);
        return;
      }

      setSubmitState("success");
      setSubmitMessage("Thanks — we received your request. We’ll reach out shortly.");
      setValues({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
      setTouched({});
    } catch {
      setSubmitState("error");
      setSubmitMessage("Submission failed. Please try again.");
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  return (
    <section
      id="contact"
      className="tm-section tm-section--alt relative overflow-hidden border-t border-white/10 py-16 md:py-20"
    >
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-top-right bg-(--tm-bg-card)/60 shadow-[0_22px_70px_rgba(0,0,0,0.5)]">
          <div className="relative px-4 py-8 sm:px-10 sm:py-10 lg:px-12">
            <div
              className="pointer-events-none absolute inset-0 -z-10"
              aria-hidden="true"
            >
              <Image
                src="/images/techmantrana-cta-bg.png"
                alt=""
                fill
                priority={false}
                sizes="100vw"
                className="object-cover object-left"
              />
              <div className="absolute inset-0 bg-linear-to-b from-[#050B14]/55 via-[#050B14]/50 to-[#050B14]/80" />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_15%_30%,rgba(38,193,211,0.16),transparent_55%)]" />
            <div className="pointer-events-none absolute inset-0 opacity-[0.12] bg-[radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.55)_1px,transparent_0)] bg-size-[30px_30px]" />

            <div className="relative grid gap-5 sm:gap-6 lg:grid-cols-2 lg:items-start">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-160px" }}
                className="text-center lg:text-left"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#26C1D3]">
                  Get Started
                </div>
                <h2 className="mt-2.5 font-heading text-2xl leading-[1.12] tracking-tight text-[#E5E7EB] sm:mt-3 sm:text-4xl sm:leading-[1.1]">
                  Build a Resilient and Compliant Cybersecurity Foundation
                </h2>
                <p className="mx-auto mt-2.5 max-w-xl text-sm leading-relaxed text-[#94A3B8] sm:mt-3 sm:text-base lg:mx-0">
                  Start with a confidential consultation or request a focused
                  assessment. We help enterprises strengthen controls, validate
                  posture, and align to regulatory requirements.
                </p>

                <div className="mt-4 flex flex-col items-stretch justify-center gap-2.5 sm:mt-6 sm:gap-3 sm:flex-row sm:items-center lg:justify-start">
                  <motion.div whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.99 }}>
                    <Button onClick={() => {}} aria-label="Talk to Experts">
                      <span className="inline-flex items-center gap-2">
                        Talk to Experts <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.99 }}>
                    <Button variant="secondary" onClick={() => {}} aria-label="Request Assessment">
                      <span className="inline-flex items-center gap-2">
                        Request Assessment{" "}
                        <ClipboardList className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </Button>
                  </motion.div>
                </div>

                <div className="mt-4 flex flex-col gap-2 sm:mt-6 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 sm:gap-y-2 lg:justify-start">
                  <TrustRowItem icon={Verified}>Enterprise-ready delivery</TrustRowItem>
                  <TrustRowItem icon={Lock}>Confidential &amp; secure consultation</TrustRowItem>
                  <TrustRowItem icon={Timer}>Response within 24 hours</TrustRowItem>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-160px" }}
                transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
                className="w-full rounded-2xl border border-white/10 bg-[rgba(5,11,20,0.45)] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.35)] sm:p-5 lg:max-w-md lg:justify-self-end"
              >
                <form onSubmit={onSubmit} className="grid gap-2.5 sm:grid-cols-2 sm:gap-3">
                  <InputField
                    id="name"
                    label="Name"
                    value={values.name}
                    onChange={onChange("name")}
                    placeholder="Your full name"
                    required
                    error={touched.name ? errors.name : undefined}
                  />
                  <InputField
                    id="email"
                    label="Email"
                    type="email"
                    value={values.email}
                    onChange={onChange("email")}
                    placeholder="you@company.com"
                    required
                    error={touched.email ? errors.email : undefined}
                  />
                  <InputField
                    id="phone"
                    label="Phone (optional)"
                    type="tel"
                    value={values.phone}
                    onChange={onChange("phone")}
                    placeholder="+1 (555) 000-0000"
                    error={touched.phone ? errors.phone : undefined}
                  />
                  <InputField
                    id="service"
                    label="Service (optional)"
                    value={values.service}
                    onChange={onChange("service")}
                    placeholder="Select a service"
                    options={[
                      { value: "grc", label: "GRC & Compliance Advisory" },
                      { value: "cyber", label: "Cybersecurity Consulting" },
                      { value: "risk", label: "Risk Assessment & Threat Analysis" },
                      { value: "vapt", label: "VAPT & Security Testing" },
                      { value: "devsecops", label: "Security Engineering & DevSecOps" },
                      { value: "regulatory", label: "Cybersecurity Regulatory Requirements" },
                      { value: "privacy", label: "Data Privacy & Protection" },
                      { value: "resilience", label: "Business Continuity & Resilience" },
                      { value: "vciso", label: "Virtual CISO" },
                      { value: "not_sure", label: "Not sure (recommend)" },
                    ]}
                  />
                  <InputField
                    id="message"
                    label="Message (optional)"
                    value={values.message}
                    onChange={onChange("message")}
                    placeholder="Briefly share your needs (optional)"
                    textarea
                    className="sm:col-span-2"
                  />

                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="sm:col-span-2"
                  >
                    <button
                      type="submit"
                      disabled={!canSubmit || submitState === "submitting"}
                      className="inline-flex w-full items-center justify-center rounded-xl bg-[#26C1D3] px-5 py-2.5 text-sm font-semibold text-[#050B14] transition-colors hover:bg-[#1EA7B8] active:bg-[#168A99] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26C1D3]/60 sm:py-3"
                      aria-disabled={!canSubmit || submitState === "submitting"}
                    >
                      <span className="inline-flex items-center gap-2">
                        {submitState === "submitting" ? "Submitting…" : "Submit Request"}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </button>
                  </motion.div>

                  {submitMessage ? (
                    <div
                      className={[
                        "rounded-xl border px-3.5 py-2.5 text-xs sm:col-span-2 sm:px-4 sm:py-3",
                        submitState === "success"
                          ? "border-[#26C1D3]/25 bg-[#0F172A]/55 text-[#E5E7EB]/85"
                          : "border-white/10 bg-[#0F172A]/35 text-[#94A3B8]",
                      ].join(" ")}
                      role={submitState === "error" ? "alert" : "status"}
                    >
                      {submitMessage}
                    </div>
                  ) : null}

                  <div className="text-xs text-[#94A3B8] sm:col-span-2">
                    By submitting, you agree to be contacted about your request.
                    We do not share your details.
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
