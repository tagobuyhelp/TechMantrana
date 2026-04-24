import "./globals.css";

import { Inter, Playfair_Display } from "next/font/google";
import MultiCTA from "../components/ui/MultiCTA";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata = {
  title: "TechMantrana | Cybersecurity, GRC, and Digital Risk Consulting",
  description: "Cybersecurity, GRC, and Digital Risk Consulting",
  keywords: "cybersecurity, GRC, digital risk, risk management, risk assessment, risk mitigation, risk reduction, risk control, risk reduction, risk control, risk reduction, risk control",
  icons: {
    icon: "/images/logos/siteicon.webp",
    apple: "/images/logos/siteicon.webp",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} scroll-smooth`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-(--tm-bg-base) font-body text-[#E5E7EB] antialiased"
      >
        {children}
        <MultiCTA assessmentHref="/#contact" />
      </body>
    </html>
  );
}
