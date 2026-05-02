import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import AboutSection from "../components/sections/AboutSection";
import CTASection from "../components/sections/CTASection";
import DeliverySection from "../components/sections/DeliverySection";
import FoundersNoteSection from "../components/sections/FoundersNoteSection";
import HeroSection from "../components/sections/HeroSection";
import InfoSecuritySection from "../components/sections/InfoSecuritySection";
import ProblemSection from "../components/sections/ProblemSection";
import ServicesSection from "../components/sections/ServicesSection";
import TrainingSection from "../components/sections/TrainingSection";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="flex flex-col">
        <HeroSection />
        <ProblemSection />
        <ServicesSection />
        <TrainingSection />
        <AboutSection />
        <InfoSecuritySection />
        <FoundersNoteSection />
        <DeliverySection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
