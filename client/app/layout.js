import "./globals.css";

import { Inter, Syne } from "next/font/google";
import LeadFormModal from "../components/ui/LeadFormModal";
import MultiCTA from "../components/ui/MultiCTA";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
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
      className={`${inter.variable} ${syne.variable} scroll-smooth`}
    >
      
      <body
        suppressHydrationWarning
        className={`${inter.className} min-h-screen bg-(--tm-bg-base) font-body text-[#E5E7EB] antialiased`}
      >
        {children}
        <LeadFormModal />
        <MultiCTA />
      </body>
    </html>
  );
}
