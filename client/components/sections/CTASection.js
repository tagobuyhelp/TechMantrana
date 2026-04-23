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
    "mt-1.5 w-full rounded-xl border border-[#1E293B] bg-[#050B14] px-4 py-2.5 text-sm text-[#E5E7EB] placeholder:text-[#94A3B8]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26C1D3]/60";

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
    <div className="inline-flex items-center gap-2 text-sm text-[#94A3B8]">
      <Icon className="h-4 w-4 text-[#26C1D3]" aria-hidden="true" />
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

  const onSubmit = (evt) => {
    evt.preventDefault();
    setTouched({
      name: true,
      email: true,
      phone: true,
      service: true,
      message: true,
    });
    if (!canSubmit) return;
    setValues({
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    });
    setTouched({});
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  return (
    <section
      id="contact"
      className="tm-section tm-section--alt relative overflow-hidden border-t border-white/10 py-24 lg:py-32"
    >
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-top-right bg-(--tm-bg-card)/60 shadow-[0_22px_70px_rgba(0,0,0,0.5)]">
          <div className="relative px-6 py-12 sm:px-10 lg:px-12">
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

            <div className="relative grid gap-10 lg:grid-cols-2 lg:items-start">
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
                <h2 className="mt-4 font-heading text-3xl leading-tight tracking-tight text-[#E5E7EB] sm:text-4xl">
                  Build a Resilient and Compliant Cybersecurity Foundation
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#94A3B8] lg:mx-0">
                  Start with a confidential consultation or request a focused
                  assessment. We help enterprises strengthen controls, validate
                  posture, and align to regulatory requirements.
                </p>

                <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
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

                <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 sm:gap-y-2 lg:justify-start">
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
                className="w-full rounded-2xl border border-white/10 bg-[rgba(5,11,20,0.45)] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.35)] sm:p-6 lg:max-w-md lg:justify-self-end"
              >
                <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
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
                      disabled={!canSubmit}
                      className="inline-flex w-full items-center justify-center rounded-xl bg-[#26C1D3] px-5 py-3 text-sm font-semibold text-[#050B14] transition-colors hover:bg-[#1EA7B8] active:bg-[#168A99] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#26C1D3]/60"
                      aria-disabled={!canSubmit}
                    >
                      <span className="inline-flex items-center gap-2">
                        Submit Request
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </button>
                  </motion.div>

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
