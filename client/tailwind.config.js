const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
      fontFamily: {
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          primary: "#0B1F3A",
          secondary: "#143674",
          accent: "#26C1D3",
        },
        background: "#050B14",
        surface: "#0F172A",
        border: "#1E293B",
        textPrimary: "#E5E7EB",
        textSecondary: "#94A3B8",
        success: "#22C55E",
        warning: "#F59E0B",
        error: "#EF4444",
        cta: {
          DEFAULT: "#26C1D3",
          hover: "#1EA7B8",
          active: "#168A99",
          disabled: "#64748B",
        },
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #0B5ED7, #26C1D3)",
      },
      zIndex: {
        9999: "9999",
        10000: "10000",
      },
    },
  },
  plugins: [],
};

export default config;
