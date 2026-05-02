"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, X } from "lucide-react";

import Button from "./Button";

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
  inputRef,
  className = "",
}) {
  const base =
    "mt-1 w-full rounded-xl border border-[#1E293B] bg-[#050B14] px-3 py-2 text-[13px] text-[#E5E7EB] placeholder:text-[#94A3B8]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015FC4]/60 sm:px-4 sm:text-sm";

  if (options && !textarea) {
    return (
      <div className={className}>
        <label htmlFor={id} className="text-xs font-medium text-[#E5E7EB] sm:text-sm">
          {label}
          {required ? <span className="text-[#94A3B8]"> *</span> : null}
        </label>
        <div className="relative">
          <select
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            className={[base, "appearance-none pr-10", error ? "border-[#015FC4]/60" : ""].join(
              " ",
            )}
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
        {error ? <div className="mt-2 text-xs font-medium text-[#94A3B8]">{error}</div> : null}
      </div>
    );
  }

  return (
    <div className={className}>
      <label htmlFor={id} className="text-xs font-medium text-[#E5E7EB] sm:text-sm">
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
          className={[base, error ? "border-[#015FC4]/60" : ""].join(" ")}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          ref={inputRef}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={[base, error ? "border-[#015FC4]/60" : ""].join(" ")}
        />
      )}
      {error ? <div className="mt-2 text-xs font-medium text-[#94A3B8]">{error}</div> : null}
    </div>
  );
}

function openLeadForm(detail) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("tm:lead", { detail }));
}

export { openLeadForm };

export default function LeadFormModal() {
  const [isOpen, setIsOpen] = useState(false);
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
  const firstFieldRef = useRef(null);
  const lastActiveRef = useRef(null);

  const serviceOptions = useMemo(
    () => [
      { label: "Governance, Risk and Security Advisory", value: "Governance, Risk and Security Advisory" },
      { label: "Regulatory Compliance and Privacy", value: "Regulatory Compliance and Privacy" },
      { label: "Security Assessment and Testing", value: "Security Assessment and Testing" },
      { label: "Risk Assessment and Threat Analysis", value: "Risk Assessment and Threat Analysis" },
      { label: "Business Continuity and Operational Resilience", value: "Business Continuity and Operational Resilience" },
      { label: "Critical Infrastructure and OT Security", value: "Critical Infrastructure and OT Security" },
      { label: "Training Programs", value: "Training Programs" },
      { label: "General Inquiry", value: "General Inquiry" },
    ],
    [],
  );

  const errors = useMemo(() => {
    const e = {};
    if (!values.name.trim()) e.name = "Name is required.";
    if (!values.email.trim()) e.email = "Email is required.";
    if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) e.email = "Enter a valid email.";
    if (values.phone && !/^[+()\d\s-]{7,}$/.test(values.phone)) e.phone = "Enter a valid phone number.";
    return e;
  }, [values]);

  const canSubmit = Object.keys(errors).length === 0;

  const onChange = (key) => (evt) => {
    setValues((v) => ({ ...v, [key]: evt.target.value }));
  };

  const close = () => {
    setIsOpen(false);
    setSubmitState("idle");
    setSubmitMessage("");
    setTouched({});
    if (lastActiveRef.current && typeof lastActiveRef.current.focus === "function") {
      lastActiveRef.current.focus();
    }
  };

  const open = (detail) => {
    lastActiveRef.current = typeof document !== "undefined" ? document.activeElement : null;
    const nextService = typeof detail?.service === "string" ? detail.service : "";
    const nextMessage = typeof detail?.message === "string" ? detail.message : "";
    setValues((v) => ({
      ...v,
      service: nextService || v.service,
      message: nextMessage || v.message,
    }));
    setIsOpen(true);
    setSubmitState("idle");
    setSubmitMessage("");
    setTouched({});
  };

  useEffect(() => {
    const onOpen = (e) => open(e?.detail);
    window.addEventListener("tm:lead", onOpen);
    return () => window.removeEventListener("tm:lead", onOpen);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const t = window.setTimeout(() => {
      if (firstFieldRef.current) firstFieldRef.current.focus();
    }, 0);

    const onKeyDown = (event) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  const onSubmit = async (evt) => {
    evt.preventDefault();
    setTouched({ name: true, email: true, phone: true, service: true, message: true });
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
      setValues({ name: "", email: "", phone: "", service: "", message: "" });
    } catch {
      setSubmitState("error");
      setSubmitMessage("Submission failed. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Lead form"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="absolute inset-0 bg-[#015fc4]/10 backdrop-blur-sm" aria-hidden="true" />

      <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-[#050B14] shadow-[0_30px_90px_rgba(0,0,0,0.65)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_circle_at_20%_0%,rgba(1,95,196,0.22),transparent_60%)] opacity-70" />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/40" />

        <div className="relative flex items-start justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5">
          <div className="min-w-0">
            <div className="tm-kicker">Contact</div>
            <div className="mt-2 text-lg font-semibold tracking-tight text-[#F8FAFC] sm:text-xl">
              Talk to TechMantrana Experts
            </div>
            <div className="mt-1 text-sm leading-relaxed text-[#A1AFC3]">
              Share your requirement. We respond with a clear next step.
            </div>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#015FC4]/60 active:translate-y-px"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="relative px-5 pb-5 sm:px-6 sm:pb-6">
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            <InputField
              id="lead-name"
              label="Name"
              value={values.name}
              onChange={onChange("name")}
              placeholder="Your name"
              required
              error={touched.name ? errors.name : ""}

              inputRef={firstFieldRef}
              className="sm:col-span-1"
            />
            <InputField
              id="lead-email"
              label="Email"
              type="email"
              value={values.email}
              onChange={onChange("email")}
              placeholder="name@company.com"
              required
              error={touched.email ? errors.email : ""}
              className="sm:col-span-1"
            />
            <InputField
              id="lead-phone"
              label="Phone (optional)"
              value={values.phone}
              onChange={onChange("phone")}
              placeholder="+91 9903142550"
              error={touched.phone ? errors.phone : ""}
              className="sm:col-span-1"
            />
            <InputField
              id="lead-service"
              label="Service"
              value={values.service}
              onChange={onChange("service")}
              placeholder="Select a service"
              options={serviceOptions}
              error={touched.service ? errors.service : ""}
              className="sm:col-span-1"
            />
            <InputField
              id="lead-message"
              label="Message (optional)"
              value={values.message}
              onChange={onChange("message")}
              placeholder="Briefly describe your requirement..."
              textarea
              error={touched.message ? errors.message : ""}
              className="sm:col-span-2"
            />
          </div>

          {submitMessage ? (
            <div
              className={[
                "mt-4 rounded-2xl border px-4 py-3 text-sm",
                submitState === "success"
                  ? "border-[#015FC4]/35 bg-[#015FC4]/10 text-[#E5E7EB]"
                  : "border-white/10 bg-white/5 text-[#E5E7EB]/85",
              ].join(" ")}
              role="status"
            >
              {submitMessage}
            </div>
          ) : null}

          <div className="mt-4 flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={close}
              className="border-white/10 bg-white/5 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              aria-label="Submit lead"
              disabled={submitState === "submitting"}
              className="bg-[#015FC4] text-white shadow-[0_16px_40px_rgba(1,95,196,0.18)] hover:bg-[#014FAD]"
            >
              <span className="inline-flex items-center gap-2">
                Submit <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
