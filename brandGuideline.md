# 🎨 TechMantrana Design System — Colors & Typography Guide

## 📌 Overview

This document defines the **official color system and typography guidelines** for TechMantrana.

The goal is to ensure:
- Consistent UI/UX across platforms
- Enterprise-grade visual identity
- Accessibility (WCAG compliant)
- Scalable design system for future products

---

# 🎨 1. Color System

## 🔷 Brand Philosophy

TechMantrana’s color system reflects:
- **Trust & Authority** → Deep Blues
- **Technology & Intelligence** → Teal Accents
- **Enterprise Stability** → Neutral Dark System

---

## 🎯 Primary Colors

| Name            | Hex       | Usage                          |
|-----------------|-----------|--------------------------------|
| Primary Blue    | #0B1F3A   | Main background, brand base     |
| Secondary Blue  | #143674   | Sections, containers            |
| Accent Teal     | #26C1D3   | CTAs, highlights, interactions  |

---

## ⚫ Neutral Colors

| Name              | Hex       | Usage                          |
|-------------------|-----------|--------------------------------|
| Background Dark   | #050B14   | Page background                |
| Surface           | #0F172A   | Cards, panels                 |
| Border            | #1E293B   | Dividers, outlines            |
| Text Primary      | #E5E7EB   | Main text                     |
| Text Secondary    | #94A3B8   | Subtext, descriptions         |

---

## 🚦 Semantic Colors

| Type     | Hex       | Usage                  |
|----------|-----------|------------------------|
| Success  | #22C55E   | Success states         |
| Warning  | #F59E0B   | Alerts, warnings       |
| Error    | #EF4444   | Errors, critical states|

---

## 🔘 CTA Colors

| State     | Color     |
|-----------|----------|
| Default   | #26C1D3  |
| Hover     | #1EA7B8  |
| Active    | #168A99  |
| Disabled  | #64748B  |

---

## 🌈 Gradient System

Primary Gradient: linear-gradient(135deg, #0B5ED7, #26C1D3)


Usage:
- Hero accents
- Buttons (optional)
- Highlight sections

---

## 📊 Color Usage Ratio

- 70% → Dark backgrounds
- 20% → Neutral surfaces
- 10% → Accent colors (Teal)

---

## ♿ Accessibility Notes

- Maintain minimum contrast ratio **4.5:1**
- Avoid teal text on dark backgrounds without sufficient contrast
- Use white text (#FFFFFF / #E5E7EB) for readability

---

# 🔤 2. Typography System

## 🎯 Typography Philosophy

- Clean, readable, scalable
- Enterprise + consulting tone
- Balanced between authority and modern UI

---

## 🧩 Font Pairing

| Usage     | Font                |
|----------|---------------------|
| Headings | Playfair Display / DM Serif |
| Body     | Inter / Open Sans   |

---

## 🔠 Font Scale

| Element | Size        | Weight     |
|--------|-------------|-----------|
| H1     | 48–64px     | Bold      |
| H2     | 36–48px     | SemiBold  |
| H3     | 28–32px     | SemiBold  |
| H4     | 22–24px     | Medium    |
| Body   | 16–18px     | Regular   |
| Small  | 14px        | Regular   |

---

## 📏 Line Height & Spacing

- Headings: `1.2 – 1.3`
- Body Text: `1.5 – 1.7`
- Paragraph spacing: `16–24px`

---

## 🔡 Text Rules

- Max line width: **60–75 characters**
- Use **left alignment** (avoid center for long text)
- Avoid ALL CAPS for long sentences
- Use sentence case for UI

---

## 🧠 Typography Hierarchy

1. H1 → Primary message (Hero)
2. H2 → Section headers
3. H3 → Sub-sections
4. Body → Content
5. Small → Metadata / labels

---

## 🎛 UI Typography

| Element        | Style              |
|---------------|--------------------|
| Buttons       | Medium / SemiBold  |
| Labels        | Medium             |
| Inputs        | Regular            |
| Navigation    | Medium             |

---

# 🧱 3. Implementation Notes

## Tailwind Example

```js
theme: {
  colors: {
    primary: "#0B1F3A",
    secondary: "#143674",
    accent: "#26C1D3",
    background: "#050B14",
    surface: "#0F172A",
    border: "#1E293B",
    textPrimary: "#E5E7EB",
    textSecondary: "#94A3B8"
  }
}